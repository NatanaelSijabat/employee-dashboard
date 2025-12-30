// src/app/services/employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private baseUrl = 'http://localhost:3000/api/employees';
  private headers = new HttpHeaders({ 'x-api-key': 'secret123' });

  constructor(private http: HttpClient) {}

  getAll(page = 1, limit = 10, search = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('search', search);
    return this.http.get(this.baseUrl, { headers: this.headers, params });
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, { headers: this.headers });
  }

  create(employee: any): Observable<any> {
    return this.http.post(this.baseUrl, employee, { headers: this.headers });
  }

  update(id: number, employee: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, employee, { headers: this.headers });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.headers });
  }
}
