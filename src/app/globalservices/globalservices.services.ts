import { AbstractServices } from '../common/abstractServices';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from '../common/app.utils';
import { ErrorInformation } from '../common/answerRequestInformation';

/**
 * « Global services »
 */
export class GlobalServicesServices extends AbstractServices {

    private oGETREPORTESrvName = 'OGETREPORTE';

    constructor(
        protected override readonly appGlobalInfo: AppGlobalInfo,
        protected override readonly util: Util) {
        super(appGlobalInfo, util, 'GlobalServices');
    }

    /**
     * Call to the service 'OGETREPORTE' in the backend
     * Promise is resolved if service execution is successful and returns its outbound arguments in a JSON object.
     * If service fails, promise is rejected and returned an instance of ErrorInformation
     * @param ptSolicitudInArg Mandatory argument 'ptSolicitud'. Oid of 'Solicitud' class
     * @param ptTipoInArg Mandatory argument 'ptTipo'
     */
    public oGETREPORTE(
        ptSolicitudInArg: any, ptTipoInArg: number):
        Promise<ErrorInformation | {
            oaarchivo: string,
            oaplantilla: any,
            oanombrearchivo: string
        }> {
        const request: {
            ptsolicitud_oid: any, pttipo: number
        } = {
            ptsolicitud_oid: ptSolicitudInArg, pttipo: ptTipoInArg
        };
        return new Promise<ErrorInformation | {
            oaarchivo: string,
            oaplantilla: any,
            oanombrearchivo: string
        }> ((resolve, reject) => {
            this.callService(this.oGETREPORTESrvName, request).then((response: any) => {
                resolve({
                    oaarchivo: response.oaarchivo,
                    oaplantilla: response.oaplantilla,
                    oanombrearchivo: response.oanombrearchivo
                });
            }).catch( (errorInfo: ErrorInformation) => {
                reject(errorInfo);
            });
        });
    }
}
