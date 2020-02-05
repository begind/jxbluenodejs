import { ClrPopoverEventsService } from './popover-events.service';
import { ClrPopoverPosition } from '../interfaces/popover-position.interface';
import { ClrPopoverContentOffset } from '../interfaces/popover-content-offset.interface';
export declare class ClrPopoverPositionService {
    private eventService;
    platformId: Object;
    private currentAnchorCoords;
    private currentContentCoords;
    private contentOffsets;
    private _position;
    position: ClrPopoverPosition;
    constructor(eventService: ClrPopoverEventsService, platformId: Object);
    alignContent(content: HTMLElement): ClrPopoverContentOffset;
    private handleVerticalAxisOneViolation;
    private handleVerticalAxisTwoViolations;
    private handleHorizontalAxisOneViolation;
    private handleHorizontalAxisTwoViolations;
}
