import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { SubscriptionDTO } from './subscription.component';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }


  getOrderId(): Observable<any>
  {
    //return this.http.get( 'http://localhost:8081/getOrderId' );
    return this.http.get( 'http://localhost:8081/getOrderId' );
  }

  async checkRefererId(formData: FormData): Promise<any>
  {
    // return await this.http.post( 'http://localhost:8081/checkRefererId',formData ).toPromise();
    return await this.http.post( 'http://localhost:8081/checkRefererId',formData ).toPromise();
  }
  
  getSubscription(subscription:SubscriptionDTO): Observable<any>
  {
  // return this.http.post('http://localhost:8081/subscribe',subscription );
    return this.http.post('http://localhost:8081/subscribe',subscription );
  }

}
