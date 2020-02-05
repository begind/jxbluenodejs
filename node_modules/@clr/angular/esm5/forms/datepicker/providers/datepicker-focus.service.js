/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { first, filter } from 'rxjs/operators';
/**
 * This service focuses the day that is focusable in the calendar.
 */
var DatepickerFocusService = /** @class */ (function () {
    function DatepickerFocusService(_ngZone, platformId) {
        this._ngZone = _ngZone;
        this.platformId = platformId;
    }
    DatepickerFocusService.prototype.focusCell = function (elRef) {
        var _this = this;
        this._ngZone.runOutsideAngular(function () {
            _this.ngZoneIsStableInBrowser().subscribe(function () {
                var focusEl = elRef.nativeElement.querySelector('[tabindex="0"]');
                if (focusEl) {
                    focusEl.focus();
                }
            });
        });
    };
    DatepickerFocusService.prototype.focusInput = function (element) {
        var _this = this;
        this._ngZone.runOutsideAngular(function () { return _this.ngZoneIsStableInBrowser().subscribe(function () { return element.focus(); }); });
    };
    DatepickerFocusService.prototype.elementIsFocused = function (element) {
        return isPlatformBrowser(this.platformId) && document.activeElement === element;
    };
    DatepickerFocusService.prototype.ngZoneIsStableInBrowser = function () {
        var _this = this;
        // Credit: Material: https://github.com/angular/material2/blob/master/src/lib/datepicker/calendar.ts
        return this._ngZone.onStable.asObservable().pipe(first(), filter(function () { return isPlatformBrowser(_this.platformId); }));
    };
    DatepickerFocusService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(1, Inject(PLATFORM_ID)),
        tslib_1.__metadata("design:paramtypes", [NgZone, Object])
    ], DatepickerFocusService);
    return DatepickerFocusService;
}());
export { DatepickerFocusService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1mb2N1cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvZGF0ZXBpY2tlci9wcm92aWRlcnMvZGF0ZXBpY2tlci1mb2N1cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFjLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRS9DOztHQUVHO0FBRUg7SUFDRSxnQ0FBb0IsT0FBZSxFQUErQixVQUFrQjtRQUFoRSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQStCLGVBQVUsR0FBVixVQUFVLENBQVE7SUFBRyxDQUFDO0lBRXhGLDBDQUFTLEdBQVQsVUFBVSxLQUFpQjtRQUEzQixpQkFTQztRQVJDLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7WUFDN0IsS0FBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUN2QyxJQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNwRSxJQUFJLE9BQU8sRUFBRTtvQkFDWCxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ2pCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwyQ0FBVSxHQUFWLFVBQVcsT0FBeUI7UUFBcEMsaUJBRUM7UUFEQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBZixDQUFlLENBQUMsRUFBL0QsQ0FBK0QsQ0FBQyxDQUFDO0lBQ3hHLENBQUM7SUFFRCxpREFBZ0IsR0FBaEIsVUFBaUIsT0FBeUI7UUFDeEMsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsS0FBSyxPQUFPLENBQUM7SUFDbEYsQ0FBQztJQUVPLHdEQUF1QixHQUEvQjtRQUFBLGlCQUdDO1FBRkMsb0dBQW9HO1FBQ3BHLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLE1BQU0sQ0FBQyxjQUFNLE9BQUEsaUJBQWlCLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxFQUFsQyxDQUFrQyxDQUFDLENBQUMsQ0FBQztJQUM5RyxDQUFDO0lBekJVLHNCQUFzQjtRQURsQyxVQUFVLEVBQUU7UUFFMkIsbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO2lEQUE1QixNQUFNLEVBQTJDLE1BQU07T0FEekUsc0JBQXNCLENBMEJsQztJQUFELDZCQUFDO0NBQUEsQUExQkQsSUEwQkM7U0ExQlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZpcnN0LCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIGZvY3VzZXMgdGhlIGRheSB0aGF0IGlzIGZvY3VzYWJsZSBpbiB0aGUgY2FsZW5kYXIuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRlcGlja2VyRm9jdXNTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0KSB7fVxuXG4gIGZvY3VzQ2VsbChlbFJlZjogRWxlbWVudFJlZik6IHZvaWQge1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm5nWm9uZUlzU3RhYmxlSW5Ccm93c2VyKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgY29uc3QgZm9jdXNFbCA9IGVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignW3RhYmluZGV4PVwiMFwiXScpO1xuICAgICAgICBpZiAoZm9jdXNFbCkge1xuICAgICAgICAgIGZvY3VzRWwuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmb2N1c0lucHV0KGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gdGhpcy5uZ1pvbmVJc1N0YWJsZUluQnJvd3NlcigpLnN1YnNjcmliZSgoKSA9PiBlbGVtZW50LmZvY3VzKCkpKTtcbiAgfVxuXG4gIGVsZW1lbnRJc0ZvY3VzZWQoZWxlbWVudDogSFRNTElucHV0RWxlbWVudCkge1xuICAgIHJldHVybiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGVsZW1lbnQ7XG4gIH1cblxuICBwcml2YXRlIG5nWm9uZUlzU3RhYmxlSW5Ccm93c2VyKCkge1xuICAgIC8vIENyZWRpdDogTWF0ZXJpYWw6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9ibG9iL21hc3Rlci9zcmMvbGliL2RhdGVwaWNrZXIvY2FsZW5kYXIudHNcbiAgICByZXR1cm4gdGhpcy5fbmdab25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpLnBpcGUoZmlyc3QoKSwgZmlsdGVyKCgpID0+IGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpKTtcbiAgfVxufVxuIl19