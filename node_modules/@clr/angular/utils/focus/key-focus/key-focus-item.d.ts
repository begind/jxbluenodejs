import { ElementRef } from '@angular/core';
export declare class ClrKeyFocusItem {
    private elementRef;
    private platformId;
    tabIndex: number;
    readonly nativeElement: any;
    constructor(elementRef: ElementRef, platformId: Object);
    focus(): void;
}
