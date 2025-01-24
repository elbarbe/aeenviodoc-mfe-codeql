import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Field, FieldDefinedSelection, FieldOVLenseSearch } from '../common/baseIUElements';
import { AbstractServiceIU } from '../common/abstractSIU';
import { ExchangeInfo } from '../common/app.exchangeinfo';
import { ModelConstants } from '../common/model.constants';
import { Util } from '../common/app.utils';
import { DefinedSelections } from '../common/definedSelection';
import { StandardFunctions } from '../common/standardFunctions';
import { LanguageMng } from '../common/languageMng';
import { ConditionalNavigationMng } from '../common/conditionalNavigationMng';
import { UserFunctions } from '../common/userFunctions';
import { GlobalServicesServices } from '../globalservices/globalservices.services';
import { ErrorInformation } from '../common/answerRequestInformation';
@Component({
    selector: 'imes-solicitud-siu-tenviardoc',
    templateUrl: './siu_tenviardoc.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolicitudSIUuTENVIARDOCComponent extends AbstractServiceIU implements OnInit {
    /** Fields */
    public puthisSolicitud: FieldOVLenseSearch;
    public puPrevisualizar: FieldDefinedSelection;
    public puEnviar: FieldDefinedSelection;
    public puContrato: FieldDefinedSelection;
    public puCarnets: FieldDefinedSelection;
    public puCartaPre: FieldDefinedSelection;
    public puSolicitud: FieldDefinedSelection;
    public puCondicionesBB: FieldDefinedSelection;
    public puAnexosIncl: FieldDefinedSelection;
    public puDocMaternidad: FieldDefinedSelection;
    public puCuesMedico: FieldDefinedSelection;
    public puCartaEntrevista: FieldDefinedSelection;
    public puProteccionDatos: FieldDefinedSelection;
    public puDiferenciasLiq: FieldDefinedSelection;
    public puMarcarTodos: FieldDefinedSelection;
    public puDocNeonatal: FieldDefinedSelection;

    private globalServices: GlobalServicesServices;

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
        this.idXML = 'Clas_1431957012480960Ser_64UIServ_1';
        this.className = ModelConstants.Solicitud.name;
        this.iuName = ModelConstants.Solicitud.siuutenviardoc;
        this.setUserVisibility(this.appGlobalInfo.getLoggedUserInfo().isIUVisible(this.idXML, ['Admin', 'SuperAdmin', 'Asesor',
            'AreaMedica', 'Afiliaciones', 'Gestor', 'MesaDeApoyo']));
        this.serviceName = 'TENVIARDOC';
        this.title = this.langMng.translateText('cls_Solicitud_svc_TENVIARDOC',
            'Selección/Envío de documentación');

        // Create inbound argument components
        this.puthisSolicitud = new FieldOVLenseSearch(this.langMng);
        this.puPrevisualizar = new FieldDefinedSelection(this.langMng);
        this.puEnviar = new FieldDefinedSelection(this.langMng);
        this.puContrato = new FieldDefinedSelection(this.langMng);
        this.puCarnets = new FieldDefinedSelection(this.langMng);
        this.puCartaPre = new FieldDefinedSelection(this.langMng);
        this.puSolicitud = new FieldDefinedSelection(this.langMng);
        this.puCondicionesBB = new FieldDefinedSelection(this.langMng);
        this.puAnexosIncl = new FieldDefinedSelection(this.langMng);
        this.puDocMaternidad = new FieldDefinedSelection(this.langMng);
        this.puCuesMedico = new FieldDefinedSelection(this.langMng);
        this.puCartaEntrevista = new FieldDefinedSelection(this.langMng);
        this.puProteccionDatos = new FieldDefinedSelection(this.langMng);
        this.puDiferenciasLiq = new FieldDefinedSelection(this.langMng);
        this.puMarcarTodos = new FieldDefinedSelection(this.langMng);
        this.puDocNeonatal = new FieldDefinedSelection(this.langMng);

        this.globalServices = new GlobalServicesServices(appGlobalInfo, util);

    }

    public ngOnInit(): void {
        this.myngOnInit();
    }

    public override saveChanges(): void {
        
        if (this.puEnviar.value) {
            super.saveChanges();
        } else {
            this.generarReportes();
        }
    }

    private generarReportes(): void {
        this.setShowWait(true);

        // Vemos a ver suantos tenemos que generar
        // 0 - 'Solicitud
        // 1 - 'Contrato
        // 2 - 'Carnets
        // 3 - 'Carta preexistencias
        // 4 - 'Carta entrevista médica
        // 5 - 'Protección de datos
        // 6 - 'Bebe Gestante
        // 7 - 'Anexo inclusión
        // 8 - 'Maternidad
        // 9 - 'Neonatal
        // 10 - 'Cuestionario médico
        // 11 - 'Diferencias de liquidación
        const listaReportes: number[] = [];
        if (this.puSolicitud.value) listaReportes.push(0);
        if (this.puContrato.value) listaReportes.push(1);
        if (this.puCarnets.value) listaReportes.push(2);
        if (this.puCartaPre.value) listaReportes.push(3);
        if (this.puCartaEntrevista.value) listaReportes.push(4);
        if (this.puProteccionDatos.value) listaReportes.push(5);
        if (this.puCondicionesBB.value) listaReportes.push(6);
        if (this.puAnexosIncl.value) listaReportes.push(7);
        if (this.puDocMaternidad.value) listaReportes.push(8);
        if (this.puDocNeonatal.value) listaReportes.push(9);
        if (this.puCuesMedico.value) listaReportes.push(10);
        if (this.puDiferenciasLiq.value) listaReportes.push(11);

        if (listaReportes.length === 0) {
            this.util.addErrorMessage('Ho hay reportes seleccionados');
            this.setShowWait(false);
            this.changeDetectorRef.markForCheck();
            return; 
        }

        // Llamamos a generar uno a uno los reportes
        this.generarUnReporte(listaReportes);

    }

    private generarUnReporte(listaReportes: number[]) {
        
        if (listaReportes.length === 0) {
            this.setShowWait(false);
            this.changeDetectorRef.markForCheck();
            this.processCancel();
            return;
        }

        const numReporte = listaReportes.shift();

        this.globalServices.oGETREPORTE(this.puthisSolicitud.getSingleValue(), numReporte as number).then( 
            ( response: ErrorInformation | {
                oaarchivo: string,
                oaplantilla: any,
                oanombrearchivo: string
            }) => {
                if (response instanceof ErrorInformation) {
                    this.util.addErrorMessage(response);
                } else {
                    if (response.oaarchivo && response.oanombrearchivo) {
                        this.util.openInNewWindow(response.oaarchivo, response.oanombrearchivo);
                    }
                }
                // Llamamos de nuevo para procesar el siguiente
                this.generarUnReporte(listaReportes);

        }).catch( (err: ErrorInformation) => {
            this.util.addErrorMessage(err);
            this.generarUnReporte(listaReportes);
        });
    }


    /**
     * Initialize the component using default values
     */
    public override initializeComponents(): void {

        this.puthisSolicitud.nameInRequest = 'p_thissolicitud';
        this.puthisSolicitud.alias = this.langMng.translateText(
            'cls_Solicitud_svc_TENVIARDOC_inArg_p_thisSolicitud',
            'Solicitud');
        this.puthisSolicitud.visible = this.queryContainer == null ||
            this.queryContainer.className !== this.className;
        this.puthisSolicitud.mandatory = true;
        this.puthisSolicitud.dataType = ModelConstants.Solicitud.name;
        this.puthisSolicitud.maxLength = 50;
        this.puthisSolicitud.assignCSS();
        this.fields.push(this.puthisSolicitud);

        this.puPrevisualizar.nameInRequest = 'p_previsualizar';
        this.puPrevisualizar.alias = this.langMng.translateText(
            'cls_Solicitud_svc_TENVIARDOC_inArg_p_Previsualizar',
            'Previsualizar');
        this.puPrevisualizar.mandatory = true;
        this.puPrevisualizar.dataType = Field.dtBool;
        this.puPrevisualizar.options = DefinedSelections.DS_SINO;
        this.puPrevisualizar.assignCSS();
        this.fields.push(this.puPrevisualizar);

        this.puEnviar.nameInRequest = 'p_enviar';
        this.puEnviar.alias = this.langMng.translateText(
            'cls_Solicitud_svc_TENVIARDOC_inArg_p_Enviar',
            'Enviar');
        this.puEnviar.mandatory = true;
        this.puEnviar.dataType = Field.dtBool;
        this.puEnviar.options = DefinedSelections.DS_SINO;
        this.puEnviar.assignCSS();
        this.fields.push(this.puEnviar);

        this.puContrato.nameInRequest = 'p_contrato';
        this.puContrato.alias = this.langMng.translateText(
            'cls_Solicitud_svc_TENVIARDOC_inArg_p_Contrato',
            'Contrato');
        this.puContrato.mandatory = true;
        this.puContrato.dataType = Field.dtBool;
        this.puContrato.options = DefinedSelections.DS_SINO;
        this.puContrato.assignCSS();
        this.fields.push(this.puContrato);

        this.puCarnets.nameInRequest = 'p_carnets';
        this.puCarnets.alias = this.langMng.translateText(
            'cls_Solicitud_svc_TENVIARDOC_inArg_p_Carnets',
            'Carnets');
        this.puCarnets.mandatory = true;
        this.puCarnets.dataType = Field.dtBool;
        this.puCarnets.options = DefinedSelections.DS_SINO;
        this.puCarnets.assignCSS();
        this.fields.push(this.puCarnets);

        this.puCartaPre.nameInRequest = 'p_cartapre';
        this.puCartaPre.alias = this.langMng.translateText(
            'cls_Solicitud_svc_TENVIARDOC_inArg_p_CartaPre',
            'Carta preexistencia');
        this.puCartaPre.mandatory = true;
        this.puCartaPre.dataType = Field.dtBool;
        this.puCartaPre.options = DefinedSelections.DS_SINO;
        this.puCartaPre.assignCSS();
        this.fields.push(this.puCartaPre);

        this.puSolicitud.nameInRequest = 'p_solicitud';
        this.puSolicitud.alias = this.langMng.translateText(
            'cls_Solicitud_svc_TENVIARDOC_inArg_p_Solicitud',
            'Solicitud contratación');
        this.puSolicitud.mandatory = true;
        this.puSolicitud.dataType = Field.dtBool;
        this.puSolicitud.options = DefinedSelections.DS_SINO;
        this.puSolicitud.assignCSS();
        this.fields.push(this.puSolicitud);

        this.puCondicionesBB.nameInRequest = 'p_condicionesbb';
        this.puCondicionesBB.alias = this.langMng.translateText(
            'cls_Solicitud_svc_TENVIARDOC_inArg_p_CondicionesBB',
            'Condiciones BB gestante');
        this.puCondicionesBB.mandatory = true;
        this.puCondicionesBB.dataType = Field.dtBool;
        this.puCondicionesBB.options = DefinedSelections.DS_SINO;
        this.puCondicionesBB.assignCSS();
        this.fields.push(this.puCondicionesBB);

        this.puAnexosIncl.nameInRequest = 'p_anexosincl';
        this.puAnexosIncl.alias = this.langMng.translateText(
            'cls_Solicitud_svc_TENVIARDOC_inArg_p_AnexosIncl',
            'Anexos inclusión');
        this.puAnexosIncl.mandatory = true;
        this.puAnexosIncl.dataType = Field.dtBool;
        this.puAnexosIncl.options = DefinedSelections.DS_SINO;
        this.puAnexosIncl.assignCSS();
        this.fields.push(this.puAnexosIncl);

        this.puDocMaternidad.nameInRequest = 'p_docmaternidad';
        this.puDocMaternidad.alias = this.langMng.translateText(
            'cls_Solicitud_svc_TENVIARDOC_inArg_p_DocMaternidad',
            'Doc. maternidad');
        this.puDocMaternidad.mandatory = true;
        this.puDocMaternidad.dataType = Field.dtBool;
        this.puDocMaternidad.options = DefinedSelections.DS_SINO;
        this.puDocMaternidad.assignCSS();
        this.fields.push(this.puDocMaternidad);

        this.puCuesMedico.nameInRequest = 'p_cuesmedico';
        this.puCuesMedico.alias = this.langMng.translateText(
            'cls_Solicitud_svc_TENVIARDOC_inArg_p_CuesMedico',
            'Cuestionario médico');
        this.puCuesMedico.mandatory = true;
        this.puCuesMedico.dataType = Field.dtBool;
        this.puCuesMedico.options = DefinedSelections.DS_SINO;
        this.puCuesMedico.assignCSS();
        this.fields.push(this.puCuesMedico);

        this.puCartaEntrevista.nameInRequest = 'p_cartaentrevista';
        this.puCartaEntrevista.alias = this.langMng.translateText(
            'cls_Solicitud_svc_TENVIARDOC_inArg_p_CartaEntrevista',
            'Carta entrevista médica');
        this.puCartaEntrevista.mandatory = true;
        this.puCartaEntrevista.dataType = Field.dtBool;
        this.puCartaEntrevista.options = DefinedSelections.DS_SINO;
        this.puCartaEntrevista.assignCSS();
        this.fields.push(this.puCartaEntrevista);

        this.puProteccionDatos.nameInRequest = 'p_protecciondatos';
        this.puProteccionDatos.alias = this.langMng.translateText(
            'cls_Solicitud_svc_TENVIARDOC_inArg_p_ProteccionDatos',
            'Protección de datos');
        this.puProteccionDatos.mandatory = true;
        this.puProteccionDatos.dataType = Field.dtBool;
        this.puProteccionDatos.options = DefinedSelections.DS_SINO;
        this.puProteccionDatos.assignCSS();
        this.fields.push(this.puProteccionDatos);

        this.puDiferenciasLiq.nameInRequest = 'p_diferenciasliq';
        this.puDiferenciasLiq.alias = this.langMng.translateText(
            'cls_Solicitud_svc_TENVIARDOC_inArg_p_DiferenciasLiq',
            'Carta diferencias liquidación');
        this.puDiferenciasLiq.mandatory = true;
        this.puDiferenciasLiq.dataType = Field.dtBool;
        this.puDiferenciasLiq.options = DefinedSelections.DS_SINO;
        this.puDiferenciasLiq.assignCSS();
        this.fields.push(this.puDiferenciasLiq);

        this.puMarcarTodos.nameInRequest = 'p_marcartodos';
        this.puMarcarTodos.alias = this.langMng.translateText(
            'cls_Solicitud_svc_TENVIARDOC_inArg_p_MarcarTodos',
            'Marcar Todos');
        this.puMarcarTodos.mandatory = true;
        this.puMarcarTodos.dataType = Field.dtBool;
        this.puMarcarTodos.options = DefinedSelections.DS_SINO;
        this.puMarcarTodos.assignCSS();
        this.fields.push(this.puMarcarTodos);

        this.puDocNeonatal.nameInRequest = 'p_docneonatal';
        this.puDocNeonatal.alias = this.langMng.translateText(
            'cls_Solicitud_svc_TENVIARDOC_inArg_p_DocNeonatal',
            'Doc. neonatal');
        this.puDocNeonatal.mandatory = true;
        this.puDocNeonatal.dataType = Field.dtBool;
        this.puDocNeonatal.options = DefinedSelections.DS_SINO;
        this.puDocNeonatal.assignCSS();
        this.fields.push(this.puDocNeonatal);
    }

    /**
     * Initialize with default values
     */
    public override initializeDefaultValues(): Promise<void> {
        return new Promise<void>((resolve) => {
            const promiseArr: Array<Promise<void>> = [];

            // p_Previsualizar
            const defValpuPrevisualizar = new Promise<void>((resolveDefValue) => {
                this.puPrevisualizar.setValue(true);
                resolveDefValue();
            });
            promiseArr.push(defValpuPrevisualizar);

            // p_Enviar
            const defValpuEnviar = new Promise<void>((resolveDefValue) => {
                this.puEnviar.setValue(false);
                resolveDefValue();
            });
            promiseArr.push(defValpuEnviar);

            // p_Contrato
            const defValpuContrato = new Promise<void>((resolveDefValue) => {
                this.puContrato.setValue(false);
                resolveDefValue();
            });
            promiseArr.push(defValpuContrato);

            // p_Carnets
            const defValpuCarnets = new Promise<void>((resolveDefValue) => {
                this.puCarnets.setValue(false);
                resolveDefValue();
            });
            promiseArr.push(defValpuCarnets);

            // p_CartaPre
            const defValpuCartaPre = new Promise<void>((resolveDefValue) => {
                this.puCartaPre.setValue(false);
                resolveDefValue();
            });
            promiseArr.push(defValpuCartaPre);

            // p_Solicitud
            const defValpuSolicitud = new Promise<void>((resolveDefValue) => {
                this.puSolicitud.setValue(false);
                resolveDefValue();
            });
            promiseArr.push(defValpuSolicitud);

            // p_CondicionesBB
            const defValpuCondicionesBB = new Promise<void>((resolveDefValue) => {
                this.puCondicionesBB.setValue(false);
                resolveDefValue();
            });
            promiseArr.push(defValpuCondicionesBB);

            // p_AnexosIncl
            const defValpuAnexosIncl = new Promise<void>((resolveDefValue) => {
                this.puAnexosIncl.setValue(false);
                resolveDefValue();
            });
            promiseArr.push(defValpuAnexosIncl);

            // p_DocMaternidad
            const defValpuDocMaternidad = new Promise<void>((resolveDefValue) => {
                this.puDocMaternidad.setValue(false);
                resolveDefValue();
            });
            promiseArr.push(defValpuDocMaternidad);

            // p_CuesMedico
            const defValpuCuesMedico = new Promise<void>((resolveDefValue) => {
                this.puCuesMedico.setValue(false);
                resolveDefValue();
            });
            promiseArr.push(defValpuCuesMedico);

            // p_CartaEntrevista
            const defValpuCartaEntrevista = new Promise<void>((resolveDefValue) => {
                this.puCartaEntrevista.setValue(false);
                resolveDefValue();
            });
            promiseArr.push(defValpuCartaEntrevista);

            // p_ProteccionDatos
            const defValpuProteccionDatos = new Promise<void>((resolveDefValue) => {
                this.puProteccionDatos.setValue(false);
                resolveDefValue();
            });
            promiseArr.push(defValpuProteccionDatos);

            // p_DiferenciasLiq
            const defValpuDiferenciasLiq = new Promise<void>((resolveDefValue) => {
                this.puDiferenciasLiq.setValue(false);
                resolveDefValue();
            });
            promiseArr.push(defValpuDiferenciasLiq);

            // p_MarcarTodos
            const defValpuMarcarTodos = new Promise<void>((resolveDefValue) => {
                this.puMarcarTodos.setValue(false);
                resolveDefValue();
            });
            promiseArr.push(defValpuMarcarTodos);

            // p_DocNeonatal
            const defValpuDocNeonatal = new Promise<void>((resolveDefValue) => {
                this.puDocNeonatal.setValue(false);
                resolveDefValue();
            });
            promiseArr.push(defValpuDocNeonatal);

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
        // Rule 2
        if ('SetValue' === event) {
            this.executeDependecyRules2puthisSolicitud();
        }
        // Rule 3
        if ('SetValue' === event) {
            this.executeDependecyRules3puthisSolicitud();
        }
        // Rule 4
        if ('SetValue' === event) {
            this.executeDependecyRules4puthisSolicitud();
        }
        // Rule 5
        if ('SetValue' === event) {
            this.executeDependecyRules5puthisSolicitud();
        }
        // Rule 6
        if ('SetValue' === event) {
            this.executeDependecyRules6puthisSolicitud();
        }
        // Rule 7
        if ('SetValue' === event) {
            this.executeDependecyRules7puthisSolicitud();
        }
        // Rule 8
        if ('SetValue' === event) {
            this.executeDependecyRules8puthisSolicitud();
        }
        // Rule 9
        if ('SetValue' === event) {
            this.executeDependecyRules9puthisSolicitud();
        }
        // Rule 10
        if ('SetValue' === event) {
            this.executeDependecyRules10puthisSolicitud();
        }
        // Rule 11
        if ('SetValue' === event) {
            this.executeDependecyRules11puthisSolicitud();
        }
        // Rule 12
        if ('SetValue' === event) {
            this.executeDependecyRules12puthisSolicitud();
        }
        // Rule 13
        if ('SetValue' === event) {
            this.executeDependecyRules13puthisSolicitud();
        }
        // Rule 14
        if ('SetValue' === event) {
            this.executeDependecyRules14puthisSolicitud();
        }
        // Rule 15
        if ('SetValue' === event) {
            this.executeDependecyRules15puthisSolicitud();
        }
        // Rule 16
        if ('SetValue' === event) {
            this.executeDependecyRules16puthisSolicitud();
        }
        // Rule 17
        if ('SetValue' === event) {
            this.executeDependecyRules17puthisSolicitud();
        }
        // Rule 18
        if ('SetValue' === event) {
            this.executeDependecyRules18puthisSolicitud();
        }
        // Rule 19
        if ('SetValue' === event) {
            this.executeDependecyRules19puthisSolicitud();
        }
        // Rule 20
        if ('SetValue' === event) {
            this.executeDependecyRules20puthisSolicitud();
        }
        // Rule 21
        if ('SetValue' === event) {
            this.executeDependecyRules21puthisSolicitud();
        }
        // Rule 22
        if ('SetValue' === event) {
            this.executeDependecyRules22puthisSolicitud();
        }
        // Rule 23
        if ('SetValue' === event) {
            this.executeDependecyRules23puthisSolicitud();
        }
        // Rule 24
        if ('SetValue' === event) {
            this.executeDependecyRules24puthisSolicitud();
        }
        // Rule 25
        if ('SetValue' === event) {
            this.executeDependecyRules25puthisSolicitud();
        }
        // Rule 26
        if ('SetValue' === event) {
            this.executeDependecyRules26puthisSolicitud();
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
            // p_thisSolicitud.SetVisible( FALSE )
            this.puthisSolicitud.visible = false;
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 2 for p_thisSolicitud argument
     */
    private executeDependecyRules2puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'drvaplicadoccontrato');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules2puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 2 for p_thisSolicitud argument
     */
    private executeDependecyRules2puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.drvaplicadoccontrato = FALSE
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicadoccontrato')), false)) {
            // p_Contrato.SetActive( FALSE )
            this.puContrato.enabled = false;
            this.executeDependecyRulespucontrato('SetActive', true);
            // p_Contrato.SetValue( FALSE )
            this.puContrato.setValue(false);
            this.executeDependecyRulespucontrato('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 3 for p_thisSolicitud argument
     */
    private executeDependecyRules3puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'drvaplicadocbbgestante');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules3puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 3 for p_thisSolicitud argument
     */
    private executeDependecyRules3puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.drvaplicadocbbgestante = TRUE
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicadocbbgestante')), true)) {
            // p_CondicionesBB.SetActive( TRUE )
            this.puCondicionesBB.enabled = true;
            this.executeDependecyRulespucondicionesbb('SetActive', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 4 for p_thisSolicitud argument
     */
    private executeDependecyRules4puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'drvaplicadocbbgestante');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules4puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 4 for p_thisSolicitud argument
     */
    private executeDependecyRules4puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.drvaplicadocbbgestante = FALSE
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicadocbbgestante')), false)) {
            // p_CondicionesBB.SetActive( FALSE )
            this.puCondicionesBB.enabled = false;
            this.executeDependecyRulespucondicionesbb('SetActive', true);
            // p_CondicionesBB.SetValue( FALSE )
            this.puCondicionesBB.setValue(false);
            this.executeDependecyRulespucondicionesbb('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 5 for p_thisSolicitud argument
     */
    private executeDependecyRules5puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'tramite');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules5puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 5 for p_thisSolicitud argument
     */
    private executeDependecyRules5puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.tramite = 2
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getInt(varputhissolicitud.get('tramite')), 2)) {
            // p_AnexosIncl.SetActive( TRUE )
            this.puAnexosIncl.enabled = true;
            this.executeDependecyRulespuanexosincl('SetActive', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 6 for p_thisSolicitud argument
     */
    private executeDependecyRules6puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'tramite');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules6puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 6 for p_thisSolicitud argument
     */
    private executeDependecyRules6puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.tramite <> 2
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            !this.util.valueEquals(this.util.getInt(varputhissolicitud.get('tramite')), 2)) {
            // p_AnexosIncl.SetActive( FALSE )
            this.puAnexosIncl.enabled = false;
            this.executeDependecyRulespuanexosincl('SetActive', true);
            // p_AnexosIncl.SetValue( FALSE )
            this.puAnexosIncl.setValue(false);
            this.executeDependecyRulespuanexosincl('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 7 for p_thisSolicitud argument
     */
    private executeDependecyRules7puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'drvaplicadocmaternidad');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules7puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 7 for p_thisSolicitud argument
     */
    private executeDependecyRules7puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.drvaplicadocmaternidad = true
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicadocmaternidad')), true)) {
            // p_DocMaternidad.SetActive( TRUE )
            this.puDocMaternidad.enabled = true;
            this.executeDependecyRulespudocmaternidad('SetActive', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 8 for p_thisSolicitud argument
     */
    private executeDependecyRules8puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'drvaplicadocmaternidad');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules8puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 8 for p_thisSolicitud argument
     */
    private executeDependecyRules8puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.drvaplicadocmaternidad = false
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicadocmaternidad')), false)) {
            // p_DocMaternidad.SetActive( FALSE )
            this.puDocMaternidad.enabled = false;
            this.executeDependecyRulespudocmaternidad('SetActive', true);
            // p_DocMaternidad.SetValue( FALSE )
            this.puDocMaternidad.setValue(false);
            this.executeDependecyRulespudocmaternidad('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 9 for p_thisSolicitud argument
     */
    private executeDependecyRules9puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'drvaplicacuestionario');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules9puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 9 for p_thisSolicitud argument
     */
    private executeDependecyRules9puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.drvaplicacuestionario = true
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicacuestionario')), true)) {
            // p_CuesMedico.SetActive( TRUE )
            this.puCuesMedico.enabled = true;
            this.executeDependecyRulespucuesmedico('SetActive', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 10 for p_thisSolicitud argument
     */
    private executeDependecyRules10puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'drvaplicacuestionario');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules10puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 10 for p_thisSolicitud argument
     */
    private executeDependecyRules10puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.drvaplicacuestionario = false
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicacuestionario')), false)) {
            // p_CuesMedico.SetActive( FALSE )
            this.puCuesMedico.enabled = false;
            this.executeDependecyRulespucuesmedico('SetActive', true);
            // p_CuesMedico.SetValue( FALSE )
            this.puCuesMedico.setValue(false);
            this.executeDependecyRulespucuesmedico('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 11 for p_thisSolicitud argument
     */
    private executeDependecyRules11puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'drvaplicacartaent');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules11puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 11 for p_thisSolicitud argument
     */
    private executeDependecyRules11puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.drvaplicacartaent = true
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicacartaent')), true)) {
            // p_CartaEntrevista.SetActive( TRUE )
            this.puCartaEntrevista.enabled = true;
            this.executeDependecyRulespucartaentrevista('SetActive', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 12 for p_thisSolicitud argument
     */
    private executeDependecyRules12puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'drvaplicacartaent');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules12puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 12 for p_thisSolicitud argument
     */
    private executeDependecyRules12puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.drvaplicacartaent = false
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicacartaent')), false)) {
            // p_CartaEntrevista.SetActive( FALSE )
            this.puCartaEntrevista.enabled = false;
            this.executeDependecyRulespucartaentrevista('SetActive', true);
            // p_CartaEntrevista.SetValue( FALSE )
            this.puCartaEntrevista.setValue(false);
            this.executeDependecyRulespucartaentrevista('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 13 for p_thisSolicitud argument
     */
    private executeDependecyRules13puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'tienedifliquidacion');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules13puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 13 for p_thisSolicitud argument
     */
    private executeDependecyRules13puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.tienedifliquidacion = true
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('tienedifliquidacion')), true)) {
            // p_DiferenciasLiq.SetActive( TRUE )
            this.puDiferenciasLiq.enabled = true;
            this.executeDependecyRulespudiferenciasliq('SetActive', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 14 for p_thisSolicitud argument
     */
    private executeDependecyRules14puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'tienedifliquidacion');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules14puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 14 for p_thisSolicitud argument
     */
    private executeDependecyRules14puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.tienedifliquidacion = false
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('tienedifliquidacion')), false)) {
            // p_DiferenciasLiq.SetActive( FALSE )
            this.puDiferenciasLiq.enabled = false;
            this.executeDependecyRulespudiferenciasliq('SetActive', true);
            // p_DiferenciasLiq.SetValue( FALSE )
            this.puDiferenciasLiq.setValue(false);
            this.executeDependecyRulespudiferenciasliq('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 15 for p_thisSolicitud argument
     */
    private executeDependecyRules15puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'drvaplicadocneonatal');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules15puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 15 for p_thisSolicitud argument
     */
    private executeDependecyRules15puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.drvaplicadocneonatal = true
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicadocneonatal')), true)) {
            // p_DocNeonatal.SetActive( TRUE )
            this.puDocNeonatal.enabled = true;
            this.executeDependecyRulespudocneonatal('SetActive', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 16 for p_thisSolicitud argument
     */
    private executeDependecyRules16puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'drvaplicadocneonatal');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules16puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 16 for p_thisSolicitud argument
     */
    private executeDependecyRules16puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.drvaplicadocneonatal = false
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicadocneonatal')), false)) {
            // p_DocNeonatal.SetActive( FALSE )
            this.puDocNeonatal.enabled = false;
            this.executeDependecyRulespudocneonatal('SetActive', true);
            // p_DocNeonatal.SetValue( FALSE )
            this.puDocNeonatal.setValue(false);
            this.executeDependecyRulespudocneonatal('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 17 for p_thisSolicitud argument
     */
    private executeDependecyRules17puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'drvaplicacarnets');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules17puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 17 for p_thisSolicitud argument
     */
    private executeDependecyRules17puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.drvaplicacarnets = true
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicacarnets')), true)) {
            // p_Carnets.SetActive( TRUE )
            this.puCarnets.enabled = true;
            this.executeDependecyRulespucarnets('SetActive', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 18 for p_thisSolicitud argument
     */
    private executeDependecyRules18puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'drvaplicacarnets');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules18puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 18 for p_thisSolicitud argument
     */
    private executeDependecyRules18puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.drvaplicacarnets = false
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicacarnets')), false)) {
            // p_Carnets.SetActive( FALSE )
            this.puCarnets.enabled = false;
            this.executeDependecyRulespucarnets('SetActive', true);
            // p_Carnets.SetValue( FALSE )
            this.puCarnets.setValue(false);
            this.executeDependecyRulespucarnets('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 19 for p_thisSolicitud argument
     */
    private executeDependecyRules19puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'drvaplicadoccartapree');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules19puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 19 for p_thisSolicitud argument
     */
    private executeDependecyRules19puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.drvaplicadoccartapree = true
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicadoccartapree')), true)) {
            // p_CartaPre.SetActive( TRUE )
            this.puCartaPre.enabled = true;
            this.executeDependecyRulespucartapre('SetActive', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 20 for p_thisSolicitud argument
     */
    private executeDependecyRules20puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'drvaplicadocsolicitud');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules20puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 20 for p_thisSolicitud argument
     */
    private executeDependecyRules20puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.drvaplicadocsolicitud = false
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicadocsolicitud')), false)) {
            // p_Solicitud.SetActive( FALSE )
            this.puSolicitud.enabled = false;
            this.executeDependecyRulespusolicitud('SetActive', true);
            // p_Solicitud.SetValue( FALSE )
            this.puSolicitud.setValue(false);
            this.executeDependecyRulespusolicitud('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 21 for p_thisSolicitud argument
     */
    private executeDependecyRules21puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'drvaplicadocsolicitud');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules21puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 21 for p_thisSolicitud argument
     */
    private executeDependecyRules21puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.drvaplicadocsolicitud = true
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicadocsolicitud')), true)) {
            // p_Solicitud.SetActive( TRUE )
            this.puSolicitud.enabled = true;
            this.executeDependecyRulespusolicitud('SetActive', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 22 for p_thisSolicitud argument
     */
    private executeDependecyRules22puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'drvaplicadocprotdatos');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules22puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 22 for p_thisSolicitud argument
     */
    private executeDependecyRules22puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.drvaplicadocprotdatos = false
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicadocprotdatos')), false)) {
            // p_ProteccionDatos.SetActive( FALSE )
            this.puProteccionDatos.enabled = false;
            this.executeDependecyRulespuprotecciondatos('SetActive', true);
            // p_ProteccionDatos.SetValue( FALSE )
            this.puProteccionDatos.setValue(false);
            this.executeDependecyRulespuprotecciondatos('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 23 for p_thisSolicitud argument
     */
    private executeDependecyRules23puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'drvaplicadocprotdatos');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules23puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 23 for p_thisSolicitud argument
     */
    private executeDependecyRules23puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.drvaplicadocprotdatos = true
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicadocprotdatos')), true)) {
            // p_ProteccionDatos.SetActive( TRUE )
            this.puProteccionDatos.enabled = true;
            this.executeDependecyRulespuprotecciondatos('SetActive', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 24 for p_thisSolicitud argument
     */
    private executeDependecyRules24puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'drvaplicadoccartapree');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules24puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 24 for p_thisSolicitud argument
     */
    private executeDependecyRules24puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.drvaplicadoccartapree = false
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicadoccartapree')), false)) {
            // p_CartaPre.SetActive( FALSE )
            this.puCartaPre.enabled = false;
            this.executeDependecyRulespucartapre('SetActive', true);
            // p_CartaPre.SetValue( FALSE )
            this.puCartaPre.setValue(false);
            this.executeDependecyRulespucartapre('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 25 for p_thisSolicitud argument
     */
    private executeDependecyRules25puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'drvaplicadoccontrato');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules25puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 25 for p_thisSolicitud argument
     */
    private executeDependecyRules25puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v.drvaplicadoccontrato = true
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicadoccontrato')), true)) {
            // p_Contrato.SetActive( TRUE )
            this.puContrato.enabled = true;
            this.executeDependecyRulespucontrato('SetActive', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 26 for p_thisSolicitud argument
     */
    private executeDependecyRules26puthisSolicitud(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'Ae_solicitudes.id_solicitud');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules26puthisSolicitudActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 26 for p_thisSolicitud argument
     */
    private executeDependecyRules26puthisSolicitudActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND (AGENT_Gestor <> NULL OR AGENT_MesaDeApoyo <> NULL)
        //
        if (varputhissolicitud && !this.util.isNull(varputhissolicitud) &&
            (this.appGlobalInfo.getLoggedUserInfo().isAgentOneOf(['GESTOR']) ||
            this.appGlobalInfo.getLoggedUserInfo().isAgentOneOf(['MESADEAPOYO']))) {
            // p_Enviar.SetActive( FALSE )
            this.puEnviar.enabled = false;
            this.executeDependecyRulespuenviar('SetActive', true);
            // p_Enviar.SetValue( FALSE )
            this.puEnviar.setValue(false);
            this.executeDependecyRulespuenviar('SetValue', true);
            // p_Previsualizar.SetValue( TRUE )
            this.puPrevisualizar.setValue(true);
            this.executeDependecyRulespuprevisualizar('SetValue', true);
            // p_Previsualizar.SetActive( TRUE )
            this.puPrevisualizar.enabled = true;
            this.executeDependecyRulespuprevisualizar('SetActive', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
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
     * Evaluate dependendy rules for p_Previsualizar argument
     * @param event Rule event
     * @param internal Internal or External
     */
    private executeDependecyRulespuprevisualizar(event: string, internal: boolean): void {
        if (!this.cacheDependencyRules.checkCounter()) {
            return;
        }
        // Rule 1
        if ('SetValue' === event && !internal) {
            this.executeDependecyRules1puPrevisualizar();
        }
        // Rule 2
        if ('SetValue' === event && !internal) {
            this.executeDependecyRules2puPrevisualizar();
        }
        this.executePendingDependencyRules();
    }

    /**
     * Dependency rule 1 for p_Previsualizar argument
     */
    private executeDependecyRules1puPrevisualizar(): void {
        this.cacheDependencyRules.counter++;
        try {
            this.executeDependecyRules1puPrevisualizarActions();
        } catch (e) {
            console.log(e);
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        }
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 1 for p_Previsualizar argument
     */
    private executeDependecyRules1puPrevisualizarActions(): void {
        // v <> NULL AND v=TRUE
        if (!this.util.isNull(this.util.getBool(this.puPrevisualizar.value)) &&
            this.util.valueEquals(this.util.getBool(this.puPrevisualizar.value), true)) {
            // p_Enviar.SetValue( FALSE )
            this.puEnviar.setValue(false);
            this.executeDependecyRulespuenviar('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 2 for p_Previsualizar argument
     */
    private executeDependecyRules2puPrevisualizar(): void {
        this.cacheDependencyRules.counter++;
        try {
            this.executeDependecyRules2puPrevisualizarActions();
        } catch (e) {
            console.log(e);
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        }
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 2 for p_Previsualizar argument
     */
    private executeDependecyRules2puPrevisualizarActions(): void {
        // v <> NULL AND v= FALSE
        if (!this.util.isNull(this.util.getBool(this.puPrevisualizar.value)) &&
            this.util.valueEquals(this.util.getBool(this.puPrevisualizar.value), false)) {
            // p_Enviar.SetValue( TRUE )
            this.puEnviar.setValue(true);
            this.executeDependecyRulespuenviar('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the change in the p_Previsualizar argument
     */
    public onpuprevisualizarChange(): void {
        this.clearValidationMessages();
        this.executeDependecyRulespuprevisualizar('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Evaluate dependendy rules for p_Enviar argument
     * @param event Rule event
     * @param internal Internal or External
     */
    private executeDependecyRulespuenviar(event: string, internal: boolean): void {
        if (!this.cacheDependencyRules.checkCounter()) {
            return;
        }
        // Rule 1
        if ('SetValue' === event && !internal) {
            this.executeDependecyRules1puEnviar();
        }
        // Rule 2
        if ('SetValue' === event && !internal) {
            this.executeDependecyRules2puEnviar();
        }
        this.executePendingDependencyRules();
    }

    /**
     * Dependency rule 1 for p_Enviar argument
     */
    private executeDependecyRules1puEnviar(): void {
        this.cacheDependencyRules.counter++;
        try {
            this.executeDependecyRules1puEnviarActions();
        } catch (e) {
            console.log(e);
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        }
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 1 for p_Enviar argument
     */
    private executeDependecyRules1puEnviarActions(): void {
        // v <> NULL AND v= TRUE
        if (!this.util.isNull(this.util.getBool(this.puEnviar.value)) && this.util.valueEquals(this.util.getBool(this.puEnviar.value),
            true)) {
            // p_Previsualizar.SetValue( FALSE )
            this.puPrevisualizar.setValue(false);
            this.executeDependecyRulespuprevisualizar('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Dependency rule 2 for p_Enviar argument
     */
    private executeDependecyRules2puEnviar(): void {
        this.cacheDependencyRules.counter++;
        try {
            this.executeDependecyRules2puEnviarActions();
        } catch (e) {
            console.log(e);
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        }
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 2 for p_Enviar argument
     */
    private executeDependecyRules2puEnviarActions(): void {
        // v <> NULL AND v= FALSE
        if (!this.util.isNull(this.util.getBool(this.puEnviar.value)) && this.util.valueEquals(this.util.getBool(this.puEnviar.value),
            false)) {
            // p_Previsualizar.SetValue( TRUE )
            this.puPrevisualizar.setValue(true);
            this.executeDependecyRulespuprevisualizar('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the change in the p_Enviar argument
     */
    public onpuenviarChange(): void {
        this.clearValidationMessages();
        this.executeDependecyRulespuenviar('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Evaluate dependendy rules for p_Contrato argument
     * @param event Rule event
     * @param internal Internal or External
     */
    private executeDependecyRulespucontrato(event: string, internal: boolean): void {
        if (!this.cacheDependencyRules.checkCounter()) {
            return;
        }
        // Rule 1
        if ('SetValue' === event && !internal) {
            this.executeDependecyRules1puContrato();
        }
        this.executePendingDependencyRules();
    }

    /**
     * Dependency rule 1 for p_Contrato argument
     */
    private executeDependecyRules1puContrato(): void {
        this.cacheDependencyRules.counter++;
        try {
            this.executeDependecyRules1puContratoActions();
        } catch (e) {
            console.log(e);
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        }
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 1 for p_Contrato argument
     */
    private executeDependecyRules1puContratoActions(): void {
        // v <> NULL AND v = FALSE
        if (!this.util.isNull(this.util.getBool(this.puContrato.value)) &&
            this.util.valueEquals(this.util.getBool(this.puContrato.value), false)) {
            // p_MarcarTodos.SetValue( FALSE )
            this.puMarcarTodos.setValue(false);
            this.executeDependecyRulespumarcartodos('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the change in the p_Contrato argument
     */
    public onpucontratoChange(): void {
        this.clearValidationMessages();
        this.executeDependecyRulespucontrato('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Evaluate dependendy rules for p_Carnets argument
     * @param event Rule event
     * @param internal Internal or External
     */
    private executeDependecyRulespucarnets(event: string, internal: boolean): void {
        if (!this.cacheDependencyRules.checkCounter()) {
            return;
        }
        // Rule 1
        if ('SetValue' === event && !internal) {
            this.executeDependecyRules1puCarnets();
        }
        this.executePendingDependencyRules();
    }

    /**
     * Dependency rule 1 for p_Carnets argument
     */
    private executeDependecyRules1puCarnets(): void {
        this.cacheDependencyRules.counter++;
        try {
            this.executeDependecyRules1puCarnetsActions();
        } catch (e) {
            console.log(e);
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        }
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 1 for p_Carnets argument
     */
    private executeDependecyRules1puCarnetsActions(): void {
        // v <> NULL AND v = FALSE
        if (!this.util.isNull(this.util.getBool(this.puCarnets.value)) &&
            this.util.valueEquals(this.util.getBool(this.puCarnets.value), false)) {
            // p_MarcarTodos.SetValue( FALSE )
            this.puMarcarTodos.setValue(false);
            this.executeDependecyRulespumarcartodos('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the change in the p_Carnets argument
     */
    public onpucarnetsChange(): void {
        this.clearValidationMessages();
        this.executeDependecyRulespucarnets('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Evaluate dependendy rules for p_CartaPre argument
     * @param event Rule event
     * @param internal Internal or External
     */
    private executeDependecyRulespucartapre(event: string, internal: boolean): void {
        if (!this.cacheDependencyRules.checkCounter()) {
            return;
        }
        // Rule 1
        if ('SetValue' === event && !internal) {
            this.executeDependecyRules1puCartaPre();
        }
        this.executePendingDependencyRules();
    }

    /**
     * Dependency rule 1 for p_CartaPre argument
     */
    private executeDependecyRules1puCartaPre(): void {
        this.cacheDependencyRules.counter++;
        try {
            this.executeDependecyRules1puCartaPreActions();
        } catch (e) {
            console.log(e);
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        }
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 1 for p_CartaPre argument
     */
    private executeDependecyRules1puCartaPreActions(): void {
        // v <> NULL AND v = FALSE
        if (!this.util.isNull(this.util.getBool(this.puCartaPre.value)) &&
            this.util.valueEquals(this.util.getBool(this.puCartaPre.value), false)) {
            // p_MarcarTodos.SetValue( FALSE )
            this.puMarcarTodos.setValue(false);
            this.executeDependecyRulespumarcartodos('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the change in the p_CartaPre argument
     */
    public onpucartapreChange(): void {
        this.clearValidationMessages();
        this.executeDependecyRulespucartapre('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Evaluate dependendy rules for p_Solicitud argument
     * @param event Rule event
     * @param internal Internal or External
     */
    private executeDependecyRulespusolicitud(event: string, internal: boolean): void {
        if (!this.cacheDependencyRules.checkCounter()) {
            return;
        }
        // Rule 1
        if ('SetValue' === event && !internal) {
            this.executeDependecyRules1puSolicitud();
        }
        this.executePendingDependencyRules();
    }

    /**
     * Dependency rule 1 for p_Solicitud argument
     */
    private executeDependecyRules1puSolicitud(): void {
        this.cacheDependencyRules.counter++;
        try {
            this.executeDependecyRules1puSolicitudActions();
        } catch (e) {
            console.log(e);
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        }
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 1 for p_Solicitud argument
     */
    private executeDependecyRules1puSolicitudActions(): void {
        // v <> NULL AND v = false
        if (!this.util.isNull(this.util.getBool(this.puSolicitud.value)) &&
            this.util.valueEquals(this.util.getBool(this.puSolicitud.value), false)) {
            // p_MarcarTodos.SetValue( FALSE )
            this.puMarcarTodos.setValue(false);
            this.executeDependecyRulespumarcartodos('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the change in the p_Solicitud argument
     */
    public onpusolicitudChange(): void {
        this.clearValidationMessages();
        this.executeDependecyRulespusolicitud('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Evaluate dependendy rules for p_CondicionesBB argument
     * @param event Rule event
     * @param internal Internal or External
     */
    private executeDependecyRulespucondicionesbb(event: string, internal: boolean): void {
        if (!this.cacheDependencyRules.checkCounter()) {
            return;
        }
        // Rule 1
        if ('SetValue' === event && !internal) {
            this.executeDependecyRules1puCondicionesBB();
        }
        this.executePendingDependencyRules();
    }

    /**
     * Dependency rule 1 for p_CondicionesBB argument
     */
    private executeDependecyRules1puCondicionesBB(): void {
        this.cacheDependencyRules.counter++;
        try {
            this.executeDependecyRules1puCondicionesBBActions();
        } catch (e) {
            console.log(e);
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        }
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 1 for p_CondicionesBB argument
     */
    private executeDependecyRules1puCondicionesBBActions(): void {
        // v <> NULL AND v = FALSE
        if (!this.util.isNull(this.util.getBool(this.puCondicionesBB.value)) &&
            this.util.valueEquals(this.util.getBool(this.puCondicionesBB.value), false)) {
            // p_MarcarTodos.SetValue( FALSE )
            this.puMarcarTodos.setValue(false);
            this.executeDependecyRulespumarcartodos('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the change in the p_CondicionesBB argument
     */
    public onpucondicionesbbChange(): void {
        this.clearValidationMessages();
        this.executeDependecyRulespucondicionesbb('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Evaluate dependendy rules for p_AnexosIncl argument
     * @param event Rule event
     * @param internal Internal or External
     */
    private executeDependecyRulespuanexosincl(event: string, internal: boolean): void {
        if (!this.cacheDependencyRules.checkCounter()) {
            return;
        }
        // Rule 1
        if ('SetValue' === event && !internal) {
            this.executeDependecyRules1puAnexosIncl();
        }
        this.executePendingDependencyRules();
    }

    /**
     * Dependency rule 1 for p_AnexosIncl argument
     */
    private executeDependecyRules1puAnexosIncl(): void {
        this.cacheDependencyRules.counter++;
        try {
            this.executeDependecyRules1puAnexosInclActions();
        } catch (e) {
            console.log(e);
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        }
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 1 for p_AnexosIncl argument
     */
    private executeDependecyRules1puAnexosInclActions(): void {
        // v <> NULL AND v = FALSE
        if (!this.util.isNull(this.util.getBool(this.puAnexosIncl.value)) &&
            this.util.valueEquals(this.util.getBool(this.puAnexosIncl.value), false)) {
            // p_MarcarTodos.SetValue( FALSE )
            this.puMarcarTodos.setValue(false);
            this.executeDependecyRulespumarcartodos('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the change in the p_AnexosIncl argument
     */
    public onpuanexosinclChange(): void {
        this.clearValidationMessages();
        this.executeDependecyRulespuanexosincl('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Evaluate dependendy rules for p_DocMaternidad argument
     * @param event Rule event
     * @param internal Internal or External
     */
    private executeDependecyRulespudocmaternidad(event: string, internal: boolean): void {
        if (!this.cacheDependencyRules.checkCounter()) {
            return;
        }
        // Rule 1
        if ('SetValue' === event && !internal) {
            this.executeDependecyRules1puDocMaternidad();
        }
        this.executePendingDependencyRules();
    }

    /**
     * Dependency rule 1 for p_DocMaternidad argument
     */
    private executeDependecyRules1puDocMaternidad(): void {
        this.cacheDependencyRules.counter++;
        try {
            this.executeDependecyRules1puDocMaternidadActions();
        } catch (e) {
            console.log(e);
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        }
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 1 for p_DocMaternidad argument
     */
    private executeDependecyRules1puDocMaternidadActions(): void {
        // v <> NULL AND v = false
        if (!this.util.isNull(this.util.getBool(this.puDocMaternidad.value)) &&
            this.util.valueEquals(this.util.getBool(this.puDocMaternidad.value), false)) {
            // p_MarcarTodos.SetValue( FALSE )
            this.puMarcarTodos.setValue(false);
            this.executeDependecyRulespumarcartodos('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the change in the p_DocMaternidad argument
     */
    public onpudocmaternidadChange(): void {
        this.clearValidationMessages();
        this.executeDependecyRulespudocmaternidad('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Evaluate dependendy rules for p_CuesMedico argument
     * @param event Rule event
     * @param internal Internal or External
     */
    private executeDependecyRulespucuesmedico(event: string, internal: boolean): void {
        if (!this.cacheDependencyRules.checkCounter()) {
            return;
        }
        // Rule 1
        if ('SetValue' === event && !internal) {
            this.executeDependecyRules1puCuesMedico();
        }
        this.executePendingDependencyRules();
    }

    /**
     * Dependency rule 1 for p_CuesMedico argument
     */
    private executeDependecyRules1puCuesMedico(): void {
        this.cacheDependencyRules.counter++;
        try {
            this.executeDependecyRules1puCuesMedicoActions();
        } catch (e) {
            console.log(e);
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        }
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 1 for p_CuesMedico argument
     */
    private executeDependecyRules1puCuesMedicoActions(): void {
        // v <> NULL AND v = FALSE
        if (!this.util.isNull(this.util.getBool(this.puCuesMedico.value)) &&
            this.util.valueEquals(this.util.getBool(this.puCuesMedico.value), false)) {
            // p_MarcarTodos.SetValue( FALSE )
            this.puMarcarTodos.setValue(false);
            this.executeDependecyRulespumarcartodos('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the change in the p_CuesMedico argument
     */
    public onpucuesmedicoChange(): void {
        this.clearValidationMessages();
        this.executeDependecyRulespucuesmedico('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Evaluate dependendy rules for p_CartaEntrevista argument
     * @param event Rule event
     * @param internal Internal or External
     */
    private executeDependecyRulespucartaentrevista(event: string, internal: boolean): void {
        if (!this.cacheDependencyRules.checkCounter()) {
            return;
        }
        // Rule 1
        if ('SetValue' === event && !internal) {
            this.executeDependecyRules1puCartaEntrevista();
        }
        this.executePendingDependencyRules();
    }

    /**
     * Dependency rule 1 for p_CartaEntrevista argument
     */
    private executeDependecyRules1puCartaEntrevista(): void {
        this.cacheDependencyRules.counter++;
        try {
            this.executeDependecyRules1puCartaEntrevistaActions();
        } catch (e) {
            console.log(e);
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        }
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 1 for p_CartaEntrevista argument
     */
    private executeDependecyRules1puCartaEntrevistaActions(): void {
        // v <> NULL AND v = FALSE
        if (!this.util.isNull(this.util.getBool(this.puCartaEntrevista.value)) &&
            this.util.valueEquals(this.util.getBool(this.puCartaEntrevista.value), false)) {
            // p_MarcarTodos.SetValue( FALSE )
            this.puMarcarTodos.setValue(false);
            this.executeDependecyRulespumarcartodos('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the change in the p_CartaEntrevista argument
     */
    public onpucartaentrevistaChange(): void {
        this.clearValidationMessages();
        this.executeDependecyRulespucartaentrevista('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Evaluate dependendy rules for p_ProteccionDatos argument
     * @param event Rule event
     * @param internal Internal or External
     */
    private executeDependecyRulespuprotecciondatos(event: string, internal: boolean): void {
        if (!this.cacheDependencyRules.checkCounter()) {
            return;
        }
        // Rule 1
        if ('SetValue' === event && !internal) {
            this.executeDependecyRules1puProteccionDatos();
        }
        this.executePendingDependencyRules();
    }

    /**
     * Dependency rule 1 for p_ProteccionDatos argument
     */
    private executeDependecyRules1puProteccionDatos(): void {
        this.cacheDependencyRules.counter++;
        try {
            this.executeDependecyRules1puProteccionDatosActions();
        } catch (e) {
            console.log(e);
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        }
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 1 for p_ProteccionDatos argument
     */
    private executeDependecyRules1puProteccionDatosActions(): void {
        // v <> NULL AND v = FALSE
        if (!this.util.isNull(this.util.getBool(this.puProteccionDatos.value)) &&
            this.util.valueEquals(this.util.getBool(this.puProteccionDatos.value), false)) {
            // p_MarcarTodos.SetValue( FALSE )
            this.puMarcarTodos.setValue(false);
            this.executeDependecyRulespumarcartodos('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the change in the p_ProteccionDatos argument
     */
    public onpuprotecciondatosChange(): void {
        this.clearValidationMessages();
        this.executeDependecyRulespuprotecciondatos('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Evaluate dependendy rules for p_DiferenciasLiq argument
     * @param event Rule event
     * @param internal Internal or External
     */
    private executeDependecyRulespudiferenciasliq(event: string, internal: boolean): void {
        if (!this.cacheDependencyRules.checkCounter()) {
            return;
        }
        // Rule 1
        if ('SetValue' === event && !internal) {
            this.executeDependecyRules1puDiferenciasLiq();
        }
        this.executePendingDependencyRules();
    }

    /**
     * Dependency rule 1 for p_DiferenciasLiq argument
     */
    private executeDependecyRules1puDiferenciasLiq(): void {
        this.cacheDependencyRules.counter++;
        try {
            this.executeDependecyRules1puDiferenciasLiqActions();
        } catch (e) {
            console.log(e);
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        }
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 1 for p_DiferenciasLiq argument
     */
    private executeDependecyRules1puDiferenciasLiqActions(): void {
        // v <> NULL AND v = FALSE
        if (!this.util.isNull(this.util.getBool(this.puDiferenciasLiq.value)) &&
            this.util.valueEquals(this.util.getBool(this.puDiferenciasLiq.value), false)) {
            // p_MarcarTodos.SetValue( FALSE )
            this.puMarcarTodos.setValue(false);
            this.executeDependecyRulespumarcartodos('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the change in the p_DiferenciasLiq argument
     */
    public onpudiferenciasliqChange(): void {
        this.clearValidationMessages();
        this.executeDependecyRulespudiferenciasliq('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Evaluate dependendy rules for p_MarcarTodos argument
     * @param event Rule event
     * @param internal Internal or External
     */
    private executeDependecyRulespumarcartodos(event: string, internal: boolean): void {
        if (!this.cacheDependencyRules.checkCounter()) {
            return;
        }
        // Rule 1
        if ('SetValue' === event && !internal) {
            this.executeDependecyRules1puMarcarTodos();
        }
        this.executePendingDependencyRules();
    }

    /**
     * Dependency rule 1 for p_MarcarTodos argument
     */
    private executeDependecyRules1puMarcarTodos(): void {
        this.cacheDependencyRules.counter++;
        this.addQueryInstanceFromField(this.puthisSolicitud,
                'tramite,drvaplicacarnets,drvaplicacartaent,drvaplicadoccartapree,drvaplicadocbbgestante,drvaplicadoccontrato' +
                ',drvaplicacuestionario,tienedifliquidacion,drvaplicadocmaternidad,drvaplicadocprotdatos,drvaplicadocneonatal' +
                ',Ae_solicitudes.id_solicitud');
        this.notifyCallToTheBackEnd();
        this.cacheDependencyRules.searchAll().then(() => {
            this.notifyAnswerFromToTheBackEnd();
            try {
                this.executeDependecyRules1puMarcarTodosActions();
            } catch (e) {
                console.log(e);
                this.notifyAnswerFromToTheBackEnd();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            } });
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 1 for p_MarcarTodos argument
     */
    private executeDependecyRules1puMarcarTodosActions(): void {
        const varputhissolicitud = this.getFirstInstanceFromCache(this.puthisSolicitud);
        // v <> NULL AND v = true
        if (varputhissolicitud && !this.util.isNull(this.util.getBool(this.puMarcarTodos.value)) &&
            this.util.valueEquals(this.util.getBool(this.puMarcarTodos.value), true)) {
            // p_AnexosIncl.SetValue( p_thissolicitud.tramite = 2 )
            this.puAnexosIncl.setValue(this.util.valueEquals(this.util.getInt(varputhissolicitud.get('tramite')), 2));
            this.executeDependecyRulespuanexosincl('SetValue', true);
            // p_Carnets.SetValue( p_thissolicitud.drvaplicacarnets )
            this.puCarnets.setValue(this.util.getBool(varputhissolicitud.get('drvaplicacarnets')));
            this.executeDependecyRulespucarnets('SetValue', true);
            // p_CartaEntrevista.SetValue( p_thissolicitud.drvaplicacartaent )
            this.puCartaEntrevista.setValue(this.util.getBool(varputhissolicitud.get('drvaplicacartaent')));
            this.executeDependecyRulespucartaentrevista('SetValue', true);
            // p_CartaPre.SetValue( p_thissolicitud.drvaplicadoccartapree )
            this.puCartaPre.setValue(this.util.getBool(varputhissolicitud.get('drvaplicadoccartapree')));
            this.executeDependecyRulespucartapre('SetValue', true);
            // p_CondicionesBB.SetValue( p_thissolicitud.drvaplicadocbbgestante )
            this.puCondicionesBB.setValue(this.util.getBool(varputhissolicitud.get('drvaplicadocbbgestante')));
            this.executeDependecyRulespucondicionesbb('SetValue', true);
            // p_Contrato.SetValue( p_thissolicitud.tramite = 1 AND p_thissolicitud.drvaplicadoccontrato = true )
            this.puContrato.setValue(this.util.valueEquals(this.util.getInt(varputhissolicitud.get('tramite')), 1) &&
                this.util.valueEquals(this.util.getBool(varputhissolicitud.get('drvaplicadoccontrato')), true));
            this.executeDependecyRulespucontrato('SetValue', true);
            // p_CuesMedico.SetValue( p_thissolicitud.drvaplicacuestionario )
            this.puCuesMedico.setValue(this.util.getBool(varputhissolicitud.get('drvaplicacuestionario')));
            this.executeDependecyRulespucuesmedico('SetValue', true);
            // p_DiferenciasLiq.SetValue( p_thissolicitud.tienedifliquidacion )
            this.puDiferenciasLiq.setValue(this.util.getBool(varputhissolicitud.get('tienedifliquidacion')));
            this.executeDependecyRulespudiferenciasliq('SetValue', true);
            // p_DocMaternidad.SetValue( p_thissolicitud.drvaplicadocmaternidad )
            this.puDocMaternidad.setValue(this.util.getBool(varputhissolicitud.get('drvaplicadocmaternidad')));
            this.executeDependecyRulespudocmaternidad('SetValue', true);
            // p_ProteccionDatos.SetValue( p_thissolicitud.drvaplicadocprotdatos )
            this.puProteccionDatos.setValue(this.util.getBool(varputhissolicitud.get('drvaplicadocprotdatos')));
            this.executeDependecyRulespuprotecciondatos('SetValue', true);
            // p_Solicitud.SetValue( TRUE )
            this.puSolicitud.setValue(true);
            this.executeDependecyRulespusolicitud('SetValue', true);
            // p_DocNeonatal.SetValue( p_thissolicitud.drvaplicadocneonatal )
            this.puDocNeonatal.setValue(this.util.getBool(varputhissolicitud.get('drvaplicadocneonatal')));
            this.executeDependecyRulespudocneonatal('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the change in the p_MarcarTodos argument
     */
    public onpumarcartodosChange(): void {
        this.clearValidationMessages();
        this.executeDependecyRulespumarcartodos('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Evaluate dependendy rules for p_DocNeonatal argument
     * @param event Rule event
     * @param internal Internal or External
     */
    private executeDependecyRulespudocneonatal(event: string, internal: boolean): void {
        if (!this.cacheDependencyRules.checkCounter()) {
            return;
        }
        // Rule 1
        if ('SetValue' === event && !internal) {
            this.executeDependecyRules1puDocNeonatal();
        }
        this.executePendingDependencyRules();
    }

    /**
     * Dependency rule 1 for p_DocNeonatal argument
     */
    private executeDependecyRules1puDocNeonatal(): void {
        this.cacheDependencyRules.counter++;
        try {
            this.executeDependecyRules1puDocNeonatalActions();
        } catch (e) {
            console.log(e);
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        }
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 1 for p_DocNeonatal argument
     */
    private executeDependecyRules1puDocNeonatalActions(): void {
        // v<> NULL AND v = FALSE
        if (!this.util.isNull(this.util.getBool(this.puDocNeonatal.value)) &&
            this.util.valueEquals(this.util.getBool(this.puDocNeonatal.value), false)) {
            // p_MarcarTodos.SetValue( FALSE )
            this.puMarcarTodos.setValue(false);
            this.executeDependecyRulespumarcartodos('SetValue', true);
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the change in the p_DocNeonatal argument
     */
    public onpudocneonatalChange(): void {
        this.clearValidationMessages();
        this.executeDependecyRulespudocneonatal('SetValue', false);
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

    /**
     * Returns true if all elements contained in the group are visible
     * @param groupId Group id.
     */
    public isGroupVisible(groupId: string): boolean {
        let isVisible = true;

        if (groupId === '0') {
            isVisible = this.puPrevisualizar.visible ||
                this.puEnviar.visible;
        }
        if (groupId === '1') {
            isVisible = this.puContrato.visible ||
                this.puCarnets.visible ||
                this.puCartaPre.visible ||
                this.puSolicitud.visible ||
                this.puCondicionesBB.visible ||
                this.puAnexosIncl.visible ||
                this.puDocMaternidad.visible ||
                this.puDocNeonatal.visible ||
                this.puCuesMedico.visible ||
                this.puCartaEntrevista.visible ||
                this.puProteccionDatos.visible ||
                this.puDiferenciasLiq.visible ||
                this.puMarcarTodos.visible;
        }
        return isVisible;
    }

    /**
     * Returns the alias group
     * @param groupId Group id
     */
    public getGroupAlias(groupId: string): string {
        let alias = '';

        if (groupId === '0') {
            alias = this.langMng.translateText('0',
                'Indique qué desea hacer');
        }
        if (groupId === '1') {
            alias = this.langMng.translateText('1',
                'Seleccione documentos');
        }
        return alias;
    }
}
