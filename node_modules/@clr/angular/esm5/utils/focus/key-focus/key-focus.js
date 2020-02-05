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
var ClrKeyFocus = /** @class */ (function () {
    function ClrKeyFocus() {
        this.direction = ClrFocusDirection.VERTICAL;
        this.focusOnLoad = false;
        this.focusChange = new EventEmitter();
        this._current = 0;
        this.subscriptions = [];
    }
    Object.defineProperty(ClrKeyFocus.prototype, "focusableItems", {
        get: function () {
            if (this._focusableItems) {
                return this._focusableItems;
            }
            else {
                return this.clrKeyFocusItems.toArray();
            }
        },
        set: function (elements) {
            // We accept a list of focusable elements (HTMLElements or existing Directives) or auto query for clrKeyFocusItem
            // We accept a list reference in the cases where we cannot use ContentChildren to query
            // ContentChildren can be unavailable if content is projected outside the scope of the component (see tabs).
            if (elements && elements.length) {
                this._focusableItems = elements;
                this.initializeFocus();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrKeyFocus.prototype, "current", {
        get: function () {
            return this._current;
        },
        enumerable: true,
        configurable: true
    });
    ClrKeyFocus.prototype.ngAfterContentInit = function () {
        this.subscriptions.push(this.listenForItemUpdates());
        this.initializeFocus();
    };
    ClrKeyFocus.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    ClrKeyFocus.prototype.handleKeyboardEvent = function (event) {
        var _this = this;
        if (this.prevKeyPressed(event) && this.currentFocusIsNotFirstItem()) {
            this.keyAction(function () { return _this._current--; });
        }
        else if (this.nextKeyPressed(event) && this.currentFocusIsNotLastItem()) {
            this.keyAction(function () { return _this._current++; });
        }
        else if (event.code === KeyCodes.Home) {
            this.keyAction(function () { return (_this._current = 0); });
        }
        else if (event.code === KeyCodes.End) {
            this.keyAction(function () { return (_this._current = _this.focusableItems.length - 1); });
        }
        preventArrowKeyScroll(event);
    };
    ClrKeyFocus.prototype.setClickedItemCurrent = function (event) {
        var position;
        if (this.focusableItems[0].nativeElement) {
            position = this.focusableItems.map(function (item) { return item.nativeElement; }).indexOf(event.target);
        }
        else {
            position = this.focusableItems.indexOf(event.target);
        }
        if (position > -1) {
            this._current = position;
        }
    };
    ClrKeyFocus.prototype.resetTabFocus = function () {
        this.currentItem.tabIndex = -1;
        this._current = 0;
        this.currentItem.tabIndex = 0;
    };
    ClrKeyFocus.prototype.moveTo = function (position) {
        var _this = this;
        if (this.positionInRange(position) && position !== this._current) {
            this.keyAction(function () { return (_this._current = position); });
        }
    };
    ClrKeyFocus.prototype.positionInRange = function (position) {
        return position >= 0 && position < this.focusableItems.length;
    };
    Object.defineProperty(ClrKeyFocus.prototype, "currentItem", {
        get: function () {
            if (this._current >= this.focusableItems.length) {
                return null;
            }
            return this.focusableItems[this._current];
        },
        enumerable: true,
        configurable: true
    });
    ClrKeyFocus.prototype.currentFocusIsNotFirstItem = function () {
        return this._current - 1 >= 0;
    };
    ClrKeyFocus.prototype.currentFocusIsNotLastItem = function () {
        return this._current + 1 < this.focusableItems.length;
    };
    ClrKeyFocus.prototype.initializeFocus = function () {
        if (this.focusableItems && this.focusableItems.length) {
            this.focusableItems.forEach(function (i) { return (i.tabIndex = -1); });
            this.currentItem.tabIndex = 0;
        }
        if (this.focusOnLoad) {
            this.currentItem.focus();
            this.focusChange.next();
        }
    };
    ClrKeyFocus.prototype.listenForItemUpdates = function () {
        var _this = this;
        return this.clrKeyFocusItems.changes.subscribe(function () {
            _this.focusableItems.forEach(function (item) { return (item.tabIndex = -1); });
            _this._current = 0;
            _this.currentItem.tabIndex = 0;
        });
    };
    ClrKeyFocus.prototype.keyAction = function (action) {
        this.currentItem.tabIndex = -1;
        action.call(this);
        this.currentItem.tabIndex = 0;
        this.currentItem.focus();
        this.focusChange.next();
    };
    ClrKeyFocus.prototype.nextKeyPressed = function (event) {
        var keyCodes = getKeyCodes(event);
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
    };
    ClrKeyFocus.prototype.prevKeyPressed = function (event) {
        var keyCodes = getKeyCodes(event);
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
    return ClrKeyFocus;
}());
export { ClrKeyFocus };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LWZvY3VzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZm9jdXMva2V5LWZvY3VzL2tleS1mb2N1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHakgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsV0FBVyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBTTVEO0lBSkE7UUFLeUIsY0FBUyxHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQztRQUNyQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNYLGdCQUFXLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUF3QnJGLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFLckIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO0lBa0k3QyxDQUFDO0lBekpDLHNCQUFJLHVDQUFjO2FBVWxCO1lBQ0UsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN4QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7YUFDN0I7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDeEM7UUFDSCxDQUFDO2FBaEJELFVBQW1CLFFBQThCO1lBQy9DLGlIQUFpSDtZQUNqSCx1RkFBdUY7WUFDdkYsNEdBQTRHO1lBQzVHLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxlQUFl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LFFBQVEsQ0FBQyxDQUFDOztpREFDVCxhQUFhOzswREFZdkM7SUFHRDtRQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs0REFhakM7SUF2RVUsV0FBVztRQUp2QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsMkJBQTJCO1NBQ3RDLENBQUM7T0FDVyxXQUFXLENBa0t2QjtJQUFELGtCQUFDO0NBQUEsQUFsS0QsSUFrS0M7U0FsS1ksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDbHJLZXlGb2N1c0l0ZW0gfSBmcm9tICcuL2tleS1mb2N1cy1pdGVtJztcbmltcG9ydCB7IENsckZvY3VzRGlyZWN0aW9uIH0gZnJvbSAnLi9lbnVtcy9mb2N1cy1kaXJlY3Rpb24uZW51bSc7XG5pbXBvcnQgeyBLZXlDb2RlcyB9IGZyb20gJy4vLi4va2V5LWNvZGVzLmVudW0nO1xuaW1wb3J0IHsgRm9jdXNhYmxlSXRlbSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBwcmV2ZW50QXJyb3dLZXlTY3JvbGwsIGdldEtleUNvZGVzIH0gZnJvbSAnLi91dGlsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW2NscktleUZvY3VzXScsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG59KVxuZXhwb3J0IGNsYXNzIENscktleUZvY3VzIHtcbiAgQElucHV0KCdjbHJEaXJlY3Rpb24nKSBkaXJlY3Rpb24gPSBDbHJGb2N1c0RpcmVjdGlvbi5WRVJUSUNBTDtcbiAgQElucHV0KCdjbHJGb2N1c09uTG9hZCcpIGZvY3VzT25Mb2FkID0gZmFsc2U7XG4gIEBPdXRwdXQoJ2NsckZvY3VzQ2hhbmdlJykgcHJpdmF0ZSBmb2N1c0NoYW5nZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAQ29udGVudENoaWxkcmVuKENscktleUZvY3VzSXRlbSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBwcml2YXRlIGNscktleUZvY3VzSXRlbXM6IFF1ZXJ5TGlzdDxDbHJLZXlGb2N1c0l0ZW0+O1xuXG4gIHByaXZhdGUgX2ZvY3VzYWJsZUl0ZW1zOiBBcnJheTxGb2N1c2FibGVJdGVtPjtcbiAgQElucHV0KCdjbHJLZXlGb2N1cycpXG4gIHNldCBmb2N1c2FibGVJdGVtcyhlbGVtZW50czogQXJyYXk8Rm9jdXNhYmxlSXRlbT4pIHtcbiAgICAvLyBXZSBhY2NlcHQgYSBsaXN0IG9mIGZvY3VzYWJsZSBlbGVtZW50cyAoSFRNTEVsZW1lbnRzIG9yIGV4aXN0aW5nIERpcmVjdGl2ZXMpIG9yIGF1dG8gcXVlcnkgZm9yIGNscktleUZvY3VzSXRlbVxuICAgIC8vIFdlIGFjY2VwdCBhIGxpc3QgcmVmZXJlbmNlIGluIHRoZSBjYXNlcyB3aGVyZSB3ZSBjYW5ub3QgdXNlIENvbnRlbnRDaGlsZHJlbiB0byBxdWVyeVxuICAgIC8vIENvbnRlbnRDaGlsZHJlbiBjYW4gYmUgdW5hdmFpbGFibGUgaWYgY29udGVudCBpcyBwcm9qZWN0ZWQgb3V0c2lkZSB0aGUgc2NvcGUgb2YgdGhlIGNvbXBvbmVudCAoc2VlIHRhYnMpLlxuICAgIGlmIChlbGVtZW50cyAmJiBlbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX2ZvY3VzYWJsZUl0ZW1zID0gZWxlbWVudHM7XG4gICAgICB0aGlzLmluaXRpYWxpemVGb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBmb2N1c2FibGVJdGVtcygpIHtcbiAgICBpZiAodGhpcy5fZm9jdXNhYmxlSXRlbXMpIHtcbiAgICAgIHJldHVybiB0aGlzLl9mb2N1c2FibGVJdGVtcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY2xyS2V5Rm9jdXNJdGVtcy50b0FycmF5KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY3VycmVudDogbnVtYmVyID0gMDtcbiAgZ2V0IGN1cnJlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMubGlzdGVuRm9ySXRlbVVwZGF0ZXMoKSk7XG4gICAgdGhpcy5pbml0aWFsaXplRm9jdXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBoYW5kbGVLZXlib2FyZEV2ZW50KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKHRoaXMucHJldktleVByZXNzZWQoZXZlbnQpICYmIHRoaXMuY3VycmVudEZvY3VzSXNOb3RGaXJzdEl0ZW0oKSkge1xuICAgICAgdGhpcy5rZXlBY3Rpb24oKCkgPT4gdGhpcy5fY3VycmVudC0tKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubmV4dEtleVByZXNzZWQoZXZlbnQpICYmIHRoaXMuY3VycmVudEZvY3VzSXNOb3RMYXN0SXRlbSgpKSB7XG4gICAgICB0aGlzLmtleUFjdGlvbigoKSA9PiB0aGlzLl9jdXJyZW50KyspO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQuY29kZSA9PT0gS2V5Q29kZXMuSG9tZSkge1xuICAgICAgdGhpcy5rZXlBY3Rpb24oKCkgPT4gKHRoaXMuX2N1cnJlbnQgPSAwKSk7XG4gICAgfSBlbHNlIGlmIChldmVudC5jb2RlID09PSBLZXlDb2Rlcy5FbmQpIHtcbiAgICAgIHRoaXMua2V5QWN0aW9uKCgpID0+ICh0aGlzLl9jdXJyZW50ID0gdGhpcy5mb2N1c2FibGVJdGVtcy5sZW5ndGggLSAxKSk7XG4gICAgfVxuXG4gICAgcHJldmVudEFycm93S2V5U2Nyb2xsKGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgc2V0Q2xpY2tlZEl0ZW1DdXJyZW50KGV2ZW50OiBhbnkpIHtcbiAgICBsZXQgcG9zaXRpb246IG51bWJlcjtcblxuICAgIGlmICh0aGlzLmZvY3VzYWJsZUl0ZW1zWzBdLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHBvc2l0aW9uID0gdGhpcy5mb2N1c2FibGVJdGVtcy5tYXAoaXRlbSA9PiBpdGVtLm5hdGl2ZUVsZW1lbnQpLmluZGV4T2YoZXZlbnQudGFyZ2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zaXRpb24gPSB0aGlzLmZvY3VzYWJsZUl0ZW1zLmluZGV4T2YoZXZlbnQudGFyZ2V0KTtcbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPiAtMSkge1xuICAgICAgdGhpcy5fY3VycmVudCA9IHBvc2l0aW9uO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0VGFiRm9jdXMoKSB7XG4gICAgdGhpcy5jdXJyZW50SXRlbS50YWJJbmRleCA9IC0xO1xuICAgIHRoaXMuX2N1cnJlbnQgPSAwO1xuICAgIHRoaXMuY3VycmVudEl0ZW0udGFiSW5kZXggPSAwO1xuICB9XG5cbiAgbW92ZVRvKHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5wb3NpdGlvbkluUmFuZ2UocG9zaXRpb24pICYmIHBvc2l0aW9uICE9PSB0aGlzLl9jdXJyZW50KSB7XG4gICAgICB0aGlzLmtleUFjdGlvbigoKSA9PiAodGhpcy5fY3VycmVudCA9IHBvc2l0aW9uKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwb3NpdGlvbkluUmFuZ2UocG9zaXRpb246IG51bWJlcikge1xuICAgIHJldHVybiBwb3NpdGlvbiA+PSAwICYmIHBvc2l0aW9uIDwgdGhpcy5mb2N1c2FibGVJdGVtcy5sZW5ndGg7XG4gIH1cblxuICBwcml2YXRlIGdldCBjdXJyZW50SXRlbSgpIHtcbiAgICBpZiAodGhpcy5fY3VycmVudCA+PSB0aGlzLmZvY3VzYWJsZUl0ZW1zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZm9jdXNhYmxlSXRlbXNbdGhpcy5fY3VycmVudF07XG4gIH1cblxuICBwcml2YXRlIGN1cnJlbnRGb2N1c0lzTm90Rmlyc3RJdGVtKCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50IC0gMSA+PSAwO1xuICB9XG5cbiAgcHJpdmF0ZSBjdXJyZW50Rm9jdXNJc05vdExhc3RJdGVtKCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50ICsgMSA8IHRoaXMuZm9jdXNhYmxlSXRlbXMubGVuZ3RoO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplRm9jdXMoKSB7XG4gICAgaWYgKHRoaXMuZm9jdXNhYmxlSXRlbXMgJiYgdGhpcy5mb2N1c2FibGVJdGVtcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZm9jdXNhYmxlSXRlbXMuZm9yRWFjaChpID0+IChpLnRhYkluZGV4ID0gLTEpKTtcbiAgICAgIHRoaXMuY3VycmVudEl0ZW0udGFiSW5kZXggPSAwO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZvY3VzT25Mb2FkKSB7XG4gICAgICB0aGlzLmN1cnJlbnRJdGVtLmZvY3VzKCk7XG4gICAgICB0aGlzLmZvY3VzQ2hhbmdlLm5leHQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvckl0ZW1VcGRhdGVzKCkge1xuICAgIHJldHVybiB0aGlzLmNscktleUZvY3VzSXRlbXMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5mb2N1c2FibGVJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gKGl0ZW0udGFiSW5kZXggPSAtMSkpO1xuICAgICAgdGhpcy5fY3VycmVudCA9IDA7XG4gICAgICB0aGlzLmN1cnJlbnRJdGVtLnRhYkluZGV4ID0gMDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUga2V5QWN0aW9uKGFjdGlvbjogRnVuY3Rpb24pIHtcbiAgICB0aGlzLmN1cnJlbnRJdGVtLnRhYkluZGV4ID0gLTE7XG4gICAgYWN0aW9uLmNhbGwodGhpcyk7XG4gICAgdGhpcy5jdXJyZW50SXRlbS50YWJJbmRleCA9IDA7XG4gICAgdGhpcy5jdXJyZW50SXRlbS5mb2N1cygpO1xuICAgIHRoaXMuZm9jdXNDaGFuZ2UubmV4dCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBuZXh0S2V5UHJlc3NlZChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnN0IGtleUNvZGVzID0gZ2V0S2V5Q29kZXMoZXZlbnQpO1xuXG4gICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgY2FzZSBDbHJGb2N1c0RpcmVjdGlvbi5WRVJUSUNBTDpcbiAgICAgICAgcmV0dXJuIGV2ZW50LmtleSA9PT0ga2V5Q29kZXMuQXJyb3dEb3duO1xuICAgICAgY2FzZSBDbHJGb2N1c0RpcmVjdGlvbi5IT1JJWk9OVEFMOlxuICAgICAgICByZXR1cm4gZXZlbnQua2V5ID09PSBrZXlDb2Rlcy5BcnJvd1JpZ2h0O1xuICAgICAgY2FzZSBDbHJGb2N1c0RpcmVjdGlvbi5CT1RIOlxuICAgICAgICByZXR1cm4gZXZlbnQua2V5ID09PSBrZXlDb2Rlcy5BcnJvd0Rvd24gfHwgZXZlbnQua2V5ID09PSBrZXlDb2Rlcy5BcnJvd1JpZ2h0O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcHJldktleVByZXNzZWQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBrZXlDb2RlcyA9IGdldEtleUNvZGVzKGV2ZW50KTtcblxuICAgIHN3aXRjaCAodGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgQ2xyRm9jdXNEaXJlY3Rpb24uVkVSVElDQUw6XG4gICAgICAgIHJldHVybiBldmVudC5rZXkgPT09IGtleUNvZGVzLkFycm93VXA7XG4gICAgICBjYXNlIENsckZvY3VzRGlyZWN0aW9uLkhPUklaT05UQUw6XG4gICAgICAgIHJldHVybiBldmVudC5rZXkgPT09IGtleUNvZGVzLkFycm93TGVmdDtcbiAgICAgIGNhc2UgQ2xyRm9jdXNEaXJlY3Rpb24uQk9USDpcbiAgICAgICAgcmV0dXJuIGV2ZW50LmtleSA9PT0ga2V5Q29kZXMuQXJyb3dVcCB8fCBldmVudC5rZXkgPT09IGtleUNvZGVzLkFycm93TGVmdDtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==