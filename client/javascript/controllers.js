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

var controllers = {
    userCtrl : function($rootScope, $scope, $location,$route,$routeParams, User) {

                    $scope.role = User.userRoles.user;
                    $scope.userRoles = User.userRoles;
                    var nomObjet = 'user';
	
	                User.list(nomObjet,function(res) {
                        $scope.users = res;
                        $scope.loading = false;
                    }, function(err) {
                        $scope.error = "Failed to fetch users.";
                        $scope.loading = false;
                    });

                    $scope.add = function() {
		                $scope.success = '';
		                $scope.error = '';
                        User.add(nomObjet,{
                                username: $scope.username,
                                password: $scope.password,
                                role: $scope.role
                            },
                            function() {
				                $scope.success = 'Succes';
                                $location.path('/user/list');
                            },
                            function(err) {
                                $scope.error = err;
				                $location.path('/user/add');
                            });
                    };
               },

        zoneCtrl : function($rootScope, $scope, $location,$route,$routeParams, Zone) {
	
	                    var action = $route.current.action;
                        $scope.action = action;
                        var nomObjet = 'zone';

                        $scope.list = function() {
                            $scope.success = '';
		                    $scope.error = '';
                            Zone.list(nomObjet,function(res) {
                                $scope.zones = res;
                                $scope.loading = false;
                            }, function(err) {
                                $scope.error = "Failed to fetch zones.";
                                $scope.loading = false;
                            });
                         };

                        $scope.add = function() {
		                    $scope.success = '';
		                    $scope.error = '';
                            if (action == 'get'){
                                $scope.update();
                            }else{
                                Zone.add(nomObjet,{
                                        nom: $scope.nom,
                                        description: $scope.description,
                                    },
                                    function() {
				                        $scope.success = 'Succes';
                                        $location.path('/' + nomObjet + '/list');
                                    },
                                    function(err) {
                                        $scope.error = err;
                                        if (err == 'Doublon'){$scope.doublon='true';}
				                        $location.path('/' + nomObjet + '/add');
                                    });
                            }
                        };
                        
                        $scope.update = function() {
		                    $scope.success = '';
		                    $scope.error = '';

                            Zone.put(nomObjet,{
                                        _id : $scope._id,
                                        nom: $scope.nom,
                                        description: $scope.description,
                                    },
                                    function() {
                                        $scope.success = 'Succes';
                                        $location.path('/' + nomObjet + '/list');
                                    },
                                    function(err) {
                                        $scope.error = err;
                                        if (err == 'Doublon'){$scope.doublon='true';}
                                       $location.path('/' + nomObjet + '/item/' + $routeParams.id);
                                    });
                        };
                        
                        $scope.delete = function(nom) {
		                    $scope.success = '';
		                    $scope.error = '';
                            Zone.delete(nomObjet,nom,
                                function() {
				                    $scope.success = 'Succes';
                                    $route.reload();
                                },
                                function(err) {
                                    $scope.error = err;
				                    $route.reload();
                                });
                        };

                        $scope.get = function(id) {
		                    $scope.success = '';
		                    $scope.error = '';
                            Zone.get(nomObjet,id,
                                function(res) {
				                    $scope._id = res._id;
				                    $scope.nom = res.nom;
                                    $scope.description = res.description;
                                    $scope.loading = false;
                                }, function(err) {
                                    $scope.error = "Failed to fetch zone.";
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
                    },

        blocCtrl : function($rootScope, $scope, $location,$route,$routeParams, Bloc) {
	
	                    var action = $route.current.action;
                        $scope.action = action;
                        var nomObjet = 'bloc';

                        $scope.list = function() {
                            $scope.success = '';
		                    $scope.error = '';
                            Bloc.list(nomObjet,function(res) {
                                $scope.blocs = res;
                                $scope.loading = false;
                            }, function(err) {
                                $scope.error = "Failed to fetch blocs.";
                                $scope.loading = false;
                            });
                         };

                        $scope.add = function() {
		                    $scope.success = '';
		                    $scope.error = '';
                            if (action == 'get'){
                                $scope.update();
                            }else{
                                Bloc.add(nomObjet,{
                                        nom: $scope.nom,
                                        description: $scope.description,
                                        zone : $scope.zone,
                                    },
                                    function() {
				                        $scope.success = 'Succes';
                                        $location.path('/' + nomObjet + '/list');
                                    },
                                    function(err) {
                                        $scope.error = err;
                                        if (err == 'Doublon'){$scope.doublon='true';}
				                        $location.path('/' + nomObjet + '/add');
                                    });
                            }
                        };
                        
                        $scope.update = function() {
                            $scope.success = '';
                            $scope.error = '';

                            Bloc.put(nomObjet,{
                                        _id : $scope._id,
                                        nom: $scope.nom,
                                        description: $scope.description,
                                        zone : $scope.zone,
                                    },
                                    function() {
                                        $scope.success = 'Succes';
                                        $location.path('/' + nomObjet + '/list');
                                    },
                                    function(err) {
                                        $scope.error = err;
                                        if (err == 'Doublon'){$scope.doublon='true';}
                                       $location.path('/' + nomObjet + '/item/' + $routeParams.id);
                                    });
                        };
                        
                        $scope.delete = function(id) {
		                    $scope.success = '';
		                    $scope.error = '';
                            Bloc.delete(nomObjet,id,
                                function() {
				                    $scope.success = 'Succes';
                                    $route.reload();
                                },
                                function(err) {
                                    $scope.error = err;
				                    $route.reload();
                                });
                        };

                        $scope.get = function(id) {
		                    $scope.success = '';
		                    $scope.error = '';
                            Bloc.get(nomObjet,id,
                                function(res) {
                                    $scope._id = res._id;
				                    $scope.nom = res.nom;
                                    $scope.description = res.description;
                                    $scope.zone = res.zone;
                                    $scope.loading = false;
                                }, function(err) {
                                    $scope.error = "Failed to fetch bloc.";
                                    $scope.loading = false;
                                });
                        };
                        
                        $scope.loadListe = function() {
                            $scope.success = '';
                            $scope.error = '';
                            Bloc.list("zone",function(res) {
                                $scope.zones = res;
                                $scope.loading = false;
                            }, function(err) {
                                $scope.error = "Failed to fetch zones.";
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
                                $scope.loadListe();
                                $scope.get(id);
                                break;
                            case 'add':
                                $scope.loadListe();
                                break;
                            default:
                                break;
                        }
                    },

        quartierCtrl : function($rootScope, $scope, $location,$route,$routeParams, Quartier) {
	
	                    var action = $route.current.action;
                        $scope.action = action;
                        var nomObjet = 'quartier';

                        $scope.list = function() {
                            $scope.success = '';
		                    $scope.error = '';
                            Quartier.list(nomObjet,function(res) {
                                $scope.quartiers = res;
                                $scope.loading = false;
                            }, function(err) {
                                $scope.error = "Failed to fetch quartiers.";
                                $scope.loading = false;
                            });
                         };

                        $scope.add = function() {
		                    $scope.success = '';
		                    $scope.error = '';
                            if (action == 'get'){
                                $scope.update();
                            }else{
                                Quartier.add(nomObjet,{
                                        nom: $scope.nom,
                                        description: $scope.description,
                                        bloc : $scope.bloc,
                                    },
                                    function() {
				                        $scope.success = 'Succes';
                                        $location.path('/' + nomObjet + '/list');
                                    },
                                    function(err) {
                                        $scope.error = err;
                                        if (err == 'Doublon'){$scope.doublon='true';}
				                        $location.path('/' + nomObjet + '/add');
                                    });
                            }
                        };
                        
                        $scope.update = function() {
                            $scope.success = '';
                            $scope.error = '';

                            Quartier.put(nomObjet,{
                                        _id : $scope._id,
                                        nom: $scope.nom,
                                        description: $scope.description,
                                        bloc : $scope.bloc,
                                    },
                                    function() {
                                        $scope.success = 'Succes';
                                        $location.path('/' + nomObjet + '/list');
                                    },
                                    function(err) {
                                        $scope.error = err;
                                        if (err == 'Doublon'){$scope.doublon='true';}
                                       $location.path('/' + nomObjet + '/item/' + $routeParams.id);
                                    });
                        };
                        
                        $scope.delete = function(id) {
		                    $scope.success = '';
		                    $scope.error = '';
                            Quartier.delete(nomObjet,id,
                                function() {
				                    $scope.success = 'Succes';
                                    $route.reload();
                                },
                                function(err) {
                                    $scope.error = err;
				                    $route.reload();
                                });
                        };

                        $scope.get = function(id) {
		                    $scope.success = '';
		                    $scope.error = '';
                            Quartier.get(nomObjet,id,
                                function(res) {
                                    $scope._id = res._id;
				                    $scope.nom = res.nom;
                                    $scope.description = res.description;
                                    $scope.bloc = res.bloc;
                                    $scope.loading = false;
                                }, function(err) {
                                    $scope.error = "Failed to fetch quartier.";
                                    $scope.loading = false;
                                });
                        };
                        
                        $scope.loadListe = function() {
                            $scope.success = '';
                            $scope.error = '';
                            Quartier.list("bloc",function(res) {
                                $scope.blocs = res;
                                $scope.loading = false;
                            }, function(err) {
                                $scope.error = "Failed to fetch blocs.";
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
                                $scope.loadListe();
                                $scope.get(id);
                                break;
                            case 'add':
                                $scope.loadListe();
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
