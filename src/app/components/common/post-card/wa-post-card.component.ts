import { Component, Input, OnChanges } from '@angular/core';

@Component({
	selector: 'ufm-wa-post-card',
	templateUrl: './wa-post-card.component.html',
	styleUrls: ['./wa-post-card.component.scss']
})
export class WAPostCardComponent implements OnChanges {
	
	@Input() post: any;

	@Input() loading: boolean;

	image: string;

	title: string;

	description: string;

	author: string;

	date: string;

	link: string;

	ngOnChanges() {
		this.post = this.post || {};
		this.image = this.post['thumbnail'];
		this.title = this.post['title'];
		this.description = this.post['description'];
		this.author = this.post['author'];
		this.date = this.post['date'];
		this.link = this.post['url'];
	}
}