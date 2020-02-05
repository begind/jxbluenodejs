import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ChangeDetectorRef, Component, ElementRef, Input, Optional, SkipSelf } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { POPOVER_HOST_ANCHOR } from '../common/popover-host-anchor.token';
import { DROPDOWN_FOCUS_HANDLER_PROVIDER } from './providers/dropdown-focus-handler.service';
import { FOCUS_SERVICE_PROVIDER } from '../../utils/focus/focus.service';
import { ROOT_DROPDOWN_PROVIDER, RootDropdownService } from './providers/dropdown.service';
var ClrDropdown = /** @class */ (function () {
    function ClrDropdown(parent, ifOpenService, cdr, dropdownService) {
        var _this = this;
        this.parent = parent;
        this.ifOpenService = ifOpenService;
        this.cdr = cdr;
        this.subscriptions = [];
        this.isMenuClosable = true;
        this.subscriptions.push(dropdownService.changes.subscribe(function (value) { return (_this.ifOpenService.open = value); }));
        this.subscriptions.push(ifOpenService.openChange.subscribe(function (value) { return _this.cdr.markForCheck(); }));
    }
    ClrDropdown.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    tslib_1.__decorate([
        Input('clrCloseMenuOnItemClick'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrDropdown.prototype, "isMenuClosable", void 0);
    ClrDropdown = tslib_1.__decorate([
        Component({
            selector: 'clr-dropdown',
            template: '<ng-content></ng-content>',
            host: {
                '[class.dropdown]': 'true',
                // the open class, also used in static version, is always present in the Angular version
                // Angular takes care of hiding it, regardless of whether you use *clrIfOpen or not
                '[class.open]': 'true',
            },
            providers: [
                IfOpenService,
                ROOT_DROPDOWN_PROVIDER,
                { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef },
                FOCUS_SERVICE_PROVIDER,
                DROPDOWN_FOCUS_HANDLER_PROVIDER,
            ]
        }),
        tslib_1.__param(0, SkipSelf()),
        tslib_1.__param(0, Optional()),
        tslib_1.__metadata("design:paramtypes", [ClrDropdown,
            IfOpenService,
            ChangeDetectorRef,
            RootDropdownService])
    ], ClrDropdown);
    return ClrDropdown;
}());
export { ClrDropdown };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJwb3BvdmVyL2Ryb3Bkb3duL2Ryb3Bkb3duLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHL0csT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzdGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRXpFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBbUIzRjtJQUdFLHFCQUdTLE1BQW1CLEVBQ25CLGFBQTRCLEVBQzNCLEdBQXNCLEVBQzlCLGVBQW9DO1FBTnRDLGlCQVVDO1FBUFEsV0FBTSxHQUFOLE1BQU0sQ0FBYTtRQUNuQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMzQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQVB4QixrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFjVCxtQkFBYyxHQUFZLElBQUksQ0FBQztRQUovRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUlELGlDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFKaUM7UUFBakMsS0FBSyxDQUFDLHlCQUF5QixDQUFDOzt1REFBZ0M7SUFmdEQsV0FBVztRQWpCdkIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGNBQWM7WUFDeEIsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxJQUFJLEVBQUU7Z0JBQ0osa0JBQWtCLEVBQUUsTUFBTTtnQkFDMUIsd0ZBQXdGO2dCQUN4RixtRkFBbUY7Z0JBQ25GLGNBQWMsRUFBRSxNQUFNO2FBQ3ZCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGFBQWE7Z0JBQ2Isc0JBQXNCO2dCQUN0QixFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFO2dCQUN6RCxzQkFBc0I7Z0JBQ3RCLCtCQUErQjthQUNoQztTQUNGLENBQUM7UUFLRyxtQkFBQSxRQUFRLEVBQUUsQ0FBQTtRQUNWLG1CQUFBLFFBQVEsRUFBRSxDQUFBO2lEQUNJLFdBQVc7WUFDSixhQUFhO1lBQ3RCLGlCQUFpQjtZQUNiLG1CQUFtQjtPQVQzQixXQUFXLENBb0J2QjtJQUFELGtCQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FwQlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IElmT3BlblNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1vcGVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgUE9QT1ZFUl9IT1NUX0FOQ0hPUiB9IGZyb20gJy4uL2NvbW1vbi9wb3BvdmVyLWhvc3QtYW5jaG9yLnRva2VuJztcbmltcG9ydCB7IERST1BET1dOX0ZPQ1VTX0hBTkRMRVJfUFJPVklERVIgfSBmcm9tICcuL3Byb3ZpZGVycy9kcm9wZG93bi1mb2N1cy1oYW5kbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRk9DVVNfU0VSVklDRV9QUk9WSURFUiB9IGZyb20gJy4uLy4uL3V0aWxzL2ZvY3VzL2ZvY3VzLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBST09UX0RST1BET1dOX1BST1ZJREVSLCBSb290RHJvcGRvd25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZHJvcGRvd24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kcm9wZG93bicsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRyb3Bkb3duXSc6ICd0cnVlJyxcbiAgICAvLyB0aGUgb3BlbiBjbGFzcywgYWxzbyB1c2VkIGluIHN0YXRpYyB2ZXJzaW9uLCBpcyBhbHdheXMgcHJlc2VudCBpbiB0aGUgQW5ndWxhciB2ZXJzaW9uXG4gICAgLy8gQW5ndWxhciB0YWtlcyBjYXJlIG9mIGhpZGluZyBpdCwgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHlvdSB1c2UgKmNscklmT3BlbiBvciBub3RcbiAgICAnW2NsYXNzLm9wZW5dJzogJ3RydWUnLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICBJZk9wZW5TZXJ2aWNlLFxuICAgIFJPT1RfRFJPUERPV05fUFJPVklERVIsXG4gICAgeyBwcm92aWRlOiBQT1BPVkVSX0hPU1RfQU5DSE9SLCB1c2VFeGlzdGluZzogRWxlbWVudFJlZiB9LFxuICAgIEZPQ1VTX1NFUlZJQ0VfUFJPVklERVIsXG4gICAgRFJPUERPV05fRk9DVVNfSEFORExFUl9QUk9WSURFUixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRHJvcGRvd24gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQFNraXBTZWxmKClcbiAgICBAT3B0aW9uYWwoKVxuICAgIHB1YmxpYyBwYXJlbnQ6IENsckRyb3Bkb3duLFxuICAgIHB1YmxpYyBpZk9wZW5TZXJ2aWNlOiBJZk9wZW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBkcm9wZG93blNlcnZpY2U6IFJvb3REcm9wZG93blNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZHJvcGRvd25TZXJ2aWNlLmNoYW5nZXMuc3Vic2NyaWJlKHZhbHVlID0+ICh0aGlzLmlmT3BlblNlcnZpY2Uub3BlbiA9IHZhbHVlKSkpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGlmT3BlblNlcnZpY2Uub3BlbkNoYW5nZS5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy5jZHIubWFya0ZvckNoZWNrKCkpKTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyQ2xvc2VNZW51T25JdGVtQ2xpY2snKSBpc01lbnVDbG9zYWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19