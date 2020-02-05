import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, EventEmitter, Inject, Output, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DomAdapter } from '../../../utils/dom-adapter/dom-adapter';
import { DatagridRenderStep } from '../enums/render-step.enum';
import { ColumnResizerService } from '../providers/column-resizer.service';
import { HIDDEN_COLUMN_CLASS, STRICT_WIDTH_CLASS } from './constants';
import { DatagridRenderOrganizer } from './render-organizer';
import { DatagridColumnChanges } from '../enums/column-changes.enum';
import { COLUMN_STATE, COLUMN_STATE_PROVIDER } from '../providers/column-state.provider';
import { ColumnsService } from '../providers/columns.service';
let DatagridHeaderRenderer = class DatagridHeaderRenderer {
    constructor(el, renderer, organizer, domAdapter, columnResizerService, columnsService, columnState) {
        this.el = el;
        this.renderer = renderer;
        this.organizer = organizer;
        this.domAdapter = domAdapter;
        this.columnResizerService = columnResizerService;
        this.columnsService = columnsService;
        this.columnState = columnState;
        this.resizeEmitter = new EventEmitter();
        /**
         * Indicates if the column has a strict width, so it doesn't shrink or expand based on the content.
         */
        this.widthSet = false;
        this.autoSet = false;
        this.subscriptions = [];
        this.subscriptions.push(this.organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe(() => this.clearWidth()));
        this.subscriptions.push(columnState.subscribe(state => this.stateChanges(state)));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    stateChanges(state) {
        if (state.changes && state.changes.length) {
            state.changes.forEach(change => {
                switch (change) {
                    case DatagridColumnChanges.WIDTH:
                        this.setWidth(state);
                        break;
                    case DatagridColumnChanges.HIDDEN:
                        this.setHidden(state);
                        break;
                    default:
                        break;
                }
            });
        }
    }
    clearWidth() {
        // remove the width only if we set it, and it is not changed by dragging.
        if (this.widthSet && !this.columnResizerService.resizedBy) {
            this.renderer.setStyle(this.el.nativeElement, 'width', null);
        }
        if (this.autoSet) {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
    }
    detectStrictWidth() {
        if (this.columnResizerService.resizedBy) {
            return this.columnResizerService.widthAfterResize;
        }
        else if (this.autoSet) {
            return 0;
        }
        else {
            return this.domAdapter.userDefinedWidth(this.el.nativeElement);
        }
    }
    computeWidth(strictWidth) {
        let width = strictWidth;
        if (!width) {
            width = this.domAdapter.scrollWidth(this.el.nativeElement);
        }
        return width;
    }
    getColumnWidthState() {
        const strictWidth = this.detectStrictWidth();
        return {
            width: this.computeWidth(strictWidth),
            strictWidth: strictWidth,
        };
    }
    setColumnState(index) {
        this.columnsService.columns[index] = this.columnState;
    }
    setWidth(state) {
        if (state.strictWidth) {
            if (this.columnResizerService.resizedBy) {
                this.resizeEmitter.emit(state.width);
                this.renderer.setStyle(this.el.nativeElement, 'width', state.width + 'px');
                this.widthSet = false;
            }
            // Don't set width if there is a user-defined one. Just add the strict width class.
            this.renderer.addClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
            this.autoSet = false;
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
            this.renderer.setStyle(this.el.nativeElement, 'width', state.width + 'px');
            this.widthSet = true;
            this.autoSet = true;
        }
    }
    setHidden(state) {
        if (state.hidden) {
            this.renderer.addClass(this.el.nativeElement, HIDDEN_COLUMN_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, HIDDEN_COLUMN_CLASS);
        }
    }
};
tslib_1.__decorate([
    Output('clrDgColumnResize'),
    tslib_1.__metadata("design:type", EventEmitter)
], DatagridHeaderRenderer.prototype, "resizeEmitter", void 0);
DatagridHeaderRenderer = tslib_1.__decorate([
    Directive({ selector: 'clr-dg-column', providers: [ColumnResizerService, COLUMN_STATE_PROVIDER] }),
    tslib_1.__param(6, Inject(COLUMN_STATE)),
    tslib_1.__metadata("design:paramtypes", [ElementRef,
        Renderer2,
        DatagridRenderOrganizer,
        DomAdapter,
        ColumnResizerService,
        ColumnsService,
        BehaviorSubject])
], DatagridHeaderRenderer);
export { DatagridHeaderRenderer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLXJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9yZW5kZXIvaGVhZGVyLXJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSxlQUFlLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRXJELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUc5RCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQUNqQyxZQUNVLEVBQWMsRUFDZCxRQUFtQixFQUNuQixTQUFrQyxFQUNsQyxVQUFzQixFQUN0QixvQkFBMEMsRUFDMUMsY0FBOEIsRUFDUixXQUF5QztRQU4vRCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixjQUFTLEdBQVQsU0FBUyxDQUF5QjtRQUNsQyxlQUFVLEdBQVYsVUFBVSxDQUFZ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QztZQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNyQjtJQUNILENBQUM7SUFFTyxTQUFTLENBQUMsS0FBa0I7UUFDbEMsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLG1CQUFtQixDQUFDLENBQUM7U0FDcEU7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLG1CQUFtQixDQUFDLENBQUM7U0FDdkU7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQWhHOEI7SUFBNUIsTUFBTSxDQUFDLG1CQUFtQixDQUFDO3NDQUFnQixZQUFZOzZEQUE4QjtBQWpCM0Usc0JBQXNCO0lBRGxDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLENBQUMsb0JBQW9CLEVBQUUscUJBQXFCLENBQUMsRUFBRSxDQUFDO0lBUzlGLG1CQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTs2Q0FOVCxVQUFVO1FBQ0osU0FBUztRQUNSLHVCQUF1QjtRQUN0QixVQUFVO1FBQ0Esb0JBQW9CO1FBQzFCLGNBQWM7UUFDSyxlQUFlO0dBUmpELHNCQUFzQixDQWlIbEM7U0FqSFksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgT25EZXN0cm95LCBPdXRwdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRG9tQWRhcHRlciB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2RvbS1hZGFwdGVyL2RvbS1hZGFwdGVyJztcbmltcG9ydCB7IERhdGFncmlkUmVuZGVyU3RlcCB9IGZyb20gJy4uL2VudW1zL3JlbmRlci1zdGVwLmVudW0nO1xuaW1wb3J0IHsgQ29sdW1uUmVzaXplclNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvY29sdW1uLXJlc2l6ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBISURERU5fQ09MVU1OX0NMQVNTLCBTVFJJQ1RfV0lEVEhfQ0xBU1MgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplciB9IGZyb20gJy4vcmVuZGVyLW9yZ2FuaXplcic7XG5pbXBvcnQgeyBDb2x1bW5TdGF0ZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvY29sdW1uLXN0YXRlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBEYXRhZ3JpZENvbHVtbkNoYW5nZXMgfSBmcm9tICcuLi9lbnVtcy9jb2x1bW4tY2hhbmdlcy5lbnVtJztcbmltcG9ydCB7IENPTFVNTl9TVEFURSwgQ09MVU1OX1NUQVRFX1BST1ZJREVSIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2NvbHVtbi1zdGF0ZS5wcm92aWRlcic7XG5pbXBvcnQgeyBDb2x1bW5zU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9jb2x1bW5zLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdjbHItZGctY29sdW1uJywgcHJvdmlkZXJzOiBbQ29sdW1uUmVzaXplclNlcnZpY2UsIENPTFVNTl9TVEFURV9QUk9WSURFUl0gfSlcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZEhlYWRlclJlbmRlcmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBvcmdhbml6ZXI6IERhdGFncmlkUmVuZGVyT3JnYW5pemVyLFxuICAgIHByaXZhdGUgZG9tQWRhcHRlcjogRG9tQWRhcHRlcixcbiAgICBwcml2YXRlIGNvbHVtblJlc2l6ZXJTZXJ2aWNlOiBDb2x1bW5SZXNpemVyU2VydmljZSxcbiAgICBwcml2YXRlIGNvbHVtbnNTZXJ2aWNlOiBDb2x1bW5zU2VydmljZSxcbiAgICBASW5qZWN0KENPTFVNTl9TVEFURSkgcHJpdmF0ZSBjb2x1bW5TdGF0ZTogQmVoYXZpb3JTdWJqZWN0PENvbHVtblN0YXRlPlxuICApIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMub3JnYW5pemVyLmZpbHRlclJlbmRlclN0ZXBzKERhdGFncmlkUmVuZGVyU3RlcC5DTEVBUl9XSURUSFMpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsZWFyV2lkdGgoKSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goY29sdW1uU3RhdGUuc3Vic2NyaWJlKHN0YXRlID0+IHRoaXMuc3RhdGVDaGFuZ2VzKHN0YXRlKSkpO1xuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdDb2x1bW5SZXNpemUnKSByZXNpemVFbWl0dGVyOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBjb2x1bW4gaGFzIGEgc3RyaWN0IHdpZHRoLCBzbyBpdCBkb2Vzbid0IHNocmluayBvciBleHBhbmQgYmFzZWQgb24gdGhlIGNvbnRlbnQuXG4gICAqL1xuICBwcml2YXRlIHdpZHRoU2V0OiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgYXV0b1NldDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0ZUNoYW5nZXMoc3RhdGU6IENvbHVtblN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLmNoYW5nZXMgJiYgc3RhdGUuY2hhbmdlcy5sZW5ndGgpIHtcbiAgICAgIHN0YXRlLmNoYW5nZXMuZm9yRWFjaChjaGFuZ2UgPT4ge1xuICAgICAgICBzd2l0Y2ggKGNoYW5nZSkge1xuICAgICAgICAgIGNhc2UgRGF0YWdyaWRDb2x1bW5DaGFuZ2VzLldJRFRIOlxuICAgICAgICAgICAgdGhpcy5zZXRXaWR0aChzdGF0ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIERhdGFncmlkQ29sdW1uQ2hhbmdlcy5ISURERU46XG4gICAgICAgICAgICB0aGlzLnNldEhpZGRlbihzdGF0ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJXaWR0aCgpIHtcbiAgICAvLyByZW1vdmUgdGhlIHdpZHRoIG9ubHkgaWYgd2Ugc2V0IGl0LCBhbmQgaXQgaXMgbm90IGNoYW5nZWQgYnkgZHJhZ2dpbmcuXG4gICAgaWYgKHRoaXMud2lkdGhTZXQgJiYgIXRoaXMuY29sdW1uUmVzaXplclNlcnZpY2UucmVzaXplZEJ5KSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgbnVsbCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmF1dG9TZXQpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBTVFJJQ1RfV0lEVEhfQ0xBU1MpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0U3RyaWN0V2lkdGgoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5jb2x1bW5SZXNpemVyU2VydmljZS5yZXNpemVkQnkpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbHVtblJlc2l6ZXJTZXJ2aWNlLndpZHRoQWZ0ZXJSZXNpemU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmF1dG9TZXQpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5kb21BZGFwdGVyLnVzZXJEZWZpbmVkV2lkdGgodGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNvbXB1dGVXaWR0aChzdHJpY3RXaWR0aDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBsZXQgd2lkdGg6IG51bWJlciA9IHN0cmljdFdpZHRoO1xuICAgIGlmICghd2lkdGgpIHtcbiAgICAgIHdpZHRoID0gdGhpcy5kb21BZGFwdGVyLnNjcm9sbFdpZHRoKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICAgIHJldHVybiB3aWR0aDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb2x1bW5XaWR0aFN0YXRlKCk6IFBhcnRpYWw8Q29sdW1uU3RhdGU+IHtcbiAgICBjb25zdCBzdHJpY3RXaWR0aCA9IHRoaXMuZGV0ZWN0U3RyaWN0V2lkdGgoKTtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IHRoaXMuY29tcHV0ZVdpZHRoKHN0cmljdFdpZHRoKSxcbiAgICAgIHN0cmljdFdpZHRoOiBzdHJpY3RXaWR0aCxcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHNldENvbHVtblN0YXRlKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnNbaW5kZXhdID0gdGhpcy5jb2x1bW5TdGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0V2lkdGgoc3RhdGU6IENvbHVtblN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLnN0cmljdFdpZHRoKSB7XG4gICAgICBpZiAodGhpcy5jb2x1bW5SZXNpemVyU2VydmljZS5yZXNpemVkQnkpIHtcbiAgICAgICAgdGhpcy5yZXNpemVFbWl0dGVyLmVtaXQoc3RhdGUud2lkdGgpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgc3RhdGUud2lkdGggKyAncHgnKTtcbiAgICAgICAgdGhpcy53aWR0aFNldCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gRG9uJ3Qgc2V0IHdpZHRoIGlmIHRoZXJlIGlzIGEgdXNlci1kZWZpbmVkIG9uZS4gSnVzdCBhZGQgdGhlIHN0cmljdCB3aWR0aCBjbGFzcy5cbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBTVFJJQ1RfV0lEVEhfQ0xBU1MpO1xuICAgICAgdGhpcy5hdXRvU2V0ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBTVFJJQ1RfV0lEVEhfQ0xBU1MpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIHN0YXRlLndpZHRoICsgJ3B4Jyk7XG4gICAgICB0aGlzLndpZHRoU2V0ID0gdHJ1ZTtcbiAgICAgIHRoaXMuYXV0b1NldCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRIaWRkZW4oc3RhdGU6IENvbHVtblN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLmhpZGRlbikge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIEhJRERFTl9DT0xVTU5fQ0xBU1MpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgSElEREVOX0NPTFVNTl9DTEFTUyk7XG4gICAgfVxuICB9XG59XG4iXX0=