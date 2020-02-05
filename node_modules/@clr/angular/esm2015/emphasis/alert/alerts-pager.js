import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrAlert } from './alert';
import { MultiAlertService } from './providers/multi-alert.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
let ClrAlertsPager = class ClrAlertsPager {
    constructor(multiAlertService, commonStrings) {
        this.multiAlertService = multiAlertService;
        this.commonStrings = commonStrings;
        this.currentAlertChange = new EventEmitter(false);
        this.currentAlertIndexChange = new EventEmitter();
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
     * Input/Output to support two way binding on current alert index
     */
    set currentAlertIndex(index) {
        this.multiAlertService.current = index;
    }
    get currentAlertIndex() {
        return this.multiAlertService.current;
    }
    ngOnInit() {
        this.multiAlertServiceChanges = this.multiAlertService.changes.subscribe(index => {
            this.currentAlertIndexChange.emit(index);
            this.currentAlertChange.emit(this.multiAlertService.activeAlerts[index]);
        });
    }
    pageUp() {
        this.multiAlertService.next();
    }
    pageDown() {
        this.multiAlertService.previous();
    }
    ngOnDestroy() {
        this.multiAlertServiceChanges.unsubscribe();
    }
};
tslib_1.__decorate([
    Input('clrCurrentAlert'),
    tslib_1.__metadata("design:type", ClrAlert),
    tslib_1.__metadata("design:paramtypes", [ClrAlert])
], ClrAlertsPager.prototype, "currentAlert", null);
tslib_1.__decorate([
    Output('clrCurrentAlertChange'),
    tslib_1.__metadata("design:type", Object)
], ClrAlertsPager.prototype, "currentAlertChange", void 0);
tslib_1.__decorate([
    Input('clrCurrentAlertIndex'),
    tslib_1.__metadata("design:type", Number),
    tslib_1.__metadata("design:paramtypes", [Number])
], ClrAlertsPager.prototype, "currentAlertIndex", null);
tslib_1.__decorate([
    Output('clrCurrentAlertIndexChange'),
    tslib_1.__metadata("design:type", Object)
], ClrAlertsPager.prototype, "currentAlertIndexChange", void 0);
ClrAlertsPager = tslib_1.__decorate([
    Component({
        selector: 'clr-alerts-pager',
        template: "<!--\n  ~ Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div class=\"alerts-pager-control\">\n    <div class=\"alerts-page-down\">\n        <button class=\"alerts-pager-button\" (click)=\"pageDown()\">\n            <clr-icon shape=\"caret left\" [attr.title]=\"commonStrings.keys.previous\"></clr-icon>\n        </button>\n    </div>\n    <div class=\"alerts-pager-text\">\n        {{this.multiAlertService.current+1}} / {{this.multiAlertService.count}}\n    </div>\n    <div class=\"alerts-page-up\">\n        <button class=\"alerts-pager-button\" (click)=\"pageUp()\">\n            <clr-icon shape=\"caret right\" [attr.title]=\"commonStrings.keys.next\"></clr-icon>\n        </button>\n    </div>\n</div>\n",
        host: { '[class.alerts-pager]': 'true' }
    }),
    tslib_1.__metadata("design:paramtypes", [MultiAlertService, ClrCommonStringsService])
], ClrAlertsPager);
export { ClrAlertsPager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnRzLXBhZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZW1waGFzaXMvYWxlcnQvYWxlcnRzLXBhZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHMUYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQU9sRixJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBK0J6QixZQUFtQixpQkFBb0MsRUFBUyxhQUFzQztRQUFuRixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQXlCO1FBZnJFLHVCQUFrQixHQUFHLElBQUksWUFBWSxDQUFXLEtBQUssQ0FBQyxDQUFDO1FBYWxELDRCQUF1QixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFFYyxDQUFDO0lBNUIxRzs7T0FFRztJQUVILElBQUksWUFBWSxDQUFDLEtBQWU7UUFDOUIsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUM3QztJQUNILENBQUM7SUFDRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUM7SUFDN0MsQ0FBQztJQUlEOztPQUVHO0lBRUgsSUFBSSxpQkFBaUIsQ0FBQyxLQUFhO1FBQ2pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pDLENBQUM7SUFDRCxJQUFJLGlCQUFpQjtRQUNuQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7SUFDeEMsQ0FBQztJQU1ELFFBQVE7UUFDTixJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDL0UsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzlDLENBQUM7Q0FDRixDQUFBO0FBNUNDO0lBREMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO3NDQUNELFFBQVE7NkNBQVIsUUFBUTtrREFJL0I7QUFLZ0M7SUFBaEMsTUFBTSxDQUFDLHVCQUF1QixDQUFDOzswREFBd0Q7QUFNeEY7SUFEQyxLQUFLLENBQUMsc0JBQXNCLENBQUM7Ozt1REFHN0I7QUFLcUM7SUFBckMsTUFBTSxDQUFDLDRCQUE0QixDQUFDOzsrREFBc0Q7QUE3QmhGLGNBQWM7SUFMMUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QiwwM0JBQWtDO1FBQ2xDLElBQUksRUFBRSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sRUFBRTtLQUN6QyxDQUFDOzZDQWdDc0MsaUJBQWlCLEVBQXdCLHVCQUF1QjtHQS9CM0YsY0FBYyxDQW1EMUI7U0FuRFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENsckFsZXJ0IH0gZnJvbSAnLi9hbGVydCc7XG5pbXBvcnQgeyBNdWx0aUFsZXJ0U2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL211bHRpLWFsZXJ0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItYWxlcnRzLXBhZ2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FsZXJ0cy1wYWdlci5odG1sJyxcbiAgaG9zdDogeyAnW2NsYXNzLmFsZXJ0cy1wYWdlcl0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQWxlcnRzUGFnZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgbXVsdGlBbGVydFNlcnZpY2VDaGFuZ2VzOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIElucHV0L091dHB1dCB0byBzdXBwb3J0IHR3byB3YXkgYmluZGluZyBvbiBjdXJyZW50IGFsZXJ0IGluc3RhbmNlXG4gICAqL1xuICBASW5wdXQoJ2NsckN1cnJlbnRBbGVydCcpXG4gIHNldCBjdXJyZW50QWxlcnQoYWxlcnQ6IENsckFsZXJ0KSB7XG4gICAgaWYgKGFsZXJ0KSB7XG4gICAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnRBbGVydCA9IGFsZXJ0O1xuICAgIH1cbiAgfVxuICBnZXQgY3VycmVudEFsZXJ0KCkge1xuICAgIHJldHVybiB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnRBbGVydDtcbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckN1cnJlbnRBbGVydENoYW5nZScpIGN1cnJlbnRBbGVydENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xyQWxlcnQ+KGZhbHNlKTtcblxuICAvKipcbiAgICogSW5wdXQvT3V0cHV0IHRvIHN1cHBvcnQgdHdvIHdheSBiaW5kaW5nIG9uIGN1cnJlbnQgYWxlcnQgaW5kZXhcbiAgICovXG4gIEBJbnB1dCgnY2xyQ3VycmVudEFsZXJ0SW5kZXgnKVxuICBzZXQgY3VycmVudEFsZXJ0SW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudCA9IGluZGV4O1xuICB9XG4gIGdldCBjdXJyZW50QWxlcnRJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50O1xuICB9XG5cbiAgQE91dHB1dCgnY2xyQ3VycmVudEFsZXJ0SW5kZXhDaGFuZ2UnKSBjdXJyZW50QWxlcnRJbmRleENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtdWx0aUFsZXJ0U2VydmljZTogTXVsdGlBbGVydFNlcnZpY2UsIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlQ2hhbmdlcyA9IHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY2hhbmdlcy5zdWJzY3JpYmUoaW5kZXggPT4ge1xuICAgICAgdGhpcy5jdXJyZW50QWxlcnRJbmRleENoYW5nZS5lbWl0KGluZGV4KTtcbiAgICAgIHRoaXMuY3VycmVudEFsZXJ0Q2hhbmdlLmVtaXQodGhpcy5tdWx0aUFsZXJ0U2VydmljZS5hY3RpdmVBbGVydHNbaW5kZXhdKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBhZ2VVcCgpIHtcbiAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLm5leHQoKTtcbiAgfVxuXG4gIHBhZ2VEb3duKCkge1xuICAgIHRoaXMubXVsdGlBbGVydFNlcnZpY2UucHJldmlvdXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMubXVsdGlBbGVydFNlcnZpY2VDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==