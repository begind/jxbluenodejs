import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DatagridPropertyComparator } from '../built-in/comparators/datagrid-property-comparator';
import { FiltersProvider } from './filters';
import { Page } from './page';
import { Sort } from './sort';
import { StateDebouncer } from './state-debouncer.provider';
/**
 * This provider aggregates state changes from the various providers of the Datagrid
 */
var StateProvider = /** @class */ (function () {
    function StateProvider(filters, sort, page, debouncer) {
        var _this = this;
        this.filters = filters;
        this.sort = sort;
        this.page = page;
        this.debouncer = debouncer;
        /**
         * The Observable that lets other classes subscribe to global state changes
         */
        this.change = this.debouncer.change.pipe(map(function () { return _this.state; }));
    }
    Object.defineProperty(StateProvider.prototype, "state", {
        /*
           * By making this a getter, we open the possibility for a setter in the future.
           * It's been requested a couple times.
           */
        get: function () {
            var e_1, _a;
            var state = {};
            if (this.page.size > 0) {
                state.page = {
                    from: this.page.firstItem,
                    to: this.page.lastItem,
                    size: this.page.size,
                    current: this.page.current,
                };
            }
            if (this.sort.comparator) {
                if (this.sort.comparator instanceof DatagridPropertyComparator) {
                    /*
                             * Special case for the default object property comparator,
                             * we give the property name instead of the actual comparator.
                             */
                    state.sort = { by: this.sort.comparator.prop, reverse: this.sort.reverse };
                }
                else {
                    state.sort = { by: this.sort.comparator, reverse: this.sort.reverse };
                }
            }
            var activeFilters = this.filters.getActiveFilters();
            if (activeFilters.length > 0) {
                state.filters = [];
                try {
                    for (var activeFilters_1 = tslib_1.__values(activeFilters), activeFilters_1_1 = activeFilters_1.next(); !activeFilters_1_1.done; activeFilters_1_1 = activeFilters_1.next()) {
                        var filter = activeFilters_1_1.value;
                        if (filter.state) {
                            state.filters.push(filter.state);
                        }
                        else {
                            state.filters.push(filter);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (activeFilters_1_1 && !activeFilters_1_1.done && (_a = activeFilters_1.return)) _a.call(activeFilters_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return state;
        },
        enumerable: true,
        configurable: true
    });
    StateProvider = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [FiltersProvider,
            Sort,
            Page,
            StateDebouncer])
    ], StateProvider);
    return StateProvider;
}());
export { StateProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUucHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL3Byb3ZpZGVycy9zdGF0ZS5wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBR2xHLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDNUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM5QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzlCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU1RDs7R0FFRztBQUVIO0lBQ0UsdUJBQ1UsT0FBMkIsRUFDM0IsSUFBYSxFQUNiLElBQVUsRUFDVixTQUF5QjtRQUpuQyxpQkFLSTtRQUpNLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFNBQUksR0FBSixJQUFJLENBQVM7UUFDYixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsY0FBUyxHQUFULFNBQVMsQ0FBZ0I7UUFHbkM7O1dBRUc7UUFDSCxXQUFNLEdBQTZDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxLQUFLLEVBQVYsQ0FBVSxDQUFDLENBQUMsQ0FBQztJQUxsRyxDQUFDO0lBV0osc0JBQUksZ0NBQUs7UUFKVDs7O2FBR0s7YUFDTDs7WUFDRSxJQUFNLEtBQUssR0FBaUMsRUFBRSxDQUFDO1lBQy9DLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO2dCQUN0QixLQUFLLENBQUMsSUFBSSxHQUFHO29CQUNYLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7b0JBQ3pCLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7b0JBQ3RCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7b0JBQ3BCLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87aUJBQzNCLENBQUM7YUFDSDtZQUNELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLFlBQVksMEJBQTBCLEVBQUU7b0JBQzlEOzs7K0JBR1c7b0JBQ1gsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLEVBQUUsRUFBa0MsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUM3RztxQkFBTTtvQkFDTCxLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUN2RTthQUNGO1lBRUQsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3RELElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzVCLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDOztvQkFDbkIsS0FBcUIsSUFBQSxrQkFBQSxpQkFBQSxhQUFhLENBQUEsNENBQUEsdUVBQUU7d0JBQS9CLElBQU0sTUFBTSwwQkFBQTt3QkFDZixJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7NEJBQ2hCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDbEM7NkJBQU07NEJBQ0wsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQzVCO3FCQUNGOzs7Ozs7Ozs7YUFDRjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQzs7O09BQUE7SUFuRFUsYUFBYTtRQUR6QixVQUFVLEVBQUU7aURBR1EsZUFBZTtZQUNsQixJQUFJO1lBQ0osSUFBSTtZQUNDLGNBQWM7T0FMeEIsYUFBYSxDQW9EekI7SUFBRCxvQkFBQztDQUFBLEFBcERELElBb0RDO1NBcERZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yIH0gZnJvbSAnLi4vYnVpbHQtaW4vY29tcGFyYXRvcnMvZGF0YWdyaWQtcHJvcGVydHktY29tcGFyYXRvcic7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFN0YXRlSW50ZXJmYWNlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zdGF0ZS5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBGaWx0ZXJzUHJvdmlkZXIgfSBmcm9tICcuL2ZpbHRlcnMnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4vcGFnZSc7XG5pbXBvcnQgeyBTb3J0IH0gZnJvbSAnLi9zb3J0JztcbmltcG9ydCB7IFN0YXRlRGVib3VuY2VyIH0gZnJvbSAnLi9zdGF0ZS1kZWJvdW5jZXIucHJvdmlkZXInO1xuXG4vKipcbiAqIFRoaXMgcHJvdmlkZXIgYWdncmVnYXRlcyBzdGF0ZSBjaGFuZ2VzIGZyb20gdGhlIHZhcmlvdXMgcHJvdmlkZXJzIG9mIHRoZSBEYXRhZ3JpZFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RhdGVQcm92aWRlcjxUPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZmlsdGVyczogRmlsdGVyc1Byb3ZpZGVyPFQ+LFxuICAgIHByaXZhdGUgc29ydDogU29ydDxUPixcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSBkZWJvdW5jZXI6IFN0YXRlRGVib3VuY2VyXG4gICkge31cblxuICAvKipcbiAgICogVGhlIE9ic2VydmFibGUgdGhhdCBsZXRzIG90aGVyIGNsYXNzZXMgc3Vic2NyaWJlIHRvIGdsb2JhbCBzdGF0ZSBjaGFuZ2VzXG4gICAqL1xuICBjaGFuZ2U6IE9ic2VydmFibGU8Q2xyRGF0YWdyaWRTdGF0ZUludGVyZmFjZTxUPj4gPSB0aGlzLmRlYm91bmNlci5jaGFuZ2UucGlwZShtYXAoKCkgPT4gdGhpcy5zdGF0ZSkpO1xuXG4gIC8qXG4gICAgICogQnkgbWFraW5nIHRoaXMgYSBnZXR0ZXIsIHdlIG9wZW4gdGhlIHBvc3NpYmlsaXR5IGZvciBhIHNldHRlciBpbiB0aGUgZnV0dXJlLlxuICAgICAqIEl0J3MgYmVlbiByZXF1ZXN0ZWQgYSBjb3VwbGUgdGltZXMuXG4gICAgICovXG4gIGdldCBzdGF0ZSgpOiBDbHJEYXRhZ3JpZFN0YXRlSW50ZXJmYWNlPFQ+IHtcbiAgICBjb25zdCBzdGF0ZTogQ2xyRGF0YWdyaWRTdGF0ZUludGVyZmFjZTxUPiA9IHt9O1xuICAgIGlmICh0aGlzLnBhZ2Uuc2l6ZSA+IDApIHtcbiAgICAgIHN0YXRlLnBhZ2UgPSB7XG4gICAgICAgIGZyb206IHRoaXMucGFnZS5maXJzdEl0ZW0sXG4gICAgICAgIHRvOiB0aGlzLnBhZ2UubGFzdEl0ZW0sXG4gICAgICAgIHNpemU6IHRoaXMucGFnZS5zaXplLFxuICAgICAgICBjdXJyZW50OiB0aGlzLnBhZ2UuY3VycmVudCxcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICh0aGlzLnNvcnQuY29tcGFyYXRvcikge1xuICAgICAgaWYgKHRoaXMuc29ydC5jb21wYXJhdG9yIGluc3RhbmNlb2YgRGF0YWdyaWRQcm9wZXJ0eUNvbXBhcmF0b3IpIHtcbiAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgKiBTcGVjaWFsIGNhc2UgZm9yIHRoZSBkZWZhdWx0IG9iamVjdCBwcm9wZXJ0eSBjb21wYXJhdG9yLFxuICAgICAgICAgICAgICAgICAqIHdlIGdpdmUgdGhlIHByb3BlcnR5IG5hbWUgaW5zdGVhZCBvZiB0aGUgYWN0dWFsIGNvbXBhcmF0b3IuXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgIHN0YXRlLnNvcnQgPSB7IGJ5OiAoPERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yPFQ+PnRoaXMuc29ydC5jb21wYXJhdG9yKS5wcm9wLCByZXZlcnNlOiB0aGlzLnNvcnQucmV2ZXJzZSB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUuc29ydCA9IHsgYnk6IHRoaXMuc29ydC5jb21wYXJhdG9yLCByZXZlcnNlOiB0aGlzLnNvcnQucmV2ZXJzZSB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2ZUZpbHRlcnMgPSB0aGlzLmZpbHRlcnMuZ2V0QWN0aXZlRmlsdGVycygpO1xuICAgIGlmIChhY3RpdmVGaWx0ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIHN0YXRlLmZpbHRlcnMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgZmlsdGVyIG9mIGFjdGl2ZUZpbHRlcnMpIHtcbiAgICAgICAgaWYgKGZpbHRlci5zdGF0ZSkge1xuICAgICAgICAgIHN0YXRlLmZpbHRlcnMucHVzaChmaWx0ZXIuc3RhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXRlLmZpbHRlcnMucHVzaChmaWx0ZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuIl19