import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebService } from 'src/app/web.service';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
  @ViewChild('searchBox') searchInput!: ElementRef<HTMLInputElement>;

  constructor(private webService: WebService,private storageService : StorageService) { }

  ngOnInit(): void {
    this.webService.products().subscribe((products:any) => {
      const token = this.storageService.getToken();
          console.log(token);
      this.products = products;
      this.filteredProducts = products;
    });
  }

}
