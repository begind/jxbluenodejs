import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, TemplateRef, ViewChild } from '@angular/core';
var WrappedColumn = /** @class */ (function () {
    function WrappedColumn() {
        this._dynamic = false;
    }
    WrappedColumn.prototype.ngAfterViewInit = function () {
        // Create the cells view in memory, not the DOM.
        this.columnView = this.templateRef.createEmbeddedView(null);
    };
    tslib_1.__decorate([
        ViewChild('columnPortal', { static: false }),
        tslib_1.__metadata("design:type", TemplateRef)
    ], WrappedColumn.prototype, "templateRef", void 0);
    WrappedColumn = tslib_1.__decorate([
        Component({
            selector: 'dg-wrapped-column',
            template: "        \n        <ng-template #columnPortal>\n            <ng-content></ng-content>\n        </ng-template>\n    "
        })
    ], WrappedColumn);
    return WrappedColumn;
}());
export { WrappedColumn };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlZC1jb2x1bW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL3dyYXBwZWQtY29sdW1uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFpQixTQUFTLEVBQW1CLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFZbEc7SUFSQTtRQVNFLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFVbkIsQ0FBQztJQUpDLHVDQUFlLEdBQWY7UUFDRSxnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFORDtRQURDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7MENBQ2hDLFdBQVc7c0RBQU87SUFKcEIsYUFBYTtRQVJ6QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFFBQVEsRUFBRSxvSEFJUDtTQUNKLENBQUM7T0FDVyxhQUFhLENBV3pCO0lBQUQsb0JBQUM7Q0FBQSxBQVhELElBV0M7U0FYWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbWJlZGRlZFZpZXdSZWYsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRHluYW1pY1dyYXBwZXIgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2R5bmFtaWMtd3JhcHBlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RnLXdyYXBwZWQtY29sdW1uJyxcbiAgdGVtcGxhdGU6IGAgICAgICAgIFxuICAgICAgICA8bmctdGVtcGxhdGUgI2NvbHVtblBvcnRhbD5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBXcmFwcGVkQ29sdW1uIGltcGxlbWVudHMgRHluYW1pY1dyYXBwZXIsIEFmdGVyVmlld0luaXQge1xuICBfZHluYW1pYyA9IGZhbHNlO1xuXG4gIEBWaWV3Q2hpbGQoJ2NvbHVtblBvcnRhbCcsIHsgc3RhdGljOiBmYWxzZSB9KVxuICB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8dm9pZD47XG4gIGNvbHVtblZpZXc6IEVtYmVkZGVkVmlld1JlZjx2b2lkPjsgLy8gdGhlIGNvbHVtbnMgcHJvamVjdGVkIHZpZXcgKGluIG1lbW9yeSlcblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gQ3JlYXRlIHRoZSBjZWxscyB2aWV3IGluIG1lbW9yeSwgbm90IHRoZSBET00uXG4gICAgdGhpcy5jb2x1bW5WaWV3ID0gdGhpcy50ZW1wbGF0ZVJlZi5jcmVhdGVFbWJlZGRlZFZpZXcobnVsbCk7XG4gIH1cbn1cbiJdfQ==