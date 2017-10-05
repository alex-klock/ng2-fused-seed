import { NgModule } from '@angular/core';
import { NestedRoutingModule } from './nested-routing.module';
import { NestedComponent } from './nested.component';

@NgModule({
    declarations: [
        NestedComponent
    ],
    imports: [
        NestedRoutingModule
    ]
})
export class NestedModule {}