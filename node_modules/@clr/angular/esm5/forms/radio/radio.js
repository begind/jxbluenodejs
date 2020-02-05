/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Injector, Optional, Renderer2, Self, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { WrappedFormControl } from '../common/wrapped-control';
import { ClrRadioWrapper } from '../radio/radio-wrapper';
var ClrRadio = /** @class */ (function (_super) {
    tslib_1.__extends(ClrRadio, _super);
    function ClrRadio(vcr, injector, control, renderer, el) {
        return _super.call(this, vcr, ClrRadioWrapper, injector, control, renderer, el) || this;
    }
    ClrRadio = tslib_1.__decorate([
        Directive({ selector: '[clrRadio]' }),
        tslib_1.__param(2, Self()),
        tslib_1.__param(2, Optional()),
        tslib_1.__metadata("design:paramtypes", [ViewContainerRef,
            Injector,
            NgControl,
            Renderer2,
            ElementRef])
    ], ClrRadio);
    return ClrRadio;
}(WrappedFormControl));
export { ClrRadio };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9yYWRpby9yYWRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR3pEO0lBQThCLG9DQUFtQztJQUMvRCxrQkFDRSxHQUFxQixFQUNyQixRQUFrQixFQUdsQixPQUFrQixFQUNsQixRQUFtQixFQUNuQixFQUFjO2VBRWQsa0JBQU0sR0FBRyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUM7SUFDOUQsQ0FBQztJQVhVLFFBQVE7UUFEcEIsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxDQUFDO1FBS2pDLG1CQUFBLElBQUksRUFBRSxDQUFBO1FBQ04sbUJBQUEsUUFBUSxFQUFFLENBQUE7aURBSE4sZ0JBQWdCO1lBQ1gsUUFBUTtZQUdULFNBQVM7WUFDUixTQUFTO1lBQ2YsVUFBVTtPQVJMLFFBQVEsQ0FZcEI7SUFBRCxlQUFDO0NBQUEsQUFaRCxDQUE4QixrQkFBa0IsR0FZL0M7U0FaWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RvciwgT3B0aW9uYWwsIFJlbmRlcmVyMiwgU2VsZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBXcmFwcGVkRm9ybUNvbnRyb2wgfSBmcm9tICcuLi9jb21tb24vd3JhcHBlZC1jb250cm9sJztcbmltcG9ydCB7IENsclJhZGlvV3JhcHBlciB9IGZyb20gJy4uL3JhZGlvL3JhZGlvLXdyYXBwZXInO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2xyUmFkaW9dJyB9KVxuZXhwb3J0IGNsYXNzIENsclJhZGlvIGV4dGVuZHMgV3JhcHBlZEZvcm1Db250cm9sPENsclJhZGlvV3JhcHBlcj4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIEBTZWxmKClcbiAgICBAT3B0aW9uYWwoKVxuICAgIGNvbnRyb2w6IE5nQ29udHJvbCxcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIGVsOiBFbGVtZW50UmVmXG4gICkge1xuICAgIHN1cGVyKHZjciwgQ2xyUmFkaW9XcmFwcGVyLCBpbmplY3RvciwgY29udHJvbCwgcmVuZGVyZXIsIGVsKTtcbiAgfVxufVxuIl19