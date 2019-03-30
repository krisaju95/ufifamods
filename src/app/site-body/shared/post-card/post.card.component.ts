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
	@Input() position: string;
	@Input() fullWidth: boolean;
	@Input() textAlign: string;

	ngOnInit() {

	}
}