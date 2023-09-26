import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

    

  public addProduct(userId: any,formData: FormData): Observable<any> {
    return this.http.post(`${this.ROOT_URL}/productpage/addproduct/${userId}`, formData);
  }

  //display products
  public products(){
    return this.http.get(`${this.ROOT_URL}/productpage`)
  }

  //getsingleproduct
  public getProduct(productId: any){
    return this.http.get(`${this.ROOT_URL}/productpage/product/${productId}`)
  }

  public productSeller(userId:any){
    return this.http.get(`${this.ROOT_URL}/productpage/getproduct/${userId}`)
  }

  public productcategory(category: any){
    return this.http.get(`${this.ROOT_URL}/productpage/${category}`)
  }

  //deleteproduct
  public deleteProduct(productId:any){
    return this.http.delete(`${this.ROOT_URL}/productpage/deleteproduct/${productId}`);

  }

   //update product details
   public updateProduct(productId: any,product: any){
    return this.http.put(`${this.ROOT_URL}/productpage/updateproduct/${productId}`,product);
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
    return this.http.delete(`${this.ROOT_URL}/user/deleteuser/${userId}`);
  }

  //payment
  public createOrder(amount: number, products : any) {
    const data = { amount, products};
    return this.http.post(`${this.ROOT_URL}/payment/createPayment`, data).pipe(
      map((response: any) => response)
    );
  }

  public verifyPayment(paymentId: any, orderId: any, signature: any) {
    const data = { paymentId , orderId , signature };
    return this.http.post(`${this.ROOT_URL}/payment/webhook`, data);
  }

}
