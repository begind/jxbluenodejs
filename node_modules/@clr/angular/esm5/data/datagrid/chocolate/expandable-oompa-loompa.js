import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ChangeDetectorRef, Directive, Optional } from '@angular/core';
import { OompaLoompa } from '../../../utils/chocolate/oompa-loompa';
import { ExpandableRowsCount } from '../providers/global-expandable-rows';
import { DatagridWillyWonka } from './datagrid-willy-wonka';
var ExpandableOompaLoompa = /** @class */ (function (_super) {
    tslib_1.__extends(ExpandableOompaLoompa, _super);
    function ExpandableOompaLoompa(cdr, willyWonka, expandableCount) {
        var _this = this;
        if (!willyWonka) {
            throw new Error('clr-dg-row should only be used inside of a clr-datagrid');
        }
        _this = _super.call(this, cdr, willyWonka) || this;
        _this.expandableCount = expandableCount;
        return _this;
    }
    Object.defineProperty(ExpandableOompaLoompa.prototype, "flavor", {
        get: function () {
            return this.expandableCount.hasExpandableRow;
        },
        enumerable: true,
        configurable: true
    });
    ExpandableOompaLoompa = tslib_1.__decorate([
        Directive({ selector: 'clr-datagrid, clr-dg-row' }),
        tslib_1.__param(1, Optional()),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef,
            DatagridWillyWonka,
            ExpandableRowsCount])
    ], ExpandableOompaLoompa);
    return ExpandableOompaLoompa;
}(OompaLoompa));
export { ExpandableOompaLoompa };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kYWJsZS1vb21wYS1sb29tcGEuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2Nob2NvbGF0ZS9leHBhbmRhYmxlLW9vbXBhLWxvb21wYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUc1RDtJQUEyQyxpREFBVztJQUdwRCwrQkFDRSxHQUFzQixFQUNWLFVBQThCLEVBQzFDLGVBQW9DO1FBSHRDLGlCQVVDO1FBTEMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMseURBQXlELENBQUMsQ0FBQztTQUM1RTtRQUNELFFBQUEsa0JBQU0sR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUFDO1FBQ3ZCLEtBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDOztJQUN6QyxDQUFDO0lBRUQsc0JBQUkseUNBQU07YUFBVjtZQUNFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUMvQyxDQUFDOzs7T0FBQTtJQWpCVSxxQkFBcUI7UUFEakMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLDBCQUEwQixFQUFFLENBQUM7UUFNL0MsbUJBQUEsUUFBUSxFQUFFLENBQUE7aURBRE4saUJBQWlCO1lBQ0Usa0JBQWtCO1lBQ3pCLG1CQUFtQjtPQU4zQixxQkFBcUIsQ0FrQmpDO0lBQUQsNEJBQUM7Q0FBQSxBQWxCRCxDQUEyQyxXQUFXLEdBa0JyRDtTQWxCWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT29tcGFMb29tcGEgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jaG9jb2xhdGUvb29tcGEtbG9vbXBhJztcbmltcG9ydCB7IEV4cGFuZGFibGVSb3dzQ291bnQgfSBmcm9tICcuLi9wcm92aWRlcnMvZ2xvYmFsLWV4cGFuZGFibGUtcm93cyc7XG5pbXBvcnQgeyBEYXRhZ3JpZFdpbGx5V29ua2EgfSBmcm9tICcuL2RhdGFncmlkLXdpbGx5LXdvbmthJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnY2xyLWRhdGFncmlkLCBjbHItZGctcm93JyB9KVxuZXhwb3J0IGNsYXNzIEV4cGFuZGFibGVPb21wYUxvb21wYSBleHRlbmRzIE9vbXBhTG9vbXBhIHtcbiAgcHJpdmF0ZSBleHBhbmRhYmxlQ291bnQ6IEV4cGFuZGFibGVSb3dzQ291bnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSB3aWxseVdvbmthOiBEYXRhZ3JpZFdpbGx5V29ua2EsXG4gICAgZXhwYW5kYWJsZUNvdW50OiBFeHBhbmRhYmxlUm93c0NvdW50XG4gICkge1xuICAgIGlmICghd2lsbHlXb25rYSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbHItZGctcm93IHNob3VsZCBvbmx5IGJlIHVzZWQgaW5zaWRlIG9mIGEgY2xyLWRhdGFncmlkJyk7XG4gICAgfVxuICAgIHN1cGVyKGNkciwgd2lsbHlXb25rYSk7XG4gICAgdGhpcy5leHBhbmRhYmxlQ291bnQgPSBleHBhbmRhYmxlQ291bnQ7XG4gIH1cblxuICBnZXQgZmxhdm9yKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGFuZGFibGVDb3VudC5oYXNFeHBhbmRhYmxlUm93O1xuICB9XG59XG4iXX0=