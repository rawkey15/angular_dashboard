define(['uiRouter'], function(uiRouter, homeController) {
    dashboardApp = angular.module('dashboardapp', ['ui.router']);

    require('./controllers/homeController');
    require('./controllers/loginController');
    require('./directives/loginDirective');
    require('./services/localStorageService');
    require('./services/httpRequestService');

    var cricketComp = require('./components/cricketComponent');
    cricketComp();

    dashboardApp.config(function($stateProvider, $urlRouterProvider) {

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
        $stateProvider.state(localStorage);
    });

});