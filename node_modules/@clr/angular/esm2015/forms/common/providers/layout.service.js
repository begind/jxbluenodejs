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
let LayoutService = class LayoutService {
    constructor() {
        this.layout = Layouts.HORIZONTAL;
        // This is basically a replacement for Object.values(), which IE11 and Node <9 don't support :(
        // String enums cannot be reverse-mapped, meaning Layouts['COMPACT'] does not return 'compact' so
        // this exists to deal with this little caveat to get the list of the values as an array.
        this.layoutValues = Object.keys(Layouts).map(key => Layouts[key]);
    }
    isVertical() {
        return this.layout === Layouts.VERTICAL;
    }
    isHorizontal() {
        return this.layout === Layouts.HORIZONTAL;
    }
    isCompact() {
        return this.layout === Layouts.COMPACT;
    }
    get layoutClass() {
        return `clr-form-${this.layout}`;
    }
    isValid(layout) {
        return this.layoutValues.indexOf(layout) > -1;
    }
};
LayoutService = tslib_1.__decorate([
    Injectable()
], LayoutService);
export { LayoutService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jb21tb24vcHJvdmlkZXJzL2xheW91dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxNQUFNLENBQU4sSUFBWSxPQUlYO0FBSkQsV0FBWSxPQUFPO0lBQ2pCLGdDQUFxQixDQUFBO0lBQ3JCLG9DQUF5QixDQUFBO0lBQ3pCLDhCQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFKVyxPQUFPLEtBQVAsT0FBTyxRQUlsQjtBQUdELElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFEMUI7UUFFRSxXQUFNLEdBQVksT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUNyQywrRkFBK0Y7UUFDL0YsaUdBQWlHO1FBQ2pHLHlGQUF5RjtRQUNqRixpQkFBWSxHQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFxQmpGLENBQUM7SUFuQkMsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQzFDLENBQUM7SUFFRCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFDNUMsQ0FBQztJQUVELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUN6QyxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxZQUFZLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsT0FBTyxDQUFDLE1BQWM7UUFDcEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0NBQ0YsQ0FBQTtBQTFCWSxhQUFhO0lBRHpCLFVBQVUsRUFBRTtHQUNBLGFBQWEsQ0EwQnpCO1NBMUJZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGVudW0gTGF5b3V0cyB7XG4gIFZFUlRJQ0FMID0gJ3ZlcnRpY2FsJyxcbiAgSE9SSVpPTlRBTCA9ICdob3Jpem9udGFsJyxcbiAgQ09NUEFDVCA9ICdjb21wYWN0Jyxcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExheW91dFNlcnZpY2Uge1xuICBsYXlvdXQ6IExheW91dHMgPSBMYXlvdXRzLkhPUklaT05UQUw7XG4gIC8vIFRoaXMgaXMgYmFzaWNhbGx5IGEgcmVwbGFjZW1lbnQgZm9yIE9iamVjdC52YWx1ZXMoKSwgd2hpY2ggSUUxMSBhbmQgTm9kZSA8OSBkb24ndCBzdXBwb3J0IDooXG4gIC8vIFN0cmluZyBlbnVtcyBjYW5ub3QgYmUgcmV2ZXJzZS1tYXBwZWQsIG1lYW5pbmcgTGF5b3V0c1snQ09NUEFDVCddIGRvZXMgbm90IHJldHVybiAnY29tcGFjdCcgc29cbiAgLy8gdGhpcyBleGlzdHMgdG8gZGVhbCB3aXRoIHRoaXMgbGl0dGxlIGNhdmVhdCB0byBnZXQgdGhlIGxpc3Qgb2YgdGhlIHZhbHVlcyBhcyBhbiBhcnJheS5cbiAgcHJpdmF0ZSBsYXlvdXRWYWx1ZXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoTGF5b3V0cykubWFwKGtleSA9PiBMYXlvdXRzW2tleV0pO1xuXG4gIGlzVmVydGljYWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubGF5b3V0ID09PSBMYXlvdXRzLlZFUlRJQ0FMO1xuICB9XG5cbiAgaXNIb3Jpem9udGFsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxheW91dCA9PT0gTGF5b3V0cy5IT1JJWk9OVEFMO1xuICB9XG5cbiAgaXNDb21wYWN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxheW91dCA9PT0gTGF5b3V0cy5DT01QQUNUO1xuICB9XG5cbiAgZ2V0IGxheW91dENsYXNzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBjbHItZm9ybS0ke3RoaXMubGF5b3V0fWA7XG4gIH1cblxuICBpc1ZhbGlkKGxheW91dDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubGF5b3V0VmFsdWVzLmluZGV4T2YobGF5b3V0KSA+IC0xO1xuICB9XG59XG4iXX0=