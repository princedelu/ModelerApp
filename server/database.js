var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/modelerapp', function(err) {
	if (err) console.log("Connexion à la BDD en erreur");
	else console.log("Connexion à la BDD OK");
});
module.exports = exports = mongoose;
