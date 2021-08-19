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
    return this.http.post('https://takeoff-angular.herokuapp.com/getImages', formData);

  }

  getLogo(formData: FormData): Observable<any> {
    return this.http.post('https://takeoff-angular.herokuapp.com/getLogo', formData);

  }

  getCouponTypes(): Observable<any> {
    return this.http.get('https://takeoff-angular.herokuapp.com/getCouponTypes');

  }

  saveCoupon(coupon: Coupon): Observable<any> {
    return this.http.post('https://takeoff-angular.herokuapp.com/saveCoupon', coupon);

  }
}
