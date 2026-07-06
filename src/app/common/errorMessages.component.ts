import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { LanguageMng } from './languageMng';

/**
 * « Application error messages component »
 */
@Component({
    selector: 'errorMessages',
    template: `

    <p-dialog header="" [(visible)]="display" (onHide)="clear()"  [modal]="true"  [blockScroll]="true"
        [draggable]="true" [closeOnEscape]="true" [resizable]="false" [closable]="true"
        position="top" [baseZIndex]="1040"
        [style]="{'box-shadow': 'none', 'border': '0px', 'padding-top': '60px'}"
        styleClass="col-12 col-sm-7 col-md-5 errorMessages"
        [contentStyle]="{'max-height':'300px', 'overflow-y': 'auto', 'padding': '10px'}" >
        <p-header>{{langMng.translateText('app_ERROR_TITLE', '')}}</p-header>

        <ng-container *ngFor="let serviceError of messages">
            <div *ngIf="!appGlobalInfo.errorCET" class="alert alert-danger" style="word-break: break-word;">
                {{serviceError}}
            </div>
            <div *ngIf="appGlobalInfo.errorCET" class="alert alert-info" style="word-break: break-word;">
                {{serviceError}} <b>{{langMng.translateText('app_BACKENDERROR_CET2','')}}</b>
            </div>
        </ng-container>


        <p-footer>
            <div style="text-align: center;">
                <button type="button" class="btn btn-primary" (click)="clear()">
                    {{langMng.translateText('app_CLOSE', '')}}</button>
            </div>
        </p-footer>
    </p-dialog>
  `
})
export class ErrorMessagesComponent {
    /** Flag to show the dialog */
    public display = false;

    /** Error messages list */
    public errorMessages: string[] = [];

    @Input()
    get messages(): string[] {
        return this.errorMessages;
    }
    set messages(msgs: string[]) {
        this.errorMessages = msgs;
        if (this.errorMessages && this.errorMessages.length > 0) {
            this.display = true;
        } else {
            this.display = false;
        }
    }

    /** Clear error messages event */
    @Output() cleared = new EventEmitter<{}>();

    constructor(
        public readonly appGlobalInfo: AppGlobalInfo,
        public readonly langMng: LanguageMng,
        private readonly changeDetectorRef: ChangeDetectorRef) {
    }

    /**
     * Process the clear messages event
     */
    public clear(): void {
        this.appGlobalInfo.errorCET = false;
        this.cleared.emit();
        this.changeDetectorRef.markForCheck();
    }
}
