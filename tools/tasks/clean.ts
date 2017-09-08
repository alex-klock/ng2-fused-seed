import { NgBuildContext, Sparky, cleanPath } from '../task-utils';

Sparky.task('clean', ['clean:build', 'clean:dist'], () => {

});

Sparky.task('clean:build', () => {
    console.time('build');
    return cleanPath();
});

Sparky.task('clean:cache', () => {
    return cleanPath('./.fusebox');
})

Sparky.task('clean:dist', () => {
    return cleanPath(NgBuildContext.paths.dist('./', ''));
});

Sparky.task('clean:workspace', () => {
    return cleanPath(NgBuildContext.paths.workspace('./', ''));
})