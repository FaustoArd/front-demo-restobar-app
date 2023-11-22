import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/models/userDto';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  userDto!:UserDto;
  errorStatus!:string;

  constructor(private userService:UserService,private storageService:StorageService,private router:Router,private snackBar:MatSnackBar){}

  ngOnInit(): void {
    
    if(this.storageService.getCurrentUserId()===null){
      this.router.navigateByUrl("/login")
    }
  this.userService.getUserById(Number(this.storageService.getCurrentUserId())).subscribe({
    next:(userData)=>{
      this.userDto = userData;
      
    },
    error:(errorData)=>{
      this.errorStatus = errorData;
      if(this.errorStatus==="401" || this.userDto===undefined){
        this.router.navigateByUrl("/login")
      }else{
        this.router.navigateByUrl("/home")
      }
      },
     
  })
  }

  onSnackBarMessage(message: any) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
