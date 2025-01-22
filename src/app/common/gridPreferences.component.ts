import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output, EventEmitter } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { LanguageMng } from './languageMng';

@Component({
    selector: 'gridPreferences',
    templateUrl: './gridPreferences.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridPreferencesComponent {

    /** Grid columns */
    @Input() public gridColumns: any[] = [];
    /** Flag to show the dialog */
    @Input() public display = false;
    /** Close event */
    @Output() closed = new EventEmitter<any>();
    /** Selected row */
    public selectedRow: any;

    constructor(
        private readonly appGlobalInfo: AppGlobalInfo,
        public readonly langMng: LanguageMng,
        private readonly changeDetectorRef: ChangeDetectorRef) {
    }

    /**
     * Process the save button
     */
    public save(): void {
        this.closed.emit({result: 0, cols: this.gridColumns});
    }

    /**
     * Process the cancel button
     */
    public cancel(): void {
        this.closed.emit({result: 1, cols: []});
    }

    /**
     * Moves the selected row one position up
     */
    public onUp(): void {
        if (!this.selectedRow) {
            return;
        }
        const idx = this.gridColumns.findIndex((col) => col.field === this.selectedRow.field);
        if (idx > 0) {
            const col = this.gridColumns[idx];
            const array = this.gridColumns.slice();
            array.splice(idx, 1);
            array.splice(idx - 1, 0, col);
            this.gridColumns = array;
        }
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Moves the selected row one position down
     */
    public onDown(): void {
        if (!this.selectedRow) {
            return;
        }
        const idx = this.gridColumns.findIndex((col) => col.field === this.selectedRow.field);
        if (idx >= 0 && idx < this.gridColumns.length - 1) {
            const col = this.gridColumns[idx];
            const array = this.gridColumns.slice();
            array.splice(idx, 1);
            array.splice(idx + 1, 0, col);
            this.gridColumns = array;
        }
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Manages the reset button
     */
    public onReset(): void {
        this.closed.emit({result: -1, cols: []});
    }
}
