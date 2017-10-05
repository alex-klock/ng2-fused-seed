import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NestedComponent } from './nested.component';

export const ROUTES: Routes = [
    { path: '', component: NestedComponent }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forChild(ROUTES)
    ]
})
export class NestedRoutingModule {}