import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, EventEmitter, Input, Optional, Output, Renderer2, TemplateRef, ViewContainerRef, } from '@angular/core';
import { IfExpandService } from './if-expanded.service';
var ClrIfExpanded = /** @class */ (function () {
    function ClrIfExpanded(template, container, el, renderer, expand) {
        var _this = this;
        this.template = template;
        this.container = container;
        this.el = el;
        this.renderer = renderer;
        this.expand = expand;
        this._expanded = false;
        this.expandedChange = new EventEmitter(true);
        /**
         * Subscriptions to all the services and queries changes
         */
        this._subscriptions = [];
        expand.expandable++;
        this._subscriptions.push(expand.expandChange.subscribe(function () {
            _this.updateView();
            _this.expandedChange.emit(_this.expand.expanded);
        }));
    }
    Object.defineProperty(ClrIfExpanded.prototype, "expanded", {
        get: function () {
            return this._expanded;
        },
        set: function (value) {
            if (typeof value === 'boolean') {
                this.expand.expanded = value;
                this._expanded = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrIfExpanded.prototype.updateView = function () {
        if (this.expand.expanded && this.container.length !== 0) {
            return;
        }
        if (this.template) {
            if (this.expand.expanded) {
                // Should we pass a context? I don't see anything useful to pass right now,
                // but we can come back to it in the future as a solution for additional features.
                this.container.createEmbeddedView(this.template);
            }
            else {
                // TODO: Move when we move the animation logic to Datagrid Row Expand
                // We clear before the animation is over. Not ideal, but doing better would involve a much heavier
                // process for very little gain. Once Angular animations are dynamic enough, we should be able to
                // get the optimal behavior.
                this.container.clear();
            }
        }
        else {
            try {
                // If we don't have a template ref, we fallback to a crude display: none for now.
                if (this.expand.expanded) {
                    this.renderer.setStyle(this.el.nativeElement, 'display', null);
                }
                else {
                    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
                }
            }
            catch (e) {
                // We catch the case where clrIfExpanded was put on a non-DOM element, and we just do nothing
            }
        }
    };
    ClrIfExpanded.prototype.ngOnInit = function () {
        this.updateView();
    };
    ClrIfExpanded.prototype.ngOnDestroy = function () {
        this.expand.expandable--;
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    tslib_1.__decorate([
        Input('clrIfExpanded'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrIfExpanded.prototype, "expanded", null);
    tslib_1.__decorate([
        Output('clrIfExpandedChange'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrIfExpanded.prototype, "expandedChange", void 0);
    ClrIfExpanded = tslib_1.__decorate([
        Directive({ selector: '[clrIfExpanded]' }),
        tslib_1.__param(0, Optional()),
        tslib_1.__metadata("design:paramtypes", [TemplateRef,
            ViewContainerRef,
            ElementRef,
            Renderer2,
            IfExpandService])
    ], ClrIfExpanded);
    return ClrIfExpanded;
}());
export { ClrIfExpanded };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtZXhwYW5kZWQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvY29uZGl0aW9uYWwvaWYtZXhwYW5kZWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxXQUFXLEVBQ1gsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUd4RDtJQWlCRSx1QkFDc0IsUUFBMEIsRUFDdEMsU0FBMkIsRUFDM0IsRUFBYyxFQUNkLFFBQW1CLEVBQ25CLE1BQXVCO1FBTGpDLGlCQWNDO1FBYnFCLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBQ3RDLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzNCLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQWlCO1FBckJ6QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBY0osbUJBQWMsR0FBMEIsSUFBSSxZQUFZLENBQVUsSUFBSSxDQUFDLENBQUM7UUFrQnZHOztXQUVHO1FBQ0ssbUJBQWMsR0FBbUIsRUFBRSxDQUFDO1FBWjFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDdEIsTUFBTSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7WUFDNUIsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUE1QkQsc0JBQUksbUNBQVE7YUFBWjtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDO2FBR0QsVUFBYSxLQUFjO1lBQ3pCLElBQUksT0FBTyxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2FBQ3hCO1FBQ0gsQ0FBQzs7O09BUkE7SUFpQ08sa0NBQVUsR0FBbEI7UUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN2RCxPQUFPO1NBQ1I7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDeEIsMkVBQTJFO2dCQUMzRSxrRkFBa0Y7Z0JBQ2xGLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2xEO2lCQUFNO2dCQUNMLHFFQUFxRTtnQkFDckUsa0dBQWtHO2dCQUNsRyxpR0FBaUc7Z0JBQ2pHLDRCQUE0QjtnQkFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN4QjtTQUNGO2FBQU07WUFDTCxJQUFJO2dCQUNGLGlGQUFpRjtnQkFDakYsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtvQkFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNoRTtxQkFBTTtvQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQ2xFO2FBQ0Y7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDViw2RkFBNkY7YUFDOUY7U0FDRjtJQUNILENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxtQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQWlCLElBQUssT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBbkVEO1FBREMsS0FBSyxDQUFDLGVBQWUsQ0FBQzs7O2lEQU10QjtJQUU4QjtRQUE5QixNQUFNLENBQUMscUJBQXFCLENBQUM7MENBQWlCLFlBQVk7eURBQTRDO0lBZjVGLGFBQWE7UUFEekIsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLENBQUM7UUFtQnRDLG1CQUFBLFFBQVEsRUFBRSxDQUFBO2lEQUFtQixXQUFXO1lBQ3RCLGdCQUFnQjtZQUN2QixVQUFVO1lBQ0osU0FBUztZQUNYLGVBQWU7T0F0QnRCLGFBQWEsQ0E0RXpCO0lBQUQsb0JBQUM7Q0FBQSxBQTVFRCxJQTRFQztTQTVFWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSWZFeHBhbmRTZXJ2aWNlIH0gZnJvbSAnLi9pZi1leHBhbmRlZC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NscklmRXhwYW5kZWRdJyB9KVxuZXhwb3J0IGNsYXNzIENscklmRXhwYW5kZWQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2V4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgZ2V0IGV4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9leHBhbmRlZDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xySWZFeHBhbmRlZCcpXG4gIHNldCBleHBhbmRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgdGhpcy5leHBhbmQuZXhwYW5kZWQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2V4cGFuZGVkID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xySWZFeHBhbmRlZENoYW5nZScpIGV4cGFuZGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KHRydWUpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBleHBhbmQ6IElmRXhwYW5kU2VydmljZVxuICApIHtcbiAgICBleHBhbmQuZXhwYW5kYWJsZSsrO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIGV4cGFuZC5leHBhbmRDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gICAgICAgIHRoaXMuZXhwYW5kZWRDaGFuZ2UuZW1pdCh0aGlzLmV4cGFuZC5leHBhbmRlZCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9ucyB0byBhbGwgdGhlIHNlcnZpY2VzIGFuZCBxdWVyaWVzIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgcHJpdmF0ZSB1cGRhdGVWaWV3KCkge1xuICAgIGlmICh0aGlzLmV4cGFuZC5leHBhbmRlZCAmJiB0aGlzLmNvbnRhaW5lci5sZW5ndGggIT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMudGVtcGxhdGUpIHtcbiAgICAgIGlmICh0aGlzLmV4cGFuZC5leHBhbmRlZCkge1xuICAgICAgICAvLyBTaG91bGQgd2UgcGFzcyBhIGNvbnRleHQ/IEkgZG9uJ3Qgc2VlIGFueXRoaW5nIHVzZWZ1bCB0byBwYXNzIHJpZ2h0IG5vdyxcbiAgICAgICAgLy8gYnV0IHdlIGNhbiBjb21lIGJhY2sgdG8gaXQgaW4gdGhlIGZ1dHVyZSBhcyBhIHNvbHV0aW9uIGZvciBhZGRpdGlvbmFsIGZlYXR1cmVzLlxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUT0RPOiBNb3ZlIHdoZW4gd2UgbW92ZSB0aGUgYW5pbWF0aW9uIGxvZ2ljIHRvIERhdGFncmlkIFJvdyBFeHBhbmRcbiAgICAgICAgLy8gV2UgY2xlYXIgYmVmb3JlIHRoZSBhbmltYXRpb24gaXMgb3Zlci4gTm90IGlkZWFsLCBidXQgZG9pbmcgYmV0dGVyIHdvdWxkIGludm9sdmUgYSBtdWNoIGhlYXZpZXJcbiAgICAgICAgLy8gcHJvY2VzcyBmb3IgdmVyeSBsaXR0bGUgZ2Fpbi4gT25jZSBBbmd1bGFyIGFuaW1hdGlvbnMgYXJlIGR5bmFtaWMgZW5vdWdoLCB3ZSBzaG91bGQgYmUgYWJsZSB0b1xuICAgICAgICAvLyBnZXQgdGhlIG9wdGltYWwgYmVoYXZpb3IuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsZWFyKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYSB0ZW1wbGF0ZSByZWYsIHdlIGZhbGxiYWNrIHRvIGEgY3J1ZGUgZGlzcGxheTogbm9uZSBmb3Igbm93LlxuICAgICAgICBpZiAodGhpcy5leHBhbmQuZXhwYW5kZWQpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCBudWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIFdlIGNhdGNoIHRoZSBjYXNlIHdoZXJlIGNscklmRXhwYW5kZWQgd2FzIHB1dCBvbiBhIG5vbi1ET00gZWxlbWVudCwgYW5kIHdlIGp1c3QgZG8gbm90aGluZ1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXBkYXRlVmlldygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5leHBhbmQuZXhwYW5kYWJsZS0tO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3ViOiBTdWJzY3JpcHRpb24pID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19