import { ChangeDetectionStrategy,  Component, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { LanguageMng } from '../languageMng';
import { Field, FieldDefinedSelection, FieldBlob } from '../baseIUElements';
import { Util } from '../app.utils';

/**
 * « String input field »
 */
@Component({
    selector: 'imes-input-string',
    templateUrl: './inputstring.component.html',
    styles: [ " .labelForFile{ width: 75px; height: auto; } ",  " .labelFileName { width: calc(100% - 185px); padding-left: 5px; }", " .imesBlobImage img { margin-top: 5px; width: 100%; } ", " .imesBlobImage .imesBlobMultipleImage img{ padding: 5px; width: 25%; }" ],
    changeDetection: ChangeDetectionStrategy.Default
})
export class InputStringComponent {
    /** Size in pixels to define a  small screens */
    static readonly sizeSmallScreen = 767;
    /** Number maximum of rows for a text area */
    static readonly maxNumberRowsTextArea = 6;
    /** Number maximum of rows for a text area in small screens */
    static readonly maxNumberRowsTextAreaSmallScreen = 2;
    /** Ratio overflow */
    static readonly ratioOverflow = 1000;
    /** Editor number of rows */
    public numRows = 1;
    /** Use popup editor */
    public usePopupEditor = false;
    /** Flag to open de dialog editor */
    public displayDialogEditor = false;
    /** Data previous value. Used in cancel button */
    public previousValue: any;
    /** Style for text area editor */
    public textAreaStyle = {width: '100%', float: 'left'};
    /** Flag to activate the touch mode */
    public touchMode = false;

    /** Field */
    protected intField!: Field;

    @Input()
    set field(field: Field) {
        this.intField = field;
        if (this.intField) {
            this.assignEditorProperties();
        }
    }
    get field(): Field { return this.intField; }

    /** Change value event */
    @Output() valueChanged = new EventEmitter<void>();

    /** Action event, tipically Enter key */
    @Output() doAction = new EventEmitter<void>();

    constructor(public readonly langMng: LanguageMng) {
        if (window.innerWidth < 575) {
            this.touchMode = true;
        }
    }

    /**
     * Adjust editor proeprties based on the data type and size
     */
    private assignEditorProperties(): void {
        // Calculate number of rows and if popup editor must be used or not
        if (this.intField.dataType === Field.dtString) {
            this.assignEditorPropertiesString();
        }
        if (this.intField.dataType === Field.dtText) {
            this.numRows = window.innerWidth < InputStringComponent.sizeSmallScreen ?
                InputStringComponent.maxNumberRowsTextAreaSmallScreen :
                InputStringComponent.maxNumberRowsTextArea;
            this.usePopupEditor = true;
            this.textAreaStyle = {width: 'calc(100% - 26px)', float: 'left'};
        }
    }

    /**
     * Adjust editor proeprties based on the data type and size
     */
    private assignEditorPropertiesString(): void {
        this.usePopupEditor = false;
        // Substract paddings and borders
        const maxEditorWidth = (window.innerWidth * 0.97) - 30 - 30 - 12;
        // Calculate overflow in current resolution
        let overflow = this.intField.sizePixels ? this.intField.sizePixels /  maxEditorWidth : 0;
        if (overflow > InputStringComponent.ratioOverflow) {
            this.numRows = Math.floor(overflow) + 1;
            if (window.innerWidth < InputStringComponent.sizeSmallScreen) {
                if (this.numRows > InputStringComponent.maxNumberRowsTextAreaSmallScreen) {
                    this.numRows = InputStringComponent.maxNumberRowsTextAreaSmallScreen;
                    this.usePopupEditor = true;
                    this.textAreaStyle = {width: 'calc(100% - 26px)', float: 'left'};
                }
            } else if (this.numRows > InputStringComponent.maxNumberRowsTextArea) {
                this.numRows = InputStringComponent.maxNumberRowsTextArea;
                this.usePopupEditor = true;
                this.textAreaStyle = {width: 'calc(100% - 26px)', float: 'left'};
            }
        }
}

    /**
     * Manages the value change event
     */
    public onFieldChange() {
        this.field.setValidationMessage('');
        this.valueChanged.emit();
    }

    /**
     * Manages the key down event
     */
    public onKeyDown(event: KeyboardEvent): void {
        if (!this.isTextArea() && (event.key === 'Enter' || event.key === 'NumpadEnter' || event.keyCode === 13)) {
            event.preventDefault();
            if (this.doAction.observed) {
                this.doAction.emit();
            }
            if (this.field) {
                this.field.onKeyDown(event.key);
            }
        }
    }

    /**
     * Returns true if the field must be represented using a TextArea, else it will be a input text
     */
    public isTextArea(): boolean {
        return this.intField.dataType === Field.dtText || this.numRows > 1;
    }

    /**
     * Manages the key down event
     */
    public onKeyUp(event: KeyboardEvent): void {
        if (this.intField && (this.intField.dataType === Field.dtString || this.intField.dataType === Field.dtText) &&
            this.intField.value) {
            this.intField.value = this.intField.value.toUpperCase();
        }
    }    
}

/**
 * « Numeric input field »
 */
@Component({
    selector: 'imes-input-numeric',
    templateUrl: './inputnumeric.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class InputNumericComponent extends InputStringComponent {

    /** Check for autonumeric fields */
    public checkAuto = true;

    @ViewChild('inputNumeric', { static: false }) inputControl: any;

    /**
     * Returns the value in the proper presentation format
     */
    public getFormattedValue(): any {
        return this.intField.getFormattedValue();
    }

    /**
     * Manages the value change event
     */
    public onInputNumberChange(event: any) {
        const previousValue = this.intField.value;
        this.intField.setValueFromControl(event.target.value);
        if (previousValue !== this.intField.value) {
            super.onFieldChange();
        }
    }

    /**
     * Manages the KeyDown event to prevent not valid values
     * @param event Event
     */
    public override onKeyDown(event: KeyboardEvent) {
        // Allowed keys for all datatypes
        if (event.key === 'Backspace' || event.key === 'Tab' || event.key === 'Delete' ||
            event.key === 'End' || event.key === 'Home' || event.key === 'Insert' ||
            event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' ||
            event.key === 'ArrowUp') {
            return;
        }
        const currentSelectionStart = this.inputControl.nativeElement.selectionStart;
        const currentSelectionEnd = this.inputControl.nativeElement.selectionEnd;

        // Minus sign only allowed as first position
        if (event.key === '-' && (currentSelectionStart !== 0 || currentSelectionEnd !== 0)) {
            event.preventDefault();
            return;
        }

        if (this.intField.dataType === Field.dtReal) {
            this.onKeyDownReal(event);
        }
        // Natural number
        if (this.intField.dataType === Field.dtNat && (event.key < '0' || event.key > '9')) {
            event.preventDefault();
        }
        // Integer number
        if ((this.intField.dataType === Field.dtInt || this.intField.dataType === Field.dtAuto) &&
            event.key !== '-' && (event.key < '0' || event.key > '9')) {
            event.preventDefault();
        }
    }

    private onKeyDownReal(event: KeyboardEvent) {
        const currentSelectionStart = this.inputControl.nativeElement.selectionStart;
        const currentSelectionEnd = this.inputControl.nativeElement.selectionEnd;
        // Special case, dot in numeric pad is the decimal separator
        if (event.key === 'NumpadDecimal' || event.keyCode === 110) {
            const currentValue = this.inputControl.nativeElement.value;
            if (currentValue.indexOf(this.langMng.decimalSeparator) > 0) {
                event.preventDefault();
            } else {
                const newValue = currentValue.substring(0, currentSelectionStart) +
                    this.langMng.decimalSeparator + currentValue.substring(currentSelectionEnd);
                this.inputControl.nativeElement.value = newValue;
                this.inputControl.nativeElement.selectionStart = currentSelectionEnd + 1;
                this.inputControl.nativeElement.selectionEnd = currentSelectionEnd + 1;
                event.preventDefault();
            }
            return;
        }
        if (event.key !== '-' && event.key !== this.langMng.decimalSeparator &&
            (event.key < '0' || event.key > '9')) {
                event.preventDefault();
        }
    }

    /**
     * Manages the change in the check for autonumeric
     */
    public onCheckAutoChange(): void {
        if (this.checkAuto) {
            this.field.value = -1;
        } else {
            this.field.value = '';
        }
    }
}

/**
 * « Date, Time and Datetime input field »
 */
@Component({
    selector: 'imes-input-date',
    templateUrl: './inputdate.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class InputDateComponent extends InputStringComponent {

    /** Show seconds in the editor or not */
    @Input() public showSeconds = false;

    /**
     * If seconds are not shown, remove them
     */
    private removeSeconds(): void {
        if (this.field?.value && !this.showSeconds) {
            try {
                const dateType = new Date(this.field.value);
                if (!isNaN(dateType.valueOf())) {
                    dateType.setSeconds(0, 0);
                    this.field.value = dateType;
                }
            } catch { }
        }
    }

    /**
     * Manages the OnSelect event
     */
    public onSelect(): void {
        if (this.field){
            if (!this.showSeconds && this.field.value) {
                this.removeSeconds();
            }

            if ((this.field.value && !this.previousValue) ||
                (!this.field.value && this.previousValue) ||
                (this.field.value && this.previousValue && this.field.value.toString() !== this.previousValue.toString())) {
                this.onFieldChange();
            }
            this.previousValue = this.field.value;
        }
    }

    /**
     * Manages the blur event
     */
    public onFieldBlur(): void {
        this.removeSeconds();
        if ((this.field.value && !this.previousValue) ||
            (!this.field.value && this.previousValue) ||
            (this.field.value && this.previousValue && this.field.value.toString() !== this.previousValue.toString())) {
            this.onFieldChange();
            this.previousValue = this.field.value;
        }
    }

    /**
     * Manages the click on clear button event
     */
    public onClearClick(): void {
        super.onFieldChange();
    }
}

/**
 * « Boolean check input field »
 */
@Component({
    selector: 'imes-input-check',
    templateUrl: './inputcheck.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class InputCheckComponent extends InputStringComponent {

}

/**
 * « Defined selection input field »
 */
@Component({
    selector: 'imes-input-definedselection',
    templateUrl: './inputdefinedselection.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class InputDefinedSelectionComponent {

    /** Defined selection  field */
    @Input() public field!: FieldDefinedSelection;
    /** Change value event */
    @Output() valueChanged = new EventEmitter<void>();

    /** Action event, tipically Enter key */
    @Output() doAction = new EventEmitter<void>();

    constructor(
        public readonly langMng: LanguageMng) {
    }

    /**
     * manages the value change event
     */
    public onFieldChange() {
        this.valueChanged.emit();
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
 * « Defined selection radio input field »
 */
@Component({
    selector: 'imes-input-radio',
    templateUrl: './inputradio.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class InputRadioComponent extends InputDefinedSelectionComponent {

}

/**
 * « File input field »
 */
@Component({
    selector: 'imes-input-blob',
    templateUrl: './inputblob.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class InputBlobComponent {

    /** Blob field */
    protected intField!: FieldBlob;
    /** Flag to show/hide the selected instances dialog */
    public showDialogSelectedInstances = false;

    @Input()
    set field(field: FieldBlob) {
        this.intField = field;
        if (this.intField) {
            this.intField.fileLoadComplete.subscribe((data) => this.processLoadFileComplete(data));
            this.setAllowedExtensions();
        }
    }
    get field(): FieldBlob { return this.intField; }

    /** Change value event */
    @Output() valueChanged = new EventEmitter<void>();

    constructor(public readonly langMng: LanguageMng, public util: Util,
                protected changeDetectorRef: ChangeDetectorRef) {
    }

    /**
     * manages the value change event
     */
    public onFieldChange(event: any) {
        this.intField.onFileChange(event);
    }

    /**
     * Returns true if the field has value
     */
    public hasValue(): boolean {
        return this.intField.enabled && (this.intField.value || this.intField.dataFiles.length > 0);
    }

    /**
     * Manages the delete button
     */
    public onDelete(): void {
        this.intField.clean();
        this.valueChanged.emit();
    }

    /**
     * Manages the download button
     */
    public onDownload(): void {
        if (this.intField.value) {
            this.util.saveFileFromBase64(this.intField.value, this.intField.fileName);
        }
    }

    /**
     * Process the load file complete event
     * @param event Load file event
     */
    protected processLoadFileComplete(data: {success: boolean, message: string, file: any}): void {
        if (!data.success) {
            this.util.addErrorMessage(data.message);
        }
        this.setTextToLabel();
        this.valueChanged.emit();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Set the default allowed file extensions
     */
    protected setAllowedExtensions(): void {
        if (this.intField.fileAllowedExtensions === '') {
            this.intField.fileAllowedExtensions = '.doc,.docx,.pdf,.xls,.xlsx,.txt,.jpg,.jpeg,.bmp,.gif,.png';
        }
    }

    /**
     * Show the selected instances
     */
    public onShowSelected(): void {
        this.showDialogSelectedInstances = true;
    }

    /**
     * Remove an instance from the selected ones
     * @param index Index to remove
     */
    public onRemoveInstance(index: number): void {
        this.field.dataFiles.splice(index, 1);
        this.setTextToLabel();
    }

    private setTextToLabel(): void {
        if (this.field.allowMultiSelect) {
            if (this.field.dataFiles.length === 0) {
                this.field.fileName = '';
            } else if (this.field.dataFiles.length === 1) {
                this.field.fileName = this.field.dataFiles[0].name;
            } else {
                this.field.fileName = this.langMng.translateTextWithParams(
                    LanguageMng.fsNumberInstacesSelected, '',
                    this.field.dataFiles.length.toString());
            }
        }
    }
}

/**
 * « Image file input field »
 */
@Component({
    selector: 'imes-input-blob-image',
    templateUrl: './inputblobimage.component.html',
    styles: [`
    .labelForFile{
        width: 75px;
        height: auto;
    }
    .labelFileName {
        width: calc(100% - 185px);
        padding-left: 5px;
    }
    .imesBlobImage img {
        margin-top: 5px;
        width: 100%;
    }
    .imesBlobImage .imesBlobMultipleImage img{
        padding: 5px;
        width: 25%;
    }
    
    ` ],
    changeDetection: ChangeDetectionStrategy.Default
})
export class InputBlobImageComponent extends InputBlobComponent {

    /** Allowed file extensions for images */
    private static readonly allowedImageExtensions = '.jpg,.jpeg,.bmp,.gif,.png,image/jpeg,image/bmp,image/png,image/gif';

    /**
     * Set the default allowed file extensions
     */
    protected override setAllowedExtensions(): void {
        if (this.intField.fileAllowedExtensions === '') {
            this.intField.fileAllowedExtensions = InputBlobImageComponent.allowedImageExtensions;
        }
    }
}

/**
 * « PDF Viewer field »
 */
@Component({
    selector: 'imes-pdf-viewer',
    templateUrl: './pdfviewer.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class ImesPDFViewerComponent {

    /** Blob field */
    protected intField!: FieldBlob;

    @Input()
    set field(field: FieldBlob) {
        this.intField = field;
    }
    get field(): FieldBlob { return this.intField; }

    /**
     * File nam to be used in download
     */
    @Input() public fileName = '';

    constructor(public readonly langMng: LanguageMng, protected util: Util,
                protected changeDetectorRef: ChangeDetectorRef) {
    }

    public getPDFBase64(): string {
        if (this.intField?.value) {
            return this.intField.value;
        }
        return '';
    }
}
