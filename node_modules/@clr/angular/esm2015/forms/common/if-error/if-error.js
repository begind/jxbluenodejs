import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, Input, Optional, TemplateRef, ViewContainerRef } from '@angular/core';
import { IfErrorService } from './if-error.service';
import { NgControlService } from '../providers/ng-control.service';
let ClrIfError = class ClrIfError {
    constructor(ifErrorService, ngControlService, template, container) {
        this.ifErrorService = ifErrorService;
        this.ngControlService = ngControlService;
        this.template = template;
        this.container = container;
        this.subscriptions = [];
        this.displayed = false;
        if (!this.ifErrorService) {
            throw new Error('clrIfError can only be used within a form control container element like clr-input-container');
        }
        else {
            this.displayError(false);
        }
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(control => {
            this.control = control;
        }));
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(invalid => {
            // If there is a specific error to track, check it, otherwise check overall validity
            if (this.error && this.control) {
                this.displayError(this.control.hasError(this.error));
            }
            else {
                this.displayError(invalid);
            }
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    displayError(invalid) {
        if (invalid && !this.displayed) {
            this.container.createEmbeddedView(this.template);
            this.displayed = true;
        }
        else if (!invalid) {
            this.container.clear();
            this.displayed = false;
        }
    }
};
tslib_1.__decorate([
    Input('clrIfError'),
    tslib_1.__metadata("design:type", String)
], ClrIfError.prototype, "error", void 0);
ClrIfError = tslib_1.__decorate([
    Directive({ selector: '[clrIfError]' }),
    tslib_1.__param(0, Optional()),
    tslib_1.__param(1, Optional()),
    tslib_1.__metadata("design:paramtypes", [IfErrorService,
        NgControlService,
        TemplateRef,
        ViewContainerRef])
], ClrIfError);
export { ClrIfError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtZXJyb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jb21tb24vaWYtZXJyb3IvaWYtZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzFGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUluRSxJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFVO0lBQ3JCLFlBQ3NCLGNBQThCLEVBQzlCLGdCQUFrQyxFQUM5QyxRQUEwQixFQUMxQixTQUEyQjtRQUhmLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzlDLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBQzFCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBMEI3QixrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFDbkMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQXpCakMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4RkFBOEYsQ0FBQyxDQUFDO1NBQ2pIO2FBQU07WUFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUNILENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3BELG9GQUFvRjtZQUNwRixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUN0RDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzVCO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFRRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRU8sWUFBWSxDQUFDLE9BQWdCO1FBQ25DLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN2QjthQUFNLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUN4QjtJQUNILENBQUM7Q0FDRixDQUFBO0FBbkJzQjtJQUFwQixLQUFLLENBQUMsWUFBWSxDQUFDOzt5Q0FBZTtBQTdCeEIsVUFBVTtJQUR0QixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLENBQUM7SUFHbkMsbUJBQUEsUUFBUSxFQUFFLENBQUE7SUFDVixtQkFBQSxRQUFRLEVBQUUsQ0FBQTs2Q0FEeUIsY0FBYztRQUNaLGdCQUFnQjtRQUNwQyxXQUFXO1FBQ1YsZ0JBQWdCO0dBTDFCLFVBQVUsQ0FnRHRCO1NBaERZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPcHRpb25hbCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJZkVycm9yU2VydmljZSB9IGZyb20gJy4vaWYtZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL25nLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJJZkVycm9yXScgfSlcbmV4cG9ydCBjbGFzcyBDbHJJZkVycm9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBpZkVycm9yU2VydmljZTogSWZFcnJvclNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuZ0NvbnRyb2xTZXJ2aWNlOiBOZ0NvbnRyb2xTZXJ2aWNlLFxuICAgIHByaXZhdGUgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7XG4gICAgaWYgKCF0aGlzLmlmRXJyb3JTZXJ2aWNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NscklmRXJyb3IgY2FuIG9ubHkgYmUgdXNlZCB3aXRoaW4gYSBmb3JtIGNvbnRyb2wgY29udGFpbmVyIGVsZW1lbnQgbGlrZSBjbHItaW5wdXQtY29udGFpbmVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlzcGxheUVycm9yKGZhbHNlKTtcbiAgICB9XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm5nQ29udHJvbFNlcnZpY2UuY29udHJvbENoYW5nZXMuc3Vic2NyaWJlKGNvbnRyb2wgPT4ge1xuICAgICAgICB0aGlzLmNvbnRyb2wgPSBjb250cm9sO1xuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5pZkVycm9yU2VydmljZS5zdGF0dXNDaGFuZ2VzLnN1YnNjcmliZShpbnZhbGlkID0+IHtcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBzcGVjaWZpYyBlcnJvciB0byB0cmFjaywgY2hlY2sgaXQsIG90aGVyd2lzZSBjaGVjayBvdmVyYWxsIHZhbGlkaXR5XG4gICAgICAgIGlmICh0aGlzLmVycm9yICYmIHRoaXMuY29udHJvbCkge1xuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yKHRoaXMuY29udHJvbC5oYXNFcnJvcih0aGlzLmVycm9yKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3IoaW52YWxpZCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xySWZFcnJvcicpIGVycm9yOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBwcml2YXRlIGRpc3BsYXllZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGNvbnRyb2w6IE5nQ29udHJvbDtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBkaXNwbGF5RXJyb3IoaW52YWxpZDogYm9vbGVhbikge1xuICAgIGlmIChpbnZhbGlkICYmICF0aGlzLmRpc3BsYXllZCkge1xuICAgICAgdGhpcy5jb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGUpO1xuICAgICAgdGhpcy5kaXNwbGF5ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIWludmFsaWQpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLmNsZWFyKCk7XG4gICAgICB0aGlzLmRpc3BsYXllZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIl19