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
    return this.http.get('http://localhost:8081/getCategories');
  }

  getSubCategories(formData: FormData): Observable<any>
  {
    return this.http.post('http://localhost:8081/getSubCategories',formData);
  }
  
   getVendorList(): Observable<any>
  {
    return this.http.get('http://localhost:8081/getVendorList');
  }
}
