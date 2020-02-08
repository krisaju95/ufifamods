import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class WALoaderService {

    minimumLoaderTime: number = 2000;

    pageLoadingStateChange: Subject<boolean> = new Subject();

    pageLoaderStartTime: number;

    pageLoaderTimeoutRef: any;

    togglePageLoadingState(state: boolean): void {
        this.clearPageLoaderTimeoutRef();
        if (state) {
            this.pageLoaderStartTime = new Date().getTime();
            this.pageLoadingStateChange.next(true);
        } else {
            const currentTime: number = new Date().getTime();
            const elapsedTime: number = currentTime - (this.pageLoaderStartTime || currentTime);
            const stateChangeDelay: number = (elapsedTime < this.minimumLoaderTime) ? (this.minimumLoaderTime - elapsedTime) : 0;
            this.pageLoaderTimeoutRef = setTimeout(() => {
                this.pageLoadingStateChange.next(false);
                this.clearPageLoaderTimeoutRef();
            }, stateChangeDelay);
        }
    }

    clearPageLoaderTimeoutRef() {
        if (this.pageLoaderTimeoutRef) {
            clearTimeout(this.pageLoaderTimeoutRef);
        }
    }
}