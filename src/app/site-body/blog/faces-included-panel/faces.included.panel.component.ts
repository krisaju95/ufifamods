import { Component, Input, HostListener, ElementRef } from '@angular/core';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
	selector: 'faces-included-panel',
	templateUrl: './faces.included.panel.component.html',
	styleUrls: ['./faces.included.panel.component.scss']
})

export class FacesIncludedPanelComponent {

	constructor(
		private service: UtilitiesService,
		private elementRef: ElementRef
	) { }

	@Input() facesIncludedList: Array<any>;

	isNewJSONVersion: boolean = false;
	numberOfStarHeads: number = 0;
	totalNumberOfRows: number = 0;
	numberOfRowsDisplayed: number = 0;
	numberOfStarheadsPerRow: number = 3;

	showExpandLink: boolean = false;
	showCollapseLink: boolean = false;

	collapsedHeight: number = 0;
	totalHeight: number = 0;

	isDesktopViewPort: boolean = this.service.isDesktopViewPort();
	isTabViewPort: boolean = this.service.isTabViewPort();
	isMobileViewPort: boolean = this.service.isMobileViewPort();

	ngOnInit() {
		this.isNewJSONVersion = (typeof this.facesIncludedList[0] != 'string');
		this.numberOfStarHeads = this.facesIncludedList.length;
		this.setNumberOfStarHeadsPerRow();
	}

	ngAfterViewInit() {
		this.setCollapsedView();
	}

	setCollapsedView(buttonClick?: boolean) {
		let starHeadsList = this.elementRef.nativeElement.querySelector('.starheads-included-list');
		let scrollPosition = starHeadsList.offsetTop;
		if (this.numberOfStarHeads > (this.numberOfStarheadsPerRow * this.numberOfRowsDisplayed)) {
			this.totalNumberOfRows = Math.floor(this.numberOfStarHeads / this.numberOfStarheadsPerRow);
			this.showExpandLink = true;
			this.showCollapseLink = false;
			let starHeadInfoRows: Array<any> = this.elementRef.nativeElement.querySelectorAll('.starheads-included-list-row');
			let rowCounter = 0;
			this.collapsedHeight = 0;
			this.totalHeight = 0;
			for (let row of starHeadInfoRows) {
				if (!row.classList.contains('hide-list-row')) {
					rowCounter++;
					this.totalHeight += row.clientHeight;
					if (rowCounter <= this.numberOfRowsDisplayed) {
						this.collapsedHeight += row.clientHeight;
					}
				};
				if (rowCounter == this.numberOfRowsDisplayed) {
					starHeadsList.style.height = (10 + this.collapsedHeight + (this.numberOfRowsDisplayed - 1) * 15) + 'px';
				}
			}
			if (buttonClick) {
				window.scroll({ top: scrollPosition, left: 0, behavior: 'smooth' });
			}
		}
	}

	setExpandedView() {
		let starHeadsList = this.elementRef.nativeElement.querySelector('.starheads-included-list');
		this.showExpandLink = false;
		this.showCollapseLink = true;
		starHeadsList.style.height = (10 + this.totalHeight + (this.totalNumberOfRows - 1) * 15) + 'px';
	}

	setNumberOfStarHeadsPerRow() {
		if (this.isMobileViewPort) {
			this.numberOfStarheadsPerRow = 1;
			this.numberOfRowsDisplayed = 8;
		} else if (this.isTabViewPort) {
			this.numberOfStarheadsPerRow = 2;
			this.numberOfRowsDisplayed = 4;
		} else {
			this.numberOfStarheadsPerRow = 3;
			this.numberOfRowsDisplayed = 3;
		}
	}

	@HostListener('window:resize') onWindowResize() {
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isTabViewPort = this.service.isTabViewPort();
		this.isMobileViewPort = this.service.isMobileViewPort();
		this.setNumberOfStarHeadsPerRow();
	}

	@HostListener('window:orientationchange') onOrientationChange() {
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isTabViewPort = this.service.isTabViewPort();
		this.isMobileViewPort = this.service.isMobileViewPort();
		this.setNumberOfStarHeadsPerRow();
	}
}