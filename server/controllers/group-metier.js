var async = require("async"),
    _ =           require('underscore'),
    config = require('../../client/javascript/modelConfig').modelConfig,
    Zone = require('../models/Model.js')(0),
    Bloc = require('../models/Model.js')(1),
    Quartier = require('../models/Model.js')(2);

module.exports = {
	get: function(req, res) {
        recupItem(0,function(result){
                        var output={};
                        output['name'] = 'Metier';
                        output['children'] = result;
                        res.json(output);
                    }
        );
        
    } 
};

function recupItem(indexItem,callbackMethod,indexItemParent,idParent){
        var result = [];
        var indexTableau = 0;
        var Object = require('../models/Model.js')(indexItem);
        var ObjectJSON = config[indexItem];

        var query = Object.find();

         if (typeof indexItemParent != "undefined") {
            var ObjectJSONParetn = config[indexItemParent];
            query.where(ObjectJSONParetn.model, idParent);
        }
        query.exec(function (err, listElement) {
             if (err) { 
                res.send(403,'Erreur interne'); 
             }else{                  
                async.each(listElement, function(element,callbackEach) {
                   
                    async.series([
                        function(callback){
                            if (indexItem < 2){
                                recupItem(indexItem + 1,function(resultat){
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
