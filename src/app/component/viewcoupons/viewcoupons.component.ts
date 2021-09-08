import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { LoginStatus } from '../login/login.component';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ViewcouponsService } from './viewcoupons.service';
import { Coupon, CouponType } from '../editcoupons/editcoupons.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-viewcoupons',
  templateUrl: './viewcoupons.component.html',
  styleUrls: ['./viewcoupons.component.css']
})
export class ViewcouponsComponent implements OnInit {


  @Input() loginStatus: LoginStatus | undefined;
  @Input() addCoupon: Coupon | undefined;
  @Input() couponTypes: CouponType[] | undefined;
  @Input() logo: string | undefined;


  previewVisible = false;


  // result: Array<Date | null> = [];

  fromDate: Date = new Date();
  fromTime: Date = new Date();

  toDate: Date = new Date();
  toTime: Date = new Date();



  ngOnChanges(changes: SimpleChanges) {



    if (this.addCoupon) {
     this.ngOnInit();
     this.addCoupon=undefined;
      
    }

  }

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.fromDate) {
      return false;
    }

    var datePipe = new DatePipe('en-US');
    let endValueStr = datePipe.transform(endValue, 'yyyyMMdd');
    let fromDateStr = datePipe.transform(this.fromDate, 'yyyyMMdd');

    if (!endValueStr || !fromDateStr) {
      return false;
    }
    
    return endValueStr.localeCompare(fromDateStr) < 0;
  };

  userType: string = '';
  coupons: Coupon[] = [];
  coupon: Coupon = new Coupon();
  selectedCoupon: Coupon = new Coupon();

  loading: boolean = false;

  cancel() {
    // this.result = [];
    this.fromDate = new Date();
    this.fromTime =  new Date();

    this.toDate=  new Date();
    this.toTime= new Date();
    
    this.selectedCoupon = new Coupon();
    this.previewVisible = false
  }

  click(item: Coupon) {

    this.coupon = JSON.parse(JSON.stringify(item));
    this.selectedCoupon = item;

    // this.result[0] = new Date(this.coupon.fromDate);
    // this.result[1] = new Date(this.coupon.toDate);

    //alert("from to :: "+this.coupon.fromDate+" "+this.coupon.toDate);


    

    this.fromDate = new Date(this.coupon.fromDate.split(" ")[0]);
    this.fromTime = new Date(this.coupon.fromDate);
    this.toDate = new Date(this.coupon.toDate.split(" ")[0]);
    this.toTime = new Date(this.coupon.toDate);

   

    this.previewVisible = true;
  }


  constructor(private router: Router, private msg: NzMessageService, private viewcouponsService: ViewcouponsService) { }

  ngOnInit(): void {
    if (this.loginStatus) {
      this.userType = this.loginStatus.userType;
      if (this.loginStatus.userType === 'Vendor')
        this.getCoupons();

    }

    else {
   //   this.msg.create('error', 'Session Expired. Please Login');
      this.router.navigate(['login']);
    }


  }

  editCoupons() {

    console.log(this.coupon);

    // if (!this.result || this.result.length != 2 || this.result[0] == null || this.result[1] == null) {
    //   this.msg.create('error', 'Please Select Publish Dates (From & To)');
    //   return;
    // }

    if(!this.fromDate || !this.fromTime || !this.toDate || !this.toTime || this.fromDate == null || this.fromTime== null ||this.toDate== null ||this.toTime== null)
    {
      this.msg.create('error','Please Select Publish Dates (From & To)');
       return;
    }
    

    // if (!this.coupon.profession || this.coupon.profession === '') {
    //   this.msg.create('error', 'Please Select Target Profession');
    //   return;
    // }

    if (!this.coupon.gender || this.coupon.gender === '') {
      this.msg.create('error', 'Please Select Target Gender');
      return;
    }

    if (!this.coupon.couponType || this.coupon.couponType === '') {
      this.msg.create('error', 'Please Select Coupon Type');
      return;
    }


    var datePipe = new DatePipe('en-US');

    let fromDate = datePipe.transform(new Date(this.fromDate),'yyyy-MM-dd');
    let fromTime= datePipe.transform(new Date(this.fromTime), 'HH:mm');
    let from = fromDate+" "+fromTime;

    let toDate = datePipe.transform(new Date(this.toDate),'yyyy-MM-dd');
    let toTime= datePipe.transform(new Date(this.toTime), 'HH:mm');
    let to = toDate+" "+toTime;
    


    if (from)
      this.coupon.fromDate = from;
    else {
      this.msg.create('error', 'Publish From Date not Found.');
      return;
    }

    if (to)
      this.coupon.toDate = to;
    else {
      this.msg.create('error', 'Publish To Date not Found.');
      return;
    }

    if (this.loginStatus && this.loginStatus.userId)
      this.coupon.vendorId = Number(this.loginStatus.userId);
    else {
    //  this.msg.create('error', 'Session Expired. Please Login.');
      this.router.navigate(['login']);
      return;
    }
    this.loading = true;
    this.viewcouponsService.editCoupon(this.coupon).subscribe(

      (res) => {
        this.loading = false;
        console.log(res);
        if (res) {
          this.previewVisible = false;
          this.msg.create('success', 'Coupon Edited Succesfully');
         this.ngOnInit();

        }
        else
          this.msg.create('error', 'Error while Editing Coupon. Please try Again.');
      },
      (err) => {
        this.loading = false;
        this.msg.create('error', 'Error while Editing Coupon. Please try Again.');
        console.log(err);
      }
    );
  }

  getCoupons() {
    
    var formData = new FormData();
    if (this.loginStatus) {
      formData.set("vendorId", this.loginStatus.userId);
      this.userType = this.loginStatus.userType;
    }
    else {
    //  this.msg.create('error', 'Session Expired. Please Login');
      this.router.navigate(['login']);
    }
    this.loading = true;
    this.viewcouponsService.getCoupons(formData).subscribe(

      (res) => {this.loading = false; console.log(res); this.coupons = res; this.logo = this.coupons[0].logo;  },
      (err) => { this.loading = false;console.log(err); this.coupons = [];  }
    );
  }

}
