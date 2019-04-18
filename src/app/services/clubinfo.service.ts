import { Injectable } from '@angular/core';

@Injectable()
export class ClubInfoService {

	clubList: object = {
		"epl": {
			name: "English Premier League",
			country: "England",
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