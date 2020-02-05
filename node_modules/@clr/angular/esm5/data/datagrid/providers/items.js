import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FiltersProvider } from './filters';
import { Page } from './page';
import { Sort } from './sort';
var Items = /** @class */ (function () {
    function Items(_filters, _sort, _page) {
        this._filters = _filters;
        this._sort = _sort;
        this._page = _page;
        /**
         * Indicates if the data is currently loading
         */
        this.loading = false;
        // TODO: Verify that trackBy is registered for the *ngFor case too
        /**
         * Tracking function to identify objects. Default is reference equality.
         */
        this.trackBy = function (index, item) { return item; };
        /**
         * Whether we should use smart items for this datagrid or let the user handle
         * everything.
         */
        this._smart = false;
        /**
         * List of items currently displayed
         */
        this._displayed = [];
        /**
         * The Observable that lets other classes subscribe to items changes
         */
        this._change = new Subject();
        this._allChanges = new Subject();
    }
    /**
     * Cleans up our subscriptions to other providers
     */
    Items.prototype.destroy = function () {
        if (this._filtersSub) {
            this._filtersSub.unsubscribe();
        }
        if (this._sortSub) {
            this._sortSub.unsubscribe();
        }
        if (this._pageSub) {
            this._pageSub.unsubscribe();
        }
    };
    Object.defineProperty(Items.prototype, "smart", {
        get: function () {
            return this._smart;
        },
        enumerable: true,
        configurable: true
    });
    Items.prototype.smartenUp = function () {
        var _this = this;
        this._smart = true;
        /*
             * These observers trigger a chain of function: filter -> sort -> paginate
             * An observer up the chain re-triggers all the operations that follow it.
             */
        this._filtersSub = this._filters.change.subscribe(function () { return _this._filterItems(); });
        this._sortSub = this._sort.change.subscribe(function () {
            // Special case, if the datagrid went from sorted to unsorted, we have to re-filter
            // to get the original order back
            if (!_this._sort.comparator) {
                _this._filterItems();
            }
            else {
                _this._sortItems();
            }
        });
        this._pageSub = this._page.change.subscribe(function () { return _this._changePage(); });
    };
    Object.defineProperty(Items.prototype, "all", {
        get: function () {
            return this._all;
        },
        set: function (items) {
            this._all = items;
            this.emitAllChanges(items);
            if (this.smart) {
                this._filterItems();
            }
            else {
                this._displayed = items;
                this.emitChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Manually recompute the list of displayed items
     */
    Items.prototype.refresh = function () {
        if (this.smart) {
            this._filterItems();
        }
    };
    Object.defineProperty(Items.prototype, "displayed", {
        get: function () {
            // Ideally we could return an immutable array, but we don't have it in Clarity yet.
            return this._displayed;
        },
        enumerable: true,
        configurable: true
    });
    Items.prototype.emitChange = function () {
        this._change.next(this.displayed);
    };
    Object.defineProperty(Items.prototype, "change", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Items.prototype.emitAllChanges = function (items) {
        this._allChanges.next(items);
    };
    Object.defineProperty(Items.prototype, "allChanges", {
        get: function () {
            return this._allChanges.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Items.prototype, "uninitialized", {
        /**
         * Checks if we don't have data to process yet, to abort early operations
         */
        get: function () {
            return !this._all;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * FiltersProvider items from the raw list
     */
    Items.prototype._filterItems = function () {
        var _this = this;
        if (this.uninitialized) {
            return;
        }
        if (this._filters.hasActiveFilters()) {
            this._filtered = this._all.filter(function (item) { return _this._filters.accepts(item); });
        }
        else {
            // Work on a shallow copy of the array, to not modify the user's model
            this._filtered = this._all.slice();
        }
        this._page.totalItems = this._filtered.length;
        this._sortItems();
    };
    /**
     * Sorts items in the filtered list
     */
    Items.prototype._sortItems = function () {
        var _this = this;
        if (this.uninitialized) {
            return;
        }
        if (this._sort.comparator) {
            this._filtered.sort(function (a, b) { return _this._sort.compare(a, b); });
        }
        this._changePage();
    };
    /**
     * Extracts the current page from the sorted list
     */
    Items.prototype._changePage = function () {
        // If we know we have pagination but the page size hasn't been set yet, we wait for it.
        if (this.uninitialized || (this._page.activated && this._page.size === 0)) {
            return;
        }
        if (this._page.size > 0) {
            this._displayed = this._filtered.slice(this._page.firstItem, this._page.lastItem + 1);
        }
        else {
            this._displayed = this._filtered;
        }
        this.emitChange();
    };
    Items = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [FiltersProvider, Sort, Page])
    ], Items);
    return Items;
}());
export { Items };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL3Byb3ZpZGVycy9pdGVtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxVQUFVLEVBQW1CLE1BQU0sZUFBZSxDQUFDO0FBRTVELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHL0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM1QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzlCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFHOUI7SUFDRSxlQUFvQixRQUE0QixFQUFVLEtBQWMsRUFBVSxLQUFXO1FBQXpFLGFBQVEsR0FBUixRQUFRLENBQW9CO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUztRQUFVLFVBQUssR0FBTCxLQUFLLENBQU07UUFFN0Y7O1dBRUc7UUFDSSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXZCLGtFQUFrRTtRQUNsRTs7V0FFRztRQUNJLFlBQU8sR0FBdUIsVUFBQyxLQUFhLEVBQUUsSUFBTyxJQUFLLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQztRQXVCdEU7OztXQUdHO1FBQ0ssV0FBTSxHQUFHLEtBQUssQ0FBQztRQXVEdkI7O1dBRUc7UUFDSyxlQUFVLEdBQVEsRUFBRSxDQUFDO1FBTTdCOztXQUVHO1FBQ0ssWUFBTyxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFTN0IsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO0lBbEh1RCxDQUFDO0lBbUJqRzs7T0FFRztJQUNJLHVCQUFPLEdBQWQ7UUFDRSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNoQztRQUNELElBQUksSUFBSSxDQUFD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QUFLLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3ZGO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDbEM7UUFDRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQS9LVSxLQUFLO1FBRGpCLFVBQVUsRUFBRTtpREFFbUIsZUFBZSxFQUFvQixJQUFJLEVBQW9CLElBQUk7T0FEbEYsS0FBSyxDQWdMakI7SUFBRCxZQUFDO0NBQUEsQUFoTEQsSUFnTEM7U0FoTFksS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUsIFRyYWNrQnlGdW5jdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEZpbHRlcnNQcm92aWRlciB9IGZyb20gJy4vZmlsdGVycyc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wYWdlJztcbmltcG9ydCB7IFNvcnQgfSBmcm9tICcuL3NvcnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSXRlbXM8VCA9IGFueT4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9maWx0ZXJzOiBGaWx0ZXJzUHJvdmlkZXI8VD4sIHByaXZhdGUgX3NvcnQ6IFNvcnQ8VD4sIHByaXZhdGUgX3BhZ2U6IFBhZ2UpIHt9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgZGF0YSBpcyBjdXJyZW50bHkgbG9hZGluZ1xuICAgKi9cbiAgcHVibGljIGxvYWRpbmcgPSBmYWxzZTtcblxuICAvLyBUT0RPOiBWZXJpZnkgdGhhdCB0cmFja0J5IGlzIHJlZ2lzdGVyZWQgZm9yIHRoZSAqbmdGb3IgY2FzZSB0b29cbiAgLyoqXG4gICAqIFRyYWNraW5nIGZ1bmN0aW9uIHRvIGlkZW50aWZ5IG9iamVjdHMuIERlZmF1bHQgaXMgcmVmZXJlbmNlIGVxdWFsaXR5LlxuICAgKi9cbiAgcHVibGljIHRyYWNrQnk6IFRyYWNrQnlGdW5jdGlvbjxUPiA9IChpbmRleDogbnVtYmVyLCBpdGVtOiBUKSA9PiBpdGVtO1xuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb25zIHRvIHRoZSBvdGhlciBwcm92aWRlcnMgY2hhbmdlcy5cbiAgICovXG4gIHByaXZhdGUgX2ZpbHRlcnNTdWI6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfc29ydFN1YjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIF9wYWdlU3ViOiBTdWJzY3JpcHRpb247XG4gIC8qKlxuICAgKiBDbGVhbnMgdXAgb3VyIHN1YnNjcmlwdGlvbnMgdG8gb3RoZXIgcHJvdmlkZXJzXG4gICAqL1xuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fZmlsdGVyc1N1Yikge1xuICAgICAgdGhpcy5fZmlsdGVyc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc29ydFN1Yikge1xuICAgICAgdGhpcy5fc29ydFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fcGFnZVN1Yikge1xuICAgICAgdGhpcy5fcGFnZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHdlIHNob3VsZCB1c2Ugc21hcnQgaXRlbXMgZm9yIHRoaXMgZGF0YWdyaWQgb3IgbGV0IHRoZSB1c2VyIGhhbmRsZVxuICAgKiBldmVyeXRoaW5nLlxuICAgKi9cbiAgcHJpdmF0ZSBfc21hcnQgPSBmYWxzZTtcbiAgcHVibGljIGdldCBzbWFydCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc21hcnQ7XG4gIH1cbiAgcHVibGljIHNtYXJ0ZW5VcCgpIHtcbiAgICB0aGlzLl9zbWFydCA9IHRydWU7XG4gICAgLypcbiAgICAgICAgICogVGhlc2Ugb2JzZXJ2ZXJzIHRyaWdnZXIgYSBjaGFpbiBvZiBmdW5jdGlvbjogZmlsdGVyIC0+IHNvcnQgLT4gcGFnaW5hdGVcbiAgICAgICAgICogQW4gb2JzZXJ2ZXIgdXAgdGhlIGNoYWluIHJlLXRyaWdnZXJzIGFsbCB0aGUgb3BlcmF0aW9ucyB0aGF0IGZvbGxvdyBpdC5cbiAgICAgICAgICovXG4gICAgdGhpcy5fZmlsdGVyc1N1YiA9IHRoaXMuX2ZpbHRlcnMuY2hhbmdlLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9maWx0ZXJJdGVtcygpKTtcbiAgICB0aGlzLl9zb3J0U3ViID0gdGhpcy5fc29ydC5jaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIC8vIFNwZWNpYWwgY2FzZSwgaWYgdGhlIGRhdGFncmlkIHdlbnQgZnJvbSBzb3J0ZWQgdG8gdW5zb3J0ZWQsIHdlIGhhdmUgdG8gcmUtZmlsdGVyXG4gICAgICAvLyB0byBnZXQgdGhlIG9yaWdpbmFsIG9yZGVyIGJhY2tcbiAgICAgIGlmICghdGhpcy5fc29ydC5jb21wYXJhdG9yKSB7XG4gICAgICAgIHRoaXMuX2ZpbHRlckl0ZW1zKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zb3J0SXRlbXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9wYWdlU3ViID0gdGhpcy5fcGFnZS5jaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2NoYW5nZVBhZ2UoKSk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdCBvZiBhbGwgaXRlbXMgaW4gdGhlIGRhdGFncmlkXG4gICAqL1xuICBwcml2YXRlIF9hbGw6IFRbXTtcbiAgcHVibGljIGdldCBhbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FsbDtcbiAgfVxuICBwdWJsaWMgc2V0IGFsbChpdGVtczogVFtdKSB7XG4gICAgdGhpcy5fYWxsID0gaXRlbXM7XG4gICAgdGhpcy5lbWl0QWxsQ2hhbmdlcyhpdGVtcyk7XG4gICAgaWYgKHRoaXMuc21hcnQpIHtcbiAgICAgIHRoaXMuX2ZpbHRlckl0ZW1zKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2Rpc3BsYXllZCA9IGl0ZW1zO1xuICAgICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1hbnVhbGx5IHJlY29tcHV0ZSB0aGUgbGlzdCBvZiBkaXNwbGF5ZWQgaXRlbXNcbiAgICovXG4gIHB1YmxpYyByZWZyZXNoKCkge1xuICAgIGlmICh0aGlzLnNtYXJ0KSB7XG4gICAgICB0aGlzLl9maWx0ZXJJdGVtcygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcm5hbCB0ZW1wb3Jhcnkgc3RlcCwgd2hpY2ggd2UgcHJlc2VydmUgdG8gYXZvaWQgcmUtZmlsdGVyaW5nIG9yIHJlLXNvcnRpbmcgaWYgbm90IG5lY2Vzc2FyeVxuICAgKi9cbiAgcHJpdmF0ZSBfZmlsdGVyZWQ6IFRbXTtcblxuICAvKipcbiAgICogTGlzdCBvZiBpdGVtcyBjdXJyZW50bHkgZGlzcGxheWVkXG4gICAqL1xuICBwcml2YXRlIF9kaXNwbGF5ZWQ6IFRbXSA9IFtdO1xuICBwdWJsaWMgZ2V0IGRpc3BsYXllZCgpOiBUW10ge1xuICAgIC8vIElkZWFsbHkgd2UgY291bGQgcmV0dXJuIGFuIGltbXV0YWJsZSBhcnJheSwgYnV0IHdlIGRvbid0IGhhdmUgaXQgaW4gQ2xhcml0eSB5ZXQuXG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXllZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgT2JzZXJ2YWJsZSB0aGF0IGxldHMgb3RoZXIgY2xhc3NlcyBzdWJzY3JpYmUgdG8gaXRlbXMgY2hhbmdlc1xuICAgKi9cbiAgcHJpdmF0ZSBfY2hhbmdlID0gbmV3IFN1YmplY3Q8VFtdPigpO1xuICBwcml2YXRlIGVtaXRDaGFuZ2UoKSB7XG4gICAgdGhpcy5fY2hhbmdlLm5leHQodGhpcy5kaXNwbGF5ZWQpO1xuICB9XG4gIC8vIFdlIGRvIG5vdCB3YW50IHRvIGV4cG9zZSB0aGUgU3ViamVjdCBpdHNlbGYsIGJ1dCB0aGUgT2JzZXJ2YWJsZSB3aGljaCBpcyByZWFkLW9ubHlcbiAgcHVibGljIGdldCBjaGFuZ2UoKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWxsQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PFRbXT4oKTtcbiAgcHJpdmF0ZSBlbWl0QWxsQ2hhbmdlcyhpdGVtczogVFtdKTogdm9pZCB7XG4gICAgdGhpcy5fYWxsQ2hhbmdlcy5uZXh0KGl0ZW1zKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgYWxsQ2hhbmdlcygpOiBPYnNlcnZhYmxlPFRbXT4ge1xuICAgIHJldHVybiB0aGlzLl9hbGxDaGFuZ2VzLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB3ZSBkb24ndCBoYXZlIGRhdGEgdG8gcHJvY2VzcyB5ZXQsIHRvIGFib3J0IGVhcmx5IG9wZXJhdGlvbnNcbiAgICovXG4gIHByaXZhdGUgZ2V0IHVuaW5pdGlhbGl6ZWQoKSB7XG4gICAgcmV0dXJuICF0aGlzLl9hbGw7XG4gIH1cblxuICAvKipcbiAgICogRmlsdGVyc1Byb3ZpZGVyIGl0ZW1zIGZyb20gdGhlIHJhdyBsaXN0XG4gICAqL1xuICBwcml2YXRlIF9maWx0ZXJJdGVtcygpIHtcbiAgICBpZiAodGhpcy51bmluaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9maWx0ZXJzLmhhc0FjdGl2ZUZpbHRlcnMoKSkge1xuICAgICAgdGhpcy5fZmlsdGVyZWQgPSB0aGlzLl9hbGwuZmlsdGVyKGl0ZW0gPT4gdGhpcy5fZmlsdGVycy5hY2NlcHRzKGl0ZW0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gV29yayBvbiBhIHNoYWxsb3cgY29weSBvZiB0aGUgYXJyYXksIHRvIG5vdCBtb2RpZnkgdGhlIHVzZXIncyBtb2RlbFxuICAgICAgdGhpcy5fZmlsdGVyZWQgPSB0aGlzLl9hbGwuc2xpY2UoKTtcbiAgICB9XG4gICAgdGhpcy5fcGFnZS50b3RhbEl0ZW1zID0gdGhpcy5fZmlsdGVyZWQubGVuZ3RoO1xuICAgIHRoaXMuX3NvcnRJdGVtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvcnRzIGl0ZW1zIGluIHRoZSBmaWx0ZXJlZCBsaXN0XG4gICAqL1xuICBwcml2YXRlIF9zb3J0SXRlbXMoKSB7XG4gICAgaWYgKHRoaXMudW5pbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc29ydC5jb21wYXJhdG9yKSB7XG4gICAgICB0aGlzLl9maWx0ZXJlZC5zb3J0KChhLCBiKSA9PiB0aGlzLl9zb3J0LmNvbXBhcmUoYSwgYikpO1xuICAgIH1cbiAgICB0aGlzLl9jaGFuZ2VQYWdlKCk7XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdHMgdGhlIGN1cnJlbnQgcGFnZSBmcm9tIHRoZSBzb3J0ZWQgbGlzdFxuICAgKi9cbiAgcHJpdmF0ZSBfY2hhbmdlUGFnZSgpIHtcbiAgICAvLyBJZiB3ZSBrbm93IHdlIGhhdmUgcGFnaW5hdGlvbiBidXQgdGhlIHBhZ2Ugc2l6ZSBoYXNuJ3QgYmVlbiBzZXQgeWV0LCB3ZSB3YWl0IGZvciBpdC5cbiAgICBpZiAodGhpcy51bmluaXRpYWxpemVkIHx8ICh0aGlzLl9wYWdlLmFjdGl2YXRlZCAmJiB0aGlzLl9wYWdlLnNpemUgPT09IDApKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9wYWdlLnNpemUgPiAwKSB7XG4gICAgICB0aGlzLl9kaXNwbGF5ZWQgPSB0aGlzLl9maWx0ZXJlZC5zbGljZSh0aGlzLl9wYWdlLmZpcnN0SXRlbSwgdGhpcy5fcGFnZS5sYXN0SXRlbSArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kaXNwbGF5ZWQgPSB0aGlzLl9maWx0ZXJlZDtcbiAgICB9XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH1cbn1cbiJdfQ==