import { Pipe, PipeTransform } from '@angular/core';
import { profiles } from '../../constants/wa-profiles';

@Pipe({
	name: 'profileInfo'
})

export class WAProfileInfoPipe implements PipeTransform {
	transform(profileID: string, infoType: string = 'handle'): any {
		const profile: any = profiles[profileID];
		let data: any = '';
		if (profile) {
			switch (infoType) {
				case 'handle': {
					data = profiles[profileID].handle; break;
				}
				case 'twitter': {
					data = profiles[profileID].twitter; break;
				}
				case 'website': {
					data = profiles[profileID].website; break;
				}
			}
		}
		return data || '';
	}
}