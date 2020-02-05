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
var ClrStepper = /** @class */ (function () {
    function ClrStepper(formGroup, ngForm, stepperService) {
        this.formGroup = formGroup;
        this.ngForm = ngForm;
        this.stepperService = stepperService;
        this.subscriptions = [];
    }
    ClrStepper.prototype.ngOnInit = function () {
        if (!this.formGroup && !this.ngForm) {
            throw new Error('To use stepper a Reactive or Template Form is required.');
        }
        this.form = this.formGroup ? this.formGroup : this.ngForm;
        this.subscriptions.push(this.listenForPanelsCompleted());
        this.subscriptions.push(this.listenForFormResetChanges());
    };
    ClrStepper.prototype.ngOnChanges = function (changes) {
        if (changes.initialPanel.currentValue !== changes.initialPanel.previousValue) {
            this.stepperService.overrideInitialPanel(this.initialPanel);
        }
    };
    ClrStepper.prototype.ngAfterViewInit = function () {
        this.subscriptions.push(this.listenForDOMChanges());
    };
    ClrStepper.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    ClrStepper.prototype.listenForFormResetChanges = function () {
        var _this = this;
        return this.form.statusChanges
            .pipe(filter(function () { return _this.form.pristine; })) // https://github.com/angular/angular/issues/10887
            .subscribe(function () { return _this.stepperService.resetPanels(); });
    };
    ClrStepper.prototype.listenForPanelsCompleted = function () {
        var _this = this;
        return this.stepperService.panelsCompleted.subscribe(function (panelsCompleted) {
            if (panelsCompleted && _this.form.valid) {
                _this.form.ngSubmit.emit();
            }
            else if (!_this.form.valid && _this.form.touched) {
                _this.setPanelsWithFormErrors();
            }
        });
    };
    ClrStepper.prototype.setPanelsWithFormErrors = function () {
        var panelsWithErrors = this.panels.reduce(function (panels, p) { return (p.formGroup.invalid ? tslib_1.__spread(panels, [p.id]) : panels); }, []);
        this.stepperService.setPanelsWithErrors(panelsWithErrors);
    };
    ClrStepper.prototype.listenForDOMChanges = function () {
        var _this = this;
        return this.panels.changes.pipe(startWith(this.panels)).subscribe(function (panels) {
            _this.stepperService.updatePanelOrder(panels.toArray().map(function (p) { return p.id; }));
            if (_this.initialPanel) {
                _this.stepperService.overrideInitialPanel(_this.initialPanel);
            }
        });
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
            template: "<ng-content></ng-content>",
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
    return ClrStepper;
}());
export { ClrStepper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImFjY29yZGlvbi9zdGVwcGVyL3N0ZXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBQ1QsUUFBUSxFQUNSLHVCQUF1QixFQUN2QixLQUFLLEdBTU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVlsRDtJQU9FLG9CQUNzQixTQUE2QixFQUM3QixNQUFjLEVBQzFCLGNBQThCO1FBRmxCLGNBQVMsR0FBVCxTQUFTLENBQW9CO1FBQzdCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDMUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTnhDLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztJQU9oQyxDQUFDO0lBRUosNkJBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLHlEQUF5RCxDQUFDLENBQUM7U0FDNUU7UUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDMUQsSUFBSSxDQUFDLGFBQWEsQ0FB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Q0FBQztJQWpFd0I7UUFBeEIsS0FBSyxDQUFDLGdCQUFnQixDQUFDOztvREFBc0I7SUFFOUM7UUFEQyxlQUFlLENBQUMsZUFBZSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDOzBDQUNoRCxTQUFTOzhDQUFrQjtJQUh4QixVQUFVO1FBVnRCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxJQUFJLEVBQUU7Z0JBQ0osdUJBQXVCLEVBQUUsTUFBTTtnQkFDL0IsMkJBQTJCLEVBQUUsTUFBTTthQUNwQztZQUNELFNBQVMsRUFBRSxDQUFDLGNBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLENBQUM7WUFDdkYsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztRQVNHLG1CQUFBLFFBQVEsRUFBRSxDQUFBO1FBQ1YsbUJBQUEsUUFBUSxFQUFFLENBQUE7aURBRG9CLGtCQUFrQjtZQUNyQixNQUFNO1lBQ1YsY0FBYztPQVY3QixVQUFVLENBbUV0QjtJQUFELGlCQUFDO0NBQUEsQUFuRUQsSUFtRUM7U0FuRVksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgT3B0aW9uYWwsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBJbnB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBPbkRlc3Ryb3ksXG4gIE9uQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXBEaXJlY3RpdmUsIE5nRm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFN0ZXBwZXJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvc3RlcHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFjY29yZGlvblNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvYWNjb3JkaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyU3RlcHBlclBhbmVsIH0gZnJvbSAnLi9zdGVwcGVyLXBhbmVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybVtjbHJTdGVwcGVyXScsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNsci1hY2NvcmRpb25dJzogJ3RydWUnLFxuICAgICdbY2xhc3MuY2xyLXN0ZXBwZXItZm9ybXNdJzogJ3RydWUnLFxuICB9LFxuICBwcm92aWRlcnM6IFtTdGVwcGVyU2VydmljZSwgeyBwcm92aWRlOiBBY2NvcmRpb25TZXJ2aWNlLCB1c2VFeGlzdGluZzogU3RlcHBlclNlcnZpY2UgfV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJTdGVwcGVyIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgnY2xySW5pdGlhbFN0ZXAnKSBpbml0aWFsUGFuZWw6IHN0cmluZztcbiAgQENvbnRlbnRDaGlsZHJlbihDbHJTdGVwcGVyUGFuZWwsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgcGFuZWxzOiBRdWVyeUxpc3Q8Q2xyU3RlcHBlclBhbmVsPjtcbiAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgZm9ybTogRm9ybUdyb3VwRGlyZWN0aXZlIHwgTmdGb3JtO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuZ0Zvcm06IE5nRm9ybSxcbiAgICBwcml2YXRlIHN0ZXBwZXJTZXJ2aWNlOiBTdGVwcGVyU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmZvcm1Hcm91cCAmJiAhdGhpcy5uZ0Zvcm0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVG8gdXNlIHN0ZXBwZXIgYSBSZWFjdGl2ZSBvciBUZW1wbGF0ZSBGb3JtIGlzIHJlcXVpcmVkLicpO1xuICAgIH1cblxuICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUdyb3VwID8gdGhpcy5mb3JtR3JvdXAgOiB0aGlzLm5nRm9ybTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLmxpc3RlbkZvclBhbmVsc0NvbXBsZXRlZCgpKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLmxpc3RlbkZvckZvcm1SZXNldENoYW5nZXMoKSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMuaW5pdGlhbFBhbmVsLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlcy5pbml0aWFsUGFuZWwucHJldmlvdXNWYWx1ZSkge1xuICAgICAgdGhpcy5zdGVwcGVyU2VydmljZS5vdmVycmlkZUluaXRpYWxQYW5lbCh0aGlzLmluaXRpYWxQYW5lbCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMubGlzdGVuRm9yRE9NQ2hhbmdlcygpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9yRm9ybVJlc2V0Q2hhbmdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtLnN0YXR1c0NoYW5nZXNcbiAgICAgIC5waXBlKGZpbHRlcigoKSA9PiB0aGlzLmZvcm0ucHJpc3RpbmUpKSAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xMDg4N1xuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnN0ZXBwZXJTZXJ2aWNlLnJlc2V0UGFuZWxzKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JQYW5lbHNDb21wbGV0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RlcHBlclNlcnZpY2UucGFuZWxzQ29tcGxldGVkLnN1YnNjcmliZShwYW5lbHNDb21wbGV0ZWQgPT4ge1xuICAgICAgaWYgKHBhbmVsc0NvbXBsZXRlZCAmJiB0aGlzLmZvcm0udmFsaWQpIHtcbiAgICAgICAgdGhpcy5mb3JtLm5nU3VibWl0LmVtaXQoKTtcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMuZm9ybS52YWxpZCAmJiB0aGlzLmZvcm0udG91Y2hlZCkge1xuICAgICAgICB0aGlzLnNldFBhbmVsc1dpdGhGb3JtRXJyb3JzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNldFBhbmVsc1dpdGhGb3JtRXJyb3JzKCkge1xuICAgIGNvbnN0IHBhbmVsc1dpdGhFcnJvcnMgPSB0aGlzLnBhbmVscy5yZWR1Y2UoKHBhbmVscywgcCkgPT4gKHAuZm9ybUdyb3VwLmludmFsaWQgPyBbLi4ucGFuZWxzLCBwLmlkXSA6IHBhbmVscyksIFtdKTtcbiAgICB0aGlzLnN0ZXBwZXJTZXJ2aWNlLnNldFBhbmVsc1dpdGhFcnJvcnMocGFuZWxzV2l0aEVycm9ycyk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvckRPTUNoYW5nZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFuZWxzLmNoYW5nZXMucGlwZShzdGFydFdpdGgodGhpcy5wYW5lbHMpKS5zdWJzY3JpYmUocGFuZWxzID0+IHtcbiAgICAgIHRoaXMuc3RlcHBlclNlcnZpY2UudXBkYXRlUGFuZWxPcmRlcihwYW5lbHMudG9BcnJheSgpLm1hcChwID0+IHAuaWQpKTtcblxuICAgICAgaWYgKHRoaXMuaW5pdGlhbFBhbmVsKSB7XG4gICAgICAgIHRoaXMuc3RlcHBlclNlcnZpY2Uub3ZlcnJpZGVJbml0aWFsUGFuZWwodGhpcy5pbml0aWFsUGFuZWwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=