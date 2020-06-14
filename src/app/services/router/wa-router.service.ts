import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class WARouterService {

    constructor(
        private router: Router
    ) { }

    routeToPage(page: string, useNgRouter: boolean = true): void {
        setTimeout(() => {
            if (useNgRouter) {
                this.router.navigate(["/" + page]);
            } else {
                location.pathname = page;
            }
        }, 750);
    }
}