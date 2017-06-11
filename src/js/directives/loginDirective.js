module.exports = (function() {

    var injectParams = ['$q', '$timeout', '$window', 'localStorageService'];

    var loginComp = function($q, $timeout, $window, localStorageService) {
        return {
            restrict: 'E',
            templateUrl: function() {
                var isLoggedin = localStorageService.getData('login');
                if (!isLoggedin) {
                    return './assets/templates/login.html';
                } else {
                    return './assets/templates/userinfo.html';
                }
            },
            controller: 'loginController'
        };
    };
    loginComp.$inject = injectParams;
    dashboardApp.directive('loginComp', loginComp);
}.call(this));