import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

import { InventoryRoutingModule } from './inventory-routing.module';

const MODULES = [
    CommonModule,
    InventoryRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
];

import { InventoryListComponent } from './inventory-list/inventory-list.component';

const COMPONENTS = [
    InventoryListComponent,
];

const SERVICES = [];

export { InventoryItem } from './inventory.service';


@NgModule({
  imports: MODULES,
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: SERVICES
})
export class InventoryModule { }
