import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from '../common/app.utils';
import { AbstractMDIU } from '../common/abstractMDIU';
import { LanguageMng } from '../common/languageMng';
import { ModelConstants } from '../common/model.constants';
import { StandardFunctions } from '../common/standardFunctions';
import { ConditionalNavigationMng } from '../common/conditionalNavigationMng';
import { SolicitudIIUuSolicitudPreexistenciasComponent } from './iiu_solicitudpreexistencias.component';
import { PreexistenciaPIUuPreexistenciaComponent } from '../preexistencia/piu_preexistencia.component';

import { UserFunctions } from '../common/userFunctions';

@Component({
    selector: 'imes-solicitud-mdiu-solicitudpreexistencias',
    templateUrl: './mdiu_solicitudpreexistencias.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolicitudMDIUuSolicitudPreexistenciasComponent extends AbstractMDIU implements OnInit {

    /** Master */
    public master: SolicitudIIUuSolicitudPreexistenciasComponent;

    /** Details */
    /** Detail component 0 */
    public d0: PreexistenciaPIUuPreexistenciaComponent;
    /** Detail 0 visible or not */
    public d0Visible = true;

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
    constructor(public override appGlobalInfo: AppGlobalInfo, public override util: Util,
                public override changeDetectorRef: ChangeDetectorRef,
                public langMng: LanguageMng, public stdFun: StandardFunctions,
                public condNavMng: ConditionalNavigationMng, public usrFunc: UserFunctions) {
        super(appGlobalInfo, util, changeDetectorRef);
        this.idXML = 'Clas_1431957012480960UIMaDet_9';
        this.className = ModelConstants.Solicitud.name;
        this.iuName = ModelConstants.Solicitud.mdiuusolicitudpreexistencias;
        this.setUserVisibility(this.appGlobalInfo.getLoggedUserInfo().isIUVisible(this.idXML, ['Admin', 'SuperAdmin', 'Asesor',
            'AreaMedica', 'Afiliaciones', 'Gestor', 'MesaDeApoyo']));
        this.title = this.langMng.translateText('cls_Solicitud_mdiu_MDIU_SolicitudPreexistencias',
            'Detalles Preexistencias');
        // Create the details and assign the master detail container
        this.master = new SolicitudIIUuSolicitudPreexistenciasComponent(appGlobalInfo, util, changeDetectorRef, langMng, stdFun,
            condNavMng, usrFunc);
        this.master.masterDetailContainer = this;
        this.masterAbstract = this.master;
        this.d0Visible = this.appGlobalInfo.getLoggedUserInfo().isDetailVisible(this.idXML, 'Clas_1431957012480960UIMaDet_9Det_1',
            ['Admin', 'SuperAdmin', 'Asesor', 'AreaMedica', 'Gestor', 'MesaDeApoyo']);
        this.d0 = new PreexistenciaPIUuPreexistenciaComponent(appGlobalInfo, util, changeDetectorRef, langMng, stdFun,
            condNavMng, usrFunc);
        this.d0.masterDetailContainer = this;
        if (this.d0Visible) {
            this.details.push(this.d0);
        }
    }

    public ngOnInit(): void {
        this.myngOnInit();
    }

    /**
     * Initialize the master and details components
     */
    public override initializeComponents(): void {
        this.master.iuId = this.iuId + 'M';
        this.master.initializeComponents();
        // Subscribe to the selection changed event
        this.master.selectionChanged.subscribe(data => this.processMasterSelectionChanged());
        // Details
        if (this.d0Visible && this.d0 != null) {
            this.d0.order = 0;
            this.d0.iuId = this.iuId + 'D0';
            this.d0.initializeComponents();
            this.d0.title = this.langMng.translateText(
                'cls_Solicitud_mdiu_MDIU_SolicitudPreexistencias_detail_Clas_1431957012480960UIMaDet_9Det_1',
                'Preexistencias');
            this.d0.initializeFromExchangeInfo(this.util.createExchangeInfoNavigationFromMasterToDetail('Preexistencia',
                this.master.getContext(), null, 'Usuario.Solicitud', null, 'Solicitud', ''));
        }
        super.initializeComponents();
    }

}
