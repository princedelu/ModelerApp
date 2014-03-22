var Bloc
	,mongoose = require('../database.js');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
// Création du schéma pour les blocs
var blocSchema = new Schema({
	nom : { type : String },
	description : String,
	zone : {type: Schema.Types.ObjectId,ref: 'zone'}
});

module.exports = exports = mongoose.model('bloc', blocSchema);
