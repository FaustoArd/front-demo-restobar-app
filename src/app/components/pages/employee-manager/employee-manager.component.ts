import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeDto } from 'src/app/models/employeeDto';
import { EmployeeJobDto } from 'src/app/models/employeeJobDto';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-manager',
  templateUrl: './employee-manager.component.html',
  styleUrls: ['./employee-manager.component.css']
})
export class EmployeeManagerComponent implements OnInit{

  employeeJob!:EmployeeJobDto;
  employeeJobs:EmployeeJobDto[]=[];
  employee!:EmployeeDto;
  employees:EmployeeDto[]=[];
  errorData!:string;


  constructor(private employeeService:EmployeeService,private snackBar:MatSnackBar,
    private formBuilder:FormBuilder,private router:Router){}

  ngOnInit(): void {
      this.getAllJobRoles();
  }

  jobRoleBuilder = this.formBuilder.group({
   
    id:[0],
    jobRole:['',Validators.required],
    employeeSalary:['',Validators.required]
  });

get jobRole(){
  return this.jobRoleBuilder.controls.jobRole;
}

get employeeSalary(){
  return this.jobRoleBuilder.controls.employeeSalary;
}

onCreateJobRole(){
  if(this.jobRoleBuilder.valid){
    this.employeeJob = new EmployeeJobDto();
    this.employeeJob = Object.assign(this.employeeJob, this.jobRoleBuilder.value);

  this.employeeService.createJobRole(this.employeeJob).subscribe({
    next:(jobData)=>{
this.onSnackBarMessage(jobData)
    },
    error:(errorData)=>{
      this.errorData = errorData;
      this.onSnackBarMessage(this.errorData)
     
    },
    complete:()=>{
      this.onSnackBarMessage("Guardado!")
      this.router.navigateByUrl('employee-manager')
    }
  })
  }
}

getAllJobRoles(){
  this.employeeService.getAllJobRolesOrderAsc().subscribe({
    next:(jobsData)=>{
      this.employeeJobs = jobsData;
    },
    error:(errorData)=>{
      this.errorData = errorData;
    }
  })
}
onSnackBarMessage(message:any){
  this.snackBar.open(message, 'Cerrar', {
       duration: 3000,
       verticalPosition: 'top',
       horizontalPosition: 'center',
       
     });
}


}
