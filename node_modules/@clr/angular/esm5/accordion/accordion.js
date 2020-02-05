/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ContentChildren, QueryList, ChangeDetectionStrategy, Input, } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { AccordionService } from './providers/accordion.service';
import { ClrAccordionPanel } from './accordion-panel';
import { AccordionStrategy } from './enums/accordion-strategy.enum';
var ClrAccordion = /** @class */ (function () {
    function ClrAccordion(accordionService) {
        this.accordionService = accordionService;
        this.multiPanel = false;
        this.subscriptions = [];
    }
    ClrAccordion.prototype.ngOnInit = function () {
        this.setAccordionStrategy();
    };
    ClrAccordion.prototype.ngOnChanges = function (changes) {
        if (changes.multiPanel.currentValue !== changes.multiPanel.previousValue) {
            this.setAccordionStrategy();
        }
    };
    ClrAccordion.prototype.ngAfterViewInit = function () {
        this.subscriptions.push(this.listenForDOMChanges());
    };
    ClrAccordion.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    ClrAccordion.prototype.setAccordionStrategy = function () {
        var strategy = this.multiPanel ? AccordionStrategy.Multi : AccordionStrategy.Default;
        this.accordionService.setStrategy(strategy);
    };
    ClrAccordion.prototype.listenForDOMChanges = function () {
        var _this = this;
        return this.panels.changes
            .pipe(startWith(this.panels))
            .subscribe(function (panels) { return _this.accordionService.updatePanelOrder(panels.toArray().map(function (p) { return p.id; })); });
    };
    tslib_1.__decorate([
        Input('clrAccordionMultiPanel'),
        tslib_1.__metadata("design:type", Object)
    ], ClrAccordion.prototype, "multiPanel", void 0);
    tslib_1.__decorate([
        ContentChildren(ClrAccordionPanel, { descendants: true }),
        tslib_1.__metadata("design:type", QueryList)
    ], ClrAccordion.prototype, "panels", void 0);
    ClrAccordion = tslib_1.__decorate([
        Component({
            selector: 'clr-accordion',
            template: "<ng-content></ng-content>",
            host: { '[class.clr-accordion]': 'true' },
            providers: [AccordionService],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        tslib_1.__metadata("design:paramtypes", [AccordionService])
    ], ClrAccordion);
    return ClrAccordion;
}());
export { ClrAccordion };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiYWNjb3JkaW9uL2FjY29yZGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFDTCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsS0FBSyxHQU1OLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQVNwRTtJQU1FLHNCQUFvQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUxyQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBR3BELGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztJQUVzQixDQUFDO0lBRTFELCtCQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsa0NBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEtBQUssT0FBTyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUU7WUFDeEUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRUQsc0NBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELGtDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU8sMkNBQW9CLEdBQTVCO1FBQ0UsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7UUFDdkYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRU8sMENBQW1CLEdBQTNCO1FBQUEsaUJBSUM7UUFIQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTzthQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM1QixTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxFQUFFLEVBQUosQ0FBSSxDQUFDLENBQUMsRUFBdkUsQ0FBdUUsQ0FBQyxDQUFDO0lBQ2xHLENBQUM7SUFsQ2dDO1FBQWhDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQzs7b0RBQW9CO0lBRXBEO1FBREMsZUFBZSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDOzBDQUNsRCxTQUFTO2dEQUFvQjtJQUgxQixZQUFZO1FBUHhCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSwyQkFBMkI7WUFDckMsSUFBSSxFQUFFLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxFQUFFO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO1lBQzdCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7aURBT3NDLGdCQUFnQjtPQU4zQyxZQUFZLENBb0N4QjtJQUFELG1CQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7U0FwQ1ksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIElucHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPbkluaXQsXG4gIE9uQ2hhbmdlcyxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBY2NvcmRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvYWNjb3JkaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQWNjb3JkaW9uUGFuZWwgfSBmcm9tICcuL2FjY29yZGlvbi1wYW5lbCc7XG5pbXBvcnQgeyBBY2NvcmRpb25TdHJhdGVneSB9IGZyb20gJy4vZW51bXMvYWNjb3JkaW9uLXN0cmF0ZWd5LmVudW0nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItYWNjb3JkaW9uJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbiAgaG9zdDogeyAnW2NsYXNzLmNsci1hY2NvcmRpb25dJzogJ3RydWUnIH0sXG4gIHByb3ZpZGVyczogW0FjY29yZGlvblNlcnZpY2VdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQWNjb3JkaW9uIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgnY2xyQWNjb3JkaW9uTXVsdGlQYW5lbCcpIG11bHRpUGFuZWwgPSBmYWxzZTtcbiAgQENvbnRlbnRDaGlsZHJlbihDbHJBY2NvcmRpb25QYW5lbCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBwYW5lbHM6IFF1ZXJ5TGlzdDxDbHJBY2NvcmRpb25QYW5lbD47XG4gIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhY2NvcmRpb25TZXJ2aWNlOiBBY2NvcmRpb25TZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2V0QWNjb3JkaW9uU3RyYXRlZ3koKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5tdWx0aVBhbmVsLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlcy5tdWx0aVBhbmVsLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0QWNjb3JkaW9uU3RyYXRlZ3koKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5saXN0ZW5Gb3JET01DaGFuZ2VzKCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRBY2NvcmRpb25TdHJhdGVneSgpIHtcbiAgICBjb25zdCBzdHJhdGVneSA9IHRoaXMubXVsdGlQYW5lbCA/IEFjY29yZGlvblN0cmF0ZWd5Lk11bHRpIDogQWNjb3JkaW9uU3RyYXRlZ3kuRGVmYXVsdDtcbiAgICB0aGlzLmFjY29yZGlvblNlcnZpY2Uuc2V0U3RyYXRlZ3koc3RyYXRlZ3kpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JET01DaGFuZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLnBhbmVscy5jaGFuZ2VzXG4gICAgICAucGlwZShzdGFydFdpdGgodGhpcy5wYW5lbHMpKVxuICAgICAgLnN1YnNjcmliZShwYW5lbHMgPT4gdGhpcy5hY2NvcmRpb25TZXJ2aWNlLnVwZGF0ZVBhbmVsT3JkZXIocGFuZWxzLnRvQXJyYXkoKS5tYXAocCA9PiBwLmlkKSkpO1xuICB9XG59XG4iXX0=