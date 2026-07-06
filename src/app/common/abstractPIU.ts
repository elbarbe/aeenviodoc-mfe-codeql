import { ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { ExchangeInfo } from './app.exchangeinfo';
import { Util } from './app.utils';
import { ConditionalNavigationMng } from './conditionalNavigationMng';
import { AbstractQueryIU, DisplaySetItem, OpenScenarioType, ScenarioType } from './queryIUElements';
import { Subscription, Subject } from 'rxjs';
import { AbstractFilter } from './abstractFilter';
import { LanguageMng } from './languageMng';
import { Field } from './baseIUElements';

export enum GridColumnType {
    Default = 0, // Standard column, for string data type
    Numeric = 1, // Numeric data type
    DefinedSelection = 2, // Defined selection column
    Date = 3, // Date, Time and Datetime data type
    Blob = 4, // Blob data type. Managed as picture
    Button = 5 // Button associated with an action or navigation element
}

/**
 * « Base class for Population Interaction scenario »
 */
export abstract class AbstractPIU extends AbstractQueryIU {

    /** Scenario context */
    public context: {
        exchangeInfo: ExchangeInfo | null, filtersContext: any[], activeFilterIndex: number, gridSelectedRows: any, gridPageSize: number,
        gridFirstRowDisplayed: number, breadCrumbTitle: string, gridExpandedRows: any, gridBuiltInFilterFields: any,
        gridSortInformation: any, customData: any} = { exchangeInfo: null, filtersContext: [], activeFilterIndex: -1, gridSelectedRows: null,
        gridPageSize: 0, gridFirstRowDisplayed: 0, breadCrumbTitle: '', gridExpandedRows: undefined, gridBuiltInFilterFields: undefined,
        gridSortInformation: undefined,
        customData: undefined};

    /** Flag to select one or more instances */
    public inSelectionMode = false;
    /** Array of filters */
    public filters: AbstractFilter[] = [];
    /** Active filter */
    public activeFilter: AbstractFilter | null = null;
    /** Order Criteria */
    public orderCriteria = '';
    public orderCriteriaList: Array<{ key: string, value: string }> = [];
    // Grid properties
    /** Multi-selection allowed or not */
    public gridAllowMultiSelection = true;
    /** Grid columns */
    public gridColumns: any[] = [];
    /** Grid selected rows */
    public gridSelectedRows: any = undefined;
    /** Grid selected rows in the previous context */
    public gridLastContextSelectedRows: any = undefined;
    public gridPreviousContextSelectedRows: any = undefined;
    /** Data to be shown */
    public gridData: any;
    /** Pagination. Total number of instances */
    public gridTotalInstances = 0;
    /** Pagination. Page size */
    public gridPaginationPageSize = 40;
    /** Pagination. Page possible values */
    public gridPaginationPageSizeValues: number[] = [10, 20, 40, 80];
    /** Pagination. Zero-index of the first instance to be shown */
    public gridFirstInstanceDisplayed = 0;
    /** Original data. To sort and filter operations */
    public gridOriginalData: any;
    /** Expanded rows information */
    public gridExpandedRows: any = {};
    /** Values of the built in column filters */
    public gridBuiltInFilterFields: any[] = [];
    /** Grid sort information */
    public gridSortInformation: any;
    /** Last page number requested. Used to distinguish refresh and grid sort or filter */
    public lastPageNumber = -1;
    /** Last Lazy Load event values. Used in grid sort and filter operations */
    public lastLazyLoadEventValue: any;
    /** Flag to manage the pagination in client or backend */
    public paginationInClient = true;
    /** Flag to manage the automatic search when page is shown */
    public autoSearch = true;
    /** Suscription to the grid preference subject */
    protected gridPreferencesSubscription: Subscription | null = null;
    /** Oid of last modified row */
    private lastModifiedRowOid: string | null = null;
    /** Grid columns change */
    public columnsChanged: Subject<void> = new Subject<void>();
    /** Hide filter variables feature active or not */
    public hideFilters = false;
    /** Active filter is hidden or visible */
    public activeFilterIsHidden = false;
    /** Grid data changed */
    public gridDataChanged: Subject<void> = new Subject<void>();
    /** Flag to control the first search when navigation come back to this scenario */
    private isComeBackSearch = false;
    /** Saving context cnformation */
    public savingContextInformation: Subject<any> = new Subject<any>();

    constructor(protected override appGlobalInfo: AppGlobalInfo,
                protected override util: Util,
                protected override changeDetectorRef: ChangeDetectorRef,
                protected langMng: LanguageMng,
                protected override condNavMng: ConditionalNavigationMng) {
        super(appGlobalInfo, util, changeDetectorRef, condNavMng);
        this.scenarioType = 'PIU';
    }

    /**
     * Process the initial actions
     */
    public override myngOnInit(): void {
        super.myngOnInit();
        // If pagination is in client, load data
        if (this.visible && this.paginationInClient){
            if (this.autoSearch) {
                this.refresh(1);
            } else {
                this.setShowWait(false);
            }
        }
    }

    /**
     * Initialize the scenario
     */
    public override initialize(): void {
        super.initialize();

        if (this.context.exchangeInfo != null && this.context.exchangeInfo.exchangeType === 'SelectionForward') {
            this.inSelectionMode = true;
            this.gridAllowMultiSelection = this.context.exchangeInfo.multiSelectionAllowed;
        } else {
            this.gridAllowMultiSelection = !this.editableGrid && this.util.isNull(this.associatedService);
            this.inSelectionMode = false;
        }

        if (this.associatedService && !this.associatedServiceRequiresSelection) {
            const exchInfo = new ExchangeInfo();
            exchInfo.exchangeType = 'Action';
            exchInfo.previous = this.getContext();
            this.associatedService.initializeFromExchangeInfo(exchInfo);
        }
    }

    /**
     * Initialize the scenario components
     */
    public override initializeComponents(): void {
        super.initializeComponents();
        // Configure the grid component using the display set information
        this.configureGrid();
        this.loadGridPreferences();
        this.initializeFilters();
        this.initializeOrderCriterias();
    }

    /**
     * Initialize the filters
     */
    public initializeFilters(): void {
        let i = 0;
        for (const filter of this.filters) {
            filter.initialize();
            filter.index = i;
            filter.searchAction.subscribe(data => this.processFilterSearchAction());
            i++;
        }
        if (this.filters.length > 0) {
            this.setActiveFilter(this.filters[0]);
        }
    }

    /**
     * Initialize the order criterias
     */
    public initializeOrderCriterias(): void {
        // Empty method
    }

    /**
     * Initialization using the exchange information received
     * @param exchInfo Exchange information
     */
    public override initializeFromExchangeInfo(exchInfo: ExchangeInfo): void {
        super.initializeFromExchangeInfo(exchInfo);
        this.initializeDefaultValues();
    }

    /**
     * Initialize default values for the IU
     */
    public override initializeDefaultValues(): Promise<void> {
        // Initialize Filter default values
        for (const filter of this.filters) {
            filter.initializeDefaultValues();
        }
        return Promise.resolve();
    }

    /**
     * Returns the text for the grid footer
     */
    public getGridTotalInstancesText(): string {
        if (this.gridTotalInstances) {
            return '# ' + this.gridTotalInstances.toLocaleString(this.langMng.getLanguageId()) ;
        } else {
            return '# ---';
        }
    }

    /**
     * Returns the context scenario
     */
    public override getContext(): any {
        return this.context;
    }

    /**
     * Sets the context scenario
     * @param newContext Context to be used
     * @param fromContextType Context type that sets the new context
     */
    public override setContext(newContext: any, fromContextType: string): void {
        this.isComeBackSearch = false;
        if (fromContextType === 'ComeBack') {
            this.autoSearch = true;
            this.isComeBackSearch = true;
        }
        this.context = newContext;
    }

    /**
     * Active filter Setter
     * @param newActiveFilter New active filter
     */
    public setActiveFilter(newActiveFilter: any): void {
        this.activeFilter = newActiveFilter;
    }

    /*
     * Set active filter by index
     */
    public setActiveFilterIndex(newActiveIndex: number): void {
        if (this.filters.length > newActiveIndex && this.activeFilter && this.activeFilter.index !== newActiveIndex) {
            for (let i = 0; i < this.filters.length; i++) {
                if (i === newActiveIndex) {
                    this.activeFilter = this.filters[i];
                    if (this.activeFilter.assignedOrderCriteria) {
                        this.orderCriteria = this.activeFilter.assignedOrderCriteria;
                    }
                    break;
                }
            }
            this.activeFilterIsHidden = false;
        }
    }

    /**
     * No selected instances in the scenario
     */
    public clearSelectedInstances(): void {
        this.gridSelectedRows = [];
    }

    /**
     * Order criteria Setter
     * @param newOrder New order criteria
     */
    public setOrderCriteria(newOrder: string): void {
        this.orderCriteria = newOrder;
    }

    /**
     * Configure the grid columns using the display set information
     */
    public configureGrid(): void {
        this.configureActionsNavigations();
        this.gridColumns = [];
        // For each element in the display set, add a column to the Grid
        for (const dsElem of this.displaySet) {
            if (this.appGlobalInfo.getLoggedUserInfo().isAttributeVisible(this.idXML, dsElem.idXML, dsElem.agents)) {

                this.addGridColumn(dsElem);

            } else {
                dsElem.visible = false;
            }
        }
        this.checkEditableGrid();
        this.gridBuiltInFilterFields = Array(this.gridColumns.length);
    }

    /**
     * Add a column to the collection
     * @param dsElem Element to be added
     */
    private addGridColumn(dsElem: DisplaySetItem): void {
        const col: {
            field: string, header: string, sortable: boolean, editable: boolean, filter: boolean, filterMatchMode: string, hidden: boolean,
            styleClass: string, dataType: string, type: number, mask: string, options: any, linkIndex: number, linkIsAction: boolean,
            width: number, applyWidth: boolean, showPopup: boolean
        } = {
            field: '', header: '', sortable: true, editable: false,
            filter: true, filterMatchMode: 'contains', hidden: false, styleClass: '', dataType: '', type: 0,
            mask: '', options: null, linkIndex: -1, linkIsAction: true, width: 0, applyWidth: true, showPopup: false
        };

        // type possible values:
        //  0 = standard column, for string data type
        //  1 = numeric data type
        //  2 = defined selection column
        //  3 = date data type
        //  4 = Blob data type. Managed as picture
        //  5 = Button associated with an action or navigation element
        col.dataType = dsElem.type.toLowerCase();
        if (dsElem.options) {
            col.type = 2;
            col.options = dsElem.options;
            col.styleClass = 'width120';
            col.width = 120;
            if (dsElem.type === Field.dtBool) {
                col.styleClass += ' alignC';
            }
        } else {
            this.assignColumnProperties(dsElem, col);
        }
        if (dsElem.linkIndex > -1) {
            col.linkIndex = dsElem.linkIndex;
            col.linkIsAction = dsElem.linkIsAction;
        }

        col.field = dsElem.field;
        col.header = dsElem.alias;

        if (this.editableGrid) {
            col.editable = dsElem.editable;
        } else {
            col.editable = false;
        }
        this.gridColumns.push(col);
    }

    /**
     * Assign properties to the column based on the display set element
     * @param dsElem Display set element
     * @param col Column
     */
    private assignColumnProperties(dsElem: DisplaySetItem, col: any): void {
        switch (dsElem.type.toLowerCase()) {
            case Field.dtAuto:
            case Field.dtInt:
            case Field.dtNat:
                col.type = 1;
                col.styleClass = 'alignR';
                col.width = 80;
                break;
            case Field.dtBool:
                col.type = 0;
                col.styleClass = 'alignC';
                col.width = 80;
                break;
            case Field.dtReal:
                col.type = 1;
                col.styleClass = 'alignR';
                col.width = 90;
                break;
            case Field.dtDate:
                col.styleClass = 'alignR';
                // https://angular.io/api/common/DatePipe
                col.mask = 'dd/MM/yyyy';
                col.type = 3;
                col.width = 90;
                break;
            case Field.dtDatetime:
                col.styleClass = 'alignR';
                col.mask = 'dd/MM/yyyy HH:mm:ss';
                col.type = 3;
                col.width = 120;
                break;
            case Field.dtTime:
                col.styleClass = 'alignR';
                col.mask = 'shortTime';
                col.type = 3;
                col.width = 80;
                break;
            case Field.dtBlob:
                col.type = 4;
                col.sortable = false;
                col.filter = false;
                col.width = 80;
                break;
            case Field.dtText:
                col.showPopup = true;
                col.width = this.calculateColWidth(50);
                break;
            case 'button':
                col.styleClass = 'buttonGrid ' + dsElem.mask;
                col.type = 5;
                col.sortable = false;
                col.filter = false;
                col.width = 40;
                // Hide the action or navigation element
                if (dsElem.linkIsAction) {
                    this.actions[dsElem.linkIndex].visible = false;
                } else {
                    this.navigations[dsElem.linkIndex].visible = false;
                }
                break;
            default:
                col.type = 0;
                col.width = 80;
                break;
        }

        if (dsElem.mask) {
            col.mask = dsElem.mask;
        }

        if (dsElem.styleClass) {
            col.styleClass += ' ' + dsElem.styleClass;
        }

        // Calculate colulmn width based on the maxLength and fieldSize
        if (dsElem.fieldSize > 0) {
            if (dsElem.fieldSize >= 300) {
                col.width = this.calculateColWidth(50);
                col.showPopup = true;
            } else {
                col.width = this.calculateColWidth(dsElem.fieldSize);
            }
        } else if (dsElem.maxLength > 0) {
            if (dsElem.maxLength > 50) {
                col.width = this.calculateColWidth(50);
            } else {
                col.width = this.calculateColWidth(dsElem.maxLength > 3 ? dsElem.maxLength : 3);
            }
        }
    }

    /**
     * Calculate the column width in pixels required to show the number of characters
     * @param lengthInCharacters Number of characters
     */
    protected calculateColWidth(lengthInCharacters: number): number {
        // If font-size is modified, ratios must be adjusted
        let ratio = 6.2;
        if (lengthInCharacters > 0 && lengthInCharacters <= 10) {
            ratio = 9;
        }
        // Calculate the size in pixels, adding the left and right padding
        return ratio * lengthInCharacters + 8;
    }

    /**
     * Assign the data
     * @param data New data
     */
    public setData(data: any): void {
        if (data && data.length > 0) {
            this.activeFilterIsHidden = true;
            for (const row of data) {
                for (const dsElem of this.displaySet) {
                    if (row[dsElem.field]) {
                        if (dsElem.type.toLowerCase() === 'date') {
                            row[dsElem.field] = this.util.getDate(row[dsElem.field]);
                        } else if (dsElem.type.toLowerCase() === 'datetime') {
                            row[dsElem.field] = this.util.getDateTime(row[dsElem.field]);
                        } else if (dsElem.type.toLowerCase() === 'time') {
                            row[dsElem.field] = this.util.getTime(row[dsElem.field]);
                        }
                    }
                }
            }
        } else {
            this.activeFilterIsHidden = false;
        }
        this.gridData = data;
        this.gridDataChanged.next();
    }

    /**
     * Return the number of selected instances
     */
    public override getNumSelectedInstances(): number {
        let numInstances = 0;
        if (this.gridSelectedRows) {
            if (this.gridAllowMultiSelection) {
                numInstances = this.gridSelectedRows.length;
            } else {
                numInstances = 1;
            }
        }
        return numInstances;
    }

    /**
     * Manages the new selected row in the grid
     * @param event Event information
     */
    public onGridRowSelect(event: any) {
        this.onGridChangeSelection(event, true);
    }

    /**
     * Manages the unselect row in the grid
     * @param event Event information
     */
    public onGridRowUnselect(event: any) {
        this.onGridChangeSelection(event, false);
    }

    /**
     * Manages the quick selection inthe grid
     * @param row Selected row
     */
    public onGridQuickSelection(row: any) {
        this.gridSelectedRows = [row];
        this.doSelection();
    }

    /**
     * Manages the change in the grid selection
     * @param event Event
     * @param selected If a row has been selected or unselected
     */
    protected onGridChangeSelection(event: any, selected: boolean): void {
        // Notify the change in the selection
        this.selectionChanged.next();
        this.changeDetectorRef.markForCheck();
        // If editable grid execution is configured by row selection change ...
        if (this.editableGridExecuteInRowChange) {
            // Check if the current selected row is the same of previous
            if (this.lastModifiedRowOid && (!selected || this.lastModifiedRowOid !== event.data.oid)) {
                this.onSaveChangesEditableGrid();
            }
        }
    }

    /**
     * Process the Grid paging events
     * @param event paging information
     */
    public onGridPaging(event: any) {
        // event.first: First row displayed
        // event.rows : Rows per page
        if (event) {
            this.gridFirstInstanceDisplayed = event.first;
        }
    }

    /**
     * Manages the lazy load grid event
     * @param event Event data
     */
    public onGridLazyLoadData(event: any) {
        // event.rows: Data count to display per page, paginationPageSize
        // event.sortField : Sort by column
        // event.sortOrder : 1 = Ascending, -1 Descending

        let requestedPage = event.first / event.rows + 1;
        if (this.isComeBackSearch) {
            requestedPage = this.gridFirstInstanceDisplayed / event.rows + 1;
            this.isComeBackSearch = false;
        }
        // If number of rows has changed, reload the grid
        if (this.lastLazyLoadEventValue && this.lastLazyLoadEventValue.rows !== event.rows) {
            this.lastPageNumber = 0;
        }

        // Save the current event value
        this.lastLazyLoadEventValue = event;

        if (this.lastPageNumber !== requestedPage) {
            // Launch query...
            if (event.rows) {
                this.gridPaginationPageSize = event.rows;
            }

            // event.first: Zero-relative number of the first row to be displayed.
            if (!this.paginationInClient && (this.lastPageNumber !== -1 || this.autoSearch)) {
                this.refresh(requestedPage);
            } else {
                this.setShowWait(false);
            }
        }
    }

    /**
     * Order the current data in the screen using the column and direction specified
     * @param column Column name to use in sorting
     * @param ascending If it is ascending or not
     */
    public orderCurrentData(column: string, ascending: boolean): void {
        if (!this.gridData) {
            return;
        }
        // Copy the current data
        const sortedArray: any[] = [];
        for (const item of this.gridData) {
            sortedArray.push(item);
        }
        // Sort temporal data
        sortedArray.sort((obj1: any, obj2: any) => {
            if (obj1[column] > obj2[column]) {
                if (ascending) {
                    return 1;
                } else {
                    return -1;
                }
            }

            if (obj1[column] < obj2[column]) {
                if (ascending) {
                    return -1;
                } else {
                    return 1;
                }
            }
            return 0;
        });
        // Assign sorted data to the grid variable
        this.setData(sortedArray);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Manages the auto sort in the grid
     * @param event Event arguments
     */
    public onGridSortData(event: any): void {
        if (event) {
            // Save sort information
            if (event.multisortmeta) {
                this.gridSortInformation = event.multisortmeta;
            } else {
                this.gridSortInformation = [{field: event.field, order: event.order}];
            }
        }
    }

    /**
     * Manages the click in a cell link
     * @param row Selected row
     * @param isAction Indicates if it is an action or a navigationthe associated
     * @param indexAccNav Action or navigation index
     */
    public onGridClickCell(row: any, isAction: boolean, indexAccNav: number, openType: OpenScenarioType = OpenScenarioType.Default) {
        this.gridSelectedRows = [row];
        if (isAction) {
            this.doAction(indexAccNav);
        } else {
            this.doNavigation(indexAccNav);
        }
    }

    /**
     * Manages the double click in a cell
     * @param row Selected row
     */
    public onGridDblClickCell(row: any) {
        // Empty method
    }

    /**
     * Manages the activation of the associated service
     * @param row Selected row data
     */
    public onActivateAssociatedService(row: any): void {
        if (row && this.associatedService) {
            this.gridSelectedRows = [row];
            this.associatedService.cleanArgumentValues();
            const exchInfo = new ExchangeInfo();
            exchInfo.exchangeType = 'Action';
            exchInfo.previous = this.getContext();
            exchInfo.selectedOids = [JSON.parse(row.oid)];
            exchInfo.selectedOidsClassName = this.className;
            this.associatedService.initializeFromExchangeInfo(exchInfo);
            this.associatedServiceEnabled = true;
        } else {
            this.associatedServiceEnabled = false;
        }
    }

    /**
     * Clear the values of the associated service
     */
    public onClearAssociatedService(): void {
        if (this.associatedService) {
            if (this.associatedServiceRequiresSelection) {
                this.associatedServiceEnabled = false;
            }
            this.associatedService.cleanArgumentValues();
        }
    }

    /**
     * Save the scenario context information. Oposite to loadFromContext
     */
    public override saveContextInfo(): void {
        this.context.breadCrumbTitle = this.title;
        this.context.filtersContext = [];
        for (const filter of this.filters) {
            this.context.filtersContext.push(filter.getContextInfo());
        }
        if (this.activeFilter) {
            this.context.activeFilterIndex = this.activeFilter.index;
        } else {
            this.context.activeFilterIndex = -1;
        }
        this.context.gridSelectedRows = this.gridSelectedRows;
        this.context.gridPageSize = this.gridPaginationPageSize;
        this.context.gridFirstRowDisplayed = this.gridFirstInstanceDisplayed;
        this.context.gridExpandedRows = this.gridExpandedRows;
        this.context.gridBuiltInFilterFields = this.gridBuiltInFilterFields;
        this.context.gridSortInformation = this.gridSortInformation;
        this.savingContextInformation.next(this.context)
    }

    /**
     * Initialize the scenario using the context information. Oposite to saveContextInfo
     */
    public override loadFromContext(): void {
        if (this.context.filtersContext && this.filters.length === this.context.filtersContext.length) {
            let i = 0;
            for (const filter of this.filters) {
                filter.setContextInfo(this.context.filtersContext[i]);
                i++;
            }
            this.setActiveFilterIndex(this.context.activeFilterIndex);
        }
        this.gridPreviousContextSelectedRows = this.context.gridSelectedRows;
        this.gridSelectedRows = this.context.gridSelectedRows;
        this.gridPaginationPageSize = this.context.gridPageSize;
        this.gridFirstInstanceDisplayed = this.context.gridFirstRowDisplayed;
        this.gridExpandedRows = this.context.gridExpandedRows;
        this.gridBuiltInFilterFields = this.context.gridBuiltInFilterFields;
        this.gridSortInformation = this.context.gridSortInformation;
    }

    /**
     * Returns an array containing the selected rows
     */
    public override getSelectedInstances(): any[] {
        let selected: any[] = [];
        if (this.gridSelectedRows) {
            if (Array.isArray(this.gridSelectedRows)) {
                selected = this.gridSelectedRows;
            } else {
                selected.push(this.gridSelectedRows);
            }
        }
        return selected;
    }

    /**
     * Returns an array containing the Oids of the selected rows
     */
    public override getSelectedOids(): any[] {
        const oids: any[] = [];
        if (this.gridSelectedRows) {
            if (Array.isArray(this.gridSelectedRows)) {
                if (this.gridSelectedRows.length > 0) {
                    for (const selRow of this.gridSelectedRows) {
                        oids.push(JSON.parse(selRow.oid));
                    }
                }
            } else {
                oids.push(JSON.parse(this.gridSelectedRows.oid));
            }
        }

        return oids;
    }

    /**
     * Update the data in the screen. Launch the proper query and retieve the data
     * @param pageNumber Requested page number
     */
    public override refresh(pageNumber = -1): void {

        if (pageNumber === -1) {
            pageNumber = this.lastPageNumber;
        }

        if (pageNumber <= 0) {
            pageNumber = 1;
        }
        if (this.activeFilter && (!this.activeFilter.initialized || !this.activeFilter.canBeExecuted())) {
            this.activeFilterIsHidden = false;
            return;
        }

        // Related filtering. Related instance is required
        if (this.context.exchangeInfo != null && this.context.exchangeInfo.exchangeType === 'Navigation' &&
            (!this.context.exchangeInfo.selectedOids || this.context.exchangeInfo.selectedOids.length !== 1)) {
            this.clearSelectedInstances();
            this.setData(null);
            this.gridTotalInstances = 0;
            this.gridOriginalData = null;
            return;
        }

        // Reset the first visible row
        if (pageNumber === 1) {
            this.gridFirstInstanceDisplayed = 0;
        }
        
        // Set the last first instance requested
        this.lastPageNumber = pageNumber;

        const queryRequest = this.getQueryRequest();
        queryRequest.pageNumber = pageNumber;

        const url: string = this.appGlobalInfo.APPCONSTANTS.BASE_URL + this.queryURL;

        this.setShowWait(true);
        this.util.populationQuery(url, queryRequest).then((okResponse: any) => {
            this.setShowWait(false);
            const res = okResponse;
            if (res.resultCode === '000') {
                this.gridTotalInstances = res.totalItems;
                // Set data
                this.gridOriginalData = res.results;
                this.setData(res.results);
            } else {
                this.util.addErrorMessage(`ERROR (${res.resultCode}): ${res.resultDescription}`);
            }
            // Verify if the selected rows are in the current data
            this.verifySelectedRowsInData();
            this.changeDetectorRef.markForCheck();
        }).catch( (errorResponse: any) => {
            this.util.addErrorMessage(errorResponse.message);
            this.setShowWait(false);
        });
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Returns the query request
     */
    public getQueryRequest(): { piuName: string, displaySetItems: string, pageSize: number,
        orderCriteriaName: string, filters: any[], pageNumber: number } {

        let pageSize = 0;
        if (!this.paginationInClient) {
            pageSize = this.gridPaginationPageSize;
        }
        const queryRequest: { piuName: string, displaySetItems: string, pageSize: number, orderCriteriaName: string,
            filters: any[], pageNumber: number } = {
            piuName: this.iuName,
            displaySetItems: this.getDisplaySetElements(),
            pageSize,
            orderCriteriaName: this.orderCriteria,
            filters: [],
            pageNumber: 1
        };

        // Related filtering. Related instance is required
        if (this.context.exchangeInfo != null && this.context.exchangeInfo.exchangeType === 'Navigation' &&
            this.context.exchangeInfo.rolePath &&
            this.context.exchangeInfo.selectedOids && this.context.exchangeInfo.selectedOids.length === 1) {
            const filterRelated: { name: string, variables: any[] } = {
                name: '_Related',
                variables: []
            };
            filterRelated.variables.push({ name: 'relatedInstancePath', value: this.context.exchangeInfo.rolePath });
            filterRelated.variables.push({ name: 'relatedInstanceOid', value: JSON.stringify(this.context.exchangeInfo.selectedOids[0]) });
            queryRequest.filters.push(filterRelated);
        }

        // Active filter
        if (this.activeFilter) {
            queryRequest.filters.push(this.activeFilter.getFilterData());
        }

        // Navigational filters
        if (this.hasNavigationalFilters()) {
            queryRequest.filters = queryRequest.filters.concat(this.getNavigationalFilters());
        }

        return queryRequest;
    }

    /**
     * Check if the selected rows are present in the current data
     */
    private verifySelectedRowsInData(): void {

        // If there is a previous selected rows, use them
        if (this.gridPreviousContextSelectedRows) {
            this.gridSelectedRows = this.gridPreviousContextSelectedRows;
            this.gridPreviousContextSelectedRows = undefined;
        }

        // If no data, return
        if (!this.gridData) {
            this.gridSelectedRows = undefined;
            // Notify the change in the selection
            this.selectionChanged.next();
            return;
        }

        // If no selected rows, return
        if (!this.gridSelectedRows) {
            // Notify the change in the selection
            this.selectionChanged.next();
            return;
        }

        // Verify if the selected rows are in the current data
        let currentSelectedRows: any[] = [];
        const newSelectedRows: any[] = [];
        if (Array.isArray(this.gridSelectedRows)) {
            currentSelectedRows = this.gridSelectedRows;
        } else {
            currentSelectedRows.push(this.gridSelectedRows);
        }
        for (const instance of currentSelectedRows) {
            for (const data of this.gridData) {
                if (data.oid === instance.oid) {
                    newSelectedRows.push(data);
                    break;
                }
            }
        }
        this.gridSelectedRows = newSelectedRows;

        // Notify the change in the selection
        this.selectionChanged.next();
    }

    /**
     * Process the filter execution
     */
    public processFilterSearchAction(): void {
        this.gridSelectedRows = undefined;
        this.gridExpandedRows = {};
        this.selectionChanged.next();
        this.refresh(1);
    }

    /**
     * Process the instance selection and navigate to the caller scenario
     */
    public doSelection(): void {
        if (this.getNumSelectedInstances() > 0 && this.context.exchangeInfo != null &&
            this.context.exchangeInfo.exchangeType === 'SelectionForward') {
            this.util.navigateSelectionBackward(this.context.exchangeInfo, this.className, this.getSelectedOids());
        }
    }

    /**
     * Process the scenario cancel button
     */
    public override processCancel(): void {
        if (this.context.exchangeInfo != null && this.context.exchangeInfo.exchangeType === 'SelectionForward') {
            this.util.navigateSelectionBackward(this.context.exchangeInfo, this.className, null);
        } else {
            super.processCancel();
        }
    }

    /**
     * Assign values from selection backward
     * @param exchInfo Selection information
     */
    public override assignValuesFromSelectionBackward(exchInfo: ExchangeInfo): void {
        super.assignValuesFromSelectionBackward(exchInfo);
        for (const filter of this.filters) {
            if (filter.filterName === exchInfo.originServiceName) {
                filter.processSelectionBackward(exchInfo);
                break;
            }
        }
    }

    /**
     * Sets the selected instance in the master
     * @param selectedOidMaster Selected Oid in the master
     */
    public override setSelectedInstanceFromMaster(selectedOidMaster: any): void {
        // Build the navigation context, if it exists
        if (this.context.exchangeInfo != null) {
            if (this.context.exchangeInfo.navigationalFilterIdentity.length > 0 &&
                selectedOidMaster && selectedOidMaster.length > 0) {
                this.context.exchangeInfo.navigationalFilterVariables = [{ name: 'SelectedObject', value: JSON.stringify(selectedOidMaster[0]) }];
            }
            this.clearSelectedInstances();
            this.context.exchangeInfo.selectedOids = selectedOidMaster;
            if (!this.context.exchangeInfo.selectedOids || this.context.exchangeInfo.selectedOids.length === 0) {
                this.setData(null);
                this.gridOriginalData = null;
            }
        }
        this.selectionChanged.next();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Returns the value for a defined selection attribute in the grid
     * @param column Column with defined selection
     * @param value Attribute value
     */
    public getValueFromDefinedSelection(column: any, value: any): string {
        let defSelValue = value;

        if (column?.options) {
            let foundElement: any;
            if (value === '') {
                foundElement = column.options.find((element: any) => element.key === null);
            } else {
                foundElement = column.options.find((element: any) => element.key === value);
            }
            if (foundElement) {
                defSelValue = foundElement.value;
            }
        }

        return defSelValue;
    }

    /**
     * Manages the edit event in an editable grid cell
     * @param data Row data
     * @param field Modified field
     */
    public onCellEditComplete(data: any, field: string) {
        // Mark the row as modified
        data._modified = true;
        this.lastModifiedRowOid = data.oid;
    }

    /**
     * Manages the save changes event in an editable grid
     */
    public override onSaveChangesEditableGrid(): void {
        this.lastModifiedRowOid = null;
        super.onSaveChangesEditableGrid();
    }

    /**
     * Returns the modified rows by the user in the grid
     */
    public override getModifiedRows(): any[] {
        const modRows = [];
        for (const row of this.gridData) {
            if (row._modified) {
                modRows.push(row);
            }
        }
        return modRows;
    }

    /**
     * Check if all editable columns are visible. If not, mark the grid as non editable
     */
    private checkEditableGrid(): void {
        if (!(this.editableGridArgThisName && this.editableGridServiceName)) {
            this.editableGrid = false;
            return;
        }
        this.editableGrid = true;
        for (const dsElem of this.displaySet) {
            if (dsElem.editable) {
                if (!this.checkEditableGridColumn(dsElem)) {
                    this.editableGrid = false;
                    break;
                }
            }
        }
    }

    /**
     * Checks if the editable item is really editable or not
     * @param dsItem Editable display set item
     */
    private checkEditableGridColumn(dsItem: DisplaySetItem): boolean {
        if (dsItem.visible) {
            const column = this.gridColumns.find((col) => col.field === dsItem.field);
            if (column) {
                return !column.hidden;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * Manages the refresh event in the grid
     */
    public onRefresh(): void {
        this.refresh(this.lastPageNumber);
    }

    /**
     * Manages the successful execution of the associated service
     */
    public override processAssociatedServiceExecutionSuccess(): void {
        this.onClearAssociatedService();
        this.onRefresh();
    }

    /**
     * Process the request to personalize the grid columns
     */
    public onGridPreferences(): void {
        this.gridPreferencesSubscription =
            this.util.gridPreferencesResponse.subscribe((data) => this.processGridPreferencesResponse(data));
        const gridColumnsToEdit = [];
        // Copy the relevant information of each column
        for (const col of this.gridColumns) {
            gridColumnsToEdit.push({ field: col.field, header: col.header, visible: !col.hidden});
        }
        // Notify
        this.util.gridPreferencesAction.next(gridColumnsToEdit);
    }

    /**
     * Process the response from grid column preferences
     */
    protected processGridPreferencesResponse(data: any): void {
        if (this.gridPreferencesSubscription != null) {
            this.gridPreferencesSubscription.unsubscribe();
            this.gridPreferencesSubscription = null;
        }
        if (data) {
            if (data.result === 0 && data.cols) {
                // Check current columns with the personalized ones
                this.applyColumnsPreferences(data.cols);
                this.saveGridPreferences();
                this.columnsChanged.next();
                this.refresh(1);
                this.changeDetectorRef.markForCheck();
            }
            if (data.result === -1) {
                this.deleteGridPreferences();
                this.configureGrid();
                this.columnsChanged.next();
                this.changeDetectorRef.markForCheck();
            }
        }
    }

    /**
     * Apply the desired prefences to the grid columns
     * @param cols Preferences information
     */
    private applyColumnsPreferences(cols: any[]): void {
        const arrayCols = [];
        let column: any;
        let lastVisibleColumn: any;
        for (const colMod of cols) {
            column = this.gridColumns.find((col) => col.field === colMod.field);
            if (column) {
                column.applyWidth = true;
                column.hidden = !colMod.visible;
                column.header = colMod.header;
                arrayCols.push(column);
                if (!column.hidden) {
                    lastVisibleColumn = column;
                }
            }
        }
        this.gridColumns = arrayCols;
        this.checkEditableGrid();
    }

    /**
     * Delete the grid preferences
     */
    protected deleteGridPreferences(): void {
        if (this.appGlobalInfo.getLoggedUserInfo().gridPreferencesInLocalStorage) {
            const key = this.appGlobalInfo.getLoggedUserInfo().getPreferencesKey() + this.iuName;
            localStorage.removeItem(key);
        } else if (this.appGlobalInfo.getLoggedUserInfo().oid) {
            this.appGlobalInfo.getLoggedUserInfo().removeGridPreferencesByName(this.iuName);
            this.util.deleteGridPreferences(this.iuName).catch((err: any) => {
                console.log('Error deleting grid preferences');
                console.log(err);
            });
        }
    }

    /**
     * Save the grid preferences
     */
    public saveGridPreferences(): void {
        const arrayCols = [];
        for (const col of this.gridColumns) {
            arrayCols.push({
                field: col.field,
                header: col.header,
                hidden: col.hidden,
                width: col.width});
        }
        const cols = JSON.stringify(arrayCols);
        if (this.appGlobalInfo.getLoggedUserInfo().setGridPreferencesByName(this.iuName, cols)) {
            this.util.saveGridPreferences(this.iuName, cols).catch((err) => {
                console.log('Error saving grid preferences');
                console.log(err);
            });
        }
    }

    /**
     * Load and apply existing grid preferences
     */
    protected loadGridPreferences(): void {

        let cols;
        if (this.appGlobalInfo.getLoggedUserInfo().gridPreferencesInLocalStorage) {
            const key = this.appGlobalInfo.getLoggedUserInfo().getPreferencesKey() + this.iuName;
            cols = localStorage.getItem(key);
        } else {
            cols = this.appGlobalInfo.getLoggedUserInfo().getGridPreferencesByName(this.iuName);
        }
        if (!cols) {
            return;
        }
        const colArray = JSON.parse(cols);
        // Check loaded columns with the original ones
        let column: any;
        const arrayCols = [];
        for (const col of colArray) {
            column = this.gridColumns.find((data) => data.field === col.field);
            if (column) {
                column.hidden = col.hidden;
                column.header = col.header;
                if (col.width) {
                    column.width = col.width;
                }
                arrayCols.push(column);
            }
        }
        this.gridColumns = arrayCols;
    }

    /**
     * Load the independent preload fields in filters
     */
    public override loadPreload(): void {
        for (const filter of this.filters) {
            filter.loadPreload();
        }
    }

    /**
     * Returns true if preferences button must be shown or not
     */
    public showPreferences(): boolean {
        if (this.appGlobalInfo.getLoggedUserInfo().oid) {
            return true;
        }
        return false;
    }

    /**
     * Set the column with and adjusts the last column width apply flag depending on the grid total width
     * @param colIndex Index of the resized column
     * @param colWidth New column width
     * @param gridWidth Total grid width
     */
    public adjustColumnWidth(colIndex: number, colWidth: number, gridWidth: number): void {
        // const visibleColumns = this.gridColumns.filter(col => !col.hidden);
        // if (visibleColumns.length > colIndex) {
        //     // Apply width to all columns
        //     visibleColumns.forEach( (col: any) => { col.applyWidth = true; });
        //     const totalColWidth = this.getVisibleColumnsWidth() - visibleColumns[colIndex].width + colWidth;
        //     visibleColumns[colIndex].width = colWidth;
        //     // If grid is smaller than the required size
        //     if (gridWidth > totalColWidth) {
        //         // Last column must not apply the width
        //         // visibleColumns[visibleColumns.length - 1].applyWidth = false;
        //         visibleColumns[visibleColumns.length - 1].width += gridWidth - totalColWidth;
        //     }

        //     this.changeDetectorRef.detectChanges();
        // }
    }

    /**
     * Adjusts the last column width apply flag depending on the grid total width
     * @param gridWidth Grid total width
     */
    public adjustLastColumnWidth(gridWidth: number): void {
        // if (gridWidth > 0) {
        //     const visibleColumns = this.gridColumns.filter(col => !col.hidden);
        //     visibleColumns.forEach( (col: any) => { col.applyWidth = true; });
        //     const totalColumnsWith = this.getVisibleColumnsWidth();
        //     // if (totalColumnsWith < gridWidth) {
        //     //     visibleColumns[visibleColumns.length - 1].applyWidth = false;
        //     // }
        // }
    }

    /**
     * Returns the visible columns total width
     */
    protected getVisibleColumnsWidth(): number {
        let totalWidth = 0;
        const visibleColumns = this.gridColumns.filter(col => !col.hidden);
        for (const col of visibleColumns) {
            totalWidth += col.width;
        }
        return totalWidth + visibleColumns.length + 1;
    }

    /**
     * Returns the CSS classes for the show filter button
     */
    public getShowFilterCSSClass(): string {
        return 'btn btn-outline-secondary btn-sm pi pi-plus btnFilterShow';
    }

    /**
     * Returns the CSS classes for the hide filter button
     */
    public getHideFilterCSSClass(): string {
        return 'btn btn-outline-secondary btn-sm pi pi-times btnFilterHide';
    }

    /**
     * Shows the active filter
     */
    public showCurrentFilter(): void {
        this.activeFilterIsHidden = false;
    }

    /**
     * Hides the active filter
     */
    public hideCurrentFilter(): void {
        this.activeFilterIsHidden = true;
    }

    /**
     * Process the expand detail action
     * @param rowData Expanded row data
     */
    public processExpandDetail(rowData: any): void {
        this.gridSelectedRows = [rowData];
        this.onGridChangeSelection({data: rowData}, true);
    }

    public override keepSelection(): void {
        this.gridPreviousContextSelectedRows = this.gridSelectedRows;
    }

    public addRowToSelected(row: any): void {
        if (row) {
            if (this.gridAllowMultiSelection && this.gridSelectedRows) {
                if (Array.isArray(this.gridSelectedRows)) {
                    // If not exist
                    const ind = this.gridSelectedRows.findIndex( x => x.oid === row.oid);
                    if (ind === -1) {
                        this.gridSelectedRows.push(row);
                    }
                } else if (this.gridSelectedRows.oid !== row.oid) {
                    this.gridSelectedRows = row;
                }
            } else {
                this.gridSelectedRows = [row];
            }
            this.selectionChanged.next();
        }
    }

    public removeRowFromSelected(row: any): void {
        if (row) {
            if (this.gridSelectedRows) {
                if (Array.isArray(this.gridSelectedRows)) {
                    // If exist
                    const ind = this.gridSelectedRows.findIndex( x => x.oid === row.oid);
                    if (ind >= 0) {
                        this.gridSelectedRows.splice(ind, 1);
                    }
                } else if (this.gridSelectedRows.oid === row.oid) {
                    this.gridSelectedRows = [];
                }
            }
            this.selectionChanged.next();
        }
    }

    public getRowCssClasses(dataRow: any): string {
        return '';
    }

    /**
     * Returns the text containing information about the selected instance
     * @returns 
     */
    protected override formTextForTitleInTarget(): Promise<string> {
        // Return text for target scenario. Format => alias: oidValues - displaySetValues
        // Only if there is only one instance selected
        if (this.gridSelectedRows) {
            let instance = this.gridSelectedRows;
            if (Array.isArray(this.gridSelectedRows)) {
                if (this.gridSelectedRows.length > 1) {
                    return Promise.resolve('');
                }
                instance = this.gridSelectedRows[0]
            }
            let oidValues = '';
            let attValues = '';
            for (const att of this.supplementaryInfoAtt) {
                if (instance[att]) {
                    attValues += ' ' + instance[att];
                }
            }
            if (oidValues || attValues) {
                return Promise.resolve(this.classAlias + ':' + oidValues + ' - ' + attValues);    
            }
            return Promise.resolve('');
        } else {
            return Promise.resolve('');
        }
    }
}

