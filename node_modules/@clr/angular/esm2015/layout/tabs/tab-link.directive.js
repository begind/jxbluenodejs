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
let nbTabLinkComponents = 0;
let ClrTabLink = class ClrTabLink {
    constructor(ifActiveService, id, ariaService, el, cfr, viewContainerRef, tabsService, tabsId) {
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
        const factory = this.cfr.resolveComponentFactory(TemplateRefContainer);
        this.templateRefContainer = this.viewContainerRef.createComponent(factory, 1, undefined, [
            [this.el.nativeElement],
        ]).instance;
    }
    set inOverflow(inOverflow) {
        this._inOverflow = inOverflow;
    }
    get inOverflow() {
        return this._inOverflow && this.tabsService.layout !== TabsLayout.VERTICAL;
    }
    get addLinkClasses() {
        return !this.inOverflow;
    }
    get ariaControls() {
        return this.ariaService.ariaControls;
    }
    get tabLinkId() {
        return this.ariaService.ariaLabelledBy;
    }
    set tabLinkId(id) {
        this.ariaService.ariaLabelledBy = id;
    }
    activate() {
        this.ifActiveService.current = this.id;
    }
    get active() {
        return this.ifActiveService.current === this.id;
    }
};
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
export { ClrTabLink };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxpbmsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3RhYnMvdGFiLWxpbmsuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUNMLHdCQUF3QixFQUN4QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUMxRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUN2RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFdEQsSUFBSSxtQkFBbUIsR0FBVyxDQUFDLENBQUM7QUFXcEMsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVTtJQW9CckIsWUFDUyxlQUFnQyxFQUNULEVBQVUsRUFDaEMsV0FBd0IsRUFDekIsRUFBYyxFQUNiLEdBQTZCLEVBQzdCLGdCQUFrQyxFQUNsQyxXQUF3QixFQUNSLE1BQWM7UUFQL0Isb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ1QsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUNoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN6QixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2IsUUFBRyxHQUFILEdBQUcsQ0FBMEI7UUFDN0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUNSLFdBQU0sR0FBTixNQUFNLENBQVE7UUFFdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFlLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztTQUMxRDtRQUVELHlHQUF5RztRQUN6RyxrR0FBa0c7UUFDbEcsd0ZBQXdGO1FBQ3hGLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtZQUN2RixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO1NBQ3hCLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDZCxDQUFDO0lBckNELElBQUksVUFBVSxDQUFDLFVBQVU7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsUUFBUSxDQUFDO0lBQzdFLENBQUM7SUFJRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDMUIsQ0FBQztJQTRCRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDO0lBQ3pDLENBQUM7SUFJRCxJQUFJLFNBQVMsQ0FBQyxFQUFVO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBR0QsUUFBUTtRQUNOLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUlELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0NBQ0YsQ0FBQTtBQWhFQztJQURDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQzs7OzRDQUc3QjtBQVFEO0lBRkMsV0FBVyxDQUFDLGdCQUFnQixDQUFDO0lBQzdCLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQzs7O2dEQUc3QjtBQTRCRDtJQURDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQzs7OzhDQUdqQztBQVFEO0lBRkMsV0FBVyxDQUFDLElBQUksQ0FBQztJQUNqQixLQUFLLENBQUMsSUFBSSxDQUFDOzs7MkNBR1g7QUFHRDtJQURDLFlBQVksQ0FBQyxPQUFPLENBQUM7Ozs7MENBR3JCO0FBSUQ7SUFGQyxXQUFXLENBQUMsY0FBYyxDQUFDO0lBQzNCLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQzs7O3dDQUdqQztBQW5FVSxVQUFVO0lBVHRCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxjQUFjO1FBQ3hCLElBQUksRUFBRTtZQUNKLG9CQUFvQixFQUFFLE9BQU87WUFDN0IsYUFBYSxFQUFFLE1BQU07WUFDckIsSUFBSSxFQUFFLEtBQUs7WUFDWCxJQUFJLEVBQUUsUUFBUTtTQUNmO0tBQ0YsQ0FBQztJQXVCRyxtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7SUFNcEIsbUJBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBOzZDQVBRLGVBQWUsVUFFbEIsV0FBVztRQUNyQixVQUFVO1FBQ1Isd0JBQXdCO1FBQ1gsZ0JBQWdCO1FBQ3JCLFdBQVc7R0EzQnZCLFVBQVUsQ0FvRXRCO1NBcEVZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IElGX0FDVElWRV9JRCwgSWZBY3RpdmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtYWN0aXZlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGVtcGxhdGVSZWZDb250YWluZXIgfSBmcm9tICcuLi8uLi91dGlscy90ZW1wbGF0ZS1yZWYvdGVtcGxhdGUtcmVmLWNvbnRhaW5lcic7XG5pbXBvcnQgeyBUYWJzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3RhYnMuc2VydmljZSc7XG5cbmltcG9ydCB7IEFyaWFTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvYXJpYS5zZXJ2aWNlJztcbmltcG9ydCB7IFRBQlNfSUQgfSBmcm9tICcuL3RhYnMtaWQucHJvdmlkZXInO1xuaW1wb3J0IHsgVGFic0xheW91dCB9IGZyb20gJy4vZW51bXMvdGFicy1sYXlvdXQuZW51bSc7XG5cbmxldCBuYlRhYkxpbmtDb21wb25lbnRzOiBudW1iZXIgPSAwO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2xyVGFiTGlua10nLFxuICBob3N0OiB7XG4gICAgJ1thdHRyLmFyaWEtaGlkZGVuXSc6ICdmYWxzZScsXG4gICAgJ1tjbGFzcy5idG5dJzogJ3RydWUnLFxuICAgIHJvbGU6ICd0YWInLFxuICAgIHR5cGU6ICdidXR0b24nLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJUYWJMaW5rIHtcbiAgcHJpdmF0ZSBfaW5PdmVyZmxvdzogYm9vbGVhbjtcblxuICBASW5wdXQoJ2NsclRhYkxpbmtJbk92ZXJmbG93JylcbiAgc2V0IGluT3ZlcmZsb3coaW5PdmVyZmxvdykge1xuICAgIHRoaXMuX2luT3ZlcmZsb3cgPSBpbk92ZXJmbG93O1xuICB9XG5cbiAgZ2V0IGluT3ZlcmZsb3coKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2luT3ZlcmZsb3cgJiYgdGhpcy50YWJzU2VydmljZS5sYXlvdXQgIT09IFRhYnNMYXlvdXQuVkVSVElDQUw7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmJ0bi1saW5rJylcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5uYXYtbGluaycpXG4gIGdldCBhZGRMaW5rQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gIXRoaXMuaW5PdmVyZmxvdztcbiAgfVxuXG4gIHRlbXBsYXRlUmVmQ29udGFpbmVyOiBUZW1wbGF0ZVJlZkNvbnRhaW5lcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaWZBY3RpdmVTZXJ2aWNlOiBJZkFjdGl2ZVNlcnZpY2UsXG4gICAgQEluamVjdChJRl9BQ1RJVkVfSUQpIHByaXZhdGUgaWQ6IG51bWJlcixcbiAgICBwcml2YXRlIGFyaWFTZXJ2aWNlOiBBcmlhU2VydmljZSxcbiAgICBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSB0YWJzU2VydmljZTogVGFic1NlcnZpY2UsXG4gICAgQEluamVjdChUQUJTX0lEKSBwdWJsaWMgdGFic0lkOiBudW1iZXJcbiAgKSB7XG4gICAgaWYgKCF0aGlzLnRhYkxpbmtJZCkge1xuICAgICAgdGhpcy50YWJMaW5rSWQgPSAnY2xyLXRhYi1saW5rLScgKyBuYlRhYkxpbmtDb21wb25lbnRzKys7XG4gICAgfVxuXG4gICAgLy8gVGFiIGxpbmtzIGNhbiBiZSByZW5kZXJlZCBpbiBvbmUgb2YgdHdvIHBsYWNlczogaW4gdGhlIG1haW4gYXJlYSBvciBpbnNpZGUgdGhlIG92ZXJmbG93IGRyb3Bkb3duIG1lbnUuXG4gICAgLy8gSGVyZSwgd2UgY3JlYXRlIGEgY29udGFpbmVyIHNvIHRoYXQgaXRzIHRlbXBsYXRlIGNhbiBiZSB1c2VkIHRvIGNyZWF0ZSBlbWJlZGRlZFZpZXcgb24gdGhlIGZseS5cbiAgICAvLyBTZWUgVGFic1NlcnZpY2UncyByZW5kZXJWaWV3KCkgbWV0aG9kIGFuZCBob3cgaXQncyB1c2VkIGluIFRhYnMgY2xhc3MgZm9yIGFuIGV4YW1wbGUuXG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuY2ZyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFRlbXBsYXRlUmVmQ29udGFpbmVyKTtcbiAgICB0aGlzLnRlbXBsYXRlUmVmQ29udGFpbmVyID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5LCAxLCB1bmRlZmluZWQsIFtcbiAgICAgIFt0aGlzLmVsLm5hdGl2ZUVsZW1lbnRdLFxuICAgIF0pLmluc3RhbmNlO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtY29udHJvbHMnKVxuICBnZXQgYXJpYUNvbnRyb2xzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYXJpYVNlcnZpY2UuYXJpYUNvbnRyb2xzO1xuICB9XG5cbiAgZ2V0IHRhYkxpbmtJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFyaWFTZXJ2aWNlLmFyaWFMYWJlbGxlZEJ5O1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdpZCcpXG4gIEBJbnB1dCgnaWQnKVxuICBzZXQgdGFiTGlua0lkKGlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmFyaWFTZXJ2aWNlLmFyaWFMYWJlbGxlZEJ5ID0gaWQ7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIGFjdGl2YXRlKCkge1xuICAgIHRoaXMuaWZBY3RpdmVTZXJ2aWNlLmN1cnJlbnQgPSB0aGlzLmlkO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY3RpdmUnKVxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1zZWxlY3RlZCcpXG4gIGdldCBhY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaWZBY3RpdmVTZXJ2aWNlLmN1cnJlbnQgPT09IHRoaXMuaWQ7XG4gIH1cbn1cbiJdfQ==