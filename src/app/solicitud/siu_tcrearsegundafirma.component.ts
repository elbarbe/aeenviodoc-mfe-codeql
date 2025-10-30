import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Field, FieldBlob, FieldOVLenseSearch } from '../common/baseIUElements';
import { AbstractServiceIU } from '../common/abstractSIU';
import { ExchangeInfo } from '../common/app.exchangeinfo';
import { ModelConstants } from '../common/model.constants';
import { Util } from '../common/app.utils';
import { StandardFunctions } from '../common/standardFunctions';
import { LanguageMng } from '../common/languageMng';
import { ConditionalNavigationMng } from '../common/conditionalNavigationMng';
import { UserFunctions } from '../common/userFunctions';
@Component({
    selector: 'imes-solicitud-siu-tcrearsegundafirma',
    templateUrl: './siu_tcrearsegundafirma.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolicitudSIUuTCREARSEGUNDAFIRMAComponent extends AbstractServiceIU implements OnInit {
    /** Fields */
    public puthisSolicitud: FieldOVLenseSearch;
    public ptupuatrImagenFirma: FieldBlob;
    public ptupuatrLatitud: Field;
    public ptupuatrLongitud: Field;
    public ptuTexto: Field;

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
        this.idXML = 'Clas_1431957012480960Ser_61UIServ_1';
        this.className = ModelConstants.Solicitud.name;
        this.iuName = ModelConstants.Solicitud.siuutcrearsegundafirma;
        this.setUserVisibility(this.appGlobalInfo.getLoggedUserInfo().isIUVisible(this.idXML, ['Admin', 'SuperAdmin', 'Asesor',
            'MesaDeApoyo']));
        this.serviceName = 'TCREARSEGUNDAFIRMA';
        this.title = this.langMng.translateText('cls_Solicitud_svc_TCREARSEGUNDAFIRMA',
            'Firmar preexistencias');

        // Create inbound argument components
        this.puthisSolicitud = new FieldOVLenseSearch(this.langMng, this.util);
        this.ptupuatrImagenFirma = new FieldBlob(this.langMng);
        this.ptupuatrLatitud = new Field(this.langMng);
        this.ptupuatrLongitud = new Field(this.langMng);
        this.ptuTexto = new Field(this.langMng);

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
            'cls_Solicitud_svc_TCREARSEGUNDAFIRMA_inArg_p_thisSolicitud',
            'Solicitud');
        this.puthisSolicitud.visible = this.queryContainer == null ||
            this.queryContainer.className !== this.className;
        this.puthisSolicitud.mandatory = true;
        this.puthisSolicitud.dataType = ModelConstants.Solicitud.name;
        this.puthisSolicitud.maxLength = 50;
        this.puthisSolicitud.assignCSS();
        this.fields.push(this.puthisSolicitud);

        this.ptupuatrImagenFirma.nameInRequest = 'pt_p_atrimagenfirma';
        this.ptupuatrImagenFirma.alias = this.langMng.translateText(
            'cls_Solicitud_svc_TCREARSEGUNDAFIRMA_inArg_pt_p_atrImagenFirma',
            'Firma');
        this.ptupuatrImagenFirma.mandatory = false;
        this.ptupuatrImagenFirma.dataType = Field.dtBlob;
        this.ptupuatrImagenFirma.assignCSS();
        this.fields.push(this.ptupuatrImagenFirma);

        this.ptupuatrLatitud.nameInRequest = 'pt_p_atrlatitud';
        this.ptupuatrLatitud.alias = this.langMng.translateText(
            'cls_Solicitud_svc_TCREARSEGUNDAFIRMA_inArg_pt_p_atrLatitud',
            'Latitud');
        this.ptupuatrLatitud.mandatory = false;
        this.ptupuatrLatitud.dataType = Field.dtString;
        this.ptupuatrLatitud.maxLength = 25;
        this.ptupuatrLatitud.assignCSS();
        this.fields.push(this.ptupuatrLatitud);

        this.ptupuatrLongitud.nameInRequest = 'pt_p_atrlongitud';
        this.ptupuatrLongitud.alias = this.langMng.translateText(
            'cls_Solicitud_svc_TCREARSEGUNDAFIRMA_inArg_pt_p_atrLongitud',
            'Longitud');
        this.ptupuatrLongitud.mandatory = false;
        this.ptupuatrLongitud.dataType = Field.dtString;
        this.ptupuatrLongitud.maxLength = 25;
        this.ptupuatrLongitud.assignCSS();
        this.fields.push(this.ptupuatrLongitud);

        this.ptuTexto.nameInRequest = 'pt_texto';
        this.ptuTexto.alias = this.langMng.translateText(
            'cls_Solicitud_svc_TCREARSEGUNDAFIRMA_inArg_pt_Texto',
            'Aviso');
        this.ptuTexto.mandatory = false;
        this.ptuTexto.dataType = Field.dtText;
        this.ptuTexto.assignCSS();
        this.ptuTexto.addCSSClass('avisoProDatos');
        this.fields.push(this.ptuTexto);
        navigator.geolocation.getCurrentPosition( (pos: any) => {
            if (pos?.coords) {
                this.ptupuatrLatitud.value = pos.coords.latitude;
                this.ptupuatrLongitud.value = pos.coords.longitude;
            }
        });
    }

    /**
     * Initialize with default values
     */
    public override initializeDefaultValues(): Promise<void> {
        return new Promise<void>((resolve) => {
            const promiseArr: Array<Promise<void>> = [];

            // pt_Texto
            const defValptuTexto = new Promise<void>((resolveDefValue) => {
                let rtnFuncptuTexto0: any;
                this.usrFunc.fu_GetTextoAvisoFirma(2).then((res) => {
                    rtnFuncptuTexto0 = res;

                    this.ptuTexto.setValue(rtnFuncptuTexto0);
                    resolveDefValue();
                });
            });
            promiseArr.push(defValptuTexto);

            Promise.all(promiseArr).then((results: any[]) => {
                this.setShowWait(false);
                this.changeDetectorRef.markForCheck();
                resolve();
            });
        });
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
        if ('SetValue' === event && this.puthisSolicitud.getSelectedInstances().length > 1) {
            return;
        }
        if (!this.cacheDependencyRules.checkCounter()) {
            return;
        }
        // Rule 1
        if ('SetValue' === event) {
            this.executeDependecyRules1puthisSolicitud();
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
     * Dependency rule 1 for p_thisSolicitud argument
     */
    private executeDependecyRules1puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'Ae_solicitudes.id_solicitud');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules1puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 1 for p_thisSolicitud argument
     */
    private executeDependecyRules1puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud)) {
            // pt_Texto.SetActive( FALSE )
            this.ptuTexto.enabled = false;
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }
    /**
     * Process the change in the p_thisSolicitud lense search argument
     */
    public onputhissolicitudChange(): void {
        this.executeLenseSearch(this.puthisSolicitud, ModelConstants.Solicitud.name, 'IC_Solicitud',
            []).then( (foundInstances: number) => {
            if (foundInstances === -1) {
                this.cleanputhissolicitud();
            }
            if (foundInstances === 1) {
                this.processputhissolicitudSelected(0);
            }
            this.changeDetectorRef.markForCheck();
        });
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
            this.puthisSolicitud.addInstances(selectedInstance);
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
