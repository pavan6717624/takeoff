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
    return this.http.get('https://takeoff-angular.herokuapp.com/getCategories');
  }

  getSubCategories(formData: FormData): Observable<any>
  {
    return this.http.post('https://takeoff-angular.herokuapp.com/getSubCategories',formData);
  }
  
   getVendorList(): Observable<any>
  {
    return this.http.get('https://takeoff-angular.herokuapp.com/getVendorList');
  }
}
