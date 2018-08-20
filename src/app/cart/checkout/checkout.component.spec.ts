import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { MODULES } from '../cart.module';
import { ReplaySubject } from 'rxjs';
import { CartService, ShoppingCart } from '../cart.service';

import * as _ from 'lodash';

describe( 'CheckoutComponent', () => {
    let component: CheckoutComponent;
    let fixture: ComponentFixture<CheckoutComponent>;

    let cartSubject: ReplaySubject<ShoppingCart>;

    const defaultCartItemValues = { count: 1, salesTax: 0.0, importTax: 0.0, totalCost: 0.0 };
    const example1 = {
        contents: [
            {
                '_id': 1,
                'description': '16lb bag of Skittles',
                'price': 16.00
            },
            {
                '_id': 2,
                'description': 'Walkman',
                'price': 99.99,
                'applySalesTax': true
            },
            {
                '_id': 3,
                'description': 'bag of microwave Popcorn',
                'price': 0.99
            } ],
    };
    const example2 = {
        contents: [
            {
                '_id': 4,
                'description': 'imported bag of Vanilla-Hazelnut Coffee',
                'price': 11.00,
                'applyImportTax': true
            },
            {
                '_id': 5,
                'description': 'Imported Vespa',
                'price': 15001.25,
                'applySalesTax': true,
                'applyImportTax': true
            } ],
    };
    const example3 = {
        contents: [
            {
                '_id': 6,
                'description': 'imported crate of Almond Snickers',
                'price': 75.99,
                'applyImportTax': true
            },
            {
                '_id': 7,
                'description': 'Discman',
                'price': 55.00,
                'applySalesTax': true
            },
            {
                '_id': 8,
                'description': 'Imported Bottle of Wine',
                'price': 10.00,
                'applySalesTax': true,
                'applyImportTax': true
            },
            {
                '_id': 9,
                'description': '300# bag of Fair-Trade Coffee',
                'price': 997.99
            } ],
    };

    beforeEach( async( () => {
        cartSubject = new ReplaySubject<ShoppingCart>( 1 );
        let dummyCartService = {
            cart: cartSubject.asObservable()
        };

        TestBed.configureTestingModule( {
            imports: MODULES,
            declarations: [ CheckoutComponent ],
            providers: [ { provide: CartService, useValue: dummyCartService } ]
        } ).compileComponents();
    } ) );

    beforeEach( () => {
        fixture = TestBed.createComponent( CheckoutComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } );

    it( 'should be created', () => {
        expect( component ).toBeTruthy();
    } );

    it( 'should have providers instantiated', () => {
        expect( component[ 'cartService' ] ).toBeTruthy();
    } );

    it( 'should correctly calculate all values for example 1 items', async(() => {
        let values = _.map(example1.contents, (item) => _.extend({}, item, defaultCartItemValues));
        cartSubject.next({contents: values, count: 0});

        expect( component.itemsWithTaxes ).toBeTruthy();
        expect( component.salesTax ).toBeTruthy();
        expect( component.totalCost ).toBeTruthy();
        expect( component.itemsWithTaxes.length ).toEqual(3);
        expect( component.itemsWithTaxes[0].totalCost ).toEqual(16.00);
        expect( component.itemsWithTaxes[1].totalCost ).toEqual(109.99);
        expect( component.itemsWithTaxes[2].totalCost ).toEqual(0.99);
        expect( component.salesTax ).toEqual(10.00);
        expect( component.totalCost ).toEqual(126.98);
    } ));

    it( 'should correctly calculate all values for example 2 items', async(() => {
        let values = _.map(example2.contents, (item) => _.extend({}, item, defaultCartItemValues));
        cartSubject.next({contents: values, count: 0});

        expect( component.itemsWithTaxes ).toBeTruthy();
        expect( component.salesTax ).toBeTruthy();
        expect( component.totalCost ).toBeTruthy();
        expect( component.itemsWithTaxes.length ).toEqual(2);
        expect( component.itemsWithTaxes[0].totalCost ).toEqual(11.55);
        expect( component.itemsWithTaxes[1].totalCost ).toEqual(17251.50);
        expect( component.salesTax ).toEqual(2250.80);
        expect( component.totalCost ).toEqual(17263.05);
    } ));

    it( 'should correctly calculate all values for example 3 items', async(() => {
        let values = _.map(example3.contents, (item) => _.extend({}, item, defaultCartItemValues));
        cartSubject.next({contents: values, count: 0});

        expect( component.itemsWithTaxes ).toBeTruthy();
        expect( component.salesTax ).toBeTruthy();
        expect( component.totalCost ).toBeTruthy();
        expect( component.itemsWithTaxes.length ).toEqual(4);
        expect( component.itemsWithTaxes[0].totalCost ).toEqual(79.79);
        expect( component.itemsWithTaxes[1].totalCost ).toEqual(60.50);
        expect( component.itemsWithTaxes[2].totalCost ).toEqual(11.50);
        expect( component.itemsWithTaxes[3].totalCost ).toEqual(997.99);
        expect( component.salesTax ).toEqual(10.80);
        expect( component.totalCost ).toEqual(1149.78);
    } ));
} );
