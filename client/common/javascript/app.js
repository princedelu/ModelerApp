
angular.module('underscore', []).factory('_', function() {
    return window._;
});

angular.module('ModelerApp', ['ngCookies', 'ngRoute','underscore'])

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
