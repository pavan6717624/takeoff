import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VendorService {
  
  getExecutiveCustomerAccountDetails() {
    return this.http.get('http://localhost:8081/getExecutiveCustomerAccountDetails');
  }
  
  updateScanCode(formData: FormData) {
    return this.http.post('http://localhost:8081/updateScanCode',formData);
  }

  beforeUpload(formData: FormData) : Observable<any> {

    return this.http.post('http://localhost:8081/getImage',formData);
   
  }

  beforeUploadStatement(formData: FormData) : Observable<any> {

    return this.http.post('http://localhost:8081/getImageStatement',formData);
   
  }


  upload(formData: FormData) : Observable<any> {

    return this.http.post('http://localhost:8081/uploadCoupon',formData);
   
  }
  
    getInvestorCustomerAccountDetails(): Observable<any> 
  {
  return this.http.get('http://localhost:8081/getInvestorCustomerAccountDetails');
  }


  constructor(private http: HttpClient) { }
}
