import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';

const MODULES = [
    CommonModule,
    InventoryRoutingModule
];

import { InventoryListComponent } from './inventory-list/inventory-list.component';

const COMPONENTS = [
    InventoryListComponent,
];

@NgModule({
  imports: MODULES,
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class InventoryModule { }
