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
let StateProvider = class StateProvider {
    constructor(filters, sort, page, debouncer) {
        this.filters = filters;
        this.sort = sort;
        this.page = page;
        this.debouncer = debouncer;
        /**
         * The Observable that lets other classes subscribe to global state changes
         */
        this.change = this.debouncer.change.pipe(map(() => this.state));
    }
    /*
       * By making this a getter, we open the possibility for a setter in the future.
       * It's been requested a couple times.
       */
    get state() {
        const state = {};
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
        const activeFilters = this.filters.getActiveFilters();
        if (activeFilters.length > 0) {
            state.filters = [];
            for (const filter of activeFilters) {
                if (filter.state) {
                    state.filters.push(filter.state);
                }
                else {
                    state.filters.push(filter);
                }
            }
        }
        return state;
    }
};
StateProvider = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [FiltersProvider,
        Sort,
        Page,
        StateDebouncer])
], StateProvider);
export { StateProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUucHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL3Byb3ZpZGVycy9zdGF0ZS5wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBR2xHLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDNUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM5QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzlCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU1RDs7R0FFRztBQUVILElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFDeEIsWUFDVSxPQUEyQixFQUMzQixJQUFhLEVBQ2IsSUFBVSxFQUNWLFNBQXlCO1FBSHpCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFNBQUksR0FBSixJQUFJLENBQVM7UUFDYixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsY0FBUyxHQUFULFNBQVMsQ0FBZ0I7UUFHbkM7O1dBRUc7UUFDSCxXQUFNLEdBQTZDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFMbEcsQ0FBQztJQU9KOzs7U0FHSztJQUNMLElBQUksS0FBSztRQUNQLE1BQU0sS0FBSyxHQUFpQyxFQUFFLENBQUM7UUFDL0MsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDdEIsS0FBSyxDQUFDLElBQUksR0FBRztnQkFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO2dCQUN6QixFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO2dCQUN0QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO2dCQUNwQixPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO2FBQzNCLENBQUM7U0FDSDtRQUNELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDeEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsWUFBWSwwQkFBMEIsRUFBRTtnQkFDOUQ7OzsyQkFHVztnQkFDWCxLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUUsRUFBRSxFQUFrQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDN0c7aUJBQU07Z0JBQ0wsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN2RTtTQUNGO1FBRUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3RELElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDNUIsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDbkIsS0FBSyxNQUFNLE1BQU0sSUFBSSxhQUFhLEVBQUU7Z0JBQ2xDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtvQkFDaEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNsQztxQkFBTTtvQkFDTCxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDNUI7YUFDRjtTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0YsQ0FBQTtBQXBEWSxhQUFhO0lBRHpCLFVBQVUsRUFBRTs2Q0FHUSxlQUFlO1FBQ2xCLElBQUk7UUFDSixJQUFJO1FBQ0MsY0FBYztHQUx4QixhQUFhLENBb0R6QjtTQXBEWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBEYXRhZ3JpZFByb3BlcnR5Q29tcGFyYXRvciB9IGZyb20gJy4uL2J1aWx0LWluL2NvbXBhcmF0b3JzL2RhdGFncmlkLXByb3BlcnR5LWNvbXBhcmF0b3InO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRTdGF0ZUludGVyZmFjZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc3RhdGUuaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgRmlsdGVyc1Byb3ZpZGVyIH0gZnJvbSAnLi9maWx0ZXJzJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuL3BhZ2UnO1xuaW1wb3J0IHsgU29ydCB9IGZyb20gJy4vc29ydCc7XG5pbXBvcnQgeyBTdGF0ZURlYm91bmNlciB9IGZyb20gJy4vc3RhdGUtZGVib3VuY2VyLnByb3ZpZGVyJztcblxuLyoqXG4gKiBUaGlzIHByb3ZpZGVyIGFnZ3JlZ2F0ZXMgc3RhdGUgY2hhbmdlcyBmcm9tIHRoZSB2YXJpb3VzIHByb3ZpZGVycyBvZiB0aGUgRGF0YWdyaWRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0YXRlUHJvdmlkZXI8VD4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZpbHRlcnM6IEZpbHRlcnNQcm92aWRlcjxUPixcbiAgICBwcml2YXRlIHNvcnQ6IFNvcnQ8VD4sXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgZGVib3VuY2VyOiBTdGF0ZURlYm91bmNlclxuICApIHt9XG5cbiAgLyoqXG4gICAqIFRoZSBPYnNlcnZhYmxlIHRoYXQgbGV0cyBvdGhlciBjbGFzc2VzIHN1YnNjcmliZSB0byBnbG9iYWwgc3RhdGUgY2hhbmdlc1xuICAgKi9cbiAgY2hhbmdlOiBPYnNlcnZhYmxlPENsckRhdGFncmlkU3RhdGVJbnRlcmZhY2U8VD4+ID0gdGhpcy5kZWJvdW5jZXIuY2hhbmdlLnBpcGUobWFwKCgpID0+IHRoaXMuc3RhdGUpKTtcblxuICAvKlxuICAgICAqIEJ5IG1ha2luZyB0aGlzIGEgZ2V0dGVyLCB3ZSBvcGVuIHRoZSBwb3NzaWJpbGl0eSBmb3IgYSBzZXR0ZXIgaW4gdGhlIGZ1dHVyZS5cbiAgICAgKiBJdCdzIGJlZW4gcmVxdWVzdGVkIGEgY291cGxlIHRpbWVzLlxuICAgICAqL1xuICBnZXQgc3RhdGUoKTogQ2xyRGF0YWdyaWRTdGF0ZUludGVyZmFjZTxUPiB7XG4gICAgY29uc3Qgc3RhdGU6IENsckRhdGFncmlkU3RhdGVJbnRlcmZhY2U8VD4gPSB7fTtcbiAgICBpZiAodGhpcy5wYWdlLnNpemUgPiAwKSB7XG4gICAgICBzdGF0ZS5wYWdlID0ge1xuICAgICAgICBmcm9tOiB0aGlzLnBhZ2UuZmlyc3RJdGVtLFxuICAgICAgICB0bzogdGhpcy5wYWdlLmxhc3RJdGVtLFxuICAgICAgICBzaXplOiB0aGlzLnBhZ2Uuc2l6ZSxcbiAgICAgICAgY3VycmVudDogdGhpcy5wYWdlLmN1cnJlbnQsXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAodGhpcy5zb3J0LmNvbXBhcmF0b3IpIHtcbiAgICAgIGlmICh0aGlzLnNvcnQuY29tcGFyYXRvciBpbnN0YW5jZW9mIERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICogU3BlY2lhbCBjYXNlIGZvciB0aGUgZGVmYXVsdCBvYmplY3QgcHJvcGVydHkgY29tcGFyYXRvcixcbiAgICAgICAgICAgICAgICAgKiB3ZSBnaXZlIHRoZSBwcm9wZXJ0eSBuYW1lIGluc3RlYWQgb2YgdGhlIGFjdHVhbCBjb21wYXJhdG9yLlxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICBzdGF0ZS5zb3J0ID0geyBieTogKDxEYXRhZ3JpZFByb3BlcnR5Q29tcGFyYXRvcjxUPj50aGlzLnNvcnQuY29tcGFyYXRvcikucHJvcCwgcmV2ZXJzZTogdGhpcy5zb3J0LnJldmVyc2UgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnNvcnQgPSB7IGJ5OiB0aGlzLnNvcnQuY29tcGFyYXRvciwgcmV2ZXJzZTogdGhpcy5zb3J0LnJldmVyc2UgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmVGaWx0ZXJzID0gdGhpcy5maWx0ZXJzLmdldEFjdGl2ZUZpbHRlcnMoKTtcbiAgICBpZiAoYWN0aXZlRmlsdGVycy5sZW5ndGggPiAwKSB7XG4gICAgICBzdGF0ZS5maWx0ZXJzID0gW107XG4gICAgICBmb3IgKGNvbnN0IGZpbHRlciBvZiBhY3RpdmVGaWx0ZXJzKSB7XG4gICAgICAgIGlmIChmaWx0ZXIuc3RhdGUpIHtcbiAgICAgICAgICBzdGF0ZS5maWx0ZXJzLnB1c2goZmlsdGVyLnN0YXRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdGF0ZS5maWx0ZXJzLnB1c2goZmlsdGVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiJdfQ==