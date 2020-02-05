/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { PageCollectionService } from './providers/page-collection.service';
import { WizardNavigationService } from './providers/wizard-navigation.service';
import { ClrWizardPage } from './wizard-page';
var ClrWizardStepnavItem = /** @class */ (function () {
    function ClrWizardStepnavItem(navService, pageCollection) {
        this.navService = navService;
        this.pageCollection = pageCollection;
    }
    ClrWizardStepnavItem.prototype.pageGuard = function () {
        if (!this.page) {
            throw new Error('Wizard stepnav item is not associated with a wizard page.');
        }
    };
    Object.defineProperty(ClrWizardStepnavItem.prototype, "id", {
        get: function () {
            this.pageGuard();
            return this.pageCollection.getStepItemIdForPage(this.page);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardStepnavItem.prototype, "isDisabled", {
        get: function () {
            this.pageGuard();
            return this.page.disabled || this.navService.wizardStopNavigation || this.navService.wizardDisableStepnav;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardStepnavItem.prototype, "isCurrent", {
        get: function () {
            this.pageGuard();
            return this.page.current;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardStepnavItem.prototype, "isComplete", {
        get: function () {
            this.pageGuard();
            return this.page.completed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardStepnavItem.prototype, "canNavigate", {
        get: function () {
            this.pageGuard();
            return this.pageCollection.previousPageIsCompleted(this.page);
        },
        enumerable: true,
        configurable: true
    });
    ClrWizardStepnavItem.prototype.click = function () {
        this.pageGuard();
        // if we click on our own stepnav or a disabled stepnav, we don't want to do anything
        if (this.isDisabled || this.isCurrent) {
            return;
        }
        this.navService.goTo(this.page);
    };
    tslib_1.__decorate([
        Input('page'),
        tslib_1.__metadata("design:type", ClrWizardPage)
    ], ClrWizardStepnavItem.prototype, "page", void 0);
    ClrWizardStepnavItem = tslib_1.__decorate([
        Component({
            selector: '[clr-wizard-stepnav-item]',
            template: "\n        <button type=\"button\" class=\"btn btn-link clr-wizard-stepnav-link\" (click)=\"click()\" [attr.disabled]=\"isDisabled ? '' : null\">\n            <ng-template [ngTemplateOutlet]=\"page.navTitle\"></ng-template>\n        </button>\n    ",
            host: {
                '[id]': 'id',
                '[attr.aria-selected]': 'isCurrent',
                '[attr.aria-controls]': 'id',
                '[class.clr-nav-link]': 'true',
                '[class.nav-item]': 'true',
                '[class.active]': 'isCurrent',
                '[class.disabled]': 'isDisabled',
                '[class.no-click]': '!canNavigate',
                '[class.complete]': 'isComplete',
            }
        }),
        tslib_1.__metadata("design:paramtypes", [WizardNavigationService, PageCollectionService])
    ], ClrWizardStepnavItem);
    return ClrWizardStepnavItem;
}());
export { ClrWizardStepnavItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0ZXBuYXYtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbIndpemFyZC93aXphcmQtc3RlcG5hdi1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXFCOUM7SUFHRSw4QkFBbUIsVUFBbUMsRUFBUyxjQUFxQztRQUFqRixlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUFTLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtJQUFHLENBQUM7SUFFaEcsd0NBQVMsR0FBakI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsMkRBQTJELENBQUMsQ0FBQztTQUM5RTtJQUNILENBQUM7SUFFRCxzQkFBVyxvQ0FBRTthQUFiO1lBQ0UsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0QsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw0Q0FBVTthQUFyQjtZQUNFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQztRQUM1RyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDJDQUFTO2FBQXBCO1lBQ0UsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw0Q0FBVTthQUFyQjtZQUNFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsNkNBQVc7YUFBdEI7WUFDRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRSxDQUFDOzs7T0FBQTtJQUVELG9DQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakIscUZBQXFGO1FBQ3JGLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3JDLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBNUNjO1FBQWQsS0FBSyxDQUFDLE1BQU0sQ0FBQzswQ0FBYyxhQUFhO3NEQUFDO0lBRC9CLG9CQUFvQjtRQW5CaEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxRQUFRLEVBQUUseVBBSVA7WUFDSCxJQUFJLEVBQUU7Z0JBQ0osTUFBTSxFQUFFLElBQUk7Z0JBQ1osc0JBQXNCLEVBQUUsV0FBVztnQkFDbkMsc0JBQXNCLEVBQUUsSUFBSTtnQkFDNUIsc0JBQXNCLEVBQUUsTUFBTTtnQkFDOUIsa0JBQWtCLEVBQUUsTUFBTTtnQkFDMUIsZ0JBQWdCLEVBQUUsV0FBVztnQkFDN0Isa0JBQWtCLEVBQUUsWUFBWTtnQkFDaEMsa0JBQWtCLEVBQUUsY0FBYztnQkFDbEMsa0JBQWtCLEVBQUUsWUFBWTthQUNqQztTQUNGLENBQUM7aURBSStCLHVCQUF1QixFQUF5QixxQkFBcUI7T0FIekYsb0JBQW9CLENBOENoQztJQUFELDJCQUFDO0NBQUEsQUE5Q0QsSUE4Q0M7U0E5Q1ksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBhZ2VDb2xsZWN0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3BhZ2UtY29sbGVjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvd2l6YXJkLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBDbHJXaXphcmRQYWdlIH0gZnJvbSAnLi93aXphcmQtcGFnZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tjbHItd2l6YXJkLXN0ZXBuYXYtaXRlbV0nLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGluayBjbHItd2l6YXJkLXN0ZXBuYXYtbGlua1wiIChjbGljayk9XCJjbGljaygpXCIgW2F0dHIuZGlzYWJsZWRdPVwiaXNEaXNhYmxlZCA/ICcnIDogbnVsbFwiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInBhZ2UubmF2VGl0bGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbYXR0ci5hcmlhLXNlbGVjdGVkXSc6ICdpc0N1cnJlbnQnLFxuICAgICdbYXR0ci5hcmlhLWNvbnRyb2xzXSc6ICdpZCcsXG4gICAgJ1tjbGFzcy5jbHItbmF2LWxpbmtdJzogJ3RydWUnLFxuICAgICdbY2xhc3MubmF2LWl0ZW1dJzogJ3RydWUnLFxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdpc0N1cnJlbnQnLFxuICAgICdbY2xhc3MuZGlzYWJsZWRdJzogJ2lzRGlzYWJsZWQnLFxuICAgICdbY2xhc3Mubm8tY2xpY2tdJzogJyFjYW5OYXZpZ2F0ZScsXG4gICAgJ1tjbGFzcy5jb21wbGV0ZV0nOiAnaXNDb21wbGV0ZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENscldpemFyZFN0ZXBuYXZJdGVtIHtcbiAgQElucHV0KCdwYWdlJykgcHVibGljIHBhZ2U6IENscldpemFyZFBhZ2U7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5hdlNlcnZpY2U6IFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlLCBwdWJsaWMgcGFnZUNvbGxlY3Rpb246IFBhZ2VDb2xsZWN0aW9uU2VydmljZSkge31cblxuICBwcml2YXRlIHBhZ2VHdWFyZCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucGFnZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXaXphcmQgc3RlcG5hdiBpdGVtIGlzIG5vdCBhc3NvY2lhdGVkIHdpdGggYSB3aXphcmQgcGFnZS4nKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgdGhpcy5wYWdlR3VhcmQoKTtcbiAgICByZXR1cm4gdGhpcy5wYWdlQ29sbGVjdGlvbi5nZXRTdGVwSXRlbUlkRm9yUGFnZSh0aGlzLnBhZ2UpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc0Rpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHRoaXMucGFnZUd1YXJkKCk7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5kaXNhYmxlZCB8fCB0aGlzLm5hdlNlcnZpY2Uud2l6YXJkU3RvcE5hdmlnYXRpb24gfHwgdGhpcy5uYXZTZXJ2aWNlLndpemFyZERpc2FibGVTdGVwbmF2O1xuICB9XG5cbiAgcHVibGljIGdldCBpc0N1cnJlbnQoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5wYWdlR3VhcmQoKTtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmN1cnJlbnQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzQ29tcGxldGUoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5wYWdlR3VhcmQoKTtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmNvbXBsZXRlZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY2FuTmF2aWdhdGUoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5wYWdlR3VhcmQoKTtcbiAgICByZXR1cm4gdGhpcy5wYWdlQ29sbGVjdGlvbi5wcmV2aW91c1BhZ2VJc0NvbXBsZXRlZCh0aGlzLnBhZ2UpO1xuICB9XG5cbiAgY2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5wYWdlR3VhcmQoKTtcblxuICAgIC8vIGlmIHdlIGNsaWNrIG9uIG91ciBvd24gc3RlcG5hdiBvciBhIGRpc2FibGVkIHN0ZXBuYXYsIHdlIGRvbid0IHdhbnQgdG8gZG8gYW55dGhpbmdcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkIHx8IHRoaXMuaXNDdXJyZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5uYXZTZXJ2aWNlLmdvVG8odGhpcy5wYWdlKTtcbiAgfVxufVxuIl19