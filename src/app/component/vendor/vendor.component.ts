import { Component, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { VendorService } from './vendor.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NzTabPosition } from 'ng-zorro-antd/tabs';


@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  deviceInfo: any ;
  talign:  NzTabPosition = 'left';

  constructor(private msg: NzMessageService, private vendorService:VendorService,  private deviceService: DeviceDetectorService) {}


  ngOnInit(): void {

    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    
    if(isMobile)
    this.talign='top';
  

  }
 
}
