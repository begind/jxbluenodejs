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
let ClrPopoverContent = class ClrPopoverContent {
    constructor(document, container, template, renderer, smartPositionService, smartEventsService, smartOpenService) {
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
    set open(value) {
        this.smartOpenService.open = !!value;
    }
    set contentAt(position) {
        this.smartPositionService.position = position;
    }
    set outsideClickClose(clickToClose) {
        this.smartEventsService.outsideClickClose = !!clickToClose;
    }
    set scrollToClose(scrollToClose) {
        this.smartEventsService.scrollToClose = !!scrollToClose;
    }
    ngAfterViewInit() {
        this.subscriptions.push(this.smartOpenService.openChange.subscribe(change => {
            if (change) {
                this.addContent();
            }
            else {
                this.removeContent();
            }
        }));
    }
    ngOnDestroy() {
        this.removeContent();
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    removeContent() {
        if (!this.view) {
            return;
        }
        this.view.rootNodes.forEach(node => this.renderer.removeChild(this.document.body, node));
        this.container.clear();
        delete this.view;
        this.hasPositionCoords = false;
    }
    /**
     * TODO(matt): investigate why DebugElement retains a reference to the nodes and causes a memory leak.
     * A note about the use of appendChild/removeChild
     * The DebugElement is keeping a reference to the detached node and its unclear why.
     * This does warrant further investigation. But, since it doesn't happen in production mode
     * it is a low priority issue for now.
     */
    addContent() {
        // Create the view container
        this.view = this.container.createEmbeddedView(this.template);
        this.smartEventsService.contentRef = this.view.rootNodes[0]; // So we know where/what to set close focus on
        // Position the content and add a click listener
        this.renderer.addClass(this.view.rootNodes[0], 'clr-popover-content');
        this.renderer.listen(this.view.rootNodes[0], 'click', event => {
            this.smartOpenService.openEvent = event;
        });
        this.view.rootNodes.forEach(node => {
            this.renderer.appendChild(this.document.body, node);
        });
    }
    ngAfterContentChecked() {
        // In order to get accurate content height/width values, we cannot calculate alignment offsets until after the
        // projected content has stabilized.
        if (this.smartOpenService.open && this.view && !this.hasPositionCoords) {
            const positionCoords = this.smartPositionService.alignContent(this.view.rootNodes[0]);
            this.renderer.setStyle(this.view.rootNodes[0], 'top', `${positionCoords.yOffset}px`);
            this.renderer.setStyle(this.view.rootNodes[0], 'left', `${positionCoords.xOffset}px`);
            this.hasPositionCoords = true;
        }
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
export { ClrPopoverContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1jb250ZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvcG9wb3Zlci9wb3BvdmVyLWNvbnRlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHO0FBQ0gsT0FBTyxFQUNMLFNBQVMsRUFFVCxNQUFNLEVBQ04sS0FBSyxFQUVMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsZ0JBQWdCLEdBRWpCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUczQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUdqRix5RUFBeUU7QUFDekUsZUFBZTtBQUVmLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBd0I1QixZQUM0QixRQUFzQixFQUN4QyxTQUEyQixFQUMzQixRQUEwQixFQUMxQixRQUFtQixFQUNuQixvQkFBK0MsRUFDL0Msa0JBQTJDLEVBQzNDLGdCQUF5QztRQU52QixhQUFRLEdBQVIsUUFBUSxDQUFjO1FBQ3hDLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzNCLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBQzFCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUEyQjtRQUMvQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXlCO1FBQzNDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBeUI7UUE3QjNDLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQStFbkMsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO0lBakQvQixDQUFDO0lBM0JKLElBQVcsSUFBSSxDQUFDLEtBQWM7UUFDNUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3ZDLENBQUM7SUFHRCxJQUFJLFNBQVMsQ0FBQyxRQUE0QjtRQUN4QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUNoRCxDQUFDO0lBR0QsSUFBSSxpQkFBaUIsQ0FBQyxZQUFZO1FBQ2hDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDO0lBQzdELENBQUM7SUFHRCxJQUFJLGFBQWEsQ0FBQyxhQUFhO1FBQzdCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUMxRCxDQUFDO0lBWUQsZUFBZTtRQUNiLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNsRCxJQUFJLE1BQU0sRUFBRTtnQkFDVixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDbkI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3RCO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVPLGFBQWE7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNLLFVBQVU7UUFDaEIsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLDhDQUE4QztRQUMzRyxnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7WUFDNUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBR0QscUJBQXFCO1FBQ25CLDhHQUE4RztRQUM5RyxvQ0FBb0M7UUFDcEMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDdEUsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLGNBQWMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1lBQ3JGLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLGNBQWMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7U0FDL0I7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQXhGQztJQURDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQzs7OzZDQUcxQjtBQUdEO0lBREMsS0FBSyxDQUFDLHFCQUFxQixDQUFDOzs7a0RBRzVCO0FBR0Q7SUFEQyxLQUFLLENBQUMsc0NBQXNDLENBQUM7OzswREFHN0M7QUFHRDtJQURDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQzs7O3NEQUd2QztBQXRCVSxpQkFBaUI7SUFEN0IsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFLENBQUM7SUEwQjFDLG1CQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTs2Q0FBbUIsWUFBWTtRQUM3QixnQkFBZ0I7UUFDakIsV0FBVztRQUNYLFNBQVM7UUFDRyx5QkFBeUI7UUFDM0IsdUJBQXVCO1FBQ3pCLHVCQUF1QjtHQS9CeEMsaUJBQWlCLENBNkY3QjtTQTdGWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ2xyUG9wb3ZlclRvZ2dsZVNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9wb3BvdmVyLXRvZ2dsZS5zZXJ2aWNlJztcbmltcG9ydCB7IENsclBvcG92ZXJFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvcG9wb3Zlci1ldmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJQb3BvdmVyUG9zaXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvcG9wb3Zlci1wb3NpdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IENsclBvcG92ZXJQb3NpdGlvbiB9IGZyb20gJy4vaW50ZXJmYWNlcy9wb3BvdmVyLXBvc2l0aW9uLmludGVyZmFjZSc7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzIwMzUxI2lzc3VlY29tbWVudC0zNDQwMDk4ODdcbi8qKiBAZHluYW1pYyAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NsclBvcG92ZXJDb250ZW50XScgfSlcbmV4cG9ydCBjbGFzcyBDbHJQb3BvdmVyQ29udGVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgdmlldzogRW1iZWRkZWRWaWV3UmVmPHZvaWQ+O1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgQElucHV0KCdjbHJQb3BvdmVyQ29udGVudCcpXG4gIHB1YmxpYyBzZXQgb3Blbih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuc21hcnRPcGVuU2VydmljZS5vcGVuID0gISF2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyUG9wb3ZlckNvbnRlbnRBdCcpXG4gIHNldCBjb250ZW50QXQocG9zaXRpb246IENsclBvcG92ZXJQb3NpdGlvbikge1xuICAgIHRoaXMuc21hcnRQb3NpdGlvblNlcnZpY2UucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyUG9wb3ZlckNvbnRlbnRPdXRzaWRlQ2xpY2tUb0Nsb3NlJylcbiAgc2V0IG91dHNpZGVDbGlja0Nsb3NlKGNsaWNrVG9DbG9zZSkge1xuICAgIHRoaXMuc21hcnRFdmVudHNTZXJ2aWNlLm91dHNpZGVDbGlja0Nsb3NlID0gISFjbGlja1RvQ2xvc2U7XG4gIH1cblxuICBASW5wdXQoJ2NsclBvcG92ZXJDb250ZW50U2Nyb2xsVG9DbG9zZScpXG4gIHNldCBzY3JvbGxUb0Nsb3NlKHNjcm9sbFRvQ2xvc2UpIHtcbiAgICB0aGlzLnNtYXJ0RXZlbnRzU2VydmljZS5zY3JvbGxUb0Nsb3NlID0gISFzY3JvbGxUb0Nsb3NlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogSFRNTERvY3VtZW50LFxuICAgIHByaXZhdGUgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgc21hcnRQb3NpdGlvblNlcnZpY2U6IENsclBvcG92ZXJQb3NpdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzbWFydEV2ZW50c1NlcnZpY2U6IENsclBvcG92ZXJFdmVudHNTZXJ2aWNlLFxuICAgIHByaXZhdGUgc21hcnRPcGVuU2VydmljZTogQ2xyUG9wb3ZlclRvZ2dsZVNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuc21hcnRPcGVuU2VydmljZS5vcGVuQ2hhbmdlLnN1YnNjcmliZShjaGFuZ2UgPT4ge1xuICAgICAgICBpZiAoY2hhbmdlKSB7XG4gICAgICAgICAgdGhpcy5hZGRDb250ZW50KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVDb250ZW50KCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlQ29udGVudCgpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUNvbnRlbnQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnZpZXcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52aWV3LnJvb3ROb2Rlcy5mb3JFYWNoKG5vZGUgPT4gdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIG5vZGUpKTtcbiAgICB0aGlzLmNvbnRhaW5lci5jbGVhcigpO1xuICAgIGRlbGV0ZSB0aGlzLnZpZXc7XG4gICAgdGhpcy5oYXNQb3NpdGlvbkNvb3JkcyA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE8obWF0dCk6IGludmVzdGlnYXRlIHdoeSBEZWJ1Z0VsZW1lbnQgcmV0YWlucyBhIHJlZmVyZW5jZSB0byB0aGUgbm9kZXMgYW5kIGNhdXNlcyBhIG1lbW9yeSBsZWFrLlxuICAgKiBBIG5vdGUgYWJvdXQgdGhlIHVzZSBvZiBhcHBlbmRDaGlsZC9yZW1vdmVDaGlsZFxuICAgKiBUaGUgRGVidWdFbGVtZW50IGlzIGtlZXBpbmcgYSByZWZlcmVuY2UgdG8gdGhlIGRldGFjaGVkIG5vZGUgYW5kIGl0cyB1bmNsZWFyIHdoeS5cbiAgICogVGhpcyBkb2VzIHdhcnJhbnQgZnVydGhlciBpbnZlc3RpZ2F0aW9uLiBCdXQsIHNpbmNlIGl0IGRvZXNuJ3QgaGFwcGVuIGluIHByb2R1Y3Rpb24gbW9kZVxuICAgKiBpdCBpcyBhIGxvdyBwcmlvcml0eSBpc3N1ZSBmb3Igbm93LlxuICAgKi9cbiAgcHJpdmF0ZSBhZGRDb250ZW50KCkge1xuICAgIC8vIENyZWF0ZSB0aGUgdmlldyBjb250YWluZXJcbiAgICB0aGlzLnZpZXcgPSB0aGlzLmNvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZSk7XG4gICAgdGhpcy5zbWFydEV2ZW50c1NlcnZpY2UuY29udGVudFJlZiA9IHRoaXMudmlldy5yb290Tm9kZXNbMF07IC8vIFNvIHdlIGtub3cgd2hlcmUvd2hhdCB0byBzZXQgY2xvc2UgZm9jdXMgb25cbiAgICAvLyBQb3NpdGlvbiB0aGUgY29udGVudCBhbmQgYWRkIGEgY2xpY2sgbGlzdGVuZXJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMudmlldy5yb290Tm9kZXNbMF0sICdjbHItcG9wb3Zlci1jb250ZW50Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy52aWV3LnJvb3ROb2Rlc1swXSwgJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgdGhpcy5zbWFydE9wZW5TZXJ2aWNlLm9wZW5FdmVudCA9IGV2ZW50O1xuICAgIH0pO1xuICAgIHRoaXMudmlldy5yb290Tm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5ib2R5LCBub2RlKTtcbiAgICB9KTtcbiAgfVxuICBwcml2YXRlIGhhc1Bvc2l0aW9uQ29vcmRzID0gZmFsc2U7XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgIC8vIEluIG9yZGVyIHRvIGdldCBhY2N1cmF0ZSBjb250ZW50IGhlaWdodC93aWR0aCB2YWx1ZXMsIHdlIGNhbm5vdCBjYWxjdWxhdGUgYWxpZ25tZW50IG9mZnNldHMgdW50aWwgYWZ0ZXIgdGhlXG4gICAgLy8gcHJvamVjdGVkIGNvbnRlbnQgaGFzIHN0YWJpbGl6ZWQuXG4gICAgaWYgKHRoaXMuc21hcnRPcGVuU2VydmljZS5vcGVuICYmIHRoaXMudmlldyAmJiAhdGhpcy5oYXNQb3NpdGlvbkNvb3Jkcykge1xuICAgICAgY29uc3QgcG9zaXRpb25Db29yZHMgPSB0aGlzLnNtYXJ0UG9zaXRpb25TZXJ2aWNlLmFsaWduQ29udGVudCh0aGlzLnZpZXcucm9vdE5vZGVzWzBdKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy52aWV3LnJvb3ROb2Rlc1swXSwgJ3RvcCcsIGAke3Bvc2l0aW9uQ29vcmRzLnlPZmZzZXR9cHhgKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy52aWV3LnJvb3ROb2Rlc1swXSwgJ2xlZnQnLCBgJHtwb3NpdGlvbkNvb3Jkcy54T2Zmc2V0fXB4YCk7XG4gICAgICB0aGlzLmhhc1Bvc2l0aW9uQ29vcmRzID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==