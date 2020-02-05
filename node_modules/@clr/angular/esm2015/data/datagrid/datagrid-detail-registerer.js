import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, Optional } from '@angular/core';
import { ExpandableRowsCount } from './providers/global-expandable-rows';
/*
 * I don't think this deserves to be in IfExpanded itself,
 * so I'm adding a second directive on the same selector for now just for the datagrid
 */
let DatagridDetailRegisterer = class DatagridDetailRegisterer {
    constructor(expandableRowsCount) {
        this.expandableRowsCount = expandableRowsCount;
        if (this.expandableRowsCount) {
            this.expandableRowsCount.register();
        }
    }
    ngOnDestroy() {
        if (this.expandableRowsCount) {
            this.expandableRowsCount.unregister();
        }
    }
};
DatagridDetailRegisterer = tslib_1.__decorate([
    Directive({ selector: '[clrIfExpanded]' }),
    tslib_1.__param(0, Optional()),
    tslib_1.__metadata("design:paramtypes", [ExpandableRowsCount])
], DatagridDetailRegisterer);
export { DatagridDetailRegisterer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtZGV0YWlsLXJlZ2lzdGVyZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2RhdGFncmlkLWRldGFpbC1yZWdpc3RlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFekU7OztHQUdHO0FBRUgsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFDbkMsWUFBZ0MsbUJBQXdDO1FBQXhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDdEUsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDNUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUM1QixJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDdkM7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQVpZLHdCQUF3QjtJQURwQyxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztJQUU1QixtQkFBQSxRQUFRLEVBQUUsQ0FBQTs2Q0FBOEIsbUJBQW1CO0dBRDdELHdCQUF3QixDQVlwQztTQVpZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV4cGFuZGFibGVSb3dzQ291bnQgfSBmcm9tICcuL3Byb3ZpZGVycy9nbG9iYWwtZXhwYW5kYWJsZS1yb3dzJztcblxuLypcbiAqIEkgZG9uJ3QgdGhpbmsgdGhpcyBkZXNlcnZlcyB0byBiZSBpbiBJZkV4cGFuZGVkIGl0c2VsZixcbiAqIHNvIEknbSBhZGRpbmcgYSBzZWNvbmQgZGlyZWN0aXZlIG9uIHRoZSBzYW1lIHNlbGVjdG9yIGZvciBub3cganVzdCBmb3IgdGhlIGRhdGFncmlkXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJJZkV4cGFuZGVkXScgfSlcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZERldGFpbFJlZ2lzdGVyZXIge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBwcml2YXRlIGV4cGFuZGFibGVSb3dzQ291bnQ6IEV4cGFuZGFibGVSb3dzQ291bnQpIHtcbiAgICBpZiAodGhpcy5leHBhbmRhYmxlUm93c0NvdW50KSB7XG4gICAgICB0aGlzLmV4cGFuZGFibGVSb3dzQ291bnQucmVnaXN0ZXIoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5leHBhbmRhYmxlUm93c0NvdW50KSB7XG4gICAgICB0aGlzLmV4cGFuZGFibGVSb3dzQ291bnQudW5yZWdpc3RlcigpO1xuICAgIH1cbiAgfVxufVxuIl19