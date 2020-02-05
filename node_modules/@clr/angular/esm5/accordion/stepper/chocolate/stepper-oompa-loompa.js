/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Directive, Optional } from '@angular/core';
import { OompaLoompa } from '../../../utils/chocolate/oompa-loompa';
import { StepperWillyWonka } from './stepper-willy-wonka';
import { IfExpandService } from '../../../utils/conditional/if-expanded.service';
var StepperOompaLoompa = /** @class */ (function (_super) {
    tslib_1.__extends(StepperOompaLoompa, _super);
    function StepperOompaLoompa(cdr, willyWonka, ifExpandService) {
        var _this = this;
        if (!willyWonka) {
            throw new Error('clr-stepper-panel should only be used inside of clrStepper');
        }
        _this = _super.call(this, cdr, willyWonka) || this;
        _this.expand = ifExpandService;
        return _this;
    }
    Object.defineProperty(StepperOompaLoompa.prototype, "flavor", {
        get: function () {
            return this.expand.expanded;
        },
        enumerable: true,
        configurable: true
    });
    StepperOompaLoompa = tslib_1.__decorate([
        Directive({ selector: 'clr-stepper-panel, [clrStepButton]' }),
        tslib_1.__param(1, Optional()),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, StepperWillyWonka, IfExpandService])
    ], StepperOompaLoompa);
    return StepperOompaLoompa;
}(OompaLoompa));
export { StepperOompaLoompa };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci1vb21wYS1sb29tcGEuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJhY2NvcmRpb24vc3RlcHBlci9jaG9jb2xhdGUvc3RlcHBlci1vb21wYS1sb29tcGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBR2pGO0lBQXdDLDhDQUFXO0lBR2pELDRCQUFZLEdBQXNCLEVBQWMsVUFBNkIsRUFBRSxlQUFnQztRQUEvRyxpQkFNQztRQUxDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLDREQUE0RCxDQUFDLENBQUM7U0FDL0U7UUFDRCxRQUFBLGtCQUFNLEdBQUcsRUFBRSxVQUFVLENBQUMsU0FBQztRQUN2QixLQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQzs7SUFDaEMsQ0FBQztJQUVELHNCQUFJLHNDQUFNO2FBQVY7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQzlCLENBQUM7OztPQUFBO0lBYlUsa0JBQWtCO1FBRDlCLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxvQ0FBb0MsRUFBRSxDQUFDO1FBSXZCLG1CQUFBLFFBQVEsRUFBRSxDQUFBO2lEQUE5QixpQkFBaUIsRUFBMEIsaUJBQWlCLEVBQW1CLGVBQWU7T0FIcEcsa0JBQWtCLENBYzlCO0lBQUQseUJBQUM7Q0FBQSxBQWRELENBQXdDLFdBQVcsR0FjbEQ7U0FkWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE9vbXBhTG9vbXBhIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY2hvY29sYXRlL29vbXBhLWxvb21wYSc7XG5pbXBvcnQgeyBTdGVwcGVyV2lsbHlXb25rYSB9IGZyb20gJy4vc3RlcHBlci13aWxseS13b25rYSc7XG5pbXBvcnQgeyBJZkV4cGFuZFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1leHBhbmRlZC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnY2xyLXN0ZXBwZXItcGFuZWwsIFtjbHJTdGVwQnV0dG9uXScgfSlcbmV4cG9ydCBjbGFzcyBTdGVwcGVyT29tcGFMb29tcGEgZXh0ZW5kcyBPb21wYUxvb21wYSB7XG4gIHByaXZhdGUgZXhwYW5kOiBJZkV4cGFuZFNlcnZpY2U7XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgQE9wdGlvbmFsKCkgd2lsbHlXb25rYTogU3RlcHBlcldpbGx5V29ua2EsIGlmRXhwYW5kU2VydmljZTogSWZFeHBhbmRTZXJ2aWNlKSB7XG4gICAgaWYgKCF3aWxseVdvbmthKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nsci1zdGVwcGVyLXBhbmVsIHNob3VsZCBvbmx5IGJlIHVzZWQgaW5zaWRlIG9mIGNsclN0ZXBwZXInKTtcbiAgICB9XG4gICAgc3VwZXIoY2RyLCB3aWxseVdvbmthKTtcbiAgICB0aGlzLmV4cGFuZCA9IGlmRXhwYW5kU2VydmljZTtcbiAgfVxuXG4gIGdldCBmbGF2b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwYW5kLmV4cGFuZGVkO1xuICB9XG59XG4iXX0=