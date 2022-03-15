import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  getLogos() {
    return this.http.get('https://takeoff-angular.herokuapp.com/getLogos')
  }
  getHomePageCoupons() {
    return this.http.get('https://takeoff-angular.herokuapp.com/getHomePageCoupons')
  }

  constructor(private http: HttpClient) { }

}
