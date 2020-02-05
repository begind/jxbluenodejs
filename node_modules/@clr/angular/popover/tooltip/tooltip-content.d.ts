import { ElementRef, Injector } from '@angular/core';
import { AbstractPopover } from '../common/abstract-popover';
import { TooltipIdService } from './providers/tooltip-id.service';
export declare class ClrTooltipContent extends AbstractPopover {
    uniqueId: string;
    private tooltipIdService;
    constructor(injector: Injector, parentHost: ElementRef, uniqueId: string, tooltipIdService: TooltipIdService);
    private _position;
    position: string;
    id: string;
    private _id;
    private updateId;
    private _size;
    size: string;
}
