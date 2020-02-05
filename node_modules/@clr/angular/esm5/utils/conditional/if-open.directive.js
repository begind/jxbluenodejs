import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, EventEmitter, Input, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { IfOpenService } from './if-open.service';
var ClrIfOpen = /** @class */ (function () {
    function ClrIfOpen(ifOpenService, template, container) {
        var _this = this;
        this.ifOpenService = ifOpenService;
        this.template = template;
        this.container = container;
        /**********
         * @property openChange
         *
         * @description
         * An event emitter that emits when the open property is set to allow for 2way binding when the directive is
         * used with de-structured / de-sugared syntax.
         */
        this.openChange = new EventEmitter(false);
        this.subscription = this.ifOpenService.openChange.subscribe(function (change) {
            _this.updateView(change);
            _this.openChange.emit(change);
        });
    }
    Object.defineProperty(ClrIfOpen.prototype, "open", {
        /********
         *
         * @description
         * A getter that returns the current IfOpenService.open value.
         *
         */
        get: function () {
            return this.ifOpenService.open;
        },
        /*********
         *
         * @description
         * A setter that updates IfOpenService.open with value.
         *
         * @param value
         */
        set: function (value) {
            this.ifOpenService.open = value;
        },
        enumerable: true,
        configurable: true
    });
    /*********
     *
     * @description
     * Function that takes a boolean value and either created an embedded view for the associated ViewContainerRef or,
     * Clears all views from the ViewContainerRef
     * @param value
     */
    ClrIfOpen.prototype.updateView = function (value) {
        if (value) {
            this.container.createEmbeddedView(this.template);
        }
        else {
            this.container.clear();
        }
    };
    ClrIfOpen.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    tslib_1.__decorate([
        Input('clrIfOpen'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrIfOpen.prototype, "open", null);
    tslib_1.__decorate([
        Output('clrIfOpenChange'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrIfOpen.prototype, "openChange", void 0);
    ClrIfOpen = tslib_1.__decorate([
        Directive({ selector: '[clrIfOpen]' })
        /**********
         *
         * @class ClrIfOpen
         *
         * @description
         * A structural directive that controls whether or not the associated TemplateRef is instantiated or not.
         * It makes use of a Component instance level service: IfOpenService to maintain state between itself and the component
         * using it in the component template.
         *
         */
        ,
        tslib_1.__metadata("design:paramtypes", [IfOpenService,
            TemplateRef,
            ViewContainerRef])
    ], ClrIfOpen);
    return ClrIfOpen;
}());
export { ClrIfOpen };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtb3Blbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9jb25kaXRpb25hbC9pZi1vcGVuLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR2pILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQWNsRDtJQWtDRSxtQkFDVSxhQUE0QixFQUM1QixRQUEwQixFQUMxQixTQUEyQjtRQUhyQyxpQkFTQztRQVJTLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBQzFCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBdEJyQzs7Ozs7O1dBTUc7UUFDd0IsZUFBVSxHQUEwQixJQUFJLFlBQVksQ0FBVSxLQUFLLENBQUMsQ0FBQztRQWlCOUYsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ2hFLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBaENELHNCQUFXLDJCQUFJO1FBYWY7Ozs7O1dBS0c7YUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDakMsQ0FBQztRQTdCRDs7Ozs7O1dBTUc7YUFFSCxVQUFnQixLQUFjO1lBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTtJQWdDRDs7Ozs7O09BTUc7SUFDSSw4QkFBVSxHQUFqQixVQUFrQixLQUFjO1FBQzlCLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEQ7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDeEI7SUFDSCxDQUFDO0lBRUQsK0JBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQW5ERDtRQURDLEtBQUssQ0FBQyxXQUFXLENBQUM7Ozt5Q0FHbEI7SUFTMEI7UUFBMUIsTUFBTSxDQUFDLGlCQUFpQixDQUFDOzBDQUFhLFlBQVk7aURBQTZDO0lBdEJyRixTQUFTO1FBWnJCLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsQ0FBQztRQUV2Qzs7Ozs7Ozs7O1dBU0c7O2lEQW9Dd0IsYUFBYTtZQUNsQixXQUFXO1lBQ1YsZ0JBQWdCO09BckMxQixTQUFTLENBK0RyQjtJQUFELGdCQUFDO0NBQUEsQUEvREQsSUErREM7U0EvRFksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSWZPcGVuU2VydmljZSB9IGZyb20gJy4vaWYtb3Blbi5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NscklmT3Blbl0nIH0pXG5cbi8qKioqKioqKioqXG4gKlxuICogQGNsYXNzIENscklmT3BlblxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQSBzdHJ1Y3R1cmFsIGRpcmVjdGl2ZSB0aGF0IGNvbnRyb2xzIHdoZXRoZXIgb3Igbm90IHRoZSBhc3NvY2lhdGVkIFRlbXBsYXRlUmVmIGlzIGluc3RhbnRpYXRlZCBvciBub3QuXG4gKiBJdCBtYWtlcyB1c2Ugb2YgYSBDb21wb25lbnQgaW5zdGFuY2UgbGV2ZWwgc2VydmljZTogSWZPcGVuU2VydmljZSB0byBtYWludGFpbiBzdGF0ZSBiZXR3ZWVuIGl0c2VsZiBhbmQgdGhlIGNvbXBvbmVudFxuICogdXNpbmcgaXQgaW4gdGhlIGNvbXBvbmVudCB0ZW1wbGF0ZS5cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBDbHJJZk9wZW4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKioqKioqKipcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgc2V0dGVyIHRoYXQgdXBkYXRlcyBJZk9wZW5TZXJ2aWNlLm9wZW4gd2l0aCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBASW5wdXQoJ2NscklmT3BlbicpXG4gIHB1YmxpYyBzZXQgb3Blbih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuaWZPcGVuU2VydmljZS5vcGVuID0gdmFsdWU7XG4gIH1cblxuICAvKioqKioqKioqKlxuICAgKiBAcHJvcGVydHkgb3BlbkNoYW5nZVxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQW4gZXZlbnQgZW1pdHRlciB0aGF0IGVtaXRzIHdoZW4gdGhlIG9wZW4gcHJvcGVydHkgaXMgc2V0IHRvIGFsbG93IGZvciAyd2F5IGJpbmRpbmcgd2hlbiB0aGUgZGlyZWN0aXZlIGlzXG4gICAqIHVzZWQgd2l0aCBkZS1zdHJ1Y3R1cmVkIC8gZGUtc3VnYXJlZCBzeW50YXguXG4gICAqL1xuICBAT3V0cHV0KCdjbHJJZk9wZW5DaGFuZ2UnKSBvcGVuQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICAvKioqKioqKipcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgZ2V0dGVyIHRoYXQgcmV0dXJucyB0aGUgY3VycmVudCBJZk9wZW5TZXJ2aWNlLm9wZW4gdmFsdWUuXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IG9wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuaWZPcGVuU2VydmljZS5vcGVuO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBpZk9wZW5TZXJ2aWNlOiBJZk9wZW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbkNoYW5nZS5zdWJzY3JpYmUoY2hhbmdlID0+IHtcbiAgICAgIHRoaXMudXBkYXRlVmlldyhjaGFuZ2UpO1xuICAgICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQoY2hhbmdlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKioqKioqKipcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBib29sZWFuIHZhbHVlIGFuZCBlaXRoZXIgY3JlYXRlZCBhbiBlbWJlZGRlZCB2aWV3IGZvciB0aGUgYXNzb2NpYXRlZCBWaWV3Q29udGFpbmVyUmVmIG9yLFxuICAgKiBDbGVhcnMgYWxsIHZpZXdzIGZyb20gdGhlIFZpZXdDb250YWluZXJSZWZcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlVmlldyh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5jb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5jbGVhcigpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==