import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Department } from 'src/app/models/department-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }

  formData: Department;

  readonly APIUrl = "http://localhost:9999/department/";

  getDepList() : Observable<Department[]>{
    return this.http.get<Department[]>(this.APIUrl + 'show');
  }

  addDepartment(dep:Department){
    return this.http.post(this.APIUrl + 'add', this.formData);
  }
}
