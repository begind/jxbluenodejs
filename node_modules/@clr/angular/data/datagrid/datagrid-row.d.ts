import { AfterContentInit, AfterViewInit, ElementRef, EventEmitter, QueryList, Renderer2, ViewContainerRef } from '@angular/core';
import { ClrDatagridCell } from './datagrid-cell';
import { DisplayModeService } from './providers/display-mode.service';
import { ExpandableRowsCount } from './providers/global-expandable-rows';
import { RowActionService } from './providers/row-action-service';
import { Selection } from './providers/selection';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { SelectionType } from './enums/selection-type';
import { DatagridIfExpandService } from './datagrid-if-expanded.service';
import { ClrExpandableAnimation } from '../../utils/animations/expandable-animation/expandable-animation';
export declare class ClrDatagridRow<T = any> implements AfterContentInit, AfterViewInit {
    selection: Selection<T>;
    rowActionService: RowActionService;
    globalExpandable: ExpandableRowsCount;
    expand: DatagridIfExpandService;
    private displayMode;
    private vcr;
    private renderer;
    private el;
    commonStrings: ClrCommonStringsService;
    id: string;
    radioId: string;
    checkboxId: string;
    SELECTION_TYPE: typeof SelectionType;
    expandAnimation: ClrExpandableAnimation;
    /**
     * Model of the row, to use for selection
     */
    item: T;
    replaced: any;
    expandAnimationTrigger: boolean;
    constructor(selection: Selection<T>, rowActionService: RowActionService, globalExpandable: ExpandableRowsCount, expand: DatagridIfExpandService, displayMode: DisplayModeService, vcr: ViewContainerRef, renderer: Renderer2, el: ElementRef, commonStrings: ClrCommonStringsService);
    private _selected;
    /**
     * Indicates if the row is selected
     */
    selected: boolean;
    selectedChanged: EventEmitter<boolean>;
    toggle(selected?: boolean): void;
    expanded: boolean;
    expandedChange: EventEmitter<boolean>;
    toggleExpand(): void;
    /*****
     * property dgCells
     *
     * @description
     * A Query List of the ClrDatagrid cells in this row.
     *
     */
    dgCells: QueryList<ClrDatagridCell>;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    private subscriptions;
    ngOnDestroy(): void;
    displayCells: boolean;
    _stickyCells: ViewContainerRef;
    _scrollableCells: ViewContainerRef;
    _calculatedCells: ViewContainerRef;
    private wrappedInjector;
    ngOnInit(): void;
    readonly _view: any;
}
