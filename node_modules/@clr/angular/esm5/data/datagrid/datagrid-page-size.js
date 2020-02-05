import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Input } from '@angular/core';
import { Page } from './providers/page';
var ClrDatagridPageSize = /** @class */ (function () {
    function ClrDatagridPageSize(page) {
        this.page = page;
    }
    ClrDatagridPageSize.prototype.ngOnInit = function () {
        if (!this.pageSizeOptions || this.pageSizeOptions.length === 0) {
            this.pageSizeOptions = [this.page.size];
        }
    };
    tslib_1.__decorate([
        Input('clrPageSizeOptions'),
        tslib_1.__metadata("design:type", Array)
    ], ClrDatagridPageSize.prototype, "pageSizeOptions", void 0);
    ClrDatagridPageSize = tslib_1.__decorate([
        Component({
            selector: 'clr-dg-page-size',
            template: "\n    <ng-content></ng-content>\n    <div class=\"clr-select-wrapper\">\n      <select [class.clr-page-size-select]=\"true\" [(ngModel)]=\"page.size\">\n        <option *ngFor=\"let option of pageSizeOptions\" [ngValue]=\"option\">{{option}}</option>\n      </select>\n    </div>\n  "
        }),
        tslib_1.__metadata("design:paramtypes", [Page])
    ], ClrDatagridPageSize);
    return ClrDatagridPageSize;
}());
export { ClrDatagridPageSize };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcGFnZS1zaXplLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1wYWdlLXNpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFheEM7SUFHRSw2QkFBbUIsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFBRyxDQUFDO0lBRWpDLHNDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDOUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBUjRCO1FBQTVCLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQzs7Z0VBQTJCO0lBRDVDLG1CQUFtQjtRQVgvQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFFBQVEsRUFBRSw2UkFPVDtTQUNGLENBQUM7aURBSXlCLElBQUk7T0FIbEIsbUJBQW1CLENBVS9CO0lBQUQsMEJBQUM7Q0FBQSxBQVZELElBVUM7U0FWWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wcm92aWRlcnMvcGFnZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1wYWdlLXNpemUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8ZGl2IGNsYXNzPVwiY2xyLXNlbGVjdC13cmFwcGVyXCI+XG4gICAgICA8c2VsZWN0IFtjbGFzcy5jbHItcGFnZS1zaXplLXNlbGVjdF09XCJ0cnVlXCIgWyhuZ01vZGVsKV09XCJwYWdlLnNpemVcIj5cbiAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHBhZ2VTaXplT3B0aW9uc1wiIFtuZ1ZhbHVlXT1cIm9wdGlvblwiPnt7b3B0aW9ufX08L29wdGlvbj5cbiAgICAgIDwvc2VsZWN0PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZFBhZ2VTaXplIHtcbiAgQElucHV0KCdjbHJQYWdlU2l6ZU9wdGlvbnMnKSBwYWdlU2l6ZU9wdGlvbnM6IG51bWJlcltdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYWdlOiBQYWdlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5wYWdlU2l6ZU9wdGlvbnMgfHwgdGhpcy5wYWdlU2l6ZU9wdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnBhZ2VTaXplT3B0aW9ucyA9IFt0aGlzLnBhZ2Uuc2l6ZV07XG4gICAgfVxuICB9XG59XG4iXX0=