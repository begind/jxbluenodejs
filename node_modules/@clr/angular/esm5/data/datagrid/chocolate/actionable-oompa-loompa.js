import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ChangeDetectorRef, Directive, Optional } from '@angular/core';
import { OompaLoompa } from '../../../utils/chocolate/oompa-loompa';
import { RowActionService } from '../providers/row-action-service';
import { DatagridWillyWonka } from './datagrid-willy-wonka';
var ActionableOompaLoompa = /** @class */ (function (_super) {
    tslib_1.__extends(ActionableOompaLoompa, _super);
    function ActionableOompaLoompa(cdr, willyWonka, rowActions) {
        var _this = this;
        if (!willyWonka) {
            throw new Error('clr-dg-row should only be used inside of a clr-datagrid');
        }
        _this = _super.call(this, cdr, willyWonka) || this;
        _this.rowActions = rowActions;
        return _this;
    }
    Object.defineProperty(ActionableOompaLoompa.prototype, "flavor", {
        get: function () {
            return this.rowActions.hasActionableRow;
        },
        enumerable: true,
        configurable: true
    });
    ActionableOompaLoompa = tslib_1.__decorate([
        Directive({ selector: 'clr-datagrid, clr-dg-row' }),
        tslib_1.__param(1, Optional()),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, DatagridWillyWonka, RowActionService])
    ], ActionableOompaLoompa);
    return ActionableOompaLoompa;
}(OompaLoompa));
export { ActionableOompaLoompa };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uYWJsZS1vb21wYS1sb29tcGEuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2Nob2NvbGF0ZS9hY3Rpb25hYmxlLW9vbXBhLWxvb21wYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUc1RDtJQUEyQyxpREFBVztJQUdwRCwrQkFBWSxHQUFzQixFQUFjLFVBQThCLEVBQUUsVUFBNEI7UUFBNUcsaUJBTUM7UUFMQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO1NBQzVFO1FBQ0QsUUFBQSxrQkFBTSxHQUFHLEVBQUUsVUFBVSxDQUFDLFNBQUM7UUFDdkIsS0FBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7O0lBQy9CLENBQUM7SUFFRCxzQkFBSSx5Q0FBTTthQUFWO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDO1FBQzFDLENBQUM7OztPQUFBO0lBYlUscUJBQXFCO1FBRGpDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSwwQkFBMEIsRUFBRSxDQUFDO1FBSWIsbUJBQUEsUUFBUSxFQUFFLENBQUE7aURBQTlCLGlCQUFpQixFQUEwQixrQkFBa0IsRUFBYyxnQkFBZ0I7T0FIakcscUJBQXFCLENBY2pDO0lBQUQsNEJBQUM7Q0FBQSxBQWRELENBQTJDLFdBQVcsR0FjckQ7U0FkWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT29tcGFMb29tcGEgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jaG9jb2xhdGUvb29tcGEtbG9vbXBhJztcbmltcG9ydCB7IFJvd0FjdGlvblNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvcm93LWFjdGlvbi1zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFncmlkV2lsbHlXb25rYSB9IGZyb20gJy4vZGF0YWdyaWQtd2lsbHktd29ua2EnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdjbHItZGF0YWdyaWQsIGNsci1kZy1yb3cnIH0pXG5leHBvcnQgY2xhc3MgQWN0aW9uYWJsZU9vbXBhTG9vbXBhIGV4dGVuZHMgT29tcGFMb29tcGEge1xuICBwcml2YXRlIHJvd0FjdGlvbnM6IFJvd0FjdGlvblNlcnZpY2U7XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgQE9wdGlvbmFsKCkgd2lsbHlXb25rYTogRGF0YWdyaWRXaWxseVdvbmthLCByb3dBY3Rpb25zOiBSb3dBY3Rpb25TZXJ2aWNlKSB7XG4gICAgaWYgKCF3aWxseVdvbmthKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nsci1kZy1yb3cgc2hvdWxkIG9ubHkgYmUgdXNlZCBpbnNpZGUgb2YgYSBjbHItZGF0YWdyaWQnKTtcbiAgICB9XG4gICAgc3VwZXIoY2RyLCB3aWxseVdvbmthKTtcbiAgICB0aGlzLnJvd0FjdGlvbnMgPSByb3dBY3Rpb25zO1xuICB9XG5cbiAgZ2V0IGZsYXZvcigpIHtcbiAgICByZXR1cm4gdGhpcy5yb3dBY3Rpb25zLmhhc0FjdGlvbmFibGVSb3c7XG4gIH1cbn1cbiJdfQ==