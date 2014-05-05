var config = require('../../client/common/config/modelConfig').modelConfig.models;
var _ = require('underscore');

module.exports = exports = function(nom) {

    var ObjectJSON = config[nom];
    var ObjectType = require('../models/Model.js')(nom);

    var fonctions = {
        list: function(req, res) {
           var query =  ObjectType.find();
           _.each(ObjectJSON.populate, function(item) {
                query.populate(item.model);
           });
           query.exec(function (err, objet) {
                if (err) { res.send(403,'Erreur interne'); }
                res.send(200,objet);
            });
        },
        get: function(req, res) {
            var query = ObjectType.findOne();
            query.where('nom', req.params.nom);
            query.exec(function (err, objet) {
                if (err) { res.send(403,'Erreur interne'); }
                res.send(200,objet);
            });
        },
        put: function(req, res) {
            var id = req.body._id;
            var conditions = { _id  : req.body._id };
            var options = { multi: false };
            
            var query = ObjectType.findOne(null);
            query.where('nom', req.body.nom);
            query.exec(function(err, objet) {
                if (err) {
                    res.send(403, 'Erreur interne');
                }
                if (objet != null && objet._id != id) {
                    res.send(403, 'Doublon');
                }else{
					var objetModel = {};
					_.each(ObjectJSON.champs, function(item) {
						var modelChamp = item.model;
						if (modelChamp != "_id") {
							objetModel[modelChamp]=req.body[modelChamp];
						}
					});
                    var objet = new ObjectType(objetModel);
                    if (id==null)
                    {
	                    objet.save(function(err) {
		                    if (err) {
			                    res.send(403, 'Erreur interne')
		                    }
		                    console.log(ObjectJSON.nom + ' ajouté avec succès !');
	                    });
                    }else{
                        ObjectType.update(conditions,objetModel,options,function(err) {
                            if (err) {
                                res.send(403, 'Erreur interne')
                            }
                            console.log(ObjectJSON.nom + ' mis à jour avec succès !');
                        });
                    }
                    res.send(200);
                }
            });
        },
        delete : function(req, res) {
            ObjectType.remove({
                nom : req.params.nom
            }, function(err) {
                if (err) {
	                res.send(403, 'Erreur interne');
                }
                console.log(ObjectJSON.nom + ' supprimé avec succès !');
            });
            res.send(200);
        }
    };

    return fonctions;
}
