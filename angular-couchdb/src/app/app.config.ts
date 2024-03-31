import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter,RouterModule } from '@angular/router';
import {HttpClient, provideHttpClient,withFetch} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from 'express';
import { routes } from './app.routes';

import { ReactiveFormsModule } from '@angular/forms';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [HttpClientModule,RouterModule,importProvidersFrom(ReactiveFormsModule),provideRouter(routes), provideClientHydration(),provideHttpClient(), provideHttpClient(withFetch() )]
  
};
