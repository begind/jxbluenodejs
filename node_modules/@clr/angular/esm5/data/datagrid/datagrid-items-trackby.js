import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, Input, Optional } from '@angular/core';
import { Items } from './providers/items';
var ClrDatagridItemsTrackBy = /** @class */ (function () {
    function ClrDatagridItemsTrackBy(_items) {
        this._items = _items;
    }
    Object.defineProperty(ClrDatagridItemsTrackBy.prototype, "trackBy", {
        set: function (value) {
            if (this._items) {
                this._items.trackBy = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input('ngForTrackBy'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Function])
    ], ClrDatagridItemsTrackBy.prototype, "trackBy", null);
    ClrDatagridItemsTrackBy = tslib_1.__decorate([
        Directive({
            selector: '[ngForTrackBy]',
        }),
        tslib_1.__param(0, Optional()),
        tslib_1.__metadata("design:paramtypes", [Items])
    ], ClrDatagridItemsTrackBy);
    return ClrDatagridItemsTrackBy;
}());
export { ClrDatagridItemsTrackBy };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtaXRlbXMtdHJhY2tieS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtaXRlbXMtdHJhY2tieS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBbUIsTUFBTSxlQUFlLENBQUM7QUFFNUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBSzFDO0lBQ0UsaUNBQWdDLE1BQWdCO1FBQWhCLFdBQU0sR0FBTixNQUFNLENBQVU7SUFBRyxDQUFDO0lBR3BELHNCQUFJLDRDQUFPO2FBQVgsVUFBWSxLQUF5QjtZQUNuQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQzdCO1FBQ0gsQ0FBQzs7O09BQUE7SUFKRDtRQURDLEtBQUssQ0FBQyxjQUFjLENBQUM7OzswREFLckI7SUFSVSx1QkFBdUI7UUFIbkMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGdCQUFnQjtTQUMzQixDQUFDO1FBRWEsbUJBQUEsUUFBUSxFQUFFLENBQUE7aURBQWlCLEtBQUs7T0FEbEMsdUJBQXVCLENBU25DO0lBQUQsOEJBQUM7Q0FBQSxBQVRELElBU0M7U0FUWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPcHRpb25hbCwgVHJhY2tCeUZ1bmN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEl0ZW1zIH0gZnJvbSAnLi9wcm92aWRlcnMvaXRlbXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdGb3JUcmFja0J5XScsXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkSXRlbXNUcmFja0J5PFQgPSBhbnk+IHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcHJpdmF0ZSBfaXRlbXM6IEl0ZW1zPFQ+KSB7fVxuXG4gIEBJbnB1dCgnbmdGb3JUcmFja0J5JylcbiAgc2V0IHRyYWNrQnkodmFsdWU6IFRyYWNrQnlGdW5jdGlvbjxUPikge1xuICAgIGlmICh0aGlzLl9pdGVtcykge1xuICAgICAgdGhpcy5faXRlbXMudHJhY2tCeSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufVxuIl19