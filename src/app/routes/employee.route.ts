import { Routes } from '@angular/router';
import { EmployeeListComponent } from '../components/employee-list/employee-list.component';
import { EmployeeFormComponent } from '../components/employee-form/employee-form.component';

export const employeeRoutes: Routes = [
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/create', component: EmployeeFormComponent },
  { path: 'employees/edit/:id', component: EmployeeFormComponent }
];
