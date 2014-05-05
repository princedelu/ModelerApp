var _ = require('underscore');
var mongoose = require('../database.js');
var config = require('../../client/common/config/modelConfig').modelConfig.models;

module.exports = exports = function(nom) {

    var ObjectJSON = config[nom];

    var modelTrouve = false;
    var listModelNames = mongoose.modelNames();
    _.each(listModelNames, function(modelName) {
            if (ObjectJSON.model == modelName){
                modelTrouve = true;
            }
        });
    if (modelTrouve){
        return mongoose.model(ObjectJSON.model);
    }else{
        
        var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;

        // Création du schéma

        var objetModel = {};
        _.each(ObjectJSON.champs, function(item) {
            var nomChamp = item.model;
		
		    if (nomChamp != "_id"){
			    var typeChamp = item.typeChamp;
	     
			    if(typeChamp=='ObjectId'){
				    var champExterne = item.champExterne;
				    typeChamp={type: Schema.Types.ObjectId,ref:champExterne};
			    }

                if(typeChamp=='ArrayObjectId'){
                    var champExterne = item.champExterne;
				    typeChamp=[{type: Schema.Types.ObjectId,ref:champExterne}];
                } 

                if(typeChamp=='StringNom'){
                    typeChamp='String';
                }

			    objetModel[nomChamp]=typeChamp;
		    }
        });

        var objectSchema = new Schema(objetModel);

        return mongoose.model(ObjectJSON.model, objectSchema);
    }
}
 
