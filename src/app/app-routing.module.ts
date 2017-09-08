import { NgModule, Compiler } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/errors/';

export const APP_ROUTES: Routes = [
    
    { path: 'feature', loadChildren: 'app/+feature/feature.module#FeatureModule' },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(APP_ROUTES)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AppRoutingModule {
    
}