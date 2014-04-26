'use strict';

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
                                valeurArbre["id"] = "idtreeRestit" + modelConfig.modelConfig.groups.index[id].nom;
                                valeurArbre["parent"] = "#";
                                valeurArbre["text"] = modelConfig.modelConfig.groups.index[id].nom.charAt(0).toUpperCase() + modelConfig.modelConfig.groups.index[id].nom.slice(1).toLowerCase();
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


