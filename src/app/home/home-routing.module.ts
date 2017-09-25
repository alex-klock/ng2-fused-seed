import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forChild(APP_ROUTES)]
})
export class HomeRoutingModule {}