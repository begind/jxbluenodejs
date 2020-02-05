import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable, InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';
var activeCounter = 0;
export var IF_ACTIVE_ID = new InjectionToken('IF_ACTIVE_ID');
export function tokenFactory() {
    return ++activeCounter;
}
export var IF_ACTIVE_ID_PROVIDER = {
    provide: IF_ACTIVE_ID,
    useFactory: tokenFactory,
};
var IfActiveService = /** @class */ (function () {
    function IfActiveService() {
        /********
         * @property _currentChange
         *
         * @description
         * A RXJS Subject that updates and provides subscriptions to for the current current state of a component template
         * implemting the IfActive structural directive.
         *
         */
        this._currentChange = new Subject();
    }
    Object.defineProperty(IfActiveService.prototype, "currentChange", {
        /*********
         *
         * @description
         * A getter function that provides an observable for the _current Subject.
         *
         */
        get: function () {
            return this._currentChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IfActiveService.prototype, "current", {
        /*********
         *
         * @description
         * A getter that returns the current value of this IfActive instance.
         * @returns
         */
        get: function () {
            return this._current;
        },
        /*********
         *
         * @description
         * A setter function that updates the current state of _current for this instance of IfActive structural directive.
         * And, broadcasts the new value to all subscribers.
         *
         * @param value
         */
        set: function (value) {
            if (this._current !== value) {
                this._current = value;
                this._currentChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    IfActiveService = tslib_1.__decorate([
        Injectable()
        /*********
         * @class IfActiveService
         *
         * @description
         * An injectable service used by IfActive structural directives and the components that implement IfActive in their
         * templates. It holds the value of the current state and provides an Observable that both the directive and the
         * implementing component can subscribe to in order to take action on current value changes.
         *
         */
    ], IfActiveService);
    return IfActiveService;
}());
export { IfActiveService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtYWN0aXZlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9jb25kaXRpb25hbC9pZi1hY3RpdmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO0FBRXRCLE1BQU0sQ0FBQyxJQUFNLFlBQVksR0FBRyxJQUFJLGNBQWMsQ0FBUyxjQUFjLENBQUMsQ0FBQztBQUV2RSxNQUFNLFVBQVUsWUFBWTtJQUMxQixPQUFPLEVBQUUsYUFBYSxDQUFDO0FBQ3pCLENBQUM7QUFFRCxNQUFNLENBQUMsSUFBTSxxQkFBcUIsR0FBRztJQUNuQyxPQUFPLEVBQUUsWUFBWTtJQUNyQixVQUFVLEVBQUUsWUFBWTtDQUN6QixDQUFDO0FBYUY7SUFYQTtRQVlFOzs7Ozs7O1dBT0c7UUFDSyxtQkFBYyxHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO0lBNENsRSxDQUFDO0lBNUJDLHNCQUFXLDBDQUFhO1FBTnhCOzs7OztXQUtHO2FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDNUMsQ0FBQzs7O09BQUE7SUFVRCxzQkFBVyxvQ0FBTztRQU9sQjs7Ozs7V0FLRzthQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7UUF2QkQ7Ozs7Ozs7V0FPRzthQUNILFVBQW1CLEtBQWE7WUFDOUIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTtnQkFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2pDO1FBQ0gsQ0FBQzs7O09BQUE7SUExQ1UsZUFBZTtRQVgzQixVQUFVLEVBQUU7UUFFYjs7Ozs7Ozs7V0FRRztPQUNVLGVBQWUsQ0FxRDNCO0lBQUQsc0JBQUM7Q0FBQSxBQXJERCxJQXFEQztTQXJEWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxubGV0IGFjdGl2ZUNvdW50ZXIgPSAwO1xuXG5leHBvcnQgY29uc3QgSUZfQUNUSVZFX0lEID0gbmV3IEluamVjdGlvblRva2VuPG51bWJlcj4oJ0lGX0FDVElWRV9JRCcpO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9rZW5GYWN0b3J5KCkge1xuICByZXR1cm4gKythY3RpdmVDb3VudGVyO1xufVxuXG5leHBvcnQgY29uc3QgSUZfQUNUSVZFX0lEX1BST1ZJREVSID0ge1xuICBwcm92aWRlOiBJRl9BQ1RJVkVfSUQsXG4gIHVzZUZhY3Rvcnk6IHRva2VuRmFjdG9yeSxcbn07XG5cbkBJbmplY3RhYmxlKClcblxuLyoqKioqKioqKlxuICogQGNsYXNzIElmQWN0aXZlU2VydmljZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQW4gaW5qZWN0YWJsZSBzZXJ2aWNlIHVzZWQgYnkgSWZBY3RpdmUgc3RydWN0dXJhbCBkaXJlY3RpdmVzIGFuZCB0aGUgY29tcG9uZW50cyB0aGF0IGltcGxlbWVudCBJZkFjdGl2ZSBpbiB0aGVpclxuICogdGVtcGxhdGVzLiBJdCBob2xkcyB0aGUgdmFsdWUgb2YgdGhlIGN1cnJlbnQgc3RhdGUgYW5kIHByb3ZpZGVzIGFuIE9ic2VydmFibGUgdGhhdCBib3RoIHRoZSBkaXJlY3RpdmUgYW5kIHRoZVxuICogaW1wbGVtZW50aW5nIGNvbXBvbmVudCBjYW4gc3Vic2NyaWJlIHRvIGluIG9yZGVyIHRvIHRha2UgYWN0aW9uIG9uIGN1cnJlbnQgdmFsdWUgY2hhbmdlcy5cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBJZkFjdGl2ZVNlcnZpY2Uge1xuICAvKioqKioqKipcbiAgICogQHByb3BlcnR5IF9jdXJyZW50Q2hhbmdlXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBIFJYSlMgU3ViamVjdCB0aGF0IHVwZGF0ZXMgYW5kIHByb3ZpZGVzIHN1YnNjcmlwdGlvbnMgdG8gZm9yIHRoZSBjdXJyZW50IGN1cnJlbnQgc3RhdGUgb2YgYSBjb21wb25lbnQgdGVtcGxhdGVcbiAgICogaW1wbGVtdGluZyB0aGUgSWZBY3RpdmUgc3RydWN0dXJhbCBkaXJlY3RpdmUuXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50Q2hhbmdlOiBTdWJqZWN0PG51bWJlcj4gPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG5cbiAgLyoqKioqKioqKlxuICAgKiBAcHJvcGVydHkgX2N1cnJlbnRcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgcHJvcGVydHkgaG9sZGluZyB0aGUgY3VycmVudCB2YWx1ZSBmb3IgY3VycmVudC9jbG9zZWQgc3RhdGUgb2YgYW4gSWZBY3RpdmUgc3RydWN0dXJhbCBkaXJlY3RpdmUuXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50OiBudW1iZXI7XG5cbiAgLyoqKioqKioqKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQSBnZXR0ZXIgZnVuY3Rpb24gdGhhdCBwcm92aWRlcyBhbiBvYnNlcnZhYmxlIGZvciB0aGUgX2N1cnJlbnQgU3ViamVjdC5cbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgY3VycmVudENoYW5nZSgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50Q2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqKioqKioqKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQSBzZXR0ZXIgZnVuY3Rpb24gdGhhdCB1cGRhdGVzIHRoZSBjdXJyZW50IHN0YXRlIG9mIF9jdXJyZW50IGZvciB0aGlzIGluc3RhbmNlIG9mIElmQWN0aXZlIHN0cnVjdHVyYWwgZGlyZWN0aXZlLlxuICAgKiBBbmQsIGJyb2FkY2FzdHMgdGhlIG5ldyB2YWx1ZSB0byBhbGwgc3Vic2NyaWJlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgcHVibGljIHNldCBjdXJyZW50KHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fY3VycmVudCAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2N1cnJlbnRDaGFuZ2UubmV4dCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqKioqKioqKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQSBnZXR0ZXIgdGhhdCByZXR1cm5zIHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoaXMgSWZBY3RpdmUgaW5zdGFuY2UuXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1cnJlbnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgfVxufVxuIl19