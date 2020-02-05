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
var ClrDropdownItem = /** @class */ (function () {
    function ClrDropdownItem(dropdown, el, _dropdownService, renderer, focusableItem) {
        this.dropdown = dropdown;
        this.el = el;
        this._dropdownService = _dropdownService;
        this.renderer = renderer;
        this.focusableItem = focusableItem;
        this.setByDeprecatedDisabled = false;
    }
    Object.defineProperty(ClrDropdownItem.prototype, "disabled", {
        get: function () {
            return this.focusableItem.disabled;
        },
        set: function (value) {
            // Empty string attribute evaluates to false but should disable the item, so we need to add a special case for it.
            this.focusableItem.disabled = !!value || value === '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDropdownItem.prototype, "disabledDeprecated", {
        get: function () {
            return this.focusableItem.disabled;
        },
        /*
         * @deprecated since 3.0, remove in 4.0. the presence of this attribute makes it not-focusable in IE11. Use [clrDisabled] input instead.
         */
        set: function (value) {
            // Empty string attribute evaluates to false but should disable the item, so we need to add a special case for it.
            this.focusableItem.disabled = !!value || value === '';
            this.setByDeprecatedDisabled = true;
        },
        enumerable: true,
        configurable: true
    });
    ClrDropdownItem.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.unlisten = this.renderer.listen(this.el.nativeElement, 'click', function () { return _this.onDropdownItemClick(); });
    };
    ClrDropdownItem.prototype.onDropdownItemClick = function () {
        if (this.dropdown.isMenuClosable && !this.el.nativeElement.classList.contains('disabled')) {
            this._dropdownService.closeMenus();
        }
    };
    ClrDropdownItem.prototype.ngOnDestroy = function () {
        this.unlisten();
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
    return ClrDropdownItem;
}());
export { ClrDropdownItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24taXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvZHJvcGRvd24vZHJvcGRvd24taXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDOUcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBYW5FO0lBQ0UseUJBQ1UsUUFBcUIsRUFDckIsRUFBMkIsRUFDM0IsZ0JBQXFDLEVBQ3JDLFFBQW1CLEVBQ25CLGFBQTRCO1FBSjVCLGFBQVEsR0FBUixRQUFRLENBQWE7UUFDckIsT0FBRSxHQUFGLEVBQUUsQ0FBeUI7UUFDM0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFxQjtRQUNyQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBSS9CLDRCQUF1QixHQUFZLEtBQUssQ0FBQztJQUg3QyxDQUFDO0lBTUosc0JBQUkscUNBQVE7YUFLWjtZQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFDckMsQ0FBQzthQVBELFVBQWEsS0FBdUI7WUFDbEMsa0hBQWtIO1lBQ2xILElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxLQUFLLEVBQUUsQ0FBQztRQUN4RCxDQUFDOzs7T0FBQTtJQVVELHNCQUFJLCtDQUFrQjthQU10QjtZQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFDckMsQ0FBQztRQVpEOztXQUVHO2FBRUgsVUFBdUIsS0FBdUI7WUFDNUMsa0hBQWtIO1lBQ2xILElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxLQUFLLEVBQUUsQ0FBQztZQUN0RCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBTUQseUNBQWUsR0FBZjtRQUFBLGlCQUVDO1FBREMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUExQixDQUEwQixDQUFDLENBQUM7SUFDekcsQ0FBQztJQUVELDZDQUFtQixHQUFuQjtRQUNFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3pGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNwQztJQUNILENBQUM7SUFFRCxxQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFuQ0Q7UUFEQyxLQUFLLENBQUMsYUFBYSxDQUFDOzs7bURBSXBCO0lBVUQ7UUFEQyxLQUFLLENBQUMsVUFBVSxDQUFDOzs7NkRBS2pCO0lBOUJVLGVBQWU7UUFYM0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixJQUFJLEVBQUU7Z0JBQ0osa0JBQWtCLEVBQUUsVUFBVTtnQkFDOUIsdUJBQXVCLEVBQUUsTUFBTTtnQkFDL0IsYUFBYSxFQUFFLFlBQVk7Z0JBQzNCLHNCQUFzQixFQUFFLFVBQVU7Z0JBQ2xDLGlCQUFpQixFQUFFLGtEQUFrRDthQUN0RTtZQUNELFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO1NBQzNDLENBQUM7aURBR29CLFdBQVc7WUFDakIsVUFBVTtZQUNJLG1CQUFtQjtZQUMzQixTQUFTO1lBQ0osYUFBYTtPQU4zQixlQUFlLENBaUQzQjtJQUFELHNCQUFDO0NBQUEsQUFqREQsSUFpREM7U0FqRFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbHJEcm9wZG93biB9IGZyb20gJy4vZHJvcGRvd24nO1xuaW1wb3J0IHsgQkFTSUNfRk9DVVNBQkxFX0lURU1fUFJPVklERVIgfSBmcm9tICcuLi8uLi91dGlscy9mb2N1cy9mb2N1c2FibGUtaXRlbS9iYXNpYy1mb2N1c2FibGUtaXRlbS5zZXJ2aWNlJztcbmltcG9ydCB7IEZvY3VzYWJsZUl0ZW0gfSBmcm9tICcuLi8uLi91dGlscy9mb2N1cy9mb2N1c2FibGUtaXRlbS9mb2N1c2FibGUtaXRlbSc7XG5pbXBvcnQgeyBSb290RHJvcGRvd25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZHJvcGRvd24uc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJEcm9wZG93bkl0ZW1dJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLmRyb3Bkb3duLWl0ZW1dJzogJ3RydWUnLFxuICAgICdbYXR0ci5yb2xlXSc6ICdcIm1lbnVpdGVtXCInLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1thdHRyLmRpc2FibGVkXSc6IFwiKGRpc2FibGVkICYmIHNldEJ5RGVwcmVjYXRlZERpc2FibGVkKT8gJycgOiBudWxsXCIsXG4gIH0sXG4gIHByb3ZpZGVyczogW0JBU0lDX0ZPQ1VTQUJMRV9JVEVNX1BST1ZJREVSXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRHJvcGRvd25JdGVtIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZHJvcGRvd246IENsckRyb3Bkb3duLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgX2Ryb3Bkb3duU2VydmljZTogUm9vdERyb3Bkb3duU2VydmljZSxcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBmb2N1c2FibGVJdGVtOiBGb2N1c2FibGVJdGVtXG4gICkge31cblxuICBwcml2YXRlIHVubGlzdGVuO1xuICBwdWJsaWMgc2V0QnlEZXByZWNhdGVkRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoJ2NsckRpc2FibGVkJylcbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgLy8gRW1wdHkgc3RyaW5nIGF0dHJpYnV0ZSBldmFsdWF0ZXMgdG8gZmFsc2UgYnV0IHNob3VsZCBkaXNhYmxlIHRoZSBpdGVtLCBzbyB3ZSBuZWVkIHRvIGFkZCBhIHNwZWNpYWwgY2FzZSBmb3IgaXQuXG4gICAgdGhpcy5mb2N1c2FibGVJdGVtLmRpc2FibGVkID0gISF2YWx1ZSB8fCB2YWx1ZSA9PT0gJyc7XG4gIH1cblxuICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9jdXNhYmxlSXRlbS5kaXNhYmxlZDtcbiAgfVxuXG4gIC8qXG4gICAqIEBkZXByZWNhdGVkIHNpbmNlIDMuMCwgcmVtb3ZlIGluIDQuMC4gdGhlIHByZXNlbmNlIG9mIHRoaXMgYXR0cmlidXRlIG1ha2VzIGl0IG5vdC1mb2N1c2FibGUgaW4gSUUxMS4gVXNlIFtjbHJEaXNhYmxlZF0gaW5wdXQgaW5zdGVhZC5cbiAgICovXG4gIEBJbnB1dCgnZGlzYWJsZWQnKVxuICBzZXQgZGlzYWJsZWREZXByZWNhdGVkKHZhbHVlOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgLy8gRW1wdHkgc3RyaW5nIGF0dHJpYnV0ZSBldmFsdWF0ZXMgdG8gZmFsc2UgYnV0IHNob3VsZCBkaXNhYmxlIHRoZSBpdGVtLCBzbyB3ZSBuZWVkIHRvIGFkZCBhIHNwZWNpYWwgY2FzZSBmb3IgaXQuXG4gICAgdGhpcy5mb2N1c2FibGVJdGVtLmRpc2FibGVkID0gISF2YWx1ZSB8fCB2YWx1ZSA9PT0gJyc7XG4gICAgdGhpcy5zZXRCeURlcHJlY2F0ZWREaXNhYmxlZCA9IHRydWU7XG4gIH1cblxuICBnZXQgZGlzYWJsZWREZXByZWNhdGVkKCkge1xuICAgIHJldHVybiB0aGlzLmZvY3VzYWJsZUl0ZW0uZGlzYWJsZWQ7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy51bmxpc3RlbiA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2NsaWNrJywgKCkgPT4gdGhpcy5vbkRyb3Bkb3duSXRlbUNsaWNrKCkpO1xuICB9XG5cbiAgb25Ecm9wZG93bkl0ZW1DbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kcm9wZG93bi5pc01lbnVDbG9zYWJsZSAmJiAhdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgICAgdGhpcy5fZHJvcGRvd25TZXJ2aWNlLmNsb3NlTWVudXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVubGlzdGVuKCk7XG4gIH1cbn1cbiJdfQ==