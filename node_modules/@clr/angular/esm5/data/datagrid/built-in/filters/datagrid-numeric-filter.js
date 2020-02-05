import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ClrDatagridFilter } from '../../datagrid-filter';
import { CustomFilter } from '../../providers/custom-filter';
import { FiltersProvider, RegisteredFilter } from '../../providers/filters';
import { DomAdapter } from '../../../../utils/dom-adapter/dom-adapter';
import { DatagridFilterRegistrar } from '../../utils/datagrid-filter-registrar';
import { DatagridNumericFilterImpl } from './datagrid-numeric-filter-impl';
import { ClrCommonStringsService } from '../../../../utils/i18n/common-strings.service';
import { ClrPopoverToggleService } from '../../../../utils/popover/providers/popover-toggle.service';
var DatagridNumericFilter = /** @class */ (function (_super) {
    tslib_1.__extends(DatagridNumericFilter, _super);
    function DatagridNumericFilter(filters, domAdapter, commonStrings, popoverToggleService) {
        var _this = _super.call(this, filters) || this;
        _this.domAdapter = domAdapter;
        _this.commonStrings = commonStrings;
        _this.popoverToggleService = popoverToggleService;
        _this.subscriptions = [];
        /**
         * Indicates if the filter dropdown is open
         */
        _this.open = false;
        _this.filterValueChange = new EventEmitter();
        return _this;
    }
    DatagridNumericFilter_1 = DatagridNumericFilter;
    DatagridNumericFilter.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    Object.defineProperty(DatagridNumericFilter.prototype, "customNumericFilter", {
        /**
         * Customizable filter logic based on high and low values
         */
        set: function (value) {
            if (value instanceof RegisteredFilter) {
                this.setFilter(value);
            }
            else {
                this.setFilter(new DatagridNumericFilterImpl(value));
            }
        },
        enumerable: true,
        configurable: true
    });
    DatagridNumericFilter.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.subscriptions.push(this.popoverToggleService.openChange.subscribe(function (openChange) {
            _this.open = openChange;
            // The timeout in used because when this executes, the input isn't displayed.
            setTimeout(function () {
                _this.domAdapter.focus(_this.input.nativeElement);
            });
        }));
    };
    Object.defineProperty(DatagridNumericFilter.prototype, "value", {
        /**
         * Common setter for the input values
         */
        get: function () {
            return [this.filter.low, this.filter.high];
        },
        set: function (values) {
            if (!this.filter) {
                return;
            }
            if (values && (values[0] !== this.filter.low || values[1] !== this.filter.high)) {
                if (typeof values[0] === 'number') {
                    this.filter.low = values[0];
                }
                else {
                    this.filter.low = null;
                }
                if (typeof values[1] === 'number') {
                    this.filter.high = values[1];
                }
                else {
                    this.filter.high = null;
                }
                this.filterValueChange.emit(values);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridNumericFilter.prototype, "low", {
        get: function () {
            if (typeof this.filter.low === 'number' && isFinite(this.filter.low)) {
                return this.filter.low;
            }
            else {
                // There's not a low limit
                return null;
            }
        },
        set: function (low) {
            if (typeof low === 'number' && low !== this.filter.low) {
                this.filter.low = low;
                this.filterValueChange.emit([this.filter.low, this.filter.high]);
            }
            else if (typeof low !== 'number') {
                this.filter.low = null;
                this.filterValueChange.emit([this.filter.low, this.filter.high]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridNumericFilter.prototype, "high", {
        get: function () {
            if (typeof this.filter.high === 'number' && isFinite(this.filter.high)) {
                return this.filter.high;
            }
            else {
                // There's not a high limit
                return null;
            }
        },
        set: function (high) {
            if (typeof high === 'number' && high !== this.filter.high) {
                this.filter.high = high;
                this.filterValueChange.emit([this.filter.low, this.filter.high]);
            }
            else if (typeof high !== 'number') {
                this.filter.high = null;
                this.filterValueChange.emit([this.filter.low, this.filter.high]);
            }
        },
        enumerable: true,
        configurable: true
    });
    var DatagridNumericFilter_1;
    tslib_1.__decorate([
        Input('clrDgNumericFilter'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], DatagridNumericFilter.prototype, "customNumericFilter", null);
    tslib_1.__decorate([
        ViewChild('input_low', { static: false }),
        tslib_1.__metadata("design:type", ElementRef)
    ], DatagridNumericFilter.prototype, "input", void 0);
    tslib_1.__decorate([
        ViewChild(ClrDatagridFilter, { static: false }),
        tslib_1.__metadata("design:type", ClrDatagridFilter)
    ], DatagridNumericFilter.prototype, "filterContainer", void 0);
    tslib_1.__decorate([
        Input('clrFilterValue'),
        tslib_1.__metadata("design:type", Array),
        tslib_1.__metadata("design:paramtypes", [Array])
    ], DatagridNumericFilter.prototype, "value", null);
    tslib_1.__decorate([
        Output('clrFilterValueChange'),
        tslib_1.__metadata("design:type", Object)
    ], DatagridNumericFilter.prototype, "filterValueChange", void 0);
    DatagridNumericFilter = DatagridNumericFilter_1 = tslib_1.__decorate([
        Component({
            selector: 'clr-dg-numeric-filter',
            providers: [{ provide: CustomFilter, useExisting: DatagridNumericFilter_1 }],
            template: "\n        <clr-dg-filter [clrDgFilter]=\"registered\" [(clrDgFilterOpen)]=\"open\">\n            <input class=\"datagrid-numeric-filter-input\" #input_low type=\"number\" name=\"low\" [(ngModel)]=\"low\" \n                   [placeholder]=\"commonStrings.keys.minValue\" [attr.aria-label]=\"commonStrings.keys.minValue\" />\n                <span class=\"datagrid-filter-input-spacer\"></span>\n            <input class=\"datagrid-numeric-filter-input\" #input_high type=\"number\" name=\"high\" [(ngModel)]=\"high\" \n                   [placeholder]=\"commonStrings.keys.maxValue\" [attr.aria-label]=\"commonStrings.keys.maxValue\" />\n        </clr-dg-filter>\n    "
        }),
        tslib_1.__metadata("design:paramtypes", [FiltersProvider,
            DomAdapter,
            ClrCommonStringsService,
            ClrPopoverToggleService])
    ], DatagridNumericFilter);
    return DatagridNumericFilter;
}(DatagridFilterRegistrar));
export { DatagridNumericFilter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtbnVtZXJpYy1maWx0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2J1aWx0LWluL2ZpbHRlcnMvZGF0YWdyaWQtbnVtZXJpYy1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzdHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDNUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBZXJHO0lBQW9ELGlEQUF3RDtJQUUxRywrQkFDRSxPQUEyQixFQUNuQixVQUFzQixFQUN2QixhQUFzQyxFQUNyQyxvQkFBNkM7UUFKdkQsWUFNRSxrQkFBTSxPQUFPLENBQUMsU0FDZjtRQUxTLGdCQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3ZCLG1CQUFhLEdBQWIsYUFBYSxDQUF5QjtRQUNyQywwQkFBb0IsR0FBcEIsb0JBQW9CLENBQXlCO1FBSy9DLG1CQUFhLEdBQW1CLEVBQUUsQ0FBQztRQXNCM0M7O1dBRUc7UUFDSSxVQUFJLEdBQVksS0FBSyxDQUFDO1FBMEZHLHVCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7O0lBckh2RSxDQUFDOzhCQVRVLHFCQUFxQjtJQWFoQywyQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQzVCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFNRCxzQkFBSSxzREFBbUI7UUFKdkI7O1dBRUc7YUFFSCxVQUNFLEtBQStGO1lBRS9GLElBQUksS0FBSyxZQUFZLGdCQUFnQixFQUFFO2dCQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3REO1FBQ0gsQ0FBQzs7O09BQUE7SUFrQkQsK0NBQWUsR0FBZjtRQUFBLGlCQVVDO1FBVEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsVUFBVTtZQUN2RCxLQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztZQUN2Qiw2RUFBNkU7WUFDN0UsVUFBVSxDQUFDO2dCQUNULEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUtELHNCQUFXLHdDQUFLO1FBSGhCOztXQUVHO2FBQ0g7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxDQUFDO2FBR0QsVUFBaUIsTUFBd0I7WUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hCLE9BQU87YUFDUjtZQUNELElBQUksTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMvRSxJQUFJLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtvQkFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM3QjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7aUJBQ3hCO2dCQUNELElBQUksT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO29CQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzlCO3FCQUFNO29CQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztpQkFDekI7Z0JBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNyQztRQUNILENBQUM7OztPQXBCQTtJQXNCRCxzQkFBVyxzQ0FBRzthQUFkO1lBQ0UsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDcEUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUN4QjtpQkFBTTtnQkFDTCwwQkFBMEI7Z0JBQzFCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7UUFDSCxDQUFDO2FBV0QsVUFBZSxHQUFvQjtZQUNqQyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7Z0JBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNsRTtpQkFBTSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ2xFO1FBQ0gsQ0FBQzs7O09BbkJBO0lBRUQsc0JBQVcsdUNBQUk7YUFBZjtZQUNFLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3RFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDekI7aUJBQU07Z0JBQ0wsMkJBQTJCO2dCQUMzQixPQUFPLElBQUksQ0FBQzthQUNiO1FBQ0gsQ0FBQzthQVlELFVBQWdCLElBQXFCO1lBQ25DLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ2xFO2lCQUFNLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDbEU7UUFDSCxDQUFDOzs7T0FwQkE7O0lBakZEO1FBREMsS0FBSyxDQUFDLG9CQUFvQixDQUFDOzs7b0VBUzNCO0lBV0Q7UUFEQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzBDQUM1QixVQUFVO3dEQUFDO0lBTXpCO1FBREMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzBDQUN4QixpQkFBaUI7a0VBQUk7SUFxQjdDO1FBREMsS0FBSyxDQUFDLGdCQUFnQixDQUFDOzs7c0RBa0J2QjtJQXdDK0I7UUFBL0IsTUFBTSxDQUFDLHNCQUFzQixDQUFDOztvRUFBd0M7SUE5SDVELHFCQUFxQjtRQWJqQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsdUJBQXFCLEVBQUUsQ0FBQztZQUMxRSxRQUFRLEVBQUUsOHBCQVFQO1NBQ0osQ0FBQztpREFJVyxlQUFlO1lBQ0osVUFBVTtZQUNSLHVCQUF1QjtZQUNmLHVCQUF1QjtPQU41QyxxQkFBcUIsQ0ErSGpDO0lBQUQsNEJBQUM7Q0FBQSxBQS9IRCxDQUFvRCx1QkFBdUIsR0ErSDFFO1NBL0hZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDbHJEYXRhZ3JpZEZpbHRlciB9IGZyb20gJy4uLy4uL2RhdGFncmlkLWZpbHRlcic7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbnRlcmZhY2UgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL251bWVyaWMtZmlsdGVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDdXN0b21GaWx0ZXIgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvY3VzdG9tLWZpbHRlcic7XG5pbXBvcnQgeyBGaWx0ZXJzUHJvdmlkZXIsIFJlZ2lzdGVyZWRGaWx0ZXIgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvZmlsdGVycyc7XG5pbXBvcnQgeyBEb21BZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvZG9tLWFkYXB0ZXIvZG9tLWFkYXB0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRGaWx0ZXJSZWdpc3RyYXIgfSBmcm9tICcuLi8uLi91dGlscy9kYXRhZ3JpZC1maWx0ZXItcmVnaXN0cmFyJztcbmltcG9ydCB7IERhdGFncmlkTnVtZXJpY0ZpbHRlckltcGwgfSBmcm9tICcuL2RhdGFncmlkLW51bWVyaWMtZmlsdGVyLWltcGwnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyUG9wb3ZlclRvZ2dsZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy9wb3BvdmVyL3Byb3ZpZGVycy9wb3BvdmVyLXRvZ2dsZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLW51bWVyaWMtZmlsdGVyJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDdXN0b21GaWx0ZXIsIHVzZUV4aXN0aW5nOiBEYXRhZ3JpZE51bWVyaWNGaWx0ZXIgfV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxjbHItZGctZmlsdGVyIFtjbHJEZ0ZpbHRlcl09XCJyZWdpc3RlcmVkXCIgWyhjbHJEZ0ZpbHRlck9wZW4pXT1cIm9wZW5cIj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImRhdGFncmlkLW51bWVyaWMtZmlsdGVyLWlucHV0XCIgI2lucHV0X2xvdyB0eXBlPVwibnVtYmVyXCIgbmFtZT1cImxvd1wiIFsobmdNb2RlbCldPVwibG93XCIgXG4gICAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbW1vblN0cmluZ3Mua2V5cy5taW5WYWx1ZVwiIFthdHRyLmFyaWEtbGFiZWxdPVwiY29tbW9uU3RyaW5ncy5rZXlzLm1pblZhbHVlXCIgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGFncmlkLWZpbHRlci1pbnB1dC1zcGFjZXJcIj48L3NwYW4+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJkYXRhZ3JpZC1udW1lcmljLWZpbHRlci1pbnB1dFwiICNpbnB1dF9oaWdoIHR5cGU9XCJudW1iZXJcIiBuYW1lPVwiaGlnaFwiIFsobmdNb2RlbCldPVwiaGlnaFwiIFxuICAgICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb21tb25TdHJpbmdzLmtleXMubWF4VmFsdWVcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImNvbW1vblN0cmluZ3Mua2V5cy5tYXhWYWx1ZVwiIC8+XG4gICAgICAgIDwvY2xyLWRnLWZpbHRlcj5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZE51bWVyaWNGaWx0ZXI8VCA9IGFueT4gZXh0ZW5kcyBEYXRhZ3JpZEZpbHRlclJlZ2lzdHJhcjxULCBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsPFQ+PlxuICBpbXBsZW1lbnRzIEN1c3RvbUZpbHRlciwgQWZ0ZXJWaWV3SW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGZpbHRlcnM6IEZpbHRlcnNQcm92aWRlcjxUPixcbiAgICBwcml2YXRlIGRvbUFkYXB0ZXI6IERvbUFkYXB0ZXIsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlLFxuICAgIHByaXZhdGUgcG9wb3ZlclRvZ2dsZVNlcnZpY2U6IENsclBvcG92ZXJUb2dnbGVTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGZpbHRlcnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiB7XG4gICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXN0b21pemFibGUgZmlsdGVyIGxvZ2ljIGJhc2VkIG9uIGhpZ2ggYW5kIGxvdyB2YWx1ZXNcbiAgICovXG4gIEBJbnB1dCgnY2xyRGdOdW1lcmljRmlsdGVyJylcbiAgc2V0IGN1c3RvbU51bWVyaWNGaWx0ZXIoXG4gICAgdmFsdWU6IENsckRhdGFncmlkTnVtZXJpY0ZpbHRlckludGVyZmFjZTxUPiB8IFJlZ2lzdGVyZWRGaWx0ZXI8VCwgRGF0YWdyaWROdW1lcmljRmlsdGVySW1wbDxUPj5cbiAgKSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgUmVnaXN0ZXJlZEZpbHRlcikge1xuICAgICAgdGhpcy5zZXRGaWx0ZXIodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldEZpbHRlcihuZXcgRGF0YWdyaWROdW1lcmljRmlsdGVySW1wbCh2YWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGZpbHRlciBkcm9wZG93biBpcyBvcGVuXG4gICAqL1xuICBwdWJsaWMgb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBXZSBuZWVkIHRoZSBhY3R1YWwgaW5wdXQgZWxlbWVudCB0byBhdXRvbWF0aWNhbGx5IGZvY3VzIG9uIGl0XG4gICAqL1xuICBAVmlld0NoaWxkKCdpbnB1dF9sb3cnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIGlucHV0OiBFbGVtZW50UmVmO1xuXG4gIC8qKlxuICAgKiBXZSBncmFiIHRoZSBDbHJEYXRhZ3JpZEZpbHRlciB3ZSB3cmFwIHRvIHJlZ2lzdGVyIHRoaXMgU3RyaW5nRmlsdGVyIHRvIGl0LlxuICAgKi9cbiAgQFZpZXdDaGlsZChDbHJEYXRhZ3JpZEZpbHRlciwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBmaWx0ZXJDb250YWluZXI6IENsckRhdGFncmlkRmlsdGVyPFQ+O1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLnBvcG92ZXJUb2dnbGVTZXJ2aWNlLm9wZW5DaGFuZ2Uuc3Vic2NyaWJlKG9wZW5DaGFuZ2UgPT4ge1xuICAgICAgICB0aGlzLm9wZW4gPSBvcGVuQ2hhbmdlO1xuICAgICAgICAvLyBUaGUgdGltZW91dCBpbiB1c2VkIGJlY2F1c2Ugd2hlbiB0aGlzIGV4ZWN1dGVzLCB0aGUgaW5wdXQgaXNuJ3QgZGlzcGxheWVkLlxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmRvbUFkYXB0ZXIuZm9jdXModGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ29tbW9uIHNldHRlciBmb3IgdGhlIGlucHV0IHZhbHVlc1xuICAgKi9cbiAgcHVibGljIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gW3RoaXMuZmlsdGVyLmxvdywgdGhpcy5maWx0ZXIuaGlnaF07XG4gIH1cblxuICBASW5wdXQoJ2NsckZpbHRlclZhbHVlJylcbiAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZXM6IFtudW1iZXIsIG51bWJlcl0pIHtcbiAgICBpZiAoIXRoaXMuZmlsdGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh2YWx1ZXMgJiYgKHZhbHVlc1swXSAhPT0gdGhpcy5maWx0ZXIubG93IHx8IHZhbHVlc1sxXSAhPT0gdGhpcy5maWx0ZXIuaGlnaCkpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWVzWzBdID09PSAnbnVtYmVyJykge1xuICAgICAgICB0aGlzLmZpbHRlci5sb3cgPSB2YWx1ZXNbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZpbHRlci5sb3cgPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZXNbMV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyLmhpZ2ggPSB2YWx1ZXNbMV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZpbHRlci5oaWdoID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHRoaXMuZmlsdGVyVmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZXMpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgbG93KCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5maWx0ZXIubG93ID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh0aGlzLmZpbHRlci5sb3cpKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXIubG93O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGVyZSdzIG5vdCBhIGxvdyBsaW1pdFxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBoaWdoKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5maWx0ZXIuaGlnaCA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUodGhpcy5maWx0ZXIuaGlnaCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlci5oaWdoO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGVyZSdzIG5vdCBhIGhpZ2ggbGltaXRcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgbG93KGxvdzogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBsb3cgPT09ICdudW1iZXInICYmIGxvdyAhPT0gdGhpcy5maWx0ZXIubG93KSB7XG4gICAgICB0aGlzLmZpbHRlci5sb3cgPSBsb3c7XG4gICAgICB0aGlzLmZpbHRlclZhbHVlQ2hhbmdlLmVtaXQoW3RoaXMuZmlsdGVyLmxvdywgdGhpcy5maWx0ZXIuaGlnaF0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGxvdyAhPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuZmlsdGVyLmxvdyA9IG51bGw7XG4gICAgICB0aGlzLmZpbHRlclZhbHVlQ2hhbmdlLmVtaXQoW3RoaXMuZmlsdGVyLmxvdywgdGhpcy5maWx0ZXIuaGlnaF0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgaGlnaChoaWdoOiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIGhpZ2ggPT09ICdudW1iZXInICYmIGhpZ2ggIT09IHRoaXMuZmlsdGVyLmhpZ2gpIHtcbiAgICAgIHRoaXMuZmlsdGVyLmhpZ2ggPSBoaWdoO1xuICAgICAgdGhpcy5maWx0ZXJWYWx1ZUNoYW5nZS5lbWl0KFt0aGlzLmZpbHRlci5sb3csIHRoaXMuZmlsdGVyLmhpZ2hdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBoaWdoICE9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5maWx0ZXIuaGlnaCA9IG51bGw7XG4gICAgICB0aGlzLmZpbHRlclZhbHVlQ2hhbmdlLmVtaXQoW3RoaXMuZmlsdGVyLmxvdywgdGhpcy5maWx0ZXIuaGlnaF0pO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckZpbHRlclZhbHVlQ2hhbmdlJykgZmlsdGVyVmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG59XG4iXX0=