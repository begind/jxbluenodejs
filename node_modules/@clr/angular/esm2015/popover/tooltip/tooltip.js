import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { POPOVER_HOST_ANCHOR } from '../common/popover-host-anchor.token';
import { UNIQUE_ID_PROVIDER } from '../../utils/id-generator/id-generator.service';
import { TooltipIdService } from './providers/tooltip-id.service';
let ClrTooltip = class ClrTooltip {
};
ClrTooltip = tslib_1.__decorate([
    Component({
        selector: 'clr-tooltip',
        template: `
        <ng-content></ng-content>
    `,
        host: {
            '[class.tooltip]': 'true',
        },
        providers: [
            IfOpenService,
            { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef },
            // TODO: consider centralizing the unique id string on a service that provides ariaAttributes that need it
            // AriaService in layout/tabs/providers might be a good starting point.
            UNIQUE_ID_PROVIDER,
            TooltipIdService,
        ]
    })
], ClrTooltip);
export { ClrTooltip };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvdG9vbHRpcC90b29sdGlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBbUJsRSxJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFVO0NBQUcsQ0FBQTtBQUFiLFVBQVU7SUFqQnRCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFFBQVEsRUFBRTs7S0FFUDtRQUNILElBQUksRUFBRTtZQUNKLGlCQUFpQixFQUFFLE1BQU07U0FDMUI7UUFDRCxTQUFTLEVBQUU7WUFDVCxhQUFhO1lBQ2IsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRTtZQUN6RCwwR0FBMEc7WUFDMUcsdUVBQXVFO1lBQ3ZFLGtCQUFrQjtZQUNsQixnQkFBZ0I7U0FDakI7S0FDRixDQUFDO0dBQ1csVUFBVSxDQUFHO1NBQWIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSWZPcGVuU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLW9wZW4uc2VydmljZSc7XG5pbXBvcnQgeyBQT1BPVkVSX0hPU1RfQU5DSE9SIH0gZnJvbSAnLi4vY29tbW9uL3BvcG92ZXItaG9zdC1hbmNob3IudG9rZW4nO1xuaW1wb3J0IHsgVU5JUVVFX0lEX1BST1ZJREVSIH0gZnJvbSAnLi4vLi4vdXRpbHMvaWQtZ2VuZXJhdG9yL2lkLWdlbmVyYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IFRvb2x0aXBJZFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy90b29sdGlwLWlkLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItdG9vbHRpcCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy50b29sdGlwXSc6ICd0cnVlJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgSWZPcGVuU2VydmljZSxcbiAgICB7IHByb3ZpZGU6IFBPUE9WRVJfSE9TVF9BTkNIT1IsIHVzZUV4aXN0aW5nOiBFbGVtZW50UmVmIH0sXG4gICAgLy8gVE9ETzogY29uc2lkZXIgY2VudHJhbGl6aW5nIHRoZSB1bmlxdWUgaWQgc3RyaW5nIG9uIGEgc2VydmljZSB0aGF0IHByb3ZpZGVzIGFyaWFBdHRyaWJ1dGVzIHRoYXQgbmVlZCBpdFxuICAgIC8vIEFyaWFTZXJ2aWNlIGluIGxheW91dC90YWJzL3Byb3ZpZGVycyBtaWdodCBiZSBhIGdvb2Qgc3RhcnRpbmcgcG9pbnQuXG4gICAgVU5JUVVFX0lEX1BST1ZJREVSLFxuICAgIFRvb2x0aXBJZFNlcnZpY2UsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENsclRvb2x0aXAge31cbiJdfQ==