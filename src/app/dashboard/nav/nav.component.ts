import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from 'src/app/storage.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private storageService:StorageService,private router:Router) { }

  ngOnInit(): void {
  }

  public getRole(){
    return this.storageService.getRole();
  }
  public isLoggedIn(){
    return this.storageService.isLoggedIn();
    
  }

  public logout(){
    this.storageService.clear();
    console.log("clear")
  }

  isSidebarActive = false;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  closeSidebar() {
    this.isSidebarActive = false;
  }


}
