import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
/**
 * @description
 * Internal datagrid service that holds a reference to the clr-dg-table element and exposes a method to get height.
 */
var TableSizeService = /** @class */ (function () {
    function TableSizeService(platformId) {
        this.platformId = platformId;
    }
    Object.defineProperty(TableSizeService.prototype, "tableRef", {
        get: function () {
            return this._tableRef;
        },
        set: function (element) {
            this._tableRef = element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableSizeService.prototype, "table", {
        set: function (table) {
            if (isPlatformBrowser(this.platformId) && table.nativeElement) {
                this.tableRef = table.nativeElement.querySelector('.datagrid-table');
            }
        },
        enumerable: true,
        configurable: true
    });
    // Used when resizing columns to show the column border being dragged.
    TableSizeService.prototype.getColumnDragHeight = function () {
        if (!this.tableRef) {
            return;
        }
        return this.tableRef.clientHeight + "px";
    };
    TableSizeService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(PLATFORM_ID)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], TableSizeService);
    return TableSizeService;
}());
export { TableSizeService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtc2l6ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvdGFibGUtc2l6ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFjLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVFOzs7R0FHRztBQUVIO0lBV0UsMEJBQXlDLFVBQWtCO1FBQWxCLGVBQVUsR0FBVixVQUFVLENBQVE7SUFBRyxDQUFDO0lBUi9ELHNCQUFXLHNDQUFRO2FBQW5CO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7YUFFRCxVQUFvQixPQUFvQjtZQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUMzQixDQUFDOzs7T0FKQTtJQU9ELHNCQUFXLG1DQUFLO2FBQWhCLFVBQWlCLEtBQWlCO1lBQ2hDLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxhQUFhLEVBQUU7Z0JBQzdELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUN0RTtRQUNILENBQUM7OztPQUFBO0lBRUQsc0VBQXNFO0lBQ3RFLDhDQUFtQixHQUFuQjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE9BQU87U0FDUjtRQUNELE9BQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLE9BQUksQ0FBQztJQUMzQyxDQUFDO0lBeEJVLGdCQUFnQjtRQUQ1QixVQUFVLEVBQUU7UUFZRSxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7aURBQXFCLE1BQU07T0FYaEQsZ0JBQWdCLENBeUI1QjtJQUFELHVCQUFDO0NBQUEsQUF6QkQsSUF5QkM7U0F6QlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRWxlbWVudFJlZiwgSW5qZWN0LCBJbmplY3RhYmxlLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogSW50ZXJuYWwgZGF0YWdyaWQgc2VydmljZSB0aGF0IGhvbGRzIGEgcmVmZXJlbmNlIHRvIHRoZSBjbHItZGctdGFibGUgZWxlbWVudCBhbmQgZXhwb3NlcyBhIG1ldGhvZCB0byBnZXQgaGVpZ2h0LlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGFibGVTaXplU2VydmljZSB7XG4gIHByaXZhdGUgX3RhYmxlUmVmOiBIVE1MRWxlbWVudDtcblxuICBwdWJsaWMgZ2V0IHRhYmxlUmVmKCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fdGFibGVSZWY7XG4gIH1cblxuICBwdWJsaWMgc2V0IHRhYmxlUmVmKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5fdGFibGVSZWYgPSBlbGVtZW50O1xuICB9XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QpIHt9XG4gIHB1YmxpYyBzZXQgdGFibGUodGFibGU6IEVsZW1lbnRSZWYpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSAmJiB0YWJsZS5uYXRpdmVFbGVtZW50KSB7XG4gICAgICB0aGlzLnRhYmxlUmVmID0gdGFibGUubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZGF0YWdyaWQtdGFibGUnKTtcbiAgICB9XG4gIH1cblxuICAvLyBVc2VkIHdoZW4gcmVzaXppbmcgY29sdW1ucyB0byBzaG93IHRoZSBjb2x1bW4gYm9yZGVyIGJlaW5nIGRyYWdnZWQuXG4gIGdldENvbHVtbkRyYWdIZWlnaHQoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMudGFibGVSZWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIGAke3RoaXMudGFibGVSZWYuY2xpZW50SGVpZ2h0fXB4YDtcbiAgfVxufVxuIl19