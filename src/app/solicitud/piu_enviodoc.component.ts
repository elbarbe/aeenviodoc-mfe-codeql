import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from '../common/app.utils';
import { DisplaySetItem, AccNavItem } from '../common/queryIUElements';
import { ModelConstants } from '../common/model.constants';
import { AbstractPIU } from '../common/abstractPIU';
import { SolicitudFilterFuSolicitudContratanteTitular} from './filters/solicitudfilterfusolicitudcontratantetitular';
import { SolicitudFilterFuSolicitudSolicitud} from './filters/solicitudfilterfusolicitudsolicitud';
import { DefinedSelections } from '../common/definedSelection';
import { Field } from '../common/baseIUElements';
import { LanguageMng } from '../common/languageMng';
import { StandardFunctions } from '../common/standardFunctions';
import { ConditionalNavigationMng } from '../common/conditionalNavigationMng';
import { UserFunctions } from '../common/userFunctions';

/**
 * « Implements PIU PIU_EnvioDoc of Solicitud »
 */
@Component({
    selector: 'imes-solicitud-piu-enviodoc',
    templateUrl: './piu_enviodoc.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolicitudPIUuEnvioDocComponent extends AbstractPIU implements OnInit {
    /** Constants for display set item aliases */
    private readonly dstramite = 'Trámite';
    private readonly dsaeusolicitudesdproductotddescripcion = 'Producto';
    private readonly dsaeusolicitudesdplantdnombre = 'Plan';
    private readonly dsaeusolicitudesdnumerousolicitud = 'Nº Solicitud';
    private readonly dsestado = 'Estado';
    private readonly dsnumcontrato = 'Nº Contrato';
    private readonly dsdocsenviados = 'Doc. Enviada';
    private readonly dsagentedusuario = 'Usuario';
    private readonly dstienedifliquidacion = 'Diferencias liquidación';
    private readonly dsdrvtienesegundafirma = 'Segunda firma';
    private readonly dsestadodoc = 'Estado documentación';

    /** Filters */
    public f0: SolicitudFilterFuSolicitudContratanteTitular;
    public f1: SolicitudFilterFuSolicitudSolicitud;

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
        public override langMng: LanguageMng, public stdFun: StandardFunctions,
        public override condNavMng: ConditionalNavigationMng, public usrFunc: UserFunctions) {
        super(appGlobalInfo, util, changeDetectorRef, langMng, condNavMng);
        this.idXML = 'Clas_1431957012480960UIPobCl_3';
        this.className = ModelConstants.Solicitud.name;
        this.iuName = ModelConstants.Solicitud.piuuenviodoc;
        this.setUserVisibility(this.appGlobalInfo.getLoggedUserInfo().isIUVisible(this.idXML, ['Admin', 'SuperAdmin', 'Asesor',
            'AreaMedica', 'Afiliaciones', 'Gestor', 'MesaDeApoyo']));
        this.title = this.langMng.translateText('cls_Solicitud_piu_PIU_EnvioDoc',
            'Envío de documentos');
        this.f0 = new SolicitudFilterFuSolicitudContratanteTitular(this.appGlobalInfo,
            this.util, this.changeDetectorRef, this.langMng, stdFun, usrFunc);
        this.f0.populationContainer = this;
        this.filters.push(this.f0);
        this.f1 = new SolicitudFilterFuSolicitudSolicitud(this.appGlobalInfo,
            this.util, this.changeDetectorRef, this.langMng, stdFun, usrFunc);
        this.f1.populationContainer = this;
        this.filters.push(this.f1);
        this.queryURL = '/api/SolicitudApi/GetPopulationDynamic';
        this.paginationInClient = false;
        this.autoSearch = false;
    }

    /**
     * It is the main component. Process the initial actions
     */
    public ngOnInit(): void {
        this.myngOnInit();
    }

    /**
     * Initialize the display set elements
     */
    public override initializeDisplaySet(): void {
        let dsItem: DisplaySetItem;

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431957012480960CjtoVis_3ICtjoVis_1';
        dsItem.name = 'tramite';
        dsItem.field = 'tramite';
        dsItem.type = Field.dtNat;
        dsItem.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_PIUEnvioDoc_item_Clas_1431957012480960CjtoVis_3ICtjoVis_1',
            this.dstramite);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        dsItem.options = DefinedSelections.DS_TRAMITE;
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431957012480960CjtoVis_3ICtjoVis_2';
        dsItem.name = 'ae_solicitudes.productot.descripcion';
        dsItem.field = 'ae_solicitudes-productot-descripcion';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 100;
        dsItem.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_PIUEnvioDoc_item_Clas_1431957012480960CjtoVis_3ICtjoVis_2',
            this.dsaeusolicitudesdproductotddescripcion);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431957012480960CjtoVis_3ICtjoVis_3';
        dsItem.name = 'ae_solicitudes.plant.nombre';
        dsItem.field = 'ae_solicitudes-plant-nombre';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 150;
        dsItem.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_PIUEnvioDoc_item_Clas_1431957012480960CjtoVis_3ICtjoVis_3',
            this.dsaeusolicitudesdplantdnombre);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431957012480960CjtoVis_3ICtjoVis_4';
        dsItem.name = 'ae_solicitudes.numero_solicitud';
        dsItem.field = 'ae_solicitudes-numero_solicitud';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 50;
        dsItem.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_PIUEnvioDoc_item_Clas_1431957012480960CjtoVis_3ICtjoVis_4',
            this.dsaeusolicitudesdnumerousolicitud);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431957012480960CjtoVis_3ICtjoVis_19';
        dsItem.name = 'estado';
        dsItem.field = 'estado';
        dsItem.type = Field.dtInt;
        dsItem.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_PIUEnvioDoc_item_Clas_1431957012480960CjtoVis_3ICtjoVis_19',
            this.dsestado);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        dsItem.options = DefinedSelections.DS_ESTADOSOLICITUD;
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431957012480960CjtoVis_3ICtjoVis_6';
        dsItem.name = 'numcontrato';
        dsItem.field = 'numcontrato';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 50;
        dsItem.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_PIUEnvioDoc_item_Clas_1431957012480960CjtoVis_3ICtjoVis_6',
            this.dsnumcontrato);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431957012480960CjtoVis_3ICtjoVis_17';
        dsItem.name = 'docsenviados';
        dsItem.field = 'docsenviados';
        dsItem.type = Field.dtBool;
        dsItem.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_PIUEnvioDoc_item_Clas_1431957012480960CjtoVis_3ICtjoVis_17',
            this.dsdocsenviados);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        dsItem.options = DefinedSelections.DS_SINO;
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431957012480960CjtoVis_3ICtjoVis_11';
        dsItem.name = 'agente.usuario';
        dsItem.field = 'agente-usuario';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 50;
        dsItem.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_PIUEnvioDoc_item_Clas_1431957012480960CjtoVis_3ICtjoVis_11',
            this.dsagentedusuario);
        dsItem.agents = [];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431957012480960CjtoVis_3ICtjoVis_12';
        dsItem.name = 'tienedifliquidacion';
        dsItem.field = 'tienedifliquidacion';
        dsItem.type = Field.dtBool;
        dsItem.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_PIUEnvioDoc_item_Clas_1431957012480960CjtoVis_3ICtjoVis_12',
            this.dstienedifliquidacion);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        dsItem.options = DefinedSelections.DS_SINO;
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431957012480960CjtoVis_3ICtjoVis_18';
        dsItem.name = 'drvtienesegundafirma';
        dsItem.field = 'drvtienesegundafirma';
        dsItem.type = Field.dtBool;
        dsItem.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_PIUEnvioDoc_item_Clas_1431957012480960CjtoVis_3ICtjoVis_18',
            this.dsdrvtienesegundafirma);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        dsItem.options = DefinedSelections.DS_SINO;
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431957012480960CjtoVis_3ICtjoVis_20';
        dsItem.name = 'estadodoc';
        dsItem.field = 'estadodoc';
        dsItem.type = Field.dtNat;
        dsItem.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_PIUEnvioDoc_item_Clas_1431957012480960CjtoVis_3ICtjoVis_20',
            this.dsestadodoc);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        dsItem.options = DefinedSelections.DS_ESTADODOCUMENTOG;
        this.displaySet.push(dsItem);
    }

    /**
     * Initialize the action items
     */
    public override initializeActions(): void {
        let accItem: AccNavItem;
        accItem = new AccNavItem();
        accItem.id = 0;
        accItem.idXML = 'Clas_1431957012480960AccOfer_10ElemAcc_7';
        accItem.alias = this.langMng.translateText(
            'cls_Solicitud_act_A_Solicitud_PIUEnvioDoc_item_Clas_1431957012480960AccOfer_10ElemAcc_7',
            'Selección/Envío de documentación');
        accItem.nounVerb = true;
        accItem.multiSelection = false;
        accItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        accItem.targetClass = ModelConstants.Solicitud.name;
        accItem.targetUI = ModelConstants.Solicitud.siuutenviardoc;

        this.actions.push(accItem);

        accItem = new AccNavItem();
        accItem.id = 1;
        accItem.idXML = 'Clas_1431957012480960AccOfer_10ElemAcc_5';
        accItem.alias = this.langMng.translateText(
            'cls_Solicitud_act_A_Solicitud_PIUEnvioDoc_item_Clas_1431957012480960AccOfer_10ElemAcc_5',
            'Preexistencias');
        accItem.nounVerb = true;
        accItem.multiSelection = false;
        accItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        accItem.targetClass = ModelConstants.Solicitud.name;
        accItem.targetUI = ModelConstants.Solicitud.siuudummyupreexistencias;
        accItem.setNoShowProperties('dummy_Preexistencias', 'p_thissolicitud_oid', '', false);
        accItem.preconditionAttributes.push(
            { agents: [],
              attributes: ['drvhaypreexistencias'] });

        this.actions.push(accItem);

        accItem = new AccNavItem();
        accItem.id = 2;
        accItem.idXML = 'Clas_1431957012480960AccOfer_10ElemAcc_3';
        accItem.alias = this.langMng.translateText(
            'cls_Solicitud_act_A_Solicitud_PIUEnvioDoc_item_Clas_1431957012480960AccOfer_10ElemAcc_3',
            'Ver detalle diferencias liquidación');
        accItem.nounVerb = true;
        accItem.multiSelection = false;
        accItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        accItem.targetClass = ModelConstants.Solicitud.name;
        accItem.targetUI = ModelConstants.Solicitud.siuudummyudiferenciasliq;
        accItem.setNoShowProperties('dummy_DiferenciasLiq', 'p_thissolicitud_oid', '', false);
        accItem.preconditionAttributes.push(
            { agents: [],
              attributes: ['tienedifliquidacion'] });

        this.actions.push(accItem);

    }

    /**
     * Initialize the order criterias
     */
    public override initializeOrderCriterias(): void {
        this.orderCriteriaList.push({key: 'OC_SolicitudFechaCreacion', value: 'Por fecha elaboración'});
        this.orderCriteria = 'OC_SolicitudFechaCreacion';
    }

    /**
     * Evaluate in advance the associated service preconditions to the action element
     * @param actionId Action element identification
     * @param rows Rows to be check
     */
    public override checkPreconditionInAdvanceForRows(actionId: number, rows: any[]): boolean {
        let isEnabled = true;

        if (actionId === 1) {
            isEnabled = this.checkPrecondicionInAdvanceNum1(rows);
        }

        if (actionId === 2) {
            isEnabled = this.checkPrecondicionInAdvanceNum2(rows);
        }
        return isEnabled;
    }

    /**
     * Evaluate in advance the preconditions of the action element number 1
     * @param rows Selected instances
     */
    private checkPrecondicionInAdvanceNum1(rows: any[]): boolean {
        for (const row of rows) {
            // drvHayPreexistencias = true
            if (!(this.util.valueEquals(this.util.getBool(this.getRowData(row, 'drvhaypreexistencias')), true))) {
                return false;
            }
        }
        return true;
    }

    /**
     * Evaluate in advance the preconditions of the action element number 2
     * @param rows Selected instances
     */
    private checkPrecondicionInAdvanceNum2(rows: any[]): boolean {
        for (const row of rows) {
            // TieneDifLiquidacion = true
            if (!(this.util.valueEquals(this.util.getBool(this.getRowData(row, 'tienedifliquidacion')), true))) {
                return false;
            }
        }
        return true;
    }
}
