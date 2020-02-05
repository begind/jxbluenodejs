/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
var wizardHeaderActionIndex = 0;
var ClrWizardHeaderAction = /** @class */ (function () {
    function ClrWizardHeaderAction() {
        // title is explanatory text added to the header action
        this.title = '';
        // If our host has an ID attribute, we use this instead of our index.
        this._id = (wizardHeaderActionIndex++).toString();
        this.disabled = false;
        this.headerActionClicked = new EventEmitter(false);
    }
    Object.defineProperty(ClrWizardHeaderAction.prototype, "id", {
        get: function () {
            return "clr-wizard-header-action-" + this._id;
        },
        enumerable: true,
        configurable: true
    });
    ClrWizardHeaderAction.prototype.click = function () {
        if (this.disabled) {
            return;
        }
        // passing the header action id allows users to have one method that
        // routes to many different actions based on the type of header action
        // clicked. this is further aided by users being able to specify ids
        // for their header actions.
        this.headerActionClicked.emit(this._id);
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
            template: "\n        <button \n            type=\"button\"\n            class=\"btn clr-wizard-header-action btn-link\"\n            [id]=\"id\"\n            [class.disabled]=\"disabled\"\n            (click)=\"click()\"\n            [title]=\"title\">\n            <ng-content></ng-content>\n        </button>\n    ",
            host: { class: 'clr-wizard-header-action-wrapper' }
        })
    ], ClrWizardHeaderAction);
    return ClrWizardHeaderAction;
}());
export { ClrWizardHeaderAction };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLWhlYWRlci1hY3Rpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ3aXphcmQvd2l6YXJkLWhlYWRlci1hY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZFLElBQUksdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO0FBaUJoQztJQWZBO1FBZ0JFLHVEQUF1RDtRQUN2QyxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBRW5DLHFFQUFxRTtRQUN4RCxRQUFHLEdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFNbkIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUVoRCx3QkFBbUIsR0FBeUIsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFhL0YsQ0FBQztJQW5CQyxzQkFBVyxxQ0FBRTthQUFiO1lBQ0UsT0FBTyw4QkFBNEIsSUFBSSxDQUFDLEdBQUssQ0FBQztRQUNoRCxDQUFDOzs7T0FBQTtJQU1ELHFDQUFLLEdBQUw7UUFDRSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBRUQsb0VBQW9FO1FBQ3BFLHNFQUFzRTtRQUN0RSxvRUFBb0U7UUFDcEUsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUF2QmU7UUFBZixLQUFLLENBQUMsT0FBTyxDQUFDOzt3REFBb0I7SUFHdEI7UUFBWixLQUFLLENBQUMsSUFBSSxDQUFDOztzREFBc0Q7SUFNMUI7UUFBdkMsS0FBSyxDQUFDLCtCQUErQixDQUFDOzsyREFBa0M7SUFFaEQ7UUFBeEIsTUFBTSxDQUFDLGVBQWUsQ0FBQzswQ0FBc0IsWUFBWTtzRUFBbUM7SUFibEYscUJBQXFCO1FBZmpDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSwwQkFBMEI7WUFDcEMsUUFBUSxFQUFFLG1UQVVQO1lBQ0gsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLGtDQUFrQyxFQUFFO1NBQ3BELENBQUM7T0FDVyxxQkFBcUIsQ0EwQmpDO0lBQUQsNEJBQUM7Q0FBQSxBQTFCRCxJQTBCQztTQTFCWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmxldCB3aXphcmRIZWFkZXJBY3Rpb25JbmRleCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci13aXphcmQtaGVhZGVyLWFjdGlvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGNsci13aXphcmQtaGVhZGVyLWFjdGlvbiBidG4tbGlua1wiXG4gICAgICAgICAgICBbaWRdPVwiaWRcIlxuICAgICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgIChjbGljayk9XCJjbGljaygpXCJcbiAgICAgICAgICAgIFt0aXRsZV09XCJ0aXRsZVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2J1dHRvbj5cbiAgICBgLFxuICBob3N0OiB7IGNsYXNzOiAnY2xyLXdpemFyZC1oZWFkZXItYWN0aW9uLXdyYXBwZXInIH0sXG59KVxuZXhwb3J0IGNsYXNzIENscldpemFyZEhlYWRlckFjdGlvbiB7XG4gIC8vIHRpdGxlIGlzIGV4cGxhbmF0b3J5IHRleHQgYWRkZWQgdG8gdGhlIGhlYWRlciBhY3Rpb25cbiAgQElucHV0KCd0aXRsZScpIHRpdGxlOiBzdHJpbmcgPSAnJztcblxuICAvLyBJZiBvdXIgaG9zdCBoYXMgYW4gSUQgYXR0cmlidXRlLCB3ZSB1c2UgdGhpcyBpbnN0ZWFkIG9mIG91ciBpbmRleC5cbiAgQElucHV0KCdpZCcpIF9pZDogc3RyaW5nID0gKHdpemFyZEhlYWRlckFjdGlvbkluZGV4KyspLnRvU3RyaW5nKCk7XG5cbiAgcHVibGljIGdldCBpZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgY2xyLXdpemFyZC1oZWFkZXItYWN0aW9uLSR7dGhpcy5faWR9YDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyV2l6YXJkSGVhZGVyQWN0aW9uRGlzYWJsZWQnKSBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KCdhY3Rpb25DbGlja2VkJykgaGVhZGVyQWN0aW9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcblxuICBjbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHBhc3NpbmcgdGhlIGhlYWRlciBhY3Rpb24gaWQgYWxsb3dzIHVzZXJzIHRvIGhhdmUgb25lIG1ldGhvZCB0aGF0XG4gICAgLy8gcm91dGVzIHRvIG1hbnkgZGlmZmVyZW50IGFjdGlvbnMgYmFzZWQgb24gdGhlIHR5cGUgb2YgaGVhZGVyIGFjdGlvblxuICAgIC8vIGNsaWNrZWQuIHRoaXMgaXMgZnVydGhlciBhaWRlZCBieSB1c2VycyBiZWluZyBhYmxlIHRvIHNwZWNpZnkgaWRzXG4gICAgLy8gZm9yIHRoZWlyIGhlYWRlciBhY3Rpb25zLlxuICAgIHRoaXMuaGVhZGVyQWN0aW9uQ2xpY2tlZC5lbWl0KHRoaXMuX2lkKTtcbiAgfVxufVxuIl19