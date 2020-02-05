/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { InjectionToken, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { DynamicWrapper } from '../../utils/host-wrapping/dynamic-wrapper';
import { IfErrorService } from '../common/if-error/if-error.service';
import { ClrLabel } from '../common/label';
import { ControlClassService } from '../common/providers/control-class.service';
import { FocusService } from '../common/providers/focus.service';
import { LayoutService } from '../common/providers/layout.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
export declare const TOGGLE_SERVICE: InjectionToken<BehaviorSubject<boolean>>;
export declare function ToggleServiceFactory(): BehaviorSubject<boolean>;
export declare const TOGGLE_SERVICE_PROVIDER: {
    provide: InjectionToken<BehaviorSubject<boolean>>;
    useFactory: typeof ToggleServiceFactory;
};
export declare class ClrPasswordContainer implements DynamicWrapper, OnDestroy {
    private ifErrorService;
    private layoutService;
    private controlClassService;
    focusService: FocusService;
    private ngControlService;
    private toggleService;
    commonStrings: ClrCommonStringsService;
    private subscriptions;
    invalid: boolean;
    control: NgControl;
    _dynamic: boolean;
    show: boolean;
    focus: boolean;
    private _toggle;
    clrToggle: boolean;
    label: ClrLabel;
    constructor(ifErrorService: IfErrorService, layoutService: LayoutService, controlClassService: ControlClassService, focusService: FocusService, ngControlService: NgControlService, toggleService: BehaviorSubject<boolean>, commonStrings: ClrCommonStringsService);
    toggle(): void;
    controlClass(): string;
    addGrid(): boolean;
    ngOnDestroy(): void;
}
