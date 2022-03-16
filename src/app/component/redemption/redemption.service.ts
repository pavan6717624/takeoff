import { Injectable } from '@angular/core';
import { RedemptionDTO } from 'src/app/user/takeoff/takeoff.component';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RedemptionService {
  acceptRedemption(redemption: RedemptionDTO) {
    return this.http.post('http://localhost:8081/acceptRedemption',redemption);
  }
  vendorRedemptionProcess(redemption: RedemptionDTO) {
    return this.http.post('http://localhost:8081/vendorRedemptionProcess',redemption);
  }
  generateRedemption(redemption:RedemptionDTO) {
    return this.http.post('http://localhost:8081/generateRedemption',redemption);
  }

  
  constructor(private http: HttpClient) { }
}
