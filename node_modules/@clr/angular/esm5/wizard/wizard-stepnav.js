/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PageCollectionService } from './providers/page-collection.service';
var ClrWizardStepnav = /** @class */ (function () {
    function ClrWizardStepnav(pageService) {
        this.pageService = pageService;
    }
    ClrWizardStepnav = tslib_1.__decorate([
        Component({
            selector: 'clr-wizard-stepnav',
            template: "\n    <div class=\"clr-wizard-stepnav-list\">\n      <div *ngFor=\"let page of pageService.pages\" clr-wizard-stepnav-item [page]=\"page\" class=\"clr-wizard-stepnav-item\"></div>\n    </div>\n  ",
            host: { class: 'clr-wizard-stepnav' }
        }),
        tslib_1.__metadata("design:paramtypes", [PageCollectionService])
    ], ClrWizardStepnav);
    return ClrWizardStepnav;
}());
export { ClrWizardStepnav };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0ZXBuYXYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ3aXphcmQvd2l6YXJkLXN0ZXBuYXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBVzVFO0lBQ0UsMEJBQW1CLFdBQWtDO1FBQWxDLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtJQUFHLENBQUM7SUFEOUMsZ0JBQWdCO1FBVDVCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsUUFBUSxFQUFFLHFNQUlUO1lBQ0QsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFFO1NBQ3RDLENBQUM7aURBRWdDLHFCQUFxQjtPQUQxQyxnQkFBZ0IsQ0FFNUI7SUFBRCx1QkFBQztDQUFBLEFBRkQsSUFFQztTQUZZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlQ29sbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9wYWdlLWNvbGxlY3Rpb24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci13aXphcmQtc3RlcG5hdicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImNsci13aXphcmQtc3RlcG5hdi1saXN0XCI+XG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBwYWdlIG9mIHBhZ2VTZXJ2aWNlLnBhZ2VzXCIgY2xyLXdpemFyZC1zdGVwbmF2LWl0ZW0gW3BhZ2VdPVwicGFnZVwiIGNsYXNzPVwiY2xyLXdpemFyZC1zdGVwbmF2LWl0ZW1cIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDogeyBjbGFzczogJ2Nsci13aXphcmQtc3RlcG5hdicgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyV2l6YXJkU3RlcG5hdiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYWdlU2VydmljZTogUGFnZUNvbGxlY3Rpb25TZXJ2aWNlKSB7fVxufVxuIl19