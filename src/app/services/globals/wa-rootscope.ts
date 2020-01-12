import { Injectable } from '@angular/core';

@Injectable()
export class WARootScope {

    isDesktopViewport: boolean = false;

    isMobileViewport: boolean = false;

    constructor() {
        this.setViewportIdentifiers();
        this.initViewportChangeListeners();
    }

    set(key: string, value: any): void {
        this[key] = value;
    }

    initViewportChangeListeners() {
        window.addEventListener('resize', () => this.setViewportIdentifiers());
        window.addEventListener('orientationchange', () => this.setViewportIdentifiers());
    }

    setViewportIdentifiers() {
        this.isDesktopViewport = this.checkIfDesktopViewPort();
        this.isMobileViewport = this.checkIfMobileViewport();
    }

    checkIfDesktopViewPort() {
        return window.innerWidth >= 1024;
    }

    checkIfMobileViewport() {
        return window.innerWidth < 1024;
    }
}