import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {AbstractSecurityStorage, authInterceptor, LogLevel, provideAuth} from 'angular-auth-oidc-client';
import {environment} from '../environment/environment';
import {provideQueryClient, QueryClient} from '@tanstack/angular-query-experimental';
import {SsrStorageService} from './service/ssr-storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(routes, withComponentInputBinding()),

    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor()])
    ),

    provideAuth({
      config: {
        authority: environment.keycloak.authority,
        redirectUrl: environment.keycloak.redirectUrl,
        postLogoutRedirectUri: environment.keycloak.postLogoutRedirectUri,
        clientId: environment.keycloak.clientId,

        scope: 'openid profile email offline_access',
        responseType: 'code',

        silentRenew: true,
        useRefreshToken: true,

        secureRoutes: [environment.apiUrl],
        logLevel: LogLevel.Warn
      },
    }),

    { provide: AbstractSecurityStorage, useClass: SsrStorageService },

    provideQueryClient(new QueryClient()),
  ],
};
