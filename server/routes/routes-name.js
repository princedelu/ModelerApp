

module.exports = exports = function(name,index) {

    var Ctrl =  		require('../controllers/element')(index)
	, path =            require('path')
	, userRoles = 		require('../../client/javascript/routingConfig').userRoles
	, accessLevels = 	require('../../client/javascript/routingConfig').accessLevels;

    var routes = [

	    // Views
	    {
		    path: '/partials/'+ name + '/*',
		    httpMethod: 'GET',
		    middleware: [function (req, res) {
			    var requestedView = path.join('./', req.url);
			    res.render(requestedView);
		    }]
	    },

	    // List
	    {
		    path: '/api/'+ name,
		    httpMethod: 'GET',
		    middleware: [Ctrl.list],
		    accessLevel: accessLevels.user
	    },
	
	    // Read 
	    {
		    path: '/api/'+ name + '/:nom',
		    httpMethod: 'GET',
		    middleware: [Ctrl.get],
		    accessLevel: accessLevels.user
	    },
	
	    // Put 
	    {
		    path: '/api/'+ name,
		    httpMethod: 'PUT',
		    middleware: [Ctrl.put],
		    accessLevel: accessLevels.user
	    },
	
	    // Delete 
	    {
		    path: '/api/'+ name + '/:nom',
		    httpMethod: 'DELETE',
		    middleware: [Ctrl.delete],
		    accessLevel: accessLevels.user
	    },
	
	    // Post 
	    {
		    path: '/api/'+ name,
		    httpMethod: 'POST',
		    middleware: [Ctrl.put],
		    accessLevel: accessLevels.user
	    },

	    // All other get requests should be handled by AngularJS's client-side routing system
	    {
		    path: '/'+ name + '/*',
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
			    res.render('index',{classname:''});
		    }]
	    }
    ];

    return routes;

}
