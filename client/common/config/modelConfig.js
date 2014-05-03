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
			                "nom":"Quartier",
			                "model":"quartier",
                            "group" : "metier",
			                "libelleIHMListe":"Liste des quartiers",
			                "libelleIHMDetail":"Detail d'un quartier",
			                "libelleIHMAjout":"Ajout d'un quartier",
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
			                "nom":"Ilot",
			                "model":"ilot",
                            "group" : "metier",
			                "libelleIHMListe":"Liste des ilots",
			                "libelleIHMDetail":"Detail d'un ilot",
			                "libelleIHMAjout":"Ajout d'un ilot",
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
					                "nom":"Quartiers",
					                "model":"quartier",
					                "typeChamp":"ArrayObjectId",
					                "champExterne":"quartier"
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
					                "model":"ilot"
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
					                "nom":"Ilot",
					                "model":"ilot",
					                "typeChamp":"ObjectId",
					                "champExterne":"ilot"
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
                            "nom" : "quartier",
                            "indexModel" : 1
                        },
                        {
                            "nom" : "ilot",
                            "indexModel" : 2
                        }
                    ],
                    "test" : [
                        {
                            "nom" : "quartier",
                            "indexModel" : 1
                        },
                        {
                            "nom" : "ilot",
                            "indexModel" : 2
                        }
                    ]
                }
	};

    exports.modelConfig = config;

})(typeof exports === 'undefined' ? this.modelConfig = {} : exports);

