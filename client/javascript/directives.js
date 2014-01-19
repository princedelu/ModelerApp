'use strict';

angular.module('ModelerApp')
.directive('accessLevel', ['Auth', function(Auth) {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            var prevDisp = element.css('display')
                , userRole
                , accessLevel;

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
                    if(!Auth.authorize(accessLevel, userRole))
                        element.css('display', 'none');
                    else
                        element.css('display', prevDisp);
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

angular.module('ModelerApp').directive('jstree', ['$rootScope','$location', function($rootScope,$location) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(function() {
                $( "#jstree1" ).jstree({
                     "core" : {
                       // so that create works
                       "check_callback" : true
                     },
                    "plugins" : [ "contextmenu" ], contextmenu: {items: customMenu}
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
