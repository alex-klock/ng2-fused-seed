# NG2-FUSED-SEED
Minimilistic Angular2 Seed utilizing the awesome development and build speed of FuseBox! JIT/AOT/HMR/Tree Shaking/Code Splitting/Lazy Route Loading.

**Not ready for use yet: ng2-fused 0.5 needs to be published.  Real html/css needs to be added to components.  Specs need to be added.**

## Features
* Uber fast build times thanks to FuseBox.
* Builds with Angular JIT compilation.
* Builds with Angular AOT compilation (for enhanced optimization).
* Utilizes FuseBox's Quantum plugin for minification, dead code elimination, and tree shaking.
* File watching to automagically build when code changes.
* Hot Module Reloading to have your changes automatically reload in the browser.
* Split vendor/app bundles.
* Lazy Loaded Routing in both JIT and AOT modes.
* Automatic Code Splitting based on folder naming convents for modules that should be lazy loaded.
* Pre/post css processing in JIT or AOT builds (usable with any ViewEncapsulation mode).
    * Seed comes out of the box with PostCSS setup but can easily be swapped.
* Build flags available to easily modify the build behaviour from the command line.

## Setup

1. Download or clone this repository.
1. From within the newly cloned folder:
    ```bash
    npm install
    ```
1. Run the development server to compile and open the application.
    ```bash
    npm run start
    ```
1. Browser should automatically open to http://localhost:8080.
1. Observe lazy loaded route and module at http://localhost:8080/feature.

## Build Scripts

### JIT Development Server
```bash
npm run start
```
### JIT Build (no dev server started)
```bash
npm run build
```
### AOT Development Server
```bash
npm run start:aot
```
### AOT Build (no dev server started)
```bash
npm run build:aot
```