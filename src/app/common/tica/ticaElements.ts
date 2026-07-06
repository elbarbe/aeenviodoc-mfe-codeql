import { Field } from '../baseIUElements';
import { LanguageMng } from '../languageMng';
import { GridColumnType } from '../abstractPIU';
import { ExchangeInfo } from '../app.exchangeinfo';

/**
 * « Interface for TICA graphical components »
 */
export interface TICAComponentInterface {
    /* Information about the columns */
    fieldTICA: FieldTICA;
    gridColumns: TICAGridColumn[];
    gridSelectedRows: any;
    initializeComponents(): void;
    getContext(): any;
    setContext(newContext: any, fromContextType: string): void;
    saveLocalContextInfo(): any;
    loadLocalFromContext(): void;
    processSelectionBackward(exchInfo: ExchangeInfo): void;
    editRowById(lineId: string): void;
    deleteRowByIndex(index: number): void;
    validateInputFields(): boolean;
    cleanArgumentValues(): void;
    getInstanceValues(): any[];
    setValuesToFields(row: any): void;
    setSuppInfoValues(): void;
}

/**
 * Columns details
 */
export interface TICAGridColumn {
    field: string;
    header: string;
    styleClass: string;
    type: GridColumnType;
    mask: string;
    options: any;
    width: number;
    applyWidth: boolean;
}

/**
 * Transient instance creation arguments
 */
export class FieldTICA extends Field {

    /** Component to manages the inbound arguments */
    private ticaComponent: TICAComponentInterface | null = null;
    /** It is a list of values */
    public isList = false;
    /** Pending context to be applied to the component */
    private pendingContext: any;
    /** Pending selection backward to be applied to the component */
    public pendingSelectionBackward: ExchangeInfo | null = null;
    /** Pending value be applied to the component */
    private pendingValue: any;

    /**
     * Constructor
     * @param langMng Language manager
     */
    constructor(public override langMng: LanguageMng) { super(langMng); }

    /**
     * Sets the TICA component to the field
     * @param ticaComp Component
     */
    public setTicaComponent(ticaComp: TICAComponentInterface): void {
        this.ticaComponent = ticaComp;
        if (this.pendingContext) {
            this.ticaComponent.setContext(this.pendingContext, '');
            this.ticaComponent.loadLocalFromContext();
            this.pendingContext = null;
        }
        if (this.pendingSelectionBackward) {
            this.ticaComponent.processSelectionBackward(this.pendingSelectionBackward);
            this.pendingSelectionBackward = null;
        }
        if (this.pendingValue) {
            this.ticaComponent.setValuesToFields(this.pendingValue);
            this.pendingValue = null;
        }
        if (this.value && this.value.length > 0) {
            this.ticaComponent.setSuppInfoValues();
        }
    }


    /**
     * Returns the TICA component
     */
    public getTicaComponent(): TICAComponentInterface | null {
        return this.ticaComponent;
    }

    /**
     * Add the field value to the list
     * @param argumentsSingleValue Single value argument list
     * @param argumentsMultiple Multi-selecction value argument list
     */
    public override addValuesForExecution(argumentsSingleValue: any[], argumentsMultiple: any[]): number {
        const argValue: { name: string, value: any } = { name: this.getNameInRequest(), value: this.getSingleValue() };
        argumentsSingleValue.push(argValue);
        return 1;
    }

    /**
     * Returns a Json object containing  the current field context. Oposite to loadFromContext
     */
    public override saveContextInfo(): any {
        const contextInfo = super.saveContextInfo();
        if (this.ticaComponent) {
            this.ticaComponent.saveLocalContextInfo();
            contextInfo.ticaArguments = this.ticaComponent.getContext();
        }
        return contextInfo;
    }

    /**
     * Initialize properties using the context information. Oposite to saveContextInfo
     */
    public override loadFromContext(contextInfo: any): void {
        if (contextInfo) {
            super.loadFromContext(contextInfo);
            if (this.ticaComponent) {
                this.ticaComponent.setContext(contextInfo.ticaArguments, '');
                this.ticaComponent.loadLocalFromContext();
            } else {
                this.pendingContext = contextInfo.ticaArguments;
            }
        }
    }

    /**
     * Validate the field value
     */
    public override validate(): boolean {
        this.invalid = false;
        this.setValidationMessage('');
        if (this.isList) {
            if (this.mandatory && !(this.value && this.value.length > 0)) {
                this.setValidationMessage(this.langMng.translateTextWithParams(Field.ERROR_MSG_MANDATORY, '', this.alias));
                this.invalid = true;
                this.assignInvalidCSS();
                return true;
            }
        } else if (this.ticaComponent) {
            return !this.ticaComponent.validateInputFields();
        }
        return this.invalid;
    }

    /**
     * Sets the value to the field
     * @param newValue New value to be assigned
     */
    public override setValue(newValue: any): void {

        if (newValue) {
            if (this.isList) {
                this.value = [];
                let cont = 1;
                for (const row of newValue) {
                    row._rowId = cont++;
                    this.value.push(row);
                }
                if (this.ticaComponent) {
                    this.ticaComponent.setSuppInfoValues();
                }
            } else if (this.ticaComponent) {
                this.ticaComponent.setValuesToFields(newValue);
            } else {
                this.pendingValue = newValue;
            }
        }
    }

    /**
     * Returns the single field value
     */
    public override getSingleValue(): any {
        if (this.isList) {
            return this.value;
        } else if (this.ticaComponent) {
            return this.ticaComponent.getInstanceValues();
        }
    }

    /**
     * Assign the CSS classes
     * @param minSize For minimum size
     */
    public override assignCSS(minSize = false): void {
        // Empty method
    }

    /**
     * Clean the field
     */
    public override clean(): void {
        if (this.ticaComponent) {
            this.ticaComponent.cleanArgumentValues();
        }
    }

    /**
     * Returns the complete path of nested TICA components
     * @param ticaComponent TICA component
     */
    public getTicaPath(ticaComponent: any): string {
        let path = '';
        if (ticaComponent?.fieldTICA) {
            path = '|' + ticaComponent.fieldTICA.nameInRequest;
            const partialPath = this.getTicaPath(ticaComponent.containerSIU);
            if (partialPath) {
                path += partialPath;
            }
        }

        return path;
    }
}

