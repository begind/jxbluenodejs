import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChildren, Inject, QueryList, Input, HostBinding, ViewContainerRef, ViewChild, PLATFORM_ID, } from '@angular/core';
import { IfActiveService } from '../../utils/conditional/if-active.service';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { TabsService } from './providers/tabs.service';
import { ClrTab } from './tab';
import { TABS_ID, TABS_ID_PROVIDER } from './tabs-id.provider';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { TabsLayout } from './enums/tabs-layout.enum';
import { ClrKeyFocus } from '../../utils/focus/key-focus/key-focus';
import { startWith, filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
var ClrTabs = /** @class */ (function () {
    function ClrTabs(ifActiveService, ifOpenService, tabsService, tabsId, commonStrings, platformId) {
        this.ifActiveService = ifActiveService;
        this.ifOpenService = ifOpenService;
        this.tabsService = tabsService;
        this.tabsId = tabsId;
        this.commonStrings = commonStrings;
        this.platformId = platformId;
        this.subscriptions = [];
        this._tabLinkDirectives = [];
        this.tabLinkElements = [];
    }
    Object.defineProperty(ClrTabs.prototype, "overflowPosition", {
        get: function () {
            return this._tabLinkDirectives.filter(function (link) { return !link.inOverflow; }).length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "tabContentViewContainer", {
        /* tslint:disable:no-unused-variable */
        set: function (value) {
            this.tabsService.tabContentViewContainer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "layout", {
        get: function () {
            return this.tabsService.layout;
        },
        /* tslint:enable:no-unused-variable */
        set: function (layout) {
            if (Object.keys(TabsLayout)
                .map(function (key) {
                return TabsLayout[key];
            })
                .indexOf(layout) >= 0) {
                this.tabsService.layout = layout;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "tabLinkDirectives", {
        get: function () {
            return this._tabLinkDirectives;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "activeTabInOverflow", {
        get: function () {
            return this.tabsService.overflowTabs.indexOf(this.tabsService.activeTab) > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "tabIds", {
        get: function () {
            return this.tabsService.children.map(function (tab) { return tab.tabLink.tabLinkId; }).join(' ');
        },
        enumerable: true,
        configurable: true
    });
    ClrTabs.prototype.ngAfterContentInit = function () {
        this.subscriptions.push(this.listenForTabLinkChanges(), this.listenForOverflowMenuFocusChanges());
        if (typeof this.ifActiveService.current === 'undefined' && this.tabLinkDirectives[0]) {
            this.tabLinkDirectives[0].activate();
        }
    };
    ClrTabs.prototype.toggleOverflow = function (event) {
        this.ifOpenService.toggleWithEvent(event);
    };
    ClrTabs.prototype.checkFocusVisible = function () {
        if (!this.ifOpenService.open && this.inOverflow()) {
            this.ifOpenService.open = true;
        }
        else if (this.ifOpenService.open && !this.inOverflow()) {
            this.ifOpenService.open = false;
        }
    };
    ClrTabs.prototype.inOverflow = function () {
        return (this.tabLinkElements.indexOf(document.activeElement) > -1 &&
            this.keyFocus.current >= this.overflowPosition);
    };
    Object.defineProperty(ClrTabs.prototype, "isVertical", {
        get: function () {
            return this.layout === TabsLayout.VERTICAL;
        },
        enumerable: true,
        configurable: true
    });
    ClrTabs.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    ClrTabs.prototype.listenForTabLinkChanges = function () {
        var _this = this;
        return this.tabs.changes.pipe(startWith(this.tabs.map(function (tab) { return tab.tabLink; }))).subscribe(function () {
            _this._tabLinkDirectives = _this.tabs.map(function (tab) { return tab.tabLink; });
            _this.tabLinkElements = _this._tabLinkDirectives.map(function (tab) { return tab.el.nativeElement; });
        });
    };
    ClrTabs.prototype.listenForOverflowMenuFocusChanges = function () {
        var _this = this;
        return this.ifOpenService.openChange.pipe(filter(function () { return isPlatformBrowser(_this.platformId); })).subscribe(function (open) {
            if (open && !_this.inOverflow()) {
                _this.focusToFirstItemInOverflow();
            }
            else if (!open && _this.nextFocusedItemIsNotInOverflow()) {
                _this.keyFocus.resetTabFocus();
            }
        });
    };
    ClrTabs.prototype.focusToFirstItemInOverflow = function () {
        this.keyFocus.moveTo(this.overflowPosition);
    };
    ClrTabs.prototype.nextFocusedItemIsNotInOverflow = function () {
        return this.tabLinkElements.find(function (e) { return e === document.activeElement; }) === undefined;
    };
    tslib_1.__decorate([
        ViewChild('tabContentViewContainer', { static: true, read: ViewContainerRef }),
        tslib_1.__metadata("design:type", ViewContainerRef),
        tslib_1.__metadata("design:paramtypes", [ViewContainerRef])
    ], ClrTabs.prototype, "tabContentViewContainer", null);
    tslib_1.__decorate([
        Input('clrLayout'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ClrTabs.prototype, "layout", null);
    tslib_1.__decorate([
        ContentChildren(ClrTab),
        tslib_1.__metadata("design:type", QueryList)
    ], ClrTabs.prototype, "tabs", void 0);
    tslib_1.__decorate([
        ViewChild(ClrKeyFocus, { static: true }),
        tslib_1.__metadata("design:type", ClrKeyFocus)
    ], ClrTabs.prototype, "keyFocus", void 0);
    tslib_1.__decorate([
        HostBinding('class.tabs-vertical'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrTabs.prototype, "isVertical", null);
    ClrTabs = tslib_1.__decorate([
        Component({
            selector: 'clr-tabs',
            template: "\n        <ul class=\"nav\" role=\"tablist\" [attr.aria-owns]=\"tabIds\" [clrKeyFocus]=\"tabLinkElements\" clrDirection=\"both\"\n            (clrFocusChange)=\"checkFocusVisible()\">\n            <!--tab links-->\n            <ng-container *ngFor=\"let link of tabLinkDirectives\">\n                <ng-container *ngIf=\"link.tabsId === tabsId && !link.inOverflow\">\n                    <li role=\"presentation\" class=\"nav-item\">\n                        <ng-container [ngTemplateOutlet]=\"link.templateRefContainer.template\"></ng-container>\n                    </li>\n                </ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"tabsService.overflowTabs.length > 0\">\n                <div class=\"tabs-overflow bottom-right\" [class.open]=\"ifOpenService.open\" role=\"presentation\">\n                    <li role=\"application\" class=\"nav-item\" (click)=\"toggleOverflow($event)\">\n                        <button class=\"btn btn-link nav-link dropdown-toggle\" type=\"button\" aria-hidden=\"true\"\n                                [class.active]=\"activeTabInOverflow\" [class.open]=\"inOverflow()\" tabIndex=\"-1\">\n                            <clr-icon shape=\"ellipsis-horizontal\"\n                              [class.is-info]=\"ifOpenService.open\"\n                              [attr.title]=\"commonStrings.keys.more\"></clr-icon>\n                        </button>\n                    </li>\n                    <!--tab links in overflow menu-->\n                    <clr-tab-overflow-content>\n                        <ng-container *ngFor=\"let link of tabLinkDirectives\">\n                            <ng-container *ngIf=\"link.tabsId === tabsId && link.inOverflow\"\n                                          [ngTemplateOutlet]=\"link.templateRefContainer.template\">\n                            </ng-container>\n                        </ng-container>\n                    </clr-tab-overflow-content>\n                </div>\n            </ng-container>\n        </ul>\n        <ng-container #tabContentViewContainer></ng-container>\n    ",
            providers: [IfActiveService, IfOpenService, TabsService, TABS_ID_PROVIDER]
        }),
        tslib_1.__param(3, Inject(TABS_ID)),
        tslib_1.__param(5, Inject(PLATFORM_ID)),
        tslib_1.__metadata("design:paramtypes", [IfActiveService,
            IfOpenService,
            TabsService, Number, ClrCommonStringsService,
            Object])
    ], ClrTabs);
    return ClrTabs;
}());
export { ClrTabs };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImxheW91dC90YWJzL3RhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBRUwsU0FBUyxFQUNULGVBQWUsRUFDZixNQUFNLEVBQ04sU0FBUyxFQUNULEtBQUssRUFFTCxXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCxXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUV4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUUvQixPQUFPLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXRELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBd0NwRDtJQXlDRSxpQkFDUyxlQUFnQyxFQUNoQyxhQUE0QixFQUM1QixXQUF3QixFQUNQLE1BQWMsRUFDL0IsYUFBc0MsRUFDaEIsVUFBa0I7UUFMeEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ1AsV0FBTSxHQUFOLE1BQU0sQ0FB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QUM7Ozs2Q0FHbEM7SUF4RlUsT0FBTztRQXRDbkIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLDJqRUFpQ1A7WUFDSCxTQUFTLEVBQUUsQ0FBQyxlQUFlLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQztTQUMzRSxDQUFDO1FBOENHLG1CQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUVmLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtpREFMSSxlQUFlO1lBQ2pCLGFBQWE7WUFDZixXQUFXLFVBRVQsdUJBQXVCO1lBQ0osTUFBTTtPQS9DdEMsT0FBTyxDQXdIbkI7SUFBRCxjQUFDO0NBQUEsQUF4SEQsSUF3SEM7U0F4SFksT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBJbmplY3QsXG4gIFF1ZXJ5TGlzdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgSG9zdEJpbmRpbmcsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdDaGlsZCxcbiAgUExBVEZPUk1fSUQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJZkFjdGl2ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1hY3RpdmUuc2VydmljZSc7XG5pbXBvcnQgeyBJZk9wZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtb3Blbi5zZXJ2aWNlJztcblxuaW1wb3J0IHsgVGFic1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy90YWJzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyVGFiIH0gZnJvbSAnLi90YWInO1xuaW1wb3J0IHsgQ2xyVGFiTGluayB9IGZyb20gJy4vdGFiLWxpbmsuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRBQlNfSUQsIFRBQlNfSURfUFJPVklERVIgfSBmcm9tICcuL3RhYnMtaWQucHJvdmlkZXInO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGFic0xheW91dCB9IGZyb20gJy4vZW51bXMvdGFicy1sYXlvdXQuZW51bSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENscktleUZvY3VzIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9jdXMva2V5LWZvY3VzL2tleS1mb2N1cyc7XG5pbXBvcnQgeyBzdGFydFdpdGgsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXRhYnMnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8dWwgY2xhc3M9XCJuYXZcIiByb2xlPVwidGFibGlzdFwiIFthdHRyLmFyaWEtb3duc109XCJ0YWJJZHNcIiBbY2xyS2V5Rm9jdXNdPVwidGFiTGlua0VsZW1lbnRzXCIgY2xyRGlyZWN0aW9uPVwiYm90aFwiXG4gICAgICAgICAgICAoY2xyRm9jdXNDaGFuZ2UpPVwiY2hlY2tGb2N1c1Zpc2libGUoKVwiPlxuICAgICAgICAgICAgPCEtLXRhYiBsaW5rcy0tPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbGluayBvZiB0YWJMaW5rRGlyZWN0aXZlc1wiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsaW5rLnRhYnNJZCA9PT0gdGFic0lkICYmICFsaW5rLmluT3ZlcmZsb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxpbmsudGVtcGxhdGVSZWZDb250YWluZXIudGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRhYnNTZXJ2aWNlLm92ZXJmbG93VGFicy5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYnMtb3ZlcmZsb3cgYm90dG9tLXJpZ2h0XCIgW2NsYXNzLm9wZW5dPVwiaWZPcGVuU2VydmljZS5vcGVuXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgcm9sZT1cImFwcGxpY2F0aW9uXCIgY2xhc3M9XCJuYXYtaXRlbVwiIChjbGljayk9XCJ0b2dnbGVPdmVyZmxvdygkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1saW5rIG5hdi1saW5rIGRyb3Bkb3duLXRvZ2dsZVwiIHR5cGU9XCJidXR0b25cIiBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImFjdGl2ZVRhYkluT3ZlcmZsb3dcIiBbY2xhc3Mub3Blbl09XCJpbk92ZXJmbG93KClcIiB0YWJJbmRleD1cIi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiZWxsaXBzaXMtaG9yaXpvbnRhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuaXMtaW5mb109XCJpZk9wZW5TZXJ2aWNlLm9wZW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5rZXlzLm1vcmVcIj48L2Nsci1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwhLS10YWIgbGlua3MgaW4gb3ZlcmZsb3cgbWVudS0tPlxuICAgICAgICAgICAgICAgICAgICA8Y2xyLXRhYi1vdmVyZmxvdy1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbGluayBvZiB0YWJMaW5rRGlyZWN0aXZlc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsaW5rLnRhYnNJZCA9PT0gdGFic0lkICYmIGxpbmsuaW5PdmVyZmxvd1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJsaW5rLnRlbXBsYXRlUmVmQ29udGFpbmVyLnRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9jbHItdGFiLW92ZXJmbG93LWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC91bD5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAjdGFiQ29udGVudFZpZXdDb250YWluZXI+PC9uZy1jb250YWluZXI+XG4gICAgYCxcbiAgcHJvdmlkZXJzOiBbSWZBY3RpdmVTZXJ2aWNlLCBJZk9wZW5TZXJ2aWNlLCBUYWJzU2VydmljZSwgVEFCU19JRF9QUk9WSURFUl0sXG59KVxuZXhwb3J0IGNsYXNzIENsclRhYnMgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHByaXZhdGUgZ2V0IG92ZXJmbG93UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RhYkxpbmtEaXJlY3RpdmVzLmZpbHRlcihsaW5rID0+ICFsaW5rLmluT3ZlcmZsb3cpLmxlbmd0aDtcbiAgfVxuXG4gIC8qIHRzbGludDpkaXNhYmxlOm5vLXVudXNlZC12YXJpYWJsZSAqL1xuICBAVmlld0NoaWxkKCd0YWJDb250ZW50Vmlld0NvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlLCByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIHByaXZhdGUgc2V0IHRhYkNvbnRlbnRWaWV3Q29udGFpbmVyKHZhbHVlOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgdGhpcy50YWJzU2VydmljZS50YWJDb250ZW50Vmlld0NvbnRhaW5lciA9IHZhbHVlO1xuICB9XG4gIC8qIHRzbGludDplbmFibGU6bm8tdW51c2VkLXZhcmlhYmxlICovXG5cbiAgQElucHV0KCdjbHJMYXlvdXQnKVxuICBzZXQgbGF5b3V0KGxheW91dDogVGFic0xheW91dCkge1xuICAgIGlmIChcbiAgICAgIE9iamVjdC5rZXlzKFRhYnNMYXlvdXQpXG4gICAgICAgIC5tYXAoa2V5ID0+IHtcbiAgICAgICAgICByZXR1cm4gVGFic0xheW91dFtrZXldO1xuICAgICAgICB9KVxuICAgICAgICAuaW5kZXhPZihsYXlvdXQpID49IDBcbiAgICApIHtcbiAgICAgIHRoaXMudGFic1NlcnZpY2UubGF5b3V0ID0gbGF5b3V0O1xuICAgIH1cbiAgfVxuICBnZXQgbGF5b3V0KCk6IFRhYnNMYXlvdXQge1xuICAgIHJldHVybiB0aGlzLnRhYnNTZXJ2aWNlLmxheW91dDtcbiAgfVxuXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xyVGFiKSBwcml2YXRlIHRhYnM6IFF1ZXJ5TGlzdDxDbHJUYWI+O1xuXG4gIHByaXZhdGUgX3RhYkxpbmtEaXJlY3RpdmVzOiBDbHJUYWJMaW5rW10gPSBbXTtcbiAgZ2V0IHRhYkxpbmtEaXJlY3RpdmVzKCk6IENsclRhYkxpbmtbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3RhYkxpbmtEaXJlY3RpdmVzO1xuICB9XG5cbiAgdGFiTGlua0VsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG5cbiAgQFZpZXdDaGlsZChDbHJLZXlGb2N1cywgeyBzdGF0aWM6IHRydWUgfSlcbiAga2V5Rm9jdXM6IENscktleUZvY3VzO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpZkFjdGl2ZVNlcnZpY2U6IElmQWN0aXZlU2VydmljZSxcbiAgICBwdWJsaWMgaWZPcGVuU2VydmljZTogSWZPcGVuU2VydmljZSxcbiAgICBwdWJsaWMgdGFic1NlcnZpY2U6IFRhYnNTZXJ2aWNlLFxuICAgIEBJbmplY3QoVEFCU19JRCkgcHVibGljIHRhYnNJZDogbnVtYmVyLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzU2VydmljZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdFxuICApIHt9XG5cbiAgZ2V0IGFjdGl2ZVRhYkluT3ZlcmZsb3coKSB7XG4gICAgcmV0dXJuIHRoaXMudGFic1NlcnZpY2Uub3ZlcmZsb3dUYWJzLmluZGV4T2YodGhpcy50YWJzU2VydmljZS5hY3RpdmVUYWIpID4gLTE7XG4gIH1cblxuICBnZXQgdGFiSWRzKCkge1xuICAgIHJldHVybiB0aGlzLnRhYnNTZXJ2aWNlLmNoaWxkcmVuLm1hcCh0YWIgPT4gdGFiLnRhYkxpbmsudGFiTGlua0lkKS5qb2luKCcgJyk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5saXN0ZW5Gb3JUYWJMaW5rQ2hhbmdlcygpLCB0aGlzLmxpc3RlbkZvck92ZXJmbG93TWVudUZvY3VzQ2hhbmdlcygpKTtcblxuICAgIGlmICh0eXBlb2YgdGhpcy5pZkFjdGl2ZVNlcnZpY2UuY3VycmVudCA9PT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy50YWJMaW5rRGlyZWN0aXZlc1swXSkge1xuICAgICAgdGhpcy50YWJMaW5rRGlyZWN0aXZlc1swXS5hY3RpdmF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZU92ZXJmbG93KGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmlmT3BlblNlcnZpY2UudG9nZ2xlV2l0aEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIGNoZWNrRm9jdXNWaXNpYmxlKCkge1xuICAgIGlmICghdGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW4gJiYgdGhpcy5pbk92ZXJmbG93KCkpIHtcbiAgICAgIHRoaXMuaWZPcGVuU2VydmljZS5vcGVuID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaWZPcGVuU2VydmljZS5vcGVuICYmICF0aGlzLmluT3ZlcmZsb3coKSkge1xuICAgICAgdGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW4gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpbk92ZXJmbG93KCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnRhYkxpbmtFbGVtZW50cy5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpID4gLTEgJiZcbiAgICAgIHRoaXMua2V5Rm9jdXMuY3VycmVudCA+PSB0aGlzLm92ZXJmbG93UG9zaXRpb25cbiAgICApO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50YWJzLXZlcnRpY2FsJylcbiAgZ2V0IGlzVmVydGljYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMubGF5b3V0ID09PSBUYWJzTGF5b3V0LlZFUlRJQ0FMO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHtcbiAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JUYWJMaW5rQ2hhbmdlcygpIHtcbiAgICByZXR1cm4gdGhpcy50YWJzLmNoYW5nZXMucGlwZShzdGFydFdpdGgodGhpcy50YWJzLm1hcCh0YWIgPT4gdGFiLnRhYkxpbmspKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX3RhYkxpbmtEaXJlY3RpdmVzID0gdGhpcy50YWJzLm1hcCh0YWIgPT4gdGFiLnRhYkxpbmspO1xuICAgICAgdGhpcy50YWJMaW5rRWxlbWVudHMgPSB0aGlzLl90YWJMaW5rRGlyZWN0aXZlcy5tYXAodGFiID0+IHRhYi5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9yT3ZlcmZsb3dNZW51Rm9jdXNDaGFuZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbkNoYW5nZS5waXBlKGZpbHRlcigoKSA9PiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSkuc3Vic2NyaWJlKG9wZW4gPT4ge1xuICAgICAgaWYgKG9wZW4gJiYgIXRoaXMuaW5PdmVyZmxvdygpKSB7XG4gICAgICAgIHRoaXMuZm9jdXNUb0ZpcnN0SXRlbUluT3ZlcmZsb3coKTtcbiAgICAgIH0gZWxzZSBpZiAoIW9wZW4gJiYgdGhpcy5uZXh0Rm9jdXNlZEl0ZW1Jc05vdEluT3ZlcmZsb3coKSkge1xuICAgICAgICB0aGlzLmtleUZvY3VzLnJlc2V0VGFiRm9jdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZm9jdXNUb0ZpcnN0SXRlbUluT3ZlcmZsb3coKSB7XG4gICAgdGhpcy5rZXlGb2N1cy5tb3ZlVG8odGhpcy5vdmVyZmxvd1Bvc2l0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgbmV4dEZvY3VzZWRJdGVtSXNOb3RJbk92ZXJmbG93KCkge1xuICAgIHJldHVybiB0aGlzLnRhYkxpbmtFbGVtZW50cy5maW5kKGUgPT4gZSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgPT09IHVuZGVmaW5lZDtcbiAgfVxufVxuIl19