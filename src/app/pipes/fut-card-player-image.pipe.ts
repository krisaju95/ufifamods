import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'futCardPlayerImage'
})

export class FutCardPlayerImagePipe implements PipeTransform {
	transform(playerInfo: object): string {
		if (playerInfo) {
			if(playerInfo['dynamicImage']) {
				return 'url(https://www.fifarosters.com/assets/players/fifa19/dynamic/' + playerInfo['dynamicImageId'] + '.png)';
			} else {
				return 'url(https://www.fifarosters.com/assets/players/fifa19/faces/' + playerInfo['id'] + '.png)';
			}
		}
	}
}