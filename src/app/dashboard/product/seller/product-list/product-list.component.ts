import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



import { StorageService } from 'src/app/storage.service';

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
   
  }
  products: any = [];
 
  token: any;
  userId: any;
  userRole: any;
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
    this.userRole = this.storageService.getRole();
    //get userId from token
    this.userId = JSON.parse(atob(this.token.split('.')[1]))._id

   

    this.getAllProducts();
  }

  getAllProducts() {

    if(this.userRole === "BUYER" || this.userRole === "SUPERADMIN" ){
      this.webService.products().subscribe((data: any) => {
       // console.log(data.products[0].description)
        this.products = data.products;    //show all products
        this.allProducts = data.products;
        console.log("userId:"+ this.userId) 
        console.log("i am "+this.userRole);
        console.log(data.products)
        console.log("69....>>>>>");
        console.log(this.allProducts);
      });
    }
    if(this.userRole === "SELLER" ){
    this.webService.productSeller(this.userId).subscribe((data: any) => {
      //console.log(data.products[0].description)
      this.products = data.products;
      console.log("userId:"+ this.userId)    //show all products
      this.allProducts = data.products;
      console.log("i am "+this.userRole);
      console.log(data.products)
      console.log("69>>>>>");
      console.log(this.allProducts);
    });
  }
  }



  filterProductsByCategory() {
    if (this.selectedCategory === '' ) {
      this.products = this.allProducts;  //give all products if category not selected
      console.log("90>>>>>");
      console.table(this.products)
    } else {
      this.webService.productcategory(this.selectedCategory).subscribe((data: any) => {
        this.products = data.products;  //show products of particular category
        console.log("94>>>>>");
        console.log(data);
      });
    }
  }


  //get role of user
  public getRole() {
    return this.storageService.getRole();
  }

  deleteProduct(productId: any): void {
    ;
    this.webService.deleteProduct(productId).subscribe(
      {
        next: (data: any) => {
          this.products = this.products.filter((product: { [x: string]: any; }) => product['_id'] != productId);
        },
        error: (err) => {
        }
      }
    );
  }


  //add in card using userId and productId
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

  //this method filter the products based of searchquery
  onSearch() {
    if (this.searchQuery) {
      //if there is a searchquery, we should filter the product
      this.shouldFilter = true;

      //filter the products using array method filter
      this.filteredProducts = this.allProducts.filter((product: any) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      //and set filterproducts to products, so only filterproducts is visible now
      this.products = this.filteredProducts;
    } else {
      //if there is not searchquery then set shouldfilter= false, and show all products
      this.shouldFilter = false;
      this.products = this.allProducts;
    }
  }

  //to reset searchquery and show all products
  resetFilter() {
    this.searchQuery = '';
    this.shouldFilter = false;
    this.products = this.allProducts;
  }

  //sweetalert to open product image and description
  imageBox(url : string,name: string,disc: string){
    Swal.fire({
      title: "Product:"+name,
      text: "Product Detail:"+disc,
      imageUrl: url,
      imageWidth: 500,
      imageHeight: 300,
      imageAlt: 'Custom image',
    })
  }
}
