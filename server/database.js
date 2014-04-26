var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

mongoose.connect(process.env.DATABASE_CONNECTION_STRING || 'mongodb://localhost/modelerapp', function(err) {
	if (err) console.log("Connexion à la BDD en erreur");
	else console.log("Connexion à la BDD OK");
});
module.exports = exports = mongoose;
