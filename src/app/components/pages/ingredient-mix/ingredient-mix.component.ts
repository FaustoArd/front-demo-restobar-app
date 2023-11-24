import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IngredientMixService } from 'src/app/services/ingredient-mix.service';
import { IngredientViewComponent } from '../ingredient/ingredient-view/ingredient-view.component';
import { ingredientMixDto } from 'src/app/models/ingredientMixDto';
import { ProductService } from 'src/app/services/product.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ProductDto } from 'src/app/models/productDto';
import { IngredientDto } from 'src/app/models/ingredientDto';

@Component({
  selector: 'app-ingredient-mix',
  templateUrl: './ingredient-mix.component.html',
  styleUrls: ['./ingredient-mix.component.css']
})
export class IngredientMixComponent implements OnInit {

  ingredientMix!:ingredientMixDto;
  ingredientMixes:ingredientMixDto[] = [];
  ingredient!:IngredientDto;
  ingredients:IngredientDto[] = [];
  products:ProductDto[] = [];
  errorData!:string;


  constructor(private ingredientMixService:IngredientMixService,private snackBar:MatSnackBar,
    private productService:ProductService,private ingredientService:IngredientService){ }


ngOnInit(): void {
  this.getAllProducts();
  this.getAllIngredients();
 
}

onProductSelect(){

}

getallIngredientMixesByProductId(productId:number){
  this.ingredientMixService.getMixesByProductId(productId).subscribe({
    next:(mixesData)=>{
      this.ingredientMixes = mixesData;
    },
    error:(errorData)=>{
      this.errorData = errorData;
    },
   
  })
}

getAllIngredients(){
  this.ingredientService.getAllIngredients().subscribe(ing => this.ingredients = ing);


}
getProductById(id:number):void{
  this.productService.getProductById(id).subscribe({
    next:(productData)=>{

    }
  })
}
getAllProducts(){
  this.productService.getAllProducts().subscribe({
    next:(productsData)=>{
    this.products = productsData;
    },
    error:(errorData)=>{
      this.errorData = errorData;
      this.onSnackBarMessage(this.errorData);
    }
  });
}
onSnackBarMessage(message:any){
  this.snackBar.open(message, 'Cerrar', {
       duration: 3000,
       verticalPosition: 'top',
       horizontalPosition: 'center',
       
     });
}

}
