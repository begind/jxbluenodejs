/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { Layouts, LayoutService } from './providers/layout.service';
let ClrLayout = class ClrLayout {
    constructor(layoutService) {
        this.layoutService = layoutService;
    }
    ngOnInit() {
        // Only set the layout if it is a valid option
        if (this.layout && this.layoutService.isValid(this.layout)) {
            this.layoutService.layout = this.layout;
        }
    }
};
tslib_1.__decorate([
    Input('clrLayout'),
    tslib_1.__metadata("design:type", String)
], ClrLayout.prototype, "layout", void 0);
ClrLayout = tslib_1.__decorate([
    Directive({
        selector: '[clrForm][clrLayout]',
    }),
    tslib_1.__metadata("design:paramtypes", [LayoutService])
], ClrLayout);
export { ClrLayout };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY29tbW9uL2xheW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFLcEUsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBUztJQUdwQixZQUFtQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUFHLENBQUM7SUFFbkQsUUFBUTtRQUNOLDhDQUE4QztRQUM5QyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzFELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDekM7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQVZxQjtJQUFuQixLQUFLLENBQUMsV0FBVyxDQUFDOzt5Q0FBaUI7QUFEekIsU0FBUztJQUhyQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsc0JBQXNCO0tBQ2pDLENBQUM7NkNBSWtDLGFBQWE7R0FIcEMsU0FBUyxDQVdyQjtTQVhZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExheW91dHMsIExheW91dFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9sYXlvdXQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJGb3JtXVtjbHJMYXlvdXRdJyxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyTGF5b3V0IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCdjbHJMYXlvdXQnKSBsYXlvdXQ6IExheW91dHM7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGxheW91dFNlcnZpY2U6IExheW91dFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gT25seSBzZXQgdGhlIGxheW91dCBpZiBpdCBpcyBhIHZhbGlkIG9wdGlvblxuICAgIGlmICh0aGlzLmxheW91dCAmJiB0aGlzLmxheW91dFNlcnZpY2UuaXNWYWxpZCh0aGlzLmxheW91dCkpIHtcbiAgICAgIHRoaXMubGF5b3V0U2VydmljZS5sYXlvdXQgPSB0aGlzLmxheW91dDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==