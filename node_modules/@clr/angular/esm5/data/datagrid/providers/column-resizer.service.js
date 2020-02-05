import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ElementRef, Injectable } from '@angular/core';
import { DomAdapter } from '../../../utils/dom-adapter/dom-adapter';
import { DatagridRenderOrganizer } from '../render/render-organizer';
var MIN_COLUMN_WIDTH = 96;
// This service allows DatagridHeaderRenderer and ClrDatagridColumnSeparator
// to share column resize data with each other.
var ColumnResizerService = /** @class */ (function () {
    function ColumnResizerService(el, domAdapter, organizer) {
        this.el = el;
        this.domAdapter = domAdapter;
        this.organizer = organizer;
        this._resizedBy = 0;
    }
    Object.defineProperty(ColumnResizerService.prototype, "resizedBy", {
        get: function () {
            return this._resizedBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnResizerService.prototype, "minColumnWidth", {
        get: function () {
            return this.domAdapter.minWidth(this.el.nativeElement) || MIN_COLUMN_WIDTH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnResizerService.prototype, "maxResizeRange", {
        get: function () {
            return this.widthBeforeResize - this.minColumnWidth;
        },
        enumerable: true,
        configurable: true
    });
    ColumnResizerService.prototype.startResize = function () {
        this._resizedBy = 0;
        this.isWithinMaxResizeRange = true;
        this.widthBeforeResize = this.domAdapter.clientRect(this.el.nativeElement).width;
    };
    ColumnResizerService.prototype.endResize = function () {
        this.organizer.resize();
    };
    Object.defineProperty(ColumnResizerService.prototype, "widthAfterResize", {
        get: function () {
            return this.widthBeforeResize + this._resizedBy;
        },
        enumerable: true,
        configurable: true
    });
    ColumnResizerService.prototype.calculateResize = function (event) {
        var moveX = event.dragPosition.moveX;
        // returns the resize amount within the allowed range
        if (moveX < -this.maxResizeRange) {
            this._resizedBy = -this.maxResizeRange;
            this.isWithinMaxResizeRange = false;
        }
        else {
            this._resizedBy = moveX;
            this.isWithinMaxResizeRange = true;
        }
    };
    ColumnResizerService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [ElementRef, DomAdapter, DatagridRenderOrganizer])
    ], ColumnResizerService);
    return ColumnResizerService;
}());
export { ColumnResizerService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcHJvdmlkZXJzL2NvbHVtbi1yZXNpemVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFcEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFckUsSUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7QUFFNUIsNEVBQTRFO0FBQzVFLCtDQUErQztBQUcvQztJQUNFLDhCQUFvQixFQUFjLEVBQVUsVUFBc0IsRUFBVSxTQUFrQztRQUExRixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQXlCO1FBSXRHLGVBQVUsR0FBVyxDQUFDLENBQUM7SUFKa0YsQ0FBQztJQU1sSCxzQkFBVywyQ0FBUzthQUFwQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUtELHNCQUFXLGdEQUFjO2FBQXpCO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLGdCQUFnQixDQUFDO1FBQzdFLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsZ0RBQWM7YUFBekI7WUFDRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ3RELENBQUM7OztPQUFBO0lBRU0sMENBQVcsR0FBbEI7UUFDRSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO1FBQ25DLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNuRixDQUFDO0lBRU0sd0NBQVMsR0FBaEI7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxzQkFBVyxrREFBZ0I7YUFBM0I7WUFDRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2xELENBQUM7OztPQUFBO0lBRU0sOENBQWUsR0FBdEIsVUFBdUIsS0FBd0I7UUFDN0MsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDdkMscURBQXFEO1FBQ3JELElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUN2QyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsS0FBSyxDQUFDO1NBQ3JDO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQztJQTlDVSxvQkFBb0I7UUFEaEMsVUFBVSxFQUFFO2lEQUVhLFVBQVUsRUFBc0IsVUFBVSxFQUFxQix1QkFBdUI7T0FEbkcsb0JBQW9CLENBK0NoQztJQUFELDJCQUFDO0NBQUEsQUEvQ0QsSUErQ0M7U0EvQ1ksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEb21BZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tLWFkYXB0ZXIvZG9tLWFkYXB0ZXInO1xuaW1wb3J0IHsgQ2xyRHJhZ0V2ZW50IH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZHJhZy1hbmQtZHJvcC9kcmFnLWV2ZW50JztcbmltcG9ydCB7IERhdGFncmlkUmVuZGVyT3JnYW5pemVyIH0gZnJvbSAnLi4vcmVuZGVyL3JlbmRlci1vcmdhbml6ZXInO1xuXG5jb25zdCBNSU5fQ09MVU1OX1dJRFRIID0gOTY7XG5cbi8vIFRoaXMgc2VydmljZSBhbGxvd3MgRGF0YWdyaWRIZWFkZXJSZW5kZXJlciBhbmQgQ2xyRGF0YWdyaWRDb2x1bW5TZXBhcmF0b3Jcbi8vIHRvIHNoYXJlIGNvbHVtbiByZXNpemUgZGF0YSB3aXRoIGVhY2ggb3RoZXIuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb2x1bW5SZXNpemVyU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgZG9tQWRhcHRlcjogRG9tQWRhcHRlciwgcHJpdmF0ZSBvcmdhbml6ZXI6IERhdGFncmlkUmVuZGVyT3JnYW5pemVyKSB7fVxuXG4gIHByaXZhdGUgd2lkdGhCZWZvcmVSZXNpemU6IG51bWJlcjtcblxuICBwcml2YXRlIF9yZXNpemVkQnk6IG51bWJlciA9IDA7XG5cbiAgcHVibGljIGdldCByZXNpemVkQnkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jlc2l6ZWRCeTtcbiAgfVxuXG4gIC8vIGlzIGl0IHdpdGhpbiB0aGUgbWF4aW11bSByZXNpemUgcmFuZ2UgdG8gdGhlIGxlZnRcbiAgcHVibGljIGlzV2l0aGluTWF4UmVzaXplUmFuZ2U6IGJvb2xlYW47XG5cbiAgcHVibGljIGdldCBtaW5Db2x1bW5XaWR0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5kb21BZGFwdGVyLm1pbldpZHRoKHRoaXMuZWwubmF0aXZlRWxlbWVudCkgfHwgTUlOX0NPTFVNTl9XSURUSDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWF4UmVzaXplUmFuZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMud2lkdGhCZWZvcmVSZXNpemUgLSB0aGlzLm1pbkNvbHVtbldpZHRoO1xuICB9XG5cbiAgcHVibGljIHN0YXJ0UmVzaXplKCk6IHZvaWQge1xuICAgIHRoaXMuX3Jlc2l6ZWRCeSA9IDA7XG4gICAgdGhpcy5pc1dpdGhpbk1heFJlc2l6ZVJhbmdlID0gdHJ1ZTtcbiAgICB0aGlzLndpZHRoQmVmb3JlUmVzaXplID0gdGhpcy5kb21BZGFwdGVyLmNsaWVudFJlY3QodGhpcy5lbC5uYXRpdmVFbGVtZW50KS53aWR0aDtcbiAgfVxuXG4gIHB1YmxpYyBlbmRSZXNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5vcmdhbml6ZXIucmVzaXplKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHdpZHRoQWZ0ZXJSZXNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy53aWR0aEJlZm9yZVJlc2l6ZSArIHRoaXMuX3Jlc2l6ZWRCeTtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVSZXNpemUoZXZlbnQ6IENsckRyYWdFdmVudDxhbnk+KTogdm9pZCB7XG4gICAgY29uc3QgbW92ZVggPSBldmVudC5kcmFnUG9zaXRpb24ubW92ZVg7XG4gICAgLy8gcmV0dXJucyB0aGUgcmVzaXplIGFtb3VudCB3aXRoaW4gdGhlIGFsbG93ZWQgcmFuZ2VcbiAgICBpZiAobW92ZVggPCAtdGhpcy5tYXhSZXNpemVSYW5nZSkge1xuICAgICAgdGhpcy5fcmVzaXplZEJ5ID0gLXRoaXMubWF4UmVzaXplUmFuZ2U7XG4gICAgICB0aGlzLmlzV2l0aGluTWF4UmVzaXplUmFuZ2UgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVzaXplZEJ5ID0gbW92ZVg7XG4gICAgICB0aGlzLmlzV2l0aGluTWF4UmVzaXplUmFuZ2UgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl19