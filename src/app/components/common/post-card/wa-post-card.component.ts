import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WABlogPost } from 'src/app/interfaces/blog-post.interface';

@Component({
	selector: 'ufm-wa-post-card',
	templateUrl: './wa-post-card.component.html',
	styleUrls: ['./wa-post-card.component.scss']
})
export class WAPostCardComponent {
	
	@Input() post: WABlogPost;

	@Input() loading: boolean;

	@Output() postCardClicked: EventEmitter<any> = new EventEmitter<any>();

	navigateToPost(link: string) {
		this.postCardClicked.emit(link);
	}
}