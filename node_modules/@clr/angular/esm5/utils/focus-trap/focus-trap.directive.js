import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Injector, PLATFORM_ID, Renderer2, } from '@angular/core';
import { FocusTrapTracker } from './focus-trap-tracker.service';
var FocusTrapDirective = /** @class */ (function () {
    function FocusTrapDirective(el, injector, focusTrapsTracker, renderer, platformId) {
        this.el = el;
        this.injector = injector;
        this.focusTrapsTracker = focusTrapsTracker;
        this.renderer = renderer;
        this.platformId = platformId;
        this.document = this.injector.get(DOCUMENT);
        this.focusTrapsTracker.current = this;
        this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
    }
    FocusTrapDirective.prototype.onFocusIn = function (event) {
        var nativeElement = this.el.nativeElement;
        if (this.focusTrapsTracker.current === this && event.target && !nativeElement.contains(event.target)) {
            nativeElement.focus();
        }
    };
    FocusTrapDirective.prototype.createFocusableOffScreenEl = function () {
        // Not using Renderer2's createElement method because that leads to DOM leakage.
        // https://github.com/angular/angular/issues/26954
        var offScreenSpan = this.document.createElement('span');
        this.renderer.setAttribute(offScreenSpan, 'tabindex', '0');
        this.renderer.addClass(offScreenSpan, 'offscreen-focus-rebounder');
        return offScreenSpan;
    };
    FocusTrapDirective.prototype.addReboundEls = function () {
        // We will add these focus rebounding elements only in the following conditions:
        // 1. It should be running inside browser platform as it accesses document.body element
        // 2. We should NOT add them more than once. Hence, we are counting a number of focus trappers
        //    and only add on the first focus trapper.
        if (isPlatformBrowser(this.platformId) && this.focusTrapsTracker.nbFocusTrappers === 1) {
            this.topReboundEl = this.createFocusableOffScreenEl();
            this.bottomReboundEl = this.createFocusableOffScreenEl();
            // Add reboundBeforeTrapEl to the document body as the first child
            this.renderer.insertBefore(this.document.body, this.topReboundEl, this.document.body.firstChild);
            // Add reboundAfterTrapEl to the document body as the last child
            this.renderer.appendChild(this.document.body, this.bottomReboundEl);
        }
    };
    FocusTrapDirective.prototype.removeReboundEls = function () {
        if (isPlatformBrowser(this.platformId) &&
            this.focusTrapsTracker.nbFocusTrappers === 1 &&
            this.topReboundEl &&
            this.bottomReboundEl) {
            // The renderer does not immediately remove the child nodes,
            // which may lead to synchronicity issues.
            this.document.body.removeChild(this.topReboundEl);
            this.document.body.removeChild(this.bottomReboundEl);
            // These are here to to make sure that
            // we completely delete all traces of the removed DOM objects.
            delete this.topReboundEl;
            delete this.bottomReboundEl;
        }
    };
    FocusTrapDirective.prototype.setPreviousFocus = function () {
        if (this.previousActiveElement && this.previousActiveElement.focus) {
            this.previousActiveElement.focus();
        }
    };
    FocusTrapDirective.prototype.ngAfterViewInit = function () {
        if (isPlatformBrowser(this.platformId)) {
            this.previousActiveElement = this.document.activeElement;
        }
        this.addReboundEls();
    };
    FocusTrapDirective.prototype.ngOnDestroy = function () {
        this.removeReboundEls();
        this.setPreviousFocus();
        this.focusTrapsTracker.activatePreviousTrapper();
    };
    tslib_1.__decorate([
        HostListener('document:focusin', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], FocusTrapDirective.prototype, "onFocusIn", null);
    FocusTrapDirective = tslib_1.__decorate([
        Directive({ selector: '[clrFocusTrap]' }),
        tslib_1.__param(4, Inject(PLATFORM_ID)),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            Injector,
            FocusTrapTracker,
            Renderer2,
            Object])
    ], FocusTrapDirective);
    return FocusTrapDirective;
}());
export { FocusTrapDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdHJhcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9mb2N1cy10cmFwL2ZvY3VzLXRyYXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sUUFBUSxFQUVSLFdBQVcsRUFDWCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFHaEU7SUFPRSw0QkFDVSxFQUFjLEVBQ2QsUUFBa0IsRUFDbEIsaUJBQW1DLEVBQ25DLFFBQW1CLEVBQ0UsVUFBa0I7UUFKdkMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ0UsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUUvQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBRXRDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBR0Qsc0NBQVMsR0FBVCxVQUFVLEtBQVU7UUFDbEIsSUFBTSxhQUFhLEdBQWdCLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO1FBRXpELElBQUksSUFBSSxDQUFDLGlCQUFp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Q0FBQztJQUNuRCxDQUFDO0lBdkVEO1FBREMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7dURBTzVDO0lBM0JVLGtCQUFrQjtRQUQ5QixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztRQWFyQyxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7aURBSlIsVUFBVTtZQUNKLFFBQVE7WUFDQyxnQkFBZ0I7WUFDekIsU0FBUztZQUNjLE1BQU07T0FadEMsa0JBQWtCLENBNkY5QjtJQUFELHlCQUFDO0NBQUEsQUE3RkQsSUE2RkM7U0E3Rlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBPbkRlc3Ryb3ksXG4gIFBMQVRGT1JNX0lELFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGb2N1c1RyYXBUcmFja2VyIH0gZnJvbSAnLi9mb2N1cy10cmFwLXRyYWNrZXIuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJGb2N1c1RyYXBdJyB9KVxuZXhwb3J0IGNsYXNzIEZvY3VzVHJhcERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgcHJldmlvdXNBY3RpdmVFbGVtZW50OiBhbnk7XG4gIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIHByaXZhdGUgdG9wUmVib3VuZEVsOiBhbnk7XG4gIHByaXZhdGUgYm90dG9tUmVib3VuZEVsOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIGZvY3VzVHJhcHNUcmFja2VyOiBGb2N1c1RyYXBUcmFja2VyLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdFxuICApIHtcbiAgICB0aGlzLmRvY3VtZW50ID0gdGhpcy5pbmplY3Rvci5nZXQoRE9DVU1FTlQpO1xuICAgIHRoaXMuZm9jdXNUcmFwc1RyYWNrZXIuY3VycmVudCA9IHRoaXM7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0YWJpbmRleCcsICcwJyk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpmb2N1c2luJywgWyckZXZlbnQnXSlcbiAgb25Gb2N1c0luKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCBuYXRpdmVFbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcblxuICAgIGlmICh0aGlzLmZvY3VzVHJhcHNUcmFja2VyLmN1cnJlbnQgPT09IHRoaXMgJiYgZXZlbnQudGFyZ2V0ICYmICFuYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIG5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUZvY3VzYWJsZU9mZlNjcmVlbkVsKCk6IGFueSB7XG4gICAgLy8gTm90IHVzaW5nIFJlbmRlcmVyMidzIGNyZWF0ZUVsZW1lbnQgbWV0aG9kIGJlY2F1c2UgdGhhdCBsZWFkcyB0byBET00gbGVha2FnZS5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8yNjk1NFxuICAgIGNvbnN0IG9mZlNjcmVlblNwYW4gPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShvZmZTY3JlZW5TcGFuLCAndGFiaW5kZXgnLCAnMCcpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mob2ZmU2NyZWVuU3BhbiwgJ29mZnNjcmVlbi1mb2N1cy1yZWJvdW5kZXInKTtcblxuICAgIHJldHVybiBvZmZTY3JlZW5TcGFuO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRSZWJvdW5kRWxzKCkge1xuICAgIC8vIFdlIHdpbGwgYWRkIHRoZXNlIGZvY3VzIHJlYm91bmRpbmcgZWxlbWVudHMgb25seSBpbiB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gICAgLy8gMS4gSXQgc2hvdWxkIGJlIHJ1bm5pbmcgaW5zaWRlIGJyb3dzZXIgcGxhdGZvcm0gYXMgaXQgYWNjZXNzZXMgZG9jdW1lbnQuYm9keSBlbGVtZW50XG4gICAgLy8gMi4gV2Ugc2hvdWxkIE5PVCBhZGQgdGhlbSBtb3JlIHRoYW4gb25jZS4gSGVuY2UsIHdlIGFyZSBjb3VudGluZyBhIG51bWJlciBvZiBmb2N1cyB0cmFwcGVyc1xuICAgIC8vICAgIGFuZCBvbmx5IGFkZCBvbiB0aGUgZmlyc3QgZm9jdXMgdHJhcHBlci5cblxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmIHRoaXMuZm9jdXNUcmFwc1RyYWNrZXIubmJGb2N1c1RyYXBwZXJzID09PSAxKSB7XG4gICAgICB0aGlzLnRvcFJlYm91bmRFbCA9IHRoaXMuY3JlYXRlRm9jdXNhYmxlT2ZmU2NyZWVuRWwoKTtcbiAgICAgIHRoaXMuYm90dG9tUmVib3VuZEVsID0gdGhpcy5jcmVhdGVGb2N1c2FibGVPZmZTY3JlZW5FbCgpO1xuICAgICAgLy8gQWRkIHJlYm91bmRCZWZvcmVUcmFwRWwgdG8gdGhlIGRvY3VtZW50IGJvZHkgYXMgdGhlIGZpcnN0IGNoaWxkXG4gICAgICB0aGlzLnJlbmRlcmVyLmluc2VydEJlZm9yZSh0aGlzLmRvY3VtZW50LmJvZHksIHRoaXMudG9wUmVib3VuZEVsLCB0aGlzLmRvY3VtZW50LmJvZHkuZmlyc3RDaGlsZCk7XG4gICAgICAvLyBBZGQgcmVib3VuZEFmdGVyVHJhcEVsIHRvIHRoZSBkb2N1bWVudCBib2R5IGFzIHRoZSBsYXN0IGNoaWxkXG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgdGhpcy5ib3R0b21SZWJvdW5kRWwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlUmVib3VuZEVscygpIHtcbiAgICBpZiAoXG4gICAgICBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmXG4gICAgICB0aGlzLmZvY3VzVHJhcHNUcmFja2VyLm5iRm9jdXNUcmFwcGVycyA9PT0gMSAmJlxuICAgICAgdGhpcy50b3BSZWJvdW5kRWwgJiZcbiAgICAgIHRoaXMuYm90dG9tUmVib3VuZEVsXG4gICAgKSB7XG4gICAgICAvLyBUaGUgcmVuZGVyZXIgZG9lcyBub3QgaW1tZWRpYXRlbHkgcmVtb3ZlIHRoZSBjaGlsZCBub2RlcyxcbiAgICAgIC8vIHdoaWNoIG1heSBsZWFkIHRvIHN5bmNocm9uaWNpdHkgaXNzdWVzLlxuICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMudG9wUmVib3VuZEVsKTtcbiAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLmJvdHRvbVJlYm91bmRFbCk7XG5cbiAgICAgIC8vIFRoZXNlIGFyZSBoZXJlIHRvIHRvIG1ha2Ugc3VyZSB0aGF0XG4gICAgICAvLyB3ZSBjb21wbGV0ZWx5IGRlbGV0ZSBhbGwgdHJhY2VzIG9mIHRoZSByZW1vdmVkIERPTSBvYmplY3RzLlxuICAgICAgZGVsZXRlIHRoaXMudG9wUmVib3VuZEVsO1xuICAgICAgZGVsZXRlIHRoaXMuYm90dG9tUmVib3VuZEVsO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRQcmV2aW91c0ZvY3VzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnByZXZpb3VzQWN0aXZlRWxlbWVudCAmJiB0aGlzLnByZXZpb3VzQWN0aXZlRWxlbWVudC5mb2N1cykge1xuICAgICAgdGhpcy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMucHJldmlvdXNBY3RpdmVFbGVtZW50ID0gPEhUTUxFbGVtZW50PnRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICB0aGlzLmFkZFJlYm91bmRFbHMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlUmVib3VuZEVscygpO1xuICAgIHRoaXMuc2V0UHJldmlvdXNGb2N1cygpO1xuICAgIHRoaXMuZm9jdXNUcmFwc1RyYWNrZXIuYWN0aXZhdGVQcmV2aW91c1RyYXBwZXIoKTtcbiAgfVxufVxuIl19