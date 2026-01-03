import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ToastModule
  ],
  templateUrl: './department.component.html'
})
export class DepartmentComponent implements OnInit {

  departments: any[] = [];
  showAddDialog = false;

  newDepartment = {
    DepartmentName: ''
  };

  constructor(
    private departmentService: DepartmentService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getAll().subscribe({
      next: (res: any) => {
        this.departments = res.data ?? res;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load departments'
        });
      }
    });
  }

  addDepartment() {
    if (!this.newDepartment.DepartmentName.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Department name is required'
      });
      return;
    }

    this.departmentService.create(this.newDepartment).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Department added successfully'
        });

        this.showAddDialog = false;
        this.newDepartment = { DepartmentName: '' };
        this.loadDepartments();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add department'
        });
      }
    });
  }
}
