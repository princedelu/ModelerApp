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

angular.module('ModelerApp').directive('jstreerestit', ['$rootScope','$location', function($rootScope,$location) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(function() {
               $(element[0]).jstree({
                     "core" : {
                       'data' : function (obj, cb) {
                            var listeValeurArbre = [] ;

                            var valeurArbre={};
                            valeurArbre["id"] = "idtreeRestitmetier";
                            valeurArbre["parent"] = "#";
                            valeurArbre["text"] = "Metier";
					        listeValeurArbre[0] = valeurArbre;

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

angular.module('ModelerApp').directive('jstree', ['$rootScope','$location', function($rootScope,$location) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(function() {
               $(element[0]).jstree({
                     "core" : {
                       'data' : function (obj, cb) {
                            var listeValeurArbre = [] ;

                            for(var index=0;index<modelConfig.modelConfig.length;index++){
                                var valeurArbre={};
                                valeurArbre["id"] = "idtree" + modelConfig.modelConfig[index].model;
                                valeurArbre["parent"] = "#";
                                valeurArbre["text"] = modelConfig.modelConfig[index].nom;
							    listeValeurArbre[index] = valeurArbre;
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


