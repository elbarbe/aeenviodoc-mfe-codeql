import { ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../../app.appglobalinfo';
import { Util } from '../../common/app.utils';
import { ModelConstants } from '../../common/model.constants';
import { Field, FieldOVLenseSearch } from '../../common/baseIUElements';
import { AbstractFilter } from '../../common/abstractFilter';
import { ExchangeInfo } from '../../common/app.exchangeinfo';
import { StandardFunctions } from '../../common/standardFunctions';
import { LanguageMng } from '../../common/languageMng';
import { UserFunctions } from '../../common/userFunctions';
import { AbstractPIU } from '../../common/abstractPIU';

/**
 * Manages the filter F_SolicitudContratanteTitular of class Solicitud
 */
export class SolicitudFilterFuSolicitudContratanteTitular extends AbstractFilter {

    /** Filter variables */
    public vouPersona: FieldOVLenseSearch;
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
        this.title = this.langMng.translateText('cls_Solicitud_filter_F_SolicitudContratanteTitular',
            'Búsqueda por contratante/titular');
        this.filterName = 'F_SolicitudContratanteTitular';

        this.vouPersona = new FieldOVLenseSearch(this.langMng);
        this.vuFIni = new Field(this.langMng);
        this.vuFFin = new Field(this.langMng);
    }

    /**
     * Initialize the filter
     */
    public override initializeComponents(): void {

        this.vouPersona.nameInRequest = 'vo_persona';
        this.vouPersona.alias = this.langMng.translateText(
            'cls_Solicitud_filter_F_SolicitudContratanteTitular_fvar_vo_Persona',
            'Persona');
        this.vouPersona.visible = true;
        this.vouPersona.enabled = true;
        this.vouPersona.mandatory = false;
        this.vouPersona.dataType = ModelConstants.Persona.name;
        this.vouPersona.text = '';
        this.vouPersona.searchResults = [];
        this.vouPersona.allowMultiSelect = false;
        this.vouPersona.maxLength = 80;
        this.vouPersona.assignCSS(this.populationContainer !== undefined);
        this.variables.push(this.vouPersona);

        this.vuFIni.nameInRequest = 'v_fini';
        this.vuFIni.alias = this.langMng.translateText(
            'cls_Solicitud_filter_F_SolicitudContratanteTitular_fvar_v_FIni',
            'Desde');
        this.vuFIni.visible = true;
        this.vuFIni.enabled = true;
        this.vuFIni.mandatory = false;
        this.vuFIni.dataType = Field.dtDate;
        this.vuFIni.assignCSS(this.populationContainer !== undefined);
        this.variables.push(this.vuFIni);

        this.vuFFin.nameInRequest = 'v_ffin';
        this.vuFFin.alias = this.langMng.translateText(
            'cls_Solicitud_filter_F_SolicitudContratanteTitular_fvar_v_FFin',
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

   /**
    * Process the selection backward navigation
    */
    public override processSelectionBackward(exchInfo: ExchangeInfo): void {
        if (exchInfo.originArgumentName === 'vouPersona' && exchInfo.selectedOids && exchInfo.selectedOids.length > 0) {
            this.vouPersona.setValue(exchInfo.selectedOids);
            this.executeDependecyRulesvoupersona('SetValue', true);
        }

    }

   /**
    * Process the click in the lense of any object-valued argument
    * @param argumentName Name of the argument
    */
    public doSearchAction(argumentName: string): void {
        const exchInfo = this.getSelectionForwardExchInfo();
        exchInfo.originArgumentName = argumentName;
        if ('vouPersona'.toLowerCase() === argumentName.toLowerCase()) {
            this.vouPersona.completeSelectionForwardExchInfo(exchInfo);
            exchInfo.targetIUName = 'PIU_Persona';
            this.util.navigateSelectionForward(exchInfo);
        }
    }

    /**
     * Process the change in the search text in the vo_Persona variable
     */
    public onvoupersonaChange() {
        this.executeLenseSearch(this.vouPersona, ModelConstants.Persona.name, 'IC_Persona', []);
        this.executeDependecyRulesvoupersona('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the selection in the vo_Persona variable
     */
    public processvoupersonaSelected(index: number): void {
        this.vouPersona.processIndexSelected(index);
        this.executeDependecyRulesvoupersona('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Clean the value of the p_thisCliente lense search argument
     */
    public cleanvoupersona(): void {
        this.clearValidationMessages();
        this.vouPersona.clean();
        this.executeDependecyRulesvoupersona('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Set the supplementary information to the vo_Persona argument
     */
    private setSuppInfovoupersona(): void {
        this.setSuplementaryInformationToField(this.vouPersona, ModelConstants.Persona.name, 'TipoIdentificacion.NombreCorto,NumIdentificacion');
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Evaluate dependendy rules for vo_Persona variable
     * @param event Rule event
     * @param internal Internal or External
     */
    private executeDependecyRulesvoupersona(event: string, internal: boolean): void {
        // Suplementary information
        if ('SetValue' === event) {
            this.setSuppInfovoupersona();
        }
        this.executePendingDependencyRules();
    }
}
