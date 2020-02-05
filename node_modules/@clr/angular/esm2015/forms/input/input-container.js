/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, Optional } from '@angular/core';
import { IfErrorService } from '../common/if-error/if-error.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { LayoutService } from '../common/providers/layout.service';
import { ControlIdService } from '../common/providers/control-id.service';
import { ClrLabel } from '../common/label';
import { ControlClassService } from '../common/providers/control-class.service';
let ClrInputContainer = class ClrInputContainer {
    constructor(ifErrorService, layoutService, controlClassService, ngControlService) {
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this._dynamic = false;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(invalid => {
            this.invalid = invalid;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(control => {
            this.control = control;
        }));
    }
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    }
    addGrid() {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.map(sub => sub.unsubscribe());
        }
    }
};
tslib_1.__decorate([
    ContentChild(ClrLabel, { static: false }),
    tslib_1.__metadata("design:type", ClrLabel)
], ClrInputContainer.prototype, "label", void 0);
ClrInputContainer = tslib_1.__decorate([
    Component({
        selector: 'clr-input-container',
        template: `
        <ng-content select="label"></ng-content>
        <label *ngIf="!label && addGrid()"></label>
        <div class="clr-control-container" [ngClass]="controlClass()">
            <div class="clr-input-wrapper">
                <ng-content select="[clrInput]"></ng-content>
                <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle" aria-hidden="true"></clr-icon>
            </div>
            <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
            <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
        </div>
    `,
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
], ClrInputContainer);
export { ClrInputContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvaW5wdXQvaW5wdXQtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQWEsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTdFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBdUJoRixJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQVE1QixZQUNVLGNBQThCLEVBQ2xCLGFBQTRCLEVBQ3hDLG1CQUF3QyxFQUN4QyxnQkFBa0M7UUFIbEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ2xCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQ3hDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQVhwQyxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFDM0MsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBV2YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNwRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUMxRCxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFyQ0M7SUFEQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO3NDQUNuQyxRQUFRO2dEQUFDO0FBTEwsaUJBQWlCO0lBckI3QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7S0FXUDtRQUNILElBQUksRUFBRTtZQUNKLDBCQUEwQixFQUFFLE1BQU07WUFDbEMsbUNBQW1DLEVBQUUsbUJBQW1CO1lBQ3hELGlCQUFpQixFQUFFLFdBQVc7U0FDL0I7UUFDRCxTQUFTLEVBQUUsQ0FBQyxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsbUJBQW1CLENBQUM7S0FDckYsQ0FBQztJQVdHLG1CQUFBLFFBQVEsRUFBRSxDQUFBOzZDQURhLGNBQWM7UUFDSCxhQUFhO1FBQ25CLG1CQUFtQjtRQUN0QixnQkFBZ0I7R0FaakMsaUJBQWlCLENBMEM3QjtTQTFDWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgT25EZXN0cm95LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IElmRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL2lmLWVycm9yL2lmLWVycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdDb250cm9sU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvbmctY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IExheW91dFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2xheW91dC5zZXJ2aWNlJztcbmltcG9ydCB7IER5bmFtaWNXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9keW5hbWljLXdyYXBwZXInO1xuaW1wb3J0IHsgQ29udHJvbElkU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvY29udHJvbC1pZC5zZXJ2aWNlJztcbmltcG9ydCB7IENsckxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsJztcbmltcG9ydCB7IENvbnRyb2xDbGFzc1NlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2NvbnRyb2wtY2xhc3Muc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1pbnB1dC1jb250YWluZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJsYWJlbFwiPjwvbmctY29udGVudD5cbiAgICAgICAgPGxhYmVsICpuZ0lmPVwiIWxhYmVsICYmIGFkZEdyaWQoKVwiPjwvbGFiZWw+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbHItY29udHJvbC1jb250YWluZXJcIiBbbmdDbGFzc109XCJjb250cm9sQ2xhc3MoKVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNsci1pbnB1dC13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW2NscklucHV0XVwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8Y2xyLWljb24gKm5nSWY9XCJpbnZhbGlkXCIgY2xhc3M9XCJjbHItdmFsaWRhdGUtaWNvblwiIHNoYXBlPVwiZXhjbGFtYXRpb24tY2lyY2xlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9jbHItaWNvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWNvbnRyb2wtaGVscGVyXCIgKm5nSWY9XCIhaW52YWxpZFwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1jb250cm9sLWVycm9yXCIgKm5nSWY9XCJpbnZhbGlkXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5jbHItZm9ybS1jb250cm9sXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmNsci1mb3JtLWNvbnRyb2wtZGlzYWJsZWRdJzogJ2NvbnRyb2w/LmRpc2FibGVkJyxcbiAgICAnW2NsYXNzLmNsci1yb3ddJzogJ2FkZEdyaWQoKScsXG4gIH0sXG4gIHByb3ZpZGVyczogW0lmRXJyb3JTZXJ2aWNlLCBOZ0NvbnRyb2xTZXJ2aWNlLCBDb250cm9sSWRTZXJ2aWNlLCBDb250cm9sQ2xhc3NTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xySW5wdXRDb250YWluZXIgaW1wbGVtZW50cyBEeW5hbWljV3JhcHBlciwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBpbnZhbGlkID0gZmFsc2U7XG4gIF9keW5hbWljID0gZmFsc2U7XG4gIEBDb250ZW50Q2hpbGQoQ2xyTGFiZWwsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBsYWJlbDogQ2xyTGFiZWw7XG4gIGNvbnRyb2w6IE5nQ29udHJvbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGlmRXJyb3JTZXJ2aWNlOiBJZkVycm9yU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGxheW91dFNlcnZpY2U6IExheW91dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb250cm9sQ2xhc3NTZXJ2aWNlOiBDb250cm9sQ2xhc3NTZXJ2aWNlLFxuICAgIHByaXZhdGUgbmdDb250cm9sU2VydmljZTogTmdDb250cm9sU2VydmljZVxuICApIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuaWZFcnJvclNlcnZpY2Uuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoaW52YWxpZCA9PiB7XG4gICAgICAgIHRoaXMuaW52YWxpZCA9IGludmFsaWQ7XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm5nQ29udHJvbFNlcnZpY2UuY29udHJvbENoYW5nZXMuc3Vic2NyaWJlKGNvbnRyb2wgPT4ge1xuICAgICAgICB0aGlzLmNvbnRyb2wgPSBjb250cm9sO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgY29udHJvbENsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRyb2xDbGFzc1NlcnZpY2UuY29udHJvbENsYXNzKHRoaXMuaW52YWxpZCwgdGhpcy5hZGRHcmlkKCkpO1xuICB9XG5cbiAgYWRkR3JpZCgpIHtcbiAgICBpZiAodGhpcy5sYXlvdXRTZXJ2aWNlICYmICF0aGlzLmxheW91dFNlcnZpY2UuaXNWZXJ0aWNhbCgpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucykge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLm1hcChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cbiAgfVxufVxuIl19