import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadcouponsService {

  constructor(private http: HttpClient) { }


  getCategories(): Observable<any>
  {
    return this.http.get('https://takeoff-pavan.herokuapp.com//getCategories');
  }

  getSubCategories(formData: FormData): Observable<any>
  {
    return this.http.post('https://takeoff-pavan.herokuapp.com//getSubCategories',formData);
  }
  
   getVendorList(): Observable<any>
  {
    return this.http.get('https://takeoff-pavan.herokuapp.com//getVendorList');
  }
}
