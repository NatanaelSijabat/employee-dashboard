import { Routes } from '@angular/router';
import { DepartmentFormComponent } from '../components/department-form/department-form.component';
import { DepartmentListComponent } from '../components/department-list/department-list.component';

export const departmentRoutes: Routes = [
  { path: 'departments', component: DepartmentListComponent },
  { path: 'departments/create', component: DepartmentFormComponent },
  { path: 'departments/edit/:id', component: DepartmentFormComponent }
];
