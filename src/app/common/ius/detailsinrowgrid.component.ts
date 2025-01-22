import { ChangeDetectionStrategy,  Component, Input } from '@angular/core';
import { LanguageMng } from '../languageMng';
import { Util } from '../app.utils';
import { AbstractMDIU } from '../abstractMDIU';
import { AbstractQueryIU } from '../queryIUElements';
import { AppGlobalInfo } from '../../app.appglobalinfo';
import { AbstractPIU } from '../abstractPIU';
import { AbstractIIU } from '../abstractIIU';

@Component({
    selector: 'imes-details-in-row-grid',
    templateUrl: './detailsinrowgrid.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class DetailsInRowGridComponent  {

    /** MDIU interaction unit */
    protected intMDIU!: AbstractMDIU;
    /** Master oid */
    protected masterOid: any;

    /** Oid fo the row. Master Oid */
    @Input() public rowoid = '';

    /** Lista of details */
    public details: Array<(AbstractQueryIU | AbstractMDIU)> = [];
    /** Active detail */
    public activeDetail = 0;

    @Input()
    set mdiu(mdiu: AbstractMDIU) {
        this.intMDIU = mdiu;
        this.intMDIU.detailsContextRequired.subscribe(() => this.processDetailsContextRequired());
        // Get the master selected oids
        this.masterOid = JSON.parse(this.rowoid);
        // Create the details and assign the related oids
        this.details = this.intMDIU.createDetails(this.rowoid);

        // Check if the last exchange infor is a SelectionBackward
        const exchInfo = this.appGlobalInfo.appExchangeInfo.get();

        // Get context information from MD context
        for (const detailsContext of this.intMDIU.context.inRowDetailContext) {
            if (detailsContext.oid === this.rowoid) {
                for (let i = 0; i < this.details.length; i++) {
                    this.details[i].setContext(detailsContext.details[i], '');
                    this.details[i].loadFromContext();
                    if (exchInfo && exchInfo.exchangeType === 'SelectionBackward' &&
                        exchInfo.originIUIdentification === this.details[i].iuId) {
                            this.details[i].assignValuesFromSelectionBackward(exchInfo);
                    }
                }
            }
        }
        this.activeDetail = this.intMDIU.context.activeDetail;
        for (const detail of this.details) {
            detail.setSelectedInstanceFromMaster([this.masterOid]);
        }

        // Refresh the details
        this.refreshDetails();
    }
    get mdiu(): AbstractMDIU { return this.intMDIU; }

    constructor(
        public appGlobalInfo: AppGlobalInfo,
        public readonly langMng: LanguageMng,
        public readonly util: Util) {
    }


    /**
     * Refresh the active one or all of them
     */
    public refreshDetails(): void {
        if (this.intMDIU.loadDetailsOnDemand) {
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
     * Set the detail as active
     * @param newActiveDetail New active detail
     */
    public setActiveDetail(newActiveDetail: number): void {
        if (newActiveDetail !== this.activeDetail) {
            this.activeDetail = newActiveDetail;
            this.intMDIU.activeDetail = newActiveDetail;
            // Refresh the current active detail
            this.refreshDetails();
        }
    }

    /**
     * Manages the event requiring the context of details in row
     */
    protected processDetailsContextRequired(): void {
        const detailsContext: {oid: string, details: any[]} = {oid: '', details: []};
        detailsContext.oid = this.rowoid;
        for (const detail of this.details) {
            detail.saveContextInfo();
            detailsContext.details.push(detail.getContext());
        }
        this.intMDIU.context.inRowDetailContext.push(detailsContext);
    }
    public castAbstractIIU(iu: any): AbstractIIU {
        return iu as AbstractIIU;
    }
    public castAbstractPIU(iu: any): AbstractPIU {
        return iu as AbstractPIU;
    }
    public castAbstractMDIU(iu: any): AbstractMDIU {
        return iu as AbstractMDIU;
    }
}
