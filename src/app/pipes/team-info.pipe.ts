import { Pipe, PipeTransform } from '@angular/core';
import { TeamInfoService } from '../services/team-info.service';

@Pipe({
	name: 'teamInfo'
})

export class TeamInfoPipe implements PipeTransform {

	constructor(
		private service: TeamInfoService
	) { }

	transform(memberName: string, infoType?: string, memberType?: string, ): string {
		switch (memberType) {
			case 'team': {
				return (this.service.getTeamMemberInfo(memberName) || {})[infoType] || memberName;
			}
			case 'partner': {
				return (this.service.getPartnerInfo(memberName) || {})[infoType] || memberName;
			}
			default: {
				return (this.service.getTeamMemberInfo(memberName) || {})[infoType] || (this.service.getPartnerInfo(memberName) || {})[infoType] || memberName;
			}
		}
	}
}