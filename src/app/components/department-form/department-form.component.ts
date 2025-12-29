import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  imports: [FormsModule]
})
export class DepartmentFormComponent implements OnInit {
  department: any = { DepartmentName: '' };
  isEdit = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.api.getDepartment(+id).subscribe(res => {
        this.department = { DepartmentName: res.DepartmentName };
      });
    }
  }

  save(): void {
    if (this.isEdit) {
      const id = this.route.snapshot.paramMap.get('id');
      this.api.updateDepartment(+id!, this.department).subscribe({
        next: () => this.router.navigate(['/departments']),
        error: err => alert(err.error?.message || 'Error updating department')
      });
    } else {
      this.api.createDepartment(this.department).subscribe({
        next: () => this.router.navigate(['/departments']),
        error: err => alert(err.error?.message || 'Error creating department')
      });
    }
  }
}
