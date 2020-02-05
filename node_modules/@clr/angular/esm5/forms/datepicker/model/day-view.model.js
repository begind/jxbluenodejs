/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DayViewModel = /** @class */ (function () {
    function DayViewModel(dayModel, isTodaysDate, isDisabled, isSelected, isFocusable) {
        if (isTodaysDate === void 0) { isTodaysDate = false; }
        if (isDisabled === void 0) { isDisabled = false; }
        if (isSelected === void 0) { isSelected = false; }
        if (isFocusable === void 0) { isFocusable = false; }
        this.dayModel = dayModel;
        this.isTodaysDate = isTodaysDate;
        this.isDisabled = isDisabled;
        this.isSelected = isSelected;
        this.isFocusable = isFocusable;
    }
    Object.defineProperty(DayViewModel.prototype, "tabIndex", {
        /**
         * Gets the tab index based on the isFocusable flag.
         */
        get: function () {
            return this.isFocusable ? 0 : -1;
        },
        enumerable: true,
        configurable: true
    });
    return DayViewModel;
}());
export { DayViewModel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LXZpZXcubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL21vZGVsL2RheS12aWV3Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFJSDtJQUNFLHNCQUNTLFFBQWtCLEVBQ2xCLFlBQTZCLEVBQzdCLFVBQTJCLEVBQzNCLFVBQTJCLEVBQzNCLFdBQTRCO1FBSDVCLDZCQUFBLEVBQUEsb0JBQTZCO1FBQzdCLDJCQUFBLEVBQUEsa0JBQTJCO1FBQzNCLDJCQUFBLEVBQUEsa0JBQTJCO1FBQzNCLDRCQUFBLEVBQUEsbUJBQTRCO1FBSjVCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsaUJBQVksR0FBWixZQUFZLENBQWlCO1FBQzdCLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBQzNCLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBQzNCLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtJQUNsQyxDQUFDO0lBS0osc0JBQUksa0NBQVE7UUFIWjs7V0FFRzthQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLENBQUM7OztPQUFBO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgRGF5TW9kZWwgfSBmcm9tICcuL2RheS5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBEYXlWaWV3TW9kZWwge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZGF5TW9kZWw6IERheU1vZGVsLFxuICAgIHB1YmxpYyBpc1RvZGF5c0RhdGU6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBwdWJsaWMgaXNEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlLFxuICAgIHB1YmxpYyBpc1NlbGVjdGVkOiBib29sZWFuID0gZmFsc2UsXG4gICAgcHVibGljIGlzRm9jdXNhYmxlOiBib29sZWFuID0gZmFsc2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB0YWIgaW5kZXggYmFzZWQgb24gdGhlIGlzRm9jdXNhYmxlIGZsYWcuXG4gICAqL1xuICBnZXQgdGFiSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5pc0ZvY3VzYWJsZSA/IDAgOiAtMTtcbiAgfVxufVxuIl19