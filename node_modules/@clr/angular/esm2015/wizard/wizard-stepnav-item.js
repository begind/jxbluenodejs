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
let ClrWizardStepnavItem = class ClrWizardStepnavItem {
    constructor(navService, pageCollection) {
        this.navService = navService;
        this.pageCollection = pageCollection;
    }
    pageGuard() {
        if (!this.page) {
            throw new Error('Wizard stepnav item is not associated with a wizard page.');
        }
    }
    get id() {
        this.pageGuard();
        return this.pageCollection.getStepItemIdForPage(this.page);
    }
    get isDisabled() {
        this.pageGuard();
        return this.page.disabled || this.navService.wizardStopNavigation || this.navService.wizardDisableStepnav;
    }
    get isCurrent() {
        this.pageGuard();
        return this.page.current;
    }
    get isComplete() {
        this.pageGuard();
        return this.page.completed;
    }
    get canNavigate() {
        this.pageGuard();
        return this.pageCollection.previousPageIsCompleted(this.page);
    }
    click() {
        this.pageGuard();
        // if we click on our own stepnav or a disabled stepnav, we don't want to do anything
        if (this.isDisabled || this.isCurrent) {
            return;
        }
        this.navService.goTo(this.page);
    }
};
tslib_1.__decorate([
    Input('page'),
    tslib_1.__metadata("design:type", ClrWizardPage)
], ClrWizardStepnavItem.prototype, "page", void 0);
ClrWizardStepnavItem = tslib_1.__decorate([
    Component({
        selector: '[clr-wizard-stepnav-item]',
        template: `
        <button type="button" class="btn btn-link clr-wizard-stepnav-link" (click)="click()" [attr.disabled]="isDisabled ? '' : null">
            <ng-template [ngTemplateOutlet]="page.navTitle"></ng-template>
        </button>
    `,
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
export { ClrWizardStepnavItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0ZXBuYXYtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbIndpemFyZC93aXphcmQtc3RlcG5hdi1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXFCOUMsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFHL0IsWUFBbUIsVUFBbUMsRUFBUyxjQUFxQztRQUFqRixlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUFTLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtJQUFHLENBQUM7SUFFaEcsU0FBUztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1NBQzlFO0lBQ0gsQ0FBQztJQUVELElBQVcsRUFBRTtRQUNYLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDO0lBQzVHLENBQUM7SUFFRCxJQUFXLFNBQVM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNuQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLHFGQUFxRjtRQUNyRixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNyQyxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUNGLENBQUE7QUE3Q2dCO0lBQWQsS0FBSyxDQUFDLE1BQU0sQ0FBQztzQ0FBYyxhQUFhO2tEQUFDO0FBRC9CLG9CQUFvQjtJQW5CaEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDJCQUEyQjtRQUNyQyxRQUFRLEVBQUU7Ozs7S0FJUDtRQUNILElBQUksRUFBRTtZQUNKLE1BQU0sRUFBRSxJQUFJO1lBQ1osc0JBQXNCLEVBQUUsV0FBVztZQUNuQyxzQkFBc0IsRUFBRSxJQUFJO1lBQzVCLHNCQUFzQixFQUFFLE1BQU07WUFDOUIsa0JBQWtCLEVBQUUsTUFBTTtZQUMxQixnQkFBZ0IsRUFBRSxXQUFXO1lBQzdCLGtCQUFrQixFQUFFLFlBQVk7WUFDaEMsa0JBQWtCLEVBQUUsY0FBYztZQUNsQyxrQkFBa0IsRUFBRSxZQUFZO1NBQ2pDO0tBQ0YsQ0FBQzs2Q0FJK0IsdUJBQXVCLEVBQXlCLHFCQUFxQjtHQUh6RixvQkFBb0IsQ0E4Q2hDO1NBOUNZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQYWdlQ29sbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9wYWdlLWNvbGxlY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBXaXphcmROYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3dpemFyZC1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyV2l6YXJkUGFnZSB9IGZyb20gJy4vd2l6YXJkLXBhZ2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbY2xyLXdpemFyZC1zdGVwbmF2LWl0ZW1dJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpbmsgY2xyLXdpemFyZC1zdGVwbmF2LWxpbmtcIiAoY2xpY2spPVwiY2xpY2soKVwiIFthdHRyLmRpc2FibGVkXT1cImlzRGlzYWJsZWQgPyAnJyA6IG51bGxcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJwYWdlLm5hdlRpdGxlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9idXR0b24+XG4gICAgYCxcbiAgaG9zdDoge1xuICAgICdbaWRdJzogJ2lkJyxcbiAgICAnW2F0dHIuYXJpYS1zZWxlY3RlZF0nOiAnaXNDdXJyZW50JyxcbiAgICAnW2F0dHIuYXJpYS1jb250cm9sc10nOiAnaWQnLFxuICAgICdbY2xhc3MuY2xyLW5hdi1saW5rXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLm5hdi1pdGVtXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnaXNDdXJyZW50JyxcbiAgICAnW2NsYXNzLmRpc2FibGVkXSc6ICdpc0Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm5vLWNsaWNrXSc6ICchY2FuTmF2aWdhdGUnLFxuICAgICdbY2xhc3MuY29tcGxldGVdJzogJ2lzQ29tcGxldGUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJXaXphcmRTdGVwbmF2SXRlbSB7XG4gIEBJbnB1dCgncGFnZScpIHB1YmxpYyBwYWdlOiBDbHJXaXphcmRQYWdlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYXZTZXJ2aWNlOiBXaXphcmROYXZpZ2F0aW9uU2VydmljZSwgcHVibGljIHBhZ2VDb2xsZWN0aW9uOiBQYWdlQ29sbGVjdGlvblNlcnZpY2UpIHt9XG5cbiAgcHJpdmF0ZSBwYWdlR3VhcmQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnBhZ2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2l6YXJkIHN0ZXBuYXYgaXRlbSBpcyBub3QgYXNzb2NpYXRlZCB3aXRoIGEgd2l6YXJkIHBhZ2UuJyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBpZCgpOiBzdHJpbmcge1xuICAgIHRoaXMucGFnZUd1YXJkKCk7XG4gICAgcmV0dXJuIHRoaXMucGFnZUNvbGxlY3Rpb24uZ2V0U3RlcEl0ZW1JZEZvclBhZ2UodGhpcy5wYWdlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICB0aGlzLnBhZ2VHdWFyZCgpO1xuICAgIHJldHVybiB0aGlzLnBhZ2UuZGlzYWJsZWQgfHwgdGhpcy5uYXZTZXJ2aWNlLndpemFyZFN0b3BOYXZpZ2F0aW9uIHx8IHRoaXMubmF2U2VydmljZS53aXphcmREaXNhYmxlU3RlcG5hdjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNDdXJyZW50KCk6IGJvb2xlYW4ge1xuICAgIHRoaXMucGFnZUd1YXJkKCk7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5jdXJyZW50O1xuICB9XG5cbiAgcHVibGljIGdldCBpc0NvbXBsZXRlKCk6IGJvb2xlYW4ge1xuICAgIHRoaXMucGFnZUd1YXJkKCk7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5jb21wbGV0ZWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNhbk5hdmlnYXRlKCk6IGJvb2xlYW4ge1xuICAgIHRoaXMucGFnZUd1YXJkKCk7XG4gICAgcmV0dXJuIHRoaXMucGFnZUNvbGxlY3Rpb24ucHJldmlvdXNQYWdlSXNDb21wbGV0ZWQodGhpcy5wYWdlKTtcbiAgfVxuXG4gIGNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMucGFnZUd1YXJkKCk7XG5cbiAgICAvLyBpZiB3ZSBjbGljayBvbiBvdXIgb3duIHN0ZXBuYXYgb3IgYSBkaXNhYmxlZCBzdGVwbmF2LCB3ZSBkb24ndCB3YW50IHRvIGRvIGFueXRoaW5nXG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZCB8fCB0aGlzLmlzQ3VycmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubmF2U2VydmljZS5nb1RvKHRoaXMucGFnZSk7XG4gIH1cbn1cbiJdfQ==