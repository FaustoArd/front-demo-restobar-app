import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EmployeeDto } from 'src/app/models/employeeDto';
import { RestoTableClosedDto } from 'src/app/models/restoTableClosedDto';
import { RestoTableClosedService } from 'src/app/services/resto-table-closed.service';
import { WorkingDayService } from 'src/app/services/working-day.service';

@Component({
  selector: 'app-tables-closed',
  templateUrl: './tables-closed.component.html',
  styleUrls: ['./tables-closed.component.css']
})
export class TablesClosedComponent implements OnInit {

  employees:EmployeeDto[]= [];
  tablesClosed:RestoTableClosedDto[]=[];
  errorData!:string;

  constructor(private restoTableClosedService:RestoTableClosedService,private route:ActivatedRoute,
    private snackBar:MatSnackBar,private workingDayService:WorkingDayService){}


    ngOnInit(): void {
        this.getTablesClosedByWorkingDayId();
        this.getEmployeesByWorkingDayId();
    }

  getTablesClosedByWorkingDayId():void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.restoTableClosedService.getAllRestoTableClosedByWorkingDayIdOrderByTableNumberAsc(id).subscribe({
      next:(tablesClosedData)=>{
        this.tablesClosed = tablesClosedData;
      },
      error:(errorData)=>{
        this.errorData = errorData;
        this.onSnackBarMessage(this.errorData);

      }
    })
  }

  getEmployeesByWorkingDayId(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.workingDayService.findCurrentEmployees(id).subscribe(emps => this.employees = emps);
  }


  onSnackBarMessage(message: any) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}
