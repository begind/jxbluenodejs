import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChildren, QueryList, ViewContainerRef } from '@angular/core';
import { ClrSignpost } from '../../popover/signpost/signpost';
import { HostWrapper } from '../../utils/host-wrapping/host-wrapper';
import { WrappedCell } from './wrapped-cell';
var ClrDatagridCell = /** @class */ (function () {
    function ClrDatagridCell(vcr) {
        this.vcr = vcr;
    }
    ClrDatagridCell.prototype.ngOnInit = function () {
        this.wrappedInjector = new HostWrapper(WrappedCell, this.vcr);
    };
    Object.defineProperty(ClrDatagridCell.prototype, "_view", {
        get: function () {
            return this.wrappedInjector.get(WrappedCell, this.vcr).cellView;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        ContentChildren(ClrSignpost),
        tslib_1.__metadata("design:type", QueryList)
    ], ClrDatagridCell.prototype, "signpost", void 0);
    ClrDatagridCell = tslib_1.__decorate([
        Component({
            selector: 'clr-dg-cell',
            template: "\n        <ng-content></ng-content>\n    ",
            host: {
                '[class.datagrid-cell]': 'true',
                '[class.datagrid-signpost-trigger]': 'signpost.length > 0',
                role: 'gridcell',
            }
        }),
        tslib_1.__metadata("design:paramtypes", [ViewContainerRef])
    ], ClrDatagridCell);
    return ClrDatagridCell;
}());
export { ClrDatagridCell };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtY2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFvQixTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFhN0M7SUFXRSx5QkFBb0IsR0FBcUI7UUFBckIsUUFBRyxHQUFILEdBQUcsQ0FBa0I7SUFBRyxDQUFDO0lBSTdDLGtDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksV0FBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELHNCQUFXLGtDQUFLO2FBQWhCO1lBQ0UsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNsRSxDQUFDOzs7T0FBQTtJQVo2QjtRQUE3QixlQUFlLENBQUMsV0FBVyxDQUFDOzBDQUFXLFNBQVM7cURBQWM7SUFUcEQsZUFBZTtRQVgzQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsMkNBRVA7WUFDSCxJQUFJLEVBQUU7Z0JBQ0osdUJBQXVCLEVBQUUsTUFBTTtnQkFDL0IsbUNBQW1DLEVBQUUscUJBQXFCO2dCQUMxRCxJQUFJLEVBQUUsVUFBVTthQUNqQjtTQUNGLENBQUM7aURBWXlCLGdCQUFnQjtPQVg5QixlQUFlLENBc0IzQjtJQUFELHNCQUFDO0NBQUEsQUF0QkQsSUFzQkM7U0F0QlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBJbmplY3RvciwgT25Jbml0LCBRdWVyeUxpc3QsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xyU2lnbnBvc3QgfSBmcm9tICcuLi8uLi9wb3BvdmVyL3NpZ25wb3N0L3NpZ25wb3N0JztcbmltcG9ydCB7IEhvc3RXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9ob3N0LXdyYXBwZXInO1xuaW1wb3J0IHsgV3JhcHBlZENlbGwgfSBmcm9tICcuL3dyYXBwZWQtY2VsbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1jZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGFncmlkLWNlbGxdJzogJ3RydWUnLFxuICAgICdbY2xhc3MuZGF0YWdyaWQtc2lnbnBvc3QtdHJpZ2dlcl0nOiAnc2lnbnBvc3QubGVuZ3RoID4gMCcsXG4gICAgcm9sZTogJ2dyaWRjZWxsJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRDZWxsIGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyoqKioqKioqKlxuICAgKiBAcHJvcGVydHkgc2lnbnBvc3RcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEBDb250ZW50Q2hpbGQgaXMgdXNlZCB0byBkZXRlY3QgdGhlIHByZXNlbmNlIG9mIGEgU2lnbnBvc3QgaW4gdGhlIHByb2plY3RlZCBjb250ZW50LlxuICAgKiBPbiB0aGUgaG9zdCwgd2Ugc2V0IHRoZSAuZGF0YWdyaWQtc2lnbnBvc3QtdHJpZ2dlciBjbGFzcyBvbiB0aGUgY2VsbCB3aGVuIHNpZ25wb3N0Lmxlbmd0aCBpcyBncmVhdGVyIHRoYW4gMC5cbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xyU2lnbnBvc3QpIHNpZ25wb3N0OiBRdWVyeUxpc3Q8Q2xyU2lnbnBvc3Q+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmNyOiBWaWV3Q29udGFpbmVyUmVmKSB7fVxuXG4gIHByaXZhdGUgd3JhcHBlZEluamVjdG9yOiBJbmplY3RvcjtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndyYXBwZWRJbmplY3RvciA9IG5ldyBIb3N0V3JhcHBlcihXcmFwcGVkQ2VsbCwgdGhpcy52Y3IpO1xuICB9XG5cbiAgcHVibGljIGdldCBfdmlldygpIHtcbiAgICByZXR1cm4gdGhpcy53cmFwcGVkSW5qZWN0b3IuZ2V0KFdyYXBwZWRDZWxsLCB0aGlzLnZjcikuY2VsbFZpZXc7XG4gIH1cbn1cbiJdfQ==