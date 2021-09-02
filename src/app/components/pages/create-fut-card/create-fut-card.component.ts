import { Component } from '@angular/core';

@Component({
    selector: 'create-fut-card',
    templateUrl: './create-fut-card.component.html',
    styleUrls: ['./create-fut-card.component.scss']
})
export class CreateFUTCardComponent {
    phoneNumber: string = "2314512312";

    onFocus(event: Event): void {
        event.preventDefault();
    }

    onFocus2(event: Event): void {
        this.onFocus(event);
        event.stopPropagation();
    }

    onFocus3(event: Event): void {
        this.onFocus2(event);
        event.stopImmediatePropagation();
    }

    onFocus4(event: Event): void {
        event.preventDefault();
        window.blur();
    }

    onFocus5(event: Event): void {
        event.preventDefault();
        setTimeout(() => {
            window.blur();
        }, 500)
    }

    onFocus6(event: Event): void {
        event.preventDefault();
        (document.querySelector(".wa-logo") as HTMLElement).focus();
    }

    onFocus7(event: Event): void {
        event.preventDefault();
        setTimeout(() => {
            (document.querySelector(".wa-logo") as HTMLElement).focus();
        }, 500)
    }
}