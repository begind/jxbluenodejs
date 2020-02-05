/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, Input, Optional } from '@angular/core';
import { IfExpandService } from '../../utils/conditional/if-expanded.service';
import { TreeFeaturesService } from './tree-features.service';
import { TreeNodeModel } from './models/tree-node.model';
var RecursiveChildren = /** @class */ (function () {
    function RecursiveChildren(featuresService, expandService) {
        var _this = this;
        this.featuresService = featuresService;
        this.expandService = expandService;
        if (expandService) {
            this.subscription = this.expandService.expandChange.subscribe(function (value) {
                if (!value && _this.parent && !_this.featuresService.eager && _this.featuresService.recursion) {
                    // In the case of lazy-loading recursive trees, we clear the children on collapse.
                    // This is better in case they change between two user interaction, and that way
                    // the app itself can decide whether to cache them or not.
                    _this.parent.clearChildren();
                }
            });
        }
    }
    RecursiveChildren.prototype.shouldRender = function () {
        return (this.featuresService.recursion &&
            // In the smart case, we eagerly render all the recursive children
            // to make sure two-way bindings for selection are available.
            // They will be hidden with CSS by the parent.
            (this.featuresService.eager || !this.expandService || this.expandService.expanded));
    };
    RecursiveChildren.prototype.getContext = function (node) {
        return {
            $implicit: node.model,
            clrModel: node,
        };
    };
    RecursiveChildren.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    tslib_1.__decorate([
        Input('parent'),
        tslib_1.__metadata("design:type", TreeNodeModel)
    ], RecursiveChildren.prototype, "parent", void 0);
    tslib_1.__decorate([
        Input('children'),
        tslib_1.__metadata("design:type", Array)
    ], RecursiveChildren.prototype, "children", void 0);
    RecursiveChildren = tslib_1.__decorate([
        Component({
            selector: 'clr-recursive-children',
            template: "\n    <ng-container *ngIf=\"shouldRender()\">\n      <ng-container *ngFor=\"let child of parent?.children || children\">\n        <ng-container *ngTemplateOutlet=\"featuresService.recursion.template; context: getContext(child)\"></ng-container>\n      </ng-container>\n    </ng-container>\n  "
        })
        /**
         * Internal component, do not export!
         * This is part of the hack to get around https://github.com/angular/angular/issues/15998
         */
        ,
        tslib_1.__param(1, Optional()),
        tslib_1.__metadata("design:paramtypes", [TreeFeaturesService, IfExpandService])
    ], RecursiveChildren);
    return RecursiveChildren;
}());
export { RecursiveChildren };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdXJzaXZlLWNoaWxkcmVuLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS90cmVlLXZpZXcvcmVjdXJzaXZlLWNoaWxkcmVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFrQnpEO0lBQ0UsMkJBQW1CLGVBQXVDLEVBQXNCLGFBQThCO1FBQTlHLGlCQVdDO1FBWGtCLG9CQUFlLEdBQWYsZUFBZSxDQUF3QjtRQUFzQixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFDNUcsSUFBSSxhQUFhLEVBQUU7WUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO2dCQUNqRSxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssSUFBSSxLQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRTtvQkFDMUYsa0ZBQWtGO29CQUNsRixnRkFBZ0Y7b0JBQ2hGLDBEQUEwRDtvQkFDOUIsS0FBSSxDQUFDLE1BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztpQkFDMUQ7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELHdDQUFZLEdBQVo7UUFDRSxPQUFPLENBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTO1lBQzlCLGtFQUFrRTtZQUNsRSw2REFBNkQ7WUFDN0QsOENBQThDO1lBQzlDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQ25GLENBQUM7SUFDSixDQUFDO0lBT0Qsc0NBQVUsR0FBVixVQUFXLElBQXNCO1FBQy9CLE9BQU87WUFDTCxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDckIsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDO0lBQ0osQ0FBQztJQUlELHVDQUFXLEdBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNqQztJQUNILENBQUM7SUFoQmdCO1FBQWhCLEtBQUssQ0FBQyxRQUFRLENBQUM7MENBQVMsYUFBYTtxREFBSTtJQUN2QjtRQUFsQixLQUFLLENBQUMsVUFBVSxDQUFDOzt1REFBOEI7SUEzQnJDLGlCQUFpQjtRQWQ3QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLFFBQVEsRUFBRSxzU0FNVDtTQUNGLENBQUM7UUFDRjs7O1dBR0c7O1FBRTRELG1CQUFBLFFBQVEsRUFBRSxDQUFBO2lEQUFuQyxtQkFBbUIsRUFBd0MsZUFBZTtPQURuRyxpQkFBaUIsQ0EyQzdCO0lBQUQsd0JBQUM7Q0FBQSxBQTNDRCxJQTJDQztTQTNDWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSWZFeHBhbmRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtZXhwYW5kZWQuc2VydmljZSc7XG5pbXBvcnQgeyBUcmVlRmVhdHVyZXNTZXJ2aWNlIH0gZnJvbSAnLi90cmVlLWZlYXR1cmVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgVHJlZU5vZGVNb2RlbCB9IGZyb20gJy4vbW9kZWxzL3RyZWUtbm9kZS5tb2RlbCc7XG5pbXBvcnQgeyBDbHJSZWN1cnNpdmVGb3JPZkNvbnRleHQgfSBmcm9tICcuL3JlY3Vyc2l2ZS1mb3Itb2YnO1xuaW1wb3J0IHsgUmVjdXJzaXZlVHJlZU5vZGVNb2RlbCB9IGZyb20gJy4vbW9kZWxzL3JlY3Vyc2l2ZS10cmVlLW5vZGUubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItcmVjdXJzaXZlLWNoaWxkcmVuJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2hvdWxkUmVuZGVyKClcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkIG9mIHBhcmVudD8uY2hpbGRyZW4gfHwgY2hpbGRyZW5cIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZlYXR1cmVzU2VydmljZS5yZWN1cnNpb24udGVtcGxhdGU7IGNvbnRleHQ6IGdldENvbnRleHQoY2hpbGQpXCI+PC9uZy1jb250YWluZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbn0pXG4vKipcbiAqIEludGVybmFsIGNvbXBvbmVudCwgZG8gbm90IGV4cG9ydCFcbiAqIFRoaXMgaXMgcGFydCBvZiB0aGUgaGFjayB0byBnZXQgYXJvdW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE1OTk4XG4gKi9cbmV4cG9ydCBjbGFzcyBSZWN1cnNpdmVDaGlsZHJlbjxUPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBmZWF0dXJlc1NlcnZpY2U6IFRyZWVGZWF0dXJlc1NlcnZpY2U8VD4sIEBPcHRpb25hbCgpIHByaXZhdGUgZXhwYW5kU2VydmljZTogSWZFeHBhbmRTZXJ2aWNlKSB7XG4gICAgaWYgKGV4cGFuZFNlcnZpY2UpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5leHBhbmRTZXJ2aWNlLmV4cGFuZENoYW5nZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICBpZiAoIXZhbHVlICYmIHRoaXMucGFyZW50ICYmICF0aGlzLmZlYXR1cmVzU2VydmljZS5lYWdlciAmJiB0aGlzLmZlYXR1cmVzU2VydmljZS5yZWN1cnNpb24pIHtcbiAgICAgICAgICAvLyBJbiB0aGUgY2FzZSBvZiBsYXp5LWxvYWRpbmcgcmVjdXJzaXZlIHRyZWVzLCB3ZSBjbGVhciB0aGUgY2hpbGRyZW4gb24gY29sbGFwc2UuXG4gICAgICAgICAgLy8gVGhpcyBpcyBiZXR0ZXIgaW4gY2FzZSB0aGV5IGNoYW5nZSBiZXR3ZWVuIHR3byB1c2VyIGludGVyYWN0aW9uLCBhbmQgdGhhdCB3YXlcbiAgICAgICAgICAvLyB0aGUgYXBwIGl0c2VsZiBjYW4gZGVjaWRlIHdoZXRoZXIgdG8gY2FjaGUgdGhlbSBvciBub3QuXG4gICAgICAgICAgKDxSZWN1cnNpdmVUcmVlTm9kZU1vZGVsPFQ+PnRoaXMucGFyZW50KS5jbGVhckNoaWxkcmVuKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNob3VsZFJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5mZWF0dXJlc1NlcnZpY2UucmVjdXJzaW9uICYmXG4gICAgICAvLyBJbiB0aGUgc21hcnQgY2FzZSwgd2UgZWFnZXJseSByZW5kZXIgYWxsIHRoZSByZWN1cnNpdmUgY2hpbGRyZW5cbiAgICAgIC8vIHRvIG1ha2Ugc3VyZSB0d28td2F5IGJpbmRpbmdzIGZvciBzZWxlY3Rpb24gYXJlIGF2YWlsYWJsZS5cbiAgICAgIC8vIFRoZXkgd2lsbCBiZSBoaWRkZW4gd2l0aCBDU1MgYnkgdGhlIHBhcmVudC5cbiAgICAgICh0aGlzLmZlYXR1cmVzU2VydmljZS5lYWdlciB8fCAhdGhpcy5leHBhbmRTZXJ2aWNlIHx8IHRoaXMuZXhwYW5kU2VydmljZS5leHBhbmRlZClcbiAgICApO1xuICB9XG5cbiAgLy8gT2ZmZXJpbmcgdGhlIG9wdGlvbiB0byBlaXRoZXIgZ2l2ZSB0aGUgcGFyZW50IG5vZGUgdG8gcmVjdXJzZSBwb3RlbnRpYWxseSBsYXppbHksXG4gIC8vIG9yIGRpcmVjdGx5IHRoZSBsaXN0IG9mIGNoaWxkcmVuIHRvIGRpc3BsYXkuXG4gIEBJbnB1dCgncGFyZW50JykgcGFyZW50OiBUcmVlTm9kZU1vZGVsPFQ+O1xuICBASW5wdXQoJ2NoaWxkcmVuJykgY2hpbGRyZW46IFRyZWVOb2RlTW9kZWw8VD5bXTtcblxuICBnZXRDb250ZXh0KG5vZGU6IFRyZWVOb2RlTW9kZWw8VD4pOiBDbHJSZWN1cnNpdmVGb3JPZkNvbnRleHQ8VD4ge1xuICAgIHJldHVybiB7XG4gICAgICAkaW1wbGljaXQ6IG5vZGUubW9kZWwsXG4gICAgICBjbHJNb2RlbDogbm9kZSxcbiAgICB9O1xuICB9XG5cbiAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19