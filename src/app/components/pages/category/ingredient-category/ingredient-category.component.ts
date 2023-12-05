import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IngredientCategoryDto } from 'src/app/models/ingredientCategory';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-ingredient-category',
  templateUrl: './ingredient-category.component.html',
  styleUrls: ['./ingredient-category.component.css']
})
export class IngredientCategoryComponent implements OnInit {

constructor(private categoryService:CategoryService,private snackBar:MatSnackBar){}

category!:IngredientCategoryDto;
newCategory!:IngredientCategoryDto;
categories:IngredientCategoryDto[]= [];
errorData!:string;



  categoryForm = new FormGroup({
    id: new FormControl(''),
    categoryName: new FormControl('', Validators.required),
  });

  get categoryName(){
    return this.categoryForm.controls.categoryName;
  }

 ngOnInit(): void {
     this.getAllIngredientCategory();
 }

 onSubmit(){
  this.saveIngredientCategory();
 }

 getAllIngredientCategory():void{
  this.categoryService.getAllIngredientCategories().subscribe({
    next:(catData)=>{
this.categories = catData;
    },
    error:(errorData)=>{
      this.errorData = errorData;
    }
    
  })
 }
 saveIngredientCategory():void{
  if (this.categoryForm.valid) {
    // var id = this.categoryForm.getRawValue().id;
    var categoryName = this.categoryForm.getRawValue().categoryName;
    this.category = new IngredientCategoryDto();
    // this.category.id = Number(this.categoryForm.getRawValue().id);
    this.category.categoryName = String(this.categoryForm.getRawValue().categoryName);
    this.categoryService.saveIngredientCategory(this.category).subscribe({
      next: (catData) => {
        this.newCategory = catData;
        console.log(this.newCategory.categoryName)
      },
      complete:()=>{
        this.onSnackBarMessage("Categoria guardada.");
        this.categoryForm.reset();
        this.getAllIngredientCategory();
      }
    });
  }else{
    this.onSnackBarMessage("Debes ingresar una categoria")
    this.categoryForm.markAllAsTouched();
  }
 }
 
 onSnackBarMessage(message:any){
  this.snackBar.open(message, 'Cerrar', {
       duration: 3000,
       verticalPosition: 'bottom',
       horizontalPosition: 'center',
       
     });



    }

}
