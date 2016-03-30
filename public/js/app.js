var app = angular.module('recpie_app2', []);

app.controller("mainController", ["$http", "$scope", function($http, $scope){

  $scope.matches = null;
  $scope.list = [];
  $scope.names = [];
  $scope.user = null;
  $scope.secure = null;

  $scope.find = function(){
    $http({
      method: "GET",
      url: "http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY" + $scope.list.join('') + "&maxResult=50",
      headers: {
        "x-yummly-app-id": "2f8629a9",
        "x-yummly-app-key": "99f848baed7fe679e97be9c69cb11964",
      }
    }).then(function(response){
      $scope.matches = response.data.matches;
      $scope.ingr = null;
      // console.log(response.data.matches);
    });
  };

  $scope.add = function(addIngr) {
    $scope.list.push("&allowedIngredient[]=" + addIngr.toLowerCase());
    $scope.names.push(addIngr.toLowerCase());
    $scope.addIngr = null;
    // console.log($scope.list.join(''));
  };

  $scope.delete = function(index) {
    $scope.list.splice(index, 1);
    $scope.names.splice(index, 1);
    // console.log($scope.list);
  };

  $scope.clear = function(){
    $scope.matches = null;
    $scope.list = [];
    $scope.names = [];
  };

  $scope.register = function(){
    $http({
      method: "POST",
      url: "/users/register",
      data: $scope.newUser
    }).then(function(response){
      $scope.user = response.data
    });
    $scope.goAway =! $scope.goAway
    $scope.secure = true;
  };

  $scope.login = function(){
    $http({
      method: "POST",
      url: "/users/login",
      data: $scope.signIn
      }).then(function(response){
        $scope.user = response.data
      });
      $scope.goAway =! $scope.goAway;
      $scope.secure = true;
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
