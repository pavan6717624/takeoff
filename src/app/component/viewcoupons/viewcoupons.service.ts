import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Coupon } from '../editcoupons/editcoupons.component';

@Injectable({
  providedIn: 'root'
})
export class ViewcouponsService {
  editCoupon(coupon: Coupon) {
    return this.http.post('http://localhost:8081/editCoupon', coupon);
  }

  constructor(private http: HttpClient) { }


  getCoupons(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8081/getCoupons', formData);

  }
}
