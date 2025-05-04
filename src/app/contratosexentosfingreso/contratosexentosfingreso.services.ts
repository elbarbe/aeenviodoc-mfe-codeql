import { AbstractServices } from '../common/abstractServices';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from '../common/app.utils';

/**
 * Service and queries of class 'ContratosExentosFIngreso'
 */
export class ContratosExentosFIngresoServices extends AbstractServices {


    constructor(
        protected override readonly appGlobalInfo: AppGlobalInfo,
        protected override readonly util: Util) {
        super(appGlobalInfo, util, 'ContratosExentosFIngreso');
    }
}
