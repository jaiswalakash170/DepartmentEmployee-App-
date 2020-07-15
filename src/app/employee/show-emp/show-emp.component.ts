import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee-model'

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:EmployeeService) { }

  //listData : MatTableDataSource<any>;
  listData = new MatTableDataSource();
  displayedColumns : string[] = ['Options', 'employeeId', 'employeeName', 'department', 'mailID', 'doj'];

  @ViewChild(MatSort, {static: true}) sort : MatSort;
  
  ngOnInit(): void {
    this.refreshEmpList();
  }

  refreshEmpList() : void{
    this.service.getEmpList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    });
  }
  
  applyFilter(filtervalue: String){
    this.listData.filter = filtervalue.trim().toLocaleLowerCase();
  }
  onAdd() : void{
    console.log("Employee OnAdd() called");
  }

  onEdit(dep:Employee) : void{
    console.log(dep);
  }

  onDelete(id : number) : void{
    console.log(id);
  }
}
