var Zone
	,mongoose = require('../database.js');

// Création du schéma pour les zones
var zoneSchema = new mongoose.Schema({
	nom : { type : String },
	description : String 
});

module.exports = exports = mongoose.model('zones', zoneSchema);
