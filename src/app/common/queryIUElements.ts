import { ChangeDetectorRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { AbstractMDIU } from './abstractMDIU';
import { AbstractServiceIU } from './abstractSIU';
import { ExchangeInfo } from './app.exchangeinfo';
import { Util } from './app.utils';
import { AbstractIU } from './baseIUElements';
import { ConditionalNavigationMng } from './conditionalNavigationMng';

/**
 * Information for display set elements
 */
export class DisplaySetItem {

    /** Element unique id xml from model */
    public idXML = '';
    /** Element name */
    public name = '';
    /** Field name */
    public field = '';
    /** Field data type */
    public type = '';
    /** Alias */
    public alias = '';
    /** Agents */
    public agents: string[] = [];
    /** Visible */
    public visible = true;
    /** CSS classes */
    public styleClass = '';
    /** Presentation mask */
    public mask = '';
    /** Set of possible values. For defined selection data */
    public options: any;
    /** Associated action or navigation index */
    public linkIndex = -1;
    /** Indicates if the link index is an action or a navigation */
    public linkIsAction = true;
    /** Indicates if the column is editable or not */
    public editable = false;
    /** Indicates the name of the service parameter, if the column is editable */
    public editableParamName = '';
    /** For string data type, the maximum length */
    public maxLength = 0;
    /** Specific size for the field, expressed in number of visible characters.
     * If value is -1, alias and data type will be used to calculate the size of the field
     */
    public fieldSize = -1;

    /**
     * Sets the editable information to the columns
     * @param paramName Parameter name to be used in the editable service
     */
    public setEditableInformation(paramName: string) {
        this.editable = true;
        this.editableParamName = paramName;
    }
}

/**
 * Information for an action or navigation element
 */
export class AccNavItem {

    /** Element unique id XML from model */
    public idXML = '';
    /** Element Id. */
    public id = 0;
    /** Alias */
    public alias = '';
    /** Noun verb paradigm. Active only with selection */
    public nounVerb = false;
    /** Active with multi-selection or not */
    public multiSelection = false;
    /** Agents */
    public agents: string[] = [];
    /** Target class name */
    public targetClass = '';
    /** Target interaction unit name */
    public targetUI = '';
    /** Navigational filter */
    public navigationalFilter = '';
    /** Role path. Only for navigations */
    public rolePath = '';
    /** If element is visible or not */
    public visible = true;
    /** If service must be executed directly */
    public noShow = false;
    /** If service must be executed directly, the Service name */
    public noShowServiceName = '';
    /** If service must be executed directly, the Argument name */
    public noShowArgumentName = '';
    /** If service must be executed directly, the outbound arguments scenario  */
    public noShowOutboundIU = '';
    /** Execute service with multi selection in parallel or serialized */
    public noShowExecuteMultiSelectionInParallel = false;
    /** Information about the serialized execution os related service in multi selection */
    public noShowExecuteSerializedInfo: any;
    /** Blob outbound argument name if it is a direct download */
    public directDownloadArgBlob = '';
    /** File name outbound argument name if it is a direct download */
    public directDownloadArgFileName = '';
    /** Action to apply to the downloaded document. D = Download, O = Open in new window  */
    public documentAction = 'D';
    /** Attribute to evaluate preconditions in advance */
    public preconditionAttributes: any[] = [];
    /** Type of report. 0 = none, 1 = Instance, 2 = Population */
    public typeOfReport = 0;
    /* Name of the UI used for printing */
    public printUIName = '';
    /* If interaction unit must be shown in the modal popup */
    public showInModal = false;
    /* If interaction unit must be shown in the modal popup, this is the template selector */
    public showInModalSelector = '';
    /* If interaction unit must be shown in the modal popup, this is the scenario title */
    public showInModalAlias = '';
    /* If element must be shown in the actions or navigations element */
    public showInDefault = true;
    /* If element must be shown as a column in the grid */
    public showInGrid = false;
    /* CSS style classes for the element */
    public styleClass = '';
    /* Close the origin scenario */
    public closeOrigin = false;

    constructor() {
    }


    /**
     * Assign the properties to configure the no show feature
     * @param serviceName Service name to be executed
     * @param argumentName Argument name
     * @param outboundIU Outbound arguments scenario name, if exists
     * @param executeInParallel Execution with multi selection is in parallel or not
     */
    public setNoShowProperties(serviceName: string, argumentName: string, outboundIU: string, executeInParallel: boolean): void {
        this.noShow = true;
        this.noShowServiceName = serviceName;
        this.noShowArgumentName = argumentName;
        this.noShowOutboundIU = outboundIU;
        this.noShowExecuteMultiSelectionInParallel = executeInParallel;
    }

    /**
     * Assign the properties to configure a direct download
     * @param serviceName Service name to be executed
     * @param argumentName Argument name
     * @param outArgBlob Blob outbound argument name
     * @param outArgFileName File name outbound argument
     */
    public setDirectDownloadProperties(serviceName: string, argumentName: string, outArgBlob: string, outArgFileName: string): void {
        this.noShow = true;
        this.documentAction = 'D';
        this.noShowServiceName = serviceName;
        this.noShowArgumentName = argumentName;
        this.noShowOutboundIU = '';
        this.directDownloadArgBlob = outArgBlob;
        this.directDownloadArgFileName = outArgFileName;
    }

    /**
     * Assign the properties to open in new window an outbound argument
     * @param serviceName Service name to be executed
     * @param argumentName Argument name
     * @param outArgBlob Blob outbound argument name
     * @param outArgFileName File name outbound argument
     */
    public setOpenNewWindowProperties(serviceName: string, argumentName: string, outArgBlob: string, outArgFileName: string): void {
        this.noShow = true;
        this.documentAction = 'O';
        this.noShowServiceName = serviceName;
        this.noShowArgumentName = argumentName;
        this.noShowOutboundIU = '';
        this.directDownloadArgBlob = outArgBlob;
        this.directDownloadArgFileName = outArgFileName;
    }

    /**
     * Sets the item as an instance report
     * @param printUIName Report UI name to be used
     */
    public setInstanceReportProperties(printUIName: string): void {
        this.typeOfReport = 1;
        this.printUIName = printUIName;
    }

    /**
     * Sets the item as a population report
     * @param printUIName Report UI name to be used
     */
    public setPopulationReportProperties(printUIName: string): void {
        this.typeOfReport = 2;
        this.printUIName = printUIName;
    }

    /**
     * Assign the properties to show in modal the target scenario
     * @param selector Scenario selector
     * @param alias Scenario title
     */
    public setShowInModalProperties(selector: string, alias: string): void {
        this.showInModal = true;
        this.showInModalSelector = selector;
        this.showInModalAlias = alias;
    }
}

/**
 * Abstract class for Query components, IIU and PIU.
 */
export abstract class AbstractQueryIU extends AbstractIU {

    /** Query URL */
    public queryURL = '';

    // Navigational filters
    public navigationalFilter = '';
    public hatNavigationalFilter = '';
    public mdNavigationalFilter = '';

    /** Elements of the Display set */
    public displaySet: DisplaySetItem[] = [];
    /** Indicates if the grid is editable or not */
    public editableGrid = false;
    /** In case of editable grid. Service name to be executed */
    public editableGridServiceName = '';
    /** In case of editable grid. Name of the This argument of the service */
    public editableGridArgThisName = '';
    /** In case of editable grid. Execute when the row selection change */
    public editableGridExecuteInRowChange = false;

    /** Available action elements */
    public actions: AccNavItem[] = [];
    /** Available navigation elements */
    public navigations: AccNavItem[] = [];

    /** Change selection subject */
    public selectionChanged: Subject<void> = new Subject<void>();

    /** If the component is part of a Master-Detail scenario, it is the Master detail container */
    public masterDetailContainer!: AbstractMDIU;

    /** Associated service component */
    public associatedService: AbstractServiceIU | null = null;
    /** Indicates if the associated service requires a row selected to enable it or not */
    public associatedServiceRequiresSelection = true;
    /** Indicates if the associated service is enabled or not */
    public associatedServiceEnabled = true;
    /** Subscription to interaction unit in modal  */
    protected modalForIUSubscription: Subscription | null = null;

    /** Flag to show the navigation element to the class services log */
    public showClassLog = false;
    /** Flag to show the navigation element to the instance services log */
    public showInstanceLog = false;
    /** Flag to show the navigation element to the global services log */
    public showGlobalLog = false;

    /** Progress bar subscription to manage the cancel */
    protected progressBarSubscription: Subscription | null = null;

    /** Class alias */
    protected classAlias = '';
    /** Supplementary information attributes */
    protected supplementaryInfoAtt: string[] = [];

    constructor(protected override appGlobalInfo: AppGlobalInfo,
                protected override util: Util,
                protected override changeDetectorRef: ChangeDetectorRef,
                protected condNavMng: ConditionalNavigationMng) {
        super(appGlobalInfo, util, changeDetectorRef);
    }

    public isInstanceIU(): boolean {
        return false;
    }

    /**
     * Return the names of required attributes separates with commas
     */
    public getDisplaySetElements(): string {
        const dsItems: string[] = [];
        for (const dsItem of this.displaySet) {
            if (dsItem.visible && dsItem.name) {
                dsItems.push(dsItem.name);
            }
        }

        // Add to the displayset the required attributes to advance preconditions
        for (const accItem of this.actions) {
            for (const ele of accItem.preconditionAttributes) {
                this.addAttributesForAction(dsItems, ele);

            }
        }
        return dsItems.toString();
    }

    /**
     * Add the required attributes to evaluate preconditions in advance
     * @param dsItems Display set elements
     * @param attrElemen Attribute information
     */
    protected addAttributesForAction(dsItems: string[], attrElemen: any): void {
        if (attrElemen.agents.length === 0 || this.appGlobalInfo.getLoggedUserInfo().isAgentOneOf(attrElemen.agents)) {
            for (const att of attrElemen.attributes) {
                if (dsItems.indexOf(att) === -1) {
                    dsItems.push(att);
                }
            }
        }
    }

    /**
     * Returns true if the action element is enabled or not
     * @param actionId Action element id
     */
    public isActionEnabled(actionId: number): boolean {
        let isEnabled = false;
        const acc = this.getActionById(actionId);
        if (acc) {
            const numInst: number = this.getNumSelectedInstances();
            isEnabled = (!acc.nounVerb ? true : (acc.multiSelection ? numInst > 0 : numInst === 1));
            if (isEnabled && numInst > 0 && acc.preconditionAttributes.length > 0) {
                isEnabled = this.checkPreconditionInAdvanceForRows(actionId, this.getSelectedInstances());
            }
        }
        return isEnabled;
    }

    /**
     * Evaluate in advance the associated service preconditions to the action element
     * @param actionId Action element identification
     * @param rows Rows to be check
     */
    public checkPreconditionInAdvanceForRows(actionId: number, rows: any[]): boolean {
        // By default, always enabled
        return true;
    }

    /**
     * Returns true if the action element is enabled or not
     * @param actionId Action element id
     * @param row Row data
     */
    public isActionEnabledInGrid(actionId: number, row: any): boolean {
        // By default, always enabled
        let isEnabled = true;
        const acc = this.getActionById(actionId);
        if (acc && acc.preconditionAttributes.length > 0) {
            isEnabled = this.checkPreconditionInAdvanceForRows(actionId, [row]);
        }
        return isEnabled;
    }

    /**
     * Returns true if the navigation element is enabled or not
     * @param navigationId Navigation element id
     * @param row Row data
     */
    public isNavigationEnabledInGrid(navigationId: number, row: any): boolean {
        // By default, always enabled
        return true;
    }

    /**
     * Returns true if the navigation element is enabled or not
     * @param navigationId Navigation element id
     */
    public isNavigationEnabled(navigationId: number): boolean {
        let isEnabled = false;
        const nav = this.getNavigationById(navigationId);
        if (nav) {
            const numInst: number = this.getNumSelectedInstances();
            isEnabled = (!nav.nounVerb ? true : (nav.multiSelection ? numInst > 0 : numInst === 1));
        }
        return isEnabled;
    }

    /**
     * Returns the context of the global scenario
     */
    public override getGlobalContext(): any {
        if (this.masterDetailContainer) {
            return this.masterDetailContainer.getGlobalContext();
        } else {
            return this.getContext();
        }
    }

    /**
     * Assigns the exchange information
     * @param exchInfo Exchange information
     */
    public setExchangeInfo(exchInfo: ExchangeInfo): void {
        this.getContext().exchangeInfo = exchInfo;
    }


    /**
     * Navigate to the action scenario
     * @param actionId Id of the action element
     */
    public doAction(actionId: number): void {
        // Save scenario information
        this.saveContextInfo();

        const previousContext = this.getContext();
        const comeBackContext = this.getGlobalContext();

        const acc = this.getActionById(actionId);
        if (acc) {
            if (acc.typeOfReport > 0) {
                this.processPrintReport(acc, previousContext, comeBackContext);
            } else if (acc.noShow) {
                this.executeNoShowService(acc);
            } else if (acc.showInModal) {
                this.showActionInModal(acc, previousContext, comeBackContext);
            } else {
                this.util.navigateFromAction(acc.targetClass, acc.targetUI, previousContext, comeBackContext,
                                              this.getSelectedOids(), this.className, acc.navigationalFilter);
            }
        }

        this.changeDetectorRef.markForCheck();
    }

    /**
     * Show action destination interaction unit in modal popup
     * @param actionItem Action item
     */
    protected showActionInModal(actionItem: AccNavItem, previousContext: any, comeBackContext: any): void {
        this.modalForIUSubscription = this.util.modalForIUResponse.subscribe((data) => this.processModalForIUResponse(data));
        this.util.saveExchangeInfoAction(actionItem.targetClass, actionItem.targetUI, previousContext, comeBackContext,
                                          this.getSelectedOids(), this.className, actionItem.navigationalFilter);
        this.util.modalForIUAction.next({selector: actionItem.showInModalSelector, title: actionItem.showInModalAlias});
    }

    /**
     * Show navigation destination interaction unit in modal popup
     * @param navItem Navigation item
     * @param previousContext Previous context
     * @param comeBackContext Comeback context
     */
    protected showNavigationInModal(navItem: AccNavItem, previousContext: any, comeBackContext: any): void {
        this.modalForIUSubscription = this.util.modalForIUResponse.subscribe((data) => this.processModalForIUResponse(data));
        const exchInfo = new ExchangeInfo();
        exchInfo.exchangeType = 'Navigation';
        exchInfo.targetClassName = navItem.targetClass;
        exchInfo.targetIUName = navItem.targetUI;
        exchInfo.previous = previousContext;
        exchInfo.comeBackContext = comeBackContext;
        exchInfo.selectedOids = this.getSelectedOids();
        exchInfo.selectedOidsClassName = this.className;
        exchInfo.rolePath = navItem.rolePath;
        if (navItem.navigationalFilter && navItem.navigationalFilter.length > 0) {
            exchInfo.navigationalFilterIdentity = [navItem.navigationalFilter];
            if (exchInfo.selectedOids && exchInfo.selectedOids.length === 1) {
                exchInfo.navigationalFilterVariables = [{ name: 'SelectedObject', value: JSON.stringify(exchInfo.selectedOids[0]) }];
            }
        } else {
            exchInfo.navigationalFilterIdentity = [];
        }
        this.appGlobalInfo.appExchangeInfo.save(exchInfo);
        this.util.modalForIUAction.next({selector: navItem.showInModalSelector, title: navItem.showInModalAlias});
    }

    /**
     * Process the response when interaction unit in modal popup is been closed
     * @param response Interaction unit response
     */
    protected processModalForIUResponse(response: {result: number}) {
        if (this.modalForIUSubscription) {
            this.modalForIUSubscription.unsubscribe();
            if (response && response.result === 0) {
                this.refreshAll();
                this.changeDetectorRef.markForCheck();
            }
        }
    }

    /**
     * Call service execution
     * @param actionItem Action item
     */
    private executeNoShowService(actionItem: AccNavItem): void {
        this.setShowWait(true);
        if (!actionItem.noShowArgumentName) {
            this.executeNoShowServiceWithNoArgumnets(actionItem);
            return;
        }
        const oids = this.getSelectedOids();
        const totalExecutions = oids.length;
        let numExecutions = 0;
        let numErrors = 0;
        // Show wait dialog or progress bar
        if (totalExecutions > 1 && !actionItem.noShowExecuteMultiSelectionInParallel) {
            this.setShowWait(false);
            this.progressBarSubscription = this.util.progessBarCancelResponse.subscribe(() => {
                this.util.hideProgressBar();
                actionItem.noShowExecuteSerializedInfo.oids = [];
            });
            actionItem.noShowExecuteSerializedInfo = {};
            actionItem.noShowExecuteSerializedInfo.oids = oids;
            actionItem.noShowExecuteSerializedInfo.totalExecutions = totalExecutions;
            actionItem.noShowExecuteSerializedInfo.numExecutions = 0;
            actionItem.noShowExecuteSerializedInfo.numErrors = 0;
            actionItem.noShowExecuteSerializedInfo.errorList = [];
            this.executeNoShowServiceSerialized(actionItem);
        } else {
            this.setShowWait(true);
            for (const oid of oids) {
                let lOid = oid;
                if (actionItem.noShowArgumentName.endsWith('_json')) {
                    lOid = JSON.stringify(oid);
                }
                this.util.executeNoShowService(actionItem.targetClass, actionItem.noShowServiceName, lOid,
                    actionItem.noShowArgumentName).then(
                    (data: {request: any, response: any}) => {
                        numExecutions++;
                        const request = data.request;
                        const response = data.response;
                        if (response.resultCode !== '000' && response.resultCode !== '') {
                            numErrors++;
                            this.util.addErrorMessage(response.resultDescription);
                        }
                        if (totalExecutions === numExecutions) {
                            this.processOutArgumentAndCondNavigation(request, response, actionItem, totalExecutions, numErrors !== 0);
                            this.setShowWait(false);
                            this.changeDetectorRef.markForCheck();
                        }
                    }, (error: {request: any, response: any}) => {
                        numExecutions++;
                        numErrors++;
                        this.util.addErrorMessage(this.util.translateError(error.response));
                        this.setShowWait(false);
                        this.changeDetectorRef.markForCheck();
                    });
            }

        }
    }

    private executeNoShowServiceWithNoArgumnets(actionItem: AccNavItem): void {

        this.util.executeNoShowService(actionItem.targetClass, actionItem.noShowServiceName, null, "").then(
            (data: {request: any, response: any}) => {
                const request = data.request;
                const response = data.response;
                if (response.resultCode !== '000' && response.resultCode !== '') {
                    this.util.addErrorMessage(response.resultDescription);
                }
                this.setShowWait(false);
                this.processOutArgumentAndCondNavigation(request, response, actionItem, 1, response.resultCode !== '000' && response.resultCode !== '');
                this.changeDetectorRef.markForCheck();
            }, (error: {request: any, response: any}) => {
                this.util.addErrorMessage(this.util.translateError(error.response));
                this.setShowWait(false);
                this.changeDetectorRef.markForCheck();
        });       
    }

    private executeNoShowServiceSerialized(actionItem: AccNavItem): void {
        this.util.showProgressBar(actionItem.alias, actionItem.noShowExecuteSerializedInfo.numExecutions + 1 ===
            actionItem.noShowExecuteSerializedInfo.totalExecutions ? 99 : Math.round((
                (actionItem.noShowExecuteSerializedInfo.numExecutions + 1) /
                actionItem.noShowExecuteSerializedInfo.totalExecutions) * 100), 0);

        let lOid = actionItem.noShowExecuteSerializedInfo.oids.shift();
        if (actionItem.noShowArgumentName.endsWith('_json')) {
            lOid = JSON.stringify(lOid);
        }
        this.util.executeNoShowService(actionItem.targetClass, actionItem.noShowServiceName,
                                       lOid,
                                       actionItem.noShowArgumentName).then(
            (data: {request: any, response: any}) => {
                actionItem.noShowExecuteSerializedInfo.numExecutions++;
                const request = data.request;
                const response = data.response;
                if (response.resultCode !== '000' && response.resultCode !== '') {
                    actionItem.noShowExecuteSerializedInfo.numErrors++;
                    actionItem.noShowExecuteSerializedInfo.errorList.push(response.resultDescription);
                }
                if (actionItem.noShowExecuteSerializedInfo.oids.length > 0) {
                    this.executeNoShowServiceSerialized(actionItem);
                } else {
                    this.util.addErrorMessageList(actionItem.noShowExecuteSerializedInfo.errorList);
                    actionItem.noShowExecuteSerializedInfo = {};
                    this.util.hideProgressBar();
                    this.refreshAll();
                }
                this.changeDetectorRef.markForCheck();
            }, (error: {request: any, response: any}) => {
                actionItem.noShowExecuteSerializedInfo.numExecutions++;
                actionItem.noShowExecuteSerializedInfo.numErrors++;
                actionItem.noShowExecuteSerializedInfo.errorList.push(this.util.translateError(error.response));

                if (actionItem.noShowExecuteSerializedInfo.oids.length > 0) {
                    this.executeNoShowServiceSerialized(actionItem);
                } else {
                    this.util.addErrorMessageList(actionItem.noShowExecuteSerializedInfo.errorList);
                    actionItem.noShowExecuteSerializedInfo = {};
                    this.util.hideProgressBar();
                    this.refreshAll();
                }
                this.changeDetectorRef.markForCheck();
            });
    }


    /**
     * Service has been executed, process outbound arguments and conditional navigation
     * @param request Service request
     * @param response Service response
     * @param actionItem Action item
     * @param totalExecutions Total number of executions
     */
    protected processOutArgumentAndCondNavigation(request: any, response: any, actionItem: AccNavItem, totalExecutions: number,
                                                anyError: boolean): void  {
        const thisContext = this.getContext();
        const globalContext = this.getGlobalContext();
        if (!anyError && totalExecutions === 1) {
            if (actionItem.directDownloadArgBlob) {
                if (actionItem.documentAction === 'D') {
                    this.util.saveFileFromBase64(
                        response[actionItem.directDownloadArgBlob],
                        response[actionItem.directDownloadArgFileName]);
                }
                if (actionItem.documentAction === 'O') {
                    this.util.openInNewWindow(
                        response[actionItem.directDownloadArgBlob],
                        response[actionItem.directDownloadArgFileName]);
                }
            } else if (actionItem.noShowOutboundIU) {
                this.util.navigateOutboundArgumentsScenario(actionItem.targetClass, actionItem.noShowOutboundIU, this.getContext(),
                    this.getGlobalContext(), request, response);
            } else if (!this.condNavMng.processConditionalNavigation(actionItem.targetClass, actionItem.noShowServiceName,
                                                                      request, response, thisContext, globalContext)) {
                // If no conditinal navigation, refresh
                if (actionItem.closeOrigin) {
                    this.processCancel(true);
                } else {
                    this.refreshAll();
                }
            }
        } else {
            this.refreshAll();
        }
    }

    /**
     * Navigate to the navigation scenario
     * @param navigationId Id of the navigation element
     */
    public doNavigation(navigationId: number): void {

        // Show the waiting image
        this.setShowWait(true);

        // Save scenario information
        this.saveContextInfo();

        const previousContext = this.getContext();
        const comeBackContext = this.getGlobalContext();

        const nav = this.getNavigationById(navigationId);
        if (nav) {
            if (nav.typeOfReport > 0) {
                this.processPrintReport(nav, previousContext, comeBackContext);
            } else if (nav.showInModal) {
                this.showNavigationInModal(nav, previousContext, comeBackContext);
            } else {
                this.formTextForTitleInTarget().then( (text: string) => {
                    this.util.navigateFromNavigation(nav.targetClass, nav.targetUI, previousContext,
                        comeBackContext, nav.rolePath, this.getSelectedOids(), this.className, nav.navigationalFilter, text);
    
                }).catch( (err: Error) => {
                    this.util.navigateFromNavigation(nav.targetClass, nav.targetUI, previousContext,
                        comeBackContext, nav.rolePath, this.getSelectedOids(), this.className, nav.navigationalFilter, '');
                });
            }
        }

        this.changeDetectorRef.markForCheck();
    }

    /**
     * Returns the text containing information about the selected instance
     * @returns 
     */
    protected formTextForTitleInTarget(): Promise<string> {
        return Promise.resolve('');
    }

    /**
     * Manages the request for generates a report
     * @param item Action or navigation item selected
     * @param previousContext Previous context
     * @param comeBackContext Comeback context
     */
    private processPrintReport(item: AccNavItem, previousContext: any, comeBackContext: any): void {
        if (item.typeOfReport === 1) {
            this.processPrintInstanceReport(item, previousContext, comeBackContext);
        }
        if (item.typeOfReport === 2) {
            this.processPrintPopulationReport(item, previousContext, comeBackContext);
        }
    }

    /**
     * Manages the request for generates an instance report
     * @param item Action or navigation item selected
     * @param previousContext Previous context
     * @param comeBackContext Comeback context
     */
    private processPrintInstanceReport(item: AccNavItem, previousContext: any, comeBackContext: any): void {
        const oids = this.getSelectedOids();
        if (oids && oids.length === 1) {
            const jsonOid = JSON.stringify(oids[0]);
            this.util.generateInstanceReport(item.targetClass, item.printUIName, jsonOid, {}).then((errorMsg) => {
                if (errorMsg) {
                    this.util.addErrorMessage(errorMsg);
                }
                this.setShowWait(false);
            }).catch((errorMsg) => {
                this.util.addErrorMessage(errorMsg);
                this.setShowWait(false);
            });
        }
    }
    /**
     * Manages the request for generates an instance report
     * @param item Action or navigation item selected
     * @param previousContext Previous context
     * @param comeBackContext Comeback context
     */
    private processPrintPopulationReport(item: AccNavItem, previousContext: any, comeBackContext: any): void {
        const oids = this.getSelectedOids();
        const exchInfo = new ExchangeInfo();
        exchInfo.exchangeType = 'Navigation';
        exchInfo.targetClassName = item.targetClass;
        exchInfo.targetIUName = item.targetUI;
        exchInfo.previous = previousContext;
        exchInfo.comeBackContext = comeBackContext;
        exchInfo.selectedOids = oids;
        exchInfo.selectedOidsClassName = this.className;
        exchInfo.rolePath = item.rolePath;
        if (item.navigationalFilter && item.navigationalFilter.length > 0) {
            exchInfo.navigationalFilterIdentity = [item.navigationalFilter];
            if (oids && oids.length === 1) {
                exchInfo.navigationalFilterVariables = [{ name: 'SelectedObject', value: JSON.stringify(oids[0]) }];
            }
        } else {
            exchInfo.navigationalFilterIdentity = [];
        }
        exchInfo.exchangeType = 'PrintFilter';
        exchInfo.printUIName = item.printUIName;
        this.util.navigateTo(exchInfo);
    }

    /**
     * Returns the action element with the received id
     * @param actionId Action id
     */
    protected getActionById(actionId: number): AccNavItem {
        let returnAcc: any;
        for (const nav of this.actions) {
            if (nav.id === actionId) {
                returnAcc = nav;
                break;
            }
        }
        return returnAcc;
    }

    /**
     * Returns the navigation element with the received id
     * @param navigationId Navigation id
     */
    protected getNavigationById(navigationId: number): AccNavItem {
        let returnNav: any;
        for (const nav of this.navigations) {
            if (nav.id === navigationId) {
                returnNav = nav;
                break;
            }
        }
        return returnNav;
    }

    /**
     * Initialize the scenario
     */
    public override initialize(): void {
        super.initialize();
        
        // Get the exchange information
        const exchInfo: ExchangeInfo = this.appGlobalInfo.appExchangeInfo.getExchangeInfoForScenario(this.className, this.iuName);

        // Check Selection Backward case
        this.initializeComponents();
        if (exchInfo.exchangeType === 'SelectionBackward') {
            this.processSelectionBackward(exchInfo);
        } else if (exchInfo.exchangeType === 'ComeBack') {
            // Set the original context to the controller
            this.setContext(exchInfo.originalContext, 'ComeBack');
            this.loadFromContext();
        } else {
            this.initializeFromExchangeInfo(exchInfo);
        }
    }

    /**
     * Default initialiation using the exchange information received
     * @param exchInfo Exchange information
     */
    public initializeFromExchangeInfo(exchInfo: ExchangeInfo): void {
        this.getContext().exchangeInfo = exchInfo;
        this.loadPreload();
    }


    public hasNavigationalFilters(): boolean {
        return this.getContext()?.exchangeInfo?.navigationalFilterIdentity.length > 0;
    }

    public getNavigationalFilters(): any[] {
        const navFilters = [];
        if (this.getContext()?.exchangeInfo?.navigationalFilterIdentity.length > 0) {
            for (const filterId of this.getContext().exchangeInfo.navigationalFilterIdentity) {
                const navFilter: {name: string, variables: any} = {name: filterId,
                    variables: this.getContext().exchangeInfo.navigationalFilterVariables};
                navFilters.push(navFilter);
            }

        }
        return navFilters;
    }

    /**
     * Configure action and navigation elements
     */
    public configureActionsNavigations(): void {
        let noActionNavigationVisibles = true;
        // Configure actions
        for (const actionEle of this.actions) {
            if (actionEle.visible && this.appGlobalInfo.getLoggedUserInfo().isActionVisible(this.idXML, actionEle.idXML,
                actionEle.agents)) {
                actionEle.visible = true;
                if (actionEle.showInDefault) {
                    noActionNavigationVisibles = false;
                } 
            } else {
                actionEle.visible = false;
            }
        }
        // Configure navigations
        for (const navEle of this.navigations) {
            if (navEle.visible && this.appGlobalInfo.getLoggedUserInfo().isNavigationVisible(this.idXML, navEle.idXML, navEle.agents)) {
                navEle.visible = true;
                if (navEle.showInDefault) {
                    noActionNavigationVisibles = false;
                } 
            } else {
                navEle.visible = false;
            }
        }
        // If no action or navigation visibles, add the corresponding css class
        if (noActionNavigationVisibles) {
            this.cssClasses += ' noActNavVisible';
        }
    }

    /* Abstract methods to be implemented in derived classes */

    /**
     * Initialize the scenario components
     */
    public initializeComponents(): void {
        this.initializeDisplaySet();
        this.initializeActions();
        this.initializeNavigations();
    }

    /**
     * Initialize the display set elements
     */
    public initializeDisplaySet(): void {
        // Empty method
    }

    /**
     * Initialize the action items
     */
    public initializeActions(): void {
        // Empty method
    }

    /**
     * Initialize the navigation items
     */
    public initializeNavigations(): void {
        // Empty method
    }

    /**
     * Process the change in the selection in the master component
     * @param selectedOidMaster Selected instance Oid
     */
    public setSelectedInstanceFromMaster(selectedOidMaster: any): void {
        // Empty method
    }

    /**
     * Returns an array containing the Oids of the selected rows
     */
    public getSelectedOids(): any[] {
        return [];
    }

    /**
     * Returns an array containing the selected instances
     */
    public getSelectedInstances(): any[] {
        return [];
    }

    /**
     * Returns the number of selected instances in the scenario
     */
    public getNumSelectedInstances(): number {
        return 0;
    }

    public refresh(nextInstance = 0): void {
        // Empty method
    }

    /**
     * Refresh all data in scenario
     */
    public refreshAll(): void {
        if (this.masterDetailContainer) {
            this.keepSelection();
            this.masterDetailContainer.refreshTopMaster();
        } else {
            this.refresh();
        }
    }

    public keepSelection(): void {
        // Empty method
    }

    /**
     * Manages the selection backward navigation to this scenario
     * @param exchInfo Exchange Information
     */
    public processSelectionBackward(exchInfo: ExchangeInfo): void {
        this.setContext(exchInfo.previous, 'SelectionBackward');
        this.loadFromContext();
        this.assignValuesFromSelectionBackward(exchInfo);
    }

    /**
     * Assign values
     * @param exchInfo Selection backward information
     */
    public assignValuesFromSelectionBackward(exchInfo: ExchangeInfo): void {
        if (this.associatedService && this.associatedService.serviceName === exchInfo.originServiceName) {
            this.associatedService.processSelectionBackward(exchInfo);
        }
    }

    /**
     * Locate and propagate the selection backward selection to the proper component
     * @param exchInfo Exchange information
     */
    public processSelectionBackwardInMasterDetail(exchInfo: ExchangeInfo): void {
        this.assignValuesFromSelectionBackward(exchInfo);
    }

    public setEditableInformation(serviceName: string, argThisName: string, agents: string[]): void {
        if (this.appGlobalInfo.getLoggedUserInfo().isAgentOneOf(agents)) {
            this.editableGrid = true;
            this.editableGridServiceName = serviceName;
            this.editableGridArgThisName = argThisName;
        } else {
            this.editableGrid = false;
            this.editableGridServiceName = '';
            this.editableGridArgThisName = '';
        }
    }


    /**
     * Returns the modified rows by the user
     */
    public getModifiedRows(): any[] {
        return [];
    }

    /**
     * Manages the save changes event in an editable grid
     */
    public onSaveChangesEditableGrid(): void {

        // Get the modified rows in the grid
        const modifiedRows = this.getModifiedRows();
        const totalRows = modifiedRows.length;
        if (totalRows > 0) {
            this.setShowWait(true);
            this.saveChangesEditableGrid(modifiedRows);
        }
    }

    public saveChangesEditableGrid(modifiedRows: any[]): void {
        const request: {[index: string]: any} = {};
        const row = modifiedRows.shift();
        // Argument This
        if (this.editableGridArgThisName.endsWith('_json')) {
            request[this.editableGridArgThisName] = row.oid;
        } else {
            request[this.editableGridArgThisName] = JSON.parse(row.oid);
        }
        // Other arguments
        for (const dsItem of this.displaySet) {
            if (dsItem.editable) {
                request[dsItem.editableParamName] = row[dsItem.field];
            }
        }

        this.util.callHttpPost(
            `${this.appGlobalInfo.APPCONSTANTS.BASE_URL}/api/${this.className}Api/${this.editableGridServiceName}`,
            request).then(
            (response: any) => {
                this.processServiceExecutionForRow(row, response, modifiedRows.length);
                if (modifiedRows.length > 0) {
                    this.saveChangesEditableGrid(modifiedRows);
                }
            },
            (response: any) => {
                this.processServiceExecutionFailForRow(row, response, modifiedRows.length);
                if (modifiedRows.length > 0) {
                    this.saveChangesEditableGrid(modifiedRows);
                }
            });

    }

    /**
     * Process the fail response for service execution for one row
     * @param row Row
     * @param response Service response
     * @param pendingRows Number of pending rows
     */
    private processServiceExecutionFailForRow(row: any, response: any, pendingRows: number): void {
        this.util.addErrorMessage(response.message);
        if (pendingRows === 0) {
            this.setShowWait(false);
            if (!this.editableGridExecuteInRowChange) {
                this.refreshAll();
                this.changeDetectorRef.markForCheck();
            }
        }
    }

    /**
     * Process the response for service execution for one row
     * @param row Row
     * @param response Service response
     * @param pendingRows Number of pending rows
     */
    private processServiceExecutionForRow(row: any, response: any, pendingRows: number): void {
        if (response.resultCode !== '000' && response.resultCode !== '') {
            this.util.addErrorMessage(response.resultDescription);
        }
        if (pendingRows === 0) {
            this.setShowWait(false);
            if (!this.editableGridExecuteInRowChange) {
                this.refreshAll();
                this.changeDetectorRef.markForCheck();
            } else {
                row._modified = false;
                this.processEditableGridExecutionResult(row, response);
            }
        }
    }


    /**
     * This method is called after the execution of the editable service when the execution is by selection row change
     * @param row Row
     * @param response Service response
     */
    public processEditableGridExecutionResult(row: any, response: any): void {
        // Empty method. By default do nothing
    }

    /**
     * Manages the successful execution of the associated service
     */
    public processAssociatedServiceExecutionSuccess(): void {
        // Empty method. By default do nothing
    }

    /**
     * Load the independent preload fields
     */
    public loadPreload(): void {
        // Empty method
    }

    /**
     * Navigate the the class services log scenario
     */
    public onNavigateLogClass(): void {
        // Save scenario information
        this.saveContextInfo();
        this.util.navigateToClassServiceLog('cls_' + this.className, this.getGlobalContext());
    }

    /**
     * Navigate the the instance services log scenario
     */
    public onNavigateLoginstance(): void {
        const selectedOids = this.getSelectedOids();
        if (selectedOids && selectedOids.length === 1) {
            this.saveContextInfo();
            this.util.navigateToInstanceServiceLog('cls_' + this.className, selectedOids,  this.getGlobalContext());
        }
    }

    /**
     * Navigate the the global services log scenario
     */
    public onNavigateLogGlobal(): void {
        // Save scenario information
        this.saveContextInfo();
        this.util.navigateToClassServiceLog('', this.getGlobalContext());
    }

    /**
     * Returns the value of the field in the row
     */
    public getRowData(row: any, dataName: string): any {
        return row[dataName.replace(new RegExp('\\.', 'g'), '-')];
    }

    public override setShowWait(value: boolean): void {
        if (this.masterDetailContainer) {
            this.masterDetailContainer.setShowWait(value);
        } else {
            super.setShowWait(value);
        }
    }
}
