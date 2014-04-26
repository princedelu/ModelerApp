'use strict';

/* Controllers */
angular.module('ModelerApp')
.controller('LoginCtrl',
['$rootScope', '$scope', '$location', '$route', '$window', 'Auth', function($rootScope, $scope, $location, $route, $window, Auth) {
    
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;

    $scope.rememberme = true;
    $scope.login = function() {
        Auth.login({
                username: $scope.username,
                password: $scope.password,
                rememberme: $scope.rememberme
            },
            function(res) {
                $location.path('/home');
            },
            function(err) {
                $scope.error = "Failed to login";
            });
    };

    $scope.logout = function() {
        Auth.logout(function() {
            $window.location = '/';
        }, function() {
            $scope.error = "Failed to logout";
        });
    };

    $scope.redirectElement = function() {
         $window.location = '/element';
    };
    $scope.redirectRestit = function() {
         $window.location = '/restitution';
    };
    $scope.redirectHome = function() {
         $window.location = '/home';
    };

    $scope.isModuleElement=false;
    $scope.isModuleRestit=false;

    if ($location.path() == '/element/'){
        $scope.isModuleElement=true;
    }
    if ($location.path() == '/restitution'){
        $scope.isModuleRestit=true;
    }
}]);


