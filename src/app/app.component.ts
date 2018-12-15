import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {

	@ViewChild('sidenav') sidenav: MatSidenav;

	openSideNav() {
		document.body.style.overflow = "hidden";
		this.sidenav.open()
	}

	closeSideNav() {
		document.body.style.overflow = "auto";
		this.sidenav.close();
	}
}