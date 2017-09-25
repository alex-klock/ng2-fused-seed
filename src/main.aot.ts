import './vendors';
import { enableProdMode } from '@angular/core';
import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from './aot/app/app.module.ngfactory';

enableProdMode();
if (typeof window === 'undefined' || window['disableMainBootstrap'] !== true) {
    platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
} else {
    require('./testing/specs');
}