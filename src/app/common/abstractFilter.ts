import { ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from './app.utils';
import { Field, FieldOVLenseSearch, FieldOVPreload } from './baseIUElements';
import { CacheDependencyRules } from './app.cachedependencyrules';
import { ExchangeInfo } from './app.exchangeinfo';
import { Subject } from 'rxjs';
import { AbstractPIU } from './abstractPIU';
import { AbstractFilterIU } from './abstractFIU';

/**
 * Abstract class for Filter components
 */
export abstract class AbstractFilter {

    /** Filer name */
    public filterName = '';
    /** Filter title */
    public title = '';
    /** Filter index */
    public index = 0;
    /** Assigned order criteria */
    public assignedOrderCriteria = '';
    /** Filter variables */
    public variables: Field[] = [];
    /** Search action subject */
    public searchAction: Subject<void> = new Subject<void>();
    /** Filter context information */
    public context: { index: number, variables: any[] } = { index: 0, variables: [] };
    /** Scenario cache dependency rules */
    public cacheDependencyRules: CacheDependencyRules;
    /** List of functions to be executed is sequence */
    public pendingDependencyRules: string[] = [];
    /** Population scenario container */
    public populationContainer: AbstractPIU | AbstractFilterIU | null = null;

    /** Timer for lense search */
    private lenseSearchTimer: any;
    /** On change method for pending lense search */
    private lenseSearchMethodName = '';
    /** Indicates that the filter is ready */
    public initialized = false;

    constructor(protected appGlobalInfo: AppGlobalInfo,
                protected util: Util,
                protected changeDetectorRef: ChangeDetectorRef) {
        this.cacheDependencyRules = new CacheDependencyRules(this.appGlobalInfo, this.util);
    }

    /**
     * Save the scenario context information. Oposite to loadFromContext
     */
    public saveContextInfo(): void {
        this.context.index = this.index;
        this.context.variables = [];
        for (const field of this.variables) {
            this.context.variables.push(field.saveContextInfo());
        }
    }

    /**
     * Initialize the scenario using the context information. Oposite to saveContextInfo
     */
    public loadFromContext(): void {
        this.index = this.context.index;
        if (this.variables.length === this.context.variables.length) {
            for (let i = 0; i < this.variables.length; i++) {
                this.variables[i].loadFromContext(this.context.variables[i]);
            }
        }
        this.initialized = true;
    }

    public getContextInfo(): {} {
        this.saveContextInfo();
        return this.context;
    }

    public setContextInfo(context: any): void {
        this.context = context;
        this.loadFromContext();
    }

    /**
     * Initalize the general service scenario
     */
    public initialize(): void {
        this.initializeComponents();
    }

    /**
     * Initialize with default values
     */
    public initializeDefaultValues(): void {
        this.initialized = true;
    }

    /**
     * Process the selection backard navigation. By default, do nothing.
     */
    public processSelectionBackward(exchInfo: ExchangeInfo): void {
        // Empty method
    }

    /**
     * Create the scenario components. By default, do nothing
     */
    public initializeComponents(): void {
        // Empty method
    }

    /**
     * Initialize the scenario components using the context information. By default, do nothing
     */
    public initializeFromContext(): void {
        // Empty method
    }

    /**
     * Execute the next dependency rule
     */
    public executePendingDependencyRules(): void {
        if (this.pendingDependencyRules.length > 0) {
            const func: any = this[this.pendingDependencyRules.shift() as keyof AbstractFilter];
            if (func) {
                func.apply(this, []);
            }

        }
    }

    /**
     * Validate the input fields values. Check mandatory and datatype
     */
    public validateInputFields(): boolean {
        let result = true;
        for (const field of this.variables) {
            field.invalid = false;
            if (field.validate()) {
                result = false;
            }
        }
        return result;
    }

    /**
     * Remove all validation messages in the input fields
     */
    public clearValidationMessages(): void {
        for (const v of this.variables) {
            v.setValidationMessage('');
        }
    }

    /**
     * Execute the lense search query
     * @param filterVar Lense search filter variable
     * @param className Class name
     * @param filterName Filter name
     * @param navFilters Navigational filter names
     */
    public executeLenseSearch(filterVar: FieldOVLenseSearch, className: string, filterName: string, navFilters: string[]): void {
        const textToSearch = filterVar.text;
        if (textToSearch && textToSearch !== '') {

            this.util.searchLenseSearch(className, filterName, textToSearch, navFilters, this.getNavigationFilterVariables()).then(
                (response: any) => {
                    filterVar.searchResults = response.results;
                    this.changeDetectorRef.markForCheck();
                },
                (response: any) => {
                    this.util.addErrorMessage(response.message);
                    this.changeDetectorRef.markForCheck();
                });
        } else {
            filterVar.searchResults = [];
            filterVar.setText();
        }
    }

    /**
     * Execute a search preload query and load de results in the field
     * @param filterVar Preload field
     * @param className Class name
     * @param filterName Preload filter name
     * @param ordCriteria Order criteria name
     * @param navFilters Navigational filter names
     */
    public executeSearchPreload(filterVar: FieldOVPreload, className: string, filterName: string, ordCriteria: string,
                                navFilters: string[]): void {
        this.util.searchPreload(className, filterName, navFilters, this.getNavigationFilterVariables(), ordCriteria).then(
            (successResponse: any) => {
                filterVar.loadPreload(successResponse.results);
                this.changeDetectorRef.markForCheck();
            },
            (errorResponse: any) => {
                this.util.addErrorMessage(errorResponse.resultDescription);
                this.changeDetectorRef.markForCheck();
            }
        );
    }

    /**
     * Sets the suplementary information to the input field
     * @param filterVar Input field
     * @param className Class name
     * @param attributeNames Attribute names
     */
    public setSuplementaryInformationToField(filterVar: FieldOVLenseSearch, className: string, attributeNames: string): void {
        let numberMissingSupInfo = 0;
        filterVar.getSelectedInstances().forEach((instanceValue) => {
            if (!instanceValue.supplementaryInfo || instanceValue.supplementaryInfo === '') {
                numberMissingSupInfo++;
                this.cacheDependencyRules.addQueryInstance(className, instanceValue.oid, attributeNames);
            }
        });

        if (numberMissingSupInfo === 0) {
            filterVar.setText();
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        } else {
            this.cacheDependencyRules.searchAll().then(() => {
                filterVar.getSelectedInstances().forEach((instanceValue) => {
                    if (!instanceValue.supplementaryInfo || instanceValue.supplementaryInfo === '') {
                        instanceValue.supplementaryInfo = this.cacheDependencyRules.getText(className, instanceValue.oid, attributeNames);
                    }
                });

                filterVar.setText();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            });
        }
    }

    public loadPreload(): void {
        // Empty method
    }

    /**
     * Notify the search action
     */
    public search(): void {
        if (this.validateInputFields()) {
            this.searchAction.next();
        }
    }

    /**
     * Clean values of  variables
     */
    public clean(): void {
        for (const v of this.variables) {
            v.clean();
        }
    }

    /**
     * Checks if the filter can be executed or not
     */
    public canBeExecuted(): boolean {
        let canExe = true;
        for (const v of this.variables) {
            if (v.visible && v.mandatory && this.util.isNull(v.value)) {
                canExe = false;
                break;
            }
        }
        return canExe;
    }

    /**
     * Returns the query filter information
     */
    public getFilterData(): {} {

        const filterData: {name: string, variables: any[]} = {name: '', variables: []};
        filterData.name  = this.filterName;
        const vars = [];

        for (const v of this.variables) {
            const varData: {name: string, value: any} = {name: v.nameInRequest, value: null};
            const value = v.getValueForFilter();
            if (!this.util.isNull(value)) {
                varData.value = value;
            }
            vars.push(varData);
        }
        filterData.variables = vars;

        return filterData;
    }

    /**
     * Returns the navigational filter variables
     */
    public getNavigationFilterVariables(): any {
        const filterVar = [];
        for (const field of this.variables) {
            if (field.nameInRequest.endsWith('_oid')) {
                filterVar.push({ name: field.nameInRequest.replace('_oid', ''), value: field.getSingleValue() });
            } else {
                filterVar.push({ name: field.nameInRequest, value: field.getSingleValue() });
            }
        }
        return filterVar;
    }

    /**
     * Manages the keypress event in a lense search
     * @param onchangeMethodName Method name
     */
    public onKeypressLenseSearch(onchangeMethodName: string): void {
        if (this.lenseSearchTimer) {
            window.clearTimeout(this.lenseSearchTimer);
        }
        this.lenseSearchMethodName = onchangeMethodName;
        this.lenseSearchTimer = window.setTimeout(() => {
            this.lenseSearchTimer = undefined;
            const func: any = this[this.lenseSearchMethodName as keyof AbstractFilter];
            if (func) {
                func.apply(this, []);
            }
        }, 1000);
    }

    /**
     * Returns the selection forward exchange information for a filtar variable
     */
    protected getSelectionForwardExchInfo(): ExchangeInfo {
        this.clearValidationMessages();
        this.saveContextInfo();
        // Create the exchange information
        const exchInfo = new ExchangeInfo();
        exchInfo.exchangeType = 'SelectionForward';
        exchInfo.originServiceName = this.filterName;
        if (this.populationContainer) {
            this.populationContainer.saveContextInfo();
            exchInfo.previous = this.populationContainer.getContext();
            exchInfo.comeBackContext = this.populationContainer.getGlobalContext();
            exchInfo.originIUIdentification = this.populationContainer.iuId;
        }
        return exchInfo;
    }

}
