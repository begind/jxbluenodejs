/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef } from '@angular/core';
import { ClrPopoverEventsService } from './providers/popover-events.service';
let ClrPopoverAnchor = class ClrPopoverAnchor {
    constructor(smartEventService, element) {
        smartEventService.anchorButtonRef = element;
    }
};
ClrPopoverAnchor = tslib_1.__decorate([
    Directive({
        selector: '[clrPopoverAnchor]',
        host: {
            '[class.clr-anchor]': 'true',
        },
    }),
    tslib_1.__metadata("design:paramtypes", [ClrPopoverEventsService, ElementRef])
], ClrPopoverAnchor);
export { ClrPopoverAnchor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1hbmNob3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9wb3BvdmVyL3BvcG92ZXItYW5jaG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBUTdFLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBQzNCLFlBQVksaUJBQTBDLEVBQUUsT0FBbUI7UUFDekUsaUJBQWlCLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQztJQUM5QyxDQUFDO0NBQ0YsQ0FBQTtBQUpZLGdCQUFnQjtJQU41QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLElBQUksRUFBRTtZQUNKLG9CQUFvQixFQUFFLE1BQU07U0FDN0I7S0FDRixDQUFDOzZDQUUrQix1QkFBdUIsRUFBVyxVQUFVO0dBRGhFLGdCQUFnQixDQUk1QjtTQUpZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKlxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xyUG9wb3ZlckV2ZW50c1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9wb3BvdmVyLWV2ZW50cy5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NsclBvcG92ZXJBbmNob3JdJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuY2xyLWFuY2hvcl0nOiAndHJ1ZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsclBvcG92ZXJBbmNob3Ige1xuICBjb25zdHJ1Y3RvcihzbWFydEV2ZW50U2VydmljZTogQ2xyUG9wb3ZlckV2ZW50c1NlcnZpY2UsIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICBzbWFydEV2ZW50U2VydmljZS5hbmNob3JCdXR0b25SZWYgPSBlbGVtZW50O1xuICB9XG59XG4iXX0=