import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private baseUrl = 'http://localhost:3006/api/departments';
  private headers = new HttpHeaders({ 'x-api-key': 'secret123' });

  constructor(private http: HttpClient) { }

  getAll(): any {
    return this.http.get(this.baseUrl, { headers: this.headers });
  }

  create(department:any): any {
    return this.http.post(this.baseUrl, department, { headers: this.headers });
  }

  update(id: number, department:any): any {
    return this.http.patch(`${this.baseUrl}/${id}`, department, { headers: this.headers });
  }

  delete(id: number): any {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.headers });
  }
}
