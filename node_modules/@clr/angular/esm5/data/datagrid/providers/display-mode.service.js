/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatagridDisplayMode } from '../enums/display-mode.enum';
import { DatagridRenderStep } from '../enums/render-step.enum';
import { DatagridRenderOrganizer } from '../render/render-organizer';
var DisplayModeService = /** @class */ (function () {
    function DisplayModeService(renderOrganizer) {
        var _this = this;
        this.subscriptions = [];
        this._view = new BehaviorSubject(DatagridDisplayMode.DISPLAY);
        this.subscriptions.push(renderOrganizer
            .filterRenderSteps(DatagridRenderStep.CALCULATE_MODE_ON)
            .subscribe(function () { return _this._view.next(DatagridDisplayMode.CALCULATE); }));
        this.subscriptions.push(renderOrganizer
            .filterRenderSteps(DatagridRenderStep.CALCULATE_MODE_OFF)
            .subscribe(function () { return _this._view.next(DatagridDisplayMode.DISPLAY); }));
    }
    Object.defineProperty(DisplayModeService.prototype, "view", {
        get: function () {
            return this._view.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DisplayModeService.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    DisplayModeService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [DatagridRenderOrganizer])
    ], DisplayModeService);
    return DisplayModeService;
}());
export { DisplayModeService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGxheS1tb2RlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL3Byb3ZpZGVycy9kaXNwbGF5LW1vZGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFjLGVBQWUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFakUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHckU7SUFNRSw0QkFBWSxlQUF3QztRQUFwRCxpQkFZQztRQWpCTyxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFDakMsVUFBSyxHQUF5QyxJQUFJLGVBQWUsQ0FDekUsbUJBQW1CLENBQUMsT0FBTyxDQUM1QixDQUFDO1FBR0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLGVBQWU7YUFDWixpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQzthQUN2RCxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxFQUE5QyxDQUE4QyxDQUFDLENBQ25FLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsZUFBZTthQUNaLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDO2FBQ3hELFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEVBQTVDLENBQTRDLENBQUMsQ0FDakUsQ0FBQztJQUNKLENBQUM7SUFFRCxzQkFBVyxvQ0FBSTthQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25DLENBQUM7OztPQUFBO0lBRUQsd0NBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQTFCVSxrQkFBa0I7UUFEOUIsVUFBVSxFQUFFO2lEQU9rQix1QkFBdUI7T0FOekMsa0JBQWtCLENBMkI5QjtJQUFELHlCQUFDO0NBQUEsQUEzQkQsSUEyQkM7U0EzQlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IERhdGFncmlkRGlzcGxheU1vZGUgfSBmcm9tICcuLi9lbnVtcy9kaXNwbGF5LW1vZGUuZW51bSc7XG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlclN0ZXAgfSBmcm9tICcuLi9lbnVtcy9yZW5kZXItc3RlcC5lbnVtJztcbmltcG9ydCB7IERhdGFncmlkUmVuZGVyT3JnYW5pemVyIH0gZnJvbSAnLi4vcmVuZGVyL3JlbmRlci1vcmdhbml6ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGlzcGxheU1vZGVTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBwcm90ZWN0ZWQgX3ZpZXc6IEJlaGF2aW9yU3ViamVjdDxEYXRhZ3JpZERpc3BsYXlNb2RlPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGF0YWdyaWREaXNwbGF5TW9kZT4oXG4gICAgRGF0YWdyaWREaXNwbGF5TW9kZS5ESVNQTEFZXG4gICk7XG5cbiAgY29uc3RydWN0b3IocmVuZGVyT3JnYW5pemVyOiBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplcikge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgcmVuZGVyT3JnYW5pemVyXG4gICAgICAgIC5maWx0ZXJSZW5kZXJTdGVwcyhEYXRhZ3JpZFJlbmRlclN0ZXAuQ0FMQ1VMQVRFX01PREVfT04pXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fdmlldy5uZXh0KERhdGFncmlkRGlzcGxheU1vZGUuQ0FMQ1VMQVRFKSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICByZW5kZXJPcmdhbml6ZXJcbiAgICAgICAgLmZpbHRlclJlbmRlclN0ZXBzKERhdGFncmlkUmVuZGVyU3RlcC5DQUxDVUxBVEVfTU9ERV9PRkYpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fdmlldy5uZXh0KERhdGFncmlkRGlzcGxheU1vZGUuRElTUExBWSkpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmlldygpOiBPYnNlcnZhYmxlPERhdGFncmlkRGlzcGxheU1vZGU+IHtcbiAgICByZXR1cm4gdGhpcy5fdmlldy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==