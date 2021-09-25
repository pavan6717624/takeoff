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
  fromTime: string = (this.fromDate.getHours()<10?'0'+this.fromDate.getHours: this.fromDate.getHours()) + ":" + (this.fromDate.getMinutes() < 10 ? '0'+this.fromDate.getMinutes() : this.fromDate.getMinutes());

  toDate: Date = new Date();
  toTime: string = (this.toDate.getHours()<10?'0'+this.toDate.getHours: this.toDate.getHours()) + ":" + (this.toDate.getMinutes() < 10 ? '0'+this.toDate.getMinutes() : this.toDate.getMinutes());



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
    this.fromDate= new Date();
   
  
    this.toDate = new Date();
    


    this.fromTime = (this.fromDate.getHours()<10?'0'+this.fromDate.getHours: this.fromDate.getHours()) + ":" + (this.fromDate.getMinutes() < 10 ? '0'+this.fromDate.getMinutes() : this.fromDate.getMinutes());

  
    this.toTime = (this.toDate.getHours()<10?'0'+this.toDate.getHours: this.toDate.getHours()) + ":" + (this.toDate.getMinutes() < 10 ? '0'+this.toDate.getMinutes() : this.toDate.getMinutes());

  
    
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
    this.fromTime = this.coupon.fromDate.split(" ")[1].substring(0,5);
    this.toDate = new Date(this.coupon.toDate.split(" ")[0]);
    this.toTime = this.coupon.toDate.split(" ")[1].substring(0,5);

 

   

    this.previewVisible = true;
  }

time: string[] = [];
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


    for(var i=0;i<24;i++)
    for(var j=0;j<60;j++)
   {
     var time = '';
     if(i<10)
     time+='0'+i;
     else
     time+=i;

     var time1 = '';
     if(j < 10)
     time1+='0'+j;
     else
     time1+=j;
    
     this.time.push(time+":"+time1);
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
    let fromTime= this.fromTime;
    let from = fromDate+" "+fromTime;

    let toDate = datePipe.transform(new Date(this.toDate),'yyyy-MM-dd');
    let toTime= this.toTime;
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

      (res) => {this.loading = false; console.log(res); this.coupons = res; if(this.coupons.length > 0) this.logo = this.coupons[0].logo;  },
      (err) => { this.loading = false;console.log(err); this.coupons = [];  }
    );
  }

}
