import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'postFormatter' })
export class WABlogPostFormatPipe implements PipeTransform {
	transform(content: string = '', contentType: string = ''): any {
		switch (contentType) {
			case "heroPostTitle": {
				const titleTextParts: Array<string> = (content || '').split(' ');
				const formattedTitleTextParts: Array<string> = [];
				titleTextParts.forEach((titleTextPart: string) => {
					if (titleTextPart[0] == "#") {
						titleTextPart = "<span class='wa-text-blue'>" + titleTextPart + "</span>";
					}
					formattedTitleTextParts.push(titleTextPart);
				})
				return formattedTitleTextParts.join(" ");
			}
			case "postDescription": {
				if (content.length > 100) {
					return content.slice(0, 100) + "...";
				}
				return content;
			}
			case "title": {
				const titleTextParts: Array<string> = (content || '').split(':');
				const titlePart1: string = titleTextParts[1] ? ("<span class='wa-title-highlight'>#" + titleTextParts[0].trim() + "</span>") : titleTextParts[0].trim();
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