/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonHubService } from './providers/button-hub.service';
import { WizardNavigationService } from './providers/wizard-navigation.service';
export var DEFAULT_BUTTON_TYPES = {
    cancel: 'cancel',
    previous: 'previous',
    next: 'next',
    finish: 'finish',
    danger: 'danger',
};
export var CUSTOM_BUTTON_TYPES = {
    cancel: 'custom-cancel',
    previous: 'custom-previous',
    next: 'custom-next',
    finish: 'custom-finish',
    danger: 'custom-danger',
};
var ClrWizardButton = /** @class */ (function () {
    function ClrWizardButton(navService, buttonService) {
        this.navService = navService;
        this.buttonService = buttonService;
        this.type = '';
        this.disabled = false;
        this.hidden = false;
        // EventEmitter which is emitted when a button is clicked.
        this.wasClicked = new EventEmitter(false);
    }
    ClrWizardButton.prototype.checkDefaultAndCustomType = function (valueToCheck, typeToLookUp) {
        if (valueToCheck === void 0) { valueToCheck = ''; }
        if (DEFAULT_BUTTON_TYPES[typeToLookUp] === valueToCheck) {
            return true;
        }
        if (CUSTOM_BUTTON_TYPES[typeToLookUp] === valueToCheck) {
            return true;
        }
        return false;
    };
    Object.defineProperty(ClrWizardButton.prototype, "isCancel", {
        get: function () {
            return this.checkDefaultAndCustomType(this.type, 'cancel');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isNext", {
        get: function () {
            return this.checkDefaultAndCustomType(this.type, 'next');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isPrevious", {
        get: function () {
            return this.checkDefaultAndCustomType(this.type, 'previous');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isFinish", {
        get: function () {
            return this.checkDefaultAndCustomType(this.type, 'finish');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isDanger", {
        get: function () {
            return this.checkDefaultAndCustomType(this.type, 'danger');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isPrimaryAction", {
        get: function () {
            return this.isNext || this.isDanger || this.isFinish;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "_disabledAttribute", {
        get: function () {
            if (this.isDisabled) {
                return '';
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isDisabled", {
        get: function () {
            // dealing with negatives here. cognitively easier to think of it like this...
            var disabled = true;
            var nav = this.navService;
            var page = this.navService.currentPage;
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isHidden", {
        get: function () {
            // dealing with negatives here. cognitively easier to think of it like this...
            var hidden = true;
            var nav = this.navService;
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
        },
        enumerable: true,
        configurable: true
    });
    ClrWizardButton.prototype.click = function () {
        if (this.isDisabled) {
            return;
        }
        this.wasClicked.emit(this.type);
        this.buttonService.buttonClicked(this.type);
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
            template: "\n        <button\n            type=\"button\"\n            class=\"btn clr-wizard-btn\"\n            [class.btn-link]=\"isCancel\"\n            [class.clr-wizard-btn--tertiary]=\"isCancel\"\n            [class.btn-outline]=\"isPrevious\"\n            [class.clr-wizard-btn--secondary]=\"isPrevious\"\n            [class.btn-primary]=\"isPrimaryAction\"\n            [class.clr-wizard-btn--primary]=\"isPrimaryAction\"\n            [class.btn-success]=\"isFinish\"\n            [class.btn-danger]=\"isDanger\"\n            [class.disabled]=\"isDisabled\"\n            [attr.disabled]=\"_disabledAttribute\"\n            (click)=\"click()\">\n            <ng-content></ng-content>\n        </button>\n    ",
            host: { class: 'clr-wizard-btn-wrapper', '[attr.aria-hidden]': 'isHidden' },
            styles: ['[aria-hidden="true"] { display: none; }']
        }),
        tslib_1.__metadata("design:paramtypes", [WizardNavigationService, ButtonHubService])
    ], ClrWizardButton);
    return ClrWizardButton;
}());
export { ClrWizardButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLWJ1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbIndpemFyZC93aXphcmQtYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUVoRixNQUFNLENBQUMsSUFBTSxvQkFBb0IsR0FBUTtJQUN2QyxNQUFNLEVBQUUsUUFBUTtJQUNoQixRQUFRLEVBQUUsVUFBVTtJQUNwQixJQUFJLEVBQUUsTUFBTTtJQUNaLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0NBQ2pCLENBQUM7QUFFRixNQUFNLENBQUMsSUFBTSxtQkFBbUIsR0FBUTtJQUN0QyxNQUFNLEVBQUUsZUFBZTtJQUN2QixRQUFRLEVBQUUsaUJBQWlCO0lBQzNCLElBQUksRUFBRSxhQUFhO0lBQ25CLE1BQU0sRUFBRSxlQUFlO0lBQ3ZCLE1BQU0sRUFBRSxlQUFlO0NBQ3hCLENBQUM7QUF5QkY7SUFVRSx5QkFBbUIsVUFBbUMsRUFBUyxhQUErQjtRQUEzRSxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQVR4RSxTQUFJLEdBQVcsRUFBRSxDQUFDO1FBRUMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUU1QixXQUFNLEdBQVksS0FBSyxDQUFDO1FBRS9ELDBEQUEwRDtRQUN4QixlQUFVLEdBQXlCLElBQUksWUFBWSxDQUFTLEtBQUssQ0FBQyxDQUFDO0lBRUosQ0FBQztJQUUxRixtREFBeUIsR0FBakMsVUFBa0MsWUFBeUIsRUFBRSxZQUFvQjtRQUEvQyw2QkFBQSxFQUFB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QUM7O3FEQUFrQztJQUVuQztRQUEvQixLQUFLLENBQUMsdUJBQXVCLENBQUM7O21EQUFnQztJQUc3QjtRQUFqQyxNQUFNLENBQUMsd0JBQXdCLENBQUM7MENBQWEsWUFBWTt1REFBMkM7SUFSMUYsZUFBZTtRQXZCM0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixRQUFRLEVBQUUsa3NCQWlCUDtZQUNILElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSx3QkFBd0IsRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUU7cUJBQ2xFLHlDQUF5QztTQUNuRCxDQUFDO2lEQVcrQix1QkFBdUIsRUFBd0IsZ0JBQWdCO09BVm5GLGVBQWUsQ0FvSTNCO0lBQUQsc0JBQUM7Q0FBQSxBQXBJRCxJQW9JQztTQXBJWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBCdXR0b25IdWJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvYnV0dG9uLWh1Yi5zZXJ2aWNlJztcbmltcG9ydCB7IFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvd2l6YXJkLW5hdmlnYXRpb24uc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0JVVFRPTl9UWVBFUzogYW55ID0ge1xuICBjYW5jZWw6ICdjYW5jZWwnLFxuICBwcmV2aW91czogJ3ByZXZpb3VzJyxcbiAgbmV4dDogJ25leHQnLFxuICBmaW5pc2g6ICdmaW5pc2gnLFxuICBkYW5nZXI6ICdkYW5nZXInLFxufTtcblxuZXhwb3J0IGNvbnN0IENVU1RPTV9CVVRUT05fVFlQRVM6IGFueSA9IHtcbiAgY2FuY2VsOiAnY3VzdG9tLWNhbmNlbCcsXG4gIHByZXZpb3VzOiAnY3VzdG9tLXByZXZpb3VzJyxcbiAgbmV4dDogJ2N1c3RvbS1uZXh0JyxcbiAgZmluaXNoOiAnY3VzdG9tLWZpbmlzaCcsXG4gIGRhbmdlcjogJ2N1c3RvbS1kYW5nZXInLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXdpemFyZC1idXR0b24nLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGNsci13aXphcmQtYnRuXCJcbiAgICAgICAgICAgIFtjbGFzcy5idG4tbGlua109XCJpc0NhbmNlbFwiXG4gICAgICAgICAgICBbY2xhc3MuY2xyLXdpemFyZC1idG4tLXRlcnRpYXJ5XT1cImlzQ2FuY2VsXCJcbiAgICAgICAgICAgIFtjbGFzcy5idG4tb3V0bGluZV09XCJpc1ByZXZpb3VzXCJcbiAgICAgICAgICAgIFtjbGFzcy5jbHItd2l6YXJkLWJ0bi0tc2Vjb25kYXJ5XT1cImlzUHJldmlvdXNcIlxuICAgICAgICAgICAgW2NsYXNzLmJ0bi1wcmltYXJ5XT1cImlzUHJpbWFyeUFjdGlvblwiXG4gICAgICAgICAgICBbY2xhc3MuY2xyLXdpemFyZC1idG4tLXByaW1hcnldPVwiaXNQcmltYXJ5QWN0aW9uXCJcbiAgICAgICAgICAgIFtjbGFzcy5idG4tc3VjY2Vzc109XCJpc0ZpbmlzaFwiXG4gICAgICAgICAgICBbY2xhc3MuYnRuLWRhbmdlcl09XCJpc0RhbmdlclwiXG4gICAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiaXNEaXNhYmxlZFwiXG4gICAgICAgICAgICBbYXR0ci5kaXNhYmxlZF09XCJfZGlzYWJsZWRBdHRyaWJ1dGVcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImNsaWNrKClcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9idXR0b24+XG4gICAgYCxcbiAgaG9zdDogeyBjbGFzczogJ2Nsci13aXphcmQtYnRuLXdyYXBwZXInLCAnW2F0dHIuYXJpYS1oaWRkZW5dJzogJ2lzSGlkZGVuJyB9LFxuICBzdHlsZXM6IFsnW2FyaWEtaGlkZGVuPVwidHJ1ZVwiXSB7IGRpc3BsYXk6IG5vbmU7IH0nXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyV2l6YXJkQnV0dG9uIHtcbiAgQElucHV0KCd0eXBlJykgcHVibGljIHR5cGU6IHN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgnY2xyV2l6YXJkQnV0dG9uRGlzYWJsZWQnKSBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoJ2NscldpemFyZEJ1dHRvbkhpZGRlbicpIHB1YmxpYyBoaWRkZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBFdmVudEVtaXR0ZXIgd2hpY2ggaXMgZW1pdHRlZCB3aGVuIGEgYnV0dG9uIGlzIGNsaWNrZWQuXG4gIEBPdXRwdXQoJ2NscldpemFyZEJ1dHRvbkNsaWNrZWQnKSB3YXNDbGlja2VkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPihmYWxzZSk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5hdlNlcnZpY2U6IFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlLCBwdWJsaWMgYnV0dG9uU2VydmljZTogQnV0dG9uSHViU2VydmljZSkge31cblxuICBwcml2YXRlIGNoZWNrRGVmYXVsdEFuZEN1c3RvbVR5cGUodmFsdWVUb0NoZWNrOiBzdHJpbmcgPSAnJywgdHlwZVRvTG9va1VwOiBzdHJpbmcpIHtcbiAgICBpZiAoREVGQVVMVF9CVVRUT05fVFlQRVNbdHlwZVRvTG9va1VwXSA9PT0gdmFsdWVUb0NoZWNrKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKENVU1RPTV9CVVRUT05fVFlQRVNbdHlwZVRvTG9va1VwXSA9PT0gdmFsdWVUb0NoZWNrKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGdldCBpc0NhbmNlbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja0RlZmF1bHRBbmRDdXN0b21UeXBlKHRoaXMudHlwZSwgJ2NhbmNlbCcpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc05leHQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tEZWZhdWx0QW5kQ3VzdG9tVHlwZSh0aGlzLnR5cGUsICduZXh0Jyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzUHJldmlvdXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tEZWZhdWx0QW5kQ3VzdG9tVHlwZSh0aGlzLnR5cGUsICdwcmV2aW91cycpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc0ZpbmlzaCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja0RlZmF1bHRBbmRDdXN0b21UeXBlKHRoaXMudHlwZSwgJ2ZpbmlzaCcpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc0RhbmdlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja0RlZmF1bHRBbmRDdXN0b21UeXBlKHRoaXMudHlwZSwgJ2RhbmdlcicpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc1ByaW1hcnlBY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNOZXh0IHx8IHRoaXMuaXNEYW5nZXIgfHwgdGhpcy5pc0ZpbmlzaDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgX2Rpc2FibGVkQXR0cmlidXRlKCk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgLy8gZGVhbGluZyB3aXRoIG5lZ2F0aXZlcyBoZXJlLiBjb2duaXRpdmVseSBlYXNpZXIgdG8gdGhpbmsgb2YgaXQgbGlrZSB0aGlzLi4uXG4gICAgY29uc3QgZGlzYWJsZWQgPSB0cnVlO1xuICAgIGNvbnN0IG5hdiA9IHRoaXMubmF2U2VydmljZTtcbiAgICBjb25zdCBwYWdlID0gdGhpcy5uYXZTZXJ2aWNlLmN1cnJlbnRQYWdlO1xuXG4gICAgLy8gRW5zdXJlIHdlIGRvbid0IGNoYW5nZSB0aGUgcmVzcG9uc2UgdW50aWwgYnV0dG9ucyBhcmUgcmVhZHkgdG8gYXZvaWQgY2hvY29sYXRlXG4gICAgaWYgKCF0aGlzLmJ1dHRvblNlcnZpY2UuYnV0dG9uc1JlYWR5KSB7XG4gICAgICByZXR1cm4gIWRpc2FibGVkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IG5hdi53aXphcmRTdG9wTmF2aWdhdGlvbiB8fCAhcGFnZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNDYW5jZWwpIHtcbiAgICAgIHJldHVybiAhZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNQcmV2aW91cyAmJiAobmF2LmN1cnJlbnRQYWdlSXNGaXJzdCB8fCBwYWdlLnByZXZpb3VzU3RlcERpc2FibGVkKSkge1xuICAgICAgcmV0dXJuIGRpc2FibGVkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRGFuZ2VyICYmICFwYWdlLnJlYWR5VG9Db21wbGV0ZSkge1xuICAgICAgcmV0dXJuIGRpc2FibGVkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzTmV4dCAmJiAobmF2LmN1cnJlbnRQYWdlSXNMYXN0IHx8ICFwYWdlLnJlYWR5VG9Db21wbGV0ZSkpIHtcbiAgICAgIHJldHVybiBkaXNhYmxlZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0ZpbmlzaCAmJiAoIW5hdi5jdXJyZW50UGFnZUlzTGFzdCB8fCAhcGFnZS5yZWFkeVRvQ29tcGxldGUpKSB7XG4gICAgICByZXR1cm4gZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuICFkaXNhYmxlZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNIaWRkZW4oKTogYm9vbGVhbiB7XG4gICAgLy8gZGVhbGluZyB3aXRoIG5lZ2F0aXZlcyBoZXJlLiBjb2duaXRpdmVseSBlYXNpZXIgdG8gdGhpbmsgb2YgaXQgbGlrZSB0aGlzLi4uXG4gICAgY29uc3QgaGlkZGVuID0gdHJ1ZTtcbiAgICBjb25zdCBuYXYgPSB0aGlzLm5hdlNlcnZpY2U7XG5cbiAgICAvLyBFbnN1cmUgd2UgZG9uJ3QgY2hhbmdlIHRoZSByZXNwb25zZSB1bnRpbCBidXR0b25zIGFyZSByZWFkeSB0byBhdm9pZCBjaG9jb2xhdGVcbiAgICBpZiAoIXRoaXMuYnV0dG9uU2VydmljZS5idXR0b25zUmVhZHkpIHtcbiAgICAgIHJldHVybiAhaGlkZGVuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhpZGRlbikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNDYW5jZWwpIHtcbiAgICAgIHJldHVybiAhaGlkZGVuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzUHJldmlvdXMgJiYgbmF2LmN1cnJlbnRQYWdlSXNGaXJzdCkge1xuICAgICAgcmV0dXJuIGhpZGRlbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc05leHQgJiYgbmF2LmN1cnJlbnRQYWdlSXNMYXN0KSB7XG4gICAgICByZXR1cm4gaGlkZGVuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRmluaXNoICYmICFuYXYuY3VycmVudFBhZ2VJc0xhc3QpIHtcbiAgICAgIHJldHVybiBoaWRkZW47XG4gICAgfVxuXG4gICAgcmV0dXJuICFoaWRkZW47XG4gIH1cblxuICBjbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy53YXNDbGlja2VkLmVtaXQodGhpcy50eXBlKTtcbiAgICB0aGlzLmJ1dHRvblNlcnZpY2UuYnV0dG9uQ2xpY2tlZCh0aGlzLnR5cGUpO1xuICB9XG59XG4iXX0=