import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { DomAdapter } from '../../dom-adapter/dom-adapter';
import { ClrDragEvent } from '../drag-event';
import { DragEventType } from '../interfaces/drag-event.interface';
import { DragAndDropEventBusService } from '../providers/drag-and-drop-event-bus.service';
let ClrDroppable = class ClrDroppable {
    constructor(el, eventBus, domAdapter, renderer) {
        this.el = el;
        this.eventBus = eventBus;
        this.domAdapter = domAdapter;
        this.renderer = renderer;
        this.isDraggableMatch = false;
        this._isDraggableOver = false;
        this._dropTolerance = { top: 0, right: 0, bottom: 0, left: 0 };
        this.dragStartEmitter = new EventEmitter();
        this.dragMoveEmitter = new EventEmitter();
        this.dragEndEmitter = new EventEmitter();
        this.dragLeaveEmitter = new EventEmitter();
        this.dragEnterEmitter = new EventEmitter();
        this.dropEmitter = new EventEmitter();
        this.droppableEl = this.el.nativeElement;
    }
    set isDraggableOver(value) {
        // We need to add/remove this draggable-over class via Renderer2
        // because isDraggableOver is set outside of NgZone.
        if (value) {
            this.renderer.addClass(this.droppableEl, 'draggable-over');
        }
        else {
            this.renderer.removeClass(this.droppableEl, 'draggable-over');
        }
        this._isDraggableOver = value;
    }
    set group(value) {
        this._group = value;
    }
    dropToleranceGenerator(top = 0, right = top, bottom = top, left = right) {
        return { top, right, bottom, left };
    }
    set dropTolerance(value) {
        // If user provides an object here and wants to manipulate/update properties individually,
        // the object must be immutable as we generate new object based user's given object.
        if (typeof value === 'number') {
            this._dropTolerance = this.dropToleranceGenerator(value);
        }
        else if (typeof value === 'string') {
            const toleranceValues = value
                .trim()
                .split(/\s+/)
                .map(tolerance => parseInt(tolerance, 10));
            this._dropTolerance = this.dropToleranceGenerator(...toleranceValues);
        }
        else if (value) {
            // The value could be passed in as {left: 20, top: 30 }
            // In this case, the rest of the direction properties should be 0.
            // That's why we initialize properties with 0 first, then override with user's given value.
            this._dropTolerance = Object.assign({}, this.dropToleranceGenerator(0), value);
        }
    }
    unsubscribeFrom(subscription) {
        if (subscription) {
            subscription.unsubscribe();
        }
    }
    checkGroupMatch(draggableGroup) {
        // Both Draggable and Droppable have clrGroup input.
        // The clrGroup input can be both a string key or array of string keys in Draggable and Droppable.
        // It's not match if Draggable has no defined value assigned to clrGroup, but Droppable has a defined clrGroup.
        if (!draggableGroup && this._group) {
            return false;
        }
        // The same is true the other way round.
        if (!this._group && draggableGroup) {
            return false;
        }
        // It's match if both Draggable and Droppable have no assigned value for clrGroup.
        if (!this._group && !draggableGroup) {
            return true;
        }
        // It's match if both Draggable and Droppable have simple string keys that are matching.
        // It's match if Draggable's simple clrGroup key is matching with one of the clrGroup keys of Droppable. The
        // same is true the other way round.
        // it's match if one of the clrGroup keys of Droppable is matching with one of the clrGroup keys of Draggable.
        if (typeof draggableGroup === 'string') {
            if (typeof this._group === 'string') {
                return this._group === draggableGroup;
            }
            else {
                return this._group.indexOf(draggableGroup) > -1;
            }
        }
        else {
            if (typeof this._group === 'string') {
                return draggableGroup.indexOf(this._group) > -1;
            }
            else {
                return this._group.some(groupKey => draggableGroup.indexOf(groupKey) > -1);
            }
        }
    }
    isInDropArea(point) {
        if (!point) {
            return false;
        }
        if (!this.clientRect) {
            this.clientRect = this.domAdapter.clientRect(this.droppableEl);
        }
        if (point.pageX >= this.clientRect.left - this._dropTolerance.left &&
            point.pageX <= this.clientRect.right + this._dropTolerance.right &&
            point.pageY >= this.clientRect.top - this._dropTolerance.top &&
            point.pageY <= this.clientRect.bottom + this._dropTolerance.bottom) {
            return true;
        }
        else {
            return false;
        }
    }
    onDragStart(dragStartEvent) {
        // Check draggable and droppable have a matching group key.
        this.isDraggableMatch = this.checkGroupMatch(dragStartEvent.group);
        // Subscribe to dragMoved and dragEnded only if draggable and droppable have a matching group key.
        if (this.isDraggableMatch) {
            this.dragStartEmitter.emit(new ClrDragEvent(dragStartEvent));
            this.dragMoveSubscription = this.eventBus.dragMoved.subscribe((dragMoveEvent) => {
                this.onDragMove(dragMoveEvent);
            });
            this.dragEndSubscription = this.eventBus.dragEnded.subscribe((dragEndEvent) => {
                this.onDragEnd(dragEndEvent);
            });
        }
    }
    onDragMove(dragMoveEvent) {
        const isInDropArea = this.isInDropArea(dragMoveEvent.dropPointPosition);
        if (!this._isDraggableOver && isInDropArea) {
            this.isDraggableOver = true;
            const dragEnterEvent = Object.assign({}, dragMoveEvent, { type: DragEventType.DRAG_ENTER });
            this.eventBus.broadcast(dragEnterEvent);
            this.dragEnterEmitter.emit(new ClrDragEvent(dragEnterEvent));
        }
        else if (this._isDraggableOver && !isInDropArea) {
            this.isDraggableOver = false;
            const dragLeaveEvent = Object.assign({}, dragMoveEvent, { type: DragEventType.DRAG_LEAVE });
            this.eventBus.broadcast(dragLeaveEvent);
            this.dragLeaveEmitter.emit(new ClrDragEvent(dragLeaveEvent));
        }
        this.dragMoveEmitter.emit(new ClrDragEvent(dragMoveEvent));
    }
    onDragEnd(dragEndEvent) {
        if (this._isDraggableOver) {
            if (dragEndEvent.ghostElement) {
                // By this point, the draggable ghost component is destroyed,
                // but the element would be active until its animation completes.
                // As such, once the ghost is dropped over, we will give it "dropped" class.
                // This process cannot be done in the ghost component
                // because any subscription to the drop event is ineffective or invalid
                // as the component had been already destroyed.
                this.renderer.addClass(dragEndEvent.ghostElement, 'dropped');
            }
            const dropEvent = Object.assign({}, dragEndEvent, { type: DragEventType.DROP });
            this.eventBus.broadcast(dropEvent);
            this.dropEmitter.emit(new ClrDragEvent(dropEvent));
            this.isDraggableOver = false;
        }
        this.dragEndEmitter.emit(new ClrDragEvent(dragEndEvent));
        this.unsubscribeFrom(this.dragMoveSubscription);
        this.unsubscribeFrom(this.dragEndSubscription);
        this.isDraggableMatch = false;
        delete this.clientRect;
    }
    ngOnInit() {
        this.dragStartSubscription = this.eventBus.dragStarted.subscribe((dragStartEvent) => {
            this.onDragStart(dragStartEvent);
        });
    }
    ngOnDestroy() {
        this.unsubscribeFrom(this.dragStartSubscription);
        this.unsubscribeFrom(this.dragMoveSubscription);
        this.unsubscribeFrom(this.dragEndSubscription);
    }
};
tslib_1.__decorate([
    Input('clrGroup'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], ClrDroppable.prototype, "group", null);
tslib_1.__decorate([
    Input('clrDropTolerance'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], ClrDroppable.prototype, "dropTolerance", null);
tslib_1.__decorate([
    Output('clrDragStart'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrDroppable.prototype, "dragStartEmitter", void 0);
tslib_1.__decorate([
    Output('clrDragMove'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrDroppable.prototype, "dragMoveEmitter", void 0);
tslib_1.__decorate([
    Output('clrDragEnd'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrDroppable.prototype, "dragEndEmitter", void 0);
tslib_1.__decorate([
    Output('clrDragLeave'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrDroppable.prototype, "dragLeaveEmitter", void 0);
tslib_1.__decorate([
    Output('clrDragEnter'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrDroppable.prototype, "dragEnterEmitter", void 0);
tslib_1.__decorate([
    Output('clrDrop'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrDroppable.prototype, "dropEmitter", void 0);
ClrDroppable = tslib_1.__decorate([
    Directive({
        selector: '[clrDroppable]',
        providers: [DomAdapter],
        host: { '[class.droppable]': 'true', '[class.draggable-match]': 'isDraggableMatch' },
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef,
        DragAndDropEventBusService,
        DomAdapter,
        Renderer2])
], ClrDroppable);
export { ClrDroppable };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcHBhYmxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZHJhZy1hbmQtZHJvcC9kcm9wcGFibGUvZHJvcHBhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdqSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQXNCLGFBQWEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRXZGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBTzFGLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFRdkIsWUFDVSxFQUFjLEVBQ2QsUUFBdUMsRUFDdkMsVUFBc0IsRUFDdEIsUUFBbUI7UUFIbkIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLGFBQVEsR0FBUixRQUFRLENBQStCO1FBQ3ZDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUtyQixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBb0JsQyxtQkFBYyxHQUE4QixFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztRQTBCckUscUJBQWdCLEdBQWtDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdEUsb0JBQWUsR0FBa0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyRSxtQkFBYyxHQUFrQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pF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QXZCLE1BQU0sQ0FBQyxjQUFjLENBQUM7c0NBQW1CLFlBQVk7c0RBQXVDO0FBQ3JFO0lBQXZCLE1BQU0sQ0FBQyxjQUFjLENBQUM7c0NBQW1CLFlBQVk7c0RBQXVDO0FBQzFFO0lBQWxCLE1BQU0sQ0FBQyxTQUFTLENBQUM7c0NBQWMsWUFBWTtpREFBdUM7QUFyRXhFLFlBQVk7SUFMeEIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDdkIsSUFBSSxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxFQUFFLHlCQUF5QixFQUFFLGtCQUFrQixFQUFFO0tBQ3JGLENBQUM7NkNBVWMsVUFBVTtRQUNKLDBCQUEwQjtRQUN4QixVQUFVO1FBQ1osU0FBUztHQVpsQixZQUFZLENBNE14QjtTQTVNWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEb21BZGFwdGVyIH0gZnJvbSAnLi4vLi4vZG9tLWFkYXB0ZXIvZG9tLWFkYXB0ZXInO1xuaW1wb3J0IHsgQ2xyRHJhZ0V2ZW50IH0gZnJvbSAnLi4vZHJhZy1ldmVudCc7XG5pbXBvcnQgeyBEcmFnRXZlbnRJbnRlcmZhY2UsIERyYWdFdmVudFR5cGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2RyYWctZXZlbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IENsckRyb3BUb2xlcmFuY2VJbnRlcmZhY2UgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2Ryb3AtdG9sZXJhbmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBEcmFnQW5kRHJvcEV2ZW50QnVzU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9kcmFnLWFuZC1kcm9wLWV2ZW50LWJ1cy5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NsckRyb3BwYWJsZV0nLFxuICBwcm92aWRlcnM6IFtEb21BZGFwdGVyXSxcbiAgaG9zdDogeyAnW2NsYXNzLmRyb3BwYWJsZV0nOiAndHJ1ZScsICdbY2xhc3MuZHJhZ2dhYmxlLW1hdGNoXSc6ICdpc0RyYWdnYWJsZU1hdGNoJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEcm9wcGFibGU8VD4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgZHJhZ1N0YXJ0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgZHJhZ01vdmVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBkcmFnRW5kU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBkcm9wcGFibGVFbDogYW55O1xuICBwcml2YXRlIGNsaWVudFJlY3Q6IENsaWVudFJlY3Q7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGV2ZW50QnVzOiBEcmFnQW5kRHJvcEV2ZW50QnVzU2VydmljZTxUPixcbiAgICBwcml2YXRlIGRvbUFkYXB0ZXI6IERvbUFkYXB0ZXIsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge1xuICAgIHRoaXMuZHJvcHBhYmxlRWwgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBwcml2YXRlIGlzRHJhZ2dhYmxlTWF0Y2g6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaXNEcmFnZ2FibGVPdmVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgc2V0IGlzRHJhZ2dhYmxlT3Zlcih2YWx1ZTogYm9vbGVhbikge1xuICAgIC8vIFdlIG5lZWQgdG8gYWRkL3JlbW92ZSB0aGlzIGRyYWdnYWJsZS1vdmVyIGNsYXNzIHZpYSBSZW5kZXJlcjJcbiAgICAvLyBiZWNhdXNlIGlzRHJhZ2dhYmxlT3ZlciBpcyBzZXQgb3V0c2lkZSBvZiBOZ1pvbmUuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZHJvcHBhYmxlRWwsICdkcmFnZ2FibGUtb3ZlcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZHJvcHBhYmxlRWwsICdkcmFnZ2FibGUtb3ZlcicpO1xuICAgIH1cbiAgICB0aGlzLl9pc0RyYWdnYWJsZU92ZXIgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2dyb3VwOiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICBASW5wdXQoJ2Nsckdyb3VwJylcbiAgc2V0IGdyb3VwKHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xuICAgIHRoaXMuX2dyb3VwID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9kcm9wVG9sZXJhbmNlOiBDbHJEcm9wVG9sZXJhbmNlSW50ZXJmYWNlID0geyB0b3A6IDAsIHJpZ2h0OiAwLCBib3R0b206IDAsIGxlZnQ6IDAgfTtcblxuICBwcml2YXRlIGRyb3BUb2xlcmFuY2VHZW5lcmF0b3IodG9wID0gMCwgcmlnaHQgPSB0b3AsIGJvdHRvbSA9IHRvcCwgbGVmdCA9IHJpZ2h0KTogQ2xyRHJvcFRvbGVyYW5jZUludGVyZmFjZSB7XG4gICAgcmV0dXJuIHsgdG9wLCByaWdodCwgYm90dG9tLCBsZWZ0IH07XG4gIH1cblxuICBASW5wdXQoJ2NsckRyb3BUb2xlcmFuY2UnKVxuICBzZXQgZHJvcFRvbGVyYW5jZSh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nIHwgQ2xyRHJvcFRvbGVyYW5jZUludGVyZmFjZSkge1xuICAgIC8vIElmIHVzZXIgcHJvdmlkZXMgYW4gb2JqZWN0IGhlcmUgYW5kIHdhbnRzIHRvIG1hbmlwdWxhdGUvdXBkYXRlIHByb3BlcnRpZXMgaW5kaXZpZHVhbGx5LFxuICAgIC8vIHRoZSBvYmplY3QgbXVzdCBiZSBpbW11dGFibGUgYXMgd2UgZ2VuZXJhdGUgbmV3IG9iamVjdCBiYXNlZCB1c2VyJ3MgZ2l2ZW4gb2JqZWN0LlxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLl9kcm9wVG9sZXJhbmNlID0gdGhpcy5kcm9wVG9sZXJhbmNlR2VuZXJhdG9yKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHRvbGVyYW5jZVZhbHVlcyA9IHZhbHVlXG4gICAgICAgIC50cmltKClcbiAgICAgICAgLnNwbGl0KC9cXHMrLylcbiAgICAgICAgLm1hcCh0b2xlcmFuY2UgPT4gcGFyc2VJbnQodG9sZXJhbmNlLCAxMCkpO1xuICAgICAgdGhpcy5fZHJvcFRvbGVyYW5jZSA9IHRoaXMuZHJvcFRvbGVyYW5jZUdlbmVyYXRvciguLi50b2xlcmFuY2VWYWx1ZXMpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgIC8vIFRoZSB2YWx1ZSBjb3VsZCBiZSBwYXNzZWQgaW4gYXMge2xlZnQ6IDIwLCB0b3A6IDMwIH1cbiAgICAgIC8vIEluIHRoaXMgY2FzZSwgdGhlIHJlc3Qgb2YgdGhlIGRpcmVjdGlvbiBwcm9wZXJ0aWVzIHNob3VsZCBiZSAwLlxuICAgICAgLy8gVGhhdCdzIHdoeSB3ZSBpbml0aWFsaXplIHByb3BlcnRpZXMgd2l0aCAwIGZpcnN0LCB0aGVuIG92ZXJyaWRlIHdpdGggdXNlcidzIGdpdmVuIHZhbHVlLlxuICAgICAgdGhpcy5fZHJvcFRvbGVyYW5jZSA9IHsgLi4udGhpcy5kcm9wVG9sZXJhbmNlR2VuZXJhdG9yKDApLCAuLi52YWx1ZSB9O1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckRyYWdTdGFydCcpIGRyYWdTdGFydEVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxDbHJEcmFnRXZlbnQ8VD4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCdjbHJEcmFnTW92ZScpIGRyYWdNb3ZlRW1pdHRlcjogRXZlbnRFbWl0dGVyPENsckRyYWdFdmVudDxUPj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoJ2NsckRyYWdFbmQnKSBkcmFnRW5kRW1pdHRlcjogRXZlbnRFbWl0dGVyPENsckRyYWdFdmVudDxUPj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoJ2NsckRyYWdMZWF2ZScpIGRyYWdMZWF2ZUVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxDbHJEcmFnRXZlbnQ8VD4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCdjbHJEcmFnRW50ZXInKSBkcmFnRW50ZXJFbWl0dGVyOiBFdmVudEVtaXR0ZXI8Q2xyRHJhZ0V2ZW50PFQ+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgnY2xyRHJvcCcpIGRyb3BFbWl0dGVyOiBFdmVudEVtaXR0ZXI8Q2xyRHJhZ0V2ZW50PFQ+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIHVuc3Vic2NyaWJlRnJvbShzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbik6IHZvaWQge1xuICAgIGlmIChzdWJzY3JpcHRpb24pIHtcbiAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tHcm91cE1hdGNoKGRyYWdnYWJsZUdyb3VwOiBzdHJpbmcgfCBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuICAgIC8vIEJvdGggRHJhZ2dhYmxlIGFuZCBEcm9wcGFibGUgaGF2ZSBjbHJHcm91cCBpbnB1dC5cbiAgICAvLyBUaGUgY2xyR3JvdXAgaW5wdXQgY2FuIGJlIGJvdGggYSBzdHJpbmcga2V5IG9yIGFycmF5IG9mIHN0cmluZyBrZXlzIGluIERyYWdnYWJsZSBhbmQgRHJvcHBhYmxlLlxuXG4gICAgLy8gSXQncyBub3QgbWF0Y2ggaWYgRHJhZ2dhYmxlIGhhcyBubyBkZWZpbmVkIHZhbHVlIGFzc2lnbmVkIHRvIGNsckdyb3VwLCBidXQgRHJvcHBhYmxlIGhhcyBhIGRlZmluZWQgY2xyR3JvdXAuXG4gICAgaWYgKCFkcmFnZ2FibGVHcm91cCAmJiB0aGlzLl9ncm91cCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBUaGUgc2FtZSBpcyB0cnVlIHRoZSBvdGhlciB3YXkgcm91bmQuXG4gICAgaWYgKCF0aGlzLl9ncm91cCAmJiBkcmFnZ2FibGVHcm91cCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEl0J3MgbWF0Y2ggaWYgYm90aCBEcmFnZ2FibGUgYW5kIERyb3BwYWJsZSBoYXZlIG5vIGFzc2lnbmVkIHZhbHVlIGZvciBjbHJHcm91cC5cbiAgICBpZiAoIXRoaXMuX2dyb3VwICYmICFkcmFnZ2FibGVHcm91cCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gSXQncyBtYXRjaCBpZiBib3RoIERyYWdnYWJsZSBhbmQgRHJvcHBhYmxlIGhhdmUgc2ltcGxlIHN0cmluZyBrZXlzIHRoYXQgYXJlIG1hdGNoaW5nLlxuICAgIC8vIEl0J3MgbWF0Y2ggaWYgRHJhZ2dhYmxlJ3Mgc2ltcGxlIGNsckdyb3VwIGtleSBpcyBtYXRjaGluZyB3aXRoIG9uZSBvZiB0aGUgY2xyR3JvdXAga2V5cyBvZiBEcm9wcGFibGUuIFRoZVxuICAgIC8vIHNhbWUgaXMgdHJ1ZSB0aGUgb3RoZXIgd2F5IHJvdW5kLlxuICAgIC8vIGl0J3MgbWF0Y2ggaWYgb25lIG9mIHRoZSBjbHJHcm91cCBrZXlzIG9mIERyb3BwYWJsZSBpcyBtYXRjaGluZyB3aXRoIG9uZSBvZiB0aGUgY2xyR3JvdXAga2V5cyBvZiBEcmFnZ2FibGUuXG4gICAgaWYgKHR5cGVvZiBkcmFnZ2FibGVHcm91cCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fZ3JvdXAgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ncm91cCA9PT0gZHJhZ2dhYmxlR3JvdXA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ3JvdXAuaW5kZXhPZihkcmFnZ2FibGVHcm91cCkgPiAtMTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLl9ncm91cCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZUdyb3VwLmluZGV4T2YodGhpcy5fZ3JvdXApID4gLTE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKHRoaXMuX2dyb3VwIGFzIHN0cmluZ1tdKS5zb21lKGdyb3VwS2V5ID0+IGRyYWdnYWJsZUdyb3VwLmluZGV4T2YoZ3JvdXBLZXkpID4gLTEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNJbkRyb3BBcmVhKHBvaW50OiB7IHBhZ2VYOiBudW1iZXI7IHBhZ2VZOiBudW1iZXIgfSk6IGJvb2xlYW4ge1xuICAgIGlmICghcG9pbnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuY2xpZW50UmVjdCkge1xuICAgICAgdGhpcy5jbGllbnRSZWN0ID0gdGhpcy5kb21BZGFwdGVyLmNsaWVudFJlY3QodGhpcy5kcm9wcGFibGVFbCk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgcG9pbnQucGFnZVggPj0gdGhpcy5jbGllbnRSZWN0LmxlZnQgLSB0aGlzLl9kcm9wVG9sZXJhbmNlLmxlZnQgJiZcbiAgICAgIHBvaW50LnBhZ2VYIDw9IHRoaXMuY2xpZW50UmVjdC5yaWdodCArIHRoaXMuX2Ryb3BUb2xlcmFuY2UucmlnaHQgJiZcbiAgICAgIHBvaW50LnBhZ2VZID49IHRoaXMuY2xpZW50UmVjdC50b3AgLSB0aGlzLl9kcm9wVG9sZXJhbmNlLnRvcCAmJlxuICAgICAgcG9pbnQucGFnZVkgPD0gdGhpcy5jbGllbnRSZWN0LmJvdHRvbSArIHRoaXMuX2Ryb3BUb2xlcmFuY2UuYm90dG9tXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25EcmFnU3RhcnQoZHJhZ1N0YXJ0RXZlbnQ6IERyYWdFdmVudEludGVyZmFjZTxUPik6IHZvaWQge1xuICAgIC8vIENoZWNrIGRyYWdnYWJsZSBhbmQgZHJvcHBhYmxlIGhhdmUgYSBtYXRjaGluZyBncm91cCBrZXkuXG4gICAgdGhpcy5pc0RyYWdnYWJsZU1hdGNoID0gdGhpcy5jaGVja0dyb3VwTWF0Y2goZHJhZ1N0YXJ0RXZlbnQuZ3JvdXApO1xuXG4gICAgLy8gU3Vic2NyaWJlIHRvIGRyYWdNb3ZlZCBhbmQgZHJhZ0VuZGVkIG9ubHkgaWYgZHJhZ2dhYmxlIGFuZCBkcm9wcGFibGUgaGF2ZSBhIG1hdGNoaW5nIGdyb3VwIGtleS5cbiAgICBpZiAodGhpcy5pc0RyYWdnYWJsZU1hdGNoKSB7XG4gICAgICB0aGlzLmRyYWdTdGFydEVtaXR0ZXIuZW1pdChuZXcgQ2xyRHJhZ0V2ZW50KGRyYWdTdGFydEV2ZW50KSk7XG4gICAgICB0aGlzLmRyYWdNb3ZlU3Vic2NyaXB0aW9uID0gdGhpcy5ldmVudEJ1cy5kcmFnTW92ZWQuc3Vic2NyaWJlKChkcmFnTW92ZUV2ZW50OiBEcmFnRXZlbnRJbnRlcmZhY2U8VD4pID0+IHtcbiAgICAgICAgdGhpcy5vbkRyYWdNb3ZlKGRyYWdNb3ZlRXZlbnQpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmRyYWdFbmRTdWJzY3JpcHRpb24gPSB0aGlzLmV2ZW50QnVzLmRyYWdFbmRlZC5zdWJzY3JpYmUoKGRyYWdFbmRFdmVudDogRHJhZ0V2ZW50SW50ZXJmYWNlPFQ+KSA9PiB7XG4gICAgICAgIHRoaXMub25EcmFnRW5kKGRyYWdFbmRFdmVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uRHJhZ01vdmUoZHJhZ01vdmVFdmVudDogRHJhZ0V2ZW50SW50ZXJmYWNlPFQ+KTogdm9pZCB7XG4gICAgY29uc3QgaXNJbkRyb3BBcmVhID0gdGhpcy5pc0luRHJvcEFyZWEoZHJhZ01vdmVFdmVudC5kcm9wUG9pbnRQb3NpdGlvbik7XG4gICAgaWYgKCF0aGlzLl9pc0RyYWdnYWJsZU92ZXIgJiYgaXNJbkRyb3BBcmVhKSB7XG4gICAgICB0aGlzLmlzRHJhZ2dhYmxlT3ZlciA9IHRydWU7XG4gICAgICBjb25zdCBkcmFnRW50ZXJFdmVudCA9IHsgLi4uZHJhZ01vdmVFdmVudCwgdHlwZTogRHJhZ0V2ZW50VHlwZS5EUkFHX0VOVEVSIH07XG4gICAgICB0aGlzLmV2ZW50QnVzLmJyb2FkY2FzdChkcmFnRW50ZXJFdmVudCk7XG4gICAgICB0aGlzLmRyYWdFbnRlckVtaXR0ZXIuZW1pdChuZXcgQ2xyRHJhZ0V2ZW50KGRyYWdFbnRlckV2ZW50KSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9pc0RyYWdnYWJsZU92ZXIgJiYgIWlzSW5Ecm9wQXJlYSkge1xuICAgICAgdGhpcy5pc0RyYWdnYWJsZU92ZXIgPSBmYWxzZTtcbiAgICAgIGNvbnN0IGRyYWdMZWF2ZUV2ZW50ID0geyAuLi5kcmFnTW92ZUV2ZW50LCB0eXBlOiBEcmFnRXZlbnRUeXBlLkRSQUdfTEVBVkUgfTtcbiAgICAgIHRoaXMuZXZlbnRCdXMuYnJvYWRjYXN0KGRyYWdMZWF2ZUV2ZW50KTtcbiAgICAgIHRoaXMuZHJhZ0xlYXZlRW1pdHRlci5lbWl0KG5ldyBDbHJEcmFnRXZlbnQoZHJhZ0xlYXZlRXZlbnQpKTtcbiAgICB9XG5cbiAgICB0aGlzLmRyYWdNb3ZlRW1pdHRlci5lbWl0KG5ldyBDbHJEcmFnRXZlbnQoZHJhZ01vdmVFdmVudCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkRyYWdFbmQoZHJhZ0VuZEV2ZW50OiBEcmFnRXZlbnRJbnRlcmZhY2U8VD4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faXNEcmFnZ2FibGVPdmVyKSB7XG4gICAgICBpZiAoZHJhZ0VuZEV2ZW50Lmdob3N0RWxlbWVudCkge1xuICAgICAgICAvLyBCeSB0aGlzIHBvaW50LCB0aGUgZHJhZ2dhYmxlIGdob3N0IGNvbXBvbmVudCBpcyBkZXN0cm95ZWQsXG4gICAgICAgIC8vIGJ1dCB0aGUgZWxlbWVudCB3b3VsZCBiZSBhY3RpdmUgdW50aWwgaXRzIGFuaW1hdGlvbiBjb21wbGV0ZXMuXG4gICAgICAgIC8vIEFzIHN1Y2gsIG9uY2UgdGhlIGdob3N0IGlzIGRyb3BwZWQgb3Zlciwgd2Ugd2lsbCBnaXZlIGl0IFwiZHJvcHBlZFwiIGNsYXNzLlxuXG4gICAgICAgIC8vIFRoaXMgcHJvY2VzcyBjYW5ub3QgYmUgZG9uZSBpbiB0aGUgZ2hvc3QgY29tcG9uZW50XG4gICAgICAgIC8vIGJlY2F1c2UgYW55IHN1YnNjcmlwdGlvbiB0byB0aGUgZHJvcCBldmVudCBpcyBpbmVmZmVjdGl2ZSBvciBpbnZhbGlkXG4gICAgICAgIC8vIGFzIHRoZSBjb21wb25lbnQgaGFkIGJlZW4gYWxyZWFkeSBkZXN0cm95ZWQuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZHJhZ0VuZEV2ZW50Lmdob3N0RWxlbWVudCwgJ2Ryb3BwZWQnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZHJvcEV2ZW50ID0geyAuLi5kcmFnRW5kRXZlbnQsIHR5cGU6IERyYWdFdmVudFR5cGUuRFJPUCB9O1xuICAgICAgdGhpcy5ldmVudEJ1cy5icm9hZGNhc3QoZHJvcEV2ZW50KTtcbiAgICAgIHRoaXMuZHJvcEVtaXR0ZXIuZW1pdChuZXcgQ2xyRHJhZ0V2ZW50KGRyb3BFdmVudCkpO1xuICAgICAgdGhpcy5pc0RyYWdnYWJsZU92ZXIgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5kcmFnRW5kRW1pdHRlci5lbWl0KG5ldyBDbHJEcmFnRXZlbnQoZHJhZ0VuZEV2ZW50KSk7XG4gICAgdGhpcy51bnN1YnNjcmliZUZyb20odGhpcy5kcmFnTW92ZVN1YnNjcmlwdGlvbik7XG4gICAgdGhpcy51bnN1YnNjcmliZUZyb20odGhpcy5kcmFnRW5kU3Vic2NyaXB0aW9uKTtcbiAgICB0aGlzLmlzRHJhZ2dhYmxlTWF0Y2ggPSBmYWxzZTtcbiAgICBkZWxldGUgdGhpcy5jbGllbnRSZWN0O1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kcmFnU3RhcnRTdWJzY3JpcHRpb24gPSB0aGlzLmV2ZW50QnVzLmRyYWdTdGFydGVkLnN1YnNjcmliZSgoZHJhZ1N0YXJ0RXZlbnQ6IERyYWdFdmVudEludGVyZmFjZTxUPikgPT4ge1xuICAgICAgdGhpcy5vbkRyYWdTdGFydChkcmFnU3RhcnRFdmVudCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlRnJvbSh0aGlzLmRyYWdTdGFydFN1YnNjcmlwdGlvbik7XG4gICAgdGhpcy51bnN1YnNjcmliZUZyb20odGhpcy5kcmFnTW92ZVN1YnNjcmlwdGlvbik7XG4gICAgdGhpcy51bnN1YnNjcmliZUZyb20odGhpcy5kcmFnRW5kU3Vic2NyaXB0aW9uKTtcbiAgfVxufVxuIl19