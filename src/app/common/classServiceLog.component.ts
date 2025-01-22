import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from '../common/app.utils';

import { LanguageMng } from '../common/languageMng';
import { ConditionalNavigationMng } from '../common/conditionalNavigationMng';
import { Field } from './baseIUElements';

@Component({
    selector: 'ClassServiceLog',
    templateUrl: './classServiceLog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassServiceLogComponent implements OnInit {

    /** Scenario title */
    public title = '';
    /** Scenario is visible for the current user */
    public visible = true;
    /** URL Web api */
    private readonly queryURL = '/api/AppServicesLogApi/PIU_InstanceAppServicesLog';
    /** Last page number requested. Used to distinguish refresh and grid sort or filter */
    public lastPageNumber = -1;
    /** Last Lazy Load event values. Used in grid sort and filter operations */
    public lastLazyLoadEventValue: any;
    /** Flag to manage the pagination in client or backend */
    public paginationInClient = false;
    /** Flag to launch the search when opening the scenario */
    public autoSearch = true;
    /** Grid columns */
    public gridColumns: any[] = [];
    /** Frozen Grid columns */
    public frozenColumns: any[] = [];

    public gridColumnsInArguments: any[] = [];
    public gridColumnsOutArguments: any[] = [];

    /** Original data. To sort and filter operations */
    public gridOriginalData: any;
    public gridData: any;
    /** Pagination. Total number of instances */
    public gridTotalInstances = 0;
    /** Pagination. Page size */
    public gridPaginationPageSize = 40;
    /** Pagination. Page possible values */
    public gridPaginationPageSizeValues: number[] = [10, 20, 40, 80];
    /** Pagination. Zero-index of the first instance to be shown */
    public gridFirstInstanceDisplayed = 0;
    /** Grid selected rows */
    public gridSelectedRows: any = undefined;

    /** Class name identification */
    public classNameId = '';
    /** Instance identification */
    public instanceOID = '';
    /* Filter variable From */
    public fvFrom: Field;
    /* Filter variable To */
    public fvTo: Field;

    /** Comeback context */
    private comeBackContext: any;
    /**
     * Component constructor
     * @param appGlobalInfo Application Global Information
     * @param util Navigation utils
     * @param changeDetectorRef Angular module
     * @param langMng Language manager
     * @param condNavMng Conditional manager
     */
    constructor(
        protected appGlobalInfo: AppGlobalInfo,
        protected util: Util,
        protected changeDetectorRef: ChangeDetectorRef,
        public langMng: LanguageMng,
        protected condNavMng: ConditionalNavigationMng) {
        this.title = langMng.translateText('app_CLSLOG_TITLE', 'Class Service Log Title');

        this.fvFrom = new Field(langMng);
        this.fvFrom.alias = langMng.translateText('app_CLSLOG_VARFROM', 'From');
        this.fvFrom.editorCSSClasses = ['col-8 col-sm-4 col-md-2 inputAlignR'];
        this.fvFrom.mandatory = false;

        this.fvTo = new Field(langMng);
        this.fvTo.alias = langMng.translateText('app_CLSLOG_VARTO', 'To');
        this.fvTo.editorCSSClasses = ['col-8 col-sm-4 col-md-2 inputAlignR'];
        this.fvTo.mandatory = false;
    }

    /**
     * It is the main component. Process the initial actions
     */
    public ngOnInit(): void {
        this.appGlobalInfo.setScenarioTitle(this.title);
        if (!this.visible) {
            this.util.navigateToNoAccessPage();
        } else {
            this.initialize();
            // If pagination is in client, load data
            if (this.paginationInClient && this.autoSearch) {
                this.refresh();
            }
        }
    }

    /**
     * Initialize the scenario
     */
    public initialize(): void {

        // Extract the class id from the received information
        const exchInfo = this.appGlobalInfo.appExchangeInfo.getServicesLogExchInfo();
        if (exchInfo) {
            this.classNameId = exchInfo.targetClassName;
            this.comeBackContext = exchInfo.comeBackContext;
            if (exchInfo.selectedOids && exchInfo.selectedOids.length === 1) {
                this.instanceOID = JSON.stringify(exchInfo.selectedOids[0]);
            }
        } else {
            this.util.navigateToMain();
        }

        // Add default columns to the grid
        this.initializeToDefaultColumns();
    }

    /**
     * Initialize the grid columns. Create the frozen columns
     */
    private initializeToDefaultColumns(): void {
        this.gridColumns = [];
        this.frozenColumns = [];
        const colTimeStamp: {
            field: string, header: string, sortable: boolean, filter: boolean, filterMatchMode: string, hidden: boolean,
            styleClass: string, dataType: string, type: number, mask: string, frozen: boolean
            } = {
            field: 'timestamp', header: this.langMng.translateText('app_CLSLOG_COLTIMESTAMP', 'Timestamp'),
            sortable: true, filter: true, filterMatchMode: 'contains', hidden: false, styleClass: 'width120 alignR',
            dataType: 'datetime', type: 3, mask: 'short', frozen: true
        };
        this.frozenColumns.push(colTimeStamp);

        const colUser: {
            field: string, header: string, sortable: boolean, filter: boolean, filterMatchMode: string, hidden: boolean,
            styleClass: string, dataType: string, type: number, mask: string, frozen: boolean
            } = {
            field: 'userlogin', header: this.langMng.translateText('app_CLSLOG_COLUSER', 'Usuario'),
            sortable: true, filter: true, filterMatchMode: 'contains', hidden: false, styleClass: 'width120', dataType: 'string', type: 0,
            mask: '', frozen: true
        };
        this.frozenColumns.push(colUser);

        const colClass: {
            field: string, header: string, sortable: boolean, filter: boolean, filterMatchMode: string, hidden: boolean,
            styleClass: string, dataType: string, type: number, mask: string, frozen: boolean
            } = {
            field: 'classalias', header: this.langMng.translateText('app_CLSLOG_COLCLASS', 'Clase'),
            sortable: true, filter: true, filterMatchMode: 'contains', hidden: false, styleClass: 'width120', dataType: 'string', type: 0,
            mask: '', frozen: true
        };
        this.frozenColumns.push(colClass);

        const colService: {
            field: string, header: string, sortable: boolean, filter: boolean, filterMatchMode: string, hidden: boolean,
            styleClass: string, dataType: string, type: number, mask: string, frozen: boolean
            } = {
            field: 'servicealias', header: this.langMng.translateText('app_CLSLOG_COLSRV', 'Servicio'),
            sortable: true, filter: true, filterMatchMode: 'contains', hidden: false, styleClass: 'width120', dataType: 'string', type: 0,
            mask: '', frozen: true
        };
        this.frozenColumns.push(colService);

        const colOID: {
            field: string, header: string, sortable: boolean, filter: boolean, filterMatchMode: string, hidden: boolean,
            styleClass: string, dataType: string, type: number, mask: string, frozen: boolean
            } = {
            field: 'instanceoid', header: this.langMng.translateText('app_CLSLOG_COLINSTANCE', 'Instancia'),
            sortable: true, filter: true, filterMatchMode: 'contains', hidden: false, styleClass: 'width120', dataType: 'string', type: 0,
            mask: '', frozen: true
        };
        this.frozenColumns.push(colOID);
    }

    /**
     * Refresh the query
     * @param pageNumber Page number, 1 by default
     */
    public refresh(pageNumber = 1): void {


        // Set the last first instance requested
        this.lastPageNumber = pageNumber;

        let queryRequest = '';
        if (this.classNameId) {
            queryRequest = `?vClassId=${this.classNameId}`;
        } else {
            queryRequest = `?vClassId=`;
        }
        if (this.instanceOID) {
            queryRequest = `${queryRequest}&vInstanceOID=${this.instanceOID}`;
        } else {
            queryRequest = `${queryRequest}&vInstanceOID=`;
        }
        if (this.fvFrom.value) {
            queryRequest = `${queryRequest}&vFrom=${this.util.formatDate(this.fvFrom.value)}`;
        } else {
            queryRequest = `${queryRequest}&vFrom=`;
        }
        if (this.fvTo.value) {
            queryRequest = `${queryRequest}&vUntil=${this.util.formatDate(this.fvTo.value)}`;
        } else {
            queryRequest = `${queryRequest}&vUntil=`;
        }

        if (!this.paginationInClient) {
            queryRequest = `${queryRequest}&pageSize=${this.gridPaginationPageSize}`;
            queryRequest = `${queryRequest}&pageNumber=${pageNumber}`;
        }

        const url: string = this.appGlobalInfo.APPCONSTANTS.BASE_URL + this.queryURL + queryRequest;
        this.util.populationQuery(url, '').then((okResponse: any) => {
            const res = okResponse;
            if (res.resultCode === '000') {
                this.gridTotalInstances = res.totalItems;
                // Set data
                this.setData(res.results);
                this.gridOriginalData = res.results;
                // Apply grid order and filters
                this.orderFilterCurrentData(this.lastLazyLoadEventValue);
            } else {
                this.util.addErrorMessage(`ERROR (${res.resultCode}): ${res.resultDescription}`);
            }
            this.changeDetectorRef.markForCheck();
        }, (errorResponse: any) => {
            this.util.addErrorMessage(errorResponse.message);
            this.changeDetectorRef.markForCheck();
        });
    }

    /**
     * Assign the data
     * @param data New data
     */
    public setData(data: any): void {
        this.initializeToDefaultColumns();
        this.gridColumnsInArguments = [];
        this.gridColumnsOutArguments = [];
        if (data) {
            for (const row of data) {
                this.processRowDataInboundArguments(row);
                this.processRowDataOutboundArguments(row);
            }
        }
        this.gridData = data;
    }

    /**
     * Process a row to add the proper columns to the grid for inbound arguments
     * @param row Row data
     */
    private processRowDataInboundArguments(row: any): void {
        let argumentValues: any;
        let nameToUse = '';
        // Expand the inbound arguments
        if (row.inboundarguments) {
            argumentValues = JSON.parse(row.inboundarguments);
            if (argumentValues) {
                for (const arg of argumentValues) {
                    nameToUse = this.getColumnNameForInboundArgument(arg);
                    if (nameToUse) {
                        row[nameToUse] = arg.value;
                    }
                }
            }
        }
    }

    /**
     * Process a row to add the proper columns to the grid for outbound arguments
     * @param row Row data
     */
    private processRowDataOutboundArguments(row: any): void {
        let argumentValues: any;
        let nameToUse = '';
        // Expand the outbound arguments
        if (row.outboundarguments) {
            argumentValues = JSON.parse(row.outboundarguments);
            if (argumentValues) {
                for (const arg of argumentValues) {
                    nameToUse = this.getColumnNameForOutboundArgument(arg);
                    if (nameToUse) {
                        row[nameToUse] = arg.value;
                    }
                }
            }
        }
    }

    /**
     * Find or create the grid column for the inbound argument
     * @param argument Inbound argument information
     */
    private getColumnNameForInboundArgument(argument: any): string {

        let columnName = '';

        // Search the column using the argument alias
        for (const column of this.gridColumnsInArguments) {
            if (column.header === argument.alias) {
                columnName = column.field;
            }
        }
        // If column not exist, create a new one
        if (!columnName) {
            columnName = '_in' + this.gridColumnsInArguments.length;
            const column: {
                field: string, header: string, sortable: boolean, filter: boolean, filterMatchMode: string, hidden: boolean,
                styleClass: string, dataType: string, type: number, mask: string, frozen: boolean
                } = {
                field: columnName, header: argument.alias, sortable: true,
                filter: true, filterMatchMode: 'contains', hidden: false, styleClass: 'width120', dataType: 'string', type: 0,
                mask: '', frozen: false
            };
            this.gridColumnsInArguments.push(column);
            this.gridColumns.push(column);
        }
        return columnName;
    }

    /**
     * Find or create the grid column for the outbound argument
     * @param argument Outbound argument information
     */
    private getColumnNameForOutboundArgument(argument: any): string {

        let columnName = '';

        // Search the column using the argument alias adding an asterisk
        for (const column of this.gridColumnsOutArguments) {
            if (column.header === '*' + argument.alias) {
                columnName = column.field;
            }
        }
        // If column not exist, create a new one
        if (!columnName) {
            columnName = '_out' + this.gridColumnsOutArguments.length;
            const column: {
                field: string, header: string, sortable: boolean, filter: boolean, filterMatchMode: string, hidden: boolean,
                styleClass: string, dataType: string, type: number, mask: string, frozen: boolean
                } = {
                field: columnName, header: '*' + argument.alias, sortable: true,
                filter: true, filterMatchMode: 'contains', hidden: false, styleClass: 'width120', dataType: 'string', type: 0,
                mask: '', frozen: false
            };
            this.gridColumnsOutArguments.push(column);
            this.gridColumns.push(column);
        }
        return columnName;
    }

    /**
     * Apply the grid order and filters using the event values
     * @param eventData Values to order and filter
     */
    public orderFilterCurrentData(eventData: any): void {

        if (eventData) {
            if (eventData.filters && Object.keys(eventData.filters).length > 0) {
                this.filterCurrentData(eventData.filters);
            } else {
                // If no filter definel, use the original data
                this.setData(this.gridOriginalData);
            }

            if (eventData.sortField) {
                this.orderCurrentData(eventData.sortField, eventData.sortOrder === 1);
            }
        }
    }

    /**
     * Filter the curernt data in the screen using the grid filter information
     * @param filtersData Grid filter information
     */
    public filterCurrentData(filtersData: any): void {
        // Iterate using original data
        let filteredArray: any[] = [];
        if (!this.gridOriginalData) {
            this.setData(filteredArray);
            return;
        }

        filteredArray = this.gridOriginalData.filter((item: any) => {
            // Check all conditions
            let addOrNot = true;
            const numberOfColumns = this.gridColumns.length;
            for (let i = 0; i < numberOfColumns; i++) {
                const col = this.gridColumns[i];
                if (filtersData[col.field]) {
                    // Filter using that column
                    const filValue = filtersData[col.field].value.toLowerCase();
                    const filMode = filtersData[col.field].matchMode;

                    if (filMode === 'contains') {
                        let value: string = item[col.field];
                        value = value.toLowerCase();
                        if (value.indexOf(filValue) < 0) {
                            addOrNot = false;
                            break;
                        }
                    }
                }
            }
            return addOrNot;
        });
        this.setData(filteredArray);
    }

    /**
     * Order the current data in the screen using the column and direction specified
     * @param col Column name to use in sorting
     * @param ascendingMode If it is ascending or not
     */
    public orderCurrentData(col: string, ascendingMode: boolean): void {
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
            if (obj1[col] > obj2[col]) {
                if (ascendingMode) {
                    return 1;
                } else {
                    return -1;
                }
            }

            if (obj1[col] < obj2[col]) {
                if (ascendingMode) {
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
     * Manages the lazy load grid event
     * @param eventData Event data
     */
    public onGridLazyLoadData(eventData: any) {
        // event.rows: Data count to display per page, paginationPageSize
        // event.sortField : Sort by column
        // event.sortOrder : 1 = Ascending, -1 Descending

        // If number of rows has changed, reload the grid
        const page = eventData.first / eventData.rows + 1;
        if (this.lastLazyLoadEventValue && this.lastLazyLoadEventValue.rows !== eventData.rows) {
            this.lastPageNumber = 0;
        }

        // Save the current event value
        this.lastLazyLoadEventValue = eventData;

        if (this.lastPageNumber !== page) {
            // Launch query...
            if (eventData.rows) {
                this.gridPaginationPageSize = eventData.rows;
            }

            // event.first: Zero-relative number of the first row to be displayed.
            if (!this.paginationInClient && (this.lastPageNumber !== -1 || this.autoSearch)) {
                this.refresh(page);
            }
        } else if (eventData.sortField || (eventData.filters && Object.keys(eventData.filters).length > 0)) {
            // Order/Sort current data using the event data
            this.orderFilterCurrentData(eventData);
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
     * Manages the post-process after a auto filter in the grid
     * @param event Event arguments
     */
    public onGridFilterData(event: any): void {
        if (event?.filteredValue?.length) {
            this.gridTotalInstances = event.filteredValue.length;
        } else {
            this.gridTotalInstances = 0;
        }
    }

    public filterByColumn(dt: any, target: any, field: any, filterMatchMode: any): void {
        dt.filter(target.value, field, filterMatchMode);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Returns the text for the grid footer
     */
    public getGridTotalInstancesText(): string {
        if (this.gridTotalInstances) {
            return '# ' + this.gridTotalInstances.toString();
        } else {
            return '# ---';
        }
    }


    /**
     * Manages the refresh event in the grid
     */
    public onRefresh(): void {
        this.refresh(this.lastPageNumber);
    }

    /**
     * Process the search button
     */
    public search(): void {
        this.refresh();
    }

    /**
     * Process the clean button
     */
    public clean(): void {
        this.fvFrom.setValue(null);
        this.fvTo.setValue(null);
    }

    public getValueFromDefinedSelection(column: any, value: any): string {
        let defSelValue = '';

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
     * Process the cancel button
     */
    public processCancel(): void {
        if (this.comeBackContext) {
            this.util.navigateComeBack(this.comeBackContext);
        } else {
            this.util.navigateToMain();
        }
    }
}
