import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  imports: [FormsModule]
})

export class EmployeeFormComponent implements OnInit {
  employee: any = {
    Name: '',
    Position: '',
    Salary: 0,
    DepartmentID: null
  };
  departments: any[] = [];
  isEdit = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadDepartments();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.api.getEmployee(+id).subscribe(res => {
        this.employee = {
          Name: res.Name,
          Position: res.Position,
          Salary: res.Salary,
          DepartmentID: res.DepartmentID
        };
      });
    }
  }

  loadDepartments(): void {
    this.api.getDepartments().subscribe(res => {
      this.departments = res;
    });
  }

  save(): void {
    if (this.isEdit) {
      const id = this.route.snapshot.paramMap.get('id');
      this.api.updateEmployee(+id!, this.employee).subscribe({
        next: () => this.router.navigate(['/employees']),
        error: err => alert(err.error?.message || 'Error updating employee')
      });
    } else {
      this.api.createEmployee(this.employee).subscribe({
        next: () => this.router.navigate(['/employees']),
        error: err => alert(err.error?.message || 'Error creating employee')
      });
    }
  }
}
