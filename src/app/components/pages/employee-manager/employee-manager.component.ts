import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeDto } from 'src/app/models/employeeDto';
import { EmployeeJobDto } from 'src/app/models/employeeJobDto';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TemplateRef } from '@angular/core'
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { DialogTemplateComponent } from '../../dialog/dialog-template-component/dialog-template-component';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';

@Component({
  selector: 'app-employee-manager',
  templateUrl: './employee-manager.component.html',
  styleUrls: ['./employee-manager.component.css']
})
export class EmployeeManagerComponent implements OnInit {

  employeeJob!: EmployeeJobDto;
  updateEmployeeJob!: EmployeeJobDto;
  employeeJobs: EmployeeJobDto[] = [];
  employee!: EmployeeDto;
  employees: EmployeeDto[] = [];
  errorData!: string;
  deleteJobData!:string;


  constructor(private employeeService: EmployeeService, private snackBar: MatSnackBar,
    private formBuilder: FormBuilder, private router: Router, private dialogService: DialogService,
    private confirmDialogService:ConfirmDialogService) { }

  ngOnInit(): void {
    this.getAllJobRoles();
  }

  /**Employee Job create form*/
  jobRoleBuilder = this.formBuilder.group({

    id: [0],
    jobRole: ['', Validators.required],
    employeeSalary: ['', Validators.required]
  });

  get jobRole() {
    return this.jobRoleBuilder.controls.jobRole;
  }

  get employeeSalary() {
    return this.jobRoleBuilder.controls.employeeSalary;
  }

  onCreateJobRole() {
    if (this.jobRoleBuilder.valid) {
      this.employeeJob = new EmployeeJobDto();
      this.employeeJob = Object.assign(this.employeeJob, this.jobRoleBuilder.value);

      this.employeeService.createJobRole(this.employeeJob).subscribe({
        next: (jobData) => {
          this.onSnackBarMessage(jobData)
        },
        error: (errorData) => {
          this.errorData = errorData;
          this.onSnackBarMessage(this.errorData)

        },
        complete: () => {
          this.onSnackBarMessage("Guardado!")
          this.getAllJobRoles();
        }
      });
    }
  }

  /**EmployeeJob update form */
  updateEmployeeJobForm = this.formBuilder.group({
    id: [0],
    jobRole: ['', Validators.required],
    employeeSalary: [0, Validators.required]
  });

  onUpdateJobRoleShow(): void {
    this.updateEmployeeJobForm.patchValue({
      id: this.updateEmployeeJob?.id,
      jobRole: this.updateEmployeeJob?.jobRole,
      employeeSalary: this.updateEmployeeJob?.employeeSalary
    });
  }

  onCreate() {
    this.updateEmployeeJobForm.reset();
    this.matDialogRef.close();
  }


  private matDialogRef!: MatDialogRef<DialogTemplateComponent>

  /**Mat dialog ref update form */
  openDialogUpdateJobRole(id: number, template: TemplateRef<any>) {
    this.getJobRoleById(id);
    this.matDialogRef = this.dialogService.openDialogRestoTableCreation({
      template
    });
    this.matDialogRef.afterClosed().subscribe(res => { console.log('Creation table template close', res) })
    this.updateEmployeeJobForm.reset();

  }
  onUpdateJobRole() {
    if (this.updateEmployeeJobForm.valid) {
      console.log(this.updateEmployeeJobForm.value)
      console.log(this.updateEmployeeJob.id)

      //this.updateEmployeeJob = new EmployeeJobDto();
      this.updateEmployeeJob = Object.assign(this.updateEmployeeJob, this.updateEmployeeJobForm.value);

      this.employeeService.createJobRole(this.updateEmployeeJob).subscribe({
        next: (jobData) => {
          this.onSnackBarMessage(jobData)
        },
        error: (errorData) => {
          this.errorData = errorData;
          this.onSnackBarMessage(this.errorData)

        },
        complete: () => {
          this.onSnackBarMessage("Guardado!")
          this.getAllJobRoles();
        }
      });
    }

  }
  getJobRoleById(id: number): void {
    this.employeeService.getEmployeeJobById(id).subscribe({
      next: (jobData) => {
        this.updateEmployeeJob = jobData;
        this.onUpdateJobRoleShow();
      }
    });
  }

  getAllJobRoles() {
    this.employeeService.getAllJobRolesOrderAsc().subscribe({
      next: (jobsData) => {
        this.employeeJobs = jobsData;
      },
      error: (errorData) => {
        this.errorData = errorData;
      }
    });
  }

  onDeleteEmployee(id:number){
    var dialogText = 'Esta seguro? , se eliminaran todos los empleados relacionados con este rol de trabajo'
    this.confirmDialogService.confirmDialog(dialogText).subscribe({
      next:(confirmData)=>{
        if(confirmData){
          this.deleteEmployeeJobById(id);
        }else{
          this.onSnackBarMessage("Cancelado");
        }
      }
    })
  }

  deleteEmployeeJobById(id:number):void{
    this.employeeService.deleteEmployeeJobById(id).subscribe({
      next:(deleteJobData)=>{
        this.deleteJobData = deleteJobData;
      },
      error:(errorData)=>{
        this.errorData= errorData;
        this.onSnackBarMessage(this.errorData);
      },
      complete:()=>{
        this.onSnackBarMessage(this.deleteJobData);
        this.getAllJobRoles();
      }
    })
  }

  

  onSnackBarMessage(message: any) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',

    });
  }


}
