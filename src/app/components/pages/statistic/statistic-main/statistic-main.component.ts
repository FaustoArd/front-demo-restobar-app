import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeDto } from 'src/app/models/employeeDto';
import { WorkingDayDto } from 'src/app/models/workingDayDto';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { RestoTableClosedService } from 'src/app/services/resto-table-closed.service';
import { RestoTableService } from 'src/app/services/resto-table.service';
import { WorkingDayService } from 'src/app/services/working-day.service';

@Component({
  selector: 'app-statistic-main',
  templateUrl: './statistic-main.component.html',
  styleUrls: ['./statistic-main.component.css']
})
export class StatisticMainComponent implements OnInit{


  workingDays:WorkingDayDto[]= [];
employees:EmployeeDto[]= [];
excelData:any;
wdDeletedData!:string
errorData!:string;
confirmData!:boolean;

  

  constructor(private workingDayService:WorkingDayService,private restoTableClosedService:RestoTableClosedService,
    private snackBar:MatSnackBar,private confirmDialogService:ConfirmDialogService
    ){ }

  ngOnInit(): void {
    this.getAllWorkingDays();
      
  }


  getAllWorkingDays(){
    this.workingDayService.getallWorkingDayByDateAsc().subscribe(wd => this.workingDays =wd)
  }

  getEmployeesByWorkingDayId(id:number){
   
    this.workingDayService.findCurrentEmployees(id).subscribe(emps => this.employees = emps);
  }

  getExcelFile(id:number):void{
    this.workingDayService.exportToExcel(id).subscribe({
      next:(excelData)=>{
        this.excelData = excelData;
      }
    });
  }

onDeleteWorkingDay(id:number){
  var confirmText = 'Esta seguro? , se eliminaran todas las mesas cerradas relacionadas con esta jornada.'
  this.confirmDialogService.confirmDialog(confirmText).subscribe({
    next:(confirmData)=>{
      this.confirmData = confirmData;
      if(this.confirmData){
        this.deleteWorkingDayById(id);
      }else{
        this.onSnackBarMessage("Cancelado!");
      }
    }
  })
}




  deleteWorkingDayById(id:number):void{
    this.workingDayService.deleteWorkingDay(id).subscribe({
      next:(wdDeletedData)=>{
        this.wdDeletedData = wdDeletedData;
      },
      error:(errorData)=>{
        this.errorData = errorData;
        this.onSnackBarMessage(this.errorData);

      },
      complete:()=>{
        this.onSnackBarMessage(this.wdDeletedData);
        this.getAllWorkingDays();
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
