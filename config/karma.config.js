const { NgBuildContext } = require('../tools/ng-build-context');
const config = NgBuildContext.config;
const paths = NgBuildContext.paths;

/**
 * Karma configuration.
 * @see http://karma-runner.github.io/1.0/config/configuration-file.html
 */
module.exports = (config) => {
    config.set({
        basePath: '../dist',
        frameworks: ['jasmine'],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        files: [ 
            { pattern: '../src/testing/karma/globals.js', included: true, watched: false },
            { pattern: './assets/js/vendors.js', included: true, watched: true },    
            { pattern: './assets/js/bundles/**/*.js', included: true, watched: true },
            { pattern: './assets/js/app.js', included: true, watched: true },
        ],
        exclude: [],
        preprocessors: {},
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};