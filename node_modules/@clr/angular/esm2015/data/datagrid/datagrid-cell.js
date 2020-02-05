import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChildren, QueryList, ViewContainerRef } from '@angular/core';
import { ClrSignpost } from '../../popover/signpost/signpost';
import { HostWrapper } from '../../utils/host-wrapping/host-wrapper';
import { WrappedCell } from './wrapped-cell';
let ClrDatagridCell = class ClrDatagridCell {
    constructor(vcr) {
        this.vcr = vcr;
    }
    ngOnInit() {
        this.wrappedInjector = new HostWrapper(WrappedCell, this.vcr);
    }
    get _view() {
        return this.wrappedInjector.get(WrappedCell, this.vcr).cellView;
    }
};
tslib_1.__decorate([
    ContentChildren(ClrSignpost),
    tslib_1.__metadata("design:type", QueryList)
], ClrDatagridCell.prototype, "signpost", void 0);
ClrDatagridCell = tslib_1.__decorate([
    Component({
        selector: 'clr-dg-cell',
        template: `
        <ng-content></ng-content>
    `,
        host: {
            '[class.datagrid-cell]': 'true',
            '[class.datagrid-signpost-trigger]': 'signpost.length > 0',
            role: 'gridcell',
        }
    }),
    tslib_1.__metadata("design:paramtypes", [ViewContainerRef])
], ClrDatagridCell);
export { ClrDatagridCell };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtY2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFvQixTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFhN0MsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQVcxQixZQUFvQixHQUFxQjtRQUFyQixRQUFHLEdBQUgsR0FBRyxDQUFrQjtJQUFHLENBQUM7SUFJN0MsUUFBUTtRQUNOLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxXQUFXLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ2QsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUNsRSxDQUFDO0NBQ0YsQ0FBQTtBQWIrQjtJQUE3QixlQUFlLENBQUMsV0FBVyxDQUFDO3NDQUFXLFNBQVM7aURBQWM7QUFUcEQsZUFBZTtJQVgzQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsYUFBYTtRQUN2QixRQUFRLEVBQUU7O0tBRVA7UUFDSCxJQUFJLEVBQUU7WUFDSix1QkFBdUIsRUFBRSxNQUFNO1lBQy9CLG1DQUFtQyxFQUFFLHFCQUFxQjtZQUMxRCxJQUFJLEVBQUUsVUFBVTtTQUNqQjtLQUNGLENBQUM7NkNBWXlCLGdCQUFnQjtHQVg5QixlQUFlLENBc0IzQjtTQXRCWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEluamVjdG9yLCBPbkluaXQsIFF1ZXJ5TGlzdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbHJTaWducG9zdCB9IGZyb20gJy4uLy4uL3BvcG92ZXIvc2lnbnBvc3Qvc2lnbnBvc3QnO1xuaW1wb3J0IHsgSG9zdFdyYXBwZXIgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2hvc3Qtd3JhcHBlcic7XG5pbXBvcnQgeyBXcmFwcGVkQ2VsbCB9IGZyb20gJy4vd3JhcHBlZC1jZWxsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLWNlbGwnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZGF0YWdyaWQtY2VsbF0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1zaWducG9zdC10cmlnZ2VyXSc6ICdzaWducG9zdC5sZW5ndGggPiAwJyxcbiAgICByb2xlOiAnZ3JpZGNlbGwnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZENlbGwgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKioqKioqKioqXG4gICAqIEBwcm9wZXJ0eSBzaWducG9zdFxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQENvbnRlbnRDaGlsZCBpcyB1c2VkIHRvIGRldGVjdCB0aGUgcHJlc2VuY2Ugb2YgYSBTaWducG9zdCBpbiB0aGUgcHJvamVjdGVkIGNvbnRlbnQuXG4gICAqIE9uIHRoZSBob3N0LCB3ZSBzZXQgdGhlIC5kYXRhZ3JpZC1zaWducG9zdC10cmlnZ2VyIGNsYXNzIG9uIHRoZSBjZWxsIHdoZW4gc2lnbnBvc3QubGVuZ3RoIGlzIGdyZWF0ZXIgdGhhbiAwLlxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZHJlbihDbHJTaWducG9zdCkgc2lnbnBvc3Q6IFF1ZXJ5TGlzdDxDbHJTaWducG9zdD47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2Y3I6IFZpZXdDb250YWluZXJSZWYpIHt9XG5cbiAgcHJpdmF0ZSB3cmFwcGVkSW5qZWN0b3I6IEluamVjdG9yO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud3JhcHBlZEluamVjdG9yID0gbmV3IEhvc3RXcmFwcGVyKFdyYXBwZWRDZWxsLCB0aGlzLnZjcik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IF92aWV3KCkge1xuICAgIHJldHVybiB0aGlzLndyYXBwZWRJbmplY3Rvci5nZXQoV3JhcHBlZENlbGwsIHRoaXMudmNyKS5jZWxsVmlldztcbiAgfVxufVxuIl19