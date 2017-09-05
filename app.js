/*global
alert, confirm, console, prompt, jQuery, angular, $
*/

(function () {

    "use strict";
    
    // note: very important to pass the 2nd object, an array of dependencies
    var app = angular.module("githubViewer", ["ngRoute"]);

    app.config(function ($routeProvider) {
        
        $routeProvider
        
            .when("/main", {
                templateUrl: "main.html",
                controller: "MainController"
            })
        
            .when("/repo/:username/:reponame", {
                templateUrl: "repo.html",
                controller: "RepoController"
            })
        
            .when("/user/:username", {
                templateUrl: "user.html",
                controller: "UserController"
            })
                    
            .otherwise({redirectTo: "/main"});
    });
   
}());


