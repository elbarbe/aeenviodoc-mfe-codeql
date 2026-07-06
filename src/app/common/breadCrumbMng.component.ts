import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from './app.utils';

/**
 * « Component for breadcrumb management »
 */
@Component({
    selector: 'breadcrumb',
    template: `
    <ul *ngIf="breadcrumbs.length > 0" class="breadcrumb">
        <li *ngFor="let breadcrumb of breadcrumbs" class="breadcrumb-item">
            <a (click)="navigateToKey(breadcrumb.key)">
            {{ breadcrumb.label }}
            </a>
        </li>
    </ul>
  `
})
export class BreadCrumbMngComponent implements OnInit {

    /** List of breadcrumb items */
    public breadcrumbs: any[] = [];

    constructor(private readonly appGlobalInfo: AppGlobalInfo,
                private readonly router: Router,
                private readonly util: Util) {
    }

    ngOnInit() {
        // Subscribe to the NavigationEnd event
        this.router.events.subscribe((event) => {
            // Set breadcrumbs
            if (event instanceof NavigationEnd) {
                this.breadcrumbs = this.getBreadcrumbs();
            }
        });
    }

    /**
     * Return an array containing the breadcrumb items
     */
    public getBreadcrumbs(): any[] {
        const elements = [];

        let exchInfo = this.appGlobalInfo.appExchangeInfo.get();
        // Skip the comeback context
        if (exchInfo?.exchangeType === 'ComeBack') {
            exchInfo = exchInfo.originalContext.exchangeInfo;
        }
        if (exchInfo?.exchangeType === 'SelectionBackward') {
            exchInfo = exchInfo.previous.exchangeInfo;
        }
        let key = 0;
        while (exchInfo?.comeBackContext) {

            // Only those that has a breadcrumb title defined
            if (exchInfo.comeBackContext.breadCrumbTitle) {
                elements.push({
                    label: exchInfo.comeBackContext.breadCrumbTitle,
                    key,
                    context: exchInfo.comeBackContext
                });
            }

            exchInfo = exchInfo.comeBackContext.exchangeInfo;
            key++;
        }

        return elements.reverse();
    }

    /**
     * Navigate to the scenario associated with the breadcrumb key
     * @param requestedKey Breadcrumb key
     */
    public navigateToKey(requestedKey: number): void {
        for (const breadItem of this.breadcrumbs) {
            if (breadItem.key === requestedKey) {
                this.util.navigateComeBack(breadItem.context);
                break;
            }
        }
    }
}
