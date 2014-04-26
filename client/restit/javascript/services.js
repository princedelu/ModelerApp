'use strict';

angular.module('ModelerApp')
.factory('Group', function($http) {
	var userRoles = routingConfig.userRoles;

	return {
        get: function(nomGroup, success, error) {
            $http.get('/api/group-'+nomGroup).success(success).error(error);
        },
		userRoles : userRoles
    };
});



