import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AppExchangeInfo } from './common/app.exchangeinfo';
import { Configuration } from './app.constants';
import { environment } from 'src/environments/environment';

/**
 * Information about the logged user
 */
export class LoggedUserInfo {

    /** Session timeout in seconds. Value 0 means no timeout */
    private static readonly sessionTimeout = 0;
    /** Prefix for store the grid preferences in local storage */
    private static readonly preferencesPrefix = 'aeenviodoc';
    /* Logged */
    public logged = false;
    /* Roles */
    public roles: string[] = [];
    /* Oid */
    public oid: any = {};
    /* Previous Oid. Used to check if it is the same user after a session timeout */
    public previousOid: any = {};
    /* Token */
    public token = '';
    /* Display name */
    public displayName = '';
    /** Dynamic permissions. Not active by default */
    public dynamicPermissions = false;
    /** Visible Hat nodes */
    public visibleHATNodes: any;
    /** Visible Interaction units information  */
    public visibleIUs: any;
    /** Timestamp of last navigation */
    public lastActivityTimestamp = new Date();
    /** Save grid preferences in local storage or using the bussines logic */
    public gridPreferencesInLocalStorage = false;
    /** User grid preferences */
    public gridPreferences: any[] = [];
    /** User cache  */
    public userCache: any;


    /**
     * Deserialize the user information stored in session
     * @param infoInSession User information
     */
    public deserialize(infoInSession: any): void {
        this.logged = infoInSession.logged;
        this.roles = infoInSession.roles;
        this.oid = infoInSession.oid;
        this.previousOid = infoInSession.previousOid;
        this.token =  infoInSession.token;
        this.displayName = infoInSession.displayName;
        this.dynamicPermissions = infoInSession.dynamicPermissions;
        this.visibleHATNodes = infoInSession.visibleHATNodes;
        this.visibleIUs = infoInSession.visibleIUs;
        this.lastActivityTimestamp = infoInSession.lastActivityTimestamp;
        this.gridPreferencesInLocalStorage = infoInSession.gridPreferencesInLocalStorage;
        this.gridPreferences = infoInSession.gridPreferences;
        this.userCache = infoInSession.userCache;
    }

    /**
     * Sets the text to be shown
     * @param displayName Text to be shown
     */
    public setDisplayName(displayName: string | undefined): void {
        if (displayName) {
            this.displayName = displayName;
        } else {
            this.displayName = '';
        }
    }

    /**
     * Returns true when the user information is complete
     */
    public isUserInfoComplete(): boolean {
        return this.logged && this.token && this.roles && this.oid;
    }

    /**
     * Logged user has been unauthorized by the back end.
     * Mark as not logged and clean roles
     */
    public setUnauthorized(): void {
        this.logged = false;
        this.roles = [];
        this.token = '';
        this.previousOid = this.oid;
    }

    /**
     * Checks if the user roles contains at least one of the required
     * @param agents Required agent roles
     */
    public isAgentOneOf(agents: string[]): boolean {
        if (this.roles && this.roles.length > 0 && agents && agents.length > 0) {
            for (const rol of agents) {
                if (this.roles.find( element => element.toLowerCase() === rol.toLowerCase())) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Checks if the menu element is visible or not
     * @param idNode Menu element id
     * @param agents Required agents
     */
    public isNodeVisible(idNode: string, agents: string[]): boolean {
        if (this.visibleHATNodes && idNode) {
            return this.visibleHATNodes.indexOf(idNode) >= 0;
        } else {
            return this.isAgentOneOf(agents);
        }
    }

    /**
     * Checks if the Interaction Unit element is visible or not
     * @param idIU Interaction Unit id
     * @param agents Required agents
     */
    public isIUVisible(idIU: string, agents: string[]): boolean {
        if (this.visibleIUs && idIU) {
            const iuInfo = this.findIUById(idIU);
            if (iuInfo) {
                return true;
            } else {
                return false;
            }
        } else {
            return this.isAgentOneOf(agents);
        }
    }

    /**
     * Checks if the attribute is visible or not
     * @param idIU Interaction Unit id
     * @param idAtt Interaction Unit id
     * @param agents Required agents
     */
    public isAttributeVisible(idIU: string, idAtt: string, agents: string[]): boolean {
        if (this.visibleIUs && idIU && idAtt) {
            const iuInfo = this.findIUById(idIU);
            if (iuInfo) {
                return iuInfo.visibleAttributes.indexOf(idAtt) >= 0;
            } else {
                return false;
            }
        } else {
            return this.isAgentOneOf(agents);
        }
    }

    /**
     * Checks if the action element is visible or not
     * @param idIU Interaction Unit id
     * @param idAct Action id
     * @param agents Required agents
     */
    public isActionVisible(idIU: string, idAct: string, agents: string[]): boolean {
        if (this.visibleIUs && idIU && idAct) {
            const iuInfo = this.findIUById(idIU);
            if (iuInfo) {
                return iuInfo.visibleActions.indexOf(idAct) >= 0;
            } else {
                return false;
            }
        } else {
            return this.isAgentOneOf(agents);
        }
    }

    /**
     * Checks if the naigation element is visible or not
     * @param idIU Interaction Unit id
     * @param idNav Navigation id
     * @param agents Required agents
     */
    public isNavigationVisible(idIU: string, idNav: string, agents: string[]): boolean {
        if (this.visibleIUs && idIU && idNav) {
            const iuInfo = this.findIUById(idIU);
            if (iuInfo) {
                return iuInfo.visibleNavigations.indexOf(idNav) >= 0;
            } else {
                return false;
            }
        } else {
            return this.isAgentOneOf(agents);
        }
    }

    /**
     * Checks if the detail of a Master-Detail is visible or not
     * @param idIU Interaction Unit id
     * @param idDet Detail id
     * @param agents Required agents
     */
    public isDetailVisible(idIU: string, idDet: string, agents: string[]): boolean {
        if (this.visibleIUs && idIU && idDet) {
            const iuInfo = this.findIUById(idIU);
            if (iuInfo) {
                return iuInfo.visibleDetails.indexOf(idDet) >= 0;
            } else {
                return false;
            }
        } else {
            return this.isAgentOneOf(agents);
        }
    }

    /**
     * Returns, if exists, the visibility information of the interaction unit
     * @param idIU Interaction Unit id
     */
    private findIUById(idIU: string): any {
        if (this.visibleIUs && idIU) {
            for (const iuInfo of this.visibleIUs) {
                if (iuInfo.id === idIU) {
                    return iuInfo;
                }
            }
            return undefined;
        } else {
            return undefined;
        }
    }

    /**
     * Return true if the user session has expired or not
     */
    public isSessionExpired(): boolean {
        if (LoggedUserInfo.sessionTimeout > 0) {
            const currentDateTime = new Date();
            const diff = (currentDateTime.valueOf() - this.lastActivityTimestamp.valueOf()) / 1000;
            return diff > LoggedUserInfo.sessionTimeout;
        }
        return false;
    }

    /**
     * Set the user roles
     * @param roles User roles
     */
    public setUserRoles(roles: string[]) {
        this.lastActivityTimestamp = new Date();
        this.roles = [];
        for (const rol of roles) {
            this.roles.push(rol);
        }
        if (this.roles.length > 0) {
            this.logged = true;
        } else {
            this.logged = false;
        }
    }

    /**
     * Used to mantein the user session active
     */
    public recordUserActivity() {
        this.lastActivityTimestamp = new Date();
    }

    /**
     * Return the key used to store preferences
     */
    public getPreferencesKey(): string {
        let preferencesKey = LoggedUserInfo.preferencesPrefix;
        if (this.oid) {
            preferencesKey += JSON.stringify(this.oid).toLowerCase();
        }
        return preferencesKey;
    }

    /**
     * Returns the preferences of the grid by name
     * @param uiName Name of the grid
     */
    public getGridPreferencesByName(uiName: string): any {
        for (const gridPref of this.gridPreferences) {
            if (gridPref.piuname === uiName) {
                return gridPref.gridstate;
            }
        }
        return undefined;
    }

    /**
     * Sets the grid prefererences by name. Returns true if the grid preferences must be saved in the backend
     * @param iuName Name
     * @param gridPreferences Preferences value
     */
    public setGridPreferencesByName(iuName: string, iuPreferences: string): boolean {
        if (this.gridPreferencesInLocalStorage) {
            const key = this.getPreferencesKey() + iuName;
            localStorage.setItem(key, iuPreferences);
        } else if (this.oid) {
            let found = false;
            for (const gridPref of this.gridPreferences) {
                if (gridPref.piuname === iuName) {
                    gridPref.gridstate = iuPreferences;
                    found = true;
                }
            }
            if (!found) {
                this.gridPreferences.push({piuname: iuName, gridstate: iuPreferences});
            }
            return true;
        }
        return false;
    }

    /**
     * Removes the grid preferences using the ui name
     * @param uiName Grid name
     */
    public removeGridPreferencesByName(uiName: string) {
        const index = this.gridPreferences.findIndex( ele => ele.piuname === uiName );
        if (index >= 0) {
            this.gridPreferences.splice(index);
        }
    }
}


/**
 * Stores the application global information
 */
@Injectable({providedIn: 'root'})
export class AppGlobalInfo {

    /** API Version */
    public readonly apiVersion = '1.0';
    /** API control version flag error */
    public wrongVersionError = false;
    /** Constants values */
    public APPCONSTANTS: Configuration;
    /** Exchange information stack */
    public appExchangeInfo: AppExchangeInfo;
    /** Logged user information */
    public loggedUserInfo: LoggedUserInfo | null = null;
    /** Notifies changes in the logged user information */
    public infoChanged: Subject<void> = new Subject<void>();
    /** Notifies user account must be checked  */
    public userAccountChecked: Subject<void> = new Subject<void>();

    /** Maximum with to hide filter variables area */
    public readonly maxWidthHideFilters = 575;
    /** Flag to hide or not filter variables area */
    public hideFilters = false;
    /** Flag to log the errors in the calls to the backend */
    public logBackEndErrors = true;
    /** Comm. error flag */
    public errorCET = false;
    /** Comm. error timeout */
    public timeoutCET = 230000;
    /** Shown scenario title */
    public scenarioTitle = '';
    /** Runing Standalone or MFE */
    public isStandAlone = true;

    constructor(private readonly httpClient: HttpClient) {
        this.APPCONSTANTS = new Configuration();
        this.appExchangeInfo = new AppExchangeInfo();
        this.loadAppConfiguration();

        // Filter variables area must be hide or not
        if (window.innerWidth < this.maxWidthHideFilters) {
            this.hideFilters = true;
        }
        this.isStandAlone = environment.standalone;
    }

    /**
     * Load application configuracion from the file
     */
    public loadAppConfiguration(): Promise<boolean> {
        this.APPCONSTANTS.BASE_URL = environment.urlms;
        return Promise.resolve(true); 
    }

    /**
     * Returns the logged user information
     */
    public getLoggedUserInfo(): LoggedUserInfo {
        if (!this.loggedUserInfo) {
            this.loggedUserInfo = new LoggedUserInfo();
            const userInSession = sessionStorage.getItem('loggedUserInfo');
            if (userInSession) {
                this.loggedUserInfo.deserialize(JSON.parse(userInSession));
            }
        }
        return this.loggedUserInfo;
    }

    /**
     * Returns true if the current user is the previous user, before session timeout
     */
    public isPreviousUser(): boolean {
        return this.getLoggedUserInfo().oid && this.getLoggedUserInfo().previousOid &&
               JSON.stringify(this.getLoggedUserInfo().oid).toLowerCase() ===
               JSON.stringify(this.getLoggedUserInfo().previousOid).toLowerCase();
   }

    /**
     * Set user acces token
     * @param userToken Access token
     */
    public setUserToken(userToken: string): void {
        const previousOid = this.loggedUserInfo ? this.loggedUserInfo.oid : undefined;
        this.loggedUserInfo = new LoggedUserInfo();
        this.loggedUserInfo.previousOid = previousOid;
        this.loggedUserInfo.token = userToken;
        sessionStorage.setItem('loggedUserInfo', JSON.stringify(this.loggedUserInfo));
    }

    /**
     * Sets the logged user information
     * @param userOid Logged user Oid
     * @param roles List of active roles
     * @param displayName Text to shown in page header
     */
    public setUserInformation(userOid: any, roles: string[], displayName: string) {
        if (this.loggedUserInfo) {
            this.loggedUserInfo.setUserRoles(roles);
            this.loggedUserInfo.oid = userOid;
            this.loggedUserInfo.displayName = displayName;
            sessionStorage.setItem('loggedUserInfo', JSON.stringify(this.loggedUserInfo));
            this.infoChanged.next();
        }
    }

    /**
     * Updates user token
     * @param userToken Token
     */
    public updateUserToken(userToken: string): void {
        if (this.loggedUserInfo) {
            this.loggedUserInfo.token = userToken;
            sessionStorage.setItem('loggedUserInfo', JSON.stringify(this.loggedUserInfo));
        }
    }

    /**
     * Updates user information in cache
     * @param userCache Information in cache
     */
    public updateUserCache(userCache: any): void {
        if (this.loggedUserInfo) {
            this.loggedUserInfo.recordUserActivity();
            this.loggedUserInfo.userCache = userCache;
            sessionStorage.setItem('loggedUserInfo', JSON.stringify(this.loggedUserInfo));
        }
    }

    /**
     * Sets the logged user visibility
     * @param visibleHATNodes Visible HAT elements
     * @param visibleIUs Visible Interaction Unit information
     */
    public setUserVisibilityInformation(visibleHATNodes: any, visibleIUs: any) {
        if (this.loggedUserInfo?.dynamicPermissions) {
            this.loggedUserInfo.visibleHATNodes = visibleHATNodes;
            this.loggedUserInfo.visibleIUs = visibleIUs;
            sessionStorage.setItem('loggedUserInfo', JSON.stringify(this.loggedUserInfo));
            this.infoChanged.next();
        }
    }

    public setUserGridPreferences(gridPreferences: any): void {
        if (this.loggedUserInfo) {
            this.loggedUserInfo.gridPreferences = gridPreferences;
        }
    }

    /**
     * Returns the user roles
     */
    public getUserRoles(): string[] {
        return this.getLoggedUserInfo().roles;
    }

    /**
     * Returns the Oid of the connected user
     * if the user roles contains the agent class name
     * @param className Required agent
     */
    public getOidOfAgentClass(className: string): any {
        if (this.getLoggedUserInfo().isAgentOneOf([className])) {
            return this.getLoggedUserInfo().oid;
        }
        return undefined;
    }

    /**
     * Logged user has been unauthorized by the back end.
     * Mark as not logged and clean roles
     */
    public setUserUnauthorized(): void {
        this.getLoggedUserInfo().setUnauthorized();
        this.infoChanged.next();
    }

    /**
     * Log out process
     */
    public setLogOut() {
        this.appExchangeInfo.clear();
        this.loggedUserInfo = null;
        sessionStorage.removeItem('loggedUserInfo');
        this.infoChanged.next();
        sessionStorage.setItem('aelogoutrequested', '1');
        window.location.href = environment.msal.redirectUri;
    }


    /**
     * Notify user account must be checked
     */
    public checkUserAccount(): void {
        this.userAccountChecked.next();
    }

    /**
     * Assigns the shown scenario title
     * @param title Scenario title
     */
    public setScenarioTitle(title: string): void {
        this.scenarioTitle = title;
        this.infoChanged.next();
    }
}
