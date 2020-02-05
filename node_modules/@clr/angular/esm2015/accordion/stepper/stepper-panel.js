/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy, Optional, Inject, ViewChild, ElementRef, PLATFORM_ID, } from '@angular/core';
import { FormGroupName, NgModelGroup } from '@angular/forms';
import { tap, filter } from 'rxjs/operators';
import { UNIQUE_ID_PROVIDER, UNIQUE_ID } from '../../utils/id-generator/id-generator.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { StepperService } from './providers/stepper.service';
import { stepAnimation } from '../utils/animation';
import { triggerAllFormControlValidation } from '../../utils/forms/validation';
import { IfExpandService } from '../../utils/conditional/if-expanded.service';
import { AccordionStatus } from '../enums/accordion-status.enum';
import { ClrAccordionPanel } from '../accordion-panel';
import { isPlatformBrowser } from '@angular/common';
let ClrStepperPanel = class ClrStepperPanel extends ClrAccordionPanel {
    constructor(platformId, commonStrings, formGroupName, ngModelGroup, stepperService, ifExpandService, id) {
        super(commonStrings, stepperService, ifExpandService, id);
        this.platformId = platformId;
        this.commonStrings = commonStrings;
        this.formGroupName = formGroupName;
        this.ngModelGroup = ngModelGroup;
        this.stepperService = stepperService;
        this.isAccordion = false;
        this.subscriptions = [];
    }
    get formGroup() {
        return this.formGroupName ? this.formGroupName.control : this.ngModelGroup.control;
    }
    get id() {
        return this.formGroupName ? this.formGroupName.name : this.ngModelGroup.name;
    }
    set id(_value) { } // overriding parent id required empty setter
    ngOnInit() {
        super.ngOnInit();
        this.panel = this.panel.pipe(tap(panel => this.triggerAllFormControlValidationIfError(panel)));
        this.stepperService.disablePanel(this.id, true);
        this.listenToFocusChanges();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
    listenToFocusChanges() {
        this.subscriptions.push(this.stepperService.activeStep
            .pipe(filter(panelId => isPlatformBrowser(this.platformId) && panelId === this.id))
            .subscribe(() => this.headerButton.nativeElement.focus()));
    }
    triggerAllFormControlValidationIfError(panel) {
        if (panel.status === AccordionStatus.Error) {
            triggerAllFormControlValidation(this.formGroup);
        }
    }
};
tslib_1.__decorate([
    ViewChild('headerButton', { static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], ClrStepperPanel.prototype, "headerButton", void 0);
ClrStepperPanel = tslib_1.__decorate([
    Component({
        selector: 'clr-stepper-panel',
        template: "<ng-container *ngIf=\"panel | async; let panel\">\n  <div *ngIf=\"panel.status !== AccordionStatus.Inactive\" aria-live=\"assertive\" class=\"clr-sr-only\">\n    <ng-container *ngIf=\"panel.status === AccordionStatus.Error\">{{commonStrings.keys.danger}}</ng-container>\n  </div>\n\n  <div role=\"group\" [ngClass]=\"getPanelStateClasses(panel)\">\n    <div class=\"clr-accordion-header\">\n      <button\n        type=\"button\"\n        class=\"clr-accordion-header-button\"\n        (click)=\"togglePanel()\"\n        [id]=\"getAccordionHeaderId(panel.templateId)\"\n        [disabled]=\"isAccordion && panel.disabled\"\n        [attr.aria-disabled]=\"!isAccordion && panel.disabled\"\n        [attr.aria-controls]=\"getAccordionContentId(panel.templateId)\"\n        [attr.aria-expanded]=\"panel.open\"\n        [class.clr-accordion-header-has-description]=\"(accordionDescription.changes | async)?.length || accordionDescription.length\"\n        #headerButton\n      >\n        <span class=\"clr-sr-only\">\n          <ng-container *ngIf=\"panel.status === AccordionStatus.Error\">{{commonStrings.keys.danger}}</ng-container>\n          <ng-container *ngIf=\"panel.status === AccordionStatus.Complete\">{{commonStrings.keys.success}}</ng-container>\n        </span>\n        <span class=\"clr-accordion-status\">\n          <clr-icon shape=\"angle\" dir=\"right\" class=\"clr-accordion-angle\"></clr-icon>\n          <span class=\"clr-accordion-number\"></span>\n          <clr-icon shape=\"exclamation-circle\" class=\"clr-accordion-error-icon\"></clr-icon>\n          <clr-icon shape=\"check-circle\" class=\"clr-accordion-complete-icon\"></clr-icon>\n        </span>\n        <ng-content select=\"clr-accordion-title, clr-step-title\"></ng-content>\n        <ng-content select=\"clr-accordion-description, clr-step-description\"></ng-content>\n      </button>\n    </div>\n    <div\n      @skipInitialRender\n      role=\"region\"\n      [id]=\"getAccordionContentId(panel.templateId)\"\n      [attr.aria-hidden]=\"!panel.open\"\n      [attr.aria-labelledby]=\"getAccordionHeaderId(panel.templateId)\"\n    >\n      <div\n        *ngIf=\"panel.open\"\n        @toggle\n        (@toggle.done)=\"collapsePanelOnAnimationDone(panel)\"\n        class=\"clr-accordion-content\">\n        <div class=\"clr-accordion-inner-content\">\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-container>\n",
        host: { '[class.clr-accordion-panel]': 'true' },
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: stepAnimation,
        providers: [IfExpandService, UNIQUE_ID_PROVIDER]
    }),
    tslib_1.__param(0, Inject(PLATFORM_ID)),
    tslib_1.__param(2, Optional()),
    tslib_1.__param(3, Optional()),
    tslib_1.__param(6, Inject(UNIQUE_ID)),
    tslib_1.__metadata("design:paramtypes", [Object,
        ClrCommonStringsService,
        FormGroupName,
        NgModelGroup,
        StepperService,
        IfExpandService, String])
], ClrStepperPanel);
export { ClrStepperPanel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci1wYW5lbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImFjY29yZGlvbi9zdGVwcGVyL3N0ZXBwZXItcGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixFQUN2QixRQUFRLEVBQ1IsTUFBTSxFQUVOLFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc3QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDOUYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFOUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBVXBELElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsaUJBQWlCO0lBaUJwRCxZQUMrQixVQUFrQixFQUN4QyxhQUFzQyxFQUN6QixhQUE0QixFQUM1QixZQUEwQixFQUN0QyxjQUE4QixFQUN0QyxlQUFnQyxF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QTtJQUdWLG1CQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTs2Q0FOdUIsTUFBTTtRQUN6Qix1QkFBdUI7UUFDVixhQUFhO1FBQ2QsWUFBWTtRQUN0QixjQUFjO1FBQ3JCLGVBQWU7R0F2QnZCLGVBQWUsQ0FxRDNCO1NBckRZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIE9wdGlvbmFsLFxuICBJbmplY3QsXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBQTEFURk9STV9JRCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXBOYW1lLCBOZ01vZGVsR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyB0YXAsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBVTklRVUVfSURfUFJPVklERVIsIFVOSVFVRV9JRCB9IGZyb20gJy4uLy4uL3V0aWxzL2lkLWdlbmVyYXRvci9pZC1nZW5lcmF0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZSc7XG5pbXBvcnQgeyBTdGVwcGVyU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3N0ZXBwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBzdGVwQW5pbWF0aW9uIH0gZnJvbSAnLi4vdXRpbHMvYW5pbWF0aW9uJztcbmltcG9ydCB7IHRyaWdnZXJBbGxGb3JtQ29udHJvbFZhbGlkYXRpb24gfSBmcm9tICcuLi8uLi91dGlscy9mb3Jtcy92YWxpZGF0aW9uJztcbmltcG9ydCB7IElmRXhwYW5kU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLWV4cGFuZGVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWNjb3JkaW9uUGFuZWxNb2RlbCB9IGZyb20gJy4uL21vZGVscy9hY2NvcmRpb24ubW9kZWwnO1xuaW1wb3J0IHsgQWNjb3JkaW9uU3RhdHVzIH0gZnJvbSAnLi4vZW51bXMvYWNjb3JkaW9uLXN0YXR1cy5lbnVtJztcbmltcG9ydCB7IENsckFjY29yZGlvblBhbmVsIH0gZnJvbSAnLi4vYWNjb3JkaW9uLXBhbmVsJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXN0ZXBwZXItcGFuZWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vLi4vYWNjb3JkaW9uLXBhbmVsLmh0bWwnLFxuICBob3N0OiB7ICdbY2xhc3MuY2xyLWFjY29yZGlvbi1wYW5lbF0nOiAndHJ1ZScgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IHN0ZXBBbmltYXRpb24sXG4gIHByb3ZpZGVyczogW0lmRXhwYW5kU2VydmljZSwgVU5JUVVFX0lEX1BST1ZJREVSXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyU3RlcHBlclBhbmVsIGV4dGVuZHMgQ2xyQWNjb3JkaW9uUGFuZWwgaW1wbGVtZW50cyBPbkluaXQge1xuICBpc0FjY29yZGlvbiA9IGZhbHNlO1xuXG4gIEBWaWV3Q2hpbGQoJ2hlYWRlckJ1dHRvbicsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBoZWFkZXJCdXR0b246IEVsZW1lbnRSZWY7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBnZXQgZm9ybUdyb3VwKCkge1xuICAgIHJldHVybiB0aGlzLmZvcm1Hcm91cE5hbWUgPyB0aGlzLmZvcm1Hcm91cE5hbWUuY29udHJvbCA6IHRoaXMubmdNb2RlbEdyb3VwLmNvbnRyb2w7XG4gIH1cblxuICBnZXQgaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybUdyb3VwTmFtZSA/IHRoaXMuZm9ybUdyb3VwTmFtZS5uYW1lIDogdGhpcy5uZ01vZGVsR3JvdXAubmFtZTtcbiAgfVxuXG4gIHNldCBpZChfdmFsdWUpIHt9IC8vIG92ZXJyaWRpbmcgcGFyZW50IGlkIHJlcXVpcmVkIGVtcHR5IHNldHRlclxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGZvcm1Hcm91cE5hbWU6IEZvcm1Hcm91cE5hbWUsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuZ01vZGVsR3JvdXA6IE5nTW9kZWxHcm91cCxcbiAgICBwcml2YXRlIHN0ZXBwZXJTZXJ2aWNlOiBTdGVwcGVyU2VydmljZSxcbiAgICBpZkV4cGFuZFNlcnZpY2U6IElmRXhwYW5kU2VydmljZSxcbiAgICBASW5qZWN0KFVOSVFVRV9JRCkgaWQ6IHN0cmluZ1xuICApIHtcbiAgICBzdXBlcihjb21tb25TdHJpbmdzLCBzdGVwcGVyU2VydmljZSwgaWZFeHBhbmRTZXJ2aWNlLCBpZCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIHRoaXMucGFuZWwgPSB0aGlzLnBhbmVsLnBpcGUodGFwKHBhbmVsID0+IHRoaXMudHJpZ2dlckFsbEZvcm1Db250cm9sVmFsaWRhdGlvbklmRXJyb3IocGFuZWwpKSk7XG4gICAgdGhpcy5zdGVwcGVyU2VydmljZS5kaXNhYmxlUGFuZWwodGhpcy5pZCwgdHJ1ZSk7XG4gICAgdGhpcy5saXN0ZW5Ub0ZvY3VzQ2hhbmdlcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Ub0ZvY3VzQ2hhbmdlcygpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuc3RlcHBlclNlcnZpY2UuYWN0aXZlU3RlcFxuICAgICAgICAucGlwZShmaWx0ZXIocGFuZWxJZCA9PiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmIHBhbmVsSWQgPT09IHRoaXMuaWQpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuaGVhZGVyQnV0dG9uLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmlnZ2VyQWxsRm9ybUNvbnRyb2xWYWxpZGF0aW9uSWZFcnJvcihwYW5lbDogQWNjb3JkaW9uUGFuZWxNb2RlbCkge1xuICAgIGlmIChwYW5lbC5zdGF0dXMgPT09IEFjY29yZGlvblN0YXR1cy5FcnJvcikge1xuICAgICAgdHJpZ2dlckFsbEZvcm1Db250cm9sVmFsaWRhdGlvbih0aGlzLmZvcm1Hcm91cCk7XG4gICAgfVxuICB9XG59XG4iXX0=