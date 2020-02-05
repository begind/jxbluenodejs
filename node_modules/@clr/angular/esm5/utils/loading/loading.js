import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, Input, Optional } from '@angular/core';
import { LoadingListener } from './loading-listener';
export var ClrLoadingState;
(function (ClrLoadingState) {
    ClrLoadingState[ClrLoadingState["DEFAULT"] = 0] = "DEFAULT";
    ClrLoadingState[ClrLoadingState["LOADING"] = 1] = "LOADING";
    ClrLoadingState[ClrLoadingState["SUCCESS"] = 2] = "SUCCESS";
    ClrLoadingState[ClrLoadingState["ERROR"] = 3] = "ERROR";
})(ClrLoadingState || (ClrLoadingState = {}));
var ClrLoading = /** @class */ (function () {
    // We find the first parent that handles something loading
    function ClrLoading(listener) {
        this.listener = listener;
        this._loadingState = ClrLoadingState.DEFAULT;
    }
    Object.defineProperty(ClrLoading.prototype, "loadingState", {
        get: function () {
            return this._loadingState;
        },
        set: function (value) {
            if (value === true) {
                value = ClrLoadingState.LOADING;
            }
            else if (!value) {
                value = ClrLoadingState.DEFAULT;
            }
            if (value === this._loadingState) {
                return;
            }
            this._loadingState = value;
            if (this.listener) {
                this.listener.loadingStateChange(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrLoading.prototype.ngOnDestroy = function () {
        this.loadingState = ClrLoadingState.DEFAULT;
    };
    tslib_1.__decorate([
        Input('clrLoading'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrLoading.prototype, "loadingState", null);
    ClrLoading = tslib_1.__decorate([
        Directive({ selector: '[clrLoading]' }),
        tslib_1.__param(0, Optional()),
        tslib_1.__metadata("design:paramtypes", [LoadingListener])
    ], ClrLoading);
    return ClrLoading;
}());
export { ClrLoading };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2xvYWRpbmcvbG9hZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFhLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQsTUFBTSxDQUFOLElBQVksZUFLWDtBQUxELFdBQVksZUFBZTtJQUN6QiwyREFBTyxDQUFBO0lBQ1AsMkRBQU8sQ0FBQTtJQUNQLDJEQUFPLENBQUE7SUFDUCx1REFBSyxDQUFBO0FBQ1AsQ0FBQyxFQUxXLGVBQWUsS0FBZixlQUFlLFFBSzFCO0FBR0Q7SUFDRSwwREFBMEQ7SUFDMUQsb0JBQWdDLFFBQXlCO1FBQXpCLGFBQVEsR0FBUixRQUFRLENBQWlCO1FBRWpELGtCQUFhLEdBQW9CLGVBQWUsQ0FBQyxPQUFPLENBQUM7SUFGTCxDQUFDO0lBSTdELHNCQUFXLG9DQUFZO2FBQXZCO1lBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzVCLENBQUM7YUFHRCxVQUF3QixLQUFnQztZQUN0RCxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7Z0JBQ2xCLEtBQUssR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDO2FBQ2pDO2lCQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2pCLEtBQUssR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDO2FBQ2pDO1lBRUQsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDaEMsT0FBTzthQUNSO1lBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pDO1FBQ0gsQ0FBQzs7O09BbEJBO0lBb0JELGdDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUM7SUFDOUMsQ0FBQztJQW5CRDtRQURDLEtBQUssQ0FBQyxZQUFZLENBQUM7OztrREFnQm5CO0lBMUJVLFVBQVU7UUFEdEIsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxDQUFDO1FBR3pCLG1CQUFBLFFBQVEsRUFBRSxDQUFBO2lEQUFtQixlQUFlO09BRjlDLFVBQVUsQ0ErQnRCO0lBQUQsaUJBQUM7Q0FBQSxBQS9CRCxJQStCQztTQS9CWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25EZXN0cm95LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMb2FkaW5nTGlzdGVuZXIgfSBmcm9tICcuL2xvYWRpbmctbGlzdGVuZXInO1xuXG5leHBvcnQgZW51bSBDbHJMb2FkaW5nU3RhdGUge1xuICBERUZBVUxULFxuICBMT0FESU5HLFxuICBTVUNDRVNTLFxuICBFUlJPUixcbn1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NsckxvYWRpbmddJyB9KVxuZXhwb3J0IGNsYXNzIENsckxvYWRpbmcgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvLyBXZSBmaW5kIHRoZSBmaXJzdCBwYXJlbnQgdGhhdCBoYW5kbGVzIHNvbWV0aGluZyBsb2FkaW5nXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIHByaXZhdGUgbGlzdGVuZXI6IExvYWRpbmdMaXN0ZW5lcikge31cblxuICBwcml2YXRlIF9sb2FkaW5nU3RhdGU6IENsckxvYWRpbmdTdGF0ZSA9IENsckxvYWRpbmdTdGF0ZS5ERUZBVUxUO1xuXG4gIHB1YmxpYyBnZXQgbG9hZGluZ1N0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9sb2FkaW5nU3RhdGU7XG4gIH1cblxuICBASW5wdXQoJ2NsckxvYWRpbmcnKVxuICBwdWJsaWMgc2V0IGxvYWRpbmdTdGF0ZSh2YWx1ZTogYm9vbGVhbiB8IENsckxvYWRpbmdTdGF0ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgdmFsdWUgPSBDbHJMb2FkaW5nU3RhdGUuTE9BRElORztcbiAgICB9IGVsc2UgaWYgKCF2YWx1ZSkge1xuICAgICAgdmFsdWUgPSBDbHJMb2FkaW5nU3RhdGUuREVGQVVMVDtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPT09IHRoaXMuX2xvYWRpbmdTdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2xvYWRpbmdTdGF0ZSA9IHZhbHVlO1xuICAgIGlmICh0aGlzLmxpc3RlbmVyKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyLmxvYWRpbmdTdGF0ZUNoYW5nZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5sb2FkaW5nU3RhdGUgPSBDbHJMb2FkaW5nU3RhdGUuREVGQVVMVDtcbiAgfVxufVxuIl19