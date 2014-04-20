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

angular.module('ModelerApp')
.controller('GroupCtrl',
['$route', '$scope', '$routeParams','grappeElement', 'Group', function($route, $scope, $routeParams,grappeElement, Group) {
    
    var element = $routeParams.element;
    $scope.success = '';
    $scope.error = '';
	$scope.grappeElement = grappeElement;
   
}]);

var controllers = {
    userCtrl : function($rootScope, $scope, $location,$route,$routeParams, User,nomObjet) {

                    $scope.role = User.userRoles.user;
                    $scope.userRoles = User.userRoles;
	
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
		objetCtrl : function($rootScope, $scope, $location,$route,$routeParams, Objet, nomObjet) {
	
	                    var action = $route.current.action;
                        $scope.action = action;
						var elementConfig;
						
						for(var index=0;index<modelConfig.modelConfig.length;index++){
							elementConfig = modelConfig.modelConfig[index];
							if (elementConfig.model == nomObjet){
								break;
							}
						}

                        $scope.elementConfig = elementConfig;

                        $scope.list = function() {
                            $scope.success = '';
		                    $scope.error = '';
                            Objet.list(nomObjet,function(res) {
                                $scope.objets = res;
                                $scope.loading = false;
                            }, function(err) {
                                $scope.error = "Failed to fetch "+ nomObjet;
                                $scope.loading = false;
                            });
                         };

                        $scope.add = function() {
		                    $scope.success = '';
		                    $scope.error = '';
                            if (action == 'get'){
                                $scope.update();
                            }else{
								var objetValue = {};
								for(var indexChamps=0;indexChamps<elementConfig.champs.length;indexChamps++){
									var modelChamp = elementConfig.champs[indexChamps].model;
									if (modelChamp != "_id") {
										objetValue[modelChamp]=$scope[modelChamp];
									}
								}
							
                                Objet.add(nomObjet,objetValue,
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

							var objetValue = {};
							for(var indexChamps=0;indexChamps<elementConfig.champs.length;indexChamps++){
								var modelChamp = elementConfig.champs[indexChamps].model;
									objetValue[modelChamp]=$scope[modelChamp];
							}
							
                            Objet.put(nomObjet,objetValue,
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
                            Objet.delete(nomObjet,id,
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
                            Objet.get(nomObjet,id,
                                function(res) {
									for(var indexChamps=0;indexChamps<elementConfig.champs.length;indexChamps++){
										var modelChamp = elementConfig.champs[indexChamps].model;
										eval("$scope." + modelChamp + "=res." + modelChamp);
									}
                                    $scope.loading = false;
                                }, function(err) {
                                    $scope.error = "Failed to fetch "+ nomObjet;
                                    $scope.loading = false;
                                });
                        };
                        
                        $scope.loadListe = function() {
                            $scope.success = '';
                            $scope.error = '';
							
							for(var indexPopulate=0;indexPopulate<elementConfig.populate.length;indexPopulate++){
            					var modelPopulate=elementConfig.populate[indexPopulate].model;
								Objet.list(modelPopulate,function(res) {
									$scope[modelPopulate + "s"]=res;
									$scope.loading = false;
								}, function(err) {
									$scope.error = "Failed to fetch " + modelPopulate;
									$scope.loading = false;
								});
						   }
							
							
                            
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
	var controllerName="user";
	if ($routeParams.objet != "user"){
		controllerName="objet";
	}	
    controllers[controllerName+"Ctrl"]($rootScope, $scope, $location,$route,$routeParams, Objet,$routeParams.objet);
}]);
