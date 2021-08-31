import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RedemptionDTO } from './takeoff/takeoff.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getLimitedCoupons() {
    return this.http.get('https://takeoff-pavan.herokuapp.com/getLimitedCoupons');
  }
  getRedeemableCoupons() {
    return this.http.get('https://takeoff-pavan.herokuapp.com/getRedeemableCoupons');
  }
  getDiscountCoupons() {
    return this.http.get('https://takeoff-pavan.herokuapp.com/getDiscountCoupons');
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
  getTakeOffRecommendations() {
    return this.http.get('https://takeoff-pavan.herokuapp.com/getTakeOffRecommendations');
  }


  getComplimentaryCoupons() {
    return this.http.get('https://takeoff-pavan.herokuapp.com/getComplimentaryCoupons');
  }


  getFreeCoupons() {
    return this.http.get('https://takeoff-pavan.herokuapp.com/getFreeCoupons');
  }


  getDailyCoupons() {
    return this.http.get('https://takeoff-pavan.herokuapp.com/getDailyCoupons');
  }

  
}
