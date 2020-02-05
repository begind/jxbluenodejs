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
var ClrDatagridFooter = /** @class */ (function () {
    function ClrDatagridFooter(selection, columnsService) {
        this.selection = selection;
        this.columnsService = columnsService;
        /* reference to the enum so that template can access */
        this.SELECTION_TYPE = SelectionType;
    }
    Object.defineProperty(ClrDatagridFooter.prototype, "hasHideableColumns", {
        get: function () {
            return this.columnsService.hasHideableColumns;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        ContentChild(ClrDatagridColumnToggle, { static: false }),
        tslib_1.__metadata("design:type", ClrDatagridColumnToggle)
    ], ClrDatagridFooter.prototype, "toggle", void 0);
    ClrDatagridFooter = tslib_1.__decorate([
        Component({
            selector: 'clr-dg-footer',
            template: "\n        <ng-container\n            *ngIf=\"(selection.selectionType === SELECTION_TYPE.Multi) && (selection.current.length > 0)\">\n          <div class=\"clr-form-control-disabled\">\n              <clr-checkbox-wrapper class=\"datagrid-footer-select\">\n                <input clrCheckbox type=\"checkbox\" checked=\"checked\" disabled>\n                <label>{{selection.current.length}}</label>\n            </clr-checkbox-wrapper>\n          </div>\n        </ng-container>\n        <ng-content select=\"clr-dg-column-toggle\"></ng-content>\n        <clr-dg-column-toggle *ngIf=\"hasHideableColumns && !toggle\"></clr-dg-column-toggle>\n        <div class=\"datagrid-footer-description\">\n            <ng-content></ng-content>\n        </div>\n        <ng-content select=\"clr-dg-pagination\"></ng-content>\n    ",
            host: {
                '[class.datagrid-footer]': 'true',
            }
        }),
        tslib_1.__metadata("design:paramtypes", [Selection, ColumnsService])
    ], ClrDatagridFooter);
    return ClrDatagridFooter;
}());
export { ClrDatagridFooter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtZm9vdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1mb290ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQXlCN0Q7SUFDRSwyQkFBbUIsU0FBdUIsRUFBVSxjQUE4QjtRQUEvRCxjQUFTLEdBQVQsU0FBUyxDQUFjO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRWxGLHVEQUF1RDtRQUNoRCxtQkFBYyxHQUFHLGFBQWEsQ0FBQztJQUgrQyxDQUFDO0lBUXRGLHNCQUFJLGlEQUFrQjthQUF0QjtZQUNFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQztRQUNoRCxDQUFDOzs7T0FBQTtJQUpEO1FBREMsWUFBWSxDQUFDLHVCQUF1QixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzBDQUNqRCx1QkFBdUI7cURBQUM7SUFQckIsaUJBQWlCO1FBdkI3QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsdXpCQWdCUDtZQUNILElBQUksRUFBRTtnQkFDSix5QkFBeUIsRUFBRSxNQUFNO2FBQ2xDO1NBQ0YsQ0FBQztpREFFOEIsU0FBUyxFQUE2QixjQUFjO09BRHZFLGlCQUFpQixDQVk3QjtJQUFELHdCQUFDO0NBQUEsQUFaRCxJQVlDO1NBWlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGUgfSBmcm9tICcuL2RhdGFncmlkLWNvbHVtbi10b2dnbGUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uIH0gZnJvbSAnLi9wcm92aWRlcnMvc2VsZWN0aW9uJztcbmltcG9ydCB7IFNlbGVjdGlvblR5cGUgfSBmcm9tICcuL2VudW1zL3NlbGVjdGlvbi10eXBlJztcbmltcG9ydCB7IENvbHVtbnNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29sdW1ucy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLWZvb3RlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ0lmPVwiKHNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID09PSBTRUxFQ1RJT05fVFlQRS5NdWx0aSkgJiYgKHNlbGVjdGlvbi5jdXJyZW50Lmxlbmd0aCA+IDApXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNsci1mb3JtLWNvbnRyb2wtZGlzYWJsZWRcIj5cbiAgICAgICAgICAgICAgPGNsci1jaGVja2JveC13cmFwcGVyIGNsYXNzPVwiZGF0YWdyaWQtZm9vdGVyLXNlbGVjdFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbHJDaGVja2JveCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPVwiY2hlY2tlZFwiIGRpc2FibGVkPlxuICAgICAgICAgICAgICAgIDxsYWJlbD57e3NlbGVjdGlvbi5jdXJyZW50Lmxlbmd0aH19PC9sYWJlbD5cbiAgICAgICAgICAgIDwvY2xyLWNoZWNrYm94LXdyYXBwZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctY29sdW1uLXRvZ2dsZVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPGNsci1kZy1jb2x1bW4tdG9nZ2xlICpuZ0lmPVwiaGFzSGlkZWFibGVDb2x1bW5zICYmICF0b2dnbGVcIj48L2Nsci1kZy1jb2x1bW4tdG9nZ2xlPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtZm9vdGVyLWRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctcGFnaW5hdGlvblwiPjwvbmctY29udGVudD5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1mb290ZXJdJzogJ3RydWUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZEZvb3RlcjxUID0gYW55PiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzZWxlY3Rpb246IFNlbGVjdGlvbjxUPiwgcHJpdmF0ZSBjb2x1bW5zU2VydmljZTogQ29sdW1uc1NlcnZpY2UpIHt9XG5cbiAgLyogcmVmZXJlbmNlIHRvIHRoZSBlbnVtIHNvIHRoYXQgdGVtcGxhdGUgY2FuIGFjY2VzcyAqL1xuICBwdWJsaWMgU0VMRUNUSU9OX1RZUEUgPSBTZWxlY3Rpb25UeXBlO1xuXG4gIEBDb250ZW50Q2hpbGQoQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGUsIHsgc3RhdGljOiBmYWxzZSB9KVxuICB0b2dnbGU6IENsckRhdGFncmlkQ29sdW1uVG9nZ2xlO1xuXG4gIGdldCBoYXNIaWRlYWJsZUNvbHVtbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uc1NlcnZpY2UuaGFzSGlkZWFibGVDb2x1bW5zO1xuICB9XG59XG4iXX0=