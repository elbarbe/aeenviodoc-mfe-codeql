import { AbstractServices } from '../common/abstractServices';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from '../common/app.utils';
import { ErrorInformation, QueryResponse } from '../common/answerRequestInformation';
import { JsonUtility } from '../common/jsonUtility';

/**
 * « Service and queries of class 'Solicitud' »
 */
export class SolicitudServices extends AbstractServices {

    private dummyuPreexistenciasSrvName = 'dummy_Preexistencias';
    private dummyuDiferenciasLiqSrvName = 'dummy_DiferenciasLiq';
    private tCREARSEGUNDAFIRMASrvName = 'TCREARSEGUNDAFIRMA';
    private tENVIARDOCSrvName = 'TENVIARDOC';

    constructor(
        protected override readonly appGlobalInfo: AppGlobalInfo,
        protected override readonly util: Util) {
        super(appGlobalInfo, util, 'Solicitud');
    }

    /**
     * Call to the filter 'F_SolicitudSolicitud' in the backend
     * @param displaySetItems Attributes
     * @param orderCriteria Oreder criteria name
     * @param instancesPerPage Elements per page
     * @param pageNumber Page number
     * @param vuNumSolicitudVar Variable v_NumSolicitud
     * @param vuFIniVar Variable v_FIni
     * @param vuFFinVar Variable v_FFin
     */
    public queryByFilterFuSolicitudSolicitud(
        displaySetItems: string, orderCriteria: string, instancesPerPage: number, pageNumber: number,
        vuNumSolicitudVar: string | null, vuFIniVar: Date | null, vuFFinVar: Date | null): Promise<QueryResponse> {
        const filter = this.util.getFilter('F_SolicitudSolicitud');
        this.util.addFilterVariable(filter, 'v_numsolicitud', vuNumSolicitudVar);
        this.util.addFilterVariable(filter, 'v_fini', JsonUtility.date2Json(vuFIniVar));
        this.util.addFilterVariable(filter, 'v_ffin', JsonUtility.date2Json(vuFFinVar));
        return this.queryByFilter(displaySetItems, orderCriteria, instancesPerPage, pageNumber, filter);
    }

    /**
     * Call to the filter 'F_SolicitudContratanteTitular' in the backend
     * @param displaySetItems Attributes
     * @param orderCriteria Oreder criteria name
     * @param instancesPerPage Elements per page
     * @param pageNumber Page number
     * @param vouPersonaVar Variable vo_Persona
     * @param vuFIniVar Variable v_FIni
     * @param vuFFinVar Variable v_FFin
     */
    public queryByFilterFuSolicitudContratanteTitular(
        displaySetItems: string, orderCriteria: string, instancesPerPage: number, pageNumber: number,
        vouPersonaVar: any, vuFIniVar: Date | null, vuFFinVar: Date | null): Promise<QueryResponse> {
        const filter = this.util.getFilter('F_SolicitudContratanteTitular');
        this.util.addFilterVariable(filter, 'vo_persona', vouPersonaVar);
        this.util.addFilterVariable(filter, 'v_fini', JsonUtility.date2Json(vuFIniVar));
        this.util.addFilterVariable(filter, 'v_ffin', JsonUtility.date2Json(vuFFinVar));
        return this.queryByFilter(displaySetItems, orderCriteria, instancesPerPage, pageNumber, filter);
    }

    /**
     * @param oidContratantePersona Oid of related 'Persona' instance using the role 'ContratantePersona'
     * @param displaySetItems Attributes
     * @param orderCriteria Order criteria name
     * @param instancesPerPage Elements per page
     * @param pageNumber Page number
     */
    public queryByRelatedContratantePersona(
        oidContratantePersona: any, displaySetItems: string, orderCriteria: string,
        instancesPerPage: number, pageNumber: number): Promise<QueryResponse> {
        return this.queryByRelated(displaySetItems, orderCriteria, instancesPerPage, pageNumber,
            oidContratantePersona, 'ContratantePersona');
    }

    /**
     * @param oidTitularPersona Oid of related 'Persona' instance using the role 'TitularPersona'
     * @param displaySetItems Attributes
     * @param orderCriteria Order criteria name
     * @param instancesPerPage Elements per page
     * @param pageNumber Page number
     */
    public queryByRelatedTitularPersona(
        oidTitularPersona: any, displaySetItems: string, orderCriteria: string,
        instancesPerPage: number, pageNumber: number): Promise<QueryResponse> {
        return this.queryByRelated(displaySetItems, orderCriteria, instancesPerPage, pageNumber,
            oidTitularPersona, 'TitularPersona');
    }

    /**
     * Call to the service 'dummy_Preexistencias' in the backend
     * Promise is resolved if service execution is successful and returns void.
     * If service fails, promise is rejected and returned an instance of ErrorInformation
     * @param puthisSolicitudInArg Mandatory argument 'p_thisSolicitud'. Oid of 'Solicitud' class
     */
    public dummyuPreexistencias(
        puthisSolicitudInArg: any): Promise<void> {
        const request: {
            p_thissolicitud_oid: any
        } = {
            p_thissolicitud_oid: puthisSolicitudInArg
        };
        return new Promise<void> ((resolve, reject) => {
             this.callService(this.dummyuPreexistenciasSrvName, request).then((response: any) => {
                resolve();
            }).catch( (errorInfo: ErrorInformation) => {
                reject(errorInfo);
            });
        });
    }

    /**
     * Call to the service 'dummy_DiferenciasLiq' in the backend
     * Promise is resolved if service execution is successful and returns void.
     * If service fails, promise is rejected and returned an instance of ErrorInformation
     * @param puthisSolicitudInArg Mandatory argument 'p_thisSolicitud'. Oid of 'Solicitud' class
     */
    public dummyuDiferenciasLiq(
        puthisSolicitudInArg: any): Promise<void> {
        const request: {
            p_thissolicitud_oid: any
        } = {
            p_thissolicitud_oid: puthisSolicitudInArg
        };
        return new Promise<void> ((resolve, reject) => {
             this.callService(this.dummyuDiferenciasLiqSrvName, request).then((response: any) => {
                resolve();
            }).catch( (errorInfo: ErrorInformation) => {
                reject(errorInfo);
            });
        });
    }

    /**
     * Call to the service 'TCREARSEGUNDAFIRMA' in the backend
     * Promise is resolved if service execution is successful and returns void.
     * If service fails, promise is rejected and returned an instance of ErrorInformation
     * @param puthisSolicitudInArg Mandatory argument 'p_thisSolicitud'. Oid of 'Solicitud' class
     * @param ptupuatrImagenFirmaInArg Optional argument 'pt_p_atrImagenFirma'
     * @param ptupuatrLatitudInArg Optional argument 'pt_p_atrLatitud'
     * @param ptupuatrLongitudInArg Optional argument 'pt_p_atrLongitud'
     * @param ptuTextoInArg Optional argument 'pt_Texto'
     */
    public tCREARSEGUNDAFIRMA(
        puthisSolicitudInArg: any, ptupuatrImagenFirmaInArg: string | null, ptupuatrLatitudInArg: string | null,
        ptupuatrLongitudInArg: string | null, ptuTextoInArg: string | null): Promise<void> {
        const request: {
            p_thissolicitud_oid: any, pt_p_atrimagenfirma: string | null, pt_p_atrlatitud: string | null,
            pt_p_atrlongitud: string | null, pt_texto: string | null
        } = {
            p_thissolicitud_oid: puthisSolicitudInArg, pt_p_atrimagenfirma: ptupuatrImagenFirmaInArg,
            pt_p_atrlatitud: ptupuatrLatitudInArg, pt_p_atrlongitud: ptupuatrLongitudInArg, pt_texto: ptuTextoInArg
        };
        return new Promise<void> ((resolve, reject) => {
             this.callService(this.tCREARSEGUNDAFIRMASrvName, request).then((response: any) => {
                resolve();
            }).catch( (errorInfo: ErrorInformation) => {
                reject(errorInfo);
            });
        });
    }

    /**
     * Call to the service 'TENVIARDOC' in the backend
     * Promise is resolved if service execution is successful and returns its outbound arguments in a JSON object.
     * If service fails, promise is rejected and returned an instance of ErrorInformation
     * @param puthisSolicitudInArg Mandatory argument 'p_thisSolicitud'. Oid of 'Solicitud' class
     * @param puPrevisualizarInArg Mandatory argument 'p_Previsualizar'
     * @param puEnviarInArg Mandatory argument 'p_Enviar'
     * @param puContratoInArg Mandatory argument 'p_Contrato'
     * @param puCarnetsInArg Mandatory argument 'p_Carnets'
     * @param puCartaPreInArg Mandatory argument 'p_CartaPre'
     * @param puSolicitudInArg Mandatory argument 'p_Solicitud'
     * @param puCondicionesBBInArg Mandatory argument 'p_CondicionesBB'
     * @param puAnexosInclInArg Mandatory argument 'p_AnexosIncl'
     * @param puDocMaternidadInArg Mandatory argument 'p_DocMaternidad'
     * @param puCuesMedicoInArg Mandatory argument 'p_CuesMedico'
     * @param puCartaEntrevistaInArg Mandatory argument 'p_CartaEntrevista'
     * @param puProteccionDatosInArg Mandatory argument 'p_ProteccionDatos'
     * @param puDiferenciasLiqInArg Mandatory argument 'p_DiferenciasLiq'
     * @param puMarcarTodosInArg Mandatory argument 'p_MarcarTodos'
     * @param puDocNeonatalInArg Mandatory argument 'p_DocNeonatal'
     */
    public tENVIARDOC(
        puthisSolicitudInArg: any, puPrevisualizarInArg: boolean, puEnviarInArg: boolean, puContratoInArg: boolean,
        puCarnetsInArg: boolean, puCartaPreInArg: boolean, puSolicitudInArg: boolean, puCondicionesBBInArg: boolean,
        puAnexosInclInArg: boolean, puDocMaternidadInArg: boolean, puCuesMedicoInArg: boolean, puCartaEntrevistaInArg: boolean,
        puProteccionDatosInArg: boolean, puDiferenciasLiqInArg: boolean, puMarcarTodosInArg: boolean, puDocNeonatalInArg: boolean):
        Promise<{
            oaplantilla: any
        }> {
        const request: {
            p_thissolicitud_oid: any, p_previsualizar: boolean, p_enviar: boolean, p_contrato: boolean, p_carnets: boolean,
            p_cartapre: boolean, p_solicitud: boolean, p_condicionesbb: boolean, p_anexosincl: boolean, p_docmaternidad: boolean,
            p_cuesmedico: boolean, p_cartaentrevista: boolean, p_protecciondatos: boolean, p_diferenciasliq: boolean,
            p_marcartodos: boolean, p_docneonatal: boolean
        } = {
            p_thissolicitud_oid: puthisSolicitudInArg, p_previsualizar: puPrevisualizarInArg, p_enviar: puEnviarInArg,
            p_contrato: puContratoInArg, p_carnets: puCarnetsInArg, p_cartapre: puCartaPreInArg, p_solicitud: puSolicitudInArg,
            p_condicionesbb: puCondicionesBBInArg, p_anexosincl: puAnexosInclInArg, p_docmaternidad: puDocMaternidadInArg,
            p_cuesmedico: puCuesMedicoInArg, p_cartaentrevista: puCartaEntrevistaInArg, p_protecciondatos: puProteccionDatosInArg,
            p_diferenciasliq: puDiferenciasLiqInArg, p_marcartodos: puMarcarTodosInArg, p_docneonatal: puDocNeonatalInArg
        };
        return new Promise<{
            oaplantilla: any
        }> ((resolve, reject) => {
            this.callService(this.tENVIARDOCSrvName, request).then((response: any) => {
                resolve({
                    oaplantilla: response.oaplantilla
                });
            }).catch( (errorInfo: ErrorInformation) => {
                reject(errorInfo);
            });
        });
    }
}
