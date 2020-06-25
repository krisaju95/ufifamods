import { Pipe, PipeTransform } from '@angular/core';
import { WADBService } from 'src/app/services/database/wa-db.service';

@Pipe({ name: 'postFormatter' })
export class WABlogPostFormatPipe implements PipeTransform {

	constructor(
		private WADBService: WADBService
	) { }

	transform(content: string = '', contentType: string = ''): any {
		if (content) {
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
					content = content.split("\\n")[0];
					if (content.length > 100) {
						return content.slice(0, 100) + "...";
					}
					return content;
				}
				case "title": {
					const titleTextParts: Array<string> = (content || '').split(':');
					const titlePart1: string = titleTextParts[1] ? ("<span class='wa-title-highlight'>#" + titleTextParts[0].trim() + "</span>") : titleTextParts[0].trim();
					let titlePart2: string = titleTextParts[1] ? (" " + titleTextParts.slice(1).join(' - ')) : "";
					titlePart2 = titlePart2.replace(' - ', '<br>');
					return titlePart1 + titlePart2;
				}
				case "body": {
					content = content.replace(/\n\n/g, "\n");
					let contentParts: Array<any> = content.split("\n");
					if (contentParts.length == 1) {
						contentParts = content.split("\\n");
					}
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
				case "number-of-posts": {
					const numberOfPosts: number = this.WADBService.filterPostsData(content).length;
					return numberOfPosts;
				}
				default: {
					return content;
				}
			}
		}
	}
}