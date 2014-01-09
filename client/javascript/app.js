'use strict';

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
	$routeProvider.when('/user/add',
        {
            templateUrl:    '/partials/user/add.jade',
			controller:     'UserCtrl',
            access:         access.admin
        });
    $routeProvider.when('/user/list',
        {
            templateUrl:    '/partials/user/list.jade',
            controller:     'UserCtrl',
            access:         access.admin
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

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.error = null;
			
            if (!Auth.authorize(next.access)) {
               if(Auth.isLoggedIn()) $location.path('/home');
               else                  $location.path('/');
            }else{
				  $location.path(next.originalPath);
			}
        });

    }]);