import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, Inject } from '@angular/core';
import { IF_ACTIVE_ID, IF_ACTIVE_ID_PROVIDER, IfActiveService } from '../../utils/conditional/if-active.service';
import { AriaService } from './providers/aria.service';
import { TabsService } from './providers/tabs.service';
import { ClrTabContent } from './tab-content';
import { ClrTabLink } from './tab-link.directive';
let ClrTab = class ClrTab {
    constructor(ifActiveService, id, tabsService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.tabsService = tabsService;
        tabsService.register(this);
    }
    ngOnDestroy() {
        this.tabsService.unregister(this);
    }
    get active() {
        return this.ifActiveService.current === this.id;
    }
};
tslib_1.__decorate([
    ContentChild(ClrTabLink, { static: true }),
    tslib_1.__metadata("design:type", ClrTabLink)
], ClrTab.prototype, "tabLink", void 0);
tslib_1.__decorate([
    ContentChild(ClrTabContent, { static: true }),
    tslib_1.__metadata("design:type", ClrTabContent)
], ClrTab.prototype, "tabContent", void 0);
ClrTab = tslib_1.__decorate([
    Component({
        selector: 'clr-tab',
        template: `
        <ng-content></ng-content>
    `,
        providers: [IF_ACTIVE_ID_PROVIDER, AriaService]
    }),
    tslib_1.__param(1, Inject(IF_ACTIVE_ID)),
    tslib_1.__metadata("design:paramtypes", [IfActiveService, Number, TabsService])
], ClrTab);
export { ClrTab };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3RhYnMvdGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWhFLE9BQU8sRUFBRSxZQUFZLEVBQUUscUJBQXFCLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFakgsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQVNsRCxJQUFhLE1BQU0sR0FBbkIsTUFBYSxNQUFNO0lBTWpCLFlBQ1MsZUFBZ0MsRUFDVixFQUFVLEVBQy9CLFdBQXdCO1FBRnpCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNWLE9BQUUsR0FBRixFQUFFLENBQVE7UUFDL0IsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFFaEMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbEQsQ0FBQztDQUNGLENBQUE7QUFuQkM7SUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO3NDQUNsQyxVQUFVO3VDQUFDO0FBRXBCO0lBREMsWUFBWSxDQUFDLGFBQWEsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztzQ0FDbEMsYUFBYTswQ0FBQztBQUpmLE1BQU07SUFQbEIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFNBQVM7UUFDbkIsUUFBUSxFQUFFOztLQUVQO1FBQ0gsU0FBUyxFQUFFLENBQUMscUJBQXFCLEVBQUUsV0FBVyxDQUFDO0tBQ2hELENBQUM7SUFTRyxtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7NkNBREcsZUFBZSxVQUVsQixXQUFXO0dBVHZCLE1BQU0sQ0FxQmxCO1NBckJZLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IElGX0FDVElWRV9JRCwgSUZfQUNUSVZFX0lEX1BST1ZJREVSLCBJZkFjdGl2ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1hY3RpdmUuc2VydmljZSc7XG5cbmltcG9ydCB7IEFyaWFTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvYXJpYS5zZXJ2aWNlJztcbmltcG9ydCB7IFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdGFicy5zZXJ2aWNlJztcbmltcG9ydCB7IENsclRhYkNvbnRlbnQgfSBmcm9tICcuL3RhYi1jb250ZW50JztcbmltcG9ydCB7IENsclRhYkxpbmsgfSBmcm9tICcuL3RhYi1saW5rLmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci10YWInLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgcHJvdmlkZXJzOiBbSUZfQUNUSVZFX0lEX1BST1ZJREVSLCBBcmlhU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENsclRhYiB7XG4gIEBDb250ZW50Q2hpbGQoQ2xyVGFiTGluaywgeyBzdGF0aWM6IHRydWUgfSlcbiAgdGFiTGluazogQ2xyVGFiTGluaztcbiAgQENvbnRlbnRDaGlsZChDbHJUYWJDb250ZW50LCB7IHN0YXRpYzogdHJ1ZSB9KVxuICB0YWJDb250ZW50OiBDbHJUYWJDb250ZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpZkFjdGl2ZVNlcnZpY2U6IElmQWN0aXZlU2VydmljZSxcbiAgICBASW5qZWN0KElGX0FDVElWRV9JRCkgcHVibGljIGlkOiBudW1iZXIsXG4gICAgcHJpdmF0ZSB0YWJzU2VydmljZTogVGFic1NlcnZpY2VcbiAgKSB7XG4gICAgdGFic1NlcnZpY2UucmVnaXN0ZXIodGhpcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnRhYnNTZXJ2aWNlLnVucmVnaXN0ZXIodGhpcyk7XG4gIH1cblxuICBnZXQgYWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLmlmQWN0aXZlU2VydmljZS5jdXJyZW50ID09PSB0aGlzLmlkO1xuICB9XG59XG4iXX0=