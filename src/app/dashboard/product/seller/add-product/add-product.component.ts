import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgForm } from '@angular/forms'; 
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { WebService } from 'src/app/web.service';
import { Product } from './product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: Product = {
    name: '',
    sellername: '',
    price: '',
    description: '',
    productImage: null, 
    category: ''
  };

  productForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    sellername: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    processImage: new FormControl('')
  })
  submitted = false;
  productId = 0;
  url = '';
  file: any;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private webService: WebService) { }


  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.product.productImage = files[0];
    }
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        sellername: ['', [Validators.required]],
        price: ['', [Validators.required]],
        description: ['', [Validators.required]],
        productImage: ['', [Validators.required]],
        category: ['', [Validators.required]]
      }
    )
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }

  /*addProduct() {

    this.submitted = true;
    if (this.productForm.invalid) {   
      return;
    }*/

    addProduct() {

      

      if (this.product.productImage instanceof File && this.product.productImage.type === 'image/jpeg' ) {
      const formData = new FormData();
      formData.append('name', this.product.name);
      formData.append('sellername', this.product.sellername);
      formData.append('price', this.product.price.toString());
      formData.append('description', this.product.description);
      formData.append('productImage', this.product.productImage as File);
      formData.append('category', this.product.category); 
  
      this.webService.addProduct(formData).subscribe(
        (response) => {
          console.log('Product added successfully:', response);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'product added successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['dashboard/product']);
          // Reset the form or navigate to another page as needed
        },
        (error) => {
          console.error('Error while adding product:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            
          })
        }
      );
    }
    else {
      if(this.product.productImage != null){
      console.error('Invalid file type. Please select a JPG image.');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid file type!',
      
      })
    }
      // You can display an error message to the user or handle the error accordingly.
    }
    }
  

   



  

  onSubmit() {
    this.submitted = true;
  
    if (this.productForm.invalid) {
      return;
    }
    this.router.navigate(['dashboard/product']);
  }

  processImage(event: any) {
    let files: FileList = event.target.files;
    const { name, sellername, price, description } = this.productForm.value;
    this.file = files[0];
    this.isLoading = true;
    this.http.post(environment.API + '/product/getUploadURL/' + this.file.name, { name, productImage: this.file.name, sellername, price, description }).subscribe((res: any) => {
      this.url = res.url;
      this.productId = res.product._id
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
    })
  }

}
