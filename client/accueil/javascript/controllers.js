(function(){
"use strict";

/* Controllers */
angular.module('ModelerApp')
.controller('LoginCtrl',
['$rootScope', '$scope', '$location', '$window', 'Auth', function($rootScope, $scope, $location, $window, Auth) {
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
            $location.path('/');
        }, function() {
            $scope.error = "Failed to logout";
        });
    };
}]);

})();
