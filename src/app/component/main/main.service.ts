import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  getLogos() {
    return this.http.get('http://localhost:8081/getLogos')
  }
  getHomePageCoupons() {
    return this.http.get('http://localhost:8081/getHomePageCoupons')
  }

  constructor(private http: HttpClient) { }

}
