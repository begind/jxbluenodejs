/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let wizardHeaderActionIndex = 0;
let ClrWizardHeaderAction = class ClrWizardHeaderAction {
    constructor() {
        // title is explanatory text added to the header action
        this.title = '';
        // If our host has an ID attribute, we use this instead of our index.
        this._id = (wizardHeaderActionIndex++).toString();
        this.disabled = false;
        this.headerActionClicked = new EventEmitter(false);
    }
    get id() {
        return `clr-wizard-header-action-${this._id}`;
    }
    click() {
        if (this.disabled) {
            return;
        }
        // passing the header action id allows users to have one method that
        // routes to many different actions based on the type of header action
        // clicked. this is further aided by users being able to specify ids
        // for their header actions.
        this.headerActionClicked.emit(this._id);
    }
};
tslib_1.__decorate([
    Input('title'),
    tslib_1.__metadata("design:type", String)
], ClrWizardHeaderAction.prototype, "title", void 0);
tslib_1.__decorate([
    Input('id'),
    tslib_1.__metadata("design:type", String)
], ClrWizardHeaderAction.prototype, "_id", void 0);
tslib_1.__decorate([
    Input('clrWizardHeaderActionDisabled'),
    tslib_1.__metadata("design:type", Boolean)
], ClrWizardHeaderAction.prototype, "disabled", void 0);
tslib_1.__decorate([
    Output('actionClicked'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardHeaderAction.prototype, "headerActionClicked", void 0);
ClrWizardHeaderAction = tslib_1.__decorate([
    Component({
        selector: 'clr-wizard-header-action',
        template: `
        <button 
            type="button"
            class="btn clr-wizard-header-action btn-link"
            [id]="id"
            [class.disabled]="disabled"
            (click)="click()"
            [title]="title">
            <ng-content></ng-content>
        </button>
    `,
        host: { class: 'clr-wizard-header-action-wrapper' }
    })
], ClrWizardHeaderAction);
export { ClrWizardHeaderAction };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLWhlYWRlci1hY3Rpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ3aXphcmQvd2l6YXJkLWhlYWRlci1hY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZFLElBQUksdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO0FBaUJoQyxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQWZsQztRQWdCRSx1REFBdUQ7UUFDdkMsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUVuQyxxRUFBcUU7UUFDeEQsUUFBRyxHQUFXLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBTW5CLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFaEQsd0JBQW1CLEdBQXlCLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBYS9GLENBQUM7SUFuQkMsSUFBVyxFQUFFO1FBQ1gsT0FBTyw0QkFBNEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFNRCxLQUFLO1FBQ0gsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELG9FQUFvRTtRQUNwRSxzRUFBc0U7UUFDdEUsb0VBQW9FO1FBQ3BFLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQyxDQUFDO0NBQ0YsQ0FBQTtBQXhCaUI7SUFBZixLQUFLLENBQUMsT0FBTyxDQUFDOztvREFBb0I7QUFHdEI7SUFBWixLQUFLLENBQUMsSUFBSSxDQUFDOztrREFBc0Q7QUFNMUI7SUFBdkMsS0FBSyxDQUFDLCtCQUErQixDQUFDOzt1REFBa0M7QUFFaEQ7SUFBeEIsTUFBTSxDQUFDLGVBQWUsQ0FBQztzQ0FBc0IsWUFBWTtrRUFBbUM7QUFibEYscUJBQXFCO0lBZmpDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwwQkFBMEI7UUFDcEMsUUFBUSxFQUFFOzs7Ozs7Ozs7O0tBVVA7UUFDSCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsa0NBQWtDLEVBQUU7S0FDcEQsQ0FBQztHQUNXLHFCQUFxQixDQTBCakM7U0ExQlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5sZXQgd2l6YXJkSGVhZGVyQWN0aW9uSW5kZXggPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItd2l6YXJkLWhlYWRlci1hY3Rpb24nLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBjbHItd2l6YXJkLWhlYWRlci1hY3Rpb24gYnRuLWxpbmtcIlxuICAgICAgICAgICAgW2lkXT1cImlkXCJcbiAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiY2xpY2soKVwiXG4gICAgICAgICAgICBbdGl0bGVdPVwidGl0bGVcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9idXR0b24+XG4gICAgYCxcbiAgaG9zdDogeyBjbGFzczogJ2Nsci13aXphcmQtaGVhZGVyLWFjdGlvbi13cmFwcGVyJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJXaXphcmRIZWFkZXJBY3Rpb24ge1xuICAvLyB0aXRsZSBpcyBleHBsYW5hdG9yeSB0ZXh0IGFkZGVkIHRvIHRoZSBoZWFkZXIgYWN0aW9uXG4gIEBJbnB1dCgndGl0bGUnKSB0aXRsZTogc3RyaW5nID0gJyc7XG5cbiAgLy8gSWYgb3VyIGhvc3QgaGFzIGFuIElEIGF0dHJpYnV0ZSwgd2UgdXNlIHRoaXMgaW5zdGVhZCBvZiBvdXIgaW5kZXguXG4gIEBJbnB1dCgnaWQnKSBfaWQ6IHN0cmluZyA9ICh3aXphcmRIZWFkZXJBY3Rpb25JbmRleCsrKS50b1N0cmluZygpO1xuXG4gIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYGNsci13aXphcmQtaGVhZGVyLWFjdGlvbi0ke3RoaXMuX2lkfWA7XG4gIH1cblxuICBASW5wdXQoJ2NscldpemFyZEhlYWRlckFjdGlvbkRpc2FibGVkJykgcHVibGljIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgnYWN0aW9uQ2xpY2tlZCcpIGhlYWRlckFjdGlvbkNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG5cbiAgY2xpY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBwYXNzaW5nIHRoZSBoZWFkZXIgYWN0aW9uIGlkIGFsbG93cyB1c2VycyB0byBoYXZlIG9uZSBtZXRob2QgdGhhdFxuICAgIC8vIHJvdXRlcyB0byBtYW55IGRpZmZlcmVudCBhY3Rpb25zIGJhc2VkIG9uIHRoZSB0eXBlIG9mIGhlYWRlciBhY3Rpb25cbiAgICAvLyBjbGlja2VkLiB0aGlzIGlzIGZ1cnRoZXIgYWlkZWQgYnkgdXNlcnMgYmVpbmcgYWJsZSB0byBzcGVjaWZ5IGlkc1xuICAgIC8vIGZvciB0aGVpciBoZWFkZXIgYWN0aW9ucy5cbiAgICB0aGlzLmhlYWRlckFjdGlvbkNsaWNrZWQuZW1pdCh0aGlzLl9pZCk7XG4gIH1cbn1cbiJdfQ==