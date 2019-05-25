import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
	name: 'timeSince'
})

export class TimeSincePipe implements PipeTransform {

	constructor(
		private datePipe: DatePipe
	) { }

	transform(date: string): string {
		let timeIcon = '<i class="far fa-clock"></i>&nbsp;&nbsp;';
		if(!date) {
			return timeIcon + "a long time ago";
		}
		let timeInPast = new Date(date).getTime();
		let currentTime = new Date().getTime();
		let seconds = Math.floor(currentTime - timeInPast) / 1000;
		let interval = Math.floor(seconds / 31536000);
		if (interval > 1) {
			return timeIcon + this.datePipe.transform(date, 'd MMM yy');
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return timeIcon + this.datePipe.transform(date, 'd MMM yy');
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return timeIcon + interval + " days ago";
		} else if (interval == 1) {
			return timeIcon + "Yesterday";
		} else {
			return timeIcon + "Today";
		}
		// interval = Math.floor(seconds / 3600);
		// if (interval > 1) {
		// 	return timeIcon + interval + " hours ago";
		// }
		// interval = Math.floor(seconds / 60);
		// if (interval > 1) {
		// 	return timeIcon + interval + " minutes ago";
		// }
	}
}