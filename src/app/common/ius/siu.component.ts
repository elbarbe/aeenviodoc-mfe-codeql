import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LanguageMng } from '../languageMng';
import { AbstractServiceIU } from '../abstractSIU';
import { FieldOVLense, FieldOVLenseSearch, Field, FieldBlob } from '../baseIUElements';

/**
 * « Service interaction unit component »
 */
@Component({
    selector: 'imes-siu',
    templateUrl: './siu.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class SIUComponent {

    /** Abstract service interaction unit */
    @Input() public siu!: AbstractServiceIU;

    constructor(
        public readonly langMng: LanguageMng) {
    }

    public onLenseSelected(field: Field): void {
        const methodName = 'on' + field.nameInRequest.replace('_', 'u') + 'Change';
        const func: any = this.siu[methodName as keyof AbstractServiceIU];
        if (func) {
            func.apply(this.siu, []);
        }
    }
    public onLenseClean(field: Field): void {
        const methodName = 'clean' + field.nameInRequest.replace('_', 'u');
        const func: any = this.siu[methodName as keyof AbstractServiceIU];
        if (func) {
            func.apply(this.siu, []);
        }
    }
    public doSearchAction(field: Field): void {
        const methodName = 'doSearchAction';
        const arg = this.siu.className.replace('_', 'u').toLowerCase() + this.siu.serviceName.replace('_', 'u').toLowerCase() +
            field.nameInRequest.replace('_', 'u');
        const func: any = this.siu[methodName as keyof AbstractServiceIU];
        if (func) {
            func.apply(this.siu, [arg]);
        }
    }

    public onLenseSearchSelected(field: FieldOVLenseSearch, event: any): void {
        const methodName = 'process' + field.nameInRequest.replace('_', 'u') + 'Selected';
        if (this.siu[methodName as keyof AbstractServiceIU]) {
            const func: any = this.siu[methodName as keyof AbstractServiceIU];
            func.apply(this.siu, [event]);
        }
    }

    public onKeypressLenseSearch(field: FieldOVLenseSearch): void {
        const methodName = 'onKeypressLenseSearch';
        const arg = 'on' + field.nameInRequest.replace('_', 'u') + 'Change';
        this.siu[methodName].apply(this.siu, [arg]);
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
}
