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
let ClrDatagridHideableColumn = 
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
class ClrDatagridHideableColumn {
    constructor(titleTemplateRef, viewContainerRef, columnsService, columnState) {
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
    set clrDgHideableColumn(value) {
        this.clrDgHidden = value && value.hidden ? value.hidden : false;
    }
    set clrDgHidden(hidden) {
        this._hidden = hidden ? hidden : false;
        this.columnsService.emitStateChange(this.columnState, {
            hidden: this._hidden,
            changes: [DatagridColumnChanges.HIDDEN],
        });
    }
    ngOnInit() {
        this.columnsService.emitStateChange(this.columnState, {
            hideable: true,
            titleTemplateRef: this.titleTemplateRef,
            hidden: this._hidden,
            changes: [DatagridColumnChanges.HIDDEN],
        });
        this.subscriptions.push(this.columnState.subscribe((state) => {
            if (state.changes && state.changes.indexOf(DatagridColumnChanges.HIDDEN) > -1) {
                this.hiddenChange.emit(state.hidden); // Can emit through @Output when desugared syntax is used
            }
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
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
export { ClrDatagridHideableColumn };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtaGlkZWFibGUtY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1oaWRlYWJsZS1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBQ04sV0FBVyxFQUNYLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBbUJqRSxJQUFhLHlCQUF5QjtBQWZ0Qzs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQWEseUJBQXlCO0lBdUNwQyxZQUNVLGdCQUFrQyxFQUNsQyxnQkFBa0MsRUFDbEMsY0FBOEIsRUFHOUIsV0FBeUM7UUFMekMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUc5QixnQkFBVyxHQUFYLFdBQVcsQ0FBOEI7UUFSZixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFpQnZFLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQVB6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFaEUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQywwRkFBMEYsQ0FBQyxDQUFDO1NBQzdHO0lBQ0gsQ0FBQztJQTNDRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBRUgsSUFBSSxtQkFBbUIsQ0FBQyxLQUEwQjtRQUNoRCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDbEUsQ0FBQztJQUdELElBQUksV0FBVyxDQUFDLE1BQWU7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEQsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3BCLE9BQU8sRUFBRSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQztTQUN4QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBcUJELFFBQVE7UUFDTixJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BELFFBQVEsRUFBRSxJQUFJO1lBQ2QsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtZQUN2QyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDcEIsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDO1NBQ3hDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQWtCLEVBQUUsRUFBRTtZQUNoRCxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzdFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLHlEQUF5RDthQUNoRztRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDdkQsQ0FBQztDQUNGLENBQUE7QUFwREM7SUFEQyxLQUFLLENBQUMscUJBQXFCLENBQUM7OztvRUFHNUI7QUFHRDtJQURDLEtBQUssQ0FBQyxhQUFhLENBQUM7Ozs0REFPcEI7QUFFNEI7SUFBNUIsTUFBTSxDQUFDLG1CQUFtQixDQUFDOzsrREFBbUQ7QUFyQ3BFLHlCQUF5QjtJQWpCckMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFFLENBQUM7SUFFakQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7O0lBNENFLG1CQUFBLFFBQVEsRUFBRSxDQUFBO0lBQ1YsbUJBQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBOzZDQUpLLFdBQVc7UUFDWCxnQkFBZ0I7UUFDbEIsY0FBYztRQUdqQixlQUFlO0dBN0MzQix5QkFBeUIsQ0E0RXJDO1NBNUVZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbHVtbnNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29sdW1ucy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbHVtblN0YXRlIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbHVtbi1zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRGF0YWdyaWRDb2x1bW5DaGFuZ2VzIH0gZnJvbSAnLi9lbnVtcy9jb2x1bW4tY2hhbmdlcy5lbnVtJztcbmltcG9ydCB7IENPTFVNTl9TVEFURSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbHVtbi1zdGF0ZS5wcm92aWRlcic7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJEZ0hpZGVhYmxlQ29sdW1uXScgfSlcblxuLyoqXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBIHN0cnVjdHVyYWwgZGlyZWN0aXZlIG1lYW50IHRvIGJlIHVzZWQgaW5zaWRlIGEgY2xyLWRnLWNvbHVtbiBjb21wb25lbnQuXG4gKlxuICogPGNsci1kZy1jb2x1bW4+XG4gKiAgICAgICA8bmctY29udGFpbmVyICpjbHJEZ0hpZGVhYmxlQ29sdW1uPVwieyBoaWRkZW46IHRydWUgfVwiPlxuICogICAgICAgICAgIFVzZXIgSURcbiAqICAgICAgIDwvbmctY29udGFpbmVyPlxuICogICA8L2Nsci1kZy1jb2x1bW4+XG4gKlxuICogSXQgc2V0cyB1cCBzdGF0ZSBhbmQgcHJvcGVydGllcyBzbyB0aGF0IGNvbHVtbnMgY2FuIGJlIG1hbmdlcyBmb3IgaGlkZS9zaG93IGJ5IGEgc2VydmljZSBhbmQgYW4gaW50ZXJuYWxcbiAqIGRhdGFncmlkIHRvZ2dsZSBjb21wb25lbnQuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRIaWRlYWJsZUNvbHVtbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVXNlZCB0byBpbml0aWFsaXplIHRoZSBjb2x1bW4gd2l0aCBlaXRoZXIgaGlkZGVuIG9yIHZpc2libGUgc3RhdGUuXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9oaWRkZW46IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBTZXR0ZXIgZm4gZm9yIHRoZSBASW5wdXQgd2l0aCB0aGUgc2FtZSBuYW1lIGFzIHRoaXMgc3RydWN0dXJhbCBkaXJlY3RpdmUuXG4gICAqIEl0IGFsbG93cyB0aGUgdXNlciB0byBwcmUtY29uZmlndXJlIHRoZSBjb2x1bW4ncyBoaWRlL3Nob3cgc3RhdGUuIHsgaGlkZGVuOiB0cnVlIH1cbiAgICogSXQncyBtb3JlIHZlcmJvc2UgYnV0IGhhcyBtb3JlIENsYXJpdHkuXG4gICAqXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqICpjbHJEZ0hpZGVhYmxlQ29sdW1uXG4gICAqICpjbHJEZ0hpZGVhYmxlQ29sdW1uPXtoaWRkZW46IGZhbHNlfVxuICAgKiAqY2xyRGdIaWRlYWJsZUNvbHVtbj17aGlkZGVuOiB0cnVlfVxuICAgKlxuICAgKi9cbiAgQElucHV0KCdjbHJEZ0hpZGVhYmxlQ29sdW1uJylcbiAgc2V0IGNsckRnSGlkZWFibGVDb2x1bW4odmFsdWU6IHsgaGlkZGVuOiBib29sZWFuIH0pIHtcbiAgICB0aGlzLmNsckRnSGlkZGVuID0gdmFsdWUgJiYgdmFsdWUuaGlkZGVuID8gdmFsdWUuaGlkZGVuIDogZmFsc2U7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnSGlkZGVuJylcbiAgc2V0IGNsckRnSGlkZGVuKGhpZGRlbjogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGRlbiA9IGhpZGRlbiA/IGhpZGRlbiA6IGZhbHNlO1xuICAgIHRoaXMuY29sdW1uc1NlcnZpY2UuZW1pdFN0YXRlQ2hhbmdlKHRoaXMuY29sdW1uU3RhdGUsIHtcbiAgICAgIGhpZGRlbjogdGhpcy5faGlkZGVuLFxuICAgICAgY2hhbmdlczogW0RhdGFncmlkQ29sdW1uQ2hhbmdlcy5ISURERU5dLFxuICAgIH0pO1xuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdIaWRkZW5DaGFuZ2UnKSBwdWJsaWMgaGlkZGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdGl0bGVUZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBjb2x1bW5zU2VydmljZTogQ29sdW1uc1NlcnZpY2UsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KENPTFVNTl9TVEFURSlcbiAgICBwcml2YXRlIGNvbHVtblN0YXRlOiBCZWhhdmlvclN1YmplY3Q8Q29sdW1uU3RhdGU+XG4gICkge1xuICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50aXRsZVRlbXBsYXRlUmVmKTtcblxuICAgIGlmICghdGhpcy5jb2x1bW5TdGF0ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgKmNsckRnSGlkZWFibGVDb2x1bW4gZGlyZWN0aXZlIGNhbiBvbmx5IGJlIHVzZWQgaW5zaWRlIG9mIGEgY2xyLWRnLWNvbHVtbiBjb21wb25lbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29sdW1uc1NlcnZpY2UuZW1pdFN0YXRlQ2hhbmdlKHRoaXMuY29sdW1uU3RhdGUsIHtcbiAgICAgIGhpZGVhYmxlOiB0cnVlLFxuICAgICAgdGl0bGVUZW1wbGF0ZVJlZjogdGhpcy50aXRsZVRlbXBsYXRlUmVmLFxuICAgICAgaGlkZGVuOiB0aGlzLl9oaWRkZW4sXG4gICAgICBjaGFuZ2VzOiBbRGF0YWdyaWRDb2x1bW5DaGFuZ2VzLkhJRERFTl0sXG4gICAgfSk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuY29sdW1uU3RhdGUuc3Vic2NyaWJlKChzdGF0ZTogQ29sdW1uU3RhdGUpID0+IHtcbiAgICAgICAgaWYgKHN0YXRlLmNoYW5nZXMgJiYgc3RhdGUuY2hhbmdlcy5pbmRleE9mKERhdGFncmlkQ29sdW1uQ2hhbmdlcy5ISURERU4pID4gLTEpIHtcbiAgICAgICAgICB0aGlzLmhpZGRlbkNoYW5nZS5lbWl0KHN0YXRlLmhpZGRlbik7IC8vIENhbiBlbWl0IHRocm91Z2ggQE91dHB1dCB3aGVuIGRlc3VnYXJlZCBzeW50YXggaXMgdXNlZFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=