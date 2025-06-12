import { ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../../app.appglobalinfo';
import { Util } from '../../common/app.utils';
import { ModelConstants } from '../../common/model.constants';
import { Field, FieldDefinedSelection, FieldOVPreload } from '../../common/baseIUElements';
import { AbstractFilter } from '../../common/abstractFilter';
import { StandardFunctions } from '../../common/standardFunctions';
import { LanguageMng } from '../../common/languageMng';
import { DefinedSelections } from '../../common/definedSelection';
import { UserFunctions } from '../../common/userFunctions';

/**
 * Manages the filter F_PersonaVarios of class Persona
 */
export class PersonaFilterFuPersonaVarios extends AbstractFilter {

    /** Filter variables */
    public vuTipoPersona: FieldDefinedSelection;
    public vouTipoIdentificacion: FieldOVPreload;
    public vuRazonSocial: Field;
    public vuPrimerNombre: Field;
    public vuPrimerApellido: Field;
    public vuSegundoApellido: Field;

    /**
     * Component constructor
     * @param appGlobalInfo Application Global Information
     * @param util Navigation utils
     * @param changeDetectorRef Angular module
     * @param langMng Language manager
     * @param stdFun Standard functions
     * @param usrFunc User functions
     */
    constructor(public override appGlobalInfo: AppGlobalInfo,
                public override util: Util,
                public override changeDetectorRef: ChangeDetectorRef,
                public langMng: LanguageMng,
                public stdFun: StandardFunctions, public usrFunc: UserFunctions) {
        super(appGlobalInfo, util, changeDetectorRef);
        this.title = this.langMng.translateText('cls_Persona_filter_F_PersonaVarios',
            'Criterios varios');
        this.filterName = 'F_PersonaVarios';

        this.vuTipoPersona = new FieldDefinedSelection(this.langMng);
        this.vouTipoIdentificacion = new FieldOVPreload(this.langMng);
        this.vuRazonSocial = new Field(this.langMng);
        this.vuPrimerNombre = new Field(this.langMng);
        this.vuPrimerApellido = new Field(this.langMng);
        this.vuSegundoApellido = new Field(this.langMng);
    }

    /**
     * Initialize the filter
     */
    public override initializeComponents(): void {

        this.vuTipoPersona.nameInRequest = 'v_tipopersona';
        this.vuTipoPersona.alias = this.langMng.translateText(
            'cls_Persona_filter_F_PersonaVarios_fvar_v_TipoPersona',
            'Tipo persona');
        this.vuTipoPersona.visible = true;
        this.vuTipoPersona.enabled = true;
        this.vuTipoPersona.mandatory = false;
        this.vuTipoPersona.dataType = Field.dtString;
        this.vuTipoPersona.options = DefinedSelections.DS_TIPOPERSONA;
        this.vuTipoPersona.maxLength = 1;
        this.vuTipoPersona.assignCSS(this.populationContainer !== undefined);
        this.variables.push(this.vuTipoPersona);

        this.vouTipoIdentificacion.nameInRequest = 'vo_tipoidentificacion';
        this.vouTipoIdentificacion.alias = this.langMng.translateText(
            'cls_Persona_filter_F_PersonaVarios_fvar_vo_TipoIdentificacion',
            'Tipo identificación');
        this.vouTipoIdentificacion.visible = true;
        this.vouTipoIdentificacion.enabled = true;
        this.vouTipoIdentificacion.mandatory = false;
        this.vouTipoIdentificacion.dataType = ModelConstants.Tipoidentificacion.name;
        this.vouTipoIdentificacion.preloadValues = [];
        this.vouTipoIdentificacion.allowMultiSelect = false;
        this.vouTipoIdentificacion.maxLength = 170;
        this.vouTipoIdentificacion.assignCSS(this.populationContainer !== undefined);
        this.variables.push(this.vouTipoIdentificacion);

        this.vuRazonSocial.nameInRequest = 'v_razonsocial';
        this.vuRazonSocial.alias = this.langMng.translateText(
            'cls_Persona_filter_F_PersonaVarios_fvar_v_RazonSocial',
            'Razón Social');
        this.vuRazonSocial.visible = true;
        this.vuRazonSocial.enabled = true;
        this.vuRazonSocial.mandatory = false;
        this.vuRazonSocial.dataType = Field.dtString;
        this.vuRazonSocial.maxLength = 100;
        this.vuRazonSocial.assignCSS(this.populationContainer !== undefined);
        this.variables.push(this.vuRazonSocial);

        this.vuPrimerNombre.nameInRequest = 'v_primernombre';
        this.vuPrimerNombre.alias = this.langMng.translateText(
            'cls_Persona_filter_F_PersonaVarios_fvar_v_PrimerNombre',
            'Primer nombre');
        this.vuPrimerNombre.visible = true;
        this.vuPrimerNombre.enabled = true;
        this.vuPrimerNombre.mandatory = false;
        this.vuPrimerNombre.dataType = Field.dtString;
        this.vuPrimerNombre.maxLength = 50;
        this.vuPrimerNombre.assignCSS(this.populationContainer !== undefined);
        this.variables.push(this.vuPrimerNombre);

        this.vuPrimerApellido.nameInRequest = 'v_primerapellido';
        this.vuPrimerApellido.alias = this.langMng.translateText(
            'cls_Persona_filter_F_PersonaVarios_fvar_v_PrimerApellido',
            'Primer apellido');
        this.vuPrimerApellido.visible = true;
        this.vuPrimerApellido.enabled = true;
        this.vuPrimerApellido.mandatory = false;
        this.vuPrimerApellido.dataType = Field.dtString;
        this.vuPrimerApellido.maxLength = 50;
        this.vuPrimerApellido.assignCSS(this.populationContainer !== undefined);
        this.variables.push(this.vuPrimerApellido);

        this.vuSegundoApellido.nameInRequest = 'v_segundoapellido';
        this.vuSegundoApellido.alias = this.langMng.translateText(
            'cls_Persona_filter_F_PersonaVarios_fvar_v_SegundoApellido',
            'Segundo apellido');
        this.vuSegundoApellido.visible = true;
        this.vuSegundoApellido.enabled = true;
        this.vuSegundoApellido.mandatory = false;
        this.vuSegundoApellido.dataType = Field.dtString;
        this.vuSegundoApellido.maxLength = 50;
        this.vuSegundoApellido.assignCSS(this.populationContainer !== undefined);
        this.variables.push(this.vuSegundoApellido);
    }

    public override loadPreload(): void {

        // vouTipoIdentificacion
        this.executeSearchPreload(this.vouTipoIdentificacion, ModelConstants.Tipoidentificacion.name, 'IC_TipoIdentificacion',
            'OC_TipoIdentificacion', []);
    }

}
