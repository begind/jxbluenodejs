import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ResponsiveNavigationService } from './providers/responsive-navigation.service';
import { ResponsiveNavCodes } from './responsive-nav-codes';
var ClrNavLevel = /** @class */ (function () {
    function ClrNavLevel(responsiveNavService, elementRef) {
        this.responsiveNavService = responsiveNavService;
        this.elementRef = elementRef;
    }
    ClrNavLevel.prototype.ngOnInit = function () {
        if (this.level !== ResponsiveNavCodes.NAV_LEVEL_1 && this.level !== ResponsiveNavCodes.NAV_LEVEL_2) {
            console.error('Nav Level can only be 1 or 2');
            return;
        }
        this.responsiveNavService.registerNav(this.level);
        this.addNavClass(this.level);
    };
    ClrNavLevel.prototype.addNavClass = function (level) {
        var navHostClassList = this.elementRef.nativeElement.classList;
        if (level === ResponsiveNavCodes.NAV_LEVEL_1) {
            navHostClassList.add(ResponsiveNavCodes.NAV_CLASS_LEVEL_1);
        }
        else if (level === ResponsiveNavCodes.NAV_LEVEL_2) {
            navHostClassList.add(ResponsiveNavCodes.NAV_CLASS_LEVEL_2);
        }
    };
    Object.defineProperty(ClrNavLevel.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrNavLevel.prototype, "responsiveNavCodes", {
        // getter to access the responsive navigation codes from the template
        get: function () {
            return ResponsiveNavCodes;
        },
        enumerable: true,
        configurable: true
    });
    ClrNavLevel.prototype.open = function () {
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_OPEN, this.level);
    };
    ClrNavLevel.prototype.close = function () {
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_CLOSE, this.level);
    };
    // TODO: Figure out whats the best way to do this. Possible methods
    // 1. HostListener (current solution)
    // 2. Directives on the .nav-link class. We discussed on moving away from class selectors but I forget the reason
    // why
    ClrNavLevel.prototype.onMouseClick = function (target) {
        var current = target; // Get the element in the DOM on which the mouse was clicked
        var navHost = this.elementRef.nativeElement; // Get the current nav native HTML element
        // Start checking if current and navHost are equal.
        // If not traverse to the parentNode and check again.
        while (current) {
            if (current === navHost) {
                return;
            }
            else if (current.classList.contains('nav-link')) {
                this.close();
                return;
            }
            current = current.parentNode;
        }
    };
    ClrNavLevel.prototype.ngOnDestroy = function () {
        this.responsiveNavService.unregisterNav(this.level);
    };
    tslib_1.__decorate([
        Input('clr-nav-level'),
        tslib_1.__metadata("design:type", Number)
    ], ClrNavLevel.prototype, "_level", void 0);
    tslib_1.__decorate([
        HostListener('click', ['$event.target']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ClrNavLevel.prototype, "onMouseClick", null);
    ClrNavLevel = tslib_1.__decorate([
        Directive({ selector: '[clr-nav-level]' }),
        tslib_1.__metadata("design:paramtypes", [ResponsiveNavigationService, ElementRef])
    ], ClrNavLevel);
    return ClrNavLevel;
}());
export { ClrNavLevel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LWxldmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L25hdi9uYXYtbGV2ZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRW5GLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRzVEO0lBR0UscUJBQW9CLG9CQUFpRCxFQUFVLFVBQXNCO1FBQWpGLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBNkI7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUcsQ0FBQztJQUV6Ryw4QkFBUSxHQUFSO1FBQ0UsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLGtCQUFrQixDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLGtCQUFrQixDQUFDLFdBQVcsRUFBRTtZQUNsRyxPQUFPLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDOUMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELGlDQUFXLEdBQVgsVUFBWSxLQUFhO1FBQ3ZCLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO1FBQ2pFLElBQUksS0FBSyxLQUFLLGtCQUFrQixDQUFDLFdBQVcsRUFBRTtZQUM1QyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUM1RDthQUFNLElBQUksS0FBSyxLQUFLLGtCQUFrQixDQUFDLFdBQVcsRUFBRTtZQUNuRCxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUM1RDtJQUNILENBQUM7SUFFRCxzQkFBSSw4QkFBSzthQUFUO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksMkNBQWtCO1FBRHRCLHFFQUFxRTthQUNyRTtZQUNFLE9BQU8sa0JBQWtCLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFFRCwwQkFBSSxHQUFKO1FBQ0UsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUVELDJCQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBRUQsbUVBQW1FO0lBQ25FLHFDQUFxQztJQUNyQyxpSEFBaUg7SUFDakgsTUFBTTtJQUVOLGtDQUFZLEdBQVosVUFBYSxNQUFXO1FBQ3RCLElBQUksT0FBTyxHQUFRLE1BQU0sQ0FBQyxDQUFDLDREQUE0RDtRQUN2RixJQUFNLE9BQU8sR0FBUSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLDBDQUEwQztRQUU5RixtREFBbUQ7UUFDbkQscURBQXFEO1FBQ3JELE9BQU8sT0FBTyxFQUFFO1lBQ2QsSUFBSSxPQUFPLEtBQUssT0FBTyxFQUFFO2dCQUN2QixPQUFPO2FBQ1I7aUJBQU0sSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDakQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNiLE9BQU87YUFDUjtZQUNELE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVELGlDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBL0R1QjtRQUF2QixLQUFLLENBQUMsZUFBZSxDQUFDOzsrQ0FBZ0I7SUE0Q3ZDO1FBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDOzs7O21EQWdCeEM7SUE1RFUsV0FBVztRQUR2QixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztpREFJQywyQkFBMkIsRUFBc0IsVUFBVTtPQUgxRixXQUFXLENBaUV2QjtJQUFELGtCQUFDO0NBQUEsQUFqRUQsSUFpRUM7U0FqRVksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFJlc3BvbnNpdmVOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3Jlc3BvbnNpdmUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFJlc3BvbnNpdmVOYXZDb2RlcyB9IGZyb20gJy4vcmVzcG9uc2l2ZS1uYXYtY29kZXMnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2xyLW5hdi1sZXZlbF0nIH0pXG5leHBvcnQgY2xhc3MgQ2xyTmF2TGV2ZWwgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoJ2Nsci1uYXYtbGV2ZWwnKSBfbGV2ZWw6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlc3BvbnNpdmVOYXZTZXJ2aWNlOiBSZXNwb25zaXZlTmF2aWdhdGlvblNlcnZpY2UsIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5sZXZlbCAhPT0gUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9MRVZFTF8xICYmIHRoaXMubGV2ZWwgIT09IFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMikge1xuICAgICAgY29uc29sZS5lcnJvcignTmF2IExldmVsIGNhbiBvbmx5IGJlIDEgb3IgMicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlc3BvbnNpdmVOYXZTZXJ2aWNlLnJlZ2lzdGVyTmF2KHRoaXMubGV2ZWwpO1xuICAgIHRoaXMuYWRkTmF2Q2xhc3ModGhpcy5sZXZlbCk7XG4gIH1cblxuICBhZGROYXZDbGFzcyhsZXZlbDogbnVtYmVyKSB7XG4gICAgY29uc3QgbmF2SG9zdENsYXNzTGlzdCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdDtcbiAgICBpZiAobGV2ZWwgPT09IFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMSkge1xuICAgICAgbmF2SG9zdENsYXNzTGlzdC5hZGQoUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9DTEFTU19MRVZFTF8xKTtcbiAgICB9IGVsc2UgaWYgKGxldmVsID09PSBSZXNwb25zaXZlTmF2Q29kZXMuTkFWX0xFVkVMXzIpIHtcbiAgICAgIG5hdkhvc3RDbGFzc0xpc3QuYWRkKFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfQ0xBU1NfTEVWRUxfMik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGxldmVsKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2xldmVsO1xuICB9XG5cbiAgLy8gZ2V0dGVyIHRvIGFjY2VzcyB0aGUgcmVzcG9uc2l2ZSBuYXZpZ2F0aW9uIGNvZGVzIGZyb20gdGhlIHRlbXBsYXRlXG4gIGdldCByZXNwb25zaXZlTmF2Q29kZXMoKTogUmVzcG9uc2l2ZU5hdkNvZGVzIHtcbiAgICByZXR1cm4gUmVzcG9uc2l2ZU5hdkNvZGVzO1xuICB9XG5cbiAgb3BlbigpOiB2b2lkIHtcbiAgICB0aGlzLnJlc3BvbnNpdmVOYXZTZXJ2aWNlLnNlbmRDb250cm9sTWVzc2FnZShSZXNwb25zaXZlTmF2Q29kZXMuTkFWX09QRU4sIHRoaXMubGV2ZWwpO1xuICB9XG5cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5yZXNwb25zaXZlTmF2U2VydmljZS5zZW5kQ29udHJvbE1lc3NhZ2UoUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9DTE9TRSwgdGhpcy5sZXZlbCk7XG4gIH1cblxuICAvLyBUT0RPOiBGaWd1cmUgb3V0IHdoYXRzIHRoZSBiZXN0IHdheSB0byBkbyB0aGlzLiBQb3NzaWJsZSBtZXRob2RzXG4gIC8vIDEuIEhvc3RMaXN0ZW5lciAoY3VycmVudCBzb2x1dGlvbilcbiAgLy8gMi4gRGlyZWN0aXZlcyBvbiB0aGUgLm5hdi1saW5rIGNsYXNzLiBXZSBkaXNjdXNzZWQgb24gbW92aW5nIGF3YXkgZnJvbSBjbGFzcyBzZWxlY3RvcnMgYnV0IEkgZm9yZ2V0IHRoZSByZWFzb25cbiAgLy8gd2h5XG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQudGFyZ2V0J10pXG4gIG9uTW91c2VDbGljayh0YXJnZXQ6IGFueSkge1xuICAgIGxldCBjdXJyZW50OiBhbnkgPSB0YXJnZXQ7IC8vIEdldCB0aGUgZWxlbWVudCBpbiB0aGUgRE9NIG9uIHdoaWNoIHRoZSBtb3VzZSB3YXMgY2xpY2tlZFxuICAgIGNvbnN0IG5hdkhvc3Q6IGFueSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50OyAvLyBHZXQgdGhlIGN1cnJlbnQgbmF2IG5hdGl2ZSBIVE1MIGVsZW1lbnRcblxuICAgIC8vIFN0YXJ0IGNoZWNraW5nIGlmIGN1cnJlbnQgYW5kIG5hdkhvc3QgYXJlIGVxdWFsLlxuICAgIC8vIElmIG5vdCB0cmF2ZXJzZSB0byB0aGUgcGFyZW50Tm9kZSBhbmQgY2hlY2sgYWdhaW4uXG4gICAgd2hpbGUgKGN1cnJlbnQpIHtcbiAgICAgIGlmIChjdXJyZW50ID09PSBuYXZIb3N0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ25hdi1saW5rJykpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVzcG9uc2l2ZU5hdlNlcnZpY2UudW5yZWdpc3Rlck5hdih0aGlzLmxldmVsKTtcbiAgfVxufVxuIl19