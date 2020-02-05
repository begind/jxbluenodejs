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
let ClrTabs = class ClrTabs {
    constructor(ifActiveService, ifOpenService, tabsService, tabsId, commonStrings, platformId) {
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
    get overflowPosition() {
        return this._tabLinkDirectives.filter(link => !link.inOverflow).length;
    }
    /* tslint:disable:no-unused-variable */
    set tabContentViewContainer(value) {
        this.tabsService.tabContentViewContainer = value;
    }
    /* tslint:enable:no-unused-variable */
    set layout(layout) {
        if (Object.keys(TabsLayout)
            .map(key => {
            return TabsLayout[key];
        })
            .indexOf(layout) >= 0) {
            this.tabsService.layout = layout;
        }
    }
    get layout() {
        return this.tabsService.layout;
    }
    get tabLinkDirectives() {
        return this._tabLinkDirectives;
    }
    get activeTabInOverflow() {
        return this.tabsService.overflowTabs.indexOf(this.tabsService.activeTab) > -1;
    }
    get tabIds() {
        return this.tabsService.children.map(tab => tab.tabLink.tabLinkId).join(' ');
    }
    ngAfterContentInit() {
        this.subscriptions.push(this.listenForTabLinkChanges(), this.listenForOverflowMenuFocusChanges());
        if (typeof this.ifActiveService.current === 'undefined' && this.tabLinkDirectives[0]) {
            this.tabLinkDirectives[0].activate();
        }
    }
    toggleOverflow(event) {
        this.ifOpenService.toggleWithEvent(event);
    }
    checkFocusVisible() {
        if (!this.ifOpenService.open && this.inOverflow()) {
            this.ifOpenService.open = true;
        }
        else if (this.ifOpenService.open && !this.inOverflow()) {
            this.ifOpenService.open = false;
        }
    }
    inOverflow() {
        return (this.tabLinkElements.indexOf(document.activeElement) > -1 &&
            this.keyFocus.current >= this.overflowPosition);
    }
    get isVertical() {
        return this.layout === TabsLayout.VERTICAL;
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }
    listenForTabLinkChanges() {
        return this.tabs.changes.pipe(startWith(this.tabs.map(tab => tab.tabLink))).subscribe(() => {
            this._tabLinkDirectives = this.tabs.map(tab => tab.tabLink);
            this.tabLinkElements = this._tabLinkDirectives.map(tab => tab.el.nativeElement);
        });
    }
    listenForOverflowMenuFocusChanges() {
        return this.ifOpenService.openChange.pipe(filter(() => isPlatformBrowser(this.platformId))).subscribe(open => {
            if (open && !this.inOverflow()) {
                this.focusToFirstItemInOverflow();
            }
            else if (!open && this.nextFocusedItemIsNotInOverflow()) {
                this.keyFocus.resetTabFocus();
            }
        });
    }
    focusToFirstItemInOverflow() {
        this.keyFocus.moveTo(this.overflowPosition);
    }
    nextFocusedItemIsNotInOverflow() {
        return this.tabLinkElements.find(e => e === document.activeElement) === undefined;
    }
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
        template: `
        <ul class="nav" role="tablist" [attr.aria-owns]="tabIds" [clrKeyFocus]="tabLinkElements" clrDirection="both"
            (clrFocusChange)="checkFocusVisible()">
            <!--tab links-->
            <ng-container *ngFor="let link of tabLinkDirectives">
                <ng-container *ngIf="link.tabsId === tabsId && !link.inOverflow">
                    <li role="presentation" class="nav-item">
                        <ng-container [ngTemplateOutlet]="link.templateRefContainer.template"></ng-container>
                    </li>
                </ng-container>
            </ng-container>
            <ng-container *ngIf="tabsService.overflowTabs.length > 0">
                <div class="tabs-overflow bottom-right" [class.open]="ifOpenService.open" role="presentation">
                    <li role="application" class="nav-item" (click)="toggleOverflow($event)">
                        <button class="btn btn-link nav-link dropdown-toggle" type="button" aria-hidden="true"
                                [class.active]="activeTabInOverflow" [class.open]="inOverflow()" tabIndex="-1">
                            <clr-icon shape="ellipsis-horizontal"
                              [class.is-info]="ifOpenService.open"
                              [attr.title]="commonStrings.keys.more"></clr-icon>
                        </button>
                    </li>
                    <!--tab links in overflow menu-->
                    <clr-tab-overflow-content>
                        <ng-container *ngFor="let link of tabLinkDirectives">
                            <ng-container *ngIf="link.tabsId === tabsId && link.inOverflow"
                                          [ngTemplateOutlet]="link.templateRefContainer.template">
                            </ng-container>
                        </ng-container>
                    </clr-tab-overflow-content>
                </div>
            </ng-container>
        </ul>
        <ng-container #tabContentViewContainer></ng-container>
    `,
        providers: [IfActiveService, IfOpenService, TabsService, TABS_ID_PROVIDER]
    }),
    tslib_1.__param(3, Inject(TABS_ID)),
    tslib_1.__param(5, Inject(PLATFORM_ID)),
    tslib_1.__metadata("design:paramtypes", [IfActiveService,
        IfOpenService,
        TabsService, Number, ClrCommonStringsService,
        Object])
], ClrTabs);
export { ClrTabs };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImxheW91dC90YWJzL3RhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBRUwsU0FBUyxFQUNULGVBQWUsRUFDZixNQUFNLEVBQ04sU0FBUyxFQUNULEtBQUssRUFFTCxXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCxXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUV4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUUvQixPQUFPLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXRELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBd0NwRCxJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFPO0lBeUNsQixZQUNTLGVBQWdDLEVBQ2hDLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ1AsTUFBYyxFQUMvQixhQUFzQyxFQUNoQixVQUFrQjtRQUx4QyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENB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S0FDM0UsQ0FBQztJQThDRyxtQkFBQSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFZixtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7NkNBTEksZUFBZTtRQUNqQixhQUFhO1FBQ2YsV0FBVyxVQUVULHVCQUF1QjtRQUNKLE1BQU07R0EvQ3RDLE9BQU8sQ0F3SG5CO1NBeEhZLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgSW5qZWN0LFxuICBRdWVyeUxpc3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIEhvc3RCaW5kaW5nLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFBMQVRGT1JNX0lELFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSWZBY3RpdmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtYWN0aXZlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSWZPcGVuU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLW9wZW4uc2VydmljZSc7XG5cbmltcG9ydCB7IFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdGFicy5zZXJ2aWNlJztcbmltcG9ydCB7IENsclRhYiB9IGZyb20gJy4vdGFiJztcbmltcG9ydCB7IENsclRhYkxpbmsgfSBmcm9tICcuL3RhYi1saW5rLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUQUJTX0lELCBUQUJTX0lEX1BST1ZJREVSIH0gZnJvbSAnLi90YWJzLWlkLnByb3ZpZGVyJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5zZXJ2aWNlJztcbmltcG9ydCB7IFRhYnNMYXlvdXQgfSBmcm9tICcuL2VudW1zL3RhYnMtbGF5b3V0LmVudW0nO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDbHJLZXlGb2N1cyB9IGZyb20gJy4uLy4uL3V0aWxzL2ZvY3VzL2tleS1mb2N1cy9rZXktZm9jdXMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci10YWJzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHVsIGNsYXNzPVwibmF2XCIgcm9sZT1cInRhYmxpc3RcIiBbYXR0ci5hcmlhLW93bnNdPVwidGFiSWRzXCIgW2NscktleUZvY3VzXT1cInRhYkxpbmtFbGVtZW50c1wiIGNsckRpcmVjdGlvbj1cImJvdGhcIlxuICAgICAgICAgICAgKGNsckZvY3VzQ2hhbmdlKT1cImNoZWNrRm9jdXNWaXNpYmxlKClcIj5cbiAgICAgICAgICAgIDwhLS10YWIgbGlua3MtLT5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGxpbmsgb2YgdGFiTGlua0RpcmVjdGl2ZXNcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibGluay50YWJzSWQgPT09IHRhYnNJZCAmJiAhbGluay5pbk92ZXJmbG93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJsaW5rLnRlbXBsYXRlUmVmQ29udGFpbmVyLnRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0YWJzU2VydmljZS5vdmVyZmxvd1RhYnMubGVuZ3RoID4gMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJzLW92ZXJmbG93IGJvdHRvbS1yaWdodFwiIFtjbGFzcy5vcGVuXT1cImlmT3BlblNlcnZpY2Uub3BlblwiIHJvbGU9XCJwcmVzZW50YXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpIHJvbGU9XCJhcHBsaWNhdGlvblwiIGNsYXNzPVwibmF2LWl0ZW1cIiAoY2xpY2spPVwidG9nZ2xlT3ZlcmZsb3coJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tbGluayBuYXYtbGluayBkcm9wZG93bi10b2dnbGVcIiB0eXBlPVwiYnV0dG9uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVUYWJJbk92ZXJmbG93XCIgW2NsYXNzLm9wZW5dPVwiaW5PdmVyZmxvdygpXCIgdGFiSW5kZXg9XCItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImVsbGlwc2lzLWhvcml6b250YWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmlzLWluZm9dPVwiaWZPcGVuU2VydmljZS5vcGVuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3Mua2V5cy5tb3JlXCI+PC9jbHItaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8IS0tdGFiIGxpbmtzIGluIG92ZXJmbG93IG1lbnUtLT5cbiAgICAgICAgICAgICAgICAgICAgPGNsci10YWItb3ZlcmZsb3ctY29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGxpbmsgb2YgdGFiTGlua0RpcmVjdGl2ZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibGluay50YWJzSWQgPT09IHRhYnNJZCAmJiBsaW5rLmluT3ZlcmZsb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwibGluay50ZW1wbGF0ZVJlZkNvbnRhaW5lci50ZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvY2xyLXRhYi1vdmVyZmxvdy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvdWw+XG4gICAgICAgIDxuZy1jb250YWluZXIgI3RhYkNvbnRlbnRWaWV3Q29udGFpbmVyPjwvbmctY29udGFpbmVyPlxuICAgIGAsXG4gIHByb3ZpZGVyczogW0lmQWN0aXZlU2VydmljZSwgSWZPcGVuU2VydmljZSwgVGFic1NlcnZpY2UsIFRBQlNfSURfUFJPVklERVJdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJUYWJzIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBwcml2YXRlIGdldCBvdmVyZmxvd1Bvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl90YWJMaW5rRGlyZWN0aXZlcy5maWx0ZXIobGluayA9PiAhbGluay5pbk92ZXJmbG93KS5sZW5ndGg7XG4gIH1cblxuICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby11bnVzZWQtdmFyaWFibGUgKi9cbiAgQFZpZXdDaGlsZCgndGFiQ29udGVudFZpZXdDb250YWluZXInLCB7IHN0YXRpYzogdHJ1ZSwgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBwcml2YXRlIHNldCB0YWJDb250ZW50Vmlld0NvbnRhaW5lcih2YWx1ZTogVmlld0NvbnRhaW5lclJlZikge1xuICAgIHRoaXMudGFic1NlcnZpY2UudGFiQ29udGVudFZpZXdDb250YWluZXIgPSB2YWx1ZTtcbiAgfVxuICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLXVudXNlZC12YXJpYWJsZSAqL1xuXG4gIEBJbnB1dCgnY2xyTGF5b3V0JylcbiAgc2V0IGxheW91dChsYXlvdXQ6IFRhYnNMYXlvdXQpIHtcbiAgICBpZiAoXG4gICAgICBPYmplY3Qua2V5cyhUYWJzTGF5b3V0KVxuICAgICAgICAubWFwKGtleSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFRhYnNMYXlvdXRba2V5XTtcbiAgICAgICAgfSlcbiAgICAgICAgLmluZGV4T2YobGF5b3V0KSA+PSAwXG4gICAgKSB7XG4gICAgICB0aGlzLnRhYnNTZXJ2aWNlLmxheW91dCA9IGxheW91dDtcbiAgICB9XG4gIH1cbiAgZ2V0IGxheW91dCgpOiBUYWJzTGF5b3V0IHtcbiAgICByZXR1cm4gdGhpcy50YWJzU2VydmljZS5sYXlvdXQ7XG4gIH1cblxuICBAQ29udGVudENoaWxkcmVuKENsclRhYikgcHJpdmF0ZSB0YWJzOiBRdWVyeUxpc3Q8Q2xyVGFiPjtcblxuICBwcml2YXRlIF90YWJMaW5rRGlyZWN0aXZlczogQ2xyVGFiTGlua1tdID0gW107XG4gIGdldCB0YWJMaW5rRGlyZWN0aXZlcygpOiBDbHJUYWJMaW5rW10ge1xuICAgIHJldHVybiB0aGlzLl90YWJMaW5rRGlyZWN0aXZlcztcbiAgfVxuXG4gIHRhYkxpbmtFbGVtZW50czogSFRNTEVsZW1lbnRbXSA9IFtdO1xuXG4gIEBWaWV3Q2hpbGQoQ2xyS2V5Rm9jdXMsIHsgc3RhdGljOiB0cnVlIH0pXG4gIGtleUZvY3VzOiBDbHJLZXlGb2N1cztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaWZBY3RpdmVTZXJ2aWNlOiBJZkFjdGl2ZVNlcnZpY2UsXG4gICAgcHVibGljIGlmT3BlblNlcnZpY2U6IElmT3BlblNlcnZpY2UsXG4gICAgcHVibGljIHRhYnNTZXJ2aWNlOiBUYWJzU2VydmljZSxcbiAgICBASW5qZWN0KFRBQlNfSUQpIHB1YmxpYyB0YWJzSWQ6IG51bWJlcixcbiAgICBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3RcbiAgKSB7fVxuXG4gIGdldCBhY3RpdmVUYWJJbk92ZXJmbG93KCkge1xuICAgIHJldHVybiB0aGlzLnRhYnNTZXJ2aWNlLm92ZXJmbG93VGFicy5pbmRleE9mKHRoaXMudGFic1NlcnZpY2UuYWN0aXZlVGFiKSA+IC0xO1xuICB9XG5cbiAgZ2V0IHRhYklkcygpIHtcbiAgICByZXR1cm4gdGhpcy50YWJzU2VydmljZS5jaGlsZHJlbi5tYXAodGFiID0+IHRhYi50YWJMaW5rLnRhYkxpbmtJZCkuam9pbignICcpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMubGlzdGVuRm9yVGFiTGlua0NoYW5nZXMoKSwgdGhpcy5saXN0ZW5Gb3JPdmVyZmxvd01lbnVGb2N1c0NoYW5nZXMoKSk7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuaWZBY3RpdmVTZXJ2aWNlLmN1cnJlbnQgPT09ICd1bmRlZmluZWQnICYmIHRoaXMudGFiTGlua0RpcmVjdGl2ZXNbMF0pIHtcbiAgICAgIHRoaXMudGFiTGlua0RpcmVjdGl2ZXNbMF0uYWN0aXZhdGUoKTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVPdmVyZmxvdyhldmVudDogYW55KSB7XG4gICAgdGhpcy5pZk9wZW5TZXJ2aWNlLnRvZ2dsZVdpdGhFdmVudChldmVudCk7XG4gIH1cblxuICBjaGVja0ZvY3VzVmlzaWJsZSgpIHtcbiAgICBpZiAoIXRoaXMuaWZPcGVuU2VydmljZS5vcGVuICYmIHRoaXMuaW5PdmVyZmxvdygpKSB7XG4gICAgICB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbiA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlmT3BlblNlcnZpY2Uub3BlbiAmJiAhdGhpcy5pbk92ZXJmbG93KCkpIHtcbiAgICAgIHRoaXMuaWZPcGVuU2VydmljZS5vcGVuID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaW5PdmVyZmxvdygpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy50YWJMaW5rRWxlbWVudHMuaW5kZXhPZihkb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KSA+IC0xICYmXG4gICAgICB0aGlzLmtleUZvY3VzLmN1cnJlbnQgPj0gdGhpcy5vdmVyZmxvd1Bvc2l0aW9uXG4gICAgKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGFicy12ZXJ0aWNhbCcpXG4gIGdldCBpc1ZlcnRpY2FsKCkge1xuICAgIHJldHVybiB0aGlzLmxheW91dCA9PT0gVGFic0xheW91dC5WRVJUSUNBTDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiB7XG4gICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9yVGFiTGlua0NoYW5nZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFicy5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKHRoaXMudGFicy5tYXAodGFiID0+IHRhYi50YWJMaW5rKSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl90YWJMaW5rRGlyZWN0aXZlcyA9IHRoaXMudGFicy5tYXAodGFiID0+IHRhYi50YWJMaW5rKTtcbiAgICAgIHRoaXMudGFiTGlua0VsZW1lbnRzID0gdGhpcy5fdGFiTGlua0RpcmVjdGl2ZXMubWFwKHRhYiA9PiB0YWIuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvck92ZXJmbG93TWVudUZvY3VzQ2hhbmdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW5DaGFuZ2UucGlwZShmaWx0ZXIoKCkgPT4gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkpLnN1YnNjcmliZShvcGVuID0+IHtcbiAgICAgIGlmIChvcGVuICYmICF0aGlzLmluT3ZlcmZsb3coKSkge1xuICAgICAgICB0aGlzLmZvY3VzVG9GaXJzdEl0ZW1Jbk92ZXJmbG93KCk7XG4gICAgICB9IGVsc2UgaWYgKCFvcGVuICYmIHRoaXMubmV4dEZvY3VzZWRJdGVtSXNOb3RJbk92ZXJmbG93KCkpIHtcbiAgICAgICAgdGhpcy5rZXlGb2N1cy5yZXNldFRhYkZvY3VzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGZvY3VzVG9GaXJzdEl0ZW1Jbk92ZXJmbG93KCkge1xuICAgIHRoaXMua2V5Rm9jdXMubW92ZVRvKHRoaXMub3ZlcmZsb3dQb3NpdGlvbik7XG4gIH1cblxuICBwcml2YXRlIG5leHRGb2N1c2VkSXRlbUlzTm90SW5PdmVyZmxvdygpIHtcbiAgICByZXR1cm4gdGhpcy50YWJMaW5rRWxlbWVudHMuZmluZChlID0+IGUgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpID09PSB1bmRlZmluZWQ7XG4gIH1cbn1cbiJdfQ==