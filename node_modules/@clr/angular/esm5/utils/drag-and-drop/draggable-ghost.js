import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostBinding, NgZone, Optional, Renderer2 } from '@angular/core';
import { DragEventListenerService } from './providers/drag-event-listener.service';
import { DraggableSnapshotService } from './providers/draggable-snapshot.service';
var ClrDraggableGhost = /** @class */ (function () {
    function ClrDraggableGhost(el, dragEventListener, draggableSnapshot, renderer, ngZone) {
        var _this = this;
        this.el = el;
        this.dragEventListener = dragEventListener;
        this.draggableSnapshot = draggableSnapshot;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.subscriptions = [];
        this.leaveAnimConfig = { value: 0, params: { top: '0px', left: '0px' } };
        if (!this.dragEventListener || !this.draggableSnapshot) {
            throw new Error('The clr-draggable-ghost component can only be used inside of a clrDraggable directive.');
        }
        this.draggableGhostEl = this.el.nativeElement;
        // Need to use Renderer2 as it runs outside of NgZone
        this.renderer.addClass(this.draggableGhostEl, 'draggable-ghost');
        // Register the ghost element in DragEventListener to pass in a ClrDragEvent.
        this.dragEventListener.ghostElement = this.draggableGhostEl;
        // Default ghost size gets the size of ClrDraggable element.
        this.setDefaultGhostSize(this.draggableGhostEl);
        var offset = {
            top: this.draggableSnapshot.hasDraggableState
                ? this.draggableSnapshot.dragEvent.dragPosition.pageY - this.draggableSnapshot.clientRect.top
                : 0,
            left: this.draggableSnapshot.hasDraggableState
                ? this.draggableSnapshot.dragEvent.dragPosition.pageX - this.draggableSnapshot.clientRect.left
                : 0,
        };
        var isAnimationConfigured = false;
        this.subscriptions.push(this.dragEventListener.dragMoved.subscribe(function (event) {
            // On the first drag move event, we configure the animation as it's dependent on the first drag event.
            if (!isAnimationConfigured) {
                if (_this.draggableSnapshot.hasDraggableState) {
                    _this.animateToOnLeave(_this.draggableSnapshot.clientRect.top + "px", _this.draggableSnapshot.clientRect.left + "px");
                }
                else {
                    _this.animateToOnLeave(event.dragPosition.pageY + "px", event.dragPosition.pageX + "px");
                }
                isAnimationConfigured = true;
            }
            // Position the draggable ghost.
            var topLeftPosition = _this.findTopLeftPosition(event.dragPosition, offset);
            _this.setPositionStyle(_this.draggableGhostEl, topLeftPosition.pageX, topLeftPosition.pageY);
            _this.dragEventListener.dropPointPosition = _this.findDropPointPosition(topLeftPosition);
        }));
    }
    ClrDraggableGhost.prototype.setDefaultGhostSize = function (el) {
        if (this.draggableSnapshot.hasDraggableState) {
            this.setSizeStyle(el, this.draggableSnapshot.clientRect.width, this.draggableSnapshot.clientRect.height);
        }
    };
    ClrDraggableGhost.prototype.animateToOnLeave = function (top, left) {
        var _this = this;
        this.ngZone.run(function () {
            _this.leaveAnimConfig = { value: 0, params: { top: top, left: left } };
        });
    };
    ClrDraggableGhost.prototype.findTopLeftPosition = function (dragPosition, offset) {
        return { pageX: dragPosition.pageX - offset.left, pageY: dragPosition.pageY - offset.top };
    };
    ClrDraggableGhost.prototype.findDropPointPosition = function (topLeftPosition) {
        if (this.draggableSnapshot.hasDraggableState) {
            return {
                pageX: topLeftPosition.pageX + this.draggableSnapshot.clientRect.width / 2,
                pageY: topLeftPosition.pageY + this.draggableSnapshot.clientRect.height / 2,
            };
        }
        else {
            return topLeftPosition;
        }
    };
    ClrDraggableGhost.prototype.setSizeStyle = function (el, width, height) {
        this.renderer.setStyle(el, 'width', width + "px");
        this.renderer.setStyle(el, 'height', height + "px");
    };
    ClrDraggableGhost.prototype.setPositionStyle = function (el, left, top) {
        this.renderer.setStyle(el, 'left', left + "px");
        this.renderer.setStyle(el, 'top', top + "px");
        this.renderer.setStyle(el, 'visibility', 'visible');
    };
    ClrDraggableGhost.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    tslib_1.__decorate([
        HostBinding('@leaveAnimation'),
        tslib_1.__metadata("design:type", Object)
    ], ClrDraggableGhost.prototype, "leaveAnimConfig", void 0);
    ClrDraggableGhost = tslib_1.__decorate([
        Component({
            selector: 'clr-draggable-ghost',
            template: "<ng-content></ng-content>",
            animations: [
                trigger('leaveAnimation', [
                    transition(':leave', [
                        style({ left: '*', top: '*' }),
                        animate('0.2s ease-in-out', style({ top: '{{top}}', left: '{{left}}' })),
                    ]),
                ]),
            ]
        }),
        tslib_1.__param(1, Optional()),
        tslib_1.__param(2, Optional()),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            DragEventListenerService,
            DraggableSnapshotService,
            Renderer2,
            NgZone])
    ], ClrDraggableGhost);
    return ClrDraggableGhost;
}());
export { ClrDraggableGhost };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLWdob3N0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZHJhZy1hbmQtZHJvcC9kcmFnZ2FibGUtZ2hvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBYSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNHLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBdUJsRjtJQU9FLDJCQUNVLEVBQWMsRUFDRixpQkFBOEMsRUFDOUMsaUJBQThDLEVBQzFELFFBQW1CLEVBQ25CLE1BQWM7UUFMeEIsaUJBc0RDO1FBckRTLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDRixzQkFBaUIsR0FBakIsaUJBQWlCLENBQTZCO1FBQzlDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBNkI7UUFDMUQsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBVGhCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUVYLG9CQUFlLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7UUFTbEcsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN0RCxNQUFNLElBQUksS0FBSyxDQUFDLHdGQUF3RixDQUFDLENBQUM7U0FDM0c7UUFFRCxJQUFJ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LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBhbmltYXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgTmdab25lLCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEcmFnRXZlbnRJbnRlcmZhY2UgfSBmcm9tICcuL2ludGVyZmFjZXMvZHJhZy1ldmVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRHJhZ0V2ZW50TGlzdGVuZXJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZHJhZy1ldmVudC1saXN0ZW5lci5zZXJ2aWNlJztcbmltcG9ydCB7IERyYWdnYWJsZVNuYXBzaG90U2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RyYWdnYWJsZS1zbmFwc2hvdC5zZXJ2aWNlJztcblxudHlwZSBQYWdlUG9zaXRpb24gPSB7XG4gIHBhZ2VYOiBudW1iZXI7XG4gIHBhZ2VZOiBudW1iZXI7XG59O1xudHlwZSBPZmZzZXRQb3NpdGlvbiA9IHtcbiAgdG9wOiBudW1iZXI7XG4gIGxlZnQ6IG51bWJlcjtcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kcmFnZ2FibGUtZ2hvc3QnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignbGVhdmVBbmltYXRpb24nLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgIHN0eWxlKHsgbGVmdDogJyonLCB0b3A6ICcqJyB9KSxcbiAgICAgICAgYW5pbWF0ZSgnMC4ycyBlYXNlLWluLW91dCcsIHN0eWxlKHsgdG9wOiAne3t0b3B9fScsIGxlZnQ6ICd7e2xlZnR9fScgfSkpLFxuICAgICAgXSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRyYWdnYWJsZUdob3N0PFQ+IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBkcmFnZ2FibGVHaG9zdEVsOiBhbnk7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIEBIb3N0QmluZGluZygnQGxlYXZlQW5pbWF0aW9uJykgbGVhdmVBbmltQ29uZmlnID0geyB2YWx1ZTogMCwgcGFyYW1zOiB7IHRvcDogJzBweCcsIGxlZnQ6ICcwcHgnIH0gfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZHJhZ0V2ZW50TGlzdGVuZXI6IERyYWdFdmVudExpc3RlbmVyU2VydmljZTxUPixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRyYWdnYWJsZVNuYXBzaG90OiBEcmFnZ2FibGVTbmFwc2hvdFNlcnZpY2U8VD4sXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmVcbiAgKSB7XG4gICAgaWYgKCF0aGlzLmRyYWdFdmVudExpc3RlbmVyIHx8ICF0aGlzLmRyYWdnYWJsZVNuYXBzaG90KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjbHItZHJhZ2dhYmxlLWdob3N0IGNvbXBvbmVudCBjYW4gb25seSBiZSB1c2VkIGluc2lkZSBvZiBhIGNsckRyYWdnYWJsZSBkaXJlY3RpdmUuJyk7XG4gICAgfVxuXG4gICAgdGhpcy5kcmFnZ2FibGVHaG9zdEVsID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuXG4gICAgLy8gTmVlZCB0byB1c2UgUmVuZGVyZXIyIGFzIGl0IHJ1bnMgb3V0c2lkZSBvZiBOZ1pvbmVcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZHJhZ2dhYmxlR2hvc3RFbCwgJ2RyYWdnYWJsZS1naG9zdCcpO1xuXG4gICAgLy8gUmVnaXN0ZXIgdGhlIGdob3N0IGVsZW1lbnQgaW4gRHJhZ0V2ZW50TGlzdGVuZXIgdG8gcGFzcyBpbiBhIENsckRyYWdFdmVudC5cbiAgICB0aGlzLmRyYWdFdmVudExpc3RlbmVyLmdob3N0RWxlbWVudCA9IHRoaXMuZHJhZ2dhYmxlR2hvc3RFbDtcblxuICAgIC8vIERlZmF1bHQgZ2hvc3Qgc2l6ZSBnZXRzIHRoZSBzaXplIG9mIENsckRyYWdnYWJsZSBlbGVtZW50LlxuICAgIHRoaXMuc2V0RGVmYXVsdEdob3N0U2l6ZSh0aGlzLmRyYWdnYWJsZUdob3N0RWwpO1xuXG4gICAgY29uc3Qgb2Zmc2V0OiBPZmZzZXRQb3NpdGlvbiA9IHtcbiAgICAgIHRvcDogdGhpcy5kcmFnZ2FibGVTbmFwc2hvdC5oYXNEcmFnZ2FibGVTdGF0ZVxuICAgICAgICA/IHRoaXMuZHJhZ2dhYmxlU25hcHNob3QuZHJhZ0V2ZW50LmRyYWdQb3NpdGlvbi5wYWdlWSAtIHRoaXMuZHJhZ2dhYmxlU25hcHNob3QuY2xpZW50UmVjdC50b3BcbiAgICAgICAgOiAwLFxuICAgICAgbGVmdDogdGhpcy5kcmFnZ2FibGVTbmFwc2hvdC5oYXNEcmFnZ2FibGVTdGF0ZVxuICAgICAgICA/IHRoaXMuZHJhZ2dhYmxlU25hcHNob3QuZHJhZ0V2ZW50LmRyYWdQb3NpdGlvbi5wYWdlWCAtIHRoaXMuZHJhZ2dhYmxlU25hcHNob3QuY2xpZW50UmVjdC5sZWZ0XG4gICAgICAgIDogMCxcbiAgICB9O1xuXG4gICAgbGV0IGlzQW5pbWF0aW9uQ29uZmlndXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmRyYWdFdmVudExpc3RlbmVyLmRyYWdNb3ZlZC5zdWJzY3JpYmUoKGV2ZW50OiBEcmFnRXZlbnRJbnRlcmZhY2U8VD4pID0+IHtcbiAgICAgICAgLy8gT24gdGhlIGZpcnN0IGRyYWcgbW92ZSBldmVudCwgd2UgY29uZmlndXJlIHRoZSBhbmltYXRpb24gYXMgaXQncyBkZXBlbmRlbnQgb24gdGhlIGZpcnN0IGRyYWcgZXZlbnQuXG4gICAgICAgIGlmICghaXNBbmltYXRpb25Db25maWd1cmVkKSB7XG4gICAgICAgICAgaWYgKHRoaXMuZHJhZ2dhYmxlU25hcHNob3QuaGFzRHJhZ2dhYmxlU3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVRvT25MZWF2ZShcbiAgICAgICAgICAgICAgYCR7dGhpcy5kcmFnZ2FibGVTbmFwc2hvdC5jbGllbnRSZWN0LnRvcH1weGAsXG4gICAgICAgICAgICAgIGAke3RoaXMuZHJhZ2dhYmxlU25hcHNob3QuY2xpZW50UmVjdC5sZWZ0fXB4YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRlVG9PbkxlYXZlKGAke2V2ZW50LmRyYWdQb3NpdGlvbi5wYWdlWX1weGAsIGAke2V2ZW50LmRyYWdQb3NpdGlvbi5wYWdlWH1weGApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpc0FuaW1hdGlvbkNvbmZpZ3VyZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUG9zaXRpb24gdGhlIGRyYWdnYWJsZSBnaG9zdC5cbiAgICAgICAgY29uc3QgdG9wTGVmdFBvc2l0aW9uOiBQYWdlUG9zaXRpb24gPSB0aGlzLmZpbmRUb3BMZWZ0UG9zaXRpb24oZXZlbnQuZHJhZ1Bvc2l0aW9uLCBvZmZzZXQpO1xuICAgICAgICB0aGlzLnNldFBvc2l0aW9uU3R5bGUodGhpcy5kcmFnZ2FibGVHaG9zdEVsLCB0b3BMZWZ0UG9zaXRpb24ucGFnZVgsIHRvcExlZnRQb3NpdGlvbi5wYWdlWSk7XG4gICAgICAgIHRoaXMuZHJhZ0V2ZW50TGlzdGVuZXIuZHJvcFBvaW50UG9zaXRpb24gPSB0aGlzLmZpbmREcm9wUG9pbnRQb3NpdGlvbih0b3BMZWZ0UG9zaXRpb24pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXREZWZhdWx0R2hvc3RTaXplKGVsOiBOb2RlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZHJhZ2dhYmxlU25hcHNob3QuaGFzRHJhZ2dhYmxlU3RhdGUpIHtcbiAgICAgIHRoaXMuc2V0U2l6ZVN0eWxlKGVsLCB0aGlzLmRyYWdnYWJsZVNuYXBzaG90LmNsaWVudFJlY3Qud2lkdGgsIHRoaXMuZHJhZ2dhYmxlU25hcHNob3QuY2xpZW50UmVjdC5oZWlnaHQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYW5pbWF0ZVRvT25MZWF2ZSh0b3A6IHN0cmluZywgbGVmdDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgIHRoaXMubGVhdmVBbmltQ29uZmlnID0geyB2YWx1ZTogMCwgcGFyYW1zOiB7IHRvcDogdG9wLCBsZWZ0OiBsZWZ0IH0gfTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZFRvcExlZnRQb3NpdGlvbihkcmFnUG9zaXRpb246IFBhZ2VQb3NpdGlvbiwgb2Zmc2V0OiBPZmZzZXRQb3NpdGlvbik6IFBhZ2VQb3NpdGlvbiB7XG4gICAgcmV0dXJuIHsgcGFnZVg6IGRyYWdQb3NpdGlvbi5wYWdlWCAtIG9mZnNldC5sZWZ0LCBwYWdlWTogZHJhZ1Bvc2l0aW9uLnBhZ2VZIC0gb2Zmc2V0LnRvcCB9O1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kRHJvcFBvaW50UG9zaXRpb24odG9wTGVmdFBvc2l0aW9uOiBQYWdlUG9zaXRpb24pOiBQYWdlUG9zaXRpb24ge1xuICAgIGlmICh0aGlzLmRyYWdnYWJsZVNuYXBzaG90Lmhhc0RyYWdnYWJsZVN0YXRlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYWdlWDogdG9wTGVmdFBvc2l0aW9uLnBhZ2VYICsgdGhpcy5kcmFnZ2FibGVTbmFwc2hvdC5jbGllbnRSZWN0LndpZHRoIC8gMixcbiAgICAgICAgcGFnZVk6IHRvcExlZnRQb3NpdGlvbi5wYWdlWSArIHRoaXMuZHJhZ2dhYmxlU25hcHNob3QuY2xpZW50UmVjdC5oZWlnaHQgLyAyLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRvcExlZnRQb3NpdGlvbjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFNpemVTdHlsZShlbDogTm9kZSwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGVsLCAnd2lkdGgnLCBgJHt3aWR0aH1weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZWwsICdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0UG9zaXRpb25TdHlsZShlbDogTm9kZSwgbGVmdDogbnVtYmVyLCB0b3A6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZWwsICdsZWZ0JywgYCR7bGVmdH1weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZWwsICd0b3AnLCBgJHt0b3B9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGVsLCAndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3ViOiBTdWJzY3JpcHRpb24pID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19