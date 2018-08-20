import { Injectable } from '@angular/core';
import { InventoryItem } from '../inventory/inventory.module';
import { Observable, ReplaySubject } from 'rxjs';

import * as _ from 'lodash';

export interface ShoppingCartItem extends InventoryItem {
    count: number; // Number of items for this _id in the cart
    salesTax: number; // Calculated sales tax on the item
    importTax: number; // Calculated import tax on the item
    totalCost: number; // Total value of the item(s) including taxes
}

export interface ShoppingCart {
    readonly contents: ReadonlyArray<Readonly<ShoppingCartItem>>;
    readonly count: number;
};

@Injectable( {
    providedIn: 'root'
} )
export class CartService {

    private list: ShoppingCartItem[] = [];
    private count: number = 0;
    private cartSubject: ReplaySubject<ShoppingCart> = new ReplaySubject<ShoppingCart>( 1 );
    cart: Observable<ShoppingCart> = this.cartSubject.asObservable();

    constructor() {
    }

    /**
     * Add a number of a specific item to the cart.
     * @param {Item} item - The item to add to the cart, must be an item object retrieved from the inventory.
     * @param {number} amount - The amount of the item to be added
     */
    addItem( item: InventoryItem | ShoppingCartItem, amount: number = 1 ) {
        if ( amount <= 0 ) return;

        // Retrieve the item if it is currently in the cart, _.find returns undefined for non-existent values
        let listItem = _.find( this.list, ( value ) => value._id === item._id );

        // If the item is already in the cart, increment by the amount. Otherwise, add an instance of it.
        if ( listItem ) {
            listItem.count += amount;
        } else {
            const defaultValues = { count: amount, salesTax: 0.0, importTax: 0.0, totalCost: 0.0 };
            this.list.push( _.extend( {}, item, defaultValues ) );
        }

        this.count += amount;

        this.cartSubject.next( { contents: this.list, count: this.count } );
    }

    /**
     * Remove a number of a specific item from the cart.
     *
     * No need to return a success or fail value, if the item doesn't exist in the inventory or the cart
     * we've accomplished our task.
     *
     * @param {Item} item - The item to removed from the cart, must be an item object retrieved from the inventory.
     * @param {number} amount - The amount of the item to be removed
     */
    removeItem( item: ShoppingCartItem, amount: number = 1 ) {
        if ( amount <= 0 ) return;
        // Retrieve the item if it is currently in the cart, _.find returns undefined for non-existent values
        let listItem = _.find( this.list, ( value ) => value._id === item._id );

        if ( !listItem ) return; // If the item isn't currently in the cart return, no more work to do.

        // If the amount to be removed it greater that what is currently in the cart remove the item completely, otherwise
        // decrement by the amount.
        if ( listItem.count <= amount ) {
            _.remove( this.list, listItem );
            this.count -= listItem.count;
        } else {
            listItem.count -= amount;
            this.count -= amount;
        }

        this.cartSubject.next( { contents: this.list, count: this.count } );
    }

    /**
     * Clear all of the entries from the cart
     */
    reset() {
        _.remove(this.list, () => true);
        this.count = 0;
        this.cartSubject.next( { contents: this.list, count: this.count } );
    }
}
