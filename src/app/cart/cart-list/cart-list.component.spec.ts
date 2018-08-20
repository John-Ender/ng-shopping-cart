import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartListComponent } from './cart-list.component';
import { MODULES } from '../cart.module';

describe( 'CartListComponent', () => {
    let component: CartListComponent;
    let fixture: ComponentFixture<CartListComponent>;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports: MODULES,
            declarations: [ CartListComponent ]
        } )
            .compileComponents();
    } ) );

    beforeEach( () => {
        fixture = TestBed.createComponent( CartListComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } );

    it( 'should create', () => {
        expect( component ).toBeTruthy();
    } );

    it( 'should have providers instantiated', () => {
        expect( component.cartService).toBeTruthy();
    });

    it( 'should contain column definitions', () => {
        expect( component.displayedColumns ).toBeTruthy();
        expect( component.displayedColumns ).toContain('description');
        expect( component.displayedColumns ).toContain('price');
        expect( component.displayedColumns ).toContain('count');
        expect( component.displayedColumns ).toContain('actions');
    });

    it( 'should render component title in a h3 tag', async( () => {
        const compiled = fixture.debugElement.nativeElement;
        expect( compiled.querySelector( 'h3' ).textContent ).toContain( 'Shopping Cart' );
    } ) );
} );
