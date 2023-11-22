import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RestoTableDto } from '../models/restoTableDto';
import { DialogTemplateData } from '../models/dialog-template-data';
import { DialogTemplateComponent } from '../components/dialog/dialog-template-component/dialog-template-component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog:MatDialog) { }

  openDialogRestoTableCreation(data:DialogTemplateData){
    return this.matDialog.open(DialogTemplateComponent, { data });
  }
}
