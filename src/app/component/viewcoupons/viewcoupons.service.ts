import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViewcouponsService {

  constructor(private http: HttpClient) { }


  getCoupons(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8081/getCoupons', formData);

  }
}
