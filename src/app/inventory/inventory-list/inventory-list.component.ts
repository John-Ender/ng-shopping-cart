import { Component, ChangeDetectionStrategy } from '@angular/core';

import { InventoryService } from '../inventory.service';
import { CartService } from '../../cart/cart.module';

@Component( {
    selector: 'inventory-list',
    templateUrl: './inventory-list.component.html',
    styleUrls: [ './inventory-list.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
} )
export class InventoryListComponent {

    displayedColumns = ['description', 'price', 'actions'];

    constructor( public inventoryService: InventoryService,
                 public cartService: CartService) {
    }
}
