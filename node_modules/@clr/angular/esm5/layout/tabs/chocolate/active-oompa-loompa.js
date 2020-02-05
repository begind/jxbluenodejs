import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ChangeDetectorRef, Directive, Inject, Optional } from '@angular/core';
import { OompaLoompa } from '../../../utils/chocolate/oompa-loompa';
import { IF_ACTIVE_ID, IfActiveService } from '../../../utils/conditional/if-active.service';
import { TabsWillyWonka } from './tabs-willy-wonka';
var ActiveOompaLoompa = /** @class */ (function (_super) {
    tslib_1.__extends(ActiveOompaLoompa, _super);
    function ActiveOompaLoompa(cdr, willyWonka, id, ifActive) {
        var _this = this;
        if (!willyWonka) {
            throw new Error('clrTabLink and clr-tab-content should only be used inside of a clr-tabs');
        }
        _this = _super.call(this, cdr, willyWonka) || this;
        _this.ifActive = ifActive;
        _this.id = id;
        return _this;
    }
    Object.defineProperty(ActiveOompaLoompa.prototype, "flavor", {
        get: function () {
            return this.ifActive.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
    ActiveOompaLoompa = tslib_1.__decorate([
        Directive({ selector: '[clrTabLink], clr-tab-content' }),
        tslib_1.__param(1, Optional()),
        tslib_1.__param(2, Inject(IF_ACTIVE_ID)),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef,
            TabsWillyWonka, Number, IfActiveService])
    ], ActiveOompaLoompa);
    return ActiveOompaLoompa;
}(OompaLoompa));
export { ActiveOompaLoompa };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLW9vbXBhLWxvb21wYS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImxheW91dC90YWJzL2Nob2NvbGF0ZS9hY3RpdmUtb29tcGEtbG9vbXBhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRS9FLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBRTdGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUdwRDtJQUF1Qyw2Q0FBVztJQUloRCwyQkFDRSxHQUFzQixFQUNWLFVBQTBCLEVBQ2hCLEVBQVUsRUFDaEMsUUFBeUI7UUFKM0IsaUJBWUM7UUFOQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyx5RUFBeUUsQ0FBQyxDQUFDO1NBQzVGO1FBQ0QsUUFBQSxrQkFBTSxHQUFHLEVBQUUsVUFBVSxDQUFDLFNBQUM7UUFDdkIsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsS0FBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7O0lBQ2YsQ0FBQztJQUVELHNCQUFJLHFDQUFNO2FBQVY7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDM0MsQ0FBQzs7O09BQUE7SUFwQlUsaUJBQWlCO1FBRDdCLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSwrQkFBK0IsRUFBRSxDQUFDO1FBT3BELG1CQUFBLFFBQVEsRUFBRSxDQUFBO1FBQ1YsbUJBQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO2lEQUZoQixpQkFBaUI7WUFDRSxjQUFjLFVBRTVCLGVBQWU7T0FSaEIsaUJBQWlCLENBcUI3QjtJQUFELHdCQUFDO0NBQUEsQUFyQkQsQ0FBdUMsV0FBVyxHQXFCakQ7U0FyQlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBPb21wYUxvb21wYSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2Nob2NvbGF0ZS9vb21wYS1sb29tcGEnO1xuaW1wb3J0IHsgSUZfQUNUSVZFX0lELCBJZkFjdGl2ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1hY3RpdmUuc2VydmljZSc7XG5cbmltcG9ydCB7IFRhYnNXaWxseVdvbmthIH0gZnJvbSAnLi90YWJzLXdpbGx5LXdvbmthJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NsclRhYkxpbmtdLCBjbHItdGFiLWNvbnRlbnQnIH0pXG5leHBvcnQgY2xhc3MgQWN0aXZlT29tcGFMb29tcGEgZXh0ZW5kcyBPb21wYUxvb21wYSB7XG4gIHByaXZhdGUgaWZBY3RpdmU6IElmQWN0aXZlU2VydmljZTtcbiAgcHJpdmF0ZSBpZDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgd2lsbHlXb25rYTogVGFic1dpbGx5V29ua2EsXG4gICAgQEluamVjdChJRl9BQ1RJVkVfSUQpIGlkOiBudW1iZXIsXG4gICAgaWZBY3RpdmU6IElmQWN0aXZlU2VydmljZVxuICApIHtcbiAgICBpZiAoIXdpbGx5V29ua2EpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2xyVGFiTGluayBhbmQgY2xyLXRhYi1jb250ZW50IHNob3VsZCBvbmx5IGJlIHVzZWQgaW5zaWRlIG9mIGEgY2xyLXRhYnMnKTtcbiAgICB9XG4gICAgc3VwZXIoY2RyLCB3aWxseVdvbmthKTtcbiAgICB0aGlzLmlmQWN0aXZlID0gaWZBY3RpdmU7XG4gICAgdGhpcy5pZCA9IGlkO1xuICB9XG5cbiAgZ2V0IGZsYXZvcigpIHtcbiAgICByZXR1cm4gdGhpcy5pZkFjdGl2ZS5jdXJyZW50ID09PSB0aGlzLmlkO1xuICB9XG59XG4iXX0=