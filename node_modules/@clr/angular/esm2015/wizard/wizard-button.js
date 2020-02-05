/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonHubService } from './providers/button-hub.service';
import { WizardNavigationService } from './providers/wizard-navigation.service';
export const DEFAULT_BUTTON_TYPES = {
    cancel: 'cancel',
    previous: 'previous',
    next: 'next',
    finish: 'finish',
    danger: 'danger',
};
export const CUSTOM_BUTTON_TYPES = {
    cancel: 'custom-cancel',
    previous: 'custom-previous',
    next: 'custom-next',
    finish: 'custom-finish',
    danger: 'custom-danger',
};
let ClrWizardButton = class ClrWizardButton {
    constructor(navService, buttonService) {
        this.navService = navService;
        this.buttonService = buttonService;
        this.type = '';
        this.disabled = false;
        this.hidden = false;
        // EventEmitter which is emitted when a button is clicked.
        this.wasClicked = new EventEmitter(false);
    }
    checkDefaultAndCustomType(valueToCheck = '', typeToLookUp) {
        if (DEFAULT_BUTTON_TYPES[typeToLookUp] === valueToCheck) {
            return true;
        }
        if (CUSTOM_BUTTON_TYPES[typeToLookUp] === valueToCheck) {
            return true;
        }
        return false;
    }
    get isCancel() {
        return this.checkDefaultAndCustomType(this.type, 'cancel');
    }
    get isNext() {
        return this.checkDefaultAndCustomType(this.type, 'next');
    }
    get isPrevious() {
        return this.checkDefaultAndCustomType(this.type, 'previous');
    }
    get isFinish() {
        return this.checkDefaultAndCustomType(this.type, 'finish');
    }
    get isDanger() {
        return this.checkDefaultAndCustomType(this.type, 'danger');
    }
    get isPrimaryAction() {
        return this.isNext || this.isDanger || this.isFinish;
    }
    get _disabledAttribute() {
        if (this.isDisabled) {
            return '';
        }
        return null;
    }
    get isDisabled() {
        // dealing with negatives here. cognitively easier to think of it like this...
        const disabled = true;
        const nav = this.navService;
        const page = this.navService.currentPage;
        // Ensure we don't change the response until buttons are ready to avoid chocolate
        if (!this.buttonService.buttonsReady) {
            return !disabled;
        }
        if (this.disabled || nav.wizardStopNavigation || !page) {
            return true;
        }
        if (this.isCancel) {
            return !disabled;
        }
        if (this.isPrevious && (nav.currentPageIsFirst || page.previousStepDisabled)) {
            return disabled;
        }
        if (this.isDanger && !page.readyToComplete) {
            return disabled;
        }
        if (this.isNext && (nav.currentPageIsLast || !page.readyToComplete)) {
            return disabled;
        }
        if (this.isFinish && (!nav.currentPageIsLast || !page.readyToComplete)) {
            return disabled;
        }
        return !disabled;
    }
    get isHidden() {
        // dealing with negatives here. cognitively easier to think of it like this...
        const hidden = true;
        const nav = this.navService;
        // Ensure we don't change the response until buttons are ready to avoid chocolate
        if (!this.buttonService.buttonsReady) {
            return !hidden;
        }
        if (this.hidden) {
            return true;
        }
        if (this.isCancel) {
            return !hidden;
        }
        if (this.isPrevious && nav.currentPageIsFirst) {
            return hidden;
        }
        if (this.isNext && nav.currentPageIsLast) {
            return hidden;
        }
        if (this.isFinish && !nav.currentPageIsLast) {
            return hidden;
        }
        return !hidden;
    }
    click() {
        if (this.isDisabled) {
            return;
        }
        this.wasClicked.emit(this.type);
        this.buttonService.buttonClicked(this.type);
    }
};
tslib_1.__decorate([
    Input('type'),
    tslib_1.__metadata("design:type", String)
], ClrWizardButton.prototype, "type", void 0);
tslib_1.__decorate([
    Input('clrWizardButtonDisabled'),
    tslib_1.__metadata("design:type", Boolean)
], ClrWizardButton.prototype, "disabled", void 0);
tslib_1.__decorate([
    Input('clrWizardButtonHidden'),
    tslib_1.__metadata("design:type", Boolean)
], ClrWizardButton.prototype, "hidden", void 0);
tslib_1.__decorate([
    Output('clrWizardButtonClicked'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardButton.prototype, "wasClicked", void 0);
ClrWizardButton = tslib_1.__decorate([
    Component({
        selector: 'clr-wizard-button',
        template: `
        <button
            type="button"
            class="btn clr-wizard-btn"
            [class.btn-link]="isCancel"
            [class.clr-wizard-btn--tertiary]="isCancel"
            [class.btn-outline]="isPrevious"
            [class.clr-wizard-btn--secondary]="isPrevious"
            [class.btn-primary]="isPrimaryAction"
            [class.clr-wizard-btn--primary]="isPrimaryAction"
            [class.btn-success]="isFinish"
            [class.btn-danger]="isDanger"
            [class.disabled]="isDisabled"
            [attr.disabled]="_disabledAttribute"
            (click)="click()">
            <ng-content></ng-content>
        </button>
    `,
        host: { class: 'clr-wizard-btn-wrapper', '[attr.aria-hidden]': 'isHidden' },
        styles: ['[aria-hidden="true"] { display: none; }']
    }),
    tslib_1.__metadata("design:paramtypes", [WizardNavigationService, ButtonHubService])
], ClrWizardButton);
export { ClrWizardButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLWJ1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbIndpemFyZC93aXphcmQtYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUVoRixNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBUTtJQUN2QyxNQUFNLEVBQUUsUUFBUTtJQUNoQixRQUFRLEVBQUUsVUFBVTtJQUNwQixJQUFJLEVBQUUsTUFBTTtJQUNaLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0NBQ2pCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBUTtJQUN0QyxNQUFNLEVBQUUsZUFBZTtJQUN2QixRQUFRLEVBQUUsaUJBQWlCO0lBQzNCLElBQUksRUFBRSxhQUFhO0lBQ25CLE1BQU0sRUFBRSxlQUFlO0lBQ3ZCLE1BQU0sRUFBRSxlQUFlO0NBQ3hCLENBQUM7QUF5QkYsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQVUxQixZQUFtQixVQUFtQyxFQUFTLGFBQStCO1FBQTNFLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBVHhFLFNBQUksR0FBVyxFQUFFLENBQUM7UUFFQyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBRTVCLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFFL0QsMERBQTBEO1FBQ3hCLGVBQVUsR0FBeUIsSUFBSSxZQUFZLENBQVMsS0FBSyxDQUFDLENBQUM7SUFFSixDQUFDO0lBRTFGLHlCQUF5QixDQUFDLGVBQXVCLEVBQUUsRUFB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Q1QsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBaUJQO1FBQ0gsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLHdCQUF3QixFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBRTtpQkFDbEUseUNBQXlDO0tBQ25ELENBQUM7NkNBVytCLHVCQUF1QixFQUF3QixnQkFBZ0I7R0FWbkYsZUFBZSxDQW9JM0I7U0FwSVksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQnV0dG9uSHViU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2J1dHRvbi1odWIuc2VydmljZSc7XG5pbXBvcnQgeyBXaXphcmROYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3dpemFyZC1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9CVVRUT05fVFlQRVM6IGFueSA9IHtcbiAgY2FuY2VsOiAnY2FuY2VsJyxcbiAgcHJldmlvdXM6ICdwcmV2aW91cycsXG4gIG5leHQ6ICduZXh0JyxcbiAgZmluaXNoOiAnZmluaXNoJyxcbiAgZGFuZ2VyOiAnZGFuZ2VyJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDVVNUT01fQlVUVE9OX1RZUEVTOiBhbnkgPSB7XG4gIGNhbmNlbDogJ2N1c3RvbS1jYW5jZWwnLFxuICBwcmV2aW91czogJ2N1c3RvbS1wcmV2aW91cycsXG4gIG5leHQ6ICdjdXN0b20tbmV4dCcsXG4gIGZpbmlzaDogJ2N1c3RvbS1maW5pc2gnLFxuICBkYW5nZXI6ICdjdXN0b20tZGFuZ2VyJyxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci13aXphcmQtYnV0dG9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBjbHItd2l6YXJkLWJ0blwiXG4gICAgICAgICAgICBbY2xhc3MuYnRuLWxpbmtdPVwiaXNDYW5jZWxcIlxuICAgICAgICAgICAgW2NsYXNzLmNsci13aXphcmQtYnRuLS10ZXJ0aWFyeV09XCJpc0NhbmNlbFwiXG4gICAgICAgICAgICBbY2xhc3MuYnRuLW91dGxpbmVdPVwiaXNQcmV2aW91c1wiXG4gICAgICAgICAgICBbY2xhc3MuY2xyLXdpemFyZC1idG4tLXNlY29uZGFyeV09XCJpc1ByZXZpb3VzXCJcbiAgICAgICAgICAgIFtjbGFzcy5idG4tcHJpbWFyeV09XCJpc1ByaW1hcnlBY3Rpb25cIlxuICAgICAgICAgICAgW2NsYXNzLmNsci13aXphcmQtYnRuLS1wcmltYXJ5XT1cImlzUHJpbWFyeUFjdGlvblwiXG4gICAgICAgICAgICBbY2xhc3MuYnRuLXN1Y2Nlc3NdPVwiaXNGaW5pc2hcIlxuICAgICAgICAgICAgW2NsYXNzLmJ0bi1kYW5nZXJdPVwiaXNEYW5nZXJcIlxuICAgICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImlzRGlzYWJsZWRcIlxuICAgICAgICAgICAgW2F0dHIuZGlzYWJsZWRdPVwiX2Rpc2FibGVkQXR0cmlidXRlXCJcbiAgICAgICAgICAgIChjbGljayk9XCJjbGljaygpXCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIGAsXG4gIGhvc3Q6IHsgY2xhc3M6ICdjbHItd2l6YXJkLWJ0bi13cmFwcGVyJywgJ1thdHRyLmFyaWEtaGlkZGVuXSc6ICdpc0hpZGRlbicgfSxcbiAgc3R5bGVzOiBbJ1thcmlhLWhpZGRlbj1cInRydWVcIl0geyBkaXNwbGF5OiBub25lOyB9J10sXG59KVxuZXhwb3J0IGNsYXNzIENscldpemFyZEJ1dHRvbiB7XG4gIEBJbnB1dCgndHlwZScpIHB1YmxpYyB0eXBlOiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoJ2NscldpemFyZEJ1dHRvbkRpc2FibGVkJykgcHVibGljIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCdjbHJXaXphcmRCdXR0b25IaWRkZW4nKSBwdWJsaWMgaGlkZGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLy8gRXZlbnRFbWl0dGVyIHdoaWNoIGlzIGVtaXR0ZWQgd2hlbiBhIGJ1dHRvbiBpcyBjbGlja2VkLlxuICBAT3V0cHV0KCdjbHJXaXphcmRCdXR0b25DbGlja2VkJykgd2FzQ2xpY2tlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oZmFsc2UpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYXZTZXJ2aWNlOiBXaXphcmROYXZpZ2F0aW9uU2VydmljZSwgcHVibGljIGJ1dHRvblNlcnZpY2U6IEJ1dHRvbkh1YlNlcnZpY2UpIHt9XG5cbiAgcHJpdmF0ZSBjaGVja0RlZmF1bHRBbmRDdXN0b21UeXBlKHZhbHVlVG9DaGVjazogc3RyaW5nID0gJycsIHR5cGVUb0xvb2tVcDogc3RyaW5nKSB7XG4gICAgaWYgKERFRkFVTFRfQlVUVE9OX1RZUEVTW3R5cGVUb0xvb2tVcF0gPT09IHZhbHVlVG9DaGVjaykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChDVVNUT01fQlVUVE9OX1RZUEVTW3R5cGVUb0xvb2tVcF0gPT09IHZhbHVlVG9DaGVjaykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNDYW5jZWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tEZWZhdWx0QW5kQ3VzdG9tVHlwZSh0aGlzLnR5cGUsICdjYW5jZWwnKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNOZXh0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrRGVmYXVsdEFuZEN1c3RvbVR5cGUodGhpcy50eXBlLCAnbmV4dCcpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc1ByZXZpb3VzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrRGVmYXVsdEFuZEN1c3RvbVR5cGUodGhpcy50eXBlLCAncHJldmlvdXMnKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNGaW5pc2goKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tEZWZhdWx0QW5kQ3VzdG9tVHlwZSh0aGlzLnR5cGUsICdmaW5pc2gnKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNEYW5nZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tEZWZhdWx0QW5kQ3VzdG9tVHlwZSh0aGlzLnR5cGUsICdkYW5nZXInKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNQcmltYXJ5QWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzTmV4dCB8fCB0aGlzLmlzRGFuZ2VyIHx8IHRoaXMuaXNGaW5pc2g7XG4gIH1cblxuICBwdWJsaWMgZ2V0IF9kaXNhYmxlZEF0dHJpYnV0ZSgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGdldCBpc0Rpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIC8vIGRlYWxpbmcgd2l0aCBuZWdhdGl2ZXMgaGVyZS4gY29nbml0aXZlbHkgZWFzaWVyIHRvIHRoaW5rIG9mIGl0IGxpa2UgdGhpcy4uLlxuICAgIGNvbnN0IGRpc2FibGVkID0gdHJ1ZTtcbiAgICBjb25zdCBuYXYgPSB0aGlzLm5hdlNlcnZpY2U7XG4gICAgY29uc3QgcGFnZSA9IHRoaXMubmF2U2VydmljZS5jdXJyZW50UGFnZTtcblxuICAgIC8vIEVuc3VyZSB3ZSBkb24ndCBjaGFuZ2UgdGhlIHJlc3BvbnNlIHVudGlsIGJ1dHRvbnMgYXJlIHJlYWR5IHRvIGF2b2lkIGNob2NvbGF0ZVxuICAgIGlmICghdGhpcy5idXR0b25TZXJ2aWNlLmJ1dHRvbnNSZWFkeSkge1xuICAgICAgcmV0dXJuICFkaXNhYmxlZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCBuYXYud2l6YXJkU3RvcE5hdmlnYXRpb24gfHwgIXBhZ2UpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQ2FuY2VsKSB7XG4gICAgICByZXR1cm4gIWRpc2FibGVkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzUHJldmlvdXMgJiYgKG5hdi5jdXJyZW50UGFnZUlzRmlyc3QgfHwgcGFnZS5wcmV2aW91c1N0ZXBEaXNhYmxlZCkpIHtcbiAgICAgIHJldHVybiBkaXNhYmxlZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0RhbmdlciAmJiAhcGFnZS5yZWFkeVRvQ29tcGxldGUpIHtcbiAgICAgIHJldHVybiBkaXNhYmxlZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc05leHQgJiYgKG5hdi5jdXJyZW50UGFnZUlzTGFzdCB8fCAhcGFnZS5yZWFkeVRvQ29tcGxldGUpKSB7XG4gICAgICByZXR1cm4gZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNGaW5pc2ggJiYgKCFuYXYuY3VycmVudFBhZ2VJc0xhc3QgfHwgIXBhZ2UucmVhZHlUb0NvbXBsZXRlKSkge1xuICAgICAgcmV0dXJuIGRpc2FibGVkO1xuICAgIH1cblxuICAgIHJldHVybiAhZGlzYWJsZWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzSGlkZGVuKCk6IGJvb2xlYW4ge1xuICAgIC8vIGRlYWxpbmcgd2l0aCBuZWdhdGl2ZXMgaGVyZS4gY29nbml0aXZlbHkgZWFzaWVyIHRvIHRoaW5rIG9mIGl0IGxpa2UgdGhpcy4uLlxuICAgIGNvbnN0IGhpZGRlbiA9IHRydWU7XG4gICAgY29uc3QgbmF2ID0gdGhpcy5uYXZTZXJ2aWNlO1xuXG4gICAgLy8gRW5zdXJlIHdlIGRvbid0IGNoYW5nZSB0aGUgcmVzcG9uc2UgdW50aWwgYnV0dG9ucyBhcmUgcmVhZHkgdG8gYXZvaWQgY2hvY29sYXRlXG4gICAgaWYgKCF0aGlzLmJ1dHRvblNlcnZpY2UuYnV0dG9uc1JlYWR5KSB7XG4gICAgICByZXR1cm4gIWhpZGRlbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oaWRkZW4pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQ2FuY2VsKSB7XG4gICAgICByZXR1cm4gIWhpZGRlbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc1ByZXZpb3VzICYmIG5hdi5jdXJyZW50UGFnZUlzRmlyc3QpIHtcbiAgICAgIHJldHVybiBoaWRkZW47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNOZXh0ICYmIG5hdi5jdXJyZW50UGFnZUlzTGFzdCkge1xuICAgICAgcmV0dXJuIGhpZGRlbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0ZpbmlzaCAmJiAhbmF2LmN1cnJlbnRQYWdlSXNMYXN0KSB7XG4gICAgICByZXR1cm4gaGlkZGVuO1xuICAgIH1cblxuICAgIHJldHVybiAhaGlkZGVuO1xuICB9XG5cbiAgY2xpY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMud2FzQ2xpY2tlZC5lbWl0KHRoaXMudHlwZSk7XG4gICAgdGhpcy5idXR0b25TZXJ2aWNlLmJ1dHRvbkNsaWNrZWQodGhpcy50eXBlKTtcbiAgfVxufVxuIl19