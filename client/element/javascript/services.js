'use strict';

angular.module('ModelerApp')
.factory('Objet', function($http) {
	var userRoles = routingConfig.userRoles;

	return {
        list: function(nomObjet,success, error) {
            $http.get('/api/'+ nomObjet).success(success).error(error);
        },
		add: function(nomObjet,objet, success, error) {
            $http.post('/api/' + nomObjet, objet).success(success).error(error);
        },
        get: function(nomObjet,id, success, error) {
            $http.get('/api/' + nomObjet + '/' + id).success(success).error(error);
        },
        delete: function(nomObjet,id, success, error) {
            $http.delete('/api/' + nomObjet + '/' + id).success(success).error(error);
        },
        put: function(nomObjet,objet, success, error) {
            $http.put('/api/' + nomObjet, objet).success(success).error(error);
        },
		userRoles : userRoles
    };
});




