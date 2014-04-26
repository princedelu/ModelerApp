var async = require("async"),
    _ =           require('underscore'),
    config = require('../../client/common/javascript/modelConfig').modelConfig.models,
    groups = require('../../client/common/javascript/modelConfig').modelConfig.groups;

module.exports = exports = function(group) {

    var fonctions = {
	    get: function(req, res) {
            recupItem(0,groups[group],function(result){
                            var output={};
                            output['name'] = group;
                            output['children'] = result;
                            res.json(output);
                        }
            );        
        }
    };

    return fonctions;
};

function recupItem(indexItem,groupsItem,callbackMethod,indexItemParent,idParent){
        var result = [];
        var indexTableau = 0;
        var Object = require('../models/Model.js')(groupsItem[indexItem].indexModel);
        var ObjectJSON = config[groupsItem[indexItem].indexModel];

        var query = Object.find();

         if (typeof indexItemParent != "undefined") {
            var ObjectJSONParent = config[groupsItem[indexItemParent].indexModel];
            query.where(ObjectJSONParent.model, idParent);
        }
        query.exec(function (err, listElement) {
             if (err) { 
                res.send(403,'Erreur interne'); 
             }else{                  
                async.each(listElement, function(element,callbackEach) {
                   
                    async.series([
                        function(callback){
                            if (indexItem < groupsItem.length -1){
                                recupItem(indexItem + 1,groupsItem,function(resultat){
                                         callback(null,resultat);
                                     },
                                     indexItem,element._id
                                );
                            }else{
                                callback();
                            }
                        },
                        function(callback){
                            callback(null,element.nom);
                        }
                    ],
                    // optional callback
                    function(err, results){
                        var item = {};
                        item['name'] = results[1];
                        if (results[0] instanceof Array && results[0].length != 0 ) {
                            item['children']=results[0];
                        }else{
                            item['size']=50;
                        }
                        result[indexTableau] = item;
                        indexTableau++;
                        callbackEach();
                    });
                }, function(err){
                    if( err ) {
                        res.send(403,'Erreur interne'); 
                    }else{
                        callbackMethod(result);
                    }
                });                
             }
        });
    }
