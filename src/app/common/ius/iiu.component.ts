import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LanguageMng } from '../languageMng';
import { AbstractIIU } from '../abstractIIU';
import { Field, FieldBlob, FieldDefinedSelection, FieldOVLense, FieldOVLenseSearch } from '../baseIUElements';

/**
 * « Instance interaction unit component »
 */
@Component({
    selector: 'imes-iiu',
    templateUrl: './iiu.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class IIUComponent {

    /** Abstract instance interaction unit */
    @Input() public iiu!: AbstractIIU;

    constructor(
        public readonly langMng: LanguageMng) {
    }
    public castFieldBlob(field: Field): FieldBlob {
        return field as FieldBlob;
    }
    public castFieldOVLense(field: Field): FieldOVLense {
        return field as FieldOVLense;
    }
    public castFieldOVLenseSearch(field: Field): FieldOVLenseSearch {
        return field as FieldOVLenseSearch;
    }
    public castFieldDefinedSelection(field: Field): FieldDefinedSelection {
        return field as FieldDefinedSelection;
    }
}
