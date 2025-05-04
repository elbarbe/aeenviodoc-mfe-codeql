import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class OidBuilder {

    /**
     * Builds an Oid of class Funcionario
     * @param funcionariouId Identificacion field 1
     */
    public buildOidFuncionario(funcionariouId: number): {
        id: number} {
        return {id: funcionariouId};
    }
    /**
     * Builds an Oid of class Admin
     * @param adminuId Identificacion field 1
     */
    public buildOidAdmin(adminuId: number): {
        id: number} {
        return {id: adminuId};
    }
    /**
     * Builds an Oid of class SuperAdmin
     * @param superAdminuId Identificacion field 1
     */
    public buildOidSuperAdmin(superAdminuId: number): {
        id: number} {
        return {id: superAdminuId};
    }
    /**
     * Builds an Oid of class Asesor
     * @param asesoruId Identificacion field 1
     */
    public buildOidAsesor(asesoruId: number): {
        id: number} {
        return {id: asesoruId};
    }
    /**
     * Builds an Oid of class AreaMedica
     * @param areaMedicauId Identificacion field 1
     */
    public buildOidAreaMedica(areaMedicauId: number): {
        id: number} {
        return {id: areaMedicauId};
    }
    /**
     * Builds an Oid of class Afiliaciones
     * @param afiliacionesuId Identificacion field 1
     */
    public buildOidAfiliaciones(afiliacionesuId: number): {
        id: number} {
        return {id: afiliacionesuId};
    }
    /**
     * Builds an Oid of class RespRegional
     * @param respRegionaluId Identificacion field 1
     */
    public buildOidRespRegional(respRegionaluId: number): {
        id: number} {
        return {id: respRegionaluId};
    }
    /**
     * Builds an Oid of class Gestor
     * @param gestoruId Identificacion field 1
     */
    public buildOidGestor(gestoruId: number): {
        id: number} {
        return {id: gestoruId};
    }
    /**
     * Builds an Oid of class MesaDeApoyo
     * @param mesaDeApoyouId Identificacion field 1
     */
    public buildOidMesaDeApoyo(mesaDeApoyouId: number): {
        id: number} {
        return {id: mesaDeApoyouId};
    }
    /**
     * Builds an Oid of class ParamConfig
     * @param paramConfiguCodigo Identificacion field 1
     */
    public buildOidParamConfig(paramConfiguCodigo: string): {
        codigo: string} {
        return {codigo: paramConfiguCodigo};
    }
    /**
     * Builds an Oid of class LogParam
     * @param logParamuCodigo Identificacion field 1
     */
    public buildOidLogParam(logParamuCodigo: number): {
        codigo: number} {
        return {codigo: logParamuCodigo};
    }
    /**
     * Builds an Oid of class FrecuenciaAct
     * @param frecuenciaActuCodigo Identificacion field 1
     */
    public buildOidFrecuenciaAct(frecuenciaActuCodigo: number): {
        codigo: number} {
        return {codigo: frecuenciaActuCodigo};
    }
    /**
     * Builds an Oid of class CuestionarioMed
     * @param cuestionarioMeduNumero Identificacion field 1
     */
    public buildOidCuestionarioMed(cuestionarioMeduNumero: number): {
        numero: number} {
        return {numero: cuestionarioMeduNumero};
    }
    /**
     * Builds an Oid of class Seccion
     * @param seccionuIdentificador Identificacion field 1
     */
    public buildOidSeccion(seccionuIdentificador: number): {
        identificador: number} {
        return {identificador: seccionuIdentificador};
    }
    /**
     * Builds an Oid of class Pregunta
     * @param preguntauNumero Identificacion field 1
     */
    public buildOidPregunta(preguntauNumero: number): {
        numero: number} {
        return {numero: preguntauNumero};
    }
    /**
     * Builds an Oid of class Valor
     * @param valoruIdentificador Identificacion field 1
     */
    public buildOidValor(valoruIdentificador: number): {
        identificador: number} {
        return {identificador: valoruIdentificador};
    }
    /**
     * Builds an Oid of class Productos
     * @param productosuProducto Identificacion field 1
     */
    public buildOidProductos(productosuProducto: number): {
        producto: number} {
        return {producto: productosuProducto};
    }
    /**
     * Builds an Oid of class Planes
     * @param planesuPlan Identificacion field 1
     */
    public buildOidPlanes(planesuPlan: number): {
        plan: number} {
        return {plan: planesuPlan};
    }
    /**
     * Builds an Oid of class Parentesco
     * @param parentescouCodigo Identificacion field 1
     */
    public buildOidParentesco(parentescouCodigo: number): {
        codigo: number} {
        return {codigo: parentescouCodigo};
    }
    /**
     * Builds an Oid of class Periodicidad
     * @param periodicidaduCodigo Identificacion field 1
     */
    public buildOidPeriodicidad(periodicidaduCodigo: number): {
        codigo: number} {
        return {codigo: periodicidaduCodigo};
    }
    /**
     * Builds an Oid of class Rol
     * @param roluIdentificador Identificacion field 1
     */
    public buildOidRol(roluIdentificador: number): {
        identificador: number} {
        return {identificador: roluIdentificador};
    }
    /**
     * Builds an Oid of class Dominio
     * @param dominiouNumero Identificacion field 1
     */
    public buildOidDominio(dominiouNumero: number): {
        numero: number} {
        return {numero: dominiouNumero};
    }
    /**
     * Builds an Oid of class PlantillaEmail
     * @param plantillaEmailuIdPlantilla Identificacion field 1
     */
    public buildOidPlantillaEmail(plantillaEmailuIdPlantilla: number): {
        idplantilla: number} {
        return {idplantilla: plantillaEmailuIdPlantilla};
    }
    /**
     * Builds an Oid of class EstadoContrato
     * @param estadoContratouCodigo Identificacion field 1
     */
    public buildOidEstadoContrato(estadoContratouCodigo: number): {
        codigo: number} {
        return {codigo: estadoContratouCodigo};
    }
    /**
     * Builds an Oid of class EstadoBeneficiario
     * @param estadoBeneficiariouCodigo Identificacion field 1
     */
    public buildOidEstadoBeneficiario(estadoBeneficiariouCodigo: number): {
        codigo: number} {
        return {codigo: estadoBeneficiariouCodigo};
    }
    /**
     * Builds an Oid of class EstadoBeneficiarioAE
     * @param estadoBeneficiarioAEuCodigo Identificacion field 1
     */
    public buildOidEstadoBeneficiarioAE(estadoBeneficiarioAEuCodigo: number): {
        codigo: number} {
        return {codigo: estadoBeneficiarioAEuCodigo};
    }
    /**
     * Builds an Oid of class Tarifa
     * @param tarifauId Identificacion field 1
     */
    public buildOidTarifa(tarifauId: number): {
        id: number} {
        return {id: tarifauId};
    }
    /**
     * Builds an Oid of class Regional
     * @param regionaluCodigo Identificacion field 1
     */
    public buildOidRegional(regionaluCodigo: number): {
        codigo: number} {
        return {codigo: regionaluCodigo};
    }
    /**
     * Builds an Oid of class Sucursal
     * @param sucursaluCodigo Identificacion field 1
     */
    public buildOidSucursal(sucursaluCodigo: number): {
        codigo: number} {
        return {codigo: sucursaluCodigo};
    }
    /**
     * Builds an Oid of class GrupoAsociado
     * @param grupoAsociadouCodigo Identificacion field 1
     */
    public buildOidGrupoAsociado(grupoAsociadouCodigo: number): {
        codigo: number} {
        return {codigo: grupoAsociadouCodigo};
    }
    /**
     * Builds an Oid of class EstadoCivil
     * @param estadoCiviluCodigo Identificacion field 1
     */
    public buildOidEstadoCivil(estadoCiviluCodigo: number): {
        codigo: number} {
        return {codigo: estadoCiviluCodigo};
    }
    /**
     * Builds an Oid of class Departamento
     * @param departamentouCodigo Identificacion field 1
     */
    public buildOidDepartamento(departamentouCodigo: number): {
        codigo: number} {
        return {codigo: departamentouCodigo};
    }
    /**
     * Builds an Oid of class TipoIVA
     * @param tipoIVAuCodigo Identificacion field 1
     */
    public buildOidTipoIVA(tipoIVAuCodigo: number): {
        codigo: number} {
        return {codigo: tipoIVAuCodigo};
    }
    /**
     * Builds an Oid of class Persona
     * @param personauIdentificador Identificacion field 1
     */
    public buildOidPersona(personauIdentificador: number): {
        identificador: number} {
        return {identificador: personauIdentificador};
    }
    /**
     * Builds an Oid of class Companyia
     * @param companyiauCodigo Identificacion field 1
     */
    public buildOidCompanyia(companyiauCodigo: number): {
        codigo: number} {
        return {codigo: companyiauCodigo};
    }
    /**
     * Builds an Oid of class Municipio
     * @param municipiouCodigo Identificacion field 1
     */
    public buildOidMunicipio(municipiouCodigo: number): {
        codigo: number} {
        return {codigo: municipiouCodigo};
    }
    /**
     * Builds an Oid of class TipoDireccion
     * @param tipoDireccionuCodigo Identificacion field 1
     */
    public buildOidTipoDireccion(tipoDireccionuCodigo: number): {
        codigo: number} {
        return {codigo: tipoDireccionuCodigo};
    }
    /**
     * Builds an Oid of class EstadoPersona
     * @param estadoPersonauCodigo Identificacion field 1
     */
    public buildOidEstadoPersona(estadoPersonauCodigo: number): {
        codigo: number} {
        return {codigo: estadoPersonauCodigo};
    }
    /**
     * Builds an Oid of class FormaPago
     * @param formaPagouCodigo Identificacion field 1
     */
    public buildOidFormaPago(formaPagouCodigo: number): {
        codigo: number} {
        return {codigo: formaPagouCodigo};
    }
    /**
     * Builds an Oid of class TipoIdentificacion
     * @param tipoIdentificacionuCodigo Identificacion field 1
     */
    public buildOidTipoIdentificacion(tipoIdentificacionuCodigo: number): {
        codigo: number} {
        return {codigo: tipoIdentificacionuCodigo};
    }
    /**
     * Builds an Oid of class Eps
     * @param epsuCodigo Identificacion field 1
     */
    public buildOidEps(epsuCodigo: number): {
        codigo: number} {
        return {codigo: epsuCodigo};
    }
    /**
     * Builds an Oid of class EntidadFinancieraC
     * @param entidadFinancieraCuCodigo Identificacion field 1
     */
    public buildOidEntidadFinancieraC(entidadFinancieraCuCodigo: number): {
        codigo: number} {
        return {codigo: entidadFinancieraCuCodigo};
    }
    /**
     * Builds an Oid of class TipoEntidadC
     * @param tipoEntidadCuCodigo Identificacion field 1
     */
    public buildOidTipoEntidadC(tipoEntidadCuCodigo: number): {
        codigo: number} {
        return {codigo: tipoEntidadCuCodigo};
    }
    /**
     * Builds an Oid of class TipoInstitucionC
     * @param tipoInstitucionCuCodigo Identificacion field 1
     */
    public buildOidTipoInstitucionC(tipoInstitucionCuCodigo: number): {
        codigo: number} {
        return {codigo: tipoInstitucionCuCodigo};
    }
    /**
     * Builds an Oid of class Ae_solicitudes
     * @param aeusolicitudesuidusolicitud Identificacion field 1
     */
    public buildOidAe_solicitudes(aeusolicitudesuidusolicitud: number): {
        id_solicitud: number} {
        return {id_solicitud: aeusolicitudesuidusolicitud};
    }
    /**
     * Builds an Oid of class Solicitud
     * @param solicituduidusolicitud Identificacion field 1
     */
    public buildOidSolicitud(solicituduidusolicitud: number): {
        id_solicitud: number} {
        return {id_solicitud: solicituduidusolicitud};
    }
    /**
     * Builds an Oid of class PersonaC
     * @param personaCuID Identificacion field 1
     */
    public buildOidPersonaC(personaCuID: number): {
        id: number} {
        return {id: personaCuID};
    }
    /**
     * Builds an Oid of class DireccionC
     * @param direccionCuCodigo Identificacion field 1
     */
    public buildOidDireccionC(direccionCuCodigo: number): {
        codigo: number} {
        return {codigo: direccionCuCodigo};
    }
    /**
     * Builds an Oid of class TelefonoC
     * @param telefonoCuID Identificacion field 1
     */
    public buildOidTelefonoC(telefonoCuID: number): {
        id: number} {
        return {id: telefonoCuID};
    }
    /**
     * Builds an Oid of class ProteccionDatosC
     * @param proteccionDatosCuID Identificacion field 1
     * @param proteccionDatosCuProducto Identificacion field 2
     * @param proteccionDatosCuCodigo Identificacion field 3
     */
    public buildOidProteccionDatosC(proteccionDatosCuID: number, proteccionDatosCuProducto: number,
                                    proteccionDatosCuCodigo: number): {
        id: number,
        producto: number,
        codigo: number} {
        return {id: proteccionDatosCuID,
                producto: proteccionDatosCuProducto,
                codigo: proteccionDatosCuCodigo};
    }
    /**
     * Builds an Oid of class Direccion
     * @param direccionuIdentificador Identificacion field 1
     */
    public buildOidDireccion(direccionuIdentificador: number): {
        identificador: number} {
        return {identificador: direccionuIdentificador};
    }
    /**
     * Builds an Oid of class Pais
     * @param paisuCodigo Identificacion field 1
     */
    public buildOidPais(paisuCodigo: string): {
        codigo: string} {
        return {codigo: paisuCodigo};
    }
    /**
     * Builds an Oid of class ProteccionDatos
     * @param proteccionDatosuIdentificador Identificacion field 1
     */
    public buildOidProteccionDatos(proteccionDatosuIdentificador: number): {
        identificador: number} {
        return {identificador: proteccionDatosuIdentificador};
    }
    /**
     * Builds an Oid of class Usuario
     * @param usuariouidusolicitud Identificacion field 1
     * @param usuariouIdentificador Identificacion field 2
     */
    public buildOidUsuario(usuariouidusolicitud: number, usuariouIdentificador: number): {
        id_solicitud: number,
        identificador: number} {
        return {id_solicitud: usuariouidusolicitud,
                identificador: usuariouIdentificador};
    }
    /**
     * Builds an Oid of class CuestionarioP
     * @param cuestionarioPuNumero Identificacion field 1
     */
    public buildOidCuestionarioP(cuestionarioPuNumero: number): {
        numero: number} {
        return {numero: cuestionarioPuNumero};
    }
    /**
     * Builds an Oid of class SeccionP
     * @param seccionPuIdentificador Identificacion field 1
     */
    public buildOidSeccionP(seccionPuIdentificador: number): {
        identificador: number} {
        return {identificador: seccionPuIdentificador};
    }
    /**
     * Builds an Oid of class PreguntaP
     * @param preguntaPuIdentificador Identificacion field 1
     */
    public buildOidPreguntaP(preguntaPuIdentificador: number): {
        identificador: number} {
        return {identificador: preguntaPuIdentificador};
    }
    /**
     * Builds an Oid of class Contratante
     * @param contratanteuidusolicitud Identificacion field 1
     */
    public buildOidContratante(contratanteuidusolicitud: number): {
        id_solicitud: number} {
        return {id_solicitud: contratanteuidusolicitud};
    }
    /**
     * Builds an Oid of class AnexoMat
     * @param anexoMatuIdentificador Identificacion field 1
     */
    public buildOidAnexoMat(anexoMatuIdentificador: number): {
        identificador: number} {
        return {identificador: anexoMatuIdentificador};
    }
    /**
     * Builds an Oid of class AnexoNeo
     * @param anexoNeouIdentificador Identificacion field 1
     */
    public buildOidAnexoNeo(anexoNeouIdentificador: number): {
        identificador: number} {
        return {identificador: anexoNeouIdentificador};
    }
    /**
     * Builds an Oid of class Firma
     * @param firmauIdentificador Identificacion field 1
     */
    public buildOidFirma(firmauIdentificador: number): {
        identificador: number} {
        return {identificador: firmauIdentificador};
    }
    /**
     * Builds an Oid of class ContratoC
     * @param contratoCuID Identificacion field 1
     */
    public buildOidContratoC(contratoCuID: number): {
        id: number} {
        return {id: contratoCuID};
    }
    /**
     * Builds an Oid of class ObservacionesC
     * @param observacionesCuIdentificador Identificacion field 1
     */
    public buildOidObservacionesC(observacionesCuIdentificador: number): {
        identificador: number} {
        return {identificador: observacionesCuIdentificador};
    }
    /**
     * Builds an Oid of class BeneficiarioC
     * @param beneficiarioCuContratoCuID Identificacion field 1
     * @param beneficiarioCuID Identificacion field 2
     */
    public buildOidBeneficiarioC(beneficiarioCuContratoCuID: number, beneficiarioCuID: number): {
        contratoc_id: number,
        id: number} {
        return {contratoc_id: beneficiarioCuContratoCuID,
                id: beneficiarioCuID};
    }
    /**
     * Builds an Oid of class AnexoC
     * @param anexoCuIdentificador Identificacion field 1
     */
    public buildOidAnexoC(anexoCuIdentificador: number): {
        identificador: number} {
        return {identificador: anexoCuIdentificador};
    }
    /**
     * Builds an Oid of class PregCuesMedC
     * @param pregCuesMedCuID Identificacion field 1
     * @param pregCuesMedCuCodPregunta Identificacion field 2
     */
    public buildOidPregCuesMedC(pregCuesMedCuID: number, pregCuesMedCuCodPregunta: number): {
        id: number,
        codpregunta: number} {
        return {id: pregCuesMedCuID,
                codpregunta: pregCuesMedCuCodPregunta};
    }
    /**
     * Builds an Oid of class DirSucursalC
     * @param dirSucursalCuCodigo Identificacion field 1
     */
    public buildOidDirSucursalC(dirSucursalCuCodigo: number): {
        codigo: number} {
        return {codigo: dirSucursalCuCodigo};
    }
    /**
     * Builds an Oid of class FamiliaC
     * @param familiaCuContratoCuID Identificacion field 1
     * @param familiaCuID Identificacion field 2
     */
    public buildOidFamiliaC(familiaCuContratoCuID: number, familiaCuID: number): {
        contratoc_id: number,
        id: number} {
        return {contratoc_id: familiaCuContratoCuID,
                id: familiaCuID};
    }
    /**
     * Builds an Oid of class UsuarioReg
     * @param usuarioReguidusolicitud Identificacion field 1
     * @param usuarioReguIdentificador Identificacion field 2
     */
    public buildOidUsuarioReg(usuarioReguidusolicitud: number, usuarioReguIdentificador: number): {
        id_solicitud: number,
        identificador: number} {
        return {id_solicitud: usuarioReguidusolicitud,
                identificador: usuarioReguIdentificador};
    }
    /**
     * Builds an Oid of class Titular
     * @param titularuidusolicitud Identificacion field 1
     */
    public buildOidTitular(titularuidusolicitud: number): {
        id_solicitud: number} {
        return {id_solicitud: titularuidusolicitud};
    }
    /**
     * Builds an Oid of class PreexistenciaC
     * @param preexistenciaCuID Identificacion field 1
     * @param preexistenciaCuIdentificador Identificacion field 2
     */
    public buildOidPreexistenciaC(preexistenciaCuID: number, preexistenciaCuIdentificador: number): {
        id: number,
        identificador: number} {
        return {id: preexistenciaCuID,
                identificador: preexistenciaCuIdentificador};
    }
    /**
     * Builds an Oid of class Preexistencia
     * @param preexistenciauidusolicitud Identificacion field 1
     * @param preexistenciauUsuariouIdentificador Identificacion field 2
     * @param preexistenciauIdentificador Identificacion field 3
     */
    public buildOidPreexistencia(preexistenciauidusolicitud: number, preexistenciauUsuariouIdentificador: number,
                                 preexistenciauIdentificador: number): {
        id_solicitud: number,
        usuario_identificador: number,
        identificador: number} {
        return {id_solicitud: preexistenciauidusolicitud,
                usuario_identificador: preexistenciauUsuariouIdentificador,
                identificador: preexistenciauIdentificador};
    }
    /**
     * Builds an Oid of class DocumentoG
     * @param documentoGuIdentificador Identificacion field 1
     */
    public buildOidDocumentoG(documentoGuIdentificador: number): {
        identificador: number} {
        return {identificador: documentoGuIdentificador};
    }
    /**
     * Builds an Oid of class ObsEstado
     * @param obsEstadouIdentificador Identificacion field 1
     * @param obsEstadouId Identificacion field 2
     */
    public buildOidObsEstado(obsEstadouIdentificador: number, obsEstadouId: number): {
        identificador: number,
        id: number} {
        return {identificador: obsEstadouIdentificador,
                id: obsEstadouId};
    }
    /**
     * Builds an Oid of class ErrorWS
     * @param errorWSuIdentificador Identificacion field 1
     */
    public buildOidErrorWS(errorWSuIdentificador: number): {
        identificador: number} {
        return {identificador: errorWSuIdentificador};
    }
    /**
     * Builds an Oid of class ParentescoDom
     * @param parentescoDomuNumero Identificacion field 1
     * @param parentescoDomuIdentificador Identificacion field 2
     */
    public buildOidParentescoDom(parentescoDomuNumero: number, parentescoDomuIdentificador: number): {
        numero: number,
        identificador: number} {
        return {numero: parentescoDomuNumero,
                identificador: parentescoDomuIdentificador};
    }
    /**
     * Builds an Oid of class MarcaMedicaC
     * @param marcaMedicaCuID Identificacion field 1
     * @param marcaMedicaCuProducto Identificacion field 2
     * @param marcaMedicaCuCodigo Identificacion field 3
     */
    public buildOidMarcaMedicaC(marcaMedicaCuID: number, marcaMedicaCuProducto: number,
                                marcaMedicaCuCodigo: string): {
        id: number,
        producto: number,
        codigo: string} {
        return {id: marcaMedicaCuID,
                producto: marcaMedicaCuProducto,
                codigo: marcaMedicaCuCodigo};
    }
    /**
     * Builds an Oid of class TipoSucursalC
     * @param tipoSucursalCuCodigo Identificacion field 1
     */
    public buildOidTipoSucursalC(tipoSucursalCuCodigo: number): {
        codigo: number} {
        return {codigo: tipoSucursalCuCodigo};
    }
    /**
     * Builds an Oid of class ConceptoC
     * @param conceptoCuIdConcepto Identificacion field 1
     */
    public buildOidConceptoC(conceptoCuIdConcepto: number): {
        idconcepto: number} {
        return {idconcepto: conceptoCuIdConcepto};
    }
    /**
     * Builds an Oid of class DetalleTarifa
     * @param detalleTarifauiduDetalleTarifa Identificacion field 1
     */
    public buildOidDetalleTarifa(detalleTarifauiduDetalleTarifa: number): {
        id_detalletarifa: number} {
        return {id_detalletarifa: detalleTarifauiduDetalleTarifa};
    }
    /**
     * Builds an Oid of class AgentexProducto
     * @param agentexProductouAsesoruId Identificacion field 1
     * @param agentexProductouId Identificacion field 2
     */
    public buildOidAgentexProducto(agentexProductouAsesoruId: number, agentexProductouId: number): {
        asesor_id: number,
        id: number} {
        return {asesor_id: agentexProductouAsesoruId,
                id: agentexProductouId};
    }
    /**
     * Builds an Oid of class InstitucionMatNeo
     * @param institucionMatNeouCodigo Identificacion field 1
     */
    public buildOidInstitucionMatNeo(institucionMatNeouCodigo: string): {
        codigo: string} {
        return {codigo: institucionMatNeouCodigo};
    }
    /**
     * Builds an Oid of class LogEstado
     * @param logEstadouId Identificacion field 1
     */
    public buildOidLogEstado(logEstadouId: number): {
        id: number} {
        return {id: logEstadouId};
    }
    /**
     * Builds an Oid of class MotDevAreaMedica
     * @param motDevAreaMedicauId Identificacion field 1
     */
    public buildOidMotDevAreaMedica(motDevAreaMedicauId: number): {
        id: number} {
        return {id: motDevAreaMedicauId};
    }
    /**
     * Builds an Oid of class ContSinDocSol
     * @param contSinDocSoluiduContSinDocSol Identificacion field 1
     */
    public buildOidContSinDocSol(contSinDocSoluiduContSinDocSol: number): {
        id_contsindocsol: number} {
        return {id_contsindocsol: contSinDocSoluiduContSinDocSol};
    }
    /**
     * Builds an Oid of class LogContSinDocSol
     * @param logContSinDocSoluiduLogContSinDocSol Identificacion field 1
     */
    public buildOidLogContSinDocSol(logContSinDocSoluiduLogContSinDocSol: number): {
        id_logcontsindocsol: number} {
        return {id_logcontsindocsol: logContSinDocSoluiduLogContSinDocSol};
    }
    /**
     * Builds an Oid of class LogAsignaciones
     * @param logAsignacionesuiduLogAsignaciones Identificacion field 1
     */
    public buildOidLogAsignaciones(logAsignacionesuiduLogAsignaciones: number): {
        id_logasignaciones: number} {
        return {id_logasignaciones: logAsignacionesuiduLogAsignaciones};
    }
    /**
     * Builds an Oid of class ReportesProcAlm
     * @param reportesProcAlmuiduReporte Identificacion field 1
     */
    public buildOidReportesProcAlm(reportesProcAlmuiduReporte: number): {
        id_reporte: number} {
        return {id_reporte: reportesProcAlmuiduReporte};
    }
    /**
     * Builds an Oid of class Prorrateo
     * @param prorrateouNumero Identificacion field 1
     * @param prorrateouiduProrrateo Identificacion field 2
     */
    public buildOidProrrateo(prorrateouNumero: number, prorrateouiduProrrateo: number): {
        numero: number,
        id_prorrateo: number} {
        return {numero: prorrateouNumero,
                id_prorrateo: prorrateouiduProrrateo};
    }
    /**
     * Builds an Oid of class TipoFactura
     * @param tipoFacturauCodigo Identificacion field 1
     */
    public buildOidTipoFactura(tipoFacturauCodigo: string): {
        codigo: string} {
        return {codigo: tipoFacturauCodigo};
    }
    /**
     * Builds an Oid of class ParamReporte
     * @param paramReporteuiduParamReporte Identificacion field 1
     */
    public buildOidParamReporte(paramReporteuiduParamReporte: number): {
        id_paramreporte: number} {
        return {id_paramreporte: paramReporteuiduParamReporte};
    }
    /**
     * Builds an Oid of class TipoNovedad
     * @param tipoNovedaduTipo Identificacion field 1
     */
    public buildOidTipoNovedad(tipoNovedaduTipo: number): {
        tipo: number} {
        return {tipo: tipoNovedaduTipo};
    }
    /**
     * Builds an Oid of class Novedad
     * @param novedaduiduNovedad Identificacion field 1
     */
    public buildOidNovedad(novedaduiduNovedad: number): {
        id_novedad: number} {
        return {id_novedad: novedaduiduNovedad};
    }
    /**
     * Builds an Oid of class Causal
     * @param causaluiduCausal Identificacion field 1
     */
    public buildOidCausal(causaluiduCausal: number): {
        id_causal: number} {
        return {id_causal: causaluiduCausal};
    }
    /**
     * Builds an Oid of class SolicitudNovedad
     * @param solicitudNovedaduId Identificacion field 1
     */
    public buildOidSolicitudNovedad(solicitudNovedaduId: number): {
        id: number} {
        return {id: solicitudNovedaduId};
    }
    /**
     * Builds an Oid of class FamiliaNovedad
     * @param familiaNovedaduiduFamiliaNovedad Identificacion field 1
     */
    public buildOidFamiliaNovedad(familiaNovedaduiduFamiliaNovedad: number): {
        id_familianovedad: number} {
        return {id_familianovedad: familiaNovedaduiduFamiliaNovedad};
    }
    /**
     * Builds an Oid of class UsuarioNovedad
     * @param usuarioNovedaduiduUsuarioNovedad Identificacion field 1
     */
    public buildOidUsuarioNovedad(usuarioNovedaduiduUsuarioNovedad: number): {
        id_usuarionovedad: number} {
        return {id_usuarionovedad: usuarioNovedaduiduUsuarioNovedad};
    }
    /**
     * Builds an Oid of class CausaExclusion
     * @param causaExclusionuiduCausaExclusion Identificacion field 1
     */
    public buildOidCausaExclusion(causaExclusionuiduCausaExclusion: number): {
        id_causaexclusion: number} {
        return {id_causaexclusion: causaExclusionuiduCausaExclusion};
    }
    /**
     * Builds an Oid of class NovedadCT
     * @param novedadCTuiduNovedadCT Identificacion field 1
     */
    public buildOidNovedadCT(novedadCTuiduNovedadCT: number): {
        id_novedadct: number} {
        return {id_novedadct: novedadCTuiduNovedadCT};
    }
    /**
     * Builds an Oid of class DocumentoNovedad
     * @param documentoNovedaduIdDocumento Identificacion field 1
     */
    public buildOidDocumentoNovedad(documentoNovedaduIdDocumento: number): {
        iddocumento: number} {
        return {iddocumento: documentoNovedaduIdDocumento};
    }
    /**
     * Builds an Oid of class NovedadMD
     * @param novedadMDuiduNovedadMD Identificacion field 1
     */
    public buildOidNovedadMD(novedadMDuiduNovedadMD: number): {
        id_novedadmd: number} {
        return {id_novedadmd: novedadMDuiduNovedadMD};
    }
    /**
     * Builds an Oid of class LogEstadoSN
     * @param logEstadoSNuId Identificacion field 1
     */
    public buildOidLogEstadoSN(logEstadoSNuId: number): {
        id: number} {
        return {id: logEstadoSNuId};
    }
    /**
     * Builds an Oid of class MotivoExcepcionSolNov
     * @param motivoExcepcionSolNovuId Identificacion field 1
     */
    public buildOidMotivoExcepcionSolNov(motivoExcepcionSolNovuId: number): {
        id: number} {
        return {id: motivoExcepcionSolNovuId};
    }
    /**
     * Builds an Oid of class PriorizacionSolicitudes
     * @param priorizacionSolicitudesuEstadoSolicitud Identificacion field 1
     * @param priorizacionSolicitudesuEstadoDoc Identificacion field 2
     */
    public buildOidPriorizacionSolicitudes(priorizacionSolicitudesuEstadoSolicitud: number, priorizacionSolicitudesuEstadoDoc: number): {
        estadosolicitud: number,
        estadodoc: number} {
        return {estadosolicitud: priorizacionSolicitudesuEstadoSolicitud,
                estadodoc: priorizacionSolicitudesuEstadoDoc};
    }
    /**
     * Builds an Oid of class LogPriorizacionSol
     * @param logPriorizacionSoluId Identificacion field 1
     */
    public buildOidLogPriorizacionSol(logPriorizacionSoluId: number): {
        id: number} {
        return {id: logPriorizacionSoluId};
    }
    /**
     * Builds an Oid of class GrupoAsignacion
     * @param grupoAsignacionuId Identificacion field 1
     */
    public buildOidGrupoAsignacion(grupoAsignacionuId: number): {
        id: number} {
        return {id: grupoAsignacionuId};
    }
    /**
     * Builds an Oid of class LogGrupoAsignacion
     * @param logGrupoAsignacionuId Identificacion field 1
     */
    public buildOidLogGrupoAsignacion(logGrupoAsignacionuId: number): {
        id: number} {
        return {id: logGrupoAsignacionuId};
    }
    /**
     * Builds an Oid of class LogGruposUsuarios
     * @param logGruposUsuariosuId Identificacion field 1
     */
    public buildOidLogGruposUsuarios(logGruposUsuariosuId: number): {
        id: number} {
        return {id: logGruposUsuariosuId};
    }
    /**
     * Builds an Oid of class GrupoAsignacionNovedad
     * @param grupoAsignacionNovedaduId Identificacion field 1
     */
    public buildOidGrupoAsignacionNovedad(grupoAsignacionNovedaduId: number): {
        id: number} {
        return {id: grupoAsignacionNovedaduId};
    }
    /**
     * Builds an Oid of class LogFuncionario
     * @param logFuncionariouId Identificacion field 1
     */
    public buildOidLogFuncionario(logFuncionariouId: number): {
        id: number} {
        return {id: logFuncionariouId};
    }
    /**
     * Builds an Oid of class LogUsrSolNov
     * @param logUsrSolNovuId Identificacion field 1
     */
    public buildOidLogUsrSolNov(logUsrSolNovuId: number): {
        id: number} {
        return {id: logUsrSolNovuId};
    }
    /**
     * Builds an Oid of class ContratoCombo
     * @param contratoCombouId Identificacion field 1
     */
    public buildOidContratoCombo(contratoCombouId: number): {
        id: number} {
        return {id: contratoCombouId};
    }
    /**
     * Builds an Oid of class LogContratoCombo
     * @param logContratoCombouId Identificacion field 1
     */
    public buildOidLogContratoCombo(logContratoCombouId: number): {
        id: number} {
        return {id: logContratoCombouId};
    }
    /**
     * Builds an Oid of class ConfiguracionANS
     * @param configuracionANSuId Identificacion field 1
     */
    public buildOidConfiguracionANS(configuracionANSuId: number): {
        id: number} {
        return {id: configuracionANSuId};
    }
    /**
     * Builds an Oid of class LogConfiguracionANS
     * @param logConfiguracionANSuId Identificacion field 1
     */
    public buildOidLogConfiguracionANS(logConfiguracionANSuId: number): {
        id: number} {
        return {id: logConfiguracionANSuId};
    }
    /**
     * Builds an Oid of class ConfiguracionFestivos
     * @param configuracionFestivosuId Identificacion field 1
     */
    public buildOidConfiguracionFestivos(configuracionFestivosuId: number): {
        id: number} {
        return {id: configuracionFestivosuId};
    }
    /**
     * Builds an Oid of class LogEstadoDocNov
     * @param logEstadoDocNovuId Identificacion field 1
     */
    public buildOidLogEstadoDocNov(logEstadoDocNovuId: number): {
        id: number} {
        return {id: logEstadoDocNovuId};
    }
    /**
     * Builds an Oid of class PlantillaReporte
     * @param plantillaReporteuiduPlantillaReporte Identificacion field 1
     */
    public buildOidPlantillaReporte(plantillaReporteuiduPlantillaReporte: number): {
        id_plantillareporte: number} {
        return {id_plantillareporte: plantillaReporteuiduPlantillaReporte};
    }
    /**
     * Builds an Oid of class ReportesDominio
     * @param reportesDominiouNumero Identificacion field 1
     * @param reportesDominiouiduPlantillaReporte Identificacion field 2
     */
    public buildOidReportesDominio(reportesDominiouNumero: number, reportesDominiouiduPlantillaReporte: number): {
        numero: number,
        id_plantillareporte: number} {
        return {numero: reportesDominiouNumero,
                id_plantillareporte: reportesDominiouiduPlantillaReporte};
    }
    /**
     * Builds an Oid of class LogInformacionAsesor
     * @param logInformacionAsesoruiduLogInformacionAsesor Identificacion field 1
     */
    public buildOidLogInformacionAsesor(logInformacionAsesoruiduLogInformacionAsesor: number): {
        id_loginformacionasesor: number} {
        return {id_loginformacionasesor: logInformacionAsesoruiduLogInformacionAsesor};
    }
    /**
     * Builds an Oid of class LogHistoricoPlanes
     * @param logHistoricoPlanesuiduLogHistoricoPlanes Identificacion field 1
     */
    public buildOidLogHistoricoPlanes(logHistoricoPlanesuiduLogHistoricoPlanes: number): {
        id_loghistoricoplanes: number} {
        return {id_loghistoricoplanes: logHistoricoPlanesuiduLogHistoricoPlanes};
    }
    /**
     * Builds an Oid of class LogLlamadasAE
     * @param logLlamadasAEuID Identificacion field 1
     */
    public buildOidLogLlamadasAE(logLlamadasAEuID: number): {
        id: number} {
        return {id: logLlamadasAEuID};
    }
    /**
     * Builds an Oid of class LogLlamadasBH
     * @param logLlamadasBHuID Identificacion field 1
     */
    public buildOidLogLlamadasBH(logLlamadasBHuID: number): {
        id: number} {
        return {id: logLlamadasBHuID};
    }
    /**
     * Builds an Oid of class FechaIniEPS
     * @param fechaIniEPSuId Identificacion field 1
     */
    public buildOidFechaIniEPS(fechaIniEPSuId: number): {
        id: number} {
        return {id: fechaIniEPSuId};
    }
    /**
     * Builds an Oid of class LogIncompatibilidades
     * @param logIncompatibilidadesuiduLogIncompatibilidades Identificacion field 1
     */
    public buildOidLogIncompatibilidades(logIncompatibilidadesuiduLogIncompatibilidades: number): {
        id_logincompatibilidades: number} {
        return {id_logincompatibilidades: logIncompatibilidadesuiduLogIncompatibilidades};
    }
    /**
     * Builds an Oid of class LogDatosDominio
     * @param logDatosDominiouiduLogDatosDominio Identificacion field 1
     */
    public buildOidLogDatosDominio(logDatosDominiouiduLogDatosDominio: number): {
        id_logdatosdominio: number} {
        return {id_logdatosdominio: logDatosDominiouiduLogDatosDominio};
    }
    /**
     * Builds an Oid of class ContratosExentosFIngreso
     * @param contratosExentosFIngresouiduContratosExentosFIngreso Identificacion field 1
     */
    public buildOidContratosExentosFIngreso(contratosExentosFIngresouiduContratosExentosFIngreso: number): {
        id_contratosexentosfingreso: number} {
        return {id_contratosexentosfingreso: contratosExentosFIngresouiduContratosExentosFIngreso};
    }
    /**
     * Builds an Oid of class LogContratosExentosFIngreso
     * @param logContratosExentosFIngresouiduLogContratosExentosFIngreso Identificacion field 1
     */
    public buildOidLogContratosExentosFIngreso(logContratosExentosFIngresouiduLogContratosExentosFIngreso: number): {
        id_logcontratosexentosfingreso: number} {
        return {id_logcontratosexentosfingreso: logContratosExentosFIngresouiduLogContratosExentosFIngreso};
    }
    /**
     * Builds an Oid of class TextoAviso
     * @param textoAvisouIdentificador Identificacion field 1
     */
    public buildOidTextoAviso(textoAvisouIdentificador: string): {
        identificador: string} {
        return {identificador: textoAvisouIdentificador};
    }
    /**
     * Builds an Oid of class UsuarioSistemaExterno
     * @param usuarioSistemaExternouLogin Identificacion field 1
     */
    public buildOidUsuarioSistemaExterno(usuarioSistemaExternouLogin: string): {
        login: string} {
        return {login: usuarioSistemaExternouLogin};
    }

}
