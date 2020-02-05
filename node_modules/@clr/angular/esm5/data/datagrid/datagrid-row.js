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
var nbRow = 0;
var ClrDatagridRow = /** @class */ (function () {
    function ClrDatagridRow(selection, rowActionService, globalExpandable, expand, displayMode, vcr, renderer, el, commonStrings) {
        var _this = this;
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
        this.subscriptions.push(combineLatest(this.expand.replace, this.expand.expandChange).subscribe(function (_a) {
            var _b = tslib_1.__read(_a, 2), expandReplaceValue = _b[0], expandChangeValue = _b[1];
            if (expandReplaceValue && expandChangeValue) {
                // replaced and expanding
                _this.replaced = true;
                _this.renderer.addClass(_this.el.nativeElement, 'datagrid-row-replaced');
            }
            else {
                _this.replaced = false;
                // Handles these cases: not replaced and collapsing & replaced and
                // collapsing and not replaced and expanding.
                _this.renderer.removeClass(_this.el.nativeElement, 'datagrid-row-replaced');
            }
        }));
    }
    Object.defineProperty(ClrDatagridRow.prototype, "selected", {
        /**
         * Indicates if the row is selected
         */
        get: function () {
            if (this.selection.selectionType === SelectionType.None) {
                return this._selected;
            }
            else {
                return this.selection.isSelected(this.item);
            }
        },
        set: function (value) {
            if (this.selection.selectionType === SelectionType.None) {
                this._selected = value;
            }
            else {
                this.selection.setSelected(this.item, value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridRow.prototype.toggle = function (selected) {
        if (selected === void 0) { selected = !this.selected; }
        if (selected !== this.selected) {
            this.selected = selected;
            this.selectedChanged.emit(selected);
        }
    };
    Object.defineProperty(ClrDatagridRow.prototype, "expanded", {
        get: function () {
            return this.expand.expanded;
        },
        set: function (value) {
            this.expand.expanded = value;
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridRow.prototype.toggleExpand = function () {
        if (this.expand.expandable) {
            this.expandAnimation.updateStartHeight();
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    };
    ClrDatagridRow.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.dgCells.changes.subscribe(function () {
            _this.dgCells.forEach(function (cell) {
                _this._scrollableCells.insert(cell._view);
            });
        });
    };
    ClrDatagridRow.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.subscriptions.push(this.displayMode.view.subscribe(function (viewChange) {
            // Listen for view changes and move cells around depending on the current displayType
            // remove cell views from display view
            for (var i = _this._scrollableCells.length; i > 0; i--) {
                _this._scrollableCells.detach();
            }
            // remove cell views from calculated view
            for (var i = _this._calculatedCells.length; i > 0; i--) {
                _this._calculatedCells.detach();
            }
            if (viewChange === DatagridDisplayMode.CALCULATE) {
                _this.displayCells = false;
                _this.dgCells.forEach(function (cell) {
                    _this._calculatedCells.insert(cell._view);
                });
            }
            else {
                _this.displayCells = true;
                _this.dgCells.forEach(function (cell) {
                    _this._scrollableCells.insert(cell._view);
                });
            }
        }), this.expand.animate.subscribe(function () {
            _this.expandAnimationTrigger = !_this.expandAnimationTrigger;
        }));
    };
    ClrDatagridRow.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ClrDatagridRow.prototype.ngOnInit = function () {
        this.wrappedInjector = new HostWrapper(WrappedRow, this.vcr);
    };
    Object.defineProperty(ClrDatagridRow.prototype, "_view", {
        get: function () {
            return this.wrappedInjector.get(WrappedRow, this.vcr).rowView;
        },
        enumerable: true,
        configurable: true
    });
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
    return ClrDatagridRow;
}());
export { ClrDatagridRow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1yb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBR0wsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUVaLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1QsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDckUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRXZFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDekUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFFMUcsSUFBSSxLQUFLLEdBQVcsQ0FBQyxDQUFDO0FBaUJ0QjtJQW9CRSx3QkFDUyxTQUF1QixFQUN2QixnQkFBa0MsRUFDbEMsZ0JBQXFDLEVBQ3JDLE1BQStCLEVBQzlCLFdBQStCLEVBQy9CLEdBQXFCLEVBQ3JCLFFBQW1CLEVBQ25CLEVBQWMsRUFDZixhQUFzQztRQVQvQyxpQkFnQ0M7UUEvQlEsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUN2QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBcUI7UUFDckMsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFDOUIsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNmLGtCQUFhLEdBQWIsYUFBYSxDQUF5QjtRQXhCL0MsdURBQXVEO1FBQ2hELG1CQUFjLEdBQUcsYUFBYSxDQUFDO1FBWS9CLDJCQUFzQixHQUFZLEtBQUssQ0FBQztRQW9DdkMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQXFCSyxvQkFBZSxHQUFHLElBQUksWUFBWSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBa0JuRCxtQkFBYyxHQUFHLElBQUksWUFBWSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBeUR6RSxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFNcEMsaUJBQVksR0FBRyxLQUFLLENBQUM7UUE3SDFCLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEVBQUUsR0FBRyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFFMUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FDcEUsVUFBQyxFQUF1QztnQkFBdkMsMEJBQXVDLEVBQXRDLDBCQUFrQixFQUFFLHlCQUFpQjtZQUNyQyxJQUFJLGtCQUFrQixJQUFJLGlCQUFpQixFQUFFO2dCQUMzQyx5QkFBeUI7Z0JBQ3pCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO2FBQ3hFO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixrRUFBa0U7Z0JBQ2xFLDZDQUE2QztnQkFDN0MsS0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsdUJBQXVCLENBQUMsQ0FBQzthQUMzRTtRQUNILENBQUMsQ0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBTUQsc0JBQVcsb0NBQVE7UUFIbkI7O1dBRUc7YUFDSDtZQUNFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEtBQUssYUFBYSxDQUFDLElBQUksRUFBRTtnQkFDdkQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzdDO1FBQ0gsQ0FBQzthQUdELFVBQW9CLEtBQWM7WUFDaEMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsS0FBSyxhQUFhLENBQUMsSUFBSSxFQUFFO2dCQUN2RCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzthQUN4QjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzlDO1FBQ0gsQ0FBQzs7O09BVEE7SUFhTSwrQkFBTSxHQUFiLFVBQWMsUUFBeUI7UUFBekIseUJBQUEsRUFBQSxZQUFZLElBQUksQ0FBQyxRQUFRO1FBQ3JDLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDO0lBRUQsc0JBQVcsb0NBQVE7YUFBbkI7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQzlCLENBQUM7YUFHRCxVQUFvQixLQUFjO1lBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUMvQixDQUFDOzs7T0FMQTtJQVNNLHFDQUFZLEdBQW5CO1FBQ0UsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUMxQixJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztJQVdELDJDQUFrQixHQUFsQjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1lBQzdCLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDdkIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx3Q0FBZSxHQUFmO1FBQUEsaUJBNEJDO1FBM0JDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQSxVQUFVO1lBQ3hDLHFGQUFxRjtZQUNyRixzQ0FBc0M7WUFDdEMsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JELEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNoQztZQUNELHlDQUF5QztZQUN6QyxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDckQsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsSUFBSSxVQUFVLEtBQUssbUJBQW1CLENBQUMsU0FBUyxFQUFFO2dCQUNoRCxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO29CQUN2QixLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxLQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDekIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO29CQUN2QixLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQyxFQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUM1QixLQUFJLENBQUMsc0JBQXNCLEdBQUcsQ0FBQyxLQUFJLENBQUMsc0JBQXNCLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFJRCxvQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFpQixJQUFLLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDdkUsQ0FBQztJQWFELGlDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksV0FBVyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELHNCQUFXLGlDQUFLO2FBQWhCO1lBQ0UsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNoRSxDQUFDOzs7T0FBQTtJQXBLRDtRQURDLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQzswQ0FDcEMsc0JBQXNCOzJEQUFDO0lBS3BCO1FBQW5CLEtBQUssQ0FBQyxXQUFXLENBQUM7O2dEQUFTO0lBcUQ1QjtRQURDLEtBQUssQ0FBQyxlQUFlLENBQUM7OztrREFPdEI7SUFFOEI7UUFBOUIsTUFBTSxDQUFDLHFCQUFxQixDQUFDOzsyREFBb0Q7SUFjbEY7UUFEQyxLQUFLLENBQUMsZUFBZSxDQUFDOzs7a0RBR3RCO0lBRThCO1FBQTlCLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQzs7MERBQW1EO0lBaUIvQztRQUFqQyxlQUFlLENBQUMsZUFBZSxDQUFDOzBDQUFVLFNBQVM7bURBQWtCO0lBaUR0RTtRQURDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDOzBDQUN0RCxnQkFBZ0I7d0RBQUM7SUFFL0I7UUFEQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDOzBDQUN0RCxnQkFBZ0I7NERBQUM7SUFFbkM7UUFEQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDOzBDQUN0RCxnQkFBZ0I7NERBQUM7SUFuS3hCLGNBQWM7UUFmMUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFlBQVk7WUFDdEIscThJQUFrQztZQUNsQyxJQUFJLEVBQUU7Z0JBQ0osc0JBQXNCLEVBQUUsTUFBTTtnQkFDOUIsMkJBQTJCLEVBQUUsVUFBVTtnQkFDdkMsa0JBQWtCLEVBQUUsSUFBSTtnQkFDeEIsSUFBSSxFQUFFLFVBQVU7YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsdUJBQXVCO2dCQUN2QixFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLHVCQUF1QixFQUFFO2dCQUNsRSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLHVCQUF1QixFQUFFO2FBQ25FO1NBQ0YsQ0FBQztpREFzQm9CLFNBQVM7WUFDRixnQkFBZ0I7WUFDaEIsbUJBQW1CO1lBQzdCLHVCQUF1QjtZQUNqQixrQkFBa0I7WUFDMUIsZ0JBQWdCO1lBQ1gsU0FBUztZQUNmLFVBQVU7WUFDQSx1QkFBdUI7T0E3QnBDLGNBQWMsQ0E4SzFCO0lBQUQscUJBQUM7Q0FBQSxBQTlLRCxJQThLQztTQTlLWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSWZFeHBhbmRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtZXhwYW5kZWQuc2VydmljZSc7XG5pbXBvcnQgeyBIb3N0V3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvaG9zdC13cmFwcGVyJztcbmltcG9ydCB7IExvYWRpbmdMaXN0ZW5lciB9IGZyb20gJy4uLy4uL3V0aWxzL2xvYWRpbmcvbG9hZGluZy1saXN0ZW5lcic7XG5cbmltcG9ydCB7IENsckRhdGFncmlkQ2VsbCB9IGZyb20gJy4vZGF0YWdyaWQtY2VsbCc7XG5pbXBvcnQgeyBEYXRhZ3JpZERpc3BsYXlNb2RlIH0gZnJvbSAnLi9lbnVtcy9kaXNwbGF5LW1vZGUuZW51bSc7XG5pbXBvcnQgeyBEaXNwbGF5TW9kZVNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kaXNwbGF5LW1vZGUuc2VydmljZSc7XG5pbXBvcnQgeyBFeHBhbmRhYmxlUm93c0NvdW50IH0gZnJvbSAnLi9wcm92aWRlcnMvZ2xvYmFsLWV4cGFuZGFibGUtcm93cyc7XG5pbXBvcnQgeyBSb3dBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvcm93LWFjdGlvbi1zZXJ2aWNlJztcbmltcG9ydCB7IFNlbGVjdGlvbiB9IGZyb20gJy4vcHJvdmlkZXJzL3NlbGVjdGlvbic7XG5pbXBvcnQgeyBXcmFwcGVkUm93IH0gZnJvbSAnLi93cmFwcGVkLXJvdyc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi9lbnVtcy9zZWxlY3Rpb24tdHlwZSc7XG5pbXBvcnQgeyBEYXRhZ3JpZElmRXhwYW5kU2VydmljZSB9IGZyb20gJy4vZGF0YWdyaWQtaWYtZXhwYW5kZWQuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJFeHBhbmRhYmxlQW5pbWF0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvYW5pbWF0aW9ucy9leHBhbmRhYmxlLWFuaW1hdGlvbi9leHBhbmRhYmxlLWFuaW1hdGlvbic7XG5cbmxldCBuYlJvdzogbnVtYmVyID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLXJvdycsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRhZ3JpZC1yb3cuaHRtbCcsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGFncmlkLXJvd10nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1zZWxlY3RlZF0nOiAnc2VsZWN0ZWQnLFxuICAgICdbYXR0ci5hcmlhLW93bnNdJzogJ2lkJyxcbiAgICByb2xlOiAncm93Z3JvdXAnLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICBEYXRhZ3JpZElmRXhwYW5kU2VydmljZSxcbiAgICB7IHByb3ZpZGU6IElmRXhwYW5kU2VydmljZSwgdXNlRXhpc3Rpbmc6IERhdGFncmlkSWZFeHBhbmRTZXJ2aWNlIH0sXG4gICAgeyBwcm92aWRlOiBMb2FkaW5nTGlzdGVuZXIsIHVzZUV4aXN0aW5nOiBEYXRhZ3JpZElmRXhwYW5kU2VydmljZSB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZFJvdzxUID0gYW55PiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQge1xuICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgcHVibGljIHJhZGlvSWQ6IHN0cmluZztcbiAgcHVibGljIGNoZWNrYm94SWQ6IHN0cmluZztcblxuICAvKiByZWZlcmVuY2UgdG8gdGhlIGVudW0gc28gdGhhdCB0ZW1wbGF0ZSBjYW4gYWNjZXNzICovXG4gIHB1YmxpYyBTRUxFQ1RJT05fVFlQRSA9IFNlbGVjdGlvblR5cGU7XG5cbiAgQFZpZXdDaGlsZChDbHJFeHBhbmRhYmxlQW5pbWF0aW9uLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgZXhwYW5kQW5pbWF0aW9uOiBDbHJFeHBhbmRhYmxlQW5pbWF0aW9uO1xuXG4gIC8qKlxuICAgKiBNb2RlbCBvZiB0aGUgcm93LCB0byB1c2UgZm9yIHNlbGVjdGlvblxuICAgKi9cbiAgQElucHV0KCdjbHJEZ0l0ZW0nKSBpdGVtOiBUO1xuXG4gIHB1YmxpYyByZXBsYWNlZDtcblxuICBwdWJsaWMgZXhwYW5kQW5pbWF0aW9uVHJpZ2dlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBzZWxlY3Rpb246IFNlbGVjdGlvbjxUPixcbiAgICBwdWJsaWMgcm93QWN0aW9uU2VydmljZTogUm93QWN0aW9uU2VydmljZSxcbiAgICBwdWJsaWMgZ2xvYmFsRXhwYW5kYWJsZTogRXhwYW5kYWJsZVJvd3NDb3VudCxcbiAgICBwdWJsaWMgZXhwYW5kOiBEYXRhZ3JpZElmRXhwYW5kU2VydmljZSxcbiAgICBwcml2YXRlIGRpc3BsYXlNb2RlOiBEaXNwbGF5TW9kZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlXG4gICkge1xuICAgIG5iUm93Kys7XG4gICAgdGhpcy5pZCA9ICdjbHItZGctcm93JyArIG5iUm93O1xuICAgIHRoaXMucmFkaW9JZCA9ICdjbHItZGctcm93LXJkJyArIG5iUm93O1xuICAgIHRoaXMuY2hlY2tib3hJZCA9ICdjbHItZGctcm93LWNiJyArIG5iUm93O1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICBjb21iaW5lTGF0ZXN0KHRoaXMuZXhwYW5kLnJlcGxhY2UsIHRoaXMuZXhwYW5kLmV4cGFuZENoYW5nZSkuc3Vic2NyaWJlKFxuICAgICAgICAoW2V4cGFuZFJlcGxhY2VWYWx1ZSwgZXhwYW5kQ2hhbmdlVmFsdWVdKSA9PiB7XG4gICAgICAgICAgaWYgKGV4cGFuZFJlcGxhY2VWYWx1ZSAmJiBleHBhbmRDaGFuZ2VWYWx1ZSkge1xuICAgICAgICAgICAgLy8gcmVwbGFjZWQgYW5kIGV4cGFuZGluZ1xuICAgICAgICAgICAgdGhpcy5yZXBsYWNlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2RhdGFncmlkLXJvdy1yZXBsYWNlZCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlcGxhY2VkID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBIYW5kbGVzIHRoZXNlIGNhc2VzOiBub3QgcmVwbGFjZWQgYW5kIGNvbGxhcHNpbmcgJiByZXBsYWNlZCBhbmRcbiAgICAgICAgICAgIC8vIGNvbGxhcHNpbmcgYW5kIG5vdCByZXBsYWNlZCBhbmQgZXhwYW5kaW5nLlxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkYXRhZ3JpZC1yb3ctcmVwbGFjZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VsZWN0ZWQgPSBmYWxzZTtcbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgcm93IGlzIHNlbGVjdGVkXG4gICAqL1xuICBwdWJsaWMgZ2V0IHNlbGVjdGVkKCkge1xuICAgIGlmICh0aGlzLnNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLk5vbmUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uLmlzU2VsZWN0ZWQodGhpcy5pdGVtKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoJ2NsckRnU2VsZWN0ZWQnKVxuICBwdWJsaWMgc2V0IHNlbGVjdGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuTm9uZSkge1xuICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3Rpb24uc2V0U2VsZWN0ZWQodGhpcy5pdGVtLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdTZWxlY3RlZENoYW5nZScpIHNlbGVjdGVkQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIHB1YmxpYyB0b2dnbGUoc2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3RlZCkge1xuICAgIGlmIChzZWxlY3RlZCAhPT0gdGhpcy5zZWxlY3RlZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZWQuZW1pdChzZWxlY3RlZCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBleHBhbmRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5leHBhbmQuZXhwYW5kZWQ7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnRXhwYW5kZWQnKVxuICBwdWJsaWMgc2V0IGV4cGFuZGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5leHBhbmQuZXhwYW5kZWQgPSB2YWx1ZTtcbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckRnRXhwYW5kZWRDaGFuZ2UnKSBleHBhbmRlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIHB1YmxpYyB0b2dnbGVFeHBhbmQoKSB7XG4gICAgaWYgKHRoaXMuZXhwYW5kLmV4cGFuZGFibGUpIHtcbiAgICAgIHRoaXMuZXhwYW5kQW5pbWF0aW9uLnVwZGF0ZVN0YXJ0SGVpZ2h0KCk7XG4gICAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWQ7XG4gICAgICB0aGlzLmV4cGFuZGVkQ2hhbmdlLmVtaXQodGhpcy5leHBhbmRlZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqKioqXG4gICAqIHByb3BlcnR5IGRnQ2VsbHNcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgUXVlcnkgTGlzdCBvZiB0aGUgQ2xyRGF0YWdyaWQgY2VsbHMgaW4gdGhpcyByb3cuXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkcmVuKENsckRhdGFncmlkQ2VsbCkgZGdDZWxsczogUXVlcnlMaXN0PENsckRhdGFncmlkQ2VsbD47XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuZGdDZWxscy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmRnQ2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsYWJsZUNlbGxzLmluc2VydChjZWxsLl92aWV3KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5kaXNwbGF5TW9kZS52aWV3LnN1YnNjcmliZSh2aWV3Q2hhbmdlID0+IHtcbiAgICAgICAgLy8gTGlzdGVuIGZvciB2aWV3IGNoYW5nZXMgYW5kIG1vdmUgY2VsbHMgYXJvdW5kIGRlcGVuZGluZyBvbiB0aGUgY3VycmVudCBkaXNwbGF5VHlwZVxuICAgICAgICAvLyByZW1vdmUgY2VsbCB2aWV3cyBmcm9tIGRpc3BsYXkgdmlld1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fc2Nyb2xsYWJsZUNlbGxzLmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMuX3Njcm9sbGFibGVDZWxscy5kZXRhY2goKTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZW1vdmUgY2VsbCB2aWV3cyBmcm9tIGNhbGN1bGF0ZWQgdmlld1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fY2FsY3VsYXRlZENlbGxzLmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZWRDZWxscy5kZXRhY2goKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmlld0NoYW5nZSA9PT0gRGF0YWdyaWREaXNwbGF5TW9kZS5DQUxDVUxBVEUpIHtcbiAgICAgICAgICB0aGlzLmRpc3BsYXlDZWxscyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZGdDZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRlZENlbGxzLmluc2VydChjZWxsLl92aWV3KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRpc3BsYXlDZWxscyA9IHRydWU7XG4gICAgICAgICAgdGhpcy5kZ0NlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxhYmxlQ2VsbHMuaW5zZXJ0KGNlbGwuX3ZpZXcpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIHRoaXMuZXhwYW5kLmFuaW1hdGUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5leHBhbmRBbmltYXRpb25UcmlnZ2VyID0gIXRoaXMuZXhwYW5kQW5pbWF0aW9uVHJpZ2dlcjtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3ViOiBTdWJzY3JpcHRpb24pID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIHB1YmxpYyBkaXNwbGF5Q2VsbHMgPSBmYWxzZTtcblxuICBAVmlld0NoaWxkKCdzdGlja3lDZWxscycsIHsgc3RhdGljOiBmYWxzZSwgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBfc3RpY2t5Q2VsbHM6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ3Njcm9sbGFibGVDZWxscycsIHsgc3RhdGljOiBmYWxzZSwgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBfc2Nyb2xsYWJsZUNlbGxzOiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdjYWxjdWxhdGVkQ2VsbHMnLCB7IHN0YXRpYzogZmFsc2UsIHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgX2NhbGN1bGF0ZWRDZWxsczogVmlld0NvbnRhaW5lclJlZjtcblxuICBwcml2YXRlIHdyYXBwZWRJbmplY3RvcjogSW5qZWN0b3I7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy53cmFwcGVkSW5qZWN0b3IgPSBuZXcgSG9zdFdyYXBwZXIoV3JhcHBlZFJvdywgdGhpcy52Y3IpO1xuICB9XG5cbiAgcHVibGljIGdldCBfdmlldygpIHtcbiAgICByZXR1cm4gdGhpcy53cmFwcGVkSW5qZWN0b3IuZ2V0KFdyYXBwZWRSb3csIHRoaXMudmNyKS5yb3dWaWV3O1xuICB9XG59XG4iXX0=