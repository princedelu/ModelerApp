var _ =           require('underscore')
    , Zone =      require('../models/Zone.js')
    , result ;

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
	delete : function(req, res) {
	    Zone.remove({nom : req.params.nom},function (err) {
	      if (err) { res.send(403,'Erreur interne'); }
	      console.log('Zone supprimée avec succès !');
	    });
        res.send(200);
    },
	add : function(req, res) {
	    var zone = new Zone({nom : req.body.nom, description : req.body.description});
	    zone.save(function (err) {
	      if (err) { res.send(403,'Erreur interne') }
	      console.log('Zone ajoutée avec succès !');
	    });
        res.send(200);
    }
};
