import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable, Renderer2 } from '@angular/core';
// This service class adds and removes the "in-drag" class to the document body element
// through its public enter() and exit() methods.
let GlobalDragModeService = class GlobalDragModeService {
    constructor(renderer) {
        this.renderer = renderer;
    }
    enter() {
        this.renderer.addClass(document.body, 'in-drag');
    }
    exit() {
        this.renderer.removeClass(document.body, 'in-drag');
    }
};
GlobalDragModeService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Renderer2])
], GlobalDragModeService);
export { GlobalDragModeService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWRyYWctbW9kZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZHJhZy1hbmQtZHJvcC9wcm92aWRlcnMvZ2xvYmFsLWRyYWctbW9kZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEQsdUZBQXVGO0FBQ3ZGLGlEQUFpRDtBQUVqRCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQUNoQyxZQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO0lBQUcsQ0FBQztJQUUzQyxLQUFLO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDdEQsQ0FBQztDQUNGLENBQUE7QUFWWSxxQkFBcUI7SUFEakMsVUFBVSxFQUFFOzZDQUVtQixTQUFTO0dBRDVCLHFCQUFxQixDQVVqQztTQVZZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBUaGlzIHNlcnZpY2UgY2xhc3MgYWRkcyBhbmQgcmVtb3ZlcyB0aGUgXCJpbi1kcmFnXCIgY2xhc3MgdG8gdGhlIGRvY3VtZW50IGJvZHkgZWxlbWVudFxuLy8gdGhyb3VnaCBpdHMgcHVibGljIGVudGVyKCkgYW5kIGV4aXQoKSBtZXRob2RzLlxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdsb2JhbERyYWdNb2RlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBlbnRlcigpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICdpbi1kcmFnJyk7XG4gIH1cblxuICBleGl0KCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ2luLWRyYWcnKTtcbiAgfVxufVxuIl19