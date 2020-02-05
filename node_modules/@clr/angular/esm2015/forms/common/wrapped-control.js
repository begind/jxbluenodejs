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
export class WrappedFormControl {
    // I lost way too much time trying to make this work without injecting the ViewContainerRef and the Injector,
    // I'm giving up. So we have to inject these two manually for now.
    constructor(vcr, wrapperType, injector, ngControl, renderer, el) {
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
            this.subscriptions.push(this.markControlService.touchedChange.subscribe(() => {
                this.ngControl.control.markAsTouched();
                this.ngControl.control.updateValueAndValidity();
            }));
        }
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
        if (this.controlIdService) {
            this.controlIdService.id = value;
        }
    }
    triggerValidation() {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
    }
    // @TODO This method has a try/catch due to an unknown issue that came when building the clrToggle feature
    // We need to figure out why this fails for the ClrToggle scenario but works for Date picker...
    // To see the error, remove the try/catch here and run the ClrToggle suite to see issues getting the container
    // injector in time, and this ONLY HAPPENS in tests and not in dev/prod mode.
    getProviderFromContainer(token, notFoundValue) {
        try {
            return this._containerInjector.get(token, notFoundValue);
        }
        catch (e) {
            return notFoundValue;
        }
    }
    ngOnInit() {
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
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    listenForErrorStateChanges() {
        if (this.ifErrorService) {
            this.subscriptions.push(this.ifErrorService.statusChanges
                .pipe(startWith(false), filter(() => this.renderer && !!this.el), distinctUntilChanged())
                .subscribe(error => this.setAriaDescribedBy(error)));
        }
    }
    setAriaDescribedBy(error) {
        this.renderer.setAttribute(this.el.nativeElement, 'aria-describedby', this.getAriaDescribedById(error));
    }
    getAriaDescribedById(error) {
        return this.controlIdService.id.concat(error ? '-error' : '-helper');
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlZC1jb250cm9sLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY29tbW9uL3dyYXBwZWQtY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFDTCxXQUFXLEVBRVgsWUFBWSxFQUVaLEtBQUssR0FPTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsTUFBTSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUdyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFN0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFdEUsTUFBTSxPQUFPLGtCQUFrQjtJQWM3Qiw2R0FBNkc7SUFDN0csa0VBQWtFO0lBQ2xFLFlBQ1ksR0FBcUIsRUFDckIsV0FBb0IsRUFDOUIsUUFBa0IsRUFDVixTQUFvQixFQUM1QixRQUFtQixFQUNuQixFQUFjO1FBTEosUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFDckIsZ0JBQVcsR0FBWCxXQUFXLENBQVM7UUFFdEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQVpwQixrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFDbkMsVUFBSyxHQUFHLENBQUMsQ0FBQztRQWVsQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUk7WUFDRixJQUFJLENB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QztJQUVPLDBCQUEwQjtRQUNoQyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYTtpQkFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLG9CQUFvQixFQUFFLENBQUM7aUJBQ3hGLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUN0RCxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRU8sa0JBQWtCLENBQUMsS0FBYztRQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRU8sb0JBQW9CLENBQUMsS0FBYztRQUN6QyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2RSxDQUFDO0NBQ0Y7QUFyRUM7SUFGQyxXQUFXLEVBQUU7SUFDYixLQUFLLEVBQUU7Ozs0Q0FHUDtBQVNEO0lBREMsWUFBWSxDQUFDLE1BQU0sQ0FBQzs7OzsyREFLcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHtcbiAgSG9zdEJpbmRpbmcsXG4gIEluamVjdGlvblRva2VuLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBUeXBlLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBSZW5kZXJlcjIsXG4gIEVsZW1lbnRSZWYsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgSG9zdFdyYXBwZXIgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2hvc3Qtd3JhcHBlcic7XG5pbXBvcnQgeyBEeW5hbWljV3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvZHluYW1pYy13cmFwcGVyJztcblxuaW1wb3J0IHsgQ29udHJvbElkU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbnRyb2wtaWQuc2VydmljZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbmctY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IElmRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi9pZi1lcnJvci9pZi1lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbnRyb2xDbGFzc1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9jb250cm9sLWNsYXNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFya0NvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbWFyay1jb250cm9sLnNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgV3JhcHBlZEZvcm1Db250cm9sPFcgZXh0ZW5kcyBEeW5hbWljV3JhcHBlcj4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgbmdDb250cm9sU2VydmljZTogTmdDb250cm9sU2VydmljZTtcbiAgcHJpdmF0ZSBpZkVycm9yU2VydmljZTogSWZFcnJvclNlcnZpY2U7XG4gIHByaXZhdGUgY29udHJvbENsYXNzU2VydmljZTogQ29udHJvbENsYXNzU2VydmljZTtcbiAgcHJpdmF0ZSBtYXJrQ29udHJvbFNlcnZpY2U6IE1hcmtDb250cm9sU2VydmljZTtcbiAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjI7XG4gIHByb3RlY3RlZCBlbDogRWxlbWVudFJlZjxhbnk+O1xuXG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBwcm90ZWN0ZWQgaW5kZXggPSAwO1xuICBwcm90ZWN0ZWQgY29udHJvbElkU2VydmljZTogQ29udHJvbElkU2VydmljZTtcblxuICBfaWQ6IHN0cmluZztcblxuICAvLyBJIGxvc3Qgd2F5IHRvbyBtdWNoIHRpbWUgdHJ5aW5nIHRvIG1ha2UgdGhpcyB3b3JrIHdpdGhvdXQgaW5qZWN0aW5nIHRoZSBWaWV3Q29udGFpbmVyUmVmIGFuZCB0aGUgSW5qZWN0b3IsXG4gIC8vIEknbSBnaXZpbmcgdXAuIFNvIHdlIGhhdmUgdG8gaW5qZWN0IHRoZXNlIHR3byBtYW51YWxseSBmb3Igbm93LlxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByb3RlY3RlZCB3cmFwcGVyVHlwZTogVHlwZTxXPixcbiAgICBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIGVsOiBFbGVtZW50UmVmXG4gICkge1xuICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubmdDb250cm9sU2VydmljZSA9IGluamVjdG9yLmdldChOZ0NvbnRyb2xTZXJ2aWNlKTtcbiAgICAgIHRoaXMuaWZFcnJvclNlcnZpY2UgPSBpbmplY3Rvci5nZXQoSWZFcnJvclNlcnZpY2UpO1xuICAgICAgdGhpcy5jb250cm9sQ2xhc3NTZXJ2aWNlID0gaW5qZWN0b3IuZ2V0KENvbnRyb2xDbGFzc1NlcnZpY2UpO1xuICAgICAgdGhpcy5tYXJrQ29udHJvbFNlcnZpY2UgPSBpbmplY3Rvci5nZXQoTWFya0NvbnRyb2xTZXJ2aWNlKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgaWYgKHRoaXMuY29udHJvbENsYXNzU2VydmljZSkge1xuICAgICAgdGhpcy5jb250cm9sQ2xhc3NTZXJ2aWNlLmluaXRDb250cm9sQ2xhc3MocmVuZGVyZXIsIGVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5tYXJrQ29udHJvbFNlcnZpY2UpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICB0aGlzLm1hcmtDb250cm9sU2VydmljZS50b3VjaGVkQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5uZ0NvbnRyb2wuY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICAgICAgdGhpcy5uZ0NvbnRyb2wuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0QmluZGluZygpXG4gIEBJbnB1dCgpXG4gIGdldCBpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cbiAgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9pZCA9IHZhbHVlO1xuICAgIGlmICh0aGlzLmNvbnRyb2xJZFNlcnZpY2UpIHtcbiAgICAgIHRoaXMuY29udHJvbElkU2VydmljZS5pZCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICB0cmlnZ2VyVmFsaWRhdGlvbigpIHtcbiAgICBpZiAodGhpcy5pZkVycm9yU2VydmljZSkge1xuICAgICAgdGhpcy5pZkVycm9yU2VydmljZS50cmlnZ2VyU3RhdHVzQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29udGFpbmVySW5qZWN0b3I6IEluamVjdG9yO1xuXG4gIC8vIEBUT0RPIFRoaXMgbWV0aG9kIGhhcyBhIHRyeS9jYXRjaCBkdWUgdG8gYW4gdW5rbm93biBpc3N1ZSB0aGF0IGNhbWUgd2hlbiBidWlsZGluZyB0aGUgY2xyVG9nZ2xlIGZlYXR1cmVcbiAgLy8gV2UgbmVlZCB0byBmaWd1cmUgb3V0IHdoeSB0aGlzIGZhaWxzIGZvciB0aGUgQ2xyVG9nZ2xlIHNjZW5hcmlvIGJ1dCB3b3JrcyBmb3IgRGF0ZSBwaWNrZXIuLi5cbiAgLy8gVG8gc2VlIHRoZSBlcnJvciwgcmVtb3ZlIHRoZSB0cnkvY2F0Y2ggaGVyZSBhbmQgcnVuIHRoZSBDbHJUb2dnbGUgc3VpdGUgdG8gc2VlIGlzc3VlcyBnZXR0aW5nIHRoZSBjb250YWluZXJcbiAgLy8gaW5qZWN0b3IgaW4gdGltZSwgYW5kIHRoaXMgT05MWSBIQVBQRU5TIGluIHRlc3RzIGFuZCBub3QgaW4gZGV2L3Byb2QgbW9kZS5cbiAgcHJvdGVjdGVkIGdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcjxUPih0b2tlbjogVHlwZTxUPiB8IEluamVjdGlvblRva2VuPFQ+LCBub3RGb3VuZFZhbHVlPzogVCk6IFQge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29udGFpbmVySW5qZWN0b3IuZ2V0KHRva2VuLCBub3RGb3VuZFZhbHVlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gbm90Rm91bmRWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9jb250YWluZXJJbmplY3RvciA9IG5ldyBIb3N0V3JhcHBlcih0aGlzLndyYXBwZXJUeXBlLCB0aGlzLnZjciwgdGhpcy5pbmRleCk7XG4gICAgdGhpcy5jb250cm9sSWRTZXJ2aWNlID0gdGhpcy5fY29udGFpbmVySW5qZWN0b3IuZ2V0KENvbnRyb2xJZFNlcnZpY2UpO1xuXG4gICAgaWYgKHRoaXMuX2lkKSB7XG4gICAgICB0aGlzLmNvbnRyb2xJZFNlcnZpY2UuaWQgPSB0aGlzLl9pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faWQgPSB0aGlzLmNvbnRyb2xJZFNlcnZpY2UuaWQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubmdDb250cm9sU2VydmljZSkge1xuICAgICAgdGhpcy5uZ0NvbnRyb2xTZXJ2aWNlLnNldENvbnRyb2wodGhpcy5uZ0NvbnRyb2wpO1xuICAgIH1cblxuICAgIHRoaXMubGlzdGVuRm9yRXJyb3JTdGF0ZUNoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvckVycm9yU3RhdGVDaGFuZ2VzKCkge1xuICAgIGlmICh0aGlzLmlmRXJyb3JTZXJ2aWNlKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgdGhpcy5pZkVycm9yU2VydmljZS5zdGF0dXNDaGFuZ2VzXG4gICAgICAgICAgLnBpcGUoc3RhcnRXaXRoKGZhbHNlKSwgZmlsdGVyKCgpID0+IHRoaXMucmVuZGVyZXIgJiYgISF0aGlzLmVsKSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKGVycm9yID0+IHRoaXMuc2V0QXJpYURlc2NyaWJlZEJ5KGVycm9yKSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRBcmlhRGVzY3JpYmVkQnkoZXJyb3I6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdhcmlhLWRlc2NyaWJlZGJ5JywgdGhpcy5nZXRBcmlhRGVzY3JpYmVkQnlJZChlcnJvcikpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRBcmlhRGVzY3JpYmVkQnlJZChlcnJvcjogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29udHJvbElkU2VydmljZS5pZC5jb25jYXQoZXJyb3IgPyAnLWVycm9yJyA6ICctaGVscGVyJyk7XG4gIH1cbn1cbiJdfQ==