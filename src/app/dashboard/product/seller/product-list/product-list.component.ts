import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

//import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { StorageService } from 'src/app/storage.service';
//import { UserService } from 'src/app/services/user.service';
import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  Product = {
    _id: "",
    name: "",
    //thumbnail: "",
    //url: ""
  }
  products: any = [];
  // modalRef!: BsModalRef;
  token: any;
  userId: any;
  CurrentUser: any;

  filteredProducts: any[] = [];
  @ViewChild('searchBox') searchInput!: ElementRef<HTMLInputElement>;
  allProducts: any;

  constructor(private webService: WebService, private router: Router, private storageService: StorageService) { }
  product: any = []
  url: any = []
  ngOnInit(): void {
    this.token = this.storageService.getToken();
    //this.userId = JSON.parse(atob(this.token.split('.')[1]))._id
    this.webService.products().subscribe({
      next: (data: any) => {
        this.products = data.products;
        this.allProducts = data.products;
        this.products = this.products.map((product: any) => {
          return product;
          console.log(product);
          console.log("products");
          /* if (course.thumbnail) {
            
             this.courseService.getThumbnail(course._id, course.thumbnail).subscribe({
               next: (data1) => {
                 course.url = data1;
               },
               error(err) {
               },
             });
           }
           return course;
         });
       },
       error(err) {
       }*/
        });



        /*this._user.getUser(this.userId).subscribe({
          next: (data: any) => {
            this.CurrentUser = data
            this.course = this.CurrentUser.user.courses;
    
          },
          error: (err) => {
    
          },
        })*/
      }

    })
  }


  public getRole() {
    return this.storageService.getRole();
  }

  public addToCart(productId: any) {
    this.webService.addToCart(productId, this.userId).subscribe(
      {
        next: (data: any) => {
          this.router.navigate(["dashboard/product/cart"])
        },
        error: (err: any) => {
        }
      }
    )
  }


  searchQuery: string = '';
  shouldFilter: boolean = false;

  onSearch() {
    if (this.searchQuery) {
      this.shouldFilter = true;
      this.filteredProducts = this.allProducts.filter((product: any) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.sellername.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.products = this.filteredProducts;
    } else {
      this.shouldFilter = false;
      this.products = this.allProducts;
    }
  }

  resetFilter() {
    this.searchQuery = '';
    this.shouldFilter = false;
    this.products = this.allProducts;
  }
}
