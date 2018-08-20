import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';

import { AppRoutingModule } from './app-routing.module';
import { CartModule } from './cart/cart.module';
import { InventoryModule } from './inventory/inventory.module';

export const MODULES = [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    // Application Modules
    AppRoutingModule,
    CartModule,
    InventoryModule,
];

import { AppComponent } from './app.component';

const COMPONENTS = [
    AppComponent
];

@NgModule( {
    imports: [...MODULES, ],
    declarations: COMPONENTS,
    providers: [],
    bootstrap: [ AppComponent ]
} )
export class AppModule {
}
