import { Pipe } from '@angular/core';

/**
 * This regex is the expression used to match all HTML tags
 */
const htmlTagRegex: RegExp = new RegExp(/<\/?[^>]+(>|$)/g);

/**
 * This pipe strips out all HTML tags to render just the textual content
 * from a given HTML string
 */
@Pipe({ name: "abcStripHtml" })
export class AbcStripHtmlPipe {
	transform(content: any): string {
		const htmlRegex: RegExp = htmlTagRegex;
		if (htmlRegex.test(content)) {
			return content.replace(/<\/?[^>]+(>|$)/g, "");
		}
		return content;
	}
}