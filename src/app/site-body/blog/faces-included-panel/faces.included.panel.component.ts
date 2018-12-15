import { Component, Input } from '@angular/core';

@Component({
	selector: 'faces-included-panel',
	templateUrl: './faces.included.panel.component.html',
	styleUrls: ['./faces.included.panel.component.scss']
})

export class FacesIncludedPanelComponent {

	@Input() facesIncludedList: Array<any>;

	isDesktopViewPort: boolean = false;
	isMobileViewport: boolean = false;

	ngOnInit() {

	}
}