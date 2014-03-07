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
['$rootScope', '$scope', '$location','$route','$routeParams', 'Zone', function($rootScope, $scope, $location,$route,$routeParams, Zone) {
	
	var action = $route.current.action;

    $scope.list = function() {
        $rootScope.success = '';
		$rootScope.error = '';
        Zone.list(function(res) {
            $scope.zones = res;
            $scope.loading = false;
        }, function(err) {
            $rootScope.error = "Failed to fetch zones.";
            $scope.loading = false;
        });
     };

    $scope.add = function() {
		$rootScope.success = '';
		$rootScope.error = '';
        Zone.add({
                nom: $scope.nom,
                description: $scope.description,
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
    $scope.delete = function(nom) {
		$rootScope.success = '';
		$rootScope.error = '';
        Zone.delete(nom,
            function() {
				$rootScope.success = 'Succes';
                $route.reload();
            },
            function(err) {
                $rootScope.error = err;
				$route.reload();
            });
    };

    $scope.get = function(nom) {
		$rootScope.success = '';
		$rootScope.error = '';
        Zone.get(nom,
            function(res) {
				$scope.zone = res;
                $scope.loading = false;
            }, function(err) {
                $rootScope.error = "Failed to fetch zone.";
                $scope.loading = false;
            });
    };

    console.log("action : " + action);
    switch (action)
    {
        case 'list':
            $scope.list();
            break;
        case 'get':
            var nom = 'azer';
            $scope.get(nom);
            break;
        default:
            break;
    }
}]);
