/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
import * as tslib_1 from "tslib";
import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { ClrPopoverToggleService } from './providers/popover-toggle.service';
var ClrPopoverOpenCloseButton = /** @class */ (function () {
    function ClrPopoverOpenCloseButton(smartOpenService) {
        var _this = this;
        this.smartOpenService = smartOpenService;
        this.subscriptions = [];
        this.openCloseChange = new EventEmitter();
        this.subscriptions.push(this.smartOpenService.openChange.subscribe(function (change) {
            _this.openCloseChange.next(change);
        }));
    }
    ClrPopoverOpenCloseButton.prototype.handleClick = function (event) {
        this.smartOpenService.toggleWithEvent(event);
    };
    ClrPopoverOpenCloseButton.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    tslib_1.__decorate([
        Output('clrPopoverOpenCloseChange'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrPopoverOpenCloseButton.prototype, "openCloseChange", void 0);
    tslib_1.__decorate([
        HostListener('click', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [MouseEvent]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ClrPopoverOpenCloseButton.prototype, "handleClick", null);
    ClrPopoverOpenCloseButton = tslib_1.__decorate([
        Directive({
            selector: '[clrPopoverOpenCloseButton]',
            host: {
                '[class.clr-smart-open-close]': 'true',
            },
        }),
        tslib_1.__metadata("design:paramtypes", [ClrPopoverToggleService])
    ], ClrPopoverOpenCloseButton);
    return ClrPopoverOpenCloseButton;
}());
export { ClrPopoverOpenCloseButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1vcGVuLWNsb3NlLWJ1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL3BvcG92ZXIvcG9wb3Zlci1vcGVuLWNsb3NlLWJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBUzdFO0lBR0UsbUNBQW9CLGdCQUF5QztRQUE3RCxpQkFNQztRQU5tQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXlCO1FBRnJELGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQVVOLG9CQUFlLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFQeEcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUMvQyxLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUtELCtDQUFXLEdBQVgsVUFBWSxLQUFpQjtRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCwrQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBVG9DO1FBQXBDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQzswQ0FBa0IsWUFBWTtzRUFBd0M7SUFHMUc7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O2lEQUNmLFVBQVU7O2dFQUU1QjtJQWhCVSx5QkFBeUI7UUFOckMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDZCQUE2QjtZQUN2QyxJQUFJLEVBQUU7Z0JBQ0osOEJBQThCLEVBQUUsTUFBTTthQUN2QztTQUNGLENBQUM7aURBSXNDLHVCQUF1QjtPQUhsRCx5QkFBeUIsQ0FxQnJDO0lBQUQsZ0NBQUM7Q0FBQSxBQXJCRCxJQXFCQztTQXJCWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICpcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xyUG9wb3ZlclRvZ2dsZVNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9wb3BvdmVyLXRvZ2dsZS5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2xyUG9wb3Zlck9wZW5DbG9zZUJ1dHRvbl0nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5jbHItc21hcnQtb3Blbi1jbG9zZV0nOiAndHJ1ZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsclBvcG92ZXJPcGVuQ2xvc2VCdXR0b24gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzbWFydE9wZW5TZXJ2aWNlOiBDbHJQb3BvdmVyVG9nZ2xlU2VydmljZSkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5zbWFydE9wZW5TZXJ2aWNlLm9wZW5DaGFuZ2Uuc3Vic2NyaWJlKGNoYW5nZSA9PiB7XG4gICAgICAgIHRoaXMub3BlbkNsb3NlQ2hhbmdlLm5leHQoY2hhbmdlKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIEBPdXRwdXQoJ2NsclBvcG92ZXJPcGVuQ2xvc2VDaGFuZ2UnKSBvcGVuQ2xvc2VDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIGhhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5zbWFydE9wZW5TZXJ2aWNlLnRvZ2dsZVdpdGhFdmVudChldmVudCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=