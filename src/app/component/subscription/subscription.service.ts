import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }


  getOrderId(): Observable<any>
  {
    return this.http.get( 'https://takeoff-pavan.herokuapp.com/getOrderId' );
    //return this.http.get( 'http://localhost:8081/getOrderId' );
  }

  checkRefererId(formData: FormData): Observable<any>
  {
    return this.http.post( 'https://takeoff-pavan.herokuapp.com/checkRefererId',formData );
    //return this.http.post( 'http://localhost:8081/checkRefererId',formData );
  }


}
