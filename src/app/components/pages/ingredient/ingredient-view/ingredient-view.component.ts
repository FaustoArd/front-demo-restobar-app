import { Component ,OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IngredientDto } from 'src/app/models/ingredientDto';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-ingredient-view',
  templateUrl: './ingredient-view.component.html',
  styleUrls: ['./ingredient-view.component.css']
})

export class IngredientViewComponent implements OnInit  {

  constructor(private ingredientService:IngredientService,private snackBar:MatSnackBar,private confirmDialogService:ConfirmDialogService){}

  ingredients:IngredientDto[] = [];
  ingredient!:IngredientDto;
  deleteData!:string;
  errorData!:string;
  confirmData!:boolean;

  ngOnInit(): void {
      this.getAllIngredients();
  }

  getAllIngredients(){
    this.ingredientService.getAllIngredients().subscribe(ing => this.ingredients = ing);


  }

  onDeleteIngredient(id:number):void{

    var dialogText = 'Esta seguro?,tambien se eliminara el ingrediente de todas las recetas a las q haya sido asignado.'
    this.confirmDialogService.confirmDialog(dialogText).subscribe({
      next:(confirmData)=>{
      this.confirmData = confirmData;
      if(this.confirmData){
        this.ingredientService.deleteIngredientById(id).subscribe({
          next:(deleteData)=>{
            this.deleteData = deleteData;
          },
          error:(errorData)=>{
            this.errorData = errorData;
            this.onSnackBarMessage(this.errorData)
            
          },
          complete:()=>{
            this.onSnackBarMessage(this.deleteData);
            this.getAllIngredients();
          }
        });
      }else{
        this.onSnackBarMessage("Cancelado!");
      }
    }
    });

   
  }

  onUpdateAmount(id:number,ingredientAmount:string){

  }
 

  onSnackBarMessage(message:string){
    this.snackBar.open(message,'Cerrar',{
      duration:3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
      });
  }


}
