var _ = require('underscore');
var mongoose = require('../database.js');
var config = require('../../client/common/config/modelConfig').modelConfig.models;

module.exports = exports = function(index) {

    var ObjectJSON = config[index];

    var modelTrouve = false;
    var listModelNames = mongoose.modelNames();
    _.each(listModelNames, function(modelName) {
            if (ObjectJSON.model == modelName){
                modelTrouve = true;
            }
        });
    if (modelTrouve == true){
        return mongoose.model(ObjectJSON.model);
    }else{
        
        var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;

        // Création du schéma

        var objetModel = {};
        for(var indexChamps=0;indexChamps<ObjectJSON.champs.length;indexChamps++){
            var nomChamp = ObjectJSON.champs[indexChamps].model;
		
		    if (nomChamp != "_id"){
			    var typeChamp = ObjectJSON.champs[indexChamps].typeChamp;
	     
			    if(typeChamp=='ObjectId'){
				    var champExterne = ObjectJSON.champs[indexChamps].champExterne;
				    typeChamp={type: Schema.Types.ObjectId,ref:champExterne};
			    } 

			    objetModel[nomChamp]=typeChamp;
		    }
        }

        var objectSchema = new Schema(objetModel);

        return mongoose.model(ObjectJSON.model, objectSchema);
    }
}
 
