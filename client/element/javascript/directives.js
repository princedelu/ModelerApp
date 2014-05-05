(function(){
"use strict";

angular.module('ModelerApp').directive('jstree', ['$rootScope','$location', function($rootScope,$location) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(function() {
               $(element[0]).jstree({
                     "core" : {
                       'data' : function (obj, cb) {
                            var listeValeurArbre = [] ;

                            _.each(modelConfig.modelConfig.models.index, function(item,index) {
                                var valeurArbre={};
                                valeurArbre.id = "idtree" + modelConfig.modelConfig.models[item.nom].model;
                                valeurArbre.parent = "#";
                                valeurArbre.text = item.nom;
							    listeValeurArbre[index] = valeurArbre;
						    });
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

})();

