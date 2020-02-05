import * as tslib_1 from "tslib";
var DatagridStringFilter_1;
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
import { DatagridStringFilterImpl } from './datagrid-string-filter-impl';
import { ClrPopoverToggleService } from '../../../../utils/popover/providers/popover-toggle.service';
let DatagridStringFilter = DatagridStringFilter_1 = class DatagridStringFilter extends DatagridFilterRegistrar {
    constructor(filters, domAdapter, smartToggleService) {
        super(filters);
        this.domAdapter = domAdapter;
        this.smartToggleService = smartToggleService;
        this.subs = [];
        /**
         * Indicates if the filter dropdown is open
         */
        this.open = false;
        this.filterValueChange = new EventEmitter();
    }
    /**
     * Customizable filter logic based on a search text
     */
    set customStringFilter(value) {
        if (value instanceof RegisteredFilter) {
            this.setFilter(value);
        }
        else {
            this.setFilter(new DatagridStringFilterImpl(value));
        }
    }
    ngAfterViewInit() {
        this.subs.push(this.smartToggleService.openChange.subscribe(openChange => {
            this.open = openChange;
            // The timeout in used because when this executes, the input isn't displayed.
            setTimeout(() => {
                this.domAdapter.focus(this.input.nativeElement);
            });
        }));
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.subs.forEach(sub => sub.unsubscribe());
    }
    /**
     * Common setter for the input value
     */
    get value() {
        return this.filter.value;
    }
    set value(value) {
        if (!this.filter) {
            return;
        }
        if (!value) {
            value = '';
        }
        if (value !== this.filter.value) {
            this.filter.value = value;
            this.filterValueChange.emit(value);
        }
    }
};
tslib_1.__decorate([
    Input('clrDgStringFilter'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], DatagridStringFilter.prototype, "customStringFilter", null);
tslib_1.__decorate([
    ViewChild('input', { static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], DatagridStringFilter.prototype, "input", void 0);
tslib_1.__decorate([
    ViewChild(ClrDatagridFilter, { static: false }),
    tslib_1.__metadata("design:type", ClrDatagridFilter)
], DatagridStringFilter.prototype, "filterContainer", void 0);
tslib_1.__decorate([
    Input('clrFilterValue'),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], DatagridStringFilter.prototype, "value", null);
tslib_1.__decorate([
    Output('clrFilterValueChange'),
    tslib_1.__metadata("design:type", Object)
], DatagridStringFilter.prototype, "filterValueChange", void 0);
DatagridStringFilter = DatagridStringFilter_1 = tslib_1.__decorate([
    Component({
        selector: 'clr-dg-string-filter',
        providers: [{ provide: CustomFilter, useExisting: DatagridStringFilter_1 }],
        template: `
        <clr-dg-filter [clrDgFilter]="registered" [(clrDgFilterOpen)]="open">
            <input #input type="text" name="search" [(ngModel)]="value" class="clr-input" />
        </clr-dg-filter>
    `
    }),
    tslib_1.__metadata("design:paramtypes", [FiltersProvider,
        DomAdapter,
        ClrPopoverToggleService])
], DatagridStringFilter);
export { DatagridStringFilter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtc3RyaW5nLWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvYnVpbHQtaW4vZmlsdGVycy9kYXRhZ3JpZC1zdHJpbmctZmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFeEgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdkUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFFaEYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNERBQTRELENBQUM7QUFXckcsSUFBYSxvQkFBb0IsNEJBQWpDLE1BQWEsb0JBQThCLFNBQVEsdUJBQXVEO0lBR3hHLFlBQ0UsT0FBMkIsRUFDbkIsVUFBc0IsRUFDdEIsa0JBQTJDO1FBRW5ELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUhQLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUF5QjtRQUo3QyxTQUFJLEdBQW1CLEVBQUUsQ0FBQztRQXVCbEM7O1dBRUc7UUFDSSxTQUFJLEdBQVksS0FBSyxDQUFDO1FBa0RHLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFyRXZFLENBQUM7SUFFRDs7T0FFRztJQUVILElBQUksa0JBQWtCLENBQ3BCLEtBQTZGO1FBRTdGLElBQUksS0FBSyxZQUFZLGdCQUFnQixFQUFFO1lBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkI7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3JEO0lBQ0gsQ0FBQztJQWtCRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ1osSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDeEQsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7WUFDdkIsNkVBQTZFO1lBQzdFLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsS0FBSztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQVcsS0FBSyxDQUFDLEtBQWE7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDWjtRQUNELElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQztDQUdGLENBQUE7QUFoRUM7SUFEQyxLQUFLLENBQUMsbUJBQW1CLENBQUM7Ozs4REFTMUI7QUFXRDtJQURDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7c0NBQ3hCLFVBQVU7bURBQUM7QUFNekI7SUFEQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7c0NBQ3hCLGlCQUFpQjs2REFBSTtBQXlCN0M7SUFEQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7OztpREFZdkI7QUFFK0I7SUFBL0IsTUFBTSxDQUFDLHNCQUFzQixDQUFDOzsrREFBd0M7QUE5RTVELG9CQUFvQjtJQVRoQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsc0JBQW9CLEVBQUUsQ0FBQztRQUN6RSxRQUFRLEVBQUU7Ozs7S0FJUDtLQUNKLENBQUM7NkNBS1csZUFBZTtRQUNKLFVBQVU7UUFDRix1QkFBdUI7R0FOMUMsb0JBQW9CLENBK0VoQztTQS9FWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRGaWx0ZXIgfSBmcm9tICcuLi8uLi9kYXRhZ3JpZC1maWx0ZXInO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbnRlcmZhY2UgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3N0cmluZy1maWx0ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IEN1c3RvbUZpbHRlciB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9jdXN0b20tZmlsdGVyJztcbmltcG9ydCB7IEZpbHRlcnNQcm92aWRlciwgUmVnaXN0ZXJlZEZpbHRlciB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9maWx0ZXJzJztcbmltcG9ydCB7IERvbUFkYXB0ZXIgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy9kb20tYWRhcHRlci9kb20tYWRhcHRlcic7XG5pbXBvcnQgeyBEYXRhZ3JpZEZpbHRlclJlZ2lzdHJhciB9IGZyb20gJy4uLy4uL3V0aWxzL2RhdGFncmlkLWZpbHRlci1yZWdpc3RyYXInO1xuXG5pbXBvcnQgeyBEYXRhZ3JpZFN0cmluZ0ZpbHRlckltcGwgfSBmcm9tICcuL2RhdGFncmlkLXN0cmluZy1maWx0ZXItaW1wbCc7XG5pbXBvcnQgeyBDbHJQb3BvdmVyVG9nZ2xlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL3BvcG92ZXIvcHJvdmlkZXJzL3BvcG92ZXItdG9nZ2xlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctc3RyaW5nLWZpbHRlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ3VzdG9tRmlsdGVyLCB1c2VFeGlzdGluZzogRGF0YWdyaWRTdHJpbmdGaWx0ZXIgfV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxjbHItZGctZmlsdGVyIFtjbHJEZ0ZpbHRlcl09XCJyZWdpc3RlcmVkXCIgWyhjbHJEZ0ZpbHRlck9wZW4pXT1cIm9wZW5cIj5cbiAgICAgICAgICAgIDxpbnB1dCAjaW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic2VhcmNoXCIgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiIGNsYXNzPVwiY2xyLWlucHV0XCIgLz5cbiAgICAgICAgPC9jbHItZGctZmlsdGVyPlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIERhdGFncmlkU3RyaW5nRmlsdGVyPFQgPSBhbnk+IGV4dGVuZHMgRGF0YWdyaWRGaWx0ZXJSZWdpc3RyYXI8VCwgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsPFQ+PlxuICBpbXBsZW1lbnRzIEN1c3RvbUZpbHRlciwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBjb25zdHJ1Y3RvcihcbiAgICBmaWx0ZXJzOiBGaWx0ZXJzUHJvdmlkZXI8VD4sXG4gICAgcHJpdmF0ZSBkb21BZGFwdGVyOiBEb21BZGFwdGVyLFxuICAgIHByaXZhdGUgc21hcnRUb2dnbGVTZXJ2aWNlOiBDbHJQb3BvdmVyVG9nZ2xlU2VydmljZVxuICApIHtcbiAgICBzdXBlcihmaWx0ZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXN0b21pemFibGUgZmlsdGVyIGxvZ2ljIGJhc2VkIG9uIGEgc2VhcmNoIHRleHRcbiAgICovXG4gIEBJbnB1dCgnY2xyRGdTdHJpbmdGaWx0ZXInKVxuICBzZXQgY3VzdG9tU3RyaW5nRmlsdGVyKFxuICAgIHZhbHVlOiBDbHJEYXRhZ3JpZFN0cmluZ0ZpbHRlckludGVyZmFjZTxUPiB8IFJlZ2lzdGVyZWRGaWx0ZXI8VCwgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsPFQ+PlxuICApIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBSZWdpc3RlcmVkRmlsdGVyKSB7XG4gICAgICB0aGlzLnNldEZpbHRlcih2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0RmlsdGVyKG5ldyBEYXRhZ3JpZFN0cmluZ0ZpbHRlckltcGwodmFsdWUpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBmaWx0ZXIgZHJvcGRvd24gaXMgb3BlblxuICAgKi9cbiAgcHVibGljIG9wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogV2UgbmVlZCB0aGUgYWN0dWFsIGlucHV0IGVsZW1lbnQgdG8gYXV0b21hdGljYWxseSBmb2N1cyBvbiBpdFxuICAgKi9cbiAgQFZpZXdDaGlsZCgnaW5wdXQnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIGlucHV0OiBFbGVtZW50UmVmO1xuXG4gIC8qKlxuICAgKiBXZSBncmFiIHRoZSBDbHJEYXRhZ3JpZEZpbHRlciB3ZSB3cmFwIHRvIHJlZ2lzdGVyIHRoaXMgU3RyaW5nRmlsdGVyIHRvIGl0LlxuICAgKi9cbiAgQFZpZXdDaGlsZChDbHJEYXRhZ3JpZEZpbHRlciwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBmaWx0ZXJDb250YWluZXI6IENsckRhdGFncmlkRmlsdGVyPFQ+O1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zdWJzLnB1c2goXG4gICAgICB0aGlzLnNtYXJ0VG9nZ2xlU2VydmljZS5vcGVuQ2hhbmdlLnN1YnNjcmliZShvcGVuQ2hhbmdlID0+IHtcbiAgICAgICAgdGhpcy5vcGVuID0gb3BlbkNoYW5nZTtcbiAgICAgICAgLy8gVGhlIHRpbWVvdXQgaW4gdXNlZCBiZWNhdXNlIHdoZW4gdGhpcyBleGVjdXRlcywgdGhlIGlucHV0IGlzbid0IGRpc3BsYXllZC5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kb21BZGFwdGVyLmZvY3VzKHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICB0aGlzLnN1YnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbW1vbiBzZXR0ZXIgZm9yIHRoZSBpbnB1dCB2YWx1ZVxuICAgKi9cbiAgcHVibGljIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIudmFsdWU7XG4gIH1cbiAgQElucHV0KCdjbHJGaWx0ZXJWYWx1ZScpXG4gIHB1YmxpYyBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5maWx0ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdmFsdWUgPSAnJztcbiAgICB9XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLmZpbHRlci52YWx1ZSkge1xuICAgICAgdGhpcy5maWx0ZXIudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRmlsdGVyVmFsdWVDaGFuZ2UnKSBmaWx0ZXJWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbn1cbiJdfQ==