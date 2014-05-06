
angular.module('underscore', []).factory('_', function() {
    return window._;
});

angular.module('ModelerApp', ['ngCookies', 'ngRoute','underscore','ui.bootstrap'])

    .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

    var access = routingConfig.accessLevels;

    $routeProvider.when('/',
        {
            templateUrl:    '/accueil/partials/public.jade',
            controller:     'LoginCtrl',
            access:         access.anon
        });
	$routeProvider.when('/home',
        {
            templateUrl:    '/accueil/partials/home.jade',
            controller:     'LoginCtrl',
            access:         access.user
        });
    $routeProvider.when('/element',
        {
            templateUrl:    '/element/partials/home.jade',
            controller:     'dynamicCtrl',
            access:         access.user
        });
    $routeProvider.when('/restitution',
        {
            templateUrl:    '/restit/partials/home.jade',
            controller:     'GroupCtrl',
            action :        'home',
            resolve: {
                grappeElement: function () {
                    return '';
                }
            },
            access:         access.user
        });
    $routeProvider.when('/:objet/list',
        {
            templateUrl:    '/element/partials/list.jade',
            controller:     'dynamicCtrl',
            action :        'list',
            access:         access.user
        });
    $routeProvider.when('/:objet/add',
        {
            templateUrl:    function(params) {
                                return '/element/partials/' + params.objet + '/get.jade';
                            },
            controller:     'dynamicCtrl',
            action :        'add',
            access:         access.user
        });
    $routeProvider.when('/:objet/item/:id',
        {
            templateUrl:function(params) { 
                            return '/element/partials/' + params.objet + '/get.jade';
                        },
            controller:    'dynamicCtrl',
            action :       'get',
            access:         access.user
        });
    $routeProvider.when('/group/:element',
        {
            templateUrl:function(params) { 
                            return '/restit/partials/group/get.jade';
                        },
            controller:    'GroupCtrl',
            action :        'get',
            resolve: {
                grappeElement: function ($route,$q,Group) {
                    var deferred = $q.defer();
                    Group.get($route.current.params.element,function(res){
                            deferred.resolve(res);
                        },
                        function(err){
                            deferred.reject();
                        }
                    );
                    return deferred.promise;
                }
            },
            access:         access.user
        });
    $routeProvider.when('/404',
        {
            templateUrl:    '/partials/404.jade',
            access:         access.public
        });
    $routeProvider.otherwise({redirectTo:'/404'});

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(function($q, $location) {
        return {
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };
    });

}])

    .run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
        $rootScope.modelConfig = modelConfig.modelConfig;
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.error = null;

            if (!Auth.authorize(next.access)) {
               if(Auth.isLoggedIn()) $location.path('/home');
               else                  $location.path('/');
            }
        });

    }]);

$(document).ready(function () {
	$('label.tree-toggler').click(function () {
		$(this).parent().children('ul.tree').toggle(200);
	});
});
(function(){
"use strict";

angular.module('ModelerApp')
.factory('Auth', ['$http','$cookieStore', function($http, $cookieStore){

    var accessLevels = routingConfig.accessLevels;
    var userRoles = routingConfig.userRoles;
    var currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };

    $cookieStore.remove('user');

	function changeUser(user) {
		_.extend(currentUser, user);
	}
	
    return {
        authorize: function(accessLevel, role) {
            if (accessLevel === undefined)
                accessLevel = userRoles.admin;
            if(role === undefined)
                role = currentUser.role;

            return accessLevel.bitMask & role.bitMask;
        },
        isLoggedIn: function(user) {
            if(user === undefined)
                user = currentUser;
            return user.role.title == userRoles.user.title || user.role.title == userRoles.admin.title;
        },
        login: function(user, success, error) {
            $http.post('/api/login', user).success(function(user){
                changeUser(user);
                success(user);
            }).error(error);
        },
        logout: function(success, error) {
            $http.post('/api/logout').success(function(){
                changeUser({
                    username: '',
                    role: userRoles.public
                });
                success();
            }).error(error);
        },
        accessLevels: accessLevels,
        userRoles: userRoles,
        user: currentUser
    };
}]);

})();



(function(){
"use strict";

angular.module('ModelerApp')
.factory('Objet',['$http', function($http) {
	var userRoles = routingConfig.userRoles;

	return {
        list: function(nomObjet,success, error) {
            $http.get('/api/'+ nomObjet).success(success).error(error);
        },
		add: function(nomObjet,objet, success, error) {
            $http.post('/api/' + nomObjet, objet).success(success).error(error);
        },
        get: function(nomObjet,id, success, error) {
            $http.get('/api/' + nomObjet + '/' + id).success(success).error(error);
        },
        delete: function(nomObjet,id, success, error) {
            $http.delete('/api/' + nomObjet + '/' + id).success(success).error(error);
        },
        put: function(nomObjet,objet, success, error) {
            $http.put('/api/' + nomObjet, objet).success(success).error(error);
        },
		userRoles : userRoles
    };
}]);

})();




(function(){
"use strict";

angular.module('ModelerApp')
.factory('Group',['$http', function($http) {
	var userRoles = routingConfig.userRoles;

	return {
        get: function(nomGroup, success, error) {
            $http.get('/api/group-'+nomGroup).success(success).error(error);
        },
		userRoles : userRoles
    };
}]);

})();



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
(function(){
"use strict";

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
            $location.path('/');
        }, function() {
            $scope.error = "Failed to logout";
        });
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
})();

(function(){
"use strict";

angular.module('ModelerApp')
    .controller('dynamicCtrl', ['$rootScope', '$scope', '$location', '$route', '$routeParams', 'Objet','_','Auth',
        function ($rootScope, $scope, $location, $route, $routeParams, Objet, _,Auth) {

            $scope.isModuleElement = true;
            var nomObjet = $routeParams.objet;
            var action = $route.current.action;
            $scope.action = action;
            var elementConfig;

            _.each(modelConfig.modelConfig.models.index, function(item) {
                if (modelConfig.modelConfig.models[item.nom].model == nomObjet) {
                    elementConfig = modelConfig.modelConfig.models[item.nom];
                }
            });

            $scope.elementConfig = elementConfig;

            $scope.user = Auth.user;
            $scope.userRoles = Auth.userRoles;
            $scope.accessLevels = Auth.accessLevels;

            $scope.list = function () {
                $scope.success = '';
                $scope.error = '';
                Objet.list(nomObjet, function (res) {
                    $scope.objets = res;
                    $scope.loading = false;
                }, function (err) {
                    $scope.error = "Failed to fetch " + nomObjet;
                    $scope.loading = false;
                });
            };

            $scope.add = function () {
                $scope.success = '';
                $scope.error = '';
                if (action == 'get') {
                    $scope.update();
                } else {
                    var objetValue = {};
                    _.each(elementConfig.champs, function(item) {
                        var modelChamp = item.model;
                        if (modelChamp != "_id") {
                            objetValue[modelChamp] = $scope[modelChamp];
                        }
                    });

                    Objet.add(nomObjet, objetValue,
                        function () {
                            $scope.success = 'Succes';
                            $location.path('/' + nomObjet + '/list');
                        },
                        function (err) {
                            $scope.error = err;
                            if (err == 'Doublon') {
                                $scope.doublon = 'true';
                            }
                            $location.path('/' + nomObjet + '/add');
                        });
                }
            };

            $scope.update = function () {
                $scope.success = '';
                $scope.error = '';

                var objetValue = {};
                 _.each(elementConfig.champs, function(item) {
                    var modelChamp = item.model;
                    objetValue[modelChamp] = $scope[modelChamp];
                });

                Objet.put(nomObjet, objetValue,
                    function () {
                        $scope.success = 'Succes';
                        $location.path('/' + nomObjet + '/list');
                    },
                    function (err) {
                        $scope.error = err;
                        if (err == 'Doublon') {
                            $scope.doublon = 'true';
                        }
                        $location.path('/' + nomObjet + '/item/' + $routeParams.id);
                    });
            };

            $scope.delete = function (id) {
                $scope.success = '';
                $scope.error = '';
                Objet.delete(nomObjet, id,
                    function () {
                        $scope.success = 'Succes';
                        $route.reload();
                    },
                    function (err) {
                        $scope.error = err;
                        $route.reload();
                    });
            };

            $scope.go = function ( path ) {
                $location.path( path );
            };

            $scope.get = function (id) {
                $scope.success = '';
                $scope.error = '';
                Objet.get(nomObjet, id,
                    function (res) {
                         _.each(elementConfig.champs, function(item) {
                            var modelChamp = item.model;
                            $scope[modelChamp]=res[modelChamp];
                        });
                        $scope.loading = false;
                    }, function (err) {
                        $scope.error = "Failed to fetch " + nomObjet;
                        $scope.loading = false;
                    });
            };

            $scope.loadListe = function () {
                $scope.success = '';
                $scope.error = '';

                _.each(elementConfig.populate, function(item,index) {
                    var modelPopulate = item.model;
                    Objet.list(modelPopulate, function (res) {
                       $scope[modelPopulate + "s"] = res;
                        $scope.loading = false;
                    }, function (err) {
                        $scope.error = "Failed to fetch " + modelPopulate;
                        $scope.loading = false;
                    });
                });
            };

            switch (action) {
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
    ]);

})();
(function(){
"use strict";

    angular.module('ModelerApp')
    .controller('GroupCtrl',
    ['$route', '$scope', '$routeParams','grappeElement', 'Group', function($route, $scope, $routeParams,grappeElement, Group) {

        $scope.isModuleRestit = true;
        var action = $route.current.action;    

        $scope.get = function () {
            var element = $routeParams.element;
            $scope.success = '';
            $scope.error = '';
            $scope.grappeElement = grappeElement;
        };

        switch (action) {
        case 'get':
            $scope.get();
            break;
        default:
            break;
        }
       
    }]);

})();


(function(){
"use strict";

angular.module('ModelerApp')
.directive('accessLevel', ['Auth', function(Auth) {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            var prevDisp = element.css('display');
            var userRole;
            var accessLevel;

            $scope.user = Auth.user;
            $scope.$watch('user', function(user) {
                if(user.role)
                    userRole = user.role;
                updateCSS();
            }, true);

            attrs.$observe('accessLevel', function(al) {
                if(al) accessLevel = $scope.$eval(al);
                updateCSS();
            });

            function updateCSS() {
                if(userRole && accessLevel) {
                    if(!Auth.authorize(accessLevel, userRole)){
                        element.css('display', 'none');
                    }
                    else{
                        element.css('display', prevDisp);
                    }
                }
            }
        }
    };
}]);

angular.module('ModelerApp').directive('activeNav', ['$location', function($location) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var nestedA = element.find('a')[0];
            var path = nestedA.href;

            scope.location = $location;
            scope.$watch('location.absUrl()', function(newPath) {
                if (path === newPath) {
                    element.addClass('active');
                } else {
                    element.removeClass('active');
                }
            });
        }

    };

}]);

})();
(function(){
"use strict";

angular.module('ModelerApp').directive('jstree', ['$rootScope','$location', function($rootScope,$location) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(function() {
               var tree = $(element[0]).jstree({
                     "core" : {
                       'data' : function (obj, cb) {
                            var listeValeurArbre = [] ;
                            var nbValeur = 0;
                            var jstreeType = attrs.jstreeType;

                            _.each(modelConfig.modelConfig.models.index, function(item,index) {
                                if (item.type === jstreeType ){
                                    var valeurArbre={};
                                    valeurArbre.id = "idtree" + modelConfig.modelConfig.models[item.nom].model;
                                    valeurArbre.parent = "#";
                                    valeurArbre.text = item.nom;
							        listeValeurArbre[nbValeur] = valeurArbre;
                                    nbValeur++;
                                }
						    });
                            cb.call(this,
                              listeValeurArbre);
                        }
                     },
                    "plugins" : [ "contextmenu" ], contextmenu: {items: customMenu}
                  });
                tree.on('select_node.jstree', function (e, data) {
                    var id = data.node.id;
                    id = id.substring(6,id.length+1);
                    $rootScope.$apply(function(){
                       $location.path('/' + id + '/list'); 
                    }); 
                  });
            });

            function customMenu(node) {
                // The default set of all items
                var id = node.id;
                id = id.substring(6,id.length+1);
                var items = {
                    addItem: {
                        label: "Ajout",
                        action: function (node) {   
                                                    $rootScope.$apply(function(){
                                                       $location.path('/' + id + '/add'); 
                                                    });                                   
                                                }
                    },
                    listItem: {
                        label: "Liste",
                        action: function (node) {
                                                    $rootScope.$apply(function(){
                                                       $location.path('/' + id + '/list'); 
                                                    });  
                                                }
                    }
                };

                if ($(node).hasClass("folder")) {
                    // Delete the "delete" menu item
                    delete items.deleteItem;
                }

                return items;
            }
        }

    };

}]);

})();

(function(){
"use strict";

angular.module('ModelerApp').directive('jstreerestit', ['$rootScope','$location', function($rootScope,$location) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(function() {
               $(element[0]).jstree({
                     "core" : {
                       'data' : function (obj, cb) {
                            var listeValeurArbre = [] ;

                            for(var id=0;id<modelConfig.modelConfig.groups.index.length;id++){
                                var valeurArbre={};
                                valeurArbre.id = "idtreeRestit" + modelConfig.modelConfig.groups.index[id].nom;
                                valeurArbre.parent = "#";
                                valeurArbre.text = modelConfig.modelConfig.groups.index[id].nom.charAt(0).toUpperCase() + modelConfig.modelConfig.groups.index[id].nom.slice(1).toLowerCase();
							    listeValeurArbre[id] = valeurArbre;
						    }

                            cb.call(this,
                              listeValeurArbre);
                        }
                     },
                    "plugins" : [ "contextmenu" ], contextmenu: {items: customMenu}
                  });
            });

            function customMenu(node) {
                // The default set of all items
                var id = node.id;
                id = id.substring(12,id.length+1);
                var items = {
                    getItem: {
                        label: "Afficher",
                        action: function (node) {
                                                    $rootScope.$apply(function(){
                                                       $location.path('/group/' + id ); 
                                                    });  
                                                }
                    }
                };

                if ($(node).hasClass("folder")) {
                    // Delete the "delete" menu item
                    delete items.deleteItem;
                }

                return items;
            }
        }

    };

}]);

angular.module('ModelerApp').directive('d3TreeMap', ['$rootScope', '$location', function($rootScope, $location) {
    return {
        restrict: 'E',
        replace : false,
        scope: {data: '=data'},
        link: function(scope, element, attrs) {

            var chart = d3.select(element[0]);

            var width = 960,
                height = 500;

            var color = d3.scale.category20c();

            var treemap = d3.layout.treemap()
                .size([width, height])
                .padding(16)
                .value(function(d) { return d.size; });

            var div = chart.append("div")
                .style("position", "relative")
                .style("width", width + "px")
                .style("height", height + "px");

            div.selectAll(".node")
                .data(treemap.nodes(scope.data))
                .enter().append("div")
                .attr("class", "node")
                .style("left", function(d) { return d.x + "px"; })
                .style("top", function(d) { return d.y + "px"; })
                .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
                .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; })
                .style("background", function(d) { return d.children ? color(d.name) : null; })
                .text(function(d) { return d.children ? d.name : d.name; });
            
        }

    };

}]);

})();


