import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { employeeRoutes } from './app/routes/employee.route';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(withFetch()),
    provideRouter([...employeeRoutes], withEnabledBlockingInitialNavigation()),
    providePrimeNG({
      theme: { preset: Aura },
      ripple: true
    },)
  ]
}).catch(err => console.error(err));
