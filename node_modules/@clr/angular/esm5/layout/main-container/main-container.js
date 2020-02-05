import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef } from '@angular/core';
import { ResponsiveNavigationService } from '../nav/providers/responsive-navigation.service';
import { ResponsiveNavCodes } from '../nav/responsive-nav-codes';
var ClrMainContainer = /** @class */ (function () {
    function ClrMainContainer(elRef, responsiveNavService) {
        this.elRef = elRef;
        this.responsiveNavService = responsiveNavService;
    }
    ClrMainContainer.prototype.ngOnInit = function () {
        var _this = this;
        this._classList = this.elRef.nativeElement.classList;
        this._subscription = this.responsiveNavService.navControl.subscribe({
            next: function (message) {
                _this.processMessage(message);
            },
        });
    };
    ClrMainContainer.prototype.processMessage = function (message) {
        var navClass = ResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU;
        if (message.controlCode === ResponsiveNavCodes.NAV_CLOSE_ALL) {
            this._classList.remove(ResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU);
            this._classList.remove(ResponsiveNavCodes.NAV_CLASS_OVERFLOW_MENU);
        }
        else if (message.navLevel === ResponsiveNavCodes.NAV_LEVEL_1) {
            this.controlNav(message.controlCode, navClass);
        }
        else if (message.navLevel === ResponsiveNavCodes.NAV_LEVEL_2) {
            navClass = ResponsiveNavCodes.NAV_CLASS_OVERFLOW_MENU;
            this.controlNav(message.controlCode, navClass);
        }
    };
    ClrMainContainer.prototype.controlNav = function (controlCode, navClass) {
        if (controlCode === ResponsiveNavCodes.NAV_OPEN) {
            this._classList.add(navClass);
        }
        else if (controlCode === ResponsiveNavCodes.NAV_CLOSE) {
            this._classList.remove(navClass);
        }
        else if (controlCode === ResponsiveNavCodes.NAV_TOGGLE) {
            this._classList.toggle(navClass);
        }
    };
    ClrMainContainer.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    ClrMainContainer = tslib_1.__decorate([
        Directive({ selector: 'clr-main-container', host: { '[class.main-container]': 'true' } }),
        tslib_1.__metadata("design:paramtypes", [ElementRef, ResponsiveNavigationService])
    ], ClrMainContainer);
    return ClrMainContainer;
}());
export { ClrMainContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1jb250YWluZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvbWFpbi1jb250YWluZXIvbWFpbi1jb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFHekUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDN0YsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFJakU7SUFJRSwwQkFBb0IsS0FBaUIsRUFBVSxvQkFBaUQ7UUFBNUUsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBNkI7SUFBRyxDQUFDO0lBRXBHLG1DQUFRLEdBQVI7UUFBQSxpQkFPQztRQU5DLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO1FBQ3JELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7WUFDbEUsSUFBSSxFQUFFLFVBQUMsT0FBb0M7Z0JBQ3pDLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0IsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx5Q0FBYyxHQUFkLFVBQWUsT0FBb0M7UUFDakQsSUFBSSxRQUFRLEdBQVcsa0JBQWtCLENBQUMsd0JBQXdCLENBQUM7UUFDbkUsSUFBSSxPQUFPLENBQUMsV0FBVyxLQUFLLGtCQUFrQixDQUFDLGFBQWEsRUFBRTtZQUM1RCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDcEU7YUFBTSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssa0JBQWtCLENBQUMsV0FBVyxFQUFFO1lBQzlELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNoRDthQUFNLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7WUFDOUQsUUFBUSxHQUFHLGtCQUFrQixDQUFDLHVCQUF1QixDQUFDO1lBQ3RELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7SUFFRCxxQ0FBVSxHQUFWLFVBQVcsV0FBbUIsRUFBRSxRQUFnQjtRQUM5QyxJQUFJLFdBQVcsS0FBSyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDL0I7YUFBTSxJQUFJLFdBQVcsS0FBSyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUU7WUFDdkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEM7YUFBTSxJQUFJLFdBQVcsS0FBSyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUU7WUFDeEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBRUQsc0NBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQXhDVSxnQkFBZ0I7UUFENUIsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxFQUFFLHdCQUF3QixFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUM7aURBSzdELFVBQVUsRUFBZ0MsMkJBQTJCO09BSnJGLGdCQUFnQixDQXlDNUI7SUFBRCx1QkFBQztDQUFBLEFBekNELElBeUNDO1NBekNZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBSZXNwb25zaXZlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9uYXYvcHJvdmlkZXJzL3Jlc3BvbnNpdmUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFJlc3BvbnNpdmVOYXZDb2RlcyB9IGZyb20gJy4uL25hdi9yZXNwb25zaXZlLW5hdi1jb2Rlcyc7XG5pbXBvcnQgeyBSZXNwb25zaXZlTmF2Q29udHJvbE1lc3NhZ2UgfSBmcm9tICcuLi9uYXYvcmVzcG9uc2l2ZS1uYXYtY29udHJvbC1tZXNzYWdlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnY2xyLW1haW4tY29udGFpbmVyJywgaG9zdDogeyAnW2NsYXNzLm1haW4tY29udGFpbmVyXSc6ICd0cnVlJyB9IH0pXG5leHBvcnQgY2xhc3MgQ2xyTWFpbkNvbnRhaW5lciBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgX2NsYXNzTGlzdDogRE9NVG9rZW5MaXN0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVzcG9uc2l2ZU5hdlNlcnZpY2U6IFJlc3BvbnNpdmVOYXZpZ2F0aW9uU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9jbGFzc0xpc3QgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0O1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMucmVzcG9uc2l2ZU5hdlNlcnZpY2UubmF2Q29udHJvbC5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogKG1lc3NhZ2U6IFJlc3BvbnNpdmVOYXZDb250cm9sTWVzc2FnZSkgPT4ge1xuICAgICAgICB0aGlzLnByb2Nlc3NNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByb2Nlc3NNZXNzYWdlKG1lc3NhZ2U6IFJlc3BvbnNpdmVOYXZDb250cm9sTWVzc2FnZSk6IHZvaWQge1xuICAgIGxldCBuYXZDbGFzczogc3RyaW5nID0gUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9DTEFTU19IQU1CVVJHRVJfTUVOVTtcbiAgICBpZiAobWVzc2FnZS5jb250cm9sQ29kZSA9PT0gUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9DTE9TRV9BTEwpIHtcbiAgICAgIHRoaXMuX2NsYXNzTGlzdC5yZW1vdmUoUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9DTEFTU19IQU1CVVJHRVJfTUVOVSk7XG4gICAgICB0aGlzLl9jbGFzc0xpc3QucmVtb3ZlKFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfQ0xBU1NfT1ZFUkZMT1dfTUVOVSk7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlLm5hdkxldmVsID09PSBSZXNwb25zaXZlTmF2Q29kZXMuTkFWX0xFVkVMXzEpIHtcbiAgICAgIHRoaXMuY29udHJvbE5hdihtZXNzYWdlLmNvbnRyb2xDb2RlLCBuYXZDbGFzcyk7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlLm5hdkxldmVsID09PSBSZXNwb25zaXZlTmF2Q29kZXMuTkFWX0xFVkVMXzIpIHtcbiAgICAgIG5hdkNsYXNzID0gUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9DTEFTU19PVkVSRkxPV19NRU5VO1xuICAgICAgdGhpcy5jb250cm9sTmF2KG1lc3NhZ2UuY29udHJvbENvZGUsIG5hdkNsYXNzKTtcbiAgICB9XG4gIH1cblxuICBjb250cm9sTmF2KGNvbnRyb2xDb2RlOiBzdHJpbmcsIG5hdkNsYXNzOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoY29udHJvbENvZGUgPT09IFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfT1BFTikge1xuICAgICAgdGhpcy5fY2xhc3NMaXN0LmFkZChuYXZDbGFzcyk7XG4gICAgfSBlbHNlIGlmIChjb250cm9sQ29kZSA9PT0gUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9DTE9TRSkge1xuICAgICAgdGhpcy5fY2xhc3NMaXN0LnJlbW92ZShuYXZDbGFzcyk7XG4gICAgfSBlbHNlIGlmIChjb250cm9sQ29kZSA9PT0gUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9UT0dHTEUpIHtcbiAgICAgIHRoaXMuX2NsYXNzTGlzdC50b2dnbGUobmF2Q2xhc3MpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=