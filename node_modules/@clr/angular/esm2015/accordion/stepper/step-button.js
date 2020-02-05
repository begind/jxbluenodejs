/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Directive, HostListener, HostBinding, Input } from '@angular/core';
import { StepperService } from './providers/stepper.service';
import { ClrStepperPanel } from './stepper-panel';
export var ClrStepButtonType;
(function (ClrStepButtonType) {
    ClrStepButtonType["Next"] = "next";
    ClrStepButtonType["Submit"] = "submit";
})(ClrStepButtonType || (ClrStepButtonType = {}));
let ClrStepButton = class ClrStepButton {
    constructor(clrStep, stepperService) {
        this.clrStep = clrStep;
        this.stepperService = stepperService;
        this.type = ClrStepButtonType.Next;
        this.submitButton = false;
    }
    ngOnInit() {
        this.submitButton = this.type === ClrStepButtonType.Submit;
    }
    navigateToNextPanel() {
        this.stepperService.navigateToNextPanel(this.clrStep.id, this.clrStep.formGroup.valid);
    }
};
tslib_1.__decorate([
    Input('clrStepButton'),
    tslib_1.__metadata("design:type", String)
], ClrStepButton.prototype, "type", void 0);
tslib_1.__decorate([
    HostBinding('class.btn-primary'),
    tslib_1.__metadata("design:type", Object)
], ClrStepButton.prototype, "submitButton", void 0);
tslib_1.__decorate([
    HostListener('click'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ClrStepButton.prototype, "navigateToNextPanel", null);
ClrStepButton = tslib_1.__decorate([
    Directive({
        selector: '[clrStepButton]',
        host: {
            '[class.clr-step-button]': 'true',
            '[class.btn]': 'true',
            '[type]': "'button'",
        },
    }),
    tslib_1.__metadata("design:paramtypes", [ClrStepperPanel, StepperService])
], ClrStepButton);
export { ClrStepButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC1idXR0b24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJhY2NvcmRpb24vc3RlcHBlci9zdGVwLWJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFcEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVsRCxNQUFNLENBQU4sSUFBWSxpQkFHWDtBQUhELFdBQVksaUJBQWlCO0lBQzNCLGtDQUFhLENBQUE7SUFDYixzQ0FBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSFcsaUJBQWlCLEtBQWpCLGlCQUFpQixRQUc1QjtBQVVELElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFJeEIsWUFBb0IsT0FBd0IsRUFBVSxjQUE4QjtRQUFoRSxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUg1RCxTQUFJLEdBQStCLGlCQUFpQixDQUFDLElBQUksQ0FBQztRQUNoRCxpQkFBWSxHQUFHLEtBQUssQ0FBQztJQUVnQyxDQUFDO0lBRXhGLFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssaUJBQWlCLENBQUMsTUFBTSxDQUFDO0lBQzdELENBQUM7SUFHRCxtQkFBbUI7UUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6RixDQUFDO0NBQ0YsQ0FBQTtBQWJ5QjtJQUF2QixLQUFLLENBQUMsZUFBZSxDQUFDOzsyQ0FBMkQ7QUFDaEQ7SUFBakMsV0FBVyxDQUFDLG1CQUFtQixDQUFDOzttREFBc0I7QUFTdkQ7SUFEQyxZQUFZLENBQUMsT0FBTyxDQUFDOzs7O3dEQUdyQjtBQWJVLGFBQWE7SUFSekIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixJQUFJLEVBQUU7WUFDSix5QkFBeUIsRUFBRSxNQUFNO1lBQ2pDLGFBQWEsRUFBRSxNQUFNO1lBQ3JCLFFBQVEsRUFBRSxVQUFVO1NBQ3JCO0tBQ0YsQ0FBQzs2Q0FLNkIsZUFBZSxFQUEwQixjQUFjO0dBSnpFLGFBQWEsQ0FjekI7U0FkWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU3RlcHBlclNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9zdGVwcGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyU3RlcHBlclBhbmVsIH0gZnJvbSAnLi9zdGVwcGVyLXBhbmVsJztcblxuZXhwb3J0IGVudW0gQ2xyU3RlcEJ1dHRvblR5cGUge1xuICBOZXh0ID0gJ25leHQnLFxuICBTdWJtaXQgPSAnc3VibWl0Jyxcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NsclN0ZXBCdXR0b25dJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuY2xyLXN0ZXAtYnV0dG9uXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmJ0bl0nOiAndHJ1ZScsXG4gICAgJ1t0eXBlXSc6IFwiJ2J1dHRvbidcIixcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyU3RlcEJ1dHRvbiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgnY2xyU3RlcEJ1dHRvbicpIHR5cGU6IENsclN0ZXBCdXR0b25UeXBlIHwgc3RyaW5nID0gQ2xyU3RlcEJ1dHRvblR5cGUuTmV4dDtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5idG4tcHJpbWFyeScpIHN1Ym1pdEJ1dHRvbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xyU3RlcDogQ2xyU3RlcHBlclBhbmVsLCBwcml2YXRlIHN0ZXBwZXJTZXJ2aWNlOiBTdGVwcGVyU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1Ym1pdEJ1dHRvbiA9IHRoaXMudHlwZSA9PT0gQ2xyU3RlcEJ1dHRvblR5cGUuU3VibWl0O1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBuYXZpZ2F0ZVRvTmV4dFBhbmVsKCkge1xuICAgIHRoaXMuc3RlcHBlclNlcnZpY2UubmF2aWdhdGVUb05leHRQYW5lbCh0aGlzLmNsclN0ZXAuaWQsIHRoaXMuY2xyU3RlcC5mb3JtR3JvdXAudmFsaWQpO1xuICB9XG59XG4iXX0=