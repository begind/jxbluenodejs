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
let TableSizeService = class TableSizeService {
    constructor(platformId) {
        this.platformId = platformId;
    }
    get tableRef() {
        return this._tableRef;
    }
    set tableRef(element) {
        this._tableRef = element;
    }
    set table(table) {
        if (isPlatformBrowser(this.platformId) && table.nativeElement) {
            this.tableRef = table.nativeElement.querySelector('.datagrid-table');
        }
    }
    // Used when resizing columns to show the column border being dragged.
    getColumnDragHeight() {
        if (!this.tableRef) {
            return;
        }
        return `${this.tableRef.clientHeight}px`;
    }
};
TableSizeService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(PLATFORM_ID)),
    tslib_1.__metadata("design:paramtypes", [Object])
], TableSizeService);
export { TableSizeService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtc2l6ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvdGFibGUtc2l6ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFjLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVFOzs7R0FHRztBQUVILElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBVzNCLFlBQXlDLFVBQWtCO1FBQWxCLGVBQVUsR0FBVixVQUFVLENBQVE7SUFBRyxDQUFDO0lBUi9ELElBQVcsUUFBUTtRQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQVcsUUFBUSxDQUFDLE9BQW9CO1FBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO0lBQzNCLENBQUM7SUFHRCxJQUFXLEtBQUssQ0FBQyxLQUFpQjtRQUNoQyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLENBQUMsYUFBYSxFQUFFO1lBQzdELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUN0RTtJQUNILENBQUM7SUFFRCxzRUFBc0U7SUFDdEUsbUJBQW1CO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE9BQU87U0FDUjtRQUNELE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksSUFBSSxDQUFDO0lBQzNDLENBQUM7Q0FDRixDQUFBO0FBekJZLGdCQUFnQjtJQUQ1QixVQUFVLEVBQUU7SUFZRSxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7NkNBQXFCLE1BQU07R0FYaEQsZ0JBQWdCLENBeUI1QjtTQXpCWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3QsIEluamVjdGFibGUsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJbnRlcm5hbCBkYXRhZ3JpZCBzZXJ2aWNlIHRoYXQgaG9sZHMgYSByZWZlcmVuY2UgdG8gdGhlIGNsci1kZy10YWJsZSBlbGVtZW50IGFuZCBleHBvc2VzIGEgbWV0aG9kIHRvIGdldCBoZWlnaHQuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUYWJsZVNpemVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfdGFibGVSZWY6IEhUTUxFbGVtZW50O1xuXG4gIHB1YmxpYyBnZXQgdGFibGVSZWYoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl90YWJsZVJlZjtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgdGFibGVSZWYoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLl90YWJsZVJlZiA9IGVsZW1lbnQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCkge31cbiAgcHVibGljIHNldCB0YWJsZSh0YWJsZTogRWxlbWVudFJlZikge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmIHRhYmxlLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMudGFibGVSZWYgPSB0YWJsZS5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXRhZ3JpZC10YWJsZScpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVzZWQgd2hlbiByZXNpemluZyBjb2x1bW5zIHRvIHNob3cgdGhlIGNvbHVtbiBib3JkZXIgYmVpbmcgZHJhZ2dlZC5cbiAgZ2V0Q29sdW1uRHJhZ0hlaWdodCgpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy50YWJsZVJlZikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gYCR7dGhpcy50YWJsZVJlZi5jbGllbnRIZWlnaHR9cHhgO1xuICB9XG59XG4iXX0=