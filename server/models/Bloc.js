var Bloc
	,mongoose = require('../database.js');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
// Création du schéma pour les blocs
var blocSchema = new Schema({
	nom : { type : String },
	description : String 
});

module.exports = exports = mongoose.model('blocs', blocSchema);
