import { Component ,OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryDto } from 'src/app/models/categoryDto';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css']
})
export class CategoryNewComponent implements OnInit{

 


  categories:CategoryDto[]  = [];
  category:CategoryDto | undefined;
  newCategory:CategoryDto | undefined;
  constructor(private categoryService:CategoryService,private snackBar:MatSnackBar){}
  

  ngOnInit(): void {
    
  }

  categoryForm = new FormGroup({
    id: new FormControl(''),
    categoryName: new FormControl(''),
  });

 

  onSubmit(){
   this.onCreateCategory();
  }

  updateCategory(){
    this.categoryForm.patchValue({
      //id:'2',
      categoryName:'Pollo'

    })
  }
  
 onCreateCategory(){
   // var id = this.categoryForm.getRawValue().id;
    var categoryName = this.categoryForm.getRawValue().categoryName;
    this.category = new CategoryDto();
   // this.category.id = Number(this.categoryForm.getRawValue().id);
    this.category.categoryName = String (this.categoryForm.getRawValue().categoryName);
   this.categoryService.saveCategory(this.category).subscribe({
      next:(catData)=>{
        this.newCategory = catData;
        console.log(this.newCategory.categoryName)
      }
    });
  }
}
