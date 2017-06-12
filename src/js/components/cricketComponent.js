module.exports = function() {
    var injectParams = ['$location', '$scope', '$rootScope', '$http'];

    var cricketComponent = {
        templateUrl: './assets/templates/cricket.html',
        controller: function($location, $scope, $rootScope, $http) {
            $scope.currentMatches = [];
            $scope.scorecard = [];
            $scope.showscorecard = 'hide';
            $scope.scorecardSummary = 'scorecard';

            function getmatches() {
                return $http.get('https://cricapi-demo.herokuapp.com/matches').then(function(resp) {

                    var response = resp.data;
                    if (response) {
                        _.each(response.data, function(obj) {
                            var splitTeamName = obj.title.split('v');
                            obj.link = splitTeamName[0].substr(0, 3) + ' Vs ' + splitTeamName[1].substr(0, 4);
                        });
                        $scope.currentMatches = response;
                    }
                });
            }
            getmatches();

            $scope.matchDetail = function(e) {
                var matchid = $(e.currentTarget).attr('id');
                if (matchid) {
                    $http.get('https://cricapi-demo.herokuapp.com/match/summary/' + matchid).then(function(resp) {
                        $scope.scorecard = resp.data;
                        $scope.showscorecard = 'show';
                    });
                }
            };

            $scope.matchtab = function(tab) {
                $scope.scorecardSummary = tab;
            };

            $scope.player = [];
            $scope.playerInfo = function(e) {
                var pid = $(e.currentTarget).attr('id');
                if (pid) {
                    $http.get('https://cricapi-demo.herokuapp.com/player/' + pid).then(function(resp) {
                        $('#playerInfoModal').modal('show');
                        $scope.player = resp.data;
                    });
                }

            }

        }

    };

    cricketComponent.controller.$inject = injectParams;
    dashboardApp.component('cricketComponent', cricketComponent);
};