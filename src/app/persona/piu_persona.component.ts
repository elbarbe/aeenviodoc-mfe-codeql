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
 * « Implements PIU PIU_Persona of Persona »
 */
@Component({
    selector: 'imes-persona-piu-persona',
    templateUrl: './piu_persona.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonaPIUuPersonaComponent extends AbstractPIU implements OnInit {
    /** Constants for display set item aliases */
    private readonly dstipoidentificaciondnombrecorto = 'Tipo identificación';
    private readonly dsnumidentificacion = 'Nº Identificación';
    private readonly dsprimernombre = 'Primer Nombre';
    private readonly dssegundonombre = 'Segundo Nombre';
    private readonly dsprimerapellido = 'Primer Apellido';
    private readonly dssegundoapellido = 'Segundo Apellido';
    private readonly dsfechanacimiento = 'Fecha Nacimiento';
    private readonly dsgenero = 'Género';
    private readonly dsrazonsocial = 'Razón Social';

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
        this.idXML = 'Clas_1431886233600805UIPobCl_1';
        this.className = ModelConstants.Persona.name;
        this.iuName = ModelConstants.Persona.piuupersona;
        this.setUserVisibility(this.appGlobalInfo.getLoggedUserInfo().isIUVisible(this.idXML, ['Admin', 'SuperAdmin', 'Asesor',
            'AreaMedica', 'Afiliaciones', 'Gestor', 'MesaDeApoyo']));
        this.title = this.langMng.translateText('cls_Persona_piu_PIU_Persona',
            'Personas');
        this.queryURL = '/api/PersonaApi/GetPopulationDynamic';
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
        dsItem.idXML = 'Clas_1431886233600805CjtoVis_2ICtjoVis_1';
        dsItem.name = 'tipoidentificacion.nombrecorto';
        dsItem.field = 'tipoidentificacion-nombrecorto';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 20;
        dsItem.alias = this.langMng.translateText(
            'cls_Persona_ds_DS_Persona_PIU_item_Clas_1431886233600805CjtoVis_2ICtjoVis_1',
            this.dstipoidentificaciondnombrecorto);
        dsItem.agents = [];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431886233600805CjtoVis_2ICtjoVis_2';
        dsItem.name = 'numidentificacion';
        dsItem.field = 'numidentificacion';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 60;
        dsItem.alias = this.langMng.translateText(
            'cls_Persona_ds_DS_Persona_PIU_item_Clas_1431886233600805CjtoVis_2ICtjoVis_2',
            this.dsnumidentificacion);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431886233600805CjtoVis_2ICtjoVis_4';
        dsItem.name = 'primernombre';
        dsItem.field = 'primernombre';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 50;
        dsItem.alias = this.langMng.translateText(
            'cls_Persona_ds_DS_Persona_PIU_item_Clas_1431886233600805CjtoVis_2ICtjoVis_4',
            this.dsprimernombre);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431886233600805CjtoVis_2ICtjoVis_11';
        dsItem.name = 'segundonombre';
        dsItem.field = 'segundonombre';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 50;
        dsItem.alias = this.langMng.translateText(
            'cls_Persona_ds_DS_Persona_PIU_item_Clas_1431886233600805CjtoVis_2ICtjoVis_11',
            this.dssegundonombre);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431886233600805CjtoVis_2ICtjoVis_5';
        dsItem.name = 'primerapellido';
        dsItem.field = 'primerapellido';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 50;
        dsItem.alias = this.langMng.translateText(
            'cls_Persona_ds_DS_Persona_PIU_item_Clas_1431886233600805CjtoVis_2ICtjoVis_5',
            this.dsprimerapellido);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431886233600805CjtoVis_2ICtjoVis_12';
        dsItem.name = 'segundoapellido';
        dsItem.field = 'segundoapellido';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 50;
        dsItem.alias = this.langMng.translateText(
            'cls_Persona_ds_DS_Persona_PIU_item_Clas_1431886233600805CjtoVis_2ICtjoVis_12',
            this.dssegundoapellido);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431886233600805CjtoVis_2ICtjoVis_9';
        dsItem.name = 'fechanacimiento';
        dsItem.field = 'fechanacimiento';
        dsItem.type = Field.dtDate;
        dsItem.alias = this.langMng.translateText(
            'cls_Persona_ds_DS_Persona_PIU_item_Clas_1431886233600805CjtoVis_2ICtjoVis_9',
            this.dsfechanacimiento);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431886233600805CjtoVis_2ICtjoVis_10';
        dsItem.name = 'genero';
        dsItem.field = 'genero';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 1;
        dsItem.alias = this.langMng.translateText(
            'cls_Persona_ds_DS_Persona_PIU_item_Clas_1431886233600805CjtoVis_2ICtjoVis_10',
            this.dsgenero);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Areamedica.name, ModelConstants.Afiliaciones.name, ModelConstants.Gestor.name,
            ModelConstants.Mesadeapoyo.name];
        dsItem.options = DefinedSelections.DS_GENERO;
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1431886233600805CjtoVis_2ICtjoVis_8';
        dsItem.name = 'razonsocial';
        dsItem.field = 'razonsocial';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 254;
        dsItem.alias = this.langMng.translateText(
            'cls_Persona_ds_DS_Persona_PIU_item_Clas_1431886233600805CjtoVis_2ICtjoVis_8',
            this.dsrazonsocial);
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
