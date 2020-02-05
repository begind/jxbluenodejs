import * as tslib_1 from "tslib";
/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { HostBinding, HostListener, Input, } from '@angular/core';
import { filter, distinctUntilChanged, startWith } from 'rxjs/operators';
import { HostWrapper } from '../../utils/host-wrapping/host-wrapper';
import { ControlIdService } from './providers/control-id.service';
import { NgControlService } from './providers/ng-control.service';
import { IfErrorService } from './if-error/if-error.service';
import { ControlClassService } from './providers/control-class.service';
import { MarkControlService } from './providers/mark-control.service';
var WrappedFormControl = /** @class */ (function () {
    // I lost way too much time trying to make this work without injecting the ViewContainerRef and the Injector,
    // I'm giving up. So we have to inject these two manually for now.
    function WrappedFormControl(vcr, wrapperType, injector, ngControl, renderer, el) {
        var _this = this;
        this.vcr = vcr;
        this.wrapperType = wrapperType;
        this.ngControl = ngControl;
        this.subscriptions = [];
        this.index = 0;
        this.renderer = renderer;
        this.el = el;
        try {
            this.ngControlService = injector.get(NgControlService);
            this.ifErrorService = injector.get(IfErrorService);
            this.controlClassService = injector.get(ControlClassService);
            this.markControlService = injector.get(MarkControlService);
        }
        catch (e) { }
        if (this.controlClassService) {
            this.controlClassService.initControlClass(renderer, el.nativeElement);
        }
        if (this.markControlService) {
            this.subscriptions.push(this.markControlService.touchedChange.subscribe(function () {
                _this.ngControl.control.markAsTouched();
                _this.ngControl.control.updateValueAndValidity();
            }));
        }
    }
    Object.defineProperty(WrappedFormControl.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            if (this.controlIdService) {
                this.controlIdService.id = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    WrappedFormControl.prototype.triggerValidation = function () {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
    };
    // @TODO This method has a try/catch due to an unknown issue that came when building the clrToggle feature
    // We need to figure out why this fails for the ClrToggle scenario but works for Date picker...
    // To see the error, remove the try/catch here and run the ClrToggle suite to see issues getting the container
    // injector in time, and this ONLY HAPPENS in tests and not in dev/prod mode.
    WrappedFormControl.prototype.getProviderFromContainer = function (token, notFoundValue) {
        try {
            return this._containerInjector.get(token, notFoundValue);
        }
        catch (e) {
            return notFoundValue;
        }
    };
    WrappedFormControl.prototype.ngOnInit = function () {
        this._containerInjector = new HostWrapper(this.wrapperType, this.vcr, this.index);
        this.controlIdService = this._containerInjector.get(ControlIdService);
        if (this._id) {
            this.controlIdService.id = this._id;
        }
        else {
            this._id = this.controlIdService.id;
        }
        if (this.ngControlService) {
            this.ngControlService.setControl(this.ngControl);
        }
        this.listenForErrorStateChanges();
    };
    WrappedFormControl.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    WrappedFormControl.prototype.listenForErrorStateChanges = function () {
        var _this = this;
        if (this.ifErrorService) {
            this.subscriptions.push(this.ifErrorService.statusChanges
                .pipe(startWith(false), filter(function () { return _this.renderer && !!_this.el; }), distinctUntilChanged())
                .subscribe(function (error) { return _this.setAriaDescribedBy(error); }));
        }
    };
    WrappedFormControl.prototype.setAriaDescribedBy = function (error) {
        this.renderer.setAttribute(this.el.nativeElement, 'aria-describedby', this.getAriaDescribedById(error));
    };
    WrappedFormControl.prototype.getAriaDescribedById = function (error) {
        return this.controlIdService.id.concat(error ? '-error' : '-helper');
    };
    tslib_1.__decorate([
        HostBinding(),
        Input(),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], WrappedFormControl.prototype, "id", null);
    tslib_1.__decorate([
        HostListener('blur'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], WrappedFormControl.prototype, "triggerValidation", null);
    return WrappedFormControl;
}());
export { WrappedFormControl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlZC1jb250cm9sLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY29tbW9uL3dyYXBwZWQtY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFDTCxXQUFXLEVBRVgsWUFBWSxFQUVaLEtBQUssR0FPTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsTUFBTSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUdyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFN0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFdEU7SUFjRSw2R0FBNkc7SUFDN0csa0VBQWtFO0lBQ2xFLDRCQUNZLEdBQXFCLEVBQ3JCLFdBQW9CLEVBQzlCLFFBQWtCLEVBQ1YsU0FBb0IsRUFDNUIsUUFBbUIsRUFDbkIsRUFBYztRQU5oQixpQkE0QkM7UUEzQlcsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFDckIsZ0JBQVcsR0FBWCxXQUFXLENBQVM7UUFFdEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQVpwQixrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFDbkMsVUFBSyxHQUFHLENBQUMsQ0FBQztRQWVsQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUk7WUFDRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDNUQ7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO1FBRWQsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDNUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDdkU7UUFDRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7Z0JBQzlDLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN2QyxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQ2xELENBQUMsQ0FBQyxDQUNILENBQUM7U0FDSDtJQUNILENBQUM7SUFJRCxzQkFBSSxrQ0FBRTthQUFOO1lBQ0UsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ2xCLENBQUM7YUFDRCxVQUFPLEtBQWE7WUFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDakIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDO2FBQ2xDO1FBQ0gsQ0FBQzs7O09BTkE7SUFTRCw4Q0FBaUIsR0FBakI7UUFDRSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQzNDO0lBQ0gsQ0FBQztJQUlELDBHQUEwRztJQUMxRywrRkFBK0Y7SUFDL0YsOEdBQThHO0lBQzlHLDZFQUE2RTtJQUNuRSxxREFBd0IsR0FBbEMsVUFBc0MsS0FBa0MsRUFBRSxhQUFpQjtRQUN6RixJQUFJO1lBQ0YsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztTQUMxRDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxhQUFhLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRUQscUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFdEUsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ3JDO2FBQU07WUFDTCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7U0FDckM7UUFFRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNsRDtRQUVELElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCx3Q0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRU8sdURBQTBCLEdBQWxDO1FBQUEsaUJBUUM7UUFQQyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYTtpQkFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLEtBQUksQ0FBQyxFQUFFLEVBQTFCLENBQTBCLENBQUMsRUFBRSxvQkFBb0IsRUFBRSxDQUFDO2lCQUN4RixTQUFTLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEVBQTlCLENBQThCLENBQUMsQ0FDdEQsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVPLCtDQUFrQixHQUExQixVQUEyQixLQUFjO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLGtCQUFrQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFFTyxpREFBb0IsR0FBNUIsVUFBNkIsS0FBYztRQUN6QyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBcEVEO1FBRkMsV0FBVyxFQUFFO1FBQ2IsS0FBSyxFQUFFOzs7Z0RBR1A7SUFTRDtRQURDLFlBQVksQ0FBQyxNQUFNLENBQUM7Ozs7K0RBS3BCO0lBc0RILHlCQUFDO0NBQUEsQUFySEQsSUFxSEM7U0FySFksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgVHlwZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgUmVuZGVyZXIyLFxuICBFbGVtZW50UmVmLFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEhvc3RXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9ob3N0LXdyYXBwZXInO1xuaW1wb3J0IHsgRHluYW1pY1dyYXBwZXIgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2R5bmFtaWMtd3JhcHBlcic7XG5cbmltcG9ydCB7IENvbnRyb2xJZFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9jb250cm9sLWlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdDb250cm9sU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL25nLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBJZkVycm9yU2VydmljZSB9IGZyb20gJy4vaWYtZXJyb3IvaWYtZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb250cm9sQ2xhc3NTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29udHJvbC1jbGFzcy5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcmtDb250cm9sU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL21hcmstY29udHJvbC5zZXJ2aWNlJztcblxuZXhwb3J0IGNsYXNzIFdyYXBwZWRGb3JtQ29udHJvbDxXIGV4dGVuZHMgRHluYW1pY1dyYXBwZXI+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIG5nQ29udHJvbFNlcnZpY2U6IE5nQ29udHJvbFNlcnZpY2U7XG4gIHByaXZhdGUgaWZFcnJvclNlcnZpY2U6IElmRXJyb3JTZXJ2aWNlO1xuICBwcml2YXRlIGNvbnRyb2xDbGFzc1NlcnZpY2U6IENvbnRyb2xDbGFzc1NlcnZpY2U7XG4gIHByaXZhdGUgbWFya0NvbnRyb2xTZXJ2aWNlOiBNYXJrQ29udHJvbFNlcnZpY2U7XG4gIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyO1xuICBwcm90ZWN0ZWQgZWw6IEVsZW1lbnRSZWY8YW55PjtcblxuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJvdGVjdGVkIGluZGV4ID0gMDtcbiAgcHJvdGVjdGVkIGNvbnRyb2xJZFNlcnZpY2U6IENvbnRyb2xJZFNlcnZpY2U7XG5cbiAgX2lkOiBzdHJpbmc7XG5cbiAgLy8gSSBsb3N0IHdheSB0b28gbXVjaCB0aW1lIHRyeWluZyB0byBtYWtlIHRoaXMgd29yayB3aXRob3V0IGluamVjdGluZyB0aGUgVmlld0NvbnRhaW5lclJlZiBhbmQgdGhlIEluamVjdG9yLFxuICAvLyBJJ20gZ2l2aW5nIHVwLiBTbyB3ZSBoYXZlIHRvIGluamVjdCB0aGVzZSB0d28gbWFudWFsbHkgZm9yIG5vdy5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcm90ZWN0ZWQgd3JhcHBlclR5cGU6IFR5cGU8Vz4sXG4gICAgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBlbDogRWxlbWVudFJlZlxuICApIHtcbiAgICB0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRyeSB7XG4gICAgICB0aGlzLm5nQ29udHJvbFNlcnZpY2UgPSBpbmplY3Rvci5nZXQoTmdDb250cm9sU2VydmljZSk7XG4gICAgICB0aGlzLmlmRXJyb3JTZXJ2aWNlID0gaW5qZWN0b3IuZ2V0KElmRXJyb3JTZXJ2aWNlKTtcbiAgICAgIHRoaXMuY29udHJvbENsYXNzU2VydmljZSA9IGluamVjdG9yLmdldChDb250cm9sQ2xhc3NTZXJ2aWNlKTtcbiAgICAgIHRoaXMubWFya0NvbnRyb2xTZXJ2aWNlID0gaW5qZWN0b3IuZ2V0KE1hcmtDb250cm9sU2VydmljZSk7XG4gICAgfSBjYXRjaCAoZSkge31cblxuICAgIGlmICh0aGlzLmNvbnRyb2xDbGFzc1NlcnZpY2UpIHtcbiAgICAgIHRoaXMuY29udHJvbENsYXNzU2VydmljZS5pbml0Q29udHJvbENsYXNzKHJlbmRlcmVyLCBlbC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gICAgaWYgKHRoaXMubWFya0NvbnRyb2xTZXJ2aWNlKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgdGhpcy5tYXJrQ29udHJvbFNlcnZpY2UudG91Y2hlZENoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubmdDb250cm9sLmNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xuICAgICAgICAgIHRoaXMubmdDb250cm9sLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBASG9zdEJpbmRpbmcoKVxuICBASW5wdXQoKVxuICBnZXQgaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG4gIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5faWQgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5jb250cm9sSWRTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmNvbnRyb2xJZFNlcnZpY2UuaWQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgdHJpZ2dlclZhbGlkYXRpb24oKSB7XG4gICAgaWYgKHRoaXMuaWZFcnJvclNlcnZpY2UpIHtcbiAgICAgIHRoaXMuaWZFcnJvclNlcnZpY2UudHJpZ2dlclN0YXR1c0NoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRhaW5lckluamVjdG9yOiBJbmplY3RvcjtcblxuICAvLyBAVE9ETyBUaGlzIG1ldGhvZCBoYXMgYSB0cnkvY2F0Y2ggZHVlIHRvIGFuIHVua25vd24gaXNzdWUgdGhhdCBjYW1lIHdoZW4gYnVpbGRpbmcgdGhlIGNsclRvZ2dsZSBmZWF0dXJlXG4gIC8vIFdlIG5lZWQgdG8gZmlndXJlIG91dCB3aHkgdGhpcyBmYWlscyBmb3IgdGhlIENsclRvZ2dsZSBzY2VuYXJpbyBidXQgd29ya3MgZm9yIERhdGUgcGlja2VyLi4uXG4gIC8vIFRvIHNlZSB0aGUgZXJyb3IsIHJlbW92ZSB0aGUgdHJ5L2NhdGNoIGhlcmUgYW5kIHJ1biB0aGUgQ2xyVG9nZ2xlIHN1aXRlIHRvIHNlZSBpc3N1ZXMgZ2V0dGluZyB0aGUgY29udGFpbmVyXG4gIC8vIGluamVjdG9yIGluIHRpbWUsIGFuZCB0aGlzIE9OTFkgSEFQUEVOUyBpbiB0ZXN0cyBhbmQgbm90IGluIGRldi9wcm9kIG1vZGUuXG4gIHByb3RlY3RlZCBnZXRQcm92aWRlckZyb21Db250YWluZXI8VD4odG9rZW46IFR5cGU8VD4gfCBJbmplY3Rpb25Ub2tlbjxUPiwgbm90Rm91bmRWYWx1ZT86IFQpOiBUIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lckluamVjdG9yLmdldCh0b2tlbiwgbm90Rm91bmRWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIG5vdEZvdW5kVmFsdWU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fY29udGFpbmVySW5qZWN0b3IgPSBuZXcgSG9zdFdyYXBwZXIodGhpcy53cmFwcGVyVHlwZSwgdGhpcy52Y3IsIHRoaXMuaW5kZXgpO1xuICAgIHRoaXMuY29udHJvbElkU2VydmljZSA9IHRoaXMuX2NvbnRhaW5lckluamVjdG9yLmdldChDb250cm9sSWRTZXJ2aWNlKTtcblxuICAgIGlmICh0aGlzLl9pZCkge1xuICAgICAgdGhpcy5jb250cm9sSWRTZXJ2aWNlLmlkID0gdGhpcy5faWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2lkID0gdGhpcy5jb250cm9sSWRTZXJ2aWNlLmlkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm5nQ29udHJvbFNlcnZpY2UpIHtcbiAgICAgIHRoaXMubmdDb250cm9sU2VydmljZS5zZXRDb250cm9sKHRoaXMubmdDb250cm9sKTtcbiAgICB9XG5cbiAgICB0aGlzLmxpc3RlbkZvckVycm9yU3RhdGVDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JFcnJvclN0YXRlQ2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5pZkVycm9yU2VydmljZSkge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgIHRoaXMuaWZFcnJvclNlcnZpY2Uuc3RhdHVzQ2hhbmdlc1xuICAgICAgICAgIC5waXBlKHN0YXJ0V2l0aChmYWxzZSksIGZpbHRlcigoKSA9PiB0aGlzLnJlbmRlcmVyICYmICEhdGhpcy5lbCksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gICAgICAgICAgLnN1YnNjcmliZShlcnJvciA9PiB0aGlzLnNldEFyaWFEZXNjcmliZWRCeShlcnJvcikpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0QXJpYURlc2NyaWJlZEJ5KGVycm9yOiBib29sZWFuKSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnYXJpYS1kZXNjcmliZWRieScsIHRoaXMuZ2V0QXJpYURlc2NyaWJlZEJ5SWQoZXJyb3IpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QXJpYURlc2NyaWJlZEJ5SWQoZXJyb3I6IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbnRyb2xJZFNlcnZpY2UuaWQuY29uY2F0KGVycm9yID8gJy1lcnJvcicgOiAnLWhlbHBlcicpO1xuICB9XG59XG4iXX0=