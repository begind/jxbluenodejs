/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '../../icon/icon.module';
import { ClrCommonPopoverModule } from '../../popover/common/popover.module';
import { ClrConditionalModule } from '../../utils/conditional/conditional.module';
import { ClrTemplateRefModule } from '../../utils/template-ref/template-ref.module';
import { ActiveOompaLoompa } from './chocolate/active-oompa-loompa';
import { TabsWillyWonka } from './chocolate/tabs-willy-wonka';
import { ClrTab } from './tab';
import { ClrTabContent } from './tab-content';
import { ClrTabLink } from './tab-link.directive';
import { ClrTabOverflowContent } from './tab-overflow-content';
import { ClrTabs } from './tabs';
import { ClrKeyFocusModule } from '../../utils/focus/key-focus/key-focus.module';
export var CLR_TABS_DIRECTIVES = [
    ClrTabContent,
    ClrTab,
    ClrTabs,
    ClrTabOverflowContent,
    ClrTabLink,
    TabsWillyWonka,
    ActiveOompaLoompa,
];
var ClrTabsModule = /** @class */ (function () {
    function ClrTabsModule() {
    }
    ClrTabsModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                ClrCommonPopoverModule,
                ClrConditionalModule,
                ClrIconModule,
                ClrTemplateRefModule,
                ClrKeyFocusModule,
            ],
            declarations: [CLR_TABS_DIRECTIVES],
            exports: [CLR_TABS_DIRECTIVES, ClrConditionalModule],
        })
    ], ClrTabsModule);
    return ClrTabsModule;
}());
export { ClrTabsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvdGFicy90YWJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFRLE1BQU0sZUFBZSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNsRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUVwRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBRWpGLE1BQU0sQ0FBQyxJQUFNLG1CQUFtQixHQUFnQjtJQUM5QyxhQUFhO0lBQ2IsTUFBTTtJQUNOLE9BQU87SUFDUCxxQkFBcUI7SUFDckIsVUFBVTtJQUNWLGNBQWM7SUFDZCxpQkFBaUI7Q0FDbEIsQ0FBQztBQWNGO0lBQUE7SUFBNEIsQ0FBQztJQUFoQixhQUFhO1FBWnpCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLHNCQUFzQjtnQkFDdEIsb0JBQW9CO2dCQUNwQixhQUFhO2dCQUNiLG9CQUFvQjtnQkFDcEIsaUJBQWlCO2FBQ2xCO1lBQ0QsWUFBWSxFQUFFLENBQUMsbUJBQW1CLENBQUM7WUFDbkMsT0FBTyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsb0JBQW9CLENBQUM7U0FDckQsQ0FBQztPQUNXLGFBQWEsQ0FBRztJQUFELG9CQUFDO0NBQUEsQUFBN0IsSUFBNkI7U0FBaEIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENsckljb25Nb2R1bGUgfSBmcm9tICcuLi8uLi9pY29uL2ljb24ubW9kdWxlJztcbmltcG9ydCB7IENsckNvbW1vblBvcG92ZXJNb2R1bGUgfSBmcm9tICcuLi8uLi9wb3BvdmVyL2NvbW1vbi9wb3BvdmVyLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJDb25kaXRpb25hbE1vZHVsZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2NvbmRpdGlvbmFsLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJUZW1wbGF0ZVJlZk1vZHVsZSB9IGZyb20gJy4uLy4uL3V0aWxzL3RlbXBsYXRlLXJlZi90ZW1wbGF0ZS1yZWYubW9kdWxlJztcblxuaW1wb3J0IHsgQWN0aXZlT29tcGFMb29tcGEgfSBmcm9tICcuL2Nob2NvbGF0ZS9hY3RpdmUtb29tcGEtbG9vbXBhJztcbmltcG9ydCB7IFRhYnNXaWxseVdvbmthIH0gZnJvbSAnLi9jaG9jb2xhdGUvdGFicy13aWxseS13b25rYSc7XG5pbXBvcnQgeyBDbHJUYWIgfSBmcm9tICcuL3RhYic7XG5pbXBvcnQgeyBDbHJUYWJDb250ZW50IH0gZnJvbSAnLi90YWItY29udGVudCc7XG5pbXBvcnQgeyBDbHJUYWJMaW5rIH0gZnJvbSAnLi90YWItbGluay5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2xyVGFiT3ZlcmZsb3dDb250ZW50IH0gZnJvbSAnLi90YWItb3ZlcmZsb3ctY29udGVudCc7XG5pbXBvcnQgeyBDbHJUYWJzIH0gZnJvbSAnLi90YWJzJztcbmltcG9ydCB7IENscktleUZvY3VzTW9kdWxlIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9jdXMva2V5LWZvY3VzL2tleS1mb2N1cy5tb2R1bGUnO1xuXG5leHBvcnQgY29uc3QgQ0xSX1RBQlNfRElSRUNUSVZFUzogVHlwZTxhbnk+W10gPSBbXG4gIENsclRhYkNvbnRlbnQsXG4gIENsclRhYixcbiAgQ2xyVGFicyxcbiAgQ2xyVGFiT3ZlcmZsb3dDb250ZW50LFxuICBDbHJUYWJMaW5rLFxuICBUYWJzV2lsbHlXb25rYSxcbiAgQWN0aXZlT29tcGFMb29tcGEsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENsckNvbW1vblBvcG92ZXJNb2R1bGUsXG4gICAgQ2xyQ29uZGl0aW9uYWxNb2R1bGUsXG4gICAgQ2xySWNvbk1vZHVsZSxcbiAgICBDbHJUZW1wbGF0ZVJlZk1vZHVsZSxcbiAgICBDbHJLZXlGb2N1c01vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ0xSX1RBQlNfRElSRUNUSVZFU10sXG4gIGV4cG9ydHM6IFtDTFJfVEFCU19ESVJFQ1RJVkVTLCBDbHJDb25kaXRpb25hbE1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIENsclRhYnNNb2R1bGUge31cbiJdfQ==