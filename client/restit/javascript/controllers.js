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


