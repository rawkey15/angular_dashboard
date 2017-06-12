module.exports = (function() {
    var injectParams = ['$location', '$scope', '$rootScope', 'localStorageService'];

    var homeController = function($location, $scope, $rootScope, localStorageService) {

        $scope.defaultkey = 'db-';

        $scope.storage = {
            key: '',
            value: ''
        };

        function getlocalstorage() {
            $scope.localStorage = localStorageService.getAllWildcard($scope.defaultkey);
        }

        getlocalstorage();

        $scope.save = function() {
            if ($scope.storage.key && $scope.storage.value) {
                localStorageService.addData($scope.defaultkey + $scope.storage.key, $scope.storage.value);
                getlocalstorage();
            }
        };

        $scope.delete = function() {
            if ($scope.storage.key) {
                localStorageService.removeData($scope.defaultkey + $scope.storage.key);
                getlocalstorage();
            }
        };

    };

    homeController.$inject = injectParams;
    dashboardApp.controller('homeController', homeController);
}.call(this));