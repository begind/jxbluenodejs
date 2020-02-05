/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AlertIconAndTypesService } from './providers/icon-and-types.service';
let ClrAlertItem = class ClrAlertItem {
    constructor(iconService) {
        this.iconService = iconService;
    }
};
ClrAlertItem = tslib_1.__decorate([
    Component({
        selector: 'clr-alert-item',
        template: `
        <div class="alert-icon-wrapper">
            <clr-icon class="alert-icon" 
              [attr.shape]="iconService.alertIconShape" 
              [attr.title]="iconService.alertIconTitle"></clr-icon>
        </div>
        <ng-content></ng-content>
    `,
        host: { class: 'alert-item' }
    }),
    tslib_1.__metadata("design:paramtypes", [AlertIconAndTypesService])
], ClrAlertItem);
export { ClrAlertItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImVtcGhhc2lzL2FsZXJ0L2FsZXJ0LWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBYzlFLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFDdkIsWUFBbUIsV0FBcUM7UUFBckMsZ0JBQVcsR0FBWCxXQUFXLENBQTBCO0lBQUcsQ0FBQztDQUM3RCxDQUFBO0FBRlksWUFBWTtJQVp4QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFFBQVEsRUFBRTs7Ozs7OztLQU9QO1FBQ0gsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtLQUM5QixDQUFDOzZDQUVnQyx3QkFBd0I7R0FEN0MsWUFBWSxDQUV4QjtTQUZZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWxlcnRJY29uQW5kVHlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvaWNvbi1hbmQtdHlwZXMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1hbGVydC1pdGVtJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImFsZXJ0LWljb24td3JhcHBlclwiPlxuICAgICAgICAgICAgPGNsci1pY29uIGNsYXNzPVwiYWxlcnQtaWNvblwiIFxuICAgICAgICAgICAgICBbYXR0ci5zaGFwZV09XCJpY29uU2VydmljZS5hbGVydEljb25TaGFwZVwiIFxuICAgICAgICAgICAgICBbYXR0ci50aXRsZV09XCJpY29uU2VydmljZS5hbGVydEljb25UaXRsZVwiPjwvY2xyLWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgaG9zdDogeyBjbGFzczogJ2FsZXJ0LWl0ZW0nIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckFsZXJ0SXRlbSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpY29uU2VydmljZTogQWxlcnRJY29uQW5kVHlwZXNTZXJ2aWNlKSB7fVxufVxuIl19