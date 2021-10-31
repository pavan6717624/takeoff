import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Coupon } from 'src/app/component/editcoupons/editcoupons.component';


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
}

@Component({
  selector: 'app-redem-history',
  templateUrl: './redem-history.component.html',
  styleUrls: ['./redem-history.component.css']
})
export class RedemHistoryComponent implements OnInit {

  constructor(public userService: UserService) {

    this.getRedemptionHistory();
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
