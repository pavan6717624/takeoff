import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RedemptionDTO, SendCouponsRequest } from './takeoff/takeoff.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  async likeCoupon(formData: FormData) {
    return await this.http.post('https://takeoff-angular.herokuapp.com/likeCoupon',formData).toPromise();;
  }

  async disLikeCoupon(formData: FormData) {
    return await this.http.post('https://takeoff-angular.herokuapp.com/disLikeCoupon',formData).toPromise();;
  }

  
  customerRedemption(redemption: RedemptionDTO) {
    return this.http.post('https://takeoff-angular.herokuapp.com/customerRedemption',redemption);
  }
  generateRedemption(redemption:RedemptionDTO) {
    return this.http.post('https://takeoff-angular.herokuapp.com/generateRedemption',redemption);
  }

  constructor(private http: HttpClient) { }


 
  getCustomerAccountDetails(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/getCustomerAccountDetails',formData)
  }


  getTakeOffRecommendations(sendCouponsRequest: SendCouponsRequest) {
    return this.http.post('https://takeoff-angular.herokuapp.com/getTakeOffRecommendations',sendCouponsRequest)
  }

  getComplimentaryCoupons(sendCouponsRequest: SendCouponsRequest) {
    return this.http.post('https://takeoff-angular.herokuapp.com/getComplimentaryCoupons',sendCouponsRequest)
  }


  getFreeCoupons(sendCouponsRequest: SendCouponsRequest) {
    return this.http.post('https://takeoff-angular.herokuapp.com/getFreeCoupons',sendCouponsRequest)
  }


  getDailyCoupons(sendCouponsRequest: SendCouponsRequest) {
    return this.http.post('https://takeoff-angular.herokuapp.com/getDailyCoupons',sendCouponsRequest);
  }

  getLimitedCoupons(sendCouponsRequest: SendCouponsRequest) {
    return this.http.post('https://takeoff-angular.herokuapp.com/getLimitedCoupons',sendCouponsRequest)
  }

  getRedeemableCoupons(sendCouponsRequest: SendCouponsRequest) {
    return this.http.post('https://takeoff-angular.herokuapp.com/getRedeemableCoupons',sendCouponsRequest)
  }
  getDiscountCoupons(sendCouponsRequest: SendCouponsRequest) {
    return this.http.post('https://takeoff-angular.herokuapp.com/getDiscountCoupons',sendCouponsRequest)
  }
  
}
