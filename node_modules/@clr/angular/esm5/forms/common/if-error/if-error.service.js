/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NgControlService } from '../providers/ng-control.service';
var IfErrorService = /** @class */ (function () {
    function IfErrorService(ngControlService) {
        var _this = this;
        this.ngControlService = ngControlService;
        // Implement our own status changes observable, since Angular controls don't
        // fire on events like blur, and we want to return the boolean state instead of a string
        this._statusChanges = new Subject();
        this.subscriptions = [];
        // Wait for the control to be available
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(function (control) {
            if (control) {
                _this.control = control;
                _this.listenForChanges();
            }
        }));
    }
    Object.defineProperty(IfErrorService.prototype, "statusChanges", {
        get: function () {
            return this._statusChanges.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    // Subscribe to the status change events, only after touched and emit the control
    IfErrorService.prototype.listenForChanges = function () {
        var _this = this;
        this.subscriptions.push(this.control.statusChanges.subscribe(function () {
            _this.sendValidity();
        }));
    };
    IfErrorService.prototype.sendValidity = function () {
        if (this.control.touched && this.control.invalid) {
            this._statusChanges.next(true);
        }
        else {
            this._statusChanges.next(false);
        }
    };
    // Allows a control to push a status check upstream, such as on blur
    IfErrorService.prototype.triggerStatusChange = function () {
        if (this.control) {
            this.sendValidity();
        }
    };
    // Clean up subscriptions
    IfErrorService.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    IfErrorService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [NgControlService])
    ], IfErrorService);
    return IfErrorService;
}());
export { IfErrorService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtZXJyb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2NvbW1vbi9pZi1lcnJvci9pZi1lcnJvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUV0RCxPQUFPLEVBQWMsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUV6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUduRTtJQVdFLHdCQUFvQixnQkFBa0M7UUFBdEQsaUJBVUM7UUFWbUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQVZ0RCw0RUFBNEU7UUFDNUUsd0ZBQXdGO1FBQ2hGLG1CQUFjLEdBQXFCLElBQUksT0FBTyxFQUFFLENBQUM7UUFLakQsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBSXpDLHVDQUF1QztRQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPO1lBQ3BELElBQUksT0FBTyxFQUFFO2dCQUNYLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUN2QixLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUN6QjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBakJELHNCQUFJLHlDQUFhO2FBQWpCO1lBQ0UsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzVDLENBQUM7OztPQUFBO0lBaUJELGlGQUFpRjtJQUN6RSx5Q0FBZ0IsR0FBeEI7UUFBQSxpQkFNQztRQUxDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7WUFDbkMsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRU8scUNBQVksR0FBcEI7UUFDRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ2hELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO2FBQU07WUFDTCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUM7SUFFRCxvRUFBb0U7SUFDcEUsNENBQW1CLEdBQW5CO1FBQ0UsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7SUFFRCx5QkFBeUI7SUFDekIsb0NBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQWxEVSxjQUFjO1FBRDFCLFVBQVUsRUFBRTtpREFZMkIsZ0JBQWdCO09BWDNDLGNBQWMsQ0FtRDFCO0lBQUQscUJBQUM7Q0FBQSxBQW5ERCxJQW1EQztTQW5EWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBOZ0NvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL25nLWNvbnRyb2wuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJZkVycm9yU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8vIEltcGxlbWVudCBvdXIgb3duIHN0YXR1cyBjaGFuZ2VzIG9ic2VydmFibGUsIHNpbmNlIEFuZ3VsYXIgY29udHJvbHMgZG9uJ3RcbiAgLy8gZmlyZSBvbiBldmVudHMgbGlrZSBibHVyLCBhbmQgd2Ugd2FudCB0byByZXR1cm4gdGhlIGJvb2xlYW4gc3RhdGUgaW5zdGVhZCBvZiBhIHN0cmluZ1xuICBwcml2YXRlIF9zdGF0dXNDaGFuZ2VzOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3QoKTtcbiAgZ2V0IHN0YXR1c0NoYW5nZXMoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXR1c0NoYW5nZXMuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHByaXZhdGUgY29udHJvbDogTmdDb250cm9sO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdDb250cm9sU2VydmljZTogTmdDb250cm9sU2VydmljZSkge1xuICAgIC8vIFdhaXQgZm9yIHRoZSBjb250cm9sIHRvIGJlIGF2YWlsYWJsZVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5uZ0NvbnRyb2xTZXJ2aWNlLmNvbnRyb2xDaGFuZ2VzLnN1YnNjcmliZShjb250cm9sID0+IHtcbiAgICAgICAgaWYgKGNvbnRyb2wpIHtcbiAgICAgICAgICB0aGlzLmNvbnRyb2wgPSBjb250cm9sO1xuICAgICAgICAgIHRoaXMubGlzdGVuRm9yQ2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvLyBTdWJzY3JpYmUgdG8gdGhlIHN0YXR1cyBjaGFuZ2UgZXZlbnRzLCBvbmx5IGFmdGVyIHRvdWNoZWQgYW5kIGVtaXQgdGhlIGNvbnRyb2xcbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JDaGFuZ2VzKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5jb250cm9sLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZW5kVmFsaWRpdHkoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc2VuZFZhbGlkaXR5KCkge1xuICAgIGlmICh0aGlzLmNvbnRyb2wudG91Y2hlZCAmJiB0aGlzLmNvbnRyb2wuaW52YWxpZCkge1xuICAgICAgdGhpcy5fc3RhdHVzQ2hhbmdlcy5uZXh0KHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zdGF0dXNDaGFuZ2VzLm5leHQoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFsbG93cyBhIGNvbnRyb2wgdG8gcHVzaCBhIHN0YXR1cyBjaGVjayB1cHN0cmVhbSwgc3VjaCBhcyBvbiBibHVyXG4gIHRyaWdnZXJTdGF0dXNDaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMuY29udHJvbCkge1xuICAgICAgdGhpcy5zZW5kVmFsaWRpdHkoKTtcbiAgICB9XG4gIH1cblxuICAvLyBDbGVhbiB1cCBzdWJzY3JpcHRpb25zXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==