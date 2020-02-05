import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ComponentFactoryResolver, Directive, ElementRef, HostBinding, HostListener, Inject, Input, ViewContainerRef, } from '@angular/core';
import { IF_ACTIVE_ID, IfActiveService } from '../../utils/conditional/if-active.service';
import { TemplateRefContainer } from '../../utils/template-ref/template-ref-container';
import { TabsService } from './providers/tabs.service';
import { AriaService } from './providers/aria.service';
import { TABS_ID } from './tabs-id.provider';
import { TabsLayout } from './enums/tabs-layout.enum';
var nbTabLinkComponents = 0;
var ClrTabLink = /** @class */ (function () {
    function ClrTabLink(ifActiveService, id, ariaService, el, cfr, viewContainerRef, tabsService, tabsId) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.ariaService = ariaService;
        this.el = el;
        this.cfr = cfr;
        this.viewContainerRef = viewContainerRef;
        this.tabsService = tabsService;
        this.tabsId = tabsId;
        if (!this.tabLinkId) {
            this.tabLinkId = 'clr-tab-link-' + nbTabLinkComponents++;
        }
        // Tab links can be rendered in one of two places: in the main area or inside the overflow dropdown menu.
        // Here, we create a container so that its template can be used to create embeddedView on the fly.
        // See TabsService's renderView() method and how it's used in Tabs class for an example.
        var factory = this.cfr.resolveComponentFactory(TemplateRefContainer);
        this.templateRefContainer = this.viewContainerRef.createComponent(factory, 1, undefined, [
            [this.el.nativeElement],
        ]).instance;
    }
    Object.defineProperty(ClrTabLink.prototype, "inOverflow", {
        get: function () {
            return this._inOverflow && this.tabsService.layout !== TabsLayout.VERTICAL;
        },
        set: function (inOverflow) {
            this._inOverflow = inOverflow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabLink.prototype, "addLinkClasses", {
        get: function () {
            return !this.inOverflow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabLink.prototype, "ariaControls", {
        get: function () {
            return this.ariaService.ariaControls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabLink.prototype, "tabLinkId", {
        get: function () {
            return this.ariaService.ariaLabelledBy;
        },
        set: function (id) {
            this.ariaService.ariaLabelledBy = id;
        },
        enumerable: true,
        configurable: true
    });
    ClrTabLink.prototype.activate = function () {
        this.ifActiveService.current = this.id;
    };
    Object.defineProperty(ClrTabLink.prototype, "active", {
        get: function () {
            return this.ifActiveService.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input('clrTabLinkInOverflow'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrTabLink.prototype, "inOverflow", null);
    tslib_1.__decorate([
        HostBinding('class.btn-link'),
        HostBinding('class.nav-link'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrTabLink.prototype, "addLinkClasses", null);
    tslib_1.__decorate([
        HostBinding('attr.aria-controls'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrTabLink.prototype, "ariaControls", null);
    tslib_1.__decorate([
        HostBinding('id'),
        Input('id'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ClrTabLink.prototype, "tabLinkId", null);
    tslib_1.__decorate([
        HostListener('click'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ClrTabLink.prototype, "activate", null);
    tslib_1.__decorate([
        HostBinding('class.active'),
        HostBinding('attr.aria-selected'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrTabLink.prototype, "active", null);
    ClrTabLink = tslib_1.__decorate([
        Directive({
            selector: '[clrTabLink]',
            host: {
                '[attr.aria-hidden]': 'false',
                '[class.btn]': 'true',
                role: 'tab',
                type: 'button',
            },
        }),
        tslib_1.__param(1, Inject(IF_ACTIVE_ID)),
        tslib_1.__param(7, Inject(TABS_ID)),
        tslib_1.__metadata("design:paramtypes", [IfActiveService, Number, AriaService,
            ElementRef,
            ComponentFactoryResolver,
            ViewContainerRef,
            TabsService, Number])
    ], ClrTabLink);
    return ClrTabLink;
}());
export { ClrTabLink };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxpbmsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3RhYnMvdGFiLWxpbmsuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUNMLHdCQUF3QixFQUN4QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUMxRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUN2RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFdEQsSUFBSSxtQkFBbUIsR0FBVyxDQUFDLENBQUM7QUFXcEM7SUFvQkUsb0JBQ1MsZUFBZ0MsRUFDVCxFQUFVLEVBQ2hDLFdBQXdCLEVBQ3pCLEVBQWMsRUFDYixHQUE2QixFQUM3QixnQkFBa0MsRUFDbEMsV0FBd0IsRUFDUixNQUFjO1FBUC9CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNULE9BQUUsR0FBRixFQUFFLENBQVE7UUFDaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDekIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNiLFFBQUcsR0FBSCxHQUFHLENBQTBCO1FBQzdCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDUixXQUFNLEdBQU4sTUFBTSxDQUFR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QWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSUZfQUNUSVZFX0lELCBJZkFjdGl2ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1hY3RpdmUuc2VydmljZSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVJlZkNvbnRhaW5lciB9IGZyb20gJy4uLy4uL3V0aWxzL3RlbXBsYXRlLXJlZi90ZW1wbGF0ZS1yZWYtY29udGFpbmVyJztcbmltcG9ydCB7IFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdGFicy5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQXJpYVNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9hcmlhLnNlcnZpY2UnO1xuaW1wb3J0IHsgVEFCU19JRCB9IGZyb20gJy4vdGFicy1pZC5wcm92aWRlcic7XG5pbXBvcnQgeyBUYWJzTGF5b3V0IH0gZnJvbSAnLi9lbnVtcy90YWJzLWxheW91dC5lbnVtJztcblxubGV0IG5iVGFiTGlua0NvbXBvbmVudHM6IG51bWJlciA9IDA7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJUYWJMaW5rXScsXG4gIGhvc3Q6IHtcbiAgICAnW2F0dHIuYXJpYS1oaWRkZW5dJzogJ2ZhbHNlJyxcbiAgICAnW2NsYXNzLmJ0bl0nOiAndHJ1ZScsXG4gICAgcm9sZTogJ3RhYicsXG4gICAgdHlwZTogJ2J1dHRvbicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsclRhYkxpbmsge1xuICBwcml2YXRlIF9pbk92ZXJmbG93OiBib29sZWFuO1xuXG4gIEBJbnB1dCgnY2xyVGFiTGlua0luT3ZlcmZsb3cnKVxuICBzZXQgaW5PdmVyZmxvdyhpbk92ZXJmbG93KSB7XG4gICAgdGhpcy5faW5PdmVyZmxvdyA9IGluT3ZlcmZsb3c7XG4gIH1cblxuICBnZXQgaW5PdmVyZmxvdygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faW5PdmVyZmxvdyAmJiB0aGlzLnRhYnNTZXJ2aWNlLmxheW91dCAhPT0gVGFic0xheW91dC5WRVJUSUNBTDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYnRuLWxpbmsnKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5hdi1saW5rJylcbiAgZ2V0IGFkZExpbmtDbGFzc2VzKCkge1xuICAgIHJldHVybiAhdGhpcy5pbk92ZXJmbG93O1xuICB9XG5cbiAgdGVtcGxhdGVSZWZDb250YWluZXI6IFRlbXBsYXRlUmVmQ29udGFpbmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpZkFjdGl2ZVNlcnZpY2U6IElmQWN0aXZlU2VydmljZSxcbiAgICBASW5qZWN0KElGX0FDVElWRV9JRCkgcHJpdmF0ZSBpZDogbnVtYmVyLFxuICAgIHByaXZhdGUgYXJpYVNlcnZpY2U6IEFyaWFTZXJ2aWNlLFxuICAgIHB1YmxpYyBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIHRhYnNTZXJ2aWNlOiBUYWJzU2VydmljZSxcbiAgICBASW5qZWN0KFRBQlNfSUQpIHB1YmxpYyB0YWJzSWQ6IG51bWJlclxuICApIHtcbiAgICBpZiAoIXRoaXMudGFiTGlua0lkKSB7XG4gICAgICB0aGlzLnRhYkxpbmtJZCA9ICdjbHItdGFiLWxpbmstJyArIG5iVGFiTGlua0NvbXBvbmVudHMrKztcbiAgICB9XG5cbiAgICAvLyBUYWIgbGlua3MgY2FuIGJlIHJlbmRlcmVkIGluIG9uZSBvZiB0d28gcGxhY2VzOiBpbiB0aGUgbWFpbiBhcmVhIG9yIGluc2lkZSB0aGUgb3ZlcmZsb3cgZHJvcGRvd24gbWVudS5cbiAgICAvLyBIZXJlLCB3ZSBjcmVhdGUgYSBjb250YWluZXIgc28gdGhhdCBpdHMgdGVtcGxhdGUgY2FuIGJlIHVzZWQgdG8gY3JlYXRlIGVtYmVkZGVkVmlldyBvbiB0aGUgZmx5LlxuICAgIC8vIFNlZSBUYWJzU2VydmljZSdzIHJlbmRlclZpZXcoKSBtZXRob2QgYW5kIGhvdyBpdCdzIHVzZWQgaW4gVGFicyBjbGFzcyBmb3IgYW4gZXhhbXBsZS5cbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoVGVtcGxhdGVSZWZDb250YWluZXIpO1xuICAgIHRoaXMudGVtcGxhdGVSZWZDb250YWluZXIgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnksIDEsIHVuZGVmaW5lZCwgW1xuICAgICAgW3RoaXMuZWwubmF0aXZlRWxlbWVudF0sXG4gICAgXSkuaW5zdGFuY2U7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1jb250cm9scycpXG4gIGdldCBhcmlhQ29udHJvbHMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hcmlhU2VydmljZS5hcmlhQ29udHJvbHM7XG4gIH1cblxuICBnZXQgdGFiTGlua0lkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYXJpYVNlcnZpY2UuYXJpYUxhYmVsbGVkQnk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2lkJylcbiAgQElucHV0KCdpZCcpXG4gIHNldCB0YWJMaW5rSWQoaWQ6IHN0cmluZykge1xuICAgIHRoaXMuYXJpYVNlcnZpY2UuYXJpYUxhYmVsbGVkQnkgPSBpZDtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5pZkFjdGl2ZVNlcnZpY2UuY3VycmVudCA9IHRoaXMuaWQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjdGl2ZScpXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXNlbGVjdGVkJylcbiAgZ2V0IGFjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pZkFjdGl2ZVNlcnZpY2UuY3VycmVudCA9PT0gdGhpcy5pZDtcbiAgfVxufVxuIl19