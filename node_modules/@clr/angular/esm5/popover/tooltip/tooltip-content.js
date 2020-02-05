import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, Inject, Injector, Input, Optional } from '@angular/core';
import { AbstractPopover } from '../common/abstract-popover';
import { Point } from '../common/popover';
import { POPOVER_HOST_ANCHOR } from '../common/popover-host-anchor.token';
import { UNIQUE_ID } from '../../utils/id-generator/id-generator.service';
import { TooltipIdService } from './providers/tooltip-id.service';
var POSITIONS = ['bottom-left', 'bottom-right', 'top-left', 'top-right', 'right', 'left'];
var SIZES = ['xs', 'sm', 'md', 'lg'];
var ClrTooltipContent = /** @class */ (function (_super) {
    tslib_1.__extends(ClrTooltipContent, _super);
    function ClrTooltipContent(injector, parentHost, uniqueId, tooltipIdService) {
        var _this = _super.call(this, injector, parentHost) || this;
        _this.uniqueId = uniqueId;
        _this.tooltipIdService = tooltipIdService;
        if (!parentHost) {
            throw new Error('clr-tooltip-content should only be used inside of a clr-tooltip');
        }
        // Defaults
        _this.position = 'right';
        _this.size = 'sm';
        // Set the default id in case consumer does not supply a custom id.
        _this.updateId(uniqueId);
        return _this;
    }
    Object.defineProperty(ClrTooltipContent.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (position) {
            // Ugh
            this.renderer.removeClass(this.el.nativeElement, 'tooltip-' + this.position);
            if (position && POSITIONS.indexOf(position) > -1) {
                this._position = position;
            }
            else {
                this._position = 'right';
            }
            // Ugh
            this.renderer.addClass(this.el.nativeElement, 'tooltip-' + this.position);
            // set the popover values based on direction
            switch (position) {
                case 'top-right':
                    this.anchorPoint = Point.TOP_CENTER;
                    this.popoverPoint = Point.LEFT_BOTTOM;
                    break;
                case 'top-left':
                    this.anchorPoint = Point.TOP_CENTER;
                    this.popoverPoint = Point.RIGHT_BOTTOM;
                    break;
                case 'bottom-right':
                    this.anchorPoint = Point.BOTTOM_CENTER;
                    this.popoverPoint = Point.LEFT_TOP;
                    break;
                case 'bottom-left':
                    this.anchorPoint = Point.BOTTOM_CENTER;
                    this.popoverPoint = Point.RIGHT_TOP;
                    break;
                case 'right':
                    this.anchorPoint = Point.RIGHT_CENTER;
                    this.popoverPoint = Point.LEFT_TOP;
                    break;
                case 'left':
                    this.anchorPoint = Point.LEFT_CENTER;
                    this.popoverPoint = Point.RIGHT_TOP;
                    break;
                default:
                    this.anchorPoint = Point.RIGHT_CENTER;
                    this.popoverPoint = Point.LEFT_TOP;
                    break;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTooltipContent.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            value ? this.updateId(value) : this.updateId('');
        },
        enumerable: true,
        configurable: true
    });
    ClrTooltipContent.prototype.updateId = function (id) {
        this._id = id;
        this.tooltipIdService.updateId(id);
    };
    Object.defineProperty(ClrTooltipContent.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (size) {
            // Ugh
            this.renderer.removeClass(this.el.nativeElement, 'tooltip-' + this.size);
            if (size && SIZES.indexOf(size) > -1) {
                this._size = size;
            }
            else {
                this._size = 'sm';
            }
            // Ugh
            this.renderer.addClass(this.el.nativeElement, 'tooltip-' + this.size);
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ClrTooltipContent.prototype, "id", null);
    tslib_1.__decorate([
        Input('clrPosition'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ClrTooltipContent.prototype, "position", null);
    tslib_1.__decorate([
        Input('clrSize'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ClrTooltipContent.prototype, "size", null);
    ClrTooltipContent = tslib_1.__decorate([
        Component({
            selector: 'clr-tooltip-content',
            template: "\n        <ng-content></ng-content>\n    ",
            host: {
                '[class.tooltip-content]': 'true',
                '[style.opacity]': '1',
                '[attr.role]': '"tooltip"',
                '[id]': 'id',
            }
        }),
        tslib_1.__param(1, Optional()),
        tslib_1.__param(1, Inject(POPOVER_HOST_ANCHOR)),
        tslib_1.__param(2, Inject(UNIQUE_ID)),
        tslib_1.__metadata("design:paramtypes", [Injector,
            ElementRef, String, TooltipIdService])
    ], ClrTooltipContent);
    return ClrTooltipContent;
}(AbstractPopover));
export { ClrTooltipContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1jb250ZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsicG9wb3Zlci90b29sdGlwL3Rvb2x0aXAtY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVsRSxJQUFNLFNBQVMsR0FBYSxDQUFDLGFBQWEsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFFdEcsSUFBTSxLQUFLLEdBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQWNqRDtJQUF1Qyw2Q0FBZTtJQUNwRCwyQkFDRSxRQUFrQixFQUdsQixVQUFzQixFQUNJLFFBQWdCLEVBQ2xDLGdCQUFrQztRQU41QyxZQVFFLGtCQUFNLFFBQVEsRUFBRSxVQUFVLENBQUMsU0FZNUI7UUFmMkIsY0FBUSxHQUFSLFFBQVEsQ0FBUTtRQUNsQyxzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBSTFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLGlFQUFpRSxDQUFDLENBQUM7U0FDcEY7UUFFRCxXQUFXO1FBQ1gsS0FBSSxD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QUpSLFFBQVE7WUFHTixVQUFVLFVBRUksZ0JBQWdCO09BUGpDLGlCQUFpQixDQTJHN0I7SUFBRCx3QkFBQztDQUFBLEFBM0dELENBQXVDLGVBQWUsR0EyR3JEO1NBM0dZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5qZWN0LCBJbmplY3RvciwgSW5wdXQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdFBvcG92ZXIgfSBmcm9tICcuLi9jb21tb24vYWJzdHJhY3QtcG9wb3Zlcic7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uL2NvbW1vbi9wb3BvdmVyJztcbmltcG9ydCB7IFBPUE9WRVJfSE9TVF9BTkNIT1IgfSBmcm9tICcuLi9jb21tb24vcG9wb3Zlci1ob3N0LWFuY2hvci50b2tlbic7XG5pbXBvcnQgeyBVTklRVUVfSUQgfSBmcm9tICcuLi8uLi91dGlscy9pZC1nZW5lcmF0b3IvaWQtZ2VuZXJhdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9vbHRpcElkU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3Rvb2x0aXAtaWQuc2VydmljZSc7XG5cbmNvbnN0IFBPU0lUSU9OUzogc3RyaW5nW10gPSBbJ2JvdHRvbS1sZWZ0JywgJ2JvdHRvbS1yaWdodCcsICd0b3AtbGVmdCcsICd0b3AtcmlnaHQnLCAncmlnaHQnLCAnbGVmdCddO1xuXG5jb25zdCBTSVpFUzogc3RyaW5nW10gPSBbJ3hzJywgJ3NtJywgJ21kJywgJ2xnJ107XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci10b29sdGlwLWNvbnRlbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MudG9vbHRpcC1jb250ZW50XSc6ICd0cnVlJyxcbiAgICAnW3N0eWxlLm9wYWNpdHldJzogJzEnLFxuICAgICdbYXR0ci5yb2xlXSc6ICdcInRvb2x0aXBcIicsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJUb29sdGlwQ29udGVudCBleHRlbmRzIEFic3RyYWN0UG9wb3ZlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoUE9QT1ZFUl9IT1NUX0FOQ0hPUilcbiAgICBwYXJlbnRIb3N0OiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoVU5JUVVFX0lEKSBwdWJsaWMgdW5pcXVlSWQ6IHN0cmluZyxcbiAgICBwcml2YXRlIHRvb2x0aXBJZFNlcnZpY2U6IFRvb2x0aXBJZFNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoaW5qZWN0b3IsIHBhcmVudEhvc3QpO1xuXG4gICAgaWYgKCFwYXJlbnRIb3N0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nsci10b29sdGlwLWNvbnRlbnQgc2hvdWxkIG9ubHkgYmUgdXNlZCBpbnNpZGUgb2YgYSBjbHItdG9vbHRpcCcpO1xuICAgIH1cblxuICAgIC8vIERlZmF1bHRzXG4gICAgdGhpcy5wb3NpdGlvbiA9ICdyaWdodCc7XG4gICAgdGhpcy5zaXplID0gJ3NtJztcblxuICAgIC8vIFNldCB0aGUgZGVmYXVsdCBpZCBpbiBjYXNlIGNvbnN1bWVyIGRvZXMgbm90IHN1cHBseSBhIGN1c3RvbSBpZC5cbiAgICB0aGlzLnVwZGF0ZUlkKHVuaXF1ZUlkKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Bvc2l0aW9uOiBzdHJpbmc7XG5cbiAgZ2V0IHBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcbiAgfVxuXG4gIGdldCBpZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdmFsdWUgPyB0aGlzLnVwZGF0ZUlkKHZhbHVlKSA6IHRoaXMudXBkYXRlSWQoJycpO1xuICB9XG4gIHByaXZhdGUgX2lkO1xuXG4gIHByaXZhdGUgdXBkYXRlSWQoaWQ6IHN0cmluZykge1xuICAgIHRoaXMuX2lkID0gaWQ7XG4gICAgdGhpcy50b29sdGlwSWRTZXJ2aWNlLnVwZGF0ZUlkKGlkKTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyUG9zaXRpb24nKVxuICBzZXQgcG9zaXRpb24ocG9zaXRpb246IHN0cmluZykge1xuICAgIC8vIFVnaFxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndG9vbHRpcC0nICsgdGhpcy5wb3NpdGlvbik7XG4gICAgaWYgKHBvc2l0aW9uICYmIFBPU0lUSU9OUy5pbmRleE9mKHBvc2l0aW9uKSA+IC0xKSB7XG4gICAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wb3NpdGlvbiA9ICdyaWdodCc7XG4gICAgfVxuICAgIC8vIFVnaFxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndG9vbHRpcC0nICsgdGhpcy5wb3NpdGlvbik7XG5cbiAgICAvLyBzZXQgdGhlIHBvcG92ZXIgdmFsdWVzIGJhc2VkIG9uIGRpcmVjdGlvblxuICAgIHN3aXRjaCAocG9zaXRpb24pIHtcbiAgICAgIGNhc2UgJ3RvcC1yaWdodCc6XG4gICAgICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5UT1BfQ0VOVEVSO1xuICAgICAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LkxFRlRfQk9UVE9NO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvcC1sZWZ0JzpcbiAgICAgICAgdGhpcy5hbmNob3JQb2ludCA9IFBvaW50LlRPUF9DRU5URVI7XG4gICAgICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuUklHSFRfQk9UVE9NO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbS1yaWdodCc6XG4gICAgICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5CT1RUT01fQ0VOVEVSO1xuICAgICAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LkxFRlRfVE9QO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbS1sZWZ0JzpcbiAgICAgICAgdGhpcy5hbmNob3JQb2ludCA9IFBvaW50LkJPVFRPTV9DRU5URVI7XG4gICAgICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuUklHSFRfVE9QO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgdGhpcy5hbmNob3JQb2ludCA9IFBvaW50LlJJR0hUX0NFTlRFUjtcbiAgICAgICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5MRUZUX1RPUDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgdGhpcy5hbmNob3JQb2ludCA9IFBvaW50LkxFRlRfQ0VOVEVSO1xuICAgICAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LlJJR0hUX1RPUDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuUklHSFRfQ0VOVEVSO1xuICAgICAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LkxFRlRfVE9QO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zaXplOiBzdHJpbmc7XG5cbiAgZ2V0IHNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gIH1cblxuICBASW5wdXQoJ2NsclNpemUnKVxuICBzZXQgc2l6ZShzaXplOiBzdHJpbmcpIHtcbiAgICAvLyBVZ2hcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3Rvb2x0aXAtJyArIHRoaXMuc2l6ZSk7XG4gICAgaWYgKHNpemUgJiYgU0laRVMuaW5kZXhPZihzaXplKSA+IC0xKSB7XG4gICAgICB0aGlzLl9zaXplID0gc2l6ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2l6ZSA9ICdzbSc7XG4gICAgfVxuICAgIC8vIFVnaFxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndG9vbHRpcC0nICsgdGhpcy5zaXplKTtcbiAgfVxufVxuIl19