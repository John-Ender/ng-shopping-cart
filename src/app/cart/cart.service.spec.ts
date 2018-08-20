import { TestBed, inject, async } from '@angular/core/testing';

import { CartService, ShoppingCart, ShoppingCartItem } from './cart.service';
import { ReplaySubject } from 'rxjs';

describe( 'CartService', () => {

    let chartService: CartService;
    let list: ShoppingCartItem[];

    const example = [
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
        }
    ];

    beforeEach( () => {
        TestBed.configureTestingModule( {
            providers: [ CartService ]
        } );
    } );

    beforeEach( inject( [ CartService ], ( service: CartService ) => {
        chartService = service;
        chartService[ 'list' ] = list = [];
    } ) );


    it( 'should be created', () => {
        expect( chartService ).toBeTruthy();
    } );

    it( 'should add a new item', async( () => {
        chartService.addItem( example[ 0 ] );
        expect( list.length ).toEqual( 1 );
        expect( chartService[ 'count' ] ).toEqual(1);
        expect( list[0] ).toEqual(jasmine.objectContaining(example[0]));
    } ) );

    it( 'should add a new items', async( () => {
        chartService.addItem( example[ 0 ] );
        expect( list.length ).toEqual( 1 );
        expect( chartService[ 'count' ] ).toEqual(1);
        expect( list[0] ).toEqual(jasmine.objectContaining(example[0]));

        chartService.addItem( example[ 1 ] );
        expect( list.length ).toEqual( 2 );
        expect( chartService[ 'count' ] ).toEqual(2);
        expect( list[1] ).toEqual(jasmine.objectContaining(example[1]));
    } ) );

    it( 'should maintain order of added items', async( () => {
        chartService.addItem( example[ 2 ] );
        expect( list[0] ).toEqual(jasmine.objectContaining(example[2]));

        chartService.addItem( example[ 0 ] );
        expect( list[1] ).toEqual(jasmine.objectContaining(example[0]));

        chartService.addItem( example[ 1 ] );
        expect( list[2] ).toEqual(jasmine.objectContaining(example[1]));
    } ) );

    it( 'should increment existing items', async( () => {
        chartService.addItem( example[ 0 ] );
        expect( list.length ).toEqual( 1 );
        expect( chartService[ 'count' ] ).toEqual(1);
        expect( list[0] ).toEqual(jasmine.objectContaining(example[0]));

        chartService.addItem( example[ 0] );
        expect( list.length ).toEqual( 1 );
        expect( chartService[ 'count' ] ).toEqual(2);
        expect( list[0] ).toEqual(jasmine.objectContaining(example[0]));
        expect( list[0].count ).toEqual( 2 );

    } ) );

    it( 'should add more than 1 of an item', async( () => {
        chartService.addItem( example[ 0 ], 3 );
        expect( list.length ).toEqual( 1 );
        expect( chartService[ 'count' ] ).toEqual(3);
        expect( list[0] ).toEqual(jasmine.objectContaining(example[0]));
        expect( list[0].count ).toEqual( 3 );
    } ) );

    it( 'should reset an empty cart', async( () => {
        expect( list.length ).toEqual( 0 );
        chartService.reset();
        expect( list.length ).toEqual( 0 );
    } ) );

    it( 'should reset a cart with items', async( () => {
        chartService.addItem( example[ 0 ], 3 );
        chartService.addItem( example[ 1], 5 );
        expect( list.length ).toEqual( 2 );
        expect( chartService[ 'count' ] ).toEqual(8);
        chartService.reset();
        expect( list.length ).toEqual( 0 );
        expect( chartService[ 'count' ] ).toEqual(0);
    } ) );

    it( 'should remove items from an empty cart', async( () => {
        expect( list.length ).toEqual( 0 );
        expect( chartService[ 'count' ] ).toEqual(0);
        chartService.removeItem( example[ 0 ], 3 );
        expect( list.length ).toEqual( 0 );
    } ) );

    it( 'should remove items that do not exist in the list', async( () => {
        chartService.addItem( example[ 0 ], 3 );
        expect( list.length ).toEqual( 1 );
        expect( chartService[ 'count' ] ).toEqual(3);

        chartService.removeItem( example[ 2 ] );
        expect( list.length ).toEqual( 1 );
        expect( chartService[ 'count' ] ).toEqual(3);
    } ) );

    it( 'should decrement an item that exists', async( () => {
        chartService.addItem( example[ 0 ], 3 );
        expect( list.length ).toEqual( 1 );
        expect( chartService[ 'count' ] ).toEqual(3);

        chartService.removeItem( example[ 0 ] );
        expect( list.length ).toEqual( 1 );
        expect( chartService[ 'count' ] ).toEqual(2);
    } ) );

    it( 'should decrement many items that exist', async( () => {
        chartService.addItem( example[ 0 ], 3 );
        chartService.addItem( example[ 1 ], 5 );
        chartService.addItem( example[ 2 ], 9 );
        expect( list.length ).toEqual( 3 );
        expect( chartService[ 'count' ] ).toEqual(17);

        chartService.removeItem( example[ 0 ], 2 );
        expect( list.length ).toEqual( 3 );
        expect( chartService[ 'count' ] ).toEqual(15);

        chartService.removeItem( example[ 1 ], 3 );
        expect( list.length ).toEqual( 3 );
        expect( chartService[ 'count' ] ).toEqual(12);

        chartService.removeItem( example[ 2 ], 4 );
        expect( list.length ).toEqual( 3 );
        expect( chartService[ 'count' ] ).toEqual(8);
    } ) );

    it( 'should remove an item whose count reaches 0', async( () => {
        chartService.addItem( example[ 0 ], 3 );
        chartService.addItem( example[ 1 ], 5 );
        chartService.addItem( example[ 2 ], 9 );
        expect( list.length ).toEqual( 3 );
        expect( chartService[ 'count' ] ).toEqual(17);

        chartService.removeItem( example[ 0 ], 3 );
        expect( list.length ).toEqual( 2 );
        expect( chartService[ 'count' ] ).toEqual(14);
    } ) );

    it( 'should handle removing more than an item has', async( () => {
        chartService.addItem( example[ 0 ], 3 );
        chartService.addItem( example[ 1 ], 5 );
        chartService.addItem( example[ 2 ], 9 );
        expect( list.length ).toEqual( 3 );
        expect( chartService[ 'count' ] ).toEqual(17);

        chartService.removeItem( example[ 0 ], 200 );
        expect( list.length ).toEqual( 2 );
        expect( chartService[ 'count' ] ).toEqual(14);
    } ) );
} );
