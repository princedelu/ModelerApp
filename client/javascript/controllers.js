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

var controllers = {
    userCtrl : function($rootScope, $scope, $location,$route,$routeParams, User) {

                    $scope.role = User.userRoles.user;
                    $scope.userRoles = User.userRoles;
                    var nomObjet = 'user';
	
	                User.list(nomObjet,function(res) {
                        $scope.users = res;
                        $scope.loading = false;
                    }, function(err) {
                        $rootScope.error = "Failed to fetch users.";
                        $scope.loading = false;
                    });

                    $scope.add = function() {
		                $rootScope.success = '';
		                $rootScope.error = '';
                        User.add(nomObjet,{
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
               },

        zoneCtrl : function($rootScope, $scope, $location,$route,$routeParams, Zone) {
	
	                    var action = $route.current.action;
                        $scope.action = action;
                        var nomObjet = 'zone';

                        $scope.list = function() {
                            $rootScope.success = '';
		                    $rootScope.error = '';
                            Zone.list(nomObjet,function(res) {
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
                            if (action == 'get'){
                                $scope.update();
                            }else{
                                Zone.add(nomObjet,{
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
                            }
                        };
                        
                        $scope.update = function() {
		                    $rootScope.success = '';
		                    $rootScope.error = '';
                            $location.path('/zone/list');
                        };
                        
                        $scope.delete = function(id) {
		                    $rootScope.success = '';
		                    $rootScope.error = '';
                            Zone.delete(nomObjet,id,
                                function() {
				                    $rootScope.success = 'Succes';
                                    $route.reload();
                                },
                                function(err) {
                                    $rootScope.error = err;
				                    $route.reload();
                                });
                        };

                        $scope.get = function(id) {
		                    $rootScope.success = '';
		                    $rootScope.error = '';
                            Zone.get(nomObjet,id,
                                function(res) {
				                    $scope.nom = res.nom;
                                    $scope.description = res.description;
                                    $scope.loading = false;
                                }, function(err) {
                                    $rootScope.error = "Failed to fetch zone.";
                                    $scope.loading = false;
                                });
                        };

                        switch (action)
                        {
                            case 'list':
                                $scope.list();
                                break;
                            case 'get':
                                var id = $routeParams.id;
                                $scope.get(id);
                                break;
                            default:
                                break;
                        }
                    }
};

angular.module('ModelerApp')
.controller('dynamicCtrl', ['$rootScope', '$scope', '$location','$route','$routeParams', 'Objet', function($rootScope, $scope, $location,$route,$routeParams, Objet) { 
    controllers[$routeParams.objet+"Ctrl"]($rootScope, $scope, $location,$route,$routeParams, Objet);
}]);
