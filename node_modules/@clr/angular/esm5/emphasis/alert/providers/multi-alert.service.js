import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
var MultiAlertService = /** @class */ (function () {
    function MultiAlertService() {
        this.allAlerts = new QueryList();
        this._current = 0;
        /**
         * The Observable that lets other classes subscribe to changes
         */
        this._change = new Subject();
    }
    Object.defineProperty(MultiAlertService.prototype, "changes", {
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAlertService.prototype, "current", {
        get: function () {
            return this._current;
        },
        set: function (index) {
            if (index !== this._current) {
                this._current = index;
                this._change.next(index);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAlertService.prototype, "activeAlerts", {
        get: function () {
            return this.allAlerts.filter(function (alert) { return !alert._closed; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAlertService.prototype, "currentAlert", {
        get: function () {
            return this.activeAlerts[this.current];
        },
        set: function (alert) {
            this.current = this.activeAlerts.indexOf(alert);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAlertService.prototype, "count", {
        get: function () {
            return this.activeAlerts.length;
        },
        enumerable: true,
        configurable: true
    });
    MultiAlertService.prototype.manage = function (alerts) {
        var _this = this;
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.allAlerts = alerts;
        this.subscription = this.allAlerts.changes.subscribe(function () {
            if (_this.current >= _this.allAlerts.length) {
                _this.current = Math.max(0, _this.allAlerts.length - 1);
            }
        });
    };
    MultiAlertService.prototype.next = function () {
        this.current = this.current === this.activeAlerts.length - 1 ? 0 : this.current + 1;
    };
    MultiAlertService.prototype.previous = function () {
        if (this.activeAlerts.length === 0) {
            return;
        }
        this.current = this.current === 0 ? this.activeAlerts.length - 1 : this.current - 1;
    };
    MultiAlertService.prototype.close = function () {
        this.previous();
    };
    MultiAlertService.prototype.destroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    MultiAlertService = tslib_1.__decorate([
        Injectable()
    ], MultiAlertService);
    return MultiAlertService;
}());
export { MultiAlertService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktYWxlcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImVtcGhhc2lzL2FsZXJ0L3Byb3ZpZGVycy9tdWx0aS1hbGVydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUsvQjtJQURBO1FBRVUsY0FBUyxHQUF3QixJQUFJLFNBQVMsRUFBWSxDQUFDO1FBRTNELGFBQVEsR0FBRyxDQUFDLENBQUM7UUFFckI7O1dBRUc7UUFDSyxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztJQStEMUMsQ0FBQztJQTlEQyxzQkFBVyxzQ0FBTzthQUFsQjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHNDQUFPO2FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzthQUNELFVBQVksS0FBYTtZQUN2QixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDMUI7UUFDSCxDQUFDOzs7T0FOQTtJQVFELHNCQUFJLDJDQUFZO2FBQWhCO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBZCxDQUFjLENBQUMsQ0FBQztRQUN4RCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDJDQUFZO2FBQWhCO1lBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QyxDQUFDO2FBRUQsVUFBaUIsS0FBZTtZQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELENBQUM7OztPQUpBO0lBTUQsc0JBQUksb0NBQUs7YUFBVDtZQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDbEMsQ0FBQzs7O09BQUE7SUFFRCxrQ0FBTSxHQUFOLFVBQU8sTUFBMkI7UUFBbEMsaUJBVUM7UUFUQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNqQztRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1lBQ25ELElBQUksS0FBSSxDQUFDLE9BQU8sSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFDekMsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN2RDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGdDQUFJLEdBQUo7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0UsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbEMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRUQsaUNBQUssR0FBTDtRQUNFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsbUNBQU8sR0FBUDtRQUNFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQXRFVSxpQkFBaUI7UUFEN0IsVUFBVSxFQUFFO09BQ0EsaUJBQWlCLENBdUU3QjtJQUFELHdCQUFDO0NBQUEsQUF2RUQsSUF1RUM7U0F2RVksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ2xyQWxlcnQgfSBmcm9tICcuLi9hbGVydCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNdWx0aUFsZXJ0U2VydmljZSB7XG4gIHByaXZhdGUgYWxsQWxlcnRzOiBRdWVyeUxpc3Q8Q2xyQWxlcnQ+ID0gbmV3IFF1ZXJ5TGlzdDxDbHJBbGVydD4oKTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfY3VycmVudCA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBPYnNlcnZhYmxlIHRoYXQgbGV0cyBvdGhlciBjbGFzc2VzIHN1YnNjcmliZSB0byBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9jaGFuZ2UgPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gIHB1YmxpYyBnZXQgY2hhbmdlcygpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgY3VycmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgfVxuICBzZXQgY3VycmVudChpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKGluZGV4ICE9PSB0aGlzLl9jdXJyZW50KSB7XG4gICAgICB0aGlzLl9jdXJyZW50ID0gaW5kZXg7XG4gICAgICB0aGlzLl9jaGFuZ2UubmV4dChpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFjdGl2ZUFsZXJ0cygpIHtcbiAgICByZXR1cm4gdGhpcy5hbGxBbGVydHMuZmlsdGVyKGFsZXJ0ID0+ICFhbGVydC5fY2xvc2VkKTtcbiAgfVxuXG4gIGdldCBjdXJyZW50QWxlcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlQWxlcnRzW3RoaXMuY3VycmVudF07XG4gIH1cblxuICBzZXQgY3VycmVudEFsZXJ0KGFsZXJ0OiBDbHJBbGVydCkge1xuICAgIHRoaXMuY3VycmVudCA9IHRoaXMuYWN0aXZlQWxlcnRzLmluZGV4T2YoYWxlcnQpO1xuICB9XG5cbiAgZ2V0IGNvdW50KCkge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUFsZXJ0cy5sZW5ndGg7XG4gIH1cblxuICBtYW5hZ2UoYWxlcnRzOiBRdWVyeUxpc3Q8Q2xyQWxlcnQ+KSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICB0aGlzLmFsbEFsZXJ0cyA9IGFsZXJ0cztcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuYWxsQWxlcnRzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnQgPj0gdGhpcy5hbGxBbGVydHMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IE1hdGgubWF4KDAsIHRoaXMuYWxsQWxlcnRzLmxlbmd0aCAtIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmV4dCgpIHtcbiAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLmN1cnJlbnQgPT09IHRoaXMuYWN0aXZlQWxlcnRzLmxlbmd0aCAtIDEgPyAwIDogdGhpcy5jdXJyZW50ICsgMTtcbiAgfVxuXG4gIHByZXZpb3VzKCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZUFsZXJ0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50ID0gdGhpcy5jdXJyZW50ID09PSAwID8gdGhpcy5hY3RpdmVBbGVydHMubGVuZ3RoIC0gMSA6IHRoaXMuY3VycmVudCAtIDE7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnByZXZpb3VzKCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==