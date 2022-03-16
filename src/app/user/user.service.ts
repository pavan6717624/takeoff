import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RedemptionDTO, SendCouponsRequest } from './takeoff/takeoff.component';
import { RedemptionHistory } from './redem-history/redem-history.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getNotification() {
    return this.http.get('http://localhost:8081/getNotification');  
  }
  getCoupon(formData: FormData) {
    return this.http.post('http://localhost:8081/getCoupon',formData);
  }
  sendRedemptionCode(formData: FormData) {
    return this.http.post('http://localhost:8081/sendRedemptionCode',formData);
  }
  updatePan(formData: FormData) {
    return this.http.post('http://localhost:8081/updatePan',formData);
  }

  updateKYC(formData: FormData) {
    return this.http.post('http://localhost:8081/updateKYC',formData);
  }
  
   downloadCoupon(formData: FormData) {
    return this.http.post('http://localhost:8081/downloadCoupon',formData);
  }
 
  async likeCoupon(formData: FormData) {
    return await this.http.post('http://localhost:8081/likeCoupon',formData).toPromise();;
  }

  async disLikeCoupon(formData: FormData) {
    return await this.http.post('http://localhost:8081/disLikeCoupon',formData).toPromise();;
  }

  getRedemptionHistory() {
    return this.http.get('http://localhost:8081/getRedemptionHistory');
  }

  
  customerRedemption(redemption: RedemptionDTO) {
    return this.http.post('http://localhost:8081/customerRedemption',redemption);
  }
  generateRedemption(redemption:RedemptionDTO) {
    return this.http.post('http://localhost:8081/generateRedemption',redemption);
  }

  getKYCDetails() {
    return this.http.get('http://localhost:8081/getKYCDetails');
  }

  downloadRedemHistory(redemptionHistory: RedemptionHistory[]) {
    return this.http.post('http://localhost:8081/downloadRedemHistory',redemptionHistory,{responseType: 'blob'});
  }



  constructor(private http: HttpClient) { }


 
  getCustomerAccountDetails(formData: FormData) {
    return this.http.post('http://localhost:8081/getCustomerAccountDetails',formData)
  }


  getTakeOffRecommendations(sendCouponsRequest: SendCouponsRequest) {
    return this.http.post('http://localhost:8081/getTakeOffRecommendations',sendCouponsRequest)
  }

  getComplimentaryCoupons(sendCouponsRequest: SendCouponsRequest) {
    return this.http.post('http://localhost:8081/getComplimentaryCoupons',sendCouponsRequest)
  }


  getFreeCoupons(sendCouponsRequest: SendCouponsRequest) {
    return this.http.post('http://localhost:8081/getFreeCoupons',sendCouponsRequest)
  }


  getDailyCoupons(sendCouponsRequest: SendCouponsRequest) {
    return this.http.post('http://localhost:8081/getDailyCoupons',sendCouponsRequest);
  }

  getLimitedCoupons(sendCouponsRequest: SendCouponsRequest) {
    return this.http.post('http://localhost:8081/getLimitedCoupons',sendCouponsRequest)
  }

  getRedeemableCoupons(sendCouponsRequest: SendCouponsRequest) {
    return this.http.post('http://localhost:8081/getRedeemableCoupons',sendCouponsRequest)
  }
  getDiscountCoupons(sendCouponsRequest: SendCouponsRequest) {
    return this.http.post('http://localhost:8081/getDiscountCoupons',sendCouponsRequest)
  }
  
}
