import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EditcouponsService {

  constructor(private http: HttpClient) { }



  getImages(formData: FormData) : Observable<any> {



 return this.http.post('https://takeoff-pavan.herokuapp.com/getImages',formData);
   
  }
}
