/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
export var Layouts;
(function (Layouts) {
    Layouts["VERTICAL"] = "vertical";
    Layouts["HORIZONTAL"] = "horizontal";
    Layouts["COMPACT"] = "compact";
})(Layouts || (Layouts = {}));
var LayoutService = /** @class */ (function () {
    function LayoutService() {
        this.layout = Layouts.HORIZONTAL;
        // This is basically a replacement for Object.values(), which IE11 and Node <9 don't support :(
        // String enums cannot be reverse-mapped, meaning Layouts['COMPACT'] does not return 'compact' so
        // this exists to deal with this little caveat to get the list of the values as an array.
        this.layoutValues = Object.keys(Layouts).map(function (key) { return Layouts[key]; });
    }
    LayoutService.prototype.isVertical = function () {
        return this.layout === Layouts.VERTICAL;
    };
    LayoutService.prototype.isHorizontal = function () {
        return this.layout === Layouts.HORIZONTAL;
    };
    LayoutService.prototype.isCompact = function () {
        return this.layout === Layouts.COMPACT;
    };
    Object.defineProperty(LayoutService.prototype, "layoutClass", {
        get: function () {
            return "clr-form-" + this.layout;
        },
        enumerable: true,
        configurable: true
    });
    LayoutService.prototype.isValid = function (layout) {
        return this.layoutValues.indexOf(layout) > -1;
    };
    LayoutService = tslib_1.__decorate([
        Injectable()
    ], LayoutService);
    return LayoutService;
}());
export { LayoutService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jb21tb24vcHJvdmlkZXJzL2xheW91dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxNQUFNLENBQU4sSUFBWSxPQUlYO0FBSkQsV0FBWSxPQUFPO0lBQ2pCLGdDQUFxQixDQUFBO0lBQ3JCLG9DQUF5QixDQUFBO0lBQ3pCLDhCQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFKVyxPQUFPLEtBQVAsT0FBTyxRQUlsQjtBQUdEO0lBREE7UUFFRSxXQUFNLEdBQVksT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUNyQywrRkFBK0Y7UUFDL0YsaUdBQWlHO1FBQ2pHLHlGQUF5RjtRQUNqRixpQkFBWSxHQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFaLENBQVksQ0FBQyxDQUFDO0lBcUJqRixDQUFDO0lBbkJDLGtDQUFVLEdBQVY7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUMxQyxDQUFDO0lBRUQsb0NBQVksR0FBWjtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBQzVDLENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDekMsQ0FBQztJQUVELHNCQUFJLHNDQUFXO2FBQWY7WUFDRSxPQUFPLGNBQVksSUFBSSxDQUFDLE1BQVEsQ0FBQztRQUNuQyxDQUFDOzs7T0FBQTtJQUVELCtCQUFPLEdBQVAsVUFBUSxNQUFjO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQXpCVSxhQUFhO1FBRHpCLFVBQVUsRUFBRTtPQUNBLGFBQWEsQ0EwQnpCO0lBQUQsb0JBQUM7Q0FBQSxBQTFCRCxJQTBCQztTQTFCWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBlbnVtIExheW91dHMge1xuICBWRVJUSUNBTCA9ICd2ZXJ0aWNhbCcsXG4gIEhPUklaT05UQUwgPSAnaG9yaXpvbnRhbCcsXG4gIENPTVBBQ1QgPSAnY29tcGFjdCcsXG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMYXlvdXRTZXJ2aWNlIHtcbiAgbGF5b3V0OiBMYXlvdXRzID0gTGF5b3V0cy5IT1JJWk9OVEFMO1xuICAvLyBUaGlzIGlzIGJhc2ljYWxseSBhIHJlcGxhY2VtZW50IGZvciBPYmplY3QudmFsdWVzKCksIHdoaWNoIElFMTEgYW5kIE5vZGUgPDkgZG9uJ3Qgc3VwcG9ydCA6KFxuICAvLyBTdHJpbmcgZW51bXMgY2Fubm90IGJlIHJldmVyc2UtbWFwcGVkLCBtZWFuaW5nIExheW91dHNbJ0NPTVBBQ1QnXSBkb2VzIG5vdCByZXR1cm4gJ2NvbXBhY3QnIHNvXG4gIC8vIHRoaXMgZXhpc3RzIHRvIGRlYWwgd2l0aCB0aGlzIGxpdHRsZSBjYXZlYXQgdG8gZ2V0IHRoZSBsaXN0IG9mIHRoZSB2YWx1ZXMgYXMgYW4gYXJyYXkuXG4gIHByaXZhdGUgbGF5b3V0VmFsdWVzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKExheW91dHMpLm1hcChrZXkgPT4gTGF5b3V0c1trZXldKTtcblxuICBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxheW91dCA9PT0gTGF5b3V0cy5WRVJUSUNBTDtcbiAgfVxuXG4gIGlzSG9yaXpvbnRhbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgPT09IExheW91dHMuSE9SSVpPTlRBTDtcbiAgfVxuXG4gIGlzQ29tcGFjdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgPT09IExheW91dHMuQ09NUEFDVDtcbiAgfVxuXG4gIGdldCBsYXlvdXRDbGFzcygpOiBzdHJpbmcge1xuICAgIHJldHVybiBgY2xyLWZvcm0tJHt0aGlzLmxheW91dH1gO1xuICB9XG5cbiAgaXNWYWxpZChsYXlvdXQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxheW91dFZhbHVlcy5pbmRleE9mKGxheW91dCkgPiAtMTtcbiAgfVxufVxuIl19