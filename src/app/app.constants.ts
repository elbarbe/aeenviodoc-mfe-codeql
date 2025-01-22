import { ModelConstants } from './common/model.constants';

export class Configuration {
    public BASE_URL = '';
    public URL_LOG_ERROR = '';
    public NAVCONSTANTS: any[] = [
        {
            className: ModelConstants.Funcionario.name,
            navKey: 'funcionario',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Admin.name,
            navKey: 'admin',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Superadmin.name,
            navKey: 'superadmin',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Asesor.name,
            navKey: 'asesor',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Areamedica.name,
            navKey: 'areamedica',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Afiliaciones.name,
            navKey: 'afiliaciones',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Respregional.name,
            navKey: 'respregional',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Gestor.name,
            navKey: 'gestor',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Mesadeapoyo.name,
            navKey: 'mesadeapoyo',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Paramconfig.name,
            navKey: 'paramconfig',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Logparam.name,
            navKey: 'logparam',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Frecuenciaact.name,
            navKey: 'frecuenciaact',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Cuestionariomed.name,
            navKey: 'cuestionariomed',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Seccion.name,
            navKey: 'seccion',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Pregunta.name,
            navKey: 'pregunta',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Valor.name,
            navKey: 'valor',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Productos.name,
            navKey: 'productos',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Planes.name,
            navKey: 'planes',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Parentesco.name,
            navKey: 'parentesco',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Periodicidad.name,
            navKey: 'periodicidad',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Rol.name,
            navKey: 'rol',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Dominio.name,
            navKey: 'dominio',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Plantillaemail.name,
            navKey: 'plantillaemail',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Estadocontrato.name,
            navKey: 'estadocontrato',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Estadobeneficiario.name,
            navKey: 'estadobeneficiario',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Estadobeneficiarioae.name,
            navKey: 'estadobeneficiarioae',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Tarifa.name,
            navKey: 'tarifa',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Regional.name,
            navKey: 'regional',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Sucursal.name,
            navKey: 'sucursal',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Grupoasociado.name,
            navKey: 'grupoasociado',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Estadocivil.name,
            navKey: 'estadocivil',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Departamento.name,
            navKey: 'departamento',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Tipoiva.name,
            navKey: 'tipoiva',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Persona.name,
            navKey: 'persona',
            ius: [
                { name: ModelConstants.Persona.piuupersona,
                    navKey: 'piu_persona' }
            ]
        }
        , {
            className: ModelConstants.Companyia.name,
            navKey: 'companyia',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Municipio.name,
            navKey: 'municipio',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Tipodireccion.name,
            navKey: 'tipodireccion',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Estadopersona.name,
            navKey: 'estadopersona',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Formapago.name,
            navKey: 'formapago',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Tipoidentificacion.name,
            navKey: 'tipoidentificacion',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Eps.name,
            navKey: 'eps',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Entidadfinancierac.name,
            navKey: 'entidadfinancierac',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Tipoentidadc.name,
            navKey: 'tipoentidadc',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Tipoinstitucionc.name,
            navKey: 'tipoinstitucionc',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Aeusolicitudes.name,
            navKey: 'ae_solicitudes',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Solicitud.name,
            navKey: 'solicitud',
            ius: [
                { name: ModelConstants.Solicitud.siuudummyupreexistencias,
                    navKey: 'siu_dummy_preexistencias' }
                , { name: ModelConstants.Solicitud.siuudummyudiferenciasliq,
                    navKey: 'siu_dummy_diferenciasliq' }
                , { name: ModelConstants.Solicitud.siuutcrearsegundafirma,
                    navKey: 'siu_tcrearsegundafirma' }
                , { name: ModelConstants.Solicitud.siuutenviardoc,
                    navKey: 'siu_tenviardoc' }
                , { name: ModelConstants.Solicitud.iiuudiferenciasliquidacion,
                    navKey: 'iiu_diferenciasliquidacion' }
                , { name: ModelConstants.Solicitud.mdiuusolicitudpreexistencias,
                    navKey: 'mdiu_solicitudpreexistencias' }
                , { name: ModelConstants.Solicitud.piuuradicadosuobs,
                    navKey: 'piu_radicados_obs' }
                , { name: ModelConstants.Solicitud.piuuenviodoc,
                    navKey: 'piu_enviodoc' }
            ]
        }
        , {
            className: ModelConstants.Personac.name,
            navKey: 'personac',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Direccionc.name,
            navKey: 'direccionc',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Telefonoc.name,
            navKey: 'telefonoc',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Protecciondatosc.name,
            navKey: 'protecciondatosc',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Direccion.name,
            navKey: 'direccion',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Pais.name,
            navKey: 'pais',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Protecciondatos.name,
            navKey: 'protecciondatos',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Usuario.name,
            navKey: 'usuario',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Cuestionariop.name,
            navKey: 'cuestionariop',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Seccionp.name,
            navKey: 'seccionp',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Preguntap.name,
            navKey: 'preguntap',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Contratante.name,
            navKey: 'contratante',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Anexomat.name,
            navKey: 'anexomat',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Anexoneo.name,
            navKey: 'anexoneo',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Firma.name,
            navKey: 'firma',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Contratoc.name,
            navKey: 'contratoc',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Observacionesc.name,
            navKey: 'observacionesc',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Beneficiarioc.name,
            navKey: 'beneficiarioc',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Anexoc.name,
            navKey: 'anexoc',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Pregcuesmedc.name,
            navKey: 'pregcuesmedc',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Dirsucursalc.name,
            navKey: 'dirsucursalc',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Familiac.name,
            navKey: 'familiac',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Usuarioreg.name,
            navKey: 'usuarioreg',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Titular.name,
            navKey: 'titular',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Preexistenciac.name,
            navKey: 'preexistenciac',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Preexistencia.name,
            navKey: 'preexistencia',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Documentog.name,
            navKey: 'documentog',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Obsestado.name,
            navKey: 'obsestado',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Errorws.name,
            navKey: 'errorws',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Parentescodom.name,
            navKey: 'parentescodom',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Marcamedicac.name,
            navKey: 'marcamedicac',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Tiposucursalc.name,
            navKey: 'tiposucursalc',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Conceptoc.name,
            navKey: 'conceptoc',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Anonimo.name,
            navKey: 'anonimo',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Detalletarifa.name,
            navKey: 'detalletarifa',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Agentexproducto.name,
            navKey: 'agentexproducto',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Institucionmatneo.name,
            navKey: 'institucionmatneo',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Logestado.name,
            navKey: 'logestado',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Motdevareamedica.name,
            navKey: 'motdevareamedica',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Contsindocsol.name,
            navKey: 'contsindocsol',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Logcontsindocsol.name,
            navKey: 'logcontsindocsol',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Logasignaciones.name,
            navKey: 'logasignaciones',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Reportesprocalm.name,
            navKey: 'reportesprocalm',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Prorrateo.name,
            navKey: 'prorrateo',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Tipofactura.name,
            navKey: 'tipofactura',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Paramreporte.name,
            navKey: 'paramreporte',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Tiponovedad.name,
            navKey: 'tiponovedad',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Novedad.name,
            navKey: 'novedad',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Causal.name,
            navKey: 'causal',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Solicitudnovedad.name,
            navKey: 'solicitudnovedad',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Familianovedad.name,
            navKey: 'familianovedad',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Usuarionovedad.name,
            navKey: 'usuarionovedad',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Causaexclusion.name,
            navKey: 'causaexclusion',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Novedadct.name,
            navKey: 'novedadct',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Documentonovedad.name,
            navKey: 'documentonovedad',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Novedadmd.name,
            navKey: 'novedadmd',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Logestadosn.name,
            navKey: 'logestadosn',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Motivoexcepcionsolnov.name,
            navKey: 'motivoexcepcionsolnov',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Priorizacionsolicitudes.name,
            navKey: 'priorizacionsolicitudes',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Logpriorizacionsol.name,
            navKey: 'logpriorizacionsol',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Grupoasignacion.name,
            navKey: 'grupoasignacion',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Loggrupoasignacion.name,
            navKey: 'loggrupoasignacion',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Loggruposusuarios.name,
            navKey: 'loggruposusuarios',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Grupoasignacionnovedad.name,
            navKey: 'grupoasignacionnovedad',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Logfuncionario.name,
            navKey: 'logfuncionario',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Logusrsolnov.name,
            navKey: 'logusrsolnov',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Contratocombo.name,
            navKey: 'contratocombo',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Logcontratocombo.name,
            navKey: 'logcontratocombo',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Configuracionans.name,
            navKey: 'configuracionans',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Logconfiguracionans.name,
            navKey: 'logconfiguracionans',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Configuracionfestivos.name,
            navKey: 'configuracionfestivos',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Logestadodocnov.name,
            navKey: 'logestadodocnov',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Plantillareporte.name,
            navKey: 'plantillareporte',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Reportesdominio.name,
            navKey: 'reportesdominio',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Loginformacionasesor.name,
            navKey: 'loginformacionasesor',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Loghistoricoplanes.name,
            navKey: 'loghistoricoplanes',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Logllamadasae.name,
            navKey: 'logllamadasae',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Logllamadasbh.name,
            navKey: 'logllamadasbh',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Fechainieps.name,
            navKey: 'fechainieps',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Logincompatibilidades.name,
            navKey: 'logincompatibilidades',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Logdatosdominio.name,
            navKey: 'logdatosdominio',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Contratosexentosfingreso.name,
            navKey: 'contratosexentosfingreso',
            ius: [
            ]
        }
        , {
            className: ModelConstants.Logcontratosexentosfingreso.name,
            navKey: 'logcontratosexentosfingreso',
            ius: [
            ]
        }
        , {
            className: 'globalservices',
            navKey: 'globalservices',
            ius: [
                { name: ModelConstants.Globalservices.siuuogetreporte,
                    navKey: 'siu_ogetreporte' }
                , { name: ModelConstants.Globalservices.siuuogetreporteuout,
                    navKey: 'siu_ogetreporte_out' }
            ]
        }
    ];
}
