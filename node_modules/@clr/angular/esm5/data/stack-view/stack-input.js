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
var ClrStackInput = /** @class */ (function (_super) {
    tslib_1.__extends(ClrStackInput, _super);
    function ClrStackInput(stackView) {
        var _this = _super.call(this, stackView) || this;
        _this.stackView = stackView;
        _this.type = 'text';
        return _this;
    }
    ClrStackInput = tslib_1.__decorate([
        Component({
            selector: 'clr-stack-input',
            inputs: ['model: clrModel', 'type'],
            outputs: ['modelChange: clrModelChange'],
            template: "\n        <span *ngIf=\"!stackView.editing\">{{model}}</span>\n        <input [type]=\"type\" *ngIf=\"stackView.editing\" [(ngModel)]=\"model\"/>\n    "
        }),
        tslib_1.__metadata("design:paramtypes", [ClrStackView])
    ], ClrStackInput);
    return ClrStackInput;
}(StackControl));
export { ClrStackInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2staW5wdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL3N0YWNrLXZpZXcvc3RhY2staW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUNIOzs7OztHQUtHOztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFXNUM7SUFBbUMseUNBQVk7SUFHN0MsdUJBQW1CLFNBQXVCO1FBQTFDLFlBQ0Usa0JBQU0sU0FBUyxDQUFDLFNBQ2pCO1FBRmtCLGVBQVMsR0FBVCxTQUFTLENBQWM7UUFGMUMsVUFBSSxHQUFXLE1BQU0sQ0FBQzs7SUFJdEIsQ0FBQztJQUxVLGFBQWE7UUFUekIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUM7WUFDbkMsT0FBTyxFQUFFLENBQUMsNkJBQTZCLENBQUM7WUFDeEMsUUFBUSxFQUFFLHlKQUdQO1NBQ0osQ0FBQztpREFJOEIsWUFBWTtPQUgvQixhQUFhLENBTXpCO0lBQUQsb0JBQUM7Q0FBQSxBQU5ELENBQW1DLFlBQVksR0FNOUM7U0FOWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuLyoqXG4gKiBVbmRvY3VtZW50ZWQgZXhwZXJpbWVudGFsIGZlYXR1cmU6IGlubGluZSBlZGl0aW5nLlxuICpcbiAqIFRPRE86IHN1cHBvcnQgbW9yZSB0eXBlcyBvZiBpbnB1dHM6IGNoZWNrYm94LCByYWRpbywgLi4uXG4gKiBUT0RPOiBNaXJyb3IgaW5wdXQgYXR0cmlidXRlcyBmcm9tIHRoZSBob3N0IHRvIHRoZSBhY3R1YWwgaW5wdXQ6IHNpemUsIG1pbiwgbWF4LCBwbGFjZWhvbGRlciwgLi4uXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdGFja0NvbnRyb2wgfSBmcm9tICcuL3N0YWNrLWNvbnRyb2wnO1xuaW1wb3J0IHsgQ2xyU3RhY2tWaWV3IH0gZnJvbSAnLi9zdGFjay12aWV3JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXN0YWNrLWlucHV0JyxcbiAgaW5wdXRzOiBbJ21vZGVsOiBjbHJNb2RlbCcsICd0eXBlJ10sXG4gIG91dHB1dHM6IFsnbW9kZWxDaGFuZ2U6IGNsck1vZGVsQ2hhbmdlJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzcGFuICpuZ0lmPVwiIXN0YWNrVmlldy5lZGl0aW5nXCI+e3ttb2RlbH19PC9zcGFuPlxuICAgICAgICA8aW5wdXQgW3R5cGVdPVwidHlwZVwiICpuZ0lmPVwic3RhY2tWaWV3LmVkaXRpbmdcIiBbKG5nTW9kZWwpXT1cIm1vZGVsXCIvPlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIENsclN0YWNrSW5wdXQgZXh0ZW5kcyBTdGFja0NvbnRyb2wge1xuICB0eXBlOiBzdHJpbmcgPSAndGV4dCc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHN0YWNrVmlldzogQ2xyU3RhY2tWaWV3KSB7XG4gICAgc3VwZXIoc3RhY2tWaWV3KTtcbiAgfVxufVxuIl19