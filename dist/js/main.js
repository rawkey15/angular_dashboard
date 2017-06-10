//main.js, setting up the library paths and bootstrap application

require.config({
    baseUrl: 'dist/js/',
    urlArgs: 'v=1.0',
    paths: {
        angular: 'lib/angular.min',
        bootstrap: 'lib/bootstrap.min',
        jquery: 'lib/jquery.min',
        uiRouter: 'lib/angular-ui-router.min',
        underscore: 'lib/underscore-min'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        uiRouter: {
            exports: 'uiRouter'
        },
        $: {
            exports: 'jquery'
        },
        _: {
            exports: 'underscore'
        },
        bootstrap: {
            exports: 'bootstrap',
            deps: ['jquery']
        }
    },
    deps: ['bootstrap']
});

require(
    [
        'config',
        'dashboard'
    ],
    function() {
        angular.bootstrap(document, ['dashboard']);
    });