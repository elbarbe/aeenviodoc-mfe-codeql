import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LanguageMng } from '../languageMng';
import { AbstractPIU } from '../abstractPIU';

@Component({
    selector: 'imes-piubuttons',
    templateUrl: './piubuttons.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class PIUButtonsComponent {

    /** Abstract population interaction unit */
    @Input() public piu!: AbstractPIU;

    constructor(
        public readonly langMng: LanguageMng) {
    }
}
