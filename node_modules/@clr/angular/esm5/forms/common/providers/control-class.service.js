/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var ControlClassService = /** @class */ (function () {
    function ControlClassService() {
        this.className = '';
    }
    ControlClassService.prototype.controlClass = function (invalid, grid, additional) {
        if (invalid === void 0) { invalid = false; }
        if (grid === void 0) { grid = false; }
        if (additional === void 0) { additional = ''; }
        var controlClasses = [this.className, additional];
        if (invalid) {
            controlClasses.push('clr-error');
        }
        if (grid && this.className.indexOf('clr-col') === -1) {
            controlClasses.push('clr-col-md-10 clr-col-12');
        }
        return controlClasses.join(' ').trim();
    };
    // We want to remove the column classes from the input up to the container
    ControlClassService.prototype.initControlClass = function (renderer, element) {
        if (element && element.className) {
            this.className = element.className;
            var klasses = element.className.split(' ');
            klasses.forEach(function (klass) {
                if (klass.startsWith('clr-col')) {
                    renderer.removeClass(element, klass);
                }
            });
        }
    };
    ControlClassService = tslib_1.__decorate([
        Injectable()
    ], ControlClassService);
    return ControlClassService;
}());
export { ControlClassService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1jbGFzcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY29tbW9uL3Byb3ZpZGVycy9jb250cm9sLWNsYXNzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDO0lBREE7UUFFRSxjQUFTLEdBQUcsRUFBRSxDQUFDO0lBeUJqQixDQUFDO0lBdkJDLDBDQUFZLEdBQVosVUFBYSxPQUFlLEVBQUUsSUFBWSxFQUFFLFVBQWU7UUFBOUMsd0JBQUEsRUFBQSxlQUFlO1FBQUUscUJBQUEsRUFBQSxZQUFZO1FBQUUsMkJBQUEsRUFBQSxlQUFlO1FBQ3pELElBQU0sY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNwRCxJQUFJLE9BQU8sRUFBRTtZQUNYLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbEM7UUFDRCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNwRCxjQUFjLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7U0FDakQ7UUFDRCxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELDBFQUEwRTtJQUMxRSw4Q0FBZ0IsR0FBaEIsVUFBaUIsUUFBUSxFQUFFLE9BQW9CO1FBQzdDLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1lBQ25DLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO2dCQUNuQixJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQy9CLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUN0QztZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBekJVLG1CQUFtQjtRQUQvQixVQUFVLEVBQUU7T0FDQSxtQkFBbUIsQ0EwQi9CO0lBQUQsMEJBQUM7Q0FBQSxBQTFCRCxJQTBCQztTQTFCWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbnRyb2xDbGFzc1NlcnZpY2Uge1xuICBjbGFzc05hbWUgPSAnJztcblxuICBjb250cm9sQ2xhc3MoaW52YWxpZCA9IGZhbHNlLCBncmlkID0gZmFsc2UsIGFkZGl0aW9uYWwgPSAnJykge1xuICAgIGNvbnN0IGNvbnRyb2xDbGFzc2VzID0gW3RoaXMuY2xhc3NOYW1lLCBhZGRpdGlvbmFsXTtcbiAgICBpZiAoaW52YWxpZCkge1xuICAgICAgY29udHJvbENsYXNzZXMucHVzaCgnY2xyLWVycm9yJyk7XG4gICAgfVxuICAgIGlmIChncmlkICYmIHRoaXMuY2xhc3NOYW1lLmluZGV4T2YoJ2Nsci1jb2wnKSA9PT0gLTEpIHtcbiAgICAgIGNvbnRyb2xDbGFzc2VzLnB1c2goJ2Nsci1jb2wtbWQtMTAgY2xyLWNvbC0xMicpO1xuICAgIH1cbiAgICByZXR1cm4gY29udHJvbENsYXNzZXMuam9pbignICcpLnRyaW0oKTtcbiAgfVxuXG4gIC8vIFdlIHdhbnQgdG8gcmVtb3ZlIHRoZSBjb2x1bW4gY2xhc3NlcyBmcm9tIHRoZSBpbnB1dCB1cCB0byB0aGUgY29udGFpbmVyXG4gIGluaXRDb250cm9sQ2xhc3MocmVuZGVyZXIsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5jbGFzc05hbWUpIHtcbiAgICAgIHRoaXMuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWU7XG4gICAgICBjb25zdCBrbGFzc2VzID0gZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICAgIGtsYXNzZXMuZm9yRWFjaChrbGFzcyA9PiB7XG4gICAgICAgIGlmIChrbGFzcy5zdGFydHNXaXRoKCdjbHItY29sJykpIHtcbiAgICAgICAgICByZW5kZXJlci5yZW1vdmVDbGFzcyhlbGVtZW50LCBrbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19