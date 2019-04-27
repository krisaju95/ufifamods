import { Component, Input } from '@angular/core';

@Component({
	selector: 'fut-card',
	templateUrl: './fut-card.component.html',
	styleUrls: ['./fut-card.component.scss']
})

export class FutCardComponent {

	@Input() player: object;
	@Input() squadType: object;
	@Input() fifaVersion: object;

}