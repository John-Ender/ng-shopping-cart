import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryListComponent } from './inventory-list.component';
import { MODULES } from '../inventory.module';
import { By } from '@angular/platform-browser';

describe( 'InventoryListComponent', () => {
    let component: InventoryListComponent;
    let fixture: ComponentFixture<InventoryListComponent>;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports: MODULES,
            declarations: [ InventoryListComponent ]
        } )
            .compileComponents();
    } ) );

    beforeEach( () => {
        fixture = TestBed.createComponent( InventoryListComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } );

    it( 'should create', () => {
        expect( component ).toBeTruthy();
    } );

    it( 'should have providers instantiated', () => {
        expect( component.inventoryService).toBeTruthy();
        expect( component.cartService).toBeTruthy();
    });

    it( 'should contain column definitions', () => {
        expect( component.displayedColumns ).toBeTruthy();
        expect( component.displayedColumns ).toContain('description');
        expect( component.displayedColumns ).toContain('price');
        expect( component.displayedColumns ).toContain('actions');
    });

    it( 'should render component title in a h3 tag', async( () => {
        const compiled = fixture.debugElement.nativeElement;
        expect( compiled.querySelector( 'h3' ).textContent ).toContain( 'Inventory' );
    } ) );
} );
