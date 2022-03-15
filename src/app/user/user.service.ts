import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RedemptionDTO, SendCouponsRequest } from './takeoff/takeoff.component';
import { RedemptionHistory } from './redem-history/redem-history.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getNotification() {
    return this.http.get('https://takeoff-angular.herokuapp.com/getNotification');  
  }
  getCoupon(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/getCoupon',formData);
  }
  sendRedemptionCode(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/sendRedemptionCode',formData);
  }
  updatePan(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/updatePan',formData);
  }

  updateKYC(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/updateKYC',formData);
  }
  
   downloadCoupon(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/downloadCoupon',formData);
  }
 
  async likeCoupon(formData: FormData) {
    return await this.http.post('https://takeoff-angular.herokuapp.com/likeCoupon',formData).toPromise();;
  }

  async disLikeCoupon(formData: FormData) {
    return await this.http.post('https://takeoff-angular.herokuapp.com/disLikeCoupon',formData).toPromise();;
  }

  getRedemptionHistory() {
    return this.http.get('https://takeoff-angular.herokuapp.com/getRedemptionHistory');
  }

  
  customerRedemption(redemption: RedemptionDTO) {
    return this.http.post('https://takeoff-angular.herokuapp.com/customerRedemption',redemption);
  }
  generateRedemption(redemption:RedemptionDTO) {
    return this.http.post('https://takeoff-angular.herokuapp.com/generateRedemption',redemption);
  }

  getKYCDetails() {
    return this.http.get('https://takeoff-angular.herokuapp.com/getKYCDetails');
  }

  downloadRedemHistory(redemptionHistory: RedemptionHistory[]) {
    return this.http.post('https://takeoff-angular.herokuapp.com/downloadRedemHistory',redemptionHistory,{responseType: 'blob'});
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
