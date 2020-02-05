import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, EventEmitter, Inject, Input, Optional, Output, TemplateRef, ViewContainerRef, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ColumnsService } from './providers/columns.service';
import { DatagridColumnChanges } from './enums/column-changes.enum';
import { COLUMN_STATE } from './providers/column-state.provider';
var ClrDatagridHideableColumn = /** @class */ (function () {
    function ClrDatagridHideableColumn(titleTemplateRef, viewContainerRef, columnsService, columnState) {
        this.titleTemplateRef = titleTemplateRef;
        this.viewContainerRef = viewContainerRef;
        this.columnsService = columnsService;
        this.columnState = columnState;
        this.hiddenChange = new EventEmitter();
        this.subscriptions = [];
        this.viewContainerRef.createEmbeddedView(this.titleTemplateRef);
        if (!this.columnState) {
            throw new Error('The *clrDgHideableColumn directive can only be used inside of a clr-dg-column component.');
        }
    }
    Object.defineProperty(ClrDatagridHideableColumn.prototype, "clrDgHideableColumn", {
        /**
         *
         * @description
         * Setter fn for the @Input with the same name as this structural directive.
         * It allows the user to pre-configure the column's hide/show state. { hidden: true }
         * It's more verbose but has more Clarity.
         *
         *
         * @example
         * *clrDgHideableColumn
         * *clrDgHideableColumn={hidden: false}
         * *clrDgHideableColumn={hidden: true}
         *
         */
        set: function (value) {
            this.clrDgHidden = value && value.hidden ? value.hidden : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridHideableColumn.prototype, "clrDgHidden", {
        set: function (hidden) {
            this._hidden = hidden ? hidden : false;
            this.columnsService.emitStateChange(this.columnState, {
                hidden: this._hidden,
                changes: [DatagridColumnChanges.HIDDEN],
            });
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridHideableColumn.prototype.ngOnInit = function () {
        var _this = this;
        this.columnsService.emitStateChange(this.columnState, {
            hideable: true,
            titleTemplateRef: this.titleTemplateRef,
            hidden: this._hidden,
            changes: [DatagridColumnChanges.HIDDEN],
        });
        this.subscriptions.push(this.columnState.subscribe(function (state) {
            if (state.changes && state.changes.indexOf(DatagridColumnChanges.HIDDEN) > -1) {
                _this.hiddenChange.emit(state.hidden); // Can emit through @Output when desugared syntax is used
            }
        }));
    };
    ClrDatagridHideableColumn.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    tslib_1.__decorate([
        Input('clrDgHideableColumn'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrDatagridHideableColumn.prototype, "clrDgHideableColumn", null);
    tslib_1.__decorate([
        Input('clrDgHidden'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrDatagridHideableColumn.prototype, "clrDgHidden", null);
    tslib_1.__decorate([
        Output('clrDgHiddenChange'),
        tslib_1.__metadata("design:type", Object)
    ], ClrDatagridHideableColumn.prototype, "hiddenChange", void 0);
    ClrDatagridHideableColumn = tslib_1.__decorate([
        Directive({ selector: '[clrDgHideableColumn]' })
        /**
         *
         * @description
         * A structural directive meant to be used inside a clr-dg-column component.
         *
         * <clr-dg-column>
         *       <ng-container *clrDgHideableColumn="{ hidden: true }">
         *           User ID
         *       </ng-container>
         *   </clr-dg-column>
         *
         * It sets up state and properties so that columns can be manges for hide/show by a service and an internal
         * datagrid toggle component.
         *
         */
        ,
        tslib_1.__param(3, Optional()),
        tslib_1.__param(3, Inject(COLUMN_STATE)),
        tslib_1.__metadata("design:paramtypes", [TemplateRef,
            ViewContainerRef,
            ColumnsService,
            BehaviorSubject])
    ], ClrDatagridHideableColumn);
    return ClrDatagridHideableColumn;
}());
export { ClrDatagridHideableColumn };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtaGlkZWFibGUtY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1oaWRlYWJsZS1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBQ04sV0FBVyxFQUNYLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBbUJqRTtJQXVDRSxtQ0FDVSxnQkFBa0MsRUFDbEMsZ0JBQWtDLEVBQ2xDLGNBQThCLEVBRzlCLFdBQXlDO1FBTHpDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFHOUIsZ0JBQVcsR0FBWCxXQUFXLENBQThCO1FBUmYsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBaUJ2RSxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFQekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRWhFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsMEZBQTBGLENBQUMsQ0FBQztTQUM3RztJQUNILENBQUM7SUE1QkQsc0JBQUksMERBQW1CO1FBZnZCOzs7Ozs7Ozs7Ozs7O1dBYUc7YUFFSCxVQUF3QixLQUEwQjtZQUNoRCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbEUsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSxrREFBVzthQUFmLFVBQWdCLE1BQWU7WUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BELE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDcEIsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDO2FBQ3hDLENBQUMsQ0FBQztRQUNMLENBQUM7OztPQUFBO0lBcUJELDRDQUFRLEdBQVI7UUFBQSxpQkFlQztRQWRDLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEQsUUFBUSxFQUFFLElBQUk7WUFDZCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQ3ZDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNwQixPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUM7U0FDeEMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBa0I7WUFDNUMsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUM3RSxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyx5REFBeUQ7YUFDaEc7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELCtDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFuREQ7UUFEQyxLQUFLLENBQUMscUJBQXFCLENBQUM7Ozt3RUFHNUI7SUFHRDtRQURDLEtBQUssQ0FBQyxhQUFhLENBQUM7OztnRUFPcEI7SUFFNEI7UUFBNUIsTUFBTSxDQUFDLG1CQUFtQixDQUFDOzttRUFBbUQ7SUFyQ3BFLHlCQUF5QjtRQWpCckMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFFLENBQUM7UUFFakQ7Ozs7Ozs7Ozs7Ozs7O1dBY0c7O1FBNENFLG1CQUFBLFFBQVEsRUFBRSxDQUFBO1FBQ1YsbUJBQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO2lEQUpLLFdBQVc7WUFDWCxnQkFBZ0I7WUFDbEIsY0FBYztZQUdqQixlQUFlO09BN0MzQix5QkFBeUIsQ0E0RXJDO0lBQUQsZ0NBQUM7Q0FBQSxBQTVFRCxJQTRFQztTQTVFWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb2x1bW5zU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbHVtbnMuc2VydmljZSc7XG5pbXBvcnQgeyBDb2x1bW5TdGF0ZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb2x1bW4tc3RhdGUuaW50ZXJmYWNlJztcbmltcG9ydCB7IERhdGFncmlkQ29sdW1uQ2hhbmdlcyB9IGZyb20gJy4vZW51bXMvY29sdW1uLWNoYW5nZXMuZW51bSc7XG5pbXBvcnQgeyBDT0xVTU5fU1RBVEUgfSBmcm9tICcuL3Byb3ZpZGVycy9jb2x1bW4tc3RhdGUucHJvdmlkZXInO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2xyRGdIaWRlYWJsZUNvbHVtbl0nIH0pXG5cbi8qKlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQSBzdHJ1Y3R1cmFsIGRpcmVjdGl2ZSBtZWFudCB0byBiZSB1c2VkIGluc2lkZSBhIGNsci1kZy1jb2x1bW4gY29tcG9uZW50LlxuICpcbiAqIDxjbHItZGctY29sdW1uPlxuICogICAgICAgPG5nLWNvbnRhaW5lciAqY2xyRGdIaWRlYWJsZUNvbHVtbj1cInsgaGlkZGVuOiB0cnVlIH1cIj5cbiAqICAgICAgICAgICBVc2VyIElEXG4gKiAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAqICAgPC9jbHItZGctY29sdW1uPlxuICpcbiAqIEl0IHNldHMgdXAgc3RhdGUgYW5kIHByb3BlcnRpZXMgc28gdGhhdCBjb2x1bW5zIGNhbiBiZSBtYW5nZXMgZm9yIGhpZGUvc2hvdyBieSBhIHNlcnZpY2UgYW5kIGFuIGludGVybmFsXG4gKiBkYXRhZ3JpZCB0b2dnbGUgY29tcG9uZW50LlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkSGlkZWFibGVDb2x1bW4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFVzZWQgdG8gaW5pdGlhbGl6ZSB0aGUgY29sdW1uIHdpdGggZWl0aGVyIGhpZGRlbiBvciB2aXNpYmxlIHN0YXRlLlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfaGlkZGVuOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogU2V0dGVyIGZuIGZvciB0aGUgQElucHV0IHdpdGggdGhlIHNhbWUgbmFtZSBhcyB0aGlzIHN0cnVjdHVyYWwgZGlyZWN0aXZlLlxuICAgKiBJdCBhbGxvd3MgdGhlIHVzZXIgdG8gcHJlLWNvbmZpZ3VyZSB0aGUgY29sdW1uJ3MgaGlkZS9zaG93IHN0YXRlLiB7IGhpZGRlbjogdHJ1ZSB9XG4gICAqIEl0J3MgbW9yZSB2ZXJib3NlIGJ1dCBoYXMgbW9yZSBDbGFyaXR5LlxuICAgKlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiAqY2xyRGdIaWRlYWJsZUNvbHVtblxuICAgKiAqY2xyRGdIaWRlYWJsZUNvbHVtbj17aGlkZGVuOiBmYWxzZX1cbiAgICogKmNsckRnSGlkZWFibGVDb2x1bW49e2hpZGRlbjogdHJ1ZX1cbiAgICpcbiAgICovXG4gIEBJbnB1dCgnY2xyRGdIaWRlYWJsZUNvbHVtbicpXG4gIHNldCBjbHJEZ0hpZGVhYmxlQ29sdW1uKHZhbHVlOiB7IGhpZGRlbjogYm9vbGVhbiB9KSB7XG4gICAgdGhpcy5jbHJEZ0hpZGRlbiA9IHZhbHVlICYmIHZhbHVlLmhpZGRlbiA/IHZhbHVlLmhpZGRlbiA6IGZhbHNlO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ0hpZGRlbicpXG4gIHNldCBjbHJEZ0hpZGRlbihoaWRkZW46IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRkZW4gPSBoaWRkZW4gPyBoaWRkZW4gOiBmYWxzZTtcbiAgICB0aGlzLmNvbHVtbnNTZXJ2aWNlLmVtaXRTdGF0ZUNoYW5nZSh0aGlzLmNvbHVtblN0YXRlLCB7XG4gICAgICBoaWRkZW46IHRoaXMuX2hpZGRlbixcbiAgICAgIGNoYW5nZXM6IFtEYXRhZ3JpZENvbHVtbkNoYW5nZXMuSElEREVOXSxcbiAgICB9KTtcbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckRnSGlkZGVuQ2hhbmdlJykgcHVibGljIGhpZGRlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHRpdGxlVGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgY29sdW1uc1NlcnZpY2U6IENvbHVtbnNTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChDT0xVTU5fU1RBVEUpXG4gICAgcHJpdmF0ZSBjb2x1bW5TdGF0ZTogQmVoYXZpb3JTdWJqZWN0PENvbHVtblN0YXRlPlxuICApIHtcbiAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGl0bGVUZW1wbGF0ZVJlZik7XG5cbiAgICBpZiAoIXRoaXMuY29sdW1uU3RhdGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlICpjbHJEZ0hpZGVhYmxlQ29sdW1uIGRpcmVjdGl2ZSBjYW4gb25seSBiZSB1c2VkIGluc2lkZSBvZiBhIGNsci1kZy1jb2x1bW4gY29tcG9uZW50LicpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbHVtbnNTZXJ2aWNlLmVtaXRTdGF0ZUNoYW5nZSh0aGlzLmNvbHVtblN0YXRlLCB7XG4gICAgICBoaWRlYWJsZTogdHJ1ZSxcbiAgICAgIHRpdGxlVGVtcGxhdGVSZWY6IHRoaXMudGl0bGVUZW1wbGF0ZVJlZixcbiAgICAgIGhpZGRlbjogdGhpcy5faGlkZGVuLFxuICAgICAgY2hhbmdlczogW0RhdGFncmlkQ29sdW1uQ2hhbmdlcy5ISURERU5dLFxuICAgIH0pO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmNvbHVtblN0YXRlLnN1YnNjcmliZSgoc3RhdGU6IENvbHVtblN0YXRlKSA9PiB7XG4gICAgICAgIGlmIChzdGF0ZS5jaGFuZ2VzICYmIHN0YXRlLmNoYW5nZXMuaW5kZXhPZihEYXRhZ3JpZENvbHVtbkNoYW5nZXMuSElEREVOKSA+IC0xKSB7XG4gICAgICAgICAgdGhpcy5oaWRkZW5DaGFuZ2UuZW1pdChzdGF0ZS5oaWRkZW4pOyAvLyBDYW4gZW1pdCB0aHJvdWdoIEBPdXRwdXQgd2hlbiBkZXN1Z2FyZWQgc3ludGF4IGlzIHVzZWRcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19