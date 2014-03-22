var Quartier
	,mongoose = require('../database.js');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
// Création du schéma pour les blocs
var quartierSchema = new Schema({
	nom : { type : String },
	description : String,
	bloc : {type: Schema.Types.ObjectId,ref: 'bloc'}
});

module.exports = exports = mongoose.model('quartier', quartierSchema);
