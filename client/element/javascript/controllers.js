(function(){
"use strict";

angular.module('ModelerApp')
    .controller('dynamicCtrl', ['$rootScope', '$scope', '$location', '$route', '$routeParams', 'Objet','_',
        function ($rootScope, $scope, $location, $route, $routeParams, Objet, _) {

            $scope.isModuleElement = true;
            var nomObjet = $routeParams.objet;
            var action = $route.current.action;
            $scope.action = action;
            var elementConfig;

            _.each(modelConfig.modelConfig.models, function(item,index) {
                if (item.model == nomObjet) {
                    elementConfig = item;
                }
            });

            $scope.elementConfig = elementConfig;

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
                    for (var indexChamps = 0; indexChamps < elementConfig.champs.length; indexChamps++) {
                        var modelChamp = elementConfig.champs[indexChamps].model;
                        if (modelChamp != "_id") {
                            objetValue[modelChamp] = $scope[modelChamp];
                        }
                    }

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
                for (var indexChamps = 0; indexChamps < elementConfig.champs.length; indexChamps++) {
                    var modelChamp = elementConfig.champs[indexChamps].model;
                    objetValue[modelChamp] = $scope[modelChamp];
                }

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

            $scope.get = function (id) {
                $scope.success = '';
                $scope.error = '';
                Objet.get(nomObjet, id,
                    function (res) {
                        for (var indexChamps = 0; indexChamps < elementConfig.champs.length; indexChamps++) {
                            var modelChamp = elementConfig.champs[indexChamps].model;
                            $scope[modelChamp]=res[modelChamp];
                        }
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
