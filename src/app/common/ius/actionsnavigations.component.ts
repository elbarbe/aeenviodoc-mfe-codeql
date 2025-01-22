import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractQueryIU } from '../queryIUElements';

@Component({
    selector: 'imes-actionsnavigations',
    templateUrl: './actionsnavigations.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class ActionsNavigationsComponent {

    /** Abstract query component */
    @Input() public queryIU!: AbstractQueryIU;

    constructor() {}
}
