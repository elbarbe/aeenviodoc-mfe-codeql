import { enableProdMode, NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Router, NavigationStart } from '@angular/router';

import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

if (environment.production) {
  enableProdMode();
}
let lifecycles: any;

if (environment.standalone) {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch((err) => console.log(err));
} else {
  lifecycles = singleSpaAngular({
    bootstrapFunction: (singleSpaProps: any) => {
      if (singleSpaProps) {
        environment.msal.clientId = singleSpaProps.clientId;
        environment.msal.authority = singleSpaProps.authority;
        environment.msal.redirectUri = singleSpaProps.redirectUri;
        environment.version = singleSpaProps.version;
        environment.urlms = singleSpaProps.urlms;
      }
      singleSpaPropsSubject.next(singleSpaProps);
      return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppModule);
    },
    template: '<aeenviodoc-root class="paraAE"/>',
    Router,
    NavigationStart,
    NgZone,
  });
}
export const {
  bootstrap,
  mount,
  unmount,
} = lifecycles;

