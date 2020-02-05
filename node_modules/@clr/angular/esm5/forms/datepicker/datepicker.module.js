/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '../../icon/icon.module';
import { ClrConditionalModule } from '../../utils/conditional/conditional.module';
import { ClrFocusTrapModule } from '../../utils/focus-trap/focus-trap.module';
import { ClrHostWrappingModule } from '../../utils/host-wrapping/host-wrapping.module';
import { ClrCommonFormsModule } from '../common/common.module';
import { ClrCalendar } from './calendar';
import { ClrDateContainer } from './date-container';
import { ClrDateInput } from './date-input';
import { ClrDatepickerViewManager } from './datepicker-view-manager';
import { ClrDay } from './day';
import { ClrDaypicker } from './daypicker';
import { ClrMonthpicker } from './monthpicker';
import { ClrYearpicker } from './yearpicker';
export var CLR_DATEPICKER_DIRECTIVES = [
    ClrDay,
    ClrDateContainer,
    ClrDateInput,
    ClrDatepickerViewManager,
    ClrMonthpicker,
    ClrYearpicker,
    ClrDaypicker,
    ClrCalendar,
];
var ClrDatepickerModule = /** @class */ (function () {
    function ClrDatepickerModule() {
    }
    ClrDatepickerModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                ClrHostWrappingModule,
                ClrConditionalModule,
                ClrIconModule,
                ClrFocusTrapModule,
                ClrCommonFormsModule,
            ],
            declarations: [CLR_DATEPICKER_DIRECTIVES],
            exports: [CLR_DATEPICKER_DIRECTIVES],
            entryComponents: [ClrDateContainer],
        })
    ], ClrDatepickerModule);
    return ClrDatepickerModule;
}());
export { ClrDatepickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL2RhdGVwaWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRS9ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTdDLE1BQU0sQ0FBQyxJQUFNLHlCQUF5QixHQUFnQjtJQUNwRCxNQUFNO0lBQ04sZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWix3QkFBd0I7SUFDeEIsY0FBYztJQUNkLGFBQWE7SUFDYixZQUFZO0lBQ1osV0FBVztDQUNaLENBQUM7QUFlRjtJQUFBO0lBQWtDLENBQUM7SUFBdEIsbUJBQW1CO1FBYi9CLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLHFCQUFxQjtnQkFDckIsb0JBQW9CO2dCQUNwQixhQUFhO2dCQUNiLGtCQUFrQjtnQkFDbEIsb0JBQW9CO2FBQ3JCO1lBQ0QsWUFBWSxFQUFFLENBQUMseUJBQXlCLENBQUM7WUFDekMsT0FBTyxFQUFFLENBQUMseUJBQXlCLENBQUM7WUFDcEMsZUFBZSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7U0FDcEMsQ0FBQztPQUNXLG1CQUFtQixDQUFHO0lBQUQsMEJBQUM7Q0FBQSxBQUFuQyxJQUFtQztTQUF0QixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbHJJY29uTW9kdWxlIH0gZnJvbSAnLi4vLi4vaWNvbi9pY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJDb25kaXRpb25hbE1vZHVsZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2NvbmRpdGlvbmFsLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJGb2N1c1RyYXBNb2R1bGUgfSBmcm9tICcuLi8uLi91dGlscy9mb2N1cy10cmFwL2ZvY3VzLXRyYXAubW9kdWxlJztcbmltcG9ydCB7IENsckhvc3RXcmFwcGluZ01vZHVsZSB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvaG9zdC13cmFwcGluZy5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uRm9ybXNNb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY29tbW9uLm1vZHVsZSc7XG5cbmltcG9ydCB7IENsckNhbGVuZGFyIH0gZnJvbSAnLi9jYWxlbmRhcic7XG5pbXBvcnQgeyBDbHJEYXRlQ29udGFpbmVyIH0gZnJvbSAnLi9kYXRlLWNvbnRhaW5lcic7XG5pbXBvcnQgeyBDbHJEYXRlSW5wdXQgfSBmcm9tICcuL2RhdGUtaW5wdXQnO1xuaW1wb3J0IHsgQ2xyRGF0ZXBpY2tlclZpZXdNYW5hZ2VyIH0gZnJvbSAnLi9kYXRlcGlja2VyLXZpZXctbWFuYWdlcic7XG5pbXBvcnQgeyBDbHJEYXkgfSBmcm9tICcuL2RheSc7XG5pbXBvcnQgeyBDbHJEYXlwaWNrZXIgfSBmcm9tICcuL2RheXBpY2tlcic7XG5pbXBvcnQgeyBDbHJNb250aHBpY2tlciB9IGZyb20gJy4vbW9udGhwaWNrZXInO1xuaW1wb3J0IHsgQ2xyWWVhcnBpY2tlciB9IGZyb20gJy4veWVhcnBpY2tlcic7XG5cbmV4cG9ydCBjb25zdCBDTFJfREFURVBJQ0tFUl9ESVJFQ1RJVkVTOiBUeXBlPGFueT5bXSA9IFtcbiAgQ2xyRGF5LFxuICBDbHJEYXRlQ29udGFpbmVyLFxuICBDbHJEYXRlSW5wdXQsXG4gIENsckRhdGVwaWNrZXJWaWV3TWFuYWdlcixcbiAgQ2xyTW9udGhwaWNrZXIsXG4gIENsclllYXJwaWNrZXIsXG4gIENsckRheXBpY2tlcixcbiAgQ2xyQ2FsZW5kYXIsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENsckhvc3RXcmFwcGluZ01vZHVsZSxcbiAgICBDbHJDb25kaXRpb25hbE1vZHVsZSxcbiAgICBDbHJJY29uTW9kdWxlLFxuICAgIENsckZvY3VzVHJhcE1vZHVsZSxcbiAgICBDbHJDb21tb25Gb3Jtc01vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ0xSX0RBVEVQSUNLRVJfRElSRUNUSVZFU10sXG4gIGV4cG9ydHM6IFtDTFJfREFURVBJQ0tFUl9ESVJFQ1RJVkVTXSxcbiAgZW50cnlDb21wb25lbnRzOiBbQ2xyRGF0ZUNvbnRhaW5lcl0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGVwaWNrZXJNb2R1bGUge31cbiJdfQ==