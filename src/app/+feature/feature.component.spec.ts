import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser'
import { FeatureModule } from './feature.module';
import { FeatureComponent } from './feature.component';

suite('Feature/FeatureComponent', () => {

    let de: DebugElement;
    let comp: FeatureComponent;
    let fixture: ComponentFixture<FeatureComponent>;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
           // declarations: [FeatureComponent],
            imports: [FeatureModule]
        })
        .compileComponents().then(() => {
            fixture = TestBed.createComponent(FeatureComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement;
            fixture.detectChanges();
        });
    }));

    it('should compile the component', () => {
        expect(fixture.nativeElement).toBeTruthy();
        expect(comp).toBeTruthy();
    });
});