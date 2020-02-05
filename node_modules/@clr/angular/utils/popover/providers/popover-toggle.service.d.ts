import { Observable } from 'rxjs';
export declare class ClrPopoverToggleService {
    /**
     *  Popovers might need to ignore click events on an element
     *  (eg: popover opens on focus on an input field. Clicks should be ignored in this case)
     */
    private _open;
    private _openChange;
    private _openEvent;
    private _openEventChange;
    readonly openChange: Observable<boolean>;
    openEvent: Event;
    getEventChange(): Observable<Event>;
    open: boolean;
    /**
     * Sometimes, we need to remember the event that triggered the toggling to avoid loops.
     * This is for instance the case of components that open on a click, but close on a click outside.
     */
    toggleWithEvent(event: any): void;
}
