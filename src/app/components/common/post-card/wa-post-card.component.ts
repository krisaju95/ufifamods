import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WABlogPost } from 'src/app/interfaces/blog-post.interface';
import { WARouterService } from 'src/app/services/router/wa-router.service';
import { WARootScope } from 'src/app/services/globals/wa-rootscope';

@Component({
	selector: 'ufm-wa-post-card',
	templateUrl: './wa-post-card.component.html',
	styleUrls: ['./wa-post-card.component.scss']
})
export class WAPostCardComponent {

	@Input() post: WABlogPost;

	@Input() loading: boolean;

	@Input() showDescription: boolean = true;

	@Input() size: string = "small";

	@Output() postCardClicked: EventEmitter<any> = new EventEmitter<any>();

	constructor(
		private WARouterService: WARouterService,
		public WARootScope: WARootScope
	) { }

	navigateToPost(link: string) {
		this.WARootScope.pageLoading = true;
		this.WARouterService.routeToPage(link);
		if (location.href.includes("/blog/post/")) {
			setTimeout(() => {
				this.postCardClicked.emit(link);
			}, 400);
		}
	}
}