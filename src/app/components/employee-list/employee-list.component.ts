import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TableModule, ButtonModule, InputTextModule, DialogModule, InputTextModule],
  templateUrl: './employee-list.component.html'
})


export class EmployeeListComponent {
  employees!: [];
  cols: any[] = [];
  search = '';
  page = 1;
  limit = 10;
  pagination = { totalPages: 1 };
  showAddDialog: boolean = false;


  constructor(private employeeService: EmployeeService) {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAll(this.page, this.limit, this.search).subscribe(res => {
      this.employees = res.data;
      this.pagination.totalPages = res.pagination.totalPages;
    });

    this.cols = [
      { field: 'Name', header: 'Name' },
      { field: 'Position', header: 'Position' },
      { field: 'Department.DepartmentName', header: 'Department' },
    ]


  }

  searchEmployees() {
    this.page = 1;
    this.loadEmployees();
  }

  nextPage() { if (this.page < this.pagination.totalPages) { this.page++; this.loadEmployees(); } }
  prevPage() { if (this.page > 1) { this.page--; this.loadEmployees(); } }

  deleteEmployee(id: number) {
    if (confirm('Delete this employee?')) {
      this.employeeService.delete(id).subscribe(() => this.loadEmployees());
    }
  }

  getFieldValue(rowData: any, field: string) {
    return field.split('.').reduce((obj, key) => obj?.[key], rowData);
  }


  newEmployee = { name: '', position: '', department: '' };

  addEmployee() {
    this.employeeService.create(this.newEmployee).subscribe(() => {
      this.loadEmployees();
      this.newEmployee = { name: '', position: '', department: '' };
    });
  }
}
