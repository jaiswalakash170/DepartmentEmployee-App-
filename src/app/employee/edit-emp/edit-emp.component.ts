import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Employee } from 'src/app/models/employee-model';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment'; 

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS, 
      useValue: MY_FORMATS
    }
  ],
})

export class EditEmpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditEmpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    public service:EmployeeService,
    private _snackBar: MatSnackBar) { }

  public date = moment();
  public listItems: Array<String> = [];

  ngOnInit(): void {
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
    this.dialogRef.close();
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
      doj: ''
    }
  }

  onSubmit(form:NgForm){
    this.service.formData.doj = this.date.format("YYYY-MM-DD").toString();
    this.service.addEmployee(form.value).subscribe((res : Employee)=>
      {
        this.resetForm(form);
        var s : string = "Updated Employee - " + res.employeeName;
        this._snackBar.open(s, '', {duration: 5000, verticalPosition: 'top',});
        console.log(res);
        console.log(res.employeeName);
      });
  }
}
