import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from '../common/app.utils';
import { ModelConstants } from '../common/model.constants';
import { AbstractIIU } from '../common/abstractIIU';
import { Field } from '../common/baseIUElements';
import { StandardFunctions } from '../common/standardFunctions';
import { LanguageMng } from '../common/languageMng';
import { ConditionalNavigationMng } from '../common/conditionalNavigationMng';
import { UserFunctions } from '../common/userFunctions';

/**
 * « Implements IIU IIU_DiferenciasLiquidacion of Solicitud »
 */
@Component({
    selector: 'imes-solicitud-iiu-diferenciasliquidacion',
    templateUrl: './iiu_diferenciasliquidacion.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolicitudIIUuDiferenciasLiquidacionComponent extends AbstractIIU implements OnInit {

    /** Display Set elements */
    public dseNumRadicado: Field;
    public dsevalorCuota: Field;
    public dsevalorCuotaBrutaC: Field;
    public dsedrvDifValorCuotaBruta: Field;

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
        this.idXML = 'Clas_1431957012480960UIInst_15';
        this.className = ModelConstants.Solicitud.name;
        this.classAlias = this.langMng.translateText('cls_Solicitud',
            'Solicitud');
        this.supplementaryInfoAtt.push('ae_solicitudes.numero_solicitud');
        this.iuName = ModelConstants.Solicitud.iiuudiferenciasliquidacion;
        this.setUserVisibility(this.appGlobalInfo.getLoggedUserInfo().isIUVisible(this.idXML, ['Funcionario', 'Admin', 'SuperAdmin',
            'Asesor', 'AreaMedica', 'Afiliaciones', 'Gestor', 'MesaDeApoyo']));
        this.title = this.langMng.translateText('cls_Solicitud_iiu_IIU_DiferenciasLiquidacion',
            'Diferencias de liquidación');
        this.queryURL = '/api/SolicitudApi/GetPopulationDynamic';

        this.dseNumRadicado = new Field(this.langMng);
        this.dsevalorCuota = new Field(this.langMng);
        this.dsevalorCuotaBrutaC = new Field(this.langMng);
        this.dsedrvDifValorCuotaBruta = new Field(this.langMng);
    }

    public ngOnInit(): void {
        this.myngOnInit();
    }

    /**
     * Initialize the display set elements
     */
    public override initializeDisplaySet(): void {
        this.dseNumRadicado.nameInRequest = 'numradicado';
        this.dseNumRadicado.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_IIUDifLiq_item_Clas_1431957012480960CjtoVis_16ICtjoVis_15',
            'Nº Solicitud');
        this.dseNumRadicado.visible = this.appGlobalInfo.getLoggedUserInfo().isAttributeVisible(this.idXML,
            'Clas_1431957012480960CjtoVis_16ICtjoVis_15', ['Funcionario', 'Admin', 'SuperAdmin', 'Asesor', 'AreaMedica',
            'Afiliaciones', 'Gestor', 'MesaDeApoyo']);
        this.dseNumRadicado.enabled = false;
        this.dseNumRadicado.mandatory = false;
        this.dseNumRadicado.dataType = Field.dtInt;
        this.dseNumRadicado.assignCSS();
        this.fields.push(this.dseNumRadicado);

        this.dsevalorCuota.nameInRequest = 'valorcuota';
        this.dsevalorCuota.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_IIUDifLiq_item_Clas_1431957012480960CjtoVis_16ICtjoVis_1',
            'Valor cuota');
        this.dsevalorCuota.visible = this.appGlobalInfo.getLoggedUserInfo().isAttributeVisible(this.idXML,
            'Clas_1431957012480960CjtoVis_16ICtjoVis_1', ['Admin', 'SuperAdmin', 'Asesor', 'AreaMedica', 'Afiliaciones', 'Gestor',
            'MesaDeApoyo']);
        this.dsevalorCuota.enabled = false;
        this.dsevalorCuota.mandatory = false;
        this.dsevalorCuota.dataType = Field.dtReal;
        this.dsevalorCuota.assignCSS();
        this.fields.push(this.dsevalorCuota);

        this.dsevalorCuotaBrutaC.nameInRequest = 'valorcuotabrutac';
        this.dsevalorCuotaBrutaC.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_IIUDifLiq_item_Clas_1431957012480960CjtoVis_16ICtjoVis_13',
            'Valor Cuota Bruta');
        this.dsevalorCuotaBrutaC.visible = this.appGlobalInfo.getLoggedUserInfo().isAttributeVisible(this.idXML,
            'Clas_1431957012480960CjtoVis_16ICtjoVis_13', ['Admin', 'SuperAdmin', 'Asesor', 'AreaMedica', 'Afiliaciones', 'Gestor',
            'MesaDeApoyo']);
        this.dsevalorCuotaBrutaC.enabled = false;
        this.dsevalorCuotaBrutaC.mandatory = false;
        this.dsevalorCuotaBrutaC.dataType = Field.dtReal;
        this.dsevalorCuotaBrutaC.assignCSS();
        this.fields.push(this.dsevalorCuotaBrutaC);

        this.dsedrvDifValorCuotaBruta.nameInRequest = 'drvdifvalorcuotabruta';
        this.dsedrvDifValorCuotaBruta.alias = this.langMng.translateText(
            'cls_Solicitud_ds_DS_Solicitud_IIUDifLiq_item_Clas_1431957012480960CjtoVis_16ICtjoVis_14',
            'Diferencia Cuota Bruta');
        this.dsedrvDifValorCuotaBruta.visible = this.appGlobalInfo.getLoggedUserInfo().isAttributeVisible(this.idXML,
            'Clas_1431957012480960CjtoVis_16ICtjoVis_14', ['Admin', 'SuperAdmin', 'Asesor', 'AreaMedica', 'Afiliaciones', 'Gestor',
            'MesaDeApoyo']);
        this.dsedrvDifValorCuotaBruta.enabled = false;
        this.dsedrvDifValorCuotaBruta.mandatory = false;
        this.dsedrvDifValorCuotaBruta.dataType = Field.dtReal;
        this.dsedrvDifValorCuotaBruta.assignCSS();
        this.fields.push(this.dsedrvDifValorCuotaBruta);

    }
}
