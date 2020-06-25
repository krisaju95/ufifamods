import { Injectable } from '@angular/core';

@Injectable()
export class WARootScope {

    pageLoading: boolean = true;

    fifaDBGenerated: boolean = false;

    isDesktopViewport: boolean = false;

    isMobileViewport: boolean = false;

    mobileNavbarOpened: boolean = false;

    socials: any = {
        twitter: "https://twitter.com/TheOfficialUFM",
        youtube: "https://www.youtube.com/ufifamods"
    }

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
        return window.innerWidth >= 920;
    }

    checkIfMobileViewport() {
        return window.innerWidth < 920;
    }
}