import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {MessageService} from "primeng/api";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

export const appConfig: ApplicationConfig = {
  providers: [
    BrowserModule,
    CommonModule,
    FormsModule,
    provideRouter(routes),
    MessageService
  ],
};
