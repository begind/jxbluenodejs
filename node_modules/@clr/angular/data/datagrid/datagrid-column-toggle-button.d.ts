import { ColumnsService } from './providers/columns.service';
import { Observable } from 'rxjs';
export declare class ClrDatagridColumnToggleButton {
    private columnsService;
    constructor(columnsService: ColumnsService);
    private allSelected;
    readonly clrAllSelected: Observable<boolean>;
    private hideableColumns;
    readonly allHideablesVisible: boolean;
    selectAll(): void;
}
