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
let ClrDraggable = class ClrDraggable {
    constructor(el, dragEventListener, dragHandleRegistrar, viewContainerRef, cfr, injector, draggableSnapshot, globalDragMode) {
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
    set dataTransfer(value) {
        this.dragEventListener.dragDataTransfer = value;
    }
    set group(value) {
        this.dragEventListener.group = value;
    }
    createDefaultGhost(event) {
        this.draggableSnapshot.capture(this.draggableEl, event);
        // NOTE: The default ghost element will appear
        // next to the clrDraggable in the DOM as a sibling element.
        this.viewContainerRef.createComponent(this.componentFactory, 0, this.injector, [
            [this.draggableEl.cloneNode(true)],
        ]);
    }
    destroyDefaultGhost() {
        this.viewContainerRef.clear();
        this.draggableSnapshot.discard();
    }
    ngAfterContentInit() {
        this.dragHandleRegistrar.defaultHandleEl = this.draggableEl;
        this.subscriptions.push(this.dragEventListener.dragStarted.subscribe((event) => {
            this.globalDragMode.enter();
            this.dragOn = true;
            if (!this.customGhost) {
                this.createDefaultGhost(event);
            }
            this.dragStartEmitter.emit(new ClrDragEvent(event));
        }));
        this.subscriptions.push(this.dragEventListener.dragMoved.subscribe((event) => {
            this.dragMoveEmitter.emit(new ClrDragEvent(event));
        }));
        this.subscriptions.push(this.dragEventListener.dragEnded.subscribe((event) => {
            this.globalDragMode.exit();
            this.dragOn = false;
            if (!this.customGhost) {
                this.destroyDefaultGhost();
            }
            this.dragEndEmitter.emit(new ClrDragEvent(event));
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
        this.dragEventListener.detachDragListeners();
    }
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
export { ClrDraggable };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZHJhZy1hbmQtZHJvcC9kcmFnZ2FibGUvZHJhZ2dhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUdMLHdCQUF3QixFQUN4QixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osUUFBUSxFQUVSLE1BQU0sRUFDTixnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd0QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBYTlFLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFNdkIsWUFDVSxFQUFjLEVBQ2QsaUJBQThDLEVBQzlDLG1CQUFrRCxFQUNsRCxnQkFBa0MsRUFDbEMsR0FBNkIsRUFDN0IsUUFBa0IsRUFDbEIsaUJBQThDLEVBQzlDLGNBQXFDO1FBUHJDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTZCO1FBQzlDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBK0I7UUFDbEQs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NkNBUWMsVUFBVTtRQUNLLHdCQUF3QjtRQUN0QiwwQkFBMEI7UUFDN0IsZ0JBQWdCO1FBQzdCLHdCQUF3QjtRQUNuQixRQUFRO1FBQ0Msd0JBQXdCO1FBQzNCLHFCQUFxQjtHQWRwQyxZQUFZLENBc0Z4QjtTQXRGWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29tcG9uZW50RmFjdG9yeSxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb250ZW50Q2hpbGQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3RvcixcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEb21BZGFwdGVyIH0gZnJvbSAnLi4vLi4vZG9tLWFkYXB0ZXIvZG9tLWFkYXB0ZXInO1xuaW1wb3J0IHsgQ2xyRHJhZ0V2ZW50IH0gZnJvbSAnLi4vZHJhZy1ldmVudCc7XG5pbXBvcnQgeyBDbHJEcmFnZ2FibGVHaG9zdCB9IGZyb20gJy4uL2RyYWdnYWJsZS1naG9zdCc7XG5pbXBvcnQgeyBDbHJJZkRyYWdnZWQgfSBmcm9tICcuLi9pZi1kcmFnZ2VkJztcbmltcG9ydCB7IERyYWdFdmVudEludGVyZmFjZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvZHJhZy1ldmVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRHJhZ0V2ZW50TGlzdGVuZXJTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2RyYWctZXZlbnQtbGlzdGVuZXIuc2VydmljZSc7XG5pbXBvcnQgeyBEcmFnSGFuZGxlUmVnaXN0cmFyU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9kcmFnLWhhbmRsZS1yZWdpc3RyYXIuc2VydmljZSc7XG5pbXBvcnQgeyBEcmFnZ2FibGVTbmFwc2hvdFNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvZHJhZ2dhYmxlLXNuYXBzaG90LnNlcnZpY2UnO1xuaW1wb3J0IHsgR2xvYmFsRHJhZ01vZGVTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2dsb2JhbC1kcmFnLW1vZGUuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJEcmFnZ2FibGVdJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRHJhZ0V2ZW50TGlzdGVuZXJTZXJ2aWNlLFxuICAgIERyYWdIYW5kbGVSZWdpc3RyYXJTZXJ2aWNlLFxuICAgIERyYWdnYWJsZVNuYXBzaG90U2VydmljZSxcbiAgICBHbG9iYWxEcmFnTW9kZVNlcnZpY2UsXG4gICAgRG9tQWRhcHRlcixcbiAgXSxcbiAgaG9zdDogeyAnW2NsYXNzLmRyYWdnYWJsZV0nOiAndHJ1ZScsICdbY2xhc3MuYmVpbmctZHJhZ2dlZF0nOiAnZHJhZ09uJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEcmFnZ2FibGU8VD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGRyYWdnYWJsZUVsOiBhbnk7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PENsckRyYWdnYWJsZUdob3N0PFQ+PjtcbiAgcHVibGljIGRyYWdPbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBkcmFnRXZlbnRMaXN0ZW5lcjogRHJhZ0V2ZW50TGlzdGVuZXJTZXJ2aWNlPFQ+LFxuICAgIHByaXZhdGUgZHJhZ0hhbmRsZVJlZ2lzdHJhcjogRHJhZ0hhbmRsZVJlZ2lzdHJhclNlcnZpY2U8VD4sXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBkcmFnZ2FibGVTbmFwc2hvdDogRHJhZ2dhYmxlU25hcHNob3RTZXJ2aWNlPFQ+LFxuICAgIHByaXZhdGUgZ2xvYmFsRHJhZ01vZGU6IEdsb2JhbERyYWdNb2RlU2VydmljZVxuICApIHtcbiAgICB0aGlzLmRyYWdnYWJsZUVsID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY2ZyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5PENsckRyYWdnYWJsZUdob3N0PFQ+PihDbHJEcmFnZ2FibGVHaG9zdCk7XG4gIH1cblxuICBAQ29udGVudENoaWxkKENscklmRHJhZ2dlZCwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIGN1c3RvbUdob3N0OiBDbHJJZkRyYWdnZWQ8VD47XG5cbiAgQElucHV0KCdjbHJEcmFnZ2FibGUnKVxuICBzZXQgZGF0YVRyYW5zZmVyKHZhbHVlOiBUKSB7XG4gICAgdGhpcy5kcmFnRXZlbnRMaXN0ZW5lci5kcmFnRGF0YVRyYW5zZmVyID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoJ2Nsckdyb3VwJylcbiAgc2V0IGdyb3VwKHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xuICAgIHRoaXMuZHJhZ0V2ZW50TGlzdGVuZXIuZ3JvdXAgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRGVmYXVsdEdob3N0KGV2ZW50OiBEcmFnRXZlbnRJbnRlcmZhY2U8VD4pIHtcbiAgICB0aGlzLmRyYWdnYWJsZVNuYXBzaG90LmNhcHR1cmUodGhpcy5kcmFnZ2FibGVFbCwgZXZlbnQpO1xuICAgIC8vIE5PVEU6IFRoZSBkZWZhdWx0IGdob3N0IGVsZW1lbnQgd2lsbCBhcHBlYXJcbiAgICAvLyBuZXh0IHRvIHRoZSBjbHJEcmFnZ2FibGUgaW4gdGhlIERPTSBhcyBhIHNpYmxpbmcgZWxlbWVudC5cbiAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KHRoaXMuY29tcG9uZW50RmFjdG9yeSwgMCwgdGhpcy5pbmplY3RvciwgW1xuICAgICAgW3RoaXMuZHJhZ2dhYmxlRWwuY2xvbmVOb2RlKHRydWUpXSxcbiAgICBdKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVzdHJveURlZmF1bHRHaG9zdCgpIHtcbiAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICB0aGlzLmRyYWdnYWJsZVNuYXBzaG90LmRpc2NhcmQoKTtcbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckRyYWdTdGFydCcpIGRyYWdTdGFydEVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxDbHJEcmFnRXZlbnQ8VD4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCdjbHJEcmFnTW92ZScpIGRyYWdNb3ZlRW1pdHRlcjogRXZlbnRFbWl0dGVyPENsckRyYWdFdmVudDxUPj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoJ2NsckRyYWdFbmQnKSBkcmFnRW5kRW1pdHRlcjogRXZlbnRFbWl0dGVyPENsckRyYWdFdmVudDxUPj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuZHJhZ0hhbmRsZVJlZ2lzdHJhci5kZWZhdWx0SGFuZGxlRWwgPSB0aGlzLmRyYWdnYWJsZUVsO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmRyYWdFdmVudExpc3RlbmVyLmRyYWdTdGFydGVkLnN1YnNjcmliZSgoZXZlbnQ6IERyYWdFdmVudEludGVyZmFjZTxUPikgPT4ge1xuICAgICAgICB0aGlzLmdsb2JhbERyYWdNb2RlLmVudGVyKCk7XG4gICAgICAgIHRoaXMuZHJhZ09uID0gdHJ1ZTtcbiAgICAgICAgaWYgKCF0aGlzLmN1c3RvbUdob3N0KSB7XG4gICAgICAgICAgdGhpcy5jcmVhdGVEZWZhdWx0R2hvc3QoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmFnU3RhcnRFbWl0dGVyLmVtaXQobmV3IENsckRyYWdFdmVudChldmVudCkpO1xuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5kcmFnRXZlbnRMaXN0ZW5lci5kcmFnTW92ZWQuc3Vic2NyaWJlKChldmVudDogRHJhZ0V2ZW50SW50ZXJmYWNlPFQ+KSA9PiB7XG4gICAgICAgIHRoaXMuZHJhZ01vdmVFbWl0dGVyLmVtaXQobmV3IENsckRyYWdFdmVudChldmVudCkpO1xuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5kcmFnRXZlbnRMaXN0ZW5lci5kcmFnRW5kZWQuc3Vic2NyaWJlKChldmVudDogRHJhZ0V2ZW50SW50ZXJmYWNlPFQ+KSA9PiB7XG4gICAgICAgIHRoaXMuZ2xvYmFsRHJhZ01vZGUuZXhpdCgpO1xuICAgICAgICB0aGlzLmRyYWdPbiA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMuY3VzdG9tR2hvc3QpIHtcbiAgICAgICAgICB0aGlzLmRlc3Ryb3lEZWZhdWx0R2hvc3QoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYWdFbmRFbWl0dGVyLmVtaXQobmV3IENsckRyYWdFdmVudChldmVudCkpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gICAgdGhpcy5kcmFnRXZlbnRMaXN0ZW5lci5kZXRhY2hEcmFnTGlzdGVuZXJzKCk7XG4gIH1cbn1cbiJdfQ==