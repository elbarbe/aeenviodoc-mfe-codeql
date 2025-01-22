import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from './app.utils';
import { LanguageMng } from './languageMng';
import { ErrorInformation } from './answerRequestInformation';
/**
 * Generic component for change password service
 */
@Component({
    selector: 'imes-changepassword',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `

    <div style="width: 250px;margin-bottom: 10px;">
        <div class="form-group"  >
            <label class="control-label">{{langMng.translateText('app_CHGPWD_OLD', '')}}</label>
            <input type="password" class="form-control" [(ngModel)]="old"
            required="true" name="old" autocomplete="off"/>
        </div>
        <div class="form-group" >
            <label class="control-label">{{langMng.translateText('app_CHGPWD_NEW', '')}}</label>
            <input type="password" class="form-control" [(ngModel)]="new"
            required="true" name="new" autocomplete="off"/>
        </div>
        <div class="form-group" >
            <label class="control-label">{{langMng.translateText('app_CHGPWD_CONFIRM', '')}}</label>
            <input type="password" class="form-control" [(ngModel)]="confirm"
            required="true" name="confirm" autocomplete="off"/>
        </div>
    </div>
    <div style="width: 250px;" class="siuButtons">
        <button type='button' class="btnOk btn btn-primary" (click)="saveChanges()">
            {{langMng.translateText('app_SIU_BTNOK', '')}}</button>
        <button type='button' class="btnCancel btn btn-danger" (click)="processCancel()">
            {{langMng.translateText('app_SIU_BTNCANCEL', '')}}
        </button>
    </div>

  `
})
export class ChangePasswordComponent implements OnInit {

    /** Members  */
    public old = '';
    public new = '';
    public confirm = '';

    @Output() closed = new EventEmitter<void>();

    constructor(
        protected appGlobalInfo: AppGlobalInfo,
        protected util: Util,
        public langMng: LanguageMng,
        public changeDetectorRef: ChangeDetectorRef) {
    }

    public ngOnInit(): void {
        this.old = '';
        this.new = '';
        this.confirm = '';
    }

    /**
     * Call service
     */
    public saveChanges(): void {
        if (this.util.isNull(this.old)) {
            this.util.addErrorMessage(this.langMng.translateTextWithParams('app_FLD_ERRORMANDATORY', '',
                this.langMng.translateText('app_CHGPWD_OLD', '')));
            return;
        }
        if (this.util.isNull(this.new)) {
            this.util.addErrorMessage(this.langMng.translateTextWithParams('app_FLD_ERRORMANDATORY', '',
                this.langMng.translateText('app_CHGPWD_NEW', '')));
            return;
        }
        if (this.util.isNull(this.confirm)) {
            this.util.addErrorMessage(this.langMng.translateTextWithParams('app_FLD_ERRORMANDATORY', '',
                this.langMng.translateText('app_CHGPWD_CONFIRM', '')));
            return;
        }
        if (this.new !== this.confirm) {
            this.util.addErrorMessage(this.langMng.translateTextWithParams('app_FLD_ERRORPWDCONF', '',
                this.langMng.translateText('app_CHGPWD_NEW', '')));
            return;
        }

        this.util.callChangePassword(this.old, this.new).then( () => {
            this.processCancel();
        }).catch( (err: ErrorInformation) => {
            this.util.addErrorMessage(err);
        });
    }

    /**
     * Manages Cancel button
     */
    public processCancel(): void {
        this.closed.emit();
    }
}
