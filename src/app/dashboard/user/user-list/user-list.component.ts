import { Component, OnInit , TemplateRef } from '@angular/core';
//import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { StorageService } from 'src/app/storage.service';
import { WebService } from 'src/app/web.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  isLoading=true;
  //modalRef!: BsModalRef;
  userId:any;
  CurrentUser:any;
  user:any=[]
  users:any;
  userList = [
    
    { 'name': 'Email'},
    { 'name': 'User Type'},
    { 'name': 'action'}
   
  ]

  constructor(private webService:WebService,private storageService:StorageService) { }

  ngOnInit(): void {

    this.webService.getUsers().subscribe(
      {
        next: (data) => {  
          this.isLoading=false;        
          this.users=data;
          
        },
        error: (err) => {
        }
      }
    );
    
  
  }

  /*openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }*/

  deleteUser(userId:any): void {
   // this.modalRef.hide();
   
    this.webService.deleteUser(userId).subscribe(
      {
        next: (data:any) => {
          
          this.users=this.users.filter((user:any)=>user['_id']!=userId);
        },
        error: (err) => {
        }
      }
     );
  }

  /*cancel(): void {
    this.modalRef.hide();
  }*/

}
