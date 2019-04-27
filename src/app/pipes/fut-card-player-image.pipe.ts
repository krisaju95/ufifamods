import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'futCardPlayerImage'
})

export class FutCardPlayerImagePipe implements PipeTransform {
	transform(playerInfo: object): string {
		if(playerInfo) {
			switch (playerInfo['imageType']) {
				case 'normal': {
					return 'url(https://www.fifarosters.com/assets/players/fifa19/faces/' + playerInfo['id'] + '.png';
				}
				case 'dynamic': {
					return 'url(https://www.fifarosters.com/assets/players/fifa19/dynamic/' + playerInfo['dynamicImageId'] + '.png';
				}
			}
		}
	}
}