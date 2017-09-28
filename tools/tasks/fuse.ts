import { FuseBox, RawPlugin, Sparky, QuantumPlugin, ReplacePlugin, WebIndexPlugin } from 'fuse-box';
import { Ng2TemplatePlugin, Ng2RouterPlugin, Ng2SpecBundlePlugin } from 'ng2-fused';
import { NgBuildContext } from '../ng-build-context';
import * as path from 'path';
import * as fs from 'fs';
import * as glob from 'glob';
import * as express from 'express';

const config = NgBuildContext.config;
const paths = NgBuildContext.paths;

/**
 * Build task that executes FuseBox and bundles / optimizes the application.
 */
Sparky.task('fuse', ['clean:cache'], () => {
    
    // CONFIGURE FUSEBOX AND GLOBAL PLUGINS...
    const useQuantum = config.js.minify || config.js.treeShake;
    const fuse = FuseBox.init({
        experimentalFeatures: useQuantum ? true : false,
        cache: !config.noCache,
        homeDir: paths.workspace('./', ''),
        output: paths.dist('./', 'assets/js/$name.js'),
        sourceMaps: config.js.sourcemaps,
        target: 'browser',
        // debug: true,
        // log: true,
        plugins: [
            WebIndexPlugin({
                bundles: ['vendors', 'app'],
                path: '/assets/js',
                target: path.relative(paths.dist('assets/js'), paths.dist('index.html')),
                template: paths.workspace('index.html')
            }),
            
            <any>useQuantum && QuantumPlugin({
                api: (core) => {
                    core.api.addLazyLoading();
                    core.solveComputed('ng2-fused/modules/ng-fused-module-loader.ts', {
                        mapping: '**/+*/*.module.*',
                        fn: (statement, core) => {
                            statement.setExpression("fusePath + '.js'");
                        }
                    });
                },
                bakeApiIntoBundle: 'vendors',
                manifest: true,
                target: 'universal',
                treeshake: config.js.treeShake,
                uglify: config.js.minify
            }),
            
            Ng2RouterPlugin({ 
                aot: config.aot,
                autoSplitBundle: 'app',
                vendorBundle: 'vendors'
            })          
        ]
    });

    // SETUP DEVELOPMENT SERVER...
    if (config.server.enabled) {
        let serverConfig = Object.assign({
            hmr: config.watch
        }, config.server);
        fuse.dev(serverConfig, server => {
            let app = server.httpServer.app;
            app.use("/assets/", express.static(paths.dist('assets')));
            app.use('/assets/libs/jasmine/', express.static(paths.dist('../node_modules/jasmine-core/lib/jasmine-core/', '')));
            app.get('/assets/libs/jasmine/jasmine_favicon.png', function (req, res) {
                res.sendFile(path.resolve(paths.dist('../node_modules/jasmine-core/images/jasmine_favicon.png', '')));
            });
            app.get('/assets/*', function (req, res) {
                return res.sendStatus(404);
            });
            app.get('/specs.html', function (req, res) {      
                res.sendFile(path.resolve(paths.dist('specs.html')));
            });
            app.get("*", function(req, res) {
                res.sendFile(path.resolve(paths.dist('index.html')));
            });
        });
    }

    // CONFIGURE BUNDLES...
    const vendors = fuse.bundle('vendors')
        .instructions('~ main.ts + ng2-fused/modules/ng-fused-module-loader' +
           (!config.specs.enabled ? ' - testing/specs.ts' : ''));

    const app = fuse.bundle('app')
        .plugin(config.specs.enabled && Ng2SpecBundlePlugin())
        .plugin(Ng2TemplatePlugin())
        .plugin(['*.component.html', RawPlugin()])
        .plugin(['*.component.css', RawPlugin()])
        .splitConfig({
            browser: '/assets/js/',
            server: 'dist/assets/js/bundles/',
            dest: 'bundles/'
        })
        .instructions('!> [main.ts] + [**/+*/**/*.module.ts] + [**/+*/**/*.component.{ts,css,html}]' +
            (!config.specs.enabled ? ' - testing/specs.ts - **/*.spec.ts' : ''));
    
    // ENABLE WATCH AND HMR IF CONFIGURED...
    if (config.watch) {
        vendors.hmr();
        app.hmr().watch();
    }
    
    return fuse.run();
});