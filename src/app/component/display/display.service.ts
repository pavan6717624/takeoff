import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  constructor(private http: HttpClient) { }



  getTreeStructure(): Observable<any>
  {
   return this.http.get( 'https://takeoff-pavan.herokuapp.com/getTreeStructure' );
 // return this.http.post( 'https://takeoff-pavan.herokuapp.com/getTreeStructure',formData );
  }
}
