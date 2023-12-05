import { Component, OnInit } from '@angular/core';
import { IngredientDto } from 'src/app/models/ingredientDto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IngredientService } from 'src/app/services/ingredient.service';
import { CategoryDto } from 'src/app/models/categoryDto';

@Component({
  selector: 'app-ingredient-new',
  templateUrl: './ingredient-new.component.html',
  styleUrls: ['./ingredient-new.component.css']
})
export class IngredientNewComponent implements OnInit {

  ingredient!: IngredientDto;
  ingredientsCategory:CategoryDto[]= [];
  errorData!:string;

  constructor(private ingredientService: IngredientService,
    private snackBar: MatSnackBar, private formBuilder: FormBuilder) {
  }


  ingredientFormBuilder = this.formBuilder.group({

    
    ingredientName: ['', Validators.required],
    ingredientAmount: ['', Validators.required],
    categoryId: [[], Validators.required]

  });

  get ingredientName(){
    return this.ingredientFormBuilder.controls.ingredientName;
  }
  get ingredientAmount(){
    return this.ingredientFormBuilder.controls.ingredientAmount;
  }
  get categoryId(){
    return this.ingredientFormBuilder.controls.categoryId;
  }

ngOnInit(): void {
    this.getIngredientCategories();
}

 saveIngredient() {
    if(this.ingredientFormBuilder.valid){
      console.log(this.ingredientFormBuilder.value)
      this.ingredient = new IngredientDto();
      this.ingredient = Object.assign(this.ingredient, this.ingredientFormBuilder.value);
      this.ingredientService.saveIngredient(this.ingredient).subscribe({
        next:()=>{
          this.onSnackBarMessage("Ingrediente guardado!")
          this.ingredientFormBuilder.reset();
        },
        error:(errorData)=>{
          this.errorData = errorData
          this.onSnackBarMessage(this.errorData);
        }
      })
    }else{
      this.ingredientFormBuilder.markAllAsTouched();
    }
}

getIngredientCategories():void{
  this.ingredientService.getAllIngredientCategories().subscribe(cats => this.ingredientsCategory = cats);
}


  onSnackBarMessage(message:any){
    this.snackBar.open(message, 'Cerrar', {
         duration: 3000,
         verticalPosition: 'bottom',
         horizontalPosition: 'center',
         
       });
  }

}
