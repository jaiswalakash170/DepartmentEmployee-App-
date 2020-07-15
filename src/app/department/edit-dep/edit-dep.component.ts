import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Department } from 'src/app/models/department-model';
import { DepartmentService } from 'src/app/services/department.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-dep',
  templateUrl: './edit-dep.component.html',
  styleUrls: ['./edit-dep.component.css']
})
export class EditDepComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditDepComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Department,
    public service:DepartmentService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onClose(): void{
    this.dialogRef.close();
    this.service.filter('Register click');
  }

  onSubmit(form:NgForm){
    //console.log(form.value);
    this.service.updateDepartment(form.value).subscribe((res : Department)=>
      {
        var s : string = "Updated Department - " + res.departmentName;
        this._snackBar.open(s, '', {duration: 5000, verticalPosition: 'top',});
        console.log(res);
        console.log(res.departmentName);
      });
  }
}
