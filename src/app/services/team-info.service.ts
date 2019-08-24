import { Injectable } from '@angular/core';

@Injectable()
export class TeamInfoService {

	teamMembers: Object = {
		"krisaju95": {
			handle: "krisaju95",
			realName: "Arjun Krishnamoorthy",
			nationality: "IND",
			roles: [
				"Star-head Designer",
				"Website Moderator",
				"Support Team Member"
			],
			interests: [
				"football",
				"FIFA",
				"music",
				"design",
				"arsenal"
			],
			kitNumber: 10,
			kitName: "kris",
			title: "Captain"
		},
		"xyrho_44": {
			handle: "xyrho_44",
			realName: "Jordan Liem",
			nationality: "IDN",
			roles: [
				"Star-head Designer"
			],
			interests: [
				"basketball",
				"football",
				"videoGames"
			],
			kitNumber: 44,
			kitName: "xyrho",
			title: "Vice-Captain"
		},
		"FCB17": {
			handle: "FCB17",
			realName: "Perry",
			nationality: "TTO",
			roles: [
				"Star-head Designer"
			],
			interests: [
				"basketball",
				"football",
				"videoGames"
			],
			kitNumber: 26,
			kitName: "Perry",
			title: "Super-star"
		},
		"aNuK3": {
			handle: "aNuK3",
			realName: "Julian Mihai Ivanuca",
			nationality: "ROU",
			roles: [
				"Star-head Designer"
			],
			interests: [
				"family",
				"football",
				"FIFA"
			],
			kitNumber: 9,
			kitName: "anuke",
			title: "Fan Favourite"
		},
		"DizzeeSpellz": {
			handle: "DizzeeSpellz",
			realName: "Daniel Short",
			nationality: "WAL",
			roles: [
				"Star-head Designer"
			],
			interests: [
				"liverpool",
				"football",
				"fut",
				"imFromWales"
			],
			kitNumber: 8,
			kitName: "dizzee",
			title: "Perfectionist"
		},
		"aurion17": {
			handle: "aurion17",
			realName: "Antonio Grifoni",
			nationality: "ITA",
			roles: [
				"Star-head Designer"
			],
			interests: [
				"music",
				"art",
				"football",
				"asroma",
				"arsenal"
			],
			kitNumber: 17,
			kitName: "aurion",
			title: "Changing Room DJ"
		},
		"KrisDzung276": {
			handle: "KrisDzung276",
			realName: "Phạm Duy Dũng",
			nationality: "VNM",
			roles: [
				"Star-head Designer"
			],
			interests: [
				"football",
				"FIFA"
			],
			kitNumber: 6,
			kitName: "krisdzung",
			title: "Defensive Wall"
		},
		"AmaroWaade": {
			handle: "AmaroWaade",
			realName: "Giuseppe Ambretti",
			nationality: "ITA",
			roles: [
				"Star-head Designer"
			],
			interests: [
				"evaMendes",
				"chocolate",
				"music"
			],
			kitNumber: 21,
			kitName: "beppe",
			title: "Trickster"
		},
		"anasie10": {
			handle: "anasie10",
			realName: "El Ghachtoul Anas",
			nationality: "MAR",
			roles: [
				"Star-head Designer"
			],
			interests: [
				"utopist",
				"IT"
			],
			kitNumber: 14,
			kitName: "anas",
			title: "Dribbler"
		},
		"Fidel_Gameplay": {
			handle: "Fidel_Gameplay",
			realName: "",
			nationality: "",
			roles: [
				"Gameplay Editor",
				"Custom Game Mods"
			],
			interests: [
				"music",
				"FIFA"
			],
			kitNumber: 11,
			kitName: "dr. fidel",
			title: "Creator"
		},
		"graysky": {
			handle: "graysky",
			realName: "Giacomo Grillo",
			nationality: "ITA",
			roles: [
				"Jersey Designer"
			],
			interests: [
				"fishing",
				"dogs",
				"FIFA"
			],
			kitNumber: 19,
			kitName: "graysky",
			title: "Speedster"
		},
		"karron97": {
			handle: "karron97",
			realName: "Juan P. Feliciano",
			nationality: "COL",
			roles: [
				"Star-head Designer"
			],
			interests: [
				"movies",
				"football",
				"videoGames",
				"music",
				"acmilan"
			],
			kitNumber: 97,
			kitName: "karron",
			title: "Linch-pin"
		},
		"iestyn02": {
			handle: "iestyn02",
			realName: "Iestyn Dalli",
			nationality: "MLT",
			roles: [
				"Jersey Designer"
			],
			interests: [
				"webDevelopment",
				"football"
			],
			kitNumber: 2,
			kitName: "iestyn",
			title: "Target Man"
		},
		"M4rsattack": {
			handle: "M4rsattack",
			realName: "Marco Fanciano",
			nationality: "ITA",
			roles: [
				"Star-head Designer"
			],
			interests: [
				"IT",
				"videoGames"
			],
			kitNumber: 4,
			kitName: "mars",
			title: "Leader"
		},
		"Mohamadreza": {
			handle: "Mohamadreza",
			realName: "Mohamadreza Rahimi",
			nationality: "IRN",
			roles: [
				"Star-head Designer"
			],
			interests: [
				"realMadrid",
				"FIFA",
				"PES"
			],
			kitNumber: 77,
			kitName: "m. reza",
			title: "Prodigy"
		},
		"Re_Coded": {
			handle: "Re_Coded",
			realName: "Kilian de Graaf",
			nationality: "NLD",
			roles: [
				"Mini-Faces Designer"
			],
			interests: [
				"FUT",
				"FIFA",
				"reading",
				"football"
			],
			kitNumber: 22,
			kitName: "kilian",
			title: "Engine"
		},
		"Tonce": {
			handle: "Tonce",
			realName: "",
			nationality: "NOR",
			roles: [
				"Jersey Designer"
			],
			interests: [
				"photography",
				"FIFA",
				"football"
			],
			kitNumber: 3,
			kitName: "tonce",
			title: "Player's Player"
		},
		"vojasrbin": {
			handle: "vojasrbin",
			realName: "Vojislav Djokic",
			nationality: "SRB",
			roles: [
				"Star-head Designer"
			],
			interests: [
				"basketball",
				"videoGames",
				"football",
				"movies",
				"reading"
			],
			kitNumber: 5,
			kitName: "vojas",
			title: "Shield"
		},
		"Xandr92Prog": {
			handle: "Xandr92Prog",
			realName: "Artyom Antipin",
			nationality: "RUS",
			roles: [
				"Jersey Designer"
			],
			interests: [
				"basketball",
				"football",
				"movies",
				"reading"
			],
			kitNumber: 92,
			kitName: "xandr",
			title: "Skiller"
		},
	}

	partners: object = {
		"fifermods": {
			handle: "Fifer Mods",
			website: "https://www.fifermods.com"
		}
	}

	getTeamMembersList(): object {
		return Object.keys(this.teamMembers);
	}

	getTeamMemberInfo(teamMemberName: string): object {
		return this.teamMembers[teamMemberName] || {};
	}

	getPartnersList(): object {
		return Object.keys(this.partners);
	}

	getPartnerInfo(partnerName: string): object {
		return this.partners[partnerName] || {};
	}
}