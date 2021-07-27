import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  constructor(private http: HttpClient) { }



  getTreeStructure(formData: FormData): Observable<any>
  {
   return this.http.get( 'https://takeoff-pavan.herokuapp.com/getOrderId' );
   // return this.http.post( 'http://localhost:8081/getTreeStructure',formData );
  }
}
