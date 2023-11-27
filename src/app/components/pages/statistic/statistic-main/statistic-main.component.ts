import { Component, OnInit } from '@angular/core';
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
  

  constructor(private workingDayService:WorkingDayService,private restoTableClosedService:RestoTableClosedService,
    ){ }

  ngOnInit(): void {
    this.getAllWorkingDays();
      
  }


  getAllWorkingDays(){
    this.workingDayService.getallWorkingDayByDateAsc().subscribe(wd => this.workingDays =wd)
  }
}
