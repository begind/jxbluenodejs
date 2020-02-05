/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrCheckboxModule } from './checkbox/checkbox.module';
import { ClrCommonFormsModule } from './common/common.module';
import { ClrDatepickerModule } from './datepicker/datepicker.module';
import { ClrInputModule } from './input/input.module';
import { ClrPasswordModule } from './password/password.module';
import { ClrRadioModule } from './radio/radio.module';
import { ClrSelectModule } from './select/select.module';
import { ClrTextareaModule } from './textarea/textarea.module';
let ClrFormsModule = class ClrFormsModule {
};
ClrFormsModule = tslib_1.__decorate([
    NgModule({
        imports: [CommonModule],
        exports: [
            ClrCommonFormsModule,
            ClrCheckboxModule,
            ClrDatepickerModule,
            ClrInputModule,
            ClrPasswordModule,
            ClrRadioModule,
            ClrSelectModule,
            ClrTextareaModule,
        ],
    })
], ClrFormsModule);
export { ClrFormsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvZm9ybXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFlL0QsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztDQUFHLENBQUE7QUFBakIsY0FBYztJQWIxQixRQUFRLENBQUM7UUFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdkIsT0FBTyxFQUFFO1lBQ1Asb0JBQW9CO1lBQ3BCLGlCQUFpQjtZQUNqQixtQkFBbUI7WUFDbkIsY0FBYztZQUNkLGlCQUFpQjtZQUNqQixjQUFjO1lBQ2QsZUFBZTtZQUNmLGlCQUFpQjtTQUNsQjtLQUNGLENBQUM7R0FDVyxjQUFjLENBQUc7U0FBakIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENsckNoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi9jaGVja2JveC9jaGVja2JveC5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uRm9ybXNNb2R1bGUgfSBmcm9tICcuL2NvbW1vbi9jb21tb24ubW9kdWxlJztcbmltcG9ydCB7IENsckRhdGVwaWNrZXJNb2R1bGUgfSBmcm9tICcuL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xySW5wdXRNb2R1bGUgfSBmcm9tICcuL2lucHV0L2lucHV0Lm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJQYXNzd29yZE1vZHVsZSB9IGZyb20gJy4vcGFzc3dvcmQvcGFzc3dvcmQubW9kdWxlJztcbmltcG9ydCB7IENsclJhZGlvTW9kdWxlIH0gZnJvbSAnLi9yYWRpby9yYWRpby5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xyU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi9zZWxlY3Qvc2VsZWN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJUZXh0YXJlYU1vZHVsZSB9IGZyb20gJy4vdGV4dGFyZWEvdGV4dGFyZWEubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBDbHJDb21tb25Gb3Jtc01vZHVsZSxcbiAgICBDbHJDaGVja2JveE1vZHVsZSxcbiAgICBDbHJEYXRlcGlja2VyTW9kdWxlLFxuICAgIENscklucHV0TW9kdWxlLFxuICAgIENsclBhc3N3b3JkTW9kdWxlLFxuICAgIENsclJhZGlvTW9kdWxlLFxuICAgIENsclNlbGVjdE1vZHVsZSxcbiAgICBDbHJUZXh0YXJlYU1vZHVsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRm9ybXNNb2R1bGUge31cbiJdfQ==