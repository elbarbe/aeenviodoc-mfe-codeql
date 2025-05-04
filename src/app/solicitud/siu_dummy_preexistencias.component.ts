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
@Component({
    selector: 'imes-solicitud-siu-dummy-preexistencias',
    templateUrl: './siu_dummy_preexistencias.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolicitudSIUudummyuPreexistenciasComponent extends AbstractServiceIU implements OnInit {
    /** Fields */
    public puthisSolicitud: FieldOVLenseSearch;

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
        this.idXML = 'Clas_1431957012480960Ser_47UIServ_1';
        this.className = ModelConstants.Solicitud.name;
        this.iuName = ModelConstants.Solicitud.siuudummyupreexistencias;
        this.setUserVisibility(this.appGlobalInfo.getLoggedUserInfo().isIUVisible(this.idXML, ['Admin', 'SuperAdmin', 'Asesor',
            'AreaMedica', 'Afiliaciones', 'Gestor', 'MesaDeApoyo']));
        this.serviceName = 'dummy_Preexistencias';
        this.title = this.langMng.translateText('cls_Solicitud_svc_dummy_Preexistencias',
            'Preexistencias');
        this.noShow = true;

        // Create inbound argument components
        this.puthisSolicitud = new FieldOVLenseSearch(this.langMng);

    }

    public ngOnInit(): void {
        this.myngOnInit();
    }

    /**
     * Initialize the component using default values
     */
    public override initializeComponents(): void {

        this.puthisSolicitud.nameInRequest = 'p_thissolicitud';
        this.puthisSolicitud.alias = this.langMng.translateText(
            'cls_Solicitud_svc_dummy_Preexistencias_inArg_p_thisSolicitud',
            'Solicitud');
        this.puthisSolicitud.visible = this.queryContainer == null ||
            this.queryContainer.className !== this.className;
        this.puthisSolicitud.mandatory = true;
        this.puthisSolicitud.dataType = ModelConstants.Solicitud.name;
        this.puthisSolicitud.maxLength = 50;
        this.puthisSolicitud.assignCSS();
        this.fields.push(this.puthisSolicitud);
    }

    /**
     * Initialize from context the 'This' argument
     */
    public override initializeFromCtxArgumentThis(): void {
        if (this.context.exchangeInfo &&
            ['Solicitud'].includes(this.context.exchangeInfo.selectedOidsClassName) &&
            this.context.exchangeInfo.selectedOids && this.context.exchangeInfo.selectedOids.length > 0) {
            this.puthisSolicitud.setValue(this.context.exchangeInfo.selectedOids);
            this.executeDependecyRulesputhissolicitud('SetValue', true);
            this.puthisSolicitud.enabled = false;
            this.executeDependecyRulesputhissolicitud('SetEnabled', true);
        }
    }

   /**
    * Process the selection backward navigation
    */
    public override processSelectionBackward(exchInfo: ExchangeInfo): void {
        if (!(exchInfo.selectedOids && exchInfo.selectedOids.length > 0)) {
            return;
        }
        if (exchInfo.originArgumentName.toLowerCase() === 'puthisSolicitud'.toLowerCase()) {
            this.puthisSolicitud.addOids(exchInfo.selectedOids);
            this.executeDependecyRulesputhissolicitud('SetValue', false);
        }

    }

    /**
     * Evaluate dependendy rules for p_thisSolicitud argument
     * @param event Rule event
     * @param internal Internal or External
     */
    private executeDependecyRulesputhissolicitud(event: string, internal: boolean): void {
        // Suplementary information
        if ('SetValue' === event) {
            this.setSuppInfoputhissolicitud();
        }
        this.executePendingDependencyRules();
    }

    /**
     * Set the supplementary information to the p_thisSolicitud argument
     */
    private setSuppInfoputhissolicitud(): void {

        const displaySetIC = 'Ae_solicitudes.Numero_solicitud';
        let numberMissingSupInfo = 0;
        for (const value of this.puthisSolicitud.getSelectedInstances()) {
            if (!value.supplementaryInfo || value.supplementaryInfo === '') {
                numberMissingSupInfo++;
                this.cacheDependencyRules.addQueryInstance(ModelConstants.Solicitud.name, value.oid, displaySetIC);
            }
        }

        if (numberMissingSupInfo === 0) {
            this.puthisSolicitud.setText();
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        } else {
            this.notifyCallToTheBackEnd();
            this.cacheDependencyRules.searchAll().then(() => {
                this.notifyAnswerFromToTheBackEnd();
                for (const value of this.puthisSolicitud.getSelectedInstances()) {
                    if (!value.supplementaryInfo || value.supplementaryInfo === '') {
                        value.supplementaryInfo = this.cacheDependencyRules.getText(ModelConstants.Solicitud.name,
                            value.oid, displaySetIC, [Field.dtString]);
                    }
                }
                this.puthisSolicitud.setText();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            });
        }
    }

    /**
     * Process the change in the p_thisSolicitud lense search argument
     */
    public onputhissolicitudChange(): void {

        const searchText = this.puthisSolicitud.text;
        if (searchText && searchText !== '') {
            if (searchText !== this.puthisSolicitud.lastText) {
                this.puthisSolicitud.removeCSSClass('noResultsLenseSearch');
                this.puthisSolicitud.lastText = searchText;
                this.util.searchLenseSearch(ModelConstants.Solicitud.name, 'IC_Solicitud', searchText, [], null).then(
                        (response: any) => {
                            this.puthisSolicitud.removeCSSClass('noResultsLenseSearch');
                            this.puthisSolicitud.searchResults = response.results;
                            if (this.puthisSolicitud.searchResults &&
                                this.puthisSolicitud.searchResults.length === 0) {
                                this.puthisSolicitud.addCSSClass('noResultsLenseSearch');
                            }
                            if (this.puthisSolicitud.searchResults &&
                                this.puthisSolicitud.searchResults.length === 1) {
                                this.processputhissolicitudSelected(0);
                            }
                            this.changeDetectorRef.markForCheck();
                        },
                        (response: any) => {
                            this.puthisSolicitud.removeCSSClass('noResultsLenseSearch');
                            this.puthisSolicitud.searchResults = [];
                            this.util.addErrorMessage(response.message);
                            this.changeDetectorRef.markForCheck();
                        });
            }
        } else {
            this.puthisSolicitud.removeCSSClass('noResultsLenseSearch');
            this.puthisSolicitud.searchResults = [];
            this.cleanputhissolicitud();
        }

        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the selection in the p_thisSolicitud lense search argument
     */
    public processputhissolicitudSelected(index: number): void {

        let selectedInstance = null;
        if (index !== -1 && this.puthisSolicitud.searchResults.length > index) {
            selectedInstance = this.puthisSolicitud.searchResults[index];
        }
        // Clean the result list
        this.puthisSolicitud.searchResults = [];
        if (selectedInstance) {
            if (!this.puthisSolicitud.allowMultiSelect) {
                this.puthisSolicitud.cleanSelectedInstances();
            }
            selectedInstance.oid = JSON.parse(selectedInstance.jsonOID);
            this.puthisSolicitud.getSelectedInstances().push(selectedInstance);
        }
        this.executeDependecyRulesputhissolicitud('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Clean the value of the p_thisSolicitud lense search argument
     */
    public cleanputhissolicitud(): void {
        this.clearValidationMessages();
        this.puthisSolicitud.clean();
        this.executeDependecyRulesputhissolicitud('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

   /**
    * Process the click in the lense of any object-valued argument
    * @param argumentName Name of the argument
    */
    public doSearchAction(argumentName: string): void {
        const exchInfo = this.getSelectionForwardExchInfo();
        exchInfo.originArgumentName = argumentName;
        if ('puthisSolicitud'.toLowerCase() === argumentName.toLowerCase()) {
            this.puthisSolicitud.completeSelectionForwardExchInfo(exchInfo);
            exchInfo.targetIUName = 'PIU_Radicados_Obs';
            this.util.navigateSelectionForward(exchInfo);
        }
    }
}
