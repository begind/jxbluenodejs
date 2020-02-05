/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Directive, HostListener } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { TooltipIdService } from './providers/tooltip-id.service';
var ClrTooltipTrigger = /** @class */ (function () {
    function ClrTooltipTrigger(ifOpenService, tooltipIdService) {
        var _this = this;
        this.ifOpenService = ifOpenService;
        this.tooltipIdService = tooltipIdService;
        this.subs = [];
        // The aria-described by comes from the id of content. It
        this.subs.push(this.tooltipIdService.id.subscribe(function (tooltipId) { return (_this.ariaDescribedBy = tooltipId); }));
    }
    ClrTooltipTrigger.prototype.showTooltip = function () {
        this.ifOpenService.open = true;
    };
    ClrTooltipTrigger.prototype.hideTooltip = function () {
        this.ifOpenService.open = false;
    };
    ClrTooltipTrigger.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    tslib_1.__decorate([
        HostListener('mouseenter'),
        HostListener('focus'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ClrTooltipTrigger.prototype, "showTooltip", null);
    tslib_1.__decorate([
        HostListener('mouseleave'),
        HostListener('blur'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ClrTooltipTrigger.prototype, "hideTooltip", null);
    ClrTooltipTrigger = tslib_1.__decorate([
        Directive({
            selector: '[clrTooltipTrigger]',
            host: {
                tabindex: '0',
                '[class.tooltip-trigger]': 'true',
                '[attr.aria-describedby]': 'ariaDescribedBy',
                '[attr.role]': '"button"',
            },
        }),
        tslib_1.__metadata("design:paramtypes", [IfOpenService, TooltipIdService])
    ], ClrTooltipTrigger);
    return ClrTooltipTrigger;
}());
export { ClrTooltipTrigger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC10cmlnZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsicG9wb3Zlci90b29sdGlwL3Rvb2x0aXAtdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQVlsRTtJQUdFLDJCQUFvQixhQUE0QixFQUFVLGdCQUFrQztRQUE1RixpQkFHQztRQUhtQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFEcEYsU0FBSSxHQUFtQixFQUFFLENBQUM7UUFFaEMseURBQXlEO1FBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsU0FBUyxJQUFJLE9BQUEsQ0FBQyxLQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQyxFQUFsQyxDQUFrQyxDQUFDLENBQUMsQ0FBQztJQUN0RyxDQUFDO0lBSUQsdUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNqQyxDQUFDO0lBSUQsdUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNsQyxDQUFDO0lBRUQsdUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDOUMsQ0FBQztJQVpEO1FBRkMsWUFBWSxDQUFDLFlBQVksQ0FBQztRQUMxQixZQUFZLENBQUMsT0FBTyxDQUFDOzs7O3dEQUdyQjtJQUlEO1FBRkMsWUFBWSxDQUFDLFlBQVksQ0FBQztRQUMxQixZQUFZLENBQUMsTUFBTSxDQUFDOzs7O3dEQUdwQjtJQWxCVSxpQkFBaUI7UUFUN0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixJQUFJLEVBQUU7Z0JBQ0osUUFBUSxFQUFFLEdBQUc7Z0JBQ2IseUJBQXlCLEVBQUUsTUFBTTtnQkFDakMseUJBQXlCLEVBQUUsaUJBQWlCO2dCQUM1QyxhQUFhLEVBQUUsVUFBVTthQUMxQjtTQUNGLENBQUM7aURBSW1DLGFBQWEsRUFBNEIsZ0JBQWdCO09BSGpGLGlCQUFpQixDQXVCN0I7SUFBRCx3QkFBQztDQUFBLEFBdkJELElBdUJDO1NBdkJZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElmT3BlblNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1vcGVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9vbHRpcElkU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3Rvb2x0aXAtaWQuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NsclRvb2x0aXBUcmlnZ2VyXScsXG4gIGhvc3Q6IHtcbiAgICB0YWJpbmRleDogJzAnLFxuICAgICdbY2xhc3MudG9vbHRpcC10cmlnZ2VyXSc6ICd0cnVlJyxcbiAgICAnW2F0dHIuYXJpYS1kZXNjcmliZWRieV0nOiAnYXJpYURlc2NyaWJlZEJ5JyxcbiAgICAnW2F0dHIucm9sZV0nOiAnXCJidXR0b25cIicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsclRvb2x0aXBUcmlnZ2VyIHtcbiAgcHVibGljIGFyaWFEZXNjcmliZWRCeTtcbiAgcHJpdmF0ZSBzdWJzOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGlmT3BlblNlcnZpY2U6IElmT3BlblNlcnZpY2UsIHByaXZhdGUgdG9vbHRpcElkU2VydmljZTogVG9vbHRpcElkU2VydmljZSkge1xuICAgIC8vIFRoZSBhcmlhLWRlc2NyaWJlZCBieSBjb21lcyBmcm9tIHRoZSBpZCBvZiBjb250ZW50LiBJdFxuICAgIHRoaXMuc3Vicy5wdXNoKHRoaXMudG9vbHRpcElkU2VydmljZS5pZC5zdWJzY3JpYmUodG9vbHRpcElkID0+ICh0aGlzLmFyaWFEZXNjcmliZWRCeSA9IHRvb2x0aXBJZCkpKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpXG4gIHNob3dUb29sdGlwKCk6IHZvaWQge1xuICAgIHRoaXMuaWZPcGVuU2VydmljZS5vcGVuID0gdHJ1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgaGlkZVRvb2x0aXAoKTogdm9pZCB7XG4gICAgdGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW4gPSBmYWxzZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vicy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==