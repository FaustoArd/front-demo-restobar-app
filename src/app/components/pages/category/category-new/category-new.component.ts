import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogTemplateComponent } from 'src/app/components/dialog/dialog-template-component/dialog-template-component';
import { CategoryDto } from 'src/app/models/categoryDto';
import { CategoryService } from 'src/app/services/category.service';
import { DialogService } from 'src/app/services/dialog.service';
@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css']
})
export class CategoryNewComponent implements OnInit {




  categories: CategoryDto[] = [];
  category: CategoryDto | undefined;
  updatedCategory!:CategoryDto;
  newCategory: CategoryDto | undefined;
  errorData!:string;
  catData!:CategoryDto;
  constructor(private categoryService: CategoryService, private snackBar: MatSnackBar,
    private formBuilder:FormBuilder,private dialogService:DialogService) { }


  ngOnInit(): void {
    this.getAllCategories();
  }

  categoryForm = new FormGroup({
    id: new FormControl(''),
    categoryName: new FormControl('',[Validators.required,Validators.maxLength(30)]),
  });

  get categoryName(){
    return this.categoryForm.controls.categoryName;
  }
  onCreateCategory() {
    if (this.categoryForm.valid) {
      // var id = this.categoryForm.getRawValue().id;
      this.category = new CategoryDto();
      // this.category.id = Number(this.categoryForm.getRawValue().id);
      this.category.categoryName = String(this.categoryForm.getRawValue().categoryName);
      this.categoryService.saveCategory(this.category).subscribe({
        next: (catData) => {
          this.newCategory = catData;
          console.log(this.newCategory.categoryName)
        },
        complete:()=>{
          this.onSnackBarMessage("Categoria guardada.");
          this.categoryForm.reset();
          this.getAllCategories();
        }
      });
    }else{
      this.onSnackBarMessage("Categoria invalida")
      this.categoryForm.markAllAsTouched();
    }
  }
   onSubmit() {
    this.onCreateCategory();
  }

updateCategoryForm = this.formBuilder.group({
  id: [0],
  categoryName:['',[Validators.required,Validators.maxLength(30)]]
});

onCreate(){
  this.matDialogRef.close();
  this.updateCategoryForm.reset();

}


private matDialogRef!: MatDialogRef<DialogTemplateComponent>

 /**Mat dialog ref update form */
 openDialogUpdateCategory(id: number, template: TemplateRef<any>) {
 this.getCategoryById(id);
 
  this.matDialogRef = this.dialogService.openDialogRestoTableCreation({
    template
  });
  this.matDialogRef.afterClosed().subscribe(res => { console.log('Creation table template close', res) })
  this.updateCategoryForm.reset();

}

  onUpdateCategoryShow() {
    this.updateCategoryForm.patchValue({
      id:this.updatedCategory.id,
      categoryName: this.updatedCategory.categoryName

    });
  }
  onUpdateCategory():void{
    if(this.updateCategoryForm.valid){
      this.updatedCategory = Object.assign(this.updatedCategory,this.updateCategoryForm.value)
      this.categoryService.saveCategory(this.updatedCategory).subscribe({
        next:(catData)=>{
          this.catData = catData;
        },
        error:(errorData)=>{
          this.errorData = errorData;
          this.onSnackBarMessage(this.errorData);
        },
        complete:()=>{
          this.onSnackBarMessage("Se Actualizo la categoria :" + this.catData.categoryName);
          this.getAllCategories();
          this.onCreate();
        }
      })
    }else{
      this.onSnackBarMessage("Categoria invalida");
    }
   
  }

 
getAllCategories():void{
  this.categoryService.getAllCategories().subscribe(cats => this.categories = cats);
}

getCategoryById(id:number){
  this.categoryService.findCategoryById(id).subscribe({
    next:(updatedData)=>{
      this.updatedCategory = updatedData;
      this.onUpdateCategoryShow();
    },
    error:(errorData)=>{
      this.errorData = errorData;
    }

  })
}

  onSnackBarMessage(message:any){
    this.snackBar.open(message, 'Cerrar', {
         duration: 3000,
         verticalPosition: 'top',
         horizontalPosition: 'center',
         
       });

 

      }
}
