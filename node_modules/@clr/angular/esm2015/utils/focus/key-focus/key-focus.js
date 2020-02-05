/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { EventEmitter, HostListener, Input, Output, Component, ContentChildren, QueryList } from '@angular/core';
import { ClrKeyFocusItem } from './key-focus-item';
import { ClrFocusDirection } from './enums/focus-direction.enum';
import { KeyCodes } from './../key-codes.enum';
import { preventArrowKeyScroll, getKeyCodes } from './util';
let ClrKeyFocus = class ClrKeyFocus {
    constructor() {
        this.direction = ClrFocusDirection.VERTICAL;
        this.focusOnLoad = false;
        this.focusChange = new EventEmitter();
        this._current = 0;
        this.subscriptions = [];
    }
    set focusableItems(elements) {
        // We accept a list of focusable elements (HTMLElements or existing Directives) or auto query for clrKeyFocusItem
        // We accept a list reference in the cases where we cannot use ContentChildren to query
        // ContentChildren can be unavailable if content is projected outside the scope of the component (see tabs).
        if (elements && elements.length) {
            this._focusableItems = elements;
            this.initializeFocus();
        }
    }
    get focusableItems() {
        if (this._focusableItems) {
            return this._focusableItems;
        }
        else {
            return this.clrKeyFocusItems.toArray();
        }
    }
    get current() {
        return this._current;
    }
    ngAfterContentInit() {
        this.subscriptions.push(this.listenForItemUpdates());
        this.initializeFocus();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
    handleKeyboardEvent(event) {
        if (this.prevKeyPressed(event) && this.currentFocusIsNotFirstItem()) {
            this.keyAction(() => this._current--);
        }
        else if (this.nextKeyPressed(event) && this.currentFocusIsNotLastItem()) {
            this.keyAction(() => this._current++);
        }
        else if (event.code === KeyCodes.Home) {
            this.keyAction(() => (this._current = 0));
        }
        else if (event.code === KeyCodes.End) {
            this.keyAction(() => (this._current = this.focusableItems.length - 1));
        }
        preventArrowKeyScroll(event);
    }
    setClickedItemCurrent(event) {
        let position;
        if (this.focusableItems[0].nativeElement) {
            position = this.focusableItems.map(item => item.nativeElement).indexOf(event.target);
        }
        else {
            position = this.focusableItems.indexOf(event.target);
        }
        if (position > -1) {
            this._current = position;
        }
    }
    resetTabFocus() {
        this.currentItem.tabIndex = -1;
        this._current = 0;
        this.currentItem.tabIndex = 0;
    }
    moveTo(position) {
        if (this.positionInRange(position) && position !== this._current) {
            this.keyAction(() => (this._current = position));
        }
    }
    positionInRange(position) {
        return position >= 0 && position < this.focusableItems.length;
    }
    get currentItem() {
        if (this._current >= this.focusableItems.length) {
            return null;
        }
        return this.focusableItems[this._current];
    }
    currentFocusIsNotFirstItem() {
        return this._current - 1 >= 0;
    }
    currentFocusIsNotLastItem() {
        return this._current + 1 < this.focusableItems.length;
    }
    initializeFocus() {
        if (this.focusableItems && this.focusableItems.length) {
            this.focusableItems.forEach(i => (i.tabIndex = -1));
            this.currentItem.tabIndex = 0;
        }
        if (this.focusOnLoad) {
            this.currentItem.focus();
            this.focusChange.next();
        }
    }
    listenForItemUpdates() {
        return this.clrKeyFocusItems.changes.subscribe(() => {
            this.focusableItems.forEach(item => (item.tabIndex = -1));
            this._current = 0;
            this.currentItem.tabIndex = 0;
        });
    }
    keyAction(action) {
        this.currentItem.tabIndex = -1;
        action.call(this);
        this.currentItem.tabIndex = 0;
        this.currentItem.focus();
        this.focusChange.next();
    }
    nextKeyPressed(event) {
        const keyCodes = getKeyCodes(event);
        switch (this.direction) {
            case ClrFocusDirection.VERTICAL:
                return event.key === keyCodes.ArrowDown;
            case ClrFocusDirection.HORIZONTAL:
                return event.key === keyCodes.ArrowRight;
            case ClrFocusDirection.BOTH:
                return event.key === keyCodes.ArrowDown || event.key === keyCodes.ArrowRight;
            default:
                return false;
        }
    }
    prevKeyPressed(event) {
        const keyCodes = getKeyCodes(event);
        switch (this.direction) {
            case ClrFocusDirection.VERTICAL:
                return event.key === keyCodes.ArrowUp;
            case ClrFocusDirection.HORIZONTAL:
                return event.key === keyCodes.ArrowLeft;
            case ClrFocusDirection.BOTH:
                return event.key === keyCodes.ArrowUp || event.key === keyCodes.ArrowLeft;
            default:
                return false;
        }
    }
};
tslib_1.__decorate([
    Input('clrDirection'),
    tslib_1.__metadata("design:type", Object)
], ClrKeyFocus.prototype, "direction", void 0);
tslib_1.__decorate([
    Input('clrFocusOnLoad'),
    tslib_1.__metadata("design:type", Object)
], ClrKeyFocus.prototype, "focusOnLoad", void 0);
tslib_1.__decorate([
    Output('clrFocusChange'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrKeyFocus.prototype, "focusChange", void 0);
tslib_1.__decorate([
    ContentChildren(ClrKeyFocusItem, { descendants: true }),
    tslib_1.__metadata("design:type", QueryList)
], ClrKeyFocus.prototype, "clrKeyFocusItems", void 0);
tslib_1.__decorate([
    Input('clrKeyFocus'),
    tslib_1.__metadata("design:type", Array),
    tslib_1.__metadata("design:paramtypes", [Array])
], ClrKeyFocus.prototype, "focusableItems", null);
tslib_1.__decorate([
    HostListener('keydown', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [KeyboardEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], ClrKeyFocus.prototype, "handleKeyboardEvent", null);
tslib_1.__decorate([
    HostListener('click', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ClrKeyFocus.prototype, "setClickedItemCurrent", null);
ClrKeyFocus = tslib_1.__decorate([
    Component({
        selector: '[clrKeyFocus]',
        template: '<ng-content></ng-content>'
    })
], ClrKeyFocus);
export { ClrKeyFocus };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LWZvY3VzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZm9jdXMva2V5LWZvY3VzL2tleS1mb2N1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHakgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsV0FBVyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBTTVELElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFKeEI7UUFLeUIsY0FBUyxHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQztRQUNyQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNYLGdCQUFXLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUF3QnJGLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFLckIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO0lBa0k3QyxDQUFDO0lBekpDLElBQUksY0FBYyxDQUFDLFFBQThCO1FBQy9DLGlIQUFpSDtRQUNqSCx1RkFBdUY7UUFDdkYsNEdBQTRHO1FBQzVHLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7WUFDaEMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVELElBQUksY0FBYztRQUNoQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsT0FBTyxJQUFJLENB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O1NBbEtZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ2xyS2V5Rm9jdXNJdGVtIH0gZnJvbSAnLi9rZXktZm9jdXMtaXRlbSc7XG5pbXBvcnQgeyBDbHJGb2N1c0RpcmVjdGlvbiB9IGZyb20gJy4vZW51bXMvZm9jdXMtZGlyZWN0aW9uLmVudW0nO1xuaW1wb3J0IHsgS2V5Q29kZXMgfSBmcm9tICcuLy4uL2tleS1jb2Rlcy5lbnVtJztcbmltcG9ydCB7IEZvY3VzYWJsZUl0ZW0gfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgcHJldmVudEFycm93S2V5U2Nyb2xsLCBnZXRLZXlDb2RlcyB9IGZyb20gJy4vdXRpbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tjbHJLZXlGb2N1c10nLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJLZXlGb2N1cyB7XG4gIEBJbnB1dCgnY2xyRGlyZWN0aW9uJykgZGlyZWN0aW9uID0gQ2xyRm9jdXNEaXJlY3Rpb24uVkVSVElDQUw7XG4gIEBJbnB1dCgnY2xyRm9jdXNPbkxvYWQnKSBmb2N1c09uTG9hZCA9IGZhbHNlO1xuICBAT3V0cHV0KCdjbHJGb2N1c0NoYW5nZScpIHByaXZhdGUgZm9jdXNDaGFuZ2U6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQENvbnRlbnRDaGlsZHJlbihDbHJLZXlGb2N1c0l0ZW0sIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgcHJpdmF0ZSBjbHJLZXlGb2N1c0l0ZW1zOiBRdWVyeUxpc3Q8Q2xyS2V5Rm9jdXNJdGVtPjtcblxuICBwcml2YXRlIF9mb2N1c2FibGVJdGVtczogQXJyYXk8Rm9jdXNhYmxlSXRlbT47XG4gIEBJbnB1dCgnY2xyS2V5Rm9jdXMnKVxuICBzZXQgZm9jdXNhYmxlSXRlbXMoZWxlbWVudHM6IEFycmF5PEZvY3VzYWJsZUl0ZW0+KSB7XG4gICAgLy8gV2UgYWNjZXB0IGEgbGlzdCBvZiBmb2N1c2FibGUgZWxlbWVudHMgKEhUTUxFbGVtZW50cyBvciBleGlzdGluZyBEaXJlY3RpdmVzKSBvciBhdXRvIHF1ZXJ5IGZvciBjbHJLZXlGb2N1c0l0ZW1cbiAgICAvLyBXZSBhY2NlcHQgYSBsaXN0IHJlZmVyZW5jZSBpbiB0aGUgY2FzZXMgd2hlcmUgd2UgY2Fubm90IHVzZSBDb250ZW50Q2hpbGRyZW4gdG8gcXVlcnlcbiAgICAvLyBDb250ZW50Q2hpbGRyZW4gY2FuIGJlIHVuYXZhaWxhYmxlIGlmIGNvbnRlbnQgaXMgcHJvamVjdGVkIG91dHNpZGUgdGhlIHNjb3BlIG9mIHRoZSBjb21wb25lbnQgKHNlZSB0YWJzKS5cbiAgICBpZiAoZWxlbWVudHMgJiYgZWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9mb2N1c2FibGVJdGVtcyA9IGVsZW1lbnRzO1xuICAgICAgdGhpcy5pbml0aWFsaXplRm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgZm9jdXNhYmxlSXRlbXMoKSB7XG4gICAgaWYgKHRoaXMuX2ZvY3VzYWJsZUl0ZW1zKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZm9jdXNhYmxlSXRlbXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmNscktleUZvY3VzSXRlbXMudG9BcnJheSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2N1cnJlbnQ6IG51bWJlciA9IDA7XG4gIGdldCBjdXJyZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLmxpc3RlbkZvckl0ZW1VcGRhdGVzKCkpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZUZvY3VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgaGFuZGxlS2V5Ym9hcmRFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0aGlzLnByZXZLZXlQcmVzc2VkKGV2ZW50KSAmJiB0aGlzLmN1cnJlbnRGb2N1c0lzTm90Rmlyc3RJdGVtKCkpIHtcbiAgICAgIHRoaXMua2V5QWN0aW9uKCgpID0+IHRoaXMuX2N1cnJlbnQtLSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm5leHRLZXlQcmVzc2VkKGV2ZW50KSAmJiB0aGlzLmN1cnJlbnRGb2N1c0lzTm90TGFzdEl0ZW0oKSkge1xuICAgICAgdGhpcy5rZXlBY3Rpb24oKCkgPT4gdGhpcy5fY3VycmVudCsrKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmNvZGUgPT09IEtleUNvZGVzLkhvbWUpIHtcbiAgICAgIHRoaXMua2V5QWN0aW9uKCgpID0+ICh0aGlzLl9jdXJyZW50ID0gMCkpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQuY29kZSA9PT0gS2V5Q29kZXMuRW5kKSB7XG4gICAgICB0aGlzLmtleUFjdGlvbigoKSA9PiAodGhpcy5fY3VycmVudCA9IHRoaXMuZm9jdXNhYmxlSXRlbXMubGVuZ3RoIC0gMSkpO1xuICAgIH1cblxuICAgIHByZXZlbnRBcnJvd0tleVNjcm9sbChldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIHNldENsaWNrZWRJdGVtQ3VycmVudChldmVudDogYW55KSB7XG4gICAgbGV0IHBvc2l0aW9uOiBudW1iZXI7XG5cbiAgICBpZiAodGhpcy5mb2N1c2FibGVJdGVtc1swXS5uYXRpdmVFbGVtZW50KSB7XG4gICAgICBwb3NpdGlvbiA9IHRoaXMuZm9jdXNhYmxlSXRlbXMubWFwKGl0ZW0gPT4gaXRlbS5uYXRpdmVFbGVtZW50KS5pbmRleE9mKGV2ZW50LnRhcmdldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvc2l0aW9uID0gdGhpcy5mb2N1c2FibGVJdGVtcy5pbmRleE9mKGV2ZW50LnRhcmdldCk7XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uID4gLTEpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnQgPSBwb3NpdGlvbjtcbiAgICB9XG4gIH1cblxuICByZXNldFRhYkZvY3VzKCkge1xuICAgIHRoaXMuY3VycmVudEl0ZW0udGFiSW5kZXggPSAtMTtcbiAgICB0aGlzLl9jdXJyZW50ID0gMDtcbiAgICB0aGlzLmN1cnJlbnRJdGVtLnRhYkluZGV4ID0gMDtcbiAgfVxuXG4gIG1vdmVUbyhwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMucG9zaXRpb25JblJhbmdlKHBvc2l0aW9uKSAmJiBwb3NpdGlvbiAhPT0gdGhpcy5fY3VycmVudCkge1xuICAgICAgdGhpcy5rZXlBY3Rpb24oKCkgPT4gKHRoaXMuX2N1cnJlbnQgPSBwb3NpdGlvbikpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcG9zaXRpb25JblJhbmdlKHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICByZXR1cm4gcG9zaXRpb24gPj0gMCAmJiBwb3NpdGlvbiA8IHRoaXMuZm9jdXNhYmxlSXRlbXMubGVuZ3RoO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgY3VycmVudEl0ZW0oKSB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnQgPj0gdGhpcy5mb2N1c2FibGVJdGVtcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmZvY3VzYWJsZUl0ZW1zW3RoaXMuX2N1cnJlbnRdO1xuICB9XG5cbiAgcHJpdmF0ZSBjdXJyZW50Rm9jdXNJc05vdEZpcnN0SXRlbSgpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudCAtIDEgPj0gMDtcbiAgfVxuXG4gIHByaXZhdGUgY3VycmVudEZvY3VzSXNOb3RMYXN0SXRlbSgpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudCArIDEgPCB0aGlzLmZvY3VzYWJsZUl0ZW1zLmxlbmd0aDtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUZvY3VzKCkge1xuICAgIGlmICh0aGlzLmZvY3VzYWJsZUl0ZW1zICYmIHRoaXMuZm9jdXNhYmxlSXRlbXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmZvY3VzYWJsZUl0ZW1zLmZvckVhY2goaSA9PiAoaS50YWJJbmRleCA9IC0xKSk7XG4gICAgICB0aGlzLmN1cnJlbnRJdGVtLnRhYkluZGV4ID0gMDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mb2N1c09uTG9hZCkge1xuICAgICAgdGhpcy5jdXJyZW50SXRlbS5mb2N1cygpO1xuICAgICAgdGhpcy5mb2N1c0NoYW5nZS5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JJdGVtVXBkYXRlcygpIHtcbiAgICByZXR1cm4gdGhpcy5jbHJLZXlGb2N1c0l0ZW1zLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuZm9jdXNhYmxlSXRlbXMuZm9yRWFjaChpdGVtID0+IChpdGVtLnRhYkluZGV4ID0gLTEpKTtcbiAgICAgIHRoaXMuX2N1cnJlbnQgPSAwO1xuICAgICAgdGhpcy5jdXJyZW50SXRlbS50YWJJbmRleCA9IDA7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGtleUFjdGlvbihhY3Rpb246IEZ1bmN0aW9uKSB7XG4gICAgdGhpcy5jdXJyZW50SXRlbS50YWJJbmRleCA9IC0xO1xuICAgIGFjdGlvbi5jYWxsKHRoaXMpO1xuICAgIHRoaXMuY3VycmVudEl0ZW0udGFiSW5kZXggPSAwO1xuICAgIHRoaXMuY3VycmVudEl0ZW0uZm9jdXMoKTtcbiAgICB0aGlzLmZvY3VzQ2hhbmdlLm5leHQoKTtcbiAgfVxuXG4gIHByaXZhdGUgbmV4dEtleVByZXNzZWQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBrZXlDb2RlcyA9IGdldEtleUNvZGVzKGV2ZW50KTtcblxuICAgIHN3aXRjaCAodGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgQ2xyRm9jdXNEaXJlY3Rpb24uVkVSVElDQUw6XG4gICAgICAgIHJldHVybiBldmVudC5rZXkgPT09IGtleUNvZGVzLkFycm93RG93bjtcbiAgICAgIGNhc2UgQ2xyRm9jdXNEaXJlY3Rpb24uSE9SSVpPTlRBTDpcbiAgICAgICAgcmV0dXJuIGV2ZW50LmtleSA9PT0ga2V5Q29kZXMuQXJyb3dSaWdodDtcbiAgICAgIGNhc2UgQ2xyRm9jdXNEaXJlY3Rpb24uQk9USDpcbiAgICAgICAgcmV0dXJuIGV2ZW50LmtleSA9PT0ga2V5Q29kZXMuQXJyb3dEb3duIHx8IGV2ZW50LmtleSA9PT0ga2V5Q29kZXMuQXJyb3dSaWdodDtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHByZXZLZXlQcmVzc2VkKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc3Qga2V5Q29kZXMgPSBnZXRLZXlDb2RlcyhldmVudCk7XG5cbiAgICBzd2l0Y2ggKHRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICBjYXNlIENsckZvY3VzRGlyZWN0aW9uLlZFUlRJQ0FMOlxuICAgICAgICByZXR1cm4gZXZlbnQua2V5ID09PSBrZXlDb2Rlcy5BcnJvd1VwO1xuICAgICAgY2FzZSBDbHJGb2N1c0RpcmVjdGlvbi5IT1JJWk9OVEFMOlxuICAgICAgICByZXR1cm4gZXZlbnQua2V5ID09PSBrZXlDb2Rlcy5BcnJvd0xlZnQ7XG4gICAgICBjYXNlIENsckZvY3VzRGlyZWN0aW9uLkJPVEg6XG4gICAgICAgIHJldHVybiBldmVudC5rZXkgPT09IGtleUNvZGVzLkFycm93VXAgfHwgZXZlbnQua2V5ID09PSBrZXlDb2Rlcy5BcnJvd0xlZnQ7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iXX0=