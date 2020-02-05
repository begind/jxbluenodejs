import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ResponsiveNavigationService } from './providers/responsive-navigation.service';
import { ResponsiveNavCodes } from './responsive-nav-codes';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
let ClrHeader = class ClrHeader {
    constructor(responsiveNavService, commonStrings) {
        this.responsiveNavService = responsiveNavService;
        this.commonStrings = commonStrings;
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
        this.openNavLevel = null;
        this.responsiveNavCodes = ResponsiveNavCodes;
        this._subscription = this.responsiveNavService.registeredNavs.subscribe({
            next: (navLevelList) => {
                this.initializeNavTriggers(navLevelList);
            },
        });
    }
    // reset triggers. handles cases when an application has different nav levels on different pages.
    resetNavTriggers() {
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
    }
    // decides which triggers to show on the header
    initializeNavTriggers(navList) {
        this.resetNavTriggers();
        if (navList.length > 2) {
            console.error('More than 2 Nav Levels detected.');
            return;
        }
        navList.forEach(navLevel => {
            if (navLevel === ResponsiveNavCodes.NAV_LEVEL_1) {
                this.isNavLevel1OnPage = true;
            }
            else if (navLevel === ResponsiveNavCodes.NAV_LEVEL_2) {
                this.isNavLevel2OnPage = true;
            }
        });
    }
    // closes the nav that is open
    closeOpenNav() {
        this.responsiveNavService.closeAllNavs();
    }
    // toggles the nav that is open
    toggleNav(navLevel) {
        this.openNavLevel = this.openNavLevel === navLevel ? null : navLevel;
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_TOGGLE, navLevel);
    }
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
};
ClrHeader = tslib_1.__decorate([
    Component({
        selector: 'clr-header',
        template: `
        <button
            type="button"
            *ngIf="isNavLevel1OnPage"
            class="header-hamburger-trigger"
            [attr.aria-label]="(openNavLevel !== responsiveNavCodes.NAV_LEVEL_1) ? commonStrings.keys.open : commonStrings.keys.close"
            (click)="toggleNav(responsiveNavCodes.NAV_LEVEL_1)">
            <span></span>
        </button>
        <ng-content></ng-content>
        <button
            type="button"
            *ngIf="isNavLevel2OnPage"
            class="header-overflow-trigger"
            [attr.aria-label]="(openNavLevel !== responsiveNavCodes.NAV_LEVEL_2) ? commonStrings.keys.open : commonStrings.keys.close"
            (click)="toggleNav(responsiveNavCodes.NAV_LEVEL_2)">
            <span></span>
        </button>
        <div class="header-backdrop" (click)="closeOpenNav()"></div>
    `,
        host: { '[class.header]': 'true' }
    }),
    tslib_1.__metadata("design:paramtypes", [ResponsiveNavigationService,
        ClrCommonStringsService])
], ClrHeader);
export { ClrHeader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L25hdi9oZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBR3JELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBMEJsRixJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFTO0lBT3BCLFlBQ1Usb0JBQWlELEVBQ2xELGFBQXNDO1FBRHJDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBNkI7UUFDbEQsa0JBQWEsR0FBYixhQUFhLENBQXlCO1FBUi9DLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsaUJBQVksR0FBVyxJQUFJLENBQUM7UUFDNUIsdUJBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFPdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztZQUN0RSxJQUFJLEVBQUUsQ0FBQyxZQUFzQixFQUFFLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzQyxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGlHQUFpRztJQUNqRyxnQkFBZ0I7UUFDZCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUVELCtDQUErQztJQUMvQyxxQkFBcUIsQ0FBQyxPQUFpQjtRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUNsRCxPQUFPO1NBQ1I7UUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3pCLElBQUksUUFBUSxLQUFLLGtCQUFrQixDQUFDLFdBQVcsRUFBRTtnQkFDL0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQzthQUMvQjtpQkFBTSxJQUFJLFFBQVEsS0FBSyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3RELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7YUFDL0I7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw4QkFBOEI7SUFDOUIsWUFBWTtRQUNWLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsK0JBQStCO0lBQy9CLFNBQVMsQ0FBQyxRQUFnQjtRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNyRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0NBQ0YsQ0FBQTtBQXREWSxTQUFTO0lBeEJyQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsWUFBWTtRQUN0QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FtQlA7UUFDSCxJQUFJLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUU7S0FDbkMsQ0FBQzs2Q0FTZ0MsMkJBQTJCO1FBQ25DLHVCQUF1QjtHQVRwQyxTQUFTLENBc0RyQjtTQXREWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBSZXNwb25zaXZlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9yZXNwb25zaXZlLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBSZXNwb25zaXZlTmF2Q29kZXMgfSBmcm9tICcuL3Jlc3BvbnNpdmUtbmF2LWNvZGVzJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWhlYWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgKm5nSWY9XCJpc05hdkxldmVsMU9uUGFnZVwiXG4gICAgICAgICAgICBjbGFzcz1cImhlYWRlci1oYW1idXJnZXItdHJpZ2dlclwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIihvcGVuTmF2TGV2ZWwgIT09IHJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMSkgPyBjb21tb25TdHJpbmdzLmtleXMub3BlbiA6IGNvbW1vblN0cmluZ3Mua2V5cy5jbG9zZVwiXG4gICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlTmF2KHJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMSlcIj5cbiAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAqbmdJZj1cImlzTmF2TGV2ZWwyT25QYWdlXCJcbiAgICAgICAgICAgIGNsYXNzPVwiaGVhZGVyLW92ZXJmbG93LXRyaWdnZXJcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCIob3Blbk5hdkxldmVsICE9PSByZXNwb25zaXZlTmF2Q29kZXMuTkFWX0xFVkVMXzIpID8gY29tbW9uU3RyaW5ncy5rZXlzLm9wZW4gOiBjb21tb25TdHJpbmdzLmtleXMuY2xvc2VcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZU5hdihyZXNwb25zaXZlTmF2Q29kZXMuTkFWX0xFVkVMXzIpXCI+XG4gICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWJhY2tkcm9wXCIgKGNsaWNrKT1cImNsb3NlT3Blbk5hdigpXCI+PC9kaXY+XG4gICAgYCxcbiAgaG9zdDogeyAnW2NsYXNzLmhlYWRlcl0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xySGVhZGVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgaXNOYXZMZXZlbDFPblBhZ2UgPSBmYWxzZTtcbiAgaXNOYXZMZXZlbDJPblBhZ2UgPSBmYWxzZTtcbiAgb3Blbk5hdkxldmVsOiBudW1iZXIgPSBudWxsO1xuICByZXNwb25zaXZlTmF2Q29kZXMgPSBSZXNwb25zaXZlTmF2Q29kZXM7XG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVzcG9uc2l2ZU5hdlNlcnZpY2U6IFJlc3BvbnNpdmVOYXZpZ2F0aW9uU2VydmljZSxcbiAgICBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy5yZXNwb25zaXZlTmF2U2VydmljZS5yZWdpc3RlcmVkTmF2cy5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogKG5hdkxldmVsTGlzdDogbnVtYmVyW10pID0+IHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplTmF2VHJpZ2dlcnMobmF2TGV2ZWxMaXN0KTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvLyByZXNldCB0cmlnZ2Vycy4gaGFuZGxlcyBjYXNlcyB3aGVuIGFuIGFwcGxpY2F0aW9uIGhhcyBkaWZmZXJlbnQgbmF2IGxldmVscyBvbiBkaWZmZXJlbnQgcGFnZXMuXG4gIHJlc2V0TmF2VHJpZ2dlcnMoKSB7XG4gICAgdGhpcy5pc05hdkxldmVsMU9uUGFnZSA9IGZhbHNlO1xuICAgIHRoaXMuaXNOYXZMZXZlbDJPblBhZ2UgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIGRlY2lkZXMgd2hpY2ggdHJpZ2dlcnMgdG8gc2hvdyBvbiB0aGUgaGVhZGVyXG4gIGluaXRpYWxpemVOYXZUcmlnZ2VycyhuYXZMaXN0OiBudW1iZXJbXSk6IHZvaWQge1xuICAgIHRoaXMucmVzZXROYXZUcmlnZ2VycygpO1xuICAgIGlmIChuYXZMaXN0Lmxlbmd0aCA+IDIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ01vcmUgdGhhbiAyIE5hdiBMZXZlbHMgZGV0ZWN0ZWQuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG5hdkxpc3QuZm9yRWFjaChuYXZMZXZlbCA9PiB7XG4gICAgICBpZiAobmF2TGV2ZWwgPT09IFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMSkge1xuICAgICAgICB0aGlzLmlzTmF2TGV2ZWwxT25QYWdlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAobmF2TGV2ZWwgPT09IFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMikge1xuICAgICAgICB0aGlzLmlzTmF2TGV2ZWwyT25QYWdlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIGNsb3NlcyB0aGUgbmF2IHRoYXQgaXMgb3BlblxuICBjbG9zZU9wZW5OYXYoKSB7XG4gICAgdGhpcy5yZXNwb25zaXZlTmF2U2VydmljZS5jbG9zZUFsbE5hdnMoKTtcbiAgfVxuXG4gIC8vIHRvZ2dsZXMgdGhlIG5hdiB0aGF0IGlzIG9wZW5cbiAgdG9nZ2xlTmF2KG5hdkxldmVsOiBudW1iZXIpIHtcbiAgICB0aGlzLm9wZW5OYXZMZXZlbCA9IHRoaXMub3Blbk5hdkxldmVsID09PSBuYXZMZXZlbCA/IG51bGwgOiBuYXZMZXZlbDtcbiAgICB0aGlzLnJlc3BvbnNpdmVOYXZTZXJ2aWNlLnNlbmRDb250cm9sTWVzc2FnZShSZXNwb25zaXZlTmF2Q29kZXMuTkFWX1RPR0dMRSwgbmF2TGV2ZWwpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==