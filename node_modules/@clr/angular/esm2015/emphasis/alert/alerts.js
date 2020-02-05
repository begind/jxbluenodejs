import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, } from '@angular/core';
import { ClrAlert } from './alert';
import { MultiAlertService } from './providers/multi-alert.service';
let ClrAlerts = class ClrAlerts {
    constructor(multiAlertService) {
        this.multiAlertService = multiAlertService;
        this.currentAlertIndexChange = new EventEmitter(false);
        this.currentAlertChange = new EventEmitter(false);
    }
    /**
     * Input/Output to support two way binding on current alert index
     */
    set _inputCurrentIndex(index) {
        if (Number.isInteger(index) && index >= 0) {
            this.multiAlertService.current = index;
        }
    }
    set currentAlertIndex(index) {
        this.multiAlertService.current = index;
    }
    get currentAlertIndex() {
        return this.multiAlertService.current;
    }
    /**
     * Input/Output to support two way binding on current alert instance
     */
    set currentAlert(alert) {
        if (alert) {
            this.multiAlertService.currentAlert = alert;
        }
    }
    get currentAlert() {
        return this.multiAlertService.currentAlert;
    }
    /**
     * Ensure we are only dealing with alerts that have not been closed yet
     */
    get alerts() {
        return this.allAlerts.filter(alert => {
            return alert.isHidden === false;
        });
    }
    get currentAlertType() {
        if (this.multiAlertService.currentAlert) {
            return this.multiAlertService.currentAlert.alertType;
        }
        return '';
    }
    ngAfterContentInit() {
        this.multiAlertService.manage(this.allAlerts);
        this.multiAlertService.changes.subscribe(index => {
            this.currentAlertIndexChange.next(index);
            this.currentAlertChange.next(this.multiAlertService.currentAlert);
        });
    }
    ngOnDestroy() {
        this.multiAlertService.destroy();
    }
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
export { ClrAlerts };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnRzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZW1waGFzaXMvYWxlcnQvYWxlcnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUVMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDbkMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFlcEUsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBUztJQW9EcEIsWUFBbUIsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUF2Q1YsNEJBQXVCLEdBQUcsSUFBSSxZQUFZLENBQVMsS0FBSyxDQUFDLENBQUM7UUFxQi9ELHVCQUFrQixHQUFHLElBQUksWUFBWSxDQUFXLEtBQUssQ0FBQyxDQUFDO0lBa0JyQyxDQUFDO0lBakQzRDs7T0FFRztJQUVILElBQVcsa0JBQWtCLENBQUMsS0FBYTtRQUN6QyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtZQUN6QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUN4QztJQUNILENBQUM7SUFJRCxJQUFJLGlCQUFpQixDQUFDLEtBQWE7UUFDakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekMsQ0FBQztJQUNELElBQUksaUJBQWlCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztJQUN4QyxDQUFDO0lBRUQ7O09BRUc7SUFFSCxJQUFJLFlBQVksQ0FBQyxLQUFlO1FBQzlCLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7U0FDN0M7SUFDSCxDQUFDO0lBQ0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDO0lBQzdDLENBQUM7SUFHRDs7T0FFRztJQUNILElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkMsT0FBTyxLQUFLLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLGdCQUFnQjtRQUNsQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUU7WUFDdkMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztTQUN0RDtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUlELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMvQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkMsQ0FBQztDQUNGLENBQUE7QUFoRTRCO0lBQTFCLGVBQWUsQ0FBQyxRQUFRLENBQUM7c0NBQVksU0FBUzs0Q0FBVztBQU0xRDtJQURDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQzs7O21EQUs3QjtBQUVxQztJQUFyQyxNQUFNLENBQUMsNEJBQTRCLENBQUM7OzBEQUFrRTtBQWF2RztJQURDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztzQ0FDRCxRQUFROzZDQUFSLFFBQVE7NkNBSS9CO0FBSWdDO0lBQWhDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQzs7cURBQStEO0FBbENwRixTQUFTO0lBYnJCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxZQUFZO1FBQ3RCLDJhQUE0QjtRQUM1QixTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztRQUM5QixJQUFJLEVBQUU7WUFDSixnQkFBZ0IsRUFBRSxNQUFNO1lBQ3hCLHNCQUFzQixFQUFFLG1DQUFtQztZQUMzRCxvQkFBb0IsRUFBRSxpQ0FBaUM7WUFDdkQsdUJBQXVCLEVBQUUsb0NBQW9DO1lBQzdELHVCQUF1QixFQUFFLG9DQUFvQztTQUM5RDtpQkFDUSwwQkFBMEI7S0FDcEMsQ0FBQzs2Q0FxRHNDLGlCQUFpQjtHQXBENUMsU0FBUyxDQWlFckI7U0FqRVksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsckFsZXJ0IH0gZnJvbSAnLi9hbGVydCc7XG5pbXBvcnQgeyBNdWx0aUFsZXJ0U2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL211bHRpLWFsZXJ0LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItYWxlcnRzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FsZXJ0cy5odG1sJyxcbiAgcHJvdmlkZXJzOiBbTXVsdGlBbGVydFNlcnZpY2VdLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbGVydHNdJzogJ3RydWUnLFxuICAgICdbY2xhc3MuYWxlcnQtZGFuZ2VyXSc6IFwidGhpcy5jdXJyZW50QWxlcnRUeXBlID09ICdkYW5nZXInXCIsXG4gICAgJ1tjbGFzcy5hbGVydC1pbmZvXSc6IFwidGhpcy5jdXJyZW50QWxlcnRUeXBlID09ICdpbmZvJ1wiLFxuICAgICdbY2xhc3MuYWxlcnQtc3VjY2Vzc10nOiBcInRoaXMuY3VycmVudEFsZXJ0VHlwZSA9PSAnc3VjY2VzcydcIixcbiAgICAnW2NsYXNzLmFsZXJ0LXdhcm5pbmddJzogXCJ0aGlzLmN1cnJlbnRBbGVydFR5cGUgPT0gJ3dhcm5pbmcnXCIsXG4gIH0sXG4gIHN0eWxlczogWyc6aG9zdCB7IGRpc3BsYXk6IGJsb2NrIH0nXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQWxlcnRzIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQENvbnRlbnRDaGlsZHJlbihDbHJBbGVydCkgYWxsQWxlcnRzOiBRdWVyeUxpc3Q8Q2xyQWxlcnQ+O1xuXG4gIC8qKlxuICAgKiBJbnB1dC9PdXRwdXQgdG8gc3VwcG9ydCB0d28gd2F5IGJpbmRpbmcgb24gY3VycmVudCBhbGVydCBpbmRleFxuICAgKi9cbiAgQElucHV0KCdjbHJDdXJyZW50QWxlcnRJbmRleCcpXG4gIHB1YmxpYyBzZXQgX2lucHV0Q3VycmVudEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihpbmRleCkgJiYgaW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50ID0gaW5kZXg7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyQ3VycmVudEFsZXJ0SW5kZXhDaGFuZ2UnKSBwdWJsaWMgY3VycmVudEFsZXJ0SW5kZXhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oZmFsc2UpO1xuXG4gIHNldCBjdXJyZW50QWxlcnRJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50ID0gaW5kZXg7XG4gIH1cbiAgZ2V0IGN1cnJlbnRBbGVydEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnQ7XG4gIH1cblxuICAvKipcbiAgICogSW5wdXQvT3V0cHV0IHRvIHN1cHBvcnQgdHdvIHdheSBiaW5kaW5nIG9uIGN1cnJlbnQgYWxlcnQgaW5zdGFuY2VcbiAgICovXG4gIEBJbnB1dCgnY2xyQ3VycmVudEFsZXJ0JylcbiAgc2V0IGN1cnJlbnRBbGVydChhbGVydDogQ2xyQWxlcnQpIHtcbiAgICBpZiAoYWxlcnQpIHtcbiAgICAgIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudEFsZXJ0ID0gYWxlcnQ7XG4gICAgfVxuICB9XG4gIGdldCBjdXJyZW50QWxlcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudEFsZXJ0O1xuICB9XG4gIEBPdXRwdXQoJ2NsckN1cnJlbnRBbGVydENoYW5nZScpIHB1YmxpYyBjdXJyZW50QWxlcnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENsckFsZXJ0PihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIEVuc3VyZSB3ZSBhcmUgb25seSBkZWFsaW5nIHdpdGggYWxlcnRzIHRoYXQgaGF2ZSBub3QgYmVlbiBjbG9zZWQgeWV0XG4gICAqL1xuICBnZXQgYWxlcnRzKCkge1xuICAgIHJldHVybiB0aGlzLmFsbEFsZXJ0cy5maWx0ZXIoYWxlcnQgPT4ge1xuICAgICAgcmV0dXJuIGFsZXJ0LmlzSGlkZGVuID09PSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBjdXJyZW50QWxlcnRUeXBlKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudEFsZXJ0KSB7XG4gICAgICByZXR1cm4gdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50QWxlcnQuYWxlcnRUeXBlO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbXVsdGlBbGVydFNlcnZpY2U6IE11bHRpQWxlcnRTZXJ2aWNlKSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLm1hbmFnZSh0aGlzLmFsbEFsZXJ0cyk7XG4gICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jaGFuZ2VzLnN1YnNjcmliZShpbmRleCA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRBbGVydEluZGV4Q2hhbmdlLm5leHQoaW5kZXgpO1xuICAgICAgdGhpcy5jdXJyZW50QWxlcnRDaGFuZ2UubmV4dCh0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnRBbGVydCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgfVxufVxuIl19