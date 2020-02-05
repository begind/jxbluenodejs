/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ContentChildren, QueryList, Optional, ChangeDetectionStrategy, Input, } from '@angular/core';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { startWith, filter } from 'rxjs/operators';
import { StepperService } from './providers/stepper.service';
import { AccordionService } from '../providers/accordion.service';
import { ClrStepperPanel } from './stepper-panel';
let ClrStepper = class ClrStepper {
    constructor(formGroup, ngForm, stepperService) {
        this.formGroup = formGroup;
        this.ngForm = ngForm;
        this.stepperService = stepperService;
        this.subscriptions = [];
    }
    ngOnInit() {
        if (!this.formGroup && !this.ngForm) {
            throw new Error('To use stepper a Reactive or Template Form is required.');
        }
        this.form = this.formGroup ? this.formGroup : this.ngForm;
        this.subscriptions.push(this.listenForPanelsCompleted());
        this.subscriptions.push(this.listenForFormResetChanges());
    }
    ngOnChanges(changes) {
        if (changes.initialPanel.currentValue !== changes.initialPanel.previousValue) {
            this.stepperService.overrideInitialPanel(this.initialPanel);
        }
    }
    ngAfterViewInit() {
        this.subscriptions.push(this.listenForDOMChanges());
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
    listenForFormResetChanges() {
        return this.form.statusChanges
            .pipe(filter(() => this.form.pristine)) // https://github.com/angular/angular/issues/10887
            .subscribe(() => this.stepperService.resetPanels());
    }
    listenForPanelsCompleted() {
        return this.stepperService.panelsCompleted.subscribe(panelsCompleted => {
            if (panelsCompleted && this.form.valid) {
                this.form.ngSubmit.emit();
            }
            else if (!this.form.valid && this.form.touched) {
                this.setPanelsWithFormErrors();
            }
        });
    }
    setPanelsWithFormErrors() {
        const panelsWithErrors = this.panels.reduce((panels, p) => (p.formGroup.invalid ? [...panels, p.id] : panels), []);
        this.stepperService.setPanelsWithErrors(panelsWithErrors);
    }
    listenForDOMChanges() {
        return this.panels.changes.pipe(startWith(this.panels)).subscribe(panels => {
            this.stepperService.updatePanelOrder(panels.toArray().map(p => p.id));
            if (this.initialPanel) {
                this.stepperService.overrideInitialPanel(this.initialPanel);
            }
        });
    }
};
tslib_1.__decorate([
    Input('clrInitialStep'),
    tslib_1.__metadata("design:type", String)
], ClrStepper.prototype, "initialPanel", void 0);
tslib_1.__decorate([
    ContentChildren(ClrStepperPanel, { descendants: true }),
    tslib_1.__metadata("design:type", QueryList)
], ClrStepper.prototype, "panels", void 0);
ClrStepper = tslib_1.__decorate([
    Component({
        selector: 'form[clrStepper]',
        template: `<ng-content></ng-content>`,
        host: {
            '[class.clr-accordion]': 'true',
            '[class.clr-stepper-forms]': 'true',
        },
        providers: [StepperService, { provide: AccordionService, useExisting: StepperService }],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    tslib_1.__param(0, Optional()),
    tslib_1.__param(1, Optional()),
    tslib_1.__metadata("design:paramtypes", [FormGroupDirective,
        NgForm,
        StepperService])
], ClrStepper);
export { ClrStepper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImFjY29yZGlvbi9zdGVwcGVyL3N0ZXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBQ1QsUUFBUSxFQUNSLHVCQUF1QixFQUN2QixLQUFLLEdBTU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVlsRCxJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFVO0lBT3JCLFlBQ3NCLFNBQTZCLEVBQzdCLE1BQWMsRUFDMUIsY0FBOEI7UUFGbEIsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFDN0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUMxQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFOeEMsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO0lBT2hDLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMseURBQXlELENBQUMsQ0FBQztTQUM1RTtRQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMx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LGVBQWUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7c0NBQ2hELFNBQVM7MENBQWtCO0FBSHhCLFVBQVU7SUFWdEIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixRQUFRLEVBQUUsMkJBQTJCO1FBQ3JDLElBQUksRUFBRTtZQUNKLHVCQUF1QixFQUFFLE1BQU07WUFDL0IsMkJBQTJCLEVBQUUsTUFBTTtTQUNwQztRQUNELFNBQVMsRUFBRSxDQUFDLGNBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLENBQUM7UUFDdkYsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07S0FDaEQsQ0FBQztJQVNHLG1CQUFBLFFBQVEsRUFBRSxDQUFBO0lBQ1YsbUJBQUEsUUFBUSxFQUFFLENBQUE7NkNBRG9CLGtCQUFrQjtRQUNyQixNQUFNO1FBQ1YsY0FBYztHQVY3QixVQUFVLENBbUV0QjtTQW5FWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgUXVlcnlMaXN0LFxuICBPcHRpb25hbCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIElucHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPbkluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIE9uRGVzdHJveSxcbiAgT25DaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cERpcmVjdGl2ZSwgTmdGb3JtIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgU3RlcHBlclNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9zdGVwcGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWNjb3JkaW9uU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9hY2NvcmRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBDbHJTdGVwcGVyUGFuZWwgfSBmcm9tICcuL3N0ZXBwZXItcGFuZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtW2NsclN0ZXBwZXJdJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuY2xyLWFjY29yZGlvbl0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5jbHItc3RlcHBlci1mb3Jtc10nOiAndHJ1ZScsXG4gIH0sXG4gIHByb3ZpZGVyczogW1N0ZXBwZXJTZXJ2aWNlLCB7IHByb3ZpZGU6IEFjY29yZGlvblNlcnZpY2UsIHVzZUV4aXN0aW5nOiBTdGVwcGVyU2VydmljZSB9XSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENsclN0ZXBwZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCdjbHJJbml0aWFsU3RlcCcpIGluaXRpYWxQYW5lbDogc3RyaW5nO1xuICBAQ29udGVudENoaWxkcmVuKENsclN0ZXBwZXJQYW5lbCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBwYW5lbHM6IFF1ZXJ5TGlzdDxDbHJTdGVwcGVyUGFuZWw+O1xuICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBmb3JtOiBGb3JtR3JvdXBEaXJlY3RpdmUgfCBOZ0Zvcm07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBmb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIG5nRm9ybTogTmdGb3JtLFxuICAgIHByaXZhdGUgc3RlcHBlclNlcnZpY2U6IFN0ZXBwZXJTZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuZm9ybUdyb3VwICYmICF0aGlzLm5nRm9ybSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUbyB1c2Ugc3RlcHBlciBhIFJlYWN0aXZlIG9yIFRlbXBsYXRlIEZvcm0gaXMgcmVxdWlyZWQuJyk7XG4gICAgfVxuXG4gICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtR3JvdXAgPyB0aGlzLmZvcm1Hcm91cCA6IHRoaXMubmdGb3JtO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMubGlzdGVuRm9yUGFuZWxzQ29tcGxldGVkKCkpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMubGlzdGVuRm9yRm9ybVJlc2V0Q2hhbmdlcygpKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5pbml0aWFsUGFuZWwuY3VycmVudFZhbHVlICE9PSBjaGFuZ2VzLmluaXRpYWxQYW5lbC5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICB0aGlzLnN0ZXBwZXJTZXJ2aWNlLm92ZXJyaWRlSW5pdGlhbFBhbmVsKHRoaXMuaW5pdGlhbFBhbmVsKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5saXN0ZW5Gb3JET01DaGFuZ2VzKCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JGb3JtUmVzZXRDaGFuZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLmZvcm0uc3RhdHVzQ2hhbmdlc1xuICAgICAgLnBpcGUoZmlsdGVyKCgpID0+IHRoaXMuZm9ybS5wcmlzdGluZSkpIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzEwODg3XG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuc3RlcHBlclNlcnZpY2UucmVzZXRQYW5lbHMoKSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvclBhbmVsc0NvbXBsZXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGVwcGVyU2VydmljZS5wYW5lbHNDb21wbGV0ZWQuc3Vic2NyaWJlKHBhbmVsc0NvbXBsZXRlZCA9PiB7XG4gICAgICBpZiAocGFuZWxzQ29tcGxldGVkICYmIHRoaXMuZm9ybS52YWxpZCkge1xuICAgICAgICB0aGlzLmZvcm0ubmdTdWJtaXQuZW1pdCgpO1xuICAgICAgfSBlbHNlIGlmICghdGhpcy5mb3JtLnZhbGlkICYmIHRoaXMuZm9ybS50b3VjaGVkKSB7XG4gICAgICAgIHRoaXMuc2V0UGFuZWxzV2l0aEZvcm1FcnJvcnMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0UGFuZWxzV2l0aEZvcm1FcnJvcnMoKSB7XG4gICAgY29uc3QgcGFuZWxzV2l0aEVycm9ycyA9IHRoaXMucGFuZWxzLnJlZHVjZSgocGFuZWxzLCBwKSA9PiAocC5mb3JtR3JvdXAuaW52YWxpZCA/IFsuLi5wYW5lbHMsIHAuaWRdIDogcGFuZWxzKSwgW10pO1xuICAgIHRoaXMuc3RlcHBlclNlcnZpY2Uuc2V0UGFuZWxzV2l0aEVycm9ycyhwYW5lbHNXaXRoRXJyb3JzKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9yRE9NQ2hhbmdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5wYW5lbHMuY2hhbmdlcy5waXBlKHN0YXJ0V2l0aCh0aGlzLnBhbmVscykpLnN1YnNjcmliZShwYW5lbHMgPT4ge1xuICAgICAgdGhpcy5zdGVwcGVyU2VydmljZS51cGRhdGVQYW5lbE9yZGVyKHBhbmVscy50b0FycmF5KCkubWFwKHAgPT4gcC5pZCkpO1xuXG4gICAgICBpZiAodGhpcy5pbml0aWFsUGFuZWwpIHtcbiAgICAgICAgdGhpcy5zdGVwcGVyU2VydmljZS5vdmVycmlkZUluaXRpYWxQYW5lbCh0aGlzLmluaXRpYWxQYW5lbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==