import { Component, Input } from '@angular/core';

@Component({
	selector: 'post-card',
	templateUrl: './post.card.component.html',
	styleUrls: ['./post.card.component.scss']
})

export class PostCardComponent {

    @Input() post: object;
    @Input() darkTheme: boolean;
	@Input() hideDescription: boolean;
	@Input() hideFooter: boolean;
	@Input() hideImage: boolean;
	@Input() fullWidth: boolean;
	@Input() textAlign: string;
	@Input() cardStyle: string;
	@Input() titleLineClamp: boolean;

	ngOnInit() {
		this.darkTheme = (this.darkTheme == false) ? false : true;
		this.cardStyle = this.cardStyle || 'default';
	}
}