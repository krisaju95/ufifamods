import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsProviderService {

	constants: Object = {
		contributorsList: [
			"krisaju95",
			"FCB17",
			"aNuK3",
			"DizzeeSpellz",
			"aurion17",
			"xyrho_44",
			"KrisDzung276",
			"AmaroWaade",
			"anasie10",
			"Fidel_Gameplay",
			"graysky",
			"iestyn02",
			"karron97",
			"M4rsattack",
			"Mohamadreza",
			"Re_Coded",
			"Tonce",
			"vojasrbin",
			"Xandr92Prog"
		],
		blogPostCategories: [
			"fifa 16",
			"fifa 17",
			"fifa 18",
			"fifa 19",
			"fifa mods",
			"fifa 16 faces",
			"totw",
			"fifa 19 totw",
			"fifa 19 faces"
		],
		countries: {
			ARG: {
				name: 'Argentina'
			},
			BRA: {
				name: 'Brazil'
			},
			ENG: {
				name: 'England'
			},
			ESP: {
				name: 'Spain'
			},
			ITA: {
				name: 'Italy'
			},
			FRA: {
				name: 'France'
			},
			BEL: {
				name: 'Belgium'
			},
			BOS: {
				name: 'Bosnia & Herzegovina'
			},
			GER: {
				name: 'Germany'
			},
			POL: {
				name: 'Poland'
			},
			JAP: {
				name: 'Japan'
			},
			POR: {
				name: 'Portugal'
			},
			URU: {
				name: 'Uruguay'
			},
		}
	}

	getConstant(key: string): any {
		return this.constants[key];
	}
}