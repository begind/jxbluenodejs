import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var IfOpenService = /** @class */ (function () {
    function IfOpenService() {
        /********
         * @property _openChange
         *
         * @description
         * A RXJS Subject that updates and provides subscriptions to for the current open state of a component template
         * implemting the IfOpen structural directive.
         */
        this._openChange = new Subject();
        /**
         *  Popovers might need to ignore click events on an element
         *  (eg: popover opens on focus on an input field. Clicks should be ignored in this case)
         */
        this._ignoredElementChange = new Subject();
    }
    Object.defineProperty(IfOpenService.prototype, "openChange", {
        /*********
         *
         * @description
         * A getter function that provides an observable for the _opened Subject.
         *
         */
        get: function () {
            return this._openChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IfOpenService.prototype, "open", {
        /*********
         *
         * @description
         * A getter that returns the current value of this IfOpen instance.
         *
         */
        get: function () {
            return this._open;
        },
        /*********
         *
         * @description
         * A setter function that updates the current state of _open for this instance of IfOpen structural directive. And,
         * broadcasts the new value to all subscribers.
         *
         * @param value
         */
        set: function (value) {
            value = !!value;
            if (this._open !== value) {
                this._open = value;
                this._openChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    IfOpenService.prototype.toggleWithEvent = function (event) {
        this.originalEvent = event;
        this.open = !this.open;
        delete this.originalEvent;
    };
    Object.defineProperty(IfOpenService.prototype, "ignoredElementChange", {
        get: function () {
            return this._ignoredElementChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    IfOpenService.prototype.registerIgnoredElement = function (element) {
        this._ignoredElementChange.next(element);
    };
    IfOpenService = tslib_1.__decorate([
        Injectable()
        /*********
         * @class IfOpenService
         *
         * @description
         * An injectable service used by IfOpen structural directives and the components that implemnt IfOpen in their
         * templates. It holds the value of the open state and provides an Observable that both the directive and the
         * implementing component can subscribe to in order to take action on open value changes.
         *
         */
    ], IfOpenService);
    return IfOpenService;
}());
export { IfOpenService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtb3Blbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvY29uZGl0aW9uYWwvaWYtb3Blbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBYS9CO0lBWEE7UUFZRTs7Ozs7O1dBTUc7UUFDSyxnQkFBVyxHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDO1FBMEQvRDs7O1dBR0c7UUFDSywwQkFBcUIsR0FBd0IsSUFBSSxPQUFPLEVBQWMsQ0FBQztJQVNqRixDQUFDO0lBdERDLHNCQUFXLHFDQUFVO1FBTnJCOzs7OztXQUtHO2FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFVRCxzQkFBVywrQkFBSTtRQVFmOzs7OztXQUtHO2FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQztRQXhCRDs7Ozs7OztXQU9HO2FBQ0gsVUFBZ0IsS0FBYztZQUM1QixLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNoQixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO2dCQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUI7UUFDSCxDQUFDOzs7T0FBQTtJQWlCTSx1Q0FBZSxHQUF0QixVQUF1QixLQUFVO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBUUQsc0JBQUksK0NBQW9CO2FBQXhCO1lBQ0UsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkQsQ0FBQzs7O09BQUE7SUFFRCw4Q0FBc0IsR0FBdEIsVUFBdUIsT0FBbUI7UUFDeEMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBOUVVLGFBQWE7UUFYekIsVUFBVSxFQUFFO1FBRWI7Ozs7Ozs7O1dBUUc7T0FDVSxhQUFhLENBK0V6QjtJQUFELG9CQUFDO0NBQUEsQUEvRUQsSUErRUM7U0EvRVksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuXG4vKioqKioqKioqXG4gKiBAY2xhc3MgSWZPcGVuU2VydmljZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQW4gaW5qZWN0YWJsZSBzZXJ2aWNlIHVzZWQgYnkgSWZPcGVuIHN0cnVjdHVyYWwgZGlyZWN0aXZlcyBhbmQgdGhlIGNvbXBvbmVudHMgdGhhdCBpbXBsZW1udCBJZk9wZW4gaW4gdGhlaXJcbiAqIHRlbXBsYXRlcy4gSXQgaG9sZHMgdGhlIHZhbHVlIG9mIHRoZSBvcGVuIHN0YXRlIGFuZCBwcm92aWRlcyBhbiBPYnNlcnZhYmxlIHRoYXQgYm90aCB0aGUgZGlyZWN0aXZlIGFuZCB0aGVcbiAqIGltcGxlbWVudGluZyBjb21wb25lbnQgY2FuIHN1YnNjcmliZSB0byBpbiBvcmRlciB0byB0YWtlIGFjdGlvbiBvbiBvcGVuIHZhbHVlIGNoYW5nZXMuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgSWZPcGVuU2VydmljZSB7XG4gIC8qKioqKioqKlxuICAgKiBAcHJvcGVydHkgX29wZW5DaGFuZ2VcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgUlhKUyBTdWJqZWN0IHRoYXQgdXBkYXRlcyBhbmQgcHJvdmlkZXMgc3Vic2NyaXB0aW9ucyB0byBmb3IgdGhlIGN1cnJlbnQgb3BlbiBzdGF0ZSBvZiBhIGNvbXBvbmVudCB0ZW1wbGF0ZVxuICAgKiBpbXBsZW10aW5nIHRoZSBJZk9wZW4gc3RydWN0dXJhbCBkaXJlY3RpdmUuXG4gICAqL1xuICBwcml2YXRlIF9vcGVuQ2hhbmdlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAvKioqKioqKioqXG4gICAqIEBwcm9wZXJ0eSBfb3BlblxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQSBwcm9wZXJ0eSBob2xkaW5nIHRoZSBjdXJyZW50IHZhbHVlIGZvciBvcGVuL2Nsb3NlZCBzdGF0ZSBvZiBhbiBJZk9wZW4gc3RydWN0dXJhbCBkaXJlY3RpdmUuXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9vcGVuOiBib29sZWFuO1xuXG4gIC8qKioqKioqKipcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgZ2V0dGVyIGZ1bmN0aW9uIHRoYXQgcHJvdmlkZXMgYW4gb2JzZXJ2YWJsZSBmb3IgdGhlIF9vcGVuZWQgU3ViamVjdC5cbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgb3BlbkNoYW5nZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fb3BlbkNoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKioqKioqKipcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgc2V0dGVyIGZ1bmN0aW9uIHRoYXQgdXBkYXRlcyB0aGUgY3VycmVudCBzdGF0ZSBvZiBfb3BlbiBmb3IgdGhpcyBpbnN0YW5jZSBvZiBJZk9wZW4gc3RydWN0dXJhbCBkaXJlY3RpdmUuIEFuZCxcbiAgICogYnJvYWRjYXN0cyB0aGUgbmV3IHZhbHVlIHRvIGFsbCBzdWJzY3JpYmVycy5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBwdWJsaWMgc2V0IG9wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgaWYgKHRoaXMuX29wZW4gIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9vcGVuID0gdmFsdWU7XG4gICAgICB0aGlzLl9vcGVuQ2hhbmdlLm5leHQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKioqKioqKipcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgZ2V0dGVyIHRoYXQgcmV0dXJucyB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGlzIElmT3BlbiBpbnN0YW5jZS5cbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgb3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fb3BlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTb21ldGltZXMsIHdlIG5lZWQgdG8gcmVtZW1iZXIgdGhlIGV2ZW50IHRoYXQgdHJpZ2dlcmVkIHRoZSB0b2dnbGluZyB0byBhdm9pZCBsb29wcy5cbiAgICogVGhpcyBpcyBmb3IgaW5zdGFuY2UgdGhlIGNhc2Ugb2YgY29tcG9uZW50cyB0aGF0IG9wZW4gb24gYSBjbGljaywgYnV0IGNsb3NlIG9uIGEgY2xpY2sgb3V0c2lkZS5cbiAgICovXG4gIHB1YmxpYyBvcmlnaW5hbEV2ZW50OiBhbnk7XG4gIHB1YmxpYyB0b2dnbGVXaXRoRXZlbnQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMub3JpZ2luYWxFdmVudCA9IGV2ZW50O1xuICAgIHRoaXMub3BlbiA9ICF0aGlzLm9wZW47XG4gICAgZGVsZXRlIHRoaXMub3JpZ2luYWxFdmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiAgUG9wb3ZlcnMgbWlnaHQgbmVlZCB0byBpZ25vcmUgY2xpY2sgZXZlbnRzIG9uIGFuIGVsZW1lbnRcbiAgICogIChlZzogcG9wb3ZlciBvcGVucyBvbiBmb2N1cyBvbiBhbiBpbnB1dCBmaWVsZC4gQ2xpY2tzIHNob3VsZCBiZSBpZ25vcmVkIGluIHRoaXMgY2FzZSlcbiAgICovXG4gIHByaXZhdGUgX2lnbm9yZWRFbGVtZW50Q2hhbmdlOiBTdWJqZWN0PEVsZW1lbnRSZWY+ID0gbmV3IFN1YmplY3Q8RWxlbWVudFJlZj4oKTtcblxuICBnZXQgaWdub3JlZEVsZW1lbnRDaGFuZ2UoKTogT2JzZXJ2YWJsZTxFbGVtZW50UmVmPiB7XG4gICAgcmV0dXJuIHRoaXMuX2lnbm9yZWRFbGVtZW50Q2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcmVnaXN0ZXJJZ25vcmVkRWxlbWVudChlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5faWdub3JlZEVsZW1lbnRDaGFuZ2UubmV4dChlbGVtZW50KTtcbiAgfVxufVxuIl19