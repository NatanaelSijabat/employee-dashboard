import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    ToastModule
  ],
  templateUrl: './employee-list.component.html',
  providers:[MessageService]
})
export class EmployeeListComponent implements OnInit {

  employees: any[] = [];
  departments: any[] = [];

  cols: any[] = [];

  search = '';
  page = 1;
  limit = 10;
  pagination = { totalPages: 1 };

  showAddDialog = false;

  newEmployee = {
    Name: '',
    Position: '',
    DepartmentID: null as number | null,
    Salary: null as number | null
  };

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
    this.loadDepartments();

    this.cols = [
      { field: 'Name', header: 'Name' },
      { field: 'Position', header: 'Position' },
      { field: 'Department.DepartmentName', header: 'Department' }
    ];
  }

  loadEmployees() {
    this.employeeService.getAll(this.page, this.limit, this.search)
      .subscribe(res => {
        this.employees = res.data;
        this.pagination.totalPages = res.pagination.totalPages;
      });
  }

  loadDepartments() {
    this.departmentService.getAll().subscribe({
      next: (res: any) => {
        this.departments = res.data ?? res;
      },
      error: (err: any) => {
      }
    });
  }

  searchEmployees() {
    this.page = 1;
    this.loadEmployees();
  }

  nextPage() {
    if (this.page < this.pagination.totalPages) {
      this.page++;
      this.loadEmployees();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadEmployees();
    }
  }

  deleteEmployee(id: number) {
    if (confirm('Delete this employee?')) {
      this.employeeService.delete(id).subscribe(() => this.loadEmployees());
    }
  }

 addEmployee() {
  if (
    !this.newEmployee.Name ||
    !this.newEmployee.Position ||
    !this.newEmployee.DepartmentID ||
    !this.newEmployee.Salary
  ) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Validation',
      detail: 'Please fill all required fields'
    });
    return;
  }

  this.employeeService.create(this.newEmployee).subscribe({
    next: () => {
      this.loadEmployees();
      this.showAddDialog = false;

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Employee added successfully'
      });

      this.newEmployee = {
        Name: '',
        Position: '',
        DepartmentID: null,
        Salary: null
      };
    },
    error: () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to add employee'
      });
    }
  });
}


  getFieldValue(rowData: any, field: string) {
    return field.split('.').reduce((obj, key) => obj?.[key], rowData);
  }

}
