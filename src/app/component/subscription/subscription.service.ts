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
    return this.http.get( 'http://localhost:8081/getOrderId' );
  }

}
