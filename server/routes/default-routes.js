var _ =           require('underscore')
    , path =      require('path')
    , passport =  require('passport')
    , AuthCtrl =  require('../controllers/auth')
    , User =      require('../models/User.js')
    , userRoles = require('../../client/common/javascript/routingConfig').userRoles
    , accessLevels = require('../../client/common/javascript/routingConfig').accessLevels
    , config = require('../../client/common/javascript/modelConfig').modelConfig.models
    , groups = require('../../client/common/javascript/modelConfig').modelConfig.groups;

var routes = [

    // Views
    {
        path: '/*/partials/*',
        httpMethod: 'GET',
        middleware: [function (req, res) {
            var requestedView = path.join('./', req.url);
            res.render(requestedView);
        }]
    },
    {
        path: '/api/login',
        httpMethod: 'POST',
        middleware: [AuthCtrl.login]
    },
    {
        path: '/api/logout',
        httpMethod: 'POST',
        middleware: [AuthCtrl.logout]
    },
     // All other get requests should be handled by AngularJS's client-side routing system
    {
        path: '/element',
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
            res.render('element/index',{classname:''});
        }]
    },
    {
        path: '/restitution',
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
            res.render('restit/index',{classname:''});
        }]
    },
    // All other get requests should be handled by AngularJS's client-side routing system
    {
        path: '/*',
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
            res.render('accueil/index',{classname:''});
        }]
    }
];

var routesConcat = {};

module.exports = function(app,db) {
    
    routesConcat = routes;

   _.each(groups.index, function(item,index) {
            var routesElement = require('./routes-group')(item.nom);
            routesConcat = _.union(routesElement,routesConcat);
        });

    _.each(config, function(item,index) {
            var routesElement = require('./routes-name')(item.model,index);
            routesConcat = _.union(routesElement,routesConcat);
        });
	
    _.each(routesConcat, function(route) {
        route.middleware.unshift(ensureAuthorized);
        var args = _.flatten([route.path, route.middleware]);
        switch(route.httpMethod.toUpperCase()) {
            case 'GET':
				app.get.apply(app, args);
                break;
            case 'POST':
                app.post.apply(app, args);
                break;
            case 'PUT':
                app.put.apply(app, args);
                break;
            case 'DELETE':
                app.delete.apply(app, args);
                break;
            default:
                throw new Error('Invalid HTTP method specified for route ' + route.path);
                break;
        }
    });
}

function ensureAuthorized(req, res, next) {
    var role;
    if(!req.user) role = userRoles.public;
    else          role = req.user.role;
    var accessLevel = _.findWhere(routesConcat, { path: req.route.path }).accessLevel || accessLevels.public;

    if(!(accessLevel.bitMask & role.bitMask)) return res.send(401);
    return next();
}
