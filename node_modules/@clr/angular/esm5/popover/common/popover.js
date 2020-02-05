/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Subject } from 'rxjs';
export var Point;
(function (Point) {
    Point[Point["RIGHT_CENTER"] = 0] = "RIGHT_CENTER";
    Point[Point["RIGHT_TOP"] = 1] = "RIGHT_TOP";
    Point[Point["RIGHT_BOTTOM"] = 2] = "RIGHT_BOTTOM";
    Point[Point["TOP_CENTER"] = 3] = "TOP_CENTER";
    Point[Point["TOP_RIGHT"] = 4] = "TOP_RIGHT";
    Point[Point["TOP_LEFT"] = 5] = "TOP_LEFT";
    Point[Point["BOTTOM_CENTER"] = 6] = "BOTTOM_CENTER";
    Point[Point["BOTTOM_RIGHT"] = 7] = "BOTTOM_RIGHT";
    Point[Point["BOTTOM_LEFT"] = 8] = "BOTTOM_LEFT";
    Point[Point["LEFT_CENTER"] = 9] = "LEFT_CENTER";
    Point[Point["LEFT_TOP"] = 10] = "LEFT_TOP";
    Point[Point["LEFT_BOTTOM"] = 11] = "LEFT_BOTTOM";
})(Point || (Point = {}));
var POSITION_RELATIVE = 'relative';
var POSITION_ABSOLUTE = 'absolute';
var POSITION_FIXED = 'fixed';
var OVERFLOW_SCROLL = 'scroll';
var OVERFLOW_AUTO = 'auto';
var Popover = /** @class */ (function () {
    function Popover(element) {
        this.element = element;
        /*
         * Containers up to the first positioned one will have an event on scroll
         */
        this.scrollableElements = [];
        this.boundOnScrollListener = this.emitScrollEvent.bind(this);
        // Browsers don't agree with what to do if some of these are not specified, so we set them all to be safe.
        element.style.position = POSITION_ABSOLUTE;
        element.style.top = 0;
        element.style.bottom = 'auto';
        element.style.left = 0;
        element.style.right = 'auto';
    }
    // TODO: need a way to account for parameters that change dynamically (positioning).
    Popover.prototype.anchor = function (anchor, anchorAlign, popoverAlign, _a) {
        // TODO: we are assuming here that the popover is inside or next to the anchor.
        // We'd need to go up the popover tree too otherwise
        var _b = _a === void 0 ? {} : _a, _c = _b.offsetX, offsetX = _c === void 0 ? 0 : _c, _d = _b.offsetY, offsetY = _d === void 0 ? 0 : _d, _e = _b.useAnchorParent, useAnchorParent = _e === void 0 ? false : _e;
        this.addScrollEventListeners(anchor);
        if (useAnchorParent) {
            anchor = anchor.parentNode;
        }
        // explicitly override anchor's style to static
        anchor.style.position = 'static';
        var anchorRect = anchor.getBoundingClientRect();
        var popoverRect = this.element.getBoundingClientRect();
        // position of left top corner of anchor + the offset
        var leftDiff = anchorRect.left - popoverRect.left + offsetX;
        var topDiff = anchorRect.top - popoverRect.top + offsetY;
        // first, adjust positioning based on anchor's align point
        switch (anchorAlign) {
            case Point.LEFT_TOP:
            case Point.TOP_LEFT:
                break;
            case Point.TOP_CENTER:
                leftDiff += anchorRect.width / 2;
                break;
            case Point.TOP_RIGHT:
                leftDiff += anchorRect.width;
                break;
            case Point.RIGHT_TOP:
                leftDiff += anchorRect.width;
                break;
            case Point.LEFT_BOTTOM:
                topDiff += anchorRect.height;
                break;
            case Point.BOTTOM_LEFT:
                topDiff += anchorRect.height;
                break;
            case Point.BOTTOM_CENTER:
                topDiff += anchorRect.height;
                leftDiff += anchorRect.width / 2;
                break;
            case Point.BOTTOM_RIGHT:
                topDiff += anchorRect.height;
                leftDiff += anchorRect.width;
                break;
            case Point.RIGHT_BOTTOM:
                topDiff += anchorRect.height;
                leftDiff += anchorRect.width;
                break;
            case Point.LEFT_CENTER:
                topDiff += anchorRect.height / 2;
                break;
            case Point.RIGHT_CENTER:
                topDiff += anchorRect.height / 2;
                leftDiff += anchorRect.width;
                break;
            default:
        }
        // second, adjust positioning based on popover's align point
        switch (popoverAlign) {
            case Point.LEFT_TOP:
            case Point.TOP_LEFT:
                break;
            case Point.TOP_CENTER:
                leftDiff -= popoverRect.width / 2;
                break;
            case Point.TOP_RIGHT:
                leftDiff -= popoverRect.width;
                break;
            case Point.RIGHT_TOP:
                leftDiff -= popoverRect.width;
                break;
            case Point.LEFT_BOTTOM:
                topDiff -= popoverRect.height;
                break;
            case Point.BOTTOM_LEFT:
                topDiff -= popoverRect.height;
                break;
            case Point.BOTTOM_CENTER:
                topDiff -= popoverRect.height;
                leftDiff -= popoverRect.width / 2;
                break;
            case Point.BOTTOM_RIGHT:
                topDiff -= popoverRect.height;
                leftDiff -= popoverRect.width;
                break;
            case Point.RIGHT_BOTTOM:
                topDiff -= popoverRect.height;
                leftDiff -= popoverRect.width;
                break;
            case Point.LEFT_CENTER:
                topDiff -= popoverRect.height / 2;
                break;
            case Point.RIGHT_CENTER:
                topDiff -= popoverRect.height / 2;
                leftDiff -= popoverRect.width;
                break;
            default:
        }
        // Third, adjust with popover's margins based on the two align points.
        // Here, we make an assumption that popover is primarily positioned outside the
        // anchor with minor offset. Without this assumption, it's impossible to apply
        // the popover's margins in a predictable way. For example, assume that a popover
        // and its anchor are exactly the same size. if a popover is positioned inside the
        // anchor (which is technically possible), then it becomes impossible to know what to do
        // if the popover has a non-zero margin value all around (because applying the margin in
        // all four directions will result in no margin visually, which isn't what we want).
        // Therefore, our logic makes assumptions about margins of interest given the points,
        // and only covers the cases where popover is outside the anchor.
        var popoverComputedStyle = getComputedStyle(this.element);
        var marginLeft = parseInt(popoverComputedStyle.marginLeft, 10);
        var marginRight = parseInt(popoverComputedStyle.marginRight, 10);
        var marginTop = parseInt(popoverComputedStyle.marginTop, 10);
        var marginBottom = parseInt(popoverComputedStyle.marginBottom, 10);
        switch (anchorAlign) {
            case Point.LEFT_TOP:
            case Point.TOP_LEFT:
            case Point.TOP_RIGHT:
            case Point.RIGHT_TOP:
                if (popoverAlign === Point.BOTTOM_RIGHT || popoverAlign === Point.RIGHT_BOTTOM) {
                    topDiff -= marginBottom;
                    leftDiff -= marginRight;
                }
                if (popoverAlign === Point.BOTTOM_LEFT || popoverAlign === Point.LEFT_BOTTOM) {
                    topDiff -= marginTop;
                    leftDiff += marginLeft;
                }
                if (popoverAlign === Point.TOP_LEFT || popoverAlign === Point.LEFT_TOP) {
                    topDiff += marginTop;
                    leftDiff += marginLeft;
                }
                if (popoverAlign === Point.TOP_RIGHT || popoverAlign === Point.RIGHT_TOP) {
                    topDiff += marginTop;
                    leftDiff -= marginRight;
                }
                break;
            case Point.LEFT_BOTTOM:
            case Point.BOTTOM_LEFT:
            case Point.BOTTOM_RIGHT:
            case Point.RIGHT_BOTTOM:
                if (popoverAlign === Point.BOTTOM_LEFT || popoverAlign === Point.LEFT_BOTTOM) {
                    topDiff -= marginBottom;
                    leftDiff += marginLeft;
                }
                if (popoverAlign === Point.BOTTOM_RIGHT || popoverAlign === Point.RIGHT_BOTTOM) {
                    topDiff -= marginBottom;
                    leftDiff -= marginRight;
                }
                if (popoverAlign === Point.TOP_LEFT || popoverAlign === Point.LEFT_TOP) {
                    topDiff += marginTop;
                    leftDiff += marginLeft;
                }
                if (popoverAlign === Point.TOP_RIGHT || popoverAlign === Point.RIGHT_TOP) {
                    topDiff += marginTop;
                    leftDiff -= marginRight;
                }
                break;
            case Point.TOP_CENTER:
                topDiff -= marginBottom;
                leftDiff += marginLeft;
                leftDiff -= marginRight;
                break;
            case Point.BOTTOM_CENTER:
                topDiff += marginTop;
                leftDiff += marginLeft;
                leftDiff -= marginRight;
                break;
            case Point.LEFT_CENTER:
                topDiff += marginTop;
                topDiff -= marginBottom;
                leftDiff -= marginRight;
                break;
            case Point.RIGHT_CENTER:
                topDiff += marginTop;
                topDiff -= marginBottom;
                leftDiff += marginLeft;
                break;
            default:
        }
        this.element.style.transform = "translateX(" + Math.round(leftDiff) + "px) translateY(" + Math.round(topDiff) + "px)";
        return this._scroll.asObservable();
    };
    Popover.prototype.release = function () {
        this.element.style.transform = '';
        this.removeScrollEventListeners();
    };
    Popover.prototype.isPositioned = function (container) {
        var position = getComputedStyle(container).position;
        return position === POSITION_RELATIVE || position === POSITION_ABSOLUTE || position === POSITION_FIXED;
    };
    Popover.prototype.emitScrollEvent = function () {
        this._scroll.next();
    };
    Popover.prototype.addScrollEventListeners = function (e) {
        this._scroll = new Subject();
        var anchor = e;
        var current = e;
        while (current && current !== document) {
            if (this.scrolls(current)) {
                current.addEventListener('scroll', this.boundOnScrollListener);
                this.scrollableElements.push(current);
            }
            if (current !== anchor && this.isPositioned(current)) {
                break;
            }
            current = current.parentNode;
        }
    };
    Popover.prototype.removeScrollEventListeners = function () {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(this.scrollableElements), _c = _b.next(); !_c.done; _c = _b.next()) {
                var elem = _c.value;
                elem.removeEventListener('scroll', this.boundOnScrollListener);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.scrollableElements.length = 0;
        if (this._scroll) {
            this._scroll.complete();
            delete this._scroll;
        }
    };
    Popover.prototype.scrolls = function (container) {
        var computedStyles = getComputedStyle(container);
        return (computedStyles.overflowX === OVERFLOW_SCROLL ||
            computedStyles.overflowX === OVERFLOW_AUTO ||
            computedStyles.overflowY === OVERFLOW_SCROLL ||
            computedStyles.overflowY === OVERFLOW_AUTO);
    };
    return Popover;
}());
export { Popover };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvY29tbW9uL3BvcG92ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFRSCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE1BQU0sQ0FBTixJQUFZLEtBYVg7QUFiRCxXQUFZLEtBQUs7SUFDZixpREFBWSxDQUFBO0lBQ1osMkNBQVMsQ0FBQTtJQUNULGlEQUFZLENBQUE7SUFDWiw2Q0FBVSxDQUFBO0lBQ1YsMkNBQVMsQ0FBQTtJQUNULHlDQUFRLENBQUE7SUFDUixtREFBYSxDQUFBO0lBQ2IsaURBQVksQ0FBQTtJQUNaLCtDQUFXLENBQUE7SUFDWCwrQ0FBVyxDQUFBO0lBQ1gsMENBQVEsQ0FBQTtJQUNSLGdEQUFXLENBQUE7QUFDYixDQUFDLEVBYlcsS0FBSyxLQUFMLEtBQUssUUFhaEI7QUFFRCxJQUFNLGlCQUFpQixHQUFHLFVBQVUsQ0FBQztBQUNyQyxJQUFNLGlCQUFpQixHQUFHLFVBQVUsQ0FBQztBQUNyQyxJQUFNLGNBQWMsR0FBRyxPQUFPLENBQUM7QUFFL0IsSUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDO0FBQ2pDLElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQztBQUU3QjtJQUdFLGlCQUFvQixPQUFZO1FBQVosWUFBTyxHQUFQLE9BQU8sQ0FBSztRQXNOaEM7O1dBRUc7UUFFSyx1QkFBa0IsR0FBa0IsRUFBRSxDQUFDO1FBTXZDLDBCQUFxQixHQUFRLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBL05uRSwwR0FBMEc7UUFDMUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFB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Ozs7Ozs7OztRQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUNyQjtJQUNILENBQUM7SUFFTyx5QkFBTyxHQUFmLFVBQWdCLFNBQWM7UUFDNUIsSUFBTSxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkQsT0FBTyxDQUNMLGNBQWMsQ0FBQyxTQUFTLEtBQUssZUFBZTtZQUM1QyxjQUFjLENBQUMsU0FBUyxLQUFLLGFBQWE7WUFDMUMsY0FBYyxDQUFDLFNBQVMsS0FBSyxlQUFlO1lBQzVDLGNBQWMsQ0FBQyxTQUFTLEtBQUssYUFBYSxDQUMzQyxDQUFDO0lBQ0osQ0FBQztJQUNILGNBQUM7QUFBRCxDQUFDLEFBelFELElBeVFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG4vKlxuICogRG8gTk9UIEFuZ3VsYXIgdGhpcyB1cC4gSXQgYXNzdW1lcyB3ZSdyZSBpbiB0aGUgRE9NLCBwbGF5cyB3aXRoIG5hdGl2ZSBlbGVtZW50cywgLi4uXG4gKiBJdCBjb3VsZCBwb3RlbnRpYWxseSBiZSB1c2VkIGFzIHBhcnQgb2YgQGNsci91aSBhcyBhIHZhbmlsbGEgSmF2YXNjcmlwdCBoZWxwZXIuXG4gKi9cblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUG9wb3Zlck9wdGlvbnMgfSBmcm9tICcuL3BvcG92ZXItb3B0aW9ucy5pbnRlcmZhY2UnO1xuZXhwb3J0IGVudW0gUG9pbnQge1xuICBSSUdIVF9DRU5URVIsXG4gIFJJR0hUX1RPUCxcbiAgUklHSFRfQk9UVE9NLFxuICBUT1BfQ0VOVEVSLFxuICBUT1BfUklHSFQsXG4gIFRPUF9MRUZULFxuICBCT1RUT01fQ0VOVEVSLFxuICBCT1RUT01fUklHSFQsXG4gIEJPVFRPTV9MRUZULFxuICBMRUZUX0NFTlRFUixcbiAgTEVGVF9UT1AsXG4gIExFRlRfQk9UVE9NLFxufVxuXG5jb25zdCBQT1NJVElPTl9SRUxBVElWRSA9ICdyZWxhdGl2ZSc7XG5jb25zdCBQT1NJVElPTl9BQlNPTFVURSA9ICdhYnNvbHV0ZSc7XG5jb25zdCBQT1NJVElPTl9GSVhFRCA9ICdmaXhlZCc7XG5cbmNvbnN0IE9WRVJGTE9XX1NDUk9MTCA9ICdzY3JvbGwnO1xuY29uc3QgT1ZFUkZMT1dfQVVUTyA9ICdhdXRvJztcblxuZXhwb3J0IGNsYXNzIFBvcG92ZXIge1xuICBwcml2YXRlIF9zY3JvbGw6IFN1YmplY3Q8dm9pZD47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBhbnkpIHtcbiAgICAvLyBCcm93c2VycyBkb24ndCBhZ3JlZSB3aXRoIHdoYXQgdG8gZG8gaWYgc29tZSBvZiB0aGVzZSBhcmUgbm90IHNwZWNpZmllZCwgc28gd2Ugc2V0IHRoZW0gYWxsIHRvIGJlIHNhZmUuXG4gICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFBPU0lUSU9OX0FCU09MVVRFO1xuICAgIGVsZW1lbnQuc3R5bGUudG9wID0gMDtcbiAgICBlbGVtZW50LnN0eWxlLmJvdHRvbSA9ICdhdXRvJztcbiAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSAwO1xuICAgIGVsZW1lbnQuc3R5bGUucmlnaHQgPSAnYXV0byc7XG4gIH1cblxuICAvLyBUT0RPOiBuZWVkIGEgd2F5IHRvIGFjY291bnQgZm9yIHBhcmFtZXRlcnMgdGhhdCBjaGFuZ2UgZHluYW1pY2FsbHkgKHBvc2l0aW9uaW5nKS5cbiAgcHVibGljIGFuY2hvcihcbiAgICBhbmNob3I6IGFueSxcbiAgICBhbmNob3JBbGlnbjogUG9pbnQsXG4gICAgcG9wb3ZlckFsaWduOiBQb2ludCxcbiAgICB7IG9mZnNldFggPSAwLCBvZmZzZXRZID0gMCwgdXNlQW5jaG9yUGFyZW50ID0gZmFsc2UgfTogUG9wb3Zlck9wdGlvbnMgPSB7fVxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIC8vIFRPRE86IHdlIGFyZSBhc3N1bWluZyBoZXJlIHRoYXQgdGhlIHBvcG92ZXIgaXMgaW5zaWRlIG9yIG5leHQgdG8gdGhlIGFuY2hvci5cbiAgICAvLyBXZSdkIG5lZWQgdG8gZ28gdXAgdGhlIHBvcG92ZXIgdHJlZSB0b28gb3RoZXJ3aXNlXG5cbiAgICB0aGlzLmFkZFNjcm9sbEV2ZW50TGlzdGVuZXJzKGFuY2hvcik7XG4gICAgaWYgKHVzZUFuY2hvclBhcmVudCkge1xuICAgICAgYW5jaG9yID0gYW5jaG9yLnBhcmVudE5vZGU7XG4gICAgfVxuICAgIC8vIGV4cGxpY2l0bHkgb3ZlcnJpZGUgYW5jaG9yJ3Mgc3R5bGUgdG8gc3RhdGljXG4gICAgYW5jaG9yLnN0eWxlLnBvc2l0aW9uID0gJ3N0YXRpYyc7XG5cbiAgICBjb25zdCBhbmNob3JSZWN0ID0gYW5jaG9yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHBvcG92ZXJSZWN0ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgLy8gcG9zaXRpb24gb2YgbGVmdCB0b3AgY29ybmVyIG9mIGFuY2hvciArIHRoZSBvZmZzZXRcbiAgICBsZXQgbGVmdERpZmY6IG51bWJlciA9IGFuY2hvclJlY3QubGVmdCAtIHBvcG92ZXJSZWN0LmxlZnQgKyBvZmZzZXRYO1xuICAgIGxldCB0b3BEaWZmOiBudW1iZXIgPSBhbmNob3JSZWN0LnRvcCAtIHBvcG92ZXJSZWN0LnRvcCArIG9mZnNldFk7XG5cbiAgICAvLyBmaXJzdCwgYWRqdXN0IHBvc2l0aW9uaW5nIGJhc2VkIG9uIGFuY2hvcidzIGFsaWduIHBvaW50XG4gICAgc3dpdGNoIChhbmNob3JBbGlnbikge1xuICAgICAgY2FzZSBQb2ludC5MRUZUX1RPUDpcbiAgICAgIGNhc2UgUG9pbnQuVE9QX0xFRlQ6XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5UT1BfQ0VOVEVSOlxuICAgICAgICBsZWZ0RGlmZiArPSBhbmNob3JSZWN0LndpZHRoIC8gMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LlRPUF9SSUdIVDpcbiAgICAgICAgbGVmdERpZmYgKz0gYW5jaG9yUmVjdC53aWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LlJJR0hUX1RPUDpcbiAgICAgICAgbGVmdERpZmYgKz0gYW5jaG9yUmVjdC53aWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LkxFRlRfQk9UVE9NOlxuICAgICAgICB0b3BEaWZmICs9IGFuY2hvclJlY3QuaGVpZ2h0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUG9pbnQuQk9UVE9NX0xFRlQ6XG4gICAgICAgIHRvcERpZmYgKz0gYW5jaG9yUmVjdC5oZWlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5CT1RUT01fQ0VOVEVSOlxuICAgICAgICB0b3BEaWZmICs9IGFuY2hvclJlY3QuaGVpZ2h0O1xuICAgICAgICBsZWZ0RGlmZiArPSBhbmNob3JSZWN0LndpZHRoIC8gMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LkJPVFRPTV9SSUdIVDpcbiAgICAgICAgdG9wRGlmZiArPSBhbmNob3JSZWN0LmhlaWdodDtcbiAgICAgICAgbGVmdERpZmYgKz0gYW5jaG9yUmVjdC53aWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LlJJR0hUX0JPVFRPTTpcbiAgICAgICAgdG9wRGlmZiArPSBhbmNob3JSZWN0LmhlaWdodDtcbiAgICAgICAgbGVmdERpZmYgKz0gYW5jaG9yUmVjdC53aWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LkxFRlRfQ0VOVEVSOlxuICAgICAgICB0b3BEaWZmICs9IGFuY2hvclJlY3QuaGVpZ2h0IC8gMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LlJJR0hUX0NFTlRFUjpcbiAgICAgICAgdG9wRGlmZiArPSBhbmNob3JSZWN0LmhlaWdodCAvIDI7XG4gICAgICAgIGxlZnREaWZmICs9IGFuY2hvclJlY3Qud2lkdGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICB9XG5cbiAgICAvLyBzZWNvbmQsIGFkanVzdCBwb3NpdGlvbmluZyBiYXNlZCBvbiBwb3BvdmVyJ3MgYWxpZ24gcG9pbnRcbiAgICBzd2l0Y2ggKHBvcG92ZXJBbGlnbikge1xuICAgICAgY2FzZSBQb2ludC5MRUZUX1RPUDpcbiAgICAgIGNhc2UgUG9pbnQuVE9QX0xFRlQ6XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5UT1BfQ0VOVEVSOlxuICAgICAgICBsZWZ0RGlmZiAtPSBwb3BvdmVyUmVjdC53aWR0aCAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5UT1BfUklHSFQ6XG4gICAgICAgIGxlZnREaWZmIC09IHBvcG92ZXJSZWN0LndpZHRoO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUG9pbnQuUklHSFRfVE9QOlxuICAgICAgICBsZWZ0RGlmZiAtPSBwb3BvdmVyUmVjdC53aWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LkxFRlRfQk9UVE9NOlxuICAgICAgICB0b3BEaWZmIC09IHBvcG92ZXJSZWN0LmhlaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LkJPVFRPTV9MRUZUOlxuICAgICAgICB0b3BEaWZmIC09IHBvcG92ZXJSZWN0LmhlaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LkJPVFRPTV9DRU5URVI6XG4gICAgICAgIHRvcERpZmYgLT0gcG9wb3ZlclJlY3QuaGVpZ2h0O1xuICAgICAgICBsZWZ0RGlmZiAtPSBwb3BvdmVyUmVjdC53aWR0aCAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5CT1RUT01fUklHSFQ6XG4gICAgICAgIHRvcERpZmYgLT0gcG9wb3ZlclJlY3QuaGVpZ2h0O1xuICAgICAgICBsZWZ0RGlmZiAtPSBwb3BvdmVyUmVjdC53aWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LlJJR0hUX0JPVFRPTTpcbiAgICAgICAgdG9wRGlmZiAtPSBwb3BvdmVyUmVjdC5oZWlnaHQ7XG4gICAgICAgIGxlZnREaWZmIC09IHBvcG92ZXJSZWN0LndpZHRoO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUG9pbnQuTEVGVF9DRU5URVI6XG4gICAgICAgIHRvcERpZmYgLT0gcG9wb3ZlclJlY3QuaGVpZ2h0IC8gMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LlJJR0hUX0NFTlRFUjpcbiAgICAgICAgdG9wRGlmZiAtPSBwb3BvdmVyUmVjdC5oZWlnaHQgLyAyO1xuICAgICAgICBsZWZ0RGlmZiAtPSBwb3BvdmVyUmVjdC53aWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgIH1cblxuICAgIC8vIFRoaXJkLCBhZGp1c3Qgd2l0aCBwb3BvdmVyJ3MgbWFyZ2lucyBiYXNlZCBvbiB0aGUgdHdvIGFsaWduIHBvaW50cy5cbiAgICAvLyBIZXJlLCB3ZSBtYWtlIGFuIGFzc3VtcHRpb24gdGhhdCBwb3BvdmVyIGlzIHByaW1hcmlseSBwb3NpdGlvbmVkIG91dHNpZGUgdGhlXG4gICAgLy8gYW5jaG9yIHdpdGggbWlub3Igb2Zmc2V0LiBXaXRob3V0IHRoaXMgYXNzdW1wdGlvbiwgaXQncyBpbXBvc3NpYmxlIHRvIGFwcGx5XG4gICAgLy8gdGhlIHBvcG92ZXIncyBtYXJnaW5zIGluIGEgcHJlZGljdGFibGUgd2F5LiBGb3IgZXhhbXBsZSwgYXNzdW1lIHRoYXQgYSBwb3BvdmVyXG4gICAgLy8gYW5kIGl0cyBhbmNob3IgYXJlIGV4YWN0bHkgdGhlIHNhbWUgc2l6ZS4gaWYgYSBwb3BvdmVyIGlzIHBvc2l0aW9uZWQgaW5zaWRlIHRoZVxuICAgIC8vIGFuY2hvciAod2hpY2ggaXMgdGVjaG5pY2FsbHkgcG9zc2libGUpLCB0aGVuIGl0IGJlY29tZXMgaW1wb3NzaWJsZSB0byBrbm93IHdoYXQgdG8gZG9cbiAgICAvLyBpZiB0aGUgcG9wb3ZlciBoYXMgYSBub24temVybyBtYXJnaW4gdmFsdWUgYWxsIGFyb3VuZCAoYmVjYXVzZSBhcHBseWluZyB0aGUgbWFyZ2luIGluXG4gICAgLy8gYWxsIGZvdXIgZGlyZWN0aW9ucyB3aWxsIHJlc3VsdCBpbiBubyBtYXJnaW4gdmlzdWFsbHksIHdoaWNoIGlzbid0IHdoYXQgd2Ugd2FudCkuXG4gICAgLy8gVGhlcmVmb3JlLCBvdXIgbG9naWMgbWFrZXMgYXNzdW1wdGlvbnMgYWJvdXQgbWFyZ2lucyBvZiBpbnRlcmVzdCBnaXZlbiB0aGUgcG9pbnRzLFxuICAgIC8vIGFuZCBvbmx5IGNvdmVycyB0aGUgY2FzZXMgd2hlcmUgcG9wb3ZlciBpcyBvdXRzaWRlIHRoZSBhbmNob3IuXG5cbiAgICBjb25zdCBwb3BvdmVyQ29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50KTtcbiAgICBjb25zdCBtYXJnaW5MZWZ0ID0gcGFyc2VJbnQocG9wb3ZlckNvbXB1dGVkU3R5bGUubWFyZ2luTGVmdCwgMTApO1xuICAgIGNvbnN0IG1hcmdpblJpZ2h0ID0gcGFyc2VJbnQocG9wb3ZlckNvbXB1dGVkU3R5bGUubWFyZ2luUmlnaHQsIDEwKTtcbiAgICBjb25zdCBtYXJnaW5Ub3AgPSBwYXJzZUludChwb3BvdmVyQ29tcHV0ZWRTdHlsZS5tYXJnaW5Ub3AsIDEwKTtcbiAgICBjb25zdCBtYXJnaW5Cb3R0b20gPSBwYXJzZUludChwb3BvdmVyQ29tcHV0ZWRTdHlsZS5tYXJnaW5Cb3R0b20sIDEwKTtcblxuICAgIHN3aXRjaCAoYW5jaG9yQWxpZ24pIHtcbiAgICAgIGNhc2UgUG9pbnQuTEVGVF9UT1A6XG4gICAgICBjYXNlIFBvaW50LlRPUF9MRUZUOlxuICAgICAgY2FzZSBQb2ludC5UT1BfUklHSFQ6XG4gICAgICBjYXNlIFBvaW50LlJJR0hUX1RPUDpcbiAgICAgICAgaWYgKHBvcG92ZXJBbGlnbiA9PT0gUG9pbnQuQk9UVE9NX1JJR0hUIHx8IHBvcG92ZXJBbGlnbiA9PT0gUG9pbnQuUklHSFRfQk9UVE9NKSB7XG4gICAgICAgICAgdG9wRGlmZiAtPSBtYXJnaW5Cb3R0b207XG4gICAgICAgICAgbGVmdERpZmYgLT0gbWFyZ2luUmlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcG92ZXJBbGlnbiA9PT0gUG9pbnQuQk9UVE9NX0xFRlQgfHwgcG9wb3ZlckFsaWduID09PSBQb2ludC5MRUZUX0JPVFRPTSkge1xuICAgICAgICAgIHRvcERpZmYgLT0gbWFyZ2luVG9wO1xuICAgICAgICAgIGxlZnREaWZmICs9IG1hcmdpbkxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcG92ZXJBbGlnbiA9PT0gUG9pbnQuVE9QX0xFRlQgfHwgcG9wb3ZlckFsaWduID09PSBQb2ludC5MRUZUX1RPUCkge1xuICAgICAgICAgIHRvcERpZmYgKz0gbWFyZ2luVG9wO1xuICAgICAgICAgIGxlZnREaWZmICs9IG1hcmdpbkxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcG92ZXJBbGlnbiA9PT0gUG9pbnQuVE9QX1JJR0hUIHx8IHBvcG92ZXJBbGlnbiA9PT0gUG9pbnQuUklHSFRfVE9QKSB7XG4gICAgICAgICAgdG9wRGlmZiArPSBtYXJnaW5Ub3A7XG4gICAgICAgICAgbGVmdERpZmYgLT0gbWFyZ2luUmlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LkxFRlRfQk9UVE9NOlxuICAgICAgY2FzZSBQb2ludC5CT1RUT01fTEVGVDpcbiAgICAgIGNhc2UgUG9pbnQuQk9UVE9NX1JJR0hUOlxuICAgICAgY2FzZSBQb2ludC5SSUdIVF9CT1RUT006XG4gICAgICAgIGlmIChwb3BvdmVyQWxpZ24gPT09IFBvaW50LkJPVFRPTV9MRUZUIHx8IHBvcG92ZXJBbGlnbiA9PT0gUG9pbnQuTEVGVF9CT1RUT00pIHtcbiAgICAgICAgICB0b3BEaWZmIC09IG1hcmdpbkJvdHRvbTtcbiAgICAgICAgICBsZWZ0RGlmZiArPSBtYXJnaW5MZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3BvdmVyQWxpZ24gPT09IFBvaW50LkJPVFRPTV9SSUdIVCB8fCBwb3BvdmVyQWxpZ24gPT09IFBvaW50LlJJR0hUX0JPVFRPTSkge1xuICAgICAgICAgIHRvcERpZmYgLT0gbWFyZ2luQm90dG9tO1xuICAgICAgICAgIGxlZnREaWZmIC09IG1hcmdpblJpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3BvdmVyQWxpZ24gPT09IFBvaW50LlRPUF9MRUZUIHx8IHBvcG92ZXJBbGlnbiA9PT0gUG9pbnQuTEVGVF9UT1ApIHtcbiAgICAgICAgICB0b3BEaWZmICs9IG1hcmdpblRvcDtcbiAgICAgICAgICBsZWZ0RGlmZiArPSBtYXJnaW5MZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3BvdmVyQWxpZ24gPT09IFBvaW50LlRPUF9SSUdIVCB8fCBwb3BvdmVyQWxpZ24gPT09IFBvaW50LlJJR0hUX1RPUCkge1xuICAgICAgICAgIHRvcERpZmYgKz0gbWFyZ2luVG9wO1xuICAgICAgICAgIGxlZnREaWZmIC09IG1hcmdpblJpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5UT1BfQ0VOVEVSOlxuICAgICAgICB0b3BEaWZmIC09IG1hcmdpbkJvdHRvbTtcbiAgICAgICAgbGVmdERpZmYgKz0gbWFyZ2luTGVmdDtcbiAgICAgICAgbGVmdERpZmYgLT0gbWFyZ2luUmlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5CT1RUT01fQ0VOVEVSOlxuICAgICAgICB0b3BEaWZmICs9IG1hcmdpblRvcDtcbiAgICAgICAgbGVmdERpZmYgKz0gbWFyZ2luTGVmdDtcbiAgICAgICAgbGVmdERpZmYgLT0gbWFyZ2luUmlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5MRUZUX0NFTlRFUjpcbiAgICAgICAgdG9wRGlmZiArPSBtYXJnaW5Ub3A7XG4gICAgICAgIHRvcERpZmYgLT0gbWFyZ2luQm90dG9tO1xuICAgICAgICBsZWZ0RGlmZiAtPSBtYXJnaW5SaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LlJJR0hUX0NFTlRFUjpcbiAgICAgICAgdG9wRGlmZiArPSBtYXJnaW5Ub3A7XG4gICAgICAgIHRvcERpZmYgLT0gbWFyZ2luQm90dG9tO1xuICAgICAgICBsZWZ0RGlmZiArPSBtYXJnaW5MZWZ0O1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7TWF0aC5yb3VuZChsZWZ0RGlmZil9cHgpIHRyYW5zbGF0ZVkoJHtNYXRoLnJvdW5kKHRvcERpZmYpfXB4KWA7XG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHB1YmxpYyByZWxlYXNlKCkge1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICB0aGlzLnJlbW92ZVNjcm9sbEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICBwcml2YXRlIGlzUG9zaXRpb25lZChjb250YWluZXI6IGFueSkge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXIpLnBvc2l0aW9uO1xuICAgIHJldHVybiBwb3NpdGlvbiA9PT0gUE9TSVRJT05fUkVMQVRJVkUgfHwgcG9zaXRpb24gPT09IFBPU0lUSU9OX0FCU09MVVRFIHx8IHBvc2l0aW9uID09PSBQT1NJVElPTl9GSVhFRDtcbiAgfVxuXG4gIC8qXG4gICAqIENvbnRhaW5lcnMgdXAgdG8gdGhlIGZpcnN0IHBvc2l0aW9uZWQgb25lIHdpbGwgaGF2ZSBhbiBldmVudCBvbiBzY3JvbGxcbiAgICovXG5cbiAgcHJpdmF0ZSBzY3JvbGxhYmxlRWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXTtcblxuICBwcml2YXRlIGVtaXRTY3JvbGxFdmVudCgpIHtcbiAgICB0aGlzLl9zY3JvbGwubmV4dCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBib3VuZE9uU2Nyb2xsTGlzdGVuZXI6IGFueSA9IHRoaXMuZW1pdFNjcm9sbEV2ZW50LmJpbmQodGhpcyk7XG5cbiAgcHJpdmF0ZSBhZGRTY3JvbGxFdmVudExpc3RlbmVycyhlOiBhbnkpIHtcbiAgICB0aGlzLl9zY3JvbGwgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIGNvbnN0IGFuY2hvcjogYW55ID0gZTtcbiAgICBsZXQgY3VycmVudDogYW55ID0gZTtcbiAgICB3aGlsZSAoY3VycmVudCAmJiBjdXJyZW50ICE9PSBkb2N1bWVudCkge1xuICAgICAgaWYgKHRoaXMuc2Nyb2xscyhjdXJyZW50KSkge1xuICAgICAgICBjdXJyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuYm91bmRPblNjcm9sbExpc3RlbmVyKTtcbiAgICAgICAgdGhpcy5zY3JvbGxhYmxlRWxlbWVudHMucHVzaChjdXJyZW50KTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50ICE9PSBhbmNob3IgJiYgdGhpcy5pc1Bvc2l0aW9uZWQoY3VycmVudCkpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlU2Nyb2xsRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgZm9yIChjb25zdCBlbGVtIG9mIHRoaXMuc2Nyb2xsYWJsZUVsZW1lbnRzKSB7XG4gICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuYm91bmRPblNjcm9sbExpc3RlbmVyKTtcbiAgICB9XG4gICAgdGhpcy5zY3JvbGxhYmxlRWxlbWVudHMubGVuZ3RoID0gMDtcbiAgICBpZiAodGhpcy5fc2Nyb2xsKSB7XG4gICAgICB0aGlzLl9zY3JvbGwuY29tcGxldGUoKTtcbiAgICAgIGRlbGV0ZSB0aGlzLl9zY3JvbGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzY3JvbGxzKGNvbnRhaW5lcjogYW55KTogYm9vbGVhbiB7XG4gICAgY29uc3QgY29tcHV0ZWRTdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lcik7XG4gICAgcmV0dXJuIChcbiAgICAgIGNvbXB1dGVkU3R5bGVzLm92ZXJmbG93WCA9PT0gT1ZFUkZMT1dfU0NST0xMIHx8XG4gICAgICBjb21wdXRlZFN0eWxlcy5vdmVyZmxvd1ggPT09IE9WRVJGTE9XX0FVVE8gfHxcbiAgICAgIGNvbXB1dGVkU3R5bGVzLm92ZXJmbG93WSA9PT0gT1ZFUkZMT1dfU0NST0xMIHx8XG4gICAgICBjb21wdXRlZFN0eWxlcy5vdmVyZmxvd1kgPT09IE9WRVJGTE9XX0FVVE9cbiAgICApO1xuICB9XG59XG4iXX0=