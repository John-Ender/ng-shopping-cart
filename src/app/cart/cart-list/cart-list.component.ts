import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CartService, ShoppingCart } from '../cart.service';
import { map, tap } from 'rxjs/internal/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component( {
    selector: 'cart-list',
    templateUrl: './cart-list.component.html',
    styleUrls: [ './cart-list.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
} )
export class CartListComponent {

    displayedColumns = ['description', 'price', 'count', 'actions'];
    disableCheckout: boolean = true;
    dataSource = this.cartService.cart.pipe(
            tap((cart: ShoppingCart) => this.disableCheckout = !cart.count || cart.count <= 0),
            map((cart: ShoppingCart) => cart.contents),
            tap(() => this.cdr.markForCheck()));

    constructor( public cartService: CartService,
                 public dialog: MatDialog,
                 public snackBar: MatSnackBar,
                 private cdr: ChangeDetectorRef ) {}

    openDialog(): void {
        const dialogRef = this.dialog.open(CheckoutComponent, {
            maxWidth: '500px',
            minWidth: '350px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.snackBar.open('Transaction Completed', '',{ duration: 1500 });
                this.cartService.reset();
            }
        });
    }
}
