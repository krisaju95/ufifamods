import { Observable, Subject } from "rxjs";
import { AbcDialogCTA, AbcDialogLoader } from "./abc-dialog.config";

/**
 * When a new dialog is generated, a reference object of type
 * AbcDialogRef is returned with the properties defined below
 */
export class AbcDialogRef {

	/**
	 * This observer checks for events when an external component
	 * requests that the dialog be closed
	 */
	private readonly _onClose = new Subject<any>();
	/** * @ignore */
	onClose: Observable<any> = this._onClose.asObservable();

	/**
	 * This observer checks for events after the dialog has been closed
	 */
	private readonly _dialogClosed = new Subject<any>();
	/** * @ignore */
	dialogClosed: Observable<any> = this._dialogClosed.asObservable();

	/**
	 * This observer monitors any requests to change the dialog config
	 * with new values dynamically
	 */
	private readonly _dialogConfigChanged = new Subject<any>();
	/** * @ignore */
	dialogConfigChanged: Observable<any> = this._dialogConfigChanged.asObservable();

	/**
	 * This observer monitors any requests to change the dialog' loader config
	 * with new values dynamically
	 */
	private readonly _dialogLoaderConfigChanged = new Subject<any>();
	/** * @ignore */
	dialogLoaderConfigChanged: Observable<any> = this._dialogLoaderConfigChanged.asObservable();

	/**
	 * This observe monitor dialog footer button clicks so that subscribers can be
	 * notified. NOTE: This is not triggered if the callback of the CTA is set to "close"
	 */
	private readonly _dialogCTAClicked = new Subject<any>();
	/** * @ignore */
	dialogCTAClicked: Observable<any> = this._dialogCTAClicked.asObservable();
	
	/**
	 * This stores the unique dialogID
	 */
	dialogID: number;

	/**
	 * Observer for changing any parameters of the dialog while it is opened
	 * @param config 
	 */
	updateDialogConfig(config: any): void {
		this._dialogConfigChanged.next(config);
	}

	/**
	 * Observer for changing the state of the loader in the dialog
	 * @param config 
	 */
	toggleDialogLoader(config: AbcDialogLoader): void {
		this._dialogLoaderConfigChanged.next(config);
	}

	/**
	 * Observer for when a user clicks on any of the dialog"s footer CTA
	 * @param CTA 
	 */
	dialogCTAClick(CTA: AbcDialogCTA) {
		this._dialogCTAClicked.next(CTA);
	}

	/**
	 * Observer for when the dialog is closed
	 * @param data 
	 */
	destroy(data?: any) {
		this._dialogClosed.next(data);
	}

	/**
	 * Use this method when you want to close the dialog from another component
	 */
	close(data?: any) {
		this._onClose.next(data);
	}
}