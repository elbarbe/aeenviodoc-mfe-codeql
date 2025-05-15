import { ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { CacheDependencyRules, InstanceCache } from './app.cachedependencyrules';
import { ExchangeInfo } from './app.exchangeinfo';
import { Util } from './app.utils';
import { AbstractIU, Field, FieldOVLense, FieldOVLenseSearch, FieldOVPreload } from './baseIUElements';
import { ConditionalNavigationMng } from './conditionalNavigationMng';
import { AbstractQueryIU } from './queryIUElements';
import { Subscription } from 'rxjs';
import { ErrorInformation } from './answerRequestInformation';

/**
 * Abstract class for Service components
 */
export abstract class AbstractServiceIU extends AbstractIU {

    /** Definition Interaction unit name */
    public serviceName = '';
    /** Scenario fields */
    public fields: Field[] = [];

    /** Service context information */
    public context: { fields: any[], exchangeInfo: ExchangeInfo | null } = { fields: [], exchangeInfo: null };

    /** Scenario cache dependency rules */
    public cacheDependencyRules: CacheDependencyRules;

    /** List of functions to be executed is sequence */
    public pendingDependencyRules: string[] = [];

    /** Counters for service execution */
    private executionsCount = 0;
    private totalExecutions = 0;
    private totalErrors = 0;
    private errorList: string[] = [];
    /** Execute service with multi selection in parallel or serialized */
    public executeMultiSelectionInParallel = false;

    /** Query container, if it is an associated service */
    public queryContainer: AbstractQueryIU | null = null;

    /** Timer for lense search */
    private lenseSearchTimer: any;
    /** On chenge method for pending lense search */
    private lenseSearchMethodName = '';

    /** Number of calls to the back-end during the scenario loading */
    private asyncCallsInLoadingCounter = 0;
    /** Timer for back end calls */
    private asyncCallTimer: any;
    /** Period for the back end calls timer. In milliseconds */
    public asyncCallTimerPeriod = 3000;
    /** Indicates loading phase */
    private inLoadingProcess = true;
    /** Indicates execute service directly without showing the scenario */
    public noShow = false;
    /** Service requests array */
    private serviceRequests: any[] = [];
    /** Progress bar subscription to manage the cancel */
    protected progressBarSubscription: Subscription | null = null;

    constructor(protected override appGlobalInfo: AppGlobalInfo,
                protected override util: Util,
                protected override changeDetectorRef: ChangeDetectorRef,
                protected condNavMng: ConditionalNavigationMng) {
        super(appGlobalInfo, util, changeDetectorRef);
        this.cacheDependencyRules = new CacheDependencyRules(this.appGlobalInfo, this.util);
        this.scenarioType = 'SIU';
    }

    /**
     * Returns the scenario context information
     */
    public override getContext(): any {
        return this.context;
    }

    /**
     * Sets the scenario context information
     */
    public override setContext(context: any): void {
        this.context = context;
    }

    /**
     * Returns the context of the global scenario
     */
    public override getGlobalContext(): any {
        if (this.queryContainer) {
            return this.queryContainer.getGlobalContext();
        }
        return this.context;
    }

    /**
     * Save the scenario context information. Oposite to loadFromContext
     */
    public override saveContextInfo(): void {
        this.saveLocalContextInfo();
    }

    /**
     * Save the local scenario context information. Oposite to loadFromContext
     */
    public saveLocalContextInfo(): void {
        if (this.queryContainer) {
            this.queryContainer.saveContextInfo();
        }
        this.context.fields = [];
        for (const field of this.fields) {
            this.context.fields.push(field.saveContextInfo());
        }
    }

    /**
     * Initialize the scenario using the context information. Oposite to saveContextInfo
     */
    public override loadFromContext(): void {
        this.loadLocalFromContext();
    }

    /**
     * Initialize the scenario using the context information. Oposite to saveContextInfo
     */
    public loadLocalFromContext(): void {
        if (this.fields.length <= this.context.fields.length) {
            for (let i = 0; i < this.fields.length; i++) {
                this.fields[i].loadFromContext(this.context.fields[i]);
            }
        }
    }

    /**
     * Initalize the general service scenario
     */
    public override initialize(): void {
        // Get the exchange information
        const exchInfo: ExchangeInfo = this.appGlobalInfo.appExchangeInfo.getExchangeInfoForScenario(this.className, this.iuName);
        // Scenario context information
        // Check Selection Backward case
        this.initializeComponents();
        if (exchInfo.exchangeType === 'SelectionBackward') {
            // Set the original context to the controller
            this.context = exchInfo.previous;
            this.loadFromContext();
            this.setShowWait(false);
            this.processSelectionBackward(exchInfo);
            this.appGlobalInfo.appExchangeInfo.save(exchInfo.previous.exchangeInfo)
        } else {
            this.initializeFromExchangeInfo(exchInfo);
        }
    }

    /**
     * Default initialiation using the exchange information received
     * @param exchInfo Exchange Information
     */
    public initializeFromExchangeInfo(exchInfo: ExchangeInfo): void {
        // If the scenario is visible, hides it until all calls to the back end have been answered
        if (this.userIsAgent && this.visible) {
            this.visible = false;
        }
        this.context.exchangeInfo = exchInfo;
        this.loadPreload();
        // Load from context
        this.initializeFromContext();
    }

    /**
     * Notifies a newcall to the backend
     */
    public notifyCallToTheBackEnd(): void {
        this.asyncCallsInLoadingCounter++;
        this.checkWaitStatus();
        if (this.inLoadingProcess) {
            if (this.asyncCallTimer) {
                window.clearTimeout(this.asyncCallTimer);
            }
            this.asyncCallTimer = window.setTimeout(() => {
                this.asyncCallTimer = undefined;
                this.notifyAnswerFromToTheBackEnd();
            }, this.asyncCallTimerPeriod);
        }
    }

    /**
     * Notifies a new answer from the backend
     */
    public notifyAnswerFromToTheBackEnd(): void {
        if (this.asyncCallsInLoadingCounter > 0) {
            this.asyncCallsInLoadingCounter--;
        }
        this.checkWaitStatus();
        if (this.userIsAgent) {
            // Clear the timer
            if (this.asyncCallTimer) {
                window.clearTimeout(this.asyncCallTimer);
            }
            if (this.asyncCallsInLoadingCounter <= 0) {
                if (!this.noShow) {
                    this.visible = true;
                } else {
                    this.visible = false;
                    this.saveChanges();
                }
                this.changeDetectorRef.markForCheck();
            } else if (this.inLoadingProcess) {
                // Set timer again
                this.asyncCallTimer = window.setTimeout(() => {
                    this.asyncCallTimer = undefined;
                    this.notifyAnswerFromToTheBackEnd();
                }, this.asyncCallTimerPeriod);
            }
        }
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
     * Initialize the scenario components using the context information.
     */
    public initializeFromContext(): void {
        if (!this.context.exchangeInfo) {
            return;
        }
        
        if (this.numberOfPendingPreload === 0) {
            this.initializeDefaultValues().then( () => {
                this.initializeFromCtxArgumentThis();
                this.initializeFromCtxRelated();
                this.initializeFromCtxCondNav();
                this.initializeFromCtxAnyInStack();

                // Loading phase finishs in this point
                this.inLoadingProcess = false;
                // If no pending answers from the back end, shows the scenario
                if (this.userIsAgent && this.asyncCallsInLoadingCounter === 0) {
                    if (this.noShow) {
                        this.saveChanges();
                    } else {
                        this.visible = true;
                        this.setShowWait(false);
                        this.changeDetectorRef.markForCheck();
                    }
                }
            });
        }
    }

    /**
     * Initialize with default values. By default, do nothing
     */
    public initializeDefaultValues(): Promise<void> {
        return Promise.resolve();
    }

    /**
     * Initialize from context the 'This' argument. By default, do nothing
     */
    public initializeFromCtxArgumentThis(): void {
        // Empty method
    }

    /**
     * Initialize arguments from context that identify a Role. By default, do nothing
     */
    public initializeFromCtxRelated(): void {
        // Empty method
    }

    /**
     * Initialize arguments from conditional navigation or custom
     */
    public initializeFromCtxCondNav(): void {
        for (const arg of this.fields) {
            if (this.context?.exchangeInfo?.customData[arg.nameInRequest]) {
                arg.setValue(this.context.exchangeInfo.customData[arg.nameInRequest]);
                const methodName = this.getDependencyRuleMethodName(arg.nameInRequest);
                const func: any = this[methodName as keyof AbstractServiceIU];
                if (func) {
                    func.apply(this, ['SetValue', true]);
                }
            }
        }
    }


    /**
     * Initialize object-valued arguments from any instance in the context stack
     */
    public initializeFromCtxAnyInStack(): void {
        let oids: any[];
        let methodName: string;
        for (const arg of this.fields) {
            if (!arg.value && this.context?.exchangeInfo) {
                oids = this.context.exchangeInfo.getOidsOfClass(arg.dataType);
                if (oids?.length > 0) {
                    arg.setValue(oids);
                    methodName = this.getDependencyRuleMethodName(arg.nameInRequest);
                    const func: any = this[methodName as keyof AbstractServiceIU];
                    if (func) {
                        func.apply(this, ['SetValue', true]);
                    }
                }
            }
        }
    }

    /**
     * Returns the name of the method that resolves the argument dependency rules
     * @param argName Argument name
     */
    private getDependencyRuleMethodName(argName: string): string {
        return 'executeDependecyRules' + argName.replace(new RegExp('[_]', 'g'), 'u');
    }

    /**
     * Execute the next dependency rule
     */
    public executePendingDependencyRules(): void {
        if (this.pendingDependencyRules.length > 0) {
            const methodName = this.pendingDependencyRules.shift();
            const func: any = this[methodName as keyof AbstractServiceIU];
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
        for (const field of this.fields) {
            field.invalid = false;
            if (field.validate()) {
                result = false;
                if (!field.visible) {
                    this.util.showToastMessage(field.validationMessage);
                }
            }
        }
        this.changeDetectorRef.markForCheck();
        return result;
    }

    /**
     * Remove all validation messages in the input fields
     */
    public clearValidationMessages(): void {
        for (const arg of this.fields) {
            arg.setValidationMessage('');
        }
    }

    /**
     * Clean all input fields
     */
    public cleanArgumentValues(): void {
        for (const arg of this.fields) {
            arg.clean();
        }
    }

    /**
     * Load the independent preload fields
     */
    public loadPreload(): void {
        // Empty method
    }

    /**
     * Execute the lense search query
     * @param inputField Lense search input field
     * @param className Class name
     * @param filterName Filter name
     * @param navFilters Navigational filter names
     */
    public executeLenseSearch(inputField: FieldOVLenseSearch, className: string, filterName: string, navFilters: string[]): void {
        const searchText = inputField.text;
        if (searchText && searchText !== '') {

            this.util.searchLenseSearch(className, filterName, searchText, navFilters, this.getNavigationFilterVariables()).then(
                (response: any) => {
                    inputField.searchResults = response.results;
                    this.changeDetectorRef.markForCheck();
                },
                (response: any) => {
                    this.util.addErrorMessage(response.message);
                    this.changeDetectorRef.markForCheck();
                });
        } else {
            inputField.searchResults = [];
            inputField.setText();
        }
    }


    /**
     * Execute a search preload query and load de results in the field
     * @param inputField Preload field
     * @param className Class name
     * @param filterName Preload filter name
     * @param orderCriteria Order criteria name
     * @param navFilters Navigational filter names
     */
    public executeSearchPreload(inputField: FieldOVPreload, className: string, filterName: string,
                                orderCriteria: string, navFilters: string[]): void {
        this.util.searchPreload(className, filterName, navFilters, this.getNavigationFilterVariables(), orderCriteria).then(
            (response: any) => {
                inputField.loadPreload(response.results);
                this.changeDetectorRef.markForCheck();
            },
            (response: any) => {
                this.util.addErrorMessage(response.resultDescription);
                this.changeDetectorRef.markForCheck();
            }
        );
    }

    /**
     * Sets the suplementary information to the input field
     * @param inputField Input field
     * @param className Class name
     * @param attributes Attributes
     */
    public setSuplementaryInformationToField(inputField: FieldOVLenseSearch, className: string, attributes: string): void {
        let numberMissingSupInfo = 0;
        inputField.getSelectedInstances().forEach((value) => {
            if (!value.supplementaryInfo || value.supplementaryInfo === '') {
                numberMissingSupInfo++;
                this.cacheDependencyRules.addQueryInstance(className, value.oid, attributes);
            }
        });

        if (numberMissingSupInfo === 0) {
            inputField.setText();
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        } else {
            this.cacheDependencyRules.searchAll().then(() => {
                inputField.getSelectedInstances().forEach((value) => {
                    if (!value.supplementaryInfo || value.supplementaryInfo === '') {
                        value.supplementaryInfo = this.cacheDependencyRules.getText(className, value.oid, attributes);
                    }
                });

                inputField.setText();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            });
        }
    }

    /**
     * Returns service requests ready to be sent.
     * If multiple values are selected in any inbound argument, all possible combinations will be present in the array
     */
    public getServiceRequest(): any[] {

        const finalRequests: any[] = [];
        const argumentsSingleValue: any[] = [];
        const argumentsMultiple: any[] = [];
        for (const field of this.fields) {
            field.addValuesForExecution(argumentsSingleValue, argumentsMultiple);
        }

        this.getServiceRequestAux(argumentsMultiple, argumentsSingleValue, finalRequests);

        return finalRequests;
    }

    /**
     * Auxiliar function to return the service request
     * @param argumentsMultiple Arguments with multiple value
     * @param argumentsSingleValue Arguments with single value
     * @param finalRequests Final array of request
     */
    private getServiceRequestAux(argumentsMultiple: any[], argumentsSingleValue: any[], finalRequests: any[]): void {
        if (argumentsMultiple.length === 0) {
            // Create the request
            const request: {[index: string]: any} = {};
            for (const argValue of argumentsSingleValue) {
                request[argValue.name] = argValue.value;
            }
            finalRequests.push(request);
        } else {
            const argMulti = argumentsMultiple.pop();
            // Iterate using the Oid array
            for (const argOid of argMulti.value) {
                const value = { name: argMulti.name, value: argOid };
                argumentsSingleValue.push(value);
                this.getServiceRequestAux(argumentsMultiple, argumentsSingleValue, finalRequests);
                argumentsSingleValue.pop();
            }
        }
    }

    /**
     * Process the service execution
     */
    public saveChanges(): void {
        this.serviceRequests = [];
        if (!this.validateInputFields()) {
            this.setShowWait(false);
            this.visible = true;
            return;
        }

        this.executionsCount = 0;
        this.totalExecutions = 1;
        this.totalErrors = 0;
        this.errorList = [];
        this.serviceRequests = this.getServiceRequest();
        this.totalExecutions = this.serviceRequests.length;

        // Show wait dialog or progress bar
        if (this.totalExecutions > 1 && !this.executeMultiSelectionInParallel) {
            this.progressBarSubscription = this.util.progessBarCancelResponse.subscribe(() => this.processProgressBarCancel());
            this.executeService(this.serviceRequests.shift());
        } else {
            this.setShowWait(true);
            for (const request of this.serviceRequests) {
                this.executeService(request);
            }
        }

        this.changeDetectorRef.markForCheck();
    }

    /**
     * Call to the service using the received request
     * @param request Service request
     */
    public executeService(request: any) {

        if (this.totalExecutions > 1 && !this.executeMultiSelectionInParallel) {
            this.util.showProgressBar(this.title, this.executionsCount + 1 === this.totalExecutions ? 99 :
                Math.round(((this.executionsCount + 1) / this.totalExecutions) * 100), 0);
        }
        this.util.callHttpPost(`${this.appGlobalInfo.APPCONSTANTS.BASE_URL}/api/${this.className}Api/${this.serviceName}`,
                                request).then(
            (response: any) => {
                this.executionsCount += 1;
                if (response.resultCode !== '000' && response.resultCode !== '') {
                    this.totalErrors++;
                    this.errorList.push(response.resultDescription);
                }
                if (this.executionsCount === this.totalExecutions) {
                    this.util.addErrorMessageList(this.errorList);
                    this.setShowWait(false);
                    this.util.hideProgressBar();
                    this.processOutArgumentAndCondNavigation(request, response);
                    this.visible = true;
                }
                if (this.totalExecutions > 1 && !this.executeMultiSelectionInParallel && this.serviceRequests.length > 0) {
                   this.executeService(this.serviceRequests.shift());
                }
                this.changeDetectorRef.markForCheck();
            }, (errResponse: ErrorInformation) => {
                this.executionsCount += 1;
                this.totalErrors++;
                errResponse.messageParts.push(this.title);
                this.errorList.push(this.util.translateError(errResponse));
                if (this.executionsCount === this.totalExecutions) {
                    this.setShowWait(false);
                    this.util.hideProgressBar();
                    this.util.addErrorMessageList(this.errorList);
                    this.visible = true;
                    if (this.appGlobalInfo.errorCET) {
                        this.processCancel();
                    }
                }
                if (this.totalExecutions > 1 && !this.executeMultiSelectionInParallel && this.serviceRequests.length > 0) {
                    this.executeService(this.serviceRequests.shift());
                }
                this.changeDetectorRef.markForCheck();
            });
    }

    /**
     * Service has been executed, process outbound arguments and conditional navigation
     * @param request Service requiest
     * @param response Service response
     */
    private processOutArgumentAndCondNavigation(request: any, response: any): void {
        if (this.totalErrors === 0) {
            if (this.queryContainer) {
                this.cacheDependencyRules.clear();
                this.queryContainer.processAssociatedServiceExecutionSuccess();
            } else {
                if (this.executionsCount === 1) {
                    if (this.context.exchangeInfo && !this.processOutboundArguments(request, response) &&
                        !this.condNavMng.processConditionalNavigation(this.className, this.serviceName, request, response,
                            this.context.exchangeInfo.previous, this.context.exchangeInfo.comeBackContext)) {
                        this.processCancel(true);
                    }
                } else {
                    this.processCancel(true);
                }
            }
        }
    }

    /**
     * Process the service anwser to show the outbound argument scenario
     */
    public processOutboundArguments(request: any, response: any): boolean {
        // Return false by default
        return false;
    }

    /**
     * Returns the navigational filter variables
     */
    public getNavigationFilterVariables(): any {
        const filterVar = [];
        for (const field of this.fields) {
            if (field.nameInRequest.endsWith('_oid')) {
                filterVar.push({ name: field.nameInRequest.replace('_oid', ''), value: field.getSingleValue() });
            } else {
                filterVar.push({ name: field.nameInRequest, value: field.getSingleValue() });
            }
        }
        return filterVar;
    }

    /**
     * Process an error during the load of a preload argument
     * @param errorMsg Error message
     */
    public processErrorInLoadPreload(errorMsg: string): void {
        this.numberOfPendingPreload--;
        this.util.addErrorMessage(errorMsg);
        this.initializeFromContext();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Manages the key press event in a lense search component and activate a timer
     * @param onchangeMethodName Method to be called when the timer fires
     */
    public onKeypressLenseSearch(onchangeMethodName: string): void {

        if (this.lenseSearchTimer) {
            window.clearTimeout(this.lenseSearchTimer);
        }
        this.lenseSearchMethodName = onchangeMethodName;
        this.lenseSearchTimer = window.setTimeout(() => {
            this.lenseSearchTimer = undefined;
            const func: any = this[this.lenseSearchMethodName as keyof AbstractServiceIU];
            if (func) {
                func.apply(this, []);
            }
        }, 1000);
    }

    /**
     * Call to the precondition evaluation service
     * @param preconditionId Precondition XML id
     */
    public checkPreconditionsInAdvance(preconditionId: string): Promise<string[]> {

        const requests = this.getServiceRequest();

        const errorArray: string[] = [];
        return new Promise<string[]>((resolve, reject) => {
            if (requests.length > 0) {
                const promiseArr: Array<Promise<any>> = [];
                for (const request4Pre of requests) {
                    request4Pre.preconditionId = preconditionId;
                    promiseArr.push(this.util.callHttpPost(
                        `${this.appGlobalInfo.APPCONSTANTS.BASE_URL}/api/${this.className}Api/${this.serviceName}CheckPreconditions`,
                        request4Pre));
                }
                Promise.all(promiseArr).then((results: any[]) => {
                    resolve(this.processCheckPreconditionsInAdvanceResponses(results));
                }).catch((results: any[]) => {
                    for (const response of results) {
                        errorArray.push(response.message);
                    }
                    resolve(errorArray);
                });
            } else {
                resolve(errorArray);
            }
        });
    }

    /**
     * Process the responses to the check precondiciotns in advance calls
     * @param results Call results
     */
    private processCheckPreconditionsInAdvanceResponses(results: any[]): string [] {
        const errorArray: string[] = [];
        for (const response of results) {
            if (response.resultCode !== '000' && response.resultCode !== '') {
                errorArray.push(response.resultDescription);
            }
        }
        return errorArray;
    }

    /**
     * Returns the selection forward exchange information for an inbound argument
     */
    protected getSelectionForwardExchInfo(): ExchangeInfo {
        this.clearValidationMessages();
        this.saveContextInfo();
        // Create the exchange information
        const exchInfo = new ExchangeInfo();
        exchInfo.exchangeType = 'SelectionForward';
        exchInfo.previous = this.getContext();
        exchInfo.comeBackContext = this.getGlobalContext();
        exchInfo.originServiceName = this.serviceName;
        if (this.queryContainer) {
            exchInfo.originIUIdentification = this.queryContainer.iuId;
        } else {
            exchInfo.originIUIdentification = this.iuId;
        }
        return exchInfo;
    }

    /**
     * Returns the instance in the cache corresponding with the first and unique Oid in the field
     * @param fieldOV Object valued field. FieldOVLense, FieldOVLenseSearch or FieldOVPreload
     */
    protected getFirstInstanceFromCache(fieldOV: FieldOVLense | FieldOVLenseSearch | FieldOVPreload): InstanceCache {
        let instance!: InstanceCache;
        if (fieldOV.getSelectedInstances().length === 1) {
            instance = this.cacheDependencyRules.getInstance(fieldOV.dataType, fieldOV.getSelectedInstances()[0].oid);
        }
        return instance;
    }

    /**
     * Adds a query to the cache using the unique Oid in the field
     * @param fieldOV Object valued field. FieldOVLense, FieldOVLenseSearch or FieldOVPreload
     * @param attributes Attributes names, separates by comma
     */
    protected addQueryInstanceFromField(fieldOV: FieldOVLense | FieldOVLenseSearch | FieldOVPreload, attributes: string): void {
        if (fieldOV.getSelectedInstances().length === 1) {
            this.cacheDependencyRules.addQueryInstance(fieldOV.dataType, fieldOV.getSelectedInstances()[0].oid, attributes);
        }
    }

    /**
     * Manages the cancel button in the progress bar
     */
    private processProgressBarCancel(): void {
        this.util.hideProgressBar();
        if (this.progressBarSubscription) {
            this.progressBarSubscription.unsubscribe();
        }
        this.serviceRequests = [];
        this.processCancel(true);
    }

    public override setShowWait(value: boolean): void {
        if (this.queryContainer) {
            this.queryContainer.setShowWait(value);
        }
        super.setShowWait(value);
    }

    protected checkWaitStatus(): void {
        if (this.asyncCallsInLoadingCounter > 0) {
            if (!this.showWait) {
                this.setShowWait(true);
            }
        } else if (this.showWait) {
            this.setShowWait(false);
        }
    }

}
