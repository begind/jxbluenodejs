/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Directive, HostListener } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { TooltipIdService } from './providers/tooltip-id.service';
let ClrTooltipTrigger = class ClrTooltipTrigger {
    constructor(ifOpenService, tooltipIdService) {
        this.ifOpenService = ifOpenService;
        this.tooltipIdService = tooltipIdService;
        this.subs = [];
        // The aria-described by comes from the id of content. It
        this.subs.push(this.tooltipIdService.id.subscribe(tooltipId => (this.ariaDescribedBy = tooltipId)));
    }
    showTooltip() {
        this.ifOpenService.open = true;
    }
    hideTooltip() {
        this.ifOpenService.open = false;
    }
    ngOnDestroy() {
        this.subs.forEach(sub => sub.unsubscribe());
    }
};
tslib_1.__decorate([
    HostListener('mouseenter'),
    HostListener('focus'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ClrTooltipTrigger.prototype, "showTooltip", null);
tslib_1.__decorate([
    HostListener('mouseleave'),
    HostListener('blur'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ClrTooltipTrigger.prototype, "hideTooltip", null);
ClrTooltipTrigger = tslib_1.__decorate([
    Directive({
        selector: '[clrTooltipTrigger]',
        host: {
            tabindex: '0',
            '[class.tooltip-trigger]': 'true',
            '[attr.aria-describedby]': 'ariaDescribedBy',
            '[attr.role]': '"button"',
        },
    }),
    tslib_1.__metadata("design:paramtypes", [IfOpenService, TooltipIdService])
], ClrTooltipTrigger);
export { ClrTooltipTrigger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC10cmlnZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsicG9wb3Zlci90b29sdGlwL3Rvb2x0aXAtdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQVlsRSxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUc1QixZQUFvQixhQUE0QixFQUFVLGdCQUFrQztRQUF4RSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFEcEYsU0FBSSxHQUFtQixFQUFFLENBQUM7UUFFaEMseURBQXlEO1FBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RyxDQUFDO0lBSUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNqQyxDQUFDO0lBSUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNsQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQztDQUNGLENBQUE7QUFiQztJQUZDLFlBQVksQ0FBQyxZQUFZLENBQUM7SUFDMUIsWUFBWSxDQUFDLE9BQU8sQ0FBQzs7OztvREFHckI7QUFJRDtJQUZDLFlBQVksQ0FBQyxZQUFZLENBQUM7SUFDMUIsWUFBWSxDQUFDLE1BQU0sQ0FBQzs7OztvREFHcEI7QUFsQlUsaUJBQWlCO0lBVDdCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLEdBQUc7WUFDYix5QkFBeUIsRUFBRSxNQUFNO1lBQ2pDLHlCQUF5QixFQUFFLGlCQUFpQjtZQUM1QyxhQUFhLEVBQUUsVUFBVTtTQUMxQjtLQUNGLENBQUM7NkNBSW1DLGFBQWEsRUFBNEIsZ0JBQWdCO0dBSGpGLGlCQUFpQixDQXVCN0I7U0F2QlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSWZPcGVuU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLW9wZW4uc2VydmljZSc7XG5pbXBvcnQgeyBUb29sdGlwSWRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdG9vbHRpcC1pZC5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2xyVG9vbHRpcFRyaWdnZXJdJyxcbiAgaG9zdDoge1xuICAgIHRhYmluZGV4OiAnMCcsXG4gICAgJ1tjbGFzcy50b29sdGlwLXRyaWdnZXJdJzogJ3RydWUnLFxuICAgICdbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XSc6ICdhcmlhRGVzY3JpYmVkQnknLFxuICAgICdbYXR0ci5yb2xlXSc6ICdcImJ1dHRvblwiJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyVG9vbHRpcFRyaWdnZXIge1xuICBwdWJsaWMgYXJpYURlc2NyaWJlZEJ5O1xuICBwcml2YXRlIHN1YnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaWZPcGVuU2VydmljZTogSWZPcGVuU2VydmljZSwgcHJpdmF0ZSB0b29sdGlwSWRTZXJ2aWNlOiBUb29sdGlwSWRTZXJ2aWNlKSB7XG4gICAgLy8gVGhlIGFyaWEtZGVzY3JpYmVkIGJ5IGNvbWVzIGZyb20gdGhlIGlkIG9mIGNvbnRlbnQuIEl0XG4gICAgdGhpcy5zdWJzLnB1c2godGhpcy50b29sdGlwSWRTZXJ2aWNlLmlkLnN1YnNjcmliZSh0b29sdGlwSWQgPT4gKHRoaXMuYXJpYURlc2NyaWJlZEJ5ID0gdG9vbHRpcElkKSkpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJylcbiAgc2hvd1Rvb2x0aXAoKTogdm9pZCB7XG4gICAgdGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW4gPSB0cnVlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBoaWRlVG9vbHRpcCgpOiB2b2lkIHtcbiAgICB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbiA9IGZhbHNlO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19