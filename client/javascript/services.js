'use strict';

angular.module('ModelerApp')
.factory('Auth', function($http, $cookieStore){

    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles
        , currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };

    $cookieStore.remove('user');

	function changeUser(user) {
		_.extend(currentUser, user);
	};
	
    return {
        authorize: function(accessLevel, role) {
            if(role === undefined)
                role = currentUser.role;

            return accessLevel.bitMask & role.bitMask;
        },
        isLoggedIn: function(user) {
            if(user === undefined)
                user = currentUser;
            return user.role.title == userRoles.user.title || user.role.title == userRoles.admin.title;
        },
        login: function(user, success, error) {
            $http.post('/api/login', user).success(function(user){
                changeUser(user);
                success(user);
            }).error(error);
        },
        logout: function(success, error) {
            $http.post('/api/logout').success(function(){
                changeUser({
                    username: '',
                    role: userRoles.public
                });
                success();
            }).error(error);
        },
        accessLevels: accessLevels,
        userRoles: userRoles,
        user: currentUser
    };
});

angular.module('ModelerApp')
.factory('User', function($http) {
	var userRoles = routingConfig.userRoles;
	
	return {
        list: function(success, error) {
            $http.get('/api/user').success(success).error(error);
        },
		add: function(user, success, error) {
            $http.post('/api/user', user).success(function(res) {
                success();
            }).error(error);
        },
		userRoles: userRoles,
    };
});

angular.module('ModelerApp')
.factory('Zone', function($http) {
	
	return {
        list: function(success, error) {
            $http.get('/api/zone').success(success).error(error);
        },
		add: function(user, success, error) {
            $http.post('/api/zone', user).success(function(res) {
                success();
            }).error(error);
        }
    };
});




