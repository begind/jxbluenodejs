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
let ClrCheckboxContainer = class ClrCheckboxContainer {
    // @TODO Solve for group validation, which doesn't work now with ngModelGroup
    // Blocked by https://github.com/angular/angular/issues/20268
    // @Input()
    // set clrFormGroup(value: FormGroup) {
    //   this.formGroup = value;
    // }
    // @Input()
    // set clrFormArray(value: FormArray) {
    //   this.formGroup = value;
    // }
    constructor(ifErrorService, layoutService, controlClassService, ngControlService) {
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this.inline = false;
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(control => {
            this.control = control;
        }));
    }
    // private formGroup: AbstractControl;
    /*
     * Here we want to support the following cases
     * clrInline - true by presence
     * clrInline="true|false" - unless it is explicitly false, strings are considered true
     * [clrInline]="true|false" - expect a boolean
     */
    set clrInline(value) {
        if (typeof value === 'string') {
            this.inline = value === 'false' ? false : true;
        }
        else {
            this.inline = !!value;
        }
    }
    get clrInline() {
        return this.inline;
    }
    ngOnInit() {
        // @TODO put a solution in for form group validation
        // if (!this.formGroup) {
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(invalid => {
            this.invalid = invalid;
        }));
        // } else {
        //   // Because ngModel does this, we have to delay a tick to get the result
        //   Promise.resolve().then(() => {
        //     this.subscriptions.push(
        //       this.formGroup.statusChanges.subscribe(() => {
        //         this.invalid = this.formGroup.invalid;
        //       })
        //     );
        //   });
        // }
    }
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid(), this.inline ? 'clr-control-inline' : '');
    }
    addGrid() {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    }
    ngOnDestroy() {
        this.subscriptions.map(sub => sub.unsubscribe());
    }
};
tslib_1.__decorate([
    ContentChild(ClrLabel, { static: false }),
    tslib_1.__metadata("design:type", ClrLabel)
], ClrCheckboxContainer.prototype, "label", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], ClrCheckboxContainer.prototype, "clrInline", null);
ClrCheckboxContainer = tslib_1.__decorate([
    Component({
        selector: 'clr-checkbox-container,clr-toggle-container',
        template: `
    <ng-content select="label"></ng-content>
    <label *ngIf="!label && addGrid()"></label>
    <div class="clr-control-container" [class.clr-control-inline]="clrInline" [ngClass]="controlClass()">
      <ng-content select="clr-checkbox-wrapper,clr-toggle-wrapper"></ng-content>
      <div class="clr-subtext-wrapper">
        <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
        <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle" aria-hidden="true"></clr-icon>
        <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
      </div>
    </div>
  `,
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
], ClrCheckboxContainer);
export { ClrCheckboxContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY2hlY2tib3gvY2hlY2tib3gtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUlwRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDckUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQXVCMUUsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUEyQi9CLDZFQUE2RTtJQUM3RSw2REFBNkQ7SUFDN0QsV0FBVztJQUNYLHVDQUF1QztJQUN2Qyw0QkFBNEI7SUFDNUIsSUFBSTtJQUVKLFdBQVc7SUFDWCx1Q0FBdUM7SUFDdkMsNEJBQTRCO0lBQzVCLElBQUk7SUFFSixZQUNVLGNBQThCLEVBQ2xCLGFBQTRCLEVBQ3hDLG1CQUF3QyxFQUN4QyxnQkFBa0M7UUFIbEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ2xCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQ3hDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQTFDcEMsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBQzNDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFHUixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBd0NyQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUEzQ0Qsc0NBQXNDO0lBRXRDOzs7OztPQUtHO0lBRUgsSUFBSSxTQUFTLENBQUMsS0FBdUI7UUFDbkMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUNoRDthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUNELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBMkJELFFBQVE7UUFDTixvREFBb0Q7UUFDcEQseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDcEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNGLFdBQVc7UUFDWCw0RUFBNEU7UUFDNUUsbUNBQW1DO1FBQ25DLCtCQUErQjtRQUMvQix1REFBdUQ7UUFDdkQsaURBQWlEO1FBQ2pELFdBQVc7UUFDWCxTQUFTO1FBQ1QsUUFBUTtRQUNSLElBQUk7SUFDTixDQUFDO0lBRUQsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEgsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQzFELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNuRCxDQUFDO0NBQ0YsQ0FBQTtBQWxGQztJQURDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7c0NBQ25DLFFBQVE7bURBQUM7QUFZaEI7SUFEQyxLQUFLLEVBQUU7OztxREFPUDtBQXRCVSxvQkFBb0I7SUFyQmhDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSw2Q0FBNkM7UUFDdkQsUUFBUSxFQUFFOzs7Ozs7Ozs7OztHQVdUO1FBQ0QsSUFBSSxFQUFFO1lBQ0osMEJBQTBCLEVBQUUsTUFBTTtZQUNsQyxtQ0FBbUMsRUFBRSxtQkFBbUI7WUFDeEQsaUJBQWlCLEVBQUUsV0FBVztTQUMvQjtRQUNELFNBQVMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLGNBQWMsQ0FBQztLQUNuRSxDQUFDO0lBMENHLG1CQUFBLFFBQVEsRUFBRSxDQUFBOzZDQURhLGNBQWM7UUFDSCxhQUFhO1FBQ25CLG1CQUFtQjtRQUN0QixnQkFBZ0I7R0EzQ2pDLG9CQUFvQixDQXNGaEM7U0F0Rlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIElucHV0LCBPbkRlc3Ryb3ksIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgSWZFcnJvclNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vaWYtZXJyb3IvaWYtZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbCc7XG5pbXBvcnQgeyBDb250cm9sQ2xhc3NTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9jb250cm9sLWNsYXNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5b3V0U2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvbGF5b3V0LnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdDb250cm9sU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvbmctY29udHJvbC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWNoZWNrYm94LWNvbnRhaW5lcixjbHItdG9nZ2xlLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibGFiZWxcIj48L25nLWNvbnRlbnQ+XG4gICAgPGxhYmVsICpuZ0lmPVwiIWxhYmVsICYmIGFkZEdyaWQoKVwiPjwvbGFiZWw+XG4gICAgPGRpdiBjbGFzcz1cImNsci1jb250cm9sLWNvbnRhaW5lclwiIFtjbGFzcy5jbHItY29udHJvbC1pbmxpbmVdPVwiY2xySW5saW5lXCIgW25nQ2xhc3NdPVwiY29udHJvbENsYXNzKClcIj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1jaGVja2JveC13cmFwcGVyLGNsci10b2dnbGUtd3JhcHBlclwiPjwvbmctY29udGVudD5cbiAgICAgIDxkaXYgY2xhc3M9XCJjbHItc3VidGV4dC13cmFwcGVyXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1jb250cm9sLWhlbHBlclwiICpuZ0lmPVwiIWludmFsaWRcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxjbHItaWNvbiAqbmdJZj1cImludmFsaWRcIiBjbGFzcz1cImNsci12YWxpZGF0ZS1pY29uXCIgc2hhcGU9XCJleGNsYW1hdGlvbi1jaXJjbGVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2Nsci1pY29uPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItY29udHJvbC1lcnJvclwiICpuZ0lmPVwiaW52YWxpZFwiPjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5jbHItZm9ybS1jb250cm9sXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmNsci1mb3JtLWNvbnRyb2wtZGlzYWJsZWRdJzogJ2NvbnRyb2w/LmRpc2FibGVkJyxcbiAgICAnW2NsYXNzLmNsci1yb3ddJzogJ2FkZEdyaWQoKScsXG4gIH0sXG4gIHByb3ZpZGVyczogW05nQ29udHJvbFNlcnZpY2UsIENvbnRyb2xDbGFzc1NlcnZpY2UsIElmRXJyb3JTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQ2hlY2tib3hDb250YWluZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIGludmFsaWQgPSBmYWxzZTtcbiAgQENvbnRlbnRDaGlsZChDbHJMYWJlbCwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIGxhYmVsOiBDbHJMYWJlbDtcbiAgcHJpdmF0ZSBpbmxpbmUgPSBmYWxzZTtcbiAgY29udHJvbDogTmdDb250cm9sO1xuICAvLyBwcml2YXRlIGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sO1xuXG4gIC8qXG4gICAqIEhlcmUgd2Ugd2FudCB0byBzdXBwb3J0IHRoZSBmb2xsb3dpbmcgY2FzZXNcbiAgICogY2xySW5saW5lIC0gdHJ1ZSBieSBwcmVzZW5jZVxuICAgKiBjbHJJbmxpbmU9XCJ0cnVlfGZhbHNlXCIgLSB1bmxlc3MgaXQgaXMgZXhwbGljaXRseSBmYWxzZSwgc3RyaW5ncyBhcmUgY29uc2lkZXJlZCB0cnVlXG4gICAqIFtjbHJJbmxpbmVdPVwidHJ1ZXxmYWxzZVwiIC0gZXhwZWN0IGEgYm9vbGVhblxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGNscklubGluZSh2YWx1ZTogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLmlubGluZSA9IHZhbHVlID09PSAnZmFsc2UnID8gZmFsc2UgOiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlubGluZSA9ICEhdmFsdWU7XG4gICAgfVxuICB9XG4gIGdldCBjbHJJbmxpbmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5saW5lO1xuICB9XG5cbiAgLy8gQFRPRE8gU29sdmUgZm9yIGdyb3VwIHZhbGlkYXRpb24sIHdoaWNoIGRvZXNuJ3Qgd29yayBub3cgd2l0aCBuZ01vZGVsR3JvdXBcbiAgLy8gQmxvY2tlZCBieSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8yMDI2OFxuICAvLyBASW5wdXQoKVxuICAvLyBzZXQgY2xyRm9ybUdyb3VwKHZhbHVlOiBGb3JtR3JvdXApIHtcbiAgLy8gICB0aGlzLmZvcm1Hcm91cCA9IHZhbHVlO1xuICAvLyB9XG5cbiAgLy8gQElucHV0KClcbiAgLy8gc2V0IGNsckZvcm1BcnJheSh2YWx1ZTogRm9ybUFycmF5KSB7XG4gIC8vICAgdGhpcy5mb3JtR3JvdXAgPSB2YWx1ZTtcbiAgLy8gfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaWZFcnJvclNlcnZpY2U6IElmRXJyb3JTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbGF5b3V0U2VydmljZTogTGF5b3V0U2VydmljZSxcbiAgICBwcml2YXRlIGNvbnRyb2xDbGFzc1NlcnZpY2U6IENvbnRyb2xDbGFzc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBuZ0NvbnRyb2xTZXJ2aWNlOiBOZ0NvbnRyb2xTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5uZ0NvbnRyb2xTZXJ2aWNlLmNvbnRyb2xDaGFuZ2VzLnN1YnNjcmliZShjb250cm9sID0+IHtcbiAgICAgICAgdGhpcy5jb250cm9sID0gY29udHJvbDtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIEBUT0RPIHB1dCBhIHNvbHV0aW9uIGluIGZvciBmb3JtIGdyb3VwIHZhbGlkYXRpb25cbiAgICAvLyBpZiAoIXRoaXMuZm9ybUdyb3VwKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmlmRXJyb3JTZXJ2aWNlLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKGludmFsaWQgPT4ge1xuICAgICAgICB0aGlzLmludmFsaWQgPSBpbnZhbGlkO1xuICAgICAgfSlcbiAgICApO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICAvLyBCZWNhdXNlIG5nTW9kZWwgZG9lcyB0aGlzLCB3ZSBoYXZlIHRvIGRlbGF5IGEgdGljayB0byBnZXQgdGhlIHJlc3VsdFxuICAgIC8vICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgLy8gICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgIC8vICAgICAgIHRoaXMuZm9ybUdyb3VwLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAvLyAgICAgICAgIHRoaXMuaW52YWxpZCA9IHRoaXMuZm9ybUdyb3VwLmludmFsaWQ7XG4gICAgLy8gICAgICAgfSlcbiAgICAvLyAgICAgKTtcbiAgICAvLyAgIH0pO1xuICAgIC8vIH1cbiAgfVxuXG4gIGNvbnRyb2xDbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5jb250cm9sQ2xhc3NTZXJ2aWNlLmNvbnRyb2xDbGFzcyh0aGlzLmludmFsaWQsIHRoaXMuYWRkR3JpZCgpLCB0aGlzLmlubGluZSA/ICdjbHItY29udHJvbC1pbmxpbmUnIDogJycpO1xuICB9XG5cbiAgYWRkR3JpZCgpIHtcbiAgICBpZiAodGhpcy5sYXlvdXRTZXJ2aWNlICYmICF0aGlzLmxheW91dFNlcnZpY2UuaXNWZXJ0aWNhbCgpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLm1hcChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=