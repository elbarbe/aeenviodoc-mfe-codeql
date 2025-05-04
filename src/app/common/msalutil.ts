import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MsalService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { AuthenticationResult, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from './app.utils';
import { LanguageMng } from './languageMng';
import { environment } from 'src/environments/environment';
/**
 * « Utility class for Entra Id support »
 */
@Injectable({ providedIn: 'root' })
export class MSALUtil {

    private static readonly EV_ASSINGPENDINGPATH = 'assignpendingpath';
    private static readonly EV_POSTLOGIN = 'postlogin';

    constructor(
        @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
        private readonly httpClient: HttpClient,
        private authService: MsalService,
        private readonly appGlobalInfo: AppGlobalInfo,
        private readonly languageMng: LanguageMng,
        private readonly util: Util) {

        this.appGlobalInfo.userAccountChecked.subscribe(() => this.checkAzureAccount(""));
    }

    /**
     * Checks if exists a logged user account
     */
    public checkAzureAccount(requestedUrl: string): boolean {
        if (this.authService.instance.getAllAccounts().length === 0) {
            this.appGlobalInfo.setLogOut();
            this.logInAzure(requestedUrl);
            return false;
        } else {
            this.checkAccountInBackEnd();
            return true;
        }
    }

    /**
     * Manages the user change
     */
    private processLogeddUserChange(): void {
        const existAccount = this.authService.instance.getAllAccounts().length > 0;
        if (existAccount) {
            this.checkAccountInBackEnd();
        } else {
            this.appGlobalInfo.setLogOut();
        }
    }

    public logInAzure(url: string): void {
        if (url) {
            this.launchEventSetPendingPath(url);
        }
        if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
            if (this.msalGuardConfig.authRequest) {
                const popupRequest = { ...this.msalGuardConfig.authRequest } as PopupRequest;
                popupRequest.state = url;
                popupRequest.prompt= 'select_account';
                const observer = {
                    next: (response: AuthenticationResult) => {
                        this.authService.instance.setActiveAccount(response.account);
                        this.launchEventPostLogin();
                        this.processLogeddUserChange();
                        if (environment.standalone && response.state) {
                            this.util.navigateByUrl(response.state);
                        }
                        console.log(response.account);
                    },
                    error: (err: any) => this.util.addErrorMessage('Error in login (011). ' + err)
                };
                console.log(popupRequest);
                this.authService.loginPopup(popupRequest).subscribe(observer);
            } else {

                const observer = {
                    next: (response: AuthenticationResult) => {
                        this.authService.instance.setActiveAccount(response.account);
                        this.processLogeddUserChange();
                        this.launchEventPostLogin();
                        if (environment.standalone && url) {
                            this.util.navigateByUrl(url);
                        }
                    },
                    error: (err: any) => this.util.addErrorMessage('Error in login (012). ' + err)
                };
                this.authService.loginPopup().subscribe(observer);
            }
        } else if (this.msalGuardConfig.authRequest) {
            this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
        } else {
            this.authService.loginRedirect();
        }
    }

    public logOutAzure() {
        if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
            this.authService.logoutPopup({
                postLogoutRedirectUri: environment.msal.redirectUri,
                mainWindowRedirectUri: environment.msal.redirectUri
            }).subscribe(() => {
                this.processLogeddUserChange();
            });
        } else {
            this.authService.logoutRedirect({
                postLogoutRedirectUri: environment.msal.redirectUri,
            }).subscribe(() => {
                this.processLogeddUserChange();
            });
        }
    }

    /**
     * To be used in combination when app is a Microfrontend, to notify the pending navigation path
     * @param url Panding mavigation path
     */
    private launchEventSetPendingPath(url: string): void {

        const myEvent = new CustomEvent(MSALUtil.EV_ASSINGPENDINGPATH, {
            detail: url,
            bubbles: true,
            cancelable: true,
            composed: false,
        });
        const listBody = document.getElementsByTagName('body');
        if (listBody && listBody.length > 0) {
            listBody[0].dispatchEvent(myEvent);
        }
    }

    /**
     * To be used in combination when app is a Microfrontend, to notify the success logon process
     * @param url Panding mavigation path
     */
    private launchEventPostLogin(): void {

        const myEvent = new CustomEvent(MSALUtil.EV_POSTLOGIN, {
            detail: '',
            bubbles: true,
            cancelable: true,
            composed: false,
        });
        const listBody = document.getElementsByTagName('body');
        if (listBody && listBody.length > 0) {
            listBody[0].dispatchEvent(myEvent);
        }
    }

    /**
     * Azure account exists, now check account info in our backend
     */
    private checkAccountInBackEnd(): void {

        // Write your own validation process

        if (!this.appGlobalInfo.getLoggedUserInfo().isUserInfoComplete()) {
            // this.util.showWaitDialog();
            this.callTokenAzure().then((userData: any) => {

                if (userData.hasRegistered) {
                    let displayName: string | undefined = '';
                    let activeAccount = this.authService.instance.getActiveAccount();
                    displayName = activeAccount?.name ? activeAccount.name : '';
                    this.appGlobalInfo.setUserInformation(
                        userData.oidJson,
                        userData.roles.split(','),
                        displayName);
                    this.appGlobalInfo.updateUserToken(userData.token);
                    this.callGetUserInfo().then( () => {
                        // this.util.hideWaitDialog();
                    }).catch((err: Error) => {
                        console.log(err.toString());
                        this.util.addErrorMessage(err.message);
                        // this.util.hideWaitDialog();
                    });
                } else {
                    let message = this.languageMng.translateText('app_LOGINERRORCLOSESESSION', '');
                    message += userData.errorCode ? '<br>Code: ' + userData.errorCode  : '';
                    this.util.showConfirmDialog(
                        this.languageMng.translateText('app_ERROR_TITLE', ''),
                        message).then( (value: number) => {
                        if (value === 0) {
                            this.logOutAzure();
                        }
                    });
                    // this.util.hideWaitDialog();
                }
            }).catch((err: Error) => {
                console.log(err.toString());
                this.util.addErrorMessage(err.message);
                this.appGlobalInfo.setLogOut();
                // this.util.hideWaitDialog();
            });
        }
    }

    /**
     * Call backend validation process
     * @returns 
     */
    private callTokenAzure(): Promise<any> {

        if (this.authService.instance.getAllAccounts().length === 0) {
            return Promise.reject(new Error('E010: No account found'));
        }

        if (!this.authService.instance.getAllAccounts()[0].idToken) {
            return new Promise<any>((resolve, reject) => {
                this.authService.instance.acquireTokenSilent({
                    scopes: ["user.read"],
                    account: this.authService.instance.getAllAccounts()[0],
                }).then((result: AuthenticationResult) => {
                    this.callTokenAzureAux(result.idToken).then((res: any) => {
                        resolve(res);
                    }).catch((err: Error) => {
                        reject(err);
                    })
                }).catch((err: Error) => {
                    reject(err);
                });
            });
        } else {
            return this.callTokenAzureAux(this.authService.instance.getAllAccounts()[0].idToken as string);
        }
    }

    private callTokenAzureAux(idToken: string): Promise<any> {

        let url = this.appGlobalInfo.APPCONSTANTS.BASE_URL + '/TokenAzure';
        let headers = new HttpHeaders();
        headers = headers.set('API-Version', this.appGlobalInfo.apiVersion);
        const options = { headers, observe: 'response' as 'body', withCredentials: true };

        const data = {
            "facetname": "",
            "username": idToken,
            "password": ""
        };

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
                        resolve(res.body);
                    },
                    error: (msg: Error) => {
                        reject( new Error('E020: ' + msg.message));
                    }
                });
        });
    }

    /**
     * Get user the user information
     * @returns Promise
     */
    private callGetUserInfo(): Promise<void> {

        let url = this.appGlobalInfo.APPCONSTANTS.BASE_URL + '/api/Account/UserInfo';

        let headers = new HttpHeaders();
        if (this.appGlobalInfo.getLoggedUserInfo().token) {
            headers = headers.set('Authorization', 'Bearer ' + this.appGlobalInfo.getLoggedUserInfo().token);
        }
        headers = headers.set('API-Version', this.appGlobalInfo.apiVersion);
        const options = { headers, observe: 'response' as 'body',  responseType: 'json' as 'json', withCredentials: true };


        return new Promise<void>((resolve, reject) => {
            this.httpClient.post(url, '', options).subscribe(
                {
                    next: (res: any) => {
                        
                        if (res?.body?.userCache) {
                            this.appGlobalInfo.updateUserCache(JSON.parse(res.body.userCache)); 
                        }
                        resolve();
                    },
                    error: (msg: Error) => {
                        reject( new Error('E030: ' + msg.message));
                    }
                });
        });
    }    
}

