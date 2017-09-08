import { NgModule } from '@angular/core';
import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './feature.component';

@NgModule({
    declarations: [
        FeatureComponent
    ],
    imports: [
        FeatureRoutingModule
    ]
})
export class FeatureModule {}