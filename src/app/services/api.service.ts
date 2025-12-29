import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';
  private headers = new HttpHeaders({ 'x-api-key': 'secret123', 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  // Employee
  getEmployees(page?: number, limit?: number, search?: string): Observable<any> {
    let params = new HttpParams();
    if (page) params = params.set('page', page);
    if (limit) params = params.set('limit', limit);
    if (search) params = params.set('search', search);
    return this.http.get(`${this.baseUrl}/employees`, { headers: this.headers, params });
  }

  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/employees/${id}`, { headers: this.headers });
  }

  createEmployee(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/employees`, data, { headers: this.headers });
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/employees/${id}`, data, { headers: this.headers });
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/employees/${id}`, { headers: this.headers });
  }

  // Department
  getDepartments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/departments`, { headers: this.headers });
  }

  getDepartment(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/departments/${id}`, { headers: this.headers });
  }

  createDepartment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/departments`, data, { headers: this.headers });
  }

  updateDepartment(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/departments/${id}`, data, { headers: this.headers });
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/departments/${id}`, { headers: this.headers });
  }
}
