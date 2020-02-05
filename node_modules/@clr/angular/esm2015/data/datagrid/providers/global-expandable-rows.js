import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
let ExpandableRowsCount = class ExpandableRowsCount {
    constructor() {
        this.expandableCount = 0;
    }
    register() {
        this.expandableCount++;
    }
    unregister() {
        this.expandableCount--;
    }
    /**
     * false means no rows with action
     */
    get hasExpandableRow() {
        return this.expandableCount > 0;
    }
};
ExpandableRowsCount = tslib_1.__decorate([
    Injectable()
], ExpandableRowsCount);
export { ExpandableRowsCount };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWV4cGFuZGFibGUtcm93cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcHJvdmlkZXJzL2dsb2JhbC1leHBhbmRhYmxlLXJvd3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBRGhDO1FBRVUsb0JBQWUsR0FBRyxDQUFDLENBQUM7SUFnQjlCLENBQUM7SUFkUSxRQUFRO1FBQ2IsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTSxVQUFVO1FBQ2YsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsZ0JBQWdCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUNGLENBQUE7QUFqQlksbUJBQW1CO0lBRC9CLFVBQVUsRUFBRTtHQUNBLG1CQUFtQixDQWlCL0I7U0FqQlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXhwYW5kYWJsZVJvd3NDb3VudCB7XG4gIHByaXZhdGUgZXhwYW5kYWJsZUNvdW50ID0gMDtcblxuICBwdWJsaWMgcmVnaXN0ZXIoKSB7XG4gICAgdGhpcy5leHBhbmRhYmxlQ291bnQrKztcbiAgfVxuXG4gIHB1YmxpYyB1bnJlZ2lzdGVyKCkge1xuICAgIHRoaXMuZXhwYW5kYWJsZUNvdW50LS07XG4gIH1cblxuICAvKipcbiAgICogZmFsc2UgbWVhbnMgbm8gcm93cyB3aXRoIGFjdGlvblxuICAgKi9cbiAgcHVibGljIGdldCBoYXNFeHBhbmRhYmxlUm93KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmV4cGFuZGFibGVDb3VudCA+IDA7XG4gIH1cbn1cbiJdfQ==