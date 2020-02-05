/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, Optional } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { IfErrorService } from '../common/if-error/if-error.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { LayoutService } from '../common/providers/layout.service';
import { ControlIdService } from '../common/providers/control-id.service';
import { ClrLabel } from '../common/label';
import { ControlClassService } from '../common/providers/control-class.service';
var ClrSelectContainer = /** @class */ (function () {
    function ClrSelectContainer(ifErrorService, layoutService, controlClassService, ngControlService) {
        var _this = this;
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this._dynamic = false;
        this.multi = false;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(function (invalid) {
            _this.invalid = invalid;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(function (control) {
            if (control) {
                _this.multi = control.valueAccessor instanceof SelectMultipleControlValueAccessor;
                _this.control = control;
            }
        }));
    }
    ClrSelectContainer.prototype.wrapperClass = function () {
        return this.multi ? 'clr-multiselect-wrapper' : 'clr-select-wrapper';
    };
    ClrSelectContainer.prototype.controlClass = function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    };
    ClrSelectContainer.prototype.addGrid = function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    ClrSelectContainer.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.map(function (sub) { return sub.unsubscribe(); });
        }
    };
    tslib_1.__decorate([
        ContentChild(ClrLabel, { static: false }),
        tslib_1.__metadata("design:type", ClrLabel)
    ], ClrSelectContainer.prototype, "label", void 0);
    tslib_1.__decorate([
        ContentChild(SelectMultipleControlValueAccessor, { static: false }),
        tslib_1.__metadata("design:type", SelectMultipleControlValueAccessor)
    ], ClrSelectContainer.prototype, "multiple", void 0);
    ClrSelectContainer = tslib_1.__decorate([
        Component({
            selector: 'clr-select-container',
            template: "    \n        <ng-content select=\"label\"></ng-content>\n        <label *ngIf=\"!label && addGrid()\"></label>\n        <div class=\"clr-control-container\" [ngClass]=\"controlClass()\">\n            <div [ngClass]=\"wrapperClass()\">\n                <ng-content select=\"[clrSelect]\"></ng-content>\n                <clr-icon *ngIf=\"invalid\" class=\"clr-validate-icon\" shape=\"exclamation-circle\" aria-hidden=\"true\"></clr-icon>\n            </div>\n            <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n            <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n        </div>\n    ",
            host: {
                '[class.clr-form-control]': 'true',
                '[class.clr-form-control-disabled]': 'control?.disabled',
                '[class.clr-row]': 'addGrid()',
            },
            providers: [IfErrorService, NgControlService, ControlIdService, ControlClassService]
        }),
        tslib_1.__param(1, Optional()),
        tslib_1.__metadata("design:paramtypes", [IfErrorService,
            LayoutService,
            ControlClassService,
            NgControlService])
    ], ClrSelectContainer);
    return ClrSelectContainer;
}());
export { ClrSelectContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL3NlbGVjdC9zZWxlY3QtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQWEsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxrQ0FBa0MsRUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBRy9FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBd0JoRjtJQVdFLDRCQUNVLGNBQThCLEVBQ2xCLGFBQTRCLEVBQ3hDLG1CQUF3QyxFQUN4QyxnQkFBa0M7UUFKNUMsaUJBbUJDO1FBbEJTLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUNsQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUN4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFkcEMsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBQzNDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUtULFVBQUssR0FBRyxLQUFLLENBQUM7UUFTcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDakQsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDcEQsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsS0FBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsYUFBYSxZQUFZLGtDQUFrQyxDQUFDO2dCQUNqRixLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzthQUN4QjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQseUNBQVksR0FBWjtRQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO0lBQ3ZFLENBQUM7SUFFRCx5Q0FBWSxHQUFaO1FBQ0UsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELG9DQUFPLEdBQVA7UUFDRSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQzFELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCx3Q0FBVyxHQUFYO1FBQ0UsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7U0FDbEQ7SUFDSCxDQUFDO0lBOUNEO1FBREMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQzswQ0FDbkMsUUFBUTtxREFBQztJQUVoQjtRQURDLFlBQVksQ0FBQyxrQ0FBa0MsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQzswQ0FDMUQsa0NBQWtDO3dEQUFDO0lBUGxDLGtCQUFrQjtRQXRCOUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxRQUFRLEVBQUUsOG9CQVdQO1lBQ0gsSUFBSSxFQUFFO2dCQUNKLDBCQUEwQixFQUFFLE1BQU07Z0JBQ2xDLG1DQUFtQyxFQUFFLG1CQUFtQjtnQkFFeEQsaUJBQWlCLEVBQUUsV0FBVzthQUMvQjtZQUNELFNBQVMsRUFBRSxDQUFDLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsQ0FBQztTQUNyRixDQUFDO1FBY0csbUJBQUEsUUFBUSxFQUFFLENBQUE7aURBRGEsY0FBYztZQUNILGFBQWE7WUFDbkIsbUJBQW1CO1lBQ3RCLGdCQUFnQjtPQWZqQyxrQkFBa0IsQ0FvRDlCO0lBQUQseUJBQUM7Q0FBQSxBQXBERCxJQW9EQztTQXBEWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgT25EZXN0cm95LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0TXVsdGlwbGVDb250cm9sVmFsdWVBY2Nlc3NvciwgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IElmRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL2lmLWVycm9yL2lmLWVycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdDb250cm9sU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvbmctY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IExheW91dFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2xheW91dC5zZXJ2aWNlJztcbmltcG9ydCB7IER5bmFtaWNXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9keW5hbWljLXdyYXBwZXInO1xuaW1wb3J0IHsgQ29udHJvbElkU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvY29udHJvbC1pZC5zZXJ2aWNlJztcbmltcG9ydCB7IENsckxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsJztcbmltcG9ydCB7IENvbnRyb2xDbGFzc1NlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2NvbnRyb2wtY2xhc3Muc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1zZWxlY3QtY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGAgICAgXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImxhYmVsXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8bGFiZWwgKm5nSWY9XCIhbGFiZWwgJiYgYWRkR3JpZCgpXCI+PC9sYWJlbD5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsci1jb250cm9sLWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cImNvbnRyb2xDbGFzcygpXCI+XG4gICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIndyYXBwZXJDbGFzcygpXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW2NsclNlbGVjdF1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPGNsci1pY29uICpuZ0lmPVwiaW52YWxpZFwiIGNsYXNzPVwiY2xyLXZhbGlkYXRlLWljb25cIiBzaGFwZT1cImV4Y2xhbWF0aW9uLWNpcmNsZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvY2xyLWljb24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1jb250cm9sLWhlbHBlclwiICpuZ0lmPVwiIWludmFsaWRcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItY29udHJvbC1lcnJvclwiICpuZ0lmPVwiaW52YWxpZFwiPjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuY2xyLWZvcm0tY29udHJvbF0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5jbHItZm9ybS1jb250cm9sLWRpc2FibGVkXSc6ICdjb250cm9sPy5kaXNhYmxlZCcsXG5cbiAgICAnW2NsYXNzLmNsci1yb3ddJzogJ2FkZEdyaWQoKScsXG4gIH0sXG4gIHByb3ZpZGVyczogW0lmRXJyb3JTZXJ2aWNlLCBOZ0NvbnRyb2xTZXJ2aWNlLCBDb250cm9sSWRTZXJ2aWNlLCBDb250cm9sQ2xhc3NTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyU2VsZWN0Q29udGFpbmVyIGltcGxlbWVudHMgRHluYW1pY1dyYXBwZXIsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgaW52YWxpZCA9IGZhbHNlO1xuICBfZHluYW1pYyA9IGZhbHNlO1xuICBAQ29udGVudENoaWxkKENsckxhYmVsLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgbGFiZWw6IENsckxhYmVsO1xuICBAQ29udGVudENoaWxkKFNlbGVjdE11bHRpcGxlQ29udHJvbFZhbHVlQWNjZXNzb3IsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBtdWx0aXBsZTogU2VsZWN0TXVsdGlwbGVDb250cm9sVmFsdWVBY2Nlc3NvcjtcbiAgcHJpdmF0ZSBtdWx0aSA9IGZhbHNlO1xuICBjb250cm9sOiBOZ0NvbnRyb2w7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBpZkVycm9yU2VydmljZTogSWZFcnJvclNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBsYXlvdXRTZXJ2aWNlOiBMYXlvdXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29udHJvbENsYXNzU2VydmljZTogQ29udHJvbENsYXNzU2VydmljZSxcbiAgICBwcml2YXRlIG5nQ29udHJvbFNlcnZpY2U6IE5nQ29udHJvbFNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmlmRXJyb3JTZXJ2aWNlLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKGludmFsaWQgPT4ge1xuICAgICAgICB0aGlzLmludmFsaWQgPSBpbnZhbGlkO1xuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5uZ0NvbnRyb2xTZXJ2aWNlLmNvbnRyb2xDaGFuZ2VzLnN1YnNjcmliZShjb250cm9sID0+IHtcbiAgICAgICAgaWYgKGNvbnRyb2wpIHtcbiAgICAgICAgICB0aGlzLm11bHRpID0gY29udHJvbC52YWx1ZUFjY2Vzc29yIGluc3RhbmNlb2YgU2VsZWN0TXVsdGlwbGVDb250cm9sVmFsdWVBY2Nlc3NvcjtcbiAgICAgICAgICB0aGlzLmNvbnRyb2wgPSBjb250cm9sO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICB3cmFwcGVyQ2xhc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGkgPyAnY2xyLW11bHRpc2VsZWN0LXdyYXBwZXInIDogJ2Nsci1zZWxlY3Qtd3JhcHBlcic7XG4gIH1cblxuICBjb250cm9sQ2xhc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udHJvbENsYXNzU2VydmljZS5jb250cm9sQ2xhc3ModGhpcy5pbnZhbGlkLCB0aGlzLmFkZEdyaWQoKSk7XG4gIH1cblxuICBhZGRHcmlkKCkge1xuICAgIGlmICh0aGlzLmxheW91dFNlcnZpY2UgJiYgIXRoaXMubGF5b3V0U2VydmljZS5pc1ZlcnRpY2FsKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMubWFwKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gICAgfVxuICB9XG59XG4iXX0=