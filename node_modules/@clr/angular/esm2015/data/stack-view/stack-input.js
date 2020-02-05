/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Undocumented experimental feature: inline editing.
 *
 * TODO: support more types of inputs: checkbox, radio, ...
 * TODO: Mirror input attributes from the host to the actual input: size, min, max, placeholder, ...
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { StackControl } from './stack-control';
import { ClrStackView } from './stack-view';
let ClrStackInput = class ClrStackInput extends StackControl {
    constructor(stackView) {
        super(stackView);
        this.stackView = stackView;
        this.type = 'text';
    }
};
ClrStackInput = tslib_1.__decorate([
    Component({
        selector: 'clr-stack-input',
        inputs: ['model: clrModel', 'type'],
        outputs: ['modelChange: clrModelChange'],
        template: `
        <span *ngIf="!stackView.editing">{{model}}</span>
        <input [type]="type" *ngIf="stackView.editing" [(ngModel)]="model"/>
    `
    }),
    tslib_1.__metadata("design:paramtypes", [ClrStackView])
], ClrStackInput);
export { ClrStackInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2staW5wdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL3N0YWNrLXZpZXcvc3RhY2staW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUNIOzs7OztHQUtHOztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFXNUMsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYyxTQUFRLFlBQVk7SUFHN0MsWUFBbUIsU0FBdUI7UUFDeEMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBREEsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUYxQyxTQUFJLEdBQVcsTUFBTSxDQUFDO0lBSXRCLENBQUM7Q0FDRixDQUFBO0FBTlksYUFBYTtJQVR6QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLE1BQU0sRUFBRSxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQztRQUNuQyxPQUFPLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztRQUN4QyxRQUFRLEVBQUU7OztLQUdQO0tBQ0osQ0FBQzs2Q0FJOEIsWUFBWTtHQUgvQixhQUFhLENBTXpCO1NBTlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbi8qKlxuICogVW5kb2N1bWVudGVkIGV4cGVyaW1lbnRhbCBmZWF0dXJlOiBpbmxpbmUgZWRpdGluZy5cbiAqXG4gKiBUT0RPOiBzdXBwb3J0IG1vcmUgdHlwZXMgb2YgaW5wdXRzOiBjaGVja2JveCwgcmFkaW8sIC4uLlxuICogVE9ETzogTWlycm9yIGlucHV0IGF0dHJpYnV0ZXMgZnJvbSB0aGUgaG9zdCB0byB0aGUgYWN0dWFsIGlucHV0OiBzaXplLCBtaW4sIG1heCwgcGxhY2Vob2xkZXIsIC4uLlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RhY2tDb250cm9sIH0gZnJvbSAnLi9zdGFjay1jb250cm9sJztcbmltcG9ydCB7IENsclN0YWNrVmlldyB9IGZyb20gJy4vc3RhY2stdmlldyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1zdGFjay1pbnB1dCcsXG4gIGlucHV0czogWydtb2RlbDogY2xyTW9kZWwnLCAndHlwZSddLFxuICBvdXRwdXRzOiBbJ21vZGVsQ2hhbmdlOiBjbHJNb2RlbENoYW5nZSddLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c3BhbiAqbmdJZj1cIiFzdGFja1ZpZXcuZWRpdGluZ1wiPnt7bW9kZWx9fTwvc3Bhbj5cbiAgICAgICAgPGlucHV0IFt0eXBlXT1cInR5cGVcIiAqbmdJZj1cInN0YWNrVmlldy5lZGl0aW5nXCIgWyhuZ01vZGVsKV09XCJtb2RlbFwiLz5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJTdGFja0lucHV0IGV4dGVuZHMgU3RhY2tDb250cm9sIHtcbiAgdHlwZTogc3RyaW5nID0gJ3RleHQnO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzdGFja1ZpZXc6IENsclN0YWNrVmlldykge1xuICAgIHN1cGVyKHN0YWNrVmlldyk7XG4gIH1cbn1cbiJdfQ==