module.exports = exports = function(group) {

    var Ctrl =  		require('../controllers/group')(group)
	    , path =      require('path')
	    , userRoles = 		require('../../client/javascript/routingConfig').userRoles
	    , accessLevels = 	require('../../client/javascript/routingConfig').accessLevels;

    var routes = [

	    // Views
	    {
		    path: '/partials/'+ group + '/*',
		    httpMethod: 'GET',
		    middleware: [function (req, res) {
			    var requestedView = path.join('./', req.url);
			    res.render(requestedView);
		    }]
	    },
	
	    // Read 
	    {
		    path: '/api/group-'+ group,
		    httpMethod: 'GET',
		    middleware: [Ctrl.get],
		    accessLevel: accessLevels.user
	    },

	    // All other get requests should be handled by AngularJS's client-side routing system
	    {
		    path: '/group-'+ group + '/*',
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
			    res.render('index',{classname:group + '/'});
		    }]
	    }
    ];

    return routes;

}

