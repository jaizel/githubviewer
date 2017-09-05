/*global
alert, confirm, console, prompt, jQuery, angular, $
*/

(function () {

    "use strict";
    
    // get a reference to the module defined in app.js
    
    var app = angular.module("githubViewer");
    
    var MainController = function ($scope, $http, $log, $location) {
        
        var onError = function (reason) {
            $log.error("Error: Could not fetch data from server");
            $scope.error = "Error: Could not fetch data from server";
            $scope.user = null;
            $(".githubData").hide();
        };
        
        var onRepos = function (response) {
            $scope.repos = response.data;
        };
        
        var onUserComplete = function (response) {
            $log.info("User found!");
            // if response is in JSON format, angular automatically converts to an object
            $scope.user = response.data;
            $http.get($scope.user.repos_url).then(onRepos, onError);
            $(".githubData").show();
            $scope.error = "";
        };
        
        $scope.search = function (username) {
            $log.info("Searching for " + username + "...");
            $http.get("https://api.github.com/users/" + username).then(onUserComplete, onError);
            $location.path("/user/" + username);
        };
    
    };
    
    // now register the controller in the app
    app.controller("MainController", ["$scope", "$http", "$log", "$location", MainController]);
    console.log("Registered MainController");
    
}());


