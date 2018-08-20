import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { shareReplay, catchError } from 'rxjs/operators'

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
        this.inventory = this.fetchInventory('data/inventory.json');
    }

    private fetchInventory(url: string): Observable<ReadonlyArray<Readonly<InventoryItem>>> {
        return this.http.get<InventoryItem[]>(url).pipe(
            catchError(() => from([])),
            shareReplay(1)
        );
    }
}
