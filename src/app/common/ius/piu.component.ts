import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LanguageMng } from '../languageMng';
import { AbstractPIU } from '../abstractPIU';
import { Field, FieldBlob } from '../baseIUElements';

@Component({
    selector: 'imes-piu',
    templateUrl: './piu.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class PIUComponent {

    /** Abstract population interaction unit */
    @Input() public piu!: AbstractPIU;

    constructor(
        public readonly langMng: LanguageMng) {
    }

    public castFieldBlob(field: Field): FieldBlob {
        return field as FieldBlob;
    }
}
