import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'arbam-app';

  constructor(private storageService:StorageService, private router:Router){}

  ngOnInit(): void {
      if(this.storageService.getAuthToken()===null || undefined){
        this.router.navigateByUrl("/login");
      }
  }
 
}
