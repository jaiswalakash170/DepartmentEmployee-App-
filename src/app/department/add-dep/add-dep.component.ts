import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { DepartmentService } from 'src/app/services/department.service';
import { NgForm } from '@angular/forms';
import { Department } from 'src/app/models/department-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-dep',
  templateUrl: './add-dep.component.html',
  styleUrls: ['./add-dep.component.css']
})
export class AddDepComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<AddDepComponent>,
    public service:DepartmentService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.resetForm();
  }

  onClose(): void{
    this.dialogbox.close();
    this.service.filter('Register click');
  }

  resetForm(form?:NgForm): void{
    if(form != null)
      form.resetForm();
    
    this.service.formData={
      departmentID:0,
      departmentName:''
    }

  }

  onSubmit(form:NgForm){
    //console.log(form.value);
    this.service.addDepartment(form.value).subscribe((res : Department)=>
      {
        this.resetForm(form);
        //alert(res);
        var s : string = "Added Department - " + res.departmentName;
        this._snackBar.open(s, '', {duration: 5000, verticalPosition: 'top',});
        console.log(res);
        console.log(res.departmentName);
      });
  }
}
