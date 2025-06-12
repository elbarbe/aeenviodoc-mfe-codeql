import { AbstractServices } from '../common/abstractServices';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from '../common/app.utils';
import { QueryResponse } from '../common/answerRequestInformation';

/**
 * Service and queries of class 'Persona'
 */
export class PersonaServices extends AbstractServices {


    constructor(
        protected override readonly appGlobalInfo: AppGlobalInfo,
        protected override readonly util: Util) {
        super(appGlobalInfo, util, 'Persona');
    }

    /**
     * Call to the filter 'F_PersonaVarios' in the backend
     * @param displaySetItems Attributes
     * @param orderCriteria Oreder criteria name
     * @param instancesPerPage Elements per page
     * @param pageNumber Page number
     * @param vuTipoPersonaVar Variable v_TipoPersona
     * @param vouTipoIdentificacionVar Variable vo_TipoIdentificacion
     * @param vuRazonSocialVar Variable v_RazonSocial
     * @param vuPrimerNombreVar Variable v_PrimerNombre
     * @param vuPrimerApellidoVar Variable v_PrimerApellido
     * @param vuSegundoApellidoVar Variable v_SegundoApellido
     */
    public queryByFilterFuPersonaVarios(
        displaySetItems: string, orderCriteria: string, instancesPerPage: number, pageNumber: number,
        vuTipoPersonaVar: string | null, vouTipoIdentificacionVar: any, vuRazonSocialVar: string | null,
        vuPrimerNombreVar: string | null, vuPrimerApellidoVar: string | null,
        vuSegundoApellidoVar: string | null): Promise<QueryResponse> {
        const filter = this.util.getFilter('F_PersonaVarios');
        this.util.addFilterVariable(filter, 'v_tipopersona', vuTipoPersonaVar);
        this.util.addFilterVariable(filter, 'vo_tipoidentificacion', vouTipoIdentificacionVar);
        this.util.addFilterVariable(filter, 'v_razonsocial', vuRazonSocialVar);
        this.util.addFilterVariable(filter, 'v_primernombre', vuPrimerNombreVar);
        this.util.addFilterVariable(filter, 'v_primerapellido', vuPrimerApellidoVar);
        this.util.addFilterVariable(filter, 'v_segundoapellido', vuSegundoApellidoVar);
        return this.queryByFilter(displaySetItems, orderCriteria, instancesPerPage, pageNumber, filter);
    }

    /**
     * @param oidSolicitudesContratante Oid of related 'Solicitud' instance using the role 'SolicitudesContratante'
     * @param displaySetItems Attributes
     * @param orderCriteria Order criteria name
     * @param instancesPerPage Elements per page
     * @param pageNumber Page number
     */
    public queryByRelatedSolicitudesContratante(
        oidSolicitudesContratante: any, displaySetItems: string, orderCriteria: string,
        instancesPerPage: number, pageNumber: number): Promise<QueryResponse> {
        return this.queryByRelated(displaySetItems, orderCriteria, instancesPerPage, pageNumber,
            oidSolicitudesContratante, 'SolicitudesContratante');
    }

    /**
     * @param oidSolicitudesTitular Oid of related 'Solicitud' instance using the role 'SolicitudesTitular'
     * @param displaySetItems Attributes
     * @param orderCriteria Order criteria name
     * @param instancesPerPage Elements per page
     * @param pageNumber Page number
     */
    public queryByRelatedSolicitudesTitular(
        oidSolicitudesTitular: any, displaySetItems: string, orderCriteria: string,
        instancesPerPage: number, pageNumber: number): Promise<QueryResponse> {
        return this.queryByRelated(displaySetItems, orderCriteria, instancesPerPage, pageNumber,
            oidSolicitudesTitular, 'SolicitudesTitular');
    }
}
