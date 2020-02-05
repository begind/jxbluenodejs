import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Inject, ContentChild, ElementRef, NgZone, PLATFORM_ID, ViewChild } from '@angular/core';
import { UNIQUE_ID, UNIQUE_ID_PROVIDER } from '../../utils/id-generator/id-generator.service';
import { ClrAxis } from '../../utils/popover/enums/axis.enum';
import { ClrAlignment } from '../../utils/popover/enums/alignment.enum';
import { ClrSide } from '../../utils/popover/enums/side.enum';
import { ClrPopoverEventsService } from '../../utils/popover/providers/popover-events.service';
import { ClrPopoverPositionService } from '../../utils/popover/providers/popover-position.service';
import { ClrPopoverToggleService } from '../../utils/popover/providers/popover-toggle.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { ColumnsService } from './providers/columns.service';
import { DatagridColumnChanges } from './enums/column-changes.enum';
import { isPlatformBrowser } from '@angular/common';
import { ClrDatagridColumnToggleTitle } from './datagrid-column-toggle-title';
import { ClrDatagridColumnToggleButton } from './datagrid-column-toggle-button';
let ClrDatagridColumnToggle = 
/** @deprecated since 2.0, remove in 3.0 */
class ClrDatagridColumnToggle {
    constructor(commonStrings, columnsService, columnSwitchId, platformId, zone, popoverId) {
        this.commonStrings = commonStrings;
        this.columnsService = columnsService;
        this.columnSwitchId = columnSwitchId;
        this.platformId = platformId;
        this.zone = zone;
        this.popoverId = popoverId;
        // Smart Popover
        this.smartPosition = {
            axis: ClrAxis.VERTICAL,
            side: ClrSide.BEFORE,
            anchor: ClrAlignment.START,
            content: ClrAlignment.START,
        };
    }
    get allColumnsVisible() {
        return this._allColumnsVisible;
    }
    set allColumnsVisible(value) {
        this._allColumnsVisible = value;
    }
    get hideableColumnStates() {
        const hideables = this.columnsService.columns.filter(column => column.value.hideable);
        return hideables.map(column => column.value);
    }
    get hasOnlyOneVisibleColumn() {
        const nbNonHideableColumns = this.columnsService.columns.length - this.hideableColumnStates.length;
        // this should only return true when there is no non-hideable columns.
        return (nbNonHideableColumns === 0 && this.hideableColumnStates.filter(columnState => !columnState.hidden).length === 1);
    }
    toggleColumnState(columnState, event) {
        const columnToToggle = this.columnsService.columns.filter(column => column.value === columnState)[0];
        this.columnsService.emitStateChange(columnToToggle, {
            hidden: event,
            changes: [DatagridColumnChanges.HIDDEN],
        });
    }
    toggleSwitchPanel() {
        this.openState = !this.openState;
        if (this.openState && isPlatformBrowser(this.platformId) && this.menuDescriptionElement) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.menuDescriptionElement.nativeElement.focus();
                });
            });
        }
    }
    allColumnsSelected() {
        this.allSelectedElement.nativeElement.focus();
    }
    // Without tracking the checkboxes get rerendered on model update, which leads
    // to loss of focus after checkbox toggle.
    trackByFn(index) {
        return index;
    }
};
tslib_1.__decorate([
    ContentChild(ClrDatagridColumnToggleTitle, { static: false }),
    tslib_1.__metadata("design:type", ClrDatagridColumnToggleTitle)
], ClrDatagridColumnToggle.prototype, "customToggleTitle", void 0);
tslib_1.__decorate([
    ContentChild(ClrDatagridColumnToggleButton, { static: false }),
    tslib_1.__metadata("design:type", ClrDatagridColumnToggleButton)
], ClrDatagridColumnToggle.prototype, "customToggleButton", void 0);
tslib_1.__decorate([
    ViewChild('menuDescription', { read: ElementRef, static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], ClrDatagridColumnToggle.prototype, "menuDescriptionElement", void 0);
tslib_1.__decorate([
    ViewChild('allSelected', { read: ElementRef, static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], ClrDatagridColumnToggle.prototype, "allSelectedElement", void 0);
ClrDatagridColumnToggle = tslib_1.__decorate([
    Component({
        selector: 'clr-dg-column-toggle',
        template: `    
      <button
              role="button"
              type="button"
              class="btn btn-sm btn-link column-toggle--action"
              clrPopoverAnchor
              clrPopoverOpenCloseButton
              [attr.aria-controls]="popoverId"
              [attr.aria-owns]="popoverId">
          <clr-icon shape="view-columns" [attr.title]="commonStrings.keys.pickColumns"></clr-icon>
      </button>
      <div class="column-switch"
           role="dialog"
           [id]="popoverId"
           clrFocusTrap
           *clrPopoverContent="openState at smartPosition; outsideClickToClose: true; scrollToClose: true">
          <div class="switch-header">
              <div class="clr-sr-only" tabindex="-1" #menuDescription>{{commonStrings.keys.showColumnsMenuDescription}}</div>
              <div class="clr-sr-only" tabindex="-1" #allSelected>{{commonStrings.keys.allColumnsSelected}}</div>
              <ng-container *ngIf="!customToggleTitle">{{commonStrings.keys.showColumns}}</ng-container>
              <ng-content select="clr-dg-column-toggle-title"></ng-content>
              <button class="btn btn-sm btn-link toggle-switch-close-button"
                      clrPopoverCloseButton
                      type="button"
                      [attr.aria-label]="commonStrings.keys.close">
                  <clr-icon shape="close" 
                            [attr.title]="commonStrings.keys.close"></clr-icon>
              </button>
          </div>
          <ul class="switch-content list-unstyled">
              <li *ngFor="let columnState of hideableColumnStates;trackBy: trackByFn">
                  <clr-checkbox-wrapper>
                      <input clrCheckbox type="checkbox"
                             [disabled]="hasOnlyOneVisibleColumn && !columnState.hidden"
                             [ngModel]="!columnState.hidden"
                             (ngModelChange)="toggleColumnState(columnState, !$event)">
                      <label>
                          <ng-template [ngTemplateOutlet]="columnState.titleTemplateRef"></ng-template>
                      </label>
                  </clr-checkbox-wrapper>
              </li>
          </ul>
          <div class="switch-footer">
              <ng-content select="clr-dg-column-toggle-button"></ng-content>
              <clr-dg-column-toggle-button *ngIf="!customToggleButton" (clrAllSelected)="allColumnsSelected()">
                  {{commonStrings.keys.selectAll}}
              </clr-dg-column-toggle-button>
          </div>
      </div>
  `,
        host: { '[class.column-switch-wrapper]': 'true', '[class.active]': 'openState' },
        providers: [UNIQUE_ID_PROVIDER, ClrPopoverEventsService, ClrPopoverPositionService, ClrPopoverToggleService]
    })
    /** @deprecated since 2.0, remove in 3.0 */
    ,
    tslib_1.__param(2, Inject(UNIQUE_ID)),
    tslib_1.__param(3, Inject(PLATFORM_ID)),
    tslib_1.__param(5, Inject(UNIQUE_ID)),
    tslib_1.__metadata("design:paramtypes", [ClrCommonStringsService,
        ColumnsService, String, Object,
        NgZone, String])
], ClrDatagridColumnToggle);
export { ClrDatagridColumnToggle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUcsT0FBTyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBRTlGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDeEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzlELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQy9GLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ25HLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQy9GLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQTBEaEYsSUFBYSx1QkFBdUI7QUFEcEMsMkNBQTJDO0FBQzNDLE1B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ZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBDb250ZW50Q2hpbGQsIEVsZW1lbnRSZWYsIE5nWm9uZSwgUExBVEZPUk1fSUQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBVTklRVUVfSUQsIFVOSVFVRV9JRF9QUk9WSURFUiB9IGZyb20gJy4uLy4uL3V0aWxzL2lkLWdlbmVyYXRvci9pZC1nZW5lcmF0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJQb3BvdmVyUG9zaXRpb24gfSBmcm9tICcuLi8uLi91dGlscy9wb3BvdmVyL2ludGVyZmFjZXMvcG9wb3Zlci1wb3NpdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ2xyQXhpcyB9IGZyb20gJy4uLy4uL3V0aWxzL3BvcG92ZXIvZW51bXMvYXhpcy5lbnVtJztcbmltcG9ydCB7IENsckFsaWdubWVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3BvcG92ZXIvZW51bXMvYWxpZ25tZW50LmVudW0nO1xuaW1wb3J0IHsgQ2xyU2lkZSB9IGZyb20gJy4uLy4uL3V0aWxzL3BvcG92ZXIvZW51bXMvc2lkZS5lbnVtJztcbmltcG9ydCB7IENsclBvcG92ZXJFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcG9wb3Zlci9wcm92aWRlcnMvcG9wb3Zlci1ldmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJQb3BvdmVyUG9zaXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcG9wb3Zlci9wcm92aWRlcnMvcG9wb3Zlci1wb3NpdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IENsclBvcG92ZXJUb2dnbGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcG9wb3Zlci9wcm92aWRlcnMvcG9wb3Zlci10b2dnbGUuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZSc7XG5pbXBvcnQgeyBDb2x1bW5zU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbHVtbnMuc2VydmljZSc7XG5pbXBvcnQgeyBDb2x1bW5TdGF0ZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb2x1bW4tc3RhdGUuaW50ZXJmYWNlJztcbmltcG9ydCB7IERhdGFncmlkQ29sdW1uQ2hhbmdlcyB9IGZyb20gJy4vZW51bXMvY29sdW1uLWNoYW5nZXMuZW51bSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZVRpdGxlIH0gZnJvbSAnLi9kYXRhZ3JpZC1jb2x1bW4tdG9nZ2xlLXRpdGxlJztcbmltcG9ydCB7IENsckRhdGFncmlkQ29sdW1uVG9nZ2xlQnV0dG9uIH0gZnJvbSAnLi9kYXRhZ3JpZC1jb2x1bW4tdG9nZ2xlLWJ1dHRvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1jb2x1bW4tdG9nZ2xlJyxcbiAgdGVtcGxhdGU6IGAgICAgXG4gICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1saW5rIGNvbHVtbi10b2dnbGUtLWFjdGlvblwiXG4gICAgICAgICAgICAgIGNsclBvcG92ZXJBbmNob3JcbiAgICAgICAgICAgICAgY2xyUG9wb3Zlck9wZW5DbG9zZUJ1dHRvblxuICAgICAgICAgICAgICBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cInBvcG92ZXJJZFwiXG4gICAgICAgICAgICAgIFthdHRyLmFyaWEtb3duc109XCJwb3BvdmVySWRcIj5cbiAgICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJ2aWV3LWNvbHVtbnNcIiBbYXR0ci50aXRsZV09XCJjb21tb25TdHJpbmdzLmtleXMucGlja0NvbHVtbnNcIj48L2Nsci1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uLXN3aXRjaFwiXG4gICAgICAgICAgIHJvbGU9XCJkaWFsb2dcIlxuICAgICAgICAgICBbaWRdPVwicG9wb3ZlcklkXCJcbiAgICAgICAgICAgY2xyRm9jdXNUcmFwXG4gICAgICAgICAgICpjbHJQb3BvdmVyQ29udGVudD1cIm9wZW5TdGF0ZSBhdCBzbWFydFBvc2l0aW9uOyBvdXRzaWRlQ2xpY2tUb0Nsb3NlOiB0cnVlOyBzY3JvbGxUb0Nsb3NlOiB0cnVlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInN3aXRjaC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNsci1zci1vbmx5XCIgdGFiaW5kZXg9XCItMVwiICNtZW51RGVzY3JpcHRpb24+e3tjb21tb25TdHJpbmdzLmtleXMuc2hvd0NvbHVtbnNNZW51RGVzY3JpcHRpb259fTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xyLXNyLW9ubHlcIiB0YWJpbmRleD1cIi0xXCIgI2FsbFNlbGVjdGVkPnt7Y29tbW9uU3RyaW5ncy5rZXlzLmFsbENvbHVtbnNTZWxlY3RlZH19PC9kaXY+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhY3VzdG9tVG9nZ2xlVGl0bGVcIj57e2NvbW1vblN0cmluZ3Mua2V5cy5zaG93Q29sdW1uc319PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1kZy1jb2x1bW4tdG9nZ2xlLXRpdGxlXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tbGluayB0b2dnbGUtc3dpdGNoLWNsb3NlLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xyUG9wb3ZlckNsb3NlQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJjb21tb25TdHJpbmdzLmtleXMuY2xvc2VcIj5cbiAgICAgICAgICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImNsb3NlXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5rZXlzLmNsb3NlXCI+PC9jbHItaWNvbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHVsIGNsYXNzPVwic3dpdGNoLWNvbnRlbnQgbGlzdC11bnN0eWxlZFwiPlxuICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGNvbHVtblN0YXRlIG9mIGhpZGVhYmxlQ29sdW1uU3RhdGVzO3RyYWNrQnk6IHRyYWNrQnlGblwiPlxuICAgICAgICAgICAgICAgICAgPGNsci1jaGVja2JveC13cmFwcGVyPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbHJDaGVja2JveCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiaGFzT25seU9uZVZpc2libGVDb2x1bW4gJiYgIWNvbHVtblN0YXRlLmhpZGRlblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ01vZGVsXT1cIiFjb2x1bW5TdGF0ZS5oaWRkZW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJ0b2dnbGVDb2x1bW5TdGF0ZShjb2x1bW5TdGF0ZSwgISRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW5TdGF0ZS50aXRsZVRlbXBsYXRlUmVmXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPC9jbHItY2hlY2tib3gtd3JhcHBlcj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzd2l0Y2gtZm9vdGVyXCI+XG4gICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1kZy1jb2x1bW4tdG9nZ2xlLWJ1dHRvblwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgPGNsci1kZy1jb2x1bW4tdG9nZ2xlLWJ1dHRvbiAqbmdJZj1cIiFjdXN0b21Ub2dnbGVCdXR0b25cIiAoY2xyQWxsU2VsZWN0ZWQpPVwiYWxsQ29sdW1uc1NlbGVjdGVkKClcIj5cbiAgICAgICAgICAgICAgICAgIHt7Y29tbW9uU3RyaW5ncy5rZXlzLnNlbGVjdEFsbH19XG4gICAgICAgICAgICAgIDwvY2xyLWRnLWNvbHVtbi10b2dnbGUtYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHsgJ1tjbGFzcy5jb2x1bW4tc3dpdGNoLXdyYXBwZXJdJzogJ3RydWUnLCAnW2NsYXNzLmFjdGl2ZV0nOiAnb3BlblN0YXRlJyB9LFxuICBwcm92aWRlcnM6IFtVTklRVUVfSURfUFJPVklERVIsIENsclBvcG92ZXJFdmVudHNTZXJ2aWNlLCBDbHJQb3BvdmVyUG9zaXRpb25TZXJ2aWNlLCBDbHJQb3BvdmVyVG9nZ2xlU2VydmljZV0sXG59KVxuLyoqIEBkZXByZWNhdGVkIHNpbmNlIDIuMCwgcmVtb3ZlIGluIDMuMCAqL1xuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkQ29sdW1uVG9nZ2xlIHtcbiAgcHJpdmF0ZSBfYWxsQ29sdW1uc1Zpc2libGU6IGJvb2xlYW47XG5cbiAgLy8gU21hcnQgUG9wb3ZlclxuICBwdWJsaWMgc21hcnRQb3NpdGlvbjogQ2xyUG9wb3ZlclBvc2l0aW9uID0ge1xuICAgIGF4aXM6IENsckF4aXMuVkVSVElDQUwsXG4gICAgc2lkZTogQ2xyU2lkZS5CRUZPUkUsXG4gICAgYW5jaG9yOiBDbHJBbGlnbm1lbnQuU1RBUlQsXG4gICAgY29udGVudDogQ2xyQWxpZ25tZW50LlNUQVJULFxuICB9O1xuICBwdWJsaWMgb3BlblN0YXRlO1xuXG4gIEBDb250ZW50Q2hpbGQoQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGVUaXRsZSwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIGN1c3RvbVRvZ2dsZVRpdGxlOiBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZVRpdGxlO1xuICBAQ29udGVudENoaWxkKENsckRhdGFncmlkQ29sdW1uVG9nZ2xlQnV0dG9uLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgY3VzdG9tVG9nZ2xlQnV0dG9uOiBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZUJ1dHRvbjtcbiAgQFZpZXdDaGlsZCgnbWVudURlc2NyaXB0aW9uJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IGZhbHNlIH0pXG4gIHByaXZhdGUgbWVudURlc2NyaXB0aW9uRWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIEBWaWV3Q2hpbGQoJ2FsbFNlbGVjdGVkJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IGZhbHNlIH0pXG4gIHByaXZhdGUgYWxsU2VsZWN0ZWRFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBwdWJsaWMgZ2V0IGFsbENvbHVtbnNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hbGxDb2x1bW5zVmlzaWJsZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgYWxsQ29sdW1uc1Zpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9hbGxDb2x1bW5zVmlzaWJsZSA9IHZhbHVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29sdW1uc1NlcnZpY2U6IENvbHVtbnNTZXJ2aWNlLFxuICAgIEBJbmplY3QoVU5JUVVFX0lEKSBwdWJsaWMgY29sdW1uU3dpdGNoSWQ6IHN0cmluZyxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBASW5qZWN0KFVOSVFVRV9JRCkgcHVibGljIHBvcG92ZXJJZDogc3RyaW5nXG4gICkge31cblxuICBnZXQgaGlkZWFibGVDb2x1bW5TdGF0ZXMoKTogQ29sdW1uU3RhdGVbXSB7XG4gICAgY29uc3QgaGlkZWFibGVzID0gdGhpcy5jb2x1bW5zU2VydmljZS5jb2x1bW5zLmZpbHRlcihjb2x1bW4gPT4gY29sdW1uLnZhbHVlLmhpZGVhYmxlKTtcbiAgICByZXR1cm4gaGlkZWFibGVzLm1hcChjb2x1bW4gPT4gY29sdW1uLnZhbHVlKTtcbiAgfVxuXG4gIGdldCBoYXNPbmx5T25lVmlzaWJsZUNvbHVtbigpOiBib29sZWFuIHtcbiAgICBjb25zdCBuYk5vbkhpZGVhYmxlQ29sdW1ucyA9IHRoaXMuY29sdW1uc1NlcnZpY2UuY29sdW1ucy5sZW5ndGggLSB0aGlzLmhpZGVhYmxlQ29sdW1uU3RhdGVzLmxlbmd0aDtcbiAgICAvLyB0aGlzIHNob3VsZCBvbmx5IHJldHVybiB0cnVlIHdoZW4gdGhlcmUgaXMgbm8gbm9uLWhpZGVhYmxlIGNvbHVtbnMuXG4gICAgcmV0dXJuIChcbiAgICAgIG5iTm9uSGlkZWFibGVDb2x1bW5zID09PSAwICYmIHRoaXMuaGlkZWFibGVDb2x1bW5TdGF0ZXMuZmlsdGVyKGNvbHVtblN0YXRlID0+ICFjb2x1bW5TdGF0ZS5oaWRkZW4pLmxlbmd0aCA9PT0gMVxuICAgICk7XG4gIH1cblxuICB0b2dnbGVDb2x1bW5TdGF0ZShjb2x1bW5TdGF0ZTogQ29sdW1uU3RhdGUsIGV2ZW50OiBib29sZWFuKSB7XG4gICAgY29uc3QgY29sdW1uVG9Ub2dnbGUgPSB0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnMuZmlsdGVyKGNvbHVtbiA9PiBjb2x1bW4udmFsdWUgPT09IGNvbHVtblN0YXRlKVswXTtcbiAgICB0aGlzLmNvbHVtbnNTZXJ2aWNlLmVtaXRTdGF0ZUNoYW5nZShjb2x1bW5Ub1RvZ2dsZSwge1xuICAgICAgaGlkZGVuOiBldmVudCxcbiAgICAgIGNoYW5nZXM6IFtEYXRhZ3JpZENvbHVtbkNoYW5nZXMuSElEREVOXSxcbiAgICB9KTtcbiAgfVxuXG4gIHRvZ2dsZVN3aXRjaFBhbmVsKCkge1xuICAgIHRoaXMub3BlblN0YXRlID0gIXRoaXMub3BlblN0YXRlO1xuICAgIGlmICh0aGlzLm9wZW5TdGF0ZSAmJiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmIHRoaXMubWVudURlc2NyaXB0aW9uRWxlbWVudCkge1xuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5tZW51RGVzY3JpcHRpb25FbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBhbGxDb2x1bW5zU2VsZWN0ZWQoKSB7XG4gICAgdGhpcy5hbGxTZWxlY3RlZEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLy8gV2l0aG91dCB0cmFja2luZyB0aGUgY2hlY2tib3hlcyBnZXQgcmVyZW5kZXJlZCBvbiBtb2RlbCB1cGRhdGUsIHdoaWNoIGxlYWRzXG4gIC8vIHRvIGxvc3Mgb2YgZm9jdXMgYWZ0ZXIgY2hlY2tib3ggdG9nZ2xlLlxuICB0cmFja0J5Rm4oaW5kZXgpIHtcbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cbn1cbiJdfQ==