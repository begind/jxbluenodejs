/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { TREE_FEATURES_PROVIDER, TreeFeaturesService } from './tree-features.service';
var ClrTree = /** @class */ (function () {
    // This component can also be used just to declare providers once for trees with multiple root nodes.
    function ClrTree(featuresService) {
        this.featuresService = featuresService;
    }
    Object.defineProperty(ClrTree.prototype, "lazy", {
        set: function (value) {
            this.featuresService.eager = !value;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input('clrLazy'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrTree.prototype, "lazy", null);
    ClrTree = tslib_1.__decorate([
        Component({
            selector: 'clr-tree',
            template: "\n    <ng-content></ng-content>\n    <clr-recursive-children *ngIf=\"featuresService.recursion\"\n                            [children]=\"featuresService.recursion.root\"></clr-recursive-children>\n  ",
            providers: [TREE_FEATURES_PROVIDER]
        }),
        tslib_1.__metadata("design:paramtypes", [TreeFeaturesService])
    ], ClrTree);
    return ClrTree;
}());
export { ClrTree };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvdHJlZS12aWV3L3RyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQVd0RjtJQUNFLHFHQUFxRztJQUVyRyxpQkFBbUIsZUFBdUM7UUFBdkMsb0JBQWUsR0FBZixlQUFlLENBQXdCO0lBQUcsQ0FBQztJQUc5RCxzQkFBSSx5QkFBSTthQUFSLFVBQVMsS0FBYztZQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQUZEO1FBREMsS0FBSyxDQUFDLFNBQVMsQ0FBQzs7O3VDQUdoQjtJQVJVLE9BQU87UUFUbkIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLDJNQUlUO1lBQ0QsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDcEMsQ0FBQztpREFJb0MsbUJBQW1CO09BSDVDLE9BQU8sQ0FTbkI7SUFBRCxjQUFDO0NBQUEsQUFURCxJQVNDO1NBVFksT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVFJFRV9GRUFUVVJFU19QUk9WSURFUiwgVHJlZUZlYXR1cmVzU2VydmljZSB9IGZyb20gJy4vdHJlZS1mZWF0dXJlcy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXRyZWUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8Y2xyLXJlY3Vyc2l2ZS1jaGlsZHJlbiAqbmdJZj1cImZlYXR1cmVzU2VydmljZS5yZWN1cnNpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjaGlsZHJlbl09XCJmZWF0dXJlc1NlcnZpY2UucmVjdXJzaW9uLnJvb3RcIj48L2Nsci1yZWN1cnNpdmUtY2hpbGRyZW4+XG4gIGAsXG4gIHByb3ZpZGVyczogW1RSRUVfRkVBVFVSRVNfUFJPVklERVJdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJUcmVlPFQ+IHtcbiAgLy8gVGhpcyBjb21wb25lbnQgY2FuIGFsc28gYmUgdXNlZCBqdXN0IHRvIGRlY2xhcmUgcHJvdmlkZXJzIG9uY2UgZm9yIHRyZWVzIHdpdGggbXVsdGlwbGUgcm9vdCBub2Rlcy5cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZmVhdHVyZXNTZXJ2aWNlOiBUcmVlRmVhdHVyZXNTZXJ2aWNlPFQ+KSB7fVxuXG4gIEBJbnB1dCgnY2xyTGF6eScpXG4gIHNldCBsYXp5KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5mZWF0dXJlc1NlcnZpY2UuZWFnZXIgPSAhdmFsdWU7XG4gIH1cbn1cbiJdfQ==