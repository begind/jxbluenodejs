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
var AbstractPopover = /** @class */ (function () {
    function AbstractPopover(injector, parentHost) {
        var _this = this;
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
        this.subscription = this.ifOpenService.openChange.subscribe(function (change) {
            if (change) {
                _this.anchor();
                _this.attachESCListener();
            }
            else {
                _this.release();
                _this.detachESCListener();
            }
        });
        if (this.ifOpenService.open) {
            this.anchor();
            this.attachESCListener();
        }
    }
    AbstractPopover.prototype.anchor = function () {
        this.updateAnchor = true;
        // Ugh
        this.ignore = this.ifOpenService.originalEvent;
    };
    AbstractPopover.prototype.release = function () {
        this.detachOutsideClickListener();
        this.popoverInstance.release();
    };
    AbstractPopover.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this.updateAnchor) {
            this.updateAnchor = false;
            this.popoverInstance
                .anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
                .subscribe(function () {
                // if a scroll event is detected, close the popover
                _this.ifOpenService.open = false;
            });
            this.attachOutsideClickListener();
        }
    };
    AbstractPopover.prototype.ngOnDestroy = function () {
        this.release();
        this.detachESCListener();
        this.subscription.unsubscribe();
    };
    Object.defineProperty(AbstractPopover.prototype, "isOffScreen", {
        /*
           * Fallback to hide when *clrIfOpen is not being used
           */
        get: function () {
            return this.ifOpenService.open ? false : true;
        },
        enumerable: true,
        configurable: true
    });
    AbstractPopover.prototype.attachESCListener = function () {
        var _this = this;
        if (!this.popoverOptions.ignoreGlobalESCListener) {
            this.documentESCListener = this.renderer.listen('document', 'keydown', function (event) {
                if (event && event.key) {
                    if (event.key === 'Escape' || event.key === 'Esc') {
                        _this.ifOpenService.open = false;
                    }
                }
            });
        }
    };
    AbstractPopover.prototype.detachESCListener = function () {
        if (this.documentESCListener) {
            this.documentESCListener();
            delete this.documentESCListener;
        }
    };
    AbstractPopover.prototype.attachOutsideClickListener = function () {
        var _this = this;
        if (this.closeOnOutsideClick) {
            this.hostClickListener = this.renderer.listen(this.el.nativeElement, 'click', function (event) { return (_this.ignore = event); });
            if (this.ignoredElement) {
                this.ignoredElementClickListener = this.renderer.listen(this.ignoredElement, 'click', function (event) { return (_this.ignore = event); });
            }
            this.documentClickListener = this.renderer.listen('document', 'click', function (event) {
                if (event === _this.ignore) {
                    delete _this.ignore;
                }
                else {
                    _this.ifOpenService.open = false;
                }
            });
        }
    };
    AbstractPopover.prototype.detachOutsideClickListener = function () {
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
    return AbstractPopover;
}());
export { AbstractPopover };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtcG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvY29tbW9uL2Fic3RyYWN0LXBvcG92ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBRUwsVUFBVSxFQUNWLFdBQVcsRUFDWCxVQUFVLEVBQ1YsUUFBUSxFQUVSLFNBQVMsRUFDVCxRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRXhFLE9BQU8sRUFBUyxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFHM0Msd0dBQXdHO0FBRXhHO0lBQ0UseUJBQVksUUFBa0IsRUFBd0IsVUFBc0I7UUFBNUUsaUJBcUJDO1FBckJxRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBOEJwRSxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUtuQixtQkFBYyxHQUFtQixFQUFFLENBQUM7UUEyQzlDOzs7YUFHSztRQUNFLHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQWpGakMsSUFBSSxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEMsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUUzQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxTQUFT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QixFQUFFLENBQUM7Z0JBQzdCLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDO2FBQ25DO1NBQ0Y7SUFDSCxDQUFDO0lBckVEO1FBREMsV0FBVyxDQUFDLHFCQUFxQixDQUFDOzs7c0RBR2xDO0lBN0VtQixlQUFlO1FBRHBDLFVBQVUsRUFBRTtRQUVzQixtQkFBQSxRQUFRLEVBQUUsQ0FBQTtpREFBckIsUUFBUSxFQUFvQyxVQUFVO09BRHhELGVBQWUsQ0FpSnBDO0lBQUQsc0JBQUM7Q0FBQSxBQWpKRCxJQWlKQztTQWpKcUIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIEFmdGVyVmlld0NoZWNrZWQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgT25EZXN0cm95LFxuICBSZW5kZXJlcjIsXG4gIFNraXBTZWxmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJZk9wZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtb3Blbi5zZXJ2aWNlJztcblxuaW1wb3J0IHsgUG9pbnQsIFBvcG92ZXIgfSBmcm9tICcuL3BvcG92ZXInO1xuaW1wb3J0IHsgUG9wb3Zlck9wdGlvbnMgfSBmcm9tICcuL3BvcG92ZXItb3B0aW9ucy5pbnRlcmZhY2UnO1xuXG4vLyBMaXRlcmFsbHkgYW55IGFubm90YXRpb24gd291bGQgd29yayBoZXJlLCBidXQgd3JpdGluZyBvdXIgb3duIEBIb25leUJhZGdlciBhbm5vdGF0aW9uIGZlZWxzIG92ZXJraWxsLlxuQEluamVjdGFibGUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0UG9wb3ZlciBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3RvciwgQFNraXBTZWxmKCkgcHJvdGVjdGVkIHBhcmVudEhvc3Q6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmVsID0gaW5qZWN0b3IuZ2V0KEVsZW1lbnRSZWYpO1xuICAgIHRoaXMuaWZPcGVuU2VydmljZSA9IGluamVjdG9yLmdldChJZk9wZW5TZXJ2aWNlKTtcbiAgICB0aGlzLnJlbmRlcmVyID0gaW5qZWN0b3IuZ2V0KFJlbmRlcmVyMik7XG4gICAgLy8gRGVmYXVsdCBhbmNob3IgaXMgdGhlIHBhcmVudCBob3N0XG4gICAgdGhpcy5hbmNob3JFbGVtID0gcGFyZW50SG9zdC5uYXRpdmVFbGVtZW50O1xuXG4gICAgdGhpcy5wb3BvdmVySW5zdGFuY2UgPSBuZXcgUG9wb3Zlcih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW5DaGFuZ2Uuc3Vic2NyaWJlKGNoYW5nZSA9PiB7XG4gICAgICBpZiAoY2hhbmdlKSB7XG4gICAgICAgIHRoaXMuYW5jaG9yKCk7XG4gICAgICAgIHRoaXMuYXR0YWNoRVNDTGlzdGVuZXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVsZWFzZSgpO1xuICAgICAgICB0aGlzLmRldGFjaEVTQ0xpc3RlbmVyKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHRoaXMuaWZPcGVuU2VydmljZS5vcGVuKSB7XG4gICAgICB0aGlzLmFuY2hvcigpO1xuICAgICAgdGhpcy5hdHRhY2hFU0NMaXN0ZW5lcigpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBlbDogRWxlbWVudFJlZjtcbiAgcHJvdGVjdGVkIGlmT3BlblNlcnZpY2U6IElmT3BlblNlcnZpY2U7XG4gIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyO1xuXG4gIHByaXZhdGUgcG9wb3Zlckluc3RhbmNlOiBQb3BvdmVyO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgdXBkYXRlQW5jaG9yID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIGFuY2hvckVsZW06IGFueTtcbiAgcHJvdGVjdGVkIGFuY2hvclBvaW50OiBQb2ludDtcbiAgcHJvdGVjdGVkIHBvcG92ZXJQb2ludDogUG9pbnQ7XG4gIHByb3RlY3RlZCBwb3BvdmVyT3B0aW9uczogUG9wb3Zlck9wdGlvbnMgPSB7fTtcblxuICBwcm90ZWN0ZWQgaWdub3JlZEVsZW1lbnQ6IGFueTtcblxuICBwcm90ZWN0ZWQgYW5jaG9yKCkge1xuICAgIHRoaXMudXBkYXRlQW5jaG9yID0gdHJ1ZTtcbiAgICAvLyBVZ2hcbiAgICB0aGlzLmlnbm9yZSA9IHRoaXMuaWZPcGVuU2VydmljZS5vcmlnaW5hbEV2ZW50O1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlbGVhc2UoKSB7XG4gICAgdGhpcy5kZXRhY2hPdXRzaWRlQ2xpY2tMaXN0ZW5lcigpO1xuICAgIHRoaXMucG9wb3Zlckluc3RhbmNlLnJlbGVhc2UoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICBpZiAodGhpcy51cGRhdGVBbmNob3IpIHtcbiAgICAgIHRoaXMudXBkYXRlQW5jaG9yID0gZmFsc2U7XG4gICAgICB0aGlzLnBvcG92ZXJJbnN0YW5jZVxuICAgICAgICAuYW5jaG9yKHRoaXMuYW5jaG9yRWxlbSwgdGhpcy5hbmNob3JQb2ludCwgdGhpcy5wb3BvdmVyUG9pbnQsIHRoaXMucG9wb3Zlck9wdGlvbnMpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIC8vIGlmIGEgc2Nyb2xsIGV2ZW50IGlzIGRldGVjdGVkLCBjbG9zZSB0aGUgcG9wb3ZlclxuICAgICAgICAgIHRoaXMuaWZPcGVuU2VydmljZS5vcGVuID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5hdHRhY2hPdXRzaWRlQ2xpY2tMaXN0ZW5lcigpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVsZWFzZSgpO1xuICAgIHRoaXMuZGV0YWNoRVNDTGlzdGVuZXIoKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLypcbiAgICAgKiBGYWxsYmFjayB0byBoaWRlIHdoZW4gKmNscklmT3BlbiBpcyBub3QgYmVpbmcgdXNlZFxuICAgICAqL1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaXMtb2ZmLXNjcmVlbicpXG4gIGdldCBpc09mZlNjcmVlbigpIHtcbiAgICByZXR1cm4gdGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW4gPyBmYWxzZSA6IHRydWU7XG4gIH1cblxuICAvKlxuICAgICAqIFVudGlsIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzg3ODUgaXMgc3VwcG9ydGVkLCB3ZSBkb24ndCBoYXZlIGFueSB3YXkgdG8gaW5zdGFudGlhdGVcbiAgICAgKiBhIHNlcGFyYXRlIGRpcmVjdGl2ZSBvbiB0aGUgaG9zdC4gU28gbGV0J3MgZG8gZGlydHkgYnV0IHBlcmZvcm1hbnQgZm9yIG5vdy5cbiAgICAgKi9cbiAgcHVibGljIGNsb3NlT25PdXRzaWRlQ2xpY2sgPSBmYWxzZTtcbiAgcHJpdmF0ZSBob3N0Q2xpY2tMaXN0ZW5lcjogKCkgPT4gdm9pZDtcbiAgcHJpdmF0ZSBkb2N1bWVudENsaWNrTGlzdGVuZXI6ICgpID0+IHZvaWQ7XG4gIHByaXZhdGUgZG9jdW1lbnRFU0NMaXN0ZW5lcjogKCkgPT4gdm9pZDtcbiAgcHJpdmF0ZSBpZ25vcmVkRWxlbWVudENsaWNrTGlzdGVuZXI6ICgpID0+IHZvaWQ7XG4gIHByaXZhdGUgaWdub3JlOiBhbnk7XG5cbiAgcHJpdmF0ZSBhdHRhY2hFU0NMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucG9wb3Zlck9wdGlvbnMuaWdub3JlR2xvYmFsRVNDTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMuZG9jdW1lbnRFU0NMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdrZXlkb3duJywgZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQua2V5KSB7XG4gICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScgfHwgZXZlbnQua2V5ID09PSAnRXNjJykge1xuICAgICAgICAgICAgdGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW4gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGV0YWNoRVNDTGlzdGVuZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZG9jdW1lbnRFU0NMaXN0ZW5lcikge1xuICAgICAgdGhpcy5kb2N1bWVudEVTQ0xpc3RlbmVyKCk7XG4gICAgICBkZWxldGUgdGhpcy5kb2N1bWVudEVTQ0xpc3RlbmVyO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoT3V0c2lkZUNsaWNrTGlzdGVuZXIoKSB7XG4gICAgaWYgKHRoaXMuY2xvc2VPbk91dHNpZGVDbGljaykge1xuICAgICAgdGhpcy5ob3N0Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2NsaWNrJywgZXZlbnQgPT4gKHRoaXMuaWdub3JlID0gZXZlbnQpKTtcbiAgICAgIGlmICh0aGlzLmlnbm9yZWRFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuaWdub3JlZEVsZW1lbnRDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgdGhpcy5pZ25vcmVkRWxlbWVudCxcbiAgICAgICAgICAnY2xpY2snLFxuICAgICAgICAgIGV2ZW50ID0+ICh0aGlzLmlnbm9yZSA9IGV2ZW50KVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudCA9PT0gdGhpcy5pZ25vcmUpIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5pZ25vcmU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXRhY2hPdXRzaWRlQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICBpZiAodGhpcy5jbG9zZU9uT3V0c2lkZUNsaWNrKSB7XG4gICAgICBpZiAodGhpcy5ob3N0Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICB0aGlzLmhvc3RDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmhvc3RDbGlja0xpc3RlbmVyO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaWdub3JlZEVsZW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuaWdub3JlZEVsZW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmlnbm9yZWRFbGVtZW50Q2xpY2tMaXN0ZW5lcjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICBkZWxldGUgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXI7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=