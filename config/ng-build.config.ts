import * as path from 'path';

export const NgBuildConfig = {
    aot: false,
    css: {
        minify: false,
        sourcemaps: true
    },
    js: {
        minify: false,
        sourcemaps: true,
        treeShake: false,
    },
    noCache: false,
    optimize: false,
    paths: {
        build: 'build',
        dist: 'dist',
        workspace: 'build/workspace'
    },
    production: false,
    server: {
        enabled: false,
        open: true,
        port: 8080,
        root:  path.join(process.cwd(), 'dist')
    },
    watch: false
};

/**
 * Gets whether or not a command line argument exists.
 * 
 * @export
 * @param {string} argName The argument name (without any dashes).
 * @param {string} [aliasCharacter] A shorthand character alias that can be used with in the command line via a single dash and that character.
 * @returns 
 */
export function hasCommandLineArg(argName: string, defaultValue?: string) {
    return process.argv.indexOf('--' + argName) !== -1;
}

NgBuildConfig.aot = hasCommandLineArg('aot') || NgBuildConfig.aot;
NgBuildConfig.noCache = hasCommandLineArg('nocache') || NgBuildConfig.noCache;
NgBuildConfig.js.treeShake = hasCommandLineArg('treeshake') || NgBuildConfig.js.treeShake;
NgBuildConfig.server.enabled = hasCommandLineArg('serve') || NgBuildConfig.server.enabled;
NgBuildConfig.server.open = !hasCommandLineArg('noopen') || NgBuildConfig.server.open;
NgBuildConfig.watch = (hasCommandLineArg('watch') && !hasCommandLineArg('nowatch')) || NgBuildConfig.watch;

if (hasCommandLineArg('minify')) {
    NgBuildConfig.css.minify = true;
    NgBuildConfig.js.minify = true;
}

if (hasCommandLineArg('optimize') || hasCommandLineArg('prod')) {
    NgBuildConfig.css.minify = true;
    NgBuildConfig.js.minify = true;
    NgBuildConfig.js.treeShake = true;
    NgBuildConfig.optimize = true;
}

if (hasCommandLineArg('prod')) {
    NgBuildConfig.noCache = true;
    NgBuildConfig.production = true;
}