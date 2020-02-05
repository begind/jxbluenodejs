import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { ResponsiveNavCodes } from '../responsive-nav-codes';
import { ResponsiveNavControlMessage } from '../responsive-nav-control-message';
import * as i0 from "@angular/core";
var ResponsiveNavigationService = /** @class */ (function () {
    function ResponsiveNavigationService() {
        this.responsiveNavList = [];
        this.registerNavSubject = new ReplaySubject();
        this.controlNavSubject = new Subject();
        this.closeAllNavs(); // We start with all navs closed
    }
    Object.defineProperty(ResponsiveNavigationService.prototype, "registeredNavs", {
        get: function () {
            return this.registerNavSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResponsiveNavigationService.prototype, "navControl", {
        get: function () {
            return this.controlNavSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ResponsiveNavigationService.prototype.registerNav = function (navLevel) {
        if (!navLevel || this.isNavRegistered(navLevel)) {
            return;
        }
        this.responsiveNavList.push(navLevel);
        this.registerNavSubject.next(this.responsiveNavList);
    };
    ResponsiveNavigationService.prototype.isNavRegistered = function (navLevel) {
        if (this.responsiveNavList.indexOf(navLevel) > -1) {
            console.error('Multiple clr-nav-level ' + navLevel + ' attributes found. Please make sure that only one exists');
            return true;
        }
        return false;
    };
    ResponsiveNavigationService.prototype.unregisterNav = function (navLevel) {
        var index = this.responsiveNavList.indexOf(navLevel);
        if (index > -1) {
            this.responsiveNavList.splice(index, 1);
            this.registerNavSubject.next(this.responsiveNavList);
        }
    };
    ResponsiveNavigationService.prototype.sendControlMessage = function (controlCode, navLevel) {
        var message = new ResponsiveNavControlMessage(controlCode, navLevel);
        this.controlNavSubject.next(message);
    };
    ResponsiveNavigationService.prototype.closeAllNavs = function () {
        var message = new ResponsiveNavControlMessage(ResponsiveNavCodes.NAV_CLOSE_ALL, -999);
        this.controlNavSubject.next(message);
    };
    ResponsiveNavigationService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ResponsiveNavigationService_Factory() { return new ResponsiveNavigationService(); }, token: ResponsiveNavigationService, providedIn: "root" });
    ResponsiveNavigationService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ResponsiveNavigationService);
    return ResponsiveNavigationService;
}());
export { ResponsiveNavigationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2l2ZS1uYXZpZ2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvbmF2L3Byb3ZpZGVycy9yZXNwb25zaXZlLW5hdmlnYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFOUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0QsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0FBR2hGO0lBYUU7UUFaTyxzQkFBaUIsR0FBYSxFQUFFLENBQUM7UUFDaEMsdUJBQWtCLEdBQUcsSUFBSSxhQUFhLEVBQVksQ0FBQztRQUNuRCxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBK0IsQ0FBQztRQVdyRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxnQ0FBZ0M7SUFDdkQsQ0FBQztJQVZELHNCQUFJLHVEQUFjO2FBQWxCO1lBQ0UsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDaEQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxtREFBVTthQUFkO1lBQ0UsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDL0MsQ0FBQzs7O09BQUE7SUFNRCxpREFBVyxHQUFYLFVBQVksUUFBZ0I7UUFDMUIsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQy9DLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQscURBQWUsR0FBZixVQUFnQixRQUFnQjtRQUM5QixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDakQsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsR0FBRyxRQUFRLEdBQUcsMERBQTBELENBQUMsQ0FBQztZQUNqSCxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsbURBQWEsR0FBYixVQUFjLFFBQWdCO1FBQzVCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDZCxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3REO0lBQ0gsQ0FBQztJQUVELHdEQUFrQixHQUFsQixVQUFtQixXQUFtQixFQUFFLFFBQWdCO1FBQ3RELElBQU0sT0FBTyxHQUFnQyxJQUFJLDJCQUEyQixDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNwRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxrREFBWSxHQUFaO1FBQ0UsSUFBTSxPQUFPLEdBQWdDLElBQUksMkJBQTJCLENBQzFFLGtCQUFrQixDQUFDLGFBQWEsRUFDaEMsQ0FBQyxHQUFHLENBQ0wsQ0FBQztRQUNGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7SUFwRFUsMkJBQTJCO1FBRHZDLFVBQVUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQzs7T0FDdEIsMkJBQTJCLENBcUR2QztzQ0FsRUQ7Q0FrRUMsQUFyREQsSUFxREM7U0FyRFksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBSZXNwb25zaXZlTmF2Q29kZXMgfSBmcm9tICcuLi9yZXNwb25zaXZlLW5hdi1jb2Rlcyc7XG5pbXBvcnQgeyBSZXNwb25zaXZlTmF2Q29udHJvbE1lc3NhZ2UgfSBmcm9tICcuLi9yZXNwb25zaXZlLW5hdi1jb250cm9sLW1lc3NhZ2UnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFJlc3BvbnNpdmVOYXZpZ2F0aW9uU2VydmljZSB7XG4gIHB1YmxpYyByZXNwb25zaXZlTmF2TGlzdDogbnVtYmVyW10gPSBbXTtcbiAgcHJpdmF0ZSByZWdpc3Rlck5hdlN1YmplY3QgPSBuZXcgUmVwbGF5U3ViamVjdDxudW1iZXJbXT4oKTtcbiAgcHJpdmF0ZSBjb250cm9sTmF2U3ViamVjdCA9IG5ldyBTdWJqZWN0PFJlc3BvbnNpdmVOYXZDb250cm9sTWVzc2FnZT4oKTtcblxuICBnZXQgcmVnaXN0ZXJlZE5hdnMoKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyTmF2U3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBuYXZDb250cm9sKCk6IE9ic2VydmFibGU8UmVzcG9uc2l2ZU5hdkNvbnRyb2xNZXNzYWdlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29udHJvbE5hdlN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNsb3NlQWxsTmF2cygpOyAvLyBXZSBzdGFydCB3aXRoIGFsbCBuYXZzIGNsb3NlZFxuICB9XG5cbiAgcmVnaXN0ZXJOYXYobmF2TGV2ZWw6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghbmF2TGV2ZWwgfHwgdGhpcy5pc05hdlJlZ2lzdGVyZWQobmF2TGV2ZWwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVzcG9uc2l2ZU5hdkxpc3QucHVzaChuYXZMZXZlbCk7XG4gICAgdGhpcy5yZWdpc3Rlck5hdlN1YmplY3QubmV4dCh0aGlzLnJlc3BvbnNpdmVOYXZMaXN0KTtcbiAgfVxuXG4gIGlzTmF2UmVnaXN0ZXJlZChuYXZMZXZlbDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucmVzcG9uc2l2ZU5hdkxpc3QuaW5kZXhPZihuYXZMZXZlbCkgPiAtMSkge1xuICAgICAgY29uc29sZS5lcnJvcignTXVsdGlwbGUgY2xyLW5hdi1sZXZlbCAnICsgbmF2TGV2ZWwgKyAnIGF0dHJpYnV0ZXMgZm91bmQuIFBsZWFzZSBtYWtlIHN1cmUgdGhhdCBvbmx5IG9uZSBleGlzdHMnKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB1bnJlZ2lzdGVyTmF2KG5hdkxldmVsOiBudW1iZXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMucmVzcG9uc2l2ZU5hdkxpc3QuaW5kZXhPZihuYXZMZXZlbCk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMucmVzcG9uc2l2ZU5hdkxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHRoaXMucmVnaXN0ZXJOYXZTdWJqZWN0Lm5leHQodGhpcy5yZXNwb25zaXZlTmF2TGlzdCk7XG4gICAgfVxuICB9XG5cbiAgc2VuZENvbnRyb2xNZXNzYWdlKGNvbnRyb2xDb2RlOiBzdHJpbmcsIG5hdkxldmVsOiBudW1iZXIpIHtcbiAgICBjb25zdCBtZXNzYWdlOiBSZXNwb25zaXZlTmF2Q29udHJvbE1lc3NhZ2UgPSBuZXcgUmVzcG9uc2l2ZU5hdkNvbnRyb2xNZXNzYWdlKGNvbnRyb2xDb2RlLCBuYXZMZXZlbCk7XG4gICAgdGhpcy5jb250cm9sTmF2U3ViamVjdC5uZXh0KG1lc3NhZ2UpO1xuICB9XG5cbiAgY2xvc2VBbGxOYXZzKCkge1xuICAgIGNvbnN0IG1lc3NhZ2U6IFJlc3BvbnNpdmVOYXZDb250cm9sTWVzc2FnZSA9IG5ldyBSZXNwb25zaXZlTmF2Q29udHJvbE1lc3NhZ2UoXG4gICAgICBSZXNwb25zaXZlTmF2Q29kZXMuTkFWX0NMT1NFX0FMTCxcbiAgICAgIC05OTlcbiAgICApO1xuICAgIHRoaXMuY29udHJvbE5hdlN1YmplY3QubmV4dChtZXNzYWdlKTtcbiAgfVxufVxuIl19