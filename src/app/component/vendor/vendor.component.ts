import { Component, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { VendorService } from './vendor.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { Router } from '@angular/router';
import { LoginStatus } from '../login/login.component';
import { Coupon, CouponType } from '../editcoupons/editcoupons.component';
import { RedemptionDTO } from 'src/app/user/takeoff/takeoff.component';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  deviceInfo: any ;
  qrResultString: string = '';
  talign:  NzTabPosition = 'left';
  loginStatus: LoginStatus = new LoginStatus();
  
  uploaded: Boolean = false;
  logo: string = "";
  addImage: string = "";
  isMobile: Boolean = false;
  userType: string ='';
  addCoupon: Coupon = new Coupon();
  couponTypes: CouponType[]=[];
  loading=false;

  status : any = null;
  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }
  constructor(private loginService: LoginService,private router: Router, private msg: NzMessageService, private vendorService:VendorService,  private deviceService: DeviceDetectorService) 
  {
    const navigation = this.router.getCurrentNavigation();
    this.loginStatus =  (navigation?.extras?.state?.loginStatus); 

    if(this.loginStatus)
    {
      this.userType=this.loginStatus.userType;
      if(this.userType!='Vendor')
      {
        this.msg.create('error', 'Logging in...');
        this.router.navigate(['login']);
        return;
      }
    }
    else {
      this.getLoginDetails();

    }

    

    console.log("Vendor login Status :: "+this.loginStatus);
  }

  getLoginDetails() {
    this.loading = true;
    this.loginService.getLoginDetails().subscribe(
      (res: any) => {
        this.loading = false;
        this.loginStatus = res;
        if(this.loginStatus.userType!='Vendor')
        
        {
          this.loading = false; this.msg.create('info', 'Logging in...');
          this.router.navigate(['login']);
          return;
        }
      },
      (err) => {
        this.loading = false; this.msg.create('error', 'Session Expired. Please Login...');
        this.router.navigate(['login']);
        return;
      }
    );
  }

  ngOnInit(): void {

    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    
    if(this.isMobile)
    this.talign='top';
  

  }

  uploadFun(addImage: string)
  {
    console.log("came to adding image..."+addImage);
   this.addImage=addImage;
  }

  uploadCoupon(coupon: Coupon)
  {
    console.log("came to adding coupon..."+coupon);
   this.addCoupon=coupon;
  }

  onLogoChange(logo: string)
  {
    this.logo=logo;
  }
  onCouponTypes(couponTypes:CouponType[])
  {
  this.couponTypes=couponTypes;
  }

  updateScanCode()
  {
    var formData = new FormData();
    formData.set("scanCode",this.qrResultString);
    this.loading=true;
    this.vendorService.updateScanCode(formData).subscribe(
      (res : any) => {
        this.status=res;
       
        this.qrResultString = '';
        console.log(res);
       
        this.loading=false;
        

      },
      (err) => { this.loading=false;this.msg.create('error','Scan Code Failed. Try Again.')
        console.log(err); }
    );
  }

  recapture()
  {
    this.status=null;
    this.qrResultString = '';
  }
 
}
