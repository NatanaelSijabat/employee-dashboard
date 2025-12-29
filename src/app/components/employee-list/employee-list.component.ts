import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  pagination: any = {};
  page = 1;
  limit = 10;
  search = '';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.api.getEmployees(this.page, this.limit, this.search).subscribe(res => {
      this.employees = res.data;
      this.pagination = res.pagination;
    });
  }

  searchEmployees(): void {
    this.page = 1;
    this.loadEmployees();
  }

  nextPage(): void {
    if (this.page < this.pagination.totalPages) {
      this.page++;
      this.loadEmployees();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadEmployees();
    }
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure to delete?')) {
      this.api.deleteEmployee(id).subscribe(() => this.loadEmployees());
    }
  }

}
