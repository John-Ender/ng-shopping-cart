import { Component, OnInit } from '@angular/core';
import { CartService, ShoppingCart, ShoppingCartItem } from '../cart.service';
import { map, first } from 'rxjs/operators';

import * as _ from 'lodash';

export interface Taxes {
    readonly salesTax: number; // Sales tax percentage
    readonly importTax: number; // Import tax percentage
    readonly roundValue: number; // Increment to round the tax value to
}

@Component( {
    selector: 'checkout',
    templateUrl: './checkout.component.html',
    styleUrls: [ './checkout.component.scss' ]
} )
export class CheckoutComponent implements OnInit {

    itemsWithTaxes: ShoppingCartItem[];
    salesTax: number;
    totalCost: number;
    private taxes: Taxes = {salesTax: 0.10, importTax: 0.05, roundValue: 0.05};

    constructor( private cartService: CartService ) {
    }

    ngOnInit() {
        this.cartService.cart.pipe(
            first(),
            map((cart: ShoppingCart) => this.setValues(cart))
        ).subscribe();
    }

    private setValues(cart: ShoppingCart) {
        this.itemsWithTaxes = _.cloneDeep(cart.contents) as ShoppingCartItem[];
        this.calculateTaxes(this.itemsWithTaxes, this.taxes);
        const salesTax = _.sumBy(this.itemsWithTaxes, (item: ShoppingCartItem) => item.salesTax + item.importTax);
        const totalCost = _.sumBy(this.itemsWithTaxes, (item: ShoppingCartItem) => item.totalCost);
        this.salesTax = _.round(salesTax, 2);
        this.totalCost = _.round(totalCost, 2);
    }

    /**
     * Calculate the tax values for the items in the shopping cart
     */
    private calculateTaxes(cart: ShoppingCartItem[], taxes: Taxes) {
        _.map(cart, (item: ShoppingCartItem) => {
            const totalPrice = item.count * item.price;

            if (item.applySalesTax) {
                item.salesTax = this.round( totalPrice * taxes.salesTax, taxes.roundValue);
            }

            if (item.applyImportTax) {
                item.importTax = this.round(totalPrice * taxes.importTax, taxes.roundValue);
            }

            item.totalCost = _.round(totalPrice + item.salesTax + item.importTax, 2);
        })
    }

    /**
     * Round a given value to a number with a given precision
     *
     * @param {number} value - The value to round
     * @param {number} round - The value to round to the nearest of
     * @param {number} precision - Integer value determining how many decimal places to return
     * @returns {number}
     */
    private round(value: number, round: number, precision: number = 2): number {
        const roundedValue = _.ceil(value / round) * round;
        return _.round(roundedValue, precision); // roundedValue has too much precision, round the decimal places down
    }
}
