import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IngredientMixService } from 'src/app/services/ingredient-mix.service';
import { IngredientViewComponent } from '../ingredient/ingredient-view/ingredient-view.component';
import { IngredientMixDto } from 'src/app/models/ingredientMixDto';
import { ProductService } from 'src/app/services/product.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ProductDto } from 'src/app/models/productDto';
import { IngredientDto } from 'src/app/models/ingredientDto';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-ingredient-mix',
  templateUrl: './ingredient-mix.component.html',
  styleUrls: ['./ingredient-mix.component.css']
})
export class IngredientMixComponent implements OnInit {

  ingredientMix!:IngredientMixDto;
  selectedIngredientMix!:IngredientMixDto
  ingredientMixes:IngredientMixDto[] = [];
  ingredient!:IngredientDto;
  ingredients:IngredientDto[] = [];
  products:ProductDto[] = [];
  errorData!:string;
  productSelected!:boolean;
  productSelectionId!:number;
  productSelectedName!:String;


  constructor(private ingredientMixService:IngredientMixService,private snackBar:MatSnackBar,
    private productService:ProductService,private ingredientService:IngredientService,
    private storageService:StorageService,private router:Router){ }


ngOnInit(): void {
  this.productSelected = Boolean(this.storageService.getCurrentSelectedProductStatus());
  this.getAllProductsByNameAsc();
  this.getAllIngredients();
 
}

onProductSelect(productId:number){
this.getallIngredientMixesByProductId(productId);
}

onProductUnselect():void{
  this.storageService.deleteCurrentSelectedProductStatus();
  this.storageService.deleteCurrentSelectedProductId();
  this.productSelected = false;
  this.productSelectionId = NaN ;
  this.productSelectedName = "";
  this.ingredientMixes.length = 0;
 this.router.navigateByUrl("ingredient-mix");
  
}


saveIngredientMix(ingredientId:number,ingredientName:string,ingredientAmount:string){
  if(Number(ingredientAmount)<1){
    this.onSnackBarMessage("La cantidad tiene que ser mayor a 0");
  }else if(Number(ingredientAmount)>2000000){
    this.onSnackBarMessage("El Cantidad maxima puede ser 2 millones");
  }else{
  var productId = Number(this.storageService.getCurrentSelectedProductId());
  console.log(productId)
  this.selectedIngredientMix = new IngredientMixDto();
  this.selectedIngredientMix.ingredientId = ingredientId;
  this.selectedIngredientMix.ingredientName =ingredientName;
  this.selectedIngredientMix.ingredientAmount = Number(ingredientAmount);
  console.log(this.selectedIngredientMix)
  this.ingredientMixService.createMix (this.selectedIngredientMix,productId).subscribe({
    next:(ingredientMixData)=>{
      this.onSnackBarMessage(ingredientMixData);
    },
    error:(errorData)=>{
      this.errorData = errorData;
      this.onSnackBarMessage(this.errorData);
    },
    complete:()=>{
      this.getallIngredientMixesByProductId(Number(this.storageService.getCurrentSelectedProductId()));
    }
  });
  }
}


getallIngredientMixesByProductId(productId:number){
  this.ingredientMixService.getMixesByProductId(productId).subscribe({
    next:(mixesData)=>{

      this.ingredientMixes = mixesData;
      this.storageService.setCurrentSelectedProductStatus("true");
      this.storageService.setCurrentSelectedProductId(String(productId));
      this.productSelected = true;
     this.productSelectionId = productId;
    this.productService.getProductById(productId).subscribe({
      next:(productData)=>{
        this.productSelectedName = productData.productName;
      },
      error:(errorData)=>{
        this.errorData = errorData;
      }
    })
     
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
getAllProductsByNameAsc(){
  this.productService.getAllProductsByProductNameAsc().subscribe({
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
