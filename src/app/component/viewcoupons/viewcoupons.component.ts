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
  @Input() addCoupon: Boolean | undefined;
  @Input() couponTypes: CouponType[] | undefined;
  @Input() logo: string | undefined;


  previewVisible = false;


  result: Array<Date | null> = [];


  ngOnChanges(changes: SimpleChanges) {



    if (this.addCoupon) {
      this.ngOnInit();
      this.addCoupon = false;
    }







  }
  userType: string = '';
  coupons: Coupon[] = [];
  coupon: Coupon = new Coupon();
  selectedCoupon: Coupon = new Coupon();

  loading: boolean = false;

  cancel() {
    this.result = [];
    this.selectedCoupon = new Coupon();
    this.previewVisible = false
  }

  click(item: Coupon) {

    this.coupon = JSON.parse(JSON.stringify(item));
    this.selectedCoupon = item;

    this.result[0] = new Date(this.coupon.fromDate);
    this.result[1] = new Date(this.coupon.toDate);
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
      this.msg.create('error', 'Session Expired. Please Login');
      this.router.navigate(['login']);
    }


  }

  editCoupons() {

    console.log(this.coupon);

    if (!this.result || this.result.length != 2 || this.result[0] == null || this.result[1] == null) {
      this.msg.create('error', 'Please Select Publish Dates (From & To)');
      return;
    }

    if (!this.coupon.profession || this.coupon.profession === '') {
      this.msg.create('error', 'Please Select Target Profession');
      return;
    }

    if (!this.coupon.gender || this.coupon.gender === '') {
      this.msg.create('error', 'Please Select Target Gender');
      return;
    }

    if (!this.coupon.couponType || this.coupon.couponType === '') {
      this.msg.create('error', 'Please Select Coupon Type');
      return;
    }



    var datePipe = new DatePipe('en-US');
    let from: any = datePipe.transform(this.result[0], 'yyyy-MM-dd HH:mm');
    let to: any = datePipe.transform(this.result[1], 'yyyy-MM-dd HH:mm');


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
      this.msg.create('error', 'Session Expired. Please Login.');
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
          this.selectedCoupon.header = this.coupon.header;
          this.selectedCoupon.body = this.coupon.body;
          this.selectedCoupon.footer = this.coupon.footer;
          this.selectedCoupon.header_color = this.coupon.header_color;
          this.selectedCoupon.body_color = this.coupon.body_color;
          this.selectedCoupon.footer_color = this.coupon.footer_color;
          this.selectedCoupon.header_align = this.coupon.header_align;
          this.selectedCoupon.body_align = this.coupon.body_align;
          this.selectedCoupon.footer_align = this.coupon.footer_align;
          this.selectedCoupon.header_size = this.coupon.header_size;
          this.selectedCoupon.body_size = this.coupon.body_size;
          this.selectedCoupon.footer_size = this.coupon.footer_size;
          this.selectedCoupon.footer_font = this.coupon.footer_font;
          this.selectedCoupon.header_font = this.coupon.header_font;
          this.selectedCoupon.body_font = this.coupon.body_font;
          this.selectedCoupon.footer_bold = this.coupon.footer_bold;
          this.selectedCoupon.header_bold = this.coupon.header_bold;
          this.selectedCoupon.body_bold = this.coupon.body_bold;
          this.selectedCoupon.footer_style = this.coupon.footer_style;
          this.selectedCoupon.header_style = this.coupon.header_style;
          this.selectedCoupon.body_style = this.coupon.body_style;
          this.selectedCoupon.image_align = this.coupon.image_align;
          this.selectedCoupon.footer_decoration = this.coupon.footer_decoration;
          this.selectedCoupon.header_decoration = this.coupon.header_decoration;
          this.selectedCoupon.body_decoration = this.coupon.body_decoration;
          this.selectedCoupon.profession = this.coupon.profession;
          this.selectedCoupon.gender = this.coupon.gender;
          this.selectedCoupon.couponType = this.coupon.couponType;
          this.selectedCoupon.keywords = this.coupon.keywords;
          this.selectedCoupon.imageId = this.coupon.imageId;
          this.selectedCoupon.image = this.coupon.image;
          this.selectedCoupon.fromDate = this.coupon.fromDate;
          this.selectedCoupon.toDate = this.coupon.toDate;
          this.selectedCoupon.logo = this.coupon.logo;
          this.selectedCoupon.vendorId = this.coupon.vendorId;
          this.selectedCoupon.description = this.coupon.description;
          this.selectedCoupon.id = this.coupon.id;

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
    this.loading = true;
    var formData = new FormData();
    if (this.loginStatus) {
      formData.set("vendorId", this.loginStatus.userId);
      this.userType = this.loginStatus.userType;
    }
    else {
      this.msg.create('error', 'Session Expired. Please Login');
      this.router.navigate(['login']);
    }
    this.viewcouponsService.getCoupons(formData).subscribe(

      (res) => { console.log(res); this.coupons = res; this.logo = this.coupons[0].logo; this.loading = false; },
      (err) => { console.log(err); this.coupons = []; this.loading = false; }
    );
  }

}
