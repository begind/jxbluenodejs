import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, EventEmitter, Inject, Input, Output, TemplateRef, ViewContainerRef, } from '@angular/core';
import { IF_ACTIVE_ID, IfActiveService } from './if-active.service';
let ClrIfActive = 
/**********
 *
 * @class ClrIfActive
 *
 * @description
 * A structural directive that controls whether or not the associated TemplateRef is instantiated or not.
 * It makes use of a Component instance level service: IfActiveService to maintain state between itself and
 * the component using it in the component template.
 *
 */
class ClrIfActive {
    constructor(ifActiveService, id, template, container) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.template = template;
        this.container = container;
        this.wasActive = false;
        /**********
         * @property activeChange
         *
         * @description
         * An event emitter that emits when the active property is set to allow for 2way binding when the directive is
         * used with de-structured / de-sugared syntax.
         *
         */
        this.activeChange = new EventEmitter(false);
        this.checkAndUpdateView(ifActiveService.current);
        this.subscription = this.ifActiveService.currentChange.subscribe(newCurrentId => {
            this.checkAndUpdateView(newCurrentId);
        });
    }
    checkAndUpdateView(currentId) {
        const isNowActive = currentId === this.id;
        // only emit if the new active state is changed since last time.
        if (isNowActive !== this.wasActive) {
            this.updateView(isNowActive);
            this.activeChange.emit(isNowActive);
            this.wasActive = isNowActive;
        }
    }
    /*********
     *
     * @description
     * A setter that updates IfActiveService.active with value.
     *
     * @param value
     */
    set active(value) {
        if (value) {
            this.ifActiveService.current = this.id;
        }
    }
    /********
     *
     * @description
     * A getter that returns the current IfActiveService.active value.
     */
    get active() {
        return this.ifActiveService.current === this.id;
    }
    /*********
     *
     * @description
     * Function that takes a any value and either created an embedded view for the associated ViewContainerRef or,
     * Clears all views from the ViewContainerRef
     * @param value
     */
    updateView(value) {
        if (value) {
            this.container.createEmbeddedView(this.template);
        }
        else {
            this.container.clear();
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
};
tslib_1.__decorate([
    Input('clrIfActive'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrIfActive.prototype, "active", null);
tslib_1.__decorate([
    Output('clrIfActiveChange'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrIfActive.prototype, "activeChange", void 0);
ClrIfActive = tslib_1.__decorate([
    Directive({ selector: '[clrIfActive]' })
    /**********
     *
     * @class ClrIfActive
     *
     * @description
     * A structural directive that controls whether or not the associated TemplateRef is instantiated or not.
     * It makes use of a Component instance level service: IfActiveService to maintain state between itself and
     * the component using it in the component template.
     *
     */
    ,
    tslib_1.__param(1, Inject(IF_ACTIVE_ID)),
    tslib_1.__metadata("design:paramtypes", [IfActiveService, Number, TemplateRef,
        ViewContainerRef])
], ClrIfActive);
export { ClrIfActive };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtYWN0aXZlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2NvbmRpdGlvbmFsL2lmLWFjdGl2ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLE1BQU0sRUFDTixXQUFXLEVBQ1gsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFjcEUsSUFBYSxXQUFXO0FBVnhCOzs7Ozs7Ozs7R0FTRztBQUNILE1BQWEsV0FBVztJQUl0QixZQUNVLGVBQWdDLEVBQ1YsRUFBVSxFQUNoQyxRQUEwQixFQUMxQixTQUEyQjtRQUgzQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDVixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQ2hDLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBQzFCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBTjdCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUF1Q25DOzs7Ozs7O1dBT0c7UUFDMEIsaUJBQVksR0FBMEIsSUFBSSxZQUFZLENBQVUsS0FBSyxDQUFDLENBQUM7UUF2Q2xHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFakQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDOUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLGtCQUFrQixDQUFDLFNBQWlCO1FBQzFDLE1BQU0sV0FBVyxHQUFHLFNBQVMsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzFDLGdFQUFnRTtRQUNoRSxJQUFJLFdBQVcsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBRUgsSUFBVyxNQUFNLENBQUMsS0FBYztRQUM5QixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBWUQ7Ozs7T0FJRztJQUNILElBQVcsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksVUFBVSxDQUFDLEtBQWM7UUFDOUIsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNsRDthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0NBQ0YsQ0FBQTtBQTNDQztJQURDLEtBQUssQ0FBQyxhQUFhLENBQUM7Ozt5Q0FLcEI7QUFVNEI7SUFBNUIsTUFBTSxDQUFDLG1CQUFtQixDQUFDO3NDQUFlLFlBQVk7aURBQTZDO0FBakR6RixXQUFXO0lBWnZCLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsQ0FBQztJQUV6Qzs7Ozs7Ozs7O09BU0c7O0lBT0UsbUJBQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBOzZDQURJLGVBQWUsVUFFdEIsV0FBVztRQUNWLGdCQUFnQjtHQVIxQixXQUFXLENBOEV2QjtTQTlFWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSUZfQUNUSVZFX0lELCBJZkFjdGl2ZVNlcnZpY2UgfSBmcm9tICcuL2lmLWFjdGl2ZS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NscklmQWN0aXZlXScgfSlcblxuLyoqKioqKioqKipcbiAqXG4gKiBAY2xhc3MgQ2xySWZBY3RpdmVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEEgc3RydWN0dXJhbCBkaXJlY3RpdmUgdGhhdCBjb250cm9scyB3aGV0aGVyIG9yIG5vdCB0aGUgYXNzb2NpYXRlZCBUZW1wbGF0ZVJlZiBpcyBpbnN0YW50aWF0ZWQgb3Igbm90LlxuICogSXQgbWFrZXMgdXNlIG9mIGEgQ29tcG9uZW50IGluc3RhbmNlIGxldmVsIHNlcnZpY2U6IElmQWN0aXZlU2VydmljZSB0byBtYWludGFpbiBzdGF0ZSBiZXR3ZWVuIGl0c2VsZiBhbmRcbiAqIHRoZSBjb21wb25lbnQgdXNpbmcgaXQgaW4gdGhlIGNvbXBvbmVudCB0ZW1wbGF0ZS5cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBDbHJJZkFjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgd2FzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBpZkFjdGl2ZVNlcnZpY2U6IElmQWN0aXZlU2VydmljZSxcbiAgICBASW5qZWN0KElGX0FDVElWRV9JRCkgcHJpdmF0ZSBpZDogbnVtYmVyLFxuICAgIHByaXZhdGUgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7XG4gICAgdGhpcy5jaGVja0FuZFVwZGF0ZVZpZXcoaWZBY3RpdmVTZXJ2aWNlLmN1cnJlbnQpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmlmQWN0aXZlU2VydmljZS5jdXJyZW50Q2hhbmdlLnN1YnNjcmliZShuZXdDdXJyZW50SWQgPT4ge1xuICAgICAgdGhpcy5jaGVja0FuZFVwZGF0ZVZpZXcobmV3Q3VycmVudElkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tBbmRVcGRhdGVWaWV3KGN1cnJlbnRJZDogbnVtYmVyKSB7XG4gICAgY29uc3QgaXNOb3dBY3RpdmUgPSBjdXJyZW50SWQgPT09IHRoaXMuaWQ7XG4gICAgLy8gb25seSBlbWl0IGlmIHRoZSBuZXcgYWN0aXZlIHN0YXRlIGlzIGNoYW5nZWQgc2luY2UgbGFzdCB0aW1lLlxuICAgIGlmIChpc05vd0FjdGl2ZSAhPT0gdGhpcy53YXNBY3RpdmUpIHtcbiAgICAgIHRoaXMudXBkYXRlVmlldyhpc05vd0FjdGl2ZSk7XG4gICAgICB0aGlzLmFjdGl2ZUNoYW5nZS5lbWl0KGlzTm93QWN0aXZlKTtcbiAgICAgIHRoaXMud2FzQWN0aXZlID0gaXNOb3dBY3RpdmU7XG4gICAgfVxuICB9XG5cbiAgLyoqKioqKioqKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQSBzZXR0ZXIgdGhhdCB1cGRhdGVzIElmQWN0aXZlU2VydmljZS5hY3RpdmUgd2l0aCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBASW5wdXQoJ2NscklmQWN0aXZlJylcbiAgcHVibGljIHNldCBhY3RpdmUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuaWZBY3RpdmVTZXJ2aWNlLmN1cnJlbnQgPSB0aGlzLmlkO1xuICAgIH1cbiAgfVxuXG4gIC8qKioqKioqKioqXG4gICAqIEBwcm9wZXJ0eSBhY3RpdmVDaGFuZ2VcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEFuIGV2ZW50IGVtaXR0ZXIgdGhhdCBlbWl0cyB3aGVuIHRoZSBhY3RpdmUgcHJvcGVydHkgaXMgc2V0IHRvIGFsbG93IGZvciAyd2F5IGJpbmRpbmcgd2hlbiB0aGUgZGlyZWN0aXZlIGlzXG4gICAqIHVzZWQgd2l0aCBkZS1zdHJ1Y3R1cmVkIC8gZGUtc3VnYXJlZCBzeW50YXguXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJJZkFjdGl2ZUNoYW5nZScpIGFjdGl2ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPihmYWxzZSk7XG5cbiAgLyoqKioqKioqXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBIGdldHRlciB0aGF0IHJldHVybnMgdGhlIGN1cnJlbnQgSWZBY3RpdmVTZXJ2aWNlLmFjdGl2ZSB2YWx1ZS5cbiAgICovXG4gIHB1YmxpYyBnZXQgYWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLmlmQWN0aXZlU2VydmljZS5jdXJyZW50ID09PSB0aGlzLmlkO1xuICB9XG5cbiAgLyoqKioqKioqKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogRnVuY3Rpb24gdGhhdCB0YWtlcyBhIGFueSB2YWx1ZSBhbmQgZWl0aGVyIGNyZWF0ZWQgYW4gZW1iZWRkZWQgdmlldyBmb3IgdGhlIGFzc29jaWF0ZWQgVmlld0NvbnRhaW5lclJlZiBvcixcbiAgICogQ2xlYXJzIGFsbCB2aWV3cyBmcm9tIHRoZSBWaWV3Q29udGFpbmVyUmVmXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZVZpZXcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250YWluZXIuY2xlYXIoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=