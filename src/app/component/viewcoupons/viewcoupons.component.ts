import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { LoginStatus } from '../login/login.component';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ViewcouponsService } from './viewcoupons.service';
import { Coupon } from '../editcoupons/editcoupons.component';

@Component({
  selector: 'app-viewcoupons',
  templateUrl: './viewcoupons.component.html',
  styleUrls: ['./viewcoupons.component.css']
})
export class ViewcouponsComponent implements OnInit {


  @Input() loginStatus: LoginStatus | undefined;
  @Input() addCoupon: Boolean | undefined;

  ngOnChanges(changes: SimpleChanges) {
        

   
    if(this.addCoupon)
   { 
     this.ngOnInit();
    }
  

  

 
    
    
}
  userType: string ='';
  coupons: Coupon[] = [];
  coupon: Coupon = new Coupon();
  loading: boolean = false;


  previewImage: string | undefined ;
  previewVisible = false;


  constructor(private router: Router,private msg: NzMessageService,private viewcouponsService: ViewcouponsService) { }

  ngOnInit(): void {
    if(this.loginStatus)
{
  this.userType=this.loginStatus.userType;
    if(this.loginStatus.userType ==='Vendor')
    this.getCoupons();
  
}

else
{
  this.msg.create('error', 'Session Expired. Please Login');
  this.router.navigate(['login']);
}

    
  }

  getCoupons()
  {
    this.loading=true;
    var formData = new FormData();
    if (this.loginStatus)
    {
      formData.set("vendorId", this.loginStatus.userId);
      this.userType = this.loginStatus.userType;
    }
  else {
    this.msg.create('error', 'Session Expired. Please Login');
    this.router.navigate(['login']);
  }
    this.viewcouponsService.getCoupons(formData).subscribe(

      (res) => { console.log(res); this.coupons = res; this.loading = false; },
      (err) => { console.log(err); this.coupons = []; this.loading = false; }
    );
  }

}
