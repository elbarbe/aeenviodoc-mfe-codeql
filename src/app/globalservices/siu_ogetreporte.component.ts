import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Field, FieldOVLenseSearch } from '../common/baseIUElements';
import { AbstractServiceIU } from '../common/abstractSIU';
import { ExchangeInfo } from '../common/app.exchangeinfo';
import { ModelConstants } from '../common/model.constants';
import { Util } from '../common/app.utils';
import { StandardFunctions } from '../common/standardFunctions';
import { LanguageMng } from '../common/languageMng';
import { ConditionalNavigationMng } from '../common/conditionalNavigationMng';
import { UserFunctions } from '../common/userFunctions';

/**
 * « Implements global SIU SIU_OGETREPORTE »
 */
@Component({
    selector: 'imes-gs-siu-ogetreporte',
    templateUrl: './siu_ogetreporte.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GSSIUuOGETREPORTEComponent extends AbstractServiceIU implements OnInit {

    /** Fields */
    public ptSolicitud: FieldOVLenseSearch;
    public ptTipo: Field;

    /**
     * Component constructor
     * @param appGlobalInfo Application Global Information
     * @param util Navigation utils
     * @param changeDetectorRef Angular module
     * @param langMng Language manager
     * @param stdFun Standard functions
     * @param condNavMng Conditional manager
     * @param usrFunc User functions
     */
    constructor(
        public override appGlobalInfo: AppGlobalInfo, public override util: Util, public override changeDetectorRef: ChangeDetectorRef,
        public langMng: LanguageMng, public stdFun: StandardFunctions,
        public override condNavMng: ConditionalNavigationMng, public usrFunc: UserFunctions) {
        super(appGlobalInfo, util, changeDetectorRef, condNavMng);
        this.idXML = 'IGl_1730730786816402UIServ_1';
        this.className = ModelConstants.Globalservices.name;
        this.iuName = ModelConstants.Globalservices.siuuogetreporte;
        this.setUserVisibility(this.appGlobalInfo.getLoggedUserInfo().isIUVisible(this.idXML, ['Funcionario', 'Admin', 'SuperAdmin',
            'Asesor', 'AreaMedica', 'Afiliaciones', 'Gestor', 'MesaDeApoyo']));
        this.serviceName = 'OGETREPORTE';
        this.title = this.langMng.translateText('gs_OGETREPORTE',
            'Ver Reporte');

        // Create inbound argument components
        this.ptSolicitud = new FieldOVLenseSearch(this.langMng, this.util);
        this.ptTipo = new Field(this.langMng);
    }

    public ngOnInit(): void {
        this.myngOnInit();
    }

    /**
     * Initialize the component using default values
     */
    public override initializeComponents(): void {

        this.ptSolicitud.nameInRequest = 'ptsolicitud';
        this.ptSolicitud.alias = this.langMng.translateText(
            'gs_OGETREPORTE_inArg_ptSolicitud',
            'Solicitud');
        this.ptSolicitud.mandatory = true;
        this.ptSolicitud.dataType = ModelConstants.Solicitud.name;
        this.ptSolicitud.maxLength = 50;
        this.ptSolicitud.assignCSS();
        this.fields.push(this.ptSolicitud);

        this.ptTipo.nameInRequest = 'pttipo';
        this.ptTipo.alias = this.langMng.translateText(
            'gs_OGETREPORTE_inArg_ptTipo',
            'Tipo');
        this.ptTipo.mandatory = true;
        this.ptTipo.dataType = Field.dtNat;
        this.ptTipo.assignCSS();
        this.fields.push(this.ptTipo);
    }

   /**
    * Process the selection backward navigation
    */
    public override processSelectionBackward(exchInfo: ExchangeInfo): void {
        if (!(exchInfo.selectedOids && exchInfo.selectedOids.length > 0)) {
            return;
        }
        if (exchInfo.originArgumentName.toLowerCase() === 'ptSolicitud'.toLowerCase()) {
            this.ptSolicitud.addOids(exchInfo.selectedOids);
            this.executeDependecyRulesptsolicitud('SetValue', false);
        }

    }

    /**
     * Evaluate dependendy rules for ptSolicitud argument
     * @param event Rule event
     * @param internal Internal or External
     */
    private executeDependecyRulesptsolicitud(event: string, internal: boolean): void {
        // Suplementary information
        if ('SetValue' === event) {
            this.setSuppInfoptsolicitud();
        }
        this.executePendingDependencyRules();
    }

    /**
     * Set the supplementary information to the ptSolicitud argument
     */
    private setSuppInfoptsolicitud(): void {

        const displaySetIC = 'Ae_solicitudes.Numero_solicitud';
        let numberMissingSupInfo = 0;
        for (const value of this.ptSolicitud.getSelectedInstances()) {
            if (!value.supplementaryInfo || value.supplementaryInfo === '') {
                numberMissingSupInfo++;
                this.cacheDependencyRules.addQueryInstance(ModelConstants.Solicitud.name, value.oid, displaySetIC);
            }
        }

        if (numberMissingSupInfo === 0) {
            this.ptSolicitud.setText();
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        } else {
            this.notifyCallToTheBackEnd();
            this.cacheDependencyRules.searchAll().then(() => {
                this.notifyAnswerFromToTheBackEnd();
                for (const value of this.ptSolicitud.getSelectedInstances()) {
                    if (!value.supplementaryInfo || value.supplementaryInfo === '') {
                        value.supplementaryInfo = this.cacheDependencyRules.getText(ModelConstants.Solicitud.name,
                            value.oid, displaySetIC, [Field.dtString]);
                    }
                }
                this.ptSolicitud.setText();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            });
        }
    }
    /**
     * Process the change in the ptSolicitud lense search argument
     */
    public onptsolicitudChange(): void {
        this.executeLenseSearch(this.ptSolicitud, ModelConstants.Solicitud.name, 'IC_Solicitud',
            []).then( (foundInstances: number) => {
            if (foundInstances === -1) {
                this.cleanptsolicitud();
            }
            if (foundInstances === 1) {
                this.processptsolicitudSelected(0);
            }
            this.changeDetectorRef.markForCheck();
        });
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the selection in the ptSolicitud lense search argument
     */
    public processptsolicitudSelected(index: number): void {

        let selectedInstance = null;
        if (index !== -1 && this.ptSolicitud.searchResults.length > index) {
            selectedInstance = this.ptSolicitud.searchResults[index];
        }
        // Clean the result list
        this.ptSolicitud.searchResults = [];
        if (selectedInstance) {
            if (!this.ptSolicitud.allowMultiSelect) {
                this.ptSolicitud.cleanSelectedInstances();
            }
            selectedInstance.oid = JSON.parse(selectedInstance.jsonOID);
            this.ptSolicitud.addInstances(selectedInstance);
        }
        this.executeDependecyRulesptsolicitud('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Clean the value of the ptSolicitud lense search argument
     */
    public cleanptsolicitud(): void {
        this.clearValidationMessages();
        this.ptSolicitud.clean();
        this.executeDependecyRulesptsolicitud('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

   /**
    * Process the click in the lense of any object-valued argument
    * @param argumentName Name of the argument
    */
    public doSearchAction(argumentName: string): void {
        const exchInfo = this.getSelectionForwardExchInfo();
        exchInfo.originArgumentName = argumentName;
        if ('ptSolicitud'.toLowerCase() === argumentName.toLowerCase()) {
            this.ptSolicitud.completeSelectionForwardExchInfo(exchInfo);
            exchInfo.targetIUName = 'PIU_Radicados_Obs';
            this.util.navigateSelectionForward(exchInfo);
        }
    }

    /**
     * Process the service answer to show the outbound argument scenario
     */
    public override processOutboundArguments(request: any, response: any): boolean {
        this.util.navigateOutboundArgumentsScenario(this.className, 'siu_ogetreporte_out',
            this.context.exchangeInfo ? this.context.exchangeInfo.previous : null,
            this.context.exchangeInfo ? this.context.exchangeInfo.comeBackContext : null, request, response);
        return true;
    }
}
