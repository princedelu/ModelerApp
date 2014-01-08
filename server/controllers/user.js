var _ =           require('underscore')
    , User =      require('../models/User.js')
    , userRoles = require('../../client/javascript/routingConfig').userRoles;

module.exports = {
    list: function(req, res) {
        var users = User.findAll();
        _.each(users, function(user) {
            delete user.password;
        });
        res.json(users);
    },
	get: function(req, res) {
		console.log(req.params.nom);
        var users = User.findAll();
        _.each(users, function(user) {
            delete user.password;
        });
        res.json(users[1]);
    },
	delete : function(req, res) {
		console.log(req.params.nom);
        res.send();
    },
	add : function(req, res) {
        res.send();
    }
};