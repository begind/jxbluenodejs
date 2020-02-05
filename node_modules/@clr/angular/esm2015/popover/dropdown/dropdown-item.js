import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { ClrDropdown } from './dropdown';
import { BASIC_FOCUSABLE_ITEM_PROVIDER } from '../../utils/focus/focusable-item/basic-focusable-item.service';
import { FocusableItem } from '../../utils/focus/focusable-item/focusable-item';
import { RootDropdownService } from './providers/dropdown.service';
let ClrDropdownItem = class ClrDropdownItem {
    constructor(dropdown, el, _dropdownService, renderer, focusableItem) {
        this.dropdown = dropdown;
        this.el = el;
        this._dropdownService = _dropdownService;
        this.renderer = renderer;
        this.focusableItem = focusableItem;
        this.setByDeprecatedDisabled = false;
    }
    set disabled(value) {
        // Empty string attribute evaluates to false but should disable the item, so we need to add a special case for it.
        this.focusableItem.disabled = !!value || value === '';
    }
    get disabled() {
        return this.focusableItem.disabled;
    }
    /*
     * @deprecated since 3.0, remove in 4.0. the presence of this attribute makes it not-focusable in IE11. Use [clrDisabled] input instead.
     */
    set disabledDeprecated(value) {
        // Empty string attribute evaluates to false but should disable the item, so we need to add a special case for it.
        this.focusableItem.disabled = !!value || value === '';
        this.setByDeprecatedDisabled = true;
    }
    get disabledDeprecated() {
        return this.focusableItem.disabled;
    }
    ngAfterViewInit() {
        this.unlisten = this.renderer.listen(this.el.nativeElement, 'click', () => this.onDropdownItemClick());
    }
    onDropdownItemClick() {
        if (this.dropdown.isMenuClosable && !this.el.nativeElement.classList.contains('disabled')) {
            this._dropdownService.closeMenus();
        }
    }
    ngOnDestroy() {
        this.unlisten();
    }
};
tslib_1.__decorate([
    Input('clrDisabled'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], ClrDropdownItem.prototype, "disabled", null);
tslib_1.__decorate([
    Input('disabled'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], ClrDropdownItem.prototype, "disabledDeprecated", null);
ClrDropdownItem = tslib_1.__decorate([
    Directive({
        selector: '[clrDropdownItem]',
        host: {
            '[class.disabled]': 'disabled',
            '[class.dropdown-item]': 'true',
            '[attr.role]': '"menuitem"',
            '[attr.aria-disabled]': 'disabled',
            '[attr.disabled]': "(disabled && setByDeprecatedDisabled)? '' : null",
        },
        providers: [BASIC_FOCUSABLE_ITEM_PROVIDER],
    }),
    tslib_1.__metadata("design:paramtypes", [ClrDropdown,
        ElementRef,
        RootDropdownService,
        Renderer2,
        FocusableItem])
], ClrDropdownItem);
export { ClrDropdownItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24taXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvZHJvcGRvd24vZHJvcGRvd24taXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDOUcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBYW5FLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFDMUIsWUFDVSxRQUFxQixFQUNyQixFQUEyQixFQUMzQixnQkFBcUMsRUFDckMsUUFBbUIsRUFDbkIsYUFBNEI7UUFKNUIsYUFBUSxHQUFSLFFBQVEsQ0FBYTtRQUNyQixPQUFFLEdBQUYsRUFBRSxDQUF5QjtRQUMzQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXFCO1FBQ3JDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFJL0IsNEJBQXVCLEdBQVksS0FBSyxDQUFDO0lBSDdDLENBQUM7SUFNSixJQUFJLFFBQVEsQ0FBQyxLQUF1QjtRQUNsQyxrSEFBa0g7UUFDbEgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDO0lBQ3hELENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7T0FFRztJQUVILElBQUksa0JBQWtCLENBQUMsS0FBdUI7UUFDNUMsa0hBQWtIO1FBQ2xILElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxLQUFLLEVBQUUsQ0FBQztRQUN0RCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxJQUFJLGtCQUFrQjtRQUNwQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3pGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNwQztJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7Q0FDRixDQUFBO0FBcENDO0lBREMsS0FBSyxDQUFDLGFBQWEsQ0FBQzs7OytDQUlwQjtBQVVEO0lBREMsS0FBSyxDQUFDLFVBQVUsQ0FBQzs7O3lEQUtqQjtBQTlCVSxlQUFlO0lBWDNCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsSUFBSSxFQUFFO1lBQ0osa0JBQWtCLEVBQUUsVUFBVTtZQUM5Qix1QkFBdUIsRUFBRSxNQUFNO1lBQy9CLGFBQWEsRUFBRSxZQUFZO1lBQzNCLHNCQUFzQixFQUFFLFVBQVU7WUFDbEMsaUJBQWlCLEVBQUUsa0RBQWtEO1NBQ3RFO1FBQ0QsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7S0FDM0MsQ0FBQzs2Q0FHb0IsV0FBVztRQUNqQixVQUFVO1FBQ0ksbUJBQW1CO1FBQzNCLFNBQVM7UUFDSixhQUFhO0dBTjNCLGVBQWUsQ0FpRDNCO1NBakRZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xyRHJvcGRvd24gfSBmcm9tICcuL2Ryb3Bkb3duJztcbmltcG9ydCB7IEJBU0lDX0ZPQ1VTQUJMRV9JVEVNX1BST1ZJREVSIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9jdXMvZm9jdXNhYmxlLWl0ZW0vYmFzaWMtZm9jdXNhYmxlLWl0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBGb2N1c2FibGVJdGVtIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9jdXMvZm9jdXNhYmxlLWl0ZW0vZm9jdXNhYmxlLWl0ZW0nO1xuaW1wb3J0IHsgUm9vdERyb3Bkb3duU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2Ryb3Bkb3duLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2xyRHJvcGRvd25JdGVtXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5kcm9wZG93bi1pdGVtXSc6ICd0cnVlJyxcbiAgICAnW2F0dHIucm9sZV0nOiAnXCJtZW51aXRlbVwiJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbYXR0ci5kaXNhYmxlZF0nOiBcIihkaXNhYmxlZCAmJiBzZXRCeURlcHJlY2F0ZWREaXNhYmxlZCk/ICcnIDogbnVsbFwiLFxuICB9LFxuICBwcm92aWRlcnM6IFtCQVNJQ19GT0NVU0FCTEVfSVRFTV9QUk9WSURFUl0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRyb3Bkb3duSXRlbSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRyb3Bkb3duOiBDbHJEcm9wZG93bixcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcml2YXRlIF9kcm9wZG93blNlcnZpY2U6IFJvb3REcm9wZG93blNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZm9jdXNhYmxlSXRlbTogRm9jdXNhYmxlSXRlbVxuICApIHt9XG5cbiAgcHJpdmF0ZSB1bmxpc3RlbjtcbiAgcHVibGljIHNldEJ5RGVwcmVjYXRlZERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCdjbHJEaXNhYmxlZCcpXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIC8vIEVtcHR5IHN0cmluZyBhdHRyaWJ1dGUgZXZhbHVhdGVzIHRvIGZhbHNlIGJ1dCBzaG91bGQgZGlzYWJsZSB0aGUgaXRlbSwgc28gd2UgbmVlZCB0byBhZGQgYSBzcGVjaWFsIGNhc2UgZm9yIGl0LlxuICAgIHRoaXMuZm9jdXNhYmxlSXRlbS5kaXNhYmxlZCA9ICEhdmFsdWUgfHwgdmFsdWUgPT09ICcnO1xuICB9XG5cbiAgZ2V0IGRpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmZvY3VzYWJsZUl0ZW0uZGlzYWJsZWQ7XG4gIH1cblxuICAvKlxuICAgKiBAZGVwcmVjYXRlZCBzaW5jZSAzLjAsIHJlbW92ZSBpbiA0LjAuIHRoZSBwcmVzZW5jZSBvZiB0aGlzIGF0dHJpYnV0ZSBtYWtlcyBpdCBub3QtZm9jdXNhYmxlIGluIElFMTEuIFVzZSBbY2xyRGlzYWJsZWRdIGlucHV0IGluc3RlYWQuXG4gICAqL1xuICBASW5wdXQoJ2Rpc2FibGVkJylcbiAgc2V0IGRpc2FibGVkRGVwcmVjYXRlZCh2YWx1ZTogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIC8vIEVtcHR5IHN0cmluZyBhdHRyaWJ1dGUgZXZhbHVhdGVzIHRvIGZhbHNlIGJ1dCBzaG91bGQgZGlzYWJsZSB0aGUgaXRlbSwgc28gd2UgbmVlZCB0byBhZGQgYSBzcGVjaWFsIGNhc2UgZm9yIGl0LlxuICAgIHRoaXMuZm9jdXNhYmxlSXRlbS5kaXNhYmxlZCA9ICEhdmFsdWUgfHwgdmFsdWUgPT09ICcnO1xuICAgIHRoaXMuc2V0QnlEZXByZWNhdGVkRGlzYWJsZWQgPSB0cnVlO1xuICB9XG5cbiAgZ2V0IGRpc2FibGVkRGVwcmVjYXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5mb2N1c2FibGVJdGVtLmRpc2FibGVkO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMudW5saXN0ZW4gPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdjbGljaycsICgpID0+IHRoaXMub25Ecm9wZG93bkl0ZW1DbGljaygpKTtcbiAgfVxuXG4gIG9uRHJvcGRvd25JdGVtQ2xpY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZHJvcGRvd24uaXNNZW51Q2xvc2FibGUgJiYgIXRoaXMuZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcbiAgICAgIHRoaXMuX2Ryb3Bkb3duU2VydmljZS5jbG9zZU1lbnVzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy51bmxpc3RlbigpO1xuICB9XG59XG4iXX0=