/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
var ClrButton_1;
import { Component, EventEmitter, Input, Optional, Output, SkipSelf, TemplateRef, ViewChild } from '@angular/core';
import { ClrLoadingState } from '../../utils/loading/loading';
import { LoadingListener } from '../../utils/loading/loading-listener';
import { ButtonInGroupService } from '../providers/button-in-group.service';
let ClrButton = ClrButton_1 = class ClrButton {
    constructor(buttonInGroupService) {
        this.buttonInGroupService = buttonInGroupService;
        this._enableService = false;
        this._inMenu = false;
        this._classNames = 'btn';
        this._name = null;
        this._type = null;
        this._id = null;
        this._disabled = null;
        this._click = new EventEmitter(false);
    }
    get inMenu() {
        return this._inMenu;
    }
    set inMenu(value) {
        value = !!value;
        if (this._inMenu !== value) {
            this._inMenu = value;
            // We check if the service flag is enabled
            // and if the service exists because the service is optional
            if (this._enableService && this.buttonInGroupService) {
                this.buttonInGroupService.updateButtonGroup(this);
            }
        }
    }
    get classNames() {
        return this._classNames;
    }
    set classNames(value) {
        if (typeof value === 'string') {
            const classNames = value.split(' ');
            if (classNames.indexOf('btn') === -1) {
                classNames.push('btn');
            }
            this._classNames = classNames.join(' ');
        }
    }
    get name() {
        return this._name;
    }
    set name(value) {
        if (typeof value === 'string') {
            this._name = value;
        }
    }
    get type() {
        return this._type;
    }
    set type(value) {
        if (typeof value === 'string') {
            this._type = value;
        }
    }
    get id() {
        return this._id;
    }
    set id(value) {
        if (typeof value === 'string') {
            this._id = value;
        }
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        if (value !== null && value !== false) {
            this._disabled = '';
        }
        else {
            this._disabled = null;
        }
    }
    loadingStateChange(state) {
        this.loading = state === ClrLoadingState.LOADING;
    }
    emitClick() {
        this._click.emit(true);
    }
    ngAfterViewInit() {
        this._enableService = true;
    }
};
tslib_1.__decorate([
    ViewChild('buttonProjectedRef', { static: true }),
    tslib_1.__metadata("design:type", TemplateRef)
], ClrButton.prototype, "templateRef", void 0);
tslib_1.__decorate([
    Input('clrInMenu'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrButton.prototype, "inMenu", null);
tslib_1.__decorate([
    Input('class'),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], ClrButton.prototype, "classNames", null);
tslib_1.__decorate([
    Input('name'),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], ClrButton.prototype, "name", null);
tslib_1.__decorate([
    Input('type'),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], ClrButton.prototype, "type", null);
tslib_1.__decorate([
    Input('id'),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], ClrButton.prototype, "id", null);
tslib_1.__decorate([
    Input('disabled'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], ClrButton.prototype, "disabled", null);
tslib_1.__decorate([
    Output('click'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrButton.prototype, "_click", void 0);
ClrButton = ClrButton_1 = tslib_1.__decorate([
    Component({
        selector: 'clr-button',
        template: `
        <ng-template #buttonProjectedRef>
            <button 
                [class]="classNames" 
                (click)="emitClick()"
                [attr.type]="type"
                [attr.name]="name"
                [attr.disabled]="disabled"
                [id]="id">
                <span class="spinner spinner-inline" *ngIf="loading"></span>
                <ng-content></ng-content>
            </button>
        </ng-template>
    `,
        providers: [{ provide: LoadingListener, useExisting: ClrButton_1 }]
    }),
    tslib_1.__param(0, SkipSelf()),
    tslib_1.__param(0, Optional()),
    tslib_1.__metadata("design:paramtypes", [ButtonInGroupService])
], ClrButton);
export { ClrButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiYnV0dG9uL2J1dHRvbi1ncm91cC9idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQW9CNUUsSUFBYSxTQUFTLGlCQUF0QixNQUFhLFNBQVM7SUFNcEIsWUFHUyxvQkFBMEM7UUFBMUMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQVIzQyxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQVdoQyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBbUJ6QixnQkFBVyxHQUFXLEtBQUssQ0FBQztRQWlCNUIsVUFBSyxHQUFXLElBQUksQ0FBQztRQWFyQixVQUFLLEdBQVcsSUFBSSxDQUFDO1FBYXJCLFFBQUcsR0FBVyxJQUFJLENBQUM7UUFhbkIsY0FBUyxHQUFRLElBQUksQ0FBQztRQXFCYixXQUFNLEdBQTBCLElBQUksWUFBWSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBbEcvRSxDQUFDO0lBSUosSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFHRCxJQUFJLE1BQU0sQ0FBQyxLQUFjO1FBQ3ZCLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2hCLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUU7WUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsMENBQTBDO1lBQzFDLDREQUE0RDtZQUM1RCxJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO2dCQUNwRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbkQ7U0FDRjtJQUNILENBQUM7SUFJRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUdELElBQUksVUFBVSxDQUFDLEtBQWE7UUFDMUIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsTUFBTSxVQUFVLEdBQWEsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3BDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDeEI7WUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBSUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFHRCxJQUFJLElBQUksQ0FBQyxLQUFhO1FBQ3BCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUlELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBR0QsSUFBSSxJQUFJLENBQUMsS0FBYTtRQUNwQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUNwQjtJQUNILENBQUM7SUFJRCxJQUFJLEVBQUU7UUFDSixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUdELElBQUksRUFBRSxDQUFDLEtBQWE7UUFDbEIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7U0FDbEI7SUFDSCxDQUFDO0lBSUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFHRCxJQUFJLFFBQVEsQ0FBQyxLQUFVO1FBQ3JCLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1NBQ3JCO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN2QjtJQUNILENBQUM7SUFJRCxrQkFBa0IsQ0FBQyxLQUFzQjtRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssS0FBSyxlQUFlLENBQUMsT0FBTyxDQUFDO0lBQ25ELENBQUM7SUFJRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztJQUM3QixDQUFDO0NBQ0YsQ0FBQTtBQWpIQztJQURDLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztzQ0FDckMsV0FBVzs4Q0FBWTtBQWVwQztJQURDLEtBQUssQ0FBQyxXQUFXLENBQUM7Ozt1Q0FXbEI7QUFTRDtJQURDLEtBQUssQ0FBQyxPQUFPLENBQUM7OzsyQ0FTZDtBQVNEO0lBREMsS0FBSyxDQUFDLE1BQU0sQ0FBQzs7O3FDQUtiO0FBU0Q7SUFEQyxLQUFLLENBQUMsTUFBTSxDQUFDOzs7cUNBS2I7QUFTRDtJQURDLEtBQUssQ0FBQyxJQUFJLENBQUM7OzttQ0FLWDtBQVNEO0lBREMsS0FBSyxDQUFDLFVBQVUsQ0FBQzs7O3lDQU9qQjtBQVFnQjtJQUFoQixNQUFNLENBQUMsT0FBTyxDQUFDO3NDQUFTLFlBQVk7eUNBQTZDO0FBNUd2RSxTQUFTO0lBbEJyQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsWUFBWTtRQUN0QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7S0FhUDtRQUNILFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsV0FBUyxFQUFFLENBQUM7S0FDbEUsQ0FBQztJQVFHLG1CQUFBLFFBQVEsRUFBRSxDQUFBO0lBQ1YsbUJBQUEsUUFBUSxFQUFFLENBQUE7NkNBQ2tCLG9CQUFvQjtHQVR4QyxTQUFTLENBcUhyQjtTQXJIWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9wdGlvbmFsLCBPdXRwdXQsIFNraXBTZWxmLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENsckxvYWRpbmdTdGF0ZSB9IGZyb20gJy4uLy4uL3V0aWxzL2xvYWRpbmcvbG9hZGluZyc7XG5pbXBvcnQgeyBMb2FkaW5nTGlzdGVuZXIgfSBmcm9tICcuLi8uLi91dGlscy9sb2FkaW5nL2xvYWRpbmctbGlzdGVuZXInO1xuaW1wb3J0IHsgQnV0dG9uSW5Hcm91cFNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvYnV0dG9uLWluLWdyb3VwLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItYnV0dG9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLXRlbXBsYXRlICNidXR0b25Qcm9qZWN0ZWRSZWY+XG4gICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgIFtjbGFzc109XCJjbGFzc05hbWVzXCIgXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImVtaXRDbGljaygpXCJcbiAgICAgICAgICAgICAgICBbYXR0ci50eXBlXT1cInR5cGVcIlxuICAgICAgICAgICAgICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgIFtpZF09XCJpZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Bpbm5lciBzcGlubmVyLWlubGluZVwiICpuZ0lmPVwibG9hZGluZ1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IExvYWRpbmdMaXN0ZW5lciwgdXNlRXhpc3Rpbmc6IENsckJ1dHRvbiB9XSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQnV0dG9uIGltcGxlbWVudHMgTG9hZGluZ0xpc3RlbmVyIHtcbiAgcHJpdmF0ZSBfZW5hYmxlU2VydmljZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBWaWV3Q2hpbGQoJ2J1dHRvblByb2plY3RlZFJlZicsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxDbHJCdXR0b24+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBTa2lwU2VsZigpXG4gICAgQE9wdGlvbmFsKClcbiAgICBwdWJsaWMgYnV0dG9uSW5Hcm91cFNlcnZpY2U6IEJ1dHRvbkluR3JvdXBTZXJ2aWNlXG4gICkge31cblxuICBwcml2YXRlIF9pbk1lbnU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBnZXQgaW5NZW51KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pbk1lbnU7XG4gIH1cblxuICBASW5wdXQoJ2NsckluTWVudScpXG4gIHNldCBpbk1lbnUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgaWYgKHRoaXMuX2luTWVudSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2luTWVudSA9IHZhbHVlO1xuICAgICAgLy8gV2UgY2hlY2sgaWYgdGhlIHNlcnZpY2UgZmxhZyBpcyBlbmFibGVkXG4gICAgICAvLyBhbmQgaWYgdGhlIHNlcnZpY2UgZXhpc3RzIGJlY2F1c2UgdGhlIHNlcnZpY2UgaXMgb3B0aW9uYWxcbiAgICAgIGlmICh0aGlzLl9lbmFibGVTZXJ2aWNlICYmIHRoaXMuYnV0dG9uSW5Hcm91cFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5idXR0b25Jbkdyb3VwU2VydmljZS51cGRhdGVCdXR0b25Hcm91cCh0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jbGFzc05hbWVzOiBzdHJpbmcgPSAnYnRuJztcblxuICBnZXQgY2xhc3NOYW1lcygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jbGFzc05hbWVzO1xuICB9XG5cbiAgQElucHV0KCdjbGFzcycpXG4gIHNldCBjbGFzc05hbWVzKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgY2xhc3NOYW1lczogc3RyaW5nW10gPSB2YWx1ZS5zcGxpdCgnICcpO1xuICAgICAgaWYgKGNsYXNzTmFtZXMuaW5kZXhPZignYnRuJykgPT09IC0xKSB7XG4gICAgICAgIGNsYXNzTmFtZXMucHVzaCgnYnRuJyk7XG4gICAgICB9XG4gICAgICB0aGlzLl9jbGFzc05hbWVzID0gY2xhc3NOYW1lcy5qb2luKCcgJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nID0gbnVsbDtcblxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG5cbiAgQElucHV0KCduYW1lJylcbiAgc2V0IG5hbWUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdHlwZTogc3RyaW5nID0gbnVsbDtcblxuICBnZXQgdHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl90eXBlO1xuICB9XG5cbiAgQElucHV0KCd0eXBlJylcbiAgc2V0IHR5cGUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl90eXBlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZyA9IG51bGw7XG5cbiAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG5cbiAgQElucHV0KCdpZCcpXG4gIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX2lkID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGFueSA9IG51bGw7XG5cbiAgZ2V0IGRpc2FibGVkKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG5cbiAgQElucHV0KCdkaXNhYmxlZCcpXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSBmYWxzZSkge1xuICAgICAgdGhpcy5fZGlzYWJsZWQgPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGlzYWJsZWQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBsb2FkaW5nOiBib29sZWFuO1xuXG4gIGxvYWRpbmdTdGF0ZUNoYW5nZShzdGF0ZTogQ2xyTG9hZGluZ1N0YXRlKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkaW5nID0gc3RhdGUgPT09IENsckxvYWRpbmdTdGF0ZS5MT0FESU5HO1xuICB9XG5cbiAgQE91dHB1dCgnY2xpY2snKSBfY2xpY2s6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIGVtaXRDbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLl9jbGljay5lbWl0KHRydWUpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX2VuYWJsZVNlcnZpY2UgPSB0cnVlO1xuICB9XG59XG4iXX0=