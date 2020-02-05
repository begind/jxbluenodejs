/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { WizardNavigationService } from './wizard-navigation.service';
var HeaderActionService = /** @class */ (function () {
    // this service communicates information about the presence/display of header actions
    // across the wizard
    function HeaderActionService(navService) {
        this.navService = navService;
    }
    Object.defineProperty(HeaderActionService.prototype, "wizardHasHeaderActions", {
        get: function () {
            var wizardHdrActions = this.wizardHeaderActions;
            if (!wizardHdrActions) {
                return false;
            }
            return wizardHdrActions.toArray().length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderActionService.prototype, "currentPageHasHeaderActions", {
        get: function () {
            return this.navService.currentPage ? this.navService.currentPage.hasHeaderActions : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderActionService.prototype, "showWizardHeaderActions", {
        get: function () {
            return !this.currentPageHasHeaderActions && this.wizardHasHeaderActions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderActionService.prototype, "displayHeaderActionsWrapper", {
        get: function () {
            return this.currentPageHasHeaderActions || this.wizardHasHeaderActions;
        },
        enumerable: true,
        configurable: true
    });
    HeaderActionService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [WizardNavigationService])
    ], HeaderActionService);
    return HeaderActionService;
}());
export { HeaderActionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWFjdGlvbnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbIndpemFyZC9wcm92aWRlcnMvaGVhZGVyLWFjdGlvbnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFdEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHdEU7SUFDRSxxRkFBcUY7SUFDckYsb0JBQW9CO0lBRXBCLDZCQUFtQixVQUFtQztRQUFuQyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtJQUFHLENBQUM7SUFJMUQsc0JBQVcsdURBQXNCO2FBQWpDO1lBQ0UsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7WUFDbEQsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUNyQixPQUFPLEtBQUssQ0FBQzthQUNkO1lBQ0QsT0FBTyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsNERBQTJCO2FBQXRDO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUM1RixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHdEQUF1QjthQUFsQztZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDO1FBQzFFLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsNERBQTJCO2FBQXRDO1lBQ0UsT0FBTyxJQUFJLENBQUMsMkJBQTJCLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDO1FBQ3pFLENBQUM7OztPQUFBO0lBMUJVLG1CQUFtQjtRQUQvQixVQUFVLEVBQUU7aURBS29CLHVCQUF1QjtPQUozQyxtQkFBbUIsQ0EyQi9CO0lBQUQsMEJBQUM7Q0FBQSxBQTNCRCxJQTJCQztTQTNCWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xyV2l6YXJkSGVhZGVyQWN0aW9uIH0gZnJvbSAnLi4vd2l6YXJkLWhlYWRlci1hY3Rpb24nO1xuaW1wb3J0IHsgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3dpemFyZC1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGVhZGVyQWN0aW9uU2VydmljZSB7XG4gIC8vIHRoaXMgc2VydmljZSBjb21tdW5pY2F0ZXMgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHByZXNlbmNlL2Rpc3BsYXkgb2YgaGVhZGVyIGFjdGlvbnNcbiAgLy8gYWNyb3NzIHRoZSB3aXphcmRcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmF2U2VydmljZTogV2l6YXJkTmF2aWdhdGlvblNlcnZpY2UpIHt9XG5cbiAgcHVibGljIHdpemFyZEhlYWRlckFjdGlvbnM6IFF1ZXJ5TGlzdDxDbHJXaXphcmRIZWFkZXJBY3Rpb24+O1xuXG4gIHB1YmxpYyBnZXQgd2l6YXJkSGFzSGVhZGVyQWN0aW9ucygpOiBib29sZWFuIHtcbiAgICBjb25zdCB3aXphcmRIZHJBY3Rpb25zID0gdGhpcy53aXphcmRIZWFkZXJBY3Rpb25zO1xuICAgIGlmICghd2l6YXJkSGRyQWN0aW9ucykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gd2l6YXJkSGRyQWN0aW9ucy50b0FycmF5KCkubGVuZ3RoID4gMDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY3VycmVudFBhZ2VIYXNIZWFkZXJBY3Rpb25zKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5hdlNlcnZpY2UuY3VycmVudFBhZ2UgPyB0aGlzLm5hdlNlcnZpY2UuY3VycmVudFBhZ2UuaGFzSGVhZGVyQWN0aW9ucyA6IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGdldCBzaG93V2l6YXJkSGVhZGVyQWN0aW9ucygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuY3VycmVudFBhZ2VIYXNIZWFkZXJBY3Rpb25zICYmIHRoaXMud2l6YXJkSGFzSGVhZGVyQWN0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZGlzcGxheUhlYWRlckFjdGlvbnNXcmFwcGVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRQYWdlSGFzSGVhZGVyQWN0aW9ucyB8fCB0aGlzLndpemFyZEhhc0hlYWRlckFjdGlvbnM7XG4gIH1cbn1cbiJdfQ==