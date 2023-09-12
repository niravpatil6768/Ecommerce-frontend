import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

import { WebService } from 'src/app/web.service';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
 /* animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(10)),
    ])
  ]*/
})
export class CartComponent implements OnInit {

  products:any=[];
  token:any;
  userId:any;
  name:any;
  total=0;
  paymentId: any;
  error: any;
  noproductimage:any;


  constructor(private webService:WebService,private storageService:StorageService,private router:Router) { }

  ngOnInit(): void {
    this.token=this.storageService.getToken();
    this.userId=JSON.parse(atob(this.token.split('.')[1]))._id;
    this.getProducts();
  }

  public getProducts() {
    this.webService.getCart(this.userId).subscribe({next: (data:any) => {
          this.products = data.cart.products;

        console.log(data);
          this.products = this.products.map((product:any) => {
            /*if (course.courseId.thumbnail) {
              this.webService.getThumbnail(course.courseId._id, course.courseId.thumbnail).subscribe({
                next: (data1) => {
                  course.url = data1;
                },
                error(err) {
                },
              });
            }*/
            return product;
            //return this.userId;
          });
          this.total=data.cart.subTotal;
        },
        error: (err) => {
        }
      }
    )
  }


  removeItem(productId:any){
    this.webService.removeItem(productId,this.userId).subscribe(
      {
        next: (data:any) => {
          this.products=this.products.filter((product:any)=>product['productId']!=productId);
          this.getProducts();
        },
        error: (err) => {
        }
      });
  }

}
