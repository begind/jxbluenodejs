/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, Optional } from '@angular/core';
import { ControlIdService } from './providers/control-id.service';
var ClrControlHelper = /** @class */ (function () {
    function ClrControlHelper(controlIdService) {
        this.controlIdService = controlIdService;
    }
    ClrControlHelper = tslib_1.__decorate([
        Component({
            selector: 'clr-control-helper',
            template: "\n    <ng-content></ng-content>\n    ",
            host: {
                '[class.clr-subtext]': 'true',
                '[id]': 'controlIdService?.id + "-helper"',
            }
        }),
        tslib_1.__param(0, Optional()),
        tslib_1.__metadata("design:paramtypes", [ControlIdService])
    ], ClrControlHelper);
    return ClrControlHelper;
}());
export { ClrControlHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY29tbW9uL2hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBWWxFO0lBQ0UsMEJBQStCLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQUcsQ0FBQztJQUQxRCxnQkFBZ0I7UUFWNUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixRQUFRLEVBQUUsdUNBRVA7WUFDSCxJQUFJLEVBQUU7Z0JBQ0oscUJBQXFCLEVBQUUsTUFBTTtnQkFDN0IsTUFBTSxFQUFFLGtDQUFrQzthQUMzQztTQUNGLENBQUM7UUFFYSxtQkFBQSxRQUFRLEVBQUUsQ0FBQTtpREFBMEIsZ0JBQWdCO09BRHRELGdCQUFnQixDQUU1QjtJQUFELHVCQUFDO0NBQUEsQUFGRCxJQUVDO1NBRlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbElkU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbnRyb2wtaWQuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1jb250cm9sLWhlbHBlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNsci1zdWJ0ZXh0XSc6ICd0cnVlJyxcbiAgICAnW2lkXSc6ICdjb250cm9sSWRTZXJ2aWNlPy5pZCArIFwiLWhlbHBlclwiJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQ29udHJvbEhlbHBlciB7XG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIHB1YmxpYyBjb250cm9sSWRTZXJ2aWNlOiBDb250cm9sSWRTZXJ2aWNlKSB7fVxufVxuIl19