import { Injectable } from '@angular/core';
import { Navigation, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Util } from './app.utils';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { AbstractIU } from './baseIUElements';

/**
 * « Back navigation guard »
 */
@Injectable({providedIn: 'root'})
export class PopStateNavigationGuard implements CanDeactivate<any> {

    constructor(private readonly util: Util, private readonly appGlobalInfo: AppGlobalInfo) { }

    canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot): boolean {

        // Navigator Back and Forward buttons
        const currentNav: Navigation | null = this.util.getCurrentNavigation();
        if (currentNav && currentNav.trigger === 'popstate') {
            return false;
        }

        // Check the component type
        const isAbstractIU = (scenario: any): boolean => (scenario as AbstractIU).canBeDeactivated !== undefined;
        if (isAbstractIU(component)) {
            return component.canBeDeactivated();
        }

        return true;
    }
}
