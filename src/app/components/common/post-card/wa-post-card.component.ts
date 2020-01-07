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

	ngOnChanges() {
		this.post = this.post || {};
		this.image = this.post['post-image'];
		this.title = this.post['post-title'];
		this.description = this.post['post-description'] || this.post['post-text-content'];
		this.author = this.post['post-author'];
		this.date = this.post['post-date'];
	}
}