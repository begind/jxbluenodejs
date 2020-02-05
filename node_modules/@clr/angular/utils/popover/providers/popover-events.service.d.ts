import { ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { ClrPopoverToggleService } from './popover-toggle.service';
/** @dynamic */
export declare class ClrPopoverEventsService implements OnDestroy {
    private renderer;
    private smartOpenService;
    private document;
    outsideClickClose: boolean;
    scrollToClose: boolean;
    private documentClickListener;
    ignoredEvent: any;
    private subscriptions;
    constructor(renderer: Renderer2, smartOpenService: ClrPopoverToggleService, document: HTMLDocument);
    private scrollSubscription;
    addScrollListener(): void;
    removeScrollListener(): void;
    private testForSmartPopoverContentContainer;
    addClickListener(): void;
    removeClickListener(): void;
    private escapeListener;
    addEscapeListener(): void;
    removeEscapeListener(): void;
    private _anchorButtonRef;
    anchorButtonRef: ElementRef;
    private _closeButtonRef;
    closeButtonRef: ElementRef;
    setCloseFocus(): void;
    setAnchorFocus(): void;
    private _contentRef;
    contentRef: ElementRef;
    private documentScroller;
    private removeAllEventListeners;
    ngOnDestroy(): void;
}
