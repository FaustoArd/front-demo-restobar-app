import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryDto } from 'src/app/models/categoryDto';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {

categories:CategoryDto[]= [];
category:CategoryDto| undefined;
errorData!:string;

  constructor(private categoryService:CategoryService,private snackBar:MatSnackBar){}
 
 
  ngOnInit(): void {

   this.getAllCategories();
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe({
      next:(catData)=>{
        this.categories = catData;
      },
      error:(errorData)=>{
        this.errorData = errorData;
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
