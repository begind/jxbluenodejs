/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Directive, Optional, ViewContainerRef, Renderer2, ElementRef, Injector, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ClrInputContainer } from './input-container';
import { WrappedFormControl } from '../common/wrapped-control';
var ClrInput = /** @class */ (function (_super) {
    tslib_1.__extends(ClrInput, _super);
    function ClrInput(vcr, injector, control, renderer, el) {
        var _this = _super.call(this, vcr, ClrInputContainer, injector, control, renderer, el) || this;
        _this.index = 1;
        return _this;
    }
    ClrInput = tslib_1.__decorate([
        Directive({ selector: '[clrInput]', host: { '[class.clr-input]': 'true' } }),
        tslib_1.__param(2, Self()),
        tslib_1.__param(2, Optional()),
        tslib_1.__metadata("design:paramtypes", [ViewContainerRef,
            Injector,
            NgControl,
            Renderer2,
            ElementRef])
    ], ClrInput);
    return ClrInput;
}(WrappedFormControl));
export { ClrInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9pbnB1dC9pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHL0Q7SUFBOEIsb0NBQXFDO0lBR2pFLGtCQUNFLEdBQXFCLEVBQ3JCLFFBQWtCLEVBR2xCLE9BQWtCLEVBQ2xCLFFBQW1CLEVBQ25CLEVBQWM7UUFQaEIsWUFTRSxrQkFBTSxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLFNBQy9EO1FBWlMsV0FBSyxHQUFHLENBQUMsQ0FBQzs7SUFZcEIsQ0FBQztJQWJVLFFBQVE7UUFEcEIsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDO1FBT3hFLG1CQUFBLElBQUksRUFBRSxDQUFBO1FBQ04sbUJBQUEsUUFBUSxFQUFFLENBQUE7aURBSE4sZ0JBQWdCO1lBQ1gsUUFBUTtZQUdULFNBQVM7WUFDUixTQUFTO1lBQ2YsVUFBVTtPQVZMLFFBQVEsQ0FjcEI7SUFBRCxlQUFDO0NBQUEsQUFkRCxDQUE4QixrQkFBa0IsR0FjL0M7U0FkWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBPcHRpb25hbCwgVmlld0NvbnRhaW5lclJlZiwgUmVuZGVyZXIyLCBFbGVtZW50UmVmLCBJbmplY3RvciwgU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBDbHJJbnB1dENvbnRhaW5lciB9IGZyb20gJy4vaW5wdXQtY29udGFpbmVyJztcbmltcG9ydCB7IFdyYXBwZWRGb3JtQ29udHJvbCB9IGZyb20gJy4uL2NvbW1vbi93cmFwcGVkLWNvbnRyb2wnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2xySW5wdXRdJywgaG9zdDogeyAnW2NsYXNzLmNsci1pbnB1dF0nOiAndHJ1ZScgfSB9KVxuZXhwb3J0IGNsYXNzIENscklucHV0IGV4dGVuZHMgV3JhcHBlZEZvcm1Db250cm9sPENscklucHV0Q29udGFpbmVyPiB7XG4gIHByb3RlY3RlZCBpbmRleCA9IDE7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBAU2VsZigpXG4gICAgQE9wdGlvbmFsKClcbiAgICBjb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBlbDogRWxlbWVudFJlZlxuICApIHtcbiAgICBzdXBlcih2Y3IsIENscklucHV0Q29udGFpbmVyLCBpbmplY3RvciwgY29udHJvbCwgcmVuZGVyZXIsIGVsKTtcbiAgfVxufVxuIl19