/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
/**
 * This service manages which view is visible in the datepicker popover.
 */
let ViewManagerService = class ViewManagerService {
    /**
     * This service manages which view is visible in the datepicker popover.
     */
    constructor() {
        this._currentView = "DAYVIEW" /* DAYVIEW */;
    }
    get isDayView() {
        return this._currentView === "DAYVIEW" /* DAYVIEW */;
    }
    get isYearView() {
        return this._currentView === "YEARVIEW" /* YEARVIEW */;
    }
    get isMonthView() {
        return this._currentView === "MONTHVIEW" /* MONTHVIEW */;
    }
    changeToMonthView() {
        this._currentView = "MONTHVIEW" /* MONTHVIEW */;
    }
    changeToYearView() {
        this._currentView = "YEARVIEW" /* YEARVIEW */;
    }
    changeToDayView() {
        this._currentView = "DAYVIEW" /* DAYVIEW */;
    }
};
ViewManagerService = tslib_1.__decorate([
    Injectable()
], ViewManagerService);
export { ViewManagerService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1tYW5hZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL3Byb3ZpZGVycy92aWV3LW1hbmFnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRM0M7O0dBRUc7QUFFSCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQUovQjs7T0FFRztJQUNIO1FBRVUsaUJBQVksMkJBQWtEO0lBeUJ4RSxDQUFDO0lBdkJDLElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFlBQVksNEJBQStCLENBQUM7SUFDMUQsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFlBQVksOEJBQWdDLENBQUM7SUFDM0QsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksZ0NBQWlDLENBQUM7SUFDNUQsQ0FBQztJQUVELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxZQUFZLDhCQUErQixDQUFDO0lBQ25ELENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxJQUFJLENBQUMsWUFBWSw0QkFBOEIsQ0FBQztJQUNsRCxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxZQUFZLDBCQUE2QixDQUFDO0lBQ2pELENBQUM7Q0FDRixDQUFBO0FBMUJZLGtCQUFrQjtJQUQ5QixVQUFVLEVBQUU7R0FDQSxrQkFBa0IsQ0EwQjlCO1NBMUJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBlbnVtIERhdGVwaWNrZXJWaWV3RW51bSB7XG4gIE1PTlRIVklFVyA9ICdNT05USFZJRVcnLFxuICBZRUFSVklFVyA9ICdZRUFSVklFVycsXG4gIERBWVZJRVcgPSAnREFZVklFVycsXG59XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIG1hbmFnZXMgd2hpY2ggdmlldyBpcyB2aXNpYmxlIGluIHRoZSBkYXRlcGlja2VyIHBvcG92ZXIuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWaWV3TWFuYWdlclNlcnZpY2Uge1xuICBwcml2YXRlIF9jdXJyZW50VmlldzogRGF0ZXBpY2tlclZpZXdFbnVtID0gRGF0ZXBpY2tlclZpZXdFbnVtLkRBWVZJRVc7XG5cbiAgZ2V0IGlzRGF5VmlldygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFZpZXcgPT09IERhdGVwaWNrZXJWaWV3RW51bS5EQVlWSUVXO1xuICB9XG5cbiAgZ2V0IGlzWWVhclZpZXcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRWaWV3ID09PSBEYXRlcGlja2VyVmlld0VudW0uWUVBUlZJRVc7XG4gIH1cblxuICBnZXQgaXNNb250aFZpZXcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRWaWV3ID09PSBEYXRlcGlja2VyVmlld0VudW0uTU9OVEhWSUVXO1xuICB9XG5cbiAgY2hhbmdlVG9Nb250aFZpZXcoKTogdm9pZCB7XG4gICAgdGhpcy5fY3VycmVudFZpZXcgPSBEYXRlcGlja2VyVmlld0VudW0uTU9OVEhWSUVXO1xuICB9XG5cbiAgY2hhbmdlVG9ZZWFyVmlldygpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXJyZW50VmlldyA9IERhdGVwaWNrZXJWaWV3RW51bS5ZRUFSVklFVztcbiAgfVxuXG4gIGNoYW5nZVRvRGF5VmlldygpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXJyZW50VmlldyA9IERhdGVwaWNrZXJWaWV3RW51bS5EQVlWSUVXO1xuICB9XG59XG4iXX0=