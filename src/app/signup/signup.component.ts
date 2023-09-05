import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { AbstractControl, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { WebService } from 'src/app/web.service';
import Validation from '../common-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showPasswordtwo: boolean = false;
  form: FormGroup = new FormGroup({
    
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;

  constructor(private authService: AuthService,private formBuilder: FormBuilder, private webService: WebService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40)
          ]
        ],
        role: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }

  get formControl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const {  email, password, role } = this.form.value;


    this.webService.signup( email, password, role).subscribe(
      {
        next: (data) => {
          this.router.navigate(['login']);
          console.log("done");
        },
        error: (err) => {
          console.log(err);
        }
      }
    );

  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  togglePasswordVisibilitytwo() {
    this.showPasswordtwo = !this.showPasswordtwo;
  }

/*old*  onSignupButtonClicked(email: string, password: string){
    this.authService.signup(email,password).subscribe((res : HttpResponse<any>) => {
      console.log(res);
    })
  }*/

}
