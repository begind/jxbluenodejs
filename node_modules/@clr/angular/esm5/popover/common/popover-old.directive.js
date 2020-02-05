import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, EventEmitter, Input, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { Point, Popover } from './popover';
var openCount = 0;
var waiting = []; // pending create functions
var PopoverDirectiveOld = /** @class */ (function () {
    function PopoverDirectiveOld(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.popoverOptions = {};
        this.clrPopoverOldChange = new EventEmitter(false);
    }
    Object.defineProperty(PopoverDirectiveOld.prototype, "clrPopoverOld", {
        set: function (open) {
            var _this = this;
            if (open) {
                if (this.popoverOptions.allowMultipleOpen) {
                    this.createPopover();
                }
                else {
                    if (openCount === 0) {
                        this.createPopover();
                    }
                    else {
                        waiting.push(function () {
                            _this.createPopover();
                        });
                    }
                }
            }
            else {
                this.viewContainer.clear();
                this.destroyPopover();
                if (!this.popoverOptions.allowMultipleOpen) {
                    if (waiting.length > 0) {
                        var createPopoverFn = waiting.shift();
                        createPopoverFn();
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    PopoverDirectiveOld.prototype.createPopover = function () {
        var _this = this;
        var embeddedViewRef = this.viewContainer.createEmbeddedView(this.templateRef);
        // TODO: Not sure of the risks associated with using this. Find an alternative.
        // Needed for find the correct height and width of dynamically created views
        // inside of the popover. For Eg: Button Groups
        embeddedViewRef.detectChanges();
        // filter out other nodes in the view ref so we are only left with element nodes
        var elementNodes = embeddedViewRef.rootNodes.filter(function (node) {
            return node.nodeType === 1;
        });
        // we take the first element node in the embedded view; usually there should only be one anyways
        this._popoverInstance = new Popover(elementNodes[0]);
        this._subscription = this._popoverInstance
            .anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
            .subscribe(function () {
            _this.clrPopoverOldChange.emit(false);
        });
        openCount++;
    };
    PopoverDirectiveOld.prototype.destroyPopover = function () {
        if (this._popoverInstance) {
            this._subscription.unsubscribe();
            this._popoverInstance.release();
            delete this._popoverInstance;
            openCount--;
        }
    };
    PopoverDirectiveOld.prototype.ngOnDestroy = function () {
        this.destroyPopover();
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
    return PopoverDirectiveOld;
}());
export { PopoverDirectiveOld };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1vbGQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsicG9wb3Zlci9jb21tb24vcG9wb3Zlci1vbGQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBbUIsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3ZILE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRzNDLElBQUksU0FBUyxHQUFXLENBQUMsQ0FBQztBQUMxQixJQUFNLE9BQU8sR0FBc0IsRUFBRSxDQUFDLENBQUMsMkJBQTJCO0FBR2xFO0lBVUUsNkJBQW9CLFdBQTZCLEVBQVUsYUFBK0I7UUFBdEUsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBSDNELG1CQUFjLEdBQW1CLEVBQUUsQ0FBQztRQUNwQyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUVPLENBQUM7SUFHOUYsc0JBQUksOENBQWE7YUFBakIsVUFBa0IsSUFBYTtZQUQvQixpQkF5QkM7WUF2QkMsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFO29CQUN6QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7aUJBQ3RCO3FCQUFNO29CQUNMLElBQUksU0FBUyxLQUFLLENBQUMsRUFBRTt3QkFDbkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO3FCQUN0Qjt5QkFBTTt3QkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDOzRCQUNYLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFDdkIsQ0FBQyxDQUFDLENBQUM7cUJBQ0o7aUJBQ0Y7YUFDRjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUMzQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBRXRCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFO29CQUMxQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUN0QixJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQ3hDLGVBQWUsRUFBRSxDQUFDO3FCQUNuQjtpQkFDRjthQUNGO1FBQ0gsQ0FBQzs7O09BQUE7SUFFRCwyQ0FBYSxHQUFiO1FBQUEsaUJBdUJDO1FBdEJDLElBQU0sZUFBZSxHQUErQyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUN2RyxJQUFJLENBQUMsV0FBVyxDQUNqQixDQUFDO1FBRUYsK0VBQStFO1FBQy9FLDRFQUE0RTtRQUM1RSwrQ0FBK0M7UUFDL0MsZUFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRWhDLGdGQUFnRjtRQUNoRixJQUFNLFlBQVksR0FBa0IsZUFBZSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFTO1lBQzdFLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxnR0FBZ0c7UUFDaEcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQjthQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQzthQUNqRixTQUFTLENBQUM7WUFDVCxLQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsU0FBUyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsNENBQWMsR0FBZDtRQUNFLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2hDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBQzdCLFNBQVMsRUFBRSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRUQseUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBdkU2QjtRQUE3QixLQUFLLENBQUMscUJBQXFCLENBQUM7OzJEQUFpQjtJQUNYO1FBQWxDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQzs7NERBQW9CO0lBQ2xCO1FBQW5DLEtBQUssQ0FBQywyQkFBMkIsQ0FBQzs7NkRBQXFCO0lBQ3pCO1FBQTlCLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQzs7K0RBQXFDO0lBQ3BDO1FBQTlCLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQzs7b0VBQXdEO0lBS3RGO1FBREMsS0FBSyxFQUFFOzs7NERBeUJQO0lBckNVLG1CQUFtQjtRQUQvQixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztpREFXUixXQUFXLEVBQThCLGdCQUFnQjtPQVYvRSxtQkFBbUIsQ0E0RS9CO0lBQUQsMEJBQUM7Q0FBQSxBQTVFRCxJQTRFQztTQTVFWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVtYmVkZGVkVmlld1JlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFBvaW50LCBQb3BvdmVyIH0gZnJvbSAnLi9wb3BvdmVyJztcbmltcG9ydCB7IFBvcG92ZXJPcHRpb25zIH0gZnJvbSAnLi9wb3BvdmVyLW9wdGlvbnMuaW50ZXJmYWNlJztcblxubGV0IG9wZW5Db3VudDogbnVtYmVyID0gMDtcbmNvbnN0IHdhaXRpbmc6IEFycmF5PCgpID0+IHZvaWQ+ID0gW107IC8vIHBlbmRpbmcgY3JlYXRlIGZ1bmN0aW9uc1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2xyUG9wb3Zlck9sZF0nIH0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlckRpcmVjdGl2ZU9sZCB7XG4gIHByaXZhdGUgX3BvcG92ZXJJbnN0YW5jZTogUG9wb3ZlcjtcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgQElucHV0KCdjbHJQb3BvdmVyT2xkQW5jaG9yJykgYW5jaG9yRWxlbTogYW55O1xuICBASW5wdXQoJ2NsclBvcG92ZXJPbGRBbmNob3JQb2ludCcpIGFuY2hvclBvaW50OiBQb2ludDtcbiAgQElucHV0KCdjbHJQb3BvdmVyT2xkUG9wb3ZlclBvaW50JykgcG9wb3ZlclBvaW50OiBQb2ludDtcbiAgQElucHV0KCdjbHJQb3BvdmVyT2xkT3B0aW9ucycpIHBvcG92ZXJPcHRpb25zOiBQb3BvdmVyT3B0aW9ucyA9IHt9O1xuICBAT3V0cHV0KCdjbHJQb3BvdmVyT2xkQ2hhbmdlJykgY2xyUG9wb3Zlck9sZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge31cblxuICBASW5wdXQoKVxuICBzZXQgY2xyUG9wb3Zlck9sZChvcGVuOiBib29sZWFuKSB7XG4gICAgaWYgKG9wZW4pIHtcbiAgICAgIGlmICh0aGlzLnBvcG92ZXJPcHRpb25zLmFsbG93TXVsdGlwbGVPcGVuKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlUG9wb3ZlcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG9wZW5Db3VudCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuY3JlYXRlUG9wb3ZlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdhaXRpbmcucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVBvcG92ZXIoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICAgIHRoaXMuZGVzdHJveVBvcG92ZXIoKTtcblxuICAgICAgaWYgKCF0aGlzLnBvcG92ZXJPcHRpb25zLmFsbG93TXVsdGlwbGVPcGVuKSB7XG4gICAgICAgIGlmICh3YWl0aW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBjcmVhdGVQb3BvdmVyRm4gPSB3YWl0aW5nLnNoaWZ0KCk7XG4gICAgICAgICAgY3JlYXRlUG9wb3ZlckZuKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjcmVhdGVQb3BvdmVyKCkge1xuICAgIGNvbnN0IGVtYmVkZGVkVmlld1JlZjogRW1iZWRkZWRWaWV3UmVmPGFueT4gPSA8RW1iZWRkZWRWaWV3UmVmPGFueT4+dGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyhcbiAgICAgIHRoaXMudGVtcGxhdGVSZWZcbiAgICApO1xuXG4gICAgLy8gVE9ETzogTm90IHN1cmUgb2YgdGhlIHJpc2tzIGFzc29jaWF0ZWQgd2l0aCB1c2luZyB0aGlzLiBGaW5kIGFuIGFsdGVybmF0aXZlLlxuICAgIC8vIE5lZWRlZCBmb3IgZmluZCB0aGUgY29ycmVjdCBoZWlnaHQgYW5kIHdpZHRoIG9mIGR5bmFtaWNhbGx5IGNyZWF0ZWQgdmlld3NcbiAgICAvLyBpbnNpZGUgb2YgdGhlIHBvcG92ZXIuIEZvciBFZzogQnV0dG9uIEdyb3Vwc1xuICAgIGVtYmVkZGVkVmlld1JlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICAvLyBmaWx0ZXIgb3V0IG90aGVyIG5vZGVzIGluIHRoZSB2aWV3IHJlZiBzbyB3ZSBhcmUgb25seSBsZWZ0IHdpdGggZWxlbWVudCBub2Rlc1xuICAgIGNvbnN0IGVsZW1lbnROb2RlczogSFRNTEVsZW1lbnRbXSA9IGVtYmVkZGVkVmlld1JlZi5yb290Tm9kZXMuZmlsdGVyKChub2RlOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSAxO1xuICAgIH0pO1xuXG4gICAgLy8gd2UgdGFrZSB0aGUgZmlyc3QgZWxlbWVudCBub2RlIGluIHRoZSBlbWJlZGRlZCB2aWV3OyB1c3VhbGx5IHRoZXJlIHNob3VsZCBvbmx5IGJlIG9uZSBhbnl3YXlzXG4gICAgdGhpcy5fcG9wb3Zlckluc3RhbmNlID0gbmV3IFBvcG92ZXIoZWxlbWVudE5vZGVzWzBdKTtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLl9wb3BvdmVySW5zdGFuY2VcbiAgICAgIC5hbmNob3IodGhpcy5hbmNob3JFbGVtLCB0aGlzLmFuY2hvclBvaW50LCB0aGlzLnBvcG92ZXJQb2ludCwgdGhpcy5wb3BvdmVyT3B0aW9ucylcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmNsclBvcG92ZXJPbGRDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICB9KTtcbiAgICBvcGVuQ291bnQrKztcbiAgfVxuXG4gIGRlc3Ryb3lQb3BvdmVyKCkge1xuICAgIGlmICh0aGlzLl9wb3BvdmVySW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fcG9wb3Zlckluc3RhbmNlLnJlbGVhc2UoKTtcbiAgICAgIGRlbGV0ZSB0aGlzLl9wb3BvdmVySW5zdGFuY2U7XG4gICAgICBvcGVuQ291bnQtLTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3lQb3BvdmVyKCk7XG4gIH1cbn1cbiJdfQ==