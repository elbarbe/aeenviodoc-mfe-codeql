import { ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../../app.appglobalinfo';
import { Util } from '../../common/app.utils';
import { Field } from '../../common/baseIUElements';
import { AbstractFilter } from '../../common/abstractFilter';
import { StandardFunctions } from '../../common/standardFunctions';
import { LanguageMng } from '../../common/languageMng';
import { UserFunctions } from '../../common/userFunctions';
import { AbstractPIU } from 'src/app/common/abstractPIU';

/**
 * Manages the filter F_SolicitudSolicitud of class Solicitud
 */
export class SolicitudFilterFuSolicitudSolicitud extends AbstractFilter {

    /** Filter variables */
    public vuNumSolicitud: Field;
    public vuFIni: Field;
    public vuFFin: Field;

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
        this.title = this.langMng.translateText('cls_Solicitud_filter_F_SolicitudSolicitud',
            'Búsqueda por solicitud');
        this.filterName = 'F_SolicitudSolicitud';

        this.vuNumSolicitud = new Field(this.langMng);
        this.vuFIni = new Field(this.langMng);
        this.vuFFin = new Field(this.langMng);
    }

    /**
     * Initialize the filter
     */
    public override initializeComponents(): void {

        this.vuNumSolicitud.nameInRequest = 'v_numsolicitud';
        this.vuNumSolicitud.alias = this.langMng.translateText(
            'cls_Solicitud_filter_F_SolicitudSolicitud_fvar_v_NumSolicitud',
            'Nº Solicitud');
        this.vuNumSolicitud.visible = true;
        this.vuNumSolicitud.enabled = true;
        this.vuNumSolicitud.mandatory = false;
        this.vuNumSolicitud.dataType = Field.dtString;
        this.vuNumSolicitud.maxLength = 50;
        this.vuNumSolicitud.assignCSS(this.populationContainer !== undefined);
        this.variables.push(this.vuNumSolicitud);

        this.vuFIni.nameInRequest = 'v_fini';
        this.vuFIni.alias = this.langMng.translateText(
            'cls_Solicitud_filter_F_SolicitudSolicitud_fvar_v_FIni',
            'Desde');
        this.vuFIni.visible = true;
        this.vuFIni.enabled = true;
        this.vuFIni.mandatory = false;
        this.vuFIni.dataType = Field.dtDate;
        this.vuFIni.assignCSS(this.populationContainer !== undefined);
        this.variables.push(this.vuFIni);

        this.vuFFin.nameInRequest = 'v_ffin';
        this.vuFFin.alias = this.langMng.translateText(
            'cls_Solicitud_filter_F_SolicitudSolicitud_fvar_v_FFin',
            'Hasta');
        this.vuFFin.visible = true;
        this.vuFFin.enabled = true;
        this.vuFFin.mandatory = false;
        this.vuFFin.dataType = Field.dtDate;
        this.vuFFin.assignCSS(this.populationContainer !== undefined);
        this.variables.push(this.vuFFin);
    }

    /**
     * Initialize with default values
     */
    public override initializeDefaultValues(): void {
        const promiseArr: Array<Promise<void>> = [];

        // v_FIni
        const defValv_FIni = new Promise<void>((resolveDefValue) => {
            let rtnFuncvuFIni0;
            this.usrFunc.fuGetFechaDesdeVarFiltro().then((res) => {
                rtnFuncvuFIni0 = res;

                this.vuFIni.setValue(this.util.getDate(rtnFuncvuFIni0));
                resolveDefValue();
            });
        });
        promiseArr.push(defValv_FIni);

        // v_FFin
        const defValv_FFin = new Promise<void>((resolveDefValue) => {
            this.vuFFin.setValue(this.stdFun.systemDate());
            resolveDefValue();
        });
        promiseArr.push(defValv_FFin);

        Promise.all(promiseArr).then((results: any[]) => {
            this.initialized = true;
            // Launch query
            if (this.populationContainer instanceof AbstractPIU) {
                const abstractPIU = this.populationContainer as AbstractPIU;
                if (abstractPIU.autoSearch && abstractPIU.activeFilter?.filterName === this.filterName) {
                    this.search();
                }
            } else {
                this.search();
            }
            this.changeDetectorRef.markForCheck();
        });
    }
}
