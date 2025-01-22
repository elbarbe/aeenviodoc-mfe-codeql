import { AbstractIIU } from './abstractIIU';
import { AbstractPIU } from './abstractPIU';
import { ExchangeInfo } from './app.exchangeinfo';
import { AbstractIU } from './baseIUElements';
import { AbstractQueryIU } from './queryIUElements';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from './app.utils';
import { ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Base class for Master-Detail Interaction scenario
 */
export abstract class AbstractMDIU extends AbstractIU {

    /** Scenario context */
    public context: { exchangeInfo: ExchangeInfo | null, activeDetail: number, masterContext: any, detailsContext: any[],
                      breadCrumbTitle: string, inRowDetailContext: any[] } = { exchangeInfo: null, activeDetail: 0, masterContext: null,
                      detailsContext: [], breadCrumbTitle: '', inRowDetailContext: [] };

    /** Master component */
    public masterAbstract!: AbstractQueryIU;
    /** Detail components */
    public details: Array<(AbstractQueryIU | AbstractMDIU)> = [];
    /** Active detail */
    public activeDetail = 0;
    /** If the component is part of a Master-Detail scenario, it is the Master detail container */
    public masterDetailContainer!: AbstractMDIU;
    /** Flag to enabled or not the details */
    public enableDetails = false;
    /** Load detail data only if the detail in the active one  */
    public loadDetailsOnDemand = true;
    /** Expand details in the master data area. Only when Master is a PIU */
    public expandDetails = false;
    /** Event to obtain the context of details in row */
    public detailsContextRequired: Subject<void> = new Subject<void>();

    constructor(protected override appGlobalInfo: AppGlobalInfo,
                protected override util: Util,
                protected override changeDetectorRef: ChangeDetectorRef) {
        super(appGlobalInfo, util, changeDetectorRef);
        this.scenarioType = 'MDIU';
    }


    public createDetails(masterOid: string): Array<(AbstractQueryIU | AbstractMDIU)> {
        return [];
    }

    /**
     * Returns the context scenario
     */
    public override getContext(): any {
        return this.context;
    }

    /**
     * Sets the context scenario
     * @param newContext New context
     * @param fromContextType Context type that sets the new context
     */
    public override setContext(newContext: any, fromContextType: string): void {
        this.context = newContext;
        if (fromContextType === 'ComeBack' && !this.masterAbstract.isInstanceIU()) {
            const populationIU: AbstractPIU = this.masterAbstract as AbstractPIU;
            populationIU.autoSearch = true;
        }
    }

    /**
     * Sets the active detail index
     * @param newActiveDetail New active detail index
     */
    public setActiveDetail(newActiveDetail: number): void {
        if (newActiveDetail !== this.activeDetail) {
            this.activeDetail = newActiveDetail;
            // Refresh the current active detail
            this.refreshDetails();
        }
    }

    /**
     * Assigns the exchange information
     * @param exchInfo Exchange information
     */
    public setExchangeInfo(exchInfo: ExchangeInfo): void {
        this.getContext().exchangeInfo = exchInfo;
        this.masterAbstract.getContext().exchangeInfo = exchInfo;
    }

    /**
     * Initialize the scenario
     */
    public override initialize(): void {
        this.initializeComponents();

        // Get the exchange information
        const exchInfo: ExchangeInfo = this.appGlobalInfo.appExchangeInfo.getExchangeInfoForScenario(this.className, this.iuName);

        switch (exchInfo.exchangeType) {
            case 'SelectionBackward':
                // Set the original context to the controller
                this.processSelectionBackward(exchInfo);
                break;
            case 'ComeBack':
                // Set the original context to the controller
                this.setContext(exchInfo.originalContext, 'ComeBack');
                this.loadFromContext();
                break;
            default:
                this.initializeFromExchangeInfo(exchInfo);
                break;
        }
    }

    /**
     * Default initialiation using the exchange information received
     * @param exchInfo Exchange information
     */
    public initializeFromExchangeInfo(exchInfo: ExchangeInfo): void {
        this.getContext().exchangeInfo = exchInfo;
        this.masterAbstract.getContext().exchangeInfo = exchInfo;
        if (this.masterAbstract.isInstanceIU()) {
            const instanceIU: AbstractIIU = this.masterAbstract as AbstractIIU;
            instanceIU.initializeFromContext();
        } else {
            const populationIU: AbstractPIU = this.masterAbstract as AbstractPIU;
            populationIU.initializeFromExchangeInfo(exchInfo);
            if (populationIU.paginationInClient) {
                populationIU.refresh(1);
            }
        }
        this.loadPreload();
    }

    /**
     * Save the scenario context information. Oposite to loadFromContext
     */
    public override saveContextInfo(): void {
        this.context.breadCrumbTitle = this.title;
        this.context.activeDetail = this.activeDetail;
        // Save the master context
        this.masterAbstract.saveContextInfo();
        this.context.masterContext = this.masterAbstract.getContext();
        // Save the context od every detail
        this.context.detailsContext = [];
        this.details.forEach((value) => {
            value.saveContextInfo();
            this.context.detailsContext.push(value.getContext());
        });
        this.context.inRowDetailContext = [];
        this.detailsContextRequired.next();
    }

    /**
     * Initialize the scenario using the context information. Oposite to saveContextInfo
     */
    public override loadFromContext(): void {
        this.activeDetail = this.context.activeDetail;
        // restore the master context
        this.masterAbstract.setContext(this.context.masterContext, '');
        // Remove the selected instance in the master. It will be assigned by the master component
        if (this.masterDetailContainer) {
            this.masterAbstract.getContext().exchangeInfo.selectedOids = undefined;
        }
        this.masterAbstract.loadFromContext();

        // Restore the context to every detail
        for (let i = 0; i < this.details.length; i++) {
            this.details[i].setContext(this.context.detailsContext[i], '');
            // Remove the selected instance in the detail. It will be assigned by the master component
            this.details[i].getContext().exchangeInfo.selectedOids = undefined;
            this.details[i].loadFromContext();
        }

        if (!this.masterDetailContainer) {
            // Main Master is an instance, force refresh
            if (this.masterAbstract.isInstanceIU()) {
                const instanceIU: AbstractIIU = this.masterAbstract as AbstractIIU;
                instanceIU.refresh();
            } else {
                // Main Master is a population, if pagination is in client, force refresh
                const populationIU: AbstractPIU = this.masterAbstract as AbstractPIU;
                if (populationIU.paginationInClient) {
                    populationIU.refresh(1);
                }
            }
        }
    }

    /**
     * Returns the global context of the scenario
     */
    public override getGlobalContext(): any {
        if (this.masterDetailContainer) {
            return this.masterDetailContainer.getGlobalContext();
        } else {
            this.saveContextInfo();
            return this.getContext();
        }
    }

    /**
     * Process the change in the instance selected in the master
     */
    public processMasterSelectionChanged(): void {

        const oidSelMaster = this.masterAbstract.getSelectedOids();
        // Enable details or not
        if (oidSelMaster && oidSelMaster.length === 1) {
            this.enableDetails = true;
        } else {
            this.enableDetails = false;
        }

        // Propagate the change in the selection in the master
        for (const detail of this.details) {
            detail.setSelectedInstanceFromMaster(oidSelMaster);
        }

        // Refresh the details
        this.refreshDetails();
    }

    /**
     * Process the change in the selection in the master component
     * @param selectedOidMaster Selected instance Oid
     */
    public setSelectedInstanceFromMaster(selectedOidMaster: any): void {
        this.masterAbstract.setSelectedInstanceFromMaster(selectedOidMaster);
    }

    /**
     * Refresh the active one or all of them
     */
    public refreshDetails(): void {
        if (this.loadDetailsOnDemand) {
            const actDetail = this.details.find((detail) => detail.order === this.activeDetail);
            if (actDetail) {
                actDetail.refresh();
            }
        } else {
            for (const detail of this.details) {
                detail.refresh();
            }
        }
    }

    /**
     * Refresh the global scenario
     * @param pageNumber Requested page number
     */
    public refresh(pageNumber = 1): void {
        this.masterAbstract.refresh(pageNumber);
    }


    /**
     * Refresh the top master
     */
    public refreshTopMaster(): void {
        this.keepSelection();

        if (this.masterDetailContainer) {
            this.masterDetailContainer.refreshTopMaster();
        } else {
            this.refresh();
        }
    }

    public keepSelection(): void {
        this.masterAbstract.keepSelection();
    }

    /**
     * Initialize the scenario components
     */
    public initializeComponents(): void {
        if (this.details.length > 0) {
            this.activeDetail = this.details[0].order;
        }
    }

    /**
     * Manages the selection backward navigation to this scenario
     * @param exchInfo Exchange information
     */
    public processSelectionBackward(exchInfo: ExchangeInfo): void {
        this.setContext(exchInfo.previous, 'SelectionBackward');
        this.loadFromContext();
        this.processSelectionBackwardInMasterDetail(exchInfo);
    }

    /**
     * Locate and propagate the  selection backward navigation to thisthe proper component
     * @param exchInfo Exchange information
     */
    public processSelectionBackwardInMasterDetail(exchInfo: ExchangeInfo): void {
        if (exchInfo.originIUIdentification.startsWith(this.masterAbstract.iuId)) {
            this.masterAbstract.processSelectionBackwardInMasterDetail(exchInfo);
        } else {
            for (const detail of this.details) {
                if (exchInfo.originIUIdentification.startsWith(detail.iuId)) {
                    detail.processSelectionBackwardInMasterDetail(exchInfo);
                    break;
                }
            }
        }
    }

    /**
     * Load the independent preload fields in master and details
     */
    public loadPreload(): void {
        this.masterAbstract.loadPreload();

        for (const detail of this.details) {
            detail.loadPreload();
        }
    }

    /**
     * Assign values
     * @param exchInfo Selection backward information
     */
    public assignValuesFromSelectionBackward(exchInfo: ExchangeInfo): void {
        // Empty method
    }

    public override setShowWait(value: boolean): void {
        if (this.masterDetailContainer) {
            this.masterDetailContainer.setShowWait(value);
        } else {
            super.setShowWait(value);
        }
    }
}
