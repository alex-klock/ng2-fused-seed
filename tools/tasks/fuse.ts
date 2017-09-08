import { FuseBox, RawPlugin, Sparky, QuantumPlugin, ReplacePlugin, WebIndexPlugin } from 'fuse-box';
import { Ng2TemplatePlugin, Ng2RouterPlugin } from 'ng2-fused';
import { NgBuildContext } from '../ng-build-context';
import * as path from 'path';
import * as express from 'express';

const config = NgBuildContext.config;
const paths = NgBuildContext.paths;

/**
 * Build task that executes FuseBox and bundles / optimizes the application.
 */
Sparky.task('fuse', () => {
    
    // CONFIGURE FUSEBOX AND GLOBAL PLUGINS...
    const useQuantum = config.js.minify || config.js.treeShake;
    const fuse = FuseBox.init({
        experimentalFeatures: useQuantum ? true : false,
        cache: !config.noCache,
        homeDir: paths.workspace('./', ''),
        output: paths.dist('./', 'assets/js/$name.js'),
        sourceMaps: config.js.sourcemaps,
        target: 'browser',
        plugins: [
            WebIndexPlugin({
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
            
            <any>Ng2RouterPlugin({ 
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
            app.get('/assets/*', function (req, res) {
                return res.sendStatus(404);
            });
            app.get("*", function(req, res) {
                res.sendFile(path.resolve(paths.dist('index.html')));
            });
        });
    }

    // CONFIGURE BUNDLES...
    const vendors = fuse.bundle('vendors')
        .instructions('~ main.ts +ng2-fused/modules/ng-fused-module-loader');

    const app = fuse.bundle('app')
        .plugin(Ng2TemplatePlugin())
        .plugin(['*.component.html', RawPlugin()])
        .plugin(['*.component.css', RawPlugin()])
        .splitConfig({
            browser: '/assets/js/',
            server: 'dist/assets/js/bundles/',
            dest: 'bundles/'
        })
        .instructions('!> [main.ts] + [**/+*/**/*.{ts,css,html}]');
    
    // ENABLE WATCH AND HMR IF CONFIGURED...
    if (config.watch) {
        vendors.hmr().watch();
        app.watch();
    }
    fuse.run().then(() => {
        console.timeEnd('build');
    });
});