/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
import * as tslib_1 from "tslib";
import { Injectable, Renderer2, Inject } from '@angular/core';
import { ClrPopoverToggleService } from './popover-toggle.service';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
// https://github.com/angular/angular/issues/20351#issuecomment-344009887
/** @dynamic */
let ClrPopoverEventsService = class ClrPopoverEventsService {
    constructor(renderer, smartOpenService, document) {
        this.renderer = renderer;
        this.smartOpenService = smartOpenService;
        this.document = document;
        this.outsideClickClose = true;
        this.scrollToClose = true;
        this.subscriptions = [];
        this.subscriptions.push(smartOpenService.openChange.subscribe(open => {
            if (open) {
                this.addEscapeListener();
                this.addClickListener();
                this.addScrollListener();
            }
            else {
                this.removeAllEventListeners();
            }
        }), smartOpenService.getEventChange().subscribe(event => {
            // Remember the event that was used to open the content
            this.ignoredEvent = event;
        }));
    }
    addScrollListener() {
        if (this.scrollToClose) {
            this.documentScroller = fromEvent(this.document, 'scroll', { capture: true });
            this.scrollSubscription = this.documentScroller
                .pipe(filter(this.testForSmartPopoverContentContainer))
                .subscribe(() => {
                this.smartOpenService.open = false;
                this.setAnchorFocus();
            });
        }
        else {
            // I think this is where dynamic re-positioning will be added
            // Instead of testing like we do in the close pipe below
            // we need to switch positioning to use an observable and then
            // debounce the scroll events to recalculate content position in a performant way
            // For now, ignore scrolling events.
            return;
        }
    }
    removeScrollListener() {
        if (this.documentScroller) {
            this.scrollSubscription.unsubscribe();
            delete this.documentScroller;
        }
    }
    testForSmartPopoverContentContainer(event) {
        // Filter for the documentScroller observable event targets
        let target = event.target;
        // Walk up the DOM tree until we get to the element that is a direct child of the body.
        while (target.classList && target.parentElement.localName !== 'body') {
            target = target.parentElement;
        }
        // Target is the child element of body where the scroll events originated.
        // Return false and prevent the popover content container from closing for any scroll events inside a popover
        // content container.
        if (target.classList) {
            // check scroll events to see if they are happening in popover content or elsewhere
            return target.classList.contains('clr-popover-content') ? false : true;
        }
        else {
            // prevents it from closing right after first opening
            return false;
        }
    }
    addClickListener() {
        if (this.outsideClickClose) {
            this.documentClickListener = this.renderer.listen(this.document, 'click', (event) => {
                if (event === this.ignoredEvent) {
                    // Here we ignore the opening click event (w/o this content opens and immediately closes.
                    delete this.ignoredEvent;
                }
                else {
                    this.smartOpenService.open = false;
                    // Rather than a complex change to the focus trap I put focus on the element that was clicked
                    const clickedElement = event.target;
                    clickedElement.focus();
                }
            });
        }
    }
    removeClickListener() {
        if (this.outsideClickClose) {
            delete this.ignoredEvent;
            if (this.documentClickListener) {
                this.documentClickListener();
                delete this.documentClickListener;
            }
        }
    }
    addEscapeListener() {
        this.escapeListener = this.renderer.listen(this.document, 'keydown.escape', event => {
            this.smartOpenService.open = false;
            this.setAnchorFocus();
        });
    }
    removeEscapeListener() {
        if (this.escapeListener) {
            this.escapeListener();
            delete this.escapeListener;
        }
    }
    set anchorButtonRef(ref) {
        this._anchorButtonRef = ref;
    }
    get anchorButtonRef() {
        return this._anchorButtonRef;
    }
    set closeButtonRef(ref) {
        this._closeButtonRef = ref;
    }
    get closeButtonRef() {
        return this._closeButtonRef;
    }
    setCloseFocus() {
        this._closeButtonRef.nativeElement.focus();
    }
    setAnchorFocus() {
        this.anchorButtonRef.nativeElement.focus();
    }
    set contentRef(host) {
        this._contentRef = host;
    }
    get contentRef() {
        return this._contentRef;
    }
    removeAllEventListeners() {
        this.removeScrollListener();
        this.removeClickListener();
        this.removeEscapeListener();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.removeAllEventListeners();
    }
};
ClrPopoverEventsService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(2, Inject(DOCUMENT)),
    tslib_1.__metadata("design:paramtypes", [Renderer2,
        ClrPopoverToggleService,
        HTMLDocument])
], ClrPopoverEventsService);
export { ClrPopoverEventsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1ldmVudHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL3BvcG92ZXIvcHJvdmlkZXJzL3BvcG92ZXItZXZlbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7O0FBRUgsT0FBTyxFQUFjLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25FLE9BQU8sRUFBYyxTQUFTLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MseUVBQXlFO0FBQ3pFLGVBQWU7QUFFZixJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQU9sQyxZQUNVLFFBQW1CLEVBQ25CLGdCQUF5QyxFQUN2QixRQUFzQjtRQUZ4QyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBeUI7UUFDdkIsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQVQzQyxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFHcEIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBT3pDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzNDLElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDMUI7aUJB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MUIsQ0FBQztJQUNELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUlPLHVCQUF1QjtRQUM3QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQ0QsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDakMsQ0FBQztDQUNGLENBQUE7QUFqS1ksdUJBQXVCO0lBRG5DLFVBQVUsRUFBRTtJQVdSLG1CQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTs2Q0FGQyxTQUFTO1FBQ0QsdUJBQXVCO1FBQ2IsWUFBWTtHQVZ2Qyx1QkFBdUIsQ0FpS25DO1NBaktZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKlxuICovXG5cbmltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdGFibGUsIFJlbmRlcmVyMiwgSW5qZWN0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsclBvcG92ZXJUb2dnbGVTZXJ2aWNlIH0gZnJvbSAnLi9wb3BvdmVyLXRvZ2dsZS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzIwMzUxI2lzc3VlY29tbWVudC0zNDQwMDk4ODdcbi8qKiBAZHluYW1pYyAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENsclBvcG92ZXJFdmVudHNTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHVibGljIG91dHNpZGVDbGlja0Nsb3NlID0gdHJ1ZTtcbiAgcHVibGljIHNjcm9sbFRvQ2xvc2UgPSB0cnVlO1xuICBwcml2YXRlIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogKCkgPT4gdm9pZDtcbiAgcHVibGljIGlnbm9yZWRFdmVudDogYW55O1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgc21hcnRPcGVuU2VydmljZTogQ2xyUG9wb3ZlclRvZ2dsZVNlcnZpY2UsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogSFRNTERvY3VtZW50XG4gICkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgc21hcnRPcGVuU2VydmljZS5vcGVuQ2hhbmdlLnN1YnNjcmliZShvcGVuID0+IHtcbiAgICAgICAgaWYgKG9wZW4pIHtcbiAgICAgICAgICB0aGlzLmFkZEVzY2FwZUxpc3RlbmVyKCk7XG4gICAgICAgICAgdGhpcy5hZGRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgdGhpcy5hZGRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBzbWFydE9wZW5TZXJ2aWNlLmdldEV2ZW50Q2hhbmdlKCkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgLy8gUmVtZW1iZXIgdGhlIGV2ZW50IHRoYXQgd2FzIHVzZWQgdG8gb3BlbiB0aGUgY29udGVudFxuICAgICAgICB0aGlzLmlnbm9yZWRFdmVudCA9IGV2ZW50O1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzY3JvbGxTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHVibGljIGFkZFNjcm9sbExpc3RlbmVyKCkge1xuICAgIGlmICh0aGlzLnNjcm9sbFRvQ2xvc2UpIHtcbiAgICAgIHRoaXMuZG9jdW1lbnRTY3JvbGxlciA9IGZyb21FdmVudCh0aGlzLmRvY3VtZW50LCAnc2Nyb2xsJywgeyBjYXB0dXJlOiB0cnVlIH0pO1xuICAgICAgdGhpcy5zY3JvbGxTdWJzY3JpcHRpb24gPSB0aGlzLmRvY3VtZW50U2Nyb2xsZXJcbiAgICAgICAgLnBpcGUoZmlsdGVyKHRoaXMudGVzdEZvclNtYXJ0UG9wb3ZlckNvbnRlbnRDb250YWluZXIpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnNtYXJ0T3BlblNlcnZpY2Uub3BlbiA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuc2V0QW5jaG9yRm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEkgdGhpbmsgdGhpcyBpcyB3aGVyZSBkeW5hbWljIHJlLXBvc2l0aW9uaW5nIHdpbGwgYmUgYWRkZWRcbiAgICAgIC8vIEluc3RlYWQgb2YgdGVzdGluZyBsaWtlIHdlIGRvIGluIHRoZSBjbG9zZSBwaXBlIGJlbG93XG4gICAgICAvLyB3ZSBuZWVkIHRvIHN3aXRjaCBwb3NpdGlvbmluZyB0byB1c2UgYW4gb2JzZXJ2YWJsZSBhbmQgdGhlblxuICAgICAgLy8gZGVib3VuY2UgdGhlIHNjcm9sbCBldmVudHMgdG8gcmVjYWxjdWxhdGUgY29udGVudCBwb3NpdGlvbiBpbiBhIHBlcmZvcm1hbnQgd2F5XG4gICAgICAvLyBGb3Igbm93LCBpZ25vcmUgc2Nyb2xsaW5nIGV2ZW50cy5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlU2Nyb2xsTGlzdGVuZXIoKSB7XG4gICAgaWYgKHRoaXMuZG9jdW1lbnRTY3JvbGxlcikge1xuICAgICAgdGhpcy5zY3JvbGxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIGRlbGV0ZSB0aGlzLmRvY3VtZW50U2Nyb2xsZXI7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0ZXN0Rm9yU21hcnRQb3BvdmVyQ29udGVudENvbnRhaW5lcihldmVudDogRXZlbnQpOiBib29sZWFuIHtcbiAgICAvLyBGaWx0ZXIgZm9yIHRoZSBkb2N1bWVudFNjcm9sbGVyIG9ic2VydmFibGUgZXZlbnQgdGFyZ2V0c1xuICAgIGxldCB0YXJnZXQ6IEVsZW1lbnQgPSA8RWxlbWVudD5ldmVudC50YXJnZXQ7XG5cbiAgICAvLyBXYWxrIHVwIHRoZSBET00gdHJlZSB1bnRpbCB3ZSBnZXQgdG8gdGhlIGVsZW1lbnQgdGhhdCBpcyBhIGRpcmVjdCBjaGlsZCBvZiB0aGUgYm9keS5cbiAgICB3aGlsZSAodGFyZ2V0LmNsYXNzTGlzdCAmJiB0YXJnZXQucGFyZW50RWxlbWVudC5sb2NhbE5hbWUgIT09ICdib2R5Jykge1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8gVGFyZ2V0IGlzIHRoZSBjaGlsZCBlbGVtZW50IG9mIGJvZHkgd2hlcmUgdGhlIHNjcm9sbCBldmVudHMgb3JpZ2luYXRlZC5cbiAgICAvLyBSZXR1cm4gZmFsc2UgYW5kIHByZXZlbnQgdGhlIHBvcG92ZXIgY29udGVudCBjb250YWluZXIgZnJvbSBjbG9zaW5nIGZvciBhbnkgc2Nyb2xsIGV2ZW50cyBpbnNpZGUgYSBwb3BvdmVyXG4gICAgLy8gY29udGVudCBjb250YWluZXIuXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QpIHtcbiAgICAgIC8vIGNoZWNrIHNjcm9sbCBldmVudHMgdG8gc2VlIGlmIHRoZXkgYXJlIGhhcHBlbmluZyBpbiBwb3BvdmVyIGNvbnRlbnQgb3IgZWxzZXdoZXJlXG4gICAgICByZXR1cm4gdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2xyLXBvcG92ZXItY29udGVudCcpID8gZmFsc2UgOiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBwcmV2ZW50cyBpdCBmcm9tIGNsb3NpbmcgcmlnaHQgYWZ0ZXIgZmlyc3Qgb3BlbmluZ1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRDbGlja0xpc3RlbmVyKCkge1xuICAgIGlmICh0aGlzLm91dHNpZGVDbGlja0Nsb3NlKSB7XG4gICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZG9jdW1lbnQsICdjbGljaycsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQgPT09IHRoaXMuaWdub3JlZEV2ZW50KSB7XG4gICAgICAgICAgLy8gSGVyZSB3ZSBpZ25vcmUgdGhlIG9wZW5pbmcgY2xpY2sgZXZlbnQgKHcvbyB0aGlzIGNvbnRlbnQgb3BlbnMgYW5kIGltbWVkaWF0ZWx5IGNsb3Nlcy5cbiAgICAgICAgICBkZWxldGUgdGhpcy5pZ25vcmVkRXZlbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zbWFydE9wZW5TZXJ2aWNlLm9wZW4gPSBmYWxzZTtcbiAgICAgICAgICAvLyBSYXRoZXIgdGhhbiBhIGNvbXBsZXggY2hhbmdlIHRvIHRoZSBmb2N1cyB0cmFwIEkgcHV0IGZvY3VzIG9uIHRoZSBlbGVtZW50IHRoYXQgd2FzIGNsaWNrZWRcbiAgICAgICAgICBjb25zdCBjbGlja2VkRWxlbWVudDogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xuICAgICAgICAgIGNsaWNrZWRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVDbGlja0xpc3RlbmVyKCkge1xuICAgIGlmICh0aGlzLm91dHNpZGVDbGlja0Nsb3NlKSB7XG4gICAgICBkZWxldGUgdGhpcy5pZ25vcmVkRXZlbnQ7XG4gICAgICBpZiAodGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZXNjYXBlTGlzdGVuZXI6ICgpID0+IHZvaWQ7XG4gIHB1YmxpYyBhZGRFc2NhcGVMaXN0ZW5lcigpIHtcbiAgICB0aGlzLmVzY2FwZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5kb2N1bWVudCwgJ2tleWRvd24uZXNjYXBlJywgZXZlbnQgPT4ge1xuICAgICAgdGhpcy5zbWFydE9wZW5TZXJ2aWNlLm9wZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuc2V0QW5jaG9yRm9jdXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVFc2NhcGVMaXN0ZW5lcigpIHtcbiAgICBpZiAodGhpcy5lc2NhcGVMaXN0ZW5lcikge1xuICAgICAgdGhpcy5lc2NhcGVMaXN0ZW5lcigpO1xuICAgICAgZGVsZXRlIHRoaXMuZXNjYXBlTGlzdGVuZXI7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYW5jaG9yQnV0dG9uUmVmOiBFbGVtZW50UmVmO1xuICBwdWJsaWMgc2V0IGFuY2hvckJ1dHRvblJlZihyZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9hbmNob3JCdXR0b25SZWYgPSByZWY7XG4gIH1cbiAgcHVibGljIGdldCBhbmNob3JCdXR0b25SZWYoKTogRWxlbWVudFJlZiB7XG4gICAgcmV0dXJuIHRoaXMuX2FuY2hvckJ1dHRvblJlZjtcbiAgfVxuXG4gIHByaXZhdGUgX2Nsb3NlQnV0dG9uUmVmOiBFbGVtZW50UmVmO1xuICBwdWJsaWMgc2V0IGNsb3NlQnV0dG9uUmVmKHJlZjogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX2Nsb3NlQnV0dG9uUmVmID0gcmVmO1xuICB9XG4gIHB1YmxpYyBnZXQgY2xvc2VCdXR0b25SZWYoKTogRWxlbWVudFJlZiB7XG4gICAgcmV0dXJuIHRoaXMuX2Nsb3NlQnV0dG9uUmVmO1xuICB9XG5cbiAgcHVibGljIHNldENsb3NlRm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5fY2xvc2VCdXR0b25SZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgcHVibGljIHNldEFuY2hvckZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuYW5jaG9yQnV0dG9uUmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRlbnRSZWY6IEVsZW1lbnRSZWY7XG4gIHB1YmxpYyBzZXQgY29udGVudFJlZihob3N0OiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5fY29udGVudFJlZiA9IGhvc3Q7XG4gIH1cbiAgcHVibGljIGdldCBjb250ZW50UmVmKCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLl9jb250ZW50UmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBkb2N1bWVudFNjcm9sbGVyOiBPYnNlcnZhYmxlPEV2ZW50PjtcblxuICBwcml2YXRlIHJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMucmVtb3ZlU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICB0aGlzLnJlbW92ZUNsaWNrTGlzdGVuZXIoKTtcbiAgICB0aGlzLnJlbW92ZUVzY2FwZUxpc3RlbmVyKCk7XG4gIH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgICB0aGlzLnJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cbn1cbiJdfQ==