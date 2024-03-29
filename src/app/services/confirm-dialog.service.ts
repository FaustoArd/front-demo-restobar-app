import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmDialogModel } from '../models/confirmDialogModel';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private dialog:MatDialog) { }

  confirmDialog(message:string):Observable<boolean>{
    const title = 'Confirmar';
    const btnOkText = 'OK';
    const btnCancelText = 'Cancel';

    const dialogdata = new ConfirmDialogModel(title,message,btnOkText,btnCancelText);

    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      maxWidth:"400px",
      data:dialogdata
    });
    return dialogRef.afterClosed() as Observable<boolean>;
   
  }
}
