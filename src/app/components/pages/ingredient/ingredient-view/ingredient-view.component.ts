import { Component ,OnInit} from '@angular/core';
import { IngredientDto } from 'src/app/models/ingredientDto';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-ingredient-view',
  templateUrl: './ingredient-view.component.html',
  styleUrls: ['./ingredient-view.component.css']
})

export class IngredientViewComponent implements OnInit  {

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
