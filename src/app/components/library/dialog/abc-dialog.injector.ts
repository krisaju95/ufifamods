import { Injector, Type, InjectionToken, InjectFlags } from "@angular/core";

/**
 * @ignore
 */
export class AbcDialogInjector implements Injector {
	
	constructor(private _parentInjector: Injector, private _additionalTokens: WeakMap<any, any>) { }
	get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
	get(token: any, notFoundValue?: any);
	get(token: any, notFoundValue?: any, _flags?: any) {
		const value = this._additionalTokens.get(token);

		if (value) return value;

		return this._parentInjector.get<any>(token, notFoundValue);
	}
}