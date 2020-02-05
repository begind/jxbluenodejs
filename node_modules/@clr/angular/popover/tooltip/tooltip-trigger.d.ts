import { IfOpenService } from '../../utils/conditional/if-open.service';
import { TooltipIdService } from './providers/tooltip-id.service';
export declare class ClrTooltipTrigger {
    private ifOpenService;
    private tooltipIdService;
    ariaDescribedBy: any;
    private subs;
    constructor(ifOpenService: IfOpenService, tooltipIdService: TooltipIdService);
    showTooltip(): void;
    hideTooltip(): void;
    ngOnDestroy(): void;
}
