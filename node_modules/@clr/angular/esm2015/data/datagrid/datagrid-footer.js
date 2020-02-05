import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild } from '@angular/core';
import { ClrDatagridColumnToggle } from './datagrid-column-toggle';
import { Selection } from './providers/selection';
import { SelectionType } from './enums/selection-type';
import { ColumnsService } from './providers/columns.service';
let ClrDatagridFooter = class ClrDatagridFooter {
    constructor(selection, columnsService) {
        this.selection = selection;
        this.columnsService = columnsService;
        /* reference to the enum so that template can access */
        this.SELECTION_TYPE = SelectionType;
    }
    get hasHideableColumns() {
        return this.columnsService.hasHideableColumns;
    }
};
tslib_1.__decorate([
    ContentChild(ClrDatagridColumnToggle, { static: false }),
    tslib_1.__metadata("design:type", ClrDatagridColumnToggle)
], ClrDatagridFooter.prototype, "toggle", void 0);
ClrDatagridFooter = tslib_1.__decorate([
    Component({
        selector: 'clr-dg-footer',
        template: `
        <ng-container
            *ngIf="(selection.selectionType === SELECTION_TYPE.Multi) && (selection.current.length > 0)">
          <div class="clr-form-control-disabled">
              <clr-checkbox-wrapper class="datagrid-footer-select">
                <input clrCheckbox type="checkbox" checked="checked" disabled>
                <label>{{selection.current.length}}</label>
            </clr-checkbox-wrapper>
          </div>
        </ng-container>
        <ng-content select="clr-dg-column-toggle"></ng-content>
        <clr-dg-column-toggle *ngIf="hasHideableColumns && !toggle"></clr-dg-column-toggle>
        <div class="datagrid-footer-description">
            <ng-content></ng-content>
        </div>
        <ng-content select="clr-dg-pagination"></ng-content>
    `,
        host: {
            '[class.datagrid-footer]': 'true',
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Selection, ColumnsService])
], ClrDatagridFooter);
export { ClrDatagridFooter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtZm9vdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1mb290ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQXlCN0QsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFDNUIsWUFBbUIsU0FBdUIsRUFBVSxjQUE4QjtRQUEvRCxjQUFTLEdBQVQsU0FBUyxDQUFjO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRWxGLHVEQUF1RDtRQUNoRCxtQkFBYyxHQUFHLGFBQWEsQ0FBQztJQUgrQyxDQUFDO0lBUXRGLElBQUksa0JBQWtCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQztJQUNoRCxDQUFDO0NBQ0YsQ0FBQTtBQUxDO0lBREMsWUFBWSxDQUFDLHVCQUF1QixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO3NDQUNqRCx1QkFBdUI7aURBQUM7QUFQckIsaUJBQWlCO0lBdkI3QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZUFBZTtRQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQlA7UUFDSCxJQUFJLEVBQUU7WUFDSix5QkFBeUIsRUFBRSxNQUFNO1NBQ2xDO0tBQ0YsQ0FBQzs2Q0FFOEIsU0FBUyxFQUE2QixjQUFjO0dBRHZFLGlCQUFpQixDQVk3QjtTQVpZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENsckRhdGFncmlkQ29sdW1uVG9nZ2xlIH0gZnJvbSAnLi9kYXRhZ3JpZC1jb2x1bW4tdG9nZ2xlJztcbmltcG9ydCB7IFNlbGVjdGlvbiB9IGZyb20gJy4vcHJvdmlkZXJzL3NlbGVjdGlvbic7XG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi9lbnVtcy9zZWxlY3Rpb24tdHlwZSc7XG5pbXBvcnQgeyBDb2x1bW5zU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbHVtbnMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1mb290ZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAqbmdJZj1cIihzZWxlY3Rpb24uc2VsZWN0aW9uVHlwZSA9PT0gU0VMRUNUSU9OX1RZUEUuTXVsdGkpICYmIChzZWxlY3Rpb24uY3VycmVudC5sZW5ndGggPiAwKVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbHItZm9ybS1jb250cm9sLWRpc2FibGVkXCI+XG4gICAgICAgICAgICAgIDxjbHItY2hlY2tib3gtd3JhcHBlciBjbGFzcz1cImRhdGFncmlkLWZvb3Rlci1zZWxlY3RcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xyQ2hlY2tib3ggdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD1cImNoZWNrZWRcIiBkaXNhYmxlZD5cbiAgICAgICAgICAgICAgICA8bGFiZWw+e3tzZWxlY3Rpb24uY3VycmVudC5sZW5ndGh9fTwvbGFiZWw+XG4gICAgICAgICAgICA8L2Nsci1jaGVja2JveC13cmFwcGVyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWRnLWNvbHVtbi10b2dnbGVcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxjbHItZGctY29sdW1uLXRvZ2dsZSAqbmdJZj1cImhhc0hpZGVhYmxlQ29sdW1ucyAmJiAhdG9nZ2xlXCI+PC9jbHItZGctY29sdW1uLXRvZ2dsZT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRhdGFncmlkLWZvb3Rlci1kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWRnLXBhZ2luYXRpb25cIj48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZGF0YWdyaWQtZm9vdGVyXSc6ICd0cnVlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRGb290ZXI8VCA9IGFueT4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2VsZWN0aW9uOiBTZWxlY3Rpb248VD4sIHByaXZhdGUgY29sdW1uc1NlcnZpY2U6IENvbHVtbnNTZXJ2aWNlKSB7fVxuXG4gIC8qIHJlZmVyZW5jZSB0byB0aGUgZW51bSBzbyB0aGF0IHRlbXBsYXRlIGNhbiBhY2Nlc3MgKi9cbiAgcHVibGljIFNFTEVDVElPTl9UWVBFID0gU2VsZWN0aW9uVHlwZTtcblxuICBAQ29udGVudENoaWxkKENsckRhdGFncmlkQ29sdW1uVG9nZ2xlLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgdG9nZ2xlOiBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZTtcblxuICBnZXQgaGFzSGlkZWFibGVDb2x1bW5zKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbnNTZXJ2aWNlLmhhc0hpZGVhYmxlQ29sdW1ucztcbiAgfVxufVxuIl19