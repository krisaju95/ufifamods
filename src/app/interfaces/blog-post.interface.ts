export interface WABlogPost {
	id?: string,
	public?: boolean,
	featured?: boolean,
	url?: string,
	title?: string,
	date?: Date,
	thumbnail?: string,
	category?: string,
	tags?: string[],
	description?: string,
	body?: string,
	author?: string,
	contributors?: string[],
	downloadLink?: string,
	linkType?: string,
	starheads?: string[],
	screenshots?: string
}