/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { TREE_FEATURES_PROVIDER, TreeFeaturesService } from './tree-features.service';
let ClrTree = class ClrTree {
    // This component can also be used just to declare providers once for trees with multiple root nodes.
    constructor(featuresService) {
        this.featuresService = featuresService;
    }
    set lazy(value) {
        this.featuresService.eager = !value;
    }
};
tslib_1.__decorate([
    Input('clrLazy'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrTree.prototype, "lazy", null);
ClrTree = tslib_1.__decorate([
    Component({
        selector: 'clr-tree',
        template: `
    <ng-content></ng-content>
    <clr-recursive-children *ngIf="featuresService.recursion"
                            [children]="featuresService.recursion.root"></clr-recursive-children>
  `,
        providers: [TREE_FEATURES_PROVIDER]
    }),
    tslib_1.__metadata("design:paramtypes", [TreeFeaturesService])
], ClrTree);
export { ClrTree };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvdHJlZS12aWV3L3RyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQVd0RixJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFPO0lBQ2xCLHFHQUFxRztJQUVyRyxZQUFtQixlQUF1QztRQUF2QyxvQkFBZSxHQUFmLGVBQWUsQ0FBd0I7SUFBRyxDQUFDO0lBRzlELElBQUksSUFBSSxDQUFDLEtBQWM7UUFDckIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFDdEMsQ0FBQztDQUNGLENBQUE7QUFIQztJQURDLEtBQUssQ0FBQyxTQUFTLENBQUM7OzttQ0FHaEI7QUFSVSxPQUFPO0lBVG5CLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRTs7OztHQUlUO1FBQ0QsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7S0FDcEMsQ0FBQzs2Q0FJb0MsbUJBQW1CO0dBSDVDLE9BQU8sQ0FTbkI7U0FUWSxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUUkVFX0ZFQVRVUkVTX1BST1ZJREVSLCBUcmVlRmVhdHVyZXNTZXJ2aWNlIH0gZnJvbSAnLi90cmVlLWZlYXR1cmVzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItdHJlZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDxjbHItcmVjdXJzaXZlLWNoaWxkcmVuICpuZ0lmPVwiZmVhdHVyZXNTZXJ2aWNlLnJlY3Vyc2lvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NoaWxkcmVuXT1cImZlYXR1cmVzU2VydmljZS5yZWN1cnNpb24ucm9vdFwiPjwvY2xyLXJlY3Vyc2l2ZS1jaGlsZHJlbj5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbVFJFRV9GRUFUVVJFU19QUk9WSURFUl0sXG59KVxuZXhwb3J0IGNsYXNzIENsclRyZWU8VD4ge1xuICAvLyBUaGlzIGNvbXBvbmVudCBjYW4gYWxzbyBiZSB1c2VkIGp1c3QgdG8gZGVjbGFyZSBwcm92aWRlcnMgb25jZSBmb3IgdHJlZXMgd2l0aCBtdWx0aXBsZSByb290IG5vZGVzLlxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBmZWF0dXJlc1NlcnZpY2U6IFRyZWVGZWF0dXJlc1NlcnZpY2U8VD4pIHt9XG5cbiAgQElucHV0KCdjbHJMYXp5JylcbiAgc2V0IGxhenkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmZlYXR1cmVzU2VydmljZS5lYWdlciA9ICF2YWx1ZTtcbiAgfVxufVxuIl19