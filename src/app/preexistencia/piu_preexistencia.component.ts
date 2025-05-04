import { ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from '../common/app.utils';
import { DisplaySetItem } from '../common/queryIUElements';
import { ModelConstants } from '../common/model.constants';
import { AbstractPIU } from '../common/abstractPIU';
import { Field } from '../common/baseIUElements';
import { LanguageMng } from '../common/languageMng';
import { StandardFunctions } from '../common/standardFunctions';
import { ConditionalNavigationMng } from '../common/conditionalNavigationMng';
import { UserFunctions } from '../common/userFunctions';

/**
 * « Implements PIU PIU_Preexistencia of Preexistencia »
 */
export class PreexistenciaPIUuPreexistenciaComponent extends AbstractPIU {
    /** Constants for display set item aliases */
    private readonly dsusuarioddrvnombrecompleto = 'Usuario';
    private readonly dsusuarioddrvidentificacion = 'Tipo y Nº Doc';
    private readonly dsdescripcion = 'Preexistencia';
    private readonly dsfecinicio = 'Fecha Inicio';
    private readonly dsfecfin = 'Fecha fin';

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
        this.idXML = 'Clas_1434050494464197UIPobCl_1';
        this.className = ModelConstants.Preexistencia.name;
        this.iuName = 'PIU_Preexistencia';
        this.setUserVisibility(this.appGlobalInfo.getLoggedUserInfo().isIUVisible(this.idXML, ['Admin', 'SuperAdmin', 'Asesor',
            'AreaMedica', 'Gestor', 'MesaDeApoyo']));
        this.title = this.langMng.translateText('cls_Preexistencia_piu_PIU_Preexistencia',
            'Preexistencias');
        this.queryURL = '/api/PreexistenciaApi/GetPopulationDynamic';
        this.paginationInClient = false;
    }

    /**
     * Initialize the display set elements
     */
    public override initializeDisplaySet(): void {
        let dsItem: DisplaySetItem;

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1434050494464197CjtoVis_1ICtjoVis_1';
        dsItem.name = 'usuario.drvnombrecompleto';
        dsItem.field = 'usuario-drvnombrecompleto';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 200;
        dsItem.alias = this.langMng.translateText(
            'cls_Preexistencia_ds_DS_Preexistencia_PIU_item_Clas_1434050494464197CjtoVis_1ICtjoVis_1',
            this.dsusuarioddrvnombrecompleto);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Gestor.name, ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1434050494464197CjtoVis_1ICtjoVis_2';
        dsItem.name = 'usuario.drvidentificacion';
        dsItem.field = 'usuario-drvidentificacion';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 100;
        dsItem.alias = this.langMng.translateText(
            'cls_Preexistencia_ds_DS_Preexistencia_PIU_item_Clas_1434050494464197CjtoVis_1ICtjoVis_2',
            this.dsusuarioddrvidentificacion);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Gestor.name, ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1434050494464197CjtoVis_1ICtjoVis_3';
        dsItem.name = 'descripcion';
        dsItem.field = 'descripcion';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 200;
        dsItem.alias = this.langMng.translateText(
            'cls_Preexistencia_ds_DS_Preexistencia_PIU_item_Clas_1434050494464197CjtoVis_1ICtjoVis_3',
            this.dsdescripcion);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Gestor.name, ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1434050494464197CjtoVis_1ICtjoVis_4';
        dsItem.name = 'fecinicio';
        dsItem.field = 'fecinicio';
        dsItem.type = Field.dtDate;
        dsItem.alias = this.langMng.translateText(
            'cls_Preexistencia_ds_DS_Preexistencia_PIU_item_Clas_1434050494464197CjtoVis_1ICtjoVis_4',
            this.dsfecinicio);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Gestor.name, ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1434050494464197CjtoVis_1ICtjoVis_5';
        dsItem.name = 'fecfin';
        dsItem.field = 'fecfin';
        dsItem.type = Field.dtDate;
        dsItem.alias = this.langMng.translateText(
            'cls_Preexistencia_ds_DS_Preexistencia_PIU_item_Clas_1434050494464197CjtoVis_1ICtjoVis_5',
            this.dsfecfin);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Gestor.name, ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);
    }

    /**
     * Initialize the order criterias
     */
    public override initializeOrderCriterias(): void {
        this.orderCriteria = '';
    }
}
