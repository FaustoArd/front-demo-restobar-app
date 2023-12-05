import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { count } from 'rxjs';
import { EmployeeDto } from 'src/app/models/employeeDto';
import { WorkingDayDto } from 'src/app/models/workingDayDto';
import { EmployeeService } from 'src/app/services/employee.service';
import { RestoTableService } from 'src/app/services/resto-table.service';
import { StorageService } from 'src/app/services/storage.service';
import { WorkingDayService } from 'src/app/services/working-day.service';

@Component({
  selector: 'app-working-day',
  templateUrl: './working-day.component.html',
  styleUrls: ['./working-day.component.css']
})
export class WorkingDayComponent implements OnInit {

  workingDay!: WorkingDayDto;
  returnedWorkingDay!: WorkingDayDto;
  savedWorkingDay!: WorkingDayDto;
  allEmployees: EmployeeDto[] = [];
  selectedEmployees: EmployeeDto[] = [];
  employee: EmployeeDto | undefined;
  isDayStarted!: boolean;
  employeesId: Array<number> = [];
  errorData: any;
  closeData!:string;

  constructor(private formBuilder: FormBuilder, private workingDayService: WorkingDayService
    , private snackBar: MatSnackBar, private storageService: StorageService,
    private employeeService: EmployeeService, private router: Router,private restoTableService:RestoTableService) { }

  startWorkingDayForm = this.formBuilder.group({
    id: [0],
    totalStartCash: [0, Validators.required],
    employees: [this.formBuilder.array([])]
  });

  onUpdateWorkingDayShow(workingDay: WorkingDayDto): void {
    this.startWorkingDayForm.patchValue({
      id: workingDay?.id,
      totalStartCash: workingDay?.totalStartCash,
      employees: workingDay?.employees.map(e => e.id)
    });
  }



  get totalStartCash() {
    return this.startWorkingDayForm.controls.totalStartCash;
  }
  get employees() {
    return this.startWorkingDayForm.controls.employees;
  }
  ngOnInit(): void {
   //this.deleteWorkingDayStorage();
    this.getAllEmployees();
    this.isDayStarted = Boolean(this.storageService.getCurrentWorkingDayStatus());
    if (this.isDayStarted) {

      this.workingDayService.getWorkingDayById(Number(this.storageService.getCurrentWorkingDayId())).subscribe({
        next: (wdData) => {
          wdData.employees.map(e => this.employeesId.push(e.id));
          this.getEmployeesById(this.employeesId);
          this.onUpdateWorkingDayShow(wdData);
        }
      });

    }
    //this.getEmployeesById(this.employeesId);
  }

  onEmployeeSelection(event: any) {
    this.employeesId.push(event);
    this.allEmployees.filter(e => e.id == event).map(e => this.onSnackBarMessage("Agregada: " + e.employeeName))
    this.getEmployeesById(this.employeesId);
  

  }
  onEmployeeRemove(event: any) {
    this.employeesId.forEach((item, index) => {
      if (item == event) {
        this.employeesId.splice(index, 1)
       }
    })
    this.getEmployeesById(this.employeesId);
    this.allEmployees.filter(e => e.id == event).map(e => this.onSnackBarMessage("Eliminada: " + e.employeeName))
  }

  deleteEmployeesById(employeeId: number): void {
    var workingDayId = Number(this.storageService.getCurrentWorkingDayId());
    this.workingDayService.deleteEmployeesById(employeeId, workingDayId).subscribe({
      next: (wdData) => {
        this.workingDay = wdData;
        this.getEmployeesById(this.employeesId);

      },
      error: (errorData) => {
        this.errorData = errorData;
        this.onSnackBarMessage(this.errorData);
      }

    })
  }
  onUpdateWorkingDay(): void {
    this.startWorkingDayForm.get('employees')?.setValue(this.employeesId);
    if (this.startWorkingDayForm.valid) {
     this.savedWorkingDay = new WorkingDayDto();
      this.savedWorkingDay = Object.assign(this.savedWorkingDay, this.startWorkingDayForm.value)

      this.workingDayService.updateWorkingDay(this.savedWorkingDay).subscribe({
        next: (wData) => {
          this.workingDay = wData
        },
        error: (errorData) => {
          this.errorData = errorData;
          this.onSnackBarMessage(this.errorData);
        },
        complete: () => {
          this.onSnackBarMessage("Jornada actualizada!");
          this.router.navigateByUrl("/home");
        }
      })
    }

    //this.workingDayService.updateWorkingDay()
  }

  onStartWorkgingDay(): void {
    if(this.employeesId.length==0){
      this.onSnackBarMessage("Debes seleccionar al menos un empleado");
    }else{
    this.startWorkingDayForm.get('employees')?.setValue(this.employeesId);
    if (this.startWorkingDayForm.valid) {
      this.workingDay = new WorkingDayDto();
      this.workingDay = Object.assign(this.workingDay, this.startWorkingDayForm.value)
      this.workingDayService.startWorkingDay(this.workingDay).subscribe({
        next: (wDayData) => {
          this.returnedWorkingDay = wDayData;
          this.storageService.setCurrentWorkingDayId(String(this.returnedWorkingDay.id));
          this.storageService.setCurrentWorkingDayStatus(String(this.returnedWorkingDay.dayStarted))
        },
        error: (errorData) => {
          this.errorData = errorData;
          this.onSnackBarMessage(this.errorData);
        },
        complete: () => {
          this.onSnackBarMessage("Dia iniciado")
          this.router.navigateByUrl("/home")
        }
      })
    }
  }
  }
  

  closeWorkingDay(){
    var wdId = Number(this.storageService.getCurrentWorkingDayId());
   this.workingDayService.closeWorkingDay(wdId).subscribe({
    next:(closeData)=>{
      this.closeData = closeData
      this.onSnackBarMessage(closeData);
    },
    error:(errorData)=>{
      this.errorData = errorData;
      this.onSnackBarMessage("No podes finalizar la jornada porque todavia hay mesas abiertas");
    },
    complete:()=>{
      this.storageService.deleteCurrentWorkingDayId();
      this.storageService.deleteCurrentWorkingDayStatus();
      this.router.navigateByUrl("/home");
    }

   });
   
  }




  getEmployeesById(employeesId: Array<number>): void {
    this.employeeService.getAllEmployeesbyId(employeesId).subscribe({
      next: (employeesData) => {
        this.selectedEmployees = employeesData;
      },
      error: (errorData) => {
        this.errorData = errorData;
        this.onSnackBarMessage(this.errorData);
      }
    })
  }
  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(emps => this.allEmployees = emps);
  }

  getWorkingDaybyId(): void {
    this.workingDayService.getWorkingDayById(Number(this.storageService.getCurrentWorkingDayId()))
  }


  deleteWorkingDayStorage() {
    this.storageService.deleteCurrentWorkingDayId();
    this.storageService.deleteCurrentWorkingDayStatus();
  }


  onSnackBarMessage(message: any) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2500,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }

}
