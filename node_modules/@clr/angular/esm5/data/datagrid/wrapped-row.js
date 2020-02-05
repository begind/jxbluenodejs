import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, TemplateRef, ViewChild } from '@angular/core';
var WrappedRow = /** @class */ (function () {
    function WrappedRow() {
        this._dynamic = false;
    }
    WrappedRow.prototype.ngAfterViewInit = function () {
        // Create the cells view in memory, not the DOM.
        this.rowView = this.templateRef.createEmbeddedView(null);
    };
    tslib_1.__decorate([
        ViewChild('rowPortal', { static: false }),
        tslib_1.__metadata("design:type", TemplateRef)
    ], WrappedRow.prototype, "templateRef", void 0);
    WrappedRow = tslib_1.__decorate([
        Component({
            selector: 'dg-wrapped-row',
            template: "        \n        <ng-template #rowPortal>\n            <ng-content></ng-content>\n        </ng-template>\n    "
        })
    ], WrappedRow);
    return WrappedRow;
}());
export { WrappedRow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlZC1yb3cuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL3dyYXBwZWQtcm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFpQixTQUFTLEVBQW1CLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFZbEc7SUFSQTtRQVNFLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFVbkIsQ0FBQztJQUpDLG9DQUFlLEdBQWY7UUFDRSxnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFORDtRQURDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7MENBQzdCLFdBQVc7bURBQU87SUFKcEIsVUFBVTtRQVJ0QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFFBQVEsRUFBRSxpSEFJUDtTQUNKLENBQUM7T0FDVyxVQUFVLENBV3RCO0lBQUQsaUJBQUM7Q0FBQSxBQVhELElBV0M7U0FYWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbWJlZGRlZFZpZXdSZWYsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRHluYW1pY1dyYXBwZXIgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2R5bmFtaWMtd3JhcHBlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RnLXdyYXBwZWQtcm93JyxcbiAgdGVtcGxhdGU6IGAgICAgICAgIFxuICAgICAgICA8bmctdGVtcGxhdGUgI3Jvd1BvcnRhbD5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBXcmFwcGVkUm93IGltcGxlbWVudHMgRHluYW1pY1dyYXBwZXIsIEFmdGVyVmlld0luaXQge1xuICBfZHluYW1pYyA9IGZhbHNlO1xuXG4gIEBWaWV3Q2hpbGQoJ3Jvd1BvcnRhbCcsIHsgc3RhdGljOiBmYWxzZSB9KVxuICB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8dm9pZD47XG4gIHJvd1ZpZXc6IEVtYmVkZGVkVmlld1JlZjx2b2lkPjsgLy8gdGhlIHJvd3MgcHJvamVjdGVkIHZpZXcgKGluIG1lbW9yeSlcblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gQ3JlYXRlIHRoZSBjZWxscyB2aWV3IGluIG1lbW9yeSwgbm90IHRoZSBET00uXG4gICAgdGhpcy5yb3dWaWV3ID0gdGhpcy50ZW1wbGF0ZVJlZi5jcmVhdGVFbWJlZGRlZFZpZXcobnVsbCk7XG4gIH1cbn1cbiJdfQ==