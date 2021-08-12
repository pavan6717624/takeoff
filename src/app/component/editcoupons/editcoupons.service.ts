import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coupon } from './editcoupons.component';
@Injectable({
  providedIn: 'root'
})
export class EditcouponsService {

  constructor(private http: HttpClient) { }



  getImages(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8081/getImages', formData);

  }

  getLogo(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8081/getLogo', formData);

  }

  getCouponTypes(): Observable<any> {
    return this.http.get('http://localhost:8081/getCouponTypes');

  }

  saveCoupon(coupon: Coupon): Observable<any> {
    return this.http.post('http://localhost:8081/saveCoupon', coupon);

  }
}
