import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClrStackView } from './stack-view';
var ClrStackHeader = /** @class */ (function () {
    function ClrStackHeader(stackView) {
        this.stackView = stackView;
    }
    ClrStackHeader = tslib_1.__decorate([
        Component({
            selector: 'clr-stack-header',
            template: "\n        <h4 class=\"stack-header\">\n            <span class=\"stack-title\"><ng-content></ng-content></span>\n            \n            <span class=\"stack-actions\">\n                <ng-content select=\".stack-action\"></ng-content>\n                <!-- Undocumented experimental feature: inline editing. -->\n                <button *ngIf=\"stackView.editable\" class=\"stack-action btn btn-sm btn-link\" \n                        (click)=\"stackView.editing = !stackView.editing\" type=\"button\">\n                        Edit\n                </button>\n                <!-- End of undocumented experimental feature. -->\n            </span>\n        </h4>\n    ",
            styles: ["\n        :host { display: block; }\n    "]
        }),
        tslib_1.__metadata("design:paramtypes", [ClrStackView])
    ], ClrStackHeader);
    return ClrStackHeader;
}());
export { ClrStackHeader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2staGVhZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9zdGFjay12aWV3L3N0YWNrLWhlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQTBCNUM7SUFDRSx3QkFBbUIsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFHLENBQUM7SUFEbkMsY0FBYztRQXhCMUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixRQUFRLEVBQUUsa3FCQWNQO3FCQUdELDJDQUVDO1NBRUosQ0FBQztpREFFOEIsWUFBWTtPQUQvQixjQUFjLENBRTFCO0lBQUQscUJBQUM7Q0FBQSxBQUZELElBRUM7U0FGWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbHJTdGFja1ZpZXcgfSBmcm9tICcuL3N0YWNrLXZpZXcnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItc3RhY2staGVhZGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGg0IGNsYXNzPVwic3RhY2staGVhZGVyXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN0YWNrLXRpdGxlXCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50Pjwvc3Bhbj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzdGFjay1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLnN0YWNrLWFjdGlvblwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8IS0tIFVuZG9jdW1lbnRlZCBleHBlcmltZW50YWwgZmVhdHVyZTogaW5saW5lIGVkaXRpbmcuIC0tPlxuICAgICAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzdGFja1ZpZXcuZWRpdGFibGVcIiBjbGFzcz1cInN0YWNrLWFjdGlvbiBidG4gYnRuLXNtIGJ0bi1saW5rXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic3RhY2tWaWV3LmVkaXRpbmcgPSAhc3RhY2tWaWV3LmVkaXRpbmdcIiB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBFZGl0XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPCEtLSBFbmQgb2YgdW5kb2N1bWVudGVkIGV4cGVyaW1lbnRhbCBmZWF0dXJlLiAtLT5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9oND5cbiAgICBgLFxuICAvLyBDdXN0b20gZWxlbWVudHMgYXJlIGlubGluZSBieSBkZWZhdWx0XG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgICAgOmhvc3QgeyBkaXNwbGF5OiBibG9jazsgfVxuICAgIGAsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENsclN0YWNrSGVhZGVyIHtcbiAgY29uc3RydWN0b3IocHVibGljIHN0YWNrVmlldzogQ2xyU3RhY2tWaWV3KSB7fVxufVxuIl19