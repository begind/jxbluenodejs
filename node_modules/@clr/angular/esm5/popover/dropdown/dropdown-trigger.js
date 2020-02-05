import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, HostListener } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { ClrDropdown } from './dropdown';
import { DropdownFocusHandler } from './providers/dropdown-focus-handler.service';
var ClrDropdownTrigger = /** @class */ (function () {
    function ClrDropdownTrigger(dropdown, ifOpenService, el, focusHandler) {
        this.ifOpenService = ifOpenService;
        this.isRootLevelToggle = true;
        // if the containing dropdown has a parent, then this is not the root level one
        if (dropdown.parent) {
            this.isRootLevelToggle = false;
        }
        focusHandler.trigger = el.nativeElement;
    }
    Object.defineProperty(ClrDropdownTrigger.prototype, "active", {
        get: function () {
            return this.ifOpenService.open;
        },
        enumerable: true,
        configurable: true
    });
    ClrDropdownTrigger.prototype.onDropdownTriggerClick = function (event) {
        this.ifOpenService.toggleWithEvent(event);
    };
    tslib_1.__decorate([
        HostListener('click', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ClrDropdownTrigger.prototype, "onDropdownTriggerClick", null);
    ClrDropdownTrigger = tslib_1.__decorate([
        Directive({
            // We support both selectors for legacy reasons
            selector: '[clrDropdownTrigger],[clrDropdownToggle]',
            host: {
                '[class.dropdown-toggle]': 'isRootLevelToggle',
                '[class.dropdown-item]': '!isRootLevelToggle',
                '[class.expandable]': '!isRootLevelToggle',
                '[class.active]': 'active',
                '[attr.aria-haspopup]': '"menu"',
                '[attr.aria-expanded]': 'active',
            },
        }),
        tslib_1.__metadata("design:paramtypes", [ClrDropdown,
            IfOpenService,
            ElementRef,
            DropdownFocusHandler])
    ], ClrDropdownTrigger);
    return ClrDropdownTrigger;
}());
export { ClrDropdownTrigger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tdHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvZHJvcGRvd24vZHJvcGRvd24tdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVwRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQWNsRjtJQUdFLDRCQUNFLFFBQXFCLEVBQ2IsYUFBNEIsRUFDcEMsRUFBMkIsRUFDM0IsWUFBa0M7UUFGMUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFKL0Isc0JBQWlCLEdBQVksSUFBSSxDQUFDO1FBUXZDLCtFQUErRTtRQUMvRSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztTQUNoQztRQUNELFlBQVksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUMxQyxDQUFDO0lBRUQsc0JBQUksc0NBQU07YUFBVjtZQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7SUFHRCxtREFBc0IsR0FBdEIsVUFBdUIsS0FBVTtRQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRkQ7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7b0VBR2pDO0lBdkJVLGtCQUFrQjtRQVo5QixTQUFTLENBQUM7WUFDVCwrQ0FBK0M7WUFDL0MsUUFBUSxFQUFFLDBDQUEwQztZQUNwRCxJQUFJLEVBQUU7Z0JBQ0oseUJBQXlCLEVBQUUsbUJBQW1CO2dCQUM5Qyx1QkFBdUIsRUFBRSxvQkFBb0I7Z0JBQzdDLG9CQUFvQixFQUFFLG9CQUFvQjtnQkFDMUMsZ0JBQWdCLEVBQUUsUUFBUTtnQkFDMUIsc0JBQXNCLEVBQUUsUUFBUTtnQkFDaEMsc0JBQXNCLEVBQUUsUUFBUTthQUNqQztTQUNGLENBQUM7aURBS1ksV0FBVztZQUNFLGFBQWE7WUFDaEMsVUFBVTtZQUNBLG9CQUFvQjtPQVB6QixrQkFBa0IsQ0F3QjlCO0lBQUQseUJBQUM7Q0FBQSxBQXhCRCxJQXdCQztTQXhCWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJZk9wZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtb3Blbi5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQ2xyRHJvcGRvd24gfSBmcm9tICcuL2Ryb3Bkb3duJztcbmltcG9ydCB7IERyb3Bkb3duRm9jdXNIYW5kbGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvZHJvcGRvd24tZm9jdXMtaGFuZGxlci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIC8vIFdlIHN1cHBvcnQgYm90aCBzZWxlY3RvcnMgZm9yIGxlZ2FjeSByZWFzb25zXG4gIHNlbGVjdG9yOiAnW2NsckRyb3Bkb3duVHJpZ2dlcl0sW2NsckRyb3Bkb3duVG9nZ2xlXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRyb3Bkb3duLXRvZ2dsZV0nOiAnaXNSb290TGV2ZWxUb2dnbGUnLFxuICAgICdbY2xhc3MuZHJvcGRvd24taXRlbV0nOiAnIWlzUm9vdExldmVsVG9nZ2xlJyxcbiAgICAnW2NsYXNzLmV4cGFuZGFibGVdJzogJyFpc1Jvb3RMZXZlbFRvZ2dsZScsXG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2FjdGl2ZScsXG4gICAgJ1thdHRyLmFyaWEtaGFzcG9wdXBdJzogJ1wibWVudVwiJyxcbiAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnYWN0aXZlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRHJvcGRvd25UcmlnZ2VyIHtcbiAgcHVibGljIGlzUm9vdExldmVsVG9nZ2xlOiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBkcm9wZG93bjogQ2xyRHJvcGRvd24sXG4gICAgcHJpdmF0ZSBpZk9wZW5TZXJ2aWNlOiBJZk9wZW5TZXJ2aWNlLFxuICAgIGVsOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBmb2N1c0hhbmRsZXI6IERyb3Bkb3duRm9jdXNIYW5kbGVyXG4gICkge1xuICAgIC8vIGlmIHRoZSBjb250YWluaW5nIGRyb3Bkb3duIGhhcyBhIHBhcmVudCwgdGhlbiB0aGlzIGlzIG5vdCB0aGUgcm9vdCBsZXZlbCBvbmVcbiAgICBpZiAoZHJvcGRvd24ucGFyZW50KSB7XG4gICAgICB0aGlzLmlzUm9vdExldmVsVG9nZ2xlID0gZmFsc2U7XG4gICAgfVxuICAgIGZvY3VzSGFuZGxlci50cmlnZ2VyID0gZWwubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaWZPcGVuU2VydmljZS5vcGVuO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBvbkRyb3Bkb3duVHJpZ2dlckNsaWNrKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmlmT3BlblNlcnZpY2UudG9nZ2xlV2l0aEV2ZW50KGV2ZW50KTtcbiAgfVxufVxuIl19