import { NgModule, NgModuleFactoryLoader } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './errors/';

@NgModule({
    declarations: [
        NotFoundComponent
    ],
    exports: [
        CommonModule
    ],
    imports: [
        CommonModule
    ],
    providers: [
       
    ]
})
export class CoreModule {}