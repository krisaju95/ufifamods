import { environment } from '../../environments/environment';

const isProdMode: boolean = environment.production;

const isDevMode: boolean = !environment.production;

export const WAFeatureSwitches: any = {
    siteSearch: false,
    fifaSoundtracks: false,
    aboutUs: false,
    verboseFooter: false,
    disqus: false
}