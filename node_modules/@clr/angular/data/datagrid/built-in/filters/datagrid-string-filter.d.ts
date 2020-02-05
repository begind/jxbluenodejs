import { AfterViewInit, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { ClrDatagridFilter } from '../../datagrid-filter';
import { ClrDatagridStringFilterInterface } from '../../interfaces/string-filter.interface';
import { CustomFilter } from '../../providers/custom-filter';
import { FiltersProvider, RegisteredFilter } from '../../providers/filters';
import { DomAdapter } from '../../../../utils/dom-adapter/dom-adapter';
import { DatagridFilterRegistrar } from '../../utils/datagrid-filter-registrar';
import { DatagridStringFilterImpl } from './datagrid-string-filter-impl';
import { ClrPopoverToggleService } from '../../../../utils/popover/providers/popover-toggle.service';
export declare class DatagridStringFilter<T = any> extends DatagridFilterRegistrar<T, DatagridStringFilterImpl<T>> implements CustomFilter, AfterViewInit, OnDestroy {
    private domAdapter;
    private smartToggleService;
    private subs;
    constructor(filters: FiltersProvider<T>, domAdapter: DomAdapter, smartToggleService: ClrPopoverToggleService);
    /**
     * Customizable filter logic based on a search text
     */
    customStringFilter: ClrDatagridStringFilterInterface<T> | RegisteredFilter<T, DatagridStringFilterImpl<T>>;
    /**
     * Indicates if the filter dropdown is open
     */
    open: boolean;
    /**
     * We need the actual input element to automatically focus on it
     */
    input: ElementRef;
    /**
     * We grab the ClrDatagridFilter we wrap to register this StringFilter to it.
     */
    filterContainer: ClrDatagridFilter<T>;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * Common setter for the input value
     */
    value: string;
    filterValueChange: EventEmitter<{}>;
}
