import { Component, OnInit } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { LanguageMng } from '../common/languageMng';
import { Util } from './app.utils';

/**
 * « No access component »
 */
@Component({
    selector: 'noaccess',
    template: `

            <div class="noaccess">{{langMng.translateText('app_NOACCESS', '')}}</div>
  `
})
export class NoAccessComponent implements OnInit {
    /**
     * Component constructor
     * @param langMng Language manager
     */
    constructor(
        protected appGlobalInfo: AppGlobalInfo,
        protected util: Util,
        public langMng: LanguageMng) {
    }

    public ngOnInit(): void {
        this.appGlobalInfo.setScenarioTitle('');
    }
}
