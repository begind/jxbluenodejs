import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { isPlatformBrowser } from '@angular/common';
import { ContentChildren, Directive, ElementRef, PLATFORM_ID, QueryList, Renderer2, } from '@angular/core';
import { DatagridRenderStep } from '../enums/render-step.enum';
import { Items } from '../providers/items';
import { Page } from '../providers/page';
import { TableSizeService } from '../providers/table-size.service';
import { DomAdapter } from '../../../utils/dom-adapter/dom-adapter';
import { DatagridHeaderRenderer } from './header-renderer';
import { NoopDomAdapter } from './noop-dom-adapter';
import { DatagridRenderOrganizer } from './render-organizer';
import { ColumnsService } from '../providers/columns.service';
import { DatagridColumnChanges } from '../enums/column-changes.enum';
import { DatagridRowRenderer } from './row-renderer';
// Fixes build error
// @dynamic (https://github.com/angular/angular/issues/19698#issuecomment-338340211)
export const domAdapterFactory = (platformId) => {
    if (isPlatformBrowser(platformId)) {
        return new DomAdapter();
    }
    else {
        return new NoopDomAdapter();
    }
};
// Fixes build error
// @dynamic (https://github.com/angular/angular/issues/19698#issuecomment-338340211)
let DatagridMainRenderer = class DatagridMainRenderer {
    constructor(organizer, items, page, domAdapter, el, renderer, tableSizeService, columnsService) {
        this.organizer = organizer;
        this.items = items;
        this.page = page;
        this.domAdapter = domAdapter;
        this.el = el;
        this.renderer = renderer;
        this.tableSizeService = tableSizeService;
        this.columnsService = columnsService;
        this._heightSet = false;
        this.subscriptions = [];
        /**
         * Indicates if we want to re-compute columns width. This should only happen:
         * 1) When headers change, with columns being added or removed
         * 2) When rows are lazily loaded for the first time
         */
        this.columnsSizesStable = false;
        this.shouldStabilizeColumns = true;
        this.subscriptions.push(this.organizer
            .filterRenderSteps(DatagridRenderStep.COMPUTE_COLUMN_WIDTHS)
            .subscribe(() => this.computeHeadersWidth()));
        this.subscriptions.push(this.page.sizeChange.subscribe(() => {
            if (this._heightSet) {
                this.resetDatagridHeight();
            }
        }));
        this.subscriptions.push(this.items.change.subscribe(() => (this.shouldStabilizeColumns = true)));
    }
    ngAfterContentInit() {
        this.setupColumns();
        this.subscriptions.push(this.headers.changes.subscribe(() => {
            // TODO: only re-stabilize if a column was added or removed. Reordering is fine.
            // Need to setup columns before stabalizing them
            this.setupColumns();
            this.columnsSizesStable = false;
            this.stabilizeColumns();
        }));
    }
    // Initialize and set Table width for horizontal scrolling here.
    ngAfterViewInit() {
        this.tableSizeService.table = this.el;
    }
    ngAfterViewChecked() {
        if (this.shouldStabilizeColumns) {
            this.stabilizeColumns();
        }
        if (this.shouldComputeHeight()) {
            setTimeout(() => {
                this.computeDatagridHeight();
            });
        }
    }
    setupColumns() {
        this.headers.forEach((header, index) => header.setColumnState(index));
        this.columnsService.columns.splice(this.headers.length); // Trim any old columns
        this.rows.forEach(row => row.setColumnState());
    }
    shouldComputeHeight() {
        if (!this._heightSet && this.page.size > 0) {
            if (this.items.displayed.length === this.page.size) {
                return true;
            }
        }
        return false;
    }
    /**
     * Computes the height of the datagrid.
     *
     * NOTE: We had to choose to set the height instead of the min-height because
     * IE 11 requires the height on the parent for the children flex grow/shrink properties to work.
     * When we used min-height, 1 1 auto doesn't used to work in IE11 :-(
     * But this doesn't affect the fix. It works in both fixed & variable height datagrids.
     *
     * Refer: http://stackoverflow.com/questions/24396205/flex-grow-not-working-in-internet-explorer-11-0
     */
    computeDatagridHeight() {
        // IE doesn't return correct value for getComputedStyle(element).getPropertyValue("height")
        const value = this.domAdapter.clientRect(this.el.nativeElement).height;
        this.renderer.setStyle(this.el.nativeElement, 'height', value + 'px');
        this._heightSet = true;
    }
    resetDatagridHeight() {
        this.renderer.setStyle(this.el.nativeElement, 'height', '');
        this._heightSet = false;
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    /**
     * Makes each header compute its width.
     */
    computeHeadersWidth() {
        const nbColumns = this.headers.length;
        let allStrict = true;
        this.headers.forEach((header, index) => {
            // On the last header column check whether all columns have strict widths.
            // If all columns have strict widths, remove the strict width from the last column and make it the column's
            // minimum width so that when all previous columns shrink, it will get a flexible width and cover the empty
            // gap in the Datagrid.
            const state = Object.assign({ changes: [DatagridColumnChanges.WIDTH] }, header.getColumnWidthState());
            if (!state.strictWidth) {
                allStrict = false;
            }
            if (nbColumns === index + 1 && allStrict) {
                state.strictWidth = 0;
            }
            this.columnsService.emitStateChangeAt(index, state);
        });
    }
    /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
     */
    stabilizeColumns() {
        this.shouldStabilizeColumns = false;
        if (this.columnsSizesStable) {
            // Nothing to do.
            return;
        }
        // Resize when the rows are loaded.
        if (this.items.displayed.length > 0) {
            this.organizer.resize();
            this.columnsSizesStable = true;
        }
    }
};
tslib_1.__decorate([
    ContentChildren(DatagridHeaderRenderer),
    tslib_1.__metadata("design:type", QueryList)
], DatagridMainRenderer.prototype, "headers", void 0);
tslib_1.__decorate([
    ContentChildren(DatagridRowRenderer, { descendants: true }),
    tslib_1.__metadata("design:type", QueryList)
], DatagridMainRenderer.prototype, "rows", void 0);
DatagridMainRenderer = tslib_1.__decorate([
    Directive({
        selector: 'clr-datagrid',
        providers: [{ provide: DomAdapter, useFactory: domAdapterFactory, deps: [PLATFORM_ID] }],
    }),
    tslib_1.__metadata("design:paramtypes", [DatagridRenderOrganizer,
        Items,
        Page,
        DomAdapter,
        ElementRef,
        Renderer2,
        TableSizeService,
        ColumnsService])
], DatagridMainRenderer);
export { DatagridMainRenderer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcmVuZGVyL21haW4tcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBSUwsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBRVYsV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVuRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdyRCxvQkFBb0I7QUFDcEIsb0ZBQW9GO0FBQ3BGLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFO0lBQ3RELElBQUksaUJBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUU7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QyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7U0FDaEM7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQW5JMEM7SUFBeEMsZUFBZSxDQUFDLHNCQUFzQixDQUFDO3NDQUFrQixTQUFTO3FEQUF5QjtBQUU1RjtJQURDLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztzQ0FDOUMsU0FBUztrREFBc0I7QUE3QmxDLG9CQUFvQjtJQUpoQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsY0FBYztRQUN4QixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7S0FDekYsQ0FBQzs2Q0FHcUIsdUJBQXVCO1FBQzNCLEtBQUs7UUFDTixJQUFJO1FBQ0UsVUFBVTtRQUNsQixVQUFVO1FBQ0osU0FBUztRQUNELGdCQUFnQjtRQUNsQixjQUFjO0dBVDdCLG9CQUFvQixDQThKaEM7U0E5Slksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIE9uRGVzdHJveSxcbiAgUExBVEZPUk1fSUQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlclN0ZXAgfSBmcm9tICcuLi9lbnVtcy9yZW5kZXItc3RlcC5lbnVtJztcbmltcG9ydCB7IEl0ZW1zIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2l0ZW1zJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuLi9wcm92aWRlcnMvcGFnZSc7XG5pbXBvcnQgeyBUYWJsZVNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL3RhYmxlLXNpemUuc2VydmljZSc7XG5cbmltcG9ydCB7IERvbUFkYXB0ZXIgfSBmcm9tICcuLi8uLi8uLi91dGlscy9kb20tYWRhcHRlci9kb20tYWRhcHRlcic7XG5pbXBvcnQgeyBEYXRhZ3JpZEhlYWRlclJlbmRlcmVyIH0gZnJvbSAnLi9oZWFkZXItcmVuZGVyZXInO1xuaW1wb3J0IHsgTm9vcERvbUFkYXB0ZXIgfSBmcm9tICcuL25vb3AtZG9tLWFkYXB0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIgfSBmcm9tICcuL3JlbmRlci1vcmdhbml6ZXInO1xuaW1wb3J0IHsgQ29sdW1uc1NlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvY29sdW1ucy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFncmlkQ29sdW1uQ2hhbmdlcyB9IGZyb20gJy4uL2VudW1zL2NvbHVtbi1jaGFuZ2VzLmVudW0nO1xuaW1wb3J0IHsgRGF0YWdyaWRSb3dSZW5kZXJlciB9IGZyb20gJy4vcm93LXJlbmRlcmVyJztcbmltcG9ydCB7IENvbHVtblN0YXRlRGlmZiB9IGZyb20gJy4uL2ludGVyZmFjZXMvY29sdW1uLXN0YXRlLmludGVyZmFjZSc7XG5cbi8vIEZpeGVzIGJ1aWxkIGVycm9yXG4vLyBAZHluYW1pYyAoaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTk2OTgjaXNzdWVjb21tZW50LTMzODM0MDIxMSlcbmV4cG9ydCBjb25zdCBkb21BZGFwdGVyRmFjdG9yeSA9IChwbGF0Zm9ybUlkOiBPYmplY3QpID0+IHtcbiAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpKSB7XG4gICAgcmV0dXJuIG5ldyBEb21BZGFwdGVyKCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBOb29wRG9tQWRhcHRlcigpO1xuICB9XG59O1xuXG4vLyBGaXhlcyBidWlsZCBlcnJvclxuLy8gQGR5bmFtaWMgKGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE5Njk4I2lzc3VlY29tbWVudC0zMzgzNDAyMTEpXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdjbHItZGF0YWdyaWQnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IERvbUFkYXB0ZXIsIHVzZUZhY3Rvcnk6IGRvbUFkYXB0ZXJGYWN0b3J5LCBkZXBzOiBbUExBVEZPUk1fSURdIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZE1haW5SZW5kZXJlcjxUID0gYW55PiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgb3JnYW5pemVyOiBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplcixcbiAgICBwcml2YXRlIGl0ZW1zOiBJdGVtcyxcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSBkb21BZGFwdGVyOiBEb21BZGFwdGVyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgdGFibGVTaXplU2VydmljZTogVGFibGVTaXplU2VydmljZSxcbiAgICBwcml2YXRlIGNvbHVtbnNTZXJ2aWNlOiBDb2x1bW5zU2VydmljZVxuICApIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMub3JnYW5pemVyXG4gICAgICAgIC5maWx0ZXJSZW5kZXJTdGVwcyhEYXRhZ3JpZFJlbmRlclN0ZXAuQ09NUFVURV9DT0xVTU5fV0lEVEhTKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY29tcHV0ZUhlYWRlcnNXaWR0aCgpKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMucGFnZS5zaXplQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9oZWlnaHRTZXQpIHtcbiAgICAgICAgICB0aGlzLnJlc2V0RGF0YWdyaWRIZWlnaHQoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuaXRlbXMuY2hhbmdlLnN1YnNjcmliZSgoKSA9PiAodGhpcy5zaG91bGRTdGFiaWxpemVDb2x1bW5zID0gdHJ1ZSkpKTtcbiAgfVxuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGF0YWdyaWRIZWFkZXJSZW5kZXJlcikgcHJpdmF0ZSBoZWFkZXJzOiBRdWVyeUxpc3Q8RGF0YWdyaWRIZWFkZXJSZW5kZXJlcj47XG4gIEBDb250ZW50Q2hpbGRyZW4oRGF0YWdyaWRSb3dSZW5kZXJlciwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBwcml2YXRlIHJvd3M6IFF1ZXJ5TGlzdDxEYXRhZ3JpZFJvd1JlbmRlcmVyPjsgLy8gaWYgZXhwYW5kYWJsZSByb3cgaXMgZXhwYW5kZWQgaW5pdGlhbGx5LCBxdWVyeSBpdHMgY2VsbHMgdG9vLlxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLnNldHVwQ29sdW1ucygpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmhlYWRlcnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAvLyBUT0RPOiBvbmx5IHJlLXN0YWJpbGl6ZSBpZiBhIGNvbHVtbiB3YXMgYWRkZWQgb3IgcmVtb3ZlZC4gUmVvcmRlcmluZyBpcyBmaW5lLlxuICAgICAgICAvLyBOZWVkIHRvIHNldHVwIGNvbHVtbnMgYmVmb3JlIHN0YWJhbGl6aW5nIHRoZW1cbiAgICAgICAgdGhpcy5zZXR1cENvbHVtbnMoKTtcbiAgICAgICAgdGhpcy5jb2x1bW5zU2l6ZXNTdGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGFiaWxpemVDb2x1bW5zKCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvLyBJbml0aWFsaXplIGFuZCBzZXQgVGFibGUgd2lkdGggZm9yIGhvcml6b250YWwgc2Nyb2xsaW5nIGhlcmUuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnRhYmxlU2l6ZVNlcnZpY2UudGFibGUgPSB0aGlzLmVsO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIGlmICh0aGlzLnNob3VsZFN0YWJpbGl6ZUNvbHVtbnMpIHtcbiAgICAgIHRoaXMuc3RhYmlsaXplQ29sdW1ucygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaG91bGRDb21wdXRlSGVpZ2h0KCkpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbXB1dGVEYXRhZ3JpZEhlaWdodCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cENvbHVtbnMoKSB7XG4gICAgdGhpcy5oZWFkZXJzLmZvckVhY2goKGhlYWRlciwgaW5kZXgpID0+IGhlYWRlci5zZXRDb2x1bW5TdGF0ZShpbmRleCkpO1xuICAgIHRoaXMuY29sdW1uc1NlcnZpY2UuY29sdW1ucy5zcGxpY2UodGhpcy5oZWFkZXJzLmxlbmd0aCk7IC8vIFRyaW0gYW55IG9sZCBjb2x1bW5zXG4gICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHJvdy5zZXRDb2x1bW5TdGF0ZSgpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hlaWdodFNldDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc2hvdWxkQ29tcHV0ZUhlaWdodCgpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuX2hlaWdodFNldCAmJiB0aGlzLnBhZ2Uuc2l6ZSA+IDApIHtcbiAgICAgIGlmICh0aGlzLml0ZW1zLmRpc3BsYXllZC5sZW5ndGggPT09IHRoaXMucGFnZS5zaXplKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZXMgdGhlIGhlaWdodCBvZiB0aGUgZGF0YWdyaWQuXG4gICAqXG4gICAqIE5PVEU6IFdlIGhhZCB0byBjaG9vc2UgdG8gc2V0IHRoZSBoZWlnaHQgaW5zdGVhZCBvZiB0aGUgbWluLWhlaWdodCBiZWNhdXNlXG4gICAqIElFIDExIHJlcXVpcmVzIHRoZSBoZWlnaHQgb24gdGhlIHBhcmVudCBmb3IgdGhlIGNoaWxkcmVuIGZsZXggZ3Jvdy9zaHJpbmsgcHJvcGVydGllcyB0byB3b3JrLlxuICAgKiBXaGVuIHdlIHVzZWQgbWluLWhlaWdodCwgMSAxIGF1dG8gZG9lc24ndCB1c2VkIHRvIHdvcmsgaW4gSUUxMSA6LShcbiAgICogQnV0IHRoaXMgZG9lc24ndCBhZmZlY3QgdGhlIGZpeC4gSXQgd29ya3MgaW4gYm90aCBmaXhlZCAmIHZhcmlhYmxlIGhlaWdodCBkYXRhZ3JpZHMuXG4gICAqXG4gICAqIFJlZmVyOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI0Mzk2MjA1L2ZsZXgtZ3Jvdy1ub3Qtd29ya2luZy1pbi1pbnRlcm5ldC1leHBsb3Jlci0xMS0wXG4gICAqL1xuICBwcml2YXRlIGNvbXB1dGVEYXRhZ3JpZEhlaWdodCgpIHtcbiAgICAvLyBJRSBkb2Vzbid0IHJldHVybiBjb3JyZWN0IHZhbHVlIGZvciBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoXCJoZWlnaHRcIilcbiAgICBjb25zdCB2YWx1ZTogbnVtYmVyID0gdGhpcy5kb21BZGFwdGVyLmNsaWVudFJlY3QodGhpcy5lbC5uYXRpdmVFbGVtZW50KS5oZWlnaHQ7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCB2YWx1ZSArICdweCcpO1xuICAgIHRoaXMuX2hlaWdodFNldCA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0RGF0YWdyaWRIZWlnaHQoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCAnJyk7XG4gICAgdGhpcy5faGVpZ2h0U2V0ID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlcyBlYWNoIGhlYWRlciBjb21wdXRlIGl0cyB3aWR0aC5cbiAgICovXG4gIHByaXZhdGUgY29tcHV0ZUhlYWRlcnNXaWR0aCgpIHtcbiAgICBjb25zdCBuYkNvbHVtbnM6IG51bWJlciA9IHRoaXMuaGVhZGVycy5sZW5ndGg7XG4gICAgbGV0IGFsbFN0cmljdCA9IHRydWU7XG4gICAgdGhpcy5oZWFkZXJzLmZvckVhY2goKGhlYWRlciwgaW5kZXgpID0+IHtcbiAgICAgIC8vIE9uIHRoZSBsYXN0IGhlYWRlciBjb2x1bW4gY2hlY2sgd2hldGhlciBhbGwgY29sdW1ucyBoYXZlIHN0cmljdCB3aWR0aHMuXG4gICAgICAvLyBJZiBhbGwgY29sdW1ucyBoYXZlIHN0cmljdCB3aWR0aHMsIHJlbW92ZSB0aGUgc3RyaWN0IHdpZHRoIGZyb20gdGhlIGxhc3QgY29sdW1uIGFuZCBtYWtlIGl0IHRoZSBjb2x1bW4nc1xuICAgICAgLy8gbWluaW11bSB3aWR0aCBzbyB0aGF0IHdoZW4gYWxsIHByZXZpb3VzIGNvbHVtbnMgc2hyaW5rLCBpdCB3aWxsIGdldCBhIGZsZXhpYmxlIHdpZHRoIGFuZCBjb3ZlciB0aGUgZW1wdHlcbiAgICAgIC8vIGdhcCBpbiB0aGUgRGF0YWdyaWQuXG4gICAgICBjb25zdCBzdGF0ZTogQ29sdW1uU3RhdGVEaWZmID0ge1xuICAgICAgICBjaGFuZ2VzOiBbRGF0YWdyaWRDb2x1bW5DaGFuZ2VzLldJRFRIXSxcbiAgICAgICAgLi4uaGVhZGVyLmdldENvbHVtbldpZHRoU3RhdGUoKSxcbiAgICAgIH07XG5cbiAgICAgIGlmICghc3RhdGUuc3RyaWN0V2lkdGgpIHtcbiAgICAgICAgYWxsU3RyaWN0ID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChuYkNvbHVtbnMgPT09IGluZGV4ICsgMSAmJiBhbGxTdHJpY3QpIHtcbiAgICAgICAgc3RhdGUuc3RyaWN0V2lkdGggPSAwO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbHVtbnNTZXJ2aWNlLmVtaXRTdGF0ZUNoYW5nZUF0KGluZGV4LCBzdGF0ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHdlIHdhbnQgdG8gcmUtY29tcHV0ZSBjb2x1bW5zIHdpZHRoLiBUaGlzIHNob3VsZCBvbmx5IGhhcHBlbjpcbiAgICogMSkgV2hlbiBoZWFkZXJzIGNoYW5nZSwgd2l0aCBjb2x1bW5zIGJlaW5nIGFkZGVkIG9yIHJlbW92ZWRcbiAgICogMikgV2hlbiByb3dzIGFyZSBsYXppbHkgbG9hZGVkIGZvciB0aGUgZmlyc3QgdGltZVxuICAgKi9cbiAgcHJpdmF0ZSBjb2x1bW5zU2l6ZXNTdGFibGUgPSBmYWxzZTtcblxuICBwcml2YXRlIHNob3VsZFN0YWJpbGl6ZUNvbHVtbnMgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyBhIHdob2xlIHJlLXJlbmRyaW5nIGN5Y2xlIHRvIHNldCBjb2x1bW4gc2l6ZXMsIGlmIG5lZWRlZC5cbiAgICovXG4gIHByaXZhdGUgc3RhYmlsaXplQ29sdW1ucygpIHtcbiAgICB0aGlzLnNob3VsZFN0YWJpbGl6ZUNvbHVtbnMgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5jb2x1bW5zU2l6ZXNTdGFibGUpIHtcbiAgICAgIC8vIE5vdGhpbmcgdG8gZG8uXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFJlc2l6ZSB3aGVuIHRoZSByb3dzIGFyZSBsb2FkZWQuXG4gICAgaWYgKHRoaXMuaXRlbXMuZGlzcGxheWVkLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMub3JnYW5pemVyLnJlc2l6ZSgpO1xuICAgICAgdGhpcy5jb2x1bW5zU2l6ZXNTdGFibGUgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl19