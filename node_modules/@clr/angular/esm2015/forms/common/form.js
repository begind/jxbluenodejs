/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Directive } from '@angular/core';
import { LayoutService } from './providers/layout.service';
import { MarkControlService } from './providers/mark-control.service';
let ClrForm = class ClrForm {
    constructor(layoutService, markControlService) {
        this.layoutService = layoutService;
        this.markControlService = markControlService;
    }
    /** @deprecated since 2.0 */
    markAsDirty() {
        this.markAsTouched();
    }
    markAsTouched() {
        this.markControlService.markAsTouched();
    }
};
ClrForm = tslib_1.__decorate([
    Directive({
        selector: '[clrForm]',
        providers: [LayoutService, MarkControlService],
        host: {
            '[class.clr-form]': 'true',
            '[class.clr-form-horizontal]': 'layoutService.isHorizontal()',
            '[class.clr-form-compact]': 'layoutService.isCompact()',
        },
    }),
    tslib_1.__metadata("design:paramtypes", [LayoutService, MarkControlService])
], ClrForm);
export { ClrForm };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2NvbW1vbi9mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFXdEUsSUFBYSxPQUFPLEdBQXBCLE1BQWEsT0FBTztJQUNsQixZQUFtQixhQUE0QixFQUFVLGtCQUFzQztRQUE1RSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7SUFBRyxDQUFDO0lBRW5HLDRCQUE0QjtJQUM1QixXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFDLENBQUM7Q0FDRixDQUFBO0FBWFksT0FBTztJQVRuQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsV0FBVztRQUNyQixTQUFTLEVBQUUsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLENBQUM7UUFDOUMsSUFBSSxFQUFFO1lBQ0osa0JBQWtCLEVBQUUsTUFBTTtZQUMxQiw2QkFBNkIsRUFBRSw4QkFBOEI7WUFDN0QsMEJBQTBCLEVBQUUsMkJBQTJCO1NBQ3hEO0tBQ0YsQ0FBQzs2Q0FFa0MsYUFBYSxFQUE4QixrQkFBa0I7R0FEcEYsT0FBTyxDQVduQjtTQVhZLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExheW91dFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9sYXlvdXQuc2VydmljZSc7XG5pbXBvcnQgeyBNYXJrQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9tYXJrLWNvbnRyb2wuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJGb3JtXScsXG4gIHByb3ZpZGVyczogW0xheW91dFNlcnZpY2UsIE1hcmtDb250cm9sU2VydmljZV0sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNsci1mb3JtXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmNsci1mb3JtLWhvcml6b250YWxdJzogJ2xheW91dFNlcnZpY2UuaXNIb3Jpem9udGFsKCknLFxuICAgICdbY2xhc3MuY2xyLWZvcm0tY29tcGFjdF0nOiAnbGF5b3V0U2VydmljZS5pc0NvbXBhY3QoKScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckZvcm0ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGF5b3V0U2VydmljZTogTGF5b3V0U2VydmljZSwgcHJpdmF0ZSBtYXJrQ29udHJvbFNlcnZpY2U6IE1hcmtDb250cm9sU2VydmljZSkge31cblxuICAvKiogQGRlcHJlY2F0ZWQgc2luY2UgMi4wICovXG4gIG1hcmtBc0RpcnR5KCkge1xuICAgIHRoaXMubWFya0FzVG91Y2hlZCgpO1xuICB9XG5cbiAgbWFya0FzVG91Y2hlZCgpIHtcbiAgICB0aGlzLm1hcmtDb250cm9sU2VydmljZS5tYXJrQXNUb3VjaGVkKCk7XG4gIH1cbn1cbiJdfQ==