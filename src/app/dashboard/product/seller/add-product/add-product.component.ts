import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    sellername: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl('')
  })
  submitted = false;
  courseId = 0;
  url = '';
  file: any;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private webService: WebService) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        sellername: ['', [Validators.required]],
        price: ['', [Validators.required]],
        description: ['', [Validators.required]],
        //thumbnail: ['', [Validators.required]]
      }
    )
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }

  addProduct() {

    this.submitted = true;
    if (this.productForm.invalid) {   
      return;
    }

    const { name, sellername, price, description } = this.productForm.value;
    this.webService.addProduct(name, sellername, price, description).subscribe(
      {
        next: (data) => {
          this.router.navigate(['dashboard/product']);
          console.log("add product");
        },
        error: (err) => {
          console.log("nod added product");
        }
      }
    );

  }

  onSubmit() {
    this.submitted = true;
  
    if (this.productForm.invalid) {
      return;
    }
    this.router.navigate(['dashboard/product']);
  }

}
