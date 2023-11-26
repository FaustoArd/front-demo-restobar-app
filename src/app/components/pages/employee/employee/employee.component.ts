import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeDto } from 'src/app/models/employeeDto';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeJobDto } from 'src/app/models/employeeJobDto';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

employee!:EmployeeDto;
employees:EmployeeDto[] = [];
employeeJobs:EmployeeJobDto[]= [];
errorData!:string;

  constructor(private router:Router,private snackBar:MatSnackBar,private formbuilder:FormBuilder,private employeeService:EmployeeService){ }



  employeeForm = this.formbuilder.group({
    id:[0],
    employeeName:['',Validators.required],
    employeeJobId:['', Validators.required],
   
  })

  get employeeName(){
    return this.employeeForm.controls.employeeName;
  }
  get employeeJobId(){
    return this.employeeForm.controls.employeeJobId;
  }
 

  ngOnInit(): void {
      this.getAllEmployees();
      this.getAllJobRoles();
  }

  createEmployee(){
    if(this.employeeForm.valid){
    this.employee = new EmployeeDto();
    this.employee = Object.assign(this.employee, this.employeeForm.value);
    this.employeeService.createEmployee(this.employee).subscribe({
      next:(empData)=>{
        this.onSnackBarMessage(empData);
      this.employeeForm.reset();
      },
      error:(errorData)=>{
        this.onSnackBarMessage(errorData);
      },
      complete:()=>{
        this.getAllEmployees();
      }
    });
  }else{
    this.employeeForm.markAllAsTouched();
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

  getAllEmployees(){
    this.employeeService.getAllEmployees().subscribe(emps => this.employees = emps)
  }

  onSnackBarMessage(message:any){
    this.snackBar.open(message, 'Cerrar', {
         duration: 3000,
         verticalPosition: 'top',
         horizontalPosition: 'center',
         
       });
  }
}
