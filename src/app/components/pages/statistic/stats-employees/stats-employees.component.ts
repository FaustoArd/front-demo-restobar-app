import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeDto } from 'src/app/models/employeeDto';
import { WorkingDayService } from 'src/app/services/working-day.service';

@Component({
  selector: 'app-stats-employees',
  templateUrl: './stats-employees.component.html',
  styleUrls: ['./stats-employees.component.css']
})
export class StatsEmployeesComponent implements OnInit {

constructor(private workingDayservice:WorkingDayService,private route:ActivatedRoute){ }

employees:EmployeeDto[] = [];

  ngOnInit(): void {
    this.getEmployeesByWorkingDayId();
      
  }

  getEmployeesByWorkingDayId(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.workingDayservice.findCurrentEmployees(id).subscribe(emps => this.employees = emps);
  }
}
