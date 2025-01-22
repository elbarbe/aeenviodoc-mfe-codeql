import { Output, EventEmitter, ChangeDetectionStrategy, Input, Component } from '@angular/core';
import { LanguageMng } from '../languageMng';
import { FieldOVLense, FieldOVLenseSearch, FieldOVPreload } from '../baseIUElements';

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

    /**
     * Returns true if the eye button (shows selected instances) must be shown
     */
    public showEye(): boolean {
        return this.field.getSelectedInstances().length > 1;
    }
}

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

    /* Constructor
     * @param langMng Language manager
     */
    constructor( public override readonly langMng: LanguageMng) { super(langMng); }


    /**
     * Manages the keypress event
     */
    public onKeypressLenseSearch(): void {
        this.keypressLenseSearch.emit();
    }

    /**
     * Manages the key down event
     */
    public onKeyUp(event: KeyboardEvent): void {
        if (this.field && this.field.text) {
            this.field.text = this.field.text.toUpperCase();
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

    /**
     * Returns true if the eye button (shows selected instances) must be shown
     */
    public showEye(): boolean {
        return this.field.getSelectedInstances().length > 1;
    }
}

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

}

@Component({
    selector: 'imes-preload-multiple',
    templateUrl: './preloadmultiple.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class PreloadMultipleComponent extends PreloadComponent {

}

@Component({
    selector: 'imes-preload-multiple-dropdown',
    templateUrl: './preloadmultipledropdown.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class PreloadMultipleDropdownComponent extends PreloadComponent {

}

