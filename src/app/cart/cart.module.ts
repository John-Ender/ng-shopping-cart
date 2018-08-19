import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CartRoutingModule} from './cart-routing.module';

const MODULES = [
    CommonModule,
    CartRoutingModule
];

import {CartListComponent} from './cart-list/cart-list.component';

const COMPONENTS = [
    CartListComponent,
];

@NgModule({
    imports: MODULES,
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class CartModule {
}
