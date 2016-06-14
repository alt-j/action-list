module.exports = function(config) {
    config.set({
        basePath: '',

        frameworks: ['jspm', 'mocha', 'sinon'],

        jspm: {
            useBundles: true,
            config: 'src/config.js',
            loadFiles: ['test/**/*.js'],
            serveFiles: ['src/js/**/*.js'],
            packages: 'src/lib'
        },

        proxies: {
            '/base/lib/': '/base/src/lib/'
        },

        reporters: ['mocha'],

        browsers: ['Chrome'],

        singleRun: true
    });
};
