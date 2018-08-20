import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CartService, ShoppingCart } from '../cart.service';
import { map, tap } from 'rxjs/internal/operators';

@Component( {
    selector: 'cart-list',
    templateUrl: './cart-list.component.html',
    styleUrls: [ './cart-list.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
} )
export class CartListComponent implements OnInit, OnDestroy {

    displayedColumns = ['description', 'price', 'count', 'actions'];
    displayFooter: boolean = false;
    dataSource = this.cartService.cart.pipe(
            tap((cart: ShoppingCart) => this.displayFooter = cart.count > 0),
            map((cart: ShoppingCart) => cart.contents),
            tap(() => this.cdr.markForCheck()));

    constructor( public cartService: CartService,
                 private cdr: ChangeDetectorRef ) {}

    ngOnInit() {}

    ngOnDestroy() {}
}
