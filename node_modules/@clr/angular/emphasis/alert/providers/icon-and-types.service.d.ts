import { AlertInfoObject } from '../utils/alert-info-object';
import { ClrCommonStringsService } from '../../../utils/i18n/common-strings.service';
export declare class AlertIconAndTypesService {
    private commonStrings;
    constructor(commonStrings: ClrCommonStringsService);
    private defaultIconShape;
    private _alertIconShape;
    private _alertType;
    alertType: string;
    alertIconShape: string;
    readonly alertIconTitle: string;
    iconInfoFromType(type: string): AlertInfoObject;
}
