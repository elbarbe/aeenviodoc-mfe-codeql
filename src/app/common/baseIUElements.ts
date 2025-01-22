import { ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from './app.utils';
import { LanguageMng } from './languageMng';
import { InstanceCache } from './app.cachedependencyrules';
import { ExchangeInfo } from './app.exchangeinfo';
import { Subject } from 'rxjs';
import { JsonUtility } from './jsonUtility';

/**
 * Utility Class for object valued inbound arguments
 */
export class Instance {
    public oid: any;
    public supplementaryInfo = '';
    public jsonOID = '';
}

/**
 * Store information about a service argument or filter variable
 */
export class Field {

    /** Data type constants */
    public static readonly dtAuto = 'autonumeric';
    public static readonly dtBool = 'bool';
    public static readonly dtInt = 'int';
    public static readonly dtNat = 'nat';
    public static readonly dtReal = 'real';
    public static readonly dtDate = 'date';
    public static readonly dtTime = 'time';
    public static readonly dtString = 'string';
    public static readonly dtDatetime = 'datetime';
    public static readonly dtText = 'text';
    public static readonly dtBlob = 'blob';
    public static readonly dtPass = 'password';
    /** Key for mandatory error message */
    static readonly ERROR_MSG_MANDATORY = 'app_FLD_ERRORMANDATORY';
    /** Ratio pixels per character normal case */
    static readonly RATIO_PX_CHAR_NORMAL  = 7;
    /** Ratio pixels per character upper case */
    static readonly RATIO_PX_CHAR_UPPER  = 8;

    /** Alias */
    public alias = '';
    /** Name to be send to the back-end */
    public nameInRequest = '';
    /** Array of CSS classes to be assigned to the graphic element */
    public editorCSSClasses: string[] = [];
    /** If it is visible or not */
    public visible = true;
    /** If it is enabled or not */
    public enabled = true;
    /** If it is mandatory or not */
    public mandatory = true;
    /** Field value */
    public value: any = null;
    /** Validation message */
    public validationMessage = '';
    /** Invalid value */
    public invalid = false;
    /** Datatype or domain */
    public dataType = '';
    /** For string data type, the maximum length */
    public maxLength = 0;
    /** Specific size for the field, expressed in number of visible characters.
     * If value is -1, alias and data type will be used to calculate the size of the field
     */
    public fieldSize = -1;
    /** Calculted size data in pixels. To decide the editor to be used */
    public sizePixels = 0;

    /**
     * Constructor
     * @param langMng Language manager
     */
    constructor(public langMng: LanguageMng) { }

    /**
     * Validate the field value
     */
    public validate(): boolean {
        this.invalid = false;
        this.setValidationMessage('');
        if (this.mandatory && !this.value && this.value !== 0 && this.value !== false) {
            this.setValidationMessage(this.langMng.translateTextWithParams(Field.ERROR_MSG_MANDATORY, '', this.alias));
            this.invalid = true;
            this.assignInvalidCSS();
            return true;
        }

        if (this.value || this.value === 0 || this.value === false) {
            // Data type validation
            this.invalid = false;
            this.setValidationMessage('');
            switch (this.dataType) {
                case Field.dtNat:
                    this.validateNaturalValue();
                    break;
                case Field.dtInt:
                case Field.dtAuto:
                    this.validateIntegerValue();
                    break;
                case Field.dtReal:
                    this.validateRealValue();
                    break;
                default:
                    break;
            }
        }
        this.assignInvalidCSS();
        return this.invalid;
    }

    /**
     * Validates an natural argument
     */
    private validateNaturalValue(): void {
        if (!this.checkIntegerValue(this.value) || this.value < 0) {
            this.setValidationMessage(this.langMng.translateTextWithParams(LanguageMng.fsErrorNat, '', this.alias));
        }
    }
    /**
     * Validates an integer argument
     */
    private validateIntegerValue(): void {
        if (!this.checkIntegerValue(this.value)) {
            this.setValidationMessage(this.langMng.translateTextWithParams(LanguageMng.fsErrorInt, '', this.alias));
        }
    }
    /**
     * Validates an real argument
     */
    private validateRealValue(): void {
        if (!this.checkFloatValue(this.value) ) {
            this.setValidationMessage(this.langMng.translateTextWithParams(LanguageMng.fsErrorReal, '', this.alias));
        }
    }

    /**
     * Assigns or removes the CSS classes that mark an element as invalid
     */
    protected assignInvalidCSS(): void {
        if (this.invalid) {
            if (this.editorCSSClasses.indexOf('invalidField') === -1) {
                this.editorCSSClasses.push('invalidField');
            }
        } else {
            const index = this.editorCSSClasses.indexOf('invalidField');
            if (index > -1) {
                this.editorCSSClasses.splice(index, 1);
            }
        }
    }

    /**
     * Assigns the CSS class
     * @param cssClass New class to be assigned
     */
    public addCSSClass(cssClass: string): void {
        if (this.editorCSSClasses.indexOf(cssClass) === -1) {
            this.editorCSSClasses.push(cssClass);
        }
    }

    /**
     * Removes  the CSS class
     * @param cssClass Class to be assigned
     */
    public removeCSSClass(cssClass: string): void {
        const index = this.editorCSSClasses.indexOf(cssClass);
        if (index > -1) {
            this.editorCSSClasses.splice(index, 1);
        }
    }

    /**
     * Clean the field
     */
    public clean(): void {
        this.setValidationMessage('');
        this.value = null;
    }

    /**
     * Add the field value to the list
     * @param argumentsSingleValue Single value argument list
     * @param argumentsMultiple Multi-selecction value argument list
     */
    public addValuesForExecution(argumentsSingleValue: any[], argumentsMultiple: any[]): number {
        const value = { name: this.getNameInRequest(), value: this.toJson()};
        argumentsSingleValue.push(value);
        return 1;
    }

    /**
     * Check if the string valu is a float value or not
     * @param valueStr String value
     */
    protected checkFloatValue(valueStr: string): boolean {
        try {
            if (valueStr) {
                const num = Number.parseFloat(valueStr);
                return !isNaN(num);
            }
        } catch (error) {
            return false;
        }
        return true;
    }

    /**
     * Check if the string valu is a integer value or not
     * @param valueStr String value
     */
    protected checkIntegerValue(valueStr: string): boolean {
        try {
            if (valueStr) {
                const num = Number(valueStr);
                if (isNaN(num)) {
                    return false;
                }
                const numInt = Number.parseInt(valueStr, 10);
                return !isNaN(numInt);
            }
        } catch (error) {
            return false;
        }
        return true;
    }

    /**
     * Returns the single field value
     */
    public getSingleValue(): any {
        return this.value;
    }

    /**
     * Returns the field value to be used as filter variable
     */
    public getValueForFilter(): any {
        return this.toJson();
    }

    /**
     * Returns the value in Json format
     */
    public toJson(): string {
        let jsonFormat = this.getSingleValue();
        if (this.value) {
            if (this.dataType === Field.dtDate) {
                jsonFormat = JsonUtility.date2Json(new Date(this.value));
            }
            if (this.dataType === Field.dtDatetime) {
                jsonFormat = JsonUtility.dateTime2Json(new Date(this.value));
            }
            if (this.dataType === Field.dtTime) {
                jsonFormat = JsonUtility.time2Json(new Date(this.value));
            }
        }
        return jsonFormat;
    }

    /**
     * Assign the CSS classes
     * @param minSize For minimum size
     */
    public assignCSS(minSize = false): void {
        // Calculate css class columns based on the length of the alias
        const aliasSize = minSize ? 0 : this.alias.length;
        // By default
        let editorSize = 20;
        let extraClasses = '';
        switch (this.dataType) {
            case Field.dtBool:
                editorSize = aliasSize + 3;
                break;
            case Field.dtInt:
            case Field.dtNat:
                editorSize = 10;
                extraClasses = 'inputAlignR';
                break;
            case Field.dtReal:
            case Field.dtDate:
            case Field.dtTime:
                editorSize = 15;
                extraClasses = 'inputAlignR';
                break;
            case Field.dtString:
                if (!minSize) {
                    editorSize = this.maxLength;
                }
                break;
            case Field.dtDatetime:
                editorSize = 20;
                extraClasses = 'inputAlignR';
                break;
            case Field.dtText:
                editorSize = 1000;
                break;
            case Field.dtBlob:
                editorSize = 40;
                break;
        }

        // If specific size is assigned
        if (this.fieldSize !== -1) {
            this.editorCSSClasses.push(this.calculateColCss(this.fieldSize));
        } else if (aliasSize > editorSize) {
            this.editorCSSClasses.push(this.calculateColCss(aliasSize));
        } else {
            this.editorCSSClasses.push(this.calculateColCss(editorSize));
        }
        if (extraClasses) {
            this.editorCSSClasses.push(extraClasses);
        }
    }


    /**
     * Calculates and returns the Bootstrap Grid CSS classes for the number of characters received as argument
     * @param lengthInCharacters Number of characters
     */
    protected calculateColCss(lengthInCharacters: number): string {

        let sizeInCols = '';

        // Those ratios are for 14px font-size.
        // If font-size is modified, ratios must be adjusted
        let ratio = Field.RATIO_PX_CHAR_NORMAL;
        if (lengthInCharacters > 0 && lengthInCharacters <= 10) {
            ratio = Field.RATIO_PX_CHAR_UPPER;
        }
        // Calculate the size in pixels, adding the left and right padding
        this.sizePixels = ratio * lengthInCharacters + 30;

        // xs
        let numCols = Math.trunc(this.sizePixels / 25) + 1;
        if (numCols > 12) {
            numCols = 12;
        }
        sizeInCols += ' col-' + numCols;

        // sm
        numCols = Math.trunc(this.sizePixels / 45) + 1;
        if (numCols > 12) {
            numCols = 12;
        }
        sizeInCols += ' col-sm-' + numCols;

        // md
        numCols = Math.trunc(this.sizePixels / 60) + 1;
        if (numCols > 12) {
            numCols = 12;
        }
        sizeInCols += ' col-md-' + numCols;

        // lg
        numCols = Math.trunc(this.sizePixels / 80) + 1;
        if (numCols > 12) {
            numCols = 12;
        }
        sizeInCols += ' col-lg-' + numCols;

        // xl
        numCols = Math.trunc(this.sizePixels / 95) + 1;
        if (numCols > 12) {
            numCols = 12;
        }
        sizeInCols += ' col-xl-' + numCols;

        return sizeInCols;
    }

    /**
     * Returns a Json object containing  the current field context. Oposite to loadFromContext
     */
    public saveContextInfo(): any {
        return {
            visible: this.visible,
            enabled: this.enabled,
            mandatory: this.mandatory,
            value: this.value
        };
    }

    /**
     * Initialize properties using the context information. Oposite to saveContextInfo
     */
    public loadFromContext(contextInfo: any): void {
        if (contextInfo) {
            this.visible = contextInfo.visible;
            this.enabled = contextInfo.enabled;
            this.mandatory = contextInfo.mandatory;
            this.setValue(contextInfo.value);
        }
    }

    /**
     * Sets the value to the field
     * @param newValue New value to be assigned
     */
    public setValue(newValue: any): void {
        this.value = newValue;
    }

    /**
     * Returns the string value formatted using the locale
     */
    public getFormattedValue(): string {
        if (this.dataType === Field.dtReal) {
            const valueNumber = Number.parseFloat(this.value);
            if (!isNaN(valueNumber)) {
                return valueNumber.toLocaleString(this.langMng.getLanguageId(), { useGrouping: true });
            }
            return this.value;
        } else {
            return this.value;
        }
    }

    /**
     * Used by the graphical controls to set the value. It is transformed using the locale configuration
     * @param newValue New value from the control
     */
    public setValueFromControl(newValue: string): void {
        if (this.dataType === Field.dtReal) {
            if (newValue !== '') {
                const decimalSepRe = new RegExp('\\' + this.langMng.decimalSeparator, 'g');
                const groupSepRe = new RegExp('\\' + this.langMng.groupSeparator, 'g');
                const num = parseFloat(newValue.replace(groupSepRe, '').replace(decimalSepRe, '.'));
                if (isNaN(num)) {
                    this.value = '';
                } else {
                    this.value = num;
                }
            } else {
                this.value = '';
            }
        } else {
            this.value = newValue;
        }
    }

    /**
     * Assign the validation text and mark the field as invalid
     * @param msg Error message or empty
     */
    public setValidationMessage(msg: string): void {
        if (msg) {
            this.validationMessage = msg;
            this.invalid = true;
        } else {
            this.validationMessage = '';
            this.invalid = false;
        }
        this.assignInvalidCSS();
    }

    /**
     * Returns the name to be used in the request
     */
    public getNameInRequest(): string {
        return this.nameInRequest;
    }
}

/**
 * Class for defined selection service inbound arguments or filter variables
 */
export class FieldDefinedSelection extends Field {
    /** Defined options */
    public options: Array<{ key: any, value: string }> = [];

    /**
     * Constructor
     * @param langMng Language manager
     */
    constructor(public override langMng: LanguageMng) { super(langMng); }

    /**
     * Assign the CSS classes
     * @param minSize For minimum size
     */
    public override assignCSS(minSize = false): void {
        const aliasSize = this.alias.length;
        let valuesSize = 0;
        if (this.options && this.options.length > 0) {
            for (const val of this.options) {
                if (val.value.length && val.value.length > valuesSize) {
                    valuesSize = val.value.length;
                }
            }
        }
        valuesSize += 4;

        if (this.fieldSize !== -1) {
            this.editorCSSClasses.push(this.calculateColCss(this.fieldSize));
        } else if (aliasSize > valuesSize) {
            this.editorCSSClasses.push(this.calculateColCss(aliasSize));
        } else {
            this.editorCSSClasses.push(this.calculateColCss(valuesSize));
        }
    }
}

/**
 * Class for password inbound arguments
 */
export class FieldPassword extends Field {
    /** Alias for the confirmation field */
    public aliasConfirmationValue = '';
    /** Confirmation value */
    public confirmationValue = '';

    /**
     * Constructor
     * @param langMng Language manager
     */
    constructor(public override langMng: LanguageMng) { super(langMng); }

    /**
     * Validate the field value
     */
    public override validate(): boolean {
        this.invalid = false;
        this.setValidationMessage('');
        if (this.mandatory && !this.value && this.value !== 0 && this.value !== false) {
            this.setValidationMessage(this.langMng.translateTextWithParams(Field.ERROR_MSG_MANDATORY, '', this.alias));
        }

        if (!this.invalid && this.value !== this.confirmationValue) {
            this.setValidationMessage(this.langMng.translateTextWithParams(LanguageMng.fsErrorPwdConf, '', this.alias));
        }
        return this.invalid;
    }

    /**
     * Add the field value to the list
     * @param argumentsSingleValue Single value argument list
     * @param argumentsMultiple Multi-selecction value argument list
     */
    public override addValuesForExecution(argumentsSingleValue: any[], argumentsMultiple: any[]): number {
        const value = { name: this.getNameInRequest(), value: this.value };
        argumentsSingleValue.push(value);
        const confirmationValue = { name: 'confirm' + this.getNameInRequest(), value: this.confirmationValue };
        argumentsSingleValue.push(confirmationValue);
        return 1;
    }
}

/**
 * Class for blob inbound arguments or filter variables
 */
export class FieldBlob extends Field {

    /** Load File name */
    public fileName = '';
    /** Load file type */
    public fileType = '';
    /** File size limit in Megabytes */
    public fileMaxSize = 10;
    /** Allowed file extensions, separated by commas */
    public fileAllowedExtensions = '';
    /** File load complete */
    public fileLoadComplete: Subject<{success: boolean, message: string, file: any}> =
        new Subject<{success: boolean, message: string, file: any}>();
    /** Allow multi selection or not */
    public allowMultiSelect = false;
    /** Fiel data when Multiselect is activated */
    public dataFiles: any[] = [];

    /**
     * Constructor
     * @param langMng Language manager
     */
    constructor(public override langMng: LanguageMng) { super(langMng); }

    /**
     * Clean the field
     */
    public override clean(): void {
        super.clean();
        this.fileName = '';
        this.fileType = '';
        this.dataFiles = [];
    }

    /**
     * Manages the seleccion in the file selector input
     * @param event Event arguments
     */
    public onFileChange(event: any): void {
        if (!event.target.files || event.target.files.length === 0) {
            this.fileLoadComplete.next({success: true, message: '', file: null});
            return;
        }

        if (event.target.files.length === 1 && !this.allowMultiSelect) {
            const file = event.target.files[0];
            this.processSingleFile(file);
        } else {
            let valid = true;
            for (const file of event.target.files) {
                const errorMsg = this.validateFileProperties(file);
                if (errorMsg) {
                    valid = false;
                    this.fileLoadComplete.next({
                        success: false,
                        message: errorMsg,
                        file});
                    break;
                }
            }
            if (valid) {
                for (const file of event.target.files) {
                    this.loadFile(file);
                }
            }
        }
    }

    private processSingleFile(file: any): void {
        const errorMsg = this.validateFileProperties(file);
        if (errorMsg) {
            this.fileLoadComplete.next({
                success: false,
                message: errorMsg,
                file});
        } else {
            const reader = new FileReader();
            this.fileName = file.name;
            this.fileType = file.type;
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (reader?.result) {
                    this.value = reader.result.toString().split(',')[1];
                }
                this.fileLoadComplete.next({success: true, message: '', file});
            };
        }
    }

    public loadFile(file: any): Promise<any> {
        return new Promise<any>((resolve) => {
            const fileData = {name: file.name, type: file.type, data: ''};
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (reader?.result) {
                    fileData.data = reader.result.toString().split(',')[1];
                }
                this.dataFiles.push(fileData);
                this.fileLoadComplete.next({success: true, message: '', file});
                resolve(undefined);
            };
        });
    }

    /**
     * Check the file properties and validate them. Returns the error message or empty string
     */
    private validateFileProperties(file: any): string {
        if (this.fileMaxSize && file.size > this.fileMaxSize * 1048576) {
            return this.langMng.translateTextWithParams('_fixed.fields.errorFileSize', '', this.fileMaxSize.toString());
        }
        if (this.fileAllowedExtensions) {
            const index = file.name.lastIndexOf('.');
            if (index >= 0) {
                const fileExtension = file.name.substring(index + 1).toLowerCase();
                if (this.fileAllowedExtensions.toLowerCase().indexOf(fileExtension) < 0) {
                    return this.langMng.translateTextWithParams('_fixed.fields.errorFileExtension', '', this.fileAllowedExtensions);
                }
            } else {
                return this.langMng.translateTextWithParams('_fixed.fields.errorFileExtension', '', this.fileAllowedExtensions);
            }
        }
        return '';
    }

    /**
     * Returns a Json object containing  the current field context. Oposite to loadFromContext
     */
    public override saveContextInfo(): any {
        const contextInfo = super.saveContextInfo();
        contextInfo.value = null;
        return contextInfo;
    }

    /**
     * Validate the field value
     */
    public override validate(): boolean {
        this.invalid = false;
        this.setValidationMessage('');
        if (this.mandatory && !this.value && this.dataFiles.length === 0) {
            this.setValidationMessage(this.langMng.translateTextWithParams(Field.ERROR_MSG_MANDATORY, '', this.alias));
        }
        return this.invalid;
    }

    /**
     * Add the field value to the list
     * @param argumentsSingleValue Single value argument list
     * @param argumentsMultiple Multi-selecction value argument list
     */
    public override addValuesForExecution(argumentsSingleValue: any[], argumentsMultiple: any[]): number {
        if (this.dataFiles.length > 0) {
            if (this.dataFiles.length === 1) {
                const value = { name: this.getNameInRequest(), value: this.dataFiles[0].data };
                argumentsSingleValue.push(value);
            } else {
                const values: any[] = [];
                for (const file of this.dataFiles) {
                    values.push(file.data);
                }
                const value = { name: this.getNameInRequest(), value: values };
                argumentsMultiple.push(value);
            }
            return this.dataFiles.length;
        } else {
            const value = { name: this.getNameInRequest(), value: this.value };
            argumentsSingleValue.push(value);
            return 1;
        }
    }
}

/**
 * Abstract Class for object-valued service inbound arguments or filter variables
 */
abstract class FieldOV extends Field {
    /** Array of selected instances */
    protected selectedInstances: Instance[] = [];
    /** Allow multi selection or not */
    public allowMultiSelect = false;
    /** It is a list of values */
    public isList = false;

    /**
     * Constructor
     * @param langMng Language manager
     */
    constructor(public override langMng: LanguageMng) { super(langMng); }

    /**
     * Returns the selected instances
     */
    public getSelectedInstances(): Instance[] {
        return this.selectedInstances;
    }

    /**
     * Clean the selected instances
     */
    public cleanSelectedInstances(): void {
        this.selectedInstances = [];
    }

    /**
     * Validate the field value
     */
    public override validate(): boolean {
        this.setValidationMessage('');
        if (this.mandatory && (!this.selectedInstances || this.selectedInstances.length === 0)) {
            this.setValidationMessage(this.langMng.translateTextWithParams(Field.ERROR_MSG_MANDATORY, '', this.alias));
        } else if ( this.editorHasValue() && (!this.selectedInstances || this.selectedInstances.length === 0)) {
            this.setValidationMessage(this.langMng.translateTextWithParams(Field.ERROR_MSG_MANDATORY, '', this.alias));
        } else {
            this.setValidationMessage('');
        }
        return this.invalid;
    }

    protected editorHasValue(): boolean {
        return false;
    }

    /**
     * Clean the field
     */
    public override clean(): void {
        super.clean();
        this.selectedInstances = [];
    }

    /**
     * Add the field value to the list
     * @param argumentsSingleValue Single value argument list
     * @param argumentsMultiple Multi-selecction value argument list
     */
    public override addValuesForExecution(argumentsSingleValue: any[], argumentsMultiple: any[]): number {
        let numberOfOIDs = 1;
        const selInstances = this.getSelectedInstances();
        const argName = this.getNameInRequest();
        if (this.isList) {
            const oidList = [];
            for (const inst of selInstances) {
                oidList.push(inst.oid);
            }
            argumentsSingleValue.push({name: argName, value: oidList});
            numberOfOIDs = 1;
        } else if (selInstances.length === 0) {
            const value: {name: string, value: any} = {name: argName, value: null};
            argumentsSingleValue.push(value);
            numberOfOIDs = 1;
        } else if (selInstances.length === 1) {
            const value = { name: argName, value: selInstances[0].oid };
            argumentsSingleValue.push(value);
            numberOfOIDs = 1;
        } else {
            const oidValues: any[] = [];
            for (const inst of selInstances) {
                oidValues.push(inst.oid);
            }
            const value = { name: argName, value: oidValues };
            argumentsMultiple.push(value);
            numberOfOIDs = selInstances.length;
        }
        return numberOfOIDs;
    }

    /**
     * Returns the single field value
     */
    public override getSingleValue(): any {
        if (this.selectedInstances.length > 0) {
            return this.selectedInstances[0].oid;
        } else {
            return null;
        }
    }

    /**
     * Sets the received oid to the field
     * @param oids Oid
     */
    public setOid(oid: any): void {
        if (oid) {
            const inst: Instance = new Instance();
            inst.oid = oid;
            inst.supplementaryInfo = '';
            inst.jsonOID = JSON.stringify(oid);
            if (!this.allowMultiSelect && !this.isList) {
                this.selectedInstances = [];
                this.value = inst;
                this.selectedInstances.push(inst);
            } else {
                this.selectedInstances.push(inst);
                this.value = this.selectedInstances;
            }
        } else {
            this.selectedInstances = [];
            this.value = null;
        }
    }

    /**
     * Sets the received oids to the field
     * @param oids Oid of the instance or an array of Oids
     */
    public setOids(arg: {} | Array<{}>): void {
        this.selectedInstances = [];
        this.value = null;
        this.addOids(arg);
    }

    /**
     * Add the oids to the field
     * @param oids Oids can be an Oid or an array of Oids
     */
    public addOids(oids: {} | Array<{}>): void {
        if (!oids) {
            return;
        }
        let instance: Instance;
        if (Array.isArray(oids)) {
            if (this.allowMultiSelect || this.isList) {
                for (const oid of oids) {
                    instance = new Instance();
                    instance.oid = oid;
                    instance.supplementaryInfo = '';
                    instance.jsonOID = JSON.stringify(oid);
                    this.selectedInstances.push(instance);
                }
                this.value = this.selectedInstances;
            } else {
                this.selectedInstances = [];
                instance = new Instance();
                instance.oid = oids[0];
                instance.supplementaryInfo = '';
                instance.jsonOID = JSON.stringify(instance.oid);
                this.selectedInstances.push(instance);
                this.value = instance;
            }
        } else {
            if (!this.allowMultiSelect && !this.isList) {
                this.selectedInstances = [];
            }
            instance = new Instance();
            instance.oid = oids;
            instance.supplementaryInfo = '';
            instance.jsonOID = JSON.stringify(oids);
            this.selectedInstances.push(instance);
            this.value = instance;
        }
        this.validate();
    }

    /**
     * Add the instances to the field
     * @param instances It can be an Instance or an array of instances
     */
    public addInstances(instances: Instance | Instance[]): void {
        if (!instances) {
            return;
        }
        if (Array.isArray(instances)) {
            if (this.allowMultiSelect || this.isList) {
                for (const inst of instances) {
                    this.selectedInstances.push(inst);
                }
                this.value = this.selectedInstances;
            } else {
                this.selectedInstances = [];
                this.selectedInstances.push(instances[0]);
                this.value = instances[0];
            }
        } else if (!this.allowMultiSelect && !this.isList) {
            this.selectedInstances = [];
            this.selectedInstances.push(instances);
            this.value = instances;
        } else {
            this.selectedInstances.push(instances);
            this.value = this.selectedInstances;
        }
    }

    /**
     * Returns a Json object containing  the current field context. Oposite to loadFromContext
     */
    public override saveContextInfo(): any {
        const contextInfo = super.saveContextInfo();
        contextInfo.selectedInstances = this.getSelectedInstances();
        return contextInfo;
    }

    /**
     * Initialize properties using the context information. Oposite to saveContextInfo
     */
    public override loadFromContext(contextInfo: any): void {
        super.loadFromContext(contextInfo);
        if (contextInfo) {
            this.selectedInstances = contextInfo.selectedInstances;
        }
    }

    /**
     * Returns the field value to be used as filter variable
     */
    public override getValueForFilter(): any {
        let value;
        if (this.allowMultiSelect || this.isList) {
            value = this.getSelectedInstances();
            if (value && value.length > 0) {
                const oids: any[] = [];
                for (const instance of value) {
                    oids.push(JSON.stringify(instance.oid));
                }
                value = oids;
            } else {
                value = undefined;
            }
        } else {
            value = this.getSingleValue();
        }

        return value;
    }

    /**
     * Sets the value to the field
     * @param newValue New value to be assigned
     */
    public override setValue(newValue: any): void {
        if (newValue === null || newValue === undefined) {
            this.clean();
        } else if (newValue instanceof InstanceCache) {
            this.setOids(newValue.oid);
        } else {
            this.setOids(newValue);
        }
    }

    public completeSelectionForwardExchInfo(exchInfo: ExchangeInfo): void {
        exchInfo.targetClassName = this.dataType;
        exchInfo.targetIUName = 'PIU_Datos';
        exchInfo.multiSelectionAllowed = this.allowMultiSelect ||  this.isList;
        exchInfo.navigationalFilterIdentity = [];
        exchInfo.navigationalFilterVariables = null;

    }

    /**
     * Returns the name to be used in the request
     */
    public override getNameInRequest(): string {
        return this.nameInRequest + '_oid';
    }
}

/**
 * Class for lense type object-valued service inbound arguments or filter variables
 */
export class FieldOVLense extends FieldOV {
    /** Array containing the oid field values */
    public oidFields: any[] = [];
    /** Oid field types */
    public oidFieldsTypes: string[] = [];
    /** If editor for oid fields are enabled or not */
    public editorsEnabled = true;
    /** Supplementary information */
    public supplementaryInfo = '';

    /**
     * Constructor
     * @param langMng Language manager
     */
    constructor(public override langMng: LanguageMng) { super(langMng); }

    /**
     * Clean the field value and oid fields
     */
    public override clean(): void {
        super.clean();
        this.editorsEnabled = true;
        this.supplementaryInfo = '';
        if (this.oidFields) {
            this.oidFields = Array(this.oidFields.length);
        }
    }

    /**
     * Assign the CSS classes
     * @param minSize For minimum size
     */
    public override assignCSS(minSize = false): void {
        const aliasSize = this.alias.length;
        // All oid editors 8 characters
        let editorsSize = this.oidFields.length * 10;
        // Add space for the supplementary information
        editorsSize += 250 / Field.RATIO_PX_CHAR_NORMAL;
        // Add space for buttons
        editorsSize += 75 / Field.RATIO_PX_CHAR_NORMAL;

        if (this.fieldSize !== -1) {
            this.editorCSSClasses.push(this.calculateColCss(this.fieldSize));
        } else if (aliasSize > editorsSize) {
            this.editorCSSClasses.push(this.calculateColCss(aliasSize));
        } else {
            this.editorCSSClasses.push(this.calculateColCss(editorsSize));
        }
    }

    /**
     * Returns a Json object containing  the current field context. Oposite to loadFromContext
     */
    public override saveContextInfo(): any {
        const contextInfo = super.saveContextInfo();
        contextInfo.oidFields = this.oidFields;
        contextInfo.editorsEnabled = this.editorsEnabled;
        contextInfo.supplementaryInfo = this.supplementaryInfo;
        return contextInfo;
    }

    /**
     * Initialize properties using the context information. Oposite to saveContextInfo
     */
    public override loadFromContext(contextInfo: any): void {
        super.loadFromContext(contextInfo);
        if (contextInfo) {
            this.oidFields = contextInfo.oidFields;
            this.editorsEnabled = contextInfo.editorsEnabled;
            this.supplementaryInfo = contextInfo.supplementaryInfo;
        }
    }

    protected override editorHasValue(): boolean {
        for (const editorValue of this.oidFields) {
            if (editorValue !== undefined && editorValue !== null) {
                return true;
            }
        }
        return false;
    }

}

/**
 * Class for lense-search type object-valued service inbound arguments or filter variables
 */
export class FieldOVLenseSearch extends FieldOV {
    /** Search text */
    public text = '';
    /** Last search text */
    public lastText = '';
    /** Search results */
    public searchResults: any = [];

    /**
     * Constructor
     * @param langMng Language manager
     */
    constructor(public override langMng: LanguageMng) { super(langMng); }

    /**
     * Clean the field value
     */
    public override clean(): void {
        super.clean();
        this.text = '';
        this.searchResults = [];
        this.removeCSSClass('noResultsLenseSearch');
    }

    /**
     * Process the selection in the list
     * @param index Selected index
     */
    public processIndexSelected(index: number): void {
        let selectedInstance = null;
        if (index !== -1 && this.searchResults.length > index) {
            selectedInstance = this.searchResults[index];
        }
        // Clean the result list
        this.searchResults = [];
        if (selectedInstance) {
            if (!this.allowMultiSelect && !this.isList) {
                this.selectedInstances = [];
            }
            selectedInstance.oid = JSON.parse(selectedInstance.jsonOID);
            this.selectedInstances.push(selectedInstance);
        }
    }

    /**
     * Sets the text to the field
     */
    public setText(): void {
        if (this.selectedInstances.length > 0) {
            if (this.selectedInstances.length > 1) {
                this.text = this.langMng.translateTextWithParams(
                    LanguageMng.fsNumberInstacesSelected, '', this.selectedInstances.length.toString());
            } else {
                this.text = this.selectedInstances[0].supplementaryInfo;
            }
            this.lastText = this.text;
        } else {
            this.text = '';
        }
    }

    /**
     * Assign the CSS classes
     * @param minSize For minimum size
     */
    public override assignCSS(minSize = false): void {
        const aliasSize = minSize ? 0 : this.alias.length;
        let editorSize = 20;

        if (this.maxLength > 20 && this.maxLength <= 50) {
            editorSize = this.maxLength * 0.7;
        }
        if (this.maxLength <= 20) {
            editorSize = this.maxLength;
        }
        if (this.maxLength > 50) {
            if (minSize) {
                editorSize = 30;
            } else {
                editorSize = this.maxLength * 0.5;
            }
        }

        // Buttons
        editorSize += 9;

        if (this.fieldSize !== -1) {
            this.editorCSSClasses.push(this.calculateColCss(this.fieldSize));
        } else if (aliasSize > editorSize) {
            this.editorCSSClasses.push(this.calculateColCss(aliasSize));
        } else {
            this.editorCSSClasses.push(this.calculateColCss(editorSize));
        }
    }

    /**
     * Returns a Json object containing  the current field context. Oposite to loadFromContext
     */
    public override saveContextInfo(): any {
        const contextInfo = super.saveContextInfo();
        contextInfo.text = this.text;
        return contextInfo;
    }

    /**
     * Initialize properties using the context information. Oposite to saveContextInfo
     */
    public override loadFromContext(contextInfo: any): void {
        super.loadFromContext(contextInfo);
        if (contextInfo) {
            this.text = contextInfo.text;
        }
    }

    protected override editorHasValue(): boolean {
        if (this.text !== undefined && this.text !== null && this.text !== '') {
            return true;
        }
        return false;
    }

}

/**
 * Class for preload type object-valued service inbound arguments or filter variables
 */
export class FieldOVPreload extends FieldOV {
    /** Preload values */
    public preloadValues: any[] = [];
    /** Assigned value. Used for managing fields with navigational filtering */
    private possibleValue: any;

    /**
     * Constructor
     * @param langMng Language manager
     */
    constructor(public override langMng: LanguageMng) { super(langMng); }

    /**
     * Validate the field value
     */
    public override validate(): boolean {
        if (this.mandatory && !this.value) {
            this.setValidationMessage(this.langMng.translateTextWithParams(Field.ERROR_MSG_MANDATORY, '', this.alias));
        } else {
            this.setValidationMessage('');
        }
        return this.invalid;
    }

    /**
     * Returns the selected instances
     */
    public override getSelectedInstances(): Instance[] {
        if (this.value) {
            if (Array.isArray(this.value)) {
                this.selectedInstances = this.value;
            } else {
                this.selectedInstances = [this.value];
            }
        } else {
            this.selectedInstances = [];
        }
        return super.getSelectedInstances();
    }

    /**
     * Return an array containing the preload values
     */
    public getPreloadInstances(): Instance[] {
        const preloadInstances: Instance[] = [];
        for (const preloadValue of this.preloadValues) {
            preloadInstances.push(preloadValue.value);
        }
        return preloadInstances;
    }

    /**
     * Sets the preload values
     * @param queryResults Query results
     */
    public loadPreload(queryResults: any): void {
        this.preloadValues = [];
        if (!this.allowMultiSelect && !this.isList) {
            this.preloadValues.push({ label: '', value: '' });
        }
        queryResults.forEach((element: any) => {
            const instance: Instance = new Instance();
            instance.oid = JSON.parse(element.jsonOID);
            instance.supplementaryInfo = element.supplementaryInfo;
            instance.jsonOID = element.jsonOID;
            this.preloadValues.push({ label: instance.supplementaryInfo, value: instance });
        });
        if (this.possibleValue && this.preloadValues.length > 0) {
            this.setValue(this.possibleValue);
            this.possibleValue = null;
        }
    }

    /**
     * Clean the preload values
     */
    public cleanPreload(): void {
        if (this.preloadValues && this.preloadValues.length > 0) {
            this.possibleValue = null;
        }
        this.preloadValues = [];
        this.selectedInstances = [];
        this.value = null;
        this.setExistingValue(null);
    }

    /**
     * Sets the value to the preload element
     */
    private setExistingValue(oid: any): void {
        // Check if the received value exists in the preload list
        for (const item of this.preloadValues) {
            if (item.value.jsonOID === JSON.stringify(oid)) {
                if (this.allowMultiSelect || this.isList) {
                    this.selectedInstances.push(item.value);
                    this.value = this.selectedInstances;
                } else {
                    this.value = item.value;
                    this.selectedInstances.push(item.value);
                }
                break;
            }
        }
    }

    /**
     * Sets the value to the field
     * @param newValue New value to be assigned
     */
    public override setValue(newValue: any): void {
        this.selectedInstances = [];
        this.value = null;
        if (newValue) {
            // Particular case, when values is assigned but population is not still loaded
            this.possibleValue = newValue;
            if (Array.isArray(newValue)) {
                if (newValue[0] instanceof Instance) {
                    this.addInstances(newValue);
                } else if (newValue instanceof InstanceCache) {
                    this.setOids(newValue.oid);
                } else {
                    this.setOids(newValue);
                }
            } else {
                if (newValue instanceof Instance) {
                    this.addInstances(newValue);
                } else if (newValue instanceof InstanceCache) {
                    this.setExistingValue(newValue.oid);
                } else {
                    this.setExistingValue(newValue);
                }
            }
        }
    }

    /**
     * Add the oids to the field
     * @param oids Oids can be an Oid or an array of Oids
     */
    public override setOids(oids: {} | Array<{}>): void {
        this.selectedInstances = [];
        this.value = null;
        if (oids) {
            if (Array.isArray(oids)) {
                for (const oid of oids) {
                    this.setExistingValue(oid);
                }
            } else {
                this.setExistingValue(oids);
            }
        }
    }

    /**
     * Assign the CSS classes
     * @param minSize For minimum size
     */
    public override assignCSS(minSize = false): void {
        const aliasSize = minSize ? 0 : this.alias.length;

        // By default
        let editorSize = 20;
        if (this.maxLength <= 20) {
            editorSize = this.maxLength;
        }
        if (this.maxLength > 20 && this.maxLength <= 50) {
            editorSize = this.maxLength * 0.7;
        }
        if (this.maxLength > 50) {
            if (minSize) {
                editorSize = 30;
            } else {
                editorSize = this.maxLength * 0.5;
            }
        }
        editorSize += 4;

        if (this.fieldSize !== -1) {
            this.editorCSSClasses.push(this.calculateColCss(this.fieldSize));
        } else if (aliasSize > editorSize) {
            this.editorCSSClasses.push(this.calculateColCss(aliasSize));
        } else {
            this.editorCSSClasses.push(this.calculateColCss(editorSize));
        }
    }

    /**
     * Returns the single field value
     */
    public override getSingleValue(): any {
        if (this.value) {
            if (Array.isArray(this.value)) {
                if (this.value.length > 0) {
                    return this.value[0].oid;
                } else {
                    return null; 
                }
            } else {
                return this.value.oid;
            }
        } else {
            return this.possibleValue ?? null;
        }
    }

    /**
     * Add the field value to the list
     * @param argumentsSingleValue Single value argument list
     * @param argumentsMultiple Multi-selecction value argument list
     */
    public override addValuesForExecution(argumentsSingleValue: any[], argumentsMultiple: any[]): number {
        let numberOfOIDs = 1;
        const selInstances = this.getSelectedInstances();
        const argName = this.getNameInRequest();
        if (this.isList) {
            const oidList = [];
            for (const inst of selInstances) {
                oidList.push(JSON.stringify(inst.oid));
            }
            argumentsSingleValue.push({name: argName, value: oidList});
            numberOfOIDs = 1;
        } else {
            if (selInstances.length === 0) {
                const argValue: {name: string, value: any} = {name: argName, value: null};
                argumentsSingleValue.push(argValue);
                numberOfOIDs = 1;
            } else if (selInstances.length === 1) {
                const value = { name: argName, value: JSON.stringify(selInstances[0].oid) };
                argumentsSingleValue.push(value);
                numberOfOIDs = 1;
            } else {
                const oidValues: any[] = [];
                for (const inst of selInstances) {
                    oidValues.push(JSON.stringify(inst.oid));
                }
                const value = { name: argName, value: oidValues };
                argumentsMultiple.push(value);
                numberOfOIDs = selInstances.length;
            }
        }
        return numberOfOIDs;
    }
    /**
     * Returns a Json object containing  the current field context. Oposite to loadFromContext
     */
    public override saveContextInfo(): any {
        const contextInfo = super.saveContextInfo();
        contextInfo.preloadValues = this.preloadValues;
        return contextInfo;
    }

    /**
     * Initialize properties using the context information. Oposite to saveContextInfo
     */
    public override loadFromContext(contextInfo: any): void {
        if (contextInfo) {
            this.preloadValues = contextInfo.preloadValues;
        }
        super.loadFromContext(contextInfo);
    }

    /**
     * Returns the name to be used in the request
     */
    public override getNameInRequest(): string {
        return this.nameInRequest + '_json';
    }
}

/**
 * Abstract Class for any scenario
 */
export abstract class AbstractIU {

    /** Scenario type */
    public scenarioType = '';
    /** Scenario title */
    public title = '';
    /** Definition Class name */
    public className = '';
    /** Definition Interaction unit name */
    public iuName = '';
    /** Interaction unit unique id xml from model */
    public idXML = '';
    /** Indicates if the interaction unit is visible or not */
    public visible = true;
    /** Indicates if the connected user has permission over the scenario */
    public userIsAgent = true;
    /** Interaction unit identification when it is part of a master-detail */
    public iuId = '';
    /** Interaction unit order in a master-detail */
    public order = 0;
    /** Number of pending independent preloads */
    public numberOfPendingPreload = 0;
    /** CSS classes to be assigned to the scenario */
    public cssClasses = '';
    /** Custom options from model */
    public customOptions = '';
    /** Block IU using wait dialog */
    public showWait = false;
    constructor(protected appGlobalInfo: AppGlobalInfo,
                protected util: Util,
                protected changeDetectorRef: ChangeDetectorRef) {
    }
    /**
     * Process the scenario cancel button
     */
    public processCancel(lastExecutionSuccess = false): void {
        this.util.navigateToPrevious(lastExecutionSuccess);
    }

    /**
     * Sets the visibility of the user
     * @param isVisible Set True, if the scenario is visible to the user
     */
    public setUserVisibility(isVisible: boolean): void {
        this.visible = isVisible;
        this.userIsAgent = isVisible;
    }

    /**
     * Process the initial actions
     */
    public myngOnInit(): void {
        if (!this.visible) {
            this.util.navigateToNoAccessPage();
        } else {
            this.initialize();
        }
        // Set the title
        if (this.util.modalForIUResponse.observers.length <= 1) {
            this.appGlobalInfo.setScenarioTitle(this.title);
        }
    }

    /* Abstract methods to be implemented in derived classes */

    /**
     * Initalize the scenario
     */
    public initialize(): void {
        // Empty method
    }

    /* Abstract methods to be implemented in derived classes */

    /**
     * Returns the scenario context information
     */
    public getContext(): any {
        return undefined;
    }

    /**
     * Returns the context of the global scenario
     */
    public getGlobalContext(): any {
        return undefined;
    }

    /**
     * Assign a new context to the scenario
     * @param newContext New context to be assigned
     * @param fromContextType Context type that sets the new context
     */
    public setContext(newContext: any, fromContextType: string): void {
        // Empty method
    }

    /**
     * Save the scenario context information. Oposite to loadFromContext
     */
    public saveContextInfo(): void {
        // Empty method
    }

    /**
     * Initialize the scenario using the context information. Oposite to saveContextInfo
     */
    public loadFromContext(): void {
        // Empty method
    }

    /**
     * Returns true if component can be deactivated. It means that the user can navigate to another scenario.
     * Override this function in an specific component to prevent that the user abandon the scenario
     */
    public canBeDeactivated(): boolean {
        return true;
    }

    public setCustomOptions(options: string): void {
        this.customOptions = options;
        if (this.customOptions && this.customOptions.toLowerCase().indexOf('cssdsnoshow') >= 0) {
            this.cssClasses += ' displaySetNoShow';
        }
    }

    public setShowWait(value: boolean): void {
        this.showWait = value;
        this.changeDetectorRef.markForCheck();
    }
}
