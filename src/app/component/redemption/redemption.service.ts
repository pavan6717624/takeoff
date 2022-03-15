import { Injectable } from '@angular/core';
import { RedemptionDTO } from 'src/app/user/takeoff/takeoff.component';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RedemptionService {
  acceptRedemption(redemption: RedemptionDTO) {
    return this.http.post('https://takeoff-angular.herokuapp.com/acceptRedemption',redemption);
  }
  vendorRedemptionProcess(redemption: RedemptionDTO) {
    return this.http.post('https://takeoff-angular.herokuapp.com/vendorRedemptionProcess',redemption);
  }
  generateRedemption(redemption:RedemptionDTO) {
    return this.http.post('https://takeoff-angular.herokuapp.com/generateRedemption',redemption);
  }

  
  constructor(private http: HttpClient) { }
}
