import { Component } from '@angular/core';
import { WALoaderService } from '../../services/loader/wa-loader.service';
import { WARootScope } from '../../services/globals/wa-rootscope';
import { WAFeatureSwitches } from '../../constants/wa-feature-switches';
import { WARouterService } from 'src/app/services/router/wa-router.service';

@Component({
    selector: 'ufm-wa-header',
    templateUrl: './wa-header.component.html',
    styleUrls: ['./wa-header.component.scss']
})

export class WAHeaderComponent {

    WAFeatureSwitches: any = WAFeatureSwitches;

    loading: boolean = true;

    navbarOpened: boolean = false;

    constructor(
        private WALoaderService: WALoaderService,
        public WARootScope: WARootScope,
        private WARouterService: WARouterService
    ) { }

    ngOnInit() {
        this.WALoaderService.pageLoadingStateChange.subscribe((state) => {
            const waitTime: number = state ? 0 : 1500;
            setTimeout(() => this.loading = state, waitTime);
        });
    }

    toggleNavbar(): void {
        this.navbarOpened = !this.navbarOpened;
    }

    routeToPage(pageName: string): void {
        if (!this.WARootScope.pageLoading) {
            this.navbarOpened = false;
            this.WALoaderService.togglePageLoadingState(true);
            this.WARouterService.routeToPage(pageName);
        }
    }
}