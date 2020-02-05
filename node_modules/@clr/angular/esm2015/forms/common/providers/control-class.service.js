/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let ControlClassService = class ControlClassService {
    constructor() {
        this.className = '';
    }
    controlClass(invalid = false, grid = false, additional = '') {
        const controlClasses = [this.className, additional];
        if (invalid) {
            controlClasses.push('clr-error');
        }
        if (grid && this.className.indexOf('clr-col') === -1) {
            controlClasses.push('clr-col-md-10 clr-col-12');
        }
        return controlClasses.join(' ').trim();
    }
    // We want to remove the column classes from the input up to the container
    initControlClass(renderer, element) {
        if (element && element.className) {
            this.className = element.className;
            const klasses = element.className.split(' ');
            klasses.forEach(klass => {
                if (klass.startsWith('clr-col')) {
                    renderer.removeClass(element, klass);
                }
            });
        }
    }
};
ControlClassService = tslib_1.__decorate([
    Injectable()
], ControlClassService);
export { ControlClassService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1jbGFzcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY29tbW9uL3Byb3ZpZGVycy9jb250cm9sLWNsYXNzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBRGhDO1FBRUUsY0FBUyxHQUFHLEVBQUUsQ0FBQztJQXlCakIsQ0FBQztJQXZCQyxZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBRSxJQUFJLEdBQUcsS0FBSyxFQUFFLFVBQVUsR0FBRyxFQUFFO1FBQ3pELE1BQU0sY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNwRCxJQUFJLE9BQU8sRUFBRTtZQUNYLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbEM7UUFDRCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNwRCxjQUFjLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7U0FDakQ7UUFDRCxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELDBFQUEwRTtJQUMxRSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsT0FBb0I7UUFDN0MsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDbkMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDdEIsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUMvQixRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDdEM7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUExQlksbUJBQW1CO0lBRC9CLFVBQVUsRUFBRTtHQUNBLG1CQUFtQixDQTBCL0I7U0ExQlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb250cm9sQ2xhc3NTZXJ2aWNlIHtcbiAgY2xhc3NOYW1lID0gJyc7XG5cbiAgY29udHJvbENsYXNzKGludmFsaWQgPSBmYWxzZSwgZ3JpZCA9IGZhbHNlLCBhZGRpdGlvbmFsID0gJycpIHtcbiAgICBjb25zdCBjb250cm9sQ2xhc3NlcyA9IFt0aGlzLmNsYXNzTmFtZSwgYWRkaXRpb25hbF07XG4gICAgaWYgKGludmFsaWQpIHtcbiAgICAgIGNvbnRyb2xDbGFzc2VzLnB1c2goJ2Nsci1lcnJvcicpO1xuICAgIH1cbiAgICBpZiAoZ3JpZCAmJiB0aGlzLmNsYXNzTmFtZS5pbmRleE9mKCdjbHItY29sJykgPT09IC0xKSB7XG4gICAgICBjb250cm9sQ2xhc3Nlcy5wdXNoKCdjbHItY29sLW1kLTEwIGNsci1jb2wtMTInKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRyb2xDbGFzc2VzLmpvaW4oJyAnKS50cmltKCk7XG4gIH1cblxuICAvLyBXZSB3YW50IHRvIHJlbW92ZSB0aGUgY29sdW1uIGNsYXNzZXMgZnJvbSB0aGUgaW5wdXQgdXAgdG8gdGhlIGNvbnRhaW5lclxuICBpbml0Q29udHJvbENsYXNzKHJlbmRlcmVyLCBlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuY2xhc3NOYW1lKSB7XG4gICAgICB0aGlzLmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lO1xuICAgICAgY29uc3Qga2xhc3NlcyA9IGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgICBrbGFzc2VzLmZvckVhY2goa2xhc3MgPT4ge1xuICAgICAgICBpZiAoa2xhc3Muc3RhcnRzV2l0aCgnY2xyLWNvbCcpKSB7XG4gICAgICAgICAgcmVuZGVyZXIucmVtb3ZlQ2xhc3MoZWxlbWVudCwga2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==