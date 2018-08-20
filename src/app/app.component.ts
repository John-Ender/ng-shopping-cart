import { Component, ChangeDetectionStrategy,  } from '@angular/core';
import { CartService } from './cart/cart.module';

@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
} )
export class AppComponent {
    opened: boolean;

    constructor( public cartService: CartService ) {}
}
