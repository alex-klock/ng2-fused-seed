import { main as ngc  } from '@angular/compiler-cli/src/main';
import { NgBuildContext, Sparky, buildCss, enableDisableProdMode, renameFile } from '../task-utils';

const config = NgBuildContext.config;
const paths = NgBuildContext.paths;

/**
 * Initializes a build and executes the ngc within the build workspace.  Does not execute transpiling or bundling steps.
 */
Sparky.task('ngc', ['clean'], () => {

    const source = config.watch ? Sparky.watch : Sparky.src;
    
    let flow = source(['./**/**.*'], { base: './src' })
        .file('*.component.css', buildCss)
        .file('main.**.ts', enableDisableProdMode)
        .dest(paths.workspace());

    flow['activities'].push(() => {
        return renameFile(paths.workspace('tsconfig.aot.json'), paths.workspace('tsconfig.json')).then(() => {
            return renameFile(paths.workspace('main.aot.ts'), paths.workspace('main.ts'));
        }).then(() => {
            return ngc({ project: paths.workspace('./', 'tsconfig.json') });
        });
    });
        
    return flow.exec();
});