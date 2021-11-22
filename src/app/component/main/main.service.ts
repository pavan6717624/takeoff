import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  getHomePageCoupons() {
    return this.http.get('https://takeoff-pavan.herokuapp.com/getHomePageCoupons')
  }

  constructor(private http: HttpClient) { }

}
