import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { departmentRoutes } from './app/routes/department.routes';
import { employeeRoutes } from './app/routes/employee.route';
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([...employeeRoutes, ...departmentRoutes], withEnabledBlockingInitialNavigation())
  ]
}).catch(err => console.error(err));
