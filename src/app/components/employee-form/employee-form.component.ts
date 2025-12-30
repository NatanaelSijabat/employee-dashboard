import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, DropdownModule, ButtonModule, InputTextModule, InputNumberModule],
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent {
  employee: any = {};
  departments: any[] = [];
  id: number | null = null;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) this.loadEmployee();
  }

  loadEmployee() {
    this.employeeService.getById(this.id!).subscribe(res => this.employee = res);
  }

  save() {
    const obs = this.id
      ? this.employeeService.update(this.id, this.employee)
      : this.employeeService.create(this.employee);
    obs.subscribe(() => this.router.navigate(['/employees']));
  }
}
