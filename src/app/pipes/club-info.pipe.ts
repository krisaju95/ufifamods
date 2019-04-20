import { Pipe, PipeTransform } from '@angular/core';
import { ClubInfoService } from '../services/clubinfo.service';

@Pipe({
	name: 'clubInfo'
})

export class ClubInfoPipe implements PipeTransform {

	constructor(
		private clubInfoService: ClubInfoService
	) { }

	transform(playerInfo: object, infoType: string, ): string {
		switch (infoType) {
			case 'clubName': {
				return (this.clubInfoService.getClubInfo(playerInfo['playerLeague'], playerInfo['playerClub']) || {})['name'] || playerInfo['playerClub'];
			}
			case 'leagueName': {
				return (this.clubInfoService.getLeagueInfo(playerInfo['playerLeague']) || {})['name'] || playerInfo['playerLeague'];
			}
		}
	}
}