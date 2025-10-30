import { Component, ChangeDetectorRef, HostListener } from '@angular/core';
import { Util } from './common/app.utils';
import { Title } from '@angular/platform-browser';
import { LanguageMng } from './common/languageMng';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppGlobalInfo } from './app.appglobalinfo';

@Component({
    selector: 'aeenviodoc-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {

    /** Flag to show/hide the wait dialog */
    public showWaitDialog = false;
    /** Timer for wait dialog */
    private waitDialogTimer: any;
    /** Application error messages */
    public errorMessages: string[] = [];
    /** Flag to show the preferences dialog */
    public showGridPreferences = false;
    /** Columns to personalize in preferences dialog */
    public gridColumnsToEdit: any[] = [];
    /** Interaction unit in popup information */
    public iuInPopUpInfo: {visible: boolean, selector: string, title: string} = {visible: false, selector: '', title: ''};
    /** Progress bar information */
    public progressBarData: {value: number, secondsRemaining: number, title: string} = {value: -1, secondsRemaining: 0, title: ''};
    /** Body content margin top */
    public bodyMarginTop = 0;

    private subscriptions: Subscription;
    constructor(
        protected util: Util,
        protected changeDetectorRef: ChangeDetectorRef,
        private readonly titleService: Title,
        private readonly langMng: LanguageMng,
        private messageService: MessageService,
        private configPrimeNG: PrimeNGConfig,
        public appGlobalInfo: AppGlobalInfo

    ) {
        this.appGlobalInfo.getLoggedUserInfo();
        this.appGlobalInfo.appExchangeInfo.clear();
        this.subscriptions = new Subscription();
        this.subscriptions.add(util.errorMessagesAction.subscribe(data => this.errorMessagesAction(data)));
        this.subscriptions.add(util.gridPreferencesAction.subscribe(data => this.gridPreferencesAction(data)));
        this.subscriptions.add(util.modalForIUAction.subscribe(data => this.modalForIUAction(data)));
        this.subscriptions.add(util.modalForIUResponse.subscribe(data => this.processCloseModalForIU(data)));
        this.subscriptions.add(util.progessBarAction.subscribe(data => this.progessBarAction(data)));
        this.subscriptions.add(util.toastMessagesAction.subscribe(data => this.toastMessagesAction(data)));
        titleService.setTitle(langMng.translateText('app_TITLE', ''));
        this.configPrimeNG.setTranslation(this.langMng.getPrimNGTranslation());
    }
    
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    /**
     * Manages the suscription to the error messages observable
     */
    public errorMessagesAction(data: string): void {
        let tempError = this.errorMessages.slice();
        if (data?.length > 0) {
            tempError.push(data);
        } else {
            tempError = [];
        }
        this.errorMessages = tempError;
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Manages the toast messages observable
     */
    public toastMessagesAction(data: any): void {
        let severity = 'info';
        if (data.severity) {
            severity = data.severity;
        }
        let summary = this.langMng.translateText('app_ERROR_TITLE', 'Info');
        if (data.summary) {
            summary = data.summary;
        }
        let detail = data;
        if (data.detail) {
            detail = data.detail;
        }
        this.messageService.add({key: 'mainToast',
            severity,
            summary,
            detail});
    }

    /**
     * Clear the error messages
     */
    public clearErrorMessages(): void {
        this.errorMessages = [];
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the preferences action in any grid
     * @param data Grid columns to be personalized
     */
    public gridPreferencesAction(data: any[]) {
        if (data?.length > 0) {
            this.gridColumnsToEdit = data;
            this.showGridPreferences = true;
            this.changeDetectorRef.markForCheck();
        }
    }

    /**
     * Manages the close event in preferences dialog
     * @param data Modified columns
     */
    public closeGridPreferences(data: any): void {
        this.showGridPreferences = false;
        this.util.gridPreferencesResponse.next(data);
        this.gridColumnsToEdit = [];
        this.changeDetectorRef.markForCheck();
    }


    /**
     * Manages the event when an interaction unit must be shown in the modal popup
     * @param data Modal information
     */
    public modalForIUAction(data: any) {
        if (data) {
            this.iuInPopUpInfo.selector = data.selector;
            this.iuInPopUpInfo.title = data.title;
            this.iuInPopUpInfo.visible = true;
            const exchInfo = this.appGlobalInfo.appExchangeInfo.get();
            if (exchInfo) {
                exchInfo.isInModal = true;
            }
            this.changeDetectorRef.markForCheck();
        }
    }

    /**
     * Manages the event when the interaction unit in modal popup is closed
     * @param data Modal result
     */
    public processCloseModalForIU(data: any): void {
        this.iuInPopUpInfo.visible = false;
        this.iuInPopUpInfo.selector = '';
        this.iuInPopUpInfo.title = '';
        this.changeDetectorRef.markForCheck();
    }

    public cancelProgressBar(): void {
        this.util.progessBarCancelResponse.next();
    }

    public progessBarAction(data: {title: string, value: number, secondsRemaining: number}): void {
        setTimeout(() => {
            this.progressBarData = data;
        });
    }

    /**
     * Manages the window resize event
     * @param event Event arguments
     */
    @HostListener('window:resize', ['$event'])
    public windowResize(event: any): void {
        this.adjustBodyContent();
    }

    /**
     * Manages the window load event
     * @param event Event arguments
     */
    @HostListener('window:load', ['$event'])
    public windowLoad(event: any): void {
        this.adjustBodyContent();
    }

    /**
     * Adjust padding-top of body-content according to the height of menu
     */
    private adjustBodyContent(): void {
        // In spa environment no marging top
        if (this.appGlobalInfo.isStandAlone) {

            const divMenu = document.querySelector('#navbarSupportedContent');
            if (divMenu?.clientHeight) {
                this.bodyMarginTop = divMenu.clientHeight;
            } else {
                // Default value
                this.bodyMarginTop = 40;
            }
            if (this.bodyMarginTop < 40) {
                this.bodyMarginTop = 40;
            }
        } else {
            this.bodyMarginTop = 0;
        }
    }

    @HostListener('body:navigatemfe2iu', ['$event'])
    public navigate2iu(event: any): void {
        // event.detail
        // {
        //     "mfeprefix": "aeusuarios",
        //     "class": "gestor",
        //     "iu": "piu_gestores",
        //     "filter": ""
        // }
        if (event?.detail?.class && event?.detail?.iu) {
            this.util.navigateFromAction(event.detail.class, event.detail.iu, null, null, null, '', event.detail.filter);
        }
    }
}

