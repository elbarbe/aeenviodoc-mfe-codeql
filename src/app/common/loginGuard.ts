import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Util } from './app.utils';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { MSALUtil } from './msalutil';

/**
 * « LogIn guard »
 */
@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {

    constructor(private readonly util: Util, private readonly appGlobalInfo: AppGlobalInfo, private readonly msalUtil: MSALUtil) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.msalUtil.checkAzureAccount(state.url);
    }
}
