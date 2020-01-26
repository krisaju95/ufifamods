export interface WABlogPost {
	public: boolean,
	featured: boolean,
	url: string,
	title: string,
	date: Date,
	thumbnail: string,
	category: string,
	tags: string[],
	description: string,
	body: string,
	author: string,
	contributors: string[],
	downloadink: string,
	starheads: string[]
}