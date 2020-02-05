import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ResponsiveNavigationService } from './providers/responsive-navigation.service';
import { ResponsiveNavCodes } from './responsive-nav-codes';
let ClrNavLevel = class ClrNavLevel {
    constructor(responsiveNavService, elementRef) {
        this.responsiveNavService = responsiveNavService;
        this.elementRef = elementRef;
    }
    ngOnInit() {
        if (this.level !== ResponsiveNavCodes.NAV_LEVEL_1 && this.level !== ResponsiveNavCodes.NAV_LEVEL_2) {
            console.error('Nav Level can only be 1 or 2');
            return;
        }
        this.responsiveNavService.registerNav(this.level);
        this.addNavClass(this.level);
    }
    addNavClass(level) {
        const navHostClassList = this.elementRef.nativeElement.classList;
        if (level === ResponsiveNavCodes.NAV_LEVEL_1) {
            navHostClassList.add(ResponsiveNavCodes.NAV_CLASS_LEVEL_1);
        }
        else if (level === ResponsiveNavCodes.NAV_LEVEL_2) {
            navHostClassList.add(ResponsiveNavCodes.NAV_CLASS_LEVEL_2);
        }
    }
    get level() {
        return this._level;
    }
    // getter to access the responsive navigation codes from the template
    get responsiveNavCodes() {
        return ResponsiveNavCodes;
    }
    open() {
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_OPEN, this.level);
    }
    close() {
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_CLOSE, this.level);
    }
    // TODO: Figure out whats the best way to do this. Possible methods
    // 1. HostListener (current solution)
    // 2. Directives on the .nav-link class. We discussed on moving away from class selectors but I forget the reason
    // why
    onMouseClick(target) {
        let current = target; // Get the element in the DOM on which the mouse was clicked
        const navHost = this.elementRef.nativeElement; // Get the current nav native HTML element
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
    }
    ngOnDestroy() {
        this.responsiveNavService.unregisterNav(this.level);
    }
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
export { ClrNavLevel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LWxldmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L25hdi9uYXYtbGV2ZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRW5GLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRzVELElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFHdEIsWUFBb0Isb0JBQWlELEVBQVUsVUFBc0I7UUFBakYseUJBQW9CLEdBQXBCLG9CQUFvQixDQUE2QjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDO0lBRXpHLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssa0JBQWtCLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssa0JBQWtCLENBQUMsV0FBVyxFQUFFO1lBQ2xHLE9BQU8sQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztZQUM5QyxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQWE7UUFDdkIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFDakUsSUFBSSxLQUFLLEtBQUssa0JBQWtCLENBQUMsV0FBVyxFQUFFO1lBQzVDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQzVEO2FBQU0sSUFBSSxLQUFLLEtBQUssa0JBQWtCLENBQUMsV0FBVyxFQUFFO1lBQ25ELGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQzVEO0lBQ0gsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQscUVBQXFFO0lBQ3JFLElBQUksa0JBQWtCO1FBQ3BCLE9BQU8sa0JBQWtCLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFFRCxtRUFBbUU7SUFDbkUscUNBQXFDO0lBQ3JDLGlIQUFpSDtJQUNqSCxNQUFNO0lBRU4sWUFBWSxDQUFDLE1BQVc7UUFDdEIsSUFBSSxPQUFPLEdBQVEsTUFBTSxDQUFDLENBQUMsNERBQTREO1FBQ3ZGLE1BQU0sT0FBTyxHQUFRLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsMENBQTBDO1FBRTlGLG1EQUFtRDtRQUNuRCxxREFBcUQ7UUFDckQsT0FBTyxPQUFPLEVBQUU7WUFDZCxJQUFJLE9BQU8sS0FBSyxPQUFPLEVBQUU7Z0JBQ3ZCLE9BQU87YUFDUjtpQkFBTSxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNqRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2IsT0FBTzthQUNSO1lBQ0QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FDRixDQUFBO0FBaEV5QjtJQUF2QixLQUFLLENBQUMsZUFBZSxDQUFDOzsyQ0FBZ0I7QUE0Q3ZDO0lBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDOzs7OytDQWdCeEM7QUE1RFUsV0FBVztJQUR2QixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQzs2Q0FJQywyQkFBMkIsRUFBc0IsVUFBVTtHQUgxRixXQUFXLENBaUV2QjtTQWpFWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUmVzcG9uc2l2ZU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvcmVzcG9uc2l2ZS1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVzcG9uc2l2ZU5hdkNvZGVzIH0gZnJvbSAnLi9yZXNwb25zaXZlLW5hdi1jb2Rlcyc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHItbmF2LWxldmVsXScgfSlcbmV4cG9ydCBjbGFzcyBDbHJOYXZMZXZlbCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgnY2xyLW5hdi1sZXZlbCcpIF9sZXZlbDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVzcG9uc2l2ZU5hdlNlcnZpY2U6IFJlc3BvbnNpdmVOYXZpZ2F0aW9uU2VydmljZSwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmxldmVsICE9PSBSZXNwb25zaXZlTmF2Q29kZXMuTkFWX0xFVkVMXzEgJiYgdGhpcy5sZXZlbCAhPT0gUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9MRVZFTF8yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdOYXYgTGV2ZWwgY2FuIG9ubHkgYmUgMSBvciAyJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVzcG9uc2l2ZU5hdlNlcnZpY2UucmVnaXN0ZXJOYXYodGhpcy5sZXZlbCk7XG4gICAgdGhpcy5hZGROYXZDbGFzcyh0aGlzLmxldmVsKTtcbiAgfVxuXG4gIGFkZE5hdkNsYXNzKGxldmVsOiBudW1iZXIpIHtcbiAgICBjb25zdCBuYXZIb3N0Q2xhc3NMaXN0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0O1xuICAgIGlmIChsZXZlbCA9PT0gUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9MRVZFTF8xKSB7XG4gICAgICBuYXZIb3N0Q2xhc3NMaXN0LmFkZChSZXNwb25zaXZlTmF2Q29kZXMuTkFWX0NMQVNTX0xFVkVMXzEpO1xuICAgIH0gZWxzZSBpZiAobGV2ZWwgPT09IFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMikge1xuICAgICAgbmF2SG9zdENsYXNzTGlzdC5hZGQoUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9DTEFTU19MRVZFTF8yKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbGV2ZWwoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbGV2ZWw7XG4gIH1cblxuICAvLyBnZXR0ZXIgdG8gYWNjZXNzIHRoZSByZXNwb25zaXZlIG5hdmlnYXRpb24gY29kZXMgZnJvbSB0aGUgdGVtcGxhdGVcbiAgZ2V0IHJlc3BvbnNpdmVOYXZDb2RlcygpOiBSZXNwb25zaXZlTmF2Q29kZXMge1xuICAgIHJldHVybiBSZXNwb25zaXZlTmF2Q29kZXM7XG4gIH1cblxuICBvcGVuKCk6IHZvaWQge1xuICAgIHRoaXMucmVzcG9uc2l2ZU5hdlNlcnZpY2Uuc2VuZENvbnRyb2xNZXNzYWdlKFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfT1BFTiwgdGhpcy5sZXZlbCk7XG4gIH1cblxuICBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlc3BvbnNpdmVOYXZTZXJ2aWNlLnNlbmRDb250cm9sTWVzc2FnZShSZXNwb25zaXZlTmF2Q29kZXMuTkFWX0NMT1NFLCB0aGlzLmxldmVsKTtcbiAgfVxuXG4gIC8vIFRPRE86IEZpZ3VyZSBvdXQgd2hhdHMgdGhlIGJlc3Qgd2F5IHRvIGRvIHRoaXMuIFBvc3NpYmxlIG1ldGhvZHNcbiAgLy8gMS4gSG9zdExpc3RlbmVyIChjdXJyZW50IHNvbHV0aW9uKVxuICAvLyAyLiBEaXJlY3RpdmVzIG9uIHRoZSAubmF2LWxpbmsgY2xhc3MuIFdlIGRpc2N1c3NlZCBvbiBtb3ZpbmcgYXdheSBmcm9tIGNsYXNzIHNlbGVjdG9ycyBidXQgSSBmb3JnZXQgdGhlIHJlYXNvblxuICAvLyB3aHlcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudC50YXJnZXQnXSlcbiAgb25Nb3VzZUNsaWNrKHRhcmdldDogYW55KSB7XG4gICAgbGV0IGN1cnJlbnQ6IGFueSA9IHRhcmdldDsgLy8gR2V0IHRoZSBlbGVtZW50IGluIHRoZSBET00gb24gd2hpY2ggdGhlIG1vdXNlIHdhcyBjbGlja2VkXG4gICAgY29uc3QgbmF2SG9zdDogYW55ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7IC8vIEdldCB0aGUgY3VycmVudCBuYXYgbmF0aXZlIEhUTUwgZWxlbWVudFxuXG4gICAgLy8gU3RhcnQgY2hlY2tpbmcgaWYgY3VycmVudCBhbmQgbmF2SG9zdCBhcmUgZXF1YWwuXG4gICAgLy8gSWYgbm90IHRyYXZlcnNlIHRvIHRoZSBwYXJlbnROb2RlIGFuZCBjaGVjayBhZ2Fpbi5cbiAgICB3aGlsZSAoY3VycmVudCkge1xuICAgICAgaWYgKGN1cnJlbnQgPT09IG5hdkhvc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50LmNsYXNzTGlzdC5jb250YWlucygnbmF2LWxpbmsnKSkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZXNwb25zaXZlTmF2U2VydmljZS51bnJlZ2lzdGVyTmF2KHRoaXMubGV2ZWwpO1xuICB9XG59XG4iXX0=