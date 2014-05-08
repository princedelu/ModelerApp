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
                                    valeurArbre.text = modelConfig.modelConfig.models[item.nom].nom;
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

