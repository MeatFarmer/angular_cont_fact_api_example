var myApp = angular.module("myApp", []);

myApp.controller("myController", ["$scope", "myFactory", function($scope, myFactory) {
    $scope.searchMovie = function(){
        myFactory.call($scope.search);
    };

    $scope.data = myFactory.data;

    $scope.addFavorite = function(movie){
        myFactory.addFavorite(movie);
    };
}]);

myApp.controller("myOtherController", ["$scope", "myFactory", function($scope, myFactory){
    $scope.favorites = myFactory.favorites;
}]);

myApp.factory("myFactory", ["$http", function($http) {
    var data = {};
    var favorites = [];

    return {
        data: data,
        favorites: favorites,
        addFavorite: function(movie){
            favorites.push(movie);
            return favorites;
        },
        call: function(movie){
            $http.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&r=json").then(function(response){
                console.log(response.data);
                data.results = response.data;
            });
        }
    }
}]);