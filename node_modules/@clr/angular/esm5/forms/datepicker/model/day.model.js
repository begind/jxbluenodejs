/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DayModel = /** @class */ (function () {
    function DayModel(year, month, date) {
        this.year = year;
        this.month = month;
        this.date = date;
    }
    /**
     * Checks if the passed CalendarDate is equal to itself.
     */
    DayModel.prototype.isEqual = function (day) {
        if (day) {
            return this.year === day.year && this.month === day.month && this.date === day.date;
        }
        return false;
    };
    DayModel.prototype.toDate = function () {
        return new Date(this.year, this.month, this.date);
    };
    /**
     * Returns a new DayModel which is incremented based on the value passed.
     */
    DayModel.prototype.incrementBy = function (value) {
        // Creating new Javascript Date object to increment because
        // it will automatically take care of switching to next or previous
        // months & years without we having to worry about it.
        var date = new Date(this.year, this.month, this.date + value);
        return new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
    };
    /**
     * Clones the current day model.
     */
    DayModel.prototype.clone = function () {
        return new DayModel(this.year, this.month, this.date);
    };
    DayModel.prototype.toDateString = function () {
        return this.toDate().toLocaleDateString();
    };
    return DayModel;
}());
export { DayModel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5Lm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvZGF0ZXBpY2tlci9tb2RlbC9kYXkubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVIO0lBQ0Usa0JBQTRCLElBQVksRUFBa0IsS0FBYSxFQUFrQixJQUFZO1FBQXpFLFNBQUksR0FBSixJQUFJLENBQVE7UUFBa0IsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUFrQixTQUFJLEdBQUosSUFBSSxDQUFRO0lBQUcsQ0FBQztJQUV6Rzs7T0FFRztJQUNILDBCQUFPLEdBQVAsVUFBUSxHQUFhO1FBQ25CLElBQUksR0FBRyxFQUFFO1lBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxHQUFHLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQztTQUNyRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELHlCQUFNLEdBQU47UUFDRSxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsOEJBQVcsR0FBWCxVQUFZLEtBQWE7UUFDdkIsMkRBQTJEO1FBQzNELG1FQUFtRTtRQUNuRSxzREFBc0Q7UUFDdEQsSUFBTSxJQUFJLEdBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDdEUsT0FBTyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRDs7T0FFRztJQUNILHdCQUFLLEdBQUw7UUFDRSxPQUFPLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVNLCtCQUFZLEdBQW5CO1FBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBQ0gsZUFBQztBQUFELENBQUMsQUF0Q0QsSUFzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmV4cG9ydCBjbGFzcyBEYXlNb2RlbCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSB5ZWFyOiBudW1iZXIsIHB1YmxpYyByZWFkb25seSBtb250aDogbnVtYmVyLCBwdWJsaWMgcmVhZG9ubHkgZGF0ZTogbnVtYmVyKSB7fVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIHBhc3NlZCBDYWxlbmRhckRhdGUgaXMgZXF1YWwgdG8gaXRzZWxmLlxuICAgKi9cbiAgaXNFcXVhbChkYXk6IERheU1vZGVsKSB7XG4gICAgaWYgKGRheSkge1xuICAgICAgcmV0dXJuIHRoaXMueWVhciA9PT0gZGF5LnllYXIgJiYgdGhpcy5tb250aCA9PT0gZGF5Lm1vbnRoICYmIHRoaXMuZGF0ZSA9PT0gZGF5LmRhdGU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHRvRGF0ZSgpOiBEYXRlIHtcbiAgICByZXR1cm4gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCB0aGlzLmRhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBuZXcgRGF5TW9kZWwgd2hpY2ggaXMgaW5jcmVtZW50ZWQgYmFzZWQgb24gdGhlIHZhbHVlIHBhc3NlZC5cbiAgICovXG4gIGluY3JlbWVudEJ5KHZhbHVlOiBudW1iZXIpOiBEYXlNb2RlbCB7XG4gICAgLy8gQ3JlYXRpbmcgbmV3IEphdmFzY3JpcHQgRGF0ZSBvYmplY3QgdG8gaW5jcmVtZW50IGJlY2F1c2VcbiAgICAvLyBpdCB3aWxsIGF1dG9tYXRpY2FsbHkgdGFrZSBjYXJlIG9mIHN3aXRjaGluZyB0byBuZXh0IG9yIHByZXZpb3VzXG4gICAgLy8gbW9udGhzICYgeWVhcnMgd2l0aG91dCB3ZSBoYXZpbmcgdG8gd29ycnkgYWJvdXQgaXQuXG4gICAgY29uc3QgZGF0ZTogRGF0ZSA9IG5ldyBEYXRlKHRoaXMueWVhciwgdGhpcy5tb250aCwgdGhpcy5kYXRlICsgdmFsdWUpO1xuICAgIHJldHVybiBuZXcgRGF5TW9kZWwoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIGN1cnJlbnQgZGF5IG1vZGVsLlxuICAgKi9cbiAgY2xvbmUoKTogRGF5TW9kZWwge1xuICAgIHJldHVybiBuZXcgRGF5TW9kZWwodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCB0aGlzLmRhdGUpO1xuICB9XG5cbiAgcHVibGljIHRvRGF0ZVN0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRvRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xuICB9XG59XG4iXX0=