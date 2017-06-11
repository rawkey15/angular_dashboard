module.exports = (function() {

    var injectParams = [];

    var appLocalStorage = function() {
        this.name = "dashboardlocalstorage";

        this.localStorageAvailable = function() {
            if (typeof(Storage) !== "undefined") {
                return true;
            } else {
                return false;
            }
        }
        this.setup = function() {
            if (this.localStorageAvailable) {
                var addData = function(id, value) {
                    window.localStorage.setItem(id, value);
                };

                var getData = function(id) {
                    return window.localStorage.getItem(id);
                };

                var removeData = function(id) {
                    window.localStorage.removeItem(id)
                };

                var updateData = function(id, value) {
                    removeData(id);
                    addData(id, value);
                };

                return {
                    addData: addData,
                    getData: getData,
                    removeData: removeData,
                    updateData: updateData
                }

            } else {
                alert("Sorry your browser doesn't support localStorage.")
            }
        }
    };

    localStorageService = function() {
        return new appLocalStorage().setup();
    };

    localStorageService.$inject = injectParams;

    dashboardApp.factory('localStorageService', localStorageService);

}.call(this));