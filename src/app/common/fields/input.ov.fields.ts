import { Output, EventEmitter, ChangeDetectionStrategy, Input, Component, ViewChild } from '@angular/core';
import { LanguageMng } from '../languageMng';
import { FieldOVLense, FieldOVLenseSearch, FieldOVPreload } from '../baseIUElements';
import { OverlayPanel } from 'primeng/overlaypanel';

/**
 * « Abstract object valued field »
 */
@Component({
    template: ''
  })
  abstract class AbstractLenseComponent {

    /** Clear event */
    @Output() cleared = new EventEmitter<void>();
    /** Search event */
    @Output() searched = new EventEmitter<void>();
    /** Select instance event */
    @Output() selected = new EventEmitter<number>();
    /** Action event, tipically Enter key */
    @Output() doAction = new EventEmitter<void>();

    /** Flag to show/hide the selected instances dialog */
    public showDialogSelectedInstances = false;
    /** Flag to activate the touch mode */
    public touchMode = false;

    constructor(
        public readonly langMng: LanguageMng) {
        if (window.innerWidth < 575) {
            this.touchMode = true;
        }
    }

    /**
     * Selected value event handler
     * @param index Index
     */
    public onInstanceSelected(index: number) {
        this.selected.emit(index);
    }

    /**
     * Button search click event handler
     */
    public onSearch() {
        this.searched.emit();
    }

    /**
     * Button clean click event handler
     */
    public onClean() {
        this.cleared.emit();
    }

    /**
     * Show the selected instances
     */
    public onShowSelected(): void {
        this.showDialogSelectedInstances = true;
    }

    /**
     * Hide the selected instances dialog
     */
    public onHideSelectedDialog(): void {
        this.showDialogSelectedInstances = false;
    }
}

/**
 * « Lense input field »
 */
@Component({
    selector: 'imes-lense',
    templateUrl: './lense.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class LenseComponent extends AbstractLenseComponent {

    /** Lense  field */
    @Input() public field!: FieldOVLense;

    /**
     * Constructor
     * @param langMng Language manager
     */
    constructor( public override readonly langMng: LanguageMng) { super(langMng); }

    /**
     * Returns the CSS class name for the Oid fields
     */
    public getOidFieldsClass(): string {
        return 'oidField' + this.field.oidFieldsTypes.length;
    }

    /**
     * Remove an instance from the selected ones
     * @param index Index to remove
     */
    public onRemoveInstance(index: number): void {
        this.field.getSelectedInstances().splice(index, 1);
        if (this.field.getSelectedInstances().length === 0) {
            this.onClean();
        } else {
            this.field.supplementaryInfo = this.langMng.translateTextWithParams(
                LanguageMng.fsNumberInstacesSelected, '',
                this.field.getSelectedInstances().length.toString());
        }
    }

    public mostrarBotones(): boolean {
        return this.field.nameInRequest !== 'vo_persona';
    }

    /**
     * Returns true if the eye button (shows selected instances) must be shown
     */
    public showEye(): boolean {
        return this.field.getSelectedInstances().length > 1;
    }

    /**
     * Selected value event handler
     * @param index Index
     */
    public override onInstanceSelected(index: number) {
        if (this.checkFieldsDatatype()) {
            super.onInstanceSelected(index);
        }
    }
    
    private checkFieldsDatatype(): boolean {
        for (let index = 0; index < this.field.oidFieldsTypes.length; index++) {
            if (this.field.oidFields[index]) {
                try {
                    this.field.oidFields[index] = this.convertoToDatatype(this.field.oidFields[index],this.field.oidFieldsTypes[index]);
                } catch (err) {
                    this.field.setValidationMessage('Invalid datatype');
                    return false;
                }
            }
        }
        this.field.invalid = false;
        return true;
    }

    private convertoToDatatype(value: any, dataType: string): any {

        if (value) {
            switch (dataType) {
                case 'int':
                case 'nat':
                case 'autonumeric':
                case 'autonumerico': {
                    const numInt = Number.parseFloat(value);
                    if (isNaN(numInt)) {
                        throw new Error('Invalid datatype');
                    }
                    if ((numInt | 0) !== numInt) {
                        throw new Error('Invalid datatype');
                    }
                    return numInt;
                }
                case 'real': {
                    const num = Number.parseFloat(value);
                    if (isNaN(num)) {
                        throw new Error('Invalid datatype');
                    }
                    return num;
                }
                default: {
                    return value;
                }
            }
        }
        return value;
    }    
}

/**
 * « LenseSearch input field »
 */
@Component({
    selector: 'imes-lensesearch',
    templateUrl: './lensesearch.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class LenseSearchComponent extends AbstractLenseComponent {

    /** Lense search field */
    @Input() public field!: FieldOVLenseSearch;
    /** Press any key event in search text */
    @Output() keypressLenseSearch = new EventEmitter<void>();

    @ViewChild('overlayPanel', { static: false }) overlayPanel!: OverlayPanel;

    private lastEvent: any;

    /* Constructor
     * @param langMng Language manager
     */
    constructor( public override readonly langMng: LanguageMng) { super(langMng); }


    /**
     * Manages the key down event
     */
    public onKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Enter' || event.key === 'NumpadEnter' || event.keyCode === 13) {
            event.preventDefault();
            if (this.doAction.observed) {
                this.doAction.emit();
            }
            if (this.field) {
                this.field.onKeyDown(event.key);
            }
        } else if (event.key && (event.key.length === 1 || event.key === 'Backspace' || event.key === 'Delete')) {
            this.lastEvent = event;
            this.keypressLenseSearch.emit();
        }
    }
    
    /**
     * Remove an instance from the selected ones
     * @param index Index to remove
     */
    public onRemoveInstance(index: number): void {
        this.field.getSelectedInstances().splice(index, 1);
        if (this.field.getSelectedInstances().length === 0) {
            this.onClean();
        } else if (this.field.getSelectedInstances().length === 1) {
            this.field.text = this.field.getSelectedInstances()[0].supplementaryInfo;
        } else {
            this.field.text = this.langMng.translateTextWithParams(
                LanguageMng.fsNumberInstacesSelected, '',
                this.field.getSelectedInstances().length.toString());
        }
    }

    public mostrarBotones(): boolean {
        return this.field.nameInRequest !== 'vo_persona';
    }

    /**
     * Returns true if the eye button (shows selected instances) must be shown
     */
    public showEye(): boolean {
        return this.field.getSelectedInstances().length > 1;
    }

    /**
     * Manages the key Up event
     */
    public onKeyUp(event: KeyboardEvent): void {
        if (this.field && this.field.text) {
            this.field.text = this.field.text.toUpperCase();
        }
    }    

    public resultListVisible(): boolean {
        if (this.field?.searchResults && this.field?.searchResults.length > 0) {
            if (this.overlayPanel && this.lastEvent) {
                this.overlayPanel.show(this.lastEvent);
            }
        } else {
            if (this.overlayPanel) {
                this.overlayPanel.hide();
            }
        }
        return true;
    }
}

/**
 * « Preload input field »
 */
@Component({
    selector: 'imes-preload',
    templateUrl: './preload.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class PreloadComponent {

    /** Lense search field */
    @Input() field!: FieldOVPreload;
    /** Select instance event */
    @Output() selected = new EventEmitter<number>();
    /** Action event, tipically Enter key */
    @Output() doAction = new EventEmitter<void>();

    constructor(
        public readonly langMng: LanguageMng) {
    }

    /**
     * Selected value event handler
     * @param index Index
     */
    public onInstanceSelected(index: number) {
        this.selected.emit(index);
    }

    /**
     * Manages the key down event
     */
    public onKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Enter' || event.key === 'NumpadEnter' || event.keyCode === 13) {
            event.preventDefault();
            if (this.doAction.observed) {
                this.doAction.emit();
            }
            if (this.field) {
                this.field.onKeyDown(event.key);
            }
        }
    }
}

/**
 * « Multiselection Preload input field »
 */
@Component({
    selector: 'imes-preload-multiple',
    templateUrl: './preloadmultiple.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class PreloadMultipleComponent extends PreloadComponent {

}

/**
 * « Multiselection Preload as combo input field »
 */
@Component({
    selector: 'imes-preload-multiple-dropdown',
    templateUrl: './preloadmultipledropdown.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class PreloadMultipleDropdownComponent extends PreloadComponent {

}

