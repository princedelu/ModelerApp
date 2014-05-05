

module.exports = exports = function(nom) {

    var Ctrl =  		require('../controllers/element')(nom)
	, path =            require('path')
	, userRoles = 		require('../../client/common/config/routingConfig').userRoles
	, accessLevels = 	require('../../client/common/config/routingConfig').accessLevels
    , config = require('../../client/common/config/modelConfig').modelConfig.models;

    var element = config[nom];

    var routes = [

	    // List
	    {
		    path: '/api/'+ element.model,
		    httpMethod: 'GET',
		    middleware: [Ctrl.list],
		    accessLevel: accessLevels.user
	    },
	
	    // Read 
	    {
		    path: '/api/'+ element.model + '/:nom',
		    httpMethod: 'GET',
		    middleware: [Ctrl.get],
		    accessLevel: accessLevels.user
	    },
	
	    // Put 
	    {
		    path: '/api/'+ element.model,
		    httpMethod: 'PUT',
		    middleware: [Ctrl.put],
		    accessLevel: accessLevels.user
	    },
	
	    // Delete 
	    {
		    path: '/api/'+ element.model + '/:nom',
		    httpMethod: 'DELETE',
		    middleware: [Ctrl.delete],
		    accessLevel: accessLevels.user
	    },
	
	    // Post 
	    {
		    path: '/api/'+ element.model,
		    httpMethod: 'POST',
		    middleware: [Ctrl.put],
		    accessLevel: accessLevels.user
	    },

	    // All other get requests should be handled by AngularJS's client-side routing system
	    {
		    path: '/'+ element.model + '/*',
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
			    res.render('common/index',{classname:''});
		    }]
	    }
    ];

    return routes;

}
