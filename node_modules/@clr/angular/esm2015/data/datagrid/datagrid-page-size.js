import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Input } from '@angular/core';
import { Page } from './providers/page';
let ClrDatagridPageSize = class ClrDatagridPageSize {
    constructor(page) {
        this.page = page;
    }
    ngOnInit() {
        if (!this.pageSizeOptions || this.pageSizeOptions.length === 0) {
            this.pageSizeOptions = [this.page.size];
        }
    }
};
tslib_1.__decorate([
    Input('clrPageSizeOptions'),
    tslib_1.__metadata("design:type", Array)
], ClrDatagridPageSize.prototype, "pageSizeOptions", void 0);
ClrDatagridPageSize = tslib_1.__decorate([
    Component({
        selector: 'clr-dg-page-size',
        template: `
    <ng-content></ng-content>
    <div class="clr-select-wrapper">
      <select [class.clr-page-size-select]="true" [(ngModel)]="page.size">
        <option *ngFor="let option of pageSizeOptions" [ngValue]="option">{{option}}</option>
      </select>
    </div>
  `
    }),
    tslib_1.__metadata("design:paramtypes", [Page])
], ClrDatagridPageSize);
export { ClrDatagridPageSize };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcGFnZS1zaXplLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1wYWdlLXNpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFheEMsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFHOUIsWUFBbUIsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFBRyxDQUFDO0lBRWpDLFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDOUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQVQ4QjtJQUE1QixLQUFLLENBQUMsb0JBQW9CLENBQUM7OzREQUEyQjtBQUQ1QyxtQkFBbUI7SUFYL0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixRQUFRLEVBQUU7Ozs7Ozs7R0FPVDtLQUNGLENBQUM7NkNBSXlCLElBQUk7R0FIbEIsbUJBQW1CLENBVS9CO1NBVlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4vcHJvdmlkZXJzL3BhZ2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctcGFnZS1zaXplJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPGRpdiBjbGFzcz1cImNsci1zZWxlY3Qtd3JhcHBlclwiPlxuICAgICAgPHNlbGVjdCBbY2xhc3MuY2xyLXBhZ2Utc2l6ZS1zZWxlY3RdPVwidHJ1ZVwiIFsobmdNb2RlbCldPVwicGFnZS5zaXplXCI+XG4gICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBwYWdlU2l6ZU9wdGlvbnNcIiBbbmdWYWx1ZV09XCJvcHRpb25cIj57e29wdGlvbn19PC9vcHRpb24+XG4gICAgICA8L3NlbGVjdD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRQYWdlU2l6ZSB7XG4gIEBJbnB1dCgnY2xyUGFnZVNpemVPcHRpb25zJykgcGFnZVNpemVPcHRpb25zOiBudW1iZXJbXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFnZTogUGFnZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMucGFnZVNpemVPcHRpb25zIHx8IHRoaXMucGFnZVNpemVPcHRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5wYWdlU2l6ZU9wdGlvbnMgPSBbdGhpcy5wYWdlLnNpemVdO1xuICAgIH1cbiAgfVxufVxuIl19