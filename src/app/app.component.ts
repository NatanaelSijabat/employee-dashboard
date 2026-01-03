import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Employee Dashboard';
}
