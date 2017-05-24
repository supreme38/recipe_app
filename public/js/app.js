var app = angular.module('Yummy', []);

app.controller("mainController", ["$http", "$scope", function($http, $scope){

  $scope.matches = null;
  $scope.list = [];
  $scope.names = [];
  $scope.user = null;
  $scope.secure = null;
  $scope.startSearch = false;

  $scope.find = function(){
    $scope.noResults = false;
    $scope.noResults2 = false;
    if($scope.startSearch === false){
      $scope.noResults2 = true;
    } else {
      $http({
        method: "GET",
        url: "http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY" + $scope.list.join('') + "&maxResult=50",
      }).then(function(response){
        $scope.matches = response.data.matches;
        $scope.ingr = null;
        if(response.data.totalMatchCount == 0){
          $scope.noResults = true;
        }
      });
    }
  };

  $scope.add = function(addIngr) {
    $scope.list.push("&allowedIngredient[]=" + addIngr.toLowerCase());
    $scope.names.push(addIngr.toLowerCase());
    $scope.addIngr = null;
    $scope.startSearch = true;
    $scope.noResults2 = false;
    $scope.showMe = false;
  };

  $scope.delete = function(index) {
    $scope.list.splice(index, 1);
    $scope.names.splice(index, 1);
  };

  $scope.clear = function(){
    $scope.matches = null;
    $scope.list = [];
    $scope.names = [];
    $scope.noResults = false;
    $scope.noResults2 = false;
  };

  $scope.register = function(){
    $http({
      method: "POST",
      url: "/users/register",
      data: $scope.newUser
    }).then(function(response){
      $scope.user = response.data;
      $scope.secure = true;
      $scope.goAway =! $scope.goAway;
    });
  };

  $scope.login = function(){
    $http({
      method: "POST",
      url: "/users/login",
      data: $scope.signIn
      }).then(function(response){
        $scope.user = response.data
        if($scope.user._id === undefined){
          $scope.secure = false;
        } else {
          $scope.secure = true;
          $scope.goAway =! $scope.goAway;
        }
        $scope.signIn = null;
      });
    };

    $scope.fav = function(object){
      $http({
        method: "PUT",
        url: "/users/fav/" + $scope.user._id,
        data: object
      }).then(function(response){
        $scope.user = response.data
      });
    };

    $scope.deleteFav = function(object){
      $http({
        method: "PUT",
        url: "/users/deleteFav/" + $scope.user._id,
        data: object
      }).then(function(response){
        $scope.user = response.data
      });
    };

    $scope.logout = function(){
      $http({
        method: "GET",
        url: "/users/logout"
      });
    };

    $scope.show = function(){
      $scope.showFav =! $scope.showFav
    }

}]);
