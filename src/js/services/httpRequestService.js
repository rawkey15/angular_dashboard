module.exports = (function() {

    var injectParams = ['$http'];

    httpRequestService = function() {
        var request = {};

        request.post = function(url, data) {
            return $http.post(url, data).then(function(resp) {
                return resp;
            });
        }

        request.get = function(url) {
            return $http.get(url).then(function(resp) {
                return resp;
            });
        }

        return request;
    };

    httpRequestService.$inject = injectParams;

    dashboardApp.factory('httpRequestService', httpRequestService);

}.call(this));