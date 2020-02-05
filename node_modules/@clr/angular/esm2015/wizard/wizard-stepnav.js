/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PageCollectionService } from './providers/page-collection.service';
let ClrWizardStepnav = class ClrWizardStepnav {
    constructor(pageService) {
        this.pageService = pageService;
    }
};
ClrWizardStepnav = tslib_1.__decorate([
    Component({
        selector: 'clr-wizard-stepnav',
        template: `
    <div class="clr-wizard-stepnav-list">
      <div *ngFor="let page of pageService.pages" clr-wizard-stepnav-item [page]="page" class="clr-wizard-stepnav-item"></div>
    </div>
  `,
        host: { class: 'clr-wizard-stepnav' }
    }),
    tslib_1.__metadata("design:paramtypes", [PageCollectionService])
], ClrWizardStepnav);
export { ClrWizardStepnav };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0ZXBuYXYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ3aXphcmQvd2l6YXJkLXN0ZXBuYXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBVzVFLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBQzNCLFlBQW1CLFdBQWtDO1FBQWxDLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtJQUFHLENBQUM7Q0FDMUQsQ0FBQTtBQUZZLGdCQUFnQjtJQVQ1QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLFFBQVEsRUFBRTs7OztHQUlUO1FBQ0QsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFFO0tBQ3RDLENBQUM7NkNBRWdDLHFCQUFxQjtHQUQxQyxnQkFBZ0IsQ0FFNUI7U0FGWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvcGFnZS1jb2xsZWN0aW9uLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItd2l6YXJkLXN0ZXBuYXYnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjbHItd2l6YXJkLXN0ZXBuYXYtbGlzdFwiPlxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgcGFnZSBvZiBwYWdlU2VydmljZS5wYWdlc1wiIGNsci13aXphcmQtc3RlcG5hdi1pdGVtIFtwYWdlXT1cInBhZ2VcIiBjbGFzcz1cImNsci13aXphcmQtc3RlcG5hdi1pdGVtXCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHsgY2xhc3M6ICdjbHItd2l6YXJkLXN0ZXBuYXYnIH0sXG59KVxuZXhwb3J0IGNsYXNzIENscldpemFyZFN0ZXBuYXYge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFnZVNlcnZpY2U6IFBhZ2VDb2xsZWN0aW9uU2VydmljZSkge31cbn1cbiJdfQ==