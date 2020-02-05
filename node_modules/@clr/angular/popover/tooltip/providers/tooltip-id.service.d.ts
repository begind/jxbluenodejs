import { Observable } from 'rxjs';
export declare class TooltipIdService {
    private _id;
    updateId(id: string): void;
    readonly id: Observable<string>;
}
