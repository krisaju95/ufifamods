import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class WARootScope {

    isDevMode: boolean = false;

    pageLoading: boolean = true;

    fifaDBGenerated: boolean = false;

    isDesktopViewport: boolean = false;

    isMobileViewport: boolean = false;

    mobileNavbarOpened: boolean = false;

    context: any = {};

    socials: any = {
        twitter: "https://twitter.com/TheOfficialUFM",
        youtube: "https://www.youtube.com/ufifamods",
        discord: "https://discordapp.com/invite/pqCEFVf"
    }

    constructor() {
        this.setEnvironment();
        this.setViewportIdentifiers();
        this.initViewportChangeListeners();
    }

    set(key: string, value: any): void {
        this[key] = value;
    }

    setEnvironment() {
        this.isDevMode = !(environment.production && (window.location.href.indexOf("?enableBetaFeatures=true") == -1));
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