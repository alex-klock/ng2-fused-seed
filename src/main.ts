import './vendors';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

enableProdMode();
if (typeof window === 'undefined' || window['disableMainBootstrap'] !== true) {
    platformBrowserDynamic().bootstrapModule(AppModule);
} else {
    require('./testing/specs');
}