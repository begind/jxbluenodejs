import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ElementRef, HostBinding, Injectable, Injector, Renderer2, SkipSelf, } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { Popover } from './popover';
// Literally any annotation would work here, but writing our own @HoneyBadger annotation feels overkill.
let AbstractPopover = class AbstractPopover {
    constructor(injector, parentHost) {
        this.parentHost = parentHost;
        this.updateAnchor = false;
        this.popoverOptions = {};
        /*
           * Until https://github.com/angular/angular/issues/8785 is supported, we don't have any way to instantiate
           * a separate directive on the host. So let's do dirty but performant for now.
           */
        this.closeOnOutsideClick = false;
        this.el = injector.get(ElementRef);
        this.ifOpenService = injector.get(IfOpenService);
        this.renderer = injector.get(Renderer2);
        // Default anchor is the parent host
        this.anchorElem = parentHost.nativeElement;
        this.popoverInstance = new Popover(this.el.nativeElement);
        this.subscription = this.ifOpenService.openChange.subscribe(change => {
            if (change) {
                this.anchor();
                this.attachESCListener();
            }
            else {
                this.release();
                this.detachESCListener();
            }
        });
        if (this.ifOpenService.open) {
            this.anchor();
            this.attachESCListener();
        }
    }
    anchor() {
        this.updateAnchor = true;
        // Ugh
        this.ignore = this.ifOpenService.originalEvent;
    }
    release() {
        this.detachOutsideClickListener();
        this.popoverInstance.release();
    }
    ngAfterViewChecked() {
        if (this.updateAnchor) {
            this.updateAnchor = false;
            this.popoverInstance
                .anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
                .subscribe(() => {
                // if a scroll event is detected, close the popover
                this.ifOpenService.open = false;
            });
            this.attachOutsideClickListener();
        }
    }
    ngOnDestroy() {
        this.release();
        this.detachESCListener();
        this.subscription.unsubscribe();
    }
    /*
       * Fallback to hide when *clrIfOpen is not being used
       */
    get isOffScreen() {
        return this.ifOpenService.open ? false : true;
    }
    attachESCListener() {
        if (!this.popoverOptions.ignoreGlobalESCListener) {
            this.documentESCListener = this.renderer.listen('document', 'keydown', event => {
                if (event && event.key) {
                    if (event.key === 'Escape' || event.key === 'Esc') {
                        this.ifOpenService.open = false;
                    }
                }
            });
        }
    }
    detachESCListener() {
        if (this.documentESCListener) {
            this.documentESCListener();
            delete this.documentESCListener;
        }
    }
    attachOutsideClickListener() {
        if (this.closeOnOutsideClick) {
            this.hostClickListener = this.renderer.listen(this.el.nativeElement, 'click', event => (this.ignore = event));
            if (this.ignoredElement) {
                this.ignoredElementClickListener = this.renderer.listen(this.ignoredElement, 'click', event => (this.ignore = event));
            }
            this.documentClickListener = this.renderer.listen('document', 'click', event => {
                if (event === this.ignore) {
                    delete this.ignore;
                }
                else {
                    this.ifOpenService.open = false;
                }
            });
        }
    }
    detachOutsideClickListener() {
        if (this.closeOnOutsideClick) {
            if (this.hostClickListener) {
                this.hostClickListener();
                delete this.hostClickListener;
            }
            if (this.ignoredElementClickListener) {
                this.ignoredElementClickListener();
                delete this.ignoredElementClickListener;
            }
            if (this.documentClickListener) {
                this.documentClickListener();
                delete this.documentClickListener;
            }
        }
    }
};
tslib_1.__decorate([
    HostBinding('class.is-off-screen'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], AbstractPopover.prototype, "isOffScreen", null);
AbstractPopover = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(1, SkipSelf()),
    tslib_1.__metadata("design:paramtypes", [Injector, ElementRef])
], AbstractPopover);
export { AbstractPopover };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtcG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvY29tbW9uL2Fic3RyYWN0LXBvcG92ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBRUwsVUFBVSxFQUNWLFdBQVcsRUFDWCxVQUFVLEVBQ1YsUUFBUSxFQUVSLFNBQVMsRUFDVCxRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRXhFLE9BQU8sRUFBUyxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFHM0Msd0dBQXdHO0FBRXhHLElBQXNCLGVBQWUsR0FBckMsTUFBc0IsZUFBZTtJQUNuQyxZQUFZLFFBQWtCLEVBQXdCLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUE4QnBFLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBS25CLG1CQUFjLEdBQW1CLEVBQUUsQ0FBQztRQTJDOUM7OzthQUdLO1FBQ0Usd0JBQW1CLEdBQUcsS0FBSyxDQUFDO1FBakZqQyxJQUFJLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QyxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBRTNDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMs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dEVDO0lBREMsV0FBVyxDQUFDLHFCQUFxQixDQUFDOzs7a0RBR2xDO0FBN0VtQixlQUFlO0lBRHBDLFVBQVUsRUFBRTtJQUVzQixtQkFBQSxRQUFRLEVBQUUsQ0FBQTs2Q0FBckIsUUFBUSxFQUFvQyxVQUFVO0dBRHhELGVBQWUsQ0FpSnBDO1NBakpxQixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEluamVjdGFibGUsXG4gIEluamVjdG9yLFxuICBPbkRlc3Ryb3ksXG4gIFJlbmRlcmVyMixcbiAgU2tpcFNlbGYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IElmT3BlblNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1vcGVuLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBQb2ludCwgUG9wb3ZlciB9IGZyb20gJy4vcG9wb3Zlcic7XG5pbXBvcnQgeyBQb3BvdmVyT3B0aW9ucyB9IGZyb20gJy4vcG9wb3Zlci1vcHRpb25zLmludGVyZmFjZSc7XG5cbi8vIExpdGVyYWxseSBhbnkgYW5ub3RhdGlvbiB3b3VsZCB3b3JrIGhlcmUsIGJ1dCB3cml0aW5nIG91ciBvd24gQEhvbmV5QmFkZ2VyIGFubm90YXRpb24gZmVlbHMgb3ZlcmtpbGwuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RQb3BvdmVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLCBAU2tpcFNlbGYoKSBwcm90ZWN0ZWQgcGFyZW50SG9zdDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuZWwgPSBpbmplY3Rvci5nZXQoRWxlbWVudFJlZik7XG4gICAgdGhpcy5pZk9wZW5TZXJ2aWNlID0gaW5qZWN0b3IuZ2V0KElmT3BlblNlcnZpY2UpO1xuICAgIHRoaXMucmVuZGVyZXIgPSBpbmplY3Rvci5nZXQoUmVuZGVyZXIyKTtcbiAgICAvLyBEZWZhdWx0IGFuY2hvciBpcyB0aGUgcGFyZW50IGhvc3RcbiAgICB0aGlzLmFuY2hvckVsZW0gPSBwYXJlbnRIb3N0Lm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICB0aGlzLnBvcG92ZXJJbnN0YW5jZSA9IG5ldyBQb3BvdmVyKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbkNoYW5nZS5zdWJzY3JpYmUoY2hhbmdlID0+IHtcbiAgICAgIGlmIChjaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5hbmNob3IoKTtcbiAgICAgICAgdGhpcy5hdHRhY2hFU0NMaXN0ZW5lcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZWxlYXNlKCk7XG4gICAgICAgIHRoaXMuZGV0YWNoRVNDTGlzdGVuZXIoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW4pIHtcbiAgICAgIHRoaXMuYW5jaG9yKCk7XG4gICAgICB0aGlzLmF0dGFjaEVTQ0xpc3RlbmVyKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGVsOiBFbGVtZW50UmVmO1xuICBwcm90ZWN0ZWQgaWZPcGVuU2VydmljZTogSWZPcGVuU2VydmljZTtcbiAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjI7XG5cbiAgcHJpdmF0ZSBwb3BvdmVySW5zdGFuY2U6IFBvcG92ZXI7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSB1cGRhdGVBbmNob3IgPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgYW5jaG9yRWxlbTogYW55O1xuICBwcm90ZWN0ZWQgYW5jaG9yUG9pbnQ6IFBvaW50O1xuICBwcm90ZWN0ZWQgcG9wb3ZlclBvaW50OiBQb2ludDtcbiAgcHJvdGVjdGVkIHBvcG92ZXJPcHRpb25zOiBQb3BvdmVyT3B0aW9ucyA9IHt9O1xuXG4gIHByb3RlY3RlZCBpZ25vcmVkRWxlbWVudDogYW55O1xuXG4gIHByb3RlY3RlZCBhbmNob3IoKSB7XG4gICAgdGhpcy51cGRhdGVBbmNob3IgPSB0cnVlO1xuICAgIC8vIFVnaFxuICAgIHRoaXMuaWdub3JlID0gdGhpcy5pZk9wZW5TZXJ2aWNlLm9yaWdpbmFsRXZlbnQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVsZWFzZSgpIHtcbiAgICB0aGlzLmRldGFjaE91dHNpZGVDbGlja0xpc3RlbmVyKCk7XG4gICAgdGhpcy5wb3BvdmVySW5zdGFuY2UucmVsZWFzZSgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIGlmICh0aGlzLnVwZGF0ZUFuY2hvcikge1xuICAgICAgdGhpcy51cGRhdGVBbmNob3IgPSBmYWxzZTtcbiAgICAgIHRoaXMucG9wb3Zlckluc3RhbmNlXG4gICAgICAgIC5hbmNob3IodGhpcy5hbmNob3JFbGVtLCB0aGlzLmFuY2hvclBvaW50LCB0aGlzLnBvcG92ZXJQb2ludCwgdGhpcy5wb3BvdmVyT3B0aW9ucylcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgLy8gaWYgYSBzY3JvbGwgZXZlbnQgaXMgZGV0ZWN0ZWQsIGNsb3NlIHRoZSBwb3BvdmVyXG4gICAgICAgICAgdGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW4gPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLmF0dGFjaE91dHNpZGVDbGlja0xpc3RlbmVyKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZWxlYXNlKCk7XG4gICAgdGhpcy5kZXRhY2hFU0NMaXN0ZW5lcigpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKlxuICAgICAqIEZhbGxiYWNrIHRvIGhpZGUgd2hlbiAqY2xySWZPcGVuIGlzIG5vdCBiZWluZyB1c2VkXG4gICAgICovXG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5pcy1vZmYtc2NyZWVuJylcbiAgZ2V0IGlzT2ZmU2NyZWVuKCkge1xuICAgIHJldHVybiB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbiA/IGZhbHNlIDogdHJ1ZTtcbiAgfVxuXG4gIC8qXG4gICAgICogVW50aWwgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvODc4NSBpcyBzdXBwb3J0ZWQsIHdlIGRvbid0IGhhdmUgYW55IHdheSB0byBpbnN0YW50aWF0ZVxuICAgICAqIGEgc2VwYXJhdGUgZGlyZWN0aXZlIG9uIHRoZSBob3N0LiBTbyBsZXQncyBkbyBkaXJ0eSBidXQgcGVyZm9ybWFudCBmb3Igbm93LlxuICAgICAqL1xuICBwdWJsaWMgY2xvc2VPbk91dHNpZGVDbGljayA9IGZhbHNlO1xuICBwcml2YXRlIGhvc3RDbGlja0xpc3RlbmVyOiAoKSA9PiB2b2lkO1xuICBwcml2YXRlIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogKCkgPT4gdm9pZDtcbiAgcHJpdmF0ZSBkb2N1bWVudEVTQ0xpc3RlbmVyOiAoKSA9PiB2b2lkO1xuICBwcml2YXRlIGlnbm9yZWRFbGVtZW50Q2xpY2tMaXN0ZW5lcjogKCkgPT4gdm9pZDtcbiAgcHJpdmF0ZSBpZ25vcmU6IGFueTtcblxuICBwcml2YXRlIGF0dGFjaEVTQ0xpc3RlbmVyKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wb3BvdmVyT3B0aW9ucy5pZ25vcmVHbG9iYWxFU0NMaXN0ZW5lcikge1xuICAgICAgdGhpcy5kb2N1bWVudEVTQ0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ2tleWRvd24nLCBldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5rZXkpIHtcbiAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJyB8fCBldmVudC5rZXkgPT09ICdFc2MnKSB7XG4gICAgICAgICAgICB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbiA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXRhY2hFU0NMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kb2N1bWVudEVTQ0xpc3RlbmVyKSB7XG4gICAgICB0aGlzLmRvY3VtZW50RVNDTGlzdGVuZXIoKTtcbiAgICAgIGRlbGV0ZSB0aGlzLmRvY3VtZW50RVNDTGlzdGVuZXI7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2hPdXRzaWRlQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICBpZiAodGhpcy5jbG9zZU9uT3V0c2lkZUNsaWNrKSB7XG4gICAgICB0aGlzLmhvc3RDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnY2xpY2snLCBldmVudCA9PiAodGhpcy5pZ25vcmUgPSBldmVudCkpO1xuICAgICAgaWYgKHRoaXMuaWdub3JlZEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5pZ25vcmVkRWxlbWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICB0aGlzLmlnbm9yZWRFbGVtZW50LFxuICAgICAgICAgICdjbGljaycsXG4gICAgICAgICAgZXZlbnQgPT4gKHRoaXMuaWdub3JlID0gZXZlbnQpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50ID09PSB0aGlzLmlnbm9yZSkge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLmlnbm9yZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRldGFjaE91dHNpZGVDbGlja0xpc3RlbmVyKCkge1xuICAgIGlmICh0aGlzLmNsb3NlT25PdXRzaWRlQ2xpY2spIHtcbiAgICAgIGlmICh0aGlzLmhvc3RDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuaG9zdENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuaG9zdENsaWNrTGlzdGVuZXI7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pZ25vcmVkRWxlbWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5pZ25vcmVkRWxlbWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuaWdub3JlZEVsZW1lbnRDbGlja0xpc3RlbmVyO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==