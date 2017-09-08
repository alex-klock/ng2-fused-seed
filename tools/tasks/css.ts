import { 
    NgBuildContext,
    Sparky,
    buildCss } from '../task-utils';

const paths = NgBuildContext.paths;

Sparky.task('css:site', () => {
    return Sparky.src(['./site.css'], { base: paths.workspace('./', 'app/shared') })
        .file('*.css', buildCss)
        .dest(paths.dist('assets/css'));
});

Sparky.task('css:components', () => {
    return Sparky.src(['./app/**/**.component.css'], { base: paths.workspace('./', '') })
        .file('*.component.css', buildCss);
});