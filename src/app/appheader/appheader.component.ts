import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { ExchangeInfo } from '../common/app.exchangeinfo';
import { Util } from '../common/app.utils';
import { LanguageMng } from '../common/languageMng';
import { ModelConstants } from '../common/model.constants';
import { MSALUtil } from '../common/msalutil';

@Component({
    selector: 'app-menu',
    templateUrl: './appheader.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent implements OnInit {

    /** Menu is open or not */
    public menuOpen = false;
    /** Change password is open or not */
    public displayChangePassword = false;

    constructor(
        private readonly util: Util,
        public readonly appGlobalInfo: AppGlobalInfo,
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly msalUtil: MSALUtil,
        public langMng: LanguageMng
    ) {
    }

    ngOnInit(): void {
        this.appGlobalInfo.infoChanged.subscribe(() => this.processAppInfoChanged());
    }

    /**
     * Show or hide the menu
     */
    public toggleMenu(): void {
        this.menuOpen = !this.menuOpen;
    }

    public navigateFromHat(hatIndex: string): void {
        this.menuOpen = false;
        const exchInfo = this.getExchangeInfoForHatNode(hatIndex);
        if (exchInfo.exchangeType) {
            this.util.navigateTo(exchInfo);
        }
    }

    /**
     * Returns the exchange information for the menu element
     * @param hatIndex Menu element index
     */
    private getExchangeInfoForHatNode(hatIndex: string) {
        // Create the exchange information
        const exchInfo = new ExchangeInfo();
        exchInfo.exchangeType = 'Action';
        const index = hatIndex.indexOf('_');
        const firstLevel = index > -1 ? hatIndex.substring(0, index) : hatIndex;
        if (firstLevel === '0') {
            this.getExchangeInfoForHatSubNode0(hatIndex, exchInfo);
        }
        if (firstLevel === '1') {
            this.getExchangeInfoForHatSubNode1(hatIndex, exchInfo);
        }
        return exchInfo;
    }


    /**
     * Assign the proper values to the exchange information based in the hat index
     * @param hatSubNodeIndex Hat index
     * @param exchInfo Exchange information
     */
    private getExchangeInfoForHatSubNode0(hatSubNodeIndex: string, exchInfo: ExchangeInfo): void {
        if (hatSubNodeIndex === '0') {
            exchInfo.targetClassName = ModelConstants.Globalservices.name;
            exchInfo.targetIUName = ModelConstants.Globalservices.siuuogetreporte;
        }
    }

    /**
     * Assign the proper values to the exchange information based in the hat index
     * @param hatSubNodeIndex Hat index
     * @param exchInfo Exchange information
     */
    private getExchangeInfoForHatSubNode1(hatSubNodeIndex: string, exchInfo: ExchangeInfo): void {
        if (hatSubNodeIndex === '1') {
            exchInfo.targetClassName = ModelConstants.Solicitud.name;
            exchInfo.targetIUName = ModelConstants.Solicitud.piuuenviodoc;
        }
    }

    /**
     * Return if the menu element is visible or not
     * @param idNode Menu elemento id
     * @param agents Array of valid agents
     */
    public isNodeVisible(idNode: string, agents: string[]): boolean {
        return this.appGlobalInfo.getLoggedUserInfo().isNodeVisible(idNode, agents);
    }

    /**
     * Returns if login action is visible or not
     */
    public loginVisible(): boolean {
        return !this.logoutVisible();
    }

    /**
     * Returns if logout action is visible or not
     */
    public logoutVisible(): boolean {
        return this.appGlobalInfo.getLoggedUserInfo().logged &&
               this.appGlobalInfo.getLoggedUserInfo().oid;
    }

    /**
     * Navigates to the log in scenario
     */
    public navigateToLogin(): void {
        this.menuOpen = false;
        this.msalUtil.logInAzure('');
    }

    /**
     * Log out process
     */
    public logOut(): void {
        this.menuOpen = false;
        this.msalUtil.logOutAzure();
    }

    /**
     * Navigates to the main scenario
     */
    public navigateToMain(): void {
        this.util.navigateToMain();
    }

    /**
     * Navigates to the previous scenario
     */
    public navigateToPrevious(): void {
        this.util.navigateToPrevious();
    }

    /**
     * Returns true if the back button must bi visible or not
     */
    public backButtonVisible(): boolean {
        // If no logged user information, no visible
        if (!this.appGlobalInfo.getLoggedUserInfo().logged) {
            return false;
        }
        // If main page, no visible
        if (this.appGlobalInfo.appExchangeInfo.isMainScenario()) {
            return false;
        }
        // Any other case, visible
        return true;
    }

    /**
     * Process the change in the language
     * @param languageId Selected language Id
     */
    public onLanguageChanged(languageId: string): void {
        this.langMng.setCurrentLanguageId(languageId);
    }

    /**
     * Process the change in the logged user information
     */
    private processAppInfoChanged(): void {
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Returns the name of the user to be shown
     */
    public displayName(): string {
        if (this.appGlobalInfo.loggedUserInfo) {
            return this.appGlobalInfo.loggedUserInfo.displayName;
        }
        return '';
    }
}
