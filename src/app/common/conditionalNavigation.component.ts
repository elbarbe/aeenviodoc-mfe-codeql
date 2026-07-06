import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from './app.utils';
import { LanguageMng } from './languageMng';

/**
 * « Conditional navigation component »
 */
@Component({
    selector: 'conditionalNavigation',
    template: `
<form novalidate>

    <div class="condNavQuestion">{{question}}</div>

    <div class="condNavAnwsers">
        <ng-container *ngFor="let anwser of anwsers; let i = index">
            <div class="condNavAnwser">
                <input style="margin-right: 5px;" type="radio" name="optradio" (change)="onSelectionChange(i)"/>
                <label>{{anwser}}</label>
            </div>
        </ng-container>

    </div>

    <div class="col-12 siuButtons">
        <button type="button" class="btn btn-primary" (click)="processSelection()">
            {{langMng.translateText('app_SIU_BTNOK', '')}}</button>
        <button type="button" class="btn btn-danger" (click)="processCancel()">
            {{langMng.translateText('app_SIU_BTNCANCEL', '')}}</button>
    </div>
</form>

  `
})
export class ConditionalNavigationComponent implements OnInit {

    private selectedIndex = -1;
    public question = '';
    public anwsers: string[] = [];

    constructor(
        protected appGlobalInfo: AppGlobalInfo,
        protected util: Util,
        protected changeDetectorRef: ChangeDetectorRef,
        public langMng: LanguageMng) {}


    public ngOnInit(): void {
        this.appGlobalInfo.setScenarioTitle('');
        this.question = this.appGlobalInfo.appExchangeInfo.getConditionalNavigationQuestion();
        this.anwsers = this.appGlobalInfo.appExchangeInfo.getConditionalNavigationAnwsers();
    }

    public onSelectionChange(index: number): void {
        this.selectedIndex = index;
    }

    public processSelection(): void {
        if (this.selectedIndex > -1 && this.appGlobalInfo.appExchangeInfo.getConditionalExchangeInfos().length > this.selectedIndex) {
            this.util.navigateTo(this.appGlobalInfo.appExchangeInfo.getConditionalExchangeInfos()[this.selectedIndex]);
        }
    }

    public processCancel(): void {
        this.util.navigateComeBack(this.appGlobalInfo.appExchangeInfo.getConditionalExchangeInfos()[0].comeBackContext);
    }
}

