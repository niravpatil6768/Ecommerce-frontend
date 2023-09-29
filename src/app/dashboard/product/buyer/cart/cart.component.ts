import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

import { WebService } from 'src/app/web.service';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/storage.service';

declare var Razorpay:any;

  

 
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
 
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

        console.table(data);
         this.products = this.products.map((product:any) => {
           
            return product;
            
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


  payNow() {
    const amount = this.total;

    this.webService.getCart(this.userId).subscribe(
      {
        next: (data:any) => {
          this.products=data.cart.products;
          console.log("response");
      }});
    

    this.webService.createOrder(amount, this.products).subscribe((order) => {
     
      
        const options = {
          
          "key_id": 'rzp_test_3b88pgSESx20IL',
          "amount": this.total,
          
          "name": "shopBag website",
          "description": "Web Development",
        
          "order_id": order.orderId,
          handler: (response: any) => {
            console.log(options);
            var event = new CustomEvent("payment.success",
              {
                detail: response,
                bubbles: true,
                cancelable: true
              },
            );
            window.dispatchEvent(event);
            console.log(response);
            const paymentId = response.razorpay_payment_id;
            const orderId = response.razorpay_order_id;
            const signature = response.razorpay_signature;
            this.webService.verifyPayment(paymentId, orderId, signature).subscribe(
              (response: any) => {
               
                window.location.reload();
              },
              (error: any) => {
              }
            )
          },
          "prefill": {
            "name":"Nirav Patil",
            "email": "patilnirav70@gmail.com",
            "contact": "9265029853"
          },
          "theme": {
            "color": "#3399cc"
          }
        };
  
        var rzp = new Razorpay(options);
       //var rzp =  new (window as any).Razorpay(options);
        rzp.open();

        


        rzp.on('payment.failed', function (response: any) {
       });
    }),
  (error: any) => {
  }
  }

}
