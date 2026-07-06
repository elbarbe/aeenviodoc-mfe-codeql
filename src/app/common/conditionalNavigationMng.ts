import { Injectable } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { CacheDependencyRules, InstanceCache } from './app.cachedependencyrules';
import { ExchangeInfo } from './app.exchangeinfo';
import { ModelConstants } from './model.constants';
import { Util } from './app.utils';
import { UserFunctions } from './userFunctions';
import { StandardFunctions } from './standardFunctions';

/**
 * « Conditional navigation manager »
 * Handles all conditional navigation defined in the model
 */
@Injectable({providedIn: 'root'})
export class ConditionalNavigationMng {

    /** Cache for queries */
    private queriesCache: CacheDependencyRules;

    constructor(private readonly appGlobalInfo: AppGlobalInfo, private readonly util: Util, private readonly stdFun: StandardFunctions,
                private readonly usrFunc: UserFunctions) {
        this.queriesCache = new CacheDependencyRules(this.appGlobalInfo, this.util);
     }

    /**
     * Process the conditional navigation
     * @param className Class name
     * @param serviceName Executed service
     * @param request Service request
     * @param response Service response
     * @param previousContext Previous context
     * @param comeBackContext Comeback context
     */
    public processConditionalNavigation(className: string, serviceName: string, request: any, response: any, previousContext: any,
                                        comeBackContext: any): boolean {

        this.appGlobalInfo.appExchangeInfo.clearConditionalNavigation();

        switch (className.toLowerCase()) {
            case 'Solicitud'.toLowerCase():
                return this.processCondNavsolicitud(serviceName, request, response, previousContext, comeBackContext);
        }
        return false;
    }

    /**
     * Process the conditional navigation defined in class Solicitud
     * @param serviceName Executed service
     * @param request Service request
     * @param response Service response
     * @param previousContext Previous context
     * @param comeBackContext Comeback context
     */
    private processCondNavsolicitud(
        serviceName: string, request: any, response: any, previousContext: any, comeBackContext: any): boolean {
        if (serviceName === 'dummy_Preexistencias') {
            return this.condNavSolicituddummyuPreexistencias(request,
                response, previousContext, comeBackContext);
        }
        if (serviceName === 'dummy_DiferenciasLiq') {
            return this.condNavSolicituddummyuDiferenciasLiq(request,
                response, previousContext, comeBackContext);
        }
        return false;
    }


    /**
     * Manages the conditional navigation of service dummy_Preexistencias of class Solicitud
     * @param request Service request
     * @param response Service response
     * @param previousContext Previous context
     * @param comeBackContext Comeback context
     */
    private condNavSolicituddummyuPreexistencias(request: any, response: any, previousContext: any, comeBackContext: any): boolean {

        let exchInfo: ExchangeInfo;
        if (this.appGlobalInfo.getLoggedUserInfo().isAgentOneOf(['Admin', 'SuperAdmin', 'Asesor', 'AreaMedica', 'Afiliaciones',
            'Gestor', 'MesaDeApoyo'])) {
            exchInfo = this.util.createExchangeInfoFromCondNavigation(ModelConstants.Solicitud.name,
                ModelConstants.Solicitud.mdiuusolicitudpreexistencias, previousContext, comeBackContext);
            exchInfo.selectedOidsClassName = ModelConstants.Solicitud.name;
            exchInfo.selectedOids = [
                request.p_thissolicitud_oid];
            this.util.navigateTo(exchInfo);
        }
        return true;
    }


    /**
     * Manages the conditional navigation of service dummy_DiferenciasLiq of class Solicitud
     * @param request Service request
     * @param response Service response
     * @param previousContext Previous context
     * @param comeBackContext Comeback context
     */
    private condNavSolicituddummyuDiferenciasLiq(request: any, response: any, previousContext: any, comeBackContext: any): boolean {

        let exchInfo: ExchangeInfo;
        if (this.appGlobalInfo.getLoggedUserInfo().isAgentOneOf(['Funcionario', 'Admin', 'SuperAdmin', 'Asesor', 'AreaMedica',
            'Afiliaciones', 'Gestor', 'MesaDeApoyo'])) {
            exchInfo = this.util.createExchangeInfoFromCondNavigation(ModelConstants.Solicitud.name,
                ModelConstants.Solicitud.iiuudiferenciasliquidacion, previousContext, comeBackContext);
            exchInfo.selectedOidsClassName = ModelConstants.Solicitud.name;
            exchInfo.selectedOids = [
                request.p_thissolicitud_oid];
            this.util.navigateTo(exchInfo);
        }
        return true;
    }
}
