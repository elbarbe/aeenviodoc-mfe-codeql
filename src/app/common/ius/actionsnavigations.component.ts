import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractQueryIU } from '../queryIUElements';

/**
 * « Actions and Navigations component »
 */
@Component({
    selector: 'imes-actionsnavigations',
    templateUrl: './actionsnavigations.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class ActionsNavigationsComponent {

    /** Abstract query component */
    @Input() public queryIU: AbstractQueryIU;

    constructor() {}

    public anyVisible(): boolean {
        for (const acction of this.queryIU.actions) {
            if (acction.visible) {
                return true;
            }
        }
        for (const nav of this.queryIU.navigations) {
            if (nav.visible) {
                return true;
            }
        }
        return false;
    }
}

