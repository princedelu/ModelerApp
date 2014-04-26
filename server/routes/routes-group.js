module.exports = exports = function(group) {

    var Ctrl =  		require('../controllers/group')(group)
	    , path =      require('path')
	    , userRoles = 		require('../../client/common/javascript/routingConfig').userRoles
	    , accessLevels = 	require('../../client/common/javascript/routingConfig').accessLevels;

    var routes = [
	    // Read 
	    {
		    path: '/api/group-'+ group,
		    httpMethod: 'GET',
		    middleware: [Ctrl.get],
		    accessLevel: accessLevels.user
	    },

	    // All other get requests should be handled by AngularJS's client-side routing system
	    {
		    path: '/group/'+ group,
		    httpMethod: 'GET',
		    middleware: [function(req, res) {
			    var role = userRoles.public, username = '';
			    if(req.user) {
				    role = req.user.role;
				    username = req.user.username;
			    }
			    res.cookie('user', JSON.stringify({
				    'username': username,
				    'role': role
			    }));
			    res.render('restit/index',{classname:group + '/'});
		    }]
	    }
    ];

    return routes;

}

