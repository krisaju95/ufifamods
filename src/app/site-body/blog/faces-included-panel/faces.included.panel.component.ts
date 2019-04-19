import { Component, Input } from '@angular/core';

@Component({
	selector: 'faces-included-panel',
	templateUrl: './faces.included.panel.component.html',
	styleUrls: ['./faces.included.panel.component.scss']
})

export class FacesIncludedPanelComponent {

	@Input() facesIncludedList: Array<any>;

	isNewJSONVersion: boolean = false;

	isDesktopViewPort: boolean = false;
	isMobileViewport: boolean = false;

	ngOnInit() {
		if(typeof this.facesIncludedList[0] != 'string') {
			this.isNewJSONVersion = true;
		}
	}
}