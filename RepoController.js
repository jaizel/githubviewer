/*global
alert, confirm, console, prompt, jQuery, angular, $
*/

(function () {

    "use strict";
    
    // get a reference to the module defined in app.js
    
    var app = angular.module("githubViewer");
    
    var RepoController = function ($scope, $http, $routeParams) {
                        
        
        /*
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
        */
        
        var onError = function (reason) {
            $scope.repoDetailError = "Error: Could not fetch repository data from server";
            console.log("Error: Could not fetch repository data from server");
        };
        
        var onContribsLoaded = function (response) {
            $scope.contributors = response.data;
            console.log("Contributors obtained!");
        };
        
        var onRepoLoaded = function (response) {
            console.log("Repository details obtained!");
            $scope.repoDetails = response.data;
            $http.get($scope.repoDetails.contributors_url).then(onContribsLoaded, onError);
            console.log("Obtaining contributors '" + $scope.reponame + "'...");
        };
        
        $scope.username = $routeParams.username;
        $scope.reponame = $routeParams.reponame;
        $http.get("https://api.github.com/repos/" + $scope.username + "/" + $scope.reponame).then(onRepoLoaded, onError);
        console.log("Obtaining repository '" + $scope.reponame + "'...");
    };
    
    // now register the controller in the app
    app.controller("RepoController", ["$scope", "$http", "$routeParams", RepoController]);
    console.log("Registered RepoController");
    
}());


