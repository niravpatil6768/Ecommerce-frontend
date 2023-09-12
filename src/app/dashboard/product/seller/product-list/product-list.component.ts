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
  selectedCategory: string = '';
  categories: string[] = ['SPORTS', 'ELECTRONICS', 'FASHION'];
  ngOnInit(): void {
    this.token = this.storageService.getToken();
    this.userId = JSON.parse(atob(this.token.split('.')[1]))._id

    /*this.webService.products().subscribe({
      next: (data: any) => {
        console.log(data.products);
        this.products = data.products;
        this.allProducts = data.products;
        this.products = this.products.map((product: any) => {
          return product;
          
        });



        
      }

    })*/

    this.getAllProducts();
  }

  getAllProducts() {
    this.webService.products().subscribe((data: any) => {
      this.products = data.products;
      this.allProducts = data.products;
    });
  }

 /* filterProductsByCategory(category: string) {
    this.selectedCategory = category; // Update the selected category
    if (category === '') {
      // If no category is selected, display all products
      this.products = this.allProducts;
    } else {
      // Filter products by the selected category
      this.webService.productcategory(category).subscribe((data: any) => {
        this.products = data.products;
      });
    }
  }*/

  filterProductsByCategory() {
    if (this.selectedCategory === '') {
      this.products = this.allProducts;
    } else {
      this.webService.productcategory(this.selectedCategory).subscribe((data: any) => {
        this.products = data.products;
      });
    }
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
      this.filteredProducts = this.products.filter((product: any) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(this.searchQuery.toLowerCase())
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
