import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

const MODULES = [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
];

import {CartListComponent} from './cart-list/cart-list.component';

const COMPONENTS = [
    CartListComponent,
];

export {CartService} from './cart.service';

@NgModule({
    imports: MODULES,
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class CartModule {
}
