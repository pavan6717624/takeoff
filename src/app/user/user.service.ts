import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RedemptionDTO } from './takeoff/takeoff.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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
}
