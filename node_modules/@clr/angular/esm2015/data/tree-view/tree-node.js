/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, Inject, Injector, Input, Optional, Output, SkipSelf, } from '@angular/core';
import { filter } from 'rxjs/operators';
import { IfExpandService } from '../../utils/conditional/if-expanded.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { UNIQUE_ID, UNIQUE_ID_PROVIDER } from '../../utils/id-generator/id-generator.service';
import { LoadingListener } from '../../utils/loading/loading-listener';
import { DeclarativeTreeNodeModel } from './models/declarative-tree-node.model';
import { ClrSelectedState } from './models/selected-state.enum';
import { TREE_FEATURES_PROVIDER, TreeFeaturesService } from './tree-features.service';
let ClrTreeNode = class ClrTreeNode {
    constructor(nodeId, parent, featuresService, expandService, commonStrings, injector) {
        this.nodeId = nodeId;
        this.featuresService = featuresService;
        this.expandService = expandService;
        this.commonStrings = commonStrings;
        this.STATES = ClrSelectedState;
        this.skipEmitChange = false;
        this.selectedChange = new EventEmitter(false);
        this.expandedChange = new EventEmitter();
        this.subscriptions = [];
        if (this.featuresService.recursion) {
            // I'm completely stuck, we have to hack into private properties until either
            // https://github.com/angular/angular/issues/14935 or https://github.com/angular/angular/issues/15998
            // are fixed
            this._model = injector.view.context.clrModel;
        }
        else {
            // Force cast for now, not sure how to tie the correct type here to featuresService.recursion
            this._model = new DeclarativeTreeNodeModel(parent ? parent._model : null);
        }
    }
    isExpandable() {
        if (typeof this.expandable !== 'undefined') {
            return this.expandable;
        }
        return !!this.expandService.expandable || (this._model.children && this._model.children.length > 0);
    }
    get selected() {
        return this._model.selected.value;
    }
    set selected(value) {
        this.featuresService.selectable = true;
        // Gracefully handle falsy states like null or undefined because it's just easier than answering questions.
        // This shouldn't happen with strict typing on the app's side, but it's not up to us.
        if (value === null || typeof value === 'undefined') {
            value = ClrSelectedState.UNSELECTED;
        }
        // We match booleans to the corresponding ClrSelectedState
        if (typeof value === 'boolean') {
            value = value ? ClrSelectedState.SELECTED : ClrSelectedState.UNSELECTED;
        }
        // We propagate only if the tree is in smart mode, and skip emitting the output when we set the input
        // See https://github.com/vmware/clarity/issues/3073
        this.skipEmitChange = true;
        this._model.setSelected(value, this.featuresService.eager, this.featuresService.eager);
        this.skipEmitChange = false;
    }
    get treeNodeRole() {
        return this._model.parent ? 'treeitem' : 'tree';
    }
    get rootAriaMultiSelectable() {
        if (this._model.parent || !this.featuresService.selectable) {
            return null;
        }
        else {
            return true;
        }
    }
    get ariaSelected() {
        return this.featuresService.selectable ? this._model.selected.value === ClrSelectedState.SELECTED : null;
    }
    // I'm caving on this, for tree nodes I think we can tolerate having a two-way binding on the component
    // rather than enforce the clrIfExpanded structural directive for dynamic cases. Mostly because for the smart
    // case, you can't use a structural directive, it would need to go on an ng-container.
    get expanded() {
        return this.expandService.expanded;
    }
    set expanded(value) {
        this.expandService.expanded = value;
    }
    ngOnInit() {
        this.subscriptions.push(this._model.selected.pipe(filter(() => !this.skipEmitChange)).subscribe(value => this.selectedChange.emit(value)));
        this.subscriptions.push(this.expandService.expandChange.subscribe(value => this.expandedChange.emit(value)));
    }
    ngOnDestroy() {
        this._model.destroy();
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
};
tslib_1.__decorate([
    Input('clrSelected'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], ClrTreeNode.prototype, "selected", null);
tslib_1.__decorate([
    Output('clrSelectedChange'),
    tslib_1.__metadata("design:type", Object)
], ClrTreeNode.prototype, "selectedChange", void 0);
tslib_1.__decorate([
    HostBinding('attr.role'),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [])
], ClrTreeNode.prototype, "treeNodeRole", null);
tslib_1.__decorate([
    HostBinding('attr.aria-multiselectable'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [])
], ClrTreeNode.prototype, "rootAriaMultiSelectable", null);
tslib_1.__decorate([
    HostBinding('attr.aria-selected'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [])
], ClrTreeNode.prototype, "ariaSelected", null);
tslib_1.__decorate([
    Input('clrExpandable'),
    tslib_1.__metadata("design:type", Boolean)
], ClrTreeNode.prototype, "expandable", void 0);
tslib_1.__decorate([
    Input('clrExpanded'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrTreeNode.prototype, "expanded", null);
tslib_1.__decorate([
    Output('clrExpandedChange'),
    tslib_1.__metadata("design:type", Object)
], ClrTreeNode.prototype, "expandedChange", void 0);
ClrTreeNode = tslib_1.__decorate([
    Component({
        selector: 'clr-tree-node',
        template: "<!--\n  ~ Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div class=\"clr-tree-node-content-container\">\n  <button\n    *ngIf=\"isExpandable() && !_model.loading && !expandService.loading\"\n    type=\"button\"\n    class=\"clr-treenode-caret\"\n    (click)=\"expandService.toggle()\"\n    [attr.aria-expanded]=\"expandService.expanded\">\n    <clr-icon\n      class=\"clr-treenode-caret-icon\"\n      shape=\"caret\"\n      [attr.dir]=\"expandService.expanded ? 'down' : 'right'\"\n      [attr.title]=\"expandService.expanded ? commonStrings.keys.collapse : commonStrings.keys.expand\"></clr-icon>\n  </button>\n  <div class=\"clr-treenode-spinner-container\" *ngIf=\"expandService.loading || _model.loading\">\n        <span class=\"clr-treenode-spinner spinner\"></span>\n  </div>\n  <div class=\"clr-checkbox-wrapper clr-treenode-checkbox\" *ngIf=\"featuresService.selectable\">\n    <input type=\"checkbox\" id=\"{{nodeId}}-check\" class=\"clr-checkbox\" [attr.aria-labelledby]=\"nodeId\"\n           [checked]=\"_model.selected.value === STATES.SELECTED\"\n           [indeterminate]=\"_model.selected.value === STATES.INDETERMINATE\"\n           (change)=\"_model.toggleSelection(featuresService.eager)\">\n    <label for=\"{{nodeId}}-check\" class=\"clr-control-label\"></label>\n  </div>\n  <div class=\"clr-treenode-content\" [id]=\"nodeId\">\n    <ng-content></ng-content>\n  </div>\n</div>\n<div class=\"clr-treenode-children\"\n     [@childNodesState]=\"expandService.expanded ? 'expanded' : 'collapsed'\"\n     [attr.role]=\"isExpandable() ? 'group' : null\">\n  <ng-content select=\"clr-tree-node\"></ng-content>\n  <ng-content select=\"[clrIfExpanded]\"></ng-content>\n  <clr-recursive-children [parent]=\"_model\"></clr-recursive-children>\n</div>\n",
        providers: [
            UNIQUE_ID_PROVIDER,
            TREE_FEATURES_PROVIDER,
            IfExpandService,
            { provide: LoadingListener, useExisting: IfExpandService },
        ],
        animations: [
            trigger('childNodesState', [
                state('expanded', style({ height: '*', 'overflow-y': 'hidden' })),
                state('collapsed', style({ height: 0, 'overflow-y': 'hidden' })),
                transition('expanded <=> collapsed', animate('0.2s ease-in-out')),
            ]),
        ],
        host: { '[class.clr-tree-node]': 'true' }
    }),
    tslib_1.__param(0, Inject(UNIQUE_ID)),
    tslib_1.__param(1, Optional()),
    tslib_1.__param(1, SkipSelf()),
    tslib_1.__metadata("design:paramtypes", [String, ClrTreeNode,
        TreeFeaturesService,
        IfExpandService,
        ClrCommonStringsService,
        Injector])
], ClrTreeNode);
export { ClrTreeNode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS90cmVlLXZpZXcvdHJlZS1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixXQUFXLEVBQ1gsTUFBTSxFQUNOLFFBQVEsRUFDUixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDOUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRWhFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBb0J0RixJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBSXRCLFlBQzRCLE1BQWMsRUFHeEMsTUFBc0IsRUFDZixlQUF1QyxFQUN2QyxhQUE4QixFQUM5QixhQUFzQyxFQUM3QyxRQUFrQjtRQVBRLFdBQU0sR0FBTixNQUFNLENBQVE7UUFJakMsb0JBQWUsR0FBZixlQUFlLENBQXdCO1FBQ3ZDLGtCQUFh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cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEluamVjdCxcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgU2tpcFNlbGYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IElmRXhwYW5kU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLWV4cGFuZGVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLnNlcnZpY2UnO1xuaW1wb3J0IHsgVU5JUVVFX0lELCBVTklRVUVfSURfUFJPVklERVIgfSBmcm9tICcuLi8uLi91dGlscy9pZC1nZW5lcmF0b3IvaWQtZ2VuZXJhdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9hZGluZ0xpc3RlbmVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9hZGluZy9sb2FkaW5nLWxpc3RlbmVyJztcbmltcG9ydCB7IERlY2xhcmF0aXZlVHJlZU5vZGVNb2RlbCB9IGZyb20gJy4vbW9kZWxzL2RlY2xhcmF0aXZlLXRyZWUtbm9kZS5tb2RlbCc7XG5pbXBvcnQgeyBDbHJTZWxlY3RlZFN0YXRlIH0gZnJvbSAnLi9tb2RlbHMvc2VsZWN0ZWQtc3RhdGUuZW51bSc7XG5pbXBvcnQgeyBUcmVlTm9kZU1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcbmltcG9ydCB7IFRSRUVfRkVBVFVSRVNfUFJPVklERVIsIFRyZWVGZWF0dXJlc1NlcnZpY2UgfSBmcm9tICcuL3RyZWUtZmVhdHVyZXMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci10cmVlLW5vZGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vdHJlZS1ub2RlLmh0bWwnLFxuICBwcm92aWRlcnM6IFtcbiAgICBVTklRVUVfSURfUFJPVklERVIsXG4gICAgVFJFRV9GRUFUVVJFU19QUk9WSURFUixcbiAgICBJZkV4cGFuZFNlcnZpY2UsXG4gICAgeyBwcm92aWRlOiBMb2FkaW5nTGlzdGVuZXIsIHVzZUV4aXN0aW5nOiBJZkV4cGFuZFNlcnZpY2UgfSxcbiAgXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2NoaWxkTm9kZXNTdGF0ZScsIFtcbiAgICAgIHN0YXRlKCdleHBhbmRlZCcsIHN0eWxlKHsgaGVpZ2h0OiAnKicsICdvdmVyZmxvdy15JzogJ2hpZGRlbicgfSkpLFxuICAgICAgc3RhdGUoJ2NvbGxhcHNlZCcsIHN0eWxlKHsgaGVpZ2h0OiAwLCAnb3ZlcmZsb3cteSc6ICdoaWRkZW4nIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJ2V4cGFuZGVkIDw9PiBjb2xsYXBzZWQnLCBhbmltYXRlKCcwLjJzIGVhc2UtaW4tb3V0JykpLFxuICAgIF0pLFxuICBdLFxuICBob3N0OiB7ICdbY2xhc3MuY2xyLXRyZWUtbm9kZV0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyVHJlZU5vZGU8VD4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIFNUQVRFUyA9IENsclNlbGVjdGVkU3RhdGU7XG4gIHByaXZhdGUgc2tpcEVtaXRDaGFuZ2UgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFVOSVFVRV9JRCkgcHVibGljIG5vZGVJZDogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQFNraXBTZWxmKClcbiAgICBwYXJlbnQ6IENsclRyZWVOb2RlPFQ+LFxuICAgIHB1YmxpYyBmZWF0dXJlc1NlcnZpY2U6IFRyZWVGZWF0dXJlc1NlcnZpY2U8VD4sXG4gICAgcHVibGljIGV4cGFuZFNlcnZpY2U6IElmRXhwYW5kU2VydmljZSxcbiAgICBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UsXG4gICAgaW5qZWN0b3I6IEluamVjdG9yXG4gICkge1xuICAgIGlmICh0aGlzLmZlYXR1cmVzU2VydmljZS5yZWN1cnNpb24pIHtcbiAgICAgIC8vIEknbSBjb21wbGV0ZWx5IHN0dWNrLCB3ZSBoYXZlIHRvIGhhY2sgaW50byBwcml2YXRlIHByb3BlcnRpZXMgdW50aWwgZWl0aGVyXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xNDkzNSBvciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xNTk5OFxuICAgICAgLy8gYXJlIGZpeGVkXG4gICAgICB0aGlzLl9tb2RlbCA9ICg8YW55PmluamVjdG9yKS52aWV3LmNvbnRleHQuY2xyTW9kZWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEZvcmNlIGNhc3QgZm9yIG5vdywgbm90IHN1cmUgaG93IHRvIHRpZSB0aGUgY29ycmVjdCB0eXBlIGhlcmUgdG8gZmVhdHVyZXNTZXJ2aWNlLnJlY3Vyc2lvblxuICAgICAgdGhpcy5fbW9kZWwgPSBuZXcgRGVjbGFyYXRpdmVUcmVlTm9kZU1vZGVsKHBhcmVudCA/IDxEZWNsYXJhdGl2ZVRyZWVOb2RlTW9kZWw8VD4+cGFyZW50Ll9tb2RlbCA6IG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIF9tb2RlbDogVHJlZU5vZGVNb2RlbDxUPjtcblxuICBpc0V4cGFuZGFibGUoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmV4cGFuZGFibGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5leHBhbmRhYmxlO1xuICAgIH1cbiAgICByZXR1cm4gISF0aGlzLmV4cGFuZFNlcnZpY2UuZXhwYW5kYWJsZSB8fCAodGhpcy5fbW9kZWwuY2hpbGRyZW4gJiYgdGhpcy5fbW9kZWwuY2hpbGRyZW4ubGVuZ3RoID4gMCk7XG4gIH1cblxuICBASW5wdXQoJ2NsclNlbGVjdGVkJylcbiAgZ2V0IHNlbGVjdGVkKCk6IENsclNlbGVjdGVkU3RhdGUgfCBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuc2VsZWN0ZWQudmFsdWU7XG4gIH1cbiAgc2V0IHNlbGVjdGVkKHZhbHVlOiBDbHJTZWxlY3RlZFN0YXRlIHwgYm9vbGVhbikge1xuICAgIHRoaXMuZmVhdHVyZXNTZXJ2aWNlLnNlbGVjdGFibGUgPSB0cnVlO1xuICAgIC8vIEdyYWNlZnVsbHkgaGFuZGxlIGZhbHN5IHN0YXRlcyBsaWtlIG51bGwgb3IgdW5kZWZpbmVkIGJlY2F1c2UgaXQncyBqdXN0IGVhc2llciB0aGFuIGFuc3dlcmluZyBxdWVzdGlvbnMuXG4gICAgLy8gVGhpcyBzaG91bGRuJ3QgaGFwcGVuIHdpdGggc3RyaWN0IHR5cGluZyBvbiB0aGUgYXBwJ3Mgc2lkZSwgYnV0IGl0J3Mgbm90IHVwIHRvIHVzLlxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YWx1ZSA9IENsclNlbGVjdGVkU3RhdGUuVU5TRUxFQ1RFRDtcbiAgICB9XG4gICAgLy8gV2UgbWF0Y2ggYm9vbGVhbnMgdG8gdGhlIGNvcnJlc3BvbmRpbmcgQ2xyU2VsZWN0ZWRTdGF0ZVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgdmFsdWUgPSB2YWx1ZSA/IENsclNlbGVjdGVkU3RhdGUuU0VMRUNURUQgOiBDbHJTZWxlY3RlZFN0YXRlLlVOU0VMRUNURUQ7XG4gICAgfVxuICAgIC8vIFdlIHByb3BhZ2F0ZSBvbmx5IGlmIHRoZSB0cmVlIGlzIGluIHNtYXJ0IG1vZGUsIGFuZCBza2lwIGVtaXR0aW5nIHRoZSBvdXRwdXQgd2hlbiB3ZSBzZXQgdGhlIGlucHV0XG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS92bXdhcmUvY2xhcml0eS9pc3N1ZXMvMzA3M1xuICAgIHRoaXMuc2tpcEVtaXRDaGFuZ2UgPSB0cnVlO1xuICAgIHRoaXMuX21vZGVsLnNldFNlbGVjdGVkKHZhbHVlLCB0aGlzLmZlYXR1cmVzU2VydmljZS5lYWdlciwgdGhpcy5mZWF0dXJlc1NlcnZpY2UuZWFnZXIpO1xuICAgIHRoaXMuc2tpcEVtaXRDaGFuZ2UgPSBmYWxzZTtcbiAgfVxuXG4gIEBPdXRwdXQoJ2NsclNlbGVjdGVkQ2hhbmdlJykgc2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENsclNlbGVjdGVkU3RhdGU+KGZhbHNlKTtcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXG4gIGdldCB0cmVlTm9kZVJvbGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwucGFyZW50ID8gJ3RyZWVpdGVtJyA6ICd0cmVlJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLW11bHRpc2VsZWN0YWJsZScpXG4gIGdldCByb290QXJpYU11bHRpU2VsZWN0YWJsZSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5fbW9kZWwucGFyZW50IHx8ICF0aGlzLmZlYXR1cmVzU2VydmljZS5zZWxlY3RhYmxlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtc2VsZWN0ZWQnKVxuICBnZXQgYXJpYVNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmZlYXR1cmVzU2VydmljZS5zZWxlY3RhYmxlID8gdGhpcy5fbW9kZWwuc2VsZWN0ZWQudmFsdWUgPT09IENsclNlbGVjdGVkU3RhdGUuU0VMRUNURUQgOiBudWxsO1xuICB9XG5cbiAgLy8gQWxsb3dzIHRoZSBjb25zdW1lciB0byBvdmVycmlkZSBvdXIgbG9naWMgZGVjaWRpbmcgaWYgYSBub2RlIGlzIGV4cGFuZGFibGUuXG4gIC8vIFVzZWZ1bCBmb3IgcmVjdXJzaXZlIHRyZWVzIHRoYXQgZG9uJ3Qgd2FudCB0byBwcmUtbG9hZCBvbmUgbGV2ZWwgYWhlYWQganVzdCB0byBrbm93IHdoaWNoIG5vZGVzIGFyZSBleHBhbmRhYmxlLlxuICBASW5wdXQoJ2NsckV4cGFuZGFibGUnKSBleHBhbmRhYmxlOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gIC8vIEknbSBjYXZpbmcgb24gdGhpcywgZm9yIHRyZWUgbm9kZXMgSSB0aGluayB3ZSBjYW4gdG9sZXJhdGUgaGF2aW5nIGEgdHdvLXdheSBiaW5kaW5nIG9uIHRoZSBjb21wb25lbnRcbiAgLy8gcmF0aGVyIHRoYW4gZW5mb3JjZSB0aGUgY2xySWZFeHBhbmRlZCBzdHJ1Y3R1cmFsIGRpcmVjdGl2ZSBmb3IgZHluYW1pYyBjYXNlcy4gTW9zdGx5IGJlY2F1c2UgZm9yIHRoZSBzbWFydFxuICAvLyBjYXNlLCB5b3UgY2FuJ3QgdXNlIGEgc3RydWN0dXJhbCBkaXJlY3RpdmUsIGl0IHdvdWxkIG5lZWQgdG8gZ28gb24gYW4gbmctY29udGFpbmVyLlxuICBASW5wdXQoJ2NsckV4cGFuZGVkJylcbiAgZ2V0IGV4cGFuZGVkKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGFuZFNlcnZpY2UuZXhwYW5kZWQ7XG4gIH1cbiAgc2V0IGV4cGFuZGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5leHBhbmRTZXJ2aWNlLmV4cGFuZGVkID0gdmFsdWU7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJFeHBhbmRlZENoYW5nZScpIGV4cGFuZGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuX21vZGVsLnNlbGVjdGVkLnBpcGUoZmlsdGVyKCgpID0+ICF0aGlzLnNraXBFbWl0Q2hhbmdlKSkuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh2YWx1ZSkpXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLmV4cGFuZFNlcnZpY2UuZXhwYW5kQ2hhbmdlLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLmV4cGFuZGVkQ2hhbmdlLmVtaXQodmFsdWUpKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9tb2RlbC5kZXN0cm95KCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19