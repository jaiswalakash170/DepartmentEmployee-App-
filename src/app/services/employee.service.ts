import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Employee } from 'src/app/models/employee-model';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  readonly APIUrl = "http://localhost:9999/employee/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getEmpList() : Observable<Employee[]>{
    return this.http.get<Employee[]>(this.APIUrl + 'show');
  }
}
