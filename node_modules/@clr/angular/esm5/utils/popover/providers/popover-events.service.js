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
var ClrPopoverEventsService = /** @class */ (function () {
    function ClrPopoverEventsService(renderer, smartOpenService, document) {
        var _this = this;
        this.renderer = renderer;
        this.smartOpenService = smartOpenService;
        this.document = document;
        this.outsideClickClose = true;
        this.scrollToClose = true;
        this.subscriptions = [];
        this.subscriptions.push(smartOpenService.openChange.subscribe(function (open) {
            if (open) {
                _this.addEscapeListener();
                _this.addClickListener();
                _this.addScrollListener();
            }
            else {
                _this.removeAllEventListeners();
            }
        }), smartOpenService.getEventChange().subscribe(function (event) {
            // Remember the event that was used to open the content
            _this.ignoredEvent = event;
        }));
    }
    ClrPopoverEventsService.prototype.addScrollListener = function () {
        var _this = this;
        if (this.scrollToClose) {
            this.documentScroller = fromEvent(this.document, 'scroll', { capture: true });
            this.scrollSubscription = this.documentScroller
                .pipe(filter(this.testForSmartPopoverContentContainer))
                .subscribe(function () {
                _this.smartOpenService.open = false;
                _this.setAnchorFocus();
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
    };
    ClrPopoverEventsService.prototype.removeScrollListener = function () {
        if (this.documentScroller) {
            this.scrollSubscription.unsubscribe();
            delete this.documentScroller;
        }
    };
    ClrPopoverEventsService.prototype.testForSmartPopoverContentContainer = function (event) {
        // Filter for the documentScroller observable event targets
        var target = event.target;
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
    };
    ClrPopoverEventsService.prototype.addClickListener = function () {
        var _this = this;
        if (this.outsideClickClose) {
            this.documentClickListener = this.renderer.listen(this.document, 'click', function (event) {
                if (event === _this.ignoredEvent) {
                    // Here we ignore the opening click event (w/o this content opens and immediately closes.
                    delete _this.ignoredEvent;
                }
                else {
                    _this.smartOpenService.open = false;
                    // Rather than a complex change to the focus trap I put focus on the element that was clicked
                    var clickedElement = event.target;
                    clickedElement.focus();
                }
            });
        }
    };
    ClrPopoverEventsService.prototype.removeClickListener = function () {
        if (this.outsideClickClose) {
            delete this.ignoredEvent;
            if (this.documentClickListener) {
                this.documentClickListener();
                delete this.documentClickListener;
            }
        }
    };
    ClrPopoverEventsService.prototype.addEscapeListener = function () {
        var _this = this;
        this.escapeListener = this.renderer.listen(this.document, 'keydown.escape', function (event) {
            _this.smartOpenService.open = false;
            _this.setAnchorFocus();
        });
    };
    ClrPopoverEventsService.prototype.removeEscapeListener = function () {
        if (this.escapeListener) {
            this.escapeListener();
            delete this.escapeListener;
        }
    };
    Object.defineProperty(ClrPopoverEventsService.prototype, "anchorButtonRef", {
        get: function () {
            return this._anchorButtonRef;
        },
        set: function (ref) {
            this._anchorButtonRef = ref;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrPopoverEventsService.prototype, "closeButtonRef", {
        get: function () {
            return this._closeButtonRef;
        },
        set: function (ref) {
            this._closeButtonRef = ref;
        },
        enumerable: true,
        configurable: true
    });
    ClrPopoverEventsService.prototype.setCloseFocus = function () {
        this._closeButtonRef.nativeElement.focus();
    };
    ClrPopoverEventsService.prototype.setAnchorFocus = function () {
        this.anchorButtonRef.nativeElement.focus();
    };
    Object.defineProperty(ClrPopoverEventsService.prototype, "contentRef", {
        get: function () {
            return this._contentRef;
        },
        set: function (host) {
            this._contentRef = host;
        },
        enumerable: true,
        configurable: true
    });
    ClrPopoverEventsService.prototype.removeAllEventListeners = function () {
        this.removeScrollListener();
        this.removeClickListener();
        this.removeEscapeListener();
    };
    ClrPopoverEventsService.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        this.removeAllEventListeners();
    };
    ClrPopoverEventsService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(2, Inject(DOCUMENT)),
        tslib_1.__metadata("design:paramtypes", [Renderer2,
            ClrPopoverToggleService,
            HTMLDocument])
    ], ClrPopoverEventsService);
    return ClrPopoverEventsService;
}());
export { ClrPopoverEventsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1ldmVudHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL3BvcG92ZXIvcHJvdmlkZXJzL3BvcG92ZXItZXZlbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7O0FBRUgsT0FBTyxFQUFjLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25FLE9BQU8sRUFBYyxTQUFTLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MseUVBQXlFO0FBQ3pFLGVBQWU7QUFFZjtJQU9FLGlDQUNVLFFBQW1CLEVBQ25CLGdCQUF5QyxFQUN2QixRQUFzQjtRQUhsRCxpQkFvQkM7UUFuQlMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXlCO1FBQ3ZCLGFBQVEsR0FBUixRQUFRLENBQWM7UUFUM0Msc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBR3BCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQU96QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDeEMsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN4QixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUMxQjtpQkFBTTtnQkFDTCxLQUFJLENBQUMsdUJB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WUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDMUIsQ0FBQzthQUxELFVBQXNCLElBQWdCO1lBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBT08seURBQXVCLEdBQS9CO1FBQ0UsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUNELDZDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFoS1UsdUJBQXVCO1FBRG5DLFVBQVUsRUFBRTtRQVdSLG1CQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtpREFGQyxTQUFTO1lBQ0QsdUJBQXVCO1lBQ2IsWUFBWTtPQVZ2Qyx1QkFBdUIsQ0FpS25DO0lBQUQsOEJBQUM7Q0FBQSxBQWpLRCxJQWlLQztTQWpLWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICpcbiAqL1xuXG5pbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3RhYmxlLCBSZW5kZXJlcjIsIEluamVjdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbHJQb3BvdmVyVG9nZ2xlU2VydmljZSB9IGZyb20gJy4vcG9wb3Zlci10b2dnbGUuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8yMDM1MSNpc3N1ZWNvbW1lbnQtMzQ0MDA5ODg3XG4vKiogQGR5bmFtaWMgKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDbHJQb3BvdmVyRXZlbnRzU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHB1YmxpYyBvdXRzaWRlQ2xpY2tDbG9zZSA9IHRydWU7XG4gIHB1YmxpYyBzY3JvbGxUb0Nsb3NlID0gdHJ1ZTtcbiAgcHJpdmF0ZSBkb2N1bWVudENsaWNrTGlzdGVuZXI6ICgpID0+IHZvaWQ7XG4gIHB1YmxpYyBpZ25vcmVkRXZlbnQ6IGFueTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIHNtYXJ0T3BlblNlcnZpY2U6IENsclBvcG92ZXJUb2dnbGVTZXJ2aWNlLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IEhUTUxEb2N1bWVudFxuICApIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHNtYXJ0T3BlblNlcnZpY2Uub3BlbkNoYW5nZS5zdWJzY3JpYmUob3BlbiA9PiB7XG4gICAgICAgIGlmIChvcGVuKSB7XG4gICAgICAgICAgdGhpcy5hZGRFc2NhcGVMaXN0ZW5lcigpO1xuICAgICAgICAgIHRoaXMuYWRkQ2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgIHRoaXMuYWRkU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgc21hcnRPcGVuU2VydmljZS5nZXRFdmVudENoYW5nZSgpLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgIC8vIFJlbWVtYmVyIHRoZSBldmVudCB0aGF0IHdhcyB1c2VkIHRvIG9wZW4gdGhlIGNvbnRlbnRcbiAgICAgICAgdGhpcy5pZ25vcmVkRXZlbnQgPSBldmVudDtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHB1YmxpYyBhZGRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICBpZiAodGhpcy5zY3JvbGxUb0Nsb3NlKSB7XG4gICAgICB0aGlzLmRvY3VtZW50U2Nyb2xsZXIgPSBmcm9tRXZlbnQodGhpcy5kb2N1bWVudCwgJ3Njcm9sbCcsIHsgY2FwdHVyZTogdHJ1ZSB9KTtcbiAgICAgIHRoaXMuc2Nyb2xsU3Vic2NyaXB0aW9uID0gdGhpcy5kb2N1bWVudFNjcm9sbGVyXG4gICAgICAgIC5waXBlKGZpbHRlcih0aGlzLnRlc3RGb3JTbWFydFBvcG92ZXJDb250ZW50Q29udGFpbmVyKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zbWFydE9wZW5TZXJ2aWNlLm9wZW4gPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnNldEFuY2hvckZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJIHRoaW5rIHRoaXMgaXMgd2hlcmUgZHluYW1pYyByZS1wb3NpdGlvbmluZyB3aWxsIGJlIGFkZGVkXG4gICAgICAvLyBJbnN0ZWFkIG9mIHRlc3RpbmcgbGlrZSB3ZSBkbyBpbiB0aGUgY2xvc2UgcGlwZSBiZWxvd1xuICAgICAgLy8gd2UgbmVlZCB0byBzd2l0Y2ggcG9zaXRpb25pbmcgdG8gdXNlIGFuIG9ic2VydmFibGUgYW5kIHRoZW5cbiAgICAgIC8vIGRlYm91bmNlIHRoZSBzY3JvbGwgZXZlbnRzIHRvIHJlY2FsY3VsYXRlIGNvbnRlbnQgcG9zaXRpb24gaW4gYSBwZXJmb3JtYW50IHdheVxuICAgICAgLy8gRm9yIG5vdywgaWdub3JlIHNjcm9sbGluZyBldmVudHMuXG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlbW92ZVNjcm9sbExpc3RlbmVyKCkge1xuICAgIGlmICh0aGlzLmRvY3VtZW50U2Nyb2xsZXIpIHtcbiAgICAgIHRoaXMuc2Nyb2xsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICBkZWxldGUgdGhpcy5kb2N1bWVudFNjcm9sbGVyO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdGVzdEZvclNtYXJ0UG9wb3ZlckNvbnRlbnRDb250YWluZXIoZXZlbnQ6IEV2ZW50KTogYm9vbGVhbiB7XG4gICAgLy8gRmlsdGVyIGZvciB0aGUgZG9jdW1lbnRTY3JvbGxlciBvYnNlcnZhYmxlIGV2ZW50IHRhcmdldHNcbiAgICBsZXQgdGFyZ2V0OiBFbGVtZW50ID0gPEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xuXG4gICAgLy8gV2FsayB1cCB0aGUgRE9NIHRyZWUgdW50aWwgd2UgZ2V0IHRvIHRoZSBlbGVtZW50IHRoYXQgaXMgYSBkaXJlY3QgY2hpbGQgb2YgdGhlIGJvZHkuXG4gICAgd2hpbGUgKHRhcmdldC5jbGFzc0xpc3QgJiYgdGFyZ2V0LnBhcmVudEVsZW1lbnQubG9jYWxOYW1lICE9PSAnYm9keScpIHtcbiAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgIH1cblxuICAgIC8vIFRhcmdldCBpcyB0aGUgY2hpbGQgZWxlbWVudCBvZiBib2R5IHdoZXJlIHRoZSBzY3JvbGwgZXZlbnRzIG9yaWdpbmF0ZWQuXG4gICAgLy8gUmV0dXJuIGZhbHNlIGFuZCBwcmV2ZW50IHRoZSBwb3BvdmVyIGNvbnRlbnQgY29udGFpbmVyIGZyb20gY2xvc2luZyBmb3IgYW55IHNjcm9sbCBldmVudHMgaW5zaWRlIGEgcG9wb3ZlclxuICAgIC8vIGNvbnRlbnQgY29udGFpbmVyLlxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0KSB7XG4gICAgICAvLyBjaGVjayBzY3JvbGwgZXZlbnRzIHRvIHNlZSBpZiB0aGV5IGFyZSBoYXBwZW5pbmcgaW4gcG9wb3ZlciBjb250ZW50IG9yIGVsc2V3aGVyZVxuICAgICAgcmV0dXJuIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Nsci1wb3BvdmVyLWNvbnRlbnQnKSA/IGZhbHNlIDogdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcHJldmVudHMgaXQgZnJvbSBjbG9zaW5nIHJpZ2h0IGFmdGVyIGZpcnN0IG9wZW5pbmdcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICBpZiAodGhpcy5vdXRzaWRlQ2xpY2tDbG9zZSkge1xuICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmRvY3VtZW50LCAnY2xpY2snLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50ID09PSB0aGlzLmlnbm9yZWRFdmVudCkge1xuICAgICAgICAgIC8vIEhlcmUgd2UgaWdub3JlIHRoZSBvcGVuaW5nIGNsaWNrIGV2ZW50ICh3L28gdGhpcyBjb250ZW50IG9wZW5zIGFuZCBpbW1lZGlhdGVseSBjbG9zZXMuXG4gICAgICAgICAgZGVsZXRlIHRoaXMuaWdub3JlZEV2ZW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc21hcnRPcGVuU2VydmljZS5vcGVuID0gZmFsc2U7XG4gICAgICAgICAgLy8gUmF0aGVyIHRoYW4gYSBjb21wbGV4IGNoYW5nZSB0byB0aGUgZm9jdXMgdHJhcCBJIHB1dCBmb2N1cyBvbiB0aGUgZWxlbWVudCB0aGF0IHdhcyBjbGlja2VkXG4gICAgICAgICAgY29uc3QgY2xpY2tlZEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgICAgICAgICBjbGlja2VkRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICBpZiAodGhpcy5vdXRzaWRlQ2xpY2tDbG9zZSkge1xuICAgICAgZGVsZXRlIHRoaXMuaWdub3JlZEV2ZW50O1xuICAgICAgaWYgKHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGVzY2FwZUxpc3RlbmVyOiAoKSA9PiB2b2lkO1xuICBwdWJsaWMgYWRkRXNjYXBlTGlzdGVuZXIoKSB7XG4gICAgdGhpcy5lc2NhcGVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZG9jdW1lbnQsICdrZXlkb3duLmVzY2FwZScsIGV2ZW50ID0+IHtcbiAgICAgIHRoaXMuc21hcnRPcGVuU2VydmljZS5vcGVuID0gZmFsc2U7XG4gICAgICB0aGlzLnNldEFuY2hvckZvY3VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlRXNjYXBlTGlzdGVuZXIoKSB7XG4gICAgaWYgKHRoaXMuZXNjYXBlTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMuZXNjYXBlTGlzdGVuZXIoKTtcbiAgICAgIGRlbGV0ZSB0aGlzLmVzY2FwZUxpc3RlbmVyO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FuY2hvckJ1dHRvblJlZjogRWxlbWVudFJlZjtcbiAgcHVibGljIHNldCBhbmNob3JCdXR0b25SZWYocmVmOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5fYW5jaG9yQnV0dG9uUmVmID0gcmVmO1xuICB9XG4gIHB1YmxpYyBnZXQgYW5jaG9yQnV0dG9uUmVmKCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLl9hbmNob3JCdXR0b25SZWY7XG4gIH1cblxuICBwcml2YXRlIF9jbG9zZUJ1dHRvblJlZjogRWxlbWVudFJlZjtcbiAgcHVibGljIHNldCBjbG9zZUJ1dHRvblJlZihyZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9jbG9zZUJ1dHRvblJlZiA9IHJlZjtcbiAgfVxuICBwdWJsaWMgZ2V0IGNsb3NlQnV0dG9uUmVmKCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLl9jbG9zZUJ1dHRvblJlZjtcbiAgfVxuXG4gIHB1YmxpYyBzZXRDbG9zZUZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuX2Nsb3NlQnV0dG9uUmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRBbmNob3JGb2N1cygpOiB2b2lkIHtcbiAgICB0aGlzLmFuY2hvckJ1dHRvblJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBwcml2YXRlIF9jb250ZW50UmVmOiBFbGVtZW50UmVmO1xuICBwdWJsaWMgc2V0IGNvbnRlbnRSZWYoaG9zdDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX2NvbnRlbnRSZWYgPSBob3N0O1xuICB9XG4gIHB1YmxpYyBnZXQgY29udGVudFJlZigpOiBFbGVtZW50UmVmIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGVudFJlZjtcbiAgfVxuXG4gIHByaXZhdGUgZG9jdW1lbnRTY3JvbGxlcjogT2JzZXJ2YWJsZTxFdmVudD47XG5cbiAgcHJpdmF0ZSByZW1vdmVBbGxFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLnJlbW92ZVNjcm9sbExpc3RlbmVyKCk7XG4gICAgdGhpcy5yZW1vdmVDbGlja0xpc3RlbmVyKCk7XG4gICAgdGhpcy5yZW1vdmVFc2NhcGVMaXN0ZW5lcigpO1xuICB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gICAgdGhpcy5yZW1vdmVBbGxFdmVudExpc3RlbmVycygpO1xuICB9XG59XG4iXX0=