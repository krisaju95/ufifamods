import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'multistring'
})

export class MultiStringPipe implements PipeTransform {
	transform(inputString: string, maxLength: number): string {
		let formattedString: string = '';
		let stringArray: Array<string> = (inputString || '').split(' ');
		let stringElementArray: Array<string> = [];
		for (let stringIndex = 0; stringIndex < stringArray.length; stringIndex++) {
			let subStringArray: Array<string> = stringArray.slice(stringIndex, stringIndex + maxLength);
			subStringArray = this.formatSubstring(subStringArray)
			let stringElement: string = '<span>' + subStringArray.join(' ') + '</span>';
			stringIndex += (maxLength - 1);
			stringElementArray.push(stringElement);
		}
		formattedString = stringElementArray.join('<br>');
		return formattedString;
	}

	formatSubstring(subStringArray: Array<string>): Array<string> {
		if ((subStringArray || [])[0] == '-') {
			subStringArray.shift();
		} else if ((subStringArray || [])[subStringArray.length - 1] == '-') {
			subStringArray.pop();
		}
		return subStringArray;
	}
}