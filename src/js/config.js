define(['uiRouter'], function(uiRouter, homeController) {
    dashboardApp = angular.module('dashboardapp', ['ui.router']);

    require('./controllers/homeController');
    require('./controllers/loginController');
    require('./directives/loginDirective');
    require('./services/localStorageService');

    dashboardApp.config(function($stateProvider, $urlRouterProvider, $controllerProvider,
        $compileProvider, $filterProvider, $provide, $httpProvider) {

        dashboardApp.register = {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };

        var defaultpage = {
            name: 'home',
            url: '/',
            templateUrl: './assets/templates/home.html',
            controller: 'homeController'
        };

        var nopage = {
            name: '404',
            url: '/**',
            template: '<h1>Page not found<h1>'
        };


        $urlRouterProvider.otherwise('/');

        $stateProvider.state(defaultpage);
        $stateProvider.state(nopage);
    });

});