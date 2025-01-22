import { Injectable } from '@angular/core';
import { Util } from './app.utils';

import { AppGlobalInfo } from '../app.appglobalinfo';

@Injectable({providedIn: 'root'})
export class UserFunctions {

    constructor(private util: Util, private appGlobalInfo: AppGlobalInfo) { }

    /**
     * Obtiene el texto para mostrar en la primera firma de una solicitud
     * @param pfFirma Indica si es el texto para la primera (1) o la segunda (2) firma
     */
    public fu_GetTextoAvisoFirma(pfFirma: number): Promise<string> {
        const params = {pffirma: pfFirma};
        return new Promise((resolve, reject) => {
            // Call to the back end implementation
            this.util.callUserFunctionInBackEnd('fu_GetTextoAvisoFirma', params, true).then((result: any) => {
                resolve(result);
            }).catch ((error: any) => {
                reject(error);
            });
        });
    }

    /**
     * No comments
     */
    public fuGetFechaDesdeVarFiltro(): Promise<Date> {

        // Devolvemos el valor de la ficha de inicio por defecto para consultas de solicitudes.
        // El valor es la fecha actual menos los días indicados en el parmámetros de configuración que indica el perioso a utilizar
        //  El parámetros es uno de lso datos que se cargan an la cache del usuario
        let newDate = new Date();
        // Si lo tenemos ...
        if (this.appGlobalInfo.getLoggedUserInfo().userCache?.periodoConsultaSolicitudes) {
            newDate.setDate(newDate.getDate() - this.appGlobalInfo.getLoggedUserInfo().userCache?.periodoConsultaSolicitudes);
        } else {
            // Si no tenemos el valor del parametros guardado, utilizamos por defecto 30 dias
            newDate.setDate(newDate.getDate() - 30);
        }

        return  Promise.resolve( newDate);
    }

}
