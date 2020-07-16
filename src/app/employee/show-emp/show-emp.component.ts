import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee-model'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEmpComponent } from '../add-emp/add-emp.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditEmpComponent } from '../edit-emp/edit-emp.component';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:EmployeeService,
    private dialog:MatDialog,
    private _snackBar: MatSnackBar) { 
      this.service.listen().subscribe((m:any) => {
        console.log(m);
        this.refreshEmpList();
      });
    }

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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(AddEmpComponent, dialogConfig);
  }

  onEdit(emp:Employee) : void{
    console.log("Employee OnAdd() - " + emp);
    this.service.formData = emp;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = emp;
    this.dialog.open(EditEmpComponent, dialogConfig);
  }

  onDelete(id : number) : void{
    console.log("Employee onDelete() - ID : " + id);
    if(confirm('Are you sure to delete!!!!'))
    {
      this.service.deleteEmployee(id).subscribe((res : Employee)=>
      {
        console.log(res);
        var s : string = "Deleted Employee - " + res.employeeName;
        this._snackBar.open(s, '', {duration: 5000, verticalPosition: 'top',});
      });
      this.service.filter('Register click');
    }
  }
}
