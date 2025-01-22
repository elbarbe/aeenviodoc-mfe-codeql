import { ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from '../common/app.utils';
import { AccNavItem } from '../common/queryIUElements';
import { ModelConstants } from '../common/model.constants';
import { AbstractIIU } from '../common/abstractIIU';
import { Field } from '../common/baseIUElements';
import { StandardFunctions } from '../common/standardFunctions';
import { LanguageMng } from '../common/languageMng';
import { ConditionalNavigationMng } from '../common/conditionalNavigationMng';
import { UserFunctions } from '../common/userFunctions';

export class SolicitudIIUuSolicitudPreexistenciasComponent extends AbstractIIU {

    /** Display Set elements */
    public dseAeusolicitudesNumerousolicitud: Field;
    public dseNumContrato: Field;

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
        this.idXML = 'Clas_1431957012480960UIInst_16';
        this.className = ModelConstants.Solicitud.name;
        this.setUserVisibility(this.appGlobalInfo.getLoggedUserInfo().isIUVisible(this.idXML, ['Admin', 'SuperAdmin', 'Asesor',
            'AreaMedica', 'Afiliaciones', 'Gestor', 'MesaDeApoyo']));
        this.title = this.langMng.translateText('cls_Solicitud_iiu_IIU_SolicitudPreexistencias',
            'Solicitud');
        this.queryURL = '/api/SolicitudApi/GetPopulationDynamic';

        this.dseAeusolicitudesNumerousolicitud = new Field(this.langMng);
        this.dseNumContrato = new Field(this.langMng);
    }

    /**
     * Initialize the display set elements
     */
    public override initializeDisplaySet(): void {
        this.dseAeusolicitudesNumerousolicitud.nameInRequest = 'ae_solicitudes.numero_solicitud';
        this.dseAeusolicitudesNumerousolicitud.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_SolicitudIIUPreexistencias_item_Clas_1431957012480960CjtoVis_17ICtjoVis_1',
            'Nº Solicitud');
        this.dseAeusolicitudesNumerousolicitud.visible = this.appGlobalInfo.getLoggedUserInfo().isAttributeVisible(this.idXML,
            'Clas_1431957012480960CjtoVis_17ICtjoVis_1', ['Admin', 'SuperAdmin', 'Asesor', 'AreaMedica', 'Afiliaciones', 'Gestor',
            'MesaDeApoyo']);
        this.dseAeusolicitudesNumerousolicitud.enabled = false;
        this.dseAeusolicitudesNumerousolicitud.mandatory = false;
        this.dseAeusolicitudesNumerousolicitud.dataType = Field.dtString;
        this.dseAeusolicitudesNumerousolicitud.maxLength = 50;
        this.dseAeusolicitudesNumerousolicitud.assignCSS();
        this.fields.push(this.dseAeusolicitudesNumerousolicitud);

        this.dseNumContrato.nameInRequest = 'numcontrato';
        this.dseNumContrato.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_SolicitudIIUPreexistencias_item_Clas_1431957012480960CjtoVis_17ICtjoVis_2',
            'Nº Contrato');
        this.dseNumContrato.visible = this.appGlobalInfo.getLoggedUserInfo().isAttributeVisible(this.idXML,
            'Clas_1431957012480960CjtoVis_17ICtjoVis_2', ['Admin', 'SuperAdmin', 'Asesor', 'AreaMedica', 'Afiliaciones', 'Gestor',
            'MesaDeApoyo']);
        this.dseNumContrato.enabled = false;
        this.dseNumContrato.mandatory = false;
        this.dseNumContrato.dataType = Field.dtString;
        this.dseNumContrato.maxLength = 50;
        this.dseNumContrato.assignCSS();
        this.fields.push(this.dseNumContrato);

    }

    /**
     * Initialize the action items
     */
    public override initializeActions(): void {
        let accItem: AccNavItem;
        accItem = new AccNavItem();
        accItem.id = 0;
        accItem.idXML = 'Clas_1431957012480960AccOfer_14ElemAcc_1';
        accItem.alias = this.langMng.translateText(
            'cls_Solicitud_act_A_SolicitudIIUPreexistencias_item_Clas_1431957012480960AccOfer_14ElemAcc_1',
            'Firmar preexistencias');
        accItem.nounVerb = true;
        accItem.multiSelection = false;
        accItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name,
            ModelConstants.Mesadeapoyo.name];
        accItem.targetClass = ModelConstants.Solicitud.name;
        accItem.targetUI = ModelConstants.Solicitud.siuutcrearsegundafirma;
        accItem.preconditionAttributes.push(
            { agents: [],
              attributes: ['drvtienesegundafirma'] });
        accItem.preconditionAttributes.push(
            { agents: [],
              attributes: ['drvhaypreexistencias'] });
        this.actions.push(accItem);

    }

    /**
     * Evaluate in advance the associated service preconditions to the action element
     * @param actionId Action element identification
     * @param rows Rows to be check
     */
    public override checkPreconditionInAdvanceForRows(actionId: number, rows: any[]): boolean {
        let isEnabled = true;
        for (const row of rows) {
            if (actionId === 0) {
                isEnabled = this.checkPrecondicionInAdvanceNum0(row);
            }
        }
        return isEnabled;
    }

    /**
     * Evaluate in advance the preconditions of the action element number 0
     * @param row Instance data
     */
    private checkPrecondicionInAdvanceNum0(row: any): boolean {
        // drvTieneSegundaFirma = false
        if (!(this.util.valueEquals(this.util.getBool(this.getRowData(row, 'drvtienesegundafirma')), false))) {
            return false;
        }
        // drvHayPreexistencias = true
        if (!(this.util.valueEquals(this.util.getBool(this.getRowData(row, 'drvhaypreexistencias')), true))) {
            return false;
        }
        return true;
    }
}
