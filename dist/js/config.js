define(['uiRouter'], function() {
    var dashboard = angular.module('dashboard', ['ui.router']);

    dashboard.config(function($stateProvider, $urlRouterProvider) {
        var defaultpage = {
            name: 'home',
            url: '/',
            templateUrl: './assets/templates/home.html'
        };

        var nopage = {
            name: '404',
            url: '/notfound',
            template: '<h1>Page not found<h1>'
        };

        $urlRouterProvider.otherwise('/');

        $stateProvider.state(defaultpage);
        $stateProvider.state(nopage);
    });

});