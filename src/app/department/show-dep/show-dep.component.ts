import { Component, OnInit } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {Department} from 'src/app/models/department-model'

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor() { }

  listData : MatTableDataSource<any>;
  displayedColumns : string[] = ['Options', 'DepartmentID', 'DepartmentName'];

  ngOnInit(): void {
    this.refreshDepList();
  }

  refreshDepList() : void{
    var dummyData = [{DepartmentID:1, DepartmentName:"IT"}, 
                     {DepartmentID:2, DepartmentName:"Finance"},
                     {DepartmentID:3, DepartmentName:"HR"},
                     {DepartmentID:4, DepartmentName:"R&D"},
                     {DepartmentID:5, DepartmentName:"Marketing"},
                     {DepartmentID:6, DepartmentName:"Admin"},
                     {DepartmentID:7, DepartmentName:"Support"},];
    this.listData = new MatTableDataSource(dummyData);
  }

  onEdit(dep:Department) : void{
    console.log(dep);
  }

  onDelete(id : number) : void{
    console.log(id);
  }
}
