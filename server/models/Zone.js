var Zone
	,mongoose = require('../database.js');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// Création du schéma pour les zones
var zoneSchema = new Schema({
	nom : { type : String },
	description : String 
});

module.exports = exports = mongoose.model('zone', zoneSchema);
