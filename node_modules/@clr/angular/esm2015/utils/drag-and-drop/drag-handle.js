/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Optional } from '@angular/core';
import { DragHandleRegistrarService } from './providers/drag-handle-registrar.service';
let ClrDragHandle = class ClrDragHandle {
    constructor(el, dragHandleRegistrar) {
        this.el = el;
        this.dragHandleRegistrar = dragHandleRegistrar;
        if (!this.dragHandleRegistrar) {
            // ClrDragHandleRegistrar is provided in ClrDraggable so we expect it to be present here
            // as clrDragHandle is required to be used only inside of a clrDraggable directive.
            throw new Error('The clrDragHandle directive can only be used inside of a clrDraggable directive.');
        }
        this.dragHandleRegistrar.registerCustomHandle(this.el.nativeElement);
    }
    ngOnDestroy() {
        this.dragHandleRegistrar.unregisterCustomHandle();
    }
};
ClrDragHandle = tslib_1.__decorate([
    Directive({ selector: '[clrDragHandle]', host: { '[class.drag-handle]': 'true' } }),
    tslib_1.__param(1, Optional()),
    tslib_1.__metadata("design:paramtypes", [ElementRef, DragHandleRegistrarService])
], ClrDragHandle);
export { ClrDragHandle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1oYW5kbGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9kcmFnLWFuZC1kcm9wL2RyYWctaGFuZGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQWEsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBR3ZGLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFDeEIsWUFBb0IsRUFBYyxFQUFzQixtQkFBa0Q7UUFBdEYsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFzQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQStCO1FBQ3hHLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDN0Isd0ZBQXdGO1lBQ3hGLG1GQUFtRjtZQUNuRixNQUFNLElBQUksS0FBSyxDQUFDLGtGQUFrRixDQUFDLENBQUM7U0FDckc7UUFDRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ3BELENBQUM7Q0FDRixDQUFBO0FBYlksYUFBYTtJQUR6QixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUU3QyxtQkFBQSxRQUFRLEVBQUUsQ0FBQTs2Q0FBdkIsVUFBVSxFQUEyQywwQkFBMEI7R0FENUYsYUFBYSxDQWF6QjtTQWJZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRHJhZ0hhbmRsZVJlZ2lzdHJhclNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kcmFnLWhhbmRsZS1yZWdpc3RyYXIuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJEcmFnSGFuZGxlXScsIGhvc3Q6IHsgJ1tjbGFzcy5kcmFnLWhhbmRsZV0nOiAndHJ1ZScgfSB9KVxuZXhwb3J0IGNsYXNzIENsckRyYWdIYW5kbGU8VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBAT3B0aW9uYWwoKSBwcml2YXRlIGRyYWdIYW5kbGVSZWdpc3RyYXI6IERyYWdIYW5kbGVSZWdpc3RyYXJTZXJ2aWNlPFQ+KSB7XG4gICAgaWYgKCF0aGlzLmRyYWdIYW5kbGVSZWdpc3RyYXIpIHtcbiAgICAgIC8vIENsckRyYWdIYW5kbGVSZWdpc3RyYXIgaXMgcHJvdmlkZWQgaW4gQ2xyRHJhZ2dhYmxlIHNvIHdlIGV4cGVjdCBpdCB0byBiZSBwcmVzZW50IGhlcmVcbiAgICAgIC8vIGFzIGNsckRyYWdIYW5kbGUgaXMgcmVxdWlyZWQgdG8gYmUgdXNlZCBvbmx5IGluc2lkZSBvZiBhIGNsckRyYWdnYWJsZSBkaXJlY3RpdmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjbHJEcmFnSGFuZGxlIGRpcmVjdGl2ZSBjYW4gb25seSBiZSB1c2VkIGluc2lkZSBvZiBhIGNsckRyYWdnYWJsZSBkaXJlY3RpdmUuJyk7XG4gICAgfVxuICAgIHRoaXMuZHJhZ0hhbmRsZVJlZ2lzdHJhci5yZWdpc3RlckN1c3RvbUhhbmRsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kcmFnSGFuZGxlUmVnaXN0cmFyLnVucmVnaXN0ZXJDdXN0b21IYW5kbGUoKTtcbiAgfVxufVxuIl19