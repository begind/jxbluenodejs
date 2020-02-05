import * as tslib_1 from "tslib";
var DatagridNumericFilter_1;
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
let DatagridNumericFilter = DatagridNumericFilter_1 = class DatagridNumericFilter extends DatagridFilterRegistrar {
    constructor(filters, domAdapter, commonStrings, popoverToggleService) {
        super(filters);
        this.domAdapter = domAdapter;
        this.commonStrings = commonStrings;
        this.popoverToggleService = popoverToggleService;
        this.subscriptions = [];
        /**
         * Indicates if the filter dropdown is open
         */
        this.open = false;
        this.filterValueChange = new EventEmitter();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }
    /**
     * Customizable filter logic based on high and low values
     */
    set customNumericFilter(value) {
        if (value instanceof RegisteredFilter) {
            this.setFilter(value);
        }
        else {
            this.setFilter(new DatagridNumericFilterImpl(value));
        }
    }
    ngAfterViewInit() {
        this.subscriptions.push(this.popoverToggleService.openChange.subscribe(openChange => {
            this.open = openChange;
            // The timeout in used because when this executes, the input isn't displayed.
            setTimeout(() => {
                this.domAdapter.focus(this.input.nativeElement);
            });
        }));
    }
    /**
     * Common setter for the input values
     */
    get value() {
        return [this.filter.low, this.filter.high];
    }
    set value(values) {
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
    }
    get low() {
        if (typeof this.filter.low === 'number' && isFinite(this.filter.low)) {
            return this.filter.low;
        }
        else {
            // There's not a low limit
            return null;
        }
    }
    get high() {
        if (typeof this.filter.high === 'number' && isFinite(this.filter.high)) {
            return this.filter.high;
        }
        else {
            // There's not a high limit
            return null;
        }
    }
    set low(low) {
        if (typeof low === 'number' && low !== this.filter.low) {
            this.filter.low = low;
            this.filterValueChange.emit([this.filter.low, this.filter.high]);
        }
        else if (typeof low !== 'number') {
            this.filter.low = null;
            this.filterValueChange.emit([this.filter.low, this.filter.high]);
        }
    }
    set high(high) {
        if (typeof high === 'number' && high !== this.filter.high) {
            this.filter.high = high;
            this.filterValueChange.emit([this.filter.low, this.filter.high]);
        }
        else if (typeof high !== 'number') {
            this.filter.high = null;
            this.filterValueChange.emit([this.filter.low, this.filter.high]);
        }
    }
};
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
        template: `
        <clr-dg-filter [clrDgFilter]="registered" [(clrDgFilterOpen)]="open">
            <input class="datagrid-numeric-filter-input" #input_low type="number" name="low" [(ngModel)]="low" 
                   [placeholder]="commonStrings.keys.minValue" [attr.aria-label]="commonStrings.keys.minValue" />
                <span class="datagrid-filter-input-spacer"></span>
            <input class="datagrid-numeric-filter-input" #input_high type="number" name="high" [(ngModel)]="high" 
                   [placeholder]="commonStrings.keys.maxValue" [attr.aria-label]="commonStrings.keys.maxValue" />
        </clr-dg-filter>
    `
    }),
    tslib_1.__metadata("design:paramtypes", [FiltersProvider,
        DomAdapter,
        ClrCommonStringsService,
        ClrPopoverToggleService])
], DatagridNumericFilter);
export { DatagridNumericFilter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtbnVtZXJpYy1maWx0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2J1aWx0LWluL2ZpbHRlcnMvZGF0YWdyaWQtbnVtZXJpYy1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFpQixTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUc3RyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzVFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNoRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQWVyRyxJQUFhLHFCQUFxQiw2QkFBbEMsTUFBYSxxQkFBK0IsU0FBUSx1QkFBd0Q7SUFFMUcsWUFDRSxPQUEyQixFQUNuQixVQUFzQixFQUN2QixhQUFzQyxFQUNyQyxvQkFBNkM7UUFFckQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBSlAsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN2QixrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7UUFDckMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF5QjtRQUsvQyxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFz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TSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDeEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNsRTtJQUNILENBQUM7Q0FHRixDQUFBO0FBeEdDO0lBREMsS0FBSyxDQUFDLG9CQUFvQixDQUFDOzs7Z0VBUzNCO0FBV0Q7SUFEQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO3NDQUM1QixVQUFVO29EQUFDO0FBTXpCO0lBREMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO3NDQUN4QixpQkFBaUI7OERBQUk7QUFxQjdDO0lBREMsS0FBSyxDQUFDLGdCQUFnQixDQUFDOzs7a0RBa0J2QjtBQXdDK0I7SUFBL0IsTUFBTSxDQUFDLHNCQUFzQixDQUFDOztnRUFBd0M7QUE5SDVELHFCQUFxQjtJQWJqQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsdUJBQXVCO1FBQ2pDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsdUJBQXFCLEVBQUUsQ0FBQztRQUMxRSxRQUFRLEVBQUU7Ozs7Ozs7O0tBUVA7S0FDSixDQUFDOzZDQUlXLGVBQWU7UUFDSixVQUFVO1FBQ1IsdUJBQXVCO1FBQ2YsdUJBQXVCO0dBTjVDLHFCQUFxQixDQStIakM7U0EvSFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENsckRhdGFncmlkRmlsdGVyIH0gZnJvbSAnLi4vLi4vZGF0YWdyaWQtZmlsdGVyJztcbmltcG9ydCB7IENsckRhdGFncmlkTnVtZXJpY0ZpbHRlckludGVyZmFjZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvbnVtZXJpYy1maWx0ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IEN1c3RvbUZpbHRlciB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9jdXN0b20tZmlsdGVyJztcbmltcG9ydCB7IEZpbHRlcnNQcm92aWRlciwgUmVnaXN0ZXJlZEZpbHRlciB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9maWx0ZXJzJztcbmltcG9ydCB7IERvbUFkYXB0ZXIgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy9kb20tYWRhcHRlci9kb20tYWRhcHRlcic7XG5pbXBvcnQgeyBEYXRhZ3JpZEZpbHRlclJlZ2lzdHJhciB9IGZyb20gJy4uLy4uL3V0aWxzL2RhdGFncmlkLWZpbHRlci1yZWdpc3RyYXInO1xuaW1wb3J0IHsgRGF0YWdyaWROdW1lcmljRmlsdGVySW1wbCB9IGZyb20gJy4vZGF0YWdyaWQtbnVtZXJpYy1maWx0ZXItaW1wbCc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZSc7XG5pbXBvcnQgeyBDbHJQb3BvdmVyVG9nZ2xlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL3BvcG92ZXIvcHJvdmlkZXJzL3BvcG92ZXItdG9nZ2xlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctbnVtZXJpYy1maWx0ZXInLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEN1c3RvbUZpbHRlciwgdXNlRXhpc3Rpbmc6IERhdGFncmlkTnVtZXJpY0ZpbHRlciB9XSxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGNsci1kZy1maWx0ZXIgW2NsckRnRmlsdGVyXT1cInJlZ2lzdGVyZWRcIiBbKGNsckRnRmlsdGVyT3BlbildPVwib3BlblwiPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZGF0YWdyaWQtbnVtZXJpYy1maWx0ZXItaW5wdXRcIiAjaW5wdXRfbG93IHR5cGU9XCJudW1iZXJcIiBuYW1lPVwibG93XCIgWyhuZ01vZGVsKV09XCJsb3dcIiBcbiAgICAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29tbW9uU3RyaW5ncy5rZXlzLm1pblZhbHVlXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJjb21tb25TdHJpbmdzLmtleXMubWluVmFsdWVcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0YWdyaWQtZmlsdGVyLWlucHV0LXNwYWNlclwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImRhdGFncmlkLW51bWVyaWMtZmlsdGVyLWlucHV0XCIgI2lucHV0X2hpZ2ggdHlwZT1cIm51bWJlclwiIG5hbWU9XCJoaWdoXCIgWyhuZ01vZGVsKV09XCJoaWdoXCIgXG4gICAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbW1vblN0cmluZ3Mua2V5cy5tYXhWYWx1ZVwiIFthdHRyLmFyaWEtbGFiZWxdPVwiY29tbW9uU3RyaW5ncy5rZXlzLm1heFZhbHVlXCIgLz5cbiAgICAgICAgPC9jbHItZGctZmlsdGVyPlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIERhdGFncmlkTnVtZXJpY0ZpbHRlcjxUID0gYW55PiBleHRlbmRzIERhdGFncmlkRmlsdGVyUmVnaXN0cmFyPFQsIERhdGFncmlkTnVtZXJpY0ZpbHRlckltcGw8VD4+XG4gIGltcGxlbWVudHMgQ3VzdG9tRmlsdGVyLCBBZnRlclZpZXdJbml0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgZmlsdGVyczogRmlsdGVyc1Byb3ZpZGVyPFQ+LFxuICAgIHByaXZhdGUgZG9tQWRhcHRlcjogRG9tQWRhcHRlcixcbiAgICBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBwb3BvdmVyVG9nZ2xlU2VydmljZTogQ2xyUG9wb3ZlclRvZ2dsZVNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoZmlsdGVycyk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHtcbiAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEN1c3RvbWl6YWJsZSBmaWx0ZXIgbG9naWMgYmFzZWQgb24gaGlnaCBhbmQgbG93IHZhbHVlc1xuICAgKi9cbiAgQElucHV0KCdjbHJEZ051bWVyaWNGaWx0ZXInKVxuICBzZXQgY3VzdG9tTnVtZXJpY0ZpbHRlcihcbiAgICB2YWx1ZTogQ2xyRGF0YWdyaWROdW1lcmljRmlsdGVySW50ZXJmYWNlPFQ+IHwgUmVnaXN0ZXJlZEZpbHRlcjxULCBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsPFQ+PlxuICApIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBSZWdpc3RlcmVkRmlsdGVyKSB7XG4gICAgICB0aGlzLnNldEZpbHRlcih2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0RmlsdGVyKG5ldyBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsKHZhbHVlKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgZmlsdGVyIGRyb3Bkb3duIGlzIG9wZW5cbiAgICovXG4gIHB1YmxpYyBvcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFdlIG5lZWQgdGhlIGFjdHVhbCBpbnB1dCBlbGVtZW50IHRvIGF1dG9tYXRpY2FsbHkgZm9jdXMgb24gaXRcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ2lucHV0X2xvdycsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgaW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIFdlIGdyYWIgdGhlIENsckRhdGFncmlkRmlsdGVyIHdlIHdyYXAgdG8gcmVnaXN0ZXIgdGhpcyBTdHJpbmdGaWx0ZXIgdG8gaXQuXG4gICAqL1xuICBAVmlld0NoaWxkKENsckRhdGFncmlkRmlsdGVyLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIGZpbHRlckNvbnRhaW5lcjogQ2xyRGF0YWdyaWRGaWx0ZXI8VD47XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMucG9wb3ZlclRvZ2dsZVNlcnZpY2Uub3BlbkNoYW5nZS5zdWJzY3JpYmUob3BlbkNoYW5nZSA9PiB7XG4gICAgICAgIHRoaXMub3BlbiA9IG9wZW5DaGFuZ2U7XG4gICAgICAgIC8vIFRoZSB0aW1lb3V0IGluIHVzZWQgYmVjYXVzZSB3aGVuIHRoaXMgZXhlY3V0ZXMsIHRoZSBpbnB1dCBpc24ndCBkaXNwbGF5ZWQuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZG9tQWRhcHRlci5mb2N1cyh0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21tb24gc2V0dGVyIGZvciB0aGUgaW5wdXQgdmFsdWVzXG4gICAqL1xuICBwdWJsaWMgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiBbdGhpcy5maWx0ZXIubG93LCB0aGlzLmZpbHRlci5oaWdoXTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRmlsdGVyVmFsdWUnKVxuICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlczogW251bWJlciwgbnVtYmVyXSkge1xuICAgIGlmICghdGhpcy5maWx0ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHZhbHVlcyAmJiAodmFsdWVzWzBdICE9PSB0aGlzLmZpbHRlci5sb3cgfHwgdmFsdWVzWzFdICE9PSB0aGlzLmZpbHRlci5oaWdoKSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZXNbMF0gPT09ICdudW1iZXInKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyLmxvdyA9IHZhbHVlc1swXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZmlsdGVyLmxvdyA9IG51bGw7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHZhbHVlc1sxXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhpcy5maWx0ZXIuaGlnaCA9IHZhbHVlc1sxXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZmlsdGVyLmhpZ2ggPSBudWxsO1xuICAgICAgfVxuICAgICAgdGhpcy5maWx0ZXJWYWx1ZUNoYW5nZS5lbWl0KHZhbHVlcyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBsb3coKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmZpbHRlci5sb3cgPT09ICdudW1iZXInICYmIGlzRmluaXRlKHRoaXMuZmlsdGVyLmxvdykpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlci5sb3c7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoZXJlJ3Mgbm90IGEgbG93IGxpbWl0XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGhpZ2goKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmZpbHRlci5oaWdoID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh0aGlzLmZpbHRlci5oaWdoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyLmhpZ2g7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoZXJlJ3Mgbm90IGEgaGlnaCBsaW1pdFxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBsb3cobG93OiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIGxvdyA9PT0gJ251bWJlcicgJiYgbG93ICE9PSB0aGlzLmZpbHRlci5sb3cpIHtcbiAgICAgIHRoaXMuZmlsdGVyLmxvdyA9IGxvdztcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWVDaGFuZ2UuZW1pdChbdGhpcy5maWx0ZXIubG93LCB0aGlzLmZpbHRlci5oaWdoXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbG93ICE9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5maWx0ZXIubG93ID0gbnVsbDtcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWVDaGFuZ2UuZW1pdChbdGhpcy5maWx0ZXIubG93LCB0aGlzLmZpbHRlci5oaWdoXSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBoaWdoKGhpZ2g6IG51bWJlciB8IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgaGlnaCA9PT0gJ251bWJlcicgJiYgaGlnaCAhPT0gdGhpcy5maWx0ZXIuaGlnaCkge1xuICAgICAgdGhpcy5maWx0ZXIuaGlnaCA9IGhpZ2g7XG4gICAgICB0aGlzLmZpbHRlclZhbHVlQ2hhbmdlLmVtaXQoW3RoaXMuZmlsdGVyLmxvdywgdGhpcy5maWx0ZXIuaGlnaF0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGhpZ2ggIT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLmZpbHRlci5oaWdoID0gbnVsbDtcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWVDaGFuZ2UuZW1pdChbdGhpcy5maWx0ZXIubG93LCB0aGlzLmZpbHRlci5oaWdoXSk7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRmlsdGVyVmFsdWVDaGFuZ2UnKSBmaWx0ZXJWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbn1cbiJdfQ==