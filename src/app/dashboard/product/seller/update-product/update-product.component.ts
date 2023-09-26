import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    sellername: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
  });
  id: any;
  product: any;
  submitted = false;
  productId = 0;
  url = '';
  file: any;
  isLoading = false;

  constructor( private route: ActivatedRoute,
    private webService: WebService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['productId'];


    
    this.webService.getProduct(this.productId).subscribe({
      next: (data: any) => {
        this.product = data.product;
        console.log(data);
        this.productForm = this.formBuilder.group({
          name: [this.product.name],
          sellername: [this.product.sellername],
          price: [this.product.price],
          description: [this.product.description],
          category: [this.product.category],
          
        });
      },
    });
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Stop here if the form is invalid
    if (this.productForm.invalid) {
      return;
    }

    

    // Send the updated product data to your service
    this.webService.updateProduct(this.productId, this.productForm.value).subscribe(
      (response) => {
        // Handle successful update (e.g., show a success message)
        console.log('Product updated successfully!', response);
        this.router.navigate(['dashboard/product']);
      },
      (error) => {
        // Handle error (e.g., show an error message)
        console.error('Error updating product:', error);
      }
    );
  }

}
