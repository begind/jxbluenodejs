import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, EventEmitter, Input, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { Point, Popover } from './popover';
let openCount = 0;
const waiting = []; // pending create functions
let PopoverDirectiveOld = class PopoverDirectiveOld {
    constructor(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.popoverOptions = {};
        this.clrPopoverOldChange = new EventEmitter(false);
    }
    set clrPopoverOld(open) {
        if (open) {
            if (this.popoverOptions.allowMultipleOpen) {
                this.createPopover();
            }
            else {
                if (openCount === 0) {
                    this.createPopover();
                }
                else {
                    waiting.push(() => {
                        this.createPopover();
                    });
                }
            }
        }
        else {
            this.viewContainer.clear();
            this.destroyPopover();
            if (!this.popoverOptions.allowMultipleOpen) {
                if (waiting.length > 0) {
                    const createPopoverFn = waiting.shift();
                    createPopoverFn();
                }
            }
        }
    }
    createPopover() {
        const embeddedViewRef = this.viewContainer.createEmbeddedView(this.templateRef);
        // TODO: Not sure of the risks associated with using this. Find an alternative.
        // Needed for find the correct height and width of dynamically created views
        // inside of the popover. For Eg: Button Groups
        embeddedViewRef.detectChanges();
        // filter out other nodes in the view ref so we are only left with element nodes
        const elementNodes = embeddedViewRef.rootNodes.filter((node) => {
            return node.nodeType === 1;
        });
        // we take the first element node in the embedded view; usually there should only be one anyways
        this._popoverInstance = new Popover(elementNodes[0]);
        this._subscription = this._popoverInstance
            .anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
            .subscribe(() => {
            this.clrPopoverOldChange.emit(false);
        });
        openCount++;
    }
    destroyPopover() {
        if (this._popoverInstance) {
            this._subscription.unsubscribe();
            this._popoverInstance.release();
            delete this._popoverInstance;
            openCount--;
        }
    }
    ngOnDestroy() {
        this.destroyPopover();
    }
};
tslib_1.__decorate([
    Input('clrPopoverOldAnchor'),
    tslib_1.__metadata("design:type", Object)
], PopoverDirectiveOld.prototype, "anchorElem", void 0);
tslib_1.__decorate([
    Input('clrPopoverOldAnchorPoint'),
    tslib_1.__metadata("design:type", Number)
], PopoverDirectiveOld.prototype, "anchorPoint", void 0);
tslib_1.__decorate([
    Input('clrPopoverOldPopoverPoint'),
    tslib_1.__metadata("design:type", Number)
], PopoverDirectiveOld.prototype, "popoverPoint", void 0);
tslib_1.__decorate([
    Input('clrPopoverOldOptions'),
    tslib_1.__metadata("design:type", Object)
], PopoverDirectiveOld.prototype, "popoverOptions", void 0);
tslib_1.__decorate([
    Output('clrPopoverOldChange'),
    tslib_1.__metadata("design:type", Object)
], PopoverDirectiveOld.prototype, "clrPopoverOldChange", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], PopoverDirectiveOld.prototype, "clrPopoverOld", null);
PopoverDirectiveOld = tslib_1.__decorate([
    Directive({ selector: '[clrPopoverOld]' }),
    tslib_1.__metadata("design:paramtypes", [TemplateRef, ViewContainerRef])
], PopoverDirectiveOld);
export { PopoverDirectiveOld };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1vbGQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsicG9wb3Zlci9jb21tb24vcG9wb3Zlci1vbGQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBbUIsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3ZILE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRzNDLElBQUksU0FBUyxHQUFXLENBQUMsQ0FBQztBQUMxQixNQUFNLE9BQU8sR0FBc0IsRUFBRSxDQUFDLENBQUMsMkJBQTJCO0FBR2xFLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBVTlCLFlBQW9CLFdBQTZCLEVBQVUsYUFBK0I7UUFBdEUsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBSDNELG1CQUFjLEdBQW1CLEVBQUUsQ0FBQztRQUNwQyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUVPLENBQUM7SUFHOUYsSUFBSSxhQUFhLENBQUMsSUFBYTtRQUM3QixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRTtnQkFDekMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNMLElBQUksU0FBUyxLQUFLLENBQUMsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2lCQUN0QjtxQkFBTTtvQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTt3QkFDaEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUN2QixDQUFDLENBQUMsQ0FBQztpQkFDSjthQUNGO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRXRCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFO2dCQUMxQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN0QixNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ3hDLGVBQWUsRUFBRSxDQUFDO2lCQUNuQjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsYUFBYTtRQUNYLE1BQU0sZUFBZSxHQUErQyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUN2RyxJQUFJLENBQUMsV0FBVyxDQUNqQixDQUFDO1FBRUYsK0VBQStFO1FBQy9FLDRFQUE0RTtRQUM1RSwrQ0FBK0M7UUFDL0MsZUFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRWhDLGdGQUFnRjtRQUNoRixNQUFNLFlBQVksR0FBa0IsZUFBZSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtZQUNqRixPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBRUgsZ0dBQWdHO1FBQ2hHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0I7YUFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUM7YUFDakYsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFDTCxTQUFTLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxjQUFjO1FBQ1osSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7WUFDN0IsU0FBUyxFQUFFLENBQUM7U0FDYjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FDRixDQUFBO0FBeEUrQjtJQUE3QixLQUFLLENBQUMscUJBQXFCLENBQUM7O3VEQUFpQjtBQUNYO0lBQWxDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQzs7d0RBQW9CO0FBQ2xCO0lBQW5DLEtBQUssQ0FBQywyQkFBMkIsQ0FBQzs7eURBQXFCO0FBQ3pCO0lBQTlCLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQzs7MkRBQXFDO0FBQ3BDO0lBQTlCLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQzs7Z0VBQXdEO0FBS3RGO0lBREMsS0FBSyxFQUFFOzs7d0RBeUJQO0FBckNVLG1CQUFtQjtJQUQvQixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQzs2Q0FXUixXQUFXLEVBQThCLGdCQUFnQjtHQVYvRSxtQkFBbUIsQ0E0RS9CO1NBNUVZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgRW1iZWRkZWRWaWV3UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgUG9pbnQsIFBvcG92ZXIgfSBmcm9tICcuL3BvcG92ZXInO1xuaW1wb3J0IHsgUG9wb3Zlck9wdGlvbnMgfSBmcm9tICcuL3BvcG92ZXItb3B0aW9ucy5pbnRlcmZhY2UnO1xuXG5sZXQgb3BlbkNvdW50OiBudW1iZXIgPSAwO1xuY29uc3Qgd2FpdGluZzogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTsgLy8gcGVuZGluZyBjcmVhdGUgZnVuY3Rpb25zXG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJQb3BvdmVyT2xkXScgfSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyRGlyZWN0aXZlT2xkIHtcbiAgcHJpdmF0ZSBfcG9wb3Zlckluc3RhbmNlOiBQb3BvdmVyO1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBASW5wdXQoJ2NsclBvcG92ZXJPbGRBbmNob3InKSBhbmNob3JFbGVtOiBhbnk7XG4gIEBJbnB1dCgnY2xyUG9wb3Zlck9sZEFuY2hvclBvaW50JykgYW5jaG9yUG9pbnQ6IFBvaW50O1xuICBASW5wdXQoJ2NsclBvcG92ZXJPbGRQb3BvdmVyUG9pbnQnKSBwb3BvdmVyUG9pbnQ6IFBvaW50O1xuICBASW5wdXQoJ2NsclBvcG92ZXJPbGRPcHRpb25zJykgcG9wb3Zlck9wdGlvbnM6IFBvcG92ZXJPcHRpb25zID0ge307XG4gIEBPdXRwdXQoJ2NsclBvcG92ZXJPbGRDaGFuZ2UnKSBjbHJQb3BvdmVyT2xkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPihmYWxzZSk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PiwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKSB7fVxuXG4gIEBJbnB1dCgpXG4gIHNldCBjbHJQb3BvdmVyT2xkKG9wZW46IGJvb2xlYW4pIHtcbiAgICBpZiAob3Blbikge1xuICAgICAgaWYgKHRoaXMucG9wb3Zlck9wdGlvbnMuYWxsb3dNdWx0aXBsZU9wZW4pIHtcbiAgICAgICAgdGhpcy5jcmVhdGVQb3BvdmVyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAob3BlbkNvdW50ID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5jcmVhdGVQb3BvdmVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2FpdGluZy5wdXNoKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUG9wb3ZlcigpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgICAgdGhpcy5kZXN0cm95UG9wb3ZlcigpO1xuXG4gICAgICBpZiAoIXRoaXMucG9wb3Zlck9wdGlvbnMuYWxsb3dNdWx0aXBsZU9wZW4pIHtcbiAgICAgICAgaWYgKHdhaXRpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IGNyZWF0ZVBvcG92ZXJGbiA9IHdhaXRpbmcuc2hpZnQoKTtcbiAgICAgICAgICBjcmVhdGVQb3BvdmVyRm4oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZVBvcG92ZXIoKSB7XG4gICAgY29uc3QgZW1iZWRkZWRWaWV3UmVmOiBFbWJlZGRlZFZpZXdSZWY8YW55PiA9IDxFbWJlZGRlZFZpZXdSZWY8YW55Pj50aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KFxuICAgICAgdGhpcy50ZW1wbGF0ZVJlZlxuICAgICk7XG5cbiAgICAvLyBUT0RPOiBOb3Qgc3VyZSBvZiB0aGUgcmlza3MgYXNzb2NpYXRlZCB3aXRoIHVzaW5nIHRoaXMuIEZpbmQgYW4gYWx0ZXJuYXRpdmUuXG4gICAgLy8gTmVlZGVkIGZvciBmaW5kIHRoZSBjb3JyZWN0IGhlaWdodCBhbmQgd2lkdGggb2YgZHluYW1pY2FsbHkgY3JlYXRlZCB2aWV3c1xuICAgIC8vIGluc2lkZSBvZiB0aGUgcG9wb3Zlci4gRm9yIEVnOiBCdXR0b24gR3JvdXBzXG4gICAgZW1iZWRkZWRWaWV3UmVmLmRldGVjdENoYW5nZXMoKTtcblxuICAgIC8vIGZpbHRlciBvdXQgb3RoZXIgbm9kZXMgaW4gdGhlIHZpZXcgcmVmIHNvIHdlIGFyZSBvbmx5IGxlZnQgd2l0aCBlbGVtZW50IG5vZGVzXG4gICAgY29uc3QgZWxlbWVudE5vZGVzOiBIVE1MRWxlbWVudFtdID0gZW1iZWRkZWRWaWV3UmVmLnJvb3ROb2Rlcy5maWx0ZXIoKG5vZGU6IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDE7XG4gICAgfSk7XG5cbiAgICAvLyB3ZSB0YWtlIHRoZSBmaXJzdCBlbGVtZW50IG5vZGUgaW4gdGhlIGVtYmVkZGVkIHZpZXc7IHVzdWFsbHkgdGhlcmUgc2hvdWxkIG9ubHkgYmUgb25lIGFueXdheXNcbiAgICB0aGlzLl9wb3BvdmVySW5zdGFuY2UgPSBuZXcgUG9wb3ZlcihlbGVtZW50Tm9kZXNbMF0pO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMuX3BvcG92ZXJJbnN0YW5jZVxuICAgICAgLmFuY2hvcih0aGlzLmFuY2hvckVsZW0sIHRoaXMuYW5jaG9yUG9pbnQsIHRoaXMucG9wb3ZlclBvaW50LCB0aGlzLnBvcG92ZXJPcHRpb25zKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2xyUG9wb3Zlck9sZENoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIG9wZW5Db3VudCsrO1xuICB9XG5cbiAgZGVzdHJveVBvcG92ZXIoKSB7XG4gICAgaWYgKHRoaXMuX3BvcG92ZXJJbnN0YW5jZSkge1xuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9wb3BvdmVySW5zdGFuY2UucmVsZWFzZSgpO1xuICAgICAgZGVsZXRlIHRoaXMuX3BvcG92ZXJJbnN0YW5jZTtcbiAgICAgIG9wZW5Db3VudC0tO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveVBvcG92ZXIoKTtcbiAgfVxufVxuIl19