import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, TemplateRef, ViewChild } from '@angular/core';
var WrappedCell = /** @class */ (function () {
    function WrappedCell() {
        this._dynamic = false;
    }
    WrappedCell.prototype.ngAfterViewInit = function () {
        this.cellView = this.templateRef.createEmbeddedView(null);
    };
    tslib_1.__decorate([
        ViewChild('cellPortal', { static: false }),
        tslib_1.__metadata("design:type", TemplateRef)
    ], WrappedCell.prototype, "templateRef", void 0);
    WrappedCell = tslib_1.__decorate([
        Component({
            selector: 'dg-wrapped-cell',
            template: "        \n        <ng-template #cellPortal>\n            <ng-content></ng-content>\n        </ng-template>\n    "
        })
    ], WrappedCell);
    return WrappedCell;
}());
export { WrappedCell };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlZC1jZWxsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC93cmFwcGVkLWNlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQWlCLFNBQVMsRUFBbUIsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVlsRztJQVJBO1FBU0UsYUFBUSxHQUFHLEtBQUssQ0FBQztJQVFuQixDQUFDO0lBSEMscUNBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBTEQ7UUFEQyxTQUFTLENBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzBDQUM5QixXQUFXO29EQUFPO0lBSHBCLFdBQVc7UUFSdkIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixRQUFRLEVBQUUsa0hBSVA7U0FDSixDQUFDO09BQ1csV0FBVyxDQVN2QjtJQUFELGtCQUFDO0NBQUEsQUFURCxJQVNDO1NBVFksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRW1iZWRkZWRWaWV3UmVmLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IER5bmFtaWNXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9keW5hbWljLXdyYXBwZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZy13cmFwcGVkLWNlbGwnLFxuICB0ZW1wbGF0ZTogYCAgICAgICAgXG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjY2VsbFBvcnRhbD5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBXcmFwcGVkQ2VsbCBpbXBsZW1lbnRzIER5bmFtaWNXcmFwcGVyLCBBZnRlclZpZXdJbml0IHtcbiAgX2R5bmFtaWMgPSBmYWxzZTtcbiAgQFZpZXdDaGlsZCgnY2VsbFBvcnRhbCcsIHsgc3RhdGljOiBmYWxzZSB9KVxuICB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8dm9pZD47XG4gIGNlbGxWaWV3OiBFbWJlZGRlZFZpZXdSZWY8dm9pZD47IC8vIHRoZSBjZWxscyBwcm9qZWN0ZWQgdmlld1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmNlbGxWaWV3ID0gdGhpcy50ZW1wbGF0ZVJlZi5jcmVhdGVFbWJlZGRlZFZpZXcobnVsbCk7XG4gIH1cbn1cbiJdfQ==