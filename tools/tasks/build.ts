import { NgBuildContext, Sparky, buildCss, disableProdMode, renameFile, removePaths } from '../task-utils';

const config = NgBuildContext.config;
const paths = NgBuildContext.paths;

/**
 * Default build just runs jit.
 */
Sparky.task('build', ['build:jit'], () => {

});

Sparky.task('build:aot', ['ngc', 'css:site', 'fuse'], () => {

});
    
Sparky.task('build:jit', ['build:init', 'css:site', 'fuse'], () => {

});

Sparky.task('build:init', ['clean'], () => {
    const source = config.watch ? Sparky.watch : Sparky.src;
    const specs: string[] = [];

    const flow = source(['./**/**.*'], { base: './src' })
        .file('*.component.css', buildCss)
        .file('main.ts|main.aot.ts', disableProdMode)
        .dest(paths.workspace());

    
    flow['activities'].push(() => {
        return removePaths(
            paths.workspace('main.aot.ts'), 
            paths.workspace('tsconfig.aot.json'));
    });
        
    return flow;
});