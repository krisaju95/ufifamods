import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'objectKeys'
})

export class ObjectKeysPipe implements PipeTransform {
	transform(object: object): Array<any> {
		return Object.keys(object || {}) || [];
	}
}