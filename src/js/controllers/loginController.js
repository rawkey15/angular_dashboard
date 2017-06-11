module.exports = (function() {
    var injectParams = ['$location', '$scope', '$rootScope', 'localStorageService'];

    var loginController = function($location, $scope, $rootScope, localStorageService) {
        $scope.loginModel = {
            username: '',
            password: ''
        };

        function userInfo(storage) {
            if (storage) {
                var data = JSON.parse(storage);
                $scope.loginModel.username = data.user;
            }
        }

        userInfo(localStorageService.getData('login'));


        $scope.login = function() {
            if ($scope.loginModel.username && $scope.loginModel.password) {
                localStorageService.addData('login', JSON.stringify({
                    user: $scope.loginModel.username,
                    logintime: new Date()
                }));
            }
        };
    };

    loginController.$inject = injectParams;
    dashboardApp.controller('loginController', loginController);
}.call(this));