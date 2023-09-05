import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly ROOT_URL;
  constructor(private http: HttpClient) {
    this.ROOT_URL = environment.API;
   }

   signup(email: string,password: string,type: string): Observable<any>{
    return this.http.post(`${this.ROOT_URL}/user/register`,{
      email,
      password,
      type
    },{observe: 'response'});
   }

   login(email: string,password: string): Observable<any>{
    return this.http.post(`${this.ROOT_URL}/user/login`,{
      email,
      password
    },{observe: 'response'});
   }

    //add product
  public addProduct(name:string,sellername:string,price:number,description:string){
    return this.http.post(`${this.ROOT_URL}/productpage/addproduct`,{name,sellername,price,description});
  }

  //display products
  public products(){
    return this.http.get(`${this.ROOT_URL}/productpage`)
  }

  //cart
  public getCart(userId:any){
    return this.http.get(`${this.ROOT_URL}/cart/${userId}`);
  }

  public addToCart(productId:any,userId:any){
    return this.http.post(`${this.ROOT_URL}/cart/${userId}`,{productId});
  }

  public removeItem(productId:any,userId:any){
    return this.http.delete(`${this.ROOT_URL}/cart/${userId}/${productId}`);
  }

  //getUser
  getUsers(){
    return this.http.get(`${this.ROOT_URL}/user/`);
  }

  deleteUser(userId: any)
  {
    return this.http.delete(`${this.ROOT_URL}/user/deleteUser/${userId}`);
  }
}
