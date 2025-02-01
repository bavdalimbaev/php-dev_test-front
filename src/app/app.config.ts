import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {MessageService} from "primeng/api";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {DialogModule} from "primeng/dialog";
import {provideAnimations} from "@angular/platform-browser/animations";
import {MainInterceptor} from "./config/main.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    BrowserModule,
    DialogModule,
    CommonModule,
    FormsModule,
    provideRouter(routes),
    provideAnimations(),
    MessageService,
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MainInterceptor,
      multi: true,
    },
  ],
};
