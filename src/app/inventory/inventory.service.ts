import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators'

export interface InventoryItem {
    readonly _id: number; // typically a GUID or UUID but we'll keep it simple for this example
    readonly description: string;
    readonly price: number;
    readonly applySalesTax?: boolean; // Whether to apply sales tax
    readonly applyImportTax?: boolean; // Whether to apply import tax
}

@Injectable( {
    providedIn: 'root'
} )
export class InventoryService {

    inventory: Observable<ReadonlyArray<Readonly<InventoryItem>>>;

    constructor(private http: HttpClient) {
        this.inventory = this.http.get<InventoryItem[]>('data/inventory.json').pipe(
            shareReplay(1)
        );
    }
}
