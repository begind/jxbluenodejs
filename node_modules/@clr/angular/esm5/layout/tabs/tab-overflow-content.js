import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, Injector, SkipSelf } from '@angular/core';
import { AbstractPopover } from '../../popover/common/abstract-popover';
import { Point } from '../../popover/common/popover';
var ClrTabOverflowContent = /** @class */ (function (_super) {
    tslib_1.__extends(ClrTabOverflowContent, _super);
    function ClrTabOverflowContent(injector, parentHost) {
        var _this = _super.call(this, injector, parentHost) || this;
        _this.anchorPoint = Point.BOTTOM_RIGHT;
        _this.popoverPoint = Point.RIGHT_TOP;
        _this.closeOnOutsideClick = true;
        return _this;
    }
    ClrTabOverflowContent = tslib_1.__decorate([
        Component({
            selector: 'clr-tab-overflow-content',
            template: "\n        <ng-content></ng-content>\n    ",
            host: {
                '[class.dropdown-menu]': 'true',
            }
        }),
        tslib_1.__param(1, SkipSelf()),
        tslib_1.__metadata("design:paramtypes", [Injector, ElementRef])
    ], ClrTabOverflowContent);
    return ClrTabOverflowContent;
}(AbstractPopover));
export { ClrTabOverflowContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW92ZXJmbG93LWNvbnRlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvdGFicy90YWItb3ZlcmZsb3ctY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQVdyRDtJQUEyQyxpREFBZTtJQUN4RCwrQkFBWSxRQUFrQixFQUFjLFVBQXNCO1FBQWxFLFlBQ0Usa0JBQU0sUUFBUSxFQUFFLFVBQVUsQ0FBQyxTQUk1QjtRQUhDLEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztRQUN0QyxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDcEMsS0FBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQzs7SUFDbEMsQ0FBQztJQU5VLHFCQUFxQjtRQVRqQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsMEJBQTBCO1lBQ3BDLFFBQVEsRUFBRSwyQ0FFUDtZQUNILElBQUksRUFBRTtnQkFDSix1QkFBdUIsRUFBRSxNQUFNO2FBQ2hDO1NBQ0YsQ0FBQztRQUVpQyxtQkFBQSxRQUFRLEVBQUUsQ0FBQTtpREFBckIsUUFBUSxFQUEwQixVQUFVO09BRHZELHFCQUFxQixDQU9qQztJQUFELDRCQUFDO0NBQUEsQUFQRCxDQUEyQyxlQUFlLEdBT3pEO1NBUFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbmplY3RvciwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWJzdHJhY3RQb3BvdmVyIH0gZnJvbSAnLi4vLi4vcG9wb3Zlci9jb21tb24vYWJzdHJhY3QtcG9wb3Zlcic7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uLy4uL3BvcG92ZXIvY29tbW9uL3BvcG92ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItdGFiLW92ZXJmbG93LWNvbnRlbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZHJvcGRvd24tbWVudV0nOiAndHJ1ZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsclRhYk92ZXJmbG93Q29udGVudCBleHRlbmRzIEFic3RyYWN0UG9wb3ZlciB7XG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3RvciwgQFNraXBTZWxmKCkgcGFyZW50SG9zdDogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGluamVjdG9yLCBwYXJlbnRIb3N0KTtcbiAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuQk9UVE9NX1JJR0hUO1xuICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuUklHSFRfVE9QO1xuICAgIHRoaXMuY2xvc2VPbk91dHNpZGVDbGljayA9IHRydWU7XG4gIH1cbn1cbiJdfQ==