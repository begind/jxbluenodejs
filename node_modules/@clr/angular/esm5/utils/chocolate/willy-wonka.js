import { Subject } from 'rxjs';
/*
 * After a conversation with the Angular core team, it turns out we don't have much of a choice for our
 * declarative API, we need to fight against change detection and its one-way flow. This is
 * currently the least dirty solution to do what we want.
 *
 * Do not modify or even use this class unless you know exactly what you're doing.
 * It has the potential to trigger change detection loops or kill app performances.
 */
var WillyWonka = /** @class */ (function () {
    function WillyWonka() {
        this._chocolate = new Subject();
    }
    Object.defineProperty(WillyWonka.prototype, "chocolate", {
        get: function () {
            return this._chocolate.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    WillyWonka.prototype.ngAfterViewChecked = function () {
        this._chocolate.next();
    };
    return WillyWonka;
}());
export { WillyWonka };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lsbHktd29ua2EuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9jaG9jb2xhdGUvd2lsbHktd29ua2EudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQjs7Ozs7OztHQU9HO0FBQ0g7SUFBQTtRQUNVLGVBQVUsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO0lBUzNDLENBQUM7SUFQQyxzQkFBVyxpQ0FBUzthQUFwQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QyxDQUFDOzs7T0FBQTtJQUVELHVDQUFrQixHQUFsQjtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQVZELElBVUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBBZnRlclZpZXdDaGVja2VkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbi8qXG4gKiBBZnRlciBhIGNvbnZlcnNhdGlvbiB3aXRoIHRoZSBBbmd1bGFyIGNvcmUgdGVhbSwgaXQgdHVybnMgb3V0IHdlIGRvbid0IGhhdmUgbXVjaCBvZiBhIGNob2ljZSBmb3Igb3VyXG4gKiBkZWNsYXJhdGl2ZSBBUEksIHdlIG5lZWQgdG8gZmlnaHQgYWdhaW5zdCBjaGFuZ2UgZGV0ZWN0aW9uIGFuZCBpdHMgb25lLXdheSBmbG93LiBUaGlzIGlzXG4gKiBjdXJyZW50bHkgdGhlIGxlYXN0IGRpcnR5IHNvbHV0aW9uIHRvIGRvIHdoYXQgd2Ugd2FudC5cbiAqXG4gKiBEbyBub3QgbW9kaWZ5IG9yIGV2ZW4gdXNlIHRoaXMgY2xhc3MgdW5sZXNzIHlvdSBrbm93IGV4YWN0bHkgd2hhdCB5b3UncmUgZG9pbmcuXG4gKiBJdCBoYXMgdGhlIHBvdGVudGlhbCB0byB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24gbG9vcHMgb3Iga2lsbCBhcHAgcGVyZm9ybWFuY2VzLlxuICovXG5leHBvcnQgY2xhc3MgV2lsbHlXb25rYSBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQge1xuICBwcml2YXRlIF9jaG9jb2xhdGUgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIHB1YmxpYyBnZXQgY2hvY29sYXRlKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jaG9jb2xhdGUuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgdGhpcy5fY2hvY29sYXRlLm5leHQoKTtcbiAgfVxufVxuIl19