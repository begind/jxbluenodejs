/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '../../icon/icon.module';
import { ClrCommonPopoverModule } from '../../popover/common/popover.module';
import { ClrButton } from './button';
import { ClrButtonGroup } from './button-group';
export var CLR_BUTTON_GROUP_DIRECTIVES = [ClrButton, ClrButtonGroup];
var ClrButtonGroupModule = /** @class */ (function () {
    function ClrButtonGroupModule() {
    }
    ClrButtonGroupModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, ClrIconModule, ClrCommonPopoverModule],
            declarations: [CLR_BUTTON_GROUP_DIRECTIVES],
            exports: [CLR_BUTTON_GROUP_DIRECTIVES],
        })
    ], ClrButtonGroupModule);
    return ClrButtonGroupModule;
}());
export { ClrButtonGroupModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWdyb3VwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImJ1dHRvbi9idXR0b24tZ3JvdXAvYnV0dG9uLWdyb3VwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFRLE1BQU0sZUFBZSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUU3RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRCxNQUFNLENBQUMsSUFBTSwyQkFBMkIsR0FBZ0IsQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFPcEY7SUFBQTtJQUFtQyxDQUFDO0lBQXZCLG9CQUFvQjtRQUxoQyxRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLHNCQUFzQixDQUFDO1lBQzlELFlBQVksRUFBRSxDQUFDLDJCQUEyQixDQUFDO1lBQzNDLE9BQU8sRUFBRSxDQUFDLDJCQUEyQixDQUFDO1NBQ3ZDLENBQUM7T0FDVyxvQkFBb0IsQ0FBRztJQUFELDJCQUFDO0NBQUEsQUFBcEMsSUFBb0M7U0FBdkIsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xySWNvbk1vZHVsZSB9IGZyb20gJy4uLy4uL2ljb24vaWNvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uUG9wb3Zlck1vZHVsZSB9IGZyb20gJy4uLy4uL3BvcG92ZXIvY29tbW9uL3BvcG92ZXIubW9kdWxlJztcblxuaW1wb3J0IHsgQ2xyQnV0dG9uIH0gZnJvbSAnLi9idXR0b24nO1xuaW1wb3J0IHsgQ2xyQnV0dG9uR3JvdXAgfSBmcm9tICcuL2J1dHRvbi1ncm91cCc7XG5cbmV4cG9ydCBjb25zdCBDTFJfQlVUVE9OX0dST1VQX0RJUkVDVElWRVM6IFR5cGU8YW55PltdID0gW0NsckJ1dHRvbiwgQ2xyQnV0dG9uR3JvdXBdO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBDbHJJY29uTW9kdWxlLCBDbHJDb21tb25Qb3BvdmVyTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQ0xSX0JVVFRPTl9HUk9VUF9ESVJFQ1RJVkVTXSxcbiAgZXhwb3J0czogW0NMUl9CVVRUT05fR1JPVVBfRElSRUNUSVZFU10sXG59KVxuZXhwb3J0IGNsYXNzIENsckJ1dHRvbkdyb3VwTW9kdWxlIHt9XG4iXX0=