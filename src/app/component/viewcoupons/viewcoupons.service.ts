import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViewcouponsService {

  constructor(private http: HttpClient) { }


  getCoupons(formData: FormData): Observable<any> {
    return this.http.post('https://takeoff-angular.herokuapp.com/getCoupons', formData);

  }
}
