import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VendorService {

  beforeUpload(formData: FormData) : Observable<any> {

    return this.http.post('http://localhost:8081/getImage',formData);
   
  }

  beforeUploadStatement(formData: FormData) : Observable<any> {

    return this.http.post('http://localhost:8081/getImageStatement',formData);
   
  }


  upload(formData: FormData) : Observable<any> {

    return this.http.post('http://localhost:8081/uploadCoupon',formData);
   
  }

  constructor(private http: HttpClient) { }
}
