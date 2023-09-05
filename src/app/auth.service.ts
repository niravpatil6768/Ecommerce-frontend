import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { Router } from '@angular/router';
import { shareReplay, tap} from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webService: WebService, private router: Router, private http: HttpClient) { }

  signup(email: string, password: string,type: string){
    return this.webService.signup(email,password,type).pipe(
       shareReplay(),
       tap((res: HttpResponse<any>) => {
         //the auth tokens will be in the header of this response
         this.setSession(res.body._id,res.headers.get('x-access-token') ?? '', res.headers.get('x-refresh-token') ?? '');
         console.log("sign up");
         console.log(res);
       })
     )
   }

   login(email: string, password: string){
    return this.webService.login(email,password).pipe(
       shareReplay(),
       tap((res: HttpResponse<any>) => {
         //the auth tokens will be in the header of this response
         this.setSession(res.body._id,res.headers.get('x-access-token') ?? '', res.headers.get('x-refresh-token') ?? '');
         console.log("logged in!");
         console.log(res);
       })
     )
   }

   getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken)
  }

  private setSession(userId: string, accessToken: string, refreshToken: string){
  localStorage.setItem('user-id', userId);
  
  if (accessToken !== null) {
    localStorage.setItem('x-access-token', accessToken);
  }

  if (refreshToken !== null) {
    localStorage.setItem('x-refresh-token', refreshToken);
  }
}


}
