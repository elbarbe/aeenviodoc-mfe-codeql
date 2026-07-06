import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { AppGlobalInfo } from './app.appglobalinfo';
import { Util } from './common/app.utils';
import { OidBuilder } from './common/oidBuilder';
import { LanguageMng } from './common/languageMng';
import { ConditionalNavigationMng } from './common/conditionalNavigationMng';
import { LoginGuard } from './common/loginGuard';
import { PopStateNavigationGuard } from './common/popStateNavigationGuard';
import { StandardFunctions } from './common/standardFunctions';
import { AppHeaderComponent } from './appheader/appheader.component';
import { AppMainPage } from './app.mainpage';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { CommonComponentsModule } from './commoncomponents.module';
import { NoAccessComponent } from './common/noAccess.component';
import { WrongVersionComponent } from './common/wrongVersion.component';
import { ConditionalNavigationComponent } from './common/conditionalNavigation.component';
import { ClassServiceLogComponent } from './common/classServiceLog.component';
import { UserFunctions } from './common/userFunctions';
import { ModalForIUModule } from './common/modalforiu/modalforiu.module';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { environment } from '../environments/environment';

import {
  IPublicClientApplication,
  PublicClientApplication,
  BrowserCacheLocation,
  LogLevel,
  InteractionType,
} from '@azure/msal-browser';
import {
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalInterceptorConfiguration,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalBroadcastService,
  MsalService,
  MsalGuard
} from '@azure/msal-angular';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {

  return new PublicClientApplication({
    auth: {
      clientId: environment.msal.clientId,
      authority: environment.msal.authority,
      redirectUri: environment.msal.redirectUri
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(GRAPH_ENDPOINT, ['user.read']);

  return {
    interactionType: InteractionType.Popup,
    // interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Popup,
    // interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
  };
}

@NgModule({
    imports: [CommonModule, FormsModule, BrowserModule, BrowserAnimationsModule, HttpClientModule,
      ToastModule, CommonComponentsModule, ModalForIUModule, AppRoutingModule],
    exports: [RouterModule],
    declarations: [AppComponent, AppHeaderComponent, AppMainPage, LoginComponent, NoAccessComponent,
      WrongVersionComponent, ConditionalNavigationComponent, ClassServiceLogComponent, EmptyRouteComponent],
    providers: [LanguageMng, { provide: LOCALE_ID,
      deps: [LanguageMng],
      useFactory: (languageMng: LanguageMng) => languageMng.getLanguageId()},
      Title, AppGlobalInfo, Util, UserFunctions, OidBuilder, ConditionalNavigationMng, DatePipe,
      LoginGuard, PopStateNavigationGuard, StandardFunctions, MessageService, ConfirmationService,
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

