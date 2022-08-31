import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
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

  constructor(private router: Router, private msg: NzMessageService, private mainService: MainService, private deviceService: DeviceDetectorService) { 


      if(localStorage.getItem('token')!=null)
      {
        this.msg.loading('Checking Login...', { nzDuration: 4000 });
        this.router.navigate(['login']);
        return;
      }


  }

  loading=false;
  loading1=false;
  height = '40';
  maxHeight= '100';
  isMobile = false;
  ngOnInit(): void {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
   
    window.document.title='TAKE % OFF';
    if(this.isMobile)
    {
    this.height='16';
    this.maxHeight='150';
    }

    this.getHomePageCoupons();
    this.getLogos();
  }

  getHomePageCoupons()
  {

    this.loading=true;

    this.mainService.getHomePageCoupons().subscribe(
      (res:any) => {

        this.coupon=res;

       

       this.loading=false;
     //   console.log(res);

        
      },
      (err) => { this.loading=false;}
    );
  }
  getLogos()
  {

    this.loading1=true;

   
        this.mainService.getLogos().subscribe(
          (res1:any) => {

            this.logos=res1;
            this.loading1=false;
          // console.log(res1);


          },
          (err1) => { this.loading1=false; } 

        );





   
  }



}
