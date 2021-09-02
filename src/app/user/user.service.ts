import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RedemptionDTO } from './takeoff/takeoff.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  async likeCoupon(formData: FormData) {
    return await this.http.post('https://takeoff-pavan.herokuapp.com/likeCoupon',formData).toPromise();;
  }

  async disLikeCoupon(formData: FormData) {
    return await this.http.post('https://takeoff-pavan.herokuapp.com/disLikeCoupon',formData).toPromise();;
  }

  
  customerRedemption(redemption: RedemptionDTO) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/customerRedemption',redemption);
  }
  generateRedemption(redemption:RedemptionDTO) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/generateRedemption',redemption);
  }

  constructor(private http: HttpClient) { }


  customerRedeem()
  {

  }
  getTakeOffRecommendations(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/getTakeOffRecommendations',formData)
  }


  getComplimentaryCoupons(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/getComplimentaryCoupons',formData)
  }


  getFreeCoupons(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/getFreeCoupons',formData)
  }


  getDailyCoupons(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/getDailyCoupons',formData);
  }

  getLimitedCoupons(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/getLimitedCoupons',formData)
  }

  getRedeemableCoupons(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/getRedeemableCoupons',formData)
  }
  getDiscountCoupons(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/getDiscountCoupons',formData)
  }
  
}
