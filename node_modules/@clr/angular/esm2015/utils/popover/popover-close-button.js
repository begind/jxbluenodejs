/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, EventEmitter, Output, HostListener } from '@angular/core';
import { ClrPopoverEventsService } from './providers/popover-events.service';
import { ClrPopoverToggleService } from './providers/popover-toggle.service';
import { filter } from 'rxjs/operators';
let ClrPopoverCloseButton = class ClrPopoverCloseButton {
    constructor(elementRef, smartEventsService, smartOpenService) {
        this.elementRef = elementRef;
        this.smartEventsService = smartEventsService;
        this.smartOpenService = smartOpenService;
        this.subscriptions = [];
        this.closeChange = new EventEmitter();
        this.subscriptions.push(smartOpenService.openChange.pipe(filter(value => !value)).subscribe(() => {
            this.closeChange.next();
        }));
    }
    handleClick(event) {
        this.smartOpenService.toggleWithEvent(event);
        this.smartEventsService.setAnchorFocus();
    }
    ngAfterViewInit() {
        this.smartEventsService.closeButtonRef = this.elementRef;
        this.smartEventsService.setCloseFocus();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
};
tslib_1.__decorate([
    Output('clrPopoverOnCloseChange'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrPopoverCloseButton.prototype, "closeChange", void 0);
tslib_1.__decorate([
    HostListener('click', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [MouseEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], ClrPopoverCloseButton.prototype, "handleClick", null);
ClrPopoverCloseButton = tslib_1.__decorate([
    Directive({
        selector: '[clrPopoverCloseButton]',
        host: {
            '[class.clr-smart-close-button]': 'true',
        },
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef,
        ClrPopoverEventsService,
        ClrPopoverToggleService])
], ClrPopoverCloseButton);
export { ClrPopoverCloseButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1jbG9zZS1idXR0b24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9wb3BvdmVyL3BvcG92ZXItY2xvc2UtYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUVwSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFReEMsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFHaEMsWUFDVSxVQUFzQixFQUN0QixrQkFBMkMsRUFDM0MsZ0JBQXlDO1FBRnpDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUF5QjtRQUMzQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXlCO1FBTDNDLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQWNSLGdCQUFXLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUFQNUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDdkUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUtELFdBQVcsQ0FBQyxLQUFpQjtRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUNELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Q0FDRixDQUFBO0FBZm9DO0lBQWxDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQztzQ0FBYyxZQUFZOzBEQUFrQztBQUc5RjtJQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7NkNBQ2YsVUFBVTs7d0RBRzVCO0FBckJVLHFCQUFxQjtJQU5qQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUseUJBQXlCO1FBQ25DLElBQUksRUFBRTtZQUNKLGdDQUFnQyxFQUFFLE1BQU07U0FDekM7S0FDRixDQUFDOzZDQUtzQixVQUFVO1FBQ0YsdUJBQXVCO1FBQ3pCLHVCQUF1QjtHQU54QyxxQkFBcUIsQ0E4QmpDO1NBOUJZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKlxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIEhvc3RMaXN0ZW5lciwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENsclBvcG92ZXJFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvcG9wb3Zlci1ldmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJQb3BvdmVyVG9nZ2xlU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3BvcG92ZXItdG9nZ2xlLnNlcnZpY2UnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2xyUG9wb3ZlckNsb3NlQnV0dG9uXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNsci1zbWFydC1jbG9zZS1idXR0b25dJzogJ3RydWUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJQb3BvdmVyQ2xvc2VCdXR0b24gaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgc21hcnRFdmVudHNTZXJ2aWNlOiBDbHJQb3BvdmVyRXZlbnRzU2VydmljZSxcbiAgICBwcml2YXRlIHNtYXJ0T3BlblNlcnZpY2U6IENsclBvcG92ZXJUb2dnbGVTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgc21hcnRPcGVuU2VydmljZS5vcGVuQ2hhbmdlLnBpcGUoZmlsdGVyKHZhbHVlID0+ICF2YWx1ZSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2xvc2VDaGFuZ2UubmV4dCgpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgQE91dHB1dCgnY2xyUG9wb3Zlck9uQ2xvc2VDaGFuZ2UnKSBjbG9zZUNoYW5nZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgaGFuZGxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLnNtYXJ0T3BlblNlcnZpY2UudG9nZ2xlV2l0aEV2ZW50KGV2ZW50KTtcbiAgICB0aGlzLnNtYXJ0RXZlbnRzU2VydmljZS5zZXRBbmNob3JGb2N1cygpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuc21hcnRFdmVudHNTZXJ2aWNlLmNsb3NlQnV0dG9uUmVmID0gdGhpcy5lbGVtZW50UmVmO1xuICAgIHRoaXMuc21hcnRFdmVudHNTZXJ2aWNlLnNldENsb3NlRm9jdXMoKTtcbiAgfVxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=