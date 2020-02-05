/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { DayViewModel } from './model/day-view.model';
import { DateFormControlService } from './providers/date-form-control.service';
import { DateNavigationService } from './providers/date-navigation.service';
let ClrDay = class ClrDay {
    constructor(_dateNavigationService, _ifOpenService, dateFormControlService) {
        this._dateNavigationService = _dateNavigationService;
        this._ifOpenService = _ifOpenService;
        this.dateFormControlService = dateFormControlService;
    }
    /**
     * DayViewModel input which is used to build the Day View.
     */
    set dayView(day) {
        this._dayView = day;
        this.dayString = this._dayView.dayModel.toDateString();
    }
    get dayView() {
        return this._dayView;
    }
    /**
     * Updates the focusedDay in the DateNavigationService when the ClrDay is focused.
     */
    onDayViewFocus() {
        this._dateNavigationService.focusedDay = this.dayView.dayModel;
    }
    /**
     * Updates the selectedDay when the ClrDay is selected and closes the datepicker popover.
     */
    selectDay() {
        const day = this.dayView.dayModel;
        this._dateNavigationService.notifySelectedDayChanged(day);
        this.dateFormControlService.markAsDirty();
        this._ifOpenService.open = false;
    }
};
tslib_1.__decorate([
    Input('clrDayView'),
    tslib_1.__metadata("design:type", DayViewModel),
    tslib_1.__metadata("design:paramtypes", [DayViewModel])
], ClrDay.prototype, "dayView", null);
ClrDay = tslib_1.__decorate([
    Component({
        selector: 'clr-day',
        template: `
        <button
            class="day-btn"
            type="button"
            [class.is-today]="dayView.isTodaysDate"
            [class.is-disabled]="dayView.isDisabled"
            [class.is-selected]="dayView.isSelected"
            [attr.tabindex]="dayView.tabIndex"
            (click)="selectDay()"
            (focus)="onDayViewFocus()"
            [attr.aria-label]="dayString">
            {{dayView.dayModel.date}}
        </button>
    `,
        host: { '[class.day]': 'true' }
    }),
    tslib_1.__metadata("design:paramtypes", [DateNavigationService,
        IfOpenService,
        DateFormControlService])
], ClrDay);
export { ClrDay };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvZGF0ZXBpY2tlci9kYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFeEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXRELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBb0I1RSxJQUFhLE1BQU0sR0FBbkIsTUFBYSxNQUFNO0lBSWpCLFlBQ1Usc0JBQTZDLEVBQzdDLGNBQTZCLEVBQzdCLHNCQUE4QztRQUY5QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVCO1FBQzdDLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7SUFDckQsQ0FBQztJQUVKOztPQUVHO0lBR0gsSUFBVyxPQUFPLENBQUMsR0FBaUI7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6RCxDQUFDO0lBRUQsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxjQUFjO1FBQ1osSUFBSSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUNqRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTO1FBQ1AsTUFBTSxHQUFHLEdBQWEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDNUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQztDQUNGLENBQUE7QUF6QkM7SUFEQyxLQUFLLENBQUMsWUFBWSxDQUFDO3NDQUNJLFlBQVk7NkNBQVosWUFBWTtxQ0FHbkM7QUFsQlUsTUFBTTtJQWxCbEIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFNBQVM7UUFDbkIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7O0tBYVA7UUFDSCxJQUFJLEVBQUUsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFO0tBQ2hDLENBQUM7NkNBTWtDLHFCQUFxQjtRQUM3QixhQUFhO1FBQ0wsc0JBQXNCO0dBUDdDLE1BQU0sQ0F3Q2xCO1NBeENZLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSWZPcGVuU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLW9wZW4uc2VydmljZSc7XG5cbmltcG9ydCB7IERheVZpZXdNb2RlbCB9IGZyb20gJy4vbW9kZWwvZGF5LXZpZXcubW9kZWwnO1xuaW1wb3J0IHsgRGF5TW9kZWwgfSBmcm9tICcuL21vZGVsL2RheS5tb2RlbCc7XG5pbXBvcnQgeyBEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1mb3JtLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLW5hdmlnYXRpb24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kYXknLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzcz1cImRheS1idG5cIlxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBbY2xhc3MuaXMtdG9kYXldPVwiZGF5Vmlldy5pc1RvZGF5c0RhdGVcIlxuICAgICAgICAgICAgW2NsYXNzLmlzLWRpc2FibGVkXT1cImRheVZpZXcuaXNEaXNhYmxlZFwiXG4gICAgICAgICAgICBbY2xhc3MuaXMtc2VsZWN0ZWRdPVwiZGF5Vmlldy5pc1NlbGVjdGVkXCJcbiAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cImRheVZpZXcudGFiSW5kZXhcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdERheSgpXCJcbiAgICAgICAgICAgIChmb2N1cyk9XCJvbkRheVZpZXdGb2N1cygpXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZGF5U3RyaW5nXCI+XG4gICAgICAgICAgICB7e2RheVZpZXcuZGF5TW9kZWwuZGF0ZX19XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIGAsXG4gIGhvc3Q6IHsgJ1tjbGFzcy5kYXldJzogJ3RydWUnIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRheSB7XG4gIHByaXZhdGUgX2RheVZpZXc6IERheVZpZXdNb2RlbDtcbiAgcHVibGljIGRheVN0cmluZzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2RhdGVOYXZpZ2F0aW9uU2VydmljZTogRGF0ZU5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgX2lmT3BlblNlcnZpY2U6IElmT3BlblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkYXRlRm9ybUNvbnRyb2xTZXJ2aWNlOiBEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogRGF5Vmlld01vZGVsIGlucHV0IHdoaWNoIGlzIHVzZWQgdG8gYnVpbGQgdGhlIERheSBWaWV3LlxuICAgKi9cblxuICBASW5wdXQoJ2NsckRheVZpZXcnKVxuICBwdWJsaWMgc2V0IGRheVZpZXcoZGF5OiBEYXlWaWV3TW9kZWwpIHtcbiAgICB0aGlzLl9kYXlWaWV3ID0gZGF5O1xuICAgIHRoaXMuZGF5U3RyaW5nID0gdGhpcy5fZGF5Vmlldy5kYXlNb2RlbC50b0RhdGVTdHJpbmcoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZGF5VmlldygpOiBEYXlWaWV3TW9kZWwge1xuICAgIHJldHVybiB0aGlzLl9kYXlWaWV3O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGZvY3VzZWREYXkgaW4gdGhlIERhdGVOYXZpZ2F0aW9uU2VydmljZSB3aGVuIHRoZSBDbHJEYXkgaXMgZm9jdXNlZC5cbiAgICovXG4gIG9uRGF5Vmlld0ZvY3VzKCkge1xuICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5mb2N1c2VkRGF5ID0gdGhpcy5kYXlWaWV3LmRheU1vZGVsO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHNlbGVjdGVkRGF5IHdoZW4gdGhlIENsckRheSBpcyBzZWxlY3RlZCBhbmQgY2xvc2VzIHRoZSBkYXRlcGlja2VyIHBvcG92ZXIuXG4gICAqL1xuICBzZWxlY3REYXkoKTogdm9pZCB7XG4gICAgY29uc3QgZGF5OiBEYXlNb2RlbCA9IHRoaXMuZGF5Vmlldy5kYXlNb2RlbDtcbiAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uubm90aWZ5U2VsZWN0ZWREYXlDaGFuZ2VkKGRheSk7XG4gICAgdGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLm1hcmtBc0RpcnR5KCk7XG4gICAgdGhpcy5faWZPcGVuU2VydmljZS5vcGVuID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==