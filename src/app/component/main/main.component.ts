import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Coupon } from '../editcoupons/editcoupons.component';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  coupon: Coupon[]=[];
  deviceInfo: any;

  constructor(private router: Router, private mainService: MainService, private deviceService: DeviceDetectorService) { }

  loading=false;
  height = '155';
  ngOnInit(): void {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
   
    
    if(isMobile)
    this.height='20';

    this.getHomePageCoupons();
  }

  getHomePageCoupons()
  {

    this.loading=true;

    this.mainService.getHomePageCoupons().subscribe(
      (res:any) => {
       this.loading=false;
        console.log(res);

        this.coupon=res;
      },
      (err) => { this.loading=false;}
    );
  }

  open(): void {
    this.router.navigate(['subscribe']);
  }


}
