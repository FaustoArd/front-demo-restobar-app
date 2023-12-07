import { Component,OnInit, TemplateRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeDto } from 'src/app/models/employeeDto';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeJobDto } from 'src/app/models/employeeJobDto';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogTemplateComponent } from 'src/app/components/dialog/dialog-template-component/dialog-template-component';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

employee!:EmployeeDto;
updatedEmployee!:EmployeeDto;
employees:EmployeeDto[] = [];
employeeJobs:EmployeeJobDto[]= [];
errorData!:string;
empData!:string;

  constructor(private router:Router,private snackBar:MatSnackBar,private formbuilder:FormBuilder,
    private employeeService:EmployeeService,private dialogService:DialogService){ }



  employeeForm = this.formbuilder.group({
    id:[0],
    employeeName:['',[Validators.required, Validators.maxLength(30)]],
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

  updateEmployeeForm = this.formbuilder.group({
    id:[0],
    employeeName:['',[Validators.required, Validators.maxLength(30)]],
    employeeJob:[''],
    employeeJobId:[0, Validators.required],
  });

  create():void{
    this.updateEmployeeForm.reset();
    this.matDialogRef.close();
  }

  onUpdateEmployeeShow():void{
    this.updateEmployeeForm.patchValue({
      id:this.updatedEmployee.id,
      employeeName:this.updatedEmployee.employeeName,
      employeeJob:this.updatedEmployee.employeeJob,
      employeeJobId:this.updatedEmployee.employeeJobId,
    })
  }
  onCreate(){
    this.matDialogRef.close();
    this.updateEmployeeForm.reset();

  }

  private matDialogRef!: MatDialogRef<DialogTemplateComponent>

   /**Mat dialog ref update form */
   openDialogUpdateJobRole(id: number, template: TemplateRef<any>) {
   this.getEmployeeById(id);
    this.getAllJobRoles();
    this.matDialogRef = this.dialogService.openDialogRestoTableCreation({
      template
    });
    this.matDialogRef.afterClosed().subscribe(res => { console.log('Creation table template close', res) })
    this.updateEmployeeForm.reset();

  }

  updateEmployee():void{
    if(this.updateEmployeeForm.valid){
      this.updatedEmployee = Object.assign(this.updatedEmployee,this.updateEmployeeForm.value);
      this.employeeService.createEmployee(this.updatedEmployee).subscribe({
        next:(empData)=>{
          this.onSnackBarMessage(empData);
        },
        error:(errorData)=>{
          this.errorData = errorData;
          this.onSnackBarMessage(this.errorData);
        },
        complete:()=>{
          this.onSnackBarMessage("Guardado!")
          this.getAllEmployees();
        }
      })
    }
  }


  getEmployeeById(id:number):void{
    this.employeeService.getEmployeeById(id).subscribe({
      next:(empData)=>{
        this.updatedEmployee = empData;
        this.onUpdateEmployeeShow();
      }
      , error:(errorData)=>{
        this.errorData = errorData;
        this.onSnackBarMessage(this.errorData);
      }
    });
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

  deleteEmployee(id:number):void{
    this.employeeService.deleteEmployeeById(id).subscribe({
      next:(empData)=>{
        this.empData = empData;
      },
      error:(errorData)=>{
        this.errorData = errorData;
        this.onSnackBarMessage(this.errorData);
      },
      complete:()=>{
        this.onSnackBarMessage(this.empData);
        this.getAllEmployees();

      }
    })
  }

  onSnackBarMessage(message:any){
    this.snackBar.open(message, 'Cerrar', {
         duration: 3000,
         verticalPosition: 'bottom',
         horizontalPosition: 'center',
         
       });
  }
}
