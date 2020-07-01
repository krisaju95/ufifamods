import { Component, Input, TemplateRef } from '@angular/core';
import { WARootScope } from 'src/app/services/globals/wa-rootscope';
import { WAFIFADBService } from 'src/app/services/database/wa-fifa-db.service';
import { WADialog, WADialogRef, WADialogCTA } from '../wa-dialog';
import { WARouterService } from 'src/app/services/router/wa-router.service';
import { WASearchFilterConfig } from 'src/app/services/database';
import { WALoaderService } from 'src/app/services/loader/wa-loader.service';

@Component({
	selector: 'ufm-wa-starhead-card',
	templateUrl: './wa-starhead-card.component.html',
	styleUrls: ['./wa-starhead-card.component.scss']
})
export class WAStarheadCardComponent {

	@Input() starhead: string;

	filterConfig: WASearchFilterConfig;

	constructor(
		public WAFIFADBService: WAFIFADBService,
		public WARootScope: WARootScope,
		private WARouterService: WARouterService,
		private WALoaderService: WALoaderService,
		private WADialog: WADialog
	) { }

	searchModsByPlayer(template: TemplateRef<any>) {
		this.filterConfig = {
			game: "fifa20",
			player: this.starhead,
			league: this.WAFIFADBService.fifaDBPlayers[this.starhead].league.id,
			club: this.WAFIFADBService.fifaDBPlayers[this.starhead].club.id
		};
		this.openSearchDialog("Search by Player Name", template);
	}

	searchModsByNationality(template: TemplateRef<any>) {
		this.filterConfig = {
			game: "fifa20",
			nationality: this.WAFIFADBService.fifaDBPlayers[this.starhead].nationality.id
		};
		this.openSearchDialog("Search by Nationality", template);
	}

	searchModsByClub(template: TemplateRef<any>) {
		this.filterConfig = {
			game: "fifa20",
			league: this.WAFIFADBService.fifaDBPlayers[this.starhead].league.id,
			club: this.WAFIFADBService.fifaDBPlayers[this.starhead].club.id
		};
		this.openSearchDialog("Search by Club", template);
	}

	searchModsByLeague(template: TemplateRef<any>) {
		this.filterConfig = {
			game: "fifa20",
			league: this.WAFIFADBService.fifaDBPlayers[this.starhead].league.id
		};
		this.openSearchDialog("Search by League", template);
	}

	openSearchDialog(heading: string, template: TemplateRef<any>): void {
		const dialogRef: WADialogRef = this.WADialog.open({
			heading: heading,
			template: template,
			CTAs: [
				{
					label: "Search",
					callback: "routeToDownloadCenter"
				},
				{
					label: "Close",
					callback: "close"
				}
			]
		});

		dialogRef.dialogCTAClicked.subscribe((CTA: WADialogCTA) => {
			this[CTA.callback](dialogRef);
		});
	}

	routeToDownloadCenter(dialogRef: WADialogRef): void {
		this.WALoaderService.togglePageLoadingState(true);
		this.WARootScope.context["searchFilterConfig"] = this.filterConfig;
		this.WARouterService.routeToPage("downloads");
		dialogRef.close();
	}
}