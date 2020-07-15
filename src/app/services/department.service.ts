import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Department } from 'src/app/models/department-model';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }

  formData: Department;

  readonly APIUrl = "http://localhost:9999/department/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getDepList() : Observable<Department[]>{
    return this.http.get<Department[]>(this.APIUrl + 'show');
  }

  addDepartment(dep:Department){
    return this.http.post(this.APIUrl + 'add', this.formData, this.httpOptions);
  }

  deleteDepartment(id: number){
    return this.http.delete(this.APIUrl + 'delete/' + id, this.httpOptions);
  }

  private _listeners = new Subject<any>();

  listen():Observable<any>{
    return this._listeners.asObservable(); 
  }

  filter(filterBy:string){
    this._listeners.next(filterBy);
  }
}
