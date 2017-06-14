var injectParams = ['$location', '$scope', '$rootScope', '$http', '$sce'];

var moviedbComponent = {
    templateUrl: './assets/templates/moviedb.html',
    controller: function($location, $scope, $rootScope, $http, $sce) {
        $scope.movieslist = [];
        $scope.content = [];
        $scope.hideError = true;
        $scope.showDetails = true;

        $scope.movieview = "main";

        $scope.getMoviesList = function() {
            $http.get('https://moviedb-api.herokuapp.com/movieslist').then(function(response) {
                $scope.movieslist = response.data;
            });
        }

        $scope.getMovieDetails = function() {
            if ($scope.movieName == '' || $scope.movieName == undefined) {
                $scope.hideError = false;
                $scope.content = [];
            } else {
                $scope.hideError = true;
                $http.get('https://moviedb-api.herokuapp.com/search/' + $scope.movieName).then(function(response) {
                    $scope.content = response.data.results;
                });
            }
            $scope.movieview = 'search';
        };

        $scope.popularity = function(popularity, $index) {
            var target = $('.movie-rating'),
                children = $(target[$index]).children('.star');

            var popularityStar = Math.round((popularity / 100) * 5);

            $.each(new Array(popularityStar), function(i) {
                $(children[i]).toggleClass('glyphicon-star-empty glyphicon-star');
            });
        };

        $scope.moviedetail = '';
        $scope.movieInfo = function(e) {
            var movieId = $(e.currentTarget).attr('id');
            $http.get('https://moviedb-api.herokuapp.com/movie/' + movieId).then(function(response) {
                $scope.moviedetail = response.data;
                $scope.movieview = 'info';
            });
        };

        $scope.movieHome = function() {
            $scope.movieview = 'main';
        }

        $scope.videolink = '';
        $scope.iframelink = function(key) {
            var link = '<iframe src=" https://www.youtube.com/embed/' + key + '?rel=0"></iframe>';
            $scope.trustedvideolink = $sce.trustAsHtml(link);
        }

    }

};

moviedbComponent.controller.$inject = injectParams;

module.exports = moviedbComponent;