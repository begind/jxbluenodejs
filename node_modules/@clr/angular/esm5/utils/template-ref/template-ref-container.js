import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, TemplateRef, ViewChild } from '@angular/core';
var TemplateRefContainer = /** @class */ (function () {
    function TemplateRefContainer() {
    }
    tslib_1.__decorate([
        ViewChild(TemplateRef, { static: false }),
        tslib_1.__metadata("design:type", TemplateRef)
    ], TemplateRefContainer.prototype, "template", void 0);
    TemplateRefContainer = tslib_1.__decorate([
        Component({
            template: "\n      <ng-template>\n        <ng-content></ng-content>\n      </ng-template>\n    "
        })
    ], TemplateRefContainer);
    return TemplateRefContainer;
}());
export { TemplateRefContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtcmVmLWNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL3RlbXBsYXRlLXJlZi90ZW1wbGF0ZS1yZWYtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBU2xFO0lBQUE7SUFHQSxDQUFDO0lBREM7UUFEQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzBDQUNoQyxXQUFXOzBEQUFNO0lBRmhCLG9CQUFvQjtRQVBoQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsc0ZBSVA7U0FDSixDQUFDO09BQ1csb0JBQW9CLENBR2hDO0lBQUQsMkJBQUM7Q0FBQSxBQUhELElBR0M7U0FIWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlOiBgXG4gICAgICA8bmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVSZWZDb250YWluZXIge1xuICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG59XG4iXX0=