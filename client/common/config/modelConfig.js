(function(exports){

    var config = {
                    "models" : {
                        "index" : [
                            { "nom" : "Zone" },
                            { "nom" : "Quartier"},
                            { "nom" : "Ilot"},
                            { "nom" : "Application"}
                         ],
                        "Zone" : 
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
				                    "typeChamp":"StringNom"
			                    },
			                    {
				                    "nom":"Description",
				                    "model":"description",
				                    "typeChamp":"String"
			                    }
		                    ]
	                    },
                        "Quartier" :
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
				                    "typeChamp":"StringNom"
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
                        "Ilot" : 
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
				                    "typeChamp":"StringNom"
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
                        "Application" : 
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
				                    "typeChamp":"StringNom"
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
                    },
                "groups" : {
                    "index" : [
                        { "nom" : "metier"},
                        { "nom" : "test"}
                    ],
                    "metier" : [
                        {
                            "nom" : "Zone"
                        },
                        {
                            "nom" : "Quartier"
                        },
                        {
                            "nom" : "Ilot"
                        }
                    ],
                    "test" : [
                        {
                            "nom" : "Quartier"
                        },
                        {
                            "nom" : "Ilot"
                        }
                    ]
                }
	};

    exports.modelConfig = config;

})(typeof exports === 'undefined' ? this.modelConfig = {} : exports);

