import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, Inject } from '@angular/core';
import { UNIQUE_ID } from '../../utils/id-generator/id-generator.service';
let ClrStackContentInput = class ClrStackContentInput {
    constructor(uniqueId) {
        this.uniqueId = uniqueId;
    }
};
ClrStackContentInput = tslib_1.__decorate([
    Directive({
        selector: '[clrStackInput]',
        host: {
            '[class.clr-input]': 'true',
            '[attr.aria-labelledby]': 'uniqueId',
        },
    }),
    tslib_1.__param(0, Inject(UNIQUE_ID)),
    tslib_1.__metadata("design:paramtypes", [String])
], ClrStackContentInput);
export { ClrStackContentInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2stY29udGVudC1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvc3RhY2stdmlldy9zdGFjay1jb250ZW50LWlucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBUzFFLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBQy9CLFlBQXNDLFFBQWdCO1FBQWhCLGFBQVEsR0FBUixRQUFRLENBQVE7SUFBRyxDQUFDO0NBQzNELENBQUE7QUFGWSxvQkFBb0I7SUFQaEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixJQUFJLEVBQUU7WUFDSixtQkFBbUIsRUFBRSxNQUFNO1lBQzNCLHdCQUF3QixFQUFFLFVBQVU7U0FDckM7S0FDRixDQUFDO0lBRWEsbUJBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBOztHQURuQixvQkFBb0IsQ0FFaEM7U0FGWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVU5JUVVFX0lEIH0gZnJvbSAnLi4vLi4vdXRpbHMvaWQtZ2VuZXJhdG9yL2lkLWdlbmVyYXRvci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NsclN0YWNrSW5wdXRdJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuY2xyLWlucHV0XSc6ICd0cnVlJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICd1bmlxdWVJZCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsclN0YWNrQ29udGVudElucHV0IHtcbiAgY29uc3RydWN0b3IoQEluamVjdChVTklRVUVfSUQpIHB1YmxpYyB1bmlxdWVJZDogc3RyaW5nKSB7fVxufVxuIl19