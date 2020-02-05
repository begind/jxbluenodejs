/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, Input, Optional } from '@angular/core';
import { IfErrorService } from '../common/if-error/if-error.service';
import { ClrLabel } from '../common/label';
import { ControlClassService } from '../common/providers/control-class.service';
import { LayoutService } from '../common/providers/layout.service';
import { NgControlService } from '../common/providers/ng-control.service';
var ClrRadioContainer = /** @class */ (function () {
    function ClrRadioContainer(ifErrorService, layoutService, controlClassService, ngControlService) {
        var _this = this;
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this.inline = false;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(function (invalid) {
            _this.invalid = invalid;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(function (control) {
            _this.control = control;
        }));
    }
    Object.defineProperty(ClrRadioContainer.prototype, "clrInline", {
        get: function () {
            return this.inline;
        },
        /*
         * Here we want to support the following cases
         * clrInline - true by presence
         * clrInline="true|false" - unless it is explicitly false, strings are considered true
         * [clrInline]="true|false" - expect a boolean
         */
        set: function (value) {
            if (typeof value === 'string') {
                this.inline = value === 'false' ? false : true;
            }
            else {
                this.inline = !!value;
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrRadioContainer.prototype.controlClass = function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid(), this.inline ? 'clr-control-inline' : '');
    };
    ClrRadioContainer.prototype.addGrid = function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    ClrRadioContainer.prototype.ngOnDestroy = function () {
        this.subscriptions.map(function (sub) { return sub.unsubscribe(); });
    };
    tslib_1.__decorate([
        ContentChild(ClrLabel, { static: false }),
        tslib_1.__metadata("design:type", ClrLabel)
    ], ClrRadioContainer.prototype, "label", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrRadioContainer.prototype, "clrInline", null);
    ClrRadioContainer = tslib_1.__decorate([
        Component({
            selector: 'clr-radio-container',
            template: "\n    <ng-content select=\"label\"></ng-content>\n    <label *ngIf=\"!label && addGrid()\"></label>\n    <div class=\"clr-control-container\" [class.clr-control-inline]=\"clrInline\" [ngClass]=\"controlClass()\">\n      <ng-content select=\"clr-radio-wrapper\"></ng-content>\n      <div class=\"clr-subtext-wrapper\">\n        <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n        <clr-icon *ngIf=\"invalid\" class=\"clr-validate-icon\" shape=\"exclamation-circle\" aria-hidden=\"true\"></clr-icon>\n        <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n      </div>\n    </div>\n    ",
            host: {
                '[class.clr-form-control]': 'true',
                '[class.clr-form-control-disabled]': 'control?.disabled',
                '[class.clr-row]': 'addGrid()',
            },
            providers: [NgControlService, ControlClassService, IfErrorService]
        }),
        tslib_1.__param(1, Optional()),
        tslib_1.__metadata("design:paramtypes", [IfErrorService,
            LayoutService,
            ControlClassService,
            NgControlService])
    ], ClrRadioContainer);
    return ClrRadioContainer;
}());
export { ClrRadioContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvcmFkaW8vcmFkaW8tY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUlwRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDckUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQXVCMUU7SUEwQkUsMkJBQ1UsY0FBOEIsRUFDbEIsYUFBNEIsRUFDeEMsbUJBQXdDLEVBQ3hDLGdCQUFrQztRQUo1QyxpQkFnQkM7UUFmUyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDbEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBN0JwQyxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFDM0MsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUdSLFdBQU0sR0FBRyxLQUFLLENBQUM7UUEyQnJCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPO1lBQ2pELEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUNILENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPO1lBQ3BELEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBM0JELHNCQUFJLHdDQUFTO2FBT2I7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQztRQWhCRDs7Ozs7V0FLRzthQUVILFVBQWMsS0FBdUI7WUFDbkMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDaEQ7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQ3ZCO1FBQ0gsQ0FBQzs7O09BQUE7SUF1QkQsd0NBQVksR0FBWjtRQUNFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEgsQ0FBQztJQUVELG1DQUFPLEdBQVA7UUFDRSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQzFELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCx1Q0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBckREO1FBREMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQzswQ0FDbkMsUUFBUTtvREFBQztJQVdoQjtRQURDLEtBQUssRUFBRTs7O3NEQU9QO0lBckJVLGlCQUFpQjtRQXJCN0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixRQUFRLEVBQUUsb29CQVdQO1lBQ0gsSUFBSSxFQUFFO2dCQUNKLDBCQUEwQixFQUFFLE1BQU07Z0JBQ2xDLG1DQUFtQyxFQUFFLG1CQUFtQjtnQkFDeEQsaUJBQWlCLEVBQUUsV0FBVzthQUMvQjtZQUNELFNBQVMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLGNBQWMsQ0FBQztTQUNuRSxDQUFDO1FBNkJHLG1CQUFBLFFBQVEsRUFBRSxDQUFBO2lEQURhLGNBQWM7WUFDSCxhQUFhO1lBQ25CLG1CQUFtQjtZQUN0QixnQkFBZ0I7T0E5QmpDLGlCQUFpQixDQTBEN0I7SUFBRCx3QkFBQztDQUFBLEFBMURELElBMERDO1NBMURZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbnB1dCwgT25EZXN0cm95LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IElmRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL2lmLWVycm9yL2lmLWVycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyTGFiZWwgfSBmcm9tICcuLi9jb21tb24vbGFiZWwnO1xuaW1wb3J0IHsgQ29udHJvbENsYXNzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvY29udHJvbC1jbGFzcy5zZXJ2aWNlJztcbmltcG9ydCB7IExheW91dFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2xheW91dC5zZXJ2aWNlJztcbmltcG9ydCB7IE5nQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL25nLWNvbnRyb2wuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1yYWRpby1jb250YWluZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImxhYmVsXCI+PC9uZy1jb250ZW50PlxuICAgIDxsYWJlbCAqbmdJZj1cIiFsYWJlbCAmJiBhZGRHcmlkKClcIj48L2xhYmVsPlxuICAgIDxkaXYgY2xhc3M9XCJjbHItY29udHJvbC1jb250YWluZXJcIiBbY2xhc3MuY2xyLWNvbnRyb2wtaW5saW5lXT1cImNscklubGluZVwiIFtuZ0NsYXNzXT1cImNvbnRyb2xDbGFzcygpXCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItcmFkaW8td3JhcHBlclwiPjwvbmctY29udGVudD5cbiAgICAgIDxkaXYgY2xhc3M9XCJjbHItc3VidGV4dC13cmFwcGVyXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1jb250cm9sLWhlbHBlclwiICpuZ0lmPVwiIWludmFsaWRcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxjbHItaWNvbiAqbmdJZj1cImludmFsaWRcIiBjbGFzcz1cImNsci12YWxpZGF0ZS1pY29uXCIgc2hhcGU9XCJleGNsYW1hdGlvbi1jaXJjbGVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2Nsci1pY29uPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItY29udHJvbC1lcnJvclwiICpuZ0lmPVwiaW52YWxpZFwiPjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNsci1mb3JtLWNvbnRyb2xdJzogJ3RydWUnLFxuICAgICdbY2xhc3MuY2xyLWZvcm0tY29udHJvbC1kaXNhYmxlZF0nOiAnY29udHJvbD8uZGlzYWJsZWQnLFxuICAgICdbY2xhc3MuY2xyLXJvd10nOiAnYWRkR3JpZCgpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbTmdDb250cm9sU2VydmljZSwgQ29udHJvbENsYXNzU2VydmljZSwgSWZFcnJvclNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJSYWRpb0NvbnRhaW5lciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgaW52YWxpZCA9IGZhbHNlO1xuICBAQ29udGVudENoaWxkKENsckxhYmVsLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgbGFiZWw6IENsckxhYmVsO1xuICBwcml2YXRlIGlubGluZSA9IGZhbHNlO1xuICBjb250cm9sOiBOZ0NvbnRyb2w7XG5cbiAgLypcbiAgICogSGVyZSB3ZSB3YW50IHRvIHN1cHBvcnQgdGhlIGZvbGxvd2luZyBjYXNlc1xuICAgKiBjbHJJbmxpbmUgLSB0cnVlIGJ5IHByZXNlbmNlXG4gICAqIGNscklubGluZT1cInRydWV8ZmFsc2VcIiAtIHVubGVzcyBpdCBpcyBleHBsaWNpdGx5IGZhbHNlLCBzdHJpbmdzIGFyZSBjb25zaWRlcmVkIHRydWVcbiAgICogW2NscklubGluZV09XCJ0cnVlfGZhbHNlXCIgLSBleHBlY3QgYSBib29sZWFuXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgY2xySW5saW5lKHZhbHVlOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuaW5saW5lID0gdmFsdWUgPT09ICdmYWxzZScgPyBmYWxzZSA6IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5saW5lID0gISF2YWx1ZTtcbiAgICB9XG4gIH1cbiAgZ2V0IGNscklubGluZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmxpbmU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGlmRXJyb3JTZXJ2aWNlOiBJZkVycm9yU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGxheW91dFNlcnZpY2U6IExheW91dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb250cm9sQ2xhc3NTZXJ2aWNlOiBDb250cm9sQ2xhc3NTZXJ2aWNlLFxuICAgIHByaXZhdGUgbmdDb250cm9sU2VydmljZTogTmdDb250cm9sU2VydmljZVxuICApIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuaWZFcnJvclNlcnZpY2Uuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoaW52YWxpZCA9PiB7XG4gICAgICAgIHRoaXMuaW52YWxpZCA9IGludmFsaWQ7XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm5nQ29udHJvbFNlcnZpY2UuY29udHJvbENoYW5nZXMuc3Vic2NyaWJlKGNvbnRyb2wgPT4ge1xuICAgICAgICB0aGlzLmNvbnRyb2wgPSBjb250cm9sO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgY29udHJvbENsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRyb2xDbGFzc1NlcnZpY2UuY29udHJvbENsYXNzKHRoaXMuaW52YWxpZCwgdGhpcy5hZGRHcmlkKCksIHRoaXMuaW5saW5lID8gJ2Nsci1jb250cm9sLWlubGluZScgOiAnJyk7XG4gIH1cblxuICBhZGRHcmlkKCkge1xuICAgIGlmICh0aGlzLmxheW91dFNlcnZpY2UgJiYgIXRoaXMubGF5b3V0U2VydmljZS5pc1ZlcnRpY2FsKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMubWFwKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==