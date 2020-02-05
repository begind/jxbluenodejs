/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrAccordionModule } from '../accordion.module';
import { ClrIconModule } from '../../icon/icon.module';
import { ClrStepButton } from './../stepper/step-button';
import { ClrStepper } from './../stepper/stepper';
import { ClrStepperPanel } from './stepper-panel';
import { StepperOompaLoompa } from './chocolate/stepper-oompa-loompa';
import { StepperWillyWonka } from './chocolate/stepper-willy-wonka';
var declarations = [ClrStepper, ClrStepButton, ClrStepperPanel, StepperOompaLoompa, StepperWillyWonka];
var ClrStepperModule = /** @class */ (function () {
    function ClrStepperModule() {
    }
    ClrStepperModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, ClrIconModule, ClrAccordionModule],
            declarations: tslib_1.__spread(declarations),
            exports: tslib_1.__spread(declarations, [ClrAccordionModule]),
        })
    ], ClrStepperModule);
    return ClrStepperModule;
}());
export { ClrStepperModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJhY2NvcmRpb24vc3RlcHBlci9zdGVwcGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVwRSxJQUFNLFlBQVksR0FBRyxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFPekc7SUFBQTtJQUErQixDQUFDO0lBQW5CLGdCQUFnQjtRQUw1QixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixDQUFDO1lBQzFELFlBQVksbUJBQU0sWUFBWSxDQUFDO1lBQy9CLE9BQU8sbUJBQU0sWUFBWSxHQUFFLGtCQUFrQixFQUFDO1NBQy9DLENBQUM7T0FDVyxnQkFBZ0IsQ0FBRztJQUFELHVCQUFDO0NBQUEsQUFBaEMsSUFBZ0M7U0FBbkIsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xyQWNjb3JkaW9uTW9kdWxlIH0gZnJvbSAnLi4vYWNjb3JkaW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJJY29uTW9kdWxlIH0gZnJvbSAnLi4vLi4vaWNvbi9pY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJTdGVwQnV0dG9uIH0gZnJvbSAnLi8uLi9zdGVwcGVyL3N0ZXAtYnV0dG9uJztcbmltcG9ydCB7IENsclN0ZXBwZXIgfSBmcm9tICcuLy4uL3N0ZXBwZXIvc3RlcHBlcic7XG5pbXBvcnQgeyBDbHJTdGVwcGVyUGFuZWwgfSBmcm9tICcuL3N0ZXBwZXItcGFuZWwnO1xuaW1wb3J0IHsgU3RlcHBlck9vbXBhTG9vbXBhIH0gZnJvbSAnLi9jaG9jb2xhdGUvc3RlcHBlci1vb21wYS1sb29tcGEnO1xuaW1wb3J0IHsgU3RlcHBlcldpbGx5V29ua2EgfSBmcm9tICcuL2Nob2NvbGF0ZS9zdGVwcGVyLXdpbGx5LXdvbmthJztcblxuY29uc3QgZGVjbGFyYXRpb25zID0gW0NsclN0ZXBwZXIsIENsclN0ZXBCdXR0b24sIENsclN0ZXBwZXJQYW5lbCwgU3RlcHBlck9vbXBhTG9vbXBhLCBTdGVwcGVyV2lsbHlXb25rYV07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIENsckljb25Nb2R1bGUsIENsckFjY29yZGlvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogWy4uLmRlY2xhcmF0aW9uc10sXG4gIGV4cG9ydHM6IFsuLi5kZWNsYXJhdGlvbnMsIENsckFjY29yZGlvbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIENsclN0ZXBwZXJNb2R1bGUge31cbiJdfQ==