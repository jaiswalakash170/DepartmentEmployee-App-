import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee-model'
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<AddEmpComponent>,
    public service:EmployeeService,
    private _snackBar: MatSnackBar) { }

  public listItems: Array<String> = [];

  ngOnInit(): void {
    this.resetForm();
    this.refreshDropdownList();
    console.log(this.listItems);
  }

  refreshDropdownList(): void {
    this.service.getDepDropdownList().subscribe(data => {
      data.forEach(element => {
        this.listItems.push(element["departmentName"]);
      });
    });
  }

  onClose(): void{
    this.dialogbox.close();
    this.service.filter('Register click');
  }

  resetForm(form?:NgForm): void{
    if(form != null)
      form.resetForm();
    
    this.service.formData={
      employeeID:0,
      employeeName:'',
      department:'',
      mailID:'',
      dOJ: ''
    }
  }

  onSubmit(form:NgForm){
    //console.log(form.value);
    this.service.addEmployee(form.value).subscribe((res : Employee)=>
      {
        this.resetForm(form);
        //alert(res);
        var s : string = "Added Employee - " + res.employeeName;
        this._snackBar.open(s, '', {duration: 5000, verticalPosition: 'top',});
        console.log(res);
        console.log(res.employeeName);
      });
  }
}
