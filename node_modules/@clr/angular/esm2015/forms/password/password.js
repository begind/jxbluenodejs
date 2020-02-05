/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostListener, Inject, Injector, Optional, Renderer2, Self, ViewContainerRef, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgControl } from '@angular/forms';
import { ClrPasswordContainer, TOGGLE_SERVICE } from './password-container';
import { WrappedFormControl } from '../common/wrapped-control';
import { FocusService } from '../common/providers/focus.service';
let ClrPassword = class ClrPassword extends WrappedFormControl {
    constructor(vcr, injector, control, renderer, el, focusService, toggleService) {
        super(vcr, ClrPasswordContainer, injector, control, renderer, el);
        this.focusService = focusService;
        this.toggleService = toggleService;
        this.index = 1;
        if (!this.focusService) {
            throw new Error('clrPassword requires being wrapped in <clr-password-container>');
        }
        this.subscriptions.push(this.toggleService.subscribe(toggle => {
            renderer.setProperty(el.nativeElement, 'type', toggle ? 'text' : 'password');
        }));
    }
    triggerFocus() {
        if (this.focusService) {
            this.focusService.focused = true;
        }
    }
    triggerValidation() {
        super.triggerValidation();
        if (this.focusService) {
            this.focusService.focused = false;
        }
    }
};
tslib_1.__decorate([
    HostListener('focus'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ClrPassword.prototype, "triggerFocus", null);
tslib_1.__decorate([
    HostListener('blur'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ClrPassword.prototype, "triggerValidation", null);
ClrPassword = tslib_1.__decorate([
    Directive({ selector: '[clrPassword]', host: { '[class.clr-input]': 'true' } }),
    tslib_1.__param(2, Self()),
    tslib_1.__param(2, Optional()),
    tslib_1.__param(5, Optional()),
    tslib_1.__param(6, Optional()),
    tslib_1.__param(6, Inject(TOGGLE_SERVICE)),
    tslib_1.__metadata("design:paramtypes", [ViewContainerRef,
        Injector,
        NgControl,
        Renderer2,
        ElementRef,
        FocusService,
        BehaviorSubject])
], ClrPassword);
export { ClrPassword };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9wYXNzd29yZC9wYXNzd29yZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sUUFBUSxFQUdSLFFBQVEsRUFDUixTQUFTLEVBQ1QsSUFBSSxFQUNKLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBR2pFLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVksU0FBUSxrQkFBd0M7SUFHdkUsWUFDRSxHQUFxQixFQUNyQixRQUFrQixFQUdsQixPQUFrQixFQUNsQixRQUFtQixFQUNuQixFQUFjLEVBQ00sWUFBMEIsRUFHdEMsYUFBdUM7UUFFL0MsS0FBSyxDQUFDLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUw5QyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUd0QyxrQkFBYSxHQUFiLGFBQWEsQ0FBMEI7UUFidkMsVUFBSyxHQUFHLENBQUMsQ0FBQztRQWlCbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDO1NBQ25GO1FBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3BDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9FLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBR0QsWUFBWTtRQUNWLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBR0QsaUJBQWlCO1FBQ2YsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDMUIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUNuQztJQUNILENBQUM7Q0FDRixDQUFBO0FBYkM7SUFEQyxZQUFZLENBQUMsT0FBTyxDQUFDOzs7OytDQUtyQjtBQUdEO0lBREMsWUFBWSxDQUFDLE1BQU0sQ0FBQzs7OztvREFNcEI7QUExQ1UsV0FBVztJQUR2QixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFPM0UsbUJBQUEsSUFBSSxFQUFFLENBQUE7SUFDTixtQkFBQSxRQUFRLEVBQUUsQ0FBQTtJQUlWLG1CQUFBLFFBQVEsRUFBRSxDQUFBO0lBQ1YsbUJBQUEsUUFBUSxFQUFFLENBQUE7SUFDVixtQkFBQSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUE7NkNBVGxCLGdCQUFnQjtRQUNYLFFBQVE7UUFHVCxTQUFTO1FBQ1IsU0FBUztRQUNmLFVBQVU7UUFDb0IsWUFBWTtRQUd2QixlQUFlO0dBZDdCLFdBQVcsQ0EyQ3ZCO1NBM0NZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbmplY3RvcixcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBSZW5kZXJlcjIsXG4gIFNlbGYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IENsclBhc3N3b3JkQ29udGFpbmVyLCBUT0dHTEVfU0VSVklDRSB9IGZyb20gJy4vcGFzc3dvcmQtY29udGFpbmVyJztcbmltcG9ydCB7IFdyYXBwZWRGb3JtQ29udHJvbCB9IGZyb20gJy4uL2NvbW1vbi93cmFwcGVkLWNvbnRyb2wnO1xuaW1wb3J0IHsgRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9mb2N1cy5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NsclBhc3N3b3JkXScsIGhvc3Q6IHsgJ1tjbGFzcy5jbHItaW5wdXRdJzogJ3RydWUnIH0gfSlcbmV4cG9ydCBjbGFzcyBDbHJQYXNzd29yZCBleHRlbmRzIFdyYXBwZWRGb3JtQ29udHJvbDxDbHJQYXNzd29yZENvbnRhaW5lcj4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBpbmRleCA9IDE7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBAU2VsZigpXG4gICAgQE9wdGlvbmFsKClcbiAgICBjb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBlbDogRWxlbWVudFJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGZvY3VzU2VydmljZTogRm9jdXNTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChUT0dHTEVfU0VSVklDRSlcbiAgICBwcml2YXRlIHRvZ2dsZVNlcnZpY2U6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPlxuICApIHtcbiAgICBzdXBlcih2Y3IsIENsclBhc3N3b3JkQ29udGFpbmVyLCBpbmplY3RvciwgY29udHJvbCwgcmVuZGVyZXIsIGVsKTtcblxuICAgIGlmICghdGhpcy5mb2N1c1NlcnZpY2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2xyUGFzc3dvcmQgcmVxdWlyZXMgYmVpbmcgd3JhcHBlZCBpbiA8Y2xyLXBhc3N3b3JkLWNvbnRhaW5lcj4nKTtcbiAgICB9XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMudG9nZ2xlU2VydmljZS5zdWJzY3JpYmUodG9nZ2xlID0+IHtcbiAgICAgICAgcmVuZGVyZXIuc2V0UHJvcGVydHkoZWwubmF0aXZlRWxlbWVudCwgJ3R5cGUnLCB0b2dnbGUgPyAndGV4dCcgOiAncGFzc3dvcmQnKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJylcbiAgdHJpZ2dlckZvY3VzKCkge1xuICAgIGlmICh0aGlzLmZvY3VzU2VydmljZSkge1xuICAgICAgdGhpcy5mb2N1c1NlcnZpY2UuZm9jdXNlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIHRyaWdnZXJWYWxpZGF0aW9uKCkge1xuICAgIHN1cGVyLnRyaWdnZXJWYWxpZGF0aW9uKCk7XG4gICAgaWYgKHRoaXMuZm9jdXNTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5mb2N1c2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iXX0=