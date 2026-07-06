import { Component } from '@angular/core';
import { LanguageMng } from './common/languageMng';
import { AppGlobalInfo } from './app.appglobalinfo';

/**
 * « Main page Application component »
 */
@Component({
    selector: 'app-mainpage',
    templateUrl: './app.mainpage.html'
})
export class AppMainPage {

    constructor(
        public readonly appGlobalInfo: AppGlobalInfo,
        public readonly langMng: LanguageMng
    ) {
        this.appGlobalInfo.setScenarioTitle('');
    }
}

