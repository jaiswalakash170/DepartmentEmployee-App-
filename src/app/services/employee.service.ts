import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Employee } from 'src/app/models/employee-model';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Department } from '../models/department-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  formData: Employee;

  readonly APIUrl = "http://localhost:9999/employee/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getEmpList() : Observable<Employee[]>{
    return this.http.get<Employee[]>(this.APIUrl + 'show', this.httpOptions);
  }

  getDepDropdownList() : Observable<any>{
    return this.http.get<Department[]>(this.APIUrl + 'department', this.httpOptions);
  }

  addEmployee(dep:Employee){
    return this.http.post(this.APIUrl + 'add', this.formData, this.httpOptions);
  }

  private _listeners = new Subject<any>();

  listen():Observable<any>{
    return this._listeners.asObservable(); 
  }

  filter(filterBy:string){
    this._listeners.next(filterBy);
  }
}
