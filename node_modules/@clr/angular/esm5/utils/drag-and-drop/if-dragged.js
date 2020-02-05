import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, Optional, SkipSelf, TemplateRef, ViewContainerRef } from '@angular/core';
import { DragEventListenerService } from './providers/drag-event-listener.service';
// This structural directive will be used mainly together with `clr-draggable-ghost` directive inside of clrDraggable
// directive. The directive is responsible for instantiating `clr-draggable-ghost` directive only during dragging so
// that Angular Change Detection is prevented from running if a component or directive is placed inside of the
// `clr-draggable-ghost` directive.
var ClrIfDragged = /** @class */ (function () {
    function ClrIfDragged(template, container, dragEventListener) {
        var _this = this;
        this.template = template;
        this.container = container;
        this.dragEventListener = dragEventListener;
        this.subscriptions = [];
        if (!this.dragEventListener || !this.container) {
            throw new Error('The *clrIfDragged directive can only be used inside of a clrDraggable directive.');
        }
        this.subscriptions.push(this.dragEventListener.dragStarted.subscribe(function (event) {
            _this.container.createEmbeddedView(_this.template);
        }));
        this.subscriptions.push(this.dragEventListener.dragEnded.subscribe(function (event) {
            _this.container.clear();
        }));
    }
    ClrIfDragged.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ClrIfDragged = tslib_1.__decorate([
        Directive({ selector: '[clrIfDragged]' }),
        tslib_1.__param(1, Optional()),
        tslib_1.__param(1, SkipSelf()),
        tslib_1.__param(2, Optional()),
        tslib_1.__metadata("design:paramtypes", [TemplateRef,
            ViewContainerRef,
            DragEventListenerService])
    ], ClrIfDragged);
    return ClrIfDragged;
}());
export { ClrIfDragged };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtZHJhZ2dlZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2RyYWctYW5kLWRyb3AvaWYtZHJhZ2dlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQWEsUUFBUSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJeEcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFbkYscUhBQXFIO0FBQ3JILG9IQUFvSDtBQUNwSCw4R0FBOEc7QUFDOUcsbUNBQW1DO0FBR25DO0lBRUUsc0JBQ1UsUUFBMEIsRUFHMUIsU0FBMkIsRUFDZixpQkFBOEM7UUFMcEUsaUJBcUJDO1FBcEJTLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBRzFCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQ2Ysc0JBQWlCLEdBQWpCLGlCQUFpQixDQUE2QjtRQU41RCxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFRekMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDOUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrRkFBa0YsQ0FBQyxDQUFDO1NBQ3JHO1FBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBNEI7WUFDeEUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQTRCO1lBQ3RFLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxrQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFpQixJQUFLLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDdkUsQ0FBQztJQTNCVSxZQUFZO1FBRHhCLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO1FBS3JDLG1CQUFBLFFBQVEsRUFBRSxDQUFBO1FBQ1YsbUJBQUEsUUFBUSxFQUFFLENBQUE7UUFFVixtQkFBQSxRQUFRLEVBQUUsQ0FBQTtpREFKTyxXQUFXO1lBR1YsZ0JBQWdCO1lBQ0ksd0JBQXdCO09BUHRELFlBQVksQ0E0QnhCO0lBQUQsbUJBQUM7Q0FBQSxBQTVCRCxJQTRCQztTQTVCWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBTa2lwU2VsZiwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEcmFnRXZlbnRJbnRlcmZhY2UgfSBmcm9tICcuL2ludGVyZmFjZXMvZHJhZy1ldmVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRHJhZ0V2ZW50TGlzdGVuZXJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZHJhZy1ldmVudC1saXN0ZW5lci5zZXJ2aWNlJztcblxuLy8gVGhpcyBzdHJ1Y3R1cmFsIGRpcmVjdGl2ZSB3aWxsIGJlIHVzZWQgbWFpbmx5IHRvZ2V0aGVyIHdpdGggYGNsci1kcmFnZ2FibGUtZ2hvc3RgIGRpcmVjdGl2ZSBpbnNpZGUgb2YgY2xyRHJhZ2dhYmxlXG4vLyBkaXJlY3RpdmUuIFRoZSBkaXJlY3RpdmUgaXMgcmVzcG9uc2libGUgZm9yIGluc3RhbnRpYXRpbmcgYGNsci1kcmFnZ2FibGUtZ2hvc3RgIGRpcmVjdGl2ZSBvbmx5IGR1cmluZyBkcmFnZ2luZyBzb1xuLy8gdGhhdCBBbmd1bGFyIENoYW5nZSBEZXRlY3Rpb24gaXMgcHJldmVudGVkIGZyb20gcnVubmluZyBpZiBhIGNvbXBvbmVudCBvciBkaXJlY3RpdmUgaXMgcGxhY2VkIGluc2lkZSBvZiB0aGVcbi8vIGBjbHItZHJhZ2dhYmxlLWdob3N0YCBkaXJlY3RpdmUuXG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJJZkRyYWdnZWRdJyB9KVxuZXhwb3J0IGNsYXNzIENscklmRHJhZ2dlZDxUPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PixcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBTa2lwU2VsZigpXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkcmFnRXZlbnRMaXN0ZW5lcjogRHJhZ0V2ZW50TGlzdGVuZXJTZXJ2aWNlPFQ+XG4gICkge1xuICAgIGlmICghdGhpcy5kcmFnRXZlbnRMaXN0ZW5lciB8fCAhdGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlICpjbHJJZkRyYWdnZWQgZGlyZWN0aXZlIGNhbiBvbmx5IGJlIHVzZWQgaW5zaWRlIG9mIGEgY2xyRHJhZ2dhYmxlIGRpcmVjdGl2ZS4nKTtcbiAgICB9XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuZHJhZ0V2ZW50TGlzdGVuZXIuZHJhZ1N0YXJ0ZWQuc3Vic2NyaWJlKChldmVudDogRHJhZ0V2ZW50SW50ZXJmYWNlPFQ+KSA9PiB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuZHJhZ0V2ZW50TGlzdGVuZXIuZHJhZ0VuZGVkLnN1YnNjcmliZSgoZXZlbnQ6IERyYWdFdmVudEludGVyZmFjZTxUPikgPT4ge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGVhcigpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==