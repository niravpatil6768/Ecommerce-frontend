import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WebService } from '../web.service';
//import Swal from 'sweetalert2';
import { StorageService } from 'src/app/storage.service';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: string = '';
  showPassword: boolean = false;



  isLoggedIn = false;

  errMessage: string = '';
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    pass: new FormControl('')
  })
  submitted = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router : Router,private formBuilder: FormBuilder,
    private webService: WebService,
    private storageService: StorageService) { }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(): void {
    this.form = this.formBuilder.group(
      {
      email: ['', [Validators.required, Validators.email]],
        pass: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20)
          ]
        ]
      }
    )
    }


  //getter to access form controls
  get formControls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  signIn(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }


    const { email, pass } = this.form.value;
    this.webService.login(email, pass).subscribe(
      {
        next: (data) => {
          console.log('data.token: ', data.token);
          console.log(this.storageService.setToken(data.token));
          const token = this.storageService.getToken();
          console.log('token : ', token);
          //console.log('email'+data.email);
          
         // this.storageService.setRole(JSON.parse(atob(data.token.split('.')[1])).type);
         // console.log(data.userId);
          //this.setSession(userId,res.headers.get('x-access-token') ?? '', res.headers.get('x-refresh-token') ?? '');
         // this.storageService.setUserId(data.user_id);
         // console.log(data.user_id);
         // this.router.navigate(['dashboard/course']);
          this.isLoggedIn = true;


         /* const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            customClass: 'swal-wide',
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })*/

          this.router.navigate(['dashboard/product']);

        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.errMessage = 'Email or password not found';

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

  /*old*onLoginButtonClicked(email: string, password: string){
    this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
      if(res.status === 200){
        this.router.navigate(['/dashboard']);
      }
      console.log(res);
    });
  }*/

}
