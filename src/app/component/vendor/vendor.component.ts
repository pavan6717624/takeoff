import { Component, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { VendorService } from './vendor.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { Router } from '@angular/router';
import { LoginStatus } from '../login/login.component';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  deviceInfo: any ;
  talign:  NzTabPosition = 'left';
  loginStatus: LoginStatus = new LoginStatus();
  uploaded: Boolean = false;
  logo: string = "";
  addImage: string = "";

  constructor(private router: Router, private msg: NzMessageService, private vendorService:VendorService,  private deviceService: DeviceDetectorService) 
  {
    const navigation = this.router.getCurrentNavigation();
    this.loginStatus =  (navigation?.extras?.state?.loginStatus); 
    console.log("Vendor login Status :: "+this.loginStatus);
  }

  ngOnInit(): void {

    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    
    if(isMobile)
    this.talign='top';
  

  }

  uploadFun(addImage: string)
  {
    console.log("came to adding image..."+addImage);
   this.addImage=addImage;
  }

  onLogoChange(logo: string)
  {
    this.logo=logo;
  }
 
}
