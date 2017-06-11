module.exports = (function() {
    var injectParams = ['$location', '$scope', '$rootScope'];

    var homeController = function($location, $scope, $rootScope) {

    };

    homeController.$inject = injectParams;
    dashboardApp.controller('homeController', homeController);
}.call(this));