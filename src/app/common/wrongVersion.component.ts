import { Component, OnInit } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from './app.utils';
import { LanguageMng } from './languageMng';

/**
 * « Wrong version component »
 */
@Component({
    selector: 'wrongversion',
    template: `

    <div class="wrongversion" *ngIf="!downloadURL"
        style="width: 100%; padding-top: 40px; text-align: center;color: #707070;background-color: #e9ecef;float: left;height: 100vh;">
        <div style="width: 80%;margin-left: 10%;margin-right: 10%;font-size: 26px;border-bottom: solid 6px;">
            {{langMng.translateText('app_WVTITLE', '')}}</div>

        <div class="wvcenter" style="width: 80%;background-color: white;float: left;margin-left: 10%;margin-right: 10%;">
            <div style="width: 30%;float: left;">
                <img src="assets/blueCloud.png" alt="Blue cloud" height="200" width="200"></div>
            <div style="width: 69%;float: right;text-align: left;font-size: 26px;padding-top: 60px;">
                {{langMng.translateText('app_WVTEXT1', '')}}</div>
            <div style="width: 69%;float: right;text-align: left;font-size: 20px;">
                {{langMng.translateText('app_WVTEXT2', '')}}</div>
            <div style="width: 100%; float: left;padding-top: 30px;font-size: 18px;">
                {{langMng.translateText('app_WVBOTTOM', '')}}</div>
        </div>
    </div>

    <div class="wrongversionapp" *ngIf="downloadURL"
        style="width: 100%; padding-top: 40px; text-align: center;color: #707070;background-color: #e9ecef;float: left;height: 100vh;">
        <div style="width: 90%;background-color: white;float: left;margin-left: 5%;margin-right: 5%;font-size: 26px;">
            {{langMng.translateText('app_WVTITLEAPP', '')}}</div>

        <div class="wvcenter" style="width: 90%;background-color: white;float: left;margin-left: 5%;margin-right: 5%;">
            <div style="width: 100%;float: left;">
                <img src="assets/blueCloud.png" alt="Blue cloud" height="150" width="150"></div>
            <div style="width: 100%;float: left;text-align: left;font-size: 18px;padding: 0px 20px 30px 20px;text-align: justify;">
                {{langMng.translateText('app_WVTEXT1APP', '')}}</div>
            <button class="btn btn-lg btn-primary text-center"
                (click)="downloadlastVersion()">
                {{langMng.translateText('app_WVTEXT2APP', '')}}</button>
            <div style="width: 100%;background-color: white;float: left;font-size: 16px;padding: 30px 20px 30px 20px;text-align: justify;">
                {{langMng.translateText('app_WVBOTTOMAPP', '')}}</div>
        </div>

    </div>

  `
})
export class WrongVersionComponent implements OnInit {

    /** URL of the new version */
    public readonly downloadURL = '';
    /** File will be saved with this name */
    public readonly downloadFileName = '';

    constructor(
        protected appGlobalInfo: AppGlobalInfo,
        protected util: Util,
        public langMng: LanguageMng) {
    }

    public ngOnInit(): void {
        if (!this.appGlobalInfo.wrongVersionError) {
            this.util.navigateToMain();
        }
    }

    public downloadlastVersion(): void {
        this.util.callHttpGetFile(this.downloadURL).then((data: any) => {
            this.util.saveFile(data, this.downloadFileName);
        }).catch((error: any) => {
            this.util.addErrorMessage(error);
        });
    }
}
