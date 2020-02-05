import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, } from '@angular/core';
import { ClrAlert } from './alert';
import { MultiAlertService } from './providers/multi-alert.service';
var ClrAlerts = /** @class */ (function () {
    function ClrAlerts(multiAlertService) {
        this.multiAlertService = multiAlertService;
        this.currentAlertIndexChange = new EventEmitter(false);
        this.currentAlertChange = new EventEmitter(false);
    }
    Object.defineProperty(ClrAlerts.prototype, "_inputCurrentIndex", {
        /**
         * Input/Output to support two way binding on current alert index
         */
        set: function (index) {
            if (Number.isInteger(index) && index >= 0) {
                this.multiAlertService.current = index;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlerts.prototype, "currentAlertIndex", {
        get: function () {
            return this.multiAlertService.current;
        },
        set: function (index) {
            this.multiAlertService.current = index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlerts.prototype, "currentAlert", {
        get: function () {
            return this.multiAlertService.currentAlert;
        },
        /**
         * Input/Output to support two way binding on current alert instance
         */
        set: function (alert) {
            if (alert) {
                this.multiAlertService.currentAlert = alert;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlerts.prototype, "alerts", {
        /**
         * Ensure we are only dealing with alerts that have not been closed yet
         */
        get: function () {
            return this.allAlerts.filter(function (alert) {
                return alert.isHidden === false;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlerts.prototype, "currentAlertType", {
        get: function () {
            if (this.multiAlertService.currentAlert) {
                return this.multiAlertService.currentAlert.alertType;
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    ClrAlerts.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.multiAlertService.manage(this.allAlerts);
        this.multiAlertService.changes.subscribe(function (index) {
            _this.currentAlertIndexChange.next(index);
            _this.currentAlertChange.next(_this.multiAlertService.currentAlert);
        });
    };
    ClrAlerts.prototype.ngOnDestroy = function () {
        this.multiAlertService.destroy();
    };
    tslib_1.__decorate([
        ContentChildren(ClrAlert),
        tslib_1.__metadata("design:type", QueryList)
    ], ClrAlerts.prototype, "allAlerts", void 0);
    tslib_1.__decorate([
        Input('clrCurrentAlertIndex'),
        tslib_1.__metadata("design:type", Number),
        tslib_1.__metadata("design:paramtypes", [Number])
    ], ClrAlerts.prototype, "_inputCurrentIndex", null);
    tslib_1.__decorate([
        Output('clrCurrentAlertIndexChange'),
        tslib_1.__metadata("design:type", Object)
    ], ClrAlerts.prototype, "currentAlertIndexChange", void 0);
    tslib_1.__decorate([
        Input('clrCurrentAlert'),
        tslib_1.__metadata("design:type", ClrAlert),
        tslib_1.__metadata("design:paramtypes", [ClrAlert])
    ], ClrAlerts.prototype, "currentAlert", null);
    tslib_1.__decorate([
        Output('clrCurrentAlertChange'),
        tslib_1.__metadata("design:type", Object)
    ], ClrAlerts.prototype, "currentAlertChange", void 0);
    ClrAlerts = tslib_1.__decorate([
        Component({
            selector: 'clr-alerts',
            template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<clr-alerts-pager\n        *ngIf=\"multiAlertService.count > 1\"\n        [clrCurrentAlertIndex]=\"currentAlertIndex\">\n</clr-alerts-pager>\n<ng-content select=\"clr-alert\"></ng-content>\n",
            providers: [MultiAlertService],
            host: {
                '[class.alerts]': 'true',
                '[class.alert-danger]': "this.currentAlertType == 'danger'",
                '[class.alert-info]': "this.currentAlertType == 'info'",
                '[class.alert-success]': "this.currentAlertType == 'success'",
                '[class.alert-warning]': "this.currentAlertType == 'warning'",
            },
            styles: [':host { display: block }']
        }),
        tslib_1.__metadata("design:paramtypes", [MultiAlertService])
    ], ClrAlerts);
    return ClrAlerts;
}());
export { ClrAlerts };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnRzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZW1waGFzaXMvYWxlcnQvYWxlcnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUVMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDbkMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFlcEU7SUFvREUsbUJBQW1CLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBdkNWLDRCQUF1QixHQUFHLElBQUksWUFBWSxDQUFTLEtBQUssQ0FBQyxDQUFDO1FBcUIvRCx1QkFBa0IsR0FBRyxJQUFJLFlBQVksQ0FBVyxLQUFLLENBQUMsQ0FBQztJQWtCckMsQ0FBQztJQTdDM0Qsc0JBQVcseUNBQWtCO1FBSjdCOztXQUVHO2FBRUgsVUFBOEIsS0FBYTtZQUN6QyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDekMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDeEM7UUFDSCxDQUFDOzs7T0FBQTtJQUlELHNCQUFJLHdDQUFpQjthQUdyQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztRQUN4QyxDQUFDO2FBTEQsVUFBc0IsS0FBYTtZQUNqQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTtJQVNELHNCQUFJLG1DQUFZO2FBS2hCO1lBQ0UsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDO1FBQzdDLENBQUM7UUFYRDs7V0FFRzthQUVILFVBQWlCLEtBQWU7WUFDOUIsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7YUFDN0M7UUFDSCxDQUFDOzs7T0FBQTtJQVNELHNCQUFJLDZCQUFNO1FBSFY7O1dBRUc7YUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLO2dCQUNoQyxPQUFPLEtBQUssQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx1Q0FBZ0I7YUFBcEI7WUFDRSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7YUFDdEQ7WUFDRCxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUM7OztPQUFBO0lBSUQsc0NBQWtCLEdBQWxCO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDNUMsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QyxLQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwrQkFBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25DLENBQUM7SUEvRDBCO1FBQTFCLGVBQWUsQ0FBQyxRQUFRLENBQUM7MENBQVksU0FBUztnREFBVztJQU0xRDtRQURDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQzs7O3VEQUs3QjtJQUVxQztRQUFyQyxNQUFNLENBQUMsNEJBQTRCLENBQUM7OzhEQUFrRTtJQWF2RztRQURDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQzswQ0FDRCxRQUFRO2lEQUFSLFFBQVE7aURBSS9CO0lBSWdDO1FBQWhDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQzs7eURBQStEO0lBbENwRixTQUFTO1FBYnJCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxZQUFZO1lBQ3RCLDJhQUE0QjtZQUM1QixTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztZQUM5QixJQUFJLEVBQUU7Z0JBQ0osZ0JBQWdCLEVBQUUsTUFBTTtnQkFDeEIsc0JBQXNCLEVBQUUsbUNBQW1DO2dCQUMzRCxvQkFBb0IsRUFBRSxpQ0FBaUM7Z0JBQ3ZELHVCQUF1QixFQUFFLG9DQUFvQztnQkFDN0QsdUJBQXVCLEVBQUUsb0NBQW9DO2FBQzlEO3FCQUNRLDBCQUEwQjtTQUNwQyxDQUFDO2lEQXFEc0MsaUJBQWlCO09BcEQ1QyxTQUFTLENBaUVyQjtJQUFELGdCQUFDO0NBQUEsQUFqRUQsSUFpRUM7U0FqRVksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsckFsZXJ0IH0gZnJvbSAnLi9hbGVydCc7XG5pbXBvcnQgeyBNdWx0aUFsZXJ0U2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL211bHRpLWFsZXJ0LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItYWxlcnRzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FsZXJ0cy5odG1sJyxcbiAgcHJvdmlkZXJzOiBbTXVsdGlBbGVydFNlcnZpY2VdLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbGVydHNdJzogJ3RydWUnLFxuICAgICdbY2xhc3MuYWxlcnQtZGFuZ2VyXSc6IFwidGhpcy5jdXJyZW50QWxlcnRUeXBlID09ICdkYW5nZXInXCIsXG4gICAgJ1tjbGFzcy5hbGVydC1pbmZvXSc6IFwidGhpcy5jdXJyZW50QWxlcnRUeXBlID09ICdpbmZvJ1wiLFxuICAgICdbY2xhc3MuYWxlcnQtc3VjY2Vzc10nOiBcInRoaXMuY3VycmVudEFsZXJ0VHlwZSA9PSAnc3VjY2VzcydcIixcbiAgICAnW2NsYXNzLmFsZXJ0LXdhcm5pbmddJzogXCJ0aGlzLmN1cnJlbnRBbGVydFR5cGUgPT0gJ3dhcm5pbmcnXCIsXG4gIH0sXG4gIHN0eWxlczogWyc6aG9zdCB7IGRpc3BsYXk6IGJsb2NrIH0nXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQWxlcnRzIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQENvbnRlbnRDaGlsZHJlbihDbHJBbGVydCkgYWxsQWxlcnRzOiBRdWVyeUxpc3Q8Q2xyQWxlcnQ+O1xuXG4gIC8qKlxuICAgKiBJbnB1dC9PdXRwdXQgdG8gc3VwcG9ydCB0d28gd2F5IGJpbmRpbmcgb24gY3VycmVudCBhbGVydCBpbmRleFxuICAgKi9cbiAgQElucHV0KCdjbHJDdXJyZW50QWxlcnRJbmRleCcpXG4gIHB1YmxpYyBzZXQgX2lucHV0Q3VycmVudEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihpbmRleCkgJiYgaW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50ID0gaW5kZXg7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyQ3VycmVudEFsZXJ0SW5kZXhDaGFuZ2UnKSBwdWJsaWMgY3VycmVudEFsZXJ0SW5kZXhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oZmFsc2UpO1xuXG4gIHNldCBjdXJyZW50QWxlcnRJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50ID0gaW5kZXg7XG4gIH1cbiAgZ2V0IGN1cnJlbnRBbGVydEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnQ7XG4gIH1cblxuICAvKipcbiAgICogSW5wdXQvT3V0cHV0IHRvIHN1cHBvcnQgdHdvIHdheSBiaW5kaW5nIG9uIGN1cnJlbnQgYWxlcnQgaW5zdGFuY2VcbiAgICovXG4gIEBJbnB1dCgnY2xyQ3VycmVudEFsZXJ0JylcbiAgc2V0IGN1cnJlbnRBbGVydChhbGVydDogQ2xyQWxlcnQpIHtcbiAgICBpZiAoYWxlcnQpIHtcbiAgICAgIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudEFsZXJ0ID0gYWxlcnQ7XG4gICAgfVxuICB9XG4gIGdldCBjdXJyZW50QWxlcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudEFsZXJ0O1xuICB9XG4gIEBPdXRwdXQoJ2NsckN1cnJlbnRBbGVydENoYW5nZScpIHB1YmxpYyBjdXJyZW50QWxlcnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENsckFsZXJ0PihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIEVuc3VyZSB3ZSBhcmUgb25seSBkZWFsaW5nIHdpdGggYWxlcnRzIHRoYXQgaGF2ZSBub3QgYmVlbiBjbG9zZWQgeWV0XG4gICAqL1xuICBnZXQgYWxlcnRzKCkge1xuICAgIHJldHVybiB0aGlzLmFsbEFsZXJ0cy5maWx0ZXIoYWxlcnQgPT4ge1xuICAgICAgcmV0dXJuIGFsZXJ0LmlzSGlkZGVuID09PSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBjdXJyZW50QWxlcnRUeXBlKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudEFsZXJ0KSB7XG4gICAgICByZXR1cm4gdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50QWxlcnQuYWxlcnRUeXBlO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbXVsdGlBbGVydFNlcnZpY2U6IE11bHRpQWxlcnRTZXJ2aWNlKSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLm1hbmFnZSh0aGlzLmFsbEFsZXJ0cyk7XG4gICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jaGFuZ2VzLnN1YnNjcmliZShpbmRleCA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRBbGVydEluZGV4Q2hhbmdlLm5leHQoaW5kZXgpO1xuICAgICAgdGhpcy5jdXJyZW50QWxlcnRDaGFuZ2UubmV4dCh0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnRBbGVydCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgfVxufVxuIl19