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
		let timeIcon = ''; // '<i class="fas fa-calendar-day"></i>&nbsp;&nbsp;';
		if(!date) {
			return timeIcon + "a long time ago";
		}
		let timeInPast = new Date(date).getTime();
		let currentTime = new Date().getTime();
		let seconds = Math.floor(currentTime - timeInPast) / 1000;
		let interval = Math.floor(seconds / 31536000);
		let dateString: string = timeIcon + this.datePipe.transform(date, 'MMMM d, yyyy');
		if (interval > 1) {
			return dateString;
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return dateString;
		}
		interval = Math.floor(seconds / 86400);
		let months = Math.floor(interval / 30);
		if (months > 1) {
			// return timeIcon + months + " months ago";
			return dateString;
		} else if (months == 1) {
			// return timeIcon + months + " month ago";
			return dateString;
		} else if (interval > 1) {
			return dateString;
		} else if (interval == 1) {
			return timeIcon + "Yesterday";
		} else {
			return timeIcon + "Today";
		}
	}
}