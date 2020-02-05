/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, ViewChild, ViewContainerRef, } from '@angular/core';
import { combineLatest } from 'rxjs';
import { IfExpandService } from '../../utils/conditional/if-expanded.service';
import { HostWrapper } from '../../utils/host-wrapping/host-wrapper';
import { LoadingListener } from '../../utils/loading/loading-listener';
import { ClrDatagridCell } from './datagrid-cell';
import { DatagridDisplayMode } from './enums/display-mode.enum';
import { DisplayModeService } from './providers/display-mode.service';
import { ExpandableRowsCount } from './providers/global-expandable-rows';
import { RowActionService } from './providers/row-action-service';
import { Selection } from './providers/selection';
import { WrappedRow } from './wrapped-row';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { SelectionType } from './enums/selection-type';
import { DatagridIfExpandService } from './datagrid-if-expanded.service';
import { ClrExpandableAnimation } from '../../utils/animations/expandable-animation/expandable-animation';
let nbRow = 0;
let ClrDatagridRow = class ClrDatagridRow {
    constructor(selection, rowActionService, globalExpandable, expand, displayMode, vcr, renderer, el, commonStrings) {
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.globalExpandable = globalExpandable;
        this.expand = expand;
        this.displayMode = displayMode;
        this.vcr = vcr;
        this.renderer = renderer;
        this.el = el;
        this.commonStrings = commonStrings;
        /* reference to the enum so that template can access */
        this.SELECTION_TYPE = SelectionType;
        this.expandAnimationTrigger = false;
        this._selected = false;
        this.selectedChanged = new EventEmitter(false);
        this.expandedChange = new EventEmitter(false);
        this.subscriptions = [];
        this.displayCells = false;
        nbRow++;
        this.id = 'clr-dg-row' + nbRow;
        this.radioId = 'clr-dg-row-rd' + nbRow;
        this.checkboxId = 'clr-dg-row-cb' + nbRow;
        this.subscriptions.push(combineLatest(this.expand.replace, this.expand.expandChange).subscribe(([expandReplaceValue, expandChangeValue]) => {
            if (expandReplaceValue && expandChangeValue) {
                // replaced and expanding
                this.replaced = true;
                this.renderer.addClass(this.el.nativeElement, 'datagrid-row-replaced');
            }
            else {
                this.replaced = false;
                // Handles these cases: not replaced and collapsing & replaced and
                // collapsing and not replaced and expanding.
                this.renderer.removeClass(this.el.nativeElement, 'datagrid-row-replaced');
            }
        }));
    }
    /**
     * Indicates if the row is selected
     */
    get selected() {
        if (this.selection.selectionType === SelectionType.None) {
            return this._selected;
        }
        else {
            return this.selection.isSelected(this.item);
        }
    }
    set selected(value) {
        if (this.selection.selectionType === SelectionType.None) {
            this._selected = value;
        }
        else {
            this.selection.setSelected(this.item, value);
        }
    }
    toggle(selected = !this.selected) {
        if (selected !== this.selected) {
            this.selected = selected;
            this.selectedChanged.emit(selected);
        }
    }
    get expanded() {
        return this.expand.expanded;
    }
    set expanded(value) {
        this.expand.expanded = value;
    }
    toggleExpand() {
        if (this.expand.expandable) {
            this.expandAnimation.updateStartHeight();
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    }
    ngAfterContentInit() {
        this.dgCells.changes.subscribe(() => {
            this.dgCells.forEach(cell => {
                this._scrollableCells.insert(cell._view);
            });
        });
    }
    ngAfterViewInit() {
        this.subscriptions.push(this.displayMode.view.subscribe(viewChange => {
            // Listen for view changes and move cells around depending on the current displayType
            // remove cell views from display view
            for (let i = this._scrollableCells.length; i > 0; i--) {
                this._scrollableCells.detach();
            }
            // remove cell views from calculated view
            for (let i = this._calculatedCells.length; i > 0; i--) {
                this._calculatedCells.detach();
            }
            if (viewChange === DatagridDisplayMode.CALCULATE) {
                this.displayCells = false;
                this.dgCells.forEach(cell => {
                    this._calculatedCells.insert(cell._view);
                });
            }
            else {
                this.displayCells = true;
                this.dgCells.forEach(cell => {
                    this._scrollableCells.insert(cell._view);
                });
            }
        }), this.expand.animate.subscribe(() => {
            this.expandAnimationTrigger = !this.expandAnimationTrigger;
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
    ngOnInit() {
        this.wrappedInjector = new HostWrapper(WrappedRow, this.vcr);
    }
    get _view() {
        return this.wrappedInjector.get(WrappedRow, this.vcr).rowView;
    }
};
tslib_1.__decorate([
    ViewChild(ClrExpandableAnimation, { static: false }),
    tslib_1.__metadata("design:type", ClrExpandableAnimation)
], ClrDatagridRow.prototype, "expandAnimation", void 0);
tslib_1.__decorate([
    Input('clrDgItem'),
    tslib_1.__metadata("design:type", Object)
], ClrDatagridRow.prototype, "item", void 0);
tslib_1.__decorate([
    Input('clrDgSelected'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrDatagridRow.prototype, "selected", null);
tslib_1.__decorate([
    Output('clrDgSelectedChange'),
    tslib_1.__metadata("design:type", Object)
], ClrDatagridRow.prototype, "selectedChanged", void 0);
tslib_1.__decorate([
    Input('clrDgExpanded'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrDatagridRow.prototype, "expanded", null);
tslib_1.__decorate([
    Output('clrDgExpandedChange'),
    tslib_1.__metadata("design:type", Object)
], ClrDatagridRow.prototype, "expandedChange", void 0);
tslib_1.__decorate([
    ContentChildren(ClrDatagridCell),
    tslib_1.__metadata("design:type", QueryList)
], ClrDatagridRow.prototype, "dgCells", void 0);
tslib_1.__decorate([
    ViewChild('stickyCells', { static: false, read: ViewContainerRef }),
    tslib_1.__metadata("design:type", ViewContainerRef)
], ClrDatagridRow.prototype, "_stickyCells", void 0);
tslib_1.__decorate([
    ViewChild('scrollableCells', { static: false, read: ViewContainerRef }),
    tslib_1.__metadata("design:type", ViewContainerRef)
], ClrDatagridRow.prototype, "_scrollableCells", void 0);
tslib_1.__decorate([
    ViewChild('calculatedCells', { static: false, read: ViewContainerRef }),
    tslib_1.__metadata("design:type", ViewContainerRef)
], ClrDatagridRow.prototype, "_calculatedCells", void 0);
ClrDatagridRow = tslib_1.__decorate([
    Component({
        selector: 'clr-dg-row',
        template: "<!--\n  We need to wrap the #rowContent in label element if we are in rowSelectionMode.\n  Clicking of that wrapper label will equate to clicking on the whole row, which triggers the checkbox to toggle.\n-->\n<label class=\"datagrid-row-clickable\" *ngIf=\"selection.rowSelectionMode\">\n  <clr-expandable-animation [clrExpandTrigger]=\"expandAnimationTrigger\" *ngIf=\"expand.expandable\">\n    <ng-template [ngTemplateOutlet]=\"rowContent\"></ng-template>\n  </clr-expandable-animation>\n  <ng-template [ngTemplateOutlet]=\"rowContent\" *ngIf=\"!expand.expandable\"></ng-template>\n</label>\n\n<clr-expandable-animation *ngIf=\"!selection.rowSelectionMode && expand.expandable\" [clrExpandTrigger]=\"expandAnimationTrigger\">\n  <ng-template [ngTemplateOutlet]=\"rowContent\"></ng-template>\n</clr-expandable-animation>\n\n<ng-template *ngIf=\"!selection.rowSelectionMode && !expand.expandable\" [ngTemplateOutlet]=\"rowContent\"></ng-template>\n\n<!--\n    We need the \"project into template\" hacks because we need this in 2 different places\n    depending on whether the details replace the row or not.\n-->\n<ng-template #detail>\n  <ng-content select=\"clr-dg-row-detail\"></ng-content>\n</ng-template>\n\n<ng-template #rowContent>\n  <div role=\"row\" [id]=\"id\" class=\"datagrid-row-master datagrid-row-flex\">\n    <div class=\"datagrid-row-sticky\">\n      <!-- Sticky elements here -->\n      <ng-container #stickyCells></ng-container> <!-- placeholder for projecting other sticky cells as pinned-->\n    </div>\n    <div class=\"datagrid-row-scrollable\" [ngClass]=\"{'is-replaced': replaced && expanded}\">\n      <div class=\"datagrid-scrolling-cells\">\n        <div *ngIf=\"selection.selectionType === SELECTION_TYPE.Multi\"\n             class=\"datagrid-select datagrid-fixed-column datagrid-cell\" role=\"gridcell\">\n          <input clrCheckbox type=\"checkbox\" [ngModel]=\"selected\" (ngModelChange)=\"toggle($event)\" [id]=\"checkboxId\"\n                 [attr.aria-label]=\"commonStrings.keys.select\">\n        </div>\n        <div *ngIf=\"selection.selectionType === SELECTION_TYPE.Single\"\n             class=\"datagrid-select datagrid-fixed-column datagrid-cell\" role=\"gridcell\">\n            <!-- TODO: it would be better if in addition to the generic \"Select\" label, we could add aria-labelledby\n            to label the radio by the first cell in the row (typically an id or name).\n            It's pretty easy to label it with the whole row since we already have an id for it, but in most\n            cases the row is far too long to serve as a label, the screenreader reads every single cell content. -->\n            <input type=\"radio\" clrRadio [id]=\"radioId\" [name]=\"selection.id + '-radio'\" [value]=\"item\"\n                   [(ngModel)]=\"selection.currentSingle\" [checked]=\"selection.currentSingle === item\"\n                   [attr.aria-label]=\"commonStrings.keys.select\">\n        </div>\n        <div *ngIf=\"rowActionService.hasActionableRow\"\n             class=\"datagrid-row-actions datagrid-fixed-column datagrid-cell\" role=\"gridcell\">\n          <ng-content select=\"clr-dg-action-overflow\"></ng-content>\n        </div>\n        <div *ngIf=\"globalExpandable.hasExpandableRow\"\n             class=\"datagrid-expandable-caret datagrid-fixed-column datagrid-cell\" role=\"gridcell\">\n          <ng-container *ngIf=\"expand.expandable\">\n            <button (click)=\"toggleExpand()\" *ngIf=\"!expand.loading\" type=\"button\" class=\"datagrid-expandable-caret-button\">\n              <clr-icon shape=\"caret\"\n                        class=\"datagrid-expandable-caret-icon\"\n                        [attr.dir]=\"expand.expanded ? 'down' : 'right'\"\n                        [attr.title]=\"expand.expanded ? commonStrings.keys.collapse : commonStrings.keys.expand\"></clr-icon>\n            </button>\n            <clr-spinner *ngIf=\"expand.loading\" clrSmall>{{ commonStrings.keys.loading }}</clr-spinner>\n          </ng-container>\n        </div>\n        <ng-container #scrollableCells></ng-container>\n      </div>\n      <!-- details here when replace, re-visit when sticky container is used for pinned cells -->\n      <ng-template *ngIf=\"replaced && !expand.loading\"\n                   [ngTemplateOutlet]=\"detail\"></ng-template>\n    </div>\n    <ng-template *ngIf=\"!replaced && !expand.loading\"\n                 [ngTemplateOutlet]=\"detail\"></ng-template>\n  </div>\n</ng-template>\n\n<ng-container #calculatedCells></ng-container>\n",
        host: {
            '[class.datagrid-row]': 'true',
            '[class.datagrid-selected]': 'selected',
            '[attr.aria-owns]': 'id',
            role: 'rowgroup',
        },
        providers: [
            DatagridIfExpandService,
            { provide: IfExpandService, useExisting: DatagridIfExpandService },
            { provide: LoadingListener, useExisting: DatagridIfExpandService },
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [Selection,
        RowActionService,
        ExpandableRowsCount,
        DatagridIfExpandService,
        DisplayModeService,
        ViewContainerRef,
        Renderer2,
        ElementRef,
        ClrCommonStringsService])
], ClrDatagridRow);
export { ClrDatagridRow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1yb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBR0wsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUVaLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1QsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDckUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRXZFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFD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O3dEQUFDO0FBRW5DO0lBREMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztzQ0FDdEQsZ0JBQWdCO3dEQUFDO0FBbkt4QixjQUFjO0lBZjFCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxZQUFZO1FBQ3RCLHE4SUFBa0M7UUFDbEMsSUFBSSxFQUFFO1lBQ0osc0JBQXNCLEVBQUUsTUFBTTtZQUM5QiwyQkFBMkIsRUFBRSxVQUFVO1lBQ3ZDLGtCQUFrQixFQUFFLElBQUk7WUFDeEIsSUFBSSxFQUFFLFVBQVU7U0FDakI7UUFDRCxTQUFTLEVBQUU7WUFDVCx1QkFBdUI7WUFDdkIsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSx1QkFBdUIsRUFBRTtZQUNsRSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLHVCQUF1QixFQUFFO1NBQ25FO0tBQ0YsQ0FBQzs2Q0FzQm9CLFNBQVM7UUFDRixnQkFBZ0I7UUFDaEIsbUJBQW1CO1FBQzdCLHVCQUF1QjtRQUNqQixrQkFBa0I7UUFDMUIsZ0JBQWdCO1FBQ1gsU0FBUztRQUNmLFVBQVU7UUFDQSx1QkFBdUI7R0E3QnBDLGNBQWMsQ0E4SzFCO1NBOUtZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJZkV4cGFuZFNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1leHBhbmRlZC5zZXJ2aWNlJztcbmltcG9ydCB7IEhvc3RXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9ob3N0LXdyYXBwZXInO1xuaW1wb3J0IHsgTG9hZGluZ0xpc3RlbmVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9hZGluZy9sb2FkaW5nLWxpc3RlbmVyJztcblxuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDZWxsIH0gZnJvbSAnLi9kYXRhZ3JpZC1jZWxsJztcbmltcG9ydCB7IERhdGFncmlkRGlzcGxheU1vZGUgfSBmcm9tICcuL2VudW1zL2Rpc3BsYXktbW9kZS5lbnVtJztcbmltcG9ydCB7IERpc3BsYXlNb2RlU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2Rpc3BsYXktbW9kZS5zZXJ2aWNlJztcbmltcG9ydCB7IEV4cGFuZGFibGVSb3dzQ291bnQgfSBmcm9tICcuL3Byb3ZpZGVycy9nbG9iYWwtZXhwYW5kYWJsZS1yb3dzJztcbmltcG9ydCB7IFJvd0FjdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9yb3ctYWN0aW9uLXNlcnZpY2UnO1xuaW1wb3J0IHsgU2VsZWN0aW9uIH0gZnJvbSAnLi9wcm92aWRlcnMvc2VsZWN0aW9uJztcbmltcG9ydCB7IFdyYXBwZWRSb3cgfSBmcm9tICcuL3dyYXBwZWQtcm93JztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5zZXJ2aWNlJztcbmltcG9ydCB7IFNlbGVjdGlvblR5cGUgfSBmcm9tICcuL2VudW1zL3NlbGVjdGlvbi10eXBlJztcbmltcG9ydCB7IERhdGFncmlkSWZFeHBhbmRTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhZ3JpZC1pZi1leHBhbmRlZC5zZXJ2aWNlJztcbmltcG9ydCB7IENsckV4cGFuZGFibGVBbmltYXRpb24gfSBmcm9tICcuLi8uLi91dGlscy9hbmltYXRpb25zL2V4cGFuZGFibGUtYW5pbWF0aW9uL2V4cGFuZGFibGUtYW5pbWF0aW9uJztcblxubGV0IG5iUm93OiBudW1iZXIgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctcm93JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RhdGFncmlkLXJvdy5odG1sJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZGF0YWdyaWQtcm93XSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmRhdGFncmlkLXNlbGVjdGVkXSc6ICdzZWxlY3RlZCcsXG4gICAgJ1thdHRyLmFyaWEtb3duc10nOiAnaWQnLFxuICAgIHJvbGU6ICdyb3dncm91cCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIERhdGFncmlkSWZFeHBhbmRTZXJ2aWNlLFxuICAgIHsgcHJvdmlkZTogSWZFeHBhbmRTZXJ2aWNlLCB1c2VFeGlzdGluZzogRGF0YWdyaWRJZkV4cGFuZFNlcnZpY2UgfSxcbiAgICB7IHByb3ZpZGU6IExvYWRpbmdMaXN0ZW5lciwgdXNlRXhpc3Rpbmc6IERhdGFncmlkSWZFeHBhbmRTZXJ2aWNlIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkUm93PFQgPSBhbnk+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIHB1YmxpYyBpZDogc3RyaW5nO1xuICBwdWJsaWMgcmFkaW9JZDogc3RyaW5nO1xuICBwdWJsaWMgY2hlY2tib3hJZDogc3RyaW5nO1xuXG4gIC8qIHJlZmVyZW5jZSB0byB0aGUgZW51bSBzbyB0aGF0IHRlbXBsYXRlIGNhbiBhY2Nlc3MgKi9cbiAgcHVibGljIFNFTEVDVElPTl9UWVBFID0gU2VsZWN0aW9uVHlwZTtcblxuICBAVmlld0NoaWxkKENsckV4cGFuZGFibGVBbmltYXRpb24sIHsgc3RhdGljOiBmYWxzZSB9KVxuICBleHBhbmRBbmltYXRpb246IENsckV4cGFuZGFibGVBbmltYXRpb247XG5cbiAgLyoqXG4gICAqIE1vZGVsIG9mIHRoZSByb3csIHRvIHVzZSBmb3Igc2VsZWN0aW9uXG4gICAqL1xuICBASW5wdXQoJ2NsckRnSXRlbScpIGl0ZW06IFQ7XG5cbiAgcHVibGljIHJlcGxhY2VkO1xuXG4gIHB1YmxpYyBleHBhbmRBbmltYXRpb25UcmlnZ2VyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHNlbGVjdGlvbjogU2VsZWN0aW9uPFQ+LFxuICAgIHB1YmxpYyByb3dBY3Rpb25TZXJ2aWNlOiBSb3dBY3Rpb25TZXJ2aWNlLFxuICAgIHB1YmxpYyBnbG9iYWxFeHBhbmRhYmxlOiBFeHBhbmRhYmxlUm93c0NvdW50LFxuICAgIHB1YmxpYyBleHBhbmQ6IERhdGFncmlkSWZFeHBhbmRTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGlzcGxheU1vZGU6IERpc3BsYXlNb2RlU2VydmljZSxcbiAgICBwcml2YXRlIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2VcbiAgKSB7XG4gICAgbmJSb3crKztcbiAgICB0aGlzLmlkID0gJ2Nsci1kZy1yb3cnICsgbmJSb3c7XG4gICAgdGhpcy5yYWRpb0lkID0gJ2Nsci1kZy1yb3ctcmQnICsgbmJSb3c7XG4gICAgdGhpcy5jaGVja2JveElkID0gJ2Nsci1kZy1yb3ctY2InICsgbmJSb3c7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIGNvbWJpbmVMYXRlc3QodGhpcy5leHBhbmQucmVwbGFjZSwgdGhpcy5leHBhbmQuZXhwYW5kQ2hhbmdlKS5zdWJzY3JpYmUoXG4gICAgICAgIChbZXhwYW5kUmVwbGFjZVZhbHVlLCBleHBhbmRDaGFuZ2VWYWx1ZV0pID0+IHtcbiAgICAgICAgICBpZiAoZXhwYW5kUmVwbGFjZVZhbHVlICYmIGV4cGFuZENoYW5nZVZhbHVlKSB7XG4gICAgICAgICAgICAvLyByZXBsYWNlZCBhbmQgZXhwYW5kaW5nXG4gICAgICAgICAgICB0aGlzLnJlcGxhY2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZGF0YWdyaWQtcm93LXJlcGxhY2VkJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVwbGFjZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIEhhbmRsZXMgdGhlc2UgY2FzZXM6IG5vdCByZXBsYWNlZCBhbmQgY29sbGFwc2luZyAmIHJlcGxhY2VkIGFuZFxuICAgICAgICAgICAgLy8gY29sbGFwc2luZyBhbmQgbm90IHJlcGxhY2VkIGFuZCBleHBhbmRpbmcuXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2RhdGFncmlkLXJvdy1yZXBsYWNlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RlZCA9IGZhbHNlO1xuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSByb3cgaXMgc2VsZWN0ZWRcbiAgICovXG4gIHB1YmxpYyBnZXQgc2VsZWN0ZWQoKSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuTm9uZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24uaXNTZWxlY3RlZCh0aGlzLml0ZW0pO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdTZWxlY3RlZCcpXG4gIHB1YmxpYyBzZXQgc2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5zZWxlY3Rpb24uc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5Ob25lKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZCA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5zZXRTZWxlY3RlZCh0aGlzLml0ZW0sIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ1NlbGVjdGVkQ2hhbmdlJykgc2VsZWN0ZWRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPihmYWxzZSk7XG5cbiAgcHVibGljIHRvZ2dsZShzZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGVkKSB7XG4gICAgaWYgKHNlbGVjdGVkICE9PSB0aGlzLnNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlZC5lbWl0KHNlbGVjdGVkKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGV4cGFuZGVkKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGFuZC5leHBhbmRlZDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdFeHBhbmRlZCcpXG4gIHB1YmxpYyBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmV4cGFuZC5leHBhbmRlZCA9IHZhbHVlO1xuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdFeHBhbmRlZENoYW5nZScpIGV4cGFuZGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPihmYWxzZSk7XG5cbiAgcHVibGljIHRvZ2dsZUV4cGFuZCgpIHtcbiAgICBpZiAodGhpcy5leHBhbmQuZXhwYW5kYWJsZSkge1xuICAgICAgdGhpcy5leHBhbmRBbmltYXRpb24udXBkYXRlU3RhcnRIZWlnaHQoKTtcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcbiAgICAgIHRoaXMuZXhwYW5kZWRDaGFuZ2UuZW1pdCh0aGlzLmV4cGFuZGVkKTtcbiAgICB9XG4gIH1cblxuICAvKioqKipcbiAgICogcHJvcGVydHkgZGdDZWxsc1xuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQSBRdWVyeSBMaXN0IG9mIHRoZSBDbHJEYXRhZ3JpZCBjZWxscyBpbiB0aGlzIHJvdy5cbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xyRGF0YWdyaWRDZWxsKSBkZ0NlbGxzOiBRdWVyeUxpc3Q8Q2xyRGF0YWdyaWRDZWxsPjtcblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5kZ0NlbGxzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuZGdDZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICB0aGlzLl9zY3JvbGxhYmxlQ2VsbHMuaW5zZXJ0KGNlbGwuX3ZpZXcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmRpc3BsYXlNb2RlLnZpZXcuc3Vic2NyaWJlKHZpZXdDaGFuZ2UgPT4ge1xuICAgICAgICAvLyBMaXN0ZW4gZm9yIHZpZXcgY2hhbmdlcyBhbmQgbW92ZSBjZWxscyBhcm91bmQgZGVwZW5kaW5nIG9uIHRoZSBjdXJyZW50IGRpc3BsYXlUeXBlXG4gICAgICAgIC8vIHJlbW92ZSBjZWxsIHZpZXdzIGZyb20gZGlzcGxheSB2aWV3XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9zY3JvbGxhYmxlQ2VsbHMubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5fc2Nyb2xsYWJsZUNlbGxzLmRldGFjaCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlbW92ZSBjZWxsIHZpZXdzIGZyb20gY2FsY3VsYXRlZCB2aWV3XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9jYWxjdWxhdGVkQ2VsbHMubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5fY2FsY3VsYXRlZENlbGxzLmRldGFjaCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2aWV3Q2hhbmdlID09PSBEYXRhZ3JpZERpc3BsYXlNb2RlLkNBTENVTEFURSkge1xuICAgICAgICAgIHRoaXMuZGlzcGxheUNlbGxzID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5kZ0NlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jYWxjdWxhdGVkQ2VsbHMuaW5zZXJ0KGNlbGwuX3ZpZXcpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZGlzcGxheUNlbGxzID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmRnQ2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbGFibGVDZWxscy5pbnNlcnQoY2VsbC5fdmlldyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgdGhpcy5leHBhbmQuYW5pbWF0ZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmV4cGFuZEFuaW1hdGlvblRyaWdnZXIgPSAhdGhpcy5leHBhbmRBbmltYXRpb25UcmlnZ2VyO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWI6IFN1YnNjcmlwdGlvbikgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgcHVibGljIGRpc3BsYXlDZWxscyA9IGZhbHNlO1xuXG4gIEBWaWV3Q2hpbGQoJ3N0aWNreUNlbGxzJywgeyBzdGF0aWM6IGZhbHNlLCByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIF9zdGlja3lDZWxsczogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnc2Nyb2xsYWJsZUNlbGxzJywgeyBzdGF0aWM6IGZhbHNlLCByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIF9zY3JvbGxhYmxlQ2VsbHM6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2NhbGN1bGF0ZWRDZWxscycsIHsgc3RhdGljOiBmYWxzZSwgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBfY2FsY3VsYXRlZENlbGxzOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIHByaXZhdGUgd3JhcHBlZEluamVjdG9yOiBJbmplY3RvcjtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndyYXBwZWRJbmplY3RvciA9IG5ldyBIb3N0V3JhcHBlcihXcmFwcGVkUm93LCB0aGlzLnZjcik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IF92aWV3KCkge1xuICAgIHJldHVybiB0aGlzLndyYXBwZWRJbmplY3Rvci5nZXQoV3JhcHBlZFJvdywgdGhpcy52Y3IpLnJvd1ZpZXc7XG4gIH1cbn1cbiJdfQ==