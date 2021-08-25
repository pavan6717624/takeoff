import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/component/editcoupons/editcoupons.component';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../user.service';

export class RedemptionDTO {



  id: number = 0;


  couponId: number = 0;


  vendorId: number = 0;


  customerId: number = 0;

  passcode: string = '';


  validTill: string = '';
}


@Component({
  selector: 'app-takeoff',
  templateUrl: './takeoff.component.html',
  styleUrls: ['./takeoff.component.css']
})
export class TakeoffComponent implements OnInit {


  constructor(private router: Router, private msg: NzMessageService, private userService: UserService) { }


  coupons: Coupon[] = [];

  coupon: Coupon = new Coupon();

  loading: Boolean = false;

  previewVisible = false;

  visible = false;

  redeemVisible = false;

  redeemCoupon: Coupon = new Coupon();

  redeemChecked: Boolean = false;

  redeemLoading: Boolean = false;

  redemption: RedemptionDTO = new RedemptionDTO();


  code: string[] = [];


  singleChar(id: number) {

  }

  generateRedemption(couponId: number, vendorId: number) {
    this.redeemLoading = true;
    let redemption : RedemptionDTO =new RedemptionDTO();

    redemption.couponId = couponId;
    redemption.vendorId = vendorId;
    redemption.customerId = 10004;

    this.code[0]='';
    this.code[1]='';
    this.code[2]='';
    this.code[3]='';


    this.userService.generateRedemption(redemption).subscribe(

      (res: any) => { console.log(res); this.redemption = res; 
        this.code[0]=this.redemption.passcode.charAt(0);
        this.code[1]=this.redemption.passcode.charAt(1);
        this.code[2]=this.redemption.passcode.charAt(2);
        this.code[3]=this.redemption.passcode.charAt(3);

        this.redeemLoading = false; },
      (err) => { console.log(err); this.msg.create('error', 'Error Occured while getting Passcode...'); this.redemption = new RedemptionDTO(); this.redeemLoading = false; }
    );
  }

  redeemCancel() {
    this.redeemVisible = false;
    this.redeemChecked = false;
  }

  viewRedemption(item: Coupon) {
    this.redeemCoupon = item;
    this.redeemVisible = true;
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  cancel() {
    this.previewVisible = false;
  }

  ngOnInit(): void {
    var couponsheader = window.document.getElementById("couponsheader");

    if (couponsheader) {
      couponsheader.innerHTML = 'Takeoff Recommendations'
    }
    this.getTakeOffRecommendations();
  }

  getTakeOffRecommendations() {
    this.loading = true;
    var formData = new FormData();


    this.userService.getTakeOffRecommendations().subscribe(

      (res: any) => { console.log(res); this.coupons = res; this.loading = false; },
      (err) => { console.log(err); this.msg.create('error', 'Could not Connect to Server...'); this.coupons = []; this.loading = false; }
    );
  }

}
