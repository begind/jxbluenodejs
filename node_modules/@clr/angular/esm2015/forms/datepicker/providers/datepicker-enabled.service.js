/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { DATEPICKER_ENABLE_BREAKPOINT } from '../../../utils/breakpoints/breakpoints';
import { MOBILE_USERAGENT_REGEX } from '../utils/constants';
let DatepickerEnabledService = class DatepickerEnabledService {
    constructor(_document) {
        this._document = _document;
        this._isUserAgentMobile = false;
        if (this._document) {
            this._isUserAgentMobile = MOBILE_USERAGENT_REGEX.test(_document.defaultView.navigator.userAgent);
            this._innerWidth = _document.defaultView.innerWidth;
        }
    }
    /**
     * Returns if the calendar should be active or not.
     * If the user agent is mobile and the screen width is less than DATEPICKER_ACTIVE_BREAKPOINT
     * then the calendar is inactive.
     */
    get isEnabled() {
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
        // What they recommend is:
        //"In summary, we recommend looking for the string 'Mobi'
        // anywhere in the User Agent to detect a mobile device."
        if (this._document) {
            if (this._innerWidth < DATEPICKER_ENABLE_BREAKPOINT && this._isUserAgentMobile) {
                return false;
            }
        }
        return true;
    }
};
DatepickerEnabledService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(DOCUMENT)),
    tslib_1.__metadata("design:paramtypes", [Object])
], DatepickerEnabledService);
export { DatepickerEnabledService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1lbmFibGVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL3Byb3ZpZGVycy9kYXRlcGlja2VyLWVuYWJsZWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUN0RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUc1RCxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtJQUNuQyxZQUFzQyxTQUFjO1FBQWQsY0FBUyxHQUFULFNBQVMsQ0FBSztRQU81Qyx1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUFOMUMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakcsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztTQUNyRDtJQUNILENBQUM7SUFLRDs7OztPQUlHO0lBQ0gsSUFBSSxTQUFTO1FBQ1gsMkZBQTJGO1FBQzNGLDBCQUEwQjtRQUMxQix5REFBeUQ7UUFDekQseURBQXlEO1FBQ3pELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsNEJBQTRCLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUM5RSxPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRixDQUFBO0FBNUJZLHdCQUF3QjtJQURwQyxVQUFVLEVBQUU7SUFFRSxtQkFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7O0dBRGxCLHdCQUF3QixDQTRCcEM7U0E1Qlksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgREFURVBJQ0tFUl9FTkFCTEVfQlJFQUtQT0lOVCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2JyZWFrcG9pbnRzL2JyZWFrcG9pbnRzJztcbmltcG9ydCB7IE1PQklMRV9VU0VSQUdFTlRfUkVHRVggfSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSkge1xuICAgIGlmICh0aGlzLl9kb2N1bWVudCkge1xuICAgICAgdGhpcy5faXNVc2VyQWdlbnRNb2JpbGUgPSBNT0JJTEVfVVNFUkFHRU5UX1JFR0VYLnRlc3QoX2RvY3VtZW50LmRlZmF1bHRWaWV3Lm5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgdGhpcy5faW5uZXJXaWR0aCA9IF9kb2N1bWVudC5kZWZhdWx0Vmlldy5pbm5lcldpZHRoO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2lzVXNlckFnZW50TW9iaWxlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2lubmVyV2lkdGg6IG51bWJlcjtcblxuICAvKipcbiAgICogUmV0dXJucyBpZiB0aGUgY2FsZW5kYXIgc2hvdWxkIGJlIGFjdGl2ZSBvciBub3QuXG4gICAqIElmIHRoZSB1c2VyIGFnZW50IGlzIG1vYmlsZSBhbmQgdGhlIHNjcmVlbiB3aWR0aCBpcyBsZXNzIHRoYW4gREFURVBJQ0tFUl9BQ1RJVkVfQlJFQUtQT0lOVFxuICAgKiB0aGVuIHRoZSBjYWxlbmRhciBpcyBpbmFjdGl2ZS5cbiAgICovXG4gIGdldCBpc0VuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRUUC9Ccm93c2VyX2RldGVjdGlvbl91c2luZ190aGVfdXNlcl9hZ2VudFxuICAgIC8vIFdoYXQgdGhleSByZWNvbW1lbmQgaXM6XG4gICAgLy9cIkluIHN1bW1hcnksIHdlIHJlY29tbWVuZCBsb29raW5nIGZvciB0aGUgc3RyaW5nICdNb2JpJ1xuICAgIC8vIGFueXdoZXJlIGluIHRoZSBVc2VyIEFnZW50IHRvIGRldGVjdCBhIG1vYmlsZSBkZXZpY2UuXCJcbiAgICBpZiAodGhpcy5fZG9jdW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLl9pbm5lcldpZHRoIDwgREFURVBJQ0tFUl9FTkFCTEVfQlJFQUtQT0lOVCAmJiB0aGlzLl9pc1VzZXJBZ2VudE1vYmlsZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iXX0=