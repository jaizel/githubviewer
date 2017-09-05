/*global
alert, confirm, console, prompt, jQuery, angular, $
*/

(function () {

    "use strict";
    
    // get a reference to the module defined in app.js
    
    var app = angular.module("githubViewer");
    
    var UserController = function ($scope, $http, $routeParams) {
                        
        var onError = function (reason) {
            $scope.error = "Error: Could not fetch data from server";
            $scope.user = null;
            $(".githubData").hide();
        };
        
        var onRepos = function (response) {
            $scope.repos = response.data;
        };
        
        var onUserComplete = function (response) {
        
            // if response is in JSON format, angular automatically converts to an object
            $scope.user = response.data;
            $http.get($scope.user.repos_url).then(onRepos, onError);
            
            $(".githubData").show();
            $scope.error = "";
        };
        
        $scope.username = $routeParams.username;
        $scope.repoSortOrder = "-stargazers_count";
        $http.get("https://api.github.com/users/" + $scope.username).then(onUserComplete, onError);
       
    };
    
    // now register the controller in the app
    app.controller("UserController", ["$scope", "$http", "$routeParams", UserController]);
    console.log("Registered UserController");
    
    
}());


