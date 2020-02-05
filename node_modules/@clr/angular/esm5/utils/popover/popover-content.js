import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
import { Directive, Inject, Input, Renderer2, TemplateRef, ViewContainerRef, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ClrPopoverToggleService } from './providers/popover-toggle.service';
import { ClrPopoverEventsService } from './providers/popover-events.service';
import { ClrPopoverPositionService } from './providers/popover-position.service';
// https://github.com/angular/angular/issues/20351#issuecomment-344009887
/** @dynamic */
var ClrPopoverContent = /** @class */ (function () {
    function ClrPopoverContent(document, container, template, renderer, smartPositionService, smartEventsService, smartOpenService) {
        this.document = document;
        this.container = container;
        this.template = template;
        this.renderer = renderer;
        this.smartPositionService = smartPositionService;
        this.smartEventsService = smartEventsService;
        this.smartOpenService = smartOpenService;
        this.subscriptions = [];
        this.hasPositionCoords = false;
    }
    Object.defineProperty(ClrPopoverContent.prototype, "open", {
        set: function (value) {
            this.smartOpenService.open = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrPopoverContent.prototype, "contentAt", {
        set: function (position) {
            this.smartPositionService.position = position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrPopoverContent.prototype, "outsideClickClose", {
        set: function (clickToClose) {
            this.smartEventsService.outsideClickClose = !!clickToClose;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrPopoverContent.prototype, "scrollToClose", {
        set: function (scrollToClose) {
            this.smartEventsService.scrollToClose = !!scrollToClose;
        },
        enumerable: true,
        configurable: true
    });
    ClrPopoverContent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.subscriptions.push(this.smartOpenService.openChange.subscribe(function (change) {
            if (change) {
                _this.addContent();
            }
            else {
                _this.removeContent();
            }
        }));
    };
    ClrPopoverContent.prototype.ngOnDestroy = function () {
        this.removeContent();
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ClrPopoverContent.prototype.removeContent = function () {
        var _this = this;
        if (!this.view) {
            return;
        }
        this.view.rootNodes.forEach(function (node) { return _this.renderer.removeChild(_this.document.body, node); });
        this.container.clear();
        delete this.view;
        this.hasPositionCoords = false;
    };
    /**
     * TODO(matt): investigate why DebugElement retains a reference to the nodes and causes a memory leak.
     * A note about the use of appendChild/removeChild
     * The DebugElement is keeping a reference to the detached node and its unclear why.
     * This does warrant further investigation. But, since it doesn't happen in production mode
     * it is a low priority issue for now.
     */
    ClrPopoverContent.prototype.addContent = function () {
        var _this = this;
        // Create the view container
        this.view = this.container.createEmbeddedView(this.template);
        this.smartEventsService.contentRef = this.view.rootNodes[0]; // So we know where/what to set close focus on
        // Position the content and add a click listener
        this.renderer.addClass(this.view.rootNodes[0], 'clr-popover-content');
        this.renderer.listen(this.view.rootNodes[0], 'click', function (event) {
            _this.smartOpenService.openEvent = event;
        });
        this.view.rootNodes.forEach(function (node) {
            _this.renderer.appendChild(_this.document.body, node);
        });
    };
    ClrPopoverContent.prototype.ngAfterContentChecked = function () {
        // In order to get accurate content height/width values, we cannot calculate alignment offsets until after the
        // projected content has stabilized.
        if (this.smartOpenService.open && this.view && !this.hasPositionCoords) {
            var positionCoords = this.smartPositionService.alignContent(this.view.rootNodes[0]);
            this.renderer.setStyle(this.view.rootNodes[0], 'top', positionCoords.yOffset + "px");
            this.renderer.setStyle(this.view.rootNodes[0], 'left', positionCoords.xOffset + "px");
            this.hasPositionCoords = true;
        }
    };
    tslib_1.__decorate([
        Input('clrPopoverContent'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrPopoverContent.prototype, "open", null);
    tslib_1.__decorate([
        Input('clrPopoverContentAt'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrPopoverContent.prototype, "contentAt", null);
    tslib_1.__decorate([
        Input('clrPopoverContentOutsideClickToClose'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrPopoverContent.prototype, "outsideClickClose", null);
    tslib_1.__decorate([
        Input('clrPopoverContentScrollToClose'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrPopoverContent.prototype, "scrollToClose", null);
    ClrPopoverContent = tslib_1.__decorate([
        Directive({ selector: '[clrPopoverContent]' }),
        tslib_1.__param(0, Inject(DOCUMENT)),
        tslib_1.__metadata("design:paramtypes", [HTMLDocument,
            ViewContainerRef,
            TemplateRef,
            Renderer2,
            ClrPopoverPositionService,
            ClrPopoverEventsService,
            ClrPopoverToggleService])
    ], ClrPopoverContent);
    return ClrPopoverContent;
}());
export { ClrPopoverContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1jb250ZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvcG9wb3Zlci9wb3BvdmVyLWNvbnRlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHO0FBQ0gsT0FBTyxFQUNMLFNBQVMsRUFFVCxNQUFNLEVBQ04sS0FBSyxFQUVMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsZ0JBQWdCLEdBRWpCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUczQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUdqRix5RUFBeUU7QUFDekUsZUFBZTtBQUVmO0lBd0JFLDJCQUM0QixRQUFzQixFQUN4QyxTQUEyQixFQUMzQixRQUEwQixFQUMxQixRQUFtQixFQUNuQixvQkFBK0MsRUFDL0Msa0JBQTJDLEVBQzNDLGdCQUF5QztRQU52QixhQUFRLEdBQVIsUUFBUSxDQUFjO1FBQ3hDLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzNCLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBQzFCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUEyQjtRQUMvQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXlCO1FBQzNDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBeUI7UUE3QjNDLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQStFbkMsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO0lBakQvQixDQUFDO0lBM0JKLHNCQUFXLG1DQUFJO2FBQWYsVUFBZ0IsS0FBYztZQUM1QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLENB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QjtJQUFELHdCQUFDO0NBQUEsQUE3RkQsSUE2RkM7U0E3RlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqXG4gKi9cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIEFmdGVyQ29udGVudENoZWNrZWQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENsclBvcG92ZXJUb2dnbGVTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvcG9wb3Zlci10b2dnbGUuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJQb3BvdmVyRXZlbnRzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3BvcG92ZXItZXZlbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyUG9wb3ZlclBvc2l0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3BvcG92ZXItcG9zaXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBDbHJQb3BvdmVyUG9zaXRpb24gfSBmcm9tICcuL2ludGVyZmFjZXMvcG9wb3Zlci1wb3NpdGlvbi5pbnRlcmZhY2UnO1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8yMDM1MSNpc3N1ZWNvbW1lbnQtMzQ0MDA5ODg3XG4vKiogQGR5bmFtaWMgKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJQb3BvdmVyQ29udGVudF0nIH0pXG5leHBvcnQgY2xhc3MgQ2xyUG9wb3ZlckNvbnRlbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkLCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHZpZXc6IEVtYmVkZGVkVmlld1JlZjx2b2lkPjtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIEBJbnB1dCgnY2xyUG9wb3ZlckNvbnRlbnQnKVxuICBwdWJsaWMgc2V0IG9wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnNtYXJ0T3BlblNlcnZpY2Uub3BlbiA9ICEhdmFsdWU7XG4gIH1cblxuICBASW5wdXQoJ2NsclBvcG92ZXJDb250ZW50QXQnKVxuICBzZXQgY29udGVudEF0KHBvc2l0aW9uOiBDbHJQb3BvdmVyUG9zaXRpb24pIHtcbiAgICB0aGlzLnNtYXJ0UG9zaXRpb25TZXJ2aWNlLnBvc2l0aW9uID0gcG9zaXRpb247XG4gIH1cblxuICBASW5wdXQoJ2NsclBvcG92ZXJDb250ZW50T3V0c2lkZUNsaWNrVG9DbG9zZScpXG4gIHNldCBvdXRzaWRlQ2xpY2tDbG9zZShjbGlja1RvQ2xvc2UpIHtcbiAgICB0aGlzLnNtYXJ0RXZlbnRzU2VydmljZS5vdXRzaWRlQ2xpY2tDbG9zZSA9ICEhY2xpY2tUb0Nsb3NlO1xuICB9XG5cbiAgQElucHV0KCdjbHJQb3BvdmVyQ29udGVudFNjcm9sbFRvQ2xvc2UnKVxuICBzZXQgc2Nyb2xsVG9DbG9zZShzY3JvbGxUb0Nsb3NlKSB7XG4gICAgdGhpcy5zbWFydEV2ZW50c1NlcnZpY2Uuc2Nyb2xsVG9DbG9zZSA9ICEhc2Nyb2xsVG9DbG9zZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IEhUTUxEb2N1bWVudCxcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIHNtYXJ0UG9zaXRpb25TZXJ2aWNlOiBDbHJQb3BvdmVyUG9zaXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgc21hcnRFdmVudHNTZXJ2aWNlOiBDbHJQb3BvdmVyRXZlbnRzU2VydmljZSxcbiAgICBwcml2YXRlIHNtYXJ0T3BlblNlcnZpY2U6IENsclBvcG92ZXJUb2dnbGVTZXJ2aWNlXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLnNtYXJ0T3BlblNlcnZpY2Uub3BlbkNoYW5nZS5zdWJzY3JpYmUoY2hhbmdlID0+IHtcbiAgICAgICAgaWYgKGNoYW5nZSkge1xuICAgICAgICAgIHRoaXMuYWRkQ29udGVudCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVtb3ZlQ29udGVudCgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZUNvbnRlbnQoKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVDb250ZW50KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy52aWV3KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudmlldy5yb290Tm9kZXMuZm9yRWFjaChub2RlID0+IHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5kb2N1bWVudC5ib2R5LCBub2RlKSk7XG4gICAgdGhpcy5jb250YWluZXIuY2xlYXIoKTtcbiAgICBkZWxldGUgdGhpcy52aWV3O1xuICAgIHRoaXMuaGFzUG9zaXRpb25Db29yZHMgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPKG1hdHQpOiBpbnZlc3RpZ2F0ZSB3aHkgRGVidWdFbGVtZW50IHJldGFpbnMgYSByZWZlcmVuY2UgdG8gdGhlIG5vZGVzIGFuZCBjYXVzZXMgYSBtZW1vcnkgbGVhay5cbiAgICogQSBub3RlIGFib3V0IHRoZSB1c2Ugb2YgYXBwZW5kQ2hpbGQvcmVtb3ZlQ2hpbGRcbiAgICogVGhlIERlYnVnRWxlbWVudCBpcyBrZWVwaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBkZXRhY2hlZCBub2RlIGFuZCBpdHMgdW5jbGVhciB3aHkuXG4gICAqIFRoaXMgZG9lcyB3YXJyYW50IGZ1cnRoZXIgaW52ZXN0aWdhdGlvbi4gQnV0LCBzaW5jZSBpdCBkb2Vzbid0IGhhcHBlbiBpbiBwcm9kdWN0aW9uIG1vZGVcbiAgICogaXQgaXMgYSBsb3cgcHJpb3JpdHkgaXNzdWUgZm9yIG5vdy5cbiAgICovXG4gIHByaXZhdGUgYWRkQ29udGVudCgpIHtcbiAgICAvLyBDcmVhdGUgdGhlIHZpZXcgY29udGFpbmVyXG4gICAgdGhpcy52aWV3ID0gdGhpcy5jb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGUpO1xuICAgIHRoaXMuc21hcnRFdmVudHNTZXJ2aWNlLmNvbnRlbnRSZWYgPSB0aGlzLnZpZXcucm9vdE5vZGVzWzBdOyAvLyBTbyB3ZSBrbm93IHdoZXJlL3doYXQgdG8gc2V0IGNsb3NlIGZvY3VzIG9uXG4gICAgLy8gUG9zaXRpb24gdGhlIGNvbnRlbnQgYW5kIGFkZCBhIGNsaWNrIGxpc3RlbmVyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnZpZXcucm9vdE5vZGVzWzBdLCAnY2xyLXBvcG92ZXItY29udGVudCcpO1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMudmlldy5yb290Tm9kZXNbMF0sICdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgIHRoaXMuc21hcnRPcGVuU2VydmljZS5vcGVuRXZlbnQgPSBldmVudDtcbiAgICB9KTtcbiAgICB0aGlzLnZpZXcucm9vdE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgbm9kZSk7XG4gICAgfSk7XG4gIH1cbiAgcHJpdmF0ZSBoYXNQb3NpdGlvbkNvb3JkcyA9IGZhbHNlO1xuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICAvLyBJbiBvcmRlciB0byBnZXQgYWNjdXJhdGUgY29udGVudCBoZWlnaHQvd2lkdGggdmFsdWVzLCB3ZSBjYW5ub3QgY2FsY3VsYXRlIGFsaWdubWVudCBvZmZzZXRzIHVudGlsIGFmdGVyIHRoZVxuICAgIC8vIHByb2plY3RlZCBjb250ZW50IGhhcyBzdGFiaWxpemVkLlxuICAgIGlmICh0aGlzLnNtYXJ0T3BlblNlcnZpY2Uub3BlbiAmJiB0aGlzLnZpZXcgJiYgIXRoaXMuaGFzUG9zaXRpb25Db29yZHMpIHtcbiAgICAgIGNvbnN0IHBvc2l0aW9uQ29vcmRzID0gdGhpcy5zbWFydFBvc2l0aW9uU2VydmljZS5hbGlnbkNvbnRlbnQodGhpcy52aWV3LnJvb3ROb2Rlc1swXSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudmlldy5yb290Tm9kZXNbMF0sICd0b3AnLCBgJHtwb3NpdGlvbkNvb3Jkcy55T2Zmc2V0fXB4YCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudmlldy5yb290Tm9kZXNbMF0sICdsZWZ0JywgYCR7cG9zaXRpb25Db29yZHMueE9mZnNldH1weGApO1xuICAgICAgdGhpcy5oYXNQb3NpdGlvbkNvb3JkcyA9IHRydWU7XG4gICAgfVxuICB9XG59XG4iXX0=