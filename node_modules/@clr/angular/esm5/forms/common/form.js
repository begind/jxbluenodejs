/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Directive } from '@angular/core';
import { LayoutService } from './providers/layout.service';
import { MarkControlService } from './providers/mark-control.service';
var ClrForm = /** @class */ (function () {
    function ClrForm(layoutService, markControlService) {
        this.layoutService = layoutService;
        this.markControlService = markControlService;
    }
    /** @deprecated since 2.0 */
    ClrForm.prototype.markAsDirty = function () {
        this.markAsTouched();
    };
    ClrForm.prototype.markAsTouched = function () {
        this.markControlService.markAsTouched();
    };
    ClrForm = tslib_1.__decorate([
        Directive({
            selector: '[clrForm]',
            providers: [LayoutService, MarkControlService],
            host: {
                '[class.clr-form]': 'true',
                '[class.clr-form-horizontal]': 'layoutService.isHorizontal()',
                '[class.clr-form-compact]': 'layoutService.isCompact()',
            },
        }),
        tslib_1.__metadata("design:paramtypes", [LayoutService, MarkControlService])
    ], ClrForm);
    return ClrForm;
}());
export { ClrForm };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2NvbW1vbi9mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFXdEU7SUFDRSxpQkFBbUIsYUFBNEIsRUFBVSxrQkFBc0M7UUFBNUUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO0lBQUcsQ0FBQztJQUVuRyw0QkFBNEI7SUFDNUIsNkJBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsK0JBQWEsR0FBYjtRQUNFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBVlUsT0FBTztRQVRuQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsV0FBVztZQUNyQixTQUFTLEVBQUUsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLENBQUM7WUFDOUMsSUFBSSxFQUFFO2dCQUNKLGtCQUFrQixFQUFFLE1BQU07Z0JBQzFCLDZCQUE2QixFQUFFLDhCQUE4QjtnQkFDN0QsMEJBQTBCLEVBQUUsMkJBQTJCO2FBQ3hEO1NBQ0YsQ0FBQztpREFFa0MsYUFBYSxFQUE4QixrQkFBa0I7T0FEcEYsT0FBTyxDQVduQjtJQUFELGNBQUM7Q0FBQSxBQVhELElBV0M7U0FYWSxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbGF5b3V0LnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFya0NvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbWFyay1jb250cm9sLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2xyRm9ybV0nLFxuICBwcm92aWRlcnM6IFtMYXlvdXRTZXJ2aWNlLCBNYXJrQ29udHJvbFNlcnZpY2VdLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5jbHItZm9ybV0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5jbHItZm9ybS1ob3Jpem9udGFsXSc6ICdsYXlvdXRTZXJ2aWNlLmlzSG9yaXpvbnRhbCgpJyxcbiAgICAnW2NsYXNzLmNsci1mb3JtLWNvbXBhY3RdJzogJ2xheW91dFNlcnZpY2UuaXNDb21wYWN0KCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJGb3JtIHtcbiAgY29uc3RydWN0b3IocHVibGljIGxheW91dFNlcnZpY2U6IExheW91dFNlcnZpY2UsIHByaXZhdGUgbWFya0NvbnRyb2xTZXJ2aWNlOiBNYXJrQ29udHJvbFNlcnZpY2UpIHt9XG5cbiAgLyoqIEBkZXByZWNhdGVkIHNpbmNlIDIuMCAqL1xuICBtYXJrQXNEaXJ0eSgpIHtcbiAgICB0aGlzLm1hcmtBc1RvdWNoZWQoKTtcbiAgfVxuXG4gIG1hcmtBc1RvdWNoZWQoKSB7XG4gICAgdGhpcy5tYXJrQ29udHJvbFNlcnZpY2UubWFya0FzVG91Y2hlZCgpO1xuICB9XG59XG4iXX0=