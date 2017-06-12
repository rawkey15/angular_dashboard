module.exports = (function() {

    var injectParams = ['localStorageService'];

    var loginComp = function(localStorageService) {
        return {
            restrict: 'E',
            templateUrl: function() {
                var isLoggedin = localStorageService.getData('db-login');
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