
angular.module('ModelerApp', ['ngCookies', 'ngRoute'])

    .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

    var access = routingConfig.accessLevels;

    $routeProvider.when('/',
        {
            templateUrl:    '/partials/public.jade',
            controller:     'LoginCtrl',
            access:         access.anon
        });
	$routeProvider.when('/home',
        {
            templateUrl:    '/partials/home.jade',
            controller:     'LoginCtrl',
            access:         access.user
        });
    $routeProvider.when('/:objet/list',
        {
            templateUrl:    '/partials/list.jade',
            controller:     'dynamicCtrl',
            action :        'list',
            access:         access.user
        });
    $routeProvider.when('/:objet/add',
        {
            templateUrl:    function(params) {
                                return '/partials/' + params.objet + '/get.jade';
                            },
            controller:     'dynamicCtrl',
            action :        'add',
            access:         access.user
        });
    $routeProvider.when('/:objet/item/:id',
        {
            templateUrl:function(params) { 
                            return '/partials/' + params.objet + '/get.jade';
                        },
            controller:    'dynamicCtrl',
            action :       'get',
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
        }
    });

}])

    .run(['$rootScope', '$location', '$http', 'Auth', function ($rootScope, $location, $http, Auth) {
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
