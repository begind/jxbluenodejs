/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { IfExpandService } from '../../utils/conditional/if-expanded.service';
import { VerticalNavGroupRegistrationService } from './providers/vertical-nav-group-registration.service';
import { VerticalNavGroupService } from './providers/vertical-nav-group.service';
import { VerticalNavService } from './providers/vertical-nav.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
const EXPANDED_STATE = 'expanded';
const COLLAPSED_STATE = 'collapsed';
let ClrVerticalNavGroup = class ClrVerticalNavGroup {
    constructor(_itemExpand, _navGroupRegistrationService, _navGroupService, _navService, commonStrings) {
        this._itemExpand = _itemExpand;
        this._navGroupRegistrationService = _navGroupRegistrationService;
        this._navGroupService = _navGroupService;
        this._navService = _navService;
        this.commonStrings = commonStrings;
        this.wasExpanded = false;
        this.expandedChange = new EventEmitter(true);
        this._subscriptions = [];
        this._expandAnimationState = COLLAPSED_STATE;
        this._navGroupRegistrationService.registerNavGroup();
        // FIXME: This subscription handles a corner case
        // Vertical Nav collapse requires the animation to run first and then
        // remove the nodes from the DOM. If the user directly sets the input
        // on the clrIfExpanded directive, we have no chance to run the animation
        // and wait for it to complete. This subscription makes sure that the
        // animation states are correct for that edge case.
        this._subscriptions.push(this._itemExpand.expandChange.subscribe(value => {
            if (value && this.expandAnimationState === COLLAPSED_STATE) {
                if (this._navService.collapsed) {
                    this._navService.collapsed = false;
                }
                this.expandAnimationState = EXPANDED_STATE;
            }
            else if (!value && this.expandAnimationState === EXPANDED_STATE) {
                this.expandAnimationState = COLLAPSED_STATE;
            }
        }));
        // 1. If the nav is collapsing, close the open nav group + save its state
        // 2. If the nav is expanding, expand the nav group if the previous state was expanded
        this._subscriptions.push(this._navService.animateOnCollapsed.subscribe((goingToCollapse) => {
            if (goingToCollapse && this.expanded) {
                this.wasExpanded = true;
                this.expandAnimationState = COLLAPSED_STATE;
            }
            else if (!goingToCollapse && this.wasExpanded) {
                this.expandGroup();
                this.wasExpanded = false;
            }
        }));
        // If a link is clicked, expand the nav group
        this._subscriptions.push(this._navGroupService.expandChange.subscribe((expand) => {
            if (expand && !this.expanded) {
                this.expandGroup();
            }
        }));
    }
    get expanded() {
        return this._itemExpand.expanded;
    }
    set expanded(value) {
        if (this._itemExpand.expanded !== value) {
            this._itemExpand.expanded = value;
            this.expandedChange.emit(value);
        }
    }
    set userExpandedInput(value) {
        value = !!value;
        if (this.expanded !== value) {
            // We have to call toggleExpand because some cases require animations to occur first
            // Directly setting the Expand service value skips the animation and can result in
            // nodes in the DOM but the nav group still being collapsed
            this.toggleExpand();
        }
    }
    expandGroup() {
        this.expanded = true;
        // Expanded animation occurs after Expand.expand is set to true
        this.expandAnimationState = EXPANDED_STATE;
    }
    collapseGroup() {
        // If a Vertical Nav Group toggle button is clicked while the Vertical Nav is in Collapsed state,
        // the Vertical Nav should be expanded first.
        this.expandAnimationState = COLLAPSED_STATE;
    }
    // closes a group after the collapse animation
    expandAnimationDone($event) {
        if ($event.toState === COLLAPSED_STATE) {
            this.expanded = false;
        }
    }
    get expandAnimationState() {
        return this._expandAnimationState;
    }
    set expandAnimationState(value) {
        if (value !== this._expandAnimationState) {
            this._expandAnimationState = value;
        }
    }
    toggleExpand() {
        if (this.expanded) {
            this.collapseGroup();
        }
        else {
            // If nav is collasped, first open the nav
            if (this._navService.collapsed) {
                this._navService.collapsed = false;
            }
            // then expand the nav group
            this.expandGroup();
        }
    }
    ngAfterContentInit() {
        // This makes sure that if someone marks a nav group expanded in a collapsed nav
        // the expanded property is switched back to collapsed state.
        if (this._navService.collapsed && this.expanded) {
            this.wasExpanded = true;
            this.expandAnimationState = COLLAPSED_STATE;
        }
    }
    ngOnDestroy() {
        this._subscriptions.forEach((sub) => sub.unsubscribe());
        this._navGroupRegistrationService.unregisterNavGroup();
    }
};
tslib_1.__decorate([
    HostBinding('class.is-expanded'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrVerticalNavGroup.prototype, "expanded", null);
tslib_1.__decorate([
    Input('clrVerticalNavGroupExpanded'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrVerticalNavGroup.prototype, "userExpandedInput", null);
tslib_1.__decorate([
    Output('clrVerticalNavGroupExpandedChange'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrVerticalNavGroup.prototype, "expandedChange", void 0);
ClrVerticalNavGroup = tslib_1.__decorate([
    Component({
        selector: 'clr-vertical-nav-group',
        template: "<!--\n  ~ Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div class=\"nav-group-content\">\n    <ng-content select=\"[clrVerticalNavLink]\"></ng-content>\n    <button\n        class=\"nav-group-trigger\"\n        type=\"button\"\n        (click)=\"toggleExpand()\">\n        <ng-content select=\"[clrVerticalNavIcon]\"></ng-content>\n        <div class=\"nav-group-text\">\n            <ng-content></ng-content>\n        </div>\n        <clr-icon shape=\"caret\"\n                  class=\"nav-group-trigger-icon\"\n                  [attr.dir]=\"(this.expanded) ? 'down' : 'right'\"\n                  [attr.title]=\"(this.expanded) ? commonStrings.keys.collapse : commonStrings.keys.expand\">\n        </clr-icon>\n    </button>\n</div>\n<!--TODO: This animation needs to be added to the clr-vertical-nav-group-children component-->\n<div class=\"nav-group-children\"\n     [@clrExpand]=\"expandAnimationState\"\n     (@clrExpand.done)=\"expandAnimationDone($event)\">\n    <ng-content select=\"[clrIfExpanded], clr-vertical-nav-group-children\"></ng-content>\n</div>\n",
        providers: [IfExpandService, VerticalNavGroupService],
        animations: [
            trigger('clrExpand', [
                state(EXPANDED_STATE, style({ height: '*' })),
                state(COLLAPSED_STATE, style({ height: 0, 'overflow-y': 'hidden', visibility: 'hidden' })),
                transition(`${EXPANDED_STATE} <=> ${COLLAPSED_STATE}`, animate('0.2s ease-in-out')),
            ]),
        ],
        host: { class: 'nav-group' }
    }),
    tslib_1.__metadata("design:paramtypes", [IfExpandService,
        VerticalNavGroupRegistrationService,
        VerticalNavGroupService,
        VerticalNavService,
        ClrCommonStringsService])
], ClrVerticalNavGroup);
export { ClrVerticalNavGroup };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2LWdyb3VwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3ZlcnRpY2FsLW5hdi92ZXJ0aWNhbC1uYXYtZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsT0FBTyxFQUFrQixLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRyxPQUFPLEVBQW9CLFNBQVMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHakgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBRTlFLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQzFHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRWxGLE1BQU0sY0FBYyxHQUFXLFVBQVUsQ0FBQztBQUMxQyxNQUFNLGVBQWUsR0FBVyxXQUFXLENBQUM7QUFlNUMsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFDOUIsWUFDVSxXQUE0QixFQUM1Qiw0QkFBaUUsRUFDakUsZ0JBQXlDLEVBQ3pDLFdBQStCLEVBQ2hDLGFBQXNDO1FBSnJDLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtRQUM1QixpQ0FBNEIsR0FBNUIsNEJBQTRCLENBQXFDO1FBQ2pFLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBeUI7UUFDekMsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQ2hDLGtCQUFhLEdBQWIsYUFBYSxDQUF5QjtRQStDdkMsZ0JBQVcsR0FBWSxLQUFLLENBQUM7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LEdBQWlCLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ3pELENBQUM7Q0FDRixDQUFBO0FBbkZDO0lBREMsV0FBVyxDQUFDLG1CQUFtQixDQUFDOzs7bURBR2hDO0FBVUQ7SUFEQyxLQUFLLENBQUMsNkJBQTZCLENBQUM7Ozs0REFTcEM7QUFFNEM7SUFBNUMsTUFBTSxDQUFDLG1DQUFtQyxDQUFDO3NDQUFpQixZQUFZOzJEQUE0QztBQTlFMUcsbUJBQW1CO0lBYi9CLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx3QkFBd0I7UUFDbEMsbXVDQUF3QztRQUN4QyxTQUFTLEVBQUUsQ0FBQyxlQUFlLEVBQUUsdUJBQXVCLENBQUM7UUFDckQsVUFBVSxFQUFFO1lBQ1YsT0FBTyxDQUFDLFdBQVcsRUFBRTtnQkFDbkIsS0FBSyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDN0MsS0FBSyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQzFGLFVBQVUsQ0FBQyxHQUFHLGNBQWMsUUFBUSxlQUFlLEVBQUUsRUFBRSxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUNwRixDQUFDO1NBQ0g7UUFDRCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFO0tBQzdCLENBQUM7NkNBR3VCLGVBQWU7UUFDRSxtQ0FBbUM7UUFDL0MsdUJBQXVCO1FBQzVCLGtCQUFrQjtRQUNqQix1QkFBdUI7R0FOcEMsbUJBQW1CLENBMkkvQjtTQTNJWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IGFuaW1hdGUsIEFuaW1hdGlvbkV2ZW50LCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSWZFeHBhbmRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtZXhwYW5kZWQuc2VydmljZSc7XG5cbmltcG9ydCB7IFZlcnRpY2FsTmF2R3JvdXBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdmVydGljYWwtbmF2LWdyb3VwLXJlZ2lzdHJhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFZlcnRpY2FsTmF2R3JvdXBTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdmVydGljYWwtbmF2LWdyb3VwLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmVydGljYWxOYXZTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdmVydGljYWwtbmF2LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLnNlcnZpY2UnO1xuXG5jb25zdCBFWFBBTkRFRF9TVEFURTogc3RyaW5nID0gJ2V4cGFuZGVkJztcbmNvbnN0IENPTExBUFNFRF9TVEFURTogc3RyaW5nID0gJ2NvbGxhcHNlZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci12ZXJ0aWNhbC1uYXYtZ3JvdXAnLFxuICB0ZW1wbGF0ZVVybDogJy4vdmVydGljYWwtbmF2LWdyb3VwLmh0bWwnLFxuICBwcm92aWRlcnM6IFtJZkV4cGFuZFNlcnZpY2UsIFZlcnRpY2FsTmF2R3JvdXBTZXJ2aWNlXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2NsckV4cGFuZCcsIFtcbiAgICAgIHN0YXRlKEVYUEFOREVEX1NUQVRFLCBzdHlsZSh7IGhlaWdodDogJyonIH0pKSxcbiAgICAgIHN0YXRlKENPTExBUFNFRF9TVEFURSwgc3R5bGUoeyBoZWlnaHQ6IDAsICdvdmVyZmxvdy15JzogJ2hpZGRlbicsIHZpc2liaWxpdHk6ICdoaWRkZW4nIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oYCR7RVhQQU5ERURfU1RBVEV9IDw9PiAke0NPTExBUFNFRF9TVEFURX1gLCBhbmltYXRlKCcwLjJzIGVhc2UtaW4tb3V0JykpLFxuICAgIF0pLFxuICBdLFxuICBob3N0OiB7IGNsYXNzOiAnbmF2LWdyb3VwJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJWZXJ0aWNhbE5hdkdyb3VwIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfaXRlbUV4cGFuZDogSWZFeHBhbmRTZXJ2aWNlLFxuICAgIHByaXZhdGUgX25hdkdyb3VwUmVnaXN0cmF0aW9uU2VydmljZTogVmVydGljYWxOYXZHcm91cFJlZ2lzdHJhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfbmF2R3JvdXBTZXJ2aWNlOiBWZXJ0aWNhbE5hdkdyb3VwU2VydmljZSxcbiAgICBwcml2YXRlIF9uYXZTZXJ2aWNlOiBWZXJ0aWNhbE5hdlNlcnZpY2UsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuX25hdkdyb3VwUmVnaXN0cmF0aW9uU2VydmljZS5yZWdpc3Rlck5hdkdyb3VwKCk7XG5cbiAgICAvLyBGSVhNRTogVGhpcyBzdWJzY3JpcHRpb24gaGFuZGxlcyBhIGNvcm5lciBjYXNlXG4gICAgLy8gVmVydGljYWwgTmF2IGNvbGxhcHNlIHJlcXVpcmVzIHRoZSBhbmltYXRpb24gdG8gcnVuIGZpcnN0IGFuZCB0aGVuXG4gICAgLy8gcmVtb3ZlIHRoZSBub2RlcyBmcm9tIHRoZSBET00uIElmIHRoZSB1c2VyIGRpcmVjdGx5IHNldHMgdGhlIGlucHV0XG4gICAgLy8gb24gdGhlIGNscklmRXhwYW5kZWQgZGlyZWN0aXZlLCB3ZSBoYXZlIG5vIGNoYW5jZSB0byBydW4gdGhlIGFuaW1hdGlvblxuICAgIC8vIGFuZCB3YWl0IGZvciBpdCB0byBjb21wbGV0ZS4gVGhpcyBzdWJzY3JpcHRpb24gbWFrZXMgc3VyZSB0aGF0IHRoZVxuICAgIC8vIGFuaW1hdGlvbiBzdGF0ZXMgYXJlIGNvcnJlY3QgZm9yIHRoYXQgZWRnZSBjYXNlLlxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuX2l0ZW1FeHBhbmQuZXhwYW5kQ2hhbmdlLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiB0aGlzLmV4cGFuZEFuaW1hdGlvblN0YXRlID09PSBDT0xMQVBTRURfU1RBVEUpIHtcbiAgICAgICAgICBpZiAodGhpcy5fbmF2U2VydmljZS5jb2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX25hdlNlcnZpY2UuY29sbGFwc2VkID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZXhwYW5kQW5pbWF0aW9uU3RhdGUgPSBFWFBBTkRFRF9TVEFURTtcbiAgICAgICAgfSBlbHNlIGlmICghdmFsdWUgJiYgdGhpcy5leHBhbmRBbmltYXRpb25TdGF0ZSA9PT0gRVhQQU5ERURfU1RBVEUpIHtcbiAgICAgICAgICB0aGlzLmV4cGFuZEFuaW1hdGlvblN0YXRlID0gQ09MTEFQU0VEX1NUQVRFO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICAvLyAxLiBJZiB0aGUgbmF2IGlzIGNvbGxhcHNpbmcsIGNsb3NlIHRoZSBvcGVuIG5hdiBncm91cCArIHNhdmUgaXRzIHN0YXRlXG4gICAgLy8gMi4gSWYgdGhlIG5hdiBpcyBleHBhbmRpbmcsIGV4cGFuZCB0aGUgbmF2IGdyb3VwIGlmIHRoZSBwcmV2aW91cyBzdGF0ZSB3YXMgZXhwYW5kZWRcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLl9uYXZTZXJ2aWNlLmFuaW1hdGVPbkNvbGxhcHNlZC5zdWJzY3JpYmUoKGdvaW5nVG9Db2xsYXBzZTogYm9vbGVhbikgPT4ge1xuICAgICAgICBpZiAoZ29pbmdUb0NvbGxhcHNlICYmIHRoaXMuZXhwYW5kZWQpIHtcbiAgICAgICAgICB0aGlzLndhc0V4cGFuZGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmV4cGFuZEFuaW1hdGlvblN0YXRlID0gQ09MTEFQU0VEX1NUQVRFO1xuICAgICAgICB9IGVsc2UgaWYgKCFnb2luZ1RvQ29sbGFwc2UgJiYgdGhpcy53YXNFeHBhbmRlZCkge1xuICAgICAgICAgIHRoaXMuZXhwYW5kR3JvdXAoKTtcbiAgICAgICAgICB0aGlzLndhc0V4cGFuZGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIC8vIElmIGEgbGluayBpcyBjbGlja2VkLCBleHBhbmQgdGhlIG5hdiBncm91cFxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuX25hdkdyb3VwU2VydmljZS5leHBhbmRDaGFuZ2Uuc3Vic2NyaWJlKChleHBhbmQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgaWYgKGV4cGFuZCAmJiAhdGhpcy5leHBhbmRlZCkge1xuICAgICAgICAgIHRoaXMuZXhwYW5kR3JvdXAoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSB3YXNFeHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaXMtZXhwYW5kZWQnKVxuICBnZXQgZXhwYW5kZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1FeHBhbmQuZXhwYW5kZWQ7XG4gIH1cblxuICBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5faXRlbUV4cGFuZC5leHBhbmRlZCAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2l0ZW1FeHBhbmQuZXhwYW5kZWQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuZXhwYW5kZWRDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCdjbHJWZXJ0aWNhbE5hdkdyb3VwRXhwYW5kZWQnKVxuICBzZXQgdXNlckV4cGFuZGVkSW5wdXQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgaWYgKHRoaXMuZXhwYW5kZWQgIT09IHZhbHVlKSB7XG4gICAgICAvLyBXZSBoYXZlIHRvIGNhbGwgdG9nZ2xlRXhwYW5kIGJlY2F1c2Ugc29tZSBjYXNlcyByZXF1aXJlIGFuaW1hdGlvbnMgdG8gb2NjdXIgZmlyc3RcbiAgICAgIC8vIERpcmVjdGx5IHNldHRpbmcgdGhlIEV4cGFuZCBzZXJ2aWNlIHZhbHVlIHNraXBzIHRoZSBhbmltYXRpb24gYW5kIGNhbiByZXN1bHQgaW5cbiAgICAgIC8vIG5vZGVzIGluIHRoZSBET00gYnV0IHRoZSBuYXYgZ3JvdXAgc3RpbGwgYmVpbmcgY29sbGFwc2VkXG4gICAgICB0aGlzLnRvZ2dsZUV4cGFuZCgpO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsclZlcnRpY2FsTmF2R3JvdXBFeHBhbmRlZENoYW5nZScpIGV4cGFuZGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KHRydWUpO1xuXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgcHJpdmF0ZSBfZXhwYW5kQW5pbWF0aW9uU3RhdGU6IHN0cmluZyA9IENPTExBUFNFRF9TVEFURTtcblxuICBleHBhbmRHcm91cCgpOiB2b2lkIHtcbiAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcbiAgICAvLyBFeHBhbmRlZCBhbmltYXRpb24gb2NjdXJzIGFmdGVyIEV4cGFuZC5leHBhbmQgaXMgc2V0IHRvIHRydWVcbiAgICB0aGlzLmV4cGFuZEFuaW1hdGlvblN0YXRlID0gRVhQQU5ERURfU1RBVEU7XG4gIH1cblxuICBjb2xsYXBzZUdyb3VwKCk6IHZvaWQge1xuICAgIC8vIElmIGEgVmVydGljYWwgTmF2IEdyb3VwIHRvZ2dsZSBidXR0b24gaXMgY2xpY2tlZCB3aGlsZSB0aGUgVmVydGljYWwgTmF2IGlzIGluIENvbGxhcHNlZCBzdGF0ZSxcbiAgICAvLyB0aGUgVmVydGljYWwgTmF2IHNob3VsZCBiZSBleHBhbmRlZCBmaXJzdC5cbiAgICB0aGlzLmV4cGFuZEFuaW1hdGlvblN0YXRlID0gQ09MTEFQU0VEX1NUQVRFO1xuICB9XG5cbiAgLy8gY2xvc2VzIGEgZ3JvdXAgYWZ0ZXIgdGhlIGNvbGxhcHNlIGFuaW1hdGlvblxuICBleHBhbmRBbmltYXRpb25Eb25lKCRldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICBpZiAoJGV2ZW50LnRvU3RhdGUgPT09IENPTExBUFNFRF9TVEFURSkge1xuICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGdldCBleHBhbmRBbmltYXRpb25TdGF0ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9leHBhbmRBbmltYXRpb25TdGF0ZTtcbiAgfVxuXG4gIHNldCBleHBhbmRBbmltYXRpb25TdGF0ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9leHBhbmRBbmltYXRpb25TdGF0ZSkge1xuICAgICAgdGhpcy5fZXhwYW5kQW5pbWF0aW9uU3RhdGUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVFeHBhbmQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZXhwYW5kZWQpIHtcbiAgICAgIHRoaXMuY29sbGFwc2VHcm91cCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiBuYXYgaXMgY29sbGFzcGVkLCBmaXJzdCBvcGVuIHRoZSBuYXZcbiAgICAgIGlmICh0aGlzLl9uYXZTZXJ2aWNlLmNvbGxhcHNlZCkge1xuICAgICAgICB0aGlzLl9uYXZTZXJ2aWNlLmNvbGxhcHNlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gdGhlbiBleHBhbmQgdGhlIG5hdiBncm91cFxuICAgICAgdGhpcy5leHBhbmRHcm91cCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAvLyBUaGlzIG1ha2VzIHN1cmUgdGhhdCBpZiBzb21lb25lIG1hcmtzIGEgbmF2IGdyb3VwIGV4cGFuZGVkIGluIGEgY29sbGFwc2VkIG5hdlxuICAgIC8vIHRoZSBleHBhbmRlZCBwcm9wZXJ0eSBpcyBzd2l0Y2hlZCBiYWNrIHRvIGNvbGxhcHNlZCBzdGF0ZS5cbiAgICBpZiAodGhpcy5fbmF2U2VydmljZS5jb2xsYXBzZWQgJiYgdGhpcy5leHBhbmRlZCkge1xuICAgICAgdGhpcy53YXNFeHBhbmRlZCA9IHRydWU7XG4gICAgICB0aGlzLmV4cGFuZEFuaW1hdGlvblN0YXRlID0gQ09MTEFQU0VEX1NUQVRFO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3ViOiBTdWJzY3JpcHRpb24pID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgICB0aGlzLl9uYXZHcm91cFJlZ2lzdHJhdGlvblNlcnZpY2UudW5yZWdpc3Rlck5hdkdyb3VwKCk7XG4gIH1cbn1cbiJdfQ==