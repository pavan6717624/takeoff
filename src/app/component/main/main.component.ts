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
  logos: string[]=[];
  deviceInfo: any;

  constructor(private router: Router, private mainService: MainService, private deviceService: DeviceDetectorService) { }

  loading=false;
  height = '40';
  maxHeight= '100';
  ngOnInit(): void {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
   
    
    if(isMobile)
    {
    this.height='16';
    this.maxHeight='150';
    }

    this.getHomePageCoupons();
  }

  getHomePageCoupons()
  {

    this.loading=true;

    this.mainService.getHomePageCoupons().subscribe(
      (res:any) => {

        this.coupon=res;

        this.mainService.getLogos().subscribe(
          (res1:any) => {

            this.logos=res1;
            console.log(res1);


          },
          (err1) => { this.loading=false; } 

        )





       this.loading=false;
        console.log(res);

        
      },
      (err) => { this.loading=false;}
    );
  }

  open(): void {
    this.router.navigate(['subscribe']);
  }


}
