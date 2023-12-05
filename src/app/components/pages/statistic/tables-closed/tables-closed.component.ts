import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RestoTableClosedDto } from 'src/app/models/restoTableClosedDto';
import { RestoTableClosedService } from 'src/app/services/resto-table-closed.service';

@Component({
  selector: 'app-tables-closed',
  templateUrl: './tables-closed.component.html',
  styleUrls: ['./tables-closed.component.css']
})
export class TablesClosedComponent implements OnInit {

  tablesClosed:RestoTableClosedDto[]=[];
  errorData!:string;

  constructor(private restoTableClosedService:RestoTableClosedService,private route:ActivatedRoute,
    private snackBar:MatSnackBar){}


    ngOnInit(): void {
        this.getTablesClosedByWorkingDayId();
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


  onSnackBarMessage(message: any) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}
