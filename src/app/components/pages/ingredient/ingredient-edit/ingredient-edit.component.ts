import { Component, OnInit} from '@angular/core';

import { IngredientDto } from 'src/app/models/ingredientDto';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css']
})
export class IngredientEditComponent {

  constructor(private ingredientService:IngredientService){}

  ingredients:IngredientDto[] = [];
  ingredient!:IngredientDto;

  ngOnInit(): void {
   
      this.getAllIngredients();
  }

  getAllIngredients(){
    this.ingredientService.getAllIngredients().subscribe(ing => this.ingredients = ing);


  }

  onUpdateAmount(id:number,ingredientAmount:string){

  }
}
