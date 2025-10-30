/**
 * Information to be used to navigate to another scenario
 */
export class ExchangeInfo {

    /* Instance Exchange Type.
     Generic, Navigation, Action, ComeBack, SelectionForward, SelectionBackward, ConditionalNavigation,
     OutboundArguments, Error, PrintInstance, PrintFilter
    */
    public exchangeType = '';
    /* Target Class Name */
    public targetClassName = '';
    /* Target IU Name */
    public targetIUName = '';
    /* Previous context */
    public previous: any = undefined;
    /* Previous context for coming back */
    public comeBackContext: any = undefined;
    /* Selected Oids */
    public selectedOids: any[] = [];
    /* Selected Oids class name*/
    public selectedOidsClassName = '';
    /* Custom Data */
    public customData: any = {};
    /* Navigational Filter Identity */
    public navigationalFilterIdentity: string[] = [];
    /* Navigational Filter variables */
    public navigationalFilterVariables: any;
    /* Instance Role Path. Only for related navigation */
    public rolePath = '';
    /* The target scenario title */
    public targetScenarioTitle = '';
    /* Allow multi selection in destination scenario */
    public multiSelectionAllowed = false;
    /* Name of argument or filter variable. Only for selection forward and backward */
    public originArgumentName = '';
    /* Name of service or filter. Only for selection forward and backward */
    public originServiceName = '';
    /* Identification of the interaction unit. Only for master detail scenarios */
    public originIUIdentification = '';
    /* Original scenario context. To be used in Come Back and SelectionBackward navigations */
    public originalContext: any = undefined;
    /* Name of the UI used for printing */
    public printUIName = '';
    /* Scenario in modal form */
    public isInModal = false;

    /**
     * Deserialize an exchange info object
     * @param serializedExchInfo Exchange info in Json format
     */
    public deserialize(serializedExchInfo: any): void {
        this.exchangeType = serializedExchInfo.exchangeType;
        this.targetClassName = serializedExchInfo.targetClassName;
        this.targetIUName = serializedExchInfo.targetIUName;
        this.previous = this.deserializeContext(serializedExchInfo.previous);
        this.comeBackContext = this.deserializeContext(serializedExchInfo.comeBackContext);
        this.selectedOids = serializedExchInfo.selectedOids;
        this.selectedOidsClassName = serializedExchInfo.selectedOidsClassName;
        this.customData = serializedExchInfo.customData;
        this.navigationalFilterIdentity = serializedExchInfo.navigationalFilterIdentity;
        this.rolePath = serializedExchInfo.rolePath;
        this.targetScenarioTitle = serializedExchInfo.targetScenarioTitle;
        this.multiSelectionAllowed = serializedExchInfo.multiSelectionAllowed;
        this.originArgumentName = serializedExchInfo.originArgumentName;
        this.originServiceName = serializedExchInfo.originServiceName;
        this.originalContext = this.deserializeContext(serializedExchInfo.originalContext);
    }

    /**
     * Return the deserialized context from the serialized one
     * @param context Context info in Json format
     */
    public deserializeContext(context: any): any {
        if (context?.exchangeInfo) {
            const exInfo = context.exchangeInfo;
            context.exchangeInfo = new ExchangeInfo();
            context.exchangeInfo.deserialize(exInfo);
        }
        return context;
    }

    /**
     * Returns the last navigation role
     */
    public getLastNavigationRole(): string {
        let lastRole = '';
        if (this.previous?.exchangeInfo &&
            this.previous.exchangeInfo.exchangeType === 'Navigation') {
            lastRole = this.previous.exchangeInfo.rolePath;
        }
        return lastRole;
    }

    /**
     * Returns the Oid instance of the last navigation role
     */
    public getLastNavigationRoleOid(): any {
        let lastRoleOid = {};
        if (this.previous?.exchangeInfo &&
            this.previous.exchangeInfo.exchangeType === 'Navigation' &&
            this.previous.exchangeInfo.selectedOids.length === 1) {
            lastRoleOid = this.previous.exchangeInfo.selectedOids[0];
        }
        return lastRoleOid;
    }

    /**
     * Returns any selected Oids of the received class
     * @param className Class name
     */
    public getOidsOfClass(className: string): any[] {
        let oids = [];
        if (this.selectedOidsClassName === className) {
            oids = this.selectedOids;
        } else if (this.previous?.exchangeInfo) {
            oids = this.previous.exchangeInfo.getOidsOfClass(className);
        }

        return oids;
    }
}

/**
 * Manages the interchange of onformation between scenarios in the application
 */
export class AppExchangeInfo {

    /** Application Context stack */
    private exchInfo: ExchangeInfo | null = null;

    private condNavQuestion = '';
    private condNavAnwsers: string[] = [];
    private condNavExchInfos: ExchangeInfo[] = [];
    private servicesLogExchInfo: ExchangeInfo | null = null;

    constructor() {
    }

    /**
     * Clear the context stack
     */
    public clear(): void {
        this.exchInfo = null;
        sessionStorage.setItem('exchInfo', '');
    }

    /**
     * Save the exchange information in the session
     * @param currentExchangeInfo Info to save
     */
    public save(currentExchangeInfo: ExchangeInfo) {
        this.exchInfo = currentExchangeInfo;
        try {
            sessionStorage.setItem('exchInfo', JSON.stringify(this.exchInfo));
        } catch (e) {
            // error is ignored
            console.log('Error saving exchInfo');
        }
    }

    /**
     * Get the current exchange information
     */
    public get(): ExchangeInfo {
        if (!this.exchInfo) {
            const exchInfoInSession = sessionStorage.getItem('exchInfo');
            this.exchInfo = new ExchangeInfo();
            if (exchInfoInSession) {
                const localExchInfo = JSON.parse(exchInfoInSession);
                this.exchInfo.deserialize(localExchInfo);
            }
        }
        return this.exchInfo;
    }

    /**
     * Get the exchange information for the scenario
     * @param className Class name
     * @param iuName Interaction unit name
     */
    public getExchangeInfoForScenario(className: string, iuName: string): ExchangeInfo {
        let exInfo: any = this.get();
        // Search in the context stack
        while (exInfo) {
            if (exInfo.targetClassName.toUpperCase() === className.toUpperCase() &&
                exInfo.targetIUName.toUpperCase() === iuName.toUpperCase()) {
                break;
            } else if (exInfo.previous?.exchangeInfo) {
                exInfo = exInfo.previous.exchangeInfo;
            } else {
                exInfo = undefined;
            }
        }
        // If not found, return a default one
        if (!exInfo) {
            exInfo = new ExchangeInfo();
            exInfo.exchangeType = 'Action';
            exInfo.targetClassName = className;
            exInfo.targetIUName = iuName;
        }
        return exInfo;
    }

    public clearConditionalNavigation(): void {
        this.condNavQuestion = '';
        this.condNavAnwsers = [];
        this.condNavExchInfos = [];
    }

    public setConditionalNavigationQuestion(question: string): void {
        this.condNavQuestion = question;
    }
    public getConditionalNavigationQuestion(): string {
        return this.condNavQuestion;
    }

    public addConditionalNavigationTarget(anwser: string, exchInfo: ExchangeInfo): void {
        this.condNavAnwsers.push(anwser);
        this.condNavExchInfos.push(exchInfo);
    }

    public getConditionalNavigationAnwsers(): string[] {
        return this.condNavAnwsers;
    }
    public getConditionalExchangeInfos(): ExchangeInfo[] {
        return this.condNavExchInfos;
    }

    public getServicesLogExchInfo(): ExchangeInfo | null{
        return this.servicesLogExchInfo;
    }

    public setServicesLogExchInfo(info: ExchangeInfo): void {
        this.servicesLogExchInfo = info;
    }

    public isMainScenario(): boolean {
        if (this.exchInfo) {
            return this.exchInfo.targetClassName && this.exchInfo.targetIUName ? false : true;
        } else {
            return true;
        }
    }
}
