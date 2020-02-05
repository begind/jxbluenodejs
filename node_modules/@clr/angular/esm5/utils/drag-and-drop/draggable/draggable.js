import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ComponentFactoryResolver, ContentChild, Directive, ElementRef, EventEmitter, Injector, Output, ViewContainerRef, } from '@angular/core';
import { Input } from '@angular/core';
import { DomAdapter } from '../../dom-adapter/dom-adapter';
import { ClrDragEvent } from '../drag-event';
import { ClrDraggableGhost } from '../draggable-ghost';
import { ClrIfDragged } from '../if-dragged';
import { DragEventListenerService } from '../providers/drag-event-listener.service';
import { DragHandleRegistrarService } from '../providers/drag-handle-registrar.service';
import { DraggableSnapshotService } from '../providers/draggable-snapshot.service';
import { GlobalDragModeService } from '../providers/global-drag-mode.service';
var ClrDraggable = /** @class */ (function () {
    function ClrDraggable(el, dragEventListener, dragHandleRegistrar, viewContainerRef, cfr, injector, draggableSnapshot, globalDragMode) {
        this.el = el;
        this.dragEventListener = dragEventListener;
        this.dragHandleRegistrar = dragHandleRegistrar;
        this.viewContainerRef = viewContainerRef;
        this.cfr = cfr;
        this.injector = injector;
        this.draggableSnapshot = draggableSnapshot;
        this.globalDragMode = globalDragMode;
        this.subscriptions = [];
        this.dragOn = false;
        this.dragStartEmitter = new EventEmitter();
        this.dragMoveEmitter = new EventEmitter();
        this.dragEndEmitter = new EventEmitter();
        this.draggableEl = this.el.nativeElement;
        this.componentFactory = this.cfr.resolveComponentFactory(ClrDraggableGhost);
    }
    Object.defineProperty(ClrDraggable.prototype, "dataTransfer", {
        set: function (value) {
            this.dragEventListener.dragDataTransfer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDraggable.prototype, "group", {
        set: function (value) {
            this.dragEventListener.group = value;
        },
        enumerable: true,
        configurable: true
    });
    ClrDraggable.prototype.createDefaultGhost = function (event) {
        this.draggableSnapshot.capture(this.draggableEl, event);
        // NOTE: The default ghost element will appear
        // next to the clrDraggable in the DOM as a sibling element.
        this.viewContainerRef.createComponent(this.componentFactory, 0, this.injector, [
            [this.draggableEl.cloneNode(true)],
        ]);
    };
    ClrDraggable.prototype.destroyDefaultGhost = function () {
        this.viewContainerRef.clear();
        this.draggableSnapshot.discard();
    };
    ClrDraggable.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.dragHandleRegistrar.defaultHandleEl = this.draggableEl;
        this.subscriptions.push(this.dragEventListener.dragStarted.subscribe(function (event) {
            _this.globalDragMode.enter();
            _this.dragOn = true;
            if (!_this.customGhost) {
                _this.createDefaultGhost(event);
            }
            _this.dragStartEmitter.emit(new ClrDragEvent(event));
        }));
        this.subscriptions.push(this.dragEventListener.dragMoved.subscribe(function (event) {
            _this.dragMoveEmitter.emit(new ClrDragEvent(event));
        }));
        this.subscriptions.push(this.dragEventListener.dragEnded.subscribe(function (event) {
            _this.globalDragMode.exit();
            _this.dragOn = false;
            if (!_this.customGhost) {
                _this.destroyDefaultGhost();
            }
            _this.dragEndEmitter.emit(new ClrDragEvent(event));
        }));
    };
    ClrDraggable.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        this.dragEventListener.detachDragListeners();
    };
    tslib_1.__decorate([
        ContentChild(ClrIfDragged, { static: false }),
        tslib_1.__metadata("design:type", ClrIfDragged)
    ], ClrDraggable.prototype, "customGhost", void 0);
    tslib_1.__decorate([
        Input('clrDraggable'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrDraggable.prototype, "dataTransfer", null);
    tslib_1.__decorate([
        Input('clrGroup'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrDraggable.prototype, "group", null);
    tslib_1.__decorate([
        Output('clrDragStart'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrDraggable.prototype, "dragStartEmitter", void 0);
    tslib_1.__decorate([
        Output('clrDragMove'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrDraggable.prototype, "dragMoveEmitter", void 0);
    tslib_1.__decorate([
        Output('clrDragEnd'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrDraggable.prototype, "dragEndEmitter", void 0);
    ClrDraggable = tslib_1.__decorate([
        Directive({
            selector: '[clrDraggable]',
            providers: [
                DragEventListenerService,
                DragHandleRegistrarService,
                DraggableSnapshotService,
                GlobalDragModeService,
                DomAdapter,
            ],
            host: { '[class.draggable]': 'true', '[class.being-dragged]': 'dragOn' },
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            DragEventListenerService,
            DragHandleRegistrarService,
            ViewContainerRef,
            ComponentFactoryResolver,
            Injector,
            DraggableSnapshotService,
            GlobalDragModeService])
    ], ClrDraggable);
    return ClrDraggable;
}());
export { ClrDraggable };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZHJhZy1hbmQtZHJvcC9kcmFnZ2FibGUvZHJhZ2dhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUdMLHdCQUF3QixFQUN4QixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osUUFBUSxFQUVSLE1BQU0sRUFDTixnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd0QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBYTlFO0lBTUUsc0JBQ1UsRUFBYyxFQUNkLGlCQUE4QyxFQUM5QyxtQkFBa0QsRUFDbEQsZ0JBQWtDLEVBQ2xDLEdBQTZCLEVBQzdCLFFBQWtCLEVBQ2xCLGlCQUE4QyxFQUM5QyxjQUFxQztRQVByQyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2Qsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUE2QjtRQUM5Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQStCO1FBQ2xELHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7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O1NBQ3pFLENBQUM7aURBUWMsVUFBVTtZQUNLLHdCQUF3QjtZQUN0QiwwQkFBMEI7WUFDN0IsZ0JBQWdCO1lBQzdCLHdCQUF3QjtZQUNuQixRQUFRO1lBQ0Msd0JBQXdCO1lBQzNCLHFCQUFxQjtPQWRwQyxZQUFZLENBc0Z4QjtJQUFELG1CQUFDO0NBQUEsQUF0RkQsSUFzRkM7U0F0RlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENvbXBvbmVudEZhY3RvcnksXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29udGVudENoaWxkLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0b3IsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRG9tQWRhcHRlciB9IGZyb20gJy4uLy4uL2RvbS1hZGFwdGVyL2RvbS1hZGFwdGVyJztcbmltcG9ydCB7IENsckRyYWdFdmVudCB9IGZyb20gJy4uL2RyYWctZXZlbnQnO1xuaW1wb3J0IHsgQ2xyRHJhZ2dhYmxlR2hvc3QgfSBmcm9tICcuLi9kcmFnZ2FibGUtZ2hvc3QnO1xuaW1wb3J0IHsgQ2xySWZEcmFnZ2VkIH0gZnJvbSAnLi4vaWYtZHJhZ2dlZCc7XG5pbXBvcnQgeyBEcmFnRXZlbnRJbnRlcmZhY2UgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2RyYWctZXZlbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IERyYWdFdmVudExpc3RlbmVyU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9kcmFnLWV2ZW50LWxpc3RlbmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRHJhZ0hhbmRsZVJlZ2lzdHJhclNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvZHJhZy1oYW5kbGUtcmVnaXN0cmFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRHJhZ2dhYmxlU25hcHNob3RTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2RyYWdnYWJsZS1zbmFwc2hvdC5zZXJ2aWNlJztcbmltcG9ydCB7IEdsb2JhbERyYWdNb2RlU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9nbG9iYWwtZHJhZy1tb2RlLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2xyRHJhZ2dhYmxlXScsXG4gIHByb3ZpZGVyczogW1xuICAgIERyYWdFdmVudExpc3RlbmVyU2VydmljZSxcbiAgICBEcmFnSGFuZGxlUmVnaXN0cmFyU2VydmljZSxcbiAgICBEcmFnZ2FibGVTbmFwc2hvdFNlcnZpY2UsXG4gICAgR2xvYmFsRHJhZ01vZGVTZXJ2aWNlLFxuICAgIERvbUFkYXB0ZXIsXG4gIF0sXG4gIGhvc3Q6IHsgJ1tjbGFzcy5kcmFnZ2FibGVdJzogJ3RydWUnLCAnW2NsYXNzLmJlaW5nLWRyYWdnZWRdJzogJ2RyYWdPbicgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRHJhZ2dhYmxlPFQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBkcmFnZ2FibGVFbDogYW55O1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTxDbHJEcmFnZ2FibGVHaG9zdDxUPj47XG4gIHB1YmxpYyBkcmFnT246IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgZHJhZ0V2ZW50TGlzdGVuZXI6IERyYWdFdmVudExpc3RlbmVyU2VydmljZTxUPixcbiAgICBwcml2YXRlIGRyYWdIYW5kbGVSZWdpc3RyYXI6IERyYWdIYW5kbGVSZWdpc3RyYXJTZXJ2aWNlPFQ+LFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgZHJhZ2dhYmxlU25hcHNob3Q6IERyYWdnYWJsZVNuYXBzaG90U2VydmljZTxUPixcbiAgICBwcml2YXRlIGdsb2JhbERyYWdNb2RlOiBHbG9iYWxEcmFnTW9kZVNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5kcmFnZ2FibGVFbCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeTxDbHJEcmFnZ2FibGVHaG9zdDxUPj4oQ2xyRHJhZ2dhYmxlR2hvc3QpO1xuICB9XG5cbiAgQENvbnRlbnRDaGlsZChDbHJJZkRyYWdnZWQsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBjdXN0b21HaG9zdDogQ2xySWZEcmFnZ2VkPFQ+O1xuXG4gIEBJbnB1dCgnY2xyRHJhZ2dhYmxlJylcbiAgc2V0IGRhdGFUcmFuc2Zlcih2YWx1ZTogVCkge1xuICAgIHRoaXMuZHJhZ0V2ZW50TGlzdGVuZXIuZHJhZ0RhdGFUcmFuc2ZlciA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KCdjbHJHcm91cCcpXG4gIHNldCBncm91cCh2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pIHtcbiAgICB0aGlzLmRyYWdFdmVudExpc3RlbmVyLmdyb3VwID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZURlZmF1bHRHaG9zdChldmVudDogRHJhZ0V2ZW50SW50ZXJmYWNlPFQ+KSB7XG4gICAgdGhpcy5kcmFnZ2FibGVTbmFwc2hvdC5jYXB0dXJlKHRoaXMuZHJhZ2dhYmxlRWwsIGV2ZW50KTtcbiAgICAvLyBOT1RFOiBUaGUgZGVmYXVsdCBnaG9zdCBlbGVtZW50IHdpbGwgYXBwZWFyXG4gICAgLy8gbmV4dCB0byB0aGUgY2xyRHJhZ2dhYmxlIGluIHRoZSBET00gYXMgYSBzaWJsaW5nIGVsZW1lbnQuXG4gICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudCh0aGlzLmNvbXBvbmVudEZhY3RvcnksIDAsIHRoaXMuaW5qZWN0b3IsIFtcbiAgICAgIFt0aGlzLmRyYWdnYWJsZUVsLmNsb25lTm9kZSh0cnVlKV0sXG4gICAgXSk7XG4gIH1cblxuICBwcml2YXRlIGRlc3Ryb3lEZWZhdWx0R2hvc3QoKSB7XG4gICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG4gICAgdGhpcy5kcmFnZ2FibGVTbmFwc2hvdC5kaXNjYXJkKCk7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEcmFnU3RhcnQnKSBkcmFnU3RhcnRFbWl0dGVyOiBFdmVudEVtaXR0ZXI8Q2xyRHJhZ0V2ZW50PFQ+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgnY2xyRHJhZ01vdmUnKSBkcmFnTW92ZUVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxDbHJEcmFnRXZlbnQ8VD4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCdjbHJEcmFnRW5kJykgZHJhZ0VuZEVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxDbHJEcmFnRXZlbnQ8VD4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLmRyYWdIYW5kbGVSZWdpc3RyYXIuZGVmYXVsdEhhbmRsZUVsID0gdGhpcy5kcmFnZ2FibGVFbDtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5kcmFnRXZlbnRMaXN0ZW5lci5kcmFnU3RhcnRlZC5zdWJzY3JpYmUoKGV2ZW50OiBEcmFnRXZlbnRJbnRlcmZhY2U8VD4pID0+IHtcbiAgICAgICAgdGhpcy5nbG9iYWxEcmFnTW9kZS5lbnRlcigpO1xuICAgICAgICB0aGlzLmRyYWdPbiA9IHRydWU7XG4gICAgICAgIGlmICghdGhpcy5jdXN0b21HaG9zdCkge1xuICAgICAgICAgIHRoaXMuY3JlYXRlRGVmYXVsdEdob3N0KGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0RW1pdHRlci5lbWl0KG5ldyBDbHJEcmFnRXZlbnQoZXZlbnQpKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuZHJhZ0V2ZW50TGlzdGVuZXIuZHJhZ01vdmVkLnN1YnNjcmliZSgoZXZlbnQ6IERyYWdFdmVudEludGVyZmFjZTxUPikgPT4ge1xuICAgICAgICB0aGlzLmRyYWdNb3ZlRW1pdHRlci5lbWl0KG5ldyBDbHJEcmFnRXZlbnQoZXZlbnQpKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuZHJhZ0V2ZW50TGlzdGVuZXIuZHJhZ0VuZGVkLnN1YnNjcmliZSgoZXZlbnQ6IERyYWdFdmVudEludGVyZmFjZTxUPikgPT4ge1xuICAgICAgICB0aGlzLmdsb2JhbERyYWdNb2RlLmV4aXQoKTtcbiAgICAgICAgdGhpcy5kcmFnT24gPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLmN1c3RvbUdob3N0KSB7XG4gICAgICAgICAgdGhpcy5kZXN0cm95RGVmYXVsdEdob3N0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmFnRW5kRW1pdHRlci5lbWl0KG5ldyBDbHJEcmFnRXZlbnQoZXZlbnQpKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWI6IFN1YnNjcmlwdGlvbikgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICAgIHRoaXMuZHJhZ0V2ZW50TGlzdGVuZXIuZGV0YWNoRHJhZ0xpc3RlbmVycygpO1xuICB9XG59XG4iXX0=