import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'postFormatter' })
export class WABlogPostFormatPipe implements PipeTransform {
	transform(content: string = '', contentType: string = ''): any {
		switch (contentType) {
			case "title": {
				const titleTextParts: Array<string> = (content || '').split(':');
				const titlePart1: string = titleTextParts[1] ? ("<span class='wa-title-bold wa-title-highlight'>" + titleTextParts[0].trim() + "<span class='wa-title-separator'>/</span></span>") : titleTextParts[0].trim();
				const titlePart2: string = titleTextParts[1] ? (" " + titleTextParts.slice(1).join(' - ')) : "";
				return titlePart1 + titlePart2;
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
			case "youtube": {
				const videoID: string = (content || '').split("?v=")[1] || "";
				return "https://www.youtube.com/embed/" + videoID + "?controls=0";
			}
			default: {
				return content;
			}
		}
	}
}