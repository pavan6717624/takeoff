import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coupon, SendImagesRequest } from './editcoupons.component';
@Injectable({
  providedIn: 'root'
})
export class EditcouponsService {
  deleteImage(formData: FormData) {
    return this.http.post('http://localhost:8081/deleteImage', formData);
  }

  constructor(private http: HttpClient) { }



  getImages(sendImagesRequest: SendImagesRequest): Observable<any> {
    return this.http.post('http://localhost:8081/getImages', sendImagesRequest);

  }

  getLogo(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8081/getLogo', formData);

  }

  getCouponTypes(): Observable<any> {
    return this.http.get('http://localhost:8081/getCouponTypes');

  }

  getAllCouponTypes(): Observable<any> {
    return this.http.get('http://localhost:8081/getAllCouponTypes');

  }

  saveCoupon(coupon: Coupon): Observable<any> {
    return this.http.post('http://localhost:8081/saveCoupon', coupon);

  }
}
