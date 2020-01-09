import { Pipe, PipeTransform } from '@angular/core';
import { profiles } from '../../constants/wa-profiles';

@Pipe({
	name: 'profileInfo'
})

export class WAProfileInfoPipe implements PipeTransform {
	transform(profileID: string, infoType: string = 'handle'): any {
		switch (infoType) {
			case 'handle': {
				return profiles[profileID].handle;
			}
			case 'twitter': {
				return profiles[profileID].twitter;
			}
			case 'website': {
				return profiles[profileID].website;
			}
		}
	}
}