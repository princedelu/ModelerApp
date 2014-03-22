var _ = require('underscore'), Zone = require('../models/Zone.js'), result;

module.exports = {
	list: function(req, res) {
		Zone.find(null, function (err, zones) {
			if (err) { res.send(403,'Erreur interne'); }
			res.send(200,zones);
		});
	},
	get: function(req, res) {
		var query = Zone.findOne(null);
		query.where('nom', req.params.nom);
		query.exec(function (err, zone) {
			if (err) { res.send(403,'Erreur interne'); }
			res.send(200,zone);
		});
	},
	put: function(req, res) {
	    var id = req.body._id;
	    var conditions = { _id  : req.body._id };
	    var options = { multi: false };
	    
	    var query = Zone.findOne(null);
        query.where('nom', req.body.nom);
        query.exec(function(err, zone) {
            if (err) {
                res.send(403, 'Erreur interne');
            }
            if (zone != null && zone._id != id) {
                res.send(403, 'Doublon');
            }else{
                var zoneObject = {
					    nom : req.body.nom,
					    description : req.body.description
				    };
                var zone = new Zone(zoneObject);
                if (id==null)
                {
				    zone.save(function(err) {
					    if (err) {
						    res.send(403, 'Erreur interne')
					    }
					    console.log('Zone ajoutée avec succès !');
				    });
                } else {
                    Zone.update(conditions,zoneObject,options,function(err) {
                        if (err) {
                            res.send(403, 'Erreur interne')
                        }
                        console.log('Zone mise à jour avec succès !');
                    });
                }
                res.send(200);
            }
        });
    },
	delete : function(req, res) {
		Zone.remove({
			nom : req.params.nom
		}, function(err) {
			if (err) {
				res.send(403, 'Erreur interne');
			}
			console.log('Zone supprimée avec succès !');
		});
		res.send(200);
	}
};
