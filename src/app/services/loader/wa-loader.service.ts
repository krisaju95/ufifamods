import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class WALoaderService {

    minimumLoaderTime: number = 2500;

    pageLoadingStateChange: Subject<boolean> = new Subject();

    pageLoaderStartTime: number;

    togglePageLoadingState(state: boolean): void {
        if (state) {
            this.pageLoaderStartTime = new Date().getTime();
            this.pageLoadingStateChange.next(true);
        } else {
            const currentTime: number = new Date().getTime();
            const elapsedTime: number = currentTime - (this.pageLoaderStartTime || currentTime);
            const stateChangeDelay: number = (elapsedTime < this.minimumLoaderTime) ? (this.minimumLoaderTime - elapsedTime) : 0;
            setTimeout(() => { this.pageLoadingStateChange.next(false); }, stateChangeDelay);
        }
    }
}