var _ = require('underscore'), Quartier = require('../models/Quartier.js'), result;

module.exports = {
	list: function(req, res) {
		Quartier.find().populate('bloc').exec(function (err, quartiers) {
			if (err) { res.send(403,'Erreur interne'); }
			res.send(200,quartiers);
		})
	},
	get: function(req, res) {
		var query = Quartier.findOne();
		query.where('nom', req.params.nom);
		query.exec(function (err, quartier) {
			if (err) { res.send(403,'Erreur interne'); }
			res.send(200,quartier);
		});
	},
    put: function(req, res) {
        var id = req.body._id;
        var conditions = { _id  : req.body._id };
        var options = { multi: false };
        
        var query = Quartier.findOne(null);
        query.where('nom', req.body.nom);
        query.exec(function(err, quartier) {
            if (err) {
                res.send(403, 'Erreur interne');
            }
            if (quartier != null && quartier._id != id) {
                res.send(403, 'Doublon');
            }else{
                var quartierObject = {
					    nom : req.body.nom,
					    description : req.body.description,
                        bloc : req.body.bloc
				    };
                var quartier = new Quartier(quartierObject);
                if (id==null)
                {
				    quartier.save(function(err) {
					    if (err) {
						    res.send(403, 'Erreur interne')
					    }
					    console.log('Quartier ajouté avec succès !');
				    });
                }else{
                    Quartier.update(conditions,quartierObject,options,function(err) {
                        if (err) {
                            res.send(403, 'Erreur interne')
                        }
                        console.log('Quartier mis à jour avec succès !');
                    });
                }
                res.send(200);
            }
        });
    },
	delete : function(req, res) {
		Quartier.remove({
			nom : req.params.nom
		}, function(err) {
			if (err) {
				res.send(403, 'Erreur interne');
			}
			console.log('Quartier supprimé avec succès !');
		});
		res.send(200);
	}
};
