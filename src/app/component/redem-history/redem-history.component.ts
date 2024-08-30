import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { Coupon } from 'src/app/component/editcoupons/editcoupons.component';
import { LoginService } from 'src/app/component/login/login.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoginStatus } from 'src/app/component/login/login.component';


export class RedemptionHistory
{
  couponId : number = 0;

	customerId: number = 0;
	
  vendorId : number = 0;
	
	redemOn : string = '';
	
  customerName : string = '';
	
  vendorName : string = '';
	
  couponType : string = '';

  address: string = '';

  contact: string ='';

  customerContact: string  = '';
}

@Component({
  selector: 'app-redem-history',
  templateUrl: './redem-history.component.html',
  styleUrls: ['./redem-history.component.css']
})
export class RedemHistoryComponent implements OnInit {

  constructor(private msg: NzMessageService,public userService: UserService, private loginService: LoginService, private router: Router) {

    this.getLoginDetails();
   }

   loginStatus: LoginStatus = new LoginStatus();
   
   getLoginDetails() {
    this.loading = true;
    this.loginService.getLoginDetails().subscribe(
      (res: any) => {
        this.loading = false;
        this.loginStatus = res;

        this.getRedemptionHistory();
      },
      (err) => {
        this.loading = false; this.msg.create('error', 'Session Expired. Please Login...');
        this.router.navigate(['login']);
      }
    );
  }

  ngOnInit(): void {

    var loginButton = window.document.getElementById("loginButton")
    
    if(loginButton)
    {
      loginButton.innerHTML="Logout";
      loginButton.setAttribute('href','/login');
      loginButton.setAttribute('onClick',"localStorage.removeItem('token')");
    }
    
    var couponsheader = window.document.getElementById("displayHeader");

    if (couponsheader) {
      couponsheader.innerHTML = 'Redemption History';
    }

  }

  loading = false;

  redemptionHistory: RedemptionHistory[] = [];
  coupon: Coupon = new Coupon();

  getRedemptionHistory()
  {
    this.loading=true;
    this.userService.getRedemptionHistory().subscribe(
      (res : any) => { console.log(res); this.redemptionHistory=res; this.loading=false;},
      (err) => { this.loading=false;}
     
       );
  }

  previewVisible = false;

  cancel()
  {
    this.previewVisible=false;
    this.coupon=new Coupon();
  }

  getCoupon(couponId: number)
  {
    this.loading=true;
    var formData = new FormData();
    formData.set("couponId",couponId+"");

    this.userService.getCoupon(formData).subscribe(
      (res : any) => { console.log(res); this.coupon=res; this.previewVisible=true;  this.loading=false;},
      (err) => {  this.loading=false;}
     
       );
  }


}
