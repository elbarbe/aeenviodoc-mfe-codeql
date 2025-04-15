import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router, Navigation, NavigationExtras } from '@angular/router';
import { Subject } from 'rxjs';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { ExchangeInfo } from './app.exchangeinfo';
import { OidBuilder } from './oidBuilder';
import { LanguageMng } from './languageMng';
import { LogicError, ErrorInformation, QueryResponse, RequestError } from './answerRequestInformation';
import { environment } from 'src/environments/environment';

import { ModelConstants } from './model.constants';

@Injectable({providedIn: 'root'})
export class Util {

    /** Error messages observable */
    public errorMessagesAction: Subject<string> = new Subject<string>();
    /** Grid preferences observable, action */
    public gridPreferencesAction: Subject<any[]> = new Subject<any[]>();
    /** Grid preferences observable, response */
    public gridPreferencesResponse: Subject<any> = new Subject<any>();
    /** Interaction unit in modal observable, action */
    public modalForIUAction: Subject<{selector: string, title: string}> = new Subject<{selector: string, title: string}>();
    /** Interaction unit in modal observable, response */
    public modalForIUResponse: Subject<{result: number}> = new Subject<{result: number}>();
    /** Progess bar observable */
    public progessBarAction: Subject<{title: string, value: number, secondsRemaining: number}> =
        new Subject<{title: string, value: number, secondsRemaining: number}>();
    /** Progess bar cancel observable */
    public progessBarCancelResponse: Subject<void> = new Subject();
    /** Toast messages  observable */
    public toastMessagesAction: Subject<any> = new Subject<any>();

    constructor(
        private readonly router: Router,
        private readonly httpClient: HttpClient,
        private readonly appGlobalInfo: AppGlobalInfo,
        public oidBuilder: OidBuilder,
        private readonly datePipe: DatePipe,
        private readonly sanitizer: DomSanitizer,
        private confirmationService: ConfirmationService,
        private langMng: LanguageMng
    ) { }
    /**
     * Returns the router current navigation
     */
    public getCurrentNavigation(): Navigation | null {
        if (this.router) {
            return this.router.getCurrentNavigation();
        }
        return null;
    }

    /**
     * Format any value to string using default formats
     * @param value Value to format
     */
    public valueToString(value: any): string {
        let valueString = '';
        if (!this.isNull(value)) {
            valueString = value.toString();
            if ((valueString.match(/-/g) || []).length === 2) {
                const valueDate = this.getDate(valueString);
                if (valueDate) {
                    valueString = valueDate.toLocaleDateString();
                }
            }
        }
        return valueString;
    }

    /**
     * Apply the default format based on the datatype
     * @param value Value
     * @param datatype Datatype
     */
    public applyDefaultFormat(value: any, datatype: string): string {
        let valueString = '';
        let dateValue: Date | null = null;
        if (!value) {
            return valueString;
        }
        valueString = value;
        if (datatype === 'real') {
            const valueNumber = Number.parseFloat(value);
            return valueNumber.toLocaleString(this.langMng.getLanguageId(), { useGrouping: false });
        }
        if (datatype === 'date') {
            dateValue = this.getDate(value);
            if (dateValue) {
                valueString = dateValue.toLocaleDateString(this.langMng.getLanguageId());
            }
        }
        if (datatype === 'datetime') {
            dateValue = this.getDate(value);
            if (dateValue) {
                valueString = dateValue.toLocaleDateString(this.langMng.getLanguageId())
                + ' ' + dateValue.toLocaleTimeString(this.langMng.getLanguageId());
            }
        }
        if (datatype === 'time') {
            dateValue = this.getDate(value);
            if (dateValue) {
                valueString = dateValue.toLocaleTimeString(this.langMng.getLanguageId());
            }
        }
        return valueString;
    }


    /**
     * Format a date to be assigned to the control
     * @param date Date
     */
    public formatDate(date: any): string {
        let dateInFormat: string | null = '';
        if (date) {
            try {
                const dateType = new Date(date);
                dateInFormat = this.datePipe.transform(dateType, 'yyyy-MM-dd');
            } catch (e) {
                dateInFormat = '';
            }
        }
        if (dateInFormat) {
            return dateInFormat.toString();
        }
        return '';
    }

    /**
     * If the value is a date, return a Date value
     * @param date Possible date value
     */
    public getDate(date: any): Date | null {
        let dateType: Date | null = null;
        if (date) {
            try {
                dateType = new Date(date);
                if (isNaN(dateType.valueOf())) {
                    dateType = null;
                }
            } catch (e) {
                dateType = null;
            }
        }
        return dateType;
    }

    public getBool(value: any): boolean {
        let valueTyped = true;
        if (!this.isNull(value)) {
            if (value.toString().toUpperCase() !== 'FALSE') {
                valueTyped = true;
            } else {
                valueTyped = false;
            }
        }
        return valueTyped;
    }

    public getInt(value: any): number {
        let valueTyped = 0;
        if (!this.isNull(value)) {
            valueTyped = parseInt(value, 10);
            if (isNaN(valueTyped)) {
                return 0;
            }
        }
        return valueTyped;
    }

    public getReal(value: any): number {
        let valueTyped = 0;
        if (!this.isNull(value)) {
            valueTyped = parseFloat(value);
            if (isNaN(valueTyped)) {
                return 0;
            }
        }
        return valueTyped;
    }

    public isNull(value: any): boolean {
        return value === null || value === undefined || value === '' || value.length === 0 || Number.isNaN(value);
    }

    /**
     * Compare two values
     * @param value1 Value 1
     * @param value2 Value 2
     */
    public valueEquals(value1: any, value2: any): boolean {
        if (value1 && value2 && typeof value1 === 'object' && typeof value2 === 'object') {
            return value1.toString() === value2.toString();
        }
        return value1 === value2;
    }

    /**
     * Like operator
     * @param strData String data
     * @param strLikeExpresion Text to search
     */
    public like(strData: string, strLikeExpresion: string): boolean {

        if (this.isNull(strData) && this.isNull(strLikeExpresion)) {
            return true;
        }

        if (this.isNull(strData) || this.isNull(strLikeExpresion)) {
            return false;
        }

        if (strLikeExpresion.indexOf('%') < 0) {
            return strData.toUpperCase().startsWith(strLikeExpresion.toUpperCase());
        }

        let likeExpresion = strLikeExpresion.replace(new RegExp('[.]', 'g'), '\\.');
        likeExpresion = likeExpresion.replace(new RegExp('[*]', 'g'), '\\*');
        likeExpresion = likeExpresion.replace(new RegExp('[%]', 'g'), '.*');
        likeExpresion = '^' + likeExpresion + '$';
        // likeExpresion = '\\A' + likeExpresion;


        const regExp = new RegExp(likeExpresion, 'i');
        return regExp.test(strData);
    }

    /**
     * Compare two Oids
     * @param oid1 First oid value
     * @param oid2 Second oid value
     */
    public oidEquals(oid1: any, oid2: any): boolean {
        if (!oid1 || !oid2) {
            return false;
        }
        if ( Object.keys(oid1).length !== Object.keys(oid2).length) {
            return false;
        }
        for (const key of Object.keys(oid1)) {
            if (oid1[key] !== oid2[key]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Translate the error information to a text in the user language
     * @param errorInfo Error information
     */
    public translateError(errorInfo: ErrorInformation): string {
        return this.langMng.translateTextWithParamList(errorInfo.messageId, errorInfo.message, errorInfo.messageParts);
    }

    /**
     * Navigate to the wrong version page
     */
    public navigateToWrongVersionPage() {
        this.appGlobalInfo.wrongVersionError = true;
        this.navigateToNavKey('/wrongversion', undefined);
    }

    /**
     * Navigate to component using the class name and UI name
     * @param classNav Class name
     * @param iuNav Interaction unit id
     */
    public navigateToClassIu(classNav: string, iuNav: string) {
        let navKey = '';
        const classElement = this.appGlobalInfo.APPCONSTANTS.NAVCONSTANTS.find((navCte: any) => navCte.className.toUpperCase() === classNav.toUpperCase());
        if (classElement) {
            const uiConstant = classElement.ius.find((iuCte: any) => iuCte.name.toUpperCase() === iuNav.toUpperCase());
            if (uiConstant) {
                if (uiConstant.navKey === '_GENERICSIU') {
                    navKey = 'genericsiu';
                } else {
                    navKey = `${classElement.navKey}/${uiConstant.navKey}`;
                }
            }
        }

        if (navKey && navKey !== '') {
            // Show the waiting image
            this.navigateToNavKey(navKey, undefined);
        }
    }

    /**
     * Navigate to the specified key and extras
     * Common point to all navigations
     * @param navKey Navigation key
     * @param navExtras Navigation extras
     */
    private navigateToNavKey(navKey: string, navExtras: NavigationExtras | undefined): void {
        // Close IU modal popup
        this.processCancelInPopup(false);

        if (navKey) {
            let finalNavKey = environment.prefix + navKey;
            if (!navKey.startsWith('/')) {
                finalNavKey = environment.prefix + '/' + navKey;
            }
            if (!finalNavKey.startsWith('/')) {
                finalNavKey = '/' + finalNavKey;
            }
            if (finalNavKey === this.router.url && !finalNavKey.endsWith('/noaccess')) {
                this.router.navigate(['/noaccess'], navExtras).then( () => {
                    this.router.navigate([finalNavKey], navExtras);
                }).catch( () => {
                    this.router.navigate([finalNavKey], navExtras);
                });
            } else {
                this.router.navigate([finalNavKey], navExtras);
            }
        } else {
            this.router.navigate(['/' + environment.prefix]);
        }
    }

    /**
     * Navigate to main scenario
     */
    public navigateToMain() {
        this.appGlobalInfo.appExchangeInfo.clear();
        this.navigateToNavKey('', undefined);
    }

    /**
     * Navigate to the no access page
     */
    public navigateToNoAccessPage() {
        this.navigateToNavKey('/noaccess', undefined);
    }

    /**
     * Navigate to the login page
     * @param navExtras Extras
     */
    public navigateToLogin(navExtras: NavigationExtras | undefined) {
        this.navigateToNavKey('/login', navExtras);
    }

    /**
     * Navigate to the previous scenario
     */
    public navigateToPrevious(lastExecutionSuccess = false): void {
        let exchInfo = this.appGlobalInfo.appExchangeInfo.get();
        if (exchInfo?.exchangeType === 'ComeBack') {
            exchInfo = exchInfo.originalContext.exchangeInfo;
        }
        if (exchInfo) {
            if (this.processCancelInPopup(lastExecutionSuccess)) {
                // Remove the top element in the context stack
                if (exchInfo.comeBackContext?.exchangeInfo) {
                    this.appGlobalInfo.appExchangeInfo.save(exchInfo.comeBackContext.exchangeInfo);
                }
            } else if ( exchInfo.comeBackContext) {
                this.navigateComeBack(exchInfo.comeBackContext);
            } else {
                this.navigateToMain();
            }
        } else {
            this.navigateToMain();
        }
    }

    /**
     * Navigate to the received URL
     * @param targetUrl URL
     */
    public navigateByUrl(targetUrl: string) {
        this.router.navigateByUrl(targetUrl);
    }

    /**
     * Navigate using the exchange information
     * @param exchangeInfo Specify the navigation target
     */
    public navigateTo(exchangeInfo: ExchangeInfo): void {
        if (exchangeInfo) {
            // Save the exchange information
            this.appGlobalInfo.appExchangeInfo.save(exchangeInfo);
            switch (exchangeInfo.exchangeType) {
                case 'PrintFilter':
                    this.navigateToFilterClassIu(exchangeInfo);
                    break;
                case 'PrintInstance':
                    this.generateInstanceReportFromExchInfo(exchangeInfo);
                    break;
                case 'PrintPopulation':
                    this.generatePopulationReportFromExchInfo(exchangeInfo);
                    break;
                default:
                    this.navigateToClassIu(exchangeInfo.targetClassName, exchangeInfo.targetIUName);
                    break;
            }
        } else {
            this.navigateToMain();
        }
    }

    /**
     * Manages the navigation to a filter interaction unit.
     * The exchangeType must be 'PrintFilter'
     * @param exchangeInfo Exchange information
     */
    private navigateToFilterClassIu(exchangeInfo: ExchangeInfo): void {
        if (exchangeInfo && exchangeInfo.exchangeType === 'PrintFilter') {
            if (exchangeInfo.targetIUName) {
                this.navigateToClassIu(exchangeInfo.targetClassName, exchangeInfo.targetIUName);
            } else {
                // Special case, call population report without filter
                const navFilters = [];
                if (exchangeInfo.navigationalFilterIdentity.length > 0) {
                    const navFilter: {name: string[]} = {name: exchangeInfo.navigationalFilterIdentity};
                    navFilters.push(navFilter);
                }
                this.generatePopulationReport(exchangeInfo.targetClassName, exchangeInfo.printUIName, navFilters, []).then((errorMsg) => {
                    if (errorMsg) {
                        this.addErrorMessage(errorMsg);
                    }
                }).catch((errorMsg) => {
                    this.addErrorMessage(errorMsg);
                });
            }
        }
    }

    /**
     * Creates an exchange information from conditional navigation
     * @param targetClassName Target class name
     * @param targetIUName Target interaction unit name
     * @param previousContext Previous context
     * @param comeBackContext Comeback context
     */
    public createExchangeInfoFromCondNavigation(targetClassName: string, targetIUName: string, previousContext: any,
                                                comeBackContext: any): ExchangeInfo {
        // Create the exchange information from conditional navigation
        return this.createBasicExchangeInfo(targetClassName, targetIUName, previousContext, comeBackContext, 'Action');
    }

    /**
     * Navigates from an action element
     * @param targetClassName Target class name
     * @param targetIUName Target interaction unit name
     * @param previousContext Previous context
     * @param comeBackContext Comeback context
     * @param selectedOids Selected Oids in previous scenario
     * @param selectedOidsClassName Selected Oids class name
     * @param navigationalFilterIdentity Navigational filter identity
     */
    public navigateFromAction(targetClassName: string, targetIUName: string, previousContext: any, comeBackContext: any,
                              selectedOids: any, selectedOidsClassName: string, navigationalFilterIdentity: string) {

        this.saveExchangeInfoAction(targetClassName, targetIUName, previousContext, comeBackContext,
            selectedOids, selectedOidsClassName, navigationalFilterIdentity);
        // Compose the path to the view and Navigate
        this.navigateToClassIu(targetClassName, targetIUName);
    }

    /**
     * Save an instnace of exchange info action
     * @param targetClassName Target class name
     * @param targetIUName Target interaction unit name
     * @param previousContext Previous context
     * @param comeBackContext Comeback context
     * @param selectedOids Selected Oids in previous scenario
     * @param selectedOidsClassName Selected Oids class name
     * @param navigationalFilterIdentity Navigational filter identity
     */
    public saveExchangeInfoAction(targetClassName: string, targetIUName: string, previousContext: any, comeBackContext: any,
                                  selectedOids: any, selectedOidsClassName: string, navigationalFilterIdentity: string) {
        // Create the exchange information
        const exchInfo = new ExchangeInfo();
        exchInfo.exchangeType = 'Action';
        exchInfo.targetClassName = targetClassName;
        exchInfo.targetIUName = targetIUName;
        exchInfo.previous = previousContext;
        exchInfo.comeBackContext = comeBackContext;
        exchInfo.selectedOids = selectedOids;
        exchInfo.selectedOidsClassName = selectedOidsClassName;
        // Save the exchange information
        this.appGlobalInfo.appExchangeInfo.save(exchInfo);
    }

    /**
     * Creates an navigation exchange information from master to detail
     * @param targetClassName Target class name
     * @param previousContext Previous context
     * @param comeBackContext Comeback context
     * @param rolePath Role path navigation
     * @param selectedOids Selected Oids in previous scenario
     * @param selectedOidsClassName Selected Oids class name
     * @param navigationalFilterIdentity Navigational filter identity
     */
    public createExchangeInfoNavigationFromMasterToDetail(targetClassName: string, previousContext: any, comeBackContext: any,
                                                          rolePath: string, selectedOids: any, selectedOidsClassName: string,
                                                          navigationalFilterIdentity: string): ExchangeInfo {
        // Create the exchange information
        const exchInfo = new ExchangeInfo();
        exchInfo.exchangeType = 'Navigation';
        exchInfo.targetClassName = targetClassName;
        exchInfo.targetIUName = '';
        exchInfo.previous = previousContext;
        exchInfo.comeBackContext = comeBackContext;
        exchInfo.selectedOids = selectedOids;
        exchInfo.selectedOidsClassName = selectedOidsClassName;
        exchInfo.rolePath = rolePath;
        if (navigationalFilterIdentity && navigationalFilterIdentity.length > 0) {
            exchInfo.navigationalFilterIdentity = [navigationalFilterIdentity];
            if (selectedOids && selectedOids.length === 1) {
                exchInfo.navigationalFilterVariables = [{ name: 'SelectedObject', value: JSON.stringify(selectedOids[0]) }];
            }
        } else {
            exchInfo.navigationalFilterIdentity = [];
        }

        return exchInfo;
    }

    /**
     * Navigates from a navigation item
     * @param targetClassName Target class name
     * @param targetIUName Target interaction unit name
     * @param previousContext Previous context
     * @param comeBackContext Comeback context
     * @param rolePath Role path navigation
     * @param selectedOids Selected Oids in previous scenario
     * @param selectedOidsClassName Selected Oids class name
     * @param navigationalFilterIdentity Navigational filter identity
     */
    public navigateFromNavigation(targetClassName: string, targetIUName: string, previousContext: any, comeBackContext: any,
                                  rolePath: string, selectedOids: any, selectedOidsClassName: string, navigationalFilterIdentity: string) {

        // Create and save the exchange information
        const exchInfo = new ExchangeInfo();
        exchInfo.exchangeType = 'Navigation';
        exchInfo.targetClassName = targetClassName;
        exchInfo.targetIUName = targetIUName;
        exchInfo.previous = previousContext;
        exchInfo.comeBackContext = comeBackContext;
        exchInfo.selectedOids = selectedOids;
        exchInfo.selectedOidsClassName = selectedOidsClassName;
        exchInfo.rolePath = rolePath;
        if (navigationalFilterIdentity && navigationalFilterIdentity.length > 0) {
            exchInfo.navigationalFilterIdentity = [navigationalFilterIdentity];
            if (selectedOids && selectedOids.length === 1) {
                exchInfo.navigationalFilterVariables = [{ name: 'SelectedObject', value: JSON.stringify(selectedOids[0]) }];
            }
        } else {
            exchInfo.navigationalFilterIdentity = [];
        }
        // Save the exchange information
        this.appGlobalInfo.appExchangeInfo.save(exchInfo);

        // Compose the path to the view and Navigate
        this.navigateToClassIu(targetClassName, targetIUName);
    }

    /**
     * Returns to the previous scenario
     * @param originalContext Scenario original context
     */
    public navigateComeBack(originalContext: any) {

        if (originalContext) {
            // Use the original exchange info
            const originalExchInfo = originalContext.exchangeInfo;
            // Create the exchange information
            const exchInfo = new ExchangeInfo();
            exchInfo.exchangeType = 'ComeBack';
            exchInfo.targetClassName = originalExchInfo.targetClassName;
            exchInfo.targetIUName = originalExchInfo.targetIUName;
            exchInfo.originalContext = originalContext;

            // Save the exchange information
            this.appGlobalInfo.appExchangeInfo.save(exchInfo);

            // Compose the path to the view and Navigate
            this.navigateToClassIu(exchInfo.targetClassName, exchInfo.targetIUName);
        } else {
            this.navigateToMain();
        }
    }

    /**
     * Navigate to instances selection scenario
     * @param exchInfo Exchange information
     */
    public navigateSelectionForward(exchInfo: ExchangeInfo): void {
        // Save the exchange information
        this.appGlobalInfo.appExchangeInfo.save(exchInfo);

        // Compose the path to the view and Navigate
        this.navigateToClassIu(exchInfo.targetClassName, exchInfo.targetIUName);
    }

    /**
     * Navigate to the previous scenario after instance selection
     * @param piuExchInfo Population scenario exchange information
     * @param selectedOidsClassName Selected Oids class name
     * @param selectedOids Selected Oids
     */
    public navigateSelectionBackward(piuExchInfo: ExchangeInfo, selectedOidsClassName: string,  selectedOids: any) {
        // Create the exchange information
        const comeBackCtx = piuExchInfo.comeBackContext;
        const exchInfo = new ExchangeInfo();
        exchInfo.exchangeType = 'SelectionBackward';
        exchInfo.targetClassName = comeBackCtx.exchangeInfo.targetClassName;
        exchInfo.targetIUName = comeBackCtx.exchangeInfo.targetIUName;
        exchInfo.previous = comeBackCtx;
        exchInfo.selectedOids = selectedOids;
        exchInfo.selectedOidsClassName = selectedOidsClassName;
        exchInfo.originServiceName = piuExchInfo.originServiceName;
        exchInfo.originArgumentName = piuExchInfo.originArgumentName;
        exchInfo.originIUIdentification = piuExchInfo.originIUIdentification;

        // Save the exchange information
        this.appGlobalInfo.appExchangeInfo.save(exchInfo);

        // Compose the path to the view and Navigate
        this.navigateToClassIu(exchInfo.targetClassName, exchInfo.targetIUName);
    }

    /**
     * Navigate to the conditional navigation scenario
     */
    public navigateToConditionalScenario(): void {
        this.navigateToNavKey('conditionalnavigation', undefined);
    }

    /**
     * Navigate to the outbound arguments scenario
     * @param targetClassName Target class name
     * @param targetIUName Target UI name
     * @param previousContext Previous context
     * @param comeBackContext Comeback context
     * @param serviceRequest Service request
     * @param serviceResponse Service response
     */
    public navigateOutboundArgumentsScenario(targetClassName: string, targetIUName: string, previousContext: any,
                                             comeBackContext: any, serviceRequest: any, serviceResponse: any) {
        // Create the exchange information
        const exchInfo = new ExchangeInfo();
        exchInfo.exchangeType = 'OutboundArguments';
        exchInfo.targetClassName = targetClassName;
        exchInfo.targetIUName = targetIUName;
        exchInfo.previous = previousContext;
        exchInfo.comeBackContext = comeBackContext;
        exchInfo.customData.request = serviceRequest;
        exchInfo.customData.response = serviceResponse;

        // Save the exchange information
        this.appGlobalInfo.appExchangeInfo.save(exchInfo);

        // Compose the path to the view and Navigate
        this.navigateToClassIu(targetClassName, targetIUName);
    }

    public navigateToClassServiceLog(className: string, comeBackContext: any): void {
        const exchInfo = new ExchangeInfo();
        exchInfo.exchangeType = 'ClassServiceLog';
        exchInfo.targetClassName = className;
        exchInfo.comeBackContext = comeBackContext;

        // Set the exchange information
        this.appGlobalInfo.appExchangeInfo.setServicesLogExchInfo(exchInfo);
        // Navigate to class service log scenario
        this.router.navigate(['/classServiceLog']);
    }

    public navigateToInstanceServiceLog(className: string, instanceOID: any, comeBackContext: any): void {
        const exchInfo = new ExchangeInfo();
        exchInfo.exchangeType = 'ClassServiceLog';
        exchInfo.targetClassName = className;
        exchInfo.selectedOids = instanceOID;
        exchInfo.comeBackContext = comeBackContext;

        // Set the exchange information
        this.appGlobalInfo.appExchangeInfo.setServicesLogExchInfo(exchInfo);
        // Navigate to class service log scenario
        this.router.navigate(['/classServiceLog']);
    }

    /**
     * Process the cancel button in the modal popup for interaction units
     * @param lastExecutionSuccess Success in the last execution or not, in order to refresh the data
     */
    public processCancelInPopup(lastExecutionSuccess = false): boolean {
        let returnvalue = false;
        if (this.modalForIUResponse.observers.length > 1) {
            const eventResult = {result: 0};
            if (!lastExecutionSuccess) {
                eventResult.result = 1;
            }
            this.modalForIUResponse.next(eventResult);
            returnvalue = true;
        }
        return returnvalue;
    }



    /**
     * Saves a file using the data in base 64 format
     * @param base64Data Data file in base 64 format
     * @param fileName Filename
     */
    public saveFileFromBase64(base64Data: string, fileName: string): void {
        if (base64Data) {
            const binaryString = window.atob(base64Data);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            // Create a blob variable
            const blob = new Blob([bytes], { type: 'application/octet-stream' });

            this.saveFile(blob, fileName);
        }
    }

    /**
     * StoresSave the data using the file name in the file system
     * @param fileData Data
     * @param fileName File name
     */
    public saveFile(fileData: Blob, fileName: string): void {
        const nav: any = navigator;
        if (nav.msSaveOrOpenBlob) {
            nav.msSaveOrOpenBlob(fileData, fileName);
        } else {
            // Creates a temporal anchor to download the file
            const a = document.createElement('a');
            a.href = URL.createObjectURL(fileData);
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    /**
     * Show file in a new window
     * @param fileDataBase64 Data in base64
     * @param fileName File name
     */
    public openInNewWindow(fileDataBase64: string, fileName: string): void {
        if (fileDataBase64) {
            // Set MIME type using the file extension
            let options = { type: 'application/octet-stream' };
            if (fileName && fileName.lastIndexOf('.') >= 0) {
                const extension = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
                switch (extension) {

                    case 'aac':
                        options = { type: 'audio/aac' };
                        break;
                    case 'abw':
                        options =  { type: 'application/x-abiword' };
                        break;
                    case 'arc':
                        options = { type: 'application/octet-stream' };
                        break;
                    case 'avi':
                        options = { type: 'video/x-msvideo' };
                        break;
                    case 'azw':
                        options = { type: 'application/vnd.amazon.ebook' };
                        break;
                    case 'bin':
                        options = { type: 'application/octet-stream' };
                        break;
                    case 'bz':
                        options = { type: 'application/x-bzip' };
                        break;
                    case 'bz2':
                        options = { type: 'application/x-bzip2' };
                        break;
                    case 'csh':
                        options = { type: 'application/x-csh' };
                        break;
                    case 'css':
                    case 'csv':
                        options = { type: 'text/csv' };
                        break;
                    case 'doc':
                        options = { type: 'application/msword' };
                        break;
                    case 'docx':
                        options = { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' };
                        break;
                    case 'epub':
                        options = { type: 'application/epub+zip' };
                        break;
                    case 'gif':
                        options = { type: 'image/gif' };
                        break;
                    case 'htm':
                    case 'html':
                        options = { type: 'text/html' };
                        break;
                    case 'ico':
                        options = { type: 'image/x-icon' };
                        break;
                    case 'ics':
                        options = { type: 'text/calendar' };
                        break;
                    case 'jar':
                        options = { type: 'application/java-archive' };
                        break;
                    case 'jpeg':
                    case 'jpg':
                        options = { type: 'image/jpeg' };
                        break;
                    case 'js':
                        options = { type: 'application/javascript' };
                        break;
                    case 'json':
                        options = { type: 'application/json' };
                        break;
                    case 'mid':
                        options = { type: 'audio/midi' };
                        break;
                    case 'midi':
                        options = { type: 'audio/midi' };
                        break;
                    case 'mpeg':
                        options = { type: 'video/mpeg' };
                        break;
                    case 'mpkg':
                        options = { type: 'application/vnd.apple.installer+xml' };
                        break;
                    case 'odp':
                        options = { type: 'application/vnd.oasis.opendocument.presentation' };
                        break;
                    case 'ods':
                        options = { type: 'application/vnd.oasis.opendocument.spreadsheet' };
                        break;
                    case 'odt':
                        options = { type: 'application/vnd.oasis.opendocument.text' };
                        break;
                    case 'oga':
                        options = { type: 'audio/ogg' };
                        break;
                    case 'ogv':
                        options = { type: 'video/ogg' };
                        break;
                    case 'ogx':
                        options = { type: 'application/ogg' };
                        break;
                    case 'pdf':
                        options = { type: 'application/pdf' };
                        break;
                    case 'ppt':
                        options = { type: 'application/vnd.ms-powerpoint' };
                        break;
                    case 'rar':
                        options = { type: 'application/x-rar-compressed' };
                        break;
                    case 'rtf':
                        options = { type: 'application/rtf' };
                        break;
                    case 'sh':
                        options = { type: 'application/x-sh' };
                        break;
                    case 'svg':
                        options = { type: 'image/svg+xml' };
                        break;
                    case 'swf':
                        options = { type: 'application/x-shockwave-flash' };
                        break;
                    case 'tar':
                        options = { type: 'application/x-tar' };
                        break;
                    case 'tif':
                        options = { type: 'image/tiff' };
                        break;
                    case 'tiff':
                        options = { type: 'image/tiff' };
                        break;
                    case 'ttf':
                        options = { type: 'font/ttf' };
                        break;
                    case 'txt':
                        options = { type: 'text/plain' };
                        break;
                    case 'vsd':
                        options = { type: 'application/vnd.visio' };
                        break;
                    case 'wav':
                        options = { type: 'audio/x-wav' };
                        break;
                    case 'weba':
                        options = { type: 'audio/webm' };
                        break;
                    case 'webm':
                        options = { type: 'video/webm' };
                        break;
                    case 'webp':
                        options = { type: 'image/webp' };
                        break;
                    case 'woff':
                        options = { type: 'font/woff' };
                        break;
                    case 'woff2':
                        options = { type: 'font/woff2' };
                        break;
                    case 'xhtml':
                        options = { type: 'application/xhtml+xml' };
                        break;
                    case 'xls':
                        options = { type: 'application/vnd.ms-excel' };
                        break;
                    case 'xlsx':
                        options = { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' };
                        break;
                    case 'xml':
                        options = { type: 'application/xml' };
                        break;
                    case 'xul':
                        options = { type: 'application/vnd.mozilla.xul+xml' };
                        break;
                    case 'zip':
                        options = { type: 'application/zip' };
                        break;
                    case '3gp':
                        options = { type: 'video/3gpp' };
                        break;
                    case '3g2':
                        options = { type: 'video/3gpp2' };
                        break;
                    case '7z':
                        options = { type: 'application/x-7z-compressed' };
                        break;
                    default:
                        options = { type: 'application/octet-stream' };
                }
            }

            const binaryString = atob(fileDataBase64);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            // Create a blob variable
            const blob = new Blob([bytes], options);

            const fileURL = URL.createObjectURL(blob);
            const win = window.open(fileURL, '_blank');
            // Set the new window title with the file name
            setTimeout(() => {
                if (win) {
                    win.document.title = fileName;
                }
            }, 500);
        }
    }

    /**
     * Call login process
     */
    public loginUser(loginData: any): Promise<any> {
        const url: string = this.appGlobalInfo.APPCONSTANTS.BASE_URL + '/Token';
        return this.callHttpPost(url, loginData);
    }

    /**
     * Call to obtain the connected user information
     */
    public getUserInfo(): Promise<any> {
        return this.callHttpPost(this.appGlobalInfo.APPCONSTANTS.BASE_URL + '/api/Account/UserInfo', '');
    }

    /**
     * Logout functionality
     */
    public logOut() {
        this.callHttpPost(this.appGlobalInfo.APPCONSTANTS.BASE_URL + '/api/Account/Logout', '').then(() => {
            this.appGlobalInfo.setLogOut();
            this.navigateToLogin(undefined);
        }).catch(() => {
            this.appGlobalInfo.setLogOut();
            this.navigateToLogin(undefined);
        });
    }

    public populationQuery(url: string, queryRequest: any): Promise<any> {
        return this.callHttpPost(url, queryRequest);
    }

    /**
     * Show the Progress bar
     * @param value Percentage complete
     * @param secondsRemaining Optional. Estimated remaining time in seconds
     */
    public showProgressBar(title: string, value: number, secondsRemaining: number): void {
        this.progessBarAction.next({value, secondsRemaining, title});
    }

    /**
     * Hide the wait dialog
     */
    public hideProgressBar(): void {
        this.progessBarAction.next({value: -1, secondsRemaining: 0, title: ''});
    }

    /**
     * Add an error message to the application error messages list
     * @param errorMessage Error message text or service response
     */
    public addErrorMessage(errorMessage: string | ErrorInformation | Error ): void {
        if ( (errorMessage instanceof ErrorInformation) ) {
            this.errorMessagesAction.next((errorMessage as ErrorInformation).message);
        } else if ((errorMessage instanceof Error)) {
            this.errorMessagesAction.next((errorMessage as Error).message);
        } else {
            this.errorMessagesAction.next(errorMessage as string);
        }
    }

    public addErrorMessageList(errorMessages: string[]): void {
        for (const errorMsg of errorMessages) {
            this.errorMessagesAction.next(errorMsg);
        }
    }

    /**
     * Show a message using an overlay
     * @param toastMsgInfo Message information.
     * It can be an string or an object containing the properties that will be passed to the Message service:
     *      severity: Severity level of the message, valid values are "success", "info", "warn" and "error".
     *      summary: Summary text of the message.
     *      detail: Detail text of the message.
     */
    public showToastMessage(toastMsgInfo: any): void {
        this.toastMessagesAction.next(toastMsgInfo);
    }

    /**
     * Clears the application error messages list
     */
    public clearErrorMessages(): void {
        this.errorMessagesAction.next('');
    }

    /**
     * Shows a confirm dialog
     * @param header Header dialog
     * @param message Text to be shwon
     * @returns A promise always resolving (never rejecting) and values: 0 = Accept, 1 = Reject, 2 = Cancel
     */
    public showConfirmDialog(header: string, message: string): Promise<number> {
        return new Promise<number>((resolve) => {        
            this.confirmationService.confirm({
                key: 'appMainConfirmDialog',
                message: message,
                header: header,
                icon: 'pi pi-info-circle',
                accept: () => {
                    resolve(0);
                },
                reject: (type: number) => {
                    if ( type === ConfirmEventType.REJECT) {
                        resolve(1);
                    } else {
                        resolve(2);
                    }
                }
            });
        });
    }

    /**
     * Creates an Exchange Information to be used for generate an instance report
     * @param targetClassName Target class name
     * @param targetIUName Target UI name
     * @param previousContext Previous context
     * @param comeBackContext Comeback context
     * @param selectedOids Oid of the instance to be printed
     */
    public createExchangeInfo4PrintInstance(targetClassName: string, targetIUName: string, previousContext: any,
                                            comeBackContext: any, selectedOids: any): ExchangeInfo {
        // Create the exchange information
        const exchInfo = new ExchangeInfo();
        exchInfo.exchangeType = 'PrintInstance';
        exchInfo.targetClassName = targetClassName;
        exchInfo.targetIUName = targetIUName;
        exchInfo.previous = previousContext;
        exchInfo.comeBackContext = comeBackContext;
        exchInfo.selectedOids = selectedOids;
        exchInfo.selectedOidsClassName = targetClassName;
        exchInfo.navigationalFilterIdentity = [];
        return exchInfo;
    }

    /**
     * Create a basic exchaneg information
     * @param targetClassName Target class name
     * @param targetIUName Target interaction unit name
     * @param previousContext Previous context
     * @param comeBackContext Comeback context
     */
    private createBasicExchangeInfo(targetClassName: string, targetIUName: string,
                                    previousContext: any, comeBackContext: any, exchType: string): ExchangeInfo {
        // Create the exchange information
        const exchInfo = new ExchangeInfo();
        exchInfo.exchangeType = exchType;
        exchInfo.targetClassName = targetClassName;
        exchInfo.targetIUName = targetIUName;
        exchInfo.previous = previousContext;
        exchInfo.comeBackContext = comeBackContext;
        exchInfo.navigationalFilterIdentity = [];
        return exchInfo;
    }


    /**
     * Creates an instance of Exchange Information to be used for generate a population report
     * @param targetClassName Target class name
     * @param targetIUName Target UI name
     * @param previousContext Previous context
     * @param comeBackContext Comeback context
     */
    public createExchangeInfo4PrintPopulation(targetClassName: string, targetIUName: string, previousContext: any,
                                              comeBackContext: any): ExchangeInfo {
        // Create the exchange information
        return this.createBasicExchangeInfo(targetClassName, targetIUName, previousContext, comeBackContext, 'PrintPopulation');
    }

    /**
     * Generate an instance report using the exchenge information received
     * @param exchInfo Information to generate the report
     */
    public generateInstanceReportFromExchInfo(exchInfo: ExchangeInfo): void {
        this.generateInstanceReport(exchInfo.targetClassName, exchInfo.printUIName, exchInfo.selectedOids,
                                    exchInfo.customData.reportParams).then((errorMsg) => {
                                        this.processReportResponse(errorMsg, exchInfo.comeBackContext);
        }).catch((errorMsg) => {
            this.addErrorMessage(errorMsg);
        });
    }

    /**
     * Process the response from a report call
     * @param errorMsg Error message
     * @param comebackContext Come back context
     */
    private processReportResponse(errorMsg: string, comebackContext: any): void {
        if (errorMsg) {
            this.addErrorMessage(errorMsg);
        } else {
            this.navigateComeBack(comebackContext);
        }
    }

    /**
     * Download an instance report and returns in the promise the error message or empty
     * @param className Class name
     * @param reportId Interaction unit name
     * @param jsonOid instance oid, in Json format
     * @param reportParams Optional. Report parameters
     */
    public generateInstanceReport(className: string, reportId: string, jsonOid: any, reportParams: any): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const reportRequest: { className: string, jsonOID: string, reportName: string, reportParameters: any } = {
                className,
                jsonOID: jsonOid,
                reportName: reportId,
                reportParameters: reportParams
            };
            const url = `${this.appGlobalInfo.APPCONSTANTS.BASE_URL}/api/${className}Api/Report4${reportId}`;
            this.callHttpPost(url, reportRequest).then((response) => {
                if (response.resultCode !== '000') {
                    resolve(response.resultDescription);
                } else {
                    this.saveFileFromBase64(response.reportData, response.reportName);
                    resolve('');
                }
            }).catch((errorResponse: ErrorInformation) => {
                reject(errorResponse);
            });
        });
    }

    /**
     * Generate a population report using the exchange information received
     * @param exchInfo Exchange Information
     */
    public generatePopulationReportFromExchInfo(exchInfo: ExchangeInfo): void {
        this.generatePopulationReport(exchInfo.targetClassName, exchInfo.targetIUName, exchInfo.customData.filters,
                                      exchInfo.customData.reportParams).then((errorMsg) => {
                                        this.processReportResponse(errorMsg, exchInfo.comeBackContext);
        }).catch((errorMsg) => {
            this.addErrorMessage(errorMsg);
        });
    }


    /**
     * Download a population report and returns in the promise the error message or empty
     * @param className Class name
     * @param reportId Interaction unit name
     * @param filters Filters array
     * @param reportParams Optional. Report parameters
     */
    public generatePopulationReport(className: string, reportId: string, filters: any[], reportParams: any): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const reportRequest: { className: string, filters: any[], reportName: string, reportParameters: any } = {
                className,
                filters,
                reportName: reportId,
                reportParameters: reportParams
            };
            const url = `${this.appGlobalInfo.APPCONSTANTS.BASE_URL}/api/${className}Api/Report4${reportId}`;
            this.callHttpPost(url, reportRequest).then((response) => {
                if (response.resultCode === '000' && response.reportData) {
                    this.saveFileFromBase64(response.reportData, response.reportName);
                    resolve('');
                } else {
                    resolve(response.resultDescription);
                }
            }).catch((errorResponse: ErrorInformation) => {
                reject(errorResponse);
            });
        });
    }

    /**
     * Execute a lense search query
     * @param className Class name
     * @param displaySetName Display set to obtain
     * @param searchText Search text
     * @param navFiltersNames Navigational filter names
     * @param navFilterVariables Navigational filter variables
     */
    public searchLenseSearch(className: string, displaySetName: string, searchText: string, navFiltersNames: string[],
                             navFilterVariables: any): Promise<any> {
        const url = `${this.appGlobalInfo.APPCONSTANTS.BASE_URL}/api/${className}Api/GetWithDisplaySetDynamic`;

        const queryRequest: { displaySetName: string, filters: any[], pageSize: number } = {
            displaySetName,
            filters: [],
            pageSize: 40
        };
        queryRequest.filters.push({
            name: 'SuppInfo_' + displaySetName,
            variables: [{
                name: 'searchText',
                value: searchText
            }]
        });
        if (navFiltersNames && navFiltersNames.length > 0) {
            for (const filterNav of navFiltersNames) {
                const navFilter: {name: string, variables: any[]} = { name: filterNav, variables: navFilterVariables};
                queryRequest.filters.push(navFilter);
            }
        }
        return this.callHttpPost(url, queryRequest);
    }

    /**
     * Execute a preload search
     * @param className Class name
     * @param displaySetName Display set to obtain
     * @param navFiltersNames Navigational filter names
     * @param navFilterVariables Navigational filter variables
     * @param orderCriteriaName Order vriteria name
     */
    public searchPreload(className: string, displaySetName: string, navFiltersNames: string[], navFilterVariables: any,
                         orderCriteriaName: string): Promise<any> {

        const url = `${this.appGlobalInfo.APPCONSTANTS.BASE_URL}/api/${className}Api/GetWithDisplaySetDynamic`;
        const queryRequest: { displaySetName: string, filters: any[], orderCriteriaName: string, pageSize: number } = {
            displaySetName,
            filters: [],
            orderCriteriaName,
            pageSize: 0
        };
        if (navFiltersNames && navFiltersNames.length > 0) {
            for (const filterNav of navFiltersNames) {
                const navFilter: {name: string, variables: any[]} = { name: filterNav, variables: navFilterVariables};
                queryRequest.filters.push(navFilter);
            }
        }

        return this.callHttpPost(url, queryRequest);
    }

    /**
     * Call to the save grid preferences for an specific grid
     * @param agentName User identification
     * @param gridName Grid identification
     * @param gridState Grid state
     */
    public saveGridPreferences(gridName: string, gridState: string): Promise<any> {

        const url = `${this.appGlobalInfo.APPCONSTANTS.BASE_URL}/api/GridPreferencesApi/UpdateGridPreferences`;
        // Get first oid field as agent name
        const agentName: string = this.appGlobalInfo.getLoggedUserInfo().oid[Object.keys(this.appGlobalInfo.getLoggedUserInfo().oid)[0]];
        const request: { agentName: string, piuName: string, gridState: string } = {
            agentName,
            piuName: gridName,
            gridState
        };
        return this.callHttpPost(url, request);
    }

    /**
     * Call to the delete preferences service
     * @param gridName Grid name
     */
    public deleteGridPreferences(gridName: string): Promise<any> {

        const url = `${this.appGlobalInfo.APPCONSTANTS.BASE_URL}/api/GridPreferencesApi/DeleteGridPreferences`;
        // Get first oid field as agent name
        const agentName: string = this.appGlobalInfo.getLoggedUserInfo().oid[Object.keys(this.appGlobalInfo.getLoggedUserInfo().oid)[0]];
        const request: { agentName: string, piuName: string, gridState: string } = {
            agentName,
            piuName: gridName,
            gridState: ''
        };
        return this.callHttpPost(url, request);
    }

    /**
     * Service execution
     * @param className Class name
     * @param serviceName Service name
     * @param oidValues Oid value
     * @param oidArgName Oid argument name
     */
    public executeNoShowService(className: string, serviceName: string, oidValues: any,
                                oidArgName: string): Promise<{request: any, response: any}> {

        const request: any = {};
        if (oidArgName) {
            request[oidArgName] = oidValues;
        }
        return new Promise<{request: any, response: any}>((resolve, reject) => {
            this.callHttpPost(`${this.appGlobalInfo.APPCONSTANTS.BASE_URL}/api/${className}Api/${serviceName}`,
                request).then((response) => {
                resolve({request, response});
            }).catch((response) => {
                reject({request, response});
            });
        });
    }

    /**
     * Return a filter by Oid
     * @param oid Oid to be search
     */
    public getFilterByOid(oid: any): { name: string, variables: any[] } {
        let filterByOid = this.getFilter('_OID');
        if (typeof oid === 'string' ) {
            filterByOid = this.addFilterVariable(filterByOid, 'oid', oid);
        } else {
            filterByOid = this.addFilterVariable(filterByOid, 'oid', JSON.stringify(oid));
        }
        return filterByOid;
    }

    /**
     * Return a filter by related
     * @param rolePath Role path
     * @param relatedOid Related Oid
     */
    public getFilterByRelated(rolePath: string, relatedOid: any): { name: string, variables: any[] } {
        let filterRelated = this.getFilter('_Related');
        filterRelated = this.addFilterVariable(filterRelated, 'relatedInstancePath', rolePath);
        if (typeof relatedOid === 'string' ) {
            filterRelated = this.addFilterVariable(filterRelated, 'relatedInstanceOid', relatedOid);
        } else {
            filterRelated = this.addFilterVariable(filterRelated, 'relatedInstanceOid', JSON.stringify(relatedOid));
        }
        return filterRelated;
    }

    /**
     * Return a query filter
     * @param filterName Filter name
     */
    public getFilter(filterName: string): { name: string, variables: any[] } {
        return {
            name: filterName,
            variables: []
        };
    }

    /**
     * Add a filter variable to the received filter
     * @param filter Filter name
     * @param variableName Variable name
     * @param variableValue Variable value
     */
    public addFilterVariable(filter: { name: string, variables: any[] }, variableName: string,
                             variableValue: any): { name: string, variables: any[] } {
        filter.variables.push({ name: variableName, value: variableValue });
        return filter;
    }

    /**
     * Return a query request
     * @param displaySetItems Display set items, separated by comma
     * @param filters Quey filter array
     * @param orderCriteria Order criteria name
     * @param instancesPerPage Number of instances to be retrieved
     */
    public getQueryRequest(displaySetItems: string, filters: any[], orderCriteria: string, instancesPerPage: number):
    { displaySetItems: string, pageSize: number, orderCriteriaName: string, filters: any[], pageNumber: number } {
        return {
            displaySetItems,
            pageSize: instancesPerPage,
            orderCriteriaName: orderCriteria,
            filters,
            pageNumber: 1
        };
    }

    /**
     * Calls to the implementation of the user function in the back-end
     * @param userfunctionName User function name
     * @param userFunctionParameters JSON object with the user function parameters
     */
    public callUserFunctionInBackEnd(userfunctionName: string, userFunctionParameters: any, responseAsText = false): Promise<any> {
        return new Promise<any[]>((resolve, reject) => {
            this.callHttpPost(
                `${this.appGlobalInfo.APPCONSTANTS.BASE_URL}/api/UserFunctionsApi/${userfunctionName}`,
                userFunctionParameters, responseAsText).then((res) => {
                resolve(res);
            }).catch((err: ErrorInformation) => {
                reject(err);
            });
        });
    }

    /**
     * Class query by Oid. Returns an object wth the value of attributes or null if instance not exixts
     * @param className Class name
     * @param oid Instance Oid
     * @param attributes Attributes, separates by comma
     */
    public callQueryByOid(className: string, oid: any, attributes: any): Promise<any> {
        // Query to get the value of attributes
        const oidFilter = this.getFilterByOid(oid);
        const request = this.getQueryRequest(attributes, [oidFilter], '', 0);
        return new Promise<any[]>((resolve, reject) => {
            this.populationQuery(
                `${this.appGlobalInfo.APPCONSTANTS.BASE_URL}/api/${className}Api/GetPopulationDynamic`,
                request).then( (response) => {
                if (response.resultCode === '000' && response.results && response.results.length > 0) {
                    resolve(response.results[0]);
                } else {
                    resolve([]);
                }
            }).catch((errorResponse: ErrorInformation) => {
                reject( errorResponse );
            });
        });
    }

    /**
     * Calls a generic query. Returns a Promise with QueryResponse if it is successful or ErrorInformation in case of error
     * @param className Class name
     * @param query Query information. Use the 'getQueryRequest' funtion to create it
     */
    public callQuery(className: string,
                     query: { displaySetItems: string, pageSize: number, orderCriteriaName: string, filters: any[], pageNumber: number }):
                     Promise<QueryResponse> {
        return new Promise<QueryResponse>((resolve, reject) => {
            this.callHttpPost(
                `${this.appGlobalInfo.APPCONSTANTS.BASE_URL}/api/${className}Api/GetPopulationDynamic`,
                query).then((response: any) => {
                const possibleError = new LogicError(response);
                if (possibleError.IsError()) {
                    reject(possibleError);
                } else {
                    resolve(new QueryResponse(response));
                }
            }).catch((errorResponse: RequestError) => {
                reject( errorResponse );
            });
        });
    }

    /**
     * Call to the change password service
     * @param oldPwd Old password
     * @param newPwd new password
     */
    public callChangePassword(oldPwd: string, newPwd: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const data = {
                oid: this.appGlobalInfo.getLoggedUserInfo().oid,
                old: oldPwd,
                new: newPwd};
            this.callHttpPost(
                `${this.appGlobalInfo.APPCONSTANTS.BASE_URL}/api/${this.appGlobalInfo.getLoggedUserInfo().roles[0]}Api/changePassword`,
                    data).then((response: any) => {
                    const possibleError = new LogicError(response);
                    if (possibleError.IsError()) {
                        reject(possibleError);
                    } else {
                        resolve();
                    }
                }).catch((errorResponse: ErrorInformation) => {
                    reject( errorResponse );
                });
            });
    }

    /**
     * Generic post call
     * @param url URL to be called
     * @param data Data to be sent
     */
    public callHttpPost(url: string, data: any, responseAsText = false): Promise<any> {
        if (this.appGlobalInfo.APPCONSTANTS.BASE_URL === '') {
            return this.waitForBaseUrl(url, data, 1, responseAsText);
        } else {
            return new Promise<any>((resolve, reject) => {
                this.callHttpPostAux(url, data, responseAsText).then( (response: any) => {
                    resolve(response);
                }).catch( (err: ErrorInformation) => {
                    // Si el error es por timeout, reintentamos tras actualizar el token
                    if (err.code === '123' && err.message === '123') {
                        this.retryCall(url, data, responseAsText).then( (response:any) => {
                            resolve(response);
                        }).catch( (err:ErrorInformation) => {
                            reject(err);
                        });
                    } else {
                        reject(err);
                    }
                });
            });
        }
    }


    private retryCall(url: string, data: any, responseAsText: boolean): Promise<any> {
        // Mandamos a comprobar la cuenta del usuario y reintentamos
        this.appGlobalInfo.setUserUnauthorized();
        this.appGlobalInfo.checkUserAccount();
        return this.retryCallAux(url, data, responseAsText, new Date(), 0);
    }

    private retryCallAux(url: string, data: any, responseAsText: boolean, inicio: Date, numIntentos: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            // Si hemos superado el numero de reintentos, damos un error
            if (numIntentos >= 3) {
                reject(new ErrorInformation(false, '', 'Su sesion ha caducado, espere unos instantes y vuelva a intentarlo', '',[] ));
            } else  if (this.appGlobalInfo.getLoggedUserInfo().lastActivityTimestamp > inicio) {
                // Si ha habido actividad en la informaci�n del usuario posterior al inicio, repetimos la llamada
                this.callHttpPostAux(url, data, responseAsText).then( (response: any) => {
                    resolve(response);
                }).catch( (err: ErrorInformation) => {
                    reject(err);
                });
            } else {
                // Esperamos 3 segundos y volvemos a intentarlo incrementando el contador de intentos
                setTimeout( () => {
                    this.retryCallAux(url, data, responseAsText, inicio, numIntentos + 1).then( (response: any) => {
                        resolve(response);
                    }).catch( (err: ErrorInformation) => {
                        reject(err);
                    });
                }, 3000);
            }
        });
    }

    /**
     * Devuelve el c�digo legal del tipo de identificaci�n recibido
     * @param oidTipoIdent 
     */
    public getCodigoLegalTipoIdentificacion(oidTipoIdent: string): Promise<string> {
        
        // Si tenemos los datos en la cache
        const tiposIdentString = sessionStorage.getItem('cacheTI');
        if (tiposIdentString) {
            return this.getCodigoLegalTipoIdentificacionAux(oidTipoIdent);
        } else {
            // Los buscamos y guardamos en cache
            const query = this.getQueryRequest('nombrecorto', [], '',999);
            return new Promise<string>( (resolve, reject) => {
                this.callQuery(ModelConstants.Tipoidentificacion.name, query).then( (resp: QueryResponse) => {
                    const lista = [];
                    for (const dato of resp.results) {
                        lista.push({oid: dato.oid, valor: dato.nombrecorto});
                    }
                    // Lo guardamos en la sessionstorage
                    sessionStorage.setItem('cacheTI', JSON.stringify(lista));
                    return this.getCodigoLegalTipoIdentificacionAux(oidTipoIdent);
                }).catch( (err: Error) => {
                    reject(err);
                })
            });
        }
    }
    public getCodigoLegalTipoIdentificacionAux(oidTipoIdent: string): Promise<string> {
        
        // Ya debemos tener los datos en la sessionStorage
        const tiposIdentString = sessionStorage.getItem('cacheTI');
        if (tiposIdentString) {
            const tipos = JSON.parse(tiposIdentString);
            const ele = tipos.find((tipo: any) => tipo.oid === oidTipoIdent);
            if (ele) {
                return Promise.resolve(ele.valor);    
            } else {
                return Promise.reject(new Error('Tipo identificacion no encontrado. ' + oidTipoIdent));
            }
        } 
        return Promise.reject(new Error('Tipos de identificacion no cargados'));
    }

    /**
     * In a POST Call, wait till base URL has value
     * @param url URL to be called
     * @param data Data
     * @param retryTimes Number of retries
     */
    public waitForBaseUrl(url: string, data: any, retryTimes: number, responseAsText = false): Promise<any> {
        if (retryTimes > 3) {
            return Promise.reject({message: 'Base URL not found'});
        }

        return new Promise<any>((resolve, reject) => {
            window.setTimeout( () => {
                if (this.appGlobalInfo.APPCONSTANTS.BASE_URL === '') {
                    this.waitForBaseUrl(url, data, retryTimes + 1, responseAsText).then( (response: any) => {
                        resolve(response);
                    }).catch((error) => {
                        reject(error);
                    });
                } else {
                    this.callHttpPostAux(url, data, responseAsText).then( (response: any) => {
                        resolve(response);
                    }).catch((error: ErrorInformation) => {
                        reject(error);
                    });
                }
            }, 1000);

        });
    }

    /**
     * Auxiliar to generic post call
     * @param url URL
     * @param data Data
     */
    private callHttpPostAux(url: string, data: any, responseAsText = false): Promise<any> {
        if (this.appGlobalInfo.APPCONSTANTS.BASE_URL && !url.startsWith(this.appGlobalInfo.APPCONSTANTS.BASE_URL)) {
            url = this.appGlobalInfo.APPCONSTANTS.BASE_URL + url;
        }
        // Consultas de Solicitudes a MSEstatus
        if (url.endsWith('GetSolicitudDynamic') || url.endsWith('GetUsuarioDynamic') ||
            url.endsWith('SolicitudApi/GetPopulationDynamic') ) {

            if (!data?.piuName) {
                data.piuName = 'msenviodoc';
            }
        }

        let headers = new HttpHeaders();
        if (this.appGlobalInfo.getLoggedUserInfo().token) {
            headers = headers.set('Authorization', 'Bearer ' + this.appGlobalInfo.getLoggedUserInfo().token);
        }
        headers = headers.set('API-Version', this.appGlobalInfo.apiVersion);
        const responseType = 'json';
        const options = { headers, observe: 'response' as 'body',  responseType: 'json' as 'json', withCredentials: true };
        if (responseAsText) {
            options.responseType = 'text' as 'json';
        }
        const startTime = new Date();
        return new Promise<any>((resolve, reject) => {
            this.httpClient.post(url, data, options).subscribe(
                {
                    next: (res: any) => {
                        if (res.headers) {
                            const token = res.headers.get('Authorization');
                            if (token) {
                                this.appGlobalInfo.updateUserToken(token);
                            }
                        }
                        if (res.body && res.body.resultCode === '666') {
                            this.navigateToWrongVersionPage();
                        } else {
                            resolve(res.body);
                        }
                    },
                    error: (msg: any) => {
                        this.appGlobalInfo.errorCET = false;
                        const endTime = new Date();
                        const elapsedTime = endTime.getTime() - startTime.getTime();
                        this.saveLogInfo(startTime, endTime, url, 'POST', data, msg);
                        if (msg.status === 401 ||msg.status === 408) {
                            // this.appGlobalInfo.setUserUnauthorized();
                            // this.appGlobalInfo.checkUserAccount();
                            const errorInfo = new RequestError(msg);
                            errorInfo.external = false;
                            errorInfo.code = '123';
                            errorInfo.message = '123';
                            reject( errorInfo);
                            // this.navigateToLogin(undefined);
                        } else {
                            const errorInfo = new RequestError(msg);
                            if (msg.status === 0 && elapsedTime > this.appGlobalInfo.timeoutCET) {
                                this.appGlobalInfo.errorCET = true;
                                errorInfo.messageId = 'app_BACKENDERROR_CET1';
                                errorInfo.messageParts.push(startTime.toLocaleString());
                            } else {
                                errorInfo.messageId = 'app_BACKENDUNKNOWNERROR';
                                errorInfo.message = this.langMng.translateError(errorInfo);
                            }
                            reject(errorInfo);
                        }
                    }
                });
        });
    }

    /**
     * Generic get call to download a file as Blob
     */
    public callHttpGetFile(url: string): Promise<any> {
        const headers = new HttpHeaders();
        const options = { headers, observe: 'response' as 'body', responseType: 'blob' as'json', withCredentials: true };
        const startTime = new Date();
        return new Promise<any[]>((resolve, reject) => {
            this.httpClient.get(url, options).toPromise().then((res: any) => {
                resolve(res.body);
            }).catch((msg: any) => {
                const endTime = new Date();
                this.saveLogInfo(startTime, endTime, url, 'GET', '', msg);
                reject({
                    message: this.langMng.translateText('app_BACKENDUNKNOWNERROR', '')
                });
            });
        });
    }

    /**
     * Call to the log service
     * @param start Initial date and time
     * @param end Final date and time
     * @param url Url
     * @param verb POST or GET
     * @param request Request data
     * @param response Response data
     */
    public saveLogInfo(start: Date, end: Date, url: string, verb: string, request: any, response: any): void {

        if (!this.appGlobalInfo.logBackEndErrors ||
            this.appGlobalInfo.APPCONSTANTS.URL_LOG_ERROR === '') {
            return;
        }

        const requestTime = start.getFullYear().toString() + '-' +
                            (start.getMonth() + 1).toString().padStart(2, '0') + '-' +
                            start.getDate().toString().padStart(2, '0') + 'T' +
                            start.getHours().toString().padStart(2, '0') + ':' +
                            start.getMinutes().toString().padStart(2, '0') + ':' +
                            start.getSeconds().toString().padStart(2, '0');

        const responseTime = end.getFullYear().toString() + '-' +
                            (end.getMonth() + 1).toString().padStart(2, '0') + '-' +
                            end.getDate().toString().padStart(2, '0') + 'T' +
                            end.getHours().toString().padStart(2, '0') + ':' +
                            end.getMinutes().toString().padStart(2, '0') + ':' +
                            end.getSeconds().toString().padStart(2, '0');

        const elapsedTime = end.getTime() - start.getTime();
        let requestData = '';
        if (request) {
            requestData = JSON.stringify(request);
        }
        let responseData = '';
        if (request) {
            responseData = JSON.stringify(response);
        }
        let userData = '';
        if (this.appGlobalInfo.getLoggedUserInfo().oid) {
            userData = JSON.stringify(this.appGlobalInfo.getLoggedUserInfo().oid);
        }

        const logRequest = {
            requestTime,
            responseTime,
            elapsedTime,
            url,
            verb,
            requestData,
            responseData,
            returnCode: response.status,
            user: userData
        };
        this.httpClient.post(this.appGlobalInfo.APPCONSTANTS.URL_LOG_ERROR, logRequest).subscribe();
    }
}

