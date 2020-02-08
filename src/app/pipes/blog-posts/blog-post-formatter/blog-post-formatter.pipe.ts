import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'postFormatter'
})

export class WABlogPostFormatPipe implements PipeTransform {
	transform(content: string = '', contentType: string = ''): any {
		switch (contentType) {
			case "title": {
				const regexArray: Array<RegExp> = [/FIFA\s[0-9]{2}\:/, /FIFA[0-9]{2}\:/, /FIFA\s[0-9]{2}/, /FIFA[0-9]{2}/];
				let fifaVersionMatches: RegExpMatchArray;
				let fifaVersionText: string = '';
				let formattedFifaVersionText: string = '';
				for (let regex of regexArray) {
					fifaVersionMatches = content.match(regex);
					if (fifaVersionMatches && fifaVersionMatches.index == 0) {
						fifaVersionText = fifaVersionMatches[0];
						formattedFifaVersionText = fifaVersionText.replace(':', '');
						formattedFifaVersionText = '<span class="wa-title-bold">' + formattedFifaVersionText + '</span>';
						break;
					}
				}
				if (fifaVersionText) {
					content = content.replace(fifaVersionText, formattedFifaVersionText);
				}
				let contentParts: Array<string> = content.split(" - ");
				if (contentParts[1]) {
					contentParts[1] = '<span class="wa-title-highlight">' + contentParts[1] + '</span>';
				}
				content = contentParts.join('<br>');
				return content;
			}
			case "body": {
				content = content.replace(/\n\n/g, "\n");
				let contentParts: Array<any> = content.split("\n");
				contentParts = contentParts.map((part: string) => {
					return "<p>" + part + "</p>";
				});
				return contentParts.join("");
			}
			case "screenshots": {
				content = content.replace(/\n\n/g, "\n");
				const contentParts: Array<any> = content.split("\n");
				return contentParts;
			}
		}
	}
}