import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { Items } from './providers/items';
let ClrDatagridPlaceholder = class ClrDatagridPlaceholder {
    constructor(items) {
        this.items = items;
    }
    /**
     * Tests if the datagrid is empty, meaning it doesn't contain any items
     */
    get emptyDatagrid() {
        return !this.items.loading && (!this.items.displayed || this.items.displayed.length === 0);
    }
};
ClrDatagridPlaceholder = tslib_1.__decorate([
    Component({
        selector: 'clr-dg-placeholder',
        template: `
        <div
            class="datagrid-placeholder"
            [class.datagrid-empty]="emptyDatagrid">
                <div class="datagrid-placeholder-image" *ngIf="emptyDatagrid"></div>
                <ng-content *ngIf="emptyDatagrid"></ng-content>
        </div>
    `,
        host: { '[class.datagrid-placeholder-container]': 'true' }
    }),
    tslib_1.__metadata("design:paramtypes", [Items])
], ClrDatagridPlaceholder);
export { ClrDatagridPlaceholder };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcGxhY2Vob2xkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2RhdGFncmlkLXBsYWNlaG9sZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFjMUMsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFDakMsWUFBb0IsS0FBZTtRQUFmLFVBQUssR0FBTCxLQUFLLENBQVU7SUFBRyxDQUFDO0lBRXZDOztPQUVHO0lBQ0gsSUFBVyxhQUFhO1FBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzdGLENBQUM7Q0FDRixDQUFBO0FBVFksc0JBQXNCO0lBWmxDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxvQkFBb0I7UUFDOUIsUUFBUSxFQUFFOzs7Ozs7O0tBT1A7UUFDSCxJQUFJLEVBQUUsRUFBRSx3Q0FBd0MsRUFBRSxNQUFNLEVBQUU7S0FDM0QsQ0FBQzs2Q0FFMkIsS0FBSztHQURyQixzQkFBc0IsQ0FTbEM7U0FUWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEl0ZW1zIH0gZnJvbSAnLi9wcm92aWRlcnMvaXRlbXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctcGxhY2Vob2xkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cImRhdGFncmlkLXBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgIFtjbGFzcy5kYXRhZ3JpZC1lbXB0eV09XCJlbXB0eURhdGFncmlkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGFncmlkLXBsYWNlaG9sZGVyLWltYWdlXCIgKm5nSWY9XCJlbXB0eURhdGFncmlkXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgKm5nSWY9XCJlbXB0eURhdGFncmlkXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICBob3N0OiB7ICdbY2xhc3MuZGF0YWdyaWQtcGxhY2Vob2xkZXItY29udGFpbmVyXSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZFBsYWNlaG9sZGVyPFQgPSBhbnk+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtczogSXRlbXM8VD4pIHt9XG5cbiAgLyoqXG4gICAqIFRlc3RzIGlmIHRoZSBkYXRhZ3JpZCBpcyBlbXB0eSwgbWVhbmluZyBpdCBkb2Vzbid0IGNvbnRhaW4gYW55IGl0ZW1zXG4gICAqL1xuICBwdWJsaWMgZ2V0IGVtcHR5RGF0YWdyaWQoKSB7XG4gICAgcmV0dXJuICF0aGlzLml0ZW1zLmxvYWRpbmcgJiYgKCF0aGlzLml0ZW1zLmRpc3BsYXllZCB8fCB0aGlzLml0ZW1zLmRpc3BsYXllZC5sZW5ndGggPT09IDApO1xuICB9XG59XG4iXX0=