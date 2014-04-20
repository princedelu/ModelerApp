(function(exports){

    var config = {
                    "models" : 
                    [
		                {
			                "nom":"Zone",
			                "model":"zone",
                            "group" : "metier",
			                "libelleIHMListe":"Liste des zones",
			                "libelleIHMDetail":"Detail d'une zone",
			                "libelleIHMAjout":"Ajout d'une zone",
			                "populate":[],
			                "champs":[
				                {
					                "nom":"Id",
					                "model":"_id",
					                "typeChamp":"ObjectId"
				                },
				                {
					                "nom":"Nom",
					                "model":"nom",
					                "typeChamp":"String",
                                    "typeHTML" : "inputtext"
				                },
				                {
					                "nom":"Description",
					                "model":"description",
					                "typeChamp":"String",
                                    "typeHTML" : "textarea"
				                }
			                ]
		                },
		                {
			                "nom":"Bloc",
			                "model":"bloc",
                            "group" : "metier",
			                "libelleIHMListe":"Liste des blocs",
			                "libelleIHMDetail":"Detail d'un bloc",
			                "libelleIHMAjout":"Ajout d'un bloc",
			                "populate":[
				                {
					                "model":"zone"
				                }
			                ],
			                "champs":[
				                {
					                "nom":"Id",
					                "model":"_id",
					                "typeChamp":"ObjectId"
				                },
				                {
					                "nom":"Nom",
					                "model":"nom",
					                "typeChamp":"String"
				                },
				                {
					                "nom":"Description",
					                "model":"description",
					                "typeChamp":"String"
				                },
				                {
					                "nom":"Zone",
					                "model":"zone",
					                "typeChamp":"ObjectId",
					                "champExterne":"zone"
				                }
			                ]
		                },
		                {
			                "nom":"Quartier",
			                "model":"quartier",
                            "group" : "metier",
			                "libelleIHMListe":"Liste des quartiers",
			                "libelleIHMDetail":"Detail d'un quartier",
			                "libelleIHMAjout":"Ajout d'un quartier",
			                "populate":[
				                {
					                "model":"bloc"
				                }
			                ],
			                "champs":[
				                {
					                "nom":"Id",
					                "model":"_id",
					                "typeChamp":"ObjectId"
				                },
				                {
					                "nom":"Nom",
					                "model":"nom",
					                "typeChamp":"String"
				                },
				                {
					                "nom":"Description",
					                "model":"description",
					                "typeChamp":"String"
				                },
				                {
					                "nom":"Bloc",
					                "model":"bloc",
					                "typeChamp":"ObjectId",
					                "champExterne":"bloc"
				                }
			                ]
		                },
		                {
			                "nom":"Application",
			                "model":"application",
                            "group" : "applicatif",
			                "libelleIHMListe":"Liste des applications",
			                "libelleIHMDetail":"Detail d'une application",
			                "libelleIHMAjout":"Ajout d'une application",
			                "populate":[
				                {
					                "model":"quartier"
				                }
			                ],
			                "champs":[
				                {
					                "nom":"Id",
					                "model":"_id",
					                "typeChamp":"ObjectId"
				                },
				                {
					                "nom":"Nom",
					                "model":"nom",
					                "typeChamp":"String"
				                },
				                {
					                "nom":"Description",
					                "model":"description",
					                "typeChamp":"String"
				                },
				                {
					                "nom":"Quartier",
					                "model":"quartier",
					                "typeChamp":"ObjectId",
					                "champExterne":"quartier"
				                }
			                ]
		                }
                    ],
                "groups" : {
                    "index" : [
                        { "nom" : "metier"},
                        { "nom" : "test"}
                    ],
                    "metier" : [
                        {
                            "nom" : "zone",
                            "indexModel" : 0
                        },
                        {
                            "nom" : "bloc",
                            "indexModel" : 1
                        },
                        {
                            "nom" : "quartier",
                            "indexModel" : 2
                        }
                    ],
                    "test" : [
                        {
                            "nom" : "bloc",
                            "indexModel" : 1
                        },
                        {
                            "nom" : "quartier",
                            "indexModel" : 2
                        }
                    ]
                }
	};


    exports.modelConfig = config;

})(typeof exports === 'undefined' ? this['modelConfig'] = {} : exports);
