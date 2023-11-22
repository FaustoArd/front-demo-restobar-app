import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogTemplateData } from 'src/app/models/dialog-template-data';

@Component({
  selector: 'app-dialog-resto-table-creation',
  templateUrl: './dialog-template-component.html',
  styleUrls: ['./dialog-template-component.css']
})
export class DialogTemplateComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:DialogTemplateData){}
}
