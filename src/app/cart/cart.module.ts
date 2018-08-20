import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';

export const MODULES = [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatDividerModule,
    MatSnackBarModule
];

import { CheckoutComponent } from './checkout/checkout.component';

const ENTRY_COMPONENTS = [
    CheckoutComponent
];

import {CartListComponent} from './cart-list/cart-list.component';

const COMPONENTS = [
    ...ENTRY_COMPONENTS,
    CartListComponent,
];


export {CartService} from './cart.service';

@NgModule({
    imports: MODULES,
    declarations: COMPONENTS,
    exports: COMPONENTS,
    entryComponents: ENTRY_COMPONENTS
})
export class CartModule {
}
