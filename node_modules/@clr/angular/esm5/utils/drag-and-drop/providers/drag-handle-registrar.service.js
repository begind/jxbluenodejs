import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable, Renderer2 } from '@angular/core';
import { DragEventListenerService } from './drag-event-listener.service';
// This provider registers the drag handle element.
// When it registers a element as a drag handle, it attaches that element to the listeners from ClrDragEventListener.
// Also, it adds the "drag-handle" css class to the registered element through Renderer.
var DragHandleRegistrarService = /** @class */ (function () {
    function DragHandleRegistrarService(dragEventListener, renderer) {
        this.dragEventListener = dragEventListener;
        this.renderer = renderer;
    }
    Object.defineProperty(DragHandleRegistrarService.prototype, "defaultHandleEl", {
        get: function () {
            return this._defaultHandleEl;
        },
        set: function (el) {
            this._defaultHandleEl = el; // defaultHandleEl will be usually the clrDraggable element.
            // If the customHandleEl has been registered,
            // don't make the defaultHandleEl the drag handle yet until the customHandleEl is unregistered.
            if (!this._customHandleEl) {
                this.makeElementHandle(this._defaultHandleEl);
            }
        },
        enumerable: true,
        configurable: true
    });
    DragHandleRegistrarService.prototype.makeElementHandle = function (el) {
        if (this._defaultHandleEl && this._defaultHandleEl !== el) {
            // Before making an element the custom handle element,
            // we should remove the existing drag-handle class from the draggable element.
            this.renderer.removeClass(this._defaultHandleEl, 'drag-handle');
        }
        this.dragEventListener.attachDragListeners(el);
        this.renderer.addClass(el, 'drag-handle');
    };
    Object.defineProperty(DragHandleRegistrarService.prototype, "customHandleEl", {
        get: function () {
            return this._customHandleEl;
        },
        enumerable: true,
        configurable: true
    });
    DragHandleRegistrarService.prototype.registerCustomHandle = function (el) {
        this.dragEventListener.detachDragListeners(); // removes the existing listeners
        this._customHandleEl = el;
        this.makeElementHandle(this._customHandleEl);
    };
    DragHandleRegistrarService.prototype.unregisterCustomHandle = function () {
        this.dragEventListener.detachDragListeners(); // removes the existing listeners
        this.renderer.removeClass(this._customHandleEl, 'drag-handle');
        delete this._customHandleEl;
        // if default handle is set, make that handle
        if (this._defaultHandleEl) {
            this.makeElementHandle(this._defaultHandleEl);
        }
    };
    DragHandleRegistrarService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [DragEventListenerService, Renderer2])
    ], DragHandleRegistrarService);
    return DragHandleRegistrarService;
}());
export { DragHandleRegistrarService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1oYW5kbGUtcmVnaXN0cmFyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9kcmFnLWFuZC1kcm9wL3Byb3ZpZGVycy9kcmFnLWhhbmRsZS1yZWdpc3RyYXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRXpFLG1EQUFtRDtBQUNuRCxxSEFBcUg7QUFDckgsd0ZBQXdGO0FBRXhGO0lBa0JFLG9DQUFvQixpQkFBOEMsRUFBVSxRQUFtQjtRQUEzRSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTZCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUFHLENBQUM7SUFkbkcsc0JBQUksdURBQWU7YUFBbkI7WUFDRSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUMvQixDQUFDO2FBRUQsVUFBb0IsRUFBUTtZQUMxQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLENBQUMsNERBQTREO1lBRXhGLDZDQUE2QztZQUM3QywrRkFBK0Y7WUFDL0YsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUMvQztRQUNILENBQUM7OztPQVZBO0lBY08sc0RBQWlCLEdBQXpCLFVBQTBCLEVBQVE7UUFDaEMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGdCQUFnQixLQUFLLEVBQUUsRUFBRTtZQUN6RCxzREFBc0Q7WUFDdEQsOEVBQThFO1lBQzlFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLENBQUMsQ0FBQztTQUNqRTtRQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELHNCQUFJLHNEQUFjO2FBQWxCO1lBQ0UsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzlCLENBQUM7OztPQUFBO0lBRU0seURBQW9CLEdBQTNCLFVBQTRCLEVBQVE7UUFDbEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxpQ0FBaUM7UUFDL0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU0sMkRBQXNCLEdBQTdCO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxpQ0FBaUM7UUFDL0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUMvRCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDNUIsNkNBQTZDO1FBQzdDLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUMvQztJQUNILENBQUM7SUFoRFUsMEJBQTBCO1FBRHRDLFVBQVUsRUFBRTtpREFtQjRCLHdCQUF3QixFQUF1QixTQUFTO09BbEJwRiwwQkFBMEIsQ0FpRHRDO0lBQUQsaUNBQUM7Q0FBQSxBQWpERCxJQWlEQztTQWpEWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRHJhZ0V2ZW50TGlzdGVuZXJTZXJ2aWNlIH0gZnJvbSAnLi9kcmFnLWV2ZW50LWxpc3RlbmVyLnNlcnZpY2UnO1xuXG4vLyBUaGlzIHByb3ZpZGVyIHJlZ2lzdGVycyB0aGUgZHJhZyBoYW5kbGUgZWxlbWVudC5cbi8vIFdoZW4gaXQgcmVnaXN0ZXJzIGEgZWxlbWVudCBhcyBhIGRyYWcgaGFuZGxlLCBpdCBhdHRhY2hlcyB0aGF0IGVsZW1lbnQgdG8gdGhlIGxpc3RlbmVycyBmcm9tIENsckRyYWdFdmVudExpc3RlbmVyLlxuLy8gQWxzbywgaXQgYWRkcyB0aGUgXCJkcmFnLWhhbmRsZVwiIGNzcyBjbGFzcyB0byB0aGUgcmVnaXN0ZXJlZCBlbGVtZW50IHRocm91Z2ggUmVuZGVyZXIuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRHJhZ0hhbmRsZVJlZ2lzdHJhclNlcnZpY2U8VD4ge1xuICBwcml2YXRlIF9jdXN0b21IYW5kbGVFbDogYW55O1xuICBwcml2YXRlIF9kZWZhdWx0SGFuZGxlRWw6IGFueTtcblxuICBnZXQgZGVmYXVsdEhhbmRsZUVsKCkge1xuICAgIHJldHVybiB0aGlzLl9kZWZhdWx0SGFuZGxlRWw7XG4gIH1cblxuICBzZXQgZGVmYXVsdEhhbmRsZUVsKGVsOiBOb2RlKSB7XG4gICAgdGhpcy5fZGVmYXVsdEhhbmRsZUVsID0gZWw7IC8vIGRlZmF1bHRIYW5kbGVFbCB3aWxsIGJlIHVzdWFsbHkgdGhlIGNsckRyYWdnYWJsZSBlbGVtZW50LlxuXG4gICAgLy8gSWYgdGhlIGN1c3RvbUhhbmRsZUVsIGhhcyBiZWVuIHJlZ2lzdGVyZWQsXG4gICAgLy8gZG9uJ3QgbWFrZSB0aGUgZGVmYXVsdEhhbmRsZUVsIHRoZSBkcmFnIGhhbmRsZSB5ZXQgdW50aWwgdGhlIGN1c3RvbUhhbmRsZUVsIGlzIHVucmVnaXN0ZXJlZC5cbiAgICBpZiAoIXRoaXMuX2N1c3RvbUhhbmRsZUVsKSB7XG4gICAgICB0aGlzLm1ha2VFbGVtZW50SGFuZGxlKHRoaXMuX2RlZmF1bHRIYW5kbGVFbCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkcmFnRXZlbnRMaXN0ZW5lcjogRHJhZ0V2ZW50TGlzdGVuZXJTZXJ2aWNlPFQ+LCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgcHJpdmF0ZSBtYWtlRWxlbWVudEhhbmRsZShlbDogTm9kZSkge1xuICAgIGlmICh0aGlzLl9kZWZhdWx0SGFuZGxlRWwgJiYgdGhpcy5fZGVmYXVsdEhhbmRsZUVsICE9PSBlbCkge1xuICAgICAgLy8gQmVmb3JlIG1ha2luZyBhbiBlbGVtZW50IHRoZSBjdXN0b20gaGFuZGxlIGVsZW1lbnQsXG4gICAgICAvLyB3ZSBzaG91bGQgcmVtb3ZlIHRoZSBleGlzdGluZyBkcmFnLWhhbmRsZSBjbGFzcyBmcm9tIHRoZSBkcmFnZ2FibGUgZWxlbWVudC5cbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZGVmYXVsdEhhbmRsZUVsLCAnZHJhZy1oYW5kbGUnKTtcbiAgICB9XG4gICAgdGhpcy5kcmFnRXZlbnRMaXN0ZW5lci5hdHRhY2hEcmFnTGlzdGVuZXJzKGVsKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVsLCAnZHJhZy1oYW5kbGUnKTtcbiAgfVxuXG4gIGdldCBjdXN0b21IYW5kbGVFbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VzdG9tSGFuZGxlRWw7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJDdXN0b21IYW5kbGUoZWw6IE5vZGUpIHtcbiAgICB0aGlzLmRyYWdFdmVudExpc3RlbmVyLmRldGFjaERyYWdMaXN0ZW5lcnMoKTsgLy8gcmVtb3ZlcyB0aGUgZXhpc3RpbmcgbGlzdGVuZXJzXG4gICAgdGhpcy5fY3VzdG9tSGFuZGxlRWwgPSBlbDtcbiAgICB0aGlzLm1ha2VFbGVtZW50SGFuZGxlKHRoaXMuX2N1c3RvbUhhbmRsZUVsKTtcbiAgfVxuXG4gIHB1YmxpYyB1bnJlZ2lzdGVyQ3VzdG9tSGFuZGxlKCkge1xuICAgIHRoaXMuZHJhZ0V2ZW50TGlzdGVuZXIuZGV0YWNoRHJhZ0xpc3RlbmVycygpOyAvLyByZW1vdmVzIHRoZSBleGlzdGluZyBsaXN0ZW5lcnNcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2N1c3RvbUhhbmRsZUVsLCAnZHJhZy1oYW5kbGUnKTtcbiAgICBkZWxldGUgdGhpcy5fY3VzdG9tSGFuZGxlRWw7XG4gICAgLy8gaWYgZGVmYXVsdCBoYW5kbGUgaXMgc2V0LCBtYWtlIHRoYXQgaGFuZGxlXG4gICAgaWYgKHRoaXMuX2RlZmF1bHRIYW5kbGVFbCkge1xuICAgICAgdGhpcy5tYWtlRWxlbWVudEhhbmRsZSh0aGlzLl9kZWZhdWx0SGFuZGxlRWwpO1xuICAgIH1cbiAgfVxufVxuIl19