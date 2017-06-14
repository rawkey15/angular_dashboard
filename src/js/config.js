define(['uiRouter'], function(uiRouter) {
    dashboardApp = angular.module('dashboardapp', ['ui.router']);

    require('./controllers/homeController');
    require('./controllers/loginController');
    require('./directives/loginDirective');
    require('./services/localStorageService');
    require('./services/httpRequestService');


    dashboardApp.component('cricketComponent', require('./components/cricketComponent'));
    dashboardApp.component('moviedbComponent', require('./components/moviedbComponent'));

    dashboardApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        var defaultpage = {
            name: 'home',
            url: '/',
            templateUrl: './assets/templates/home.html',
            controller: 'homeController'
        };

        var cricketScorecard = {
            name: 'scorecard',
            url: '/scorecard',
            template: '<cricket-component></cricket-component>'
        };

        var movieDb = {
            name: 'moviedb',
            url: '/moviedb',
            template: '<moviedb-component></moviedb-component>'
        };

        var localStorage = {
            name: 'storage',
            url: '/storage',
            templateUrl: './assets/templates/localstorage.html',
            controller: 'homeController'
        };


        /*TODO: set active sidebar, based on state*/

        $urlRouterProvider.otherwise('/');

        $stateProvider.state(defaultpage);
        $stateProvider.state(cricketScorecard);
        $stateProvider.state(movieDb);
        $stateProvider.state(localStorage);
    });

});