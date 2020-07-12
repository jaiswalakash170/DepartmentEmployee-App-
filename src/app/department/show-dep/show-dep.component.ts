import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { Department } from 'src/app/models/department-model';
import { DepartmentService } from 'src/app/services/department.service';
import { AddDepComponent } from 'src/app/department/add-dep/add-dep.component';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service:DepartmentService, private dialog:MatDialog) { }

  //listData : MatTableDataSource<any>;
  listData = new MatTableDataSource();
  displayedColumns : string[] = ['Options', 'departmentID', 'departmentName'];

  @ViewChild(MatSort, {static: true}) sort : MatSort;

  ngOnInit(): void {
    this.refreshDepList();
  }

  refreshDepList() : void{
    this.service.getDepList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    });
    /*var dummyData = [{DepartmentID:1, DepartmentName:"IT"}, 
                     {DepartmentID:2, DepartmentName:"Finance"},
                     {DepartmentID:3, DepartmentName:"HR"},
                     {DepartmentID:4, DepartmentName:"R&D"},
                     {DepartmentID:5, DepartmentName:"Marketing"},
                     {DepartmentID:6, DepartmentName:"Admin"},
                     {DepartmentID:7, DepartmentName:"Support"},];
    this.listData = new MatTableDataSource(dummyData);*/
  }

  applyFilter(filtervalue: String){
      this.listData.filter = filtervalue.trim().toLocaleLowerCase();
  }

  onAdd() : void{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "70%";
      this.dialog.open(AddDepComponent, dialogConfig);
  }

  onEdit(dep:Department) : void{
    console.log(dep);
  }

  onDelete(id : number) : void{
    console.log(id);
  }
}
