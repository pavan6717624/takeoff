import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VendorService {

  beforeUpload(formData: FormData) : Observable<any> {

    return this.http.post('https://takeoff-angular.herokuapp.com/getImage',formData);
   
  }


  upload(formData: FormData) : Observable<any> {

    return this.http.post('https://takeoff-angular.herokuapp.com/uploadCoupon',formData);
   
  }

  constructor(private http: HttpClient) { }
}
