import { Component,OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogTemplateComponent } from 'src/app/components/dialog/dialog-template-component/dialog-template-component';
import { IngredientCategoryDto } from 'src/app/models/ingredientCategory';
import { CategoryService } from 'src/app/services/category.service';
import { DialogService } from 'src/app/services/dialog.service';
@Component({
  selector: 'app-ingredient-category',
  templateUrl: './ingredient-category.component.html',
  styleUrls: ['./ingredient-category.component.css']
})
export class IngredientCategoryComponent implements OnInit {

constructor(private categoryService:CategoryService,private snackBar:MatSnackBar,private formBuilder:FormBuilder,
  private dialogService:DialogService){}

category!:IngredientCategoryDto;
updatedIngredientCategory!:IngredientCategoryDto
newCategory!:IngredientCategoryDto;
categories:IngredientCategoryDto[]= [];
errorData!:string;
updatedData!:string;

ngOnInit(): void {
  this.getAllIngredientCategory();
}

  categoryForm = new FormGroup({
    id: new FormControl(''),
    categoryName: new FormControl('', Validators.required),
  });

  get categoryName(){
    return this.categoryForm.controls.categoryName;
  }
 onSubmit(){
  this.saveIngredientCategory();
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


 updateIngredientCategoryForm = this.formBuilder.group({
  id:[0],
  categoryName:['', Validators.required]
 });

 onUpdateIngredientCategoryShow(): void {
  this.updateIngredientCategoryForm.patchValue({
    id: this.updatedIngredientCategory?.id,
    categoryName: this.updatedIngredientCategory?.categoryName,
  
  });
}

onCreate() {
  this.updateIngredientCategoryForm.reset();
  this.matDialogRef.close();
}


private matDialogRef!: MatDialogRef<DialogTemplateComponent>

/**Mat dialog ref update form */
openDialogUpdateIngredientCategory(id: number, template: TemplateRef<any>) {
  this.getIngredientCategoryById(id);
  this.matDialogRef = this.dialogService.openDialogRestoTableCreation({
    template
  });
  this.matDialogRef.afterClosed().subscribe(res => { console.log('Creation table template close', res) })
  this.updateIngredientCategoryForm.reset();

}
updateIngredientCategory():void{
  if(this.updateIngredientCategoryForm.valid){
    this.updatedIngredientCategory = Object.assign(this.updatedIngredientCategory,this.updateIngredientCategoryForm.value);
    this.categoryService.saveIngredientCategory(this.updatedIngredientCategory).subscribe({
      next:(updatedData)=>{
        this.updatedData = updatedData.categoryName;
      },
      error:(errorData)=>{
        this.errorData = errorData;
        this.onSnackBarMessage(this.errorData);
      },
      complete:()=>{
        this.onSnackBarMessage("Guardado!" + this.updatedData);
        this.getAllIngredientCategory();
        this.onCreate();
      }
    })
  }
}


getIngredientCategoryById(id:number):void{
  this.categoryService.getIngedientCategoryById(id).subscribe({
    next:(categoryData)=>{
      this.updatedIngredientCategory = categoryData;
      this.onUpdateIngredientCategoryShow();
    },
    error:(errorData)=>{
      this.errorData = errorData;
      this.onSnackBarMessage(this.errorData);
    }
  })
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
 
 onSnackBarMessage(message:any){
  this.snackBar.open(message, 'Cerrar', {
       duration: 3000,
       verticalPosition: 'bottom',
       horizontalPosition: 'center',
       
     });



    }

}
