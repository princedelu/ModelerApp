var mongoose = require('../database.js');
var config = require('../../client/javascript/config.json');

module.exports = exports = function(index) {

    var ObjectJSON = config[index];
    var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

    // Création du schéma

    var objetModel = {};
    for(var indexChamps=0;indexChamps<ObjectJSON.champs.length;indexChamps++){
        var nomChamp = ObjectJSON.champs[indexChamps].model;
        var valeurChamp = ObjectJSON.champs[indexChamps].typeChamp;
 
        if(valeurChamp=='ObjectId'){
            var champExterne = ObjectJSON.champs[indexChamps].champExterne;
            valeurChamp={type: Schema.Types.ObjectId,ref:champExterne};
        } 

        objetModel[nomChamp]=valeurChamp;
    }

    var objectSchema = new Schema(objetModel);

    return mongoose.model(ObjectJSON.model, objectSchema);
}
 
