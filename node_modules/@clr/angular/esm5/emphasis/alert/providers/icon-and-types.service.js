/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ALERT_TYPES } from '../utils/alert-types';
import { ClrCommonStringsService } from '../../../utils/i18n/common-strings.service';
var AlertIconAndTypesService = /** @class */ (function () {
    function AlertIconAndTypesService(commonStrings) {
        this.commonStrings = commonStrings;
        this.defaultIconShape = 'info-circle';
        this._alertIconShape = '';
        this._alertType = 'info';
    }
    Object.defineProperty(AlertIconAndTypesService.prototype, "alertType", {
        get: function () {
            return this._alertType;
        },
        set: function (val) {
            if (ALERT_TYPES.indexOf(val) > -1) {
                this._alertType = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertIconAndTypesService.prototype, "alertIconShape", {
        get: function () {
            if ('' === this._alertIconShape) {
                return this.iconInfoFromType(this._alertType).shape;
            }
            return this._alertIconShape;
        },
        set: function (val) {
            if (!val) {
                this._alertIconShape = '';
            }
            else if (val !== this._alertIconShape) {
                this._alertIconShape = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertIconAndTypesService.prototype, "alertIconTitle", {
        get: function () {
            return this.iconInfoFromType(this._alertType).title;
        },
        enumerable: true,
        configurable: true
    });
    AlertIconAndTypesService.prototype.iconInfoFromType = function (type) {
        var returnObj = { shape: '', cssClass: '', title: '' };
        switch (type) {
            case 'warning':
                returnObj.shape = 'exclamation-triangle';
                returnObj.cssClass = 'alert-warning';
                returnObj.title = this.commonStrings.keys.warning;
                break;
            case 'danger':
                returnObj.shape = 'exclamation-circle';
                returnObj.cssClass = 'alert-danger';
                returnObj.title = this.commonStrings.keys.danger;
                break;
            case 'success':
                returnObj.shape = 'check-circle';
                returnObj.cssClass = 'alert-success';
                returnObj.title = this.commonStrings.keys.success;
                break;
            default:
                returnObj.shape = this.defaultIconShape;
                returnObj.cssClass = 'alert-info';
                returnObj.title = this.commonStrings.keys.info;
                break;
        }
        return returnObj;
    };
    AlertIconAndTypesService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [ClrCommonStringsService])
    ], AlertIconAndTypesService);
    return AlertIconAndTypesService;
}());
export { AlertIconAndTypesService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1hbmQtdHlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImVtcGhhc2lzL2FsZXJ0L3Byb3ZpZGVycy9pY29uLWFuZC10eXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFHckY7SUFDRSxrQ0FBb0IsYUFBc0M7UUFBdEMsa0JBQWEsR0FBYixhQUFhLENBQXlCO1FBRWxELHFCQUFnQixHQUFHLGFBQWEsQ0FBQztRQUNqQyxvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUNyQixlQUFVLEdBQUcsTUFBTSxDQUFDO0lBSmlDLENBQUM7SUFNOUQsc0JBQUksK0NBQVM7YUFBYjtZQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6QixDQUFDO2FBQ0QsVUFBYyxHQUFXO1lBQ3ZCLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7YUFDdkI7UUFDSCxDQUFDOzs7T0FMQTtJQU9ELHNCQUFJLG9EQUFjO2FBQWxCO1lBQ0UsSUFBSSxFQUFFLEtBQUssSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDL0IsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQzthQUNyRDtZQUNELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM5QixDQUFDO2FBQ0QsVUFBbUIsR0FBVztZQUM1QixJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNSLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO2FBQzNCO2lCQUFNLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDO2FBQzVCO1FBQ0gsQ0FBQzs7O09BUEE7SUFTRCxzQkFBSSxvREFBYzthQUFsQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDdEQsQ0FBQzs7O09BQUE7SUFFTSxtREFBZ0IsR0FBdkIsVUFBd0IsSUFBWTtRQUNsQyxJQUFNLFNBQVMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFFekQsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLFNBQVM7Z0JBQ1osU0FBUyxDQUFDLEtBQUssR0FBRyxzQkFBc0IsQ0FBQztnQkFDekMsU0FBUyxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUM7Z0JBQ3JDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLFNBQVMsQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUM7Z0JBQ3ZDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDO2dCQUNwQyxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDakQsTUFBTTtZQUNSLEtBQUssU0FBUztnQkFDWixTQUFTLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQztnQkFDakMsU0FBUyxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUM7Z0JBQ3JDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1I7Z0JBQ0UsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ3hDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO2dCQUNsQyxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDL0MsTUFBTTtTQUNUO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQTdEVSx3QkFBd0I7UUFEcEMsVUFBVSxFQUFFO2lEQUV3Qix1QkFBdUI7T0FEL0Msd0JBQXdCLENBOERwQztJQUFELCtCQUFDO0NBQUEsQUE5REQsSUE4REM7U0E5RFksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFsZXJ0SW5mb09iamVjdCB9IGZyb20gJy4uL3V0aWxzL2FsZXJ0LWluZm8tb2JqZWN0JztcbmltcG9ydCB7IEFMRVJUX1RZUEVTIH0gZnJvbSAnLi4vdXRpbHMvYWxlcnQtdHlwZXMnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWxlcnRJY29uQW5kVHlwZXNTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzU2VydmljZSkge31cblxuICBwcml2YXRlIGRlZmF1bHRJY29uU2hhcGUgPSAnaW5mby1jaXJjbGUnO1xuICBwcml2YXRlIF9hbGVydEljb25TaGFwZSA9ICcnO1xuICBwcml2YXRlIF9hbGVydFR5cGUgPSAnaW5mbyc7XG5cbiAgZ2V0IGFsZXJ0VHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9hbGVydFR5cGU7XG4gIH1cbiAgc2V0IGFsZXJ0VHlwZSh2YWw6IHN0cmluZykge1xuICAgIGlmIChBTEVSVF9UWVBFUy5pbmRleE9mKHZhbCkgPiAtMSkge1xuICAgICAgdGhpcy5fYWxlcnRUeXBlID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGdldCBhbGVydEljb25TaGFwZSgpOiBzdHJpbmcge1xuICAgIGlmICgnJyA9PT0gdGhpcy5fYWxlcnRJY29uU2hhcGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmljb25JbmZvRnJvbVR5cGUodGhpcy5fYWxlcnRUeXBlKS5zaGFwZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2FsZXJ0SWNvblNoYXBlO1xuICB9XG4gIHNldCBhbGVydEljb25TaGFwZSh2YWw6IHN0cmluZykge1xuICAgIGlmICghdmFsKSB7XG4gICAgICB0aGlzLl9hbGVydEljb25TaGFwZSA9ICcnO1xuICAgIH0gZWxzZSBpZiAodmFsICE9PSB0aGlzLl9hbGVydEljb25TaGFwZSkge1xuICAgICAgdGhpcy5fYWxlcnRJY29uU2hhcGUgPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFsZXJ0SWNvblRpdGxlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaWNvbkluZm9Gcm9tVHlwZSh0aGlzLl9hbGVydFR5cGUpLnRpdGxlO1xuICB9XG5cbiAgcHVibGljIGljb25JbmZvRnJvbVR5cGUodHlwZTogc3RyaW5nKTogQWxlcnRJbmZvT2JqZWN0IHtcbiAgICBjb25zdCByZXR1cm5PYmogPSB7IHNoYXBlOiAnJywgY3NzQ2xhc3M6ICcnLCB0aXRsZTogJycgfTtcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnd2FybmluZyc6XG4gICAgICAgIHJldHVybk9iai5zaGFwZSA9ICdleGNsYW1hdGlvbi10cmlhbmdsZSc7XG4gICAgICAgIHJldHVybk9iai5jc3NDbGFzcyA9ICdhbGVydC13YXJuaW5nJztcbiAgICAgICAgcmV0dXJuT2JqLnRpdGxlID0gdGhpcy5jb21tb25TdHJpbmdzLmtleXMud2FybmluZztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkYW5nZXInOlxuICAgICAgICByZXR1cm5PYmouc2hhcGUgPSAnZXhjbGFtYXRpb24tY2lyY2xlJztcbiAgICAgICAgcmV0dXJuT2JqLmNzc0NsYXNzID0gJ2FsZXJ0LWRhbmdlcic7XG4gICAgICAgIHJldHVybk9iai50aXRsZSA9IHRoaXMuY29tbW9uU3RyaW5ncy5rZXlzLmRhbmdlcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgcmV0dXJuT2JqLnNoYXBlID0gJ2NoZWNrLWNpcmNsZSc7XG4gICAgICAgIHJldHVybk9iai5jc3NDbGFzcyA9ICdhbGVydC1zdWNjZXNzJztcbiAgICAgICAgcmV0dXJuT2JqLnRpdGxlID0gdGhpcy5jb21tb25TdHJpbmdzLmtleXMuc3VjY2VzcztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm5PYmouc2hhcGUgPSB0aGlzLmRlZmF1bHRJY29uU2hhcGU7XG4gICAgICAgIHJldHVybk9iai5jc3NDbGFzcyA9ICdhbGVydC1pbmZvJztcbiAgICAgICAgcmV0dXJuT2JqLnRpdGxlID0gdGhpcy5jb21tb25TdHJpbmdzLmtleXMuaW5mbztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldHVybk9iajtcbiAgfVxufVxuIl19