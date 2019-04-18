import { Injectable } from '@angular/core';

@Injectable()
export class ClubInfoService {

	clubList: object = {
		"epl": {
			name: "English Premier League",
			country: "England",
			countryCode: "ENG",
			clubs: {
				"arsenal": {
					name: "Arsenal F.C.",
					league: "English Premier League",
					country: "England"
				},
				"bournemouth": {
					name: "A.F.C. Bournemouth",
					league: "English Premier League",
					country: "England"
				},
				"brighton": {
					name: "Brighton & Hove Albion F.C.",
					league: "English Premier League",
					country: "England"
				},
				"burnley": {
					name: "Burnley F.C.",
					league: "English Premier League",
					country: "England"
				},
				"cardiff": {
					name: "Cardiff City F.C.",
					league: "English Premier League",
					country: "England"
				},
				"chelsea": {
					name: "Chelsea F.C.",
					league: "English Premier League",
					country: "England"
				},
				"crystalpalace": {
					name: "Crystal Palace F.C.",
					league: "English Premier League",
					country: "England"
				},
				"everton": {
					name: "Everton F.C.",
					league: "English Premier League",
					country: "England"
				},
				"fulham": {
					name: "Fulham F.C.",
					league: "English Premier League",
					country: "England"
				},
				"huddersfield": {
					name: "Huddersfield Town F.C.",
					league: "English Premier League",
					country: "England"
				},
				"leicester": {
					name: "Leicester City F.C.",
					league: "English Premier League",
					country: "England"
				},
				"liverpool": {
					name: "Liverpool F.C.",
					league: "English Premier League",
					country: "England"
				},
				"mancity": {
					name: "Manchester City F.C.",
					league: "English Premier League",
					country: "England"
				},
				"manutd": {
					name: "Manchester United F.C.",
					league: "English Premier League",
					country: "England"
				},
				"newcastle": {
					name: "Newcastle United F.C.",
					league: "English Premier League",
					country: "England"
				},
				"southampton": {
					name: "Southampton F.C.",
					league: "English Premier League",
					country: "England"
				},
				"tottenham": {
					name: "Tottenham Hotspur F.C.",
					league: "English Premier League",
					country: "England"
				},
				"watford": {
					name: "Watford F.C.",
					league: "English Premier League",
					country: "England"
				},
				"westham": {
					name: "West Ham United F.C.",
					league: "English Premier League",
					country: "England"
				},
				"wolves": {
					name: "Wolverhampton Wanderers F.C.",
					league: "English Premier League",
					country: "England"
				}
			}
		},
		"laliga": {
			name: "Spanish La Liga",
			country: "Spain",
			countryCode: "ESP",
			clubs: {
				"alaves": {
					name: "Deportivo Alavés, S.A.D.",
					league: "Spanish La Liga",
					country: "Spain"
				},
				"athletic": {
					name: "Athletic Club de Bilbao",
					league: "Spanish La Liga",
					country: "Spain"
				},
				"atletico": {
					name: "Club Atlético de Madrid",
					league: "Spanish La Liga",
					country: "Spain"
				},
				"barcelona": {
					name: "Barcelona C.F.",
					league: "Spanish La Liga",
					country: "Spain"
				},
				"celta": {
					name: "Real Club Celta de Vigo",
					league: "Spanish La Liga",
					country: "Spain"
				},
				"eibar": {
					name: "Sociedad Deportiva Eibar",
					league: "Spanish La Liga",
					country: "Spain"
				},
				"espanyol": {
					name: "Real Club Espanyol",
					league: "Spanish La Liga",
					country: "Spain"
				},
				"getafe": {
					name: "Getafe C.F.",
					league: "Spanish La Liga",
					country: "Spain"
				},
				"girona": {
					name: "Girona C.F.",
					league: "Spanish La Liga",
					country: "Spain"
				},
				"huesca": {
					name: "Sociedad Deportiva Huesca",
					league: "Spanish La Liga",
					country: "Spain"
				},
				"leganes": {
					name: "Club Deportivo Leganés",
					league: "Spanish La Liga",
					country: "Spain"
				},
				"levante": {
					name: "Levante Unión Deportiva",
					league: "Spanish La Liga",
					country: "Spain"
				},
				"rayo": {
					name: "Rayo Vallecano",
					league: "Spanish La Liga",
					country: "Spain"
				},
				"realbetis": {
					name: "Real Betis Balompié",
					league: "Spanish La Liga",
					country: "Spain"
				},
				"realmadrid": {
					name: "Real Madrid C.F.",
					league: "Spanish La Liga",
					country: "Spain"
				},
				"realsociedad": {
					name: "Real Sociedad de Fútbol",
					league: "Spanish La Liga",
					country: "Spain"
				},
				"sevilla": {
					name: "Sevilla F.C.",
					league: "Spanish La Liga",
					country: "Spain"
				},
				"valencia": {
					name: "Valencia C.F.",
					league: "Spanish La Liga",
					country: "Spain"
				},
				"realvalladolid": {
					name: "Real Valladolid C.F.",
					league: "Spanish La Liga",
					country: "Spain"
				},
				"villarreal": {
					name: "Villarreal C.F.",
					league: "Spanish La Liga",
					country: "Spain"
				}
			}
		}
	}

	getClubList(): object {
		return this.clubList;
	}

	getLeagueInfo(leagueName: string): object {
		return this.clubList[leagueName];
	}

	getLeagueListKeys(): Array<string> {
		return Object.keys(this.clubList);
	}

	getClubInfo(leagueName: string, clubName: string): object {
		return this.getLeagueInfo(leagueName)['clubs'][clubName];
	}

	getClubListKeys(leagueName: string): Array<string> {
		return Object.keys(this.clubList[leagueName]['clubs']);
	}
}