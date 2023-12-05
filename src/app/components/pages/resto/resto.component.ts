import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeDto } from 'src/app/models/employeeDto';
import { RestoTableDto } from 'src/app/models/restoTableDto';
import { EmployeeService } from 'src/app/services/employee.service';
import { RestoTableService } from 'src/app/services/resto-table.service';
import { StorageService } from 'src/app/services/storage.service';
import { RestoTableCreateDto } from 'src/app/models/resto-table-create-dto';
import { MatDialogRef } from '@angular/material/dialog';
import { TemplateRef } from '@angular/core'
import { DialogTemplateComponent } from '../../dialog/dialog-template-component/dialog-template-component';
import { DialogService } from 'src/app/services/dialog.service';
import { Dialog } from '@angular/cdk/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'
import { WorkingDayService } from 'src/app/services/working-day.service';
import { WorkingDayDto } from 'src/app/models/workingDayDto';
@Component({
  selector: 'app-resto',
  templateUrl: './resto.component.html',
  styleUrls: ['./resto.component.css']
})
export class RestoComponent implements OnInit {
  restoTables: RestoTableDto[] = [];
  restoTable!: RestoTableDto;
  employees: EmployeeDto[] = [];
  restoCreationDto!: RestoTableCreateDto;

 // workinDayDto!: WorkingDayDto;
 isDayStarted!:boolean;
 errorData!:String;

  


  constructor(private restoTableService: RestoTableService, private storageService: StorageService,
    private router: Router, private formBuilder: FormBuilder, private employeeService: EmployeeService,
    private dialogService: DialogService, private snackBar: MatSnackBar,
     private workingDayService: WorkingDayService) { }

  ngOnInit(): void {
   
    this.isWorkingDayStarted();
    this.getAllTablesOrderByIdAsc();
  }

  private matDialogRef!: MatDialogRef<DialogTemplateComponent>

  openDialogRestoTableCreation(template: TemplateRef<any>) {
    if(!this.isDayStarted){
      this.onSnackBarMessage("Debes iniciar la jornada de trabajo para poder abrir mesas...")
    }else{
    this.getEmployeesByWorkingDayId();
    this.matDialogRef = this.dialogService.openDialogRestoTableCreation({
      template
    })
    this.matDialogRef.afterClosed().subscribe(res => { console.log('Update Job Role template close', res) })
    this.createRestoTableForm.reset();
  }
  }

  onCreate() {
    this.createRestoTableForm.reset();
    this.matDialogRef.close();
  }

  createRestoTableForm = this.formBuilder.group({
    employeeId: [0],
    tableNumber: [0, Validators.required],
    id: [0]
  });
  get id() {
    return this.createRestoTableForm.controls.id;
  }
  get employeeId() {
    return this.createRestoTableForm.controls.employeeId;
  }
  get tableNumber() {
    return this.createRestoTableForm.controls.tableNumber;
  }
  onOpenTableSubmit(): void {
    this.createRestoTableForm.get('id')?.setValue(Number(this.storageService.getTableIdForTableCreation()))
    console.log(this.createRestoTableForm.value)
    if (this.createRestoTableForm.valid) {
      restoDto: new RestoTableCreateDto();
    this.restoTableService.openNewTable(
        this.createRestoTableForm.value as RestoTableCreateDto
      ).subscribe({
        next: (tableData) => {
          console.log(tableData)
        },
        error: (errorData) => {
          this.onSnackBarMessage(errorData);
        },
        complete: () => {
          this.onSnackBarMessage('Mesa activa');
          this.getAllTablesOrderByIdAsc();
        }
      });
    }
  }

 
  saveTableIdForTableCreation(id: number) {
    console.log("id:::" + id )
    this.storageService.setTableIdForTableCreation(String(id));
    console.log("saveTableidForTableCreation:" + this.storageService.getTableIdForTableCreation())
  }
  saveTableIdForOrder(id: number) {
    this.storageService.setTableIdAfterTableSelection(String(id));
  }
  getAllTables() {
    this.restoTableService.getAllTables().subscribe(restoTable => this.restoTables = restoTable)
  }
  getAllTablesOrderByIdAsc() {
    this.restoTableService.getAllTablesOrderByIdAsc().subscribe(restoTable => this.restoTables = restoTable);
  }
  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(employee => this.employees = employee);
  }
  getEmployeesByWorkingDayId():void{
    this.workingDayService.findCurrentEmployees(Number(this.storageService.getCurrentWorkingDayId())).subscribe({
      next:(empData)=>{
        this.employees = empData;
      },
      error:()=>{
        this.errorData = this.errorData;
        this.onSnackBarMessage(this.errorData);
      }


    })
  }

  isWorkingDayStarted(){
  
    this.workingDayService.isDayStarted(Number(this.storageService.getCurrentWorkingDayId())).subscribe({
      next:(startedData)=>{
        this.isDayStarted = startedData;
      },
      error:(errorData)=>{
        this.errorData = errorData;
        this.onSnackBarMessage("Debe logearse para tener acceso!")
      }
     });
  }

  onSnackBarMessage(message: any) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }

}
