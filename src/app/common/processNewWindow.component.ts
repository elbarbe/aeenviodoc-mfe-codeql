import { Component, OnInit } from '@angular/core';
import { AppGlobalInfo, LoggedUserInfo } from '../app.appglobalinfo';
import { LanguageMng } from '../common/languageMng';
import { Util } from './app.utils';
import { ExchangeInfo } from './app.exchangeinfo';

/**
 * « Open in new browser window component »
 */
@Component({
    selector: 'processnw',
    template: `

            <div></div>
  `
})
export class ProcessNewWindowComponent implements OnInit {
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

        try {
            const loggedUserInfo = new LoggedUserInfo();
            const userInfo = sessionStorage.getItem('processnwusr');
            if (userInfo) {
                loggedUserInfo.deserialize(JSON.parse(userInfo));
                this.appGlobalInfo.loggedUserInfo = loggedUserInfo;
                const exchInfoStr = sessionStorage.getItem('processnw');
                if (exchInfoStr) {
                    sessionStorage.removeItem('processnw');
                    const exchInfo: ExchangeInfo = new ExchangeInfo();
                    exchInfo.deserialize(JSON.parse(exchInfoStr));
                    this.util.navigateTo(exchInfo);
                } else {
                    this.util.navigateToMain();
                }
            } else {
                this.util.navigateToMain();
            }
        } catch {
            this.util.navigateToMain();
        }
    }
}

