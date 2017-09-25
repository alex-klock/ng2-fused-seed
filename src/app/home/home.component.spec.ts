import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser'
import { HomeComponent } from './home.component';

console.log("EXECUTING SPEC");

describe('HomeComponent', () => {

    let de: DebugElement;
    let comp: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach((done) => {
        console.log('async...');
        return TestBed.configureTestingModule({
            declarations: [HomeComponent]
        })
        .compileComponents().then(() => {
            console.log('compile...')
            fixture = TestBed.createComponent(HomeComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement;
            fixture.detectChanges();
            done();
        });
    });

    it('should compile the component', () => {
        console.log('test it...');
        expect(fixture.nativeElement).toBeTruthy();
        expect(comp).toBeTruthy();
        console.log('complete it...');
    });
});