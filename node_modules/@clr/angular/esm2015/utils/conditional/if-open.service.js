import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let IfOpenService = 
/*********
 * @class IfOpenService
 *
 * @description
 * An injectable service used by IfOpen structural directives and the components that implemnt IfOpen in their
 * templates. It holds the value of the open state and provides an Observable that both the directive and the
 * implementing component can subscribe to in order to take action on open value changes.
 *
 */
class IfOpenService {
    constructor() {
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
    /*********
     *
     * @description
     * A getter function that provides an observable for the _opened Subject.
     *
     */
    get openChange() {
        return this._openChange.asObservable();
    }
    /*********
     *
     * @description
     * A setter function that updates the current state of _open for this instance of IfOpen structural directive. And,
     * broadcasts the new value to all subscribers.
     *
     * @param value
     */
    set open(value) {
        value = !!value;
        if (this._open !== value) {
            this._open = value;
            this._openChange.next(value);
        }
    }
    /*********
     *
     * @description
     * A getter that returns the current value of this IfOpen instance.
     *
     */
    get open() {
        return this._open;
    }
    toggleWithEvent(event) {
        this.originalEvent = event;
        this.open = !this.open;
        delete this.originalEvent;
    }
    get ignoredElementChange() {
        return this._ignoredElementChange.asObservable();
    }
    registerIgnoredElement(element) {
        this._ignoredElementChange.next(element);
    }
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
export { IfOpenService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtb3Blbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvY29uZGl0aW9uYWwvaWYtb3Blbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBYS9CLElBQWEsYUFBYTtBQVQxQjs7Ozs7Ozs7R0FRRztBQUNILE1BQWEsYUFBYTtJQVgxQjtRQVlFOzs7Ozs7V0FNRztRQUNLLGdCQUFXLEdBQXFCLElBQUksT0FBTyxFQUFXLENBQUM7UUEwRC9EOzs7V0FHRztRQUNLLDBCQUFxQixHQUF3QixJQUFJLE9BQU8sRUFBYyxDQUFDO0lBU2pGLENBQUM7SUE1REM7Ozs7O09BS0c7SUFDSCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsSUFBVyxJQUFJLENBQUMsS0FBYztRQUM1QixLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNoQixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsSUFBVyxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFPTSxlQUFlLENBQUMsS0FBVTtRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQztJQVFELElBQUksb0JBQW9CO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFRCxzQkFBc0IsQ0FBQyxPQUFtQjtRQUN4QyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDRixDQUFBO0FBL0VZLGFBQWE7SUFYekIsVUFBVSxFQUFFO0lBRWI7Ozs7Ozs7O09BUUc7R0FDVSxhQUFhLENBK0V6QjtTQS9FWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5cbi8qKioqKioqKipcbiAqIEBjbGFzcyBJZk9wZW5TZXJ2aWNlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBbiBpbmplY3RhYmxlIHNlcnZpY2UgdXNlZCBieSBJZk9wZW4gc3RydWN0dXJhbCBkaXJlY3RpdmVzIGFuZCB0aGUgY29tcG9uZW50cyB0aGF0IGltcGxlbW50IElmT3BlbiBpbiB0aGVpclxuICogdGVtcGxhdGVzLiBJdCBob2xkcyB0aGUgdmFsdWUgb2YgdGhlIG9wZW4gc3RhdGUgYW5kIHByb3ZpZGVzIGFuIE9ic2VydmFibGUgdGhhdCBib3RoIHRoZSBkaXJlY3RpdmUgYW5kIHRoZVxuICogaW1wbGVtZW50aW5nIGNvbXBvbmVudCBjYW4gc3Vic2NyaWJlIHRvIGluIG9yZGVyIHRvIHRha2UgYWN0aW9uIG9uIG9wZW4gdmFsdWUgY2hhbmdlcy5cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBJZk9wZW5TZXJ2aWNlIHtcbiAgLyoqKioqKioqXG4gICAqIEBwcm9wZXJ0eSBfb3BlbkNoYW5nZVxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQSBSWEpTIFN1YmplY3QgdGhhdCB1cGRhdGVzIGFuZCBwcm92aWRlcyBzdWJzY3JpcHRpb25zIHRvIGZvciB0aGUgY3VycmVudCBvcGVuIHN0YXRlIG9mIGEgY29tcG9uZW50IHRlbXBsYXRlXG4gICAqIGltcGxlbXRpbmcgdGhlIElmT3BlbiBzdHJ1Y3R1cmFsIGRpcmVjdGl2ZS5cbiAgICovXG4gIHByaXZhdGUgX29wZW5DaGFuZ2U6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIC8qKioqKioqKipcbiAgICogQHByb3BlcnR5IF9vcGVuXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBIHByb3BlcnR5IGhvbGRpbmcgdGhlIGN1cnJlbnQgdmFsdWUgZm9yIG9wZW4vY2xvc2VkIHN0YXRlIG9mIGFuIElmT3BlbiBzdHJ1Y3R1cmFsIGRpcmVjdGl2ZS5cbiAgICpcbiAgICovXG4gIHByaXZhdGUgX29wZW46IGJvb2xlYW47XG5cbiAgLyoqKioqKioqKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQSBnZXR0ZXIgZnVuY3Rpb24gdGhhdCBwcm92aWRlcyBhbiBvYnNlcnZhYmxlIGZvciB0aGUgX29wZW5lZCBTdWJqZWN0LlxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBvcGVuQ2hhbmdlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9vcGVuQ2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqKioqKioqKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQSBzZXR0ZXIgZnVuY3Rpb24gdGhhdCB1cGRhdGVzIHRoZSBjdXJyZW50IHN0YXRlIG9mIF9vcGVuIGZvciB0aGlzIGluc3RhbmNlIG9mIElmT3BlbiBzdHJ1Y3R1cmFsIGRpcmVjdGl2ZS4gQW5kLFxuICAgKiBicm9hZGNhc3RzIHRoZSBuZXcgdmFsdWUgdG8gYWxsIHN1YnNjcmliZXJzLlxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHB1YmxpYyBzZXQgb3Blbih2YWx1ZTogYm9vbGVhbikge1xuICAgIHZhbHVlID0gISF2YWx1ZTtcbiAgICBpZiAodGhpcy5fb3BlbiAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX29wZW4gPSB2YWx1ZTtcbiAgICAgIHRoaXMuX29wZW5DaGFuZ2UubmV4dCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqKioqKioqKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQSBnZXR0ZXIgdGhhdCByZXR1cm5zIHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoaXMgSWZPcGVuIGluc3RhbmNlLlxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBvcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9vcGVuO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvbWV0aW1lcywgd2UgbmVlZCB0byByZW1lbWJlciB0aGUgZXZlbnQgdGhhdCB0cmlnZ2VyZWQgdGhlIHRvZ2dsaW5nIHRvIGF2b2lkIGxvb3BzLlxuICAgKiBUaGlzIGlzIGZvciBpbnN0YW5jZSB0aGUgY2FzZSBvZiBjb21wb25lbnRzIHRoYXQgb3BlbiBvbiBhIGNsaWNrLCBidXQgY2xvc2Ugb24gYSBjbGljayBvdXRzaWRlLlxuICAgKi9cbiAgcHVibGljIG9yaWdpbmFsRXZlbnQ6IGFueTtcbiAgcHVibGljIHRvZ2dsZVdpdGhFdmVudChldmVudDogYW55KSB7XG4gICAgdGhpcy5vcmlnaW5hbEV2ZW50ID0gZXZlbnQ7XG4gICAgdGhpcy5vcGVuID0gIXRoaXMub3BlbjtcbiAgICBkZWxldGUgdGhpcy5vcmlnaW5hbEV2ZW50O1xuICB9XG5cbiAgLyoqXG4gICAqICBQb3BvdmVycyBtaWdodCBuZWVkIHRvIGlnbm9yZSBjbGljayBldmVudHMgb24gYW4gZWxlbWVudFxuICAgKiAgKGVnOiBwb3BvdmVyIG9wZW5zIG9uIGZvY3VzIG9uIGFuIGlucHV0IGZpZWxkLiBDbGlja3Mgc2hvdWxkIGJlIGlnbm9yZWQgaW4gdGhpcyBjYXNlKVxuICAgKi9cbiAgcHJpdmF0ZSBfaWdub3JlZEVsZW1lbnRDaGFuZ2U6IFN1YmplY3Q8RWxlbWVudFJlZj4gPSBuZXcgU3ViamVjdDxFbGVtZW50UmVmPigpO1xuXG4gIGdldCBpZ25vcmVkRWxlbWVudENoYW5nZSgpOiBPYnNlcnZhYmxlPEVsZW1lbnRSZWY+IHtcbiAgICByZXR1cm4gdGhpcy5faWdub3JlZEVsZW1lbnRDaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICByZWdpc3Rlcklnbm9yZWRFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9pZ25vcmVkRWxlbWVudENoYW5nZS5uZXh0KGVsZW1lbnQpO1xuICB9XG59XG4iXX0=