import { Directive, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Directive({
    selector: '[imageLoader]'
})
export class WAImageLoaderDirective {

    constructor(
        private http: HttpClient,
        private elementRef: ElementRef
    ) { }

    ngAfterViewInit() {
        const elementRef: HTMLElement = this.elementRef.nativeElement as HTMLElement;
        const imageURL: string = elementRef.getAttribute('image-src');
        const imageLoadDelay: number = parseInt(elementRef.getAttribute('image-load-delay') || '100');
        const imageProperty: string = "url(" + imageURL + ")";
        this.http.get(imageURL, { responseType: 'blob' }).subscribe(() => {
            elementRef.style.setProperty('background-image', imageProperty);
            setTimeout(() => { elementRef.classList.add('loaded'); }, imageLoadDelay);
        });
    }
}