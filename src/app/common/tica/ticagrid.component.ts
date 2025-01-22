import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LanguageMng } from '../languageMng';
import { Util } from '../app.utils';
import { TICAComponentInterface } from './ticaElements';

@Component({
    selector: 'imes-tica-grid',
    templateUrl: './ticagrid.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class TICAGridComponent {

    /** Abstract population interaction unit */
    protected intTICA!: TICAComponentInterface;

    @Input()
    set tica(tica: TICAComponentInterface) {
        this.intTICA = tica;
    }
    get tica(): TICAComponentInterface { return this.intTICA; }

    constructor(
        public readonly langMng: LanguageMng,
        public readonly util: Util) {
    }

    /**
     * Returns the value for a defined selection attribute in the grid
     * @param column Column with defined selection
     * @param value Attribute value
     */
    public getValueFromDefinedSelection(column: any, value: any): string {
        let defSelValue = '';

        if (column?.options) {
            let foundElement: any;
            if (value === '') {
                foundElement = column.options.find((element: any) => element.key === null);
            } else {
                foundElement = column.options.find((element: any) => element.key === value);
            }
            if (foundElement) {
                defSelValue = foundElement.value;
            }
        }

        return defSelValue;
    }

    /**
     * Manages the new selected row in the grid
     * @param event Event information
     */
    public onGridRowSelect(event: any) {
        if (this.intTICA) {
            this.intTICA.editRowById(event.data._rowId);
        }
    }
}
