import { ChangeDetectorRef, ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { LanguageMng } from './languageMng';

/**
 * Blocking progress bar component.
 * Show the bar, time remaining and cancel button
 */
@Component({
    selector: 'imes-progressbar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <p-blockUI  [blocked]="show">
        <div style="width: 300px;height: 140px;text-align: center;margin-top: 30%;background: white;margin-left: auto;margin-right: auto;border: 2px solid;border-radius: 17px;border-color: #337ab7;border-bottom-right-radius: 34px;border-bottom-left-radius: 34px;">
            <label style="width: 100%;border-radius: 40px;color: white;background-color: #337ab7;height: 29px;">{{title}}</label>
            <div style="min-height: 50px;">
                <progress *ngIf="value > 0" [value]="value" max="100" style="width: 80%;clear: both;"></progress>
                <div *ngIf="value > 0" style="width: 100%;height: 30px;padding: 0px 20px 0px 20px;clear: both;">{{message}}</div>
            </div>
            <button type="button" class="btnCancel btn btn-danger" (click)="cancel()" [disabled]="buttonDisabled">
                {{langMng.translateText('app_PRGBAR_BTNSTOP', '')}}</button>
        </div>
    </p-blockUI>
  `
})
export class ProgressBarComponent {

    /** Must be shown or not */
    public show = false;
    /** Percentage value */
    public value = 0;
    /** Percentage value */
    public title = '';
    /** Seconds remaining */
    public secondsRemaining = 0;
    /** Message informing about the remaining time */
    public message = '';
    /** Button cancel disabled */
    public buttonDisabled = false;

    /**
     * Inbound data for the component. Value and seconds remaining
     */
    @Input()
    get data(): {value: number, secondsRemaining: number, title: string} {
        return {value: this.value, secondsRemaining: this.secondsRemaining, title: this.title};
    }
    set data(value: {value: number, secondsRemaining: number, title: string}) {
        this.value = value.value;
        this.title = value.title;
        this.secondsRemaining = value.secondsRemaining;
        if (this.value >= 0) {
            this.show = true;
            this.buttonDisabled = false;
        } else {
            this.show = false;
        }
        this.formatMessage();
        this.changeDetectorRef.markForCheck();
    }

    /** Cancel event */
    @Output() canceled = new EventEmitter<any>();

    constructor(private readonly appGlobalInfo: AppGlobalInfo,
                protected changeDetectorRef: ChangeDetectorRef,
                public langMng: LanguageMng) {
    }

    /**
     * Set the time remaining message
     */
    private formatMessage(): void {
        if (this.secondsRemaining !== -1) {
            if (this.secondsRemaining) {
                this.message = 'Tiempo restante estimado: ';
                if (this.secondsRemaining > 60) {
                    this.message += Math.floor(this.secondsRemaining / 60).toString() + ' m. ';
                    this.message += (Math.round(this.secondsRemaining % 60)).toString() + ' s.';
                } else {
                    this.message += Math.round(this.secondsRemaining).toString() + ' s.';
                }
            } else {
                this.message = this.value + '%';
            }
        }
    }

    /**
     * Cancel button has been pressed. Notify to observers
     */
    public cancel(): void {
        this.buttonDisabled = true;
        this.canceled.emit();
        this.changeDetectorRef.markForCheck();
    }
}
