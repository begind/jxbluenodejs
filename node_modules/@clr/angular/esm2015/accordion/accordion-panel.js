/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, Inject, ContentChildren, QueryList, } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UNIQUE_ID_PROVIDER, UNIQUE_ID } from '../utils/id-generator/id-generator.service';
import { ClrCommonStringsService } from '../utils/i18n/common-strings.service';
import { AccordionService } from './providers/accordion.service';
import { AccordionStatus } from './enums/accordion-status.enum';
import { panelAnimation } from './utils/animation';
import { IfExpandService } from '../utils/conditional/if-expanded.service';
import { ClrAccordionDescription } from './accordion-description';
let ClrAccordionPanel = class ClrAccordionPanel {
    constructor(commonStrings, accordionService, ifExpandService, id) {
        this.commonStrings = commonStrings;
        this.accordionService = accordionService;
        this.ifExpandService = ifExpandService;
        this.id = id;
        this.disabled = false;
        this.panelOpen = false;
        this.panelOpenChange = new EventEmitter();
        this.AccordionStatus = AccordionStatus;
        this.isAccordion = true;
    }
    ngOnInit() {
        this.panel = this.accordionService.getPanelChanges(this.id).pipe(tap(panel => this.emitPanelChange(panel)));
        this.accordionService.addPanel(this.id, this.panelOpen);
        this.accordionService.togglePanel(this.id, this.panelOpen);
        this.accordionService.disablePanel(this.id, this.disabled);
    }
    ngOnChanges(changes) {
        if (this.panel && changes.panelOpen && changes.panelOpen.currentValue !== changes.panelOpen.previousValue) {
            this.accordionService.togglePanel(this.id, changes.panelOpen.currentValue);
        }
        if (this.panel && changes.disabled && changes.disabled.currentValue !== changes.disabled.previousValue) {
            this.accordionService.disablePanel(this.id, changes.disabled.currentValue);
        }
    }
    togglePanel() {
        this.accordionService.togglePanel(this.id);
    }
    collapsePanelOnAnimationDone(panel) {
        if (!panel.open) {
            this.ifExpandService.expanded = false;
        }
    }
    getPanelStateClasses(panel) {
        return `clr-accordion-panel-${panel.status} ${panel.open ? 'clr-accordion-panel-open' : ''}`;
    }
    getAccordionContentId(id) {
        return `clr-accordion-content-${id}'`;
    }
    getAccordionHeaderId(id) {
        return `clr-accordion-header-${id}`;
    }
    emitPanelChange(panel) {
        this.panelOpenChange.emit(panel.open);
        if (panel.open) {
            this.ifExpandService.expanded = true;
        }
    }
};
tslib_1.__decorate([
    Input('clrAccordionPanelDisabled'),
    tslib_1.__metadata("design:type", Object)
], ClrAccordionPanel.prototype, "disabled", void 0);
tslib_1.__decorate([
    Input('clrAccordionPanelOpen'),
    tslib_1.__metadata("design:type", Object)
], ClrAccordionPanel.prototype, "panelOpen", void 0);
tslib_1.__decorate([
    Output('clrAccordionPanelOpenChange'),
    tslib_1.__metadata("design:type", Object)
], ClrAccordionPanel.prototype, "panelOpenChange", void 0);
tslib_1.__decorate([
    ContentChildren(ClrAccordionDescription),
    tslib_1.__metadata("design:type", QueryList)
], ClrAccordionPanel.prototype, "accordionDescription", void 0);
ClrAccordionPanel = tslib_1.__decorate([
    Component({
        selector: 'clr-accordion-panel',
        template: "<ng-container *ngIf=\"panel | async; let panel\">\n  <div *ngIf=\"panel.status !== AccordionStatus.Inactive\" aria-live=\"assertive\" class=\"clr-sr-only\">\n    <ng-container *ngIf=\"panel.status === AccordionStatus.Error\">{{commonStrings.keys.danger}}</ng-container>\n  </div>\n\n  <div role=\"group\" [ngClass]=\"getPanelStateClasses(panel)\">\n    <div class=\"clr-accordion-header\">\n      <button\n        type=\"button\"\n        class=\"clr-accordion-header-button\"\n        (click)=\"togglePanel()\"\n        [id]=\"getAccordionHeaderId(panel.templateId)\"\n        [disabled]=\"isAccordion && panel.disabled\"\n        [attr.aria-disabled]=\"!isAccordion && panel.disabled\"\n        [attr.aria-controls]=\"getAccordionContentId(panel.templateId)\"\n        [attr.aria-expanded]=\"panel.open\"\n        [class.clr-accordion-header-has-description]=\"(accordionDescription.changes | async)?.length || accordionDescription.length\"\n        #headerButton\n      >\n        <span class=\"clr-sr-only\">\n          <ng-container *ngIf=\"panel.status === AccordionStatus.Error\">{{commonStrings.keys.danger}}</ng-container>\n          <ng-container *ngIf=\"panel.status === AccordionStatus.Complete\">{{commonStrings.keys.success}}</ng-container>\n        </span>\n        <span class=\"clr-accordion-status\">\n          <clr-icon shape=\"angle\" dir=\"right\" class=\"clr-accordion-angle\"></clr-icon>\n          <span class=\"clr-accordion-number\"></span>\n          <clr-icon shape=\"exclamation-circle\" class=\"clr-accordion-error-icon\"></clr-icon>\n          <clr-icon shape=\"check-circle\" class=\"clr-accordion-complete-icon\"></clr-icon>\n        </span>\n        <ng-content select=\"clr-accordion-title, clr-step-title\"></ng-content>\n        <ng-content select=\"clr-accordion-description, clr-step-description\"></ng-content>\n      </button>\n    </div>\n    <div\n      @skipInitialRender\n      role=\"region\"\n      [id]=\"getAccordionContentId(panel.templateId)\"\n      [attr.aria-hidden]=\"!panel.open\"\n      [attr.aria-labelledby]=\"getAccordionHeaderId(panel.templateId)\"\n    >\n      <div\n        *ngIf=\"panel.open\"\n        @toggle\n        (@toggle.done)=\"collapsePanelOnAnimationDone(panel)\"\n        class=\"clr-accordion-content\">\n        <div class=\"clr-accordion-inner-content\">\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-container>\n",
        host: { '[class.clr-accordion-panel]': 'true' },
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: panelAnimation,
        providers: [IfExpandService, UNIQUE_ID_PROVIDER]
    }),
    tslib_1.__param(3, Inject(UNIQUE_ID)),
    tslib_1.__metadata("design:paramtypes", [ClrCommonStringsService,
        AccordionService,
        IfExpandService, String])
], ClrAccordionPanel);
export { ClrAccordionPanel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLXBhbmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiYWNjb3JkaW9uL2FjY29yZGlvbi1wYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFDTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLEtBQUssRUFDTCxZQUFZLEVBQ1osTUFBTSxFQUVOLE1BQU0sRUFHTixlQUFlLEVBQ2YsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDM0YsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFFM0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFVbEUsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFVNUIsWUFDUyxhQUFzQyxFQUNyQyxnQkFBa0MsRUFDbEMsZUFBZ0MsRUFDZCxFQUFVO1FBSDdCLGtCQUFhLEdBQWIsYUFBYSxDQUF5QjtRQUNyQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNkLE9BQUUsR0FBRixFQUFFLENBQVE7UUFiRixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDWCxvQkFBZSxHQUFHLElB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K0RBQTBCO0FBSnhGLGlCQUFpQjtJQVI3QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLHU1RUFBcUM7UUFDckMsSUFBSSxFQUFFLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxFQUFFO1FBQy9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1FBQy9DLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFNBQVMsRUFBRSxDQUFDLGVBQWUsRUFBRSxrQkFBa0IsQ0FBQztLQUNqRCxDQUFDO0lBZUcsbUJBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBOzZDQUhJLHVCQUF1QjtRQUNuQixnQkFBZ0I7UUFDakIsZUFBZTtHQWIvQixpQkFBaUIsQ0ErRDdCO1NBL0RZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgSW5wdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBJbmplY3QsXG4gIE9uSW5pdCxcbiAgT25DaGFuZ2VzLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFVOSVFVRV9JRF9QUk9WSURFUiwgVU5JUVVFX0lEIH0gZnJvbSAnLi4vdXRpbHMvaWQtZ2VuZXJhdG9yL2lkLWdlbmVyYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlIH0gZnJvbSAnLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5zZXJ2aWNlJztcbmltcG9ydCB7IEFjY29yZGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9hY2NvcmRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBBY2NvcmRpb25TdGF0dXMgfSBmcm9tICcuL2VudW1zL2FjY29yZGlvbi1zdGF0dXMuZW51bSc7XG5pbXBvcnQgeyBwYW5lbEFuaW1hdGlvbiB9IGZyb20gJy4vdXRpbHMvYW5pbWF0aW9uJztcbmltcG9ydCB7IElmRXhwYW5kU2VydmljZSB9IGZyb20gJy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLWV4cGFuZGVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWNjb3JkaW9uUGFuZWxNb2RlbCB9IGZyb20gJy4vbW9kZWxzL2FjY29yZGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBDbHJBY2NvcmRpb25EZXNjcmlwdGlvbiB9IGZyb20gJy4vYWNjb3JkaW9uLWRlc2NyaXB0aW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWFjY29yZGlvbi1wYW5lbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9hY2NvcmRpb24tcGFuZWwuaHRtbCcsXG4gIGhvc3Q6IHsgJ1tjbGFzcy5jbHItYWNjb3JkaW9uLXBhbmVsXSc6ICd0cnVlJyB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogcGFuZWxBbmltYXRpb24sXG4gIHByb3ZpZGVyczogW0lmRXhwYW5kU2VydmljZSwgVU5JUVVFX0lEX1BST1ZJREVSXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQWNjb3JkaW9uUGFuZWwgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgnY2xyQWNjb3JkaW9uUGFuZWxEaXNhYmxlZCcpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgnY2xyQWNjb3JkaW9uUGFuZWxPcGVuJykgcGFuZWxPcGVuID0gZmFsc2U7XG4gIEBPdXRwdXQoJ2NsckFjY29yZGlvblBhbmVsT3BlbkNoYW5nZScpIHBhbmVsT3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQENvbnRlbnRDaGlsZHJlbihDbHJBY2NvcmRpb25EZXNjcmlwdGlvbikgYWNjb3JkaW9uRGVzY3JpcHRpb246IFF1ZXJ5TGlzdDxDbHJBY2NvcmRpb25EZXNjcmlwdGlvbj47XG5cbiAgcGFuZWw6IE9ic2VydmFibGU8QWNjb3JkaW9uUGFuZWxNb2RlbD47XG4gIHJlYWRvbmx5IEFjY29yZGlvblN0YXR1cyA9IEFjY29yZGlvblN0YXR1cztcbiAgaXNBY2NvcmRpb24gPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzU2VydmljZSxcbiAgICBwcml2YXRlIGFjY29yZGlvblNlcnZpY2U6IEFjY29yZGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBpZkV4cGFuZFNlcnZpY2U6IElmRXhwYW5kU2VydmljZSxcbiAgICBASW5qZWN0KFVOSVFVRV9JRCkgcHVibGljIGlkOiBzdHJpbmdcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGFuZWwgPSB0aGlzLmFjY29yZGlvblNlcnZpY2UuZ2V0UGFuZWxDaGFuZ2VzKHRoaXMuaWQpLnBpcGUodGFwKHBhbmVsID0+IHRoaXMuZW1pdFBhbmVsQ2hhbmdlKHBhbmVsKSkpO1xuICAgIHRoaXMuYWNjb3JkaW9uU2VydmljZS5hZGRQYW5lbCh0aGlzLmlkLCB0aGlzLnBhbmVsT3Blbik7XG4gICAgdGhpcy5hY2NvcmRpb25TZXJ2aWNlLnRvZ2dsZVBhbmVsKHRoaXMuaWQsIHRoaXMucGFuZWxPcGVuKTtcbiAgICB0aGlzLmFjY29yZGlvblNlcnZpY2UuZGlzYWJsZVBhbmVsKHRoaXMuaWQsIHRoaXMuZGlzYWJsZWQpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICh0aGlzLnBhbmVsICYmIGNoYW5nZXMucGFuZWxPcGVuICYmIGNoYW5nZXMucGFuZWxPcGVuLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlcy5wYW5lbE9wZW4ucHJldmlvdXNWYWx1ZSkge1xuICAgICAgdGhpcy5hY2NvcmRpb25TZXJ2aWNlLnRvZ2dsZVBhbmVsKHRoaXMuaWQsIGNoYW5nZXMucGFuZWxPcGVuLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGFuZWwgJiYgY2hhbmdlcy5kaXNhYmxlZCAmJiBjaGFuZ2VzLmRpc2FibGVkLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlcy5kaXNhYmxlZC5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICB0aGlzLmFjY29yZGlvblNlcnZpY2UuZGlzYWJsZVBhbmVsKHRoaXMuaWQsIGNoYW5nZXMuZGlzYWJsZWQuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVQYW5lbCgpIHtcbiAgICB0aGlzLmFjY29yZGlvblNlcnZpY2UudG9nZ2xlUGFuZWwodGhpcy5pZCk7XG4gIH1cblxuICBjb2xsYXBzZVBhbmVsT25BbmltYXRpb25Eb25lKHBhbmVsOiBBY2NvcmRpb25QYW5lbE1vZGVsKSB7XG4gICAgaWYgKCFwYW5lbC5vcGVuKSB7XG4gICAgICB0aGlzLmlmRXhwYW5kU2VydmljZS5leHBhbmRlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGdldFBhbmVsU3RhdGVDbGFzc2VzKHBhbmVsOiBBY2NvcmRpb25QYW5lbE1vZGVsKSB7XG4gICAgcmV0dXJuIGBjbHItYWNjb3JkaW9uLXBhbmVsLSR7cGFuZWwuc3RhdHVzfSAke3BhbmVsLm9wZW4gPyAnY2xyLWFjY29yZGlvbi1wYW5lbC1vcGVuJyA6ICcnfWA7XG4gIH1cblxuICBnZXRBY2NvcmRpb25Db250ZW50SWQoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiBgY2xyLWFjY29yZGlvbi1jb250ZW50LSR7aWR9J2A7XG4gIH1cblxuICBnZXRBY2NvcmRpb25IZWFkZXJJZChpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGBjbHItYWNjb3JkaW9uLWhlYWRlci0ke2lkfWA7XG4gIH1cblxuICBwcml2YXRlIGVtaXRQYW5lbENoYW5nZShwYW5lbDogQWNjb3JkaW9uUGFuZWxNb2RlbCkge1xuICAgIHRoaXMucGFuZWxPcGVuQ2hhbmdlLmVtaXQocGFuZWwub3Blbik7XG5cbiAgICBpZiAocGFuZWwub3Blbikge1xuICAgICAgdGhpcy5pZkV4cGFuZFNlcnZpY2UuZXhwYW5kZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl19