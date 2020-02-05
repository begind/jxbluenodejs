import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, TemplateRef, ViewChild } from '@angular/core';
let WrappedColumn = class WrappedColumn {
    constructor() {
        this._dynamic = false;
    }
    ngAfterViewInit() {
        // Create the cells view in memory, not the DOM.
        this.columnView = this.templateRef.createEmbeddedView(null);
    }
};
tslib_1.__decorate([
    ViewChild('columnPortal', { static: false }),
    tslib_1.__metadata("design:type", TemplateRef)
], WrappedColumn.prototype, "templateRef", void 0);
WrappedColumn = tslib_1.__decorate([
    Component({
        selector: 'dg-wrapped-column',
        template: `        
        <ng-template #columnPortal>
            <ng-content></ng-content>
        </ng-template>
    `
    })
], WrappedColumn);
export { WrappedColumn };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlZC1jb2x1bW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL3dyYXBwZWQtY29sdW1uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFpQixTQUFTLEVBQW1CLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFZbEcsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQVIxQjtRQVNFLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFVbkIsQ0FBQztJQUpDLGVBQWU7UUFDYixnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUM7Q0FDRixDQUFBO0FBUEM7SUFEQyxTQUFTLENBQUMsY0FBYyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO3NDQUNoQyxXQUFXO2tEQUFPO0FBSnBCLGFBQWE7SUFSekIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixRQUFRLEVBQUU7Ozs7S0FJUDtLQUNKLENBQUM7R0FDVyxhQUFhLENBV3pCO1NBWFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRW1iZWRkZWRWaWV3UmVmLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IER5bmFtaWNXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9keW5hbWljLXdyYXBwZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZy13cmFwcGVkLWNvbHVtbicsXG4gIHRlbXBsYXRlOiBgICAgICAgICBcbiAgICAgICAgPG5nLXRlbXBsYXRlICNjb2x1bW5Qb3J0YWw+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgV3JhcHBlZENvbHVtbiBpbXBsZW1lbnRzIER5bmFtaWNXcmFwcGVyLCBBZnRlclZpZXdJbml0IHtcbiAgX2R5bmFtaWMgPSBmYWxzZTtcblxuICBAVmlld0NoaWxkKCdjb2x1bW5Qb3J0YWwnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBjb2x1bW5WaWV3OiBFbWJlZGRlZFZpZXdSZWY8dm9pZD47IC8vIHRoZSBjb2x1bW5zIHByb2plY3RlZCB2aWV3IChpbiBtZW1vcnkpXG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIENyZWF0ZSB0aGUgY2VsbHMgdmlldyBpbiBtZW1vcnksIG5vdCB0aGUgRE9NLlxuICAgIHRoaXMuY29sdW1uVmlldyA9IHRoaXMudGVtcGxhdGVSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KG51bGwpO1xuICB9XG59XG4iXX0=