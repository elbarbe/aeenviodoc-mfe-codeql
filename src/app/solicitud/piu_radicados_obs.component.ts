import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from '../common/app.utils';
import { DisplaySetItem } from '../common/queryIUElements';
import { ModelConstants } from '../common/model.constants';
import { AbstractPIU } from '../common/abstractPIU';
import { DefinedSelections } from '../common/definedSelection';
import { Field } from '../common/baseIUElements';
import { LanguageMng } from '../common/languageMng';
import { StandardFunctions } from '../common/standardFunctions';
import { ConditionalNavigationMng } from '../common/conditionalNavigationMng';
import { UserFunctions } from '../common/userFunctions';

/**
 * « Implements PIU PIU_Radicados_Obs of Solicitud »
 */
@Component({
    selector: 'imes-solicitud-piu-radicados-obs',
    templateUrl: './piu_radicados_obs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolicitudPIUuRadicadosuObsComponent extends AbstractPIU implements OnInit {
    /** Constants for display set item aliases */
    private readonly dsaeusolicitudesdnumerousolicitud = 'Nº Solicitud';
    private readonly dsaeusolicitudesdproductotddescripcion = 'Producto';
    private readonly dsaeusolicitudesdplantdnombre = 'Plan';
    private readonly dstramite = 'Trámite';
    private readonly dsaeusolicitudesdfechauasignacion = 'Fecha elaboración';
    private readonly dsnumradicado = 'Nº Solicitud';
    private readonly dscontratantepersonaddrvnombrecompleto = 'Contratante';
    private readonly dstitularpersonaddrvnombrecompleto = 'Titular';

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
        this.idXML = 'Clas_1431957012480960UIPobCl_1';
        this.className = ModelConstants.Solicitud.name;
        this.classAlias = this.langMng.translateText('cls_Solicitud',
            'Solicitud');
        this.supplementaryInfoAtt.push('ae_solicitudes.numero_solicitud');
        this.iuName = ModelConstants.Solicitud.piuuradicadosuobs;
        this.setUserVisibility(this.appGlobalInfo.getLoggedUserInfo().isIUVisible(this.idXML, ['Admin', 'SuperAdmin', 'Asesor',
            'AreaMedica', 'Afiliaciones', 'Gestor', 'MesaDeApoyo', 'Funcionario']));
        this.title = this.langMng.translateText('cls_Solicitud_piu_PIU_Radicados_Obs',
            'Radicados');
        this.queryURL = '/api/SolicitudApi/GetPopulationDynamic';
        this.paginationInClient = false;
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
        dsItem.idXML = 'Clas_1431957012480960CjtoVis_1ICtjoVis_1';
        dsItem.name = 'ae_solicitudes.numero_solicitud';
        dsItem.field = 'ae_solicitudes-numero_solicitud';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 50;
        dsItem.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_PIURadicado_item_Clas_1431957012480960CjtoVis_1ICtjoVis_1',
            this.dsaeusolicitudesdnumerousolicitud);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431957012480960CjtoVis_1ICtjoVis_2';
        dsItem.name = 'ae_solicitudes.productot.descripcion';
        dsItem.field = 'ae_solicitudes-productot-descripcion';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 100;
        dsItem.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_PIURadicado_item_Clas_1431957012480960CjtoVis_1ICtjoVis_2',
            this.dsaeusolicitudesdproductotddescripcion);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431957012480960CjtoVis_1ICtjoVis_3';
        dsItem.name = 'ae_solicitudes.plant.nombre';
        dsItem.field = 'ae_solicitudes-plant-nombre';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 150;
        dsItem.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_PIURadicado_item_Clas_1431957012480960CjtoVis_1ICtjoVis_3',
            this.dsaeusolicitudesdplantdnombre);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431957012480960CjtoVis_1ICtjoVis_4';
        dsItem.name = 'tramite';
        dsItem.field = 'tramite';
        dsItem.type = Field.dtNat;
        dsItem.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_PIURadicado_item_Clas_1431957012480960CjtoVis_1ICtjoVis_4',
            this.dstramite);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        dsItem.options = DefinedSelections.DS_TRAMITE;
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431957012480960CjtoVis_1ICtjoVis_15';
        dsItem.name = 'ae_solicitudes.fecha_asignacion';
        dsItem.field = 'ae_solicitudes-fecha_asignacion';
        dsItem.type = Field.dtDate;
        dsItem.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_PIURadicado_item_Clas_1431957012480960CjtoVis_1ICtjoVis_15',
            this.dsaeusolicitudesdfechauasignacion);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431957012480960CjtoVis_1ICtjoVis_5';
        dsItem.name = 'numradicado';
        dsItem.field = 'numradicado';
        dsItem.type = Field.dtInt;
        dsItem.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_PIURadicado_item_Clas_1431957012480960CjtoVis_1ICtjoVis_5',
            this.dsnumradicado);
        dsItem.agents = [ModelConstants.Funcionario.name, ModelConstants.Admin.name, ModelConstants.Superadmin.name,
            ModelConstants.Asesor.name, ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431957012480960CjtoVis_1ICtjoVis_6';
        dsItem.name = 'contratantepersona.drvnombrecompleto';
        dsItem.field = 'contratantepersona-drvnombrecompleto';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 255;
        dsItem.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_PIURadicado_item_Clas_1431957012480960CjtoVis_1ICtjoVis_6',
            this.dscontratantepersonaddrvnombrecompleto);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431957012480960CjtoVis_1ICtjoVis_10';
        dsItem.name = 'titularpersona.drvnombrecompleto';
        dsItem.field = 'titularpersona-drvnombrecompleto';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 255;
        dsItem.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_PIURadicado_item_Clas_1431957012480960CjtoVis_1ICtjoVis_10',
            this.dstitularpersonaddrvnombrecompleto);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);
    }

    /**
     * Initialize the order criterias
     */
    public override initializeOrderCriterias(): void {
        this.orderCriteria = '';
    }
}
