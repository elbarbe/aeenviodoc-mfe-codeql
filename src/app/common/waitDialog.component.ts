import { Component, Input } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';

@Component({
    selector: 'waitDialog',
    template: `
    <p-blockUI *ngIf="showWait" [blocked]="showWait" [baseZIndex]="10000" styleClass="waitDialog" >
        <div style="font-size:2em;" class="pi pi-spin pi-spinner"></div>
    </p-blockUI>
  `
})
export class WaitDialogComponent {

    @Input() public showWait = false;

    constructor(private readonly appGlobalInfo: AppGlobalInfo) {
    }
}
