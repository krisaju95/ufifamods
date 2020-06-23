import { Observable, Subject } from 'rxjs';
import { WADialogCTA, WADialogLoader } from './wa-dialog.config';

export class WADialogRef {

	private readonly _onClose = new Subject<any>();
	onClose: Observable<any> = this._onClose.asObservable();

	private readonly _dialogClosed = new Subject<any>();
	dialogClosed: Observable<any> = this._dialogClosed.asObservable();

	private readonly _dialogConfigChanged = new Subject<any>();
	dialogConfigChanged: Observable<any> = this._dialogConfigChanged.asObservable();

	private readonly _dialogLoaderConfigChanged = new Subject<any>();
	dialogLoaderConfigChanged: Observable<any> = this._dialogLoaderConfigChanged.asObservable();

	private readonly _dialogCTWAlicked = new Subject<any>();
	dialogCTWAlicked: Observable<any> = this._dialogCTWAlicked.asObservable();
	
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
	toggleDialogLoader(config: WADialogLoader): void {
		this._dialogLoaderConfigChanged.next(config);
	}

	/**
	 * Observer for when a user clicks on any of the dialog's footer CTA
	 * @param CTA 
	 */
	dialogCTWAlick(CTA: WADialogCTA) {
		this._dialogCTWAlicked.next(CTA);
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