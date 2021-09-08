import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RedemptionDTO } from './takeoff/takeoff.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  async likeCoupon(formData: FormData) {
    return await this.http.post('http://localhost:8081/likeCoupon',formData).toPromise();;
  }

  async disLikeCoupon(formData: FormData) {
    return await this.http.post('http://localhost:8081/disLikeCoupon',formData).toPromise();;
  }

  
  customerRedemption(redemption: RedemptionDTO) {
    return this.http.post('http://localhost:8081/customerRedemption',redemption);
  }
  generateRedemption(redemption:RedemptionDTO) {
    return this.http.post('http://localhost:8081/generateRedemption',redemption);
  }

  constructor(private http: HttpClient) { }


 
  getCustomerAccountDetails(formData: FormData) {
    return this.http.post('http://localhost:8081/getCustomerAccountDetails',formData)
  }


  getTakeOffRecommendations(formData: FormData) {
    return this.http.post('http://localhost:8081/getTakeOffRecommendations',formData)
  }

  getComplimentaryCoupons(formData: FormData) {
    return this.http.post('http://localhost:8081/getComplimentaryCoupons',formData)
  }


  getFreeCoupons(formData: FormData) {
    return this.http.post('http://localhost:8081/getFreeCoupons',formData)
  }


  getDailyCoupons(formData: FormData) {
    return this.http.post('http://localhost:8081/getDailyCoupons',formData);
  }

  getLimitedCoupons(formData: FormData) {
    return this.http.post('http://localhost:8081/getLimitedCoupons',formData)
  }

  getRedeemableCoupons(formData: FormData) {
    return this.http.post('http://localhost:8081/getRedeemableCoupons',formData)
  }
  getDiscountCoupons(formData: FormData) {
    return this.http.post('http://localhost:8081/getDiscountCoupons',formData)
  }
  
}
