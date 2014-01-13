'use strict';

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
                $rootScope.error = "Failed to login";
            });
    };
	
	$scope.logout = function() {
        Auth.logout(function() {
            $location.path('/');
        }, function() {
            $rootScope.error = "Failed to logout";
        });
    };
}]);

angular.module('ModelerApp')
.controller('UserCtrl',
['$rootScope', '$scope', '$location', 'User', function($rootScope, $scope, $location, User) {
    $scope.role = User.userRoles.user;
    $scope.userRoles = User.userRoles;
	
	User.list(function(res) {
        $scope.users = res;
        $scope.loading = false;
    }, function(err) {
        $rootScope.error = "Failed to fetch users.";
        $scope.loading = false;
    });

    $scope.add = function() {
		$rootScope.success = '';
		$rootScope.error = '';
        User.add({
                username: $scope.username,
                password: $scope.password,
                role: $scope.role
            },
            function() {
				$rootScope.success = 'Succes';
                $location.path('/user/list');
            },
            function(err) {
                $rootScope.error = err;
				$location.path('/user/add');
            });
    };
}]);

angular.module('ModelerApp')
.controller('ZoneCtrl',
['$rootScope', '$scope', '$location', 'Zone', function($rootScope, $scope, $location, Zone) {
	
	Zone.list(function(res) {
        $scope.zones = res;
        $scope.loading = false;
    }, function(err) {
        $rootScope.error = "Failed to fetch zones.";
        $scope.loading = false;
    });

    $scope.add = function() {
		$rootScope.success = '';
		$rootScope.error = '';
        Zone.add({
                username: $scope.username,
                password: $scope.password,
                role: $scope.role
            },
            function() {
				$rootScope.success = 'Succes';
                $location.path('/zone/list');
            },
            function(err) {
                $rootScope.error = err;
				$location.path('/zone/add');
            });
    };
}]);
