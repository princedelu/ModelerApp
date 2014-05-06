(function(exports){

    var config = {
                    "models" : {
                        "index" : [
                            { "nom" : "Zone" },
                            { "nom" : "Quartier"},
                            { "nom" : "Ilot"},
                            { "nom" : "Application"},
                            { "nom" : "Canal" }
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
				                    "typeChamp":"StringNom",
                                    "afficheList" : true
			                    },
			                    {
				                    "nom":"Description",
				                    "model":"description",
				                    "typeChamp":"String",
                                    "afficheList" : true
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
				                    "typeChamp":"StringNom",
                                    "afficheList" : true
			                    },
			                    {
				                    "nom":"Description",
				                    "model":"description",
				                    "typeChamp":"String",
                                    "afficheList" : true
			                    },
			                    {
				                    "nom":"Zone",
				                    "model":"zone",
				                    "typeChamp":"ObjectId",
				                    "champExterne":"zone",
                                    "afficheList" : true
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
				                    "typeChamp":"StringNom",
                                    "afficheList" : true
			                    },
			                    {
				                    "nom":"Description",
				                    "model":"description",
				                    "typeChamp":"String",
                                    "afficheList" : true
			                    },
			                    {
				                    "nom":"Quartiers",
				                    "model":"quartier",
				                    "typeChamp":"ArrayObjectId",
				                    "champExterne":"quartier",
                                    "afficheList" : true
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
			                    },
                                {
				                    "model":"canal"
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
				                    "typeChamp":"StringNom",
                                    "afficheList" : true
			                    },
			                    {
				                    "nom":"Description",
				                    "model":"description",
				                    "typeChamp":"String",
                                    "afficheList" : true
			                    },
			                    {
				                    "nom":"Ilot",
				                    "model":"ilot",
				                    "typeChamp":"ObjectId",
				                    "champExterne":"ilot",
                                    "afficheList" : true
			                    },
			                    {
				                    "nom":"Canal",
				                    "model":"canal",
				                    "typeChamp":"ObjectId",
				                    "champExterne":"canal",
                                    "afficheList" : false
			                    }
		                    ]
	                    },
                        "Canal" : 
	                    {
		                    "nom":"Canal",
		                    "model":"canal",
                            "group" : "applicatif",
		                    "libelleIHMListe":"Liste des canaux",
		                    "libelleIHMDetail":"Detail d'un canal",
		                    "libelleIHMAjout":"Ajout d'un canal",
		                    "populate":[
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
				                    "typeChamp":"StringNom",
                                    "afficheList" : true
			                    },
			                    {
				                    "nom":"Description",
				                    "model":"description",
				                    "typeChamp":"String",
                                    "afficheList" : true
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

