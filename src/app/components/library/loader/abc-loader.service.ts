import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AbcLoaderRequestConfig } from './abc-loader-request.config';

/**
 * This service is used for allowing components across the application to
 * toggle the page loader on and off
 */
@Injectable()
export class AbcLoaderService {

	/**
	 * This observer monitors for requests to hide or show the page loader
	 */
	loaderRequests$ = new Subject<any>();

	/**
	 * Call this method when you want to hide or show the loader. Pass the config
	 * object to determine what type of loader should be displayed
	 * @param config 
	 */
	togglePageLoader(config: AbcLoaderRequestConfig): void {
		this.loaderRequests$.next(config);
	}
}