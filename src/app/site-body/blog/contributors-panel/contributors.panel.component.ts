import { Component, Input } from '@angular/core';

@Component({
	selector: 'contributors-panel',
	templateUrl: './contributors.panel.component.html',
	styleUrls: ['./contributors.panel.component.scss']
})

export class ContributorsPanelComponent {

	@Input() contributorsList: Array<any>;

	isDesktopViewPort: boolean = false;
	isMobileViewport: boolean = false;

	ngOnInit() {

	}
}