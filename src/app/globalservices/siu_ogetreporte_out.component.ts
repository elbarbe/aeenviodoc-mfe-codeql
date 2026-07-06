import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { AbstractIU } from '../common/baseIUElements';
import { Field, FieldBlob } from '../common/baseIUElements';
import { ExchangeInfo } from '../common/app.exchangeinfo';
import { ModelConstants } from '../common/model.constants';
import { Util } from '../common/app.utils';
import { LanguageMng } from '../common/languageMng';
import { ConditionalNavigationMng } from '../common/conditionalNavigationMng';

@Component({
/**
 * « Implements outbound arguments global SIU SIU_OGETREPORTE »
 */
    selector: 'imes-gs-siu-ogetreporte-out',
    templateUrl: './siu_ogetreporte_out.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GSSIUuOGETREPORTEuOutComponent  extends AbstractIU implements OnInit {

    /** Outbound argument oaArchivo */
    public oaArchivo: FieldBlob;
    /** Outbound argument oaNombreArchivo */
    public oaNombreArchivo: Field;

    /** Service request */
    private serviceRequest: any;
    /** Service response */
    private serviceResponse: any;
    /** Exchange info */
    private exchangeInfo: ExchangeInfo = new ExchangeInfo();

    /**
     * Component constructor
     * @param appGlobalInfo Application Global Information
     * @param util Navigation utils
     * @param changeDetectorRef Angular module
     * @param langMng Language manager
     * @param condNavMng Conditinal navigation manager
     */
    constructor(
        protected override appGlobalInfo: AppGlobalInfo,
        protected override util: Util,
        protected override changeDetectorRef: ChangeDetectorRef,
        public langMng: LanguageMng,
        protected condNavMng: ConditionalNavigationMng) {
        super(appGlobalInfo, util, changeDetectorRef);
        this.className = ModelConstants.Globalservices.name;
        this.iuName = 'siu_ogetreporte_out';
        this.title = this.langMng.translateText('gs_OGETREPORTE',
            'Ver Reporte');

        // Create outbound argument components
        this.oaArchivo = new FieldBlob(this.langMng);
        this.oaNombreArchivo = new Field(this.langMng);
    }

    public ngOnInit(): void {
        this.myngOnInit();
    }

    /**
     * Initialize the component using default values
     */
    public override initialize(): void {
        this.oaArchivo.nameInRequest = 'oaarchivo';
        this.oaArchivo.alias = this.langMng.translateText(
            'gs_OGETREPORTE_outArg_oaArchivo',
            'Archivo');
        this.oaArchivo.dataType = Field.dtBlob;
        this.oaArchivo.enabled = false;
        this.oaArchivo.assignCSS();

        this.oaNombreArchivo.nameInRequest = 'oanombrearchivo';
        this.oaNombreArchivo.alias = this.langMng.translateText(
            'gs_OGETREPORTE_outArg_oaNombreArchivo',
            'oaNombreArchivo');
        this.oaNombreArchivo.dataType = Field.dtString;
        this.oaNombreArchivo.maxLength = 255;
        this.oaNombreArchivo.enabled = false;
        this.oaNombreArchivo.assignCSS();

        // Get request and response from the exchange information
        this.exchangeInfo = this.appGlobalInfo.appExchangeInfo.getExchangeInfoForScenario(this.className, this.iuName);
        if (this.exchangeInfo) {
            this.serviceRequest = this.exchangeInfo.customData.request;
            this.serviceResponse = this.exchangeInfo.customData.response;
            if (this.serviceRequest && this.serviceResponse) {
                this.initializeFromResponse();
            }
        }
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Initialize the scenario using the response information
     */
    public initializeFromResponse(): void {
        this.oaArchivo.value =
            this.serviceResponse[this.oaArchivo.nameInRequest];
        this.oaNombreArchivo.value =
            this.serviceResponse[this.oaNombreArchivo.nameInRequest];
    }

}
