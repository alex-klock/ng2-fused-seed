import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './feature.component';

export const ROUTES: Routes = [
    { path: '', component: FeatureComponent }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forChild(ROUTES)
    ]
})
export class FeatureRoutingModule {}