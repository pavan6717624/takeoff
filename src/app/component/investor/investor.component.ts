import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CustomerAccount } from 'src/app/user/account/account.component';
import { LoginStatus } from '../login/login.component';
import { LoginService } from '../login/login.service';
import { VendorService } from '../vendor/vendor.service';

@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.css']
})
export class InvestorComponent implements OnInit {

  loginStatus: LoginStatus = new LoginStatus();
  loading= false;
  customerDetails: CustomerAccount[]=[];

  talign:  NzTabPosition = 'left';
  isMobile: Boolean = false;

  constructor(private vendorService: VendorService, private router: Router, private loginService: LoginService, private msg: NzMessageService, private deviceService: DeviceDetectorService) {
    const navigation = this.router.getCurrentNavigation();
    this.loginStatus =  (navigation?.extras?.state?.loginStatus); 
    if (this.loginStatus) {
      
      console.log(this.loginStatus);
    }
    else {
      this.getLoginDetails();

    }
    
   }

   getLoginDetails() {
    this.loading = true;
    this.loginService.getLoginDetails().subscribe(
      (res: any) => {
        this.loading = false;
        this.loginStatus = res;
        console.log(this.loginStatus);
        
      },
      (err) => {
        this.loading = false; this.msg.create('error', 'Session Expired. Please Login...');
        this.router.navigate(['login']);
      }
    );
  }

  getInvestorCustomerAccountDetails() {
    this.loading = true;
    this.vendorService.getInvestorCustomerAccountDetails().subscribe(
      (res : any) => { console.log(res);   this.customerDetails = res; this.loading=false;},
      (err) => { console.log(err); this.msg.create('error','Error Occured at Server. Please try again.'); this.loading=false;}
    );
  }

  ngOnInit(): void {

        this.isMobile = this.deviceService.isMobile();
    
    if(this.isMobile)
    this.talign='top';

    this.getInvestorCustomerAccountDetails();

  }

  

}
