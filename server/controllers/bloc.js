var _ = require('underscore'), Bloc = require('../models/Bloc.js'), result;

module.exports = {
	list: function(req, res) {
		Bloc.find(null, function (err, blocs) {
			if (err) { res.send(403,'Erreur interne'); }
			res.send(200,blocs);
		});
	},
	get: function(req, res) {
		var query = Bloc.findOne(null);
		query.where('nom', req.params.nom);
		query.exec(function (err, bloc) {
			if (err) { res.send(403,'Erreur interne'); }
			res.send(200,bloc);
		});
	},
    put: function(req, res) {
        var id = req.body._id;
        var conditions = { _id  : req.body._id };
        var options = { multi: false };
        
        var query = Bloc.findOne(null);
        query.where('nom', req.body.nom);
        query.exec(function(err, bloc) {
            if (err) {
                res.send(403, 'Erreur interne');
            }
            if (bloc != null && bloc._id != id) {
                res.send(403, 'Doublon');
            }else{
                Bloc.update(conditions,{nom : req.body.nom,description : req.body.description },options,function(err) {
                    if (err) {
                        res.send(403, 'Erreur interne')
                    }
                    console.log('Bloc mis à jour avec succès !');
                });
                res.send(200);
            }
        });
    },
	delete : function(req, res) {
		Bloc.remove({
			nom : req.params.nom
		}, function(err) {
			if (err) {
				res.send(403, 'Erreur interne');
			}
			console.log('Bloc supprimé avec succès !');
		});
		res.send(200);
	},
	add : function(req, res) {
		var query = Bloc.findOne(null);
		query.where('nom', req.body.nom);
		query.exec(function(err, bloc) {
			if (err) {
				res.send(403, 'Erreur interne');
			}
			if (bloc != null) {
				res.send(403, 'Doublon');
			}else{
				var bloc = new Bloc({
					nom : req.body.nom,
					description : req.body.description
				});
				bloc.save(function(err) {
					if (err) {
						res.send(403, 'Erreur interne')
					}
					console.log('Bloc ajouté avec succès !');
				});
				res.send(200);
			}
		});
	}
};
