import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { AppGlobalInfo } from '../../app.appglobalinfo';
import { LanguageMng } from './../languageMng';
import { Util } from './../app.utils';

/**
 * « Modal for Interaction Units component »
 */
@Component({
    selector: 'modalForIU',
    templateUrl: './modalforiu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalForIUComponent {

    /** Flag to show the dialog */
    @Input() public visible = false;
    /** Selector to identify the SIU */
    @Input() public selector = '';

    /** Selector to identify the SIU */
    @Input() public title = '';


    constructor(
        protected util: Util,
        private readonly appGlobalInfo: AppGlobalInfo,
        public readonly langMng: LanguageMng,
        private readonly changeDetectorRef: ChangeDetectorRef) {
    }

    /**
     * Process the cancel button
     */
    public cancel(): void {
        this.util.modalForIUResponse.next({result: 1});
    }

}

