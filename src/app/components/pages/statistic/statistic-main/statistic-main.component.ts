import { Component, OnInit } from '@angular/core';
import { EmployeeDto } from 'src/app/models/employeeDto';
import { WorkingDayDto } from 'src/app/models/workingDayDto';
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

  

  constructor(private workingDayService:WorkingDayService,private restoTableClosedService:RestoTableClosedService,
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
}
