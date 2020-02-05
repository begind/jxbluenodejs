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
var ClrAlertsPager = /** @class */ (function () {
    function ClrAlertsPager(multiAlertService, commonStrings) {
        this.multiAlertService = multiAlertService;
        this.commonStrings = commonStrings;
        this.currentAlertChange = new EventEmitter(false);
        this.currentAlertIndexChange = new EventEmitter();
    }
    Object.defineProperty(ClrAlertsPager.prototype, "currentAlert", {
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
    Object.defineProperty(ClrAlertsPager.prototype, "currentAlertIndex", {
        get: function () {
            return this.multiAlertService.current;
        },
        /**
         * Input/Output to support two way binding on current alert index
         */
        set: function (index) {
            this.multiAlertService.current = index;
        },
        enumerable: true,
        configurable: true
    });
    ClrAlertsPager.prototype.ngOnInit = function () {
        var _this = this;
        this.multiAlertServiceChanges = this.multiAlertService.changes.subscribe(function (index) {
            _this.currentAlertIndexChange.emit(index);
            _this.currentAlertChange.emit(_this.multiAlertService.activeAlerts[index]);
        });
    };
    ClrAlertsPager.prototype.pageUp = function () {
        this.multiAlertService.next();
    };
    ClrAlertsPager.prototype.pageDown = function () {
        this.multiAlertService.previous();
    };
    ClrAlertsPager.prototype.ngOnDestroy = function () {
        this.multiAlertServiceChanges.unsubscribe();
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
    return ClrAlertsPager;
}());
export { ClrAlertsPager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnRzLXBhZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZW1waGFzaXMvYWxlcnQvYWxlcnRzLXBhZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHMUYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQU9sRjtJQStCRSx3QkFBbUIsaUJBQW9DLEVBQVMsYUFBc0M7UUFBbkYsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUF5QjtRQWZyRSx1QkFBa0IsR0FBRyxJQUFJLFlBQVksQ0FBVyxLQUFLLENBQUMsQ0FBQztRQWFsRCw0QkFBdUIsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBRWMsQ0FBQztJQXhCMUcsc0JBQUksd0NBQVk7YUFLaEI7WUFDRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUM7UUFDN0MsQ0FBQztRQVhEOztXQUVHO2FBRUgsVUFBaUIsS0FBZTtZQUM5QixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQzthQUM3QztRQUNILENBQUM7OztPQUFBO0lBV0Qsc0JBQUksNkNBQWlCO2FBR3JCO1lBQ0UsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1FBQ3hDLENBQUM7UUFURDs7V0FFRzthQUVILFVBQXNCLEtBQWE7WUFDakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFTRCxpQ0FBUSxHQUFSO1FBQUEsaUJBS0M7UUFKQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQzVFLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsS0FBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBM0NEO1FBREMsS0FBSyxDQUFDLGlCQUFpQixDQUFDOzBDQUNELFFBQVE7aURBQVIsUUFBUTtzREFJL0I7SUFLZ0M7UUFBaEMsTUFBTSxDQUFDLHVCQUF1QixDQUFDOzs4REFBd0Q7SUFNeEY7UUFEQyxLQUFLLENBQUMsc0JBQXNCLENBQUM7OzsyREFHN0I7SUFLcUM7UUFBckMsTUFBTSxDQUFDLDRCQUE0QixDQUFDOzttRUFBc0Q7SUE3QmhGLGNBQWM7UUFMMUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QiwwM0JBQWtDO1lBQ2xDLElBQUksRUFBRSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sRUFBRTtTQUN6QyxDQUFDO2lEQWdDc0MsaUJBQWlCLEVBQXdCLHVCQUF1QjtPQS9CM0YsY0FBYyxDQW1EMUI7SUFBRCxxQkFBQztDQUFBLEFBbkRELElBbURDO1NBbkRZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDbHJBbGVydCB9IGZyb20gJy4vYWxlcnQnO1xuaW1wb3J0IHsgTXVsdGlBbGVydFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9tdWx0aS1hbGVydC5zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWFsZXJ0cy1wYWdlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9hbGVydHMtcGFnZXIuaHRtbCcsXG4gIGhvc3Q6IHsgJ1tjbGFzcy5hbGVydHMtcGFnZXJdJzogJ3RydWUnIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckFsZXJ0c1BhZ2VyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIG11bHRpQWxlcnRTZXJ2aWNlQ2hhbmdlczogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBJbnB1dC9PdXRwdXQgdG8gc3VwcG9ydCB0d28gd2F5IGJpbmRpbmcgb24gY3VycmVudCBhbGVydCBpbnN0YW5jZVxuICAgKi9cbiAgQElucHV0KCdjbHJDdXJyZW50QWxlcnQnKVxuICBzZXQgY3VycmVudEFsZXJ0KGFsZXJ0OiBDbHJBbGVydCkge1xuICAgIGlmIChhbGVydCkge1xuICAgICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50QWxlcnQgPSBhbGVydDtcbiAgICB9XG4gIH1cbiAgZ2V0IGN1cnJlbnRBbGVydCgpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50QWxlcnQ7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJDdXJyZW50QWxlcnRDaGFuZ2UnKSBjdXJyZW50QWxlcnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENsckFsZXJ0PihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIElucHV0L091dHB1dCB0byBzdXBwb3J0IHR3byB3YXkgYmluZGluZyBvbiBjdXJyZW50IGFsZXJ0IGluZGV4XG4gICAqL1xuICBASW5wdXQoJ2NsckN1cnJlbnRBbGVydEluZGV4JylcbiAgc2V0IGN1cnJlbnRBbGVydEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnQgPSBpbmRleDtcbiAgfVxuICBnZXQgY3VycmVudEFsZXJ0SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudDtcbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckN1cnJlbnRBbGVydEluZGV4Q2hhbmdlJykgY3VycmVudEFsZXJ0SW5kZXhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbXVsdGlBbGVydFNlcnZpY2U6IE11bHRpQWxlcnRTZXJ2aWNlLCBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZUNoYW5nZXMgPSB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmNoYW5nZXMuc3Vic2NyaWJlKGluZGV4ID0+IHtcbiAgICAgIHRoaXMuY3VycmVudEFsZXJ0SW5kZXhDaGFuZ2UuZW1pdChpbmRleCk7XG4gICAgICB0aGlzLmN1cnJlbnRBbGVydENoYW5nZS5lbWl0KHRoaXMubXVsdGlBbGVydFNlcnZpY2UuYWN0aXZlQWxlcnRzW2luZGV4XSk7XG4gICAgfSk7XG4gIH1cblxuICBwYWdlVXAoKSB7XG4gICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5uZXh0KCk7XG4gIH1cblxuICBwYWdlRG93bigpIHtcbiAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLnByZXZpb3VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=