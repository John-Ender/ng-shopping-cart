import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MODULES } from './app.module';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';

describe( 'AppComponent', () => {

    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports: MODULES,
            declarations: [
                AppComponent
            ],
            providers: [ { provide: APP_BASE_HREF, useValue: '/' } ]
        } ).compileComponents();
    } ) );

    beforeEach( () => {
        fixture = TestBed.createComponent( AppComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } );

    // Specs
    it( 'should create the app', async( () => {
        expect( component ).toBeTruthy();
    } ) );


    it( `should have as title 'ng-shopping-cart'`, async( () => {
        expect( component.opened ).toBeFalsy();
    } ) );

    it( 'should render title in a h3 tag', async( () => {
        const compiled = fixture.debugElement.nativeElement;
        expect( compiled.querySelector( 'h3' ).textContent ).toContain( 'Shopping Cart Demo' );
    } ) );

    it( 'should render side-nav as hidden', async( () => {
        const compiled = fixture.debugElement.query( By.css( 'mat-sidenav' ) );
        expect( compiled.nativeElement.style.visibility ).toEqual( 'hidden' );
    } ) );
} );
