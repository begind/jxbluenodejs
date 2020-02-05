/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ContentChildren, ElementRef, HostListener, Input, QueryList } from '@angular/core';
import { Point } from '../../popover/common/popover';
import { CLR_MENU_POSITIONS } from '../../popover/dropdown/menu-positions';
import { ButtonInGroupService } from '../providers/button-in-group.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { ClrButton } from './button';
let ClrButtonGroup = class ClrButtonGroup {
    constructor(buttonGroupNewService, elementRef, commonStrings) {
        this.buttonGroupNewService = buttonGroupNewService;
        this.elementRef = elementRef;
        this.commonStrings = commonStrings;
        this.inlineButtons = [];
        this.menuButtons = [];
        this._openMenu = false;
        this.anchorPoint = Point.BOTTOM_LEFT; // default if menuPosition isn't set
        this.popoverPoint = Point.LEFT_TOP; // default if menuPosition isn't set
        /**
         * Flag with indicates if the overflow menu toggle was clicked.
         * If true, this can save us traversing the DOM to find
         * whether the click was withing the button group toggle
         * or menu in the onMouseClick method
         */
        this._overflowMenuToggleClicked = false;
    }
    /**
     * 1. Initializes the initial Button Group View
     * 2. Subscribes to changes on the ContentChildren
     *    in case the user content projection changes
     */
    ngAfterContentInit() {
        this.initializeButtons();
        this.buttonGroupNewService.changes.subscribe(button => this.rearrangeButton(button));
        this.buttons.changes.subscribe(() => {
            this.initializeButtons();
        });
    }
    /**
     * Moves the button into the other ViewContainer
     * when an update is received.
     *
     * @param button
     */
    rearrangeButton(button) {
        let fromView;
        let toView;
        if (button.inMenu) {
            fromView = this.inlineButtons;
            toView = this.menuButtons;
        }
        else {
            fromView = this.menuButtons;
            toView = this.inlineButtons;
        }
        const index = fromView.indexOf(button);
        if (index > -1) {
            fromView.splice(index, 1);
            const moveIndex = this.getMoveIndex(button);
            if (moveIndex <= toView.length) {
                toView.splice(moveIndex, 0, button);
            }
        }
    }
    /**
     * Author: Eudes
     *
     * Finds the order of a button w.r.t other buttons
     *
     * @param buttonToMove
     * @returns
     */
    getMoveIndex(buttonToMove) {
        const tempArr = this.buttons.filter(button => button.inMenu === buttonToMove.inMenu);
        return tempArr.indexOf(buttonToMove);
    }
    initializeButtons() {
        const tempInlineButtons = [];
        const tempInMenuButtons = [];
        this.buttons.forEach(button => {
            if (button.inMenu) {
                tempInMenuButtons.push(button);
            }
            else {
                tempInlineButtons.push(button);
            }
        });
        this.inlineButtons = tempInlineButtons;
        this.menuButtons = tempInMenuButtons;
    }
    get menuPosition() {
        return this._menuPosition;
    }
    set menuPosition(pos) {
        if (pos && CLR_MENU_POSITIONS.indexOf(pos) > -1) {
            this._menuPosition = pos;
        }
        else {
            this._menuPosition = 'bottom-left';
        }
        // set the popover values based on menu position
        switch (this._menuPosition) {
            case 'top-right':
                this.anchorPoint = Point.TOP_RIGHT;
                this.popoverPoint = Point.RIGHT_BOTTOM;
                break;
            case 'top-left':
                this.anchorPoint = Point.TOP_LEFT;
                this.popoverPoint = Point.LEFT_BOTTOM;
                break;
            case 'bottom-right':
                this.anchorPoint = Point.BOTTOM_RIGHT;
                this.popoverPoint = Point.RIGHT_TOP;
                break;
            case 'bottom-left':
                this.anchorPoint = Point.BOTTOM_LEFT;
                this.popoverPoint = Point.LEFT_TOP;
                break;
            case 'right-top':
                this.anchorPoint = Point.RIGHT_TOP;
                this.popoverPoint = Point.LEFT_TOP;
                break;
            case 'right-bottom':
                this.anchorPoint = Point.RIGHT_BOTTOM;
                this.popoverPoint = Point.LEFT_BOTTOM;
                break;
            case 'left-top':
                this.anchorPoint = Point.LEFT_TOP;
                this.popoverPoint = Point.RIGHT_TOP;
                break;
            case 'left-bottom':
                this.anchorPoint = Point.LEFT_BOTTOM;
                this.popoverPoint = Point.RIGHT_BOTTOM;
                break;
            default:
                this.anchorPoint = Point.BOTTOM_LEFT;
                this.popoverPoint = Point.LEFT_TOP;
                break;
        }
    }
    get openMenu() {
        return this._openMenu;
    }
    set openMenu(value) {
        this._openMenu = value;
    }
    /**
     * Toggle the ClrDropdown Menu when the ClrDropdown Toggle is
     * clicked. Also set a flag that indicates that the toggle
     * was clicked so that we don't traverse the DOM to find the
     * location of the click.
     */
    toggleMenu() {
        this.openMenu = !this.openMenu;
        this._overflowMenuToggleClicked = true;
    }
    // TODO: Generic Directive to handle this
    /**
     * Called on mouse clicks anywhere in the DOM.
     * Checks to see if the mouseclick happened on the host or outside
     */
    onMouseClick(target) {
        if (this.openMenu && !this._overflowMenuToggleClicked) {
            // Reset the overflow menu toggle clicked flag
            this._overflowMenuToggleClicked = false;
            let current = target; // Get the element in the DOM on which the mouse was clicked
            const host = this.elementRef.nativeElement; // Current Button Group
            if (current.classList.contains('dropdown-menu')) {
                current = current.parentNode;
                while (current) {
                    if (current === document) {
                        this.openMenu = false;
                        return;
                    }
                    // If clicked on dropdown menu and menu is in host
                    // do nothing
                    if (current === host) {
                        return;
                    }
                    current = current.parentNode;
                }
            }
            this.openMenu = false;
        }
        this._overflowMenuToggleClicked = false; // Reset the overflow menu toggle clicked flag
    }
};
tslib_1.__decorate([
    ContentChildren(ClrButton),
    tslib_1.__metadata("design:type", QueryList)
], ClrButtonGroup.prototype, "buttons", void 0);
tslib_1.__decorate([
    Input('clrMenuPosition'),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], ClrButtonGroup.prototype, "menuPosition", null);
tslib_1.__decorate([
    HostListener('document:click', ['$event.target']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ClrButtonGroup.prototype, "onMouseClick", null);
ClrButtonGroup = tslib_1.__decorate([
    Component({
        selector: 'clr-button-group',
        template: "<!--\n  ~ Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<ng-container *ngFor=\"let inlineButton of inlineButtons\">\n    <ng-template [ngTemplateOutlet]=\"inlineButton.templateRef\"></ng-template>\n</ng-container>\n<ng-container *ngIf=\"menuButtons.length > 0\">\n    <div\n        class=\"btn-group-overflow open\"\n        [ngClass]=\"menuPosition\"\n        #anchor>\n        <button\n            class=\"btn dropdown-toggle\"\n            (click)=\"toggleMenu()\">\n            <clr-icon shape=\"ellipsis-horizontal\" [attr.title]=\"commonStrings.keys.more\"></clr-icon>\n        </button>\n        <div\n            class=\"dropdown-menu\"\n            *clrPopoverOld=\"openMenu; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint;\">\n            <ng-template [ngTemplateOutlet]=\"ref\"></ng-template>\n        </div>\n    </div>\n</ng-container>\n<ng-template #ref>\n    <ng-container *ngFor=\"let menuButton of menuButtons\">\n        <ng-template [ngTemplateOutlet]=\"menuButton.templateRef\"></ng-template>\n    </ng-container>\n</ng-template>\n",
        providers: [ButtonInGroupService],
        host: { '[class.btn-group]': 'true' }
    }),
    tslib_1.__metadata("design:paramtypes", [ButtonInGroupService,
        ElementRef,
        ClrCommonStringsService])
], ClrButtonGroup);
export { ClrButtonGroup };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWdyb3VwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiYnV0dG9uL2J1dHRvbi1ncm91cC9idXR0b24tZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkcsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRWxGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFRckMsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUd6QixZQUNTLHFCQUEyQyxFQUMxQyxVQUFzQixFQUN2QixhQUFzQztRQUZ0QywwQkFBcUIsR0FBckIscUJBQXFCLENBQXNCO1FBQzFDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdkIsa0JBQWEsR0FBYixhQUFhLENBQXlCO1FBRy9DLGtCQUFhLEdBQWdCLEVBQUUsQ0FBQztRQUNoQyxnQkFBVyxHQUFnQixFQUFFLENBQUM7UUFnSXRCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFVNUIsZ0JBQVcsR0FBVSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsb0NBQW9DO1FBQzVFLGlCQUFZLEdBQVUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLG9DQUFvQztRQWFqRjs7Ozs7V0FLRztRQUNLLCtCQUEwQixHQUFZLEtBQUssQ0FBQztJQWpLakQsQ0FBQztJQUtKOzs7O09BSUc7SUFDSCxrQkFBa0I7UUFDaEIsSUFBSSxD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T0FBTyxDQUFDLFVBQVUsQ0FBQztpQkFDOUI7YUFDRjtZQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxDQUFDLDBCQUEwQixHQUFHLEtBQUssQ0FBQyxDQUFDLDhDQUE4QztJQUN6RixDQUFDO0NBQ0YsQ0FBQTtBQTFNNkI7SUFBM0IsZUFBZSxDQUFDLFNBQVMsQ0FBQztzQ0FBVSxTQUFTOytDQUFZO0FBMEYxRDtJQURDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQzs7O2tEQThDeEI7QUF3Q0Q7SUFEQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7OztrREEyQmpEO0FBMU1VLGNBQWM7SUFOMUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixzdUNBQWdDO1FBQ2hDLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDO1FBQ2pDLElBQUksRUFBRSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sRUFBRTtLQUN0QyxDQUFDOzZDQUtnQyxvQkFBb0I7UUFDOUIsVUFBVTtRQUNSLHVCQUF1QjtHQU5wQyxjQUFjLENBMk0xQjtTQTNNWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vLi4vcG9wb3Zlci9jb21tb24vcG9wb3Zlcic7XG5pbXBvcnQgeyBDTFJfTUVOVV9QT1NJVElPTlMgfSBmcm9tICcuLi8uLi9wb3BvdmVyL2Ryb3Bkb3duL21lbnUtcG9zaXRpb25zJztcbmltcG9ydCB7IEJ1dHRvbkluR3JvdXBTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2J1dHRvbi1pbi1ncm91cC5zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQ2xyQnV0dG9uIH0gZnJvbSAnLi9idXR0b24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItYnV0dG9uLWdyb3VwJyxcbiAgdGVtcGxhdGVVcmw6ICdidXR0b24tZ3JvdXAuaHRtbCcsXG4gIHByb3ZpZGVyczogW0J1dHRvbkluR3JvdXBTZXJ2aWNlXSxcbiAgaG9zdDogeyAnW2NsYXNzLmJ0bi1ncm91cF0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQnV0dG9uR3JvdXAge1xuICBAQ29udGVudENoaWxkcmVuKENsckJ1dHRvbikgYnV0dG9uczogUXVlcnlMaXN0PENsckJ1dHRvbj47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGJ1dHRvbkdyb3VwTmV3U2VydmljZTogQnV0dG9uSW5Hcm91cFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzU2VydmljZVxuICApIHt9XG5cbiAgaW5saW5lQnV0dG9uczogQ2xyQnV0dG9uW10gPSBbXTtcbiAgbWVudUJ1dHRvbnM6IENsckJ1dHRvbltdID0gW107XG5cbiAgLyoqXG4gICAqIDEuIEluaXRpYWxpemVzIHRoZSBpbml0aWFsIEJ1dHRvbiBHcm91cCBWaWV3XG4gICAqIDIuIFN1YnNjcmliZXMgdG8gY2hhbmdlcyBvbiB0aGUgQ29udGVudENoaWxkcmVuXG4gICAqICAgIGluIGNhc2UgdGhlIHVzZXIgY29udGVudCBwcm9qZWN0aW9uIGNoYW5nZXNcbiAgICovXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVCdXR0b25zKCk7XG4gICAgdGhpcy5idXR0b25Hcm91cE5ld1NlcnZpY2UuY2hhbmdlcy5zdWJzY3JpYmUoYnV0dG9uID0+IHRoaXMucmVhcnJhbmdlQnV0dG9uKGJ1dHRvbikpO1xuICAgIHRoaXMuYnV0dG9ucy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmluaXRpYWxpemVCdXR0b25zKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgdGhlIGJ1dHRvbiBpbnRvIHRoZSBvdGhlciBWaWV3Q29udGFpbmVyXG4gICAqIHdoZW4gYW4gdXBkYXRlIGlzIHJlY2VpdmVkLlxuICAgKlxuICAgKiBAcGFyYW0gYnV0dG9uXG4gICAqL1xuICByZWFycmFuZ2VCdXR0b24oYnV0dG9uOiBDbHJCdXR0b24pOiB2b2lkIHtcbiAgICBsZXQgZnJvbVZpZXc6IENsckJ1dHRvbltdO1xuICAgIGxldCB0b1ZpZXc6IENsckJ1dHRvbltdO1xuICAgIGlmIChidXR0b24uaW5NZW51KSB7XG4gICAgICBmcm9tVmlldyA9IHRoaXMuaW5saW5lQnV0dG9ucztcbiAgICAgIHRvVmlldyA9IHRoaXMubWVudUJ1dHRvbnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyb21WaWV3ID0gdGhpcy5tZW51QnV0dG9ucztcbiAgICAgIHRvVmlldyA9IHRoaXMuaW5saW5lQnV0dG9ucztcbiAgICB9XG4gICAgY29uc3QgaW5kZXg6IG51bWJlciA9IGZyb21WaWV3LmluZGV4T2YoYnV0dG9uKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgZnJvbVZpZXcuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGNvbnN0IG1vdmVJbmRleCA9IHRoaXMuZ2V0TW92ZUluZGV4KGJ1dHRvbik7XG4gICAgICBpZiAobW92ZUluZGV4IDw9IHRvVmlldy5sZW5ndGgpIHtcbiAgICAgICAgdG9WaWV3LnNwbGljZShtb3ZlSW5kZXgsIDAsIGJ1dHRvbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF1dGhvcjogRXVkZXNcbiAgICpcbiAgICogRmluZHMgdGhlIG9yZGVyIG9mIGEgYnV0dG9uIHcuci50IG90aGVyIGJ1dHRvbnNcbiAgICpcbiAgICogQHBhcmFtIGJ1dHRvblRvTW92ZVxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgZ2V0TW92ZUluZGV4KGJ1dHRvblRvTW92ZTogQ2xyQnV0dG9uKTogbnVtYmVyIHtcbiAgICBjb25zdCB0ZW1wQXJyOiBDbHJCdXR0b25bXSA9IHRoaXMuYnV0dG9ucy5maWx0ZXIoYnV0dG9uID0+IGJ1dHRvbi5pbk1lbnUgPT09IGJ1dHRvblRvTW92ZS5pbk1lbnUpO1xuICAgIHJldHVybiB0ZW1wQXJyLmluZGV4T2YoYnV0dG9uVG9Nb3ZlKTtcbiAgfVxuXG4gIGluaXRpYWxpemVCdXR0b25zKCk6IHZvaWQge1xuICAgIGNvbnN0IHRlbXBJbmxpbmVCdXR0b25zOiBDbHJCdXR0b25bXSA9IFtdO1xuICAgIGNvbnN0IHRlbXBJbk1lbnVCdXR0b25zOiBDbHJCdXR0b25bXSA9IFtdO1xuICAgIHRoaXMuYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICBpZiAoYnV0dG9uLmluTWVudSkge1xuICAgICAgICB0ZW1wSW5NZW51QnV0dG9ucy5wdXNoKGJ1dHRvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZW1wSW5saW5lQnV0dG9ucy5wdXNoKGJ1dHRvbik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pbmxpbmVCdXR0b25zID0gdGVtcElubGluZUJ1dHRvbnM7XG4gICAgdGhpcy5tZW51QnV0dG9ucyA9IHRlbXBJbk1lbnVCdXR0b25zO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJmbG93IE1lbnVcbiAgICpcbiAgICovXG5cbiAgLy8gSW5kaWNhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgb3ZlcmZsb3cgbWVudVxuICBwcml2YXRlIF9tZW51UG9zaXRpb246IHN0cmluZztcblxuICBnZXQgbWVudVBvc2l0aW9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX21lbnVQb3NpdGlvbjtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyTWVudVBvc2l0aW9uJylcbiAgc2V0IG1lbnVQb3NpdGlvbihwb3M6IHN0cmluZykge1xuICAgIGlmIChwb3MgJiYgQ0xSX01FTlVfUE9TSVRJT05TLmluZGV4T2YocG9zKSA+IC0xKSB7XG4gICAgICB0aGlzLl9tZW51UG9zaXRpb24gPSBwb3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX21lbnVQb3NpdGlvbiA9ICdib3R0b20tbGVmdCc7XG4gICAgfVxuICAgIC8vIHNldCB0aGUgcG9wb3ZlciB2YWx1ZXMgYmFzZWQgb24gbWVudSBwb3NpdGlvblxuICAgIHN3aXRjaCAodGhpcy5fbWVudVBvc2l0aW9uKSB7XG4gICAgICBjYXNlICd0b3AtcmlnaHQnOlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuVE9QX1JJR0hUO1xuICAgICAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LlJJR0hUX0JPVFRPTTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0b3AtbGVmdCc6XG4gICAgICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5UT1BfTEVGVDtcbiAgICAgICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5MRUZUX0JPVFRPTTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20tcmlnaHQnOlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuQk9UVE9NX1JJR0hUO1xuICAgICAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LlJJR0hUX1RPUDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20tbGVmdCc6XG4gICAgICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5CT1RUT01fTEVGVDtcbiAgICAgICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5MRUZUX1RPUDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodC10b3AnOlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuUklHSFRfVE9QO1xuICAgICAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LkxFRlRfVE9QO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0LWJvdHRvbSc6XG4gICAgICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5SSUdIVF9CT1RUT007XG4gICAgICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuTEVGVF9CT1RUT007XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdC10b3AnOlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuTEVGVF9UT1A7XG4gICAgICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuUklHSFRfVE9QO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xlZnQtYm90dG9tJzpcbiAgICAgICAgdGhpcy5hbmNob3JQb2ludCA9IFBvaW50LkxFRlRfQk9UVE9NO1xuICAgICAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LlJJR0hUX0JPVFRPTTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuQk9UVE9NX0xFRlQ7XG4gICAgICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuTEVGVF9UT1A7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29wZW5NZW51OiBib29sZWFuID0gZmFsc2U7XG5cbiAgZ2V0IG9wZW5NZW51KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9vcGVuTWVudTtcbiAgfVxuXG4gIHNldCBvcGVuTWVudSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX29wZW5NZW51ID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgYW5jaG9yUG9pbnQ6IFBvaW50ID0gUG9pbnQuQk9UVE9NX0xFRlQ7IC8vIGRlZmF1bHQgaWYgbWVudVBvc2l0aW9uIGlzbid0IHNldFxuICBwdWJsaWMgcG9wb3ZlclBvaW50OiBQb2ludCA9IFBvaW50LkxFRlRfVE9QOyAvLyBkZWZhdWx0IGlmIG1lbnVQb3NpdGlvbiBpc24ndCBzZXRcblxuICAvKipcbiAgICogVG9nZ2xlIHRoZSBDbHJEcm9wZG93biBNZW51IHdoZW4gdGhlIENsckRyb3Bkb3duIFRvZ2dsZSBpc1xuICAgKiBjbGlja2VkLiBBbHNvIHNldCBhIGZsYWcgdGhhdCBpbmRpY2F0ZXMgdGhhdCB0aGUgdG9nZ2xlXG4gICAqIHdhcyBjbGlja2VkIHNvIHRoYXQgd2UgZG9uJ3QgdHJhdmVyc2UgdGhlIERPTSB0byBmaW5kIHRoZVxuICAgKiBsb2NhdGlvbiBvZiB0aGUgY2xpY2suXG4gICAqL1xuICB0b2dnbGVNZW51KCk6IHZvaWQge1xuICAgIHRoaXMub3Blbk1lbnUgPSAhdGhpcy5vcGVuTWVudTtcbiAgICB0aGlzLl9vdmVyZmxvd01lbnVUb2dnbGVDbGlja2VkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGbGFnIHdpdGggaW5kaWNhdGVzIGlmIHRoZSBvdmVyZmxvdyBtZW51IHRvZ2dsZSB3YXMgY2xpY2tlZC5cbiAgICogSWYgdHJ1ZSwgdGhpcyBjYW4gc2F2ZSB1cyB0cmF2ZXJzaW5nIHRoZSBET00gdG8gZmluZFxuICAgKiB3aGV0aGVyIHRoZSBjbGljayB3YXMgd2l0aGluZyB0aGUgYnV0dG9uIGdyb3VwIHRvZ2dsZVxuICAgKiBvciBtZW51IGluIHRoZSBvbk1vdXNlQ2xpY2sgbWV0aG9kXG4gICAqL1xuICBwcml2YXRlIF9vdmVyZmxvd01lbnVUb2dnbGVDbGlja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLy8gVE9ETzogR2VuZXJpYyBEaXJlY3RpdmUgdG8gaGFuZGxlIHRoaXNcbiAgLyoqXG4gICAqIENhbGxlZCBvbiBtb3VzZSBjbGlja3MgYW55d2hlcmUgaW4gdGhlIERPTS5cbiAgICogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgbW91c2VjbGljayBoYXBwZW5lZCBvbiB0aGUgaG9zdCBvciBvdXRzaWRlXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50LnRhcmdldCddKVxuICBvbk1vdXNlQ2xpY2sodGFyZ2V0OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vcGVuTWVudSAmJiAhdGhpcy5fb3ZlcmZsb3dNZW51VG9nZ2xlQ2xpY2tlZCkge1xuICAgICAgLy8gUmVzZXQgdGhlIG92ZXJmbG93IG1lbnUgdG9nZ2xlIGNsaWNrZWQgZmxhZ1xuICAgICAgdGhpcy5fb3ZlcmZsb3dNZW51VG9nZ2xlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgbGV0IGN1cnJlbnQ6IGFueSA9IHRhcmdldDsgLy8gR2V0IHRoZSBlbGVtZW50IGluIHRoZSBET00gb24gd2hpY2ggdGhlIG1vdXNlIHdhcyBjbGlja2VkXG4gICAgICBjb25zdCBob3N0OiBhbnkgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDsgLy8gQ3VycmVudCBCdXR0b24gR3JvdXBcblxuICAgICAgaWYgKGN1cnJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wZG93bi1tZW51JykpIHtcbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50Tm9kZTtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQpIHtcbiAgICAgICAgICBpZiAoY3VycmVudCA9PT0gZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMub3Blbk1lbnUgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBJZiBjbGlja2VkIG9uIGRyb3Bkb3duIG1lbnUgYW5kIG1lbnUgaXMgaW4gaG9zdFxuICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgICBpZiAoY3VycmVudCA9PT0gaG9zdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLm9wZW5NZW51ID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX292ZXJmbG93TWVudVRvZ2dsZUNsaWNrZWQgPSBmYWxzZTsgLy8gUmVzZXQgdGhlIG92ZXJmbG93IG1lbnUgdG9nZ2xlIGNsaWNrZWQgZmxhZ1xuICB9XG59XG4iXX0=