(function(exports){

    var config = [
		{
			"nom":"Zone",
			"model":"zone",
			"libelleIHMListe":"Liste des zones",
			"libelleIHMDétail":"Détail d'une zone",
			"libelleIHMAjout":"Ajout d'une zone",
			 "populate":[],
			"champs":[
				{
					"nom":"Id",
					"model":"_id",
					"typeChamp":"ObjectId",
					"typeHTML":"hidden"
				},
				{
					"nom":"Nom",
					"model":"nom",
					"typeChamp":"String",
					"typeHTML":"input-text",
					"placeHolder":"Nom",
					"obligatoire":"Oui",
					"longueurMin":1,
					"longueurMax":20,
					"autoFocus":"Oui"
				},
				{
					"nom":"Description",
					"model":"description",
					"typeChamp":"String",
					"typeHTML":"textarea",
					"placeHolder":"Description",
					"obligatoire":"Oui",
					"longueurMin":1,
					"longueurMax":60,
					"autoFocus":"Non"
				}
			]
		},
		{
			"nom":"Bloc",
			"model":"bloc",
			"libelleIHMListe":"Liste des blocs",
			"libelleIHMDétail":"Détail d'un bloc",
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
					"typeChamp":"ObjectId",
					"typeHTML":"hidden"
				},
				{
					"nom":"Nom",
					"model":"nom",
					"typeChamp":"String",
					"typeHTML":"input-text",
					"placeHolder":"Nom",
					"obligatoire":"Oui",
					"longueurMin":1,
					"longueurMax":20,
					"autoFocus":"Oui"
				},
				{
					"nom":"Description",
					"model":"description",
					"typeChamp":"String",
					"typeHTML":"textarea",
					"placeHolder":"Description",
					"obligatoire":"Oui",
					"longueurMin":1,
					"longueurMax":60,
					"autoFocus":"Non"
				},
				{
					"nom":"Zone",
					"model":"zone",
					"typeChamp":"ObjectId",
					"champExterne":"zone",
					"typeHTML":"select",
					"obligatoire":"Oui",
					"autoFocus":"Non"
				}
			]
		},
		{
			"nom":"Quartier",
			"model":"quartier",
			"libelleIHMListe":"Liste des quartiers",
			"libelleIHMDétail":"Détail d'un quartier",
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
					"typeChamp":"ObjectId",
					"typeHTML":"hidden"
				},
				{
					"nom":"Nom",
					"model":"nom",
					"typeChamp":"String",
					"typeHTML":"input-text",
					"placeHolder":"Nom",
					"obligatoire":"Oui",
					"longueurMin":1,
					"longueurMax":20,
					"autoFocus":"Oui"
				},
				{
					"nom":"Description",
					"model":"description",
					"typeChamp":"String",
					"typeHTML":"textarea",
					"placeHolder":"Description",
					"obligatoire":"Oui",
					"longueurMin":1,
					"longueurMax":60,
					"autoFocus":"Non"
				},
				{
					"nom":"Bloc",
					"model":"bloc",
					"typeChamp":"ObjectId",
					"champExterne":"bloc",
					"typeHTML":"select",
					"obligatoire":"Oui",
					"autoFocus":"Non"
				}
			]
		}
	];


    exports.modelConfig = config;

})(typeof exports === 'undefined' ? this['modelConfig'] = {} : exports);