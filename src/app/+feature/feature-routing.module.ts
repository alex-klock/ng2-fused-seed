import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './feature.component';

export const ROUTES: Routes = [
    { path: '', component: FeatureComponent },
    { path: 'nested', loadChildren: 'app/+feature/+nested/nested.module#NestedModule' }
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