import { getLocaleDateFormat, FormatWidth, getLocaleNumberSymbol, NumberSymbol, registerLocaleData} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { Injectable } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { ErrorInformation } from './answerRequestInformation';



/**
 * « Language manager »
 * It is on charge of translate texts and data formats
 */
@Injectable({providedIn: 'root'})
export class LanguageMng {

    /** Constants for fixed messages */
    public static readonly fsNumberInstacesSelected = 'app_FLD_NUMBERSELECTED';
    public static readonly fsErrorNotExist = 'app_FLD_ERRORNOTEXIST';
    public static readonly fsErrorNat = 'app_FLD_ERRORNAT';
    public static readonly fsErrorInt = 'app_FLD_ERRORINT';
    public static readonly fsErrorReal = 'app_FLD_ERRORREAL';
    public static readonly fsErrorPwdConf = 'app_FLD_ERRORPWDCONF';

    /** Default language id */
    private static readonly defaultLanguageId = 'es';
    /** Available languages for texts and messages.
     * TODO list to allow multilanguage:
     * 1. Add available languages to the 'availableLanguages' array
     * 2. Add the imports sentence for every different locale
     * 3. Modify the 'registerCurrentLocale' function to take in account all languajes and locales
     * Every element is a pair (key,value): key is the language Id and value the language description
     * {key: 'en', value: 'English'}, {key: 'de', value: 'German'}
     */
    public availableLanguages: any[] = [];
    /** Current language code */
    private currentLanguage = '';
    /** Translated texts */
    private translatedTexts: any;
    /** Decimal separator for formating number using the current locale */
    public decimalSeparator = '';
    /** Group (thousand) separator for formating number using the current locale */
    public groupSeparator = '';
    /** Date format to be used for input */
    public inputDateFormat = 'dd/mm/y';
    /** First day of week. 0 = Sunday, 1 = Monday */
    public firstDayOfWeek = 1;

    /**
     * Constructor
     * @param httpClient Http service
     * @param appGlobalInfo Application global information
     */
    constructor(
        private httpClient: HttpClient,
        private readonly appGlobalInfo: AppGlobalInfo
    ) { }

    /**
     * Returns the language id and load the translated texts
     */
    public getLanguageId(): string {
        if (!this.currentLanguage) {
            const savedLang = sessionStorage.getItem('currentLanguage');
            if (savedLang) {
                this.currentLanguage = savedLang;
            } else {
                // Default language
                this.currentLanguage = LanguageMng.defaultLanguageId;
            }
            sessionStorage.setItem('currentLanguage', this.currentLanguage);
            this.registerCurrentLocale();
        }
        return this.currentLanguage;
    }

    /**
     * Load translated text and formats
     */
    private registerCurrentLocale(): void {
        // If language is the default, assign the formats and fixed texts
        if (this.currentLanguage === LanguageMng.defaultLanguageId) {
            this.translatedTexts = this.getDefaultTranslatedTexts();
            registerLocaleData(localeEs, 'es');
        } else {
            // For non default language, tasks to do:
            //  1. Register the locale. It is not necessary for en_US, mandatory for the rest of locales
            //      1.1 Import the locale from the proper file, as many locales as you need:
            //          import localeEs from '@angular/common/locales/es';
            //          import localeDe from '@angular/common/locales/de';
            //      1.2 Registrer the locale, using the registerLocaledata function. Add an if for every locale:
            //          if (this.currentLanguage === 'de') {
            //              registerLocaleData(localeDe, 'de');
            //          }
            // 2. Load the translated texts from backend. If language Id is the same in the backend, it is not necessary do anything

            // Load translated texts
            this.getTranslationsFromBackEnd().then( (res) => {
                this.appGlobalInfo.infoChanged.next();
            });

        }

        // Assign separators and input date format. By default, using the registred locale.
        // Or assign fixed ones, if you prefer ...
        this.decimalSeparator = getLocaleNumberSymbol(this.currentLanguage, NumberSymbol.Decimal);
        this.groupSeparator = getLocaleNumberSymbol(this.currentLanguage, NumberSymbol.Group);
        //this.inputDateFormat = getLocaleDateFormat(this.currentLanguage, FormatWidth.Short).toLowerCase();
    }

    /**
     * Change the language id and reload the application to take effect the change
     * @param newLanguageId New language id
     */
    public setCurrentLanguageId(newLanguageId: string): void {
        if (newLanguageId && newLanguageId !== this.currentLanguage) {
            sessionStorage.setItem('currentLanguage', newLanguageId);
            location.reload();
        }
    }

    /**
     * Returns the translations for PrimeNG components
     */
    public getPrimNGTranslation(): any {
        let translations = {
            startsWith: 'Empieza por',
            contains: 'Contiene',
            notContains: 'No contiene',
            endsWith: 'Termina con',
            equals: 'Igual',
            notEquals: 'Distinto',
            noFilter: 'No filtro',
            lt: 'Menor a',
            lte: 'Menor o igual a',
            gt: 'Mayor a',
            gte: 'mayor o igual a',
            is: 'Es',
            isNot: 'No es',
            before: 'Antes',
            after: 'Despues',
            clear: 'Limpiar',
            apply: 'Aplicar',
            matchAll: 'Coincidir todos',
            matchAny: 'Coincidir alguno',
            addRule: 'Añadir regla',
            removeRule: 'Quitar regla',
            accept: 'Sí',
            reject: 'No',
            choose: 'Elegir',
            upload: 'Upload',
            cancel: 'Cancelar',
            dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
            dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
            dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
            monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
            today: 'Today',
            weekHeader: 'Sem'
        };


        if (this.translatedTexts) {
            translations = {
                startsWith: this.translateText('app_PNGTRANS_STARTSWITH', ''),
                contains: this.translateText('app_PNGTRANS_CONTAINS', ''),
                notContains: this.translateText('app_PNGTRANS_NOTCONTAINS', ''),
                endsWith: this.translateText('app_PNGTRANS_ENDSWITH', ''),
                equals: this.translateText('app_PNGTRANS_EQUALS', ''),
                notEquals: this.translateText('app_PNGTRANS_NOTEQUALS', ''),
                noFilter: this.translateText('app_PNGTRANS_NOFILTER', ''),
                lt: this.translateText('app_PNGTRANS_LT', ''),
                lte: this.translateText('app_PNGTRANS_LTE', ''),
                gt: this.translateText('app_PNGTRANS_GT', ''),
                gte: this.translateText('app_PNGTRANS_GTE', ''),
                is: this.translateText('app_PNGTRANS_IS', ''),
                isNot: this.translateText('app_PNGTRANS_ISNOT', ''),
                before: this.translateText('app_PNGTRANS_BEFORE', ''),
                after: this.translateText('app_PNGTRANS_AFTER', ''),
                clear: this.translateText('app_PNGTRANS_CLEAR', ''),
                apply: this.translateText('app_PNGTRANS_APPLY', ''),
                matchAll: this.translateText('app_PNGTRANS_MATCHALL', ''),
                matchAny: this.translateText('app_PNGTRANS_MATCHANY', ''),
                addRule: this.translateText('app_PNGTRANS_ADDRULE', ''),
                removeRule: this.translateText('app_PNGTRANS_REMOVERULE', ''),
                accept: this.translateText('app_PNGTRANS_ACCEPT', ''),
                reject: this.translateText('app_PNGTRANS_REJECT', ''),
                choose: this.translateText('app_PNGTRANS_CHOOSE', ''),
                upload: this.translateText('app_PNGTRANS_UPLOAD', ''),
                cancel: this.translateText('app_PNGTRANS_CANCEL', ''),
                dayNames: [
                    this.translateText('app_PNGTRANS_DAYNAMES1', ''),
                    this.translateText('app_PNGTRANS_DAYNAMES2', ''),
                    this.translateText('app_PNGTRANS_DAYNAMES3', ''),
                    this.translateText('app_PNGTRANS_DAYNAMES4', ''),
                    this.translateText('app_PNGTRANS_DAYNAMES5', ''),
                    this.translateText('app_PNGTRANS_DAYNAMES6', ''),
                    this.translateText('app_PNGTRANS_DAYNAMES7', '') ],
                dayNamesShort: [
                    this.translateText('app_PNGTRANS_DAYNAMESSHORT1', ''),
                    this.translateText('app_PNGTRANS_DAYNAMESSHORT2', ''),
                    this.translateText('app_PNGTRANS_DAYNAMESSHORT3', ''),
                    this.translateText('app_PNGTRANS_DAYNAMESSHORT4', ''),
                    this.translateText('app_PNGTRANS_DAYNAMESSHORT5', ''),
                    this.translateText('app_PNGTRANS_DAYNAMESSHORT6', ''),
                    this.translateText('app_PNGTRANS_DAYNAMESSHORT7', ''), ],
                dayNamesMin: [
                    this.translateText('app_PNGTRANS_DAYNAMESMIN1', ''),
                    this.translateText('app_PNGTRANS_DAYNAMESMIN2', ''),
                    this.translateText('app_PNGTRANS_DAYNAMESMIN3', ''),
                    this.translateText('app_PNGTRANS_DAYNAMESMIN4', ''),
                    this.translateText('app_PNGTRANS_DAYNAMESMIN5', ''),
                    this.translateText('app_PNGTRANS_DAYNAMESMIN6', ''),
                    this.translateText('app_PNGTRANS_DAYNAMESMIN7', ''), ],
                monthNames: [
                    this.translateText('app_PNGTRANS_MONTHNAMES1', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMES2', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMES3', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMES4', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMES5', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMES6', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMES7', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMES8', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMES9', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMES10', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMES11', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMES12', ''), ],
                monthNamesShort: [
                    this.translateText('app_PNGTRANS_MONTHNAMESSHORT1', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMESSHORT2', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMESSHORT3', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMESSHORT4', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMESSHORT5', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMESSHORT6', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMESSHORT7', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMESSHORT8', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMESSHORT9', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMESSHORT10', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMESSHORT11', ''),
                    this.translateText('app_PNGTRANS_MONTHNAMESSHORT12', ''), ],
                today: this.translateText('app_PNGTRANS_TODAY', ''),
                weekHeader: this.translateText('app_PNGTRANS_WEEKHEADER', '')
            };
        }
        return translations;
    }

    /**
     * Get the translated texts from the backend.
     * Returns a promise with true if the load is succesful
     */
    private getTranslationsFromBackEnd(): Promise<boolean> {
        return new Promise<boolean>( (resolve, reject) => {
            this.appGlobalInfo.loadAppConfiguration().then( () => {
                this.httpClient.get(
                    `${this.appGlobalInfo.APPCONSTANTS.BASE_URL}/api/ApplicationResources?lang=${this.currentLanguage}`).
                    toPromise().then((res) => {
                        this.translatedTexts = res;
                        resolve(true);
                    }).catch( (msg) => {
                        reject(false);
                    });
            }).catch( () => {
                reject(false);
            });
        });
    }

    /**
     * Returns the translation of the recdeived text
     * @param key Text key. Identify the text element
     * @param defaultText Default text, if key is not found
     */
    public translateText(key: string, defaultText: string): string {
        let text = defaultText;
        if (key && this.translatedTexts) {
            const values = this.translatedTexts[key];
            if (values) {
                text = values;
            }
        }
        return text;
    }

    /**
     * Translate the text with parameters. Sustitutes the wildcards by the parameters
     * @param key Text key. Identify the text element
     * @param defaultText Default text, if key is not found. It must contain the wildcards %1, %2 ...
     * @param args Parameters to sustitute the wildcards
     */
    public translateTextWithParams(key: string, defaultText: string, ...args: string[]): string {
        let text = this.translateText(key, defaultText);

        let i = 1;
        for (const param of args) {
            text = text.replace('%' + i, param);
            i++;
        }
        return text;
    }

    /**
     * Returns and Json object containing the default fixed texts
     */
    private getDefaultTranslatedTexts(): any {
        return {
            app_TITLE: 'MFE Usuarios',
            app_LANGUAGES: 'Idiomas',
            app_NOACCESS: 'Sin acceso',
            app_CHGPWD_TITLE: 'Cambiar contraseña',
            app_CHGPWD_OLD: 'Contraseña actual',
            app_CHGPWD_NEW: 'Nueva contraseña',
            app_CHGPWD_CONFIRM: 'Confirme contraseña',
            app_WVTITLE: 'Atención! Está utilizando una versión obsoleta',
            app_WVTEXT1: 'INFORMACIÓN - Disponible nueva versión',
            app_WVTEXT2: 'Por favor, fuerce la actualización de la versión presionando CTRL + F5',
            app_WVBOTTOM: 'Esto ocurre porque su navegador almacena copias de las páginas web visitadas recientemente para reducir el uso de ancho de banda, minimizar la latencia y el tiempo de respuesta',
            app_WVTITLEAPP: 'Actualice la versión de la aplicación',
            app_WVTEXT1APP: 'Pulse en el botón ‘Descargar’. La nueva versión se descargará en la carpeta ‘Downloads’',
            app_WVTEXT2APP: 'Descargar',
            app_WVBOTTOMAPP: 'No es necesario desinstalar su versión actual para actualizarla',
            app_PREF_MENUPREF: 'Preferencias',
            app_PREF_MENUSAVE: 'Guardar',
            app_PREF_TITLE: 'Preferencias',
            app_PREF_COLHEADER: 'Alias',
            app_PREF_COLVISIBLE: '',
            app_ERROR_TITLE: 'Aviso',
            app_PRGBAR_BTNSTOP: 'Detener',
            app_PIU_BTNSELECT: 'Seleccionar',
            app_PIU_LOGCLASS: 'Log de servicios',
            app_PIU_LOGINSTANCE: 'Detalle de servicios',
            app_PIU_REFRESHBTN: 'Actualizar',
            app_PIU_EXPEXCELBTN: 'Exportar a Excel',
            app_PIU_EXPALLEXCELBTN: 'Exportar todo a Excel',
            app_PIU_EXPEXCELPRGMSG: 'Exportando...',
            app_SIU_BTNDELETE: 'Eliminar',
            app_SIU_BTNADD: 'Añadir',
            app_SIU_BTNOK: 'Aceptar',
            app_SIU_BTNCANCEL: 'Cancelar',
            app_SIU_BTNSAVE: 'Guardar',
            app_SIU_BTNCLEAR: 'Borrar',
            app_SIU_BTNPREVIOUS: 'Anterior',
            app_SIU_BTNNEXT: 'Siguiente',
            app_SIU_BTNPREVIOUSFIRST: 'Cancelar',
            app_SIU_BTNNEXTLAST: 'Ok',
            app_FLD_ERRORMANDATORY: 'El campo %1 es obligatorio',
            app_FLD_ERRORNAT: 'El campo %1 debe ser un número entero mayor o igual a cero',
            app_FLD_ERRORINT: 'El campo %1 debe ser un número entero',
            app_FLD_ERRORREAL: 'El campo %1 debe ser un número real',
            app_FLD_ERRORNOTEXIST: '%1 no existe',
            app_FLD_ERRORPWDCONF: 'El campo %1 no coincide con la confirmación',
            app_FLD_NUMBERSELECTED: '%1 seleccionados',
            app_INSTANCELOG: 'Detalle de servicios',
            app_GLOBALLOG: 'Log Global',
            app_CLASSLOG: 'Log de servicios',
            app_CLSLOG_TITLE: 'Log de servicios',
            app_CLSLOG_VARFROM: 'Desde',
            app_CLSLOG_VARTO: 'Hasta',
            app_CLSLOG_COLTIMESTAMP: 'Timestamp',
            app_CLSLOG_COLUSER: 'Usuario',
            app_CLSLOG_COLCLASS: 'Clase',
            app_CLSLOG_COLSRV: 'Servicio',
            app_CLSLOG_COLINSTANCE: 'Instancia',
            app_PNGTRANS_STARTSWITH: 'Empieza por',
            app_PNGTRANS_CONTAINS: 'Contiene',
            app_PNGTRANS_NOTCONTAINS: 'No contiene',
            app_PNGTRANS_ENDSWITH: 'Termina con',
            app_PNGTRANS_EQUALS: 'Igual',
            app_PNGTRANS_NOTEQUALS: 'Distinto',
            app_PNGTRANS_NOFILTER: 'No filtro',
            app_PNGTRANS_LT: 'Menor a',
            app_PNGTRANS_LTE: 'Menor o igual a',
            app_PNGTRANS_GT: 'Mayor a',
            app_PNGTRANS_GTE: 'mayor o igual a',
            app_PNGTRANS_IS: 'Es',
            app_PNGTRANS_ISNOT: 'No es',
            app_PNGTRANS_BEFORE: 'Antes',
            app_PNGTRANS_AFTER: 'Despues',
            app_PNGTRANS_CLEAR: 'Limpiar',
            app_PNGTRANS_APPLY: 'Aplicar',
            app_PNGTRANS_MATCHALL: 'Coincidir todos',
            app_PNGTRANS_MATCHANY: 'Coincidir alguno',
            app_PNGTRANS_ADDRULE: 'Añadir regla',
            app_PNGTRANS_REMOVERULE: 'Quitar regla',
            app_PNGTRANS_ACCEPT: 'Sí',
            app_PNGTRANS_REJECT: 'No',
            app_PNGTRANS_CHOOSE: 'Elegir',
            app_PNGTRANS_UPLOAD: 'Upload',
            app_PNGTRANS_CANCEL: 'Cancelar',
            app_PNGTRANS_DAYNAMES1: 'domingo',
            app_PNGTRANS_DAYNAMES2: 'lunes',
            app_PNGTRANS_DAYNAMES3: 'martes',
            app_PNGTRANS_DAYNAMES4: 'miércoles',
            app_PNGTRANS_DAYNAMES5: 'jueves',
            app_PNGTRANS_DAYNAMES6: 'viernes',
            app_PNGTRANS_DAYNAMES7: 'sábado',
            app_PNGTRANS_DAYNAMESSHORT1: 'dom',
            app_PNGTRANS_DAYNAMESSHORT2: 'lun',
            app_PNGTRANS_DAYNAMESSHORT3: 'mar',
            app_PNGTRANS_DAYNAMESSHORT4: 'mié',
            app_PNGTRANS_DAYNAMESSHORT5: 'jue',
            app_PNGTRANS_DAYNAMESSHORT6: 'vie',
            app_PNGTRANS_DAYNAMESSHORT7: 'sáb',
            app_PNGTRANS_DAYNAMESMIN1: 'D',
            app_PNGTRANS_DAYNAMESMIN2: 'L',
            app_PNGTRANS_DAYNAMESMIN3: 'M',
            app_PNGTRANS_DAYNAMESMIN4: 'X',
            app_PNGTRANS_DAYNAMESMIN5: 'J',
            app_PNGTRANS_DAYNAMESMIN6: 'V',
            app_PNGTRANS_DAYNAMESMIN7: 'S',
            app_PNGTRANS_MONTHNAMES1: 'enero',
            app_PNGTRANS_MONTHNAMES2: 'febrero',
            app_PNGTRANS_MONTHNAMES3: 'marzo',
            app_PNGTRANS_MONTHNAMES4: 'abril',
            app_PNGTRANS_MONTHNAMES5: 'mayo',
            app_PNGTRANS_MONTHNAMES6: 'junio',
            app_PNGTRANS_MONTHNAMES7: 'julio',
            app_PNGTRANS_MONTHNAMES8: 'agosto',
            app_PNGTRANS_MONTHNAMES9: 'septiembre',
            app_PNGTRANS_MONTHNAMES10: 'octubre',
            app_PNGTRANS_MONTHNAMES11: 'noviembre',
            app_PNGTRANS_MONTHNAMES12: 'diciembre',
            app_PNGTRANS_MONTHNAMESSHORT1: 'ene',
            app_PNGTRANS_MONTHNAMESSHORT2: 'feb',
            app_PNGTRANS_MONTHNAMESSHORT3: 'mar',
            app_PNGTRANS_MONTHNAMESSHORT4: 'abr',
            app_PNGTRANS_MONTHNAMESSHORT5: 'may',
            app_PNGTRANS_MONTHNAMESSHORT6: 'jun',
            app_PNGTRANS_MONTHNAMESSHORT7: 'jul',
            app_PNGTRANS_MONTHNAMESSHORT8: 'ago',
            app_PNGTRANS_MONTHNAMESSHORT9: 'sep',
            app_PNGTRANS_MONTHNAMESSHORT10: 'oct',
            app_PNGTRANS_MONTHNAMESSHORT11: 'nov',
            app_PNGTRANS_MONTHNAMESSHORT12: 'dic',
            app_PNGTRANS_TODAY: 'Hoy',
            app_PNGTRANS_WEEKHEADER: 'Sem',
            app_BACK: 'Volver',
            app_CANCEL: 'Cancelar',
            app_CLOSE: 'Cerrar',
            app_DESELECTALL: 'Desmarcar',
            app_HOME: 'Inicio',
            app_LOGIN: 'Login',
            app_LOGOUT: 'Salir',
            app_LOGINERROR: 'Acceso no permitido',
            app_LOGINERRORCLOSESESSION: 'Acceso no permitido. La cuenta de usuario seleccionada no tiene acceso a la aplicación. ¿Desea cerrar la sesión?',
            app_LOGIN_TITLE: 'Login',
            app_LOGIN_SELPROFILE: 'Seleccione perfil',
            app_LOGIN_CHGPASSTEXT: '¿Olvidó la contraseña? Click aquí para recuperarla',
            app_OK: 'Ok',
            app_SELECT: 'Seleccionar',
            app_BACKENDERROR_CET1: 'El proceso \'%2\' lanzado a las %1 esta todavía en ejecución.' +
                ' Puede continuar haciendo otras consultas o procesos mientras termina.' +
                ' Por favor, compruebe el resultado en unos minutos y no vuelva a lanzarlo.',
            app_BACKENDERROR_CET2: 'Si tiene cualquier pregunta, por favor contacte con el Administrador del sistema que le ayudará encantado',
            app_BACKENDUNKNOWNERROR: 'En estos momentos el servicio no está disponible. ' +
                                     'Pruebe de nuevo en unos minutos. Si el problema persiste, contacte con el administrador'
        };

    }

    /**
     * Translate the error to the user language
     * @param errorInfo Error information
     */
    public translateError(errorInfo: ErrorInformation): string {
        return this.translateTextWithParamList(errorInfo.messageId, errorInfo.message, errorInfo.messageParts);
    }

    /**
     * Translate to the user language with parameters
     * @param key Id of the message
     * @param defaultText Default text
     * @param args Parameters
     */
    public translateTextWithParamList(key: string, defaultText: string, args: string[]): string {
        let text = this.translateText(key, defaultText);

        if (args) {
            let i = 1;
            for (const param of args) {
                text = text.replace('%' + i, param);
                i++;
            }
        }
        return text;
    }
}
