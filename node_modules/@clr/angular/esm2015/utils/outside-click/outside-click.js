import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
let OutsideClick = class OutsideClick {
    constructor(el) {
        this.el = el;
        this.strict = false;
        this.outsideClick = new EventEmitter(false);
    }
    documentClick(event) {
        const target = event.target; // Get the element in the DOM on which the mouse was clicked
        const host = this.el.nativeElement; // Get the current actionMenu native HTML element
        if (target === host) {
            return;
        }
        if (!this.strict && host.contains(target)) {
            return;
        }
        this.outsideClick.emit(event);
    }
};
tslib_1.__decorate([
    Input('clrStrict'),
    tslib_1.__metadata("design:type", Object)
], OutsideClick.prototype, "strict", void 0);
tslib_1.__decorate([
    Output('clrOutsideClick'),
    tslib_1.__metadata("design:type", Object)
], OutsideClick.prototype, "outsideClick", void 0);
tslib_1.__decorate([
    HostListener('document:click', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [MouseEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], OutsideClick.prototype, "documentClick", null);
OutsideClick = tslib_1.__decorate([
    Directive({ selector: '[clrOutsideClick]' }),
    tslib_1.__metadata("design:paramtypes", [ElementRef])
], OutsideClick);
export { OutsideClick };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0c2lkZS1jbGljay5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL291dHNpZGUtY2xpY2svb3V0c2lkZS1jbGljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdqRyxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0lBQ3ZCLFlBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBRWQsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUVSLGlCQUFZLEdBQUcsSUFBSSxZQUFZLENBQU0sS0FBSyxDQUFDLENBQUM7SUFKbEMsQ0FBQztJQU90QyxhQUFhLENBQUMsS0FBaUI7UUFDN0IsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLDREQUE0RDtRQUN6RixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLGlEQUFpRDtRQUVyRixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDbkIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN6QyxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0YsQ0FBQTtBQWpCcUI7SUFBbkIsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7NENBQWdCO0FBRVI7SUFBMUIsTUFBTSxDQUFDLGlCQUFpQixDQUFDOztrREFBNkM7QUFHdkU7SUFEQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7NkNBQ3RCLFVBQVU7O2lEQVc5QjtBQW5CVSxZQUFZO0lBRHhCLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxDQUFDOzZDQUVuQixVQUFVO0dBRHZCLFlBQVksQ0FvQnhCO1NBcEJZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJPdXRzaWRlQ2xpY2tdJyB9KVxuZXhwb3J0IGNsYXNzIE91dHNpZGVDbGljayB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgQElucHV0KCdjbHJTdHJpY3QnKSBzdHJpY3QgPSBmYWxzZTtcblxuICBAT3V0cHV0KCdjbHJPdXRzaWRlQ2xpY2snKSBvdXRzaWRlQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oZmFsc2UpO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgZG9jdW1lbnRDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDsgLy8gR2V0IHRoZSBlbGVtZW50IGluIHRoZSBET00gb24gd2hpY2ggdGhlIG1vdXNlIHdhcyBjbGlja2VkXG4gICAgY29uc3QgaG9zdCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDsgLy8gR2V0IHRoZSBjdXJyZW50IGFjdGlvbk1lbnUgbmF0aXZlIEhUTUwgZWxlbWVudFxuXG4gICAgaWYgKHRhcmdldCA9PT0gaG9zdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuc3RyaWN0ICYmIGhvc3QuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm91dHNpZGVDbGljay5lbWl0KGV2ZW50KTtcbiAgfVxufVxuIl19