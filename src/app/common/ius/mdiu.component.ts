import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LanguageMng } from '../languageMng';
import { AbstractMDIU } from '../abstractMDIU';
import { AbstractIIU } from '../abstractIIU';
import { AbstractPIU } from '../abstractPIU';

/**
 * « Master-Detail interaction unit component »
 */
@Component({
    selector: 'imes-mdiu',
    templateUrl: './mdiu.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class MDIUComponent {

    /** Abstract Master-Detail interaction unit */
    @Input() public mdiu!: AbstractMDIU;

    constructor(
        public readonly langMng: LanguageMng) {
    }

    public castAbstractIIU(iu: any): AbstractIIU {
        return iu as AbstractIIU;
    }
    public castAbstractPIU(iu: any): AbstractPIU {
        return iu as AbstractPIU;
    }
    public castAbstractMDIU(iu: any): AbstractMDIU {
        return iu as AbstractMDIU;
    }
}
