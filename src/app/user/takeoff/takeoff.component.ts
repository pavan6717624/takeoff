import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/component/editcoupons/editcoupons.component';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../user.service';


@Component({
  selector: 'app-takeoff',
  templateUrl: './takeoff.component.html',
  styleUrls: ['./takeoff.component.css']
})
export class TakeoffComponent implements OnInit {
  
  
  constructor(private router: Router, private msg: NzMessageService, private userService: UserService) { }


  coupons: Coupon[] = [];

  coupon: Coupon =  new Coupon();

  loading: Boolean = false;

  previewVisible=false;

  visible = false;

  redeemVisible=false;

  redeemCoupon: Coupon =new Coupon();

  redeemChecked: Boolean = false;


  code: string[]=[];


  singleChar(id: number)
  {
    
  }

  redeem()
  {
    
  }

  redeemCancel()
  {
   this. redeemVisible = false;
   this.redeemChecked=false;
  }

  viewRedemption(item: Coupon)
  {
    this.redeemCoupon = item;
    this.redeemVisible=true;
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  cancel()
  {
    this.previewVisible=false;
  }

  ngOnInit(): void {
    var couponsheader = window.document.getElementById("couponsheader");

    if (couponsheader) {
      couponsheader.innerHTML = 'Takeoff Recommendations'
    }
    this.getTakeOffRecommendations();
  }

  getTakeOffRecommendations()
  {
    this.loading = true;
    var formData = new FormData();
    
    this.userService.getTakeOffRecommendations().subscribe(

      (res:any) => { console.log(res); this.coupons = res; this.loading = false; },
      (err) => { console.log(err); this.msg.create('error','Could not Connect to Server...');this.coupons = []; this.loading = false; }
    );
  }

}
