/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, Inject, InjectionToken, Input, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IfErrorService } from '../common/if-error/if-error.service';
import { ClrLabel } from '../common/label';
import { ControlClassService } from '../common/providers/control-class.service';
import { ControlIdService } from '../common/providers/control-id.service';
import { FocusService } from '../common/providers/focus.service';
import { LayoutService } from '../common/providers/layout.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
export var TOGGLE_SERVICE = new InjectionToken(undefined);
export function ToggleServiceFactory() {
    return new BehaviorSubject(false);
}
export var TOGGLE_SERVICE_PROVIDER = { provide: TOGGLE_SERVICE, useFactory: ToggleServiceFactory };
var ClrPasswordContainer = /** @class */ (function () {
    function ClrPasswordContainer(ifErrorService, layoutService, controlClassService, focusService, ngControlService, toggleService, commonStrings) {
        var _this = this;
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.focusService = focusService;
        this.ngControlService = ngControlService;
        this.toggleService = toggleService;
        this.commonStrings = commonStrings;
        this.subscriptions = [];
        this.invalid = false;
        this._dynamic = false;
        this.show = false;
        this.focus = false;
        this._toggle = true;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(function (invalid) {
            _this.invalid = invalid;
        }));
        this.subscriptions.push(this.focusService.focusChange.subscribe(function (state) {
            _this.focus = state;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(function (control) {
            _this.control = control;
        }));
    }
    Object.defineProperty(ClrPasswordContainer.prototype, "clrToggle", {
        get: function () {
            return this._toggle;
        },
        set: function (state) {
            this._toggle = state;
            if (!state) {
                this.show = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrPasswordContainer.prototype.toggle = function () {
        this.show = !this.show;
        this.toggleService.next(this.show);
    };
    ClrPasswordContainer.prototype.controlClass = function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    };
    ClrPasswordContainer.prototype.addGrid = function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    ClrPasswordContainer.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.map(function (sub) { return sub.unsubscribe(); });
        }
    };
    tslib_1.__decorate([
        Input('clrToggle'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrPasswordContainer.prototype, "clrToggle", null);
    tslib_1.__decorate([
        ContentChild(ClrLabel, { static: false }),
        tslib_1.__metadata("design:type", ClrLabel)
    ], ClrPasswordContainer.prototype, "label", void 0);
    ClrPasswordContainer = tslib_1.__decorate([
        Component({
            selector: 'clr-password-container',
            template: "\n    <ng-content select=\"label\"></ng-content>\n    <label *ngIf=\"!label && addGrid()\"></label>\n    <div class=\"clr-control-container\" [ngClass]=\"controlClass()\">\n      <div class=\"clr-input-wrapper\">\n        <div class=\"clr-input-group\" [class.clr-focus]=\"focus\">\n          <ng-content select=\"[clrPassword]\"></ng-content>\n          <button\n            *ngIf=\"clrToggle\"\n            (click)=\"toggle()\"\n            [disabled]=\"control?.disabled\"\n            class=\"clr-input-group-icon-action\"\n            type=\"button\">\n            <clr-icon\n            [attr.shape]=\"show ? 'eye-hide' : 'eye'\"\n            [attr.title]=\"show ? commonStrings.keys.hide : commonStrings.keys.show\"></clr-icon>\n          </button>\n        </div>\n        <clr-icon *ngIf=\"invalid\" class=\"clr-validate-icon\" shape=\"exclamation-circle\" aria-hidden=\"true\"></clr-icon>\n      </div>\n      <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n      <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n    </div>\n    ",
            host: {
                '[class.clr-form-control]': 'true',
                '[class.clr-form-control-disabled]': 'control?.disabled',
                '[class.clr-row]': 'addGrid()',
            },
            providers: [
                IfErrorService,
                NgControlService,
                ControlIdService,
                ControlClassService,
                FocusService,
                TOGGLE_SERVICE_PROVIDER,
            ]
        }),
        tslib_1.__param(1, Optional()),
        tslib_1.__param(5, Inject(TOGGLE_SERVICE)),
        tslib_1.__metadata("design:paramtypes", [IfErrorService,
            LayoutService,
            ControlClassService,
            FocusService,
            NgControlService,
            BehaviorSubject,
            ClrCommonStringsService])
    ], ClrPasswordContainer);
    return ClrPasswordContainer;
}());
export { ClrPasswordContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQtY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvcGFzc3dvcmQvcGFzc3dvcmQtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQWEsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVHLE9BQU8sRUFBRSxlQUFlLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBR3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUVsRixNQUFNLENBQUMsSUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQTJCLFNBQVMsQ0FBQyxDQUFDO0FBQ3RGLE1BQU0sVUFBVSxvQkFBb0I7SUFDbEMsT0FBTyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBQ0QsTUFBTSxDQUFDLElBQU0sdUJBQXVCLEdBQUcsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxDQUFDO0FBMENyRztJQXNCRSw4QkFDVSxjQUE4QixFQUNs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LENBQUM7WUFDVCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLFFBQVEsRUFBRSxza0NBdUJQO1lBQ0gsSUFBSSxFQUFFO2dCQUNKLDBCQUEwQixFQUFFLE1BQU07Z0JBQ2xDLG1DQUFtQyxFQUFFLG1CQUFtQjtnQkFDeEQsaUJBQWlCLEVBQUUsV0FBVzthQUMvQjtZQUNELFNBQVMsRUFBRTtnQkFDVCxjQUFjO2dCQUNkLGdCQUFnQjtnQkFDaEIsZ0JBQWdCO2dCQUNoQixtQkFBbUI7Z0JBQ25CLFlBQVk7Z0JBQ1osdUJBQXVCO2FBQ3hCO1NBQ0YsQ0FBQztRQXlCRyxtQkFBQSxRQUFRLEVBQUUsQ0FBQTtRQUlWLG1CQUFBLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTtpREFMQyxjQUFjO1lBQ0gsYUFBYTtZQUNuQixtQkFBbUI7WUFDM0IsWUFBWTtZQUNQLGdCQUFnQjtZQUNLLGVBQWU7WUFDeEMsdUJBQXVCO09BN0JwQyxvQkFBb0IsQ0FxRWhDO0lBQUQsMkJBQUM7Q0FBQSxBQXJFRCxJQXFFQztTQXJFWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgSW5wdXQsIE9uRGVzdHJveSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEeW5hbWljV3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvZHluYW1pYy13cmFwcGVyJztcblxuaW1wb3J0IHsgSWZFcnJvclNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vaWYtZXJyb3IvaWYtZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbCc7XG5pbXBvcnQgeyBDb250cm9sQ2xhc3NTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9jb250cm9sLWNsYXNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbElkU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvY29udHJvbC1pZC5zZXJ2aWNlJztcbmltcG9ydCB7IEZvY3VzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9sYXlvdXQuc2VydmljZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9uZy1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgVE9HR0xFX1NFUlZJQ0UgPSBuZXcgSW5qZWN0aW9uVG9rZW48QmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+Pih1bmRlZmluZWQpO1xuZXhwb3J0IGZ1bmN0aW9uIFRvZ2dsZVNlcnZpY2VGYWN0b3J5KCkge1xuICByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG59XG5leHBvcnQgY29uc3QgVE9HR0xFX1NFUlZJQ0VfUFJPVklERVIgPSB7IHByb3ZpZGU6IFRPR0dMRV9TRVJWSUNFLCB1c2VGYWN0b3J5OiBUb2dnbGVTZXJ2aWNlRmFjdG9yeSB9O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItcGFzc3dvcmQtY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJsYWJlbFwiPjwvbmctY29udGVudD5cbiAgICA8bGFiZWwgKm5nSWY9XCIhbGFiZWwgJiYgYWRkR3JpZCgpXCI+PC9sYWJlbD5cbiAgICA8ZGl2IGNsYXNzPVwiY2xyLWNvbnRyb2wtY29udGFpbmVyXCIgW25nQ2xhc3NdPVwiY29udHJvbENsYXNzKClcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjbHItaW5wdXQtd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xyLWlucHV0LWdyb3VwXCIgW2NsYXNzLmNsci1mb2N1c109XCJmb2N1c1wiPlxuICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltjbHJQYXNzd29yZF1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgKm5nSWY9XCJjbHJUb2dnbGVcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZSgpXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sPy5kaXNhYmxlZFwiXG4gICAgICAgICAgICBjbGFzcz1cImNsci1pbnB1dC1ncm91cC1pY29uLWFjdGlvblwiXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICAgICAgICA8Y2xyLWljb25cbiAgICAgICAgICAgIFthdHRyLnNoYXBlXT1cInNob3cgPyAnZXllLWhpZGUnIDogJ2V5ZSdcIlxuICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwic2hvdyA/IGNvbW1vblN0cmluZ3Mua2V5cy5oaWRlIDogY29tbW9uU3RyaW5ncy5rZXlzLnNob3dcIj48L2Nsci1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGNsci1pY29uICpuZ0lmPVwiaW52YWxpZFwiIGNsYXNzPVwiY2xyLXZhbGlkYXRlLWljb25cIiBzaGFwZT1cImV4Y2xhbWF0aW9uLWNpcmNsZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvY2xyLWljb24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1jb250cm9sLWhlbHBlclwiICpuZ0lmPVwiIWludmFsaWRcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItY29udHJvbC1lcnJvclwiICpuZ0lmPVwiaW52YWxpZFwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5jbHItZm9ybS1jb250cm9sXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmNsci1mb3JtLWNvbnRyb2wtZGlzYWJsZWRdJzogJ2NvbnRyb2w/LmRpc2FibGVkJyxcbiAgICAnW2NsYXNzLmNsci1yb3ddJzogJ2FkZEdyaWQoKScsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIElmRXJyb3JTZXJ2aWNlLFxuICAgIE5nQ29udHJvbFNlcnZpY2UsXG4gICAgQ29udHJvbElkU2VydmljZSxcbiAgICBDb250cm9sQ2xhc3NTZXJ2aWNlLFxuICAgIEZvY3VzU2VydmljZSxcbiAgICBUT0dHTEVfU0VSVklDRV9QUk9WSURFUixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyUGFzc3dvcmRDb250YWluZXIgaW1wbGVtZW50cyBEeW5hbWljV3JhcHBlciwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBpbnZhbGlkID0gZmFsc2U7XG4gIGNvbnRyb2w6IE5nQ29udHJvbDtcbiAgX2R5bmFtaWMgPSBmYWxzZTtcbiAgc2hvdyA9IGZhbHNlO1xuICBmb2N1cyA9IGZhbHNlO1xuICBwcml2YXRlIF90b2dnbGUgPSB0cnVlO1xuXG4gIEBJbnB1dCgnY2xyVG9nZ2xlJylcbiAgc2V0IGNsclRvZ2dsZShzdGF0ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3RvZ2dsZSA9IHN0YXRlO1xuICAgIGlmICghc3RhdGUpIHtcbiAgICAgIHRoaXMuc2hvdyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBnZXQgY2xyVG9nZ2xlKCkge1xuICAgIHJldHVybiB0aGlzLl90b2dnbGU7XG4gIH1cbiAgQENvbnRlbnRDaGlsZChDbHJMYWJlbCwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIGxhYmVsOiBDbHJMYWJlbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGlmRXJyb3JTZXJ2aWNlOiBJZkVycm9yU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGxheW91dFNlcnZpY2U6IExheW91dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb250cm9sQ2xhc3NTZXJ2aWNlOiBDb250cm9sQ2xhc3NTZXJ2aWNlLFxuICAgIHB1YmxpYyBmb2N1c1NlcnZpY2U6IEZvY3VzU2VydmljZSxcbiAgICBwcml2YXRlIG5nQ29udHJvbFNlcnZpY2U6IE5nQ29udHJvbFNlcnZpY2UsXG4gICAgQEluamVjdChUT0dHTEVfU0VSVklDRSkgcHJpdmF0ZSB0b2dnbGVTZXJ2aWNlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4sXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5pZkVycm9yU2VydmljZS5zdGF0dXNDaGFuZ2VzLnN1YnNjcmliZShpbnZhbGlkID0+IHtcbiAgICAgICAgdGhpcy5pbnZhbGlkID0gaW52YWxpZDtcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuZm9jdXNTZXJ2aWNlLmZvY3VzQ2hhbmdlLnN1YnNjcmliZShzdGF0ZSA9PiB7XG4gICAgICAgIHRoaXMuZm9jdXMgPSBzdGF0ZTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMubmdDb250cm9sU2VydmljZS5jb250cm9sQ2hhbmdlcy5zdWJzY3JpYmUoY29udHJvbCA9PiB7XG4gICAgICAgIHRoaXMuY29udHJvbCA9IGNvbnRyb2w7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy5zaG93ID0gIXRoaXMuc2hvdztcbiAgICB0aGlzLnRvZ2dsZVNlcnZpY2UubmV4dCh0aGlzLnNob3cpO1xuICB9XG5cbiAgY29udHJvbENsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRyb2xDbGFzc1NlcnZpY2UuY29udHJvbENsYXNzKHRoaXMuaW52YWxpZCwgdGhpcy5hZGRHcmlkKCkpO1xuICB9XG5cbiAgYWRkR3JpZCgpIHtcbiAgICBpZiAodGhpcy5sYXlvdXRTZXJ2aWNlICYmICF0aGlzLmxheW91dFNlcnZpY2UuaXNWZXJ0aWNhbCgpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucykge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLm1hcChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cbiAgfVxufVxuIl19