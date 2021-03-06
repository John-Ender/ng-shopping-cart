import { TestBed, inject, async } from '@angular/core/testing';

import { InventoryService } from './inventory.service';
import { MODULES } from './inventory.module';

import * as _ from 'lodash';

describe( 'InventoryService', () => {

    let inventoryService: InventoryService;

    beforeEach( () => {
        TestBed.configureTestingModule( {
            imports: MODULES,
            providers: [
                InventoryService,
            ]
        } );
    } );

    beforeEach( inject( [ InventoryService ], ( service ) => {
        inventoryService = service;
    } ) );

    // Specs
    it( 'should be created', () => {
        expect( inventoryService ).toBeTruthy();
    } );

    it('should fail gracefully when data is not found', async(() => {
       inventoryService['fetchInventory']('data/').subscribe((value) => {
           expect(value).toBeTruthy();
           expect(value).toEqual([]);
       });
    }));

    it( 'should contain an inventory', () => {
        expect(inventoryService.inventory).toBeTruthy();
    } );

    it( 'should return inventory data', () => {
        inventoryService.inventory.subscribe( ( inventory ) => {
            const description = 'imported bag of Vanilla-Hazelnut Coffee';
            expect(_.find(inventory, (item) => item._id === 3)).toBeTruthy();
            expect(_.find(inventory, (item) => item.description === description)).toBeTruthy();
            expect(inventory.length).toEqual(9);
        } );
    } );
} );
