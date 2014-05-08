(function(exports){

    var config = {
                    "config" : {
                        "accordionCloseOther" : false,
                        "isOpenAccordion" : true 
                    },
                    "models" : {
                        "typeElements" : [
                            { "nom" : "param",
                              "texte" : "Liste des entités"
                            },
                            { "nom" : "config",
                              "texte" : "Liste des configurations"
                            }
                        ],
                        "index" : [
                            { "nom" : "Zone" , "type" : "param" },
                            { "nom" : "Quartier" , "type" : "param" },
                            { "nom" : "Ilot" , "type" : "param" },
                            { "nom" : "Application" , "type" : "param" },
                            { "nom" : "Composant" , "type" : "param" },
                            { "nom" : "Canal" , "type" : "config" },
                            { "nom" : "TypeComposant" , "type" : "config" },
                            { "nom" : "Editeur" , "type" : "config" },
                            { "nom" : "Logiciel" , "type" : "config" },
                            { "nom" : "TypeCluster" , "type" : "config" },
                            { "nom" : "Site" , "type" : "config" },
                            { "nom" : "TypeInfra" , "type" : "config" },
                            { "nom" : "Constructeur" , "type" : "config" },
                            { "nom" : "Os" , "type" : "config" }
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
                                    "afficheList" : true,
                                    "type" : "text",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 20,
                                    "texteRequired" : "Un nom est requis",
                                    "texteMinLength" : "Le nom doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "Le nom doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Description",
				                    "model":"description",
				                    "typeChamp":"String",
                                    "afficheList" : true,
                                    "type" : "textarea",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 60,
                                    "texteRequired" : "Une description est requise",
                                    "texteMinLength" : "La description doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "La description doit avoir une longueur maximale de "
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
                                    "afficheList" : true,
                                    "type" : "text",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 20,
                                    "texteRequired" : "Un nom est requis",
                                    "texteMinLength" : "Le nom doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "Le nom doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Description",
				                    "model":"description",
				                    "typeChamp":"String",
                                    "afficheList" : true,
                                    "type" : "textarea",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 60,
                                    "texteRequired" : "Une description est requise",
                                    "texteMinLength" : "La description doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "La description doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Zone",
				                    "model":"zone",
				                    "typeChamp":"ObjectId",
				                    "champExterne":"zone",                                    
                                    "listeElement":"zones",
                                    "afficheList" : true,
                                    "type" : "select",
                                    "required" : "true",
                                    "texteRequired" : "Une zone est requise"
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
                                    "afficheList" : true,
                                    "type" : "text",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 20,
                                    "texteRequired" : "Un nom est requis",
                                    "texteMinLength" : "Le nom doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "Le nom doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Description",
				                    "model":"description",
				                    "typeChamp":"String",
                                    "afficheList" : true,
                                    "type" : "textarea",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 60,
                                    "texteRequired" : "Une description est requise",
                                    "texteMinLength" : "La description doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "La description doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Quartiers",
				                    "model":"quartier",
				                    "typeChamp":"ArrayObjectId",
				                    "champExterne":"quartier",
                                    "listeElement":"quartiers",
                                    "afficheList" : true,
                                    "type" : "selectMultiple",
                                    "required" : "true",
                                    "texteRequired" : "Un quartier est requis"
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
			                    },
                                {
				                    "model":"composant"
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
                                    "afficheList" : true,
                                    "type" : "text",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 20,
                                    "texteRequired" : "Un nom est requis",
                                    "texteMinLength" : "Le nom doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "Le nom doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Description",
				                    "model":"description",
				                    "typeChamp":"String",
                                    "afficheList" : true,
                                    "type" : "textarea",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 60,
                                    "texteRequired" : "Une description est requise",
                                    "texteMinLength" : "La description doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "La description doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Ilot",
				                    "model":"ilot",
				                    "typeChamp":"ObjectId",
				                    "champExterne":"ilot",
                                    "listeElement":"ilots",
                                    "afficheList" : true,
                                    "type" : "select",
                                    "required" : "true",
                                    "texteRequired" : "Un ilot est requis"
			                    },
			                    {
				                    "nom":"Canal",
				                    "model":"canal",
				                    "typeChamp":"ObjectId",
				                    "champExterne":"canal",
                                    "listeElement":"canals",
                                    "afficheList" : true,
                                    "type" : "select",
                                    "required" : "true",
                                    "texteRequired" : "Un canal est requis"
			                    },
			                    {
				                    "nom":"Composants",
				                    "model":"composant",
				                    "typeChamp":"ArrayObjectId",
				                    "champExterne":"composant",
                                    "afficheList" : false,
                                    "listeElement":"composants",
                                    "afficheList" : true,
                                    "type" : "selectMultiple",
                                    "required" : "true",
                                    "texteRequired" : "Un composant est requis"
			                    }
		                    ]
	                    },
                        "Composant" : 
	                    {
		                    "nom":"Composant",
		                    "model":"composant",
                            "group" : "applicatif",
		                    "libelleIHMListe":"Liste des composants",
		                    "libelleIHMDetail":"Detail d'un composant",
		                    "libelleIHMAjout":"Ajout d'un composant",
		                    "populate":[
                                {
				                    "model":"typecomposant"
			                    },
                                {
				                    "model":"logiciel"
			                    },
                                {
                                    "model" : "typecluster"
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
                                    "afficheList" : true,
                                    "type" : "text",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 20,
                                    "texteRequired" : "Un nom est requis",
                                    "texteMinLength" : "Le nom doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "Le nom doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Description",
				                    "model":"description",
				                    "typeChamp":"String",
                                    "afficheList" : true,
                                    "type" : "textarea",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 60,
                                    "texteRequired" : "Une description est requise",
                                    "texteMinLength" : "La description doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "La description doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Type de composant",
				                    "model":"typecomposant",
				                    "typeChamp":"ObjectId",
				                    "champExterne":"typecomposant",
                                    "listeElement":"typecomposants",
                                    "afficheList" : true,
                                    "type" : "select",
                                    "required" : "true",
                                    "texteRequired" : "Un type de composant est requis"
			                    },
			                    {
				                    "nom":"Logiciel",
				                    "model":"logiciel",
				                    "typeChamp":"ObjectId",
				                    "champExterne":"logiciel",
                                    "listeElement":"logiciels",
                                    "afficheList" : true,
                                    "type" : "select",
                                    "required" : "true",
                                    "texteRequired" : "Un logiciel est requis"
			                    },
			                    {
				                    "nom":"Version du composant",
				                    "model":"version",
				                    "typeChamp":"String",
                                    "afficheList" : true,
                                    "type" : "text",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 20,
                                    "texteRequired" : "Une version est requise",
                                    "texteMinLength" : "La version doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "La version doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Cluster",
				                    "model":"cluster",
				                    "typeChamp":"Boolean",
                                    "afficheList" : false,
                                    "type" : "checkbox"
			                    },
			                    {
				                    "nom":"Type de cluster",
				                    "model":"typecluster",
				                    "typeChamp":"ObjectId",
				                    "champExterne":"typecluster",
                                    "listeElement":"typeclusters",
                                    "afficheList" : false,
                                    "type" : "select",
                                    "conditionAffichage" : "cluster"
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
                                    "afficheList" : true,
                                    "type" : "text",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 20,
                                    "texteRequired" : "Un nom est requis",
                                    "texteMinLength" : "Le nom doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "Le nom doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Description",
				                    "model":"description",
				                    "typeChamp":"String",
                                    "afficheList" : true,
                                    "type" : "textarea",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 60,
                                    "texteRequired" : "Une description est requise",
                                    "texteMinLength" : "La description doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "La description doit avoir une longueur maximale de "
			                    }
		                    ]
	                    },
                        "TypeComposant" : 
	                    {
		                    "nom":"Type composant",
		                    "model":"typecomposant",
                            "group" : "applicatif",
		                    "libelleIHMListe":"Liste des types de composants",
		                    "libelleIHMDetail":"Detail d'un type de composant",
		                    "libelleIHMAjout":"Ajout d'un type de composant",
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
                                    "afficheList" : true,
                                    "type" : "text",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 20,
                                    "texteRequired" : "Un nom est requis",
                                    "texteMinLength" : "Le nom doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "Le nom doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Description",
				                    "model":"description",
				                    "typeChamp":"String",
                                    "afficheList" : true,
                                    "type" : "textarea",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 60,
                                    "texteRequired" : "Une description est requise",
                                    "texteMinLength" : "La description doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "La description doit avoir une longueur maximale de "
			                    }
		                    ]
	                    },
                        "Editeur" : 
	                    {
		                    "nom":"Editeur",
		                    "model":"editeur",
                            "group" : "editeur",
		                    "libelleIHMListe":"Liste des editeurs",
		                    "libelleIHMDetail":"Detail d'un editeur",
		                    "libelleIHMAjout":"Ajout d'un editeur",
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
                                    "afficheList" : true,
                                    "type" : "text",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 20,
                                    "texteRequired" : "Un nom est requis",
                                    "texteMinLength" : "Le nom doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "Le nom doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Description",
				                    "model":"description",
				                    "typeChamp":"String",
                                    "afficheList" : true,
                                    "type" : "textarea",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 60,
                                    "texteRequired" : "Une description est requise",
                                    "texteMinLength" : "La description doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "La description doit avoir une longueur maximale de "
			                    }
		                    ]
	                    },
                        "Logiciel" : 
	                    {
		                    "nom":"Logiciel",
		                    "model":"logiciel",
                            "group" : "applicatif",
		                    "libelleIHMListe":"Liste des logiciel",
		                    "libelleIHMDetail":"Detail d'un logiciel",
		                    "libelleIHMAjout":"Ajout d'un logiciel",
		                    "populate":[
                                {
				                    "model":"editeur"
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
                                    "afficheList" : true,
                                    "type" : "text",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 20,
                                    "texteRequired" : "Un nom est requis",
                                    "texteMinLength" : "Le nom doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "Le nom doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Description",
				                    "model":"description",
				                    "typeChamp":"String",
                                    "afficheList" : true,
                                    "type" : "textarea",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 60,
                                    "texteRequired" : "Une description est requise",
                                    "texteMinLength" : "La description doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "La description doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Editeur",
				                    "model":"editeur",
				                    "typeChamp":"ObjectId",
				                    "champExterne":"editeur",
                                    "listeElement":"editeurs",
                                    "afficheList" : true,
                                    "type" : "select",
                                    "required" : "true",
                                    "texteRequired" : "Un edtieur est requis"
			                    },
			                    {
				                    "nom":"Version",
				                    "model":"version",
				                    "typeChamp":"String",
                                    "afficheList" : true,
                                    "type" : "text",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 20,
                                    "texteRequired" : "Une version est requise",
                                    "texteMinLength" : "La version doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "La version doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Date de fin de support",
				                    "model":"datefinsupport",
				                    "typeChamp":"Date",
                                    "afficheList" : true,
                                    "type" : "date",
                                    "required" : "true",
                                    "texteRequired" : "Une date de fin de support est requise"
			                    }
		                    ]
	                    },
                        "TypeCluster" : 
	                    {
		                    "nom":"Type de cluster",
		                    "model":"typecluster",
                            "group" : "config",
		                    "libelleIHMListe":"Liste des types de clusters",
		                    "libelleIHMDetail":"Detail d'un type de cluster",
		                    "libelleIHMAjout":"Ajout d'un type de cluster",
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
                                    "afficheList" : true,
                                    "type" : "text",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 20,
                                    "texteRequired" : "Un nom est requis",
                                    "texteMinLength" : "Le nom doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "Le nom doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Description",
				                    "model":"description",
				                    "typeChamp":"String",
                                    "afficheList" : true,
                                    "type" : "textarea",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 60,
                                    "texteRequired" : "Une description est requise",
                                    "texteMinLength" : "La description doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "La description doit avoir une longueur maximale de "
			                    }
		                    ]
	                    },
                        "Site" : 
	                    {
		                    "nom":"Site",
		                    "model":"site",
                            "group" : "config",
		                    "libelleIHMListe":"Liste des sites",
		                    "libelleIHMDetail":"Detail d'un site",
		                    "libelleIHMAjout":"Ajout d'un site",
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
                                    "afficheList" : true,
                                    "type" : "text",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 20,
                                    "texteRequired" : "Un nom est requis",
                                    "texteMinLength" : "Le nom doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "Le nom doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Description",
				                    "model":"description",
				                    "typeChamp":"String",
                                    "afficheList" : true,
                                    "type" : "textarea",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 60,
                                    "texteRequired" : "Une description est requise",
                                    "texteMinLength" : "La description doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "La description doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Societe",
				                    "model":"societe",
				                    "typeChamp":"String",
                                    "afficheList" : true,
                                    "type" : "text",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 60,
                                    "texteRequired" : "Une société est requise",
                                    "texteMinLength" : "La société doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "La société doit avoir une longueur maximale de "
			                    }
		                    ]
	                    },
                        "TypeInfra" : 
	                    {
		                    "nom":"Type d'infrastructures",
		                    "model":"typeinfra",
                            "group" : "config",
		                    "libelleIHMListe":"Liste des types d'infrastructures",
		                    "libelleIHMDetail":"Detail d'un type d'infrastructures",
		                    "libelleIHMAjout":"Ajout d'un type d'infrastructures",
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
                                    "afficheList" : true,
                                    "type" : "text",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 20,
                                    "texteRequired" : "Un nom est requis",
                                    "texteMinLength" : "Le nom doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "Le nom doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Description",
				                    "model":"description",
				                    "typeChamp":"String",
                                    "afficheList" : true,
                                    "type" : "textarea",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 60,
                                    "texteRequired" : "Une description est requise",
                                    "texteMinLength" : "La description doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "La description doit avoir une longueur maximale de "
			                    }
		                    ]
	                    },
                        "Constructeur" : 
	                    {
		                    "nom":"Constructeur",
		                    "model":"constructeur",
                            "group" : "config",
		                    "libelleIHMListe":"Liste des constructeurs",
		                    "libelleIHMDetail":"Detail d'un constructeur",
		                    "libelleIHMAjout":"Ajout d'un constructeur",
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
                                    "afficheList" : true,
                                    "type" : "text",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 20,
                                    "texteRequired" : "Un nom est requis",
                                    "texteMinLength" : "Le nom doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "Le nom doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Description",
				                    "model":"description",
				                    "typeChamp":"String",
                                    "afficheList" : true,
                                    "type" : "textarea",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 60,
                                    "texteRequired" : "Une description est requise",
                                    "texteMinLength" : "La description doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "La description doit avoir une longueur maximale de "
			                    }
		                    ]
	                    },
                        "Os" : 
	                    {
		                    "nom":"Os",
		                    "model":"os",
                            "group" : "config",
		                    "libelleIHMListe":"Liste des os",
		                    "libelleIHMDetail":"Detail d'un os",
		                    "libelleIHMAjout":"Ajout d'un os",
		                    "populate":[
                                {
				                    "model":"editeur"
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
                                    "afficheList" : true,
                                    "type" : "text",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 20,
                                    "texteRequired" : "Un nom est requis",
                                    "texteMinLength" : "Le nom doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "Le nom doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Description",
				                    "model":"description",
				                    "typeChamp":"String",
                                    "afficheList" : true,
                                    "type" : "textarea",
                                    "required" : "true",
                                    "minLength" : 1,
                                    "maxLength" : 60,
                                    "texteRequired" : "Une description est requise",
                                    "texteMinLength" : "La description doit avoir une longueur minimale de ",
                                    "texteMaxLength" : "La description doit avoir une longueur maximale de "
			                    },
			                    {
				                    "nom":"Editeur",
				                    "model":"editeur",
				                    "typeChamp":"ObjectId",
				                    "champExterne":"editeur",
                                    "listeElement":"editeurs",
                                    "afficheList" : true,
                                    "type" : "select",
                                    "required" : "true",
                                    "texteRequired" : "Un edtieur est requis"
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

