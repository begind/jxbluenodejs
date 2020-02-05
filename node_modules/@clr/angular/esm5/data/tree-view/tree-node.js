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
var ClrTreeNode = /** @class */ (function () {
    function ClrTreeNode(nodeId, parent, featuresService, expandService, commonStrings, injector) {
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
    ClrTreeNode.prototype.isExpandable = function () {
        if (typeof this.expandable !== 'undefined') {
            return this.expandable;
        }
        return !!this.expandService.expandable || (this._model.children && this._model.children.length > 0);
    };
    Object.defineProperty(ClrTreeNode.prototype, "selected", {
        get: function () {
            return this._model.selected.value;
        },
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "treeNodeRole", {
        get: function () {
            return this._model.parent ? 'treeitem' : 'tree';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "rootAriaMultiSelectable", {
        get: function () {
            if (this._model.parent || !this.featuresService.selectable) {
                return null;
            }
            else {
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "ariaSelected", {
        get: function () {
            return this.featuresService.selectable ? this._model.selected.value === ClrSelectedState.SELECTED : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "expanded", {
        // I'm caving on this, for tree nodes I think we can tolerate having a two-way binding on the component
        // rather than enforce the clrIfExpanded structural directive for dynamic cases. Mostly because for the smart
        // case, you can't use a structural directive, it would need to go on an ng-container.
        get: function () {
            return this.expandService.expanded;
        },
        set: function (value) {
            this.expandService.expanded = value;
        },
        enumerable: true,
        configurable: true
    });
    ClrTreeNode.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this._model.selected.pipe(filter(function () { return !_this.skipEmitChange; })).subscribe(function (value) { return _this.selectedChange.emit(value); }));
        this.subscriptions.push(this.expandService.expandChange.subscribe(function (value) { return _this.expandedChange.emit(value); }));
    };
    ClrTreeNode.prototype.ngOnDestroy = function () {
        this._model.destroy();
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
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
    return ClrTreeNode;
}());
export { ClrTreeNode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS90cmVlLXZpZXcvdHJlZS1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixXQUFXLEVBQ1gsTUFBTSxFQUNOLFFBQVEsRUFDUixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDOUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRWhFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBb0J0RjtJQUlFLHFCQUM0QixNQUFjLEVBR3hDLE1BQXNCLEVBQ2YsZUFBdUMsRUFDdkMsYUFBOEIsRUFDOUIsYUFBc0MsRUFDN0MsUUFBa0I7UUFQUSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBSWpDLG9CQUFlLEdBQWYsZUFBZSxDQUF3QjtRQUN2QyxrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFDOUIsa0JB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bUJBQW1CO1lBQ3JCLGVBQWU7WUFDZix1QkFBdUI7WUFDbkMsUUFBUTtPQVpULFdBQVcsQ0EyR3ZCO0lBQUQsa0JBQUM7Q0FBQSxBQTNHRCxJQTJHQztTQTNHWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5qZWN0LFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBTa2lwU2VsZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgSWZFeHBhbmRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtZXhwYW5kZWQuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZSc7XG5pbXBvcnQgeyBVTklRVUVfSUQsIFVOSVFVRV9JRF9QUk9WSURFUiB9IGZyb20gJy4uLy4uL3V0aWxzL2lkLWdlbmVyYXRvci9pZC1nZW5lcmF0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBMb2FkaW5nTGlzdGVuZXIgfSBmcm9tICcuLi8uLi91dGlscy9sb2FkaW5nL2xvYWRpbmctbGlzdGVuZXInO1xuaW1wb3J0IHsgRGVjbGFyYXRpdmVUcmVlTm9kZU1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvZGVjbGFyYXRpdmUtdHJlZS1ub2RlLm1vZGVsJztcbmltcG9ydCB7IENsclNlbGVjdGVkU3RhdGUgfSBmcm9tICcuL21vZGVscy9zZWxlY3RlZC1zdGF0ZS5lbnVtJztcbmltcG9ydCB7IFRyZWVOb2RlTW9kZWwgfSBmcm9tICcuL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xuaW1wb3J0IHsgVFJFRV9GRUFUVVJFU19QUk9WSURFUiwgVHJlZUZlYXR1cmVzU2VydmljZSB9IGZyb20gJy4vdHJlZS1mZWF0dXJlcy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXRyZWUtbm9kZScsXG4gIHRlbXBsYXRlVXJsOiAnLi90cmVlLW5vZGUuaHRtbCcsXG4gIHByb3ZpZGVyczogW1xuICAgIFVOSVFVRV9JRF9QUk9WSURFUixcbiAgICBUUkVFX0ZFQVRVUkVTX1BST1ZJREVSLFxuICAgIElmRXhwYW5kU2VydmljZSxcbiAgICB7IHByb3ZpZGU6IExvYWRpbmdMaXN0ZW5lciwgdXNlRXhpc3Rpbmc6IElmRXhwYW5kU2VydmljZSB9LFxuICBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignY2hpbGROb2Rlc1N0YXRlJywgW1xuICAgICAgc3RhdGUoJ2V4cGFuZGVkJywgc3R5bGUoeyBoZWlnaHQ6ICcqJywgJ292ZXJmbG93LXknOiAnaGlkZGVuJyB9KSksXG4gICAgICBzdGF0ZSgnY29sbGFwc2VkJywgc3R5bGUoeyBoZWlnaHQ6IDAsICdvdmVyZmxvdy15JzogJ2hpZGRlbicgfSkpLFxuICAgICAgdHJhbnNpdGlvbignZXhwYW5kZWQgPD0+IGNvbGxhcHNlZCcsIGFuaW1hdGUoJzAuMnMgZWFzZS1pbi1vdXQnKSksXG4gICAgXSksXG4gIF0sXG4gIGhvc3Q6IHsgJ1tjbGFzcy5jbHItdHJlZS1ub2RlXSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJUcmVlTm9kZTxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgU1RBVEVTID0gQ2xyU2VsZWN0ZWRTdGF0ZTtcbiAgcHJpdmF0ZSBza2lwRW1pdENoYW5nZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoVU5JUVVFX0lEKSBwdWJsaWMgbm9kZUlkOiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKClcbiAgICBAU2tpcFNlbGYoKVxuICAgIHBhcmVudDogQ2xyVHJlZU5vZGU8VD4sXG4gICAgcHVibGljIGZlYXR1cmVzU2VydmljZTogVHJlZUZlYXR1cmVzU2VydmljZTxUPixcbiAgICBwdWJsaWMgZXhwYW5kU2VydmljZTogSWZFeHBhbmRTZXJ2aWNlLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzU2VydmljZSxcbiAgICBpbmplY3RvcjogSW5qZWN0b3JcbiAgKSB7XG4gICAgaWYgKHRoaXMuZmVhdHVyZXNTZXJ2aWNlLnJlY3Vyc2lvbikge1xuICAgICAgLy8gSSdtIGNvbXBsZXRlbHkgc3R1Y2ssIHdlIGhhdmUgdG8gaGFjayBpbnRvIHByaXZhdGUgcHJvcGVydGllcyB1bnRpbCBlaXRoZXJcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE0OTM1IG9yIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE1OTk4XG4gICAgICAvLyBhcmUgZml4ZWRcbiAgICAgIHRoaXMuX21vZGVsID0gKDxhbnk+aW5qZWN0b3IpLnZpZXcuY29udGV4dC5jbHJNb2RlbDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRm9yY2UgY2FzdCBmb3Igbm93LCBub3Qgc3VyZSBob3cgdG8gdGllIHRoZSBjb3JyZWN0IHR5cGUgaGVyZSB0byBmZWF0dXJlc1NlcnZpY2UucmVjdXJzaW9uXG4gICAgICB0aGlzLl9tb2RlbCA9IG5ldyBEZWNsYXJhdGl2ZVRyZWVOb2RlTW9kZWwocGFyZW50ID8gPERlY2xhcmF0aXZlVHJlZU5vZGVNb2RlbDxUPj5wYXJlbnQuX21vZGVsIDogbnVsbCk7XG4gICAgfVxuICB9XG5cbiAgX21vZGVsOiBUcmVlTm9kZU1vZGVsPFQ+O1xuXG4gIGlzRXhwYW5kYWJsZSgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuZXhwYW5kYWJsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0aGlzLmV4cGFuZGFibGU7XG4gICAgfVxuICAgIHJldHVybiAhIXRoaXMuZXhwYW5kU2VydmljZS5leHBhbmRhYmxlIHx8ICh0aGlzLl9tb2RlbC5jaGlsZHJlbiAmJiB0aGlzLl9tb2RlbC5jaGlsZHJlbi5sZW5ndGggPiAwKTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyU2VsZWN0ZWQnKVxuICBnZXQgc2VsZWN0ZWQoKTogQ2xyU2VsZWN0ZWRTdGF0ZSB8IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5zZWxlY3RlZC52YWx1ZTtcbiAgfVxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IENsclNlbGVjdGVkU3RhdGUgfCBib29sZWFuKSB7XG4gICAgdGhpcy5mZWF0dXJlc1NlcnZpY2Uuc2VsZWN0YWJsZSA9IHRydWU7XG4gICAgLy8gR3JhY2VmdWxseSBoYW5kbGUgZmFsc3kgc3RhdGVzIGxpa2UgbnVsbCBvciB1bmRlZmluZWQgYmVjYXVzZSBpdCdzIGp1c3QgZWFzaWVyIHRoYW4gYW5zd2VyaW5nIHF1ZXN0aW9ucy5cbiAgICAvLyBUaGlzIHNob3VsZG4ndCBoYXBwZW4gd2l0aCBzdHJpY3QgdHlwaW5nIG9uIHRoZSBhcHAncyBzaWRlLCBidXQgaXQncyBub3QgdXAgdG8gdXMuXG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhbHVlID0gQ2xyU2VsZWN0ZWRTdGF0ZS5VTlNFTEVDVEVEO1xuICAgIH1cbiAgICAvLyBXZSBtYXRjaCBib29sZWFucyB0byB0aGUgY29ycmVzcG9uZGluZyBDbHJTZWxlY3RlZFN0YXRlXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlID8gQ2xyU2VsZWN0ZWRTdGF0ZS5TRUxFQ1RFRCA6IENsclNlbGVjdGVkU3RhdGUuVU5TRUxFQ1RFRDtcbiAgICB9XG4gICAgLy8gV2UgcHJvcGFnYXRlIG9ubHkgaWYgdGhlIHRyZWUgaXMgaW4gc21hcnQgbW9kZSwgYW5kIHNraXAgZW1pdHRpbmcgdGhlIG91dHB1dCB3aGVuIHdlIHNldCB0aGUgaW5wdXRcbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3Ztd2FyZS9jbGFyaXR5L2lzc3Vlcy8zMDczXG4gICAgdGhpcy5za2lwRW1pdENoYW5nZSA9IHRydWU7XG4gICAgdGhpcy5fbW9kZWwuc2V0U2VsZWN0ZWQodmFsdWUsIHRoaXMuZmVhdHVyZXNTZXJ2aWNlLmVhZ2VyLCB0aGlzLmZlYXR1cmVzU2VydmljZS5lYWdlcik7XG4gICAgdGhpcy5za2lwRW1pdENoYW5nZSA9IGZhbHNlO1xuICB9XG5cbiAgQE91dHB1dCgnY2xyU2VsZWN0ZWRDaGFuZ2UnKSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xyU2VsZWN0ZWRTdGF0ZT4oZmFsc2UpO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgZ2V0IHRyZWVOb2RlUm9sZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5wYXJlbnQgPyAndHJlZWl0ZW0nIDogJ3RyZWUnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbXVsdGlzZWxlY3RhYmxlJylcbiAgZ2V0IHJvb3RBcmlhTXVsdGlTZWxlY3RhYmxlKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9tb2RlbC5wYXJlbnQgfHwgIXRoaXMuZmVhdHVyZXNTZXJ2aWNlLnNlbGVjdGFibGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1zZWxlY3RlZCcpXG4gIGdldCBhcmlhU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZmVhdHVyZXNTZXJ2aWNlLnNlbGVjdGFibGUgPyB0aGlzLl9tb2RlbC5zZWxlY3RlZC52YWx1ZSA9PT0gQ2xyU2VsZWN0ZWRTdGF0ZS5TRUxFQ1RFRCA6IG51bGw7XG4gIH1cblxuICAvLyBBbGxvd3MgdGhlIGNvbnN1bWVyIHRvIG92ZXJyaWRlIG91ciBsb2dpYyBkZWNpZGluZyBpZiBhIG5vZGUgaXMgZXhwYW5kYWJsZS5cbiAgLy8gVXNlZnVsIGZvciByZWN1cnNpdmUgdHJlZXMgdGhhdCBkb24ndCB3YW50IHRvIHByZS1sb2FkIG9uZSBsZXZlbCBhaGVhZCBqdXN0IHRvIGtub3cgd2hpY2ggbm9kZXMgYXJlIGV4cGFuZGFibGUuXG4gIEBJbnB1dCgnY2xyRXhwYW5kYWJsZScpIGV4cGFuZGFibGU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgLy8gSSdtIGNhdmluZyBvbiB0aGlzLCBmb3IgdHJlZSBub2RlcyBJIHRoaW5rIHdlIGNhbiB0b2xlcmF0ZSBoYXZpbmcgYSB0d28td2F5IGJpbmRpbmcgb24gdGhlIGNvbXBvbmVudFxuICAvLyByYXRoZXIgdGhhbiBlbmZvcmNlIHRoZSBjbHJJZkV4cGFuZGVkIHN0cnVjdHVyYWwgZGlyZWN0aXZlIGZvciBkeW5hbWljIGNhc2VzLiBNb3N0bHkgYmVjYXVzZSBmb3IgdGhlIHNtYXJ0XG4gIC8vIGNhc2UsIHlvdSBjYW4ndCB1c2UgYSBzdHJ1Y3R1cmFsIGRpcmVjdGl2ZSwgaXQgd291bGQgbmVlZCB0byBnbyBvbiBhbiBuZy1jb250YWluZXIuXG4gIEBJbnB1dCgnY2xyRXhwYW5kZWQnKVxuICBnZXQgZXhwYW5kZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwYW5kU2VydmljZS5leHBhbmRlZDtcbiAgfVxuICBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmV4cGFuZFNlcnZpY2UuZXhwYW5kZWQgPSB2YWx1ZTtcbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckV4cGFuZGVkQ2hhbmdlJykgZXhwYW5kZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5fbW9kZWwuc2VsZWN0ZWQucGlwZShmaWx0ZXIoKCkgPT4gIXRoaXMuc2tpcEVtaXRDaGFuZ2UpKS5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHZhbHVlKSlcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuZXhwYW5kU2VydmljZS5leHBhbmRDaGFuZ2Uuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMuZXhwYW5kZWRDaGFuZ2UuZW1pdCh2YWx1ZSkpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX21vZGVsLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=