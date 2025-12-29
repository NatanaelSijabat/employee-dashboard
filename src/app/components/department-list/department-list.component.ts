import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './department-list.component.html'
})
export class DepartmentListComponent implements OnInit {
  departments: any[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.api.getDepartments().subscribe({
      next: (res) => (this.departments = res),
      error: (err) => alert(err.error?.message || 'Error loading departments')
    });
  }

  goToCreate() {
    this.router.navigate(['/departments/create']);
  }
}
